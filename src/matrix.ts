const arrGlyphs = [
  '0',
  '1',
  '00',
  '01',
  '10',
  '11',
  '100',
  '101',
  '110',
  '111',
  '1000',
  '1001',
  '1010',
  '1011',
  '1100',
  '1101',
  '1110',
  '1111',
  '&',
  '|',
  '^',
  '~',
  'AND',
  'OR',
  'XOR',
]

const arrCardNames = [
  'The Seed',
  'The Flag',
  'The Call',
  'The Link',
  'The Host',
  'The Fork',
  'The Port',
  'The Tree',
  'The Agent',
  'The Table',
  'The Clone',
  'The Cache',
  'The Frame',
  'The Shell',
  'The Forum',
  'The State',
]

const nFontSize = 15
const nMinTrail = 10
const nMaxTrail = 32
const nHeadGoldChance = 0.2
const nGlyphMutateChance = 0.08
const nCardNameChance = 0.12
const nFadeInMs = 4500
/** Cell step per trail link: +x and +y = down-right diagonal. */
const nDiagX = 1
const nDiagY = 1

type tDrop = {
  nX: number
  nY: number
  nSpeed: number
  bGoldHead: boolean
  arrTrail: string[]
}

let objCanvas: HTMLCanvasElement | null = null
let objCtx: CanvasRenderingContext2D | null = null
let arrDrops: tDrop[] = []
let nAnimFrame = 0
let bRunning = false
let nDpr = 1
let nDropCount = 0
let nFadeInStart = 0

function nIntroAlpha(): number {
  const nElapsed = performance.now() - nFadeInStart
  const nT = Math.min(1, Math.max(0, nElapsed / nFadeInMs))
  return 1 - (1 - nT) * (1 - nT)
}

function sPickGlyph(): string {
  if (Math.random() < nCardNameChance) {
    return arrCardNames[Math.floor(Math.random() * arrCardNames.length)]!
  }
  return arrGlyphs[Math.floor(Math.random() * arrGlyphs.length)]!
}

function arrNewTrail(): string[] {
  const nLen = nMinTrail + Math.floor(Math.random() * (nMaxTrail - nMinTrail))
  const arrTrail: string[] = []
  for (let nI = 0; nI < nLen; nI++) {
    arrTrail.push(sPickGlyph())
  }
  return arrTrail
}

function objSpawnDrop(nCols: number, nRows: number, bSeeded: boolean): tDrop {
  let nX: number
  let nY: number

  if (bSeeded) {
    nX = Math.random() * (nCols + nRows) - nRows
    nY = Math.random() * nRows
  } else if (Math.random() < 0.55) {
    nX = Math.random() * nCols
    nY = -2 - Math.random() * nRows * 0.35
  } else {
    nX = -2 - Math.random() * nCols * 0.35
    nY = Math.random() * nRows
  }

  return {
    nX,
    nY,
    nSpeed: 0.18 + Math.random() * 0.35,
    bGoldHead: Math.random() < nHeadGoldChance,
    arrTrail: arrNewTrail(),
  }
}

function vResize(): void {
  if (!objCanvas || !objCtx) {
    return
  }

  const nCssW = objCanvas.clientWidth
  const nCssH = objCanvas.clientHeight
  nDpr = Math.min(window.devicePixelRatio || 1, 2)

  objCanvas.width = Math.max(1, Math.floor(nCssW * nDpr))
  objCanvas.height = Math.max(1, Math.floor(nCssH * nDpr))
  objCtx.setTransform(nDpr, 0, 0, nDpr, 0, 0)

  const nCols = Math.max(1, Math.floor(nCssW / nFontSize))
  const nRows = Math.max(1, Math.floor(nCssH / nFontSize))
  nDropCount = Math.max(24, Math.floor(nCols * 1.15))

  if (arrDrops.length !== nDropCount) {
    const arrNext: tDrop[] = []
    for (let nI = 0; nI < nDropCount; nI++) {
      arrNext.push(arrDrops[nI] ?? objSpawnDrop(nCols, nRows, true))
    }
    arrDrops = arrNext
  }
}

function vDrawFrame(): void {
  if (!objCanvas || !objCtx || !bRunning) {
    return
  }

  const nW = objCanvas.clientWidth
  const nH = objCanvas.clientHeight
  const nCols = Math.max(1, Math.floor(nW / nFontSize))
  const nRows = Math.max(1, Math.floor(nH / nFontSize))

  objCtx.fillStyle = 'rgba(5, 3, 8, 0.14)'
  objCtx.fillRect(0, 0, nW, nH)

  const nIntro = nIntroAlpha()
  objCtx.globalAlpha = nIntro

  objCtx.font = `${nFontSize}px "IBM Plex Mono", Consolas, Monaco, monospace`
  objCtx.textAlign = 'center'
  objCtx.textBaseline = 'top'

  for (let nI = 0; nI < arrDrops.length; nI++) {
    const objDrop = arrDrops[nI]!
    const nHeadCol = Math.floor(objDrop.nX)
    const nHeadRow = Math.floor(objDrop.nY)
    const nTrailLen = objDrop.arrTrail.length

    for (let nStep = 0; nStep < nTrailLen; nStep++) {
      const nCol = nHeadCol - nStep * nDiagX
      const nRow = nHeadRow - nStep * nDiagY
      const nPx = nCol * nFontSize + nFontSize * 0.5
      const nPy = nRow * nFontSize

      if (nPx < -nFontSize * 4 || nPx > nW + nFontSize * 4 || nPy < -nFontSize || nPy > nH) {
        continue
      }

      if (Math.random() < nGlyphMutateChance) {
        objDrop.arrTrail[nStep] = sPickGlyph()
      }

      const nFade = 1 - nStep / nTrailLen
      const sGlyph = objDrop.arrTrail[nStep]!

      if (nStep === 0) {
        if (objDrop.bGoldHead) {
          objCtx.fillStyle = `rgba(120, 95, 25, ${0.22 + 0.2 * nFade})`
          objCtx.shadowColor = 'rgba(120, 95, 25, 0.15)'
          objCtx.shadowBlur = 3
        } else {
          objCtx.fillStyle = `rgba(45, 55, 130, ${0.25 + 0.2 * nFade})`
          objCtx.shadowColor = 'rgba(45, 55, 130, 0.15)'
          objCtx.shadowBlur = 3
        }
      } else if (nStep < 4) {
        objCtx.shadowBlur = 0
        objCtx.fillStyle = `rgba(50, 60, 140, ${0.2 + 0.22 * nFade})`
      } else {
        objCtx.shadowBlur = 0
        objCtx.fillStyle = `rgba(40, 48, 110, ${0.12 + 0.2 * nFade})`
      }

      objCtx.fillText(sGlyph, nPx, nPy)
    }

    objCtx.shadowBlur = 0
    objDrop.nX += objDrop.nSpeed * nDiagX
    objDrop.nY += objDrop.nSpeed * nDiagY

    const bOffBottom = objDrop.nY - nTrailLen * nDiagY > nRows + 2
    const bOffRight = objDrop.nX - nTrailLen * nDiagX > nCols + 2
    if (bOffBottom || bOffRight) {
      arrDrops[nI] = objSpawnDrop(nCols, nRows, false)
    }
  }

  objCtx.globalAlpha = 1
  nAnimFrame = window.requestAnimationFrame(vDrawFrame)
}

function vStart(): void {
  if (bRunning || !objCanvas) {
    return
  }

  bRunning = true
  nFadeInStart = performance.now()
  arrDrops = []
  vResize()
  if (objCtx) {
    objCtx.fillStyle = '#050308'
    objCtx.fillRect(0, 0, objCanvas.clientWidth, objCanvas.clientHeight)
  }
  nAnimFrame = window.requestAnimationFrame(vDrawFrame)
}

function vStop(): void {
  bRunning = false
  if (nAnimFrame !== 0) {
    window.cancelAnimationFrame(nAnimFrame)
    nAnimFrame = 0
  }
}

export function sMatrixMarkup(): string {
  return `
    <div class="matrix" id="matrix">
      <canvas class="matrix-canvas" id="matrix-canvas" aria-hidden="true"></canvas>
      <p class="matrix-caption">binary rain · 0–1111</p>
    </div>
  `
}

export function vBindMatrixRain(): void {
  objCanvas = document.querySelector<HTMLCanvasElement>('#matrix-canvas')
  if (!objCanvas) {
    return
  }

  objCtx = objCanvas.getContext('2d')
  if (!objCtx) {
    return
  }

  window.addEventListener('resize', () => {
    if (bRunning) {
      vResize()
    }
  })

  const objPanel = document.querySelector<HTMLElement>('[data-panel="matrix"]')
  if (objPanel?.classList.contains('is-active')) {
    vStart()
  }
}

export function vSetMatrixActive(bActive: boolean): void {
  if (bActive) {
    vStart()
  } else {
    vStop()
  }
}
