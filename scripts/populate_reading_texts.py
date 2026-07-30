"""Populate src/readingTexts.ts with generated readings.

Only unordered card pairs are written (lower binary value first), so Seed is
paired with every other card, Flag with every card after Flag, and so on.

Pair field overrides are read line-by-line from scripts/pairs.txt in that same
order. Blank or missing lines fall back to the generated pair summary.

To fill TODO stubs in pairs.txt via OpenAI, then sync this file:

  python scripts/fill_pairs_llm.py
  python scripts/populate_reading_texts.py
"""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / "src" / "readingTexts.ts"
PAIR_TEXTS_PATH = ROOT / "scripts" / "pairs.txt"

CARDS: list[dict[str, str]] = [
    {"name": "The Seed", "binary": "0", "meaning": "beginnings, ideas, and origins"},
    {"name": "The Flag", "binary": "1", "meaning": "claims, power, and sovereignty"},
    {"name": "The Call", "binary": "10", "meaning": "summonings, duty, and serendipity"},
    {"name": "The Link", "binary": "11", "meaning": "connections, promises, and security"},
    {"name": "The Host", "binary": "100", "meaning": "shelter, ownership, and grace"},
    {
        "name": "The Fork",
        "binary": "101",
        "meaning": "hunger, resonance, and diverging paths",
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
    "AND": f"Viewed from the lens of AND, with differentiation and focus. ",
    "OR": f"Viewed from the lens of OR, with inclusivity and openness. ",
}

CARDS_BY_VALUE = {int(obj_card["binary"], 2): obj_card for obj_card in CARDS}


def s_card_summary(obj_card: dict[str, str]) -> str:
    return f"{obj_card['name']} ({obj_card['binary']}) represents {obj_card['meaning']}."


def s_pair_text(obj_left: dict[str, str], obj_right: dict[str, str]) -> str:
    return " ".join(
        [
            s_card_summary(obj_left),
            s_card_summary(obj_right),
        ]
    )


def arr_pair_texts() -> list[str]:
    if not PAIR_TEXTS_PATH.exists():
        return []
    return PAIR_TEXTS_PATH.read_text(encoding="utf-8").splitlines()


def s_reading_text(
    obj_left: dict[str, str],
    obj_right: dict[str, str],
    s_op: str,
) -> str:
    n_left = int(obj_left["binary"], 2)
    n_right = int(obj_right["binary"], 2)
    n_result = n_left & n_right if s_op == "AND" else n_left | n_right
    obj_result = CARDS_BY_VALUE[n_result]

    return " ".join(
        [
            OPERATOR_SENTENCES[s_op],
            s_card_summary(obj_left),
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


def s_build_typescript() -> tuple[str, int, int]:
    arr_lines = [
        "export type tOperator = 'AND' | 'OR'",
        "",
        "export type tPairTexts = {",
        "  pair: string",
        "  AND: string",
        "  OR: string",
        "}",
        "",
        "export type tReadingTexts = {",
        "  [sLeftBinary: string]: {",
        "    [sRightBinary: string]: tPairTexts",
        "  }",
        "}",
        "",
        "export const objReadingTexts: tReadingTexts = {",
    ]

    arr_pair_overrides = arr_pair_texts()
    n_pair_count = 0
    n_override_count = 0
    for n_left_index, obj_left in enumerate(CARDS):
        arr_right_cards = CARDS[n_left_index + 1 :]
        if not arr_right_cards:
            continue

        arr_lines.append(f"  '{obj_left['binary']}': {{")
        for obj_right in arr_right_cards:
            n_pair_index = n_pair_count
            n_pair_count += 1

            s_override = (
                arr_pair_overrides[n_pair_index].strip()
                if n_pair_index < len(arr_pair_overrides)
                else ""
            )
            if s_override:
                n_override_count += 1
                s_pair_body = s_override
            else:
                s_pair_body = s_pair_text(obj_left, obj_right)

            s_pair = s_ts_template_literal(s_pair_body)
            s_and = s_ts_template_literal(s_reading_text(obj_left, obj_right, "AND"))
            s_or = s_ts_template_literal(s_reading_text(obj_left, obj_right, "OR"))
            arr_lines.append(f"    '{obj_right['binary']}': {{")
            arr_lines.append(f"      pair: {s_pair},")
            arr_lines.append(f"      AND: {s_and},")
            arr_lines.append(f"      OR: {s_or},")
            arr_lines.append("    },")
        arr_lines.append("  },")

    arr_lines.append("}")
    arr_lines.append("")
    arr_lines.append(HELPERS_TYPESCRIPT.rstrip("\n"))
    arr_lines.append("")
    return "\n".join(arr_lines), n_pair_count, n_override_count


HELPERS_TYPESCRIPT = r"""
function arrOrderedBinaries(sLeftBinary: string, sRightBinary: string): [string, string] {
  const nLeft = parseInt(sLeftBinary, 2)
  const nRight = parseInt(sRightBinary, 2)
  return nLeft < nRight ? [sLeftBinary, sRightBinary] : [sRightBinary, sLeftBinary]
}

export function sPairReadingText(sLeftBinary: string, sRightBinary: string): string {
  const [sLow, sHigh] = arrOrderedBinaries(sLeftBinary, sRightBinary)
  return objReadingTexts[sLow]?.[sHigh]?.pair?.trim() ?? ''
}

export function sReadingText(sLeftBinary: string, sRightBinary: string, sOp: tOperator): string {
  const [sLow, sHigh] = arrOrderedBinaries(sLeftBinary, sRightBinary)
  return objReadingTexts[sLow]?.[sHigh]?.[sOp]?.trim() ?? ''
}

export type tCardLink = {
  sName: string
  sSlug: string
}

function sEscapeRegExp(sValue: string): string {
  return sValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function sLinkCardNames(sText: string, arrCardLinks: readonly tCardLink[]): string {
  if (arrCardLinks.length === 0) {
    return sText
  }

  const arrSorted = [...arrCardLinks].sort(
    (objA: tCardLink, objB: tCardLink) => objB.sName.length - objA.sName.length,
  )

  let sResult = sText
  for (const objCard of arrSorted) {
    const sName = sEscapeRegExp(objCard.sName)
    const objPattern = new RegExp(`\\b${sName}(?:\\s*\\([^)]*\\))?`, 'g')
    sResult = sResult.replace(
      objPattern,
      (sMatch: string) =>
        `<a class="reading-text-card" href="#card/${objCard.sSlug}">${sMatch}</a>`,
    )
  }
  return sResult
}

/** Post-process reading prose into HTML (styled lead, accent paragraph, final sentence, card links). */
export function sStyledReadingText(
  sText: string,
  arrCardLinks: readonly tCardLink[] = [],
  bSeparators = true,
): string {
  if (!sText) {
    return ''
  }

  const arrParagraphs = sText.split(/\n\n+/)

  const arrStyled = arrParagraphs.map((sParagraph: string, nIndex: number) => {
    let sResult = sParagraph

    if (nIndex === 0) {
      const objFirst = /^([^\s][^.!?]*)([.!?]["'\u201d\u2019]?)/.exec(sResult)
      if (objFirst) {
        const sFirst = `${objFirst[1]}${objFirst[2]}`
        sResult = `<strong class="reading-text-lead">${sFirst}</strong>${sResult.slice(sFirst.length).trimStart()}`
      }
    }

    if (nIndex === arrParagraphs.length - 1) {
      const objLast = /([^\s][^.!?]*)([.!?]["'\u201d\u2019]?)\s*$/.exec(sResult)
      if (objLast && objLast.index !== undefined) {
        const sLast = `${objLast[1]}${objLast[2]}`
        sResult =
          `${sResult.slice(0, objLast.index)}<strong>${sLast}</strong>${sResult.slice(objLast.index + sLast.length)}`
      }
    }

    if (nIndex === 1) {
      sResult = `<span class="reading-text-accent">${sResult}</span>`
    }

    return sLinkCardNames(sResult, arrCardLinks)
  })

  const sJoin = bSeparators
    ? '\n\n<span class="reading-text-sep" aria-hidden="true">✦✦</span>\n\n'
    : '\n\n'
  return arrStyled.join(sJoin)
}
"""


def main() -> None:
    s_typescript, n_pair_count, n_override_count = s_build_typescript()
    OUTPUT_PATH.write_text(s_typescript, encoding="utf-8")
    print(
        f"Wrote {OUTPUT_PATH.relative_to(ROOT)} "
        f"({n_pair_count} unordered pairs, {n_override_count} from {PAIR_TEXTS_PATH.name})"
    )


if __name__ == "__main__":
    main()
