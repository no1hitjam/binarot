"""Populate src/compatibilityTexts.ts with pair readings.

Unordered pairs including same-sign (lower binary first). Each text is written
ambiguously for friendship and romance; refine by hand as needed.
"""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / "src" / "compatibilityTexts.ts"

CARDS: list[dict[str, str]] = [
    {"name": "The Seed", "binary": "0", "meaning": "beginnings, ideas, and origins", "trait": "quiet potential"},
    {"name": "The Flag", "binary": "1", "meaning": "claims, power, and sovereignty", "trait": "clear stance"},
    {"name": "The Call", "binary": "10", "meaning": "summonings, duty, and serendipity", "trait": "answering the unexpected"},
    {"name": "The Link", "binary": "11", "meaning": "connections, promises, and security", "trait": "trusted bonds"},
    {"name": "The Host", "binary": "100", "meaning": "shelter, ownership, and grace", "trait": "making room"},
    {
        "name": "The Fork",
        "binary": "101",
        "meaning": "consumption, resonance, and diverging paths",
        "trait": "choosing by feel",
    },
    {"name": "The Port", "binary": "110", "meaning": "gateways, discovery, and trade", "trait": "open thresholds"},
    {"name": "The Tree", "binary": "111", "meaning": "fullness, growth, and reach", "trait": "structured growth"},
    {"name": "The Agent", "binary": "1000", "meaning": "independence, will, and action", "trait": "self-directed motion"},
    {"name": "The Table", "binary": "1001", "meaning": "gathering, consumption, and plots", "trait": "shared councils"},
    {"name": "The Clone", "binary": "1010", "meaning": "mirrors, reproduction, and equality", "trait": "reflective sameness"},
    {"name": "The Cache", "binary": "1011", "meaning": "secrets, knowledge, and wealth", "trait": "kept reserves"},
    {
        "name": "The Frame",
        "binary": "1100",
        "meaning": "perspective, structure, and state of mind",
        "trait": "shifting viewpoints",
    },
    {"name": "The Shell", "binary": "1101", "meaning": "protection, boundaries, and rigidity", "trait": "hard edges"},
    {"name": "The Forum", "binary": "1110", "meaning": "nobility, philosophy, and debate", "trait": "open argument"},
    {
        "name": "The State",
        "binary": "1111",
        "meaning": "organization, authority, and politics",
        "trait": "collective order",
    },
]

COMPAT_LEADS = [
    "A bond finds its clearest shape when two natures stop competing for the same weather.",
    "There is a particular ease when two signs decide to keep each other company without rewriting each other.",
    "Some bonds are built less on identical tempo than on a shared willingness to stay.",
    "Closeness often begins where each person's native weather is allowed to remain intact.",
    "Companionship thrives when difference is treated as material, not as a flaw to sand down.",
    "The quiet test of any bond is whether both people can keep their own signal while sharing a channel.",
]


def s_card_ref(obj_card: dict[str, str]) -> str:
    return f"{obj_card['name']} ({obj_card['binary']})"


def n_pair_seed(s_left: str, s_right: str) -> int:
    return (int(s_left, 2) * 31 + int(s_right, 2) * 17) % 6


def s_compat_text(obj_left: dict[str, str], obj_right: dict[str, str]) -> str:
    n_seed = n_pair_seed(obj_left["binary"], obj_right["binary"])
    s_lead = COMPAT_LEADS[n_seed]

    if obj_left["binary"] == obj_right["binary"]:
        return "\n".join(
            [
                s_lead,
                "",
                (
                    f"Two people under {s_card_ref(obj_left)} share the same native weather: "
                    f"{obj_left['meaning']}. Side by side—as friends, partners, or something in between—"
                    f"this can feel like instant recognition, the ease of {obj_left['trait']} meeting itself, "
                    f"or like too little friction to grow."
                ),
                "",
                (
                    "The gift is deep understanding without translation. The work is remembering that "
                    "sameness still needs curiosity: ask new questions of the familiar, and let the bond "
                    "be a place where both of you keep evolving rather than merely echoing."
                ),
            ]
        )

    return "\n".join(
        [
            s_lead,
            "",
            (
                f"{s_card_ref(obj_left)} brings {obj_left['meaning']}, while "
                f"{s_card_ref(obj_right)} offers {obj_right['meaning']}. "
                f"One leans on {obj_left['trait']}; the other answers with {obj_right['trait']}. "
                f"Whether the pull is companionable, romantic, or both, the bond works when those gifts "
                f"trade places freely—neither person forced to become the other's understudy."
            ),
            "",
            (
                "In practice, this pairing thrives on clear invitations and low theater: show up, "
                "name what you need, and let difference do some of the work. Trust that loyalty here "
                "looks like staying curious about how the other person actually runs—not how you wish they would."
            ),
        ]
    )


def s_ts_template_literal(s_value: str) -> str:
    s_escaped = s_value.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
    return f"`\n{s_escaped}\n`"


def s_build_typescript() -> tuple[str, int]:
    arr_lines = [
        "export type tCompatibilityTexts = {",
        "  [sLeftBinary: string]: {",
        "    [sRightBinary: string]: string",
        "  }",
        "}",
        "",
        "export const objCompatibilityTexts: tCompatibilityTexts = {",
    ]

    n_pair_count = 0
    for n_left_index, obj_left in enumerate(CARDS):
        arr_right_cards = CARDS[n_left_index:]
        arr_lines.append(f"  '{obj_left['binary']}': {{")
        for obj_right in arr_right_cards:
            n_pair_count += 1
            s_text = s_ts_template_literal(s_compat_text(obj_left, obj_right))
            arr_lines.append(f"    '{obj_right['binary']}': {s_text},")
        arr_lines.append("  },")

    arr_lines.extend(
        [
            "}",
            "",
            "export function sCompatibilityText(sLeftBinary: string, sRightBinary: string): string {",
            "  const nLeft = parseInt(sLeftBinary, 2)",
            "  const nRight = parseInt(sRightBinary, 2)",
            "  const sLow = nLeft <= nRight ? sLeftBinary : sRightBinary",
            "  const sHigh = nLeft <= nRight ? sRightBinary : sLeftBinary",
            "  return objCompatibilityTexts[sLow]?.[sHigh]?.trim() ?? ''",
            "}",
            "",
        ]
    )
    return "\n".join(arr_lines), n_pair_count


def main() -> None:
    s_typescript, n_pair_count = s_build_typescript()
    OUTPUT_PATH.write_text(s_typescript, encoding="utf-8")
    print(f"Wrote {OUTPUT_PATH.relative_to(ROOT)} ({n_pair_count} unordered pairs incl. same-sign)")


if __name__ == "__main__":
    main()
