"""Fill scripts/pairs.txt TODO lines via OpenAI chat completions.

Uses the same pair-prompt voice as the Dev panel and finished pairs.txt lines
as few-shot examples. Only lines starting with TODO are overwritten; checkpoint
writes after each successful fill.

Requires OPENAI_API_KEY in the environment.

Usage:
  python scripts/fill_pairs_llm.py --dry-run
  python scripts/fill_pairs_llm.py --limit 3
  python scripts/fill_pairs_llm.py

After filling, sync TypeScript with:
  python scripts/populate_reading_texts.py
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

# Allow `python scripts/fill_pairs_llm.py` to import sibling module.
sys.path.insert(0, str(Path(__file__).resolve().parent))

from populate_reading_texts import CARDS, PAIR_TEXTS_PATH

N_EXPECTED_PAIRS = 120
N_FEW_SHOT_MAX = 2
S_OPENAI_URL = "https://api.openai.com/v1/chat/completions"
S_DEFAULT_MODEL = "gpt-4o-mini"

S_SYSTEM_PROMPT = (
    "Binarot is a tarot-like deck based on binary symbols and operations. "
    "Draw two cards. Given the following pair, write one short paragraph about "
    "the combination of the two cards. Keep your response concise and to the point. "
    "Avoid unnecessary adjectives.\n\n"
    "Output a single paragraph on one line. Do not use markdown, labels, or "
    "quotation marks around the whole answer. Name both cards."
)


def arr_unordered_pairs() -> list[tuple[dict[str, str], dict[str, str]]]:
    arr_pairs: list[tuple[dict[str, str], dict[str, str]]] = []
    for n_left, obj_left in enumerate(CARDS):
        for obj_right in CARDS[n_left + 1 :]:
            arr_pairs.append((obj_left, obj_right))
    return arr_pairs


def s_card_prompt_line(obj_card: dict[str, str]) -> str:
    return f"{obj_card['name']} ({obj_card['binary']}) — {obj_card['meaning']}"


def s_user_pair_prompt(obj_left: dict[str, str], obj_right: dict[str, str]) -> str:
    return (
        f"Card A: {s_card_prompt_line(obj_left)}\n"
        f"Card B: {s_card_prompt_line(obj_right)}"
    )


def s_normalize_reply(s_raw: str) -> str:
    s_text = " ".join(s_raw.strip().split())
    if len(s_text) >= 2 and s_text[0] == s_text[-1] and s_text[0] in "\"'":
        s_text = s_text[1:-1].strip()
    return s_text


def b_is_todo(s_line: str) -> bool:
    return s_line.lstrip().startswith("TODO")


def arr_load_pair_lines() -> list[str]:
    if not PAIR_TEXTS_PATH.exists():
        raise SystemExit(f"Missing {PAIR_TEXTS_PATH}")
    arr_lines = PAIR_TEXTS_PATH.read_text(encoding="utf-8").splitlines()
    if len(arr_lines) < N_EXPECTED_PAIRS:
        arr_lines = arr_lines + [""] * (N_EXPECTED_PAIRS - len(arr_lines))
    return arr_lines[:N_EXPECTED_PAIRS]


def v_write_pair_lines(arr_lines: list[str]) -> None:
    PAIR_TEXTS_PATH.write_text("\n".join(arr_lines) + "\n", encoding="utf-8")


def arr_chat_messages(
    arr_pairs: list[tuple[dict[str, str], dict[str, str]]],
    arr_lines: list[str],
    n_todo_index: int,
) -> list[dict[str, str]]:
    arr_messages: list[dict[str, str]] = [{"role": "system", "content": S_SYSTEM_PROMPT}]

    n_few_shot = 0
    for n_index, (obj_left, obj_right) in enumerate(arr_pairs):
        if n_few_shot >= N_FEW_SHOT_MAX:
            break
        s_line = arr_lines[n_index].strip()
        if not s_line or b_is_todo(s_line):
            continue
        arr_messages.append(
            {"role": "user", "content": s_user_pair_prompt(obj_left, obj_right)}
        )
        arr_messages.append({"role": "assistant", "content": s_line})
        n_few_shot += 1

    obj_left, obj_right = arr_pairs[n_todo_index]
    arr_messages.append(
        {"role": "user", "content": s_user_pair_prompt(obj_left, obj_right)}
    )
    return arr_messages


def s_format_messages_for_print(arr_messages: list[dict[str, str]]) -> str:
    arr_parts: list[str] = []
    for obj_message in arr_messages:
        arr_parts.append(f"[{obj_message['role']}]\n{obj_message['content']}")
    return "\n\n".join(arr_parts)


def obj_openai_completion(
    arr_messages: list[dict[str, str]],
    s_api_key: str,
    s_model: str,
) -> tuple[str, int, int]:
    obj_body = {
        "model": s_model,
        "messages": arr_messages,
        "temperature": 0.7,
    }
    obj_request_data = json.dumps(obj_body).encode("utf-8")
    n_attempts = 0
    while True:
        n_attempts += 1
        obj_request = urllib.request.Request(
            S_OPENAI_URL,
            data=obj_request_data,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {s_api_key}",
            },
            method="POST",
        )
        try:
            with urllib.request.urlopen(obj_request, timeout=120) as obj_response:
                obj_payload = json.loads(obj_response.read().decode("utf-8"))
            break
        except urllib.error.HTTPError as obj_error:
            s_detail = obj_error.read().decode("utf-8", errors="replace")
            if obj_error.code == 429 and n_attempts < 6:
                print(f"Rate limited; sleeping 5s (attempt {n_attempts})…")
                time.sleep(5)
                continue
            raise SystemExit(f"OpenAI HTTP {obj_error.code}: {s_detail}") from obj_error

    s_content = obj_payload["choices"][0]["message"]["content"]
    obj_usage = obj_payload.get("usage") or {}
    n_prompt = int(obj_usage.get("prompt_tokens") or 0)
    n_completion = int(obj_usage.get("completion_tokens") or 0)
    return s_content, n_prompt, n_completion


def s_fill_one_pair(
    arr_messages: list[dict[str, str]],
    s_api_key: str,
    s_model: str,
) -> tuple[str, int, int]:
    s_raw, n_prompt, n_completion = obj_openai_completion(
        arr_messages, s_api_key, s_model
    )
    s_text = s_normalize_reply(s_raw)
    if s_text:
        return s_text, n_prompt, n_completion

    s_raw, n_prompt2, n_completion2 = obj_openai_completion(
        arr_messages, s_api_key, s_model
    )
    s_text = s_normalize_reply(s_raw)
    if not s_text:
        raise SystemExit("Empty model reply after retry")
    return s_text, n_prompt + n_prompt2, n_completion + n_completion2


def obj_parse_args(arr_argv: list[str] | None = None) -> argparse.Namespace:
    obj_parser = argparse.ArgumentParser(
        description="Fill pairs.txt TODO lines with OpenAI-generated pair paragraphs."
    )
    obj_parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print the prompt for the next TODO and exit (no API call).",
    )
    obj_parser.add_argument(
        "--limit",
        type=int,
        default=None,
        metavar="N",
        help="Fill at most N TODO lines, then stop.",
    )
    obj_parser.add_argument(
        "--model",
        default=S_DEFAULT_MODEL,
        help=f"OpenAI chat model (default: {S_DEFAULT_MODEL}).",
    )
    return obj_parser.parse_args(arr_argv)


def main(arr_argv: list[str] | None = None) -> None:
    obj_args = obj_parse_args(arr_argv)
    arr_pairs = arr_unordered_pairs()
    if len(arr_pairs) != N_EXPECTED_PAIRS:
        raise SystemExit(
            f"Expected {N_EXPECTED_PAIRS} unordered pairs, got {len(arr_pairs)}"
        )

    arr_lines = arr_load_pair_lines()
    arr_todo_indices = [
        n_index for n_index, s_line in enumerate(arr_lines) if b_is_todo(s_line)
    ]
    if not arr_todo_indices:
        print("No TODO lines in pairs.txt")
        return

    if obj_args.dry_run:
        n_index = arr_todo_indices[0]
        arr_messages = arr_chat_messages(arr_pairs, arr_lines, n_index)
        obj_left, obj_right = arr_pairs[n_index]
        print(
            f"Dry run — next TODO index {n_index}: "
            f"{obj_left['name']} + {obj_right['name']}\n"
        )
        print(s_format_messages_for_print(arr_messages))
        print(
            "\nAfter filling, sync TypeScript with:\n"
            "  python scripts/populate_reading_texts.py"
        )
        return

    s_api_key = os.environ.get("OPENAI_API_KEY", "").strip()
    if not s_api_key:
        raise SystemExit("Set OPENAI_API_KEY in the environment")

    if obj_args.limit is not None:
        if obj_args.limit < 1:
            raise SystemExit("--limit must be >= 1")
        arr_todo_indices = arr_todo_indices[: obj_args.limit]

    n_filled = 0
    n_prompt_total = 0
    n_completion_total = 0
    for n_index in arr_todo_indices:
        obj_left, obj_right = arr_pairs[n_index]
        arr_messages = arr_chat_messages(arr_pairs, arr_lines, n_index)
        s_text, n_prompt, n_completion = s_fill_one_pair(
            arr_messages, s_api_key, obj_args.model
        )
        arr_lines[n_index] = s_text
        v_write_pair_lines(arr_lines)
        n_filled += 1
        n_prompt_total += n_prompt
        n_completion_total += n_completion
        print(
            f"[{n_filled}/{len(arr_todo_indices)}] "
            f"{obj_left['name']} + {obj_right['name']}: {s_text[:80]}…"
        )

    print(
        f"Filled {n_filled} pair(s). "
        f"Tokens: {n_prompt_total} prompt + {n_completion_total} completion."
    )
    print("Sync TypeScript with: python scripts/populate_reading_texts.py")


if __name__ == "__main__":
    main()
