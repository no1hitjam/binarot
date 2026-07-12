"""Populate src/readingTexts.ts with generated four-sentence readings.

Only unordered card pairs are written (lower binary value first), so Seed is
paired with every other card, Flag with every card after Flag, and so on.
"""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / "src" / "readingTexts.ts"

CARDS: list[dict[str, str]] = [
    {"name": "The Seed", "binary": "0", "meaning": "beginnings, ideas, and origins"},
    {"name": "The Flag", "binary": "1", "meaning": "claims, power, and sovereignty"},
    {"name": "The Call", "binary": "10", "meaning": "summonings, duty, and serendipity"},
    {"name": "The Link", "binary": "11", "meaning": "connections, promises, and security"},
    {"name": "The Host", "binary": "100", "meaning": "shelter, ownership, and grace"},
    {
        "name": "The Fork",
        "binary": "101",
        "meaning": "consumption, resonance, and diverging paths",
    },
    {"name": "The Port", "binary": "110", "meaning": "gateways, discovery, and trade"},
    {"name": "The Tree", "binary": "111", "meaning": "fullness, growth, and reach"},
    {"name": "The Agent", "binary": "1000", "meaning": "independence, will, and action"},
    {"name": "The Table", "binary": "1001", "meaning": "gathering, consumption, and plots"},
    {"name": "The Clone", "binary": "1010", "meaning": "mirrors, reproduction, and equality"},
    {"name": "The Cache", "binary": "1011", "meaning": "secrets, knowledge, and wealth"},
    {
        "name": "The Frame",
        "binary": "1100",
        "meaning": "perspective, structure, and state of mind",
    },
    {"name": "The Shell", "binary": "1101", "meaning": "protection, boundaries, and rigidity"},
    {"name": "The Forum", "binary": "1110", "meaning": "nobility, philosophy, and debate"},
    {
        "name": "The State",
        "binary": "1111",
        "meaning": "organization, authority, and politics",
    },
]

OPERATOR_SENTENCES = {
    "AND": "The coin lands on AND, keeping only what both cards share.",
    "OR": "The coin lands on OR, gathering everything either card offers.",
}

CARDS_BY_VALUE = {int(obj_card["binary"], 2): obj_card for obj_card in CARDS}


def s_card_summary(obj_card: dict[str, str]) -> str:
    return f"{obj_card['name']} ({obj_card['binary']}) represents {obj_card['meaning']}."


def s_reading_text(obj_left: dict[str, str], obj_right: dict[str, str], s_op: str) -> str:
    n_left = int(obj_left["binary"], 2)
    n_right = int(obj_right["binary"], 2)
    n_result = n_left & n_right if s_op == "AND" else n_left | n_right
    obj_result = CARDS_BY_VALUE[n_result]

    return " ".join(
        [
            s_card_summary(obj_left),
            OPERATOR_SENTENCES[s_op],
            s_card_summary(obj_right),
            "Result:",
            s_card_summary(obj_result),
        ]
    )


def s_ts_template_literal(s_value: str) -> str:
    s_escaped = (
        s_value.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
    )
    return f"`\n{s_escaped}\n`"


def s_build_typescript() -> tuple[str, int]:
    arr_lines = [
        "export type tOperator = 'AND' | 'OR'",
        "",
        "export type tOperatorTexts = {",
        "  AND: string",
        "  OR: string",
        "}",
        "",
        "export type tReadingTexts = {",
        "  [sLeftBinary: string]: {",
        "    [sRightBinary: string]: tOperatorTexts",
        "  }",
        "}",
        "",
        "export const objReadingTexts: tReadingTexts = {",
    ]

    n_pair_count = 0
    for n_left_index, obj_left in enumerate(CARDS):
        arr_right_cards = CARDS[n_left_index + 1 :]
        if not arr_right_cards:
            continue

        arr_lines.append(f"  '{obj_left['binary']}': {{")
        for obj_right in arr_right_cards:
            n_pair_count += 1
            s_and = s_ts_template_literal(s_reading_text(obj_left, obj_right, "AND"))
            s_or = s_ts_template_literal(s_reading_text(obj_left, obj_right, "OR"))
            arr_lines.append(f"    '{obj_right['binary']}': {{")
            arr_lines.append(f"      AND: {s_and},")
            arr_lines.append(f"      OR: {s_or},")
            arr_lines.append("    },")
        arr_lines.append("  },")

    arr_lines.extend(
        [
            "}",
            "",
            "export function sReadingText(sLeftBinary: string, sRightBinary: string, sOp: tOperator): string {",
            "  const nLeft = parseInt(sLeftBinary, 2)",
            "  const nRight = parseInt(sRightBinary, 2)",
            "  const sLow = nLeft < nRight ? sLeftBinary : sRightBinary",
            "  const sHigh = nLeft < nRight ? sRightBinary : sLeftBinary",
            "  return objReadingTexts[sLow]?.[sHigh]?.[sOp]?.trim() ?? ''",
            "}",
            "",
            "/** Post-process reading prose into HTML (styled lead, accent paragraph, final sentence). */",
            "export function sStyledReadingText(sText: string): string {",
            "  if (!sText) {",
            "    return ''",
            "  }",
            "",
            "  const arrParagraphs = sText.split(/\\n\\n+/)",
            "",
            "  const arrStyled = arrParagraphs.map((sParagraph: string, nIndex: number) => {",
            "    let sResult = sParagraph",
            "",
            "    if (nIndex === 0) {",
            "      const objFirst = /^([^\\s][^.!?]*)([.!?])/.exec(sResult)",
            "      if (objFirst) {",
            "        const sFirst = `${objFirst[1]}${objFirst[2]}`",
            "        sResult = `<strong class=\"reading-text-lead\">${sFirst}</strong>${sResult.slice(sFirst.length)}`",
            "      }",
            "    }",
            "",
            "    if (nIndex === arrParagraphs.length - 1) {",
            "      const objLast = /([^\\s][^.!?]*)([.!?])\\s*$/.exec(sResult)",
            "      if (objLast && objLast.index !== undefined) {",
            "        const sLast = `${objLast[1]}${objLast[2]}`",
            "        sResult =",
            "          `${sResult.slice(0, objLast.index)}<strong>${sLast}</strong>${sResult.slice(objLast.index + sLast.length)}`",
            "      }",
            "    }",
            "",
            "    if (nIndex === 1) {",
            "      sResult = `<span class=\"reading-text-accent\">${sResult}</span>`",
            "    }",
            "",
            "    return sResult",
            "  })",
            "",
            "  return arrStyled.join('\\n\\n<span class=\"reading-text-sep\" aria-hidden=\"true\">✦✦</span>\\n\\n')",
            "}",
            "",
        ]
    )
    return "\n".join(arr_lines), n_pair_count


def main() -> None:
    s_typescript, n_pair_count = s_build_typescript()
    OUTPUT_PATH.write_text(s_typescript, encoding="utf-8")
    print(f"Wrote {OUTPUT_PATH.relative_to(ROOT)} ({n_pair_count} unordered pairs)")


if __name__ == "__main__":
    main()
