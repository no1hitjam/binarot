import * as THREE from 'three'
import { sCardIconPaths } from './cardIcons'

type tDiamondCard = {
  sBinaryValue: string
}

type tFloater = {
  objRoot: THREE.Object3D
  nOrbitR: number
  nOrbitY: number
  nOrbitSpeed: number
  nOrbitPhase: number
  nBobAmp: number
  nBobSpeed: number
  nBobPhase: number
  nSpinX: number
  nSpinY: number
  nSpinZ: number
}

const nShapeCount = 16
const nParticleCount = 160
const nDiamondStartDelayMs = 40
const nDiamondRadius = 1.85
const nDiamondHeight = 3.4
const nSymbolSize = 0.62

let objCanvasHost: HTMLElement | null = null
let objRenderer: THREE.WebGLRenderer | null = null
let objScene: THREE.Scene | null = null
let objCamera: THREE.PerspectiveCamera | null = null
let objRhombRoot: THREE.Group | null = null
let objFloaterRoot: THREE.Group | null = null
let objParticles: THREE.Points | null = null
let arrFloaters: tFloater[] = []
let arrBoundCards: tDiamondCard[] = []
let nAnimFrame = 0
let nStartTimer = 0
let bRunning = false
let nLastTs = 0
let nElapsed = 0
let nPointerX = 0
let nPointerY = 0
let nTargetPointerX = 0
let nTargetPointerY = 0

const objMatCore = new THREE.MeshStandardMaterial({
  color: 0x1a0f2e,
  metalness: 0.72,
  roughness: 0.28,
  emissive: 0x2a1450,
  emissiveIntensity: 0.35,
})

const objMatCoreEdge = new THREE.LineBasicMaterial({
  color: 0xe0b83a,
  transparent: true,
  opacity: 0.85,
})

const objMatGold = new THREE.MeshStandardMaterial({
  color: 0xe0b83a,
  metalness: 0.85,
  roughness: 0.22,
  emissive: 0x5a4010,
  emissiveIntensity: 0.25,
})

const objMatPurple = new THREE.MeshStandardMaterial({
  color: 0x8b4dff,
  metalness: 0.55,
  roughness: 0.35,
  emissive: 0x3a1a80,
  emissiveIntensity: 0.4,
})

const objMatVoid = new THREE.MeshStandardMaterial({
  color: 0x2a1838,
  metalness: 0.4,
  roughness: 0.55,
  emissive: 0x120820,
  emissiveIntensity: 0.2,
})

const arrFloaterMats = [objMatGold, objMatPurple, objMatVoid]

function vDrawCardIcon(
  objCtx: CanvasRenderingContext2D,
  sSlug: string,
  nOx: number,
  nOy: number,
  nSize: number,
  sStroke: string,
): void {
  const sPaths = sCardIconPaths(sSlug)
  if (!sPaths) {
    return
  }

  const nScale = nSize / 64
  objCtx.save()
  objCtx.translate(nOx, nOy)
  objCtx.scale(nScale, nScale)
  objCtx.strokeStyle = sStroke
  objCtx.lineWidth = 2.2
  objCtx.lineCap = 'round'
  objCtx.lineJoin = 'round'
  objCtx.shadowColor = sStroke
  objCtx.shadowBlur = 8

  for (const objMatch of sPaths.matchAll(/<path d="([^"]+)"/g)) {
    objCtx.stroke(new Path2D(objMatch[1]!))
  }

  for (const objMatch of sPaths.matchAll(/<circle cx="([^"]+)" cy="([^"]+)" r="([^"]+)"/g)) {
    objCtx.beginPath()
    objCtx.arc(Number(objMatch[1]), Number(objMatch[2]), Number(objMatch[3]), 0, Math.PI * 2)
    objCtx.stroke()
  }

  for (const objMatch of sPaths.matchAll(/<rect x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)"/g)) {
    objCtx.strokeRect(Number(objMatch[1]), Number(objMatch[2]), Number(objMatch[3]), Number(objMatch[4]))
  }

  objCtx.restore()
}

function objSymbolTexture(sSlug: string, bGold: boolean): THREE.CanvasTexture {
  const nSize = 256
  const objCanvas = document.createElement('canvas')
  objCanvas.width = nSize
  objCanvas.height = nSize
  const objCtx = objCanvas.getContext('2d')!

  objCtx.clearRect(0, 0, nSize, nSize)
  const sStroke = bGold ? '#ffe08a' : '#c9a0ff'
  vDrawCardIcon(objCtx, sSlug, 32, 32, 192, sStroke)

  const objTex = new THREE.CanvasTexture(objCanvas)
  objTex.colorSpace = THREE.SRGBColorSpace
  objTex.anisotropy = 4
  return objTex
}

function objDiamondGeo(nRadius: number, nHeight: number): THREE.BufferGeometry {
  // Vertical octahedron: points up/down, equatorial belt — classic diamond silhouette.
  const nHalfH = nHeight * 0.5
  const arrPos = new Float32Array([
    0, nHalfH, 0,
    nRadius, 0, 0,
    0, 0, nRadius,
    -nRadius, 0, 0,
    0, 0, -nRadius,
    0, -nHalfH, 0,
  ])
  const arrIdx = [
    0, 1, 2,
    0, 2, 3,
    0, 3, 4,
    0, 4, 1,
    5, 2, 1,
    5, 3, 2,
    5, 4, 3,
    5, 1, 4,
  ]

  const objGeo = new THREE.BufferGeometry()
  objGeo.setAttribute('position', new THREE.BufferAttribute(arrPos, 3))
  objGeo.setIndex(arrIdx)
  objGeo.computeVertexNormals()
  return objGeo
}

function objFloaterGeo(nKind: number, nScale: number): THREE.BufferGeometry {
  if (nKind === 0) {
    return new THREE.TetrahedronGeometry(nScale, 0)
  }
  if (nKind === 1) {
    return new THREE.OctahedronGeometry(nScale, 0)
  }
  if (nKind === 2) {
    return new THREE.IcosahedronGeometry(nScale, 0)
  }
  if (nKind === 3) {
    return new THREE.DodecahedronGeometry(nScale * 0.85, 0)
  }
  return objDiamondGeo(nScale, nScale * 1.7)
}

function objFloaterMotion(nI: number, nTotal: number): Omit<tFloater, 'objRoot'> {
  const nRing = 3.2 + (nI % 5) * 0.85 + (nI % 3) * 0.2
  return {
    nOrbitR: nRing,
    nOrbitY: ((nI % 9) - 4) * 0.55,
    nOrbitSpeed: 0.08 + (nI % 6) * 0.035,
    nOrbitPhase: (nI / Math.max(1, nTotal)) * Math.PI * 2,
    nBobAmp: 0.15 + (nI % 4) * 0.08,
    nBobSpeed: 0.4 + (nI % 5) * 0.15,
    nBobPhase: nI * 0.7,
    nSpinX: 0.2 + (nI % 3) * 0.15,
    nSpinY: 0.35 + (nI % 4) * 0.12,
    nSpinZ: 0.15 + (nI % 5) * 0.08,
  }
}

function vCancelPendingStart(): void {
  if (nStartTimer !== 0) {
    window.clearTimeout(nStartTimer)
    nStartTimer = 0
  }
}

function vBuildRhomb(): THREE.Group {
  const objRoot = new THREE.Group()
  const objGeo = objDiamondGeo(nDiamondRadius, nDiamondHeight)
  const objMesh = new THREE.Mesh(objGeo, objMatCore)
  objMesh.castShadow = false
  objMesh.receiveShadow = false
  objRoot.add(objMesh)

  const objEdges = new THREE.LineSegments(new THREE.EdgesGeometry(objGeo, 1), objMatCoreEdge)
  objRoot.add(objEdges)

  const objInner = new THREE.Mesh(
    objDiamondGeo(nDiamondRadius * 0.38, nDiamondHeight * 0.38),
    objMatGold,
  )
  objRoot.add(objInner)

  return objRoot
}

function vBuildFloaters(objParent: THREE.Object3D): void {
  objFloaterRoot = new THREE.Group()
  arrFloaters = []

  const nSymbolCount = arrBoundCards.length
  const nTotal = nShapeCount + nSymbolCount

  for (let nI = 0; nI < nShapeCount; nI++) {
    const nKind = nI % 5
    const nScale = 0.18 + (nI % 7) * 0.045
    const objGeo = objFloaterGeo(nKind, nScale)
    const objMat = arrFloaterMats[nI % arrFloaterMats.length]!
    const objMesh = new THREE.Mesh(objGeo, objMat)
    objFloaterRoot.add(objMesh)
    arrFloaters.push({
      objRoot: objMesh,
      ...objFloaterMotion(nI, nTotal),
    })
  }

  for (let nI = 0; nI < nSymbolCount; nI++) {
    const objCard = arrBoundCards[nI]!
    const bGold = nI % 2 === 0
    const objTex = objSymbolTexture(objCard.sBinaryValue, bGold)
    const objMat = new THREE.MeshBasicMaterial({
      map: objTex,
      transparent: true,
      opacity: 0.92,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const nPlane = nSymbolSize * (0.85 + (nI % 3) * 0.1)
    const objMesh = new THREE.Mesh(new THREE.PlaneGeometry(nPlane, nPlane), objMat)
    objFloaterRoot.add(objMesh)

    const objMotion = objFloaterMotion(nShapeCount + nI, nTotal)
    // Slower tumble so icons stay readable more often.
    arrFloaters.push({
      objRoot: objMesh,
      ...objMotion,
      nOrbitR: objMotion.nOrbitR + 0.35,
      nSpinX: objMotion.nSpinX * 0.45,
      nSpinY: objMotion.nSpinY * 0.55,
      nSpinZ: objMotion.nSpinZ * 0.4,
    })
  }

  objParent.add(objFloaterRoot)
}

function vBuildParticles(objParent: THREE.Object3D): void {
  const arrPos = new Float32Array(nParticleCount * 3)
  const arrCol = new Float32Array(nParticleCount * 3)

  for (let nI = 0; nI < nParticleCount; nI++) {
    const nI3 = nI * 3
    const nR = 4 + Math.random() * 10
    const nTheta = Math.random() * Math.PI * 2
    const nPhi = Math.acos(2 * Math.random() - 1)
    arrPos[nI3] = nR * Math.sin(nPhi) * Math.cos(nTheta)
    arrPos[nI3 + 1] = nR * Math.sin(nPhi) * Math.sin(nTheta) * 0.65
    arrPos[nI3 + 2] = nR * Math.cos(nPhi)

    const bGold = Math.random() < 0.38
    if (bGold) {
      arrCol[nI3] = 0.88
      arrCol[nI3 + 1] = 0.72
      arrCol[nI3 + 2] = 0.28
    } else {
      arrCol[nI3] = 0.55
      arrCol[nI3 + 1] = 0.32
      arrCol[nI3 + 2] = 0.95
    }
  }

  const objGeo = new THREE.BufferGeometry()
  objGeo.setAttribute('position', new THREE.BufferAttribute(arrPos, 3))
  objGeo.setAttribute('color', new THREE.BufferAttribute(arrCol, 3))

  objParticles = new THREE.Points(
    objGeo,
    new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    }),
  )
  objParent.add(objParticles)
}

function vBuildScene(): void {
  if (!objCanvasHost || objRenderer) {
    return
  }

  objScene = new THREE.Scene()
  objScene.background = new THREE.Color(0x050308)
  objScene.fog = new THREE.FogExp2(0x050308, 0.045)

  objCamera = new THREE.PerspectiveCamera(42, 1, 0.1, 80)
  objCamera.position.set(0, 1.4, 11.5)

  objRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
  objRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  objRenderer.outputColorSpace = THREE.SRGBColorSpace
  objCanvasHost.appendChild(objRenderer.domElement)

  const objAmb = new THREE.AmbientLight(0x3a2860, 0.55)
  objScene.add(objAmb)

  const objKey = new THREE.PointLight(0xc9a0ff, 2.4, 40, 2)
  objKey.position.set(4.5, 5.5, 6)
  objScene.add(objKey)

  const objFill = new THREE.PointLight(0xffe08a, 1.35, 32, 2)
  objFill.position.set(-5, -2.5, 4)
  objScene.add(objFill)

  const objCoreGlow = new THREE.PointLight(0x8b4dff, 1.8, 14, 2)
  objCoreGlow.position.set(0, 0, 0)
  objScene.add(objCoreGlow)

  objRhombRoot = vBuildRhomb()
  objScene.add(objRhombRoot)
  vBuildFloaters(objScene)
  vBuildParticles(objScene)

  objCanvasHost.classList.add('is-revealed')
  vResize()
}

function vResize(): void {
  if (!objRenderer || !objCamera || !objCanvasHost) {
    return
  }

  const nW = objCanvasHost.clientWidth
  const nH = Math.max(1, objCanvasHost.clientHeight)
  if (nW < 1) {
    return
  }

  objRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  objRenderer.setSize(nW, nH, false)
  objRenderer.domElement.style.width = `${nW}px`
  objRenderer.domElement.style.height = `${nH}px`
  objCamera.aspect = nW / nH
  objCamera.updateProjectionMatrix()
}

function vTick(nTs: number): void {
  if (!bRunning || !objRenderer || !objScene || !objCamera) {
    return
  }

  const nDt = Math.min(0.05, (nTs - nLastTs) / 1000 || 0.016)
  nLastTs = nTs
  nElapsed += nDt

  nPointerX += (nTargetPointerX - nPointerX) * Math.min(1, nDt * 3.5)
  nPointerY += (nTargetPointerY - nPointerY) * Math.min(1, nDt * 3.5)

  if (objRhombRoot) {
    objRhombRoot.rotation.y = nElapsed * 0.18
    objRhombRoot.rotation.x = 0
    objRhombRoot.rotation.z = 0
  }

  for (const objFloater of arrFloaters) {
    const nAngle = objFloater.nOrbitPhase + nElapsed * objFloater.nOrbitSpeed
    const nBob = Math.sin(nElapsed * objFloater.nBobSpeed + objFloater.nBobPhase) * objFloater.nBobAmp
    objFloater.objRoot.position.set(
      Math.cos(nAngle) * objFloater.nOrbitR,
      objFloater.nOrbitY + nBob,
      Math.sin(nAngle) * objFloater.nOrbitR,
    )
    objFloater.objRoot.rotation.x += objFloater.nSpinX * nDt
    objFloater.objRoot.rotation.y += objFloater.nSpinY * nDt
    objFloater.objRoot.rotation.z += objFloater.nSpinZ * nDt
  }

  if (objParticles) {
    objParticles.rotation.y = nElapsed * 0.04
    objParticles.rotation.x = Math.sin(nElapsed * 0.07) * 0.08
  }

  const nCamR = 11.2
  const nCamY = 1.35 + nPointerY * 0.9
  const nCamAngle = nElapsed * 0.07 + nPointerX * 0.55
  objCamera.position.set(Math.sin(nCamAngle) * nCamR, nCamY, Math.cos(nCamAngle) * nCamR)
  objCamera.lookAt(0, 0.15, 0)

  objRenderer.render(objScene, objCamera)
  nAnimFrame = window.requestAnimationFrame(vTick)
}

function vStart(): void {
  if (bRunning) {
    return
  }

  vBuildScene()
  if (!objRenderer) {
    return
  }

  bRunning = true
  nLastTs = 0
  vResize()
  nAnimFrame = window.requestAnimationFrame(vTick)
}

function vStop(): void {
  bRunning = false
  if (nAnimFrame !== 0) {
    window.cancelAnimationFrame(nAnimFrame)
    nAnimFrame = 0
  }
  nLastTs = 0
}

function vOnPointerMove(objEv: PointerEvent): void {
  if (!objCanvasHost) {
    return
  }
  const objRect = objCanvasHost.getBoundingClientRect()
  if (objRect.width < 1 || objRect.height < 1) {
    return
  }
  nTargetPointerX = ((objEv.clientX - objRect.left) / objRect.width) * 2 - 1
  nTargetPointerY = -(((objEv.clientY - objRect.top) / objRect.height) * 2 - 1)
}

function vOnPointerLeave(): void {
  nTargetPointerX = 0
  nTargetPointerY = 0
}

export function sDiamondMarkup(): string {
  return `
    <div class="diamond" id="diamond">
      <div class="diamond-viewport" id="diamond-viewport" role="img" aria-label="Diamond — a crystal among floating forms"></div>
      <p class="diamond-caption">diamond · move to drift</p>
    </div>
  `
}

function vDisposeScene(): void {
  vStop()
  if (objRenderer) {
    objRenderer.dispose()
    objRenderer.domElement.remove()
    objRenderer = null
  }
  objScene = null
  objCamera = null
  objRhombRoot = null
  objFloaterRoot = null
  objParticles = null
  arrFloaters = []
  objCanvasHost?.classList.remove('is-revealed')
}

export function vBindDiamond(arrCards: tDiamondCard[]): void {
  arrBoundCards = arrCards
  objCanvasHost = document.querySelector<HTMLElement>('#diamond-viewport')
  if (!objCanvasHost) {
    return
  }

  if (objRenderer) {
    vDisposeScene()
  }

  objCanvasHost.addEventListener('pointermove', vOnPointerMove)
  objCanvasHost.addEventListener('pointerleave', vOnPointerLeave)

  window.addEventListener('resize', () => {
    if (bRunning) {
      vResize()
    }
  })

  if (typeof ResizeObserver !== 'undefined') {
    const objObserver = new ResizeObserver(() => {
      if (bRunning || objRenderer) {
        vResize()
      }
    })
    objObserver.observe(objCanvasHost)
  }

  const objPanel = document.querySelector<HTMLElement>('[data-panel="diamond"]')
  if (objPanel?.classList.contains('is-active')) {
    vSetDiamondActive(true)
  }
}

export function vSetDiamondActive(bActive: boolean): void {
  vCancelPendingStart()
  if (!bActive) {
    vStop()
    return
  }

  if (objRenderer) {
    vStart()
    return
  }

  nStartTimer = window.setTimeout(() => {
    nStartTimer = 0
    vStart()
  }, nDiamondStartDelayMs)
}
