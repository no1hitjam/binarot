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
    <div class="matrix-agent" id="matrix-agent">
      <div class="matrix-agent-viewport" id="matrix-agent-viewport" aria-hidden="true"></div>
      <p class="matrix-agent-caption">node 09 · operator</p>
    </div>
    <div class="matrix-talk" id="matrix-talk">
      <div class="matrix-talk-bar">
        <span class="matrix-talk-traffic" aria-hidden="true"></span>
        <span class="matrix-talk-title">uplink · operator channel</span>
      </div>
      <div class="matrix-talk-log" id="matrix-talk-log" aria-live="polite"></div>
      <div class="matrix-talk-choices" id="matrix-talk-choices" hidden></div>
      <p class="matrix-talk-caption">tty 21 · dialogue</p>
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

const nAgentLine = 0x6a78e8
const nAgentLineDim = 0x3d4578
const nAgentLineGold = 0xc4a030
const nAgentBg = 0x050308
const nAgentKeyR = 255
const nAgentKeyG = 0
const nAgentKeyB = 255
const nAgentKeyTol = 72
const nAgentFigureH = 2.35
const nAgentParticleCount = 110
const nAgentFadeOutMs = 700
const nAgentFadeInMs = 700
const arrAgentImageUrls = [
  `${import.meta.env.BASE_URL}matrix-hacker.png`,
  `${import.meta.env.BASE_URL}matrix-hacker-f.png`,
]

let objAgentHost: HTMLElement | null = null
let objAgentScene: THREE.Scene | null = null
let objAgentCamera: THREE.PerspectiveCamera | null = null
let objAgentRenderer: THREE.WebGLRenderer | null = null
let arrAgentFigures: THREE.Mesh[] = []
let arrAgentFigureMats: THREE.MeshBasicMaterial[] = []
let nAgentIndex = 0
let nAgentLoadCount = 0
let objAgentWorld: THREE.Group | null = null
let objAgentParticles: THREE.Points | null = null
let objAgentParticleMat: THREE.PointsMaterial | null = null
let arrAgentPVel: Float32Array | null = null
let arrAgentPLife: Float32Array | null = null
let nAgentAnimFrame = 0
let bAgentRunning = false
let nAgentStart = 0
let nAgentLastTs = 0
let bAgentLoadStarted = false
/** After boy then girl finish, pedestal stays empty until refresh. */
let bAgentSessionDone = false
/** 1 = fully present, 0 = fully gone */
let nAgentFade = 1
type tAgentFx = 'idle' | 'out' | 'gone' | 'in'
let sAgentFx: tAgentFx = 'idle'
let nAgentFxStart = 0
let fnAgentFxDone: (() => void) | null = null

function objAgentFigure(): THREE.Mesh | null {
  if (nAgentIndex < 0) {
    return null
  }
  return arrAgentFigures[nAgentIndex] ?? null
}

function objAgentFigureMat(): THREE.MeshBasicMaterial | null {
  if (nAgentIndex < 0) {
    return null
  }
  return arrAgentFigureMats[nAgentIndex] ?? null
}

function vHideInactiveAgentFigures(): void {
  for (let nI = 0; nI < arrAgentFigures.length; nI++) {
    if (nI === nAgentIndex) {
      continue
    }
    const objFig = arrAgentFigures[nI]
    const objMat = arrAgentFigureMats[nI]
    if (objFig) {
      objFig.visible = false
    }
    if (objMat) {
      objMat.opacity = 0
    }
  }
}

function bAgentHasNextFigure(): boolean {
  return nAgentIndex >= 0 && nAgentIndex < arrAgentImageUrls.length - 1
}

function vAdvanceAgentFigure(): void {
  if (!bAgentHasNextFigure()) {
    return
  }
  nAgentIndex += 1
  vHideInactiveAgentFigures()
}

function vClearAgentFigures(): void {
  nAgentIndex = -1
  nAgentFade = 0
  sAgentFx = 'gone'
  for (let nI = 0; nI < arrAgentFigures.length; nI++) {
    const objFig = arrAgentFigures[nI]
    const objMat = arrAgentFigureMats[nI]
    if (objFig) {
      objFig.visible = false
    }
    if (objMat) {
      objMat.opacity = 0
    }
  }
  if (objAgentParticles) {
    objAgentParticles.visible = false
  }
  if (objAgentParticleMat) {
    objAgentParticleMat.opacity = 0
  }
}

function objAgentKeyTexture(objSource: HTMLImageElement): THREE.CanvasTexture {
  const objCanvas = document.createElement('canvas')
  objCanvas.width = objSource.naturalWidth || objSource.width
  objCanvas.height = objSource.naturalHeight || objSource.height
  const objCtx = objCanvas.getContext('2d')
  if (!objCtx) {
    return new THREE.CanvasTexture(objCanvas)
  }

  objCtx.drawImage(objSource, 0, 0)
  const objImage = objCtx.getImageData(0, 0, objCanvas.width, objCanvas.height)
  const arrData = objImage.data
  for (let nI = 0; nI < arrData.length; nI += 4) {
    const nR = arrData[nI]!
    const nG = arrData[nI + 1]!
    const nB = arrData[nI + 2]!
    const nDr = nR - nAgentKeyR
    const nDg = nG - nAgentKeyG
    const nDb = nB - nAgentKeyB
    const nDist = Math.sqrt(nDr * nDr + nDg * nDg + nDb * nDb)
    if (nDist < nAgentKeyTol) {
      arrData[nI + 3] = 0
      continue
    }

    // Soften magenta bleed through translucent holograms / fringes.
    const nMagenta = Math.min(nR, nB) - nG
    if (nMagenta > 28) {
      const nPull = Math.min(1, (nMagenta - 28) / 140)
      arrData[nI] = Math.round(nR - nMagenta * nPull * 0.85)
      arrData[nI + 2] = Math.round(nB - nMagenta * nPull * 0.85)
      arrData[nI + 3] = Math.round(arrData[nI + 3]! * (1 - nPull * 0.55))
    }
  }
  objCtx.putImageData(objImage, 0, 0)

  const objTex = new THREE.CanvasTexture(objCanvas)
  objTex.colorSpace = THREE.SRGBColorSpace
  objTex.needsUpdate = true
  return objTex
}

function vBuildAgentParticles(): void {
  if (!objAgentScene || objAgentParticles) {
    return
  }

  const arrPos = new Float32Array(nAgentParticleCount * 3)
  const arrCol = new Float32Array(nAgentParticleCount * 3)
  arrAgentPVel = new Float32Array(nAgentParticleCount * 3)
  arrAgentPLife = new Float32Array(nAgentParticleCount)

  for (let nI = 0; nI < nAgentParticleCount; nI++) {
    arrPos[nI * 3] = 0
    arrPos[nI * 3 + 1] = -10
    arrPos[nI * 3 + 2] = 0
    const bGold = nI % 5 === 0
    if (bGold) {
      arrCol[nI * 3] = 0.77
      arrCol[nI * 3 + 1] = 0.63
      arrCol[nI * 3 + 2] = 0.19
    } else {
      arrCol[nI * 3] = 0.42
      arrCol[nI * 3 + 1] = 0.47
      arrCol[nI * 3 + 2] = 0.91
    }
    arrAgentPLife[nI] = 0
  }

  const objGeo = new THREE.BufferGeometry()
  objGeo.setAttribute('position', new THREE.BufferAttribute(arrPos, 3))
  objGeo.setAttribute('color', new THREE.BufferAttribute(arrCol, 3))

  objAgentParticleMat = new THREE.PointsMaterial({
    size: 0.055,
    vertexColors: true,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  })
  objAgentParticles = new THREE.Points(objGeo, objAgentParticleMat)
  objAgentParticles.frustumCulled = false
  objAgentParticles.visible = false
  objAgentScene.add(objAgentParticles)
}

function vSeedAgentParticles(bBurst: boolean): void {
  if (!objAgentParticles || !arrAgentPVel || !arrAgentPLife) {
    return
  }

  const objPos = objAgentParticles.geometry.getAttribute('position') as THREE.BufferAttribute
  const nCx = 0
  const nCy = nAgentFigureH * 0.52
  const nCz = 0.05

  for (let nI = 0; nI < nAgentParticleCount; nI++) {
    const nAngle = Math.random() * Math.PI * 2
    const nLift = (Math.random() - 0.35) * 1.4
    if (bBurst) {
      // Spawn inside the figure volume, fire outward.
      const nRx = (Math.random() - 0.5) * 0.7
      const nRy = Math.random() * nAgentFigureH * 0.92
      const nRz = (Math.random() - 0.5) * 0.25
      objPos.setXYZ(nI, nCx + nRx, nRy, nCz + nRz)
      const nSpeed = 0.9 + Math.random() * 1.8
      arrAgentPVel[nI * 3] = Math.cos(nAngle) * nSpeed * (0.55 + Math.random())
      arrAgentPVel[nI * 3 + 1] = nLift * nSpeed * 0.55 + 0.35
      arrAgentPVel[nI * 3 + 2] = Math.sin(nAngle) * nSpeed * (0.55 + Math.random())
    } else {
      // Spawn in a ring around the figure, pull inward.
      const nRad = 1.1 + Math.random() * 1.4
      objPos.setXYZ(
        nI,
        nCx + Math.cos(nAngle) * nRad,
        nCy + nLift * 0.85,
        nCz + Math.sin(nAngle) * nRad * 0.65,
      )
      const nTx = nCx + (Math.random() - 0.5) * 0.35
      const nTy = Math.random() * nAgentFigureH * 0.9
      const nTz = nCz + (Math.random() - 0.5) * 0.15
      const nDx = nTx - objPos.getX(nI)
      const nDy = nTy - objPos.getY(nI)
      const nDz = nTz - objPos.getZ(nI)
      const nSpeed = 1.2 + Math.random() * 1.6
      arrAgentPVel[nI * 3] = nDx * nSpeed
      arrAgentPVel[nI * 3 + 1] = nDy * nSpeed
      arrAgentPVel[nI * 3 + 2] = nDz * nSpeed
    }
    arrAgentPLife[nI] = 0.55 + Math.random() * 0.45
  }

  objPos.needsUpdate = true
  objAgentParticles.visible = true
  if (objAgentParticleMat) {
    objAgentParticleMat.opacity = 1
  }
}

function vApplyAgentFade(): void {
  const objMat = objAgentFigureMat()
  const objFig = objAgentFigure()
  if (objMat) {
    objMat.opacity = nAgentFade
  }
  if (objFig) {
    objFig.visible = nAgentFade > 0.02
  }
  vHideInactiveAgentFigures()
}

function vResetAgentFx(): void {
  fnAgentFxDone = null
  if (bAgentSessionDone) {
    vClearAgentFigures()
    return
  }
  sAgentFx = 'idle'
  nAgentFade = 1
  vApplyAgentFade()
  if (objAgentParticles) {
    objAgentParticles.visible = false
  }
  if (objAgentParticleMat) {
    objAgentParticleMat.opacity = 0
  }
}

function vStartAgentFadeOut(fnDone: () => void): void {
  sAgentFx = 'out'
  nAgentFxStart = performance.now()
  fnAgentFxDone = fnDone
  nAgentFade = 1
  vApplyAgentFade()
  vSeedAgentParticles(true)
}

function vStartAgentFadeIn(fnDone: () => void): void {
  vAdvanceAgentFigure()
  sAgentFx = 'in'
  nAgentFxStart = performance.now()
  fnAgentFxDone = fnDone
  nAgentFade = 0
  vApplyAgentFade()
  const objFig = objAgentFigure()
  if (objFig) {
    objFig.visible = true
  }
  vSeedAgentParticles(false)
}

function vTickAgentParticles(nDt: number): void {
  if (!objAgentParticles || !arrAgentPVel || !arrAgentPLife || !objAgentParticleMat) {
    return
  }
  if (!objAgentParticles.visible) {
    return
  }

  const objPos = objAgentParticles.geometry.getAttribute('position') as THREE.BufferAttribute
  let nAlive = 0
  for (let nI = 0; nI < nAgentParticleCount; nI++) {
    let nLife = arrAgentPLife[nI]!
    if (nLife <= 0) {
      continue
    }
    nLife -= nDt * 0.85
    arrAgentPLife[nI] = nLife
    if (nLife <= 0) {
      objPos.setY(nI, -10)
      continue
    }
    nAlive++
    const nX = objPos.getX(nI) + arrAgentPVel[nI * 3]! * nDt
    const nY = objPos.getY(nI) + arrAgentPVel[nI * 3 + 1]! * nDt
    const nZ = objPos.getZ(nI) + arrAgentPVel[nI * 3 + 2]! * nDt
    objPos.setXYZ(nI, nX, nY, nZ)
    // Drag
    arrAgentPVel[nI * 3]! *= 0.98
    arrAgentPVel[nI * 3 + 1]! *= 0.98
    arrAgentPVel[nI * 3 + 2]! *= 0.98
    if (sAgentFx === 'out') {
      arrAgentPVel[nI * 3 + 1]! += nDt * 0.55
    }
  }
  objPos.needsUpdate = true

  const nFxAge =
    sAgentFx === 'out' || sAgentFx === 'in'
      ? (performance.now() - nAgentFxStart) / (sAgentFx === 'out' ? nAgentFadeOutMs : nAgentFadeInMs)
      : 1
  const nBurst = sAgentFx === 'out' ? 1 - Math.min(1, nFxAge) : Math.min(1, nFxAge)
  objAgentParticleMat.opacity = Math.max(0, Math.min(1, nBurst * 1.15)) * (nAlive > 0 ? 1 : 0)
  if (nAlive === 0 && (sAgentFx === 'idle' || sAgentFx === 'gone')) {
    objAgentParticles.visible = false
  }
}

function vTickAgentFx(): void {
  if (sAgentFx !== 'out' && sAgentFx !== 'in') {
    return
  }

  const nDur = sAgentFx === 'out' ? nAgentFadeOutMs : nAgentFadeInMs
  const nT = Math.min(1, Math.max(0, (performance.now() - nAgentFxStart) / nDur))
  // Smoothstep
  const nS = nT * nT * (3 - 2 * nT)
  nAgentFade = sAgentFx === 'out' ? 1 - nS : nS
  vApplyAgentFade()

  if (nT >= 1) {
    const fnDone = fnAgentFxDone
    fnAgentFxDone = null
    if (sAgentFx === 'out') {
      sAgentFx = 'gone'
      nAgentFade = 0
      vApplyAgentFade()
    } else {
      sAgentFx = 'idle'
      nAgentFade = 1
      vApplyAgentFade()
    }
    fnDone?.()
  }
}

function vLoadAgentFigures(): void {
  if (!objAgentScene || bAgentLoadStarted) {
    return
  }
  bAgentLoadStarted = true

  for (let nSlot = 0; nSlot < arrAgentImageUrls.length; nSlot++) {
    const nIndex = nSlot
    const sUrl = arrAgentImageUrls[nIndex]!
    const objImg = new Image()
    objImg.decoding = 'async'
    objImg.onload = () => {
      if (!objAgentScene) {
        return
      }

      const objTex = objAgentKeyTexture(objImg)
      const nAspect = (objImg.naturalWidth || objImg.width) / (objImg.naturalHeight || objImg.height)
      const nH = nAgentFigureH
      const nW = nH * nAspect
      const objMat = new THREE.MeshBasicMaterial({
        map: objTex,
        transparent: true,
        opacity: nIndex === nAgentIndex ? nAgentFade : 0,
        alphaTest: 0.04,
        depthWrite: false,
        side: THREE.DoubleSide,
      })
      const objMesh = new THREE.Mesh(new THREE.PlaneGeometry(nW, nH), objMat)
      objMesh.position.set(0, nH * 0.5, 0)
      objMesh.visible = nIndex === nAgentIndex && nAgentFade > 0.02
      objAgentScene.add(objMesh)
      arrAgentFigureMats[nIndex] = objMat
      arrAgentFigures[nIndex] = objMesh
      nAgentLoadCount++
      if (nIndex === nAgentIndex) {
        vApplyAgentFade()
      }
    }
    objImg.onerror = () => {
      console.warn(`matrix agent: failed to load operator cutout (${sUrl})`)
    }
    objImg.src = sUrl
  }
}

function vBuildAgentScene(): void {
  if (!objAgentHost) {
    return
  }

  objAgentScene = new THREE.Scene()
  objAgentScene.background = new THREE.Color(nAgentBg)
  objAgentScene.fog = new THREE.Fog(nAgentBg, 6.5, 18)

  objAgentCamera = new THREE.PerspectiveCamera(42, 1, 0.05, 40)
  objAgentCamera.position.set(0, 1.35, 4.6)

  objAgentRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
  objAgentRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  objAgentRenderer.setClearColor(nAgentBg, 1)
  objAgentHost.replaceChildren(objAgentRenderer.domElement)

  objAgentWorld = new THREE.Group()
  objAgentScene.add(objAgentWorld)

  // Infinite-feeling wire floor grid facing the camera.
  const objGrid = new THREE.GridHelper(18, 28, nAgentLineDim, nAgentLineDim)
  objGrid.position.y = 0
  const objGridMat = objGrid.material
  if (Array.isArray(objGridMat)) {
    for (const objMat of objGridMat) {
      objMat.transparent = true
      objMat.opacity = 0.45
    }
  } else {
    objGridMat.transparent = true
    objGridMat.opacity = 0.45
  }
  objAgentWorld.add(objGrid)

  // Rear wall frame
  objAgentWorld.add(objWireBox(7.2, 3.4, 0.04, nAgentLineDim, 0, 1.7, -3.2))
  objAgentWorld.add(objWireBox(4.4, 2.4, 0.03, nAgentLine, 0, 1.55, -3.15))

  // Side pylons
  objAgentWorld.add(objWireBox(0.18, 2.8, 0.18, nAgentLine, -2.55, 1.4, -1.1))
  objAgentWorld.add(objWireBox(0.18, 2.8, 0.18, nAgentLine, 2.55, 1.4, -1.1))
  objAgentWorld.add(objWireBox(0.12, 2.2, 0.12, nAgentLineDim, -2.55, 1.1, 0.6))
  objAgentWorld.add(objWireBox(0.12, 2.2, 0.12, nAgentLineDim, 2.55, 1.1, 0.6))

  // Floating node cubes
  const arrNodes: Array<[number, number, number, number]> = [
    [-1.85, 2.15, -1.8, 0.28],
    [1.95, 2.35, -1.55, 0.22],
    [-2.2, 0.55, -0.4, 0.18],
    [2.15, 0.7, -0.55, 0.2],
    [0.0, 2.75, -2.4, 0.16],
  ]
  for (const [nX, nY, nZ, nS] of arrNodes) {
    objAgentWorld.add(objWireBox(nS, nS, nS, nAgentLineGold, nX, nY, nZ))
  }

  // Pedestal ring under the operator
  objAgentWorld.add(objWireBox(1.15, 0.04, 1.15, nAgentLine, 0, 0.02, 0.05))
  objAgentWorld.add(objWireBox(0.85, 0.03, 0.85, nAgentLineGold, 0, 0.05, 0.05))

  objAgentCamera.lookAt(0, 1.15, 0)
  vBuildAgentParticles()
  vLoadAgentFigures()
  vResizeAgent()
}

function vResizeAgent(): void {
  if (!objAgentHost || !objAgentCamera || !objAgentRenderer) {
    return
  }

  const nW = Math.max(1, objAgentHost.clientWidth)
  const nH = Math.max(1, objAgentHost.clientHeight)
  objAgentCamera.aspect = nW / nH
  objAgentCamera.updateProjectionMatrix()
  objAgentRenderer.setSize(nW, nH, false)
}

function vTickAgent(): void {
  if (!bAgentRunning || !objAgentRenderer || !objAgentScene || !objAgentCamera) {
    return
  }

  const nNow = performance.now()
  const nDt = nAgentLastTs === 0 ? 0.016 : Math.min(0.05, (nNow - nAgentLastTs) * 0.001)
  nAgentLastTs = nNow

  const nT = (nNow - nAgentStart) * 0.001
  objAgentCamera.position.set(
    Math.sin(nT * 0.22) * 0.35,
    1.32 + Math.sin(nT * 0.17) * 0.06,
    4.55 + Math.cos(nT * 0.19) * 0.12,
  )
  objAgentCamera.lookAt(0, 1.15 + Math.sin(nT * 0.14) * 0.02, 0)

  const objFig = objAgentFigure()
  if (objFig && sAgentFx === 'idle') {
    objFig.position.y = nAgentFigureH * 0.5 + Math.sin(nT * 1.1) * 0.025
    objFig.rotation.y = Math.sin(nT * 0.45) * 0.04
  } else if (objFig) {
    objFig.position.y = nAgentFigureH * 0.5
  }

  if (objAgentWorld) {
    objAgentWorld.rotation.y = Math.sin(nT * 0.12) * 0.03
  }

  vTickAgentFx()
  vTickAgentParticles(nDt)

  objAgentRenderer.render(objAgentScene, objAgentCamera)
  nAgentAnimFrame = window.requestAnimationFrame(vTickAgent)
}

function vStartAgent(): void {
  if (bAgentRunning) {
    return
  }

  objAgentHost = document.querySelector<HTMLElement>('#matrix-agent-viewport')
  if (!objAgentHost) {
    return
  }

  if (!objAgentRenderer || !objAgentScene) {
    vBuildAgentScene()
  }

  bAgentRunning = true
  nAgentStart = performance.now()
  nAgentLastTs = 0
  vResetAgentFx()
  vResizeAgent()
  objAgentHost.classList.add('is-revealed')
  nAgentAnimFrame = window.requestAnimationFrame(vTickAgent)
}

function vStopAgent(): void {
  bAgentRunning = false
  nAgentLastTs = 0
  vResetAgentFx()
  if (nAgentAnimFrame !== 0) {
    window.cancelAnimationFrame(nAgentAnimFrame)
    nAgentAnimFrame = 0
  }
  objAgentHost?.classList.remove('is-revealed')
}

type tTalkChoice = {
  sLabel: string
  sNext: string
}

type tTalkNode = {
  sId: string
  arrSys?: string[]
  arrThem?: string[]
  arrChoices?: tTalkChoice[]
  bRestart?: boolean
  /** After this node, vanish and restart the same dialogue. */
  bLoop?: boolean
}

const sTalkStartId = 'start'

const mapTalkNodesGuy: Record<string, tTalkNode> = {
  start: {
    sId: 'start',
    arrSys: ['channel open · latency 12ms · cipher ok'],
    arrThem: ['You’re late. The rain already ate half the district.'],
    arrChoices: [
      { sLabel: 'Still reading the spill. What do you need?', sNext: 'need' },
      { sLabel: 'Took the long route through the conduit.', sNext: 'route' },
      { sLabel: 'Cut the theatrics. Open the channel.', sNext: 'blunt' },
    ],
    bRestart: true,
  },
  need: {
    sId: 'need',
    arrThem: ['A clean handshake. Say the word and I’ll open the conduit.'],
    arrChoices: [
      { sLabel: 'Handshake. Let’s go.', sNext: 'open' },
      { sLabel: 'What’s on the other side?', sNext: 'other_side' },
      { sLabel: 'Not yet. I need more signal.', sNext: 'wait' },
    ],
  },
  route: {
    sId: 'route',
    arrThem: ['Conduit’s twitchy tonight. You feel the lag?'],
    arrChoices: [
      { sLabel: 'Yeah. Glyph rain’s thicker than usual.', sNext: 'glyphs' },
      { sLabel: 'Just get me a path north.', sNext: 'open' },
      { sLabel: 'Lag’s a feature. Keeps hunters slow.', sNext: 'wait' },
    ],
  },
  blunt: {
    sId: 'blunt',
    arrThem: ['Fine. No poetry. Node 09 standing by — pick a payload.'],
    arrChoices: [
      { sLabel: 'Dump the apt cam feed.', sNext: 'cam' },
      { sLabel: 'Trace the sheath sync.', sNext: 'trace' },
      { sLabel: 'Keep the uplink idle.', sNext: 'end_idle' },
    ],
  },
  other_side: {
    sId: 'other_side',
    arrThem: [
      'Same city, different mask. Forks that never got compiled. Some of them still answer.',
    ],
    arrChoices: [
      { sLabel: 'Open it.', sNext: 'open' },
      { sLabel: 'Then I’m not ready.', sNext: 'wait' },
    ],
  },
  glyphs: {
    sId: 'glyphs',
    arrThem: ['Sixteen signs falling like weather. Don’t catch the gold ones unless you mean it.'],
    arrChoices: [
      { sLabel: 'Open the conduit.', sNext: 'open' },
      { sLabel: 'Tell me about the gold heads.', sNext: 'gold' },
      { sLabel: 'I’ll watch a while longer.', sNext: 'wait' },
    ],
  },
  gold: {
    sId: 'gold',
    arrThem: ['Gold heads are claims. Flags in the rain. Touch one and the city remembers your name.'],
    arrChoices: [
      { sLabel: 'I’ll take that risk. Open it.', sNext: 'open' },
      { sLabel: 'Remembering sounds expensive.', sNext: 'wait' },
    ],
  },
  cam: {
    sId: 'cam',
    arrThem: ['Cam 03 is yours. Don’t stare too long — rooms stare back.'],
    bLoop: true,
  },
  trace: {
    sId: 'trace',
    arrThem: ['Trace 07’s live. Sheath bias is dancing. Don’t trip the ring locks.'],
    bLoop: true,
  },
  open: {
    sId: 'open',
    arrThem: ['Handshake ack. Conduit open. Don’t waste the window.'],
    arrChoices: [
      { sLabel: 'Copy. Moving.', sNext: 'end_go' },
      { sLabel: 'Hold — one more question.', sNext: 'more' },
    ],
  },
  more: {
    sId: 'more',
    arrThem: ['Make it count.'],
    arrChoices: [
      { sLabel: 'Who are you, really?', sNext: 'who' },
      { sLabel: 'Why help me?', sNext: 'why' },
      { sLabel: 'Never mind. Moving.', sNext: 'end_go' },
    ],
  },
  who: {
    sId: 'who',
    arrThem: ['Operator. Node 09. The rest is noise the rain hasn’t eaten yet.'],
    arrChoices: [
      { sLabel: 'Fair enough.', sNext: 'end_go' },
      { sLabel: 'Leave me on standby.', sNext: 'end_idle' },
    ],
  },
  why: {
    sId: 'why',
    arrThem: ['Because someone has to keep a door unlocked. And you showed up on time enough.'],
    arrChoices: [
      { sLabel: 'Thanks. Moving.', sNext: 'end_go' },
      { sLabel: 'I’ll hold here.', sNext: 'end_idle' },
    ],
  },
  wait: {
    sId: 'wait',
    arrThem: ['Standing by. Channel stays warm.'],
    arrChoices: [
      { sLabel: 'I’m ready now.', sNext: 'need' },
      { sLabel: 'I’ll hold the line.', sNext: 'end_idle' },
    ],
  },
  end_go: {
    sId: 'end_go',
    arrThem: ['Link sealed on my side. Hunt well.'],
    arrSys: ['channel idle · window closed'],
    bLoop: true,
  },
  end_idle: {
    sId: 'end_idle',
    arrThem: ['Idle it is. Don’t ghost the uplink forever.'],
    bLoop: true,
  },
}

const mapTalkNodesGirl: Record<string, tTalkNode> = {
  start: {
    sId: 'start',
    arrSys: ['relay patch · latency 9ms · cipher ok'],
    arrThem: ['Oh good — you didn’t drop. I was about to start talking to the rain.'],
    arrChoices: [
      { sLabel: 'I’m here. What’s the job?', sNext: 'need' },
      { sLabel: 'Caught static on the way in. You clean?', sNext: 'route' },
      { sLabel: 'Skip the warm-up. Patch me through.', sNext: 'blunt' },
    ],
    bRestart: true,
  },
  need: {
    sId: 'need',
    arrThem: ['Simple. I hold the mirror open; you walk through before it forgets your shape.'],
    arrChoices: [
      { sLabel: 'Open the mirror.', sNext: 'open' },
      { sLabel: 'Forget my shape — how?', sNext: 'other_side' },
      { sLabel: 'Give me a second to lock in.', sNext: 'wait' },
    ],
  },
  route: {
    sId: 'route',
    arrThem: ['Clean enough. The sheath’s humming like it wants an audience.'],
    arrChoices: [
      { sLabel: 'That hum — glyph weather?', sNext: 'glyphs' },
      { sLabel: 'Then punch me a lane.', sNext: 'open' },
      { sLabel: 'Let it hum. I’m not rushing.', sNext: 'wait' },
    ],
  },
  blunt: {
    sId: 'blunt',
    arrThem: ['Bossy. Fine — Node 12, live board. Pick something shiny.'],
    arrChoices: [
      { sLabel: 'Give me the apt cam.', sNext: 'cam' },
      { sLabel: 'Pull the conduit trace.', sNext: 'trace' },
      { sLabel: 'Park the board. Idle.', sNext: 'end_idle' },
    ],
  },
  other_side: {
    sId: 'other_side',
    arrThem: [
      'Mirrors don’t keep guests. Stay too long and you come back wearing someone else’s lag.',
    ],
    arrChoices: [
      { sLabel: 'I’ll be quick. Open it.', sNext: 'open' },
      { sLabel: 'Yeah… hold that thought.', sNext: 'wait' },
    ],
  },
  glyphs: {
    sId: 'glyphs',
    arrThem: ['Sixteen little futures, dripping. Gold ones bite. Blue ones gossip.'],
    arrChoices: [
      { sLabel: 'Open the lane anyway.', sNext: 'open' },
      { sLabel: 'What do the gold ones want?', sNext: 'gold' },
      { sLabel: 'I’ll listen to the gossip first.', sNext: 'wait' },
    ],
  },
  gold: {
    sId: 'gold',
    arrThem: ['They want a name on file. Once the city files you, good luck becoming weather again.'],
    arrChoices: [
      { sLabel: 'File me. Open the mirror.', sNext: 'open' },
      { sLabel: 'I’d rather stay unlabeled.', sNext: 'wait' },
    ],
  },
  cam: {
    sId: 'cam',
    arrThem: ['Cam 03 unlocked. Wave at the empty chair for me.'],
    bLoop: true,
  },
  trace: {
    sId: 'trace',
    arrThem: ['Trace 07 spinning. If a ring lock winks, pretend you didn’t see it.'],
    bLoop: true,
  },
  open: {
    sId: 'open',
    arrThem: ['Mirror’s up. Don’t admire yourself — move.'],
    arrChoices: [
      { sLabel: 'Moving.', sNext: 'end_go' },
      { sLabel: 'Wait — one question.', sNext: 'more' },
    ],
  },
  more: {
    sId: 'more',
    arrThem: ['Make it cute. Or useful. Prefer useful.'],
    arrChoices: [
      { sLabel: 'Who are you under the relay?', sNext: 'who' },
      { sLabel: 'Why keep pulling me through?', sNext: 'why' },
      { sLabel: 'Forget it. Going.', sNext: 'end_go' },
    ],
  },
  who: {
    sId: 'who',
    arrThem: ['Call me the patch between dropped packets. Names are for people who stay.'],
    arrChoices: [
      { sLabel: 'Understood.', sNext: 'end_go' },
      { sLabel: 'Then stay on the line a bit.', sNext: 'end_idle' },
    ],
  },
  why: {
    sId: 'why',
    arrThem: ['Because the city edits people who walk alone. I hate bad edits.'],
    arrChoices: [
      { sLabel: 'Appreciate it. Moving.', sNext: 'end_go' },
      { sLabel: 'Then keep the patch warm.', sNext: 'end_idle' },
    ],
  },
  wait: {
    sId: 'wait',
    arrThem: ['Take your beat. I’ll keep the mirror fogged so nobody else peeks.'],
    arrChoices: [
      { sLabel: 'Ready. Open it.', sNext: 'need' },
      { sLabel: 'Hold that fog.', sNext: 'end_idle' },
    ],
  },
  end_go: {
    sId: 'end_go',
    arrThem: ['Go soft. Come back loud.'],
    arrSys: ['relay idle · mirror folded'],
    bLoop: true,
  },
  end_idle: {
    sId: 'end_idle',
    arrThem: ['Idle accepted. Don’t let the rain rewrite you while I’m gone.'],
    bLoop: true,
  },
}

const arrTalkTrees = [mapTalkNodesGuy, mapTalkNodesGirl]
const arrTalkWho = ['operator', 'relay']

function mapTalkActive(): Record<string, tTalkNode> {
  if (nAgentIndex < 0) {
    return mapTalkNodesGuy
  }
  return arrTalkTrees[nAgentIndex] ?? mapTalkNodesGuy
}

function sTalkWhoLabel(): string {
  if (nAgentIndex < 0) {
    return 'operator'
  }
  return arrTalkWho[nAgentIndex] ?? 'operator'
}

let objTalkLog: HTMLElement | null = null
let objTalkChoices: HTMLElement | null = null
let bTalkBound = false
let bTalkRunning = false
let bTalkGap = false
let nTalkGapTimer = 0
const nTalkGapMs = 2000

function vClearTalkGap(): void {
  if (nTalkGapTimer !== 0) {
    window.clearTimeout(nTalkGapTimer)
    nTalkGapTimer = 0
  }
  bTalkGap = false
  fnAgentFxDone = null
  if (sAgentFx === 'out' || sAgentFx === 'in' || sAgentFx === 'gone') {
    vResetAgentFx()
  }
}

function objTalkLine(sTone: 'sys' | 'them' | 'you', sText: string): HTMLParagraphElement {
  const objLine = document.createElement('p')
  objLine.className = `matrix-talk-line is-${sTone}`
  if (sTone === 'sys') {
    objLine.textContent = sText
    return objLine
  }

  const objWho = document.createElement('span')
  objWho.className = 'matrix-talk-who'
  objWho.textContent = sTone === 'them' ? sTalkWhoLabel() : 'you'
  objLine.append(objWho, document.createTextNode(` ${sText}`))
  return objLine
}

function vAppendTalkLine(sTone: 'sys' | 'them' | 'you', sText: string): void {
  if (!objTalkLog) {
    return
  }
  objTalkLog.appendChild(objTalkLine(sTone, sText))
  objTalkLog.scrollTop = objTalkLog.scrollHeight
}

function vClearTalkChoices(): void {
  if (!objTalkChoices) {
    return
  }
  objTalkChoices.replaceChildren()
  objTalkChoices.hidden = true
}

function vEnterTalkClosed(): void {
  if (!objTalkLog) {
    return
  }
  objTalkLog.replaceChildren()
  vAppendTalkLine('sys', 'channel closed · no operators on node')
  vClearTalkChoices()
}

function vBeginTalkGap(sNext: string, nHoldMs = 0): void {
  vClearTalkGap()
  bTalkGap = true
  vClearTalkChoices()

  const bHadNext = bAgentHasNextFigure()

  const vAfterGone = (): void => {
    if (!bTalkRunning) {
      bTalkGap = false
      return
    }

    if (!bHadNext) {
      bAgentSessionDone = true
      vClearAgentFigures()
      bTalkGap = false
      vEnterTalkClosed()
      return
    }

    nTalkGapTimer = window.setTimeout(() => {
      nTalkGapTimer = 0
      if (!bTalkRunning) {
        bTalkGap = false
        return
      }
      vStartAgentFadeIn(() => {
        bTalkGap = false
        if (!bTalkRunning) {
          return
        }
        if (sNext === sTalkStartId) {
          vEnterTalkNode(sTalkStartId)
        } else {
          vEnterTalkNode(sNext, true)
        }
      })
    }, nTalkGapMs)
  }

  const vVanish = (): void => {
    if (!bTalkRunning) {
      bTalkGap = false
      return
    }
    vAppendTalkLine(
      'sys',
      bHadNext ? 'operator offline · reacquiring…' : 'operator offline · channel closing…',
    )
    vStartAgentFadeOut(vAfterGone)
  }

  if (nHoldMs > 0) {
    nTalkGapTimer = window.setTimeout(vVanish, nHoldMs)
  } else {
    vVanish()
  }
}

function vRenderTalkChoices(arrChoices: tTalkChoice[]): void {
  if (!objTalkChoices) {
    return
  }

  objTalkChoices.replaceChildren()
  arrChoices.forEach((objChoice, nIndex) => {
    const objBtn = document.createElement('button')
    objBtn.type = 'button'
    objBtn.className = 'matrix-talk-choice'
    objBtn.dataset.next = objChoice.sNext

    const objKey = document.createElement('span')
    objKey.className = 'matrix-talk-choice-key'
    objKey.textContent = String.fromCharCode(65 + nIndex)

    const objText = document.createElement('span')
    objText.className = 'matrix-talk-choice-text'
    objText.textContent = objChoice.sLabel

    objBtn.append(objKey, objText)
    objTalkChoices!.appendChild(objBtn)
  })
  objTalkChoices.hidden = false
}

function vEnterTalkNode(sNodeId: string, bFromChoice = false): void {
  const objNode = mapTalkActive()[sNodeId]
  if (!objNode || !objTalkLog) {
    return
  }

  if (objNode.bRestart || (!bFromChoice && sNodeId === sTalkStartId)) {
    objTalkLog.replaceChildren()
  }

  for (const sSys of objNode.arrSys ?? []) {
    vAppendTalkLine('sys', sSys)
  }
  for (const sThem of objNode.arrThem ?? []) {
    vAppendTalkLine('them', sThem)
  }

  if (objNode.bLoop) {
    vClearTalkChoices()
    // Closing beat, then operator drops out for 2s and the same dialogue restarts.
    vBeginTalkGap(sTalkStartId, 900)
    return
  }

  const arrChoices = objNode.arrChoices ?? []
  if (arrChoices.length > 0) {
    vRenderTalkChoices(arrChoices)
  } else {
    vClearTalkChoices()
  }
}

function vPickTalkChoice(sNext: string, sLabel: string): void {
  if (bTalkGap) {
    return
  }

  vAppendTalkLine('you', sLabel)
  vClearTalkChoices()
  vEnterTalkNode(sNext, true)
}

function vOnTalkClick(objEvent: MouseEvent): void {
  if (bTalkGap) {
    return
  }

  const objTarget = objEvent.target
  if (!(objTarget instanceof Element)) {
    return
  }

  const objBtn = objTarget.closest<HTMLButtonElement>('.matrix-talk-choice')
  if (!objBtn || !objTalkChoices?.contains(objBtn)) {
    return
  }

  const sNext = objBtn.dataset.next
  const objText = objBtn.querySelector('.matrix-talk-choice-text')
  const sLabel = objText?.textContent?.trim() ?? ''
  if (!sNext || !sLabel) {
    return
  }

  vPickTalkChoice(sNext, sLabel)
}

function vStartTalk(): void {
  if (bTalkRunning) {
    return
  }

  objTalkLog = document.querySelector<HTMLElement>('#matrix-talk-log')
  objTalkChoices = document.querySelector<HTMLElement>('#matrix-talk-choices')
  if (!objTalkLog || !objTalkChoices) {
    return
  }

  if (!bTalkBound) {
    bTalkBound = true
    objTalkChoices.addEventListener('click', vOnTalkClick)
  }

  bTalkRunning = true
  vClearTalkGap()
  if (bAgentSessionDone) {
    vResetAgentFx()
    vEnterTalkClosed()
    return
  }
  vResetAgentFx()
  vEnterTalkNode(sTalkStartId)
}

function vStopTalk(): void {
  bTalkRunning = false
  vClearTalkGap()
  vClearTalkChoices()
  vResetAgentFx()
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
    if (bAgentRunning) {
      vResizeAgent()
    }
  })

  const objPanel = document.querySelector<HTMLElement>('[data-panel="matrix"]')
  if (objPanel?.classList.contains('is-active')) {
    vStart()
    vStartPoetry()
    vStartRoom()
    vStartWire()
    vStartFeed()
    vStartAgent()
    vStartTalk()
  }
}

export function vSetMatrixActive(bActive: boolean): void {
  if (bActive) {
    vStart()
    vStartPoetry()
    vStartRoom()
    vStartWire()
    vStartFeed()
    vStartAgent()
    vStartTalk()
  } else {
    vStop()
    vStopPoetry()
    vStopRoom()
    vStopWire()
    vStopFeed()
    vStopAgent()
    vStopTalk()
  }
}
