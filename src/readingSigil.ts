import { sCardIconPaths } from './cardIcons'
import type { tOperator } from './readingTexts'

const nIconSize = 64
const nViewWidth = 320
const nViewHeight = 160

function nBitValue(sBinary: string): number {
  return parseInt(sBinary, 2)
}

function sResultBinary(sLowBinary: string, sHighBinary: string, sOp: tOperator): string {
  const nLow = nBitValue(sLowBinary)
  const nHigh = nBitValue(sHighBinary)
  const nResult = sOp === 'AND' ? nLow & nHigh : nLow | nHigh
  return nResult.toString(2)
}

function sGlyphGroup(sSlug: string, sClass: string, nTx: number, nTy: number, nScale: number): string {
  const sPaths = sCardIconPaths(sSlug)
  if (!sPaths) {
    return ''
  }

  return `
    <g class="${sClass}" transform="translate(${nTx} ${nTy}) scale(${nScale})">
      ${sPaths}
    </g>
  `
}

function sOperatorMark(sOp: tOperator): string {
  if (sOp === 'AND') {
    return `
      <g class="reading-sigil-op reading-sigil-op-and" transform="translate(160 52)">
        <circle cx="-10" cy="0" r="14"/>
        <circle cx="10" cy="0" r="14"/>
        <path d="M-4 -6 H4 M0 -10 V2"/>
      </g>
    `
  }

  return `
    <g class="reading-sigil-op reading-sigil-op-or" transform="translate(160 52)">
      <path d="M-18 -16 C-6 -16 -6 16 -18 16"/>
      <path d="M18 -16 C6 -16 6 16 18 16"/>
      <path d="M-2 -12 V12"/>
    </g>
  `
}

function sBitCell(nIndex: number, nCx: number, nCy: number, nLow: number, nHigh: number, nResult: number, sOp: tOperator): string {
  const nMask = 1 << (3 - nIndex)
  const bLow = (nLow & nMask) !== 0
  const bHigh = (nHigh & nMask) !== 0
  const bResult = (nResult & nMask) !== 0
  const bShared = bLow && bHigh
  const bUnion = bLow || bHigh

  let sKind = 'reading-sigil-bit-off'
  if (sOp === 'AND' && bShared) {
    sKind = 'reading-sigil-bit-shared'
  } else if (sOp === 'OR' && bUnion) {
    sKind = bShared ? 'reading-sigil-bit-shared' : 'reading-sigil-bit-union'
  } else if (bResult) {
    sKind = 'reading-sigil-bit-result'
  } else if (bLow || bHigh) {
    sKind = 'reading-sigil-bit-source'
  }

  const nR = bResult ? 5.5 : 4
  return `<circle class="reading-sigil-bit ${sKind}" cx="${nCx}" cy="${nCy}" r="${nR}"/>`
}

function sBitLattice(nLow: number, nHigh: number, nResult: number, sOp: tOperator): string {
  const nStartX = 128
  const nGap = 22
  const nCy = 138
  const arrCells: string[] = []

  for (let nIndex = 0; nIndex < 4; nIndex += 1) {
    const nCx = nStartX + nIndex * nGap
    arrCells.push(sBitCell(nIndex, nCx, nCy, nLow, nHigh, nResult, sOp))
  }

  return `
    <g class="reading-sigil-bits">
      <path class="reading-sigil-bit-rail" d="M${nStartX - 14} ${nCy} H${nStartX + 3 * nGap + 14}"/>
      ${arrCells.join('')}
    </g>
  `
}

export function sReadingSigilMarkup(sLowBinary: string, sHighBinary: string, sOp: tOperator): string {
  const sResult = sResultBinary(sLowBinary, sHighBinary, sOp)
  const nLow = nBitValue(sLowBinary)
  const nHigh = nBitValue(sHighBinary)
  const nResult = nBitValue(sResult)

  const nSourceScale = sOp === 'AND' ? 0.72 : 0.78
  const nLeftX = sOp === 'AND' ? 28 : 12
  const nRightX = sOp === 'AND' ? 228 : 244
  const nSourceY = sOp === 'AND' ? 18 : 10
  const nResultScale = 1.15
  const nResultX = (nViewWidth - nIconSize * nResultScale) / 2
  const nResultY = 58

  return `
    <svg
      class="reading-sigil"
      viewBox="0 0 ${nViewWidth} ${nViewHeight}"
      width="${nViewWidth}"
      height="${nViewHeight}"
      role="img"
      aria-label="Sigil for ${sLowBinary} ${sOp} ${sHighBinary} equals ${sResult}"
    >
      <rect class="reading-sigil-frame" x="1" y="1" width="${nViewWidth - 2}" height="${nViewHeight - 2}"/>
      ${sGlyphGroup(sLowBinary, 'reading-sigil-source reading-sigil-left', nLeftX, nSourceY, nSourceScale)}
      ${sOperatorMark(sOp)}
      ${sGlyphGroup(sHighBinary, 'reading-sigil-source reading-sigil-right', nRightX, nSourceY, nSourceScale)}
      ${sGlyphGroup(sResult, 'reading-sigil-result', nResultX, nResultY, nResultScale)}
      ${sBitLattice(nLow, nHigh, nResult, sOp)}
    </svg>
  `
}
