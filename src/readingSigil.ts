import { sCardIconPaths } from './cardIcons'

const nViewSize = 160
const nIconSize = 64
const nCenter = nViewSize / 2

function nBitValue(sBinary: string): number {
  return parseInt(sBinary, 2)
}

function sGlyphFace(sSlug: string, sClass: string, nAngle: number, nScale: number): string {
  const sPaths = sCardIconPaths(sSlug)
  if (!sPaths) {
    return ''
  }

  return `
    <g
      class="${sClass}"
      transform="rotate(${nAngle}) scale(${nScale}) translate(${-nIconSize / 2} ${-nIconSize / 2})"
    >
      ${sPaths}
    </g>
  `
}

function sBitRing(nLow: number, nHigh: number): string {
  const nRadius = 68
  const arrCells: string[] = []

  for (let nIndex = 0; nIndex < 4; nIndex += 1) {
    const nMask = 1 << (3 - nIndex)
    const bLow = (nLow & nMask) !== 0
    const bHigh = (nHigh & nMask) !== 0
    const nAngle = -90 + nIndex * 90
    const nRad = (nAngle * Math.PI) / 180
    const nCx = nCenter + Math.cos(nRad) * nRadius
    const nCy = nCenter + Math.sin(nRad) * nRadius

    let sKind = 'reading-pair-sigil-bit-off'
    if (bLow && bHigh) {
      sKind = 'reading-pair-sigil-bit-both'
    } else if (bLow) {
      sKind = 'reading-pair-sigil-bit-low'
    } else if (bHigh) {
      sKind = 'reading-pair-sigil-bit-high'
    }

    arrCells.push(
      `<circle class="reading-pair-sigil-bit ${sKind}" cx="${nCx.toFixed(1)}" cy="${nCy.toFixed(1)}" r="4.5"/>`,
    )
  }

  return `<g class="reading-pair-sigil-bits">${arrCells.join('')}</g>`
}

/** Procedural overlay of two card stroke icons, seeded by their binary values. */
export function sPairSigilMarkup(sLowBinary: string, sHighBinary: string): string {
  const nLow = nBitValue(sLowBinary)
  const nHigh = nBitValue(sHighBinary)
  const nXor = nLow ^ nHigh

  const nAngleLow = nLow * 18
  const nAngleHigh = -nHigh * 18
  const nScaleLow = 0.92 + (nLow % 4) * 0.03
  const nScaleHigh = 0.92 + (nHigh % 4) * 0.03
  const nOrbitRadius = 12 + (nXor % 6)
  const nDash = 4 + (nXor % 7)

  return `
    <svg
      class="reading-pair-sigil"
      viewBox="0 0 ${nViewSize} ${nViewSize}"
      width="${nViewSize}"
      height="${nViewSize}"
      role="img"
      aria-label="Combined sigil for ${sLowBinary} and ${sHighBinary}"
    >
      <circle
        class="reading-pair-sigil-frame"
        cx="${nCenter}"
        cy="${nCenter}"
        r="74"
        style="stroke-dasharray: ${nDash} ${nDash + 4}"
      />
      <g transform="translate(${nCenter} ${nCenter})">
        <g class="reading-pair-sigil-dance">
          <g transform="translate(${nOrbitRadius} 0)">
            <g class="reading-pair-sigil-face">
              ${sGlyphFace(
                sLowBinary,
                'reading-pair-sigil-layer reading-pair-sigil-low',
                nAngleLow,
                nScaleLow,
              )}
            </g>
          </g>
          <g transform="translate(${-nOrbitRadius} 0)">
            <g class="reading-pair-sigil-face">
              ${sGlyphFace(
                sHighBinary,
                'reading-pair-sigil-layer reading-pair-sigil-high',
                nAngleHigh,
                nScaleHigh,
              )}
            </g>
          </g>
        </g>
      </g>
      ${sBitRing(nLow, nHigh)}
    </svg>
  `
}
