import { sCardIconPaths } from './cardIcons'

const arrGlyphs = [
  '0',
  '1',
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
]

const nGlyphSize = 28
const nMinTrail = 4
const nMaxTrail = 10
const nHeadGoldChance = 0.2
const nGlyphMutateChance = 0.015
const nFadeInMs = 4500
const nIconBake = 128
/** Shared down-right diagonal (unit vector). Steeper fall so trails read more vertical. */
const nDiagX = 0.5
const nDiagY = 0.866

const sStrokeBlue = '#6a78e8'
const sStrokeGold = '#c4a030'

type tDrop = {
  nX: number
  nY: number
  nVx: number
  nVy: number
  nSpeed: number
  nGap: number
  nSize: number
  nBright: number
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
let mapIconBlue: Map<string, HTMLCanvasElement> = new Map()
let mapIconGold: Map<string, HTMLCanvasElement> = new Map()
let bIconsReady = false

function nIntroAlpha(): number {
  const nElapsed = performance.now() - nFadeInStart
  const nT = Math.min(1, Math.max(0, nElapsed / nFadeInMs))
  return 1 - (1 - nT) * (1 - nT)
}

function sPickGlyph(): string {
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

function objSpawnDrop(nW: number, nH: number, bSeeded: boolean): tDrop {
  let nX: number
  let nY: number

  if (bSeeded) {
    nX = Math.random() * (nW + nH) - nH
    nY = Math.random() * nH
  } else if (Math.random() < 0.55) {
    nX = Math.random() * nW
    nY = -40 - Math.random() * nH * 0.35
  } else {
    nX = -40 - Math.random() * nW * 0.35
    nY = Math.random() * nH
  }

  const nDepth = Math.max(0, Math.min(1, nY / nH))
  const nDist = Math.random() < 0.42 ? 0.35 + Math.random() * 0.65 : Math.random() * 0.28
  const nNear = 1 - nDist
  const nScale = (1.0 - nDepth * 0.98) * (0.28 + nNear * 0.72)
  const nSpeed = (0.55 + Math.random() * 0.95) * (0.45 + nNear * 0.55)
  const nSize = nGlyphSize * (0.78 + Math.random() * 0.4) * nScale
  const nGap = nSize * (1.12 + Math.random() * 0.4)
  const nBright = 0.18 + nNear * 0.82

  return {
    nX,
    nY,
    nVx: nDiagX,
    nVy: nDiagY,
    nSpeed,
    nGap,
    nSize,
    nBright,
    bGoldHead: nDist < 0.4 && Math.random() < nHeadGoldChance,
    arrTrail: arrNewTrail(),
  }
}

function objBakeIcon(sSlug: string, sStroke: string): HTMLCanvasElement {
  const objBake = document.createElement('canvas')
  objBake.width = nIconBake
  objBake.height = nIconBake
  const objBakeCtx = objBake.getContext('2d')!

  const sPaths = sCardIconPaths(sSlug)
  if (!sPaths) {
    return objBake
  }

  const nScale = nIconBake / 64
  objBakeCtx.scale(nScale, nScale)
  objBakeCtx.strokeStyle = sStroke
  objBakeCtx.lineWidth = 2.4
  objBakeCtx.lineCap = 'round'
  objBakeCtx.lineJoin = 'round'

  for (const objMatch of sPaths.matchAll(/<path d="([^"]+)"/g)) {
    objBakeCtx.stroke(new Path2D(objMatch[1]!))
  }

  for (const objMatch of sPaths.matchAll(/<circle cx="([^"]+)" cy="([^"]+)" r="([^"]+)"(?:[^/]*)?\/>/g)) {
    objBakeCtx.beginPath()
    objBakeCtx.arc(Number(objMatch[1]), Number(objMatch[2]), Number(objMatch[3]), 0, Math.PI * 2)
    objBakeCtx.stroke()
  }

  for (const objMatch of sPaths.matchAll(
    /<rect x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)"(?:[^/]*)?\/>/g,
  )) {
    objBakeCtx.strokeRect(Number(objMatch[1]), Number(objMatch[2]), Number(objMatch[3]), Number(objMatch[4]))
  }

  return objBake
}

function vEnsureIcons(): void {
  if (bIconsReady) {
    return
  }

  mapIconBlue = new Map()
  mapIconGold = new Map()
  for (const sSlug of arrGlyphs) {
    mapIconBlue.set(sSlug, objBakeIcon(sSlug, sStrokeBlue))
    mapIconGold.set(sSlug, objBakeIcon(sSlug, sStrokeGold))
  }
  bIconsReady = true
}

function vDrawGlyph(
  objCtxLocal: CanvasRenderingContext2D,
  sSlug: string,
  nCx: number,
  nCy: number,
  nSize: number,
  bGold: boolean,
  nAlpha: number,
  nShadowBlur: number,
): void {
  const objIcon = (bGold ? mapIconGold : mapIconBlue).get(sSlug)
  if (!objIcon || nAlpha <= 0) {
    return
  }

  objCtxLocal.save()
  objCtxLocal.globalAlpha = nAlpha
  if (nShadowBlur > 0) {
    objCtxLocal.shadowColor = bGold ? sStrokeGold : sStrokeBlue
    objCtxLocal.shadowBlur = nShadowBlur
  }
  objCtxLocal.drawImage(objIcon, nCx - nSize * 0.5, nCy, nSize, nSize)
  objCtxLocal.restore()
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

  const nCols = Math.max(1, Math.floor(nCssW / nGlyphSize))
  nDropCount = Math.max(96, Math.floor(nCols * 5.7))

  if (arrDrops.length !== nDropCount) {
    const arrNext: tDrop[] = []
    for (let nI = 0; nI < nDropCount; nI++) {
      arrNext.push(arrDrops[nI] ?? objSpawnDrop(nCssW, nCssH, true))
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

  objCtx.fillStyle = 'rgba(5, 3, 8, 0.28)'
  objCtx.fillRect(0, 0, nW, nH)

  const nIntro = nIntroAlpha()

  for (let nI = 0; nI < arrDrops.length; nI++) {
    const objDrop = arrDrops[nI]!
    const nTrailLen = objDrop.arrTrail.length
    const nTrailPx = (nTrailLen - 1) * objDrop.nGap

    for (let nStep = 0; nStep < nTrailLen; nStep++) {
      const nPx = objDrop.nX - nStep * objDrop.nGap * objDrop.nVx
      const nPy = objDrop.nY - nStep * objDrop.nGap * objDrop.nVy

      if (nPx < -objDrop.nSize * 2 || nPx > nW + objDrop.nSize * 2 || nPy < -objDrop.nSize || nPy > nH + objDrop.nSize) {
        continue
      }

      if (Math.random() < nGlyphMutateChance) {
        objDrop.arrTrail[nStep] = sPickGlyph()
      }

      const nT = nStep / Math.max(1, nTrailLen - 1)
      const nFade = (1 - nT) * (1 - nT)
      const sGlyph = objDrop.arrTrail[nStep]!
      let nAlpha: number
      let nShadow = 0
      let bGold = false

      if (nStep === 0) {
        if (objDrop.bGoldHead) {
          bGold = true
          nAlpha = nIntro * objDrop.nBright * (0.55 + 0.45 * nFade)
          nShadow = 6 * objDrop.nBright
        } else {
          nAlpha = nIntro * objDrop.nBright * (0.6 + 0.4 * nFade)
          nShadow = 6 * objDrop.nBright
        }
      } else if (nStep < 4) {
        nAlpha = nIntro * objDrop.nBright * (0.28 + 0.45 * nFade)
      } else {
        nAlpha = nIntro * objDrop.nBright * (0.08 + 0.32 * nFade)
      }

      const nDrawSize = objDrop.nSize * (0.88 + 0.12 * nFade)
      vDrawGlyph(objCtx, sGlyph, nPx, nPy - nDrawSize * 0.5, nDrawSize, bGold, nAlpha, nShadow)
    }

    objDrop.nX += objDrop.nVx * objDrop.nSpeed
    objDrop.nY += objDrop.nVy * objDrop.nSpeed

    const bOffBottom = objDrop.nY - nTrailPx * objDrop.nVy > nH + objDrop.nSize
    const bOffRight = objDrop.nX - nTrailPx * objDrop.nVx > nW + objDrop.nSize
    if (bOffBottom || bOffRight) {
      arrDrops[nI] = objSpawnDrop(nW, nH, false)
    }
  }

  nAnimFrame = window.requestAnimationFrame(vDrawFrame)
}

function vStart(): void {
  if (bRunning || !objCanvas) {
    return
  }

  vEnsureIcons()
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
      <p class="matrix-caption">sign rain · sixteen glyphs</p>
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

  vEnsureIcons()

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
