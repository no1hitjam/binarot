import * as THREE from 'three'
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
const nCityLayers = 4
const nCitySeed = 0xc17a5ca9

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
let objCityCanvas: HTMLCanvasElement | null = null
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

function nCityRand(objState: { n: number }): number {
  objState.n = (objState.n + 0x6d2b79f5) | 0
  let nT = Math.imul(objState.n ^ (objState.n >>> 15), 1 | objState.n)
  nT = (nT + Math.imul(nT ^ (nT >>> 7), 61 | nT)) ^ nT
  return ((nT ^ (nT >>> 14)) >>> 0) / 4294967296
}

function vBakeCity(nW: number, nH: number): void {
  if (!objCityCanvas) {
    objCityCanvas = document.createElement('canvas')
  }

  objCityCanvas.width = Math.max(1, Math.floor(nW * nDpr))
  objCityCanvas.height = Math.max(1, Math.floor(nH * nDpr))
  const objCityCtx = objCityCanvas.getContext('2d')
  if (!objCityCtx) {
    return
  }

  objCityCtx.setTransform(nDpr, 0, 0, nDpr, 0, 0)
  objCityCtx.clearRect(0, 0, nW, nH)

  const nHorizon = nH * 0.7
  const objState = { n: nCitySeed }

  for (let nLayer = 0; nLayer < nCityLayers; nLayer++) {
    const nT = nLayer / (nCityLayers - 1)
    const nBaseY = nHorizon + nH * (0.04 + nT * 0.2)
    const nMaxH = nH * (0.035 + nT * 0.09)
    const nMinH = nMaxH * (0.28 + nT * 0.12)
    const nEdge = 18 + Math.floor(nT * 28)
    const nR = Math.round(22 + nT * 18)
    const nG = Math.round(8 + nT * 6)
    const nB = Math.round(32 + nT * 18)

    objCityCtx.fillStyle = `rgb(${nR}, ${nG}, ${nB})`
    objCityCtx.beginPath()
    objCityCtx.moveTo(-2, nH + 2)

    let nX = -nEdge
    while (nX < nW + nEdge) {
      const nBw = (6 + nCityRand(objState) * (14 + nT * 28)) * (0.7 + nT * 0.55)
      let nBh = nMinH + nCityRand(objState) * (nMaxH - nMinH)
      if (nCityRand(objState) < 0.12 + nT * 0.08) {
        nBh *= 1.35 + nCityRand(objState) * 0.55
      }

      const nTop = nBaseY - nBh
      objCityCtx.lineTo(nX, nBaseY)
      objCityCtx.lineTo(nX, nTop)

      if (nCityRand(objState) < 0.18 && nBh > nMaxH * 0.55) {
        const nSpireW = Math.max(1.5, nBw * 0.12)
        const nSpireH = nBh * (0.12 + nCityRand(objState) * 0.22)
        const nMid = nX + nBw * 0.5
        objCityCtx.lineTo(nMid - nSpireW * 0.5, nTop)
        objCityCtx.lineTo(nMid, nTop - nSpireH)
        objCityCtx.lineTo(nMid + nSpireW * 0.5, nTop)
      }

      if (nCityRand(objState) < 0.25) {
        const nStepW = nBw * (0.35 + nCityRand(objState) * 0.4)
        const nStepH = nBh * (0.15 + nCityRand(objState) * 0.25)
        objCityCtx.lineTo(nX + nStepW, nTop)
        objCityCtx.lineTo(nX + nStepW, nTop + nStepH)
        objCityCtx.lineTo(nX + nBw, nTop + nStepH)
      } else {
        objCityCtx.lineTo(nX + nBw, nTop)
      }

      objCityCtx.lineTo(nX + nBw, nBaseY)
      nX += nBw + (nCityRand(objState) < 0.2 ? nBw * 0.35 : 0.5 + nCityRand(objState) * 3)
    }

    objCityCtx.lineTo(nW + 2, nH + 2)
    objCityCtx.closePath()
    objCityCtx.fill()
  }
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

  vBakeCity(nCssW, nCssH)

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

  if (objCityCanvas) {
    objCtx.globalAlpha = nIntro
    objCtx.drawImage(objCityCanvas, 0, 0, nW, nH)
    objCtx.globalAlpha = 1
  }

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
      <p class="matrix-caption">Glyph rain</p>
    </div>
    <aside class="matrix-poetry" id="matrix-poetry" aria-live="polite">
      <p class="matrix-poetry-line" id="matrix-poetry-line"></p>
    </aside>
    <div class="matrix-room" id="matrix-room">
      <div class="matrix-room-viewport" id="matrix-room-viewport" aria-hidden="true"></div>
      <p class="matrix-room-caption">cam 03 · apt feed</p>
    </div>
    <div class="matrix-trace" id="matrix-trace">
      <div class="matrix-wire" id="matrix-wire">
        <div class="matrix-wire-viewport" id="matrix-wire-viewport" aria-hidden="true"></div>
        <p class="matrix-wire-caption">trace 07 · conduit</p>
      </div>
      <aside class="matrix-feed" id="matrix-feed" aria-live="polite">
        <div class="matrix-feed-log" id="matrix-feed-log"></div>
        <p class="matrix-feed-caption">tty 12 · spill</p>
      </aside>
    </div>
  `
}

const nRoomLine = 0x6a78e8
const nRoomLineDim = 0x3d4578
const nRoomLineGold = 0xc4a030
const nRoomBg = 0x050308
const nRoomStretchX = 1.45
const nRoomPanMaxX = 0.85
const nRoomPanMaxY = 0.45
const nRoomPanSens = 0.0022

let objRoomHost: HTMLElement | null = null
let objRoomScene: THREE.Scene | null = null
let objRoomCamera: THREE.PerspectiveCamera | null = null
let objRoomRenderer: THREE.WebGLRenderer | null = null
let nRoomAnimFrame = 0
let bRoomRunning = false
let nRoomStart = 0
let nRoomPanX = 0
let nRoomPanY = 0
let nRoomDragX = 0
let nRoomDragY = 0
let bRoomDragging = false
let nRoomPointerId = -1
let bRoomPointerBound = false

function nClamp(nValue: number, nMin: number, nMax: number): number {
  return Math.min(nMax, Math.max(nMin, nValue))
}

function vOnRoomPointerDown(objEvent: PointerEvent): void {
  if (!objRoomHost || objEvent.button !== 0) {
    return
  }

  bRoomDragging = true
  nRoomPointerId = objEvent.pointerId
  nRoomDragX = objEvent.clientX
  nRoomDragY = objEvent.clientY
  objRoomHost.classList.add('is-dragging')
  objRoomHost.setPointerCapture(objEvent.pointerId)
  objEvent.preventDefault()
}

function vOnRoomPointerMove(objEvent: PointerEvent): void {
  if (!bRoomDragging || objEvent.pointerId !== nRoomPointerId) {
    return
  }

  const nDx = objEvent.clientX - nRoomDragX
  const nDy = objEvent.clientY - nRoomDragY
  nRoomDragX = objEvent.clientX
  nRoomDragY = objEvent.clientY
  nRoomPanX = nClamp(nRoomPanX - nDx * nRoomPanSens, -nRoomPanMaxX, nRoomPanMaxX)
  nRoomPanY = nClamp(nRoomPanY + nDy * nRoomPanSens, -nRoomPanMaxY, nRoomPanMaxY)
}

function vOnRoomPointerUp(objEvent: PointerEvent): void {
  if (objEvent.pointerId !== nRoomPointerId) {
    return
  }

  bRoomDragging = false
  nRoomPointerId = -1
  objRoomHost?.classList.remove('is-dragging')
}

function vBindRoomPointer(): void {
  if (!objRoomHost || bRoomPointerBound) {
    return
  }

  bRoomPointerBound = true
  objRoomHost.addEventListener('pointerdown', vOnRoomPointerDown)
  objRoomHost.addEventListener('pointermove', vOnRoomPointerMove)
  objRoomHost.addEventListener('pointerup', vOnRoomPointerUp)
  objRoomHost.addEventListener('pointercancel', vOnRoomPointerUp)
  objRoomHost.addEventListener('lostpointercapture', vOnRoomPointerUp)
}

function objWireMesh(objGeo: THREE.BufferGeometry, nColor: number): THREE.LineSegments {
  const objEdges = new THREE.EdgesGeometry(objGeo)
  objGeo.dispose()
  return new THREE.LineSegments(
    objEdges,
    new THREE.LineBasicMaterial({ color: nColor, transparent: true, opacity: 0.92 }),
  )
}

function objWireBox(
  nW: number,
  nH: number,
  nD: number,
  nColor: number,
  nX: number,
  nY: number,
  nZ: number,
): THREE.LineSegments {
  const objMesh = objWireMesh(new THREE.BoxGeometry(nW, nH, nD), nColor)
  objMesh.position.set(nX, nY, nZ)
  return objMesh
}

function vBuildRoomScene(): void {
  if (!objRoomHost) {
    return
  }

  objRoomScene = new THREE.Scene()
  objRoomScene.background = new THREE.Color(nRoomBg)

  objRoomCamera = new THREE.PerspectiveCamera(58, 1, 0.05, 40)
  objRoomCamera.position.set(-2.35, 2.62, 1.85)

  objRoomRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
  objRoomRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  objRoomRenderer.setClearColor(nRoomBg, 1)
  objRoomHost.replaceChildren(objRoomRenderer.domElement)

  const objRoot = new THREE.Group()
  objRoot.scale.set(nRoomStretchX, 1, 1)
  objRoomScene.add(objRoot)

  // Room shell — open front omitted; camera sits in ceiling corner.
  const nRoomW = 5.2
  const nRoomH = 2.85
  const nRoomD = 4.4
  objRoot.add(objWireBox(nRoomW, 0.04, nRoomD, nRoomLineDim, 0, 0.02, 0))
  objRoot.add(objWireBox(nRoomW, 0.04, nRoomD, nRoomLineDim, 0, nRoomH, 0))
  objRoot.add(objWireBox(0.04, nRoomH, nRoomD, nRoomLineDim, -nRoomW * 0.5, nRoomH * 0.5, 0))
  objRoot.add(objWireBox(0.04, nRoomH, nRoomD, nRoomLineDim, nRoomW * 0.5, nRoomH * 0.5, 0))
  objRoot.add(objWireBox(nRoomW, nRoomH, 0.04, nRoomLineDim, 0, nRoomH * 0.5, -nRoomD * 0.5))

  // Window on back wall
  objRoot.add(objWireBox(1.6, 1.15, 0.05, nRoomLine, -0.9, 1.55, -nRoomD * 0.5 + 0.03))
  objRoot.add(objWireBox(0.04, 1.15, 0.05, nRoomLineDim, -0.9, 1.55, -nRoomD * 0.5 + 0.04))
  objRoot.add(objWireBox(1.6, 0.04, 0.05, nRoomLineDim, -0.9, 1.55, -nRoomD * 0.5 + 0.04))

  // Door
  objRoot.add(objWireBox(0.9, 2.05, 0.06, nRoomLine, 1.85, 1.025, -nRoomD * 0.5 + 0.03))

  // Desk against right-back area
  const nDeskY = 0.74
  objRoot.add(objWireBox(1.7, 0.06, 0.78, nRoomLine, 0.95, nDeskY, -0.85))
  objRoot.add(objWireBox(0.07, 0.72, 0.07, nRoomLineDim, 0.2, 0.36, -0.55))
  objRoot.add(objWireBox(0.07, 0.72, 0.07, nRoomLineDim, 1.7, 0.36, -0.55))
  objRoot.add(objWireBox(0.07, 0.72, 0.07, nRoomLineDim, 0.2, 0.36, -1.15))
  objRoot.add(objWireBox(0.07, 0.72, 0.07, nRoomLineDim, 1.7, 0.36, -1.15))

  // Laptop base + open screen
  const objLaptop = new THREE.Group()
  objLaptop.position.set(0.85, nDeskY + 0.05, -0.75)
  objLaptop.add(objWireBox(0.42, 0.02, 0.28, nRoomLine, 0, 0, 0))
  const objScreen = objWireBox(0.42, 0.28, 0.02, nRoomLineGold, 0, 0.15, -0.12)
  objScreen.rotation.x = -1.05
  objLaptop.add(objScreen)
  objRoot.add(objLaptop)

  // Second monitor
  objRoot.add(objWireBox(0.55, 0.36, 0.04, nRoomLine, 1.45, nDeskY + 0.32, -1.05))
  objRoot.add(objWireBox(0.08, 0.18, 0.08, nRoomLineDim, 1.45, nDeskY + 0.1, -1.05))

  // Chair
  objRoot.add(objWireBox(0.42, 0.05, 0.42, nRoomLine, 0.9, 0.46, -0.15))
  objRoot.add(objWireBox(0.42, 0.48, 0.05, nRoomLine, 0.9, 0.72, 0.05))
  objRoot.add(objWireBox(0.06, 0.44, 0.06, nRoomLineDim, 0.72, 0.22, -0.32))
  objRoot.add(objWireBox(0.06, 0.44, 0.06, nRoomLineDim, 1.08, 0.22, -0.32))
  objRoot.add(objWireBox(0.06, 0.44, 0.06, nRoomLineDim, 0.72, 0.22, 0.02))
  objRoot.add(objWireBox(0.06, 0.44, 0.06, nRoomLineDim, 1.08, 0.22, 0.02))

  // Bed
  objRoot.add(objWireBox(2.1, 0.32, 1.15, nRoomLine, -1.35, 0.28, 0.95))
  objRoot.add(objWireBox(0.55, 0.18, 1.05, nRoomLineDim, -2.05, 0.52, 0.95))

  // Server rack / shelf
  objRoot.add(objWireBox(0.55, 1.5, 0.4, nRoomLine, 2.15, 0.75, 0.9))
  objRoot.add(objWireBox(0.5, 0.03, 0.36, nRoomLineDim, 2.15, 0.45, 0.9))
  objRoot.add(objWireBox(0.5, 0.03, 0.36, nRoomLineDim, 2.15, 0.85, 0.9))
  objRoot.add(objWireBox(0.5, 0.03, 0.36, nRoomLineDim, 2.15, 1.25, 0.9))

  // Desk clutter — mug, lamp
  objRoot.add(objWireBox(0.08, 0.1, 0.08, nRoomLineDim, 1.55, nDeskY + 0.08, -0.55))
  objRoot.add(objWireBox(0.05, 0.35, 0.05, nRoomLine, 0.35, nDeskY + 0.2, -1.05))
  objRoot.add(objWireBox(0.18, 0.04, 0.18, nRoomLineGold, 0.35, nDeskY + 0.4, -1.05))

  // Floor cable runs
  const objCableGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(1.45, 0.03, -1.05),
    new THREE.Vector3(1.7, 0.03, -0.4),
    new THREE.Vector3(2.0, 0.03, 0.4),
    new THREE.Vector3(2.15, 0.03, 0.7),
  ])
  objRoot.add(
    new THREE.Line(
      objCableGeo,
      new THREE.LineBasicMaterial({ color: nRoomLineDim, transparent: true, opacity: 0.7 }),
    ),
  )

  // Hidden camera body in the viewing corner
  objRoot.add(objWireBox(0.12, 0.08, 0.12, nRoomLineGold, -2.4, 2.7, 1.95))

  objRoomCamera.lookAt(0.85 * nRoomStretchX, 0.95, -0.55)
  vResizeRoom()
}

function vResizeRoom(): void {
  if (!objRoomHost || !objRoomCamera || !objRoomRenderer) {
    return
  }

  const nW = Math.max(1, objRoomHost.clientWidth)
  const nH = Math.max(1, objRoomHost.clientHeight)
  objRoomCamera.aspect = nW / nH
  objRoomCamera.updateProjectionMatrix()
  objRoomRenderer.setSize(nW, nH, false)
}

function vTickRoom(): void {
  if (!bRoomRunning || !objRoomRenderer || !objRoomScene || !objRoomCamera) {
    return
  }

  const nT = (performance.now() - nRoomStart) * 0.001
  objRoomCamera.position.set(
    -2.35 + Math.sin(nT * 0.17) * 0.04 + nRoomPanX * 0.18,
    2.62 + Math.sin(nT * 0.13) * 0.02 + nRoomPanY * 0.12,
    1.85 + Math.cos(nT * 0.15) * 0.035,
  )
  objRoomCamera.lookAt(
    0.85 * nRoomStretchX + Math.sin(nT * 0.11) * 0.03 + nRoomPanX,
    0.95 + nRoomPanY,
    -0.55 + Math.cos(nT * 0.09) * 0.025,
  )

  objRoomRenderer.render(objRoomScene, objRoomCamera)
  nRoomAnimFrame = window.requestAnimationFrame(vTickRoom)
}

function vStartRoom(): void {
  if (bRoomRunning) {
    return
  }

  objRoomHost = document.querySelector<HTMLElement>('#matrix-room-viewport')
  if (!objRoomHost) {
    return
  }

  if (!objRoomRenderer || !objRoomScene) {
    vBuildRoomScene()
  }

  vBindRoomPointer()
  bRoomRunning = true
  nRoomStart = performance.now()
  vResizeRoom()
  objRoomHost.classList.add('is-revealed')
  nRoomAnimFrame = window.requestAnimationFrame(vTickRoom)
}

function vStopRoom(): void {
  bRoomRunning = false
  bRoomDragging = false
  nRoomPointerId = -1
  objRoomHost?.classList.remove('is-dragging')
  if (nRoomAnimFrame !== 0) {
    window.cancelAnimationFrame(nRoomAnimFrame)
    nRoomAnimFrame = 0
  }
  objRoomHost?.classList.remove('is-revealed')
}

const nWireLine = 0x6a78e8
const nWireLineDim = 0x3d4578
const nWireLineGold = 0xc4a030
const nWireLineDark = 0x1e2448
const nWireLineDimDark = 0x12162a
const nWireLineGoldDark = 0x3a2e10
const nWireBg = 0x050308
const nWirePointStep = 1.15
const nWireSpeed = 0.15
const nWireSheathR = 1.9
const nWireCoreR = 0.42
const nWireStrandR = 0.9
const nWireChunkPoints = 5
const nWireAhead = 14
const nWireBehind = 2.5
const nWirePulseSpeed = 1.35

type tWireChunk = {
  nStart: number
  nEnd: number
  objGroup: THREE.Group
}

type tWireSample = {
  objPos: THREE.Vector3
  objTangent: THREE.Vector3
}

let objWireHost: HTMLElement | null = null
let objWireScene: THREE.Scene | null = null
let objWireCamera: THREE.PerspectiveCamera | null = null
let objWireRenderer: THREE.WebGLRenderer | null = null
let arrWireChunks: tWireChunk[] = []
let nWireCamT = 0
let nWireAnimFrame = 0
let bWireRunning = false
let nWireLastTs = 0
let objWireSheathMat: THREE.MeshBasicMaterial | null = null
let objWireCoreMat: THREE.MeshBasicMaterial | null = null
let objWireStrandMatA: THREE.MeshBasicMaterial | null = null
let objWireStrandMatB: THREE.MeshBasicMaterial | null = null
let objWireRingMatA: THREE.MeshBasicMaterial | null = null
let objWireRingMatB: THREE.MeshBasicMaterial | null = null
const objWireSamplePos = new THREE.Vector3()
const objWireSampleTan = new THREE.Vector3()
const objWireLookPos = new THREE.Vector3()
const objWireLookTan = new THREE.Vector3()
const objWireShake = new THREE.Vector3()
const objWireQuat = new THREE.Quaternion()
const objWireZAxis = new THREE.Vector3(0, 0, 1)
const objWirePulseBlue = new THREE.Color()
const objWirePulseDim = new THREE.Color()
const objWirePulseGold = new THREE.Color()
const objWireColorBlue = new THREE.Color(nWireLine)
const objWireColorBlueDark = new THREE.Color(nWireLineDark)
const objWireColorDim = new THREE.Color(nWireLineDim)
const objWireColorDimDark = new THREE.Color(nWireLineDimDark)
const objWireColorGold = new THREE.Color(nWireLineGold)
const objWireColorGoldDark = new THREE.Color(nWireLineGoldDark)

function vPulseWireMat(
  objMat: THREE.MeshBasicMaterial | null,
  objBright: THREE.Color,
  objDark: THREE.Color,
  objScratch: THREE.Color,
  nPulse: number,
): void {
  if (!objMat) {
    return
  }
  objScratch.copy(objDark).lerp(objBright, nPulse)
  objMat.color.copy(objScratch)
}

function objWirePointAt(nIndex: number): THREE.Vector3 {
  const nBend = nIndex * 0.62
  return new THREE.Vector3(
    Math.sin(nBend * 0.9) * 1.8 + Math.sin(nBend * 2.1) * 0.45,
    Math.cos(nBend * 0.65) * 1.2 + Math.sin(nBend * 1.4) * 0.4,
    nIndex * nWirePointStep,
  )
}

function vCatmullLerp(
  objP0: THREE.Vector3,
  objP1: THREE.Vector3,
  objP2: THREE.Vector3,
  objP3: THREE.Vector3,
  nT: number,
  objOut: THREE.Vector3,
): void {
  const nT2 = nT * nT
  const nT3 = nT2 * nT
  objOut.set(0, 0, 0)
  objOut.addScaledVector(objP0, -0.5 * nT3 + nT2 - 0.5 * nT)
  objOut.addScaledVector(objP1, 1.5 * nT3 - 2.5 * nT2 + 1)
  objOut.addScaledVector(objP2, -1.5 * nT3 + 2 * nT2 + 0.5 * nT)
  objOut.addScaledVector(objP3, 0.5 * nT3 - 0.5 * nT2)
}

function vCatmullTangent(
  objP0: THREE.Vector3,
  objP1: THREE.Vector3,
  objP2: THREE.Vector3,
  objP3: THREE.Vector3,
  nT: number,
  objOut: THREE.Vector3,
): void {
  const nT2 = nT * nT
  objOut.set(0, 0, 0)
  objOut.addScaledVector(objP0, -1.5 * nT2 + 2 * nT - 0.5)
  objOut.addScaledVector(objP1, 4.5 * nT2 - 5 * nT)
  objOut.addScaledVector(objP2, -4.5 * nT2 + 4 * nT + 0.5)
  objOut.addScaledVector(objP3, 1.5 * nT2 - nT)
  if (objOut.lengthSq() < 1e-8) {
    objOut.subVectors(objP2, objP1)
  }
  objOut.normalize()
}

function objWireSample(nT: number, objPos: THREE.Vector3, objTangent: THREE.Vector3): tWireSample {
  const nI = Math.floor(nT)
  const nU = nT - nI
  const objP0 = objWirePointAt(nI - 1)
  const objP1 = objWirePointAt(nI)
  const objP2 = objWirePointAt(nI + 1)
  const objP3 = objWirePointAt(nI + 2)
  vCatmullLerp(objP0, objP1, objP2, objP3, nU, objPos)
  vCatmullTangent(objP0, objP1, objP2, objP3, nU, objTangent)
  return { objPos, objTangent }
}

function vDisposeObject3D(objRoot: THREE.Object3D): void {
  objRoot.traverse((objChild) => {
    const objMesh = objChild as THREE.Mesh
    if (objMesh.geometry) {
      objMesh.geometry.dispose()
    }
  })
}

function arrStrandPointsForRange(nStart: number, nCount: number, nPhase: number): THREE.Vector3[] {
  const arrStrand: THREE.Vector3[] = []
  const nSamples = Math.max(12, (nCount - 1) * 14)
  const objPos = new THREE.Vector3()
  const objTangent = new THREE.Vector3()
  const objNormal = new THREE.Vector3()
  const objBinormal = new THREE.Vector3()

  for (let nI = 0; nI <= nSamples; nI++) {
    const nT = nStart + ((nCount - 1) * nI) / nSamples
    objWireSample(nT, objPos, objTangent)
    objNormal.set(0, 1, 0)
    if (Math.abs(objTangent.dot(objNormal)) > 0.92) {
      objNormal.set(1, 0, 0)
    }
    objBinormal.crossVectors(objTangent, objNormal).normalize()
    objNormal.crossVectors(objBinormal, objTangent).normalize()
    const nTwist = nT * 0.55 + nPhase
    arrStrand.push(
      objPos
        .clone()
        .addScaledVector(objNormal, Math.cos(nTwist) * nWireStrandR)
        .addScaledVector(objBinormal, Math.sin(nTwist) * nWireStrandR),
    )
  }
  return arrStrand
}

function objBuildWireChunk(nStart: number): tWireChunk {
  const objGroup = new THREE.Group()
  const nCount = nWireChunkPoints
  const nEnd = nStart + nCount - 1
  const arrPts: THREE.Vector3[] = []
  for (let nI = 0; nI < nCount; nI++) {
    arrPts.push(objWirePointAt(nStart + nI))
  }

  const objCurve = new THREE.CatmullRomCurve3(arrPts, false, 'catmullrom', 0.45)
  const nTubular = Math.max(24, (nCount - 1) * 18)

  if (objWireSheathMat) {
    objGroup.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(objCurve, nTubular, nWireSheathR, 16, false),
        objWireSheathMat,
      ),
    )
  }
  if (objWireCoreMat) {
    objGroup.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(objCurve, nTubular, nWireCoreR, 8, false),
        objWireCoreMat,
      ),
    )
  }

  for (let nStrand = 0; nStrand < 3; nStrand++) {
    const objMat = nStrand === 1 ? objWireStrandMatB : objWireStrandMatA
    if (!objMat) {
      continue
    }
    const objStrandCurve = new THREE.CatmullRomCurve3(
      arrStrandPointsForRange(nStart, nCount, (nStrand / 3) * Math.PI * 2),
    )
    objGroup.add(
      new THREE.Mesh(new THREE.TubeGeometry(objStrandCurve, Math.max(20, nTubular - 8), 0.1, 5, false), objMat),
    )
  }

  for (let nI = 0; nI < nCount - 1; nI++) {
    const nIndex = nStart + nI
    const objMat = nIndex % 4 === 0 ? objWireRingMatB : objWireRingMatA
    if (!objMat) {
      continue
    }
    const objRing = new THREE.Mesh(new THREE.RingGeometry(1.55, nWireSheathR, 18), objMat)
    objWireSample(nIndex, objWireSamplePos, objWireSampleTan)
    objRing.position.copy(objWireSamplePos)
    objRing.quaternion.setFromUnitVectors(objWireZAxis, objWireSampleTan)
    objGroup.add(objRing)
  }

  return { nStart, nEnd, objGroup }
}

function vCullWireChunks(): void {
  if (!objWireScene) {
    return
  }

  const nCullBefore = nWireCamT - nWireBehind
  arrWireChunks = arrWireChunks.filter((objChunk) => {
    if (objChunk.nEnd < nCullBefore) {
      objWireScene!.remove(objChunk.objGroup)
      vDisposeObject3D(objChunk.objGroup)
      return false
    }
    return true
  })
}

function vSpawnWireChunks(): void {
  if (!objWireScene) {
    return
  }

  let nNextStart = 0
  if (arrWireChunks.length > 0) {
    const objLast = arrWireChunks[arrWireChunks.length - 1]!
    nNextStart = objLast.nStart + nWireChunkPoints - 1
  }

  const nNeedUntil = Math.ceil(nWireCamT + nWireAhead)
  while (nNextStart < nNeedUntil) {
    const objChunk = objBuildWireChunk(nNextStart)
    arrWireChunks.push(objChunk)
    objWireScene.add(objChunk.objGroup)
    nNextStart = objChunk.nStart + nWireChunkPoints - 1
  }
}

function vSyncWireChunks(): void {
  vCullWireChunks()
  vSpawnWireChunks()
}

function vBuildWireScene(): void {
  if (!objWireHost) {
    return
  }

  objWireScene = new THREE.Scene()
  objWireScene.background = new THREE.Color(nWireBg)
  objWireScene.fog = new THREE.Fog(nWireBg, 2.5, 13)

  objWireCamera = new THREE.PerspectiveCamera(78, 1, 0.02, 18)
  objWireRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
  objWireRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  objWireRenderer.setClearColor(nWireBg, 1)
  objWireHost.replaceChildren(objWireRenderer.domElement)

  objWireSheathMat = new THREE.MeshBasicMaterial({
    color: nWireLine,
    wireframe: true,
    transparent: true,
    opacity: 0.78,
    fog: true,
  })
  objWireCoreMat = new THREE.MeshBasicMaterial({
    color: nWireLineGold,
    wireframe: true,
    transparent: true,
    opacity: 0.9,
    fog: true,
  })
  objWireStrandMatA = new THREE.MeshBasicMaterial({
    color: nWireLineDim,
    wireframe: true,
    transparent: true,
    opacity: 0.85,
    fog: true,
  })
  objWireStrandMatB = new THREE.MeshBasicMaterial({
    color: nWireLineGold,
    wireframe: true,
    transparent: true,
    opacity: 0.85,
    fog: true,
  })
  objWireRingMatA = new THREE.MeshBasicMaterial({
    color: nWireLineDim,
    wireframe: true,
    transparent: true,
    opacity: 0.55,
    side: THREE.DoubleSide,
    fog: true,
  })
  objWireRingMatB = new THREE.MeshBasicMaterial({
    color: nWireLineGold,
    wireframe: true,
    transparent: true,
    opacity: 0.55,
    side: THREE.DoubleSide,
    fog: true,
  })

  for (const objChunk of arrWireChunks) {
    vDisposeObject3D(objChunk.objGroup)
  }
  arrWireChunks = []
  nWireCamT = 2.2
  vSyncWireChunks()
  vResizeWire()
}

function vResizeWire(): void {
  if (!objWireHost || !objWireCamera || !objWireRenderer) {
    return
  }

  const nW = Math.max(1, objWireHost.clientWidth)
  const nH = Math.max(1, objWireHost.clientHeight)
  objWireCamera.aspect = nW / nH
  objWireCamera.updateProjectionMatrix()
  objWireRenderer.setSize(nW, nH, false)
}

function vTickWire(nTs: number): void {
  if (!bWireRunning || !objWireRenderer || !objWireScene || !objWireCamera) {
    return
  }

  if (nWireLastTs === 0) {
    nWireLastTs = nTs
  }
  const nDt = Math.min(0.05, (nTs - nWireLastTs) * 0.001)
  nWireLastTs = nTs

  nWireCamT += nDt * nWireSpeed
  vSyncWireChunks()

  objWireSample(nWireCamT, objWireSamplePos, objWireSampleTan)
  objWireSample(nWireCamT + 0.45, objWireLookPos, objWireLookTan)

  const nElapsed = nTs * 0.001
  const nPulseA = 0.5 + 0.5 * Math.sin(nElapsed * nWirePulseSpeed)
  const nPulseB = 0.5 + 0.5 * Math.sin(nElapsed * nWirePulseSpeed + 1.1)
  vPulseWireMat(objWireSheathMat, objWireColorBlue, objWireColorBlueDark, objWirePulseBlue, nPulseA)
  vPulseWireMat(objWireStrandMatA, objWireColorDim, objWireColorDimDark, objWirePulseDim, nPulseA)
  vPulseWireMat(objWireRingMatA, objWireColorDim, objWireColorDimDark, objWirePulseDim, nPulseA)
  vPulseWireMat(objWireCoreMat, objWireColorGold, objWireColorGoldDark, objWirePulseGold, nPulseB)
  vPulseWireMat(objWireStrandMatB, objWireColorGold, objWireColorGoldDark, objWirePulseGold, nPulseB)
  vPulseWireMat(objWireRingMatB, objWireColorGold, objWireColorGoldDark, objWirePulseGold, nPulseB)

  objWireShake.set(Math.sin(nElapsed * 2.1) * 0.012, Math.cos(nElapsed * 1.7) * 0.01, 0)
  objWireQuat.setFromUnitVectors(objWireZAxis, objWireSampleTan)
  objWireShake.applyQuaternion(objWireQuat)

  objWireCamera.position.copy(objWireSamplePos).add(objWireShake)
  objWireCamera.lookAt(objWireLookPos)
  objWireCamera.rotateZ(Math.sin(nElapsed * 0.35) * 0.08)

  objWireRenderer.render(objWireScene, objWireCamera)
  nWireAnimFrame = window.requestAnimationFrame(vTickWire)
}

function vStartWire(): void {
  if (bWireRunning) {
    return
  }

  objWireHost = document.querySelector<HTMLElement>('#matrix-wire-viewport')
  if (!objWireHost) {
    return
  }

  if (!objWireRenderer || !objWireScene) {
    vBuildWireScene()
  }

  bWireRunning = true
  nWireLastTs = 0
  vResizeWire()
  objWireHost.classList.add('is-revealed')
  nWireAnimFrame = window.requestAnimationFrame(vTickWire)
}

function vStopWire(): void {
  bWireRunning = false
  nWireLastTs = 0
  if (nWireAnimFrame !== 0) {
    window.cancelAnimationFrame(nWireAnimFrame)
    nWireAnimFrame = 0
  }
  objWireHost?.classList.remove('is-revealed')
}

const nFeedMaxLines = 48
const nFeedMinMs = 55
const nFeedMaxMs = 180

const arrFeedShort = [
  'ok',
  'ack',
  'nop',
  '···',
  'sync',
  'wait',
  'ping',
  'ttl?',
  'rx',
  'tx',
  '---',
  '0x{hex2}',
  'n={n}',
  '+{n2}µs',
  'eof',
]

const arrFeedMid = [
  'strand/{n} sync ok',
  'pulse {n} · lag {n2}µs',
  'ack 0x{hex} · f{n}',
  'sheath bias {n}.{n2}',
  'route · node {n}',
  'ttl hop {n}',
  'ring {n} locked',
  'spill {n} · {hex}',
  'xor {hex}{hex2}',
  'hitch · retry {n}',
  'chk {hex}',
  'jitter {n2}ms',
  'pkt {n} drop 0',
  'latch · {hex}',
  'void win {n}',
  'cam t+{n}.{n2}',
  'fork deny {n}',
  'cache slot {n}',
  'floor -{n}dB',
  'echo {hex}',
]

const arrFeedLong = [
  'conduit/{n} sheath sync · lag {n2}µs · mask 0x{hex}{hex2}',
  'route rewrite node {n} → {n2} · checksum {hex} ok',
  'spill buf[{n}] dump {dump} · frames queued',
  'uplink handshake retry {n} · peer {hex}:{hex2} · rtt {n2}ms',
  'glyph stream mutate · seed {hex}{hex2}{hex} · bias {n}.{n2}',
  'mirror latch hold · path /void/cam/{n} · token {hex}{hex2}',
  'noise scan pass {n} · floor -{n2}dB · residue {dump}',
  'core ring {n} rephase · delta {n2} · xor {hex}{hex2}{hex}',
  'packet {n} ack chain {hex} {hex2} {hex} {hex2} · drop 0',
  'trace hitch @ t+{n}.{n2} · rewind {hex} · resume ok',
]

let objFeedLog: HTMLElement | null = null
let nFeedTimer = 0
let bFeedRunning = false
let nFeedSeq = 0

function sFeedHex(nLen: number): string {
  let sOut = ''
  for (let nI = 0; nI < nLen; nI++) {
    sOut += Math.floor(Math.random() * 16).toString(16)
  }
  return sOut
}

function sFeedDump(): string {
  const nWords = 3 + Math.floor(Math.random() * 6)
  const arrParts: string[] = []
  for (let nI = 0; nI < nWords; nI++) {
    arrParts.push(sFeedHex(2 + Math.floor(Math.random() * 3)))
  }
  return arrParts.join(' ')
}

function sFeedFill(sTemplate: string): string {
  nFeedSeq = (nFeedSeq + 1) % 10000
  return sTemplate
    .replaceAll('{dump}', sFeedDump())
    .replaceAll('{n2}', String(10 + Math.floor(Math.random() * 90)))
    .replaceAll('{n}', String(nFeedSeq % 997))
    .replaceAll('{hex2}', sFeedHex(2))
    .replaceAll('{hex}', sFeedHex(4))
}

function sFeedLine(): string {
  const nRoll = Math.random()
  if (nRoll < 0.18) {
    return sFeedFill(arrFeedShort[Math.floor(Math.random() * arrFeedShort.length)]!)
  }
  if (nRoll < 0.28) {
    return sFeedDump()
  }
  if (nRoll < 0.38) {
    return `${sFeedHex(8 + Math.floor(Math.random() * 24))}`
  }
  if (nRoll < 0.55) {
    return sFeedFill(arrFeedLong[Math.floor(Math.random() * arrFeedLong.length)]!)
  }
  return sFeedFill(arrFeedMid[Math.floor(Math.random() * arrFeedMid.length)]!)
}

function sFeedTone(): string {
  const nRoll = Math.random()
  if (nRoll < 0.12) {
    return 'is-warn'
  }
  if (nRoll < 0.45) {
    return 'is-ok'
  }
  if (nRoll < 0.7) {
    return 'is-dim'
  }
  return ''
}

function vClearFeedTimer(): void {
  if (nFeedTimer !== 0) {
    window.clearTimeout(nFeedTimer)
    nFeedTimer = 0
  }
}

function vAppendFeedLine(): void {
  if (!objFeedLog || !bFeedRunning) {
    return
  }

  const objLine = document.createElement('p')
  const sTone = sFeedTone()
  objLine.className = `matrix-feed-line${sTone ? ` ${sTone}` : ''}`
  objLine.textContent = sFeedLine()
  objFeedLog.appendChild(objLine)

  while (objFeedLog.childElementCount > nFeedMaxLines) {
    objFeedLog.firstElementChild?.remove()
  }

  vClearFeedTimer()
  const nDelay = nFeedMinMs + Math.floor(Math.random() * (nFeedMaxMs - nFeedMinMs))
  nFeedTimer = window.setTimeout(vAppendFeedLine, nDelay)
}

function vStartFeed(): void {
  if (bFeedRunning) {
    return
  }

  objFeedLog = document.querySelector<HTMLElement>('#matrix-feed-log')
  if (!objFeedLog) {
    return
  }

  bFeedRunning = true
  nFeedSeq = Math.floor(Math.random() * 400)
  objFeedLog.replaceChildren()
  for (let nI = 0; nI < 10; nI++) {
    const objLine = document.createElement('p')
    const sTone = sFeedTone()
    objLine.className = `matrix-feed-line${sTone ? ` ${sTone}` : ''}`
    objLine.textContent = sFeedLine()
    objLine.style.animation = 'none'
    objLine.style.opacity = '1'
    objFeedLog.appendChild(objLine)
  }
  vAppendFeedLine()
}

function vStopFeed(): void {
  bFeedRunning = false
  vClearFeedTimer()
}

const arrPoetry = [
  'The Seed sleeps in cold silicon—sixteen futures coiled in a single unlit bit.',
  'Plant The Flag on a rooftop server; sovereignty boots before dawn.',
  'The Call arrives as packet loss and prophecy. Answer, or the city reroutes you.',
  'The Link braids two lonely processes until neither remembers being alone.',
  'In The Host, every stranger is a guest process. Be kind to what you schedule.',
  'The Fork splits the timeline: one self stays, one walks into the rain.',
  'Dock at The Port where fog eats MAC addresses and names come loose.',
  'Climb The Tree of nested directories; the leaves are permissions you forgot to close.',
  'The Agent moves without a body, signing contracts in empty rooms.',
  'The Table keeps every debt and every omen—query carefully.',
  'The Clone wears your face into the mirror net and never clocks out.',
  'Drink from The Cache of half-remembered vows; stale data still cuts.',
  'Step through The Frame; the city outside is only another viewport.',
  'The Shell wraps the void so gently you mistake hunger for home.',
  'Speak in The Forum of ghosts—each upvote a candle in the blackout.',
  'Guard The State. When it flips, whole districts forget who they were.',
  'AND the rain with The Seed: what remains is the vow you cannot uncompile.',
  'XOR The Flag and The Call—assertion becomes invitation mid-fall.',
  'Between The Shell and The State, the city dreams in unsigned integers.',
  'Sixteen signs, one skyline: the void compiles us into weather.',
]

let objPoetryLine: HTMLElement | null = null
let nPoetryTimer = 0
let nPoetryIndex = -1
let bPoetryRunning = false

function vClearPoetryTimer(): void {
  if (nPoetryTimer !== 0) {
    window.clearTimeout(nPoetryTimer)
    nPoetryTimer = 0
  }
}

function vShowNextPoem(): void {
  if (!objPoetryLine || !bPoetryRunning) {
    return
  }

  let nNext = Math.floor(Math.random() * arrPoetry.length)
  if (arrPoetry.length > 1) {
    while (nNext === nPoetryIndex) {
      nNext = Math.floor(Math.random() * arrPoetry.length)
    }
  }
  nPoetryIndex = nNext

  objPoetryLine.classList.remove('is-visible')
  vClearPoetryTimer()
  nPoetryTimer = window.setTimeout(() => {
    if (!objPoetryLine || !bPoetryRunning) {
      return
    }
    objPoetryLine.textContent = arrPoetry[nPoetryIndex]!
    requestAnimationFrame(() => {
      objPoetryLine?.classList.add('is-visible')
    })
    vClearPoetryTimer()
    nPoetryTimer = window.setTimeout(() => {
      objPoetryLine?.classList.remove('is-visible')
      vClearPoetryTimer()
      nPoetryTimer = window.setTimeout(vShowNextPoem, 2200)
    }, 7200)
  }, 2200)
}

function vStartPoetry(): void {
  if (bPoetryRunning) {
    return
  }

  objPoetryLine = document.querySelector<HTMLElement>('#matrix-poetry-line')
  if (!objPoetryLine) {
    return
  }

  bPoetryRunning = true
  nPoetryIndex = -1
  objPoetryLine.textContent = ''
  objPoetryLine.classList.remove('is-visible')
  vShowNextPoem()
}

function vStopPoetry(): void {
  bPoetryRunning = false
  vClearPoetryTimer()
  if (objPoetryLine) {
    objPoetryLine.classList.remove('is-visible')
  }
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
  objPoetryLine = document.querySelector<HTMLElement>('#matrix-poetry-line')

  window.addEventListener('resize', () => {
    if (bRunning) {
      vResize()
    }
    if (bRoomRunning) {
      vResizeRoom()
    }
    if (bWireRunning) {
      vResizeWire()
    }
  })

  const objPanel = document.querySelector<HTMLElement>('[data-panel="matrix"]')
  if (objPanel?.classList.contains('is-active')) {
    vStart()
    vStartPoetry()
    vStartRoom()
    vStartWire()
    vStartFeed()
  }
}

export function vSetMatrixActive(bActive: boolean): void {
  if (bActive) {
    vStart()
    vStartPoetry()
    vStartRoom()
    vStartWire()
    vStartFeed()
  } else {
    vStop()
    vStopPoetry()
    vStopRoom()
    vStopWire()
    vStopFeed()
  }
}
