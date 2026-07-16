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

type tCenterKind = 'diamond' | 'icosa' | 'dodeca' | 'crystal' | 'prism'

type tTheme = {
  sId: string
  sLabel: string
  nBg: number
  nFogDensity: number
  nAmb: number
  nAmbInt: number
  nKey: number
  nKeyInt: number
  nFill: number
  nFillInt: number
  nCoreGlow: number
  nCoreGlowInt: number
  nCore: number
  nCoreEmissive: number
  nCoreEmissiveInt: number
  nEdge: number
  nInner: number
  arrFloaterColors: number[]
  arrParticleA: [number, number, number]
  arrParticleB: [number, number, number]
  nParticleGoldChance: number
  nParticleSize: number
  nParticleCount: number
  sCenter: tCenterKind
  nCenterSpin: number
  arrShapeKinds: number[]
  sSymbolA: string
  sSymbolB: string
  nCamR: number
}

const nShapeCount = 16
const nDiamondStartDelayMs = 40
const nDiamondRadius = 1.85
const nDiamondHeight = 3.4
const nSymbolSize = 0.62
const nHoldSec = 12
const nFadeSec = 5.75

const arrThemes: tTheme[] = [
  {
    sId: 'violet',
    sLabel: 'violet gold',
    nBg: 0x050308,
    nFogDensity: 0.045,
    nAmb: 0x3a2860,
    nAmbInt: 0.55,
    nKey: 0xc9a0ff,
    nKeyInt: 2.4,
    nFill: 0xffe08a,
    nFillInt: 1.35,
    nCoreGlow: 0x8b4dff,
    nCoreGlowInt: 1.8,
    nCore: 0x1a0f2e,
    nCoreEmissive: 0x2a1450,
    nCoreEmissiveInt: 0.35,
    nEdge: 0xe0b83a,
    nInner: 0xe0b83a,
    arrFloaterColors: [0xe0b83a, 0x8b4dff, 0x2a1838],
    arrParticleA: [0.88, 0.72, 0.28],
    arrParticleB: [0.55, 0.32, 0.95],
    nParticleGoldChance: 0.38,
    nParticleSize: 0.045,
    nParticleCount: 160,
    sCenter: 'diamond',
    nCenterSpin: 0.18,
    arrShapeKinds: [0, 1, 2, 3, 4],
    sSymbolA: '#ffe08a',
    sSymbolB: '#c9a0ff',
    nCamR: 11.2,
  },
  {
    sId: 'azure',
    sLabel: 'azure ember',
    nBg: 0x03060c,
    nFogDensity: 0.04,
    nAmb: 0x1a3858,
    nAmbInt: 0.6,
    nKey: 0x7ec8ff,
    nKeyInt: 2.5,
    nFill: 0xff8a4a,
    nFillInt: 1.45,
    nCoreGlow: 0x3aa0ff,
    nCoreGlowInt: 2.0,
    nCore: 0x0a1a2e,
    nCoreEmissive: 0x143a60,
    nCoreEmissiveInt: 0.4,
    nEdge: 0xff9a5a,
    nInner: 0x7ec8ff,
    arrFloaterColors: [0x7ec8ff, 0xff8a4a, 0x1a3048],
    arrParticleA: [0.95, 0.55, 0.28],
    arrParticleB: [0.4, 0.75, 1.0],
    nParticleGoldChance: 0.42,
    nParticleSize: 0.055,
    nParticleCount: 200,
    sCenter: 'icosa',
    nCenterSpin: 0.22,
    arrShapeKinds: [1, 2, 0, 2, 1],
    sSymbolA: '#7ec8ff',
    sSymbolB: '#ff9a5a',
    nCamR: 11.6,
  },
  {
    sId: 'crimson',
    sLabel: 'crimson void',
    nBg: 0x080205,
    nFogDensity: 0.05,
    nAmb: 0x4a1830,
    nAmbInt: 0.5,
    nKey: 0xff6a9a,
    nKeyInt: 2.3,
    nFill: 0xffd0a0,
    nFillInt: 1.2,
    nCoreGlow: 0xff3a6a,
    nCoreGlowInt: 1.9,
    nCore: 0x220814,
    nCoreEmissive: 0x501028,
    nCoreEmissiveInt: 0.42,
    nEdge: 0xffc8a0,
    nInner: 0xff6a9a,
    arrFloaterColors: [0xff6a9a, 0xffc8a0, 0x381018],
    arrParticleA: [1.0, 0.45, 0.55],
    arrParticleB: [0.9, 0.7, 0.35],
    nParticleGoldChance: 0.35,
    nParticleSize: 0.04,
    nParticleCount: 180,
    sCenter: 'dodeca',
    nCenterSpin: 0.14,
    arrShapeKinds: [3, 0, 3, 4, 0],
    sSymbolA: '#ffc8a0',
    sSymbolB: '#ff6a9a',
    nCamR: 12.0,
  },
  {
    sId: 'jade',
    sLabel: 'jade circuit',
    nBg: 0x030806,
    nFogDensity: 0.042,
    nAmb: 0x1a4838,
    nAmbInt: 0.58,
    nKey: 0x6affc0,
    nKeyInt: 2.35,
    nFill: 0xc8ffe0,
    nFillInt: 1.25,
    nCoreGlow: 0x2ae89a,
    nCoreGlowInt: 1.85,
    nCore: 0x0a2018,
    nCoreEmissive: 0x145038,
    nCoreEmissiveInt: 0.38,
    nEdge: 0xa0ffd0,
    nInner: 0x6affc0,
    arrFloaterColors: [0x6affc0, 0xa0d8ff, 0x183028],
    arrParticleA: [0.45, 1.0, 0.75],
    arrParticleB: [0.55, 0.85, 1.0],
    nParticleGoldChance: 0.4,
    nParticleSize: 0.038,
    nParticleCount: 220,
    sCenter: 'crystal',
    nCenterSpin: 0.26,
    arrShapeKinds: [4, 1, 4, 2, 1],
    sSymbolA: '#a0ffd0',
    sSymbolB: '#a0d8ff',
    nCamR: 10.8,
  },
  {
    sId: 'silver',
    sLabel: 'silver prism',
    nBg: 0x06070c,
    nFogDensity: 0.038,
    nAmb: 0x2a3048,
    nAmbInt: 0.62,
    nKey: 0xd0d8ff,
    nKeyInt: 2.55,
    nFill: 0xa090ff,
    nFillInt: 1.4,
    nCoreGlow: 0xb0c0ff,
    nCoreGlowInt: 1.7,
    nCore: 0x141820,
    nCoreEmissive: 0x283048,
    nCoreEmissiveInt: 0.45,
    nEdge: 0xe8ecff,
    nInner: 0xa090ff,
    arrFloaterColors: [0xe8ecff, 0xa090ff, 0x242838],
    arrParticleA: [0.9, 0.92, 1.0],
    arrParticleB: [0.65, 0.55, 1.0],
    nParticleGoldChance: 0.5,
    nParticleSize: 0.05,
    nParticleCount: 170,
    sCenter: 'prism',
    nCenterSpin: 0.16,
    arrShapeKinds: [0, 3, 1, 0, 3],
    sSymbolA: '#e8ecff',
    sSymbolB: '#a090ff',
    nCamR: 11.4,
  },
]

let objCanvasHost: HTMLElement | null = null
let objCaption: HTMLElement | null = null
let objRenderer: THREE.WebGLRenderer | null = null
let objScene: THREE.Scene | null = null
let objCamera: THREE.PerspectiveCamera | null = null
let objWorld: THREE.Group | null = null
let objRhombRoot: THREE.Group | null = null
let objFloaterRoot: THREE.Group | null = null
let objParticles: THREE.Points | null = null
let objAmb: THREE.AmbientLight | null = null
let objKey: THREE.PointLight | null = null
let objFill: THREE.PointLight | null = null
let objCoreGlow: THREE.PointLight | null = null
let arrFloaters: tFloater[] = []
let arrBoundCards: tDiamondCard[] = []
let arrFloaterMats: THREE.MeshStandardMaterial[] = []
let objMatCore: THREE.MeshStandardMaterial | null = null
let objMatCoreEdge: THREE.LineBasicMaterial | null = null
let objMatInner: THREE.MeshStandardMaterial | null = null
let nAnimFrame = 0
let nStartTimer = 0
let bRunning = false
let nLastTs = 0
let nElapsed = 0
let nPointerX = 0
let nPointerY = 0
let nTargetPointerX = 0
let nTargetPointerY = 0
let nThemeIndex = 0
let nBlendFrom = 0
let nBlendTo = 0
let nSceneClock = 0
let nFade = 1
let sFadePhase: 'in' | 'hold' | 'out' = 'hold'
let nCenterSpin = 0.18
let nCamR = 11.2

const objColorFrom = new THREE.Color()
const objColorTo = new THREE.Color()
const objColorMix = new THREE.Color()

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

function objSymbolTexture(sSlug: string, sStroke: string): THREE.CanvasTexture {
  const nSize = 256
  const objCanvas = document.createElement('canvas')
  objCanvas.width = nSize
  objCanvas.height = nSize
  const objCtx = objCanvas.getContext('2d')!

  objCtx.clearRect(0, 0, nSize, nSize)
  vDrawCardIcon(objCtx, sSlug, 32, 32, 192, sStroke)

  const objTex = new THREE.CanvasTexture(objCanvas)
  objTex.colorSpace = THREE.SRGBColorSpace
  objTex.anisotropy = 4
  return objTex
}

function objDiamondGeo(nRadius: number, nHeight: number): THREE.BufferGeometry {
  const nHalfH = nHeight * 0.5
  const arrPos = new Float32Array([
    0, nHalfH, 0,
    nRadius, 0, 0,
    0, 0, nRadius,
    -nRadius, 0, 0,
    0, 0, -nRadius,
    0, -nHalfH, 0,
  ])
  const arrIdx = [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 1, 5, 2, 1, 5, 3, 2, 5, 4, 3, 5, 1, 4]

  const objGeo = new THREE.BufferGeometry()
  objGeo.setAttribute('position', new THREE.BufferAttribute(arrPos, 3))
  objGeo.setIndex(arrIdx)
  objGeo.computeVertexNormals()
  return objGeo
}

function objPrismGeo(nRadius: number, nHeight: number): THREE.BufferGeometry {
  // Triangular bipyramid — prismatic diamond standing upright.
  const nHalfH = nHeight * 0.5
  const nA = (Math.PI * 2) / 3
  const arrPos = new Float32Array([
    0, nHalfH, 0,
    Math.cos(0) * nRadius, 0, Math.sin(0) * nRadius,
    Math.cos(nA) * nRadius, 0, Math.sin(nA) * nRadius,
    Math.cos(nA * 2) * nRadius, 0, Math.sin(nA * 2) * nRadius,
    0, -nHalfH, 0,
  ])
  const arrIdx = [0, 1, 2, 0, 2, 3, 0, 3, 1, 4, 2, 1, 4, 3, 2, 4, 1, 3]

  const objGeo = new THREE.BufferGeometry()
  objGeo.setAttribute('position', new THREE.BufferAttribute(arrPos, 3))
  objGeo.setIndex(arrIdx)
  objGeo.computeVertexNormals()
  return objGeo
}

function objCenterGeo(sKind: tCenterKind): THREE.BufferGeometry {
  if (sKind === 'icosa') {
    return new THREE.IcosahedronGeometry(nDiamondRadius * 1.15, 0)
  }
  if (sKind === 'dodeca') {
    return new THREE.DodecahedronGeometry(nDiamondRadius * 1.05, 0)
  }
  if (sKind === 'crystal') {
    return objDiamondGeo(nDiamondRadius * 0.72, nDiamondHeight * 1.35)
  }
  if (sKind === 'prism') {
    return objPrismGeo(nDiamondRadius * 1.05, nDiamondHeight * 1.1)
  }
  return objDiamondGeo(nDiamondRadius, nDiamondHeight)
}

function objInnerGeo(sKind: tCenterKind): THREE.BufferGeometry {
  if (sKind === 'icosa') {
    return new THREE.IcosahedronGeometry(nDiamondRadius * 0.42, 0)
  }
  if (sKind === 'dodeca') {
    return new THREE.DodecahedronGeometry(nDiamondRadius * 0.38, 0)
  }
  if (sKind === 'crystal') {
    return objDiamondGeo(nDiamondRadius * 0.28, nDiamondHeight * 0.5)
  }
  if (sKind === 'prism') {
    return objPrismGeo(nDiamondRadius * 0.4, nDiamondHeight * 0.42)
  }
  return objDiamondGeo(nDiamondRadius * 0.38, nDiamondHeight * 0.38)
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

function vDisposeObject(objRoot: THREE.Object3D): void {
  objRoot.traverse((objChild) => {
    const objMesh = objChild as THREE.Mesh
    if (objMesh.geometry) {
      objMesh.geometry.dispose()
    }
    const objMatOrArr = objMesh.material
    const arrMats = Array.isArray(objMatOrArr) ? objMatOrArr : objMatOrArr ? [objMatOrArr] : []
    for (const objMat of arrMats) {
      const objMapped = objMat as THREE.MeshBasicMaterial
      if (objMapped.map) {
        objMapped.map.dispose()
      }
      objMat.dispose()
    }
  })
}

function vClearWorld(): void {
  if (!objWorld) {
    return
  }
  while (objWorld.children.length > 0) {
    const objChild = objWorld.children[0]!
    objWorld.remove(objChild)
    vDisposeObject(objChild)
  }
  objRhombRoot = null
  objFloaterRoot = null
  objParticles = null
  arrFloaters = []
  arrFloaterMats = []
  objMatCore = null
  objMatCoreEdge = null
  objMatInner = null
}

function vLerpNum(nA: number, nB: number, nT: number): number {
  return nA + (nB - nA) * nT
}

function vMixColor(nFrom: number, nTo: number, nT: number): THREE.Color {
  objColorFrom.setHex(nFrom)
  objColorTo.setHex(nTo)
  objColorMix.copy(objColorFrom).lerp(objColorTo, nT)
  return objColorMix
}

function vApplyThemeMeta(objTheme: tTheme): void {
  nCenterSpin = objTheme.nCenterSpin
  nCamR = objTheme.nCamR
  if (objCaption) {
    objCaption.textContent = `diamond · ${objTheme.sLabel}`
  }
}

function vBlendAtmosphere(nT: number): void {
  if (!objScene) {
    return
  }

  const objFrom = arrThemes[nBlendFrom]!
  const objTo = arrThemes[nBlendTo]!
  const nClamped = Math.max(0, Math.min(1, nT))

  const objBg = vMixColor(objFrom.nBg, objTo.nBg, nClamped)
  objScene.background = objBg.clone()
  const nFogDensity = vLerpNum(objFrom.nFogDensity, objTo.nFogDensity, nClamped)
  if (objScene.fog instanceof THREE.FogExp2) {
    objScene.fog.color.copy(objBg)
    objScene.fog.density = nFogDensity
  } else {
    objScene.fog = new THREE.FogExp2(objBg.getHex(), nFogDensity)
  }

  if (objAmb) {
    objAmb.color.copy(vMixColor(objFrom.nAmb, objTo.nAmb, nClamped))
    objAmb.intensity = vLerpNum(objFrom.nAmbInt, objTo.nAmbInt, nClamped)
  }
  if (objKey) {
    objKey.color.copy(vMixColor(objFrom.nKey, objTo.nKey, nClamped))
    objKey.intensity = vLerpNum(objFrom.nKeyInt, objTo.nKeyInt, nClamped)
  }
  if (objFill) {
    objFill.color.copy(vMixColor(objFrom.nFill, objTo.nFill, nClamped))
    objFill.intensity = vLerpNum(objFrom.nFillInt, objTo.nFillInt, nClamped)
  }
  if (objCoreGlow) {
    objCoreGlow.color.copy(vMixColor(objFrom.nCoreGlow, objTo.nCoreGlow, nClamped))
    objCoreGlow.intensity = vLerpNum(objFrom.nCoreGlowInt, objTo.nCoreGlowInt, nClamped)
  }
}

function nAtmosphereBlend(): number {
  if (nBlendFrom === nBlendTo) {
    return 1
  }
  if (sFadePhase === 'out') {
    return nEaseInOutCubic(1 - nFade) * 0.5
  }
  if (sFadePhase === 'in') {
    return 0.5 + nEaseInOutCubic(nFade) * 0.5
  }
  return 1
}

function vBuildCenter(objTheme: tTheme): THREE.Group {
  const objRoot = new THREE.Group()
  const objGeo = objCenterGeo(objTheme.sCenter)

  objMatCore = new THREE.MeshStandardMaterial({
    color: objTheme.nCore,
    metalness: 0.72,
    roughness: 0.28,
    emissive: objTheme.nCoreEmissive,
    emissiveIntensity: objTheme.nCoreEmissiveInt,
  })
  const objMesh = new THREE.Mesh(objGeo, objMatCore)
  objRoot.add(objMesh)

  objMatCoreEdge = new THREE.LineBasicMaterial({
    color: objTheme.nEdge,
    transparent: true,
    opacity: 0.85,
  })
  objRoot.add(new THREE.LineSegments(new THREE.EdgesGeometry(objGeo, 1), objMatCoreEdge))

  objMatInner = new THREE.MeshStandardMaterial({
    color: objTheme.nInner,
    metalness: 0.85,
    roughness: 0.22,
    emissive: objTheme.nInner,
    emissiveIntensity: 0.2,
  })
  objRoot.add(new THREE.Mesh(objInnerGeo(objTheme.sCenter), objMatInner))

  return objRoot
}

function vBuildFloaters(objTheme: tTheme): THREE.Group {
  const objRoot = new THREE.Group()
  arrFloaters = []
  arrFloaterMats = objTheme.arrFloaterColors.map(
    (nColor) =>
      new THREE.MeshStandardMaterial({
        color: nColor,
        metalness: 0.6,
        roughness: 0.32,
        emissive: nColor,
        emissiveIntensity: 0.22,
      }),
  )

  const nSymbolCount = arrBoundCards.length
  const nTotal = nShapeCount + nSymbolCount
  const arrKinds = objTheme.arrShapeKinds

  for (let nI = 0; nI < nShapeCount; nI++) {
    const nKind = arrKinds[nI % arrKinds.length]!
    const nScale = 0.18 + (nI % 7) * 0.045
    const objGeo = objFloaterGeo(nKind, nScale)
    const objMat = arrFloaterMats[nI % arrFloaterMats.length]!
    const objMesh = new THREE.Mesh(objGeo, objMat)
    objRoot.add(objMesh)
    arrFloaters.push({
      objRoot: objMesh,
      ...objFloaterMotion(nI, nTotal),
    })
  }

  for (let nI = 0; nI < nSymbolCount; nI++) {
    const objCard = arrBoundCards[nI]!
    const sStroke = nI % 2 === 0 ? objTheme.sSymbolA : objTheme.sSymbolB
    const objTex = objSymbolTexture(objCard.sBinaryValue, sStroke)
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
    objRoot.add(objMesh)

    const objMotion = objFloaterMotion(nShapeCount + nI, nTotal)
    arrFloaters.push({
      objRoot: objMesh,
      ...objMotion,
      nOrbitR: objMotion.nOrbitR + 0.35,
      nSpinX: objMotion.nSpinX * 0.45,
      nSpinY: objMotion.nSpinY * 0.55,
      nSpinZ: objMotion.nSpinZ * 0.4,
    })
  }

  return objRoot
}

function vBuildParticles(objTheme: tTheme): THREE.Points {
  const nCount = objTheme.nParticleCount
  const arrPos = new Float32Array(nCount * 3)
  const arrCol = new Float32Array(nCount * 3)

  for (let nI = 0; nI < nCount; nI++) {
    const nI3 = nI * 3
    const nR = 4 + Math.random() * 10
    const nTheta = Math.random() * Math.PI * 2
    const nPhi = Math.acos(2 * Math.random() - 1)
    arrPos[nI3] = nR * Math.sin(nPhi) * Math.cos(nTheta)
    arrPos[nI3 + 1] = nR * Math.sin(nPhi) * Math.sin(nTheta) * 0.65
    arrPos[nI3 + 2] = nR * Math.cos(nPhi)

    const bPrimary = Math.random() < objTheme.nParticleGoldChance
    const arrTone = bPrimary ? objTheme.arrParticleA : objTheme.arrParticleB
    arrCol[nI3] = arrTone[0]
    arrCol[nI3 + 1] = arrTone[1]
    arrCol[nI3 + 2] = arrTone[2]
  }

  const objGeo = new THREE.BufferGeometry()
  objGeo.setAttribute('position', new THREE.BufferAttribute(arrPos, 3))
  objGeo.setAttribute('color', new THREE.BufferAttribute(arrCol, 3))

  return new THREE.Points(
    objGeo,
    new THREE.PointsMaterial({
      size: objTheme.nParticleSize,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    }),
  )
}

function vLoadTheme(nIndex: number): void {
  if (!objWorld) {
    return
  }

  const objTheme = arrThemes[nIndex]!
  vClearWorld()
  vApplyThemeMeta(objTheme)

  objRhombRoot = vBuildCenter(objTheme)
  objFloaterRoot = vBuildFloaters(objTheme)
  objParticles = vBuildParticles(objTheme)
  objWorld.add(objRhombRoot)
  objWorld.add(objFloaterRoot)
  objWorld.add(objParticles)
}

function nEaseInOutCubic(nT: number): number {
  const nClamped = Math.max(0, Math.min(1, nT))
  if (nClamped < 0.5) {
    return 4 * nClamped * nClamped * nClamped
  }
  const nU = -2 * nClamped + 2
  return 1 - (nU * nU * nU) / 2
}

function vSetWorldScale(nScale: number): void {
  if (!objWorld) {
    return
  }
  const nS = Math.max(0, nScale)
  objWorld.scale.setScalar(nS)
  objWorld.visible = nS > 0.0001
}

function vBuildScene(): void {
  if (!objCanvasHost || objRenderer) {
    return
  }

  objScene = new THREE.Scene()
  objCamera = new THREE.PerspectiveCamera(42, 1, 0.1, 80)
  objCamera.position.set(0, 1.4, 11.5)

  objRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
  objRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  objRenderer.outputColorSpace = THREE.SRGBColorSpace
  objCanvasHost.appendChild(objRenderer.domElement)

  objAmb = new THREE.AmbientLight(0x3a2860, 0.55)
  objScene.add(objAmb)

  objKey = new THREE.PointLight(0xc9a0ff, 2.4, 40, 2)
  objKey.position.set(4.5, 5.5, 6)
  objScene.add(objKey)

  objFill = new THREE.PointLight(0xffe08a, 1.35, 32, 2)
  objFill.position.set(-5, -2.5, 4)
  objScene.add(objFill)

  objCoreGlow = new THREE.PointLight(0x8b4dff, 1.8, 14, 2)
  objCoreGlow.position.set(0, 0, 0)
  objScene.add(objCoreGlow)

  objWorld = new THREE.Group()
  objScene.add(objWorld)

  nThemeIndex = 0
  nBlendFrom = 0
  nBlendTo = 0
  nSceneClock = 0
  sFadePhase = 'in'
  nFade = 0
  vLoadTheme(nThemeIndex)
  vBlendAtmosphere(1)
  vSetWorldScale(0)

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

function vTickSceneCycle(nDt: number): void {
  nSceneClock += nDt

  if (sFadePhase === 'in') {
    nFade = Math.min(1, nSceneClock / nFadeSec)
    vSetWorldScale(nEaseInOutCubic(nFade))
    vBlendAtmosphere(nAtmosphereBlend())
    if (nFade >= 1) {
      sFadePhase = 'hold'
      nSceneClock = 0
      vSetWorldScale(1)
      nBlendFrom = nThemeIndex
      nBlendTo = nThemeIndex
      vBlendAtmosphere(1)
    }
    return
  }

  if (sFadePhase === 'hold') {
    if (nSceneClock >= nHoldSec) {
      sFadePhase = 'out'
      nSceneClock = 0
      nBlendFrom = nThemeIndex
      nBlendTo = (nThemeIndex + 1) % arrThemes.length
    }
    return
  }

  nFade = Math.max(0, 1 - nSceneClock / nFadeSec)
  vSetWorldScale(nEaseInOutCubic(nFade))
  vBlendAtmosphere(nAtmosphereBlend())
  if (nFade <= 0) {
    nThemeIndex = nBlendTo
    vLoadTheme(nThemeIndex)
    vSetWorldScale(0)
    sFadePhase = 'in'
    nSceneClock = 0
    nFade = 0
    vBlendAtmosphere(nAtmosphereBlend())
  }
}

function vTick(nTs: number): void {
  if (!bRunning || !objRenderer || !objScene || !objCamera) {
    return
  }

  const nDt = Math.min(0.05, (nTs - nLastTs) / 1000 || 0.016)
  nLastTs = nTs
  nElapsed += nDt

  vTickSceneCycle(nDt)

  nPointerX += (nTargetPointerX - nPointerX) * Math.min(1, nDt * 3.5)
  nPointerY += (nTargetPointerY - nPointerY) * Math.min(1, nDt * 3.5)

  if (objRhombRoot) {
    objRhombRoot.rotation.y = nElapsed * nCenterSpin
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
      <div class="diamond-viewport" id="diamond-viewport" role="img" aria-label="Diamond — cycling crystal scenes"></div>
      <p class="diamond-caption" id="diamond-caption">diamond · violet gold</p>
    </div>
  `
}

function vDisposeScene(): void {
  vStop()
  vClearWorld()
  if (objRenderer) {
    objRenderer.dispose()
    objRenderer.domElement.remove()
    objRenderer = null
  }
  objScene = null
  objCamera = null
  objWorld = null
  objAmb = null
  objKey = null
  objFill = null
  objCoreGlow = null
  objCanvasHost?.classList.remove('is-revealed')
}

export function vBindDiamond(arrCards: tDiamondCard[]): void {
  arrBoundCards = arrCards
  objCanvasHost = document.querySelector<HTMLElement>('#diamond-viewport')
  objCaption = document.querySelector<HTMLElement>('#diamond-caption')
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
