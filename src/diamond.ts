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

type tCenterKind =
  | 'diamond'
  | 'icosa'
  | 'dodeca'
  | 'crystal'
  | 'prism'
  | 'star'
  | 'torus'
  | 'hex'
  | 'spike'
  | 'cube'
  | 'octa'
  | 'knot'

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

function objTheme(
  sId: string,
  sLabel: string,
  sCenter: tCenterKind,
  nBg: number,
  nAmb: number,
  nKey: number,
  nFill: number,
  nCoreGlow: number,
  nCore: number,
  nCoreEmissive: number,
  nEdge: number,
  nInner: number,
  arrFloaterColors: number[],
  arrParticleA: [number, number, number],
  arrParticleB: [number, number, number],
  arrShapeKinds: number[],
  sSymbolA: string,
  sSymbolB: string,
  nExtras: Partial<
    Pick<
      tTheme,
      | 'nFogDensity'
      | 'nAmbInt'
      | 'nKeyInt'
      | 'nFillInt'
      | 'nCoreGlowInt'
      | 'nCoreEmissiveInt'
      | 'nParticleGoldChance'
      | 'nParticleSize'
      | 'nParticleCount'
      | 'nCenterSpin'
      | 'nCamR'
    >
  > = {},
): tTheme {
  return {
    sId,
    sLabel,
    nBg,
    nFogDensity: nExtras.nFogDensity ?? 0.044,
    nAmb,
    nAmbInt: nExtras.nAmbInt ?? 0.56,
    nKey,
    nKeyInt: nExtras.nKeyInt ?? 2.4,
    nFill,
    nFillInt: nExtras.nFillInt ?? 1.3,
    nCoreGlow,
    nCoreGlowInt: nExtras.nCoreGlowInt ?? 1.85,
    nCore,
    nCoreEmissive,
    nCoreEmissiveInt: nExtras.nCoreEmissiveInt ?? 0.38,
    nEdge,
    nInner,
    arrFloaterColors,
    arrParticleA,
    arrParticleB,
    nParticleGoldChance: nExtras.nParticleGoldChance ?? 0.4,
    nParticleSize: nExtras.nParticleSize ?? 0.045,
    nParticleCount: nExtras.nParticleCount ?? 180,
    sCenter,
    nCenterSpin: nExtras.nCenterSpin ?? 0.18,
    arrShapeKinds,
    sSymbolA,
    sSymbolB,
    nCamR: nExtras.nCamR ?? 11.3,
  }
}

const arrThemes: tTheme[] = [
  objTheme(
    'violet',
    'violet gold',
    'diamond',
    0x050308,
    0x3a2860,
    0xc9a0ff,
    0xffe08a,
    0x8b4dff,
    0x1a0f2e,
    0x2a1450,
    0xe0b83a,
    0xe0b83a,
    [0xe0b83a, 0x8b4dff, 0x2a1838],
    [0.88, 0.72, 0.28],
    [0.55, 0.32, 0.95],
    [0, 1, 2, 3, 4],
    '#ffe08a',
    '#c9a0ff',
    { nFogDensity: 0.045, nAmbInt: 0.55, nFillInt: 1.35, nParticleCount: 160, nCamR: 11.2 },
  ),
  objTheme(
    'azure',
    'azure ember',
    'icosa',
    0x03060c,
    0x1a3858,
    0x7ec8ff,
    0xff8a4a,
    0x3aa0ff,
    0x0a1a2e,
    0x143a60,
    0xff9a5a,
    0x7ec8ff,
    [0x7ec8ff, 0xff8a4a, 0x1a3048],
    [0.95, 0.55, 0.28],
    [0.4, 0.75, 1.0],
    [1, 2, 0, 2, 1],
    '#7ec8ff',
    '#ff9a5a',
    { nFogDensity: 0.04, nAmbInt: 0.6, nKeyInt: 2.5, nFillInt: 1.45, nCoreGlowInt: 2.0, nParticleSize: 0.055, nParticleCount: 200, nCenterSpin: 0.22, nCamR: 11.6 },
  ),
  objTheme(
    'crimson',
    'crimson void',
    'dodeca',
    0x080205,
    0x4a1830,
    0xff6a9a,
    0xffd0a0,
    0xff3a6a,
    0x220814,
    0x501028,
    0xffc8a0,
    0xff6a9a,
    [0xff6a9a, 0xffc8a0, 0x381018],
    [1.0, 0.45, 0.55],
    [0.9, 0.7, 0.35],
    [3, 0, 3, 4, 0],
    '#ffc8a0',
    '#ff6a9a',
    { nFogDensity: 0.05, nAmbInt: 0.5, nKeyInt: 2.3, nFillInt: 1.2, nCoreEmissiveInt: 0.42, nParticleGoldChance: 0.35, nParticleSize: 0.04, nCenterSpin: 0.14, nCamR: 12.0 },
  ),
  objTheme(
    'jade',
    'jade circuit',
    'crystal',
    0x030806,
    0x1a4838,
    0x6affc0,
    0xc8ffe0,
    0x2ae89a,
    0x0a2018,
    0x145038,
    0xa0ffd0,
    0x6affc0,
    [0x6affc0, 0xa0d8ff, 0x183028],
    [0.45, 1.0, 0.75],
    [0.55, 0.85, 1.0],
    [4, 1, 4, 2, 1],
    '#a0ffd0',
    '#a0d8ff',
    { nFogDensity: 0.042, nAmbInt: 0.58, nParticleSize: 0.038, nParticleCount: 220, nCenterSpin: 0.26, nCamR: 10.8 },
  ),
  objTheme(
    'silver',
    'silver prism',
    'prism',
    0x06070c,
    0x2a3048,
    0xd0d8ff,
    0xa090ff,
    0xb0c0ff,
    0x141820,
    0x283048,
    0xe8ecff,
    0xa090ff,
    [0xe8ecff, 0xa090ff, 0x242838],
    [0.9, 0.92, 1.0],
    [0.65, 0.55, 1.0],
    [0, 3, 1, 0, 3],
    '#e8ecff',
    '#a090ff',
    { nFogDensity: 0.038, nAmbInt: 0.62, nKeyInt: 2.55, nFillInt: 1.4, nCoreGlowInt: 1.7, nCoreEmissiveInt: 0.45, nParticleGoldChance: 0.5, nParticleSize: 0.05, nParticleCount: 170, nCenterSpin: 0.16, nCamR: 11.4 },
  ),
  objTheme(
    'amber',
    'amber star',
    'star',
    0x0a0602,
    0x4a3010,
    0xffc050,
    0xff7040,
    0xffa020,
    0x2a1808,
    0x503010,
    0xffe080,
    0xffc050,
    [0xffc050, 0xff7040, 0x302010],
    [1.0, 0.75, 0.3],
    [1.0, 0.4, 0.2],
    [0, 4, 0, 1, 4],
    '#ffe080',
    '#ff7040',
    { nFogDensity: 0.048, nKeyInt: 2.6, nFillInt: 1.5, nCenterSpin: 0.2, nParticleCount: 190 },
  ),
  objTheme(
    'cobalt',
    'cobalt ring',
    'torus',
    0x02040a,
    0x102848,
    0x4080ff,
    0x80e0ff,
    0x2060ff,
    0x081428,
    0x102850,
    0x90c8ff,
    0x4080ff,
    [0x4080ff, 0x80e0ff, 0x101828],
    [0.25, 0.5, 1.0],
    [0.5, 0.85, 1.0],
    [1, 2, 1, 3, 2],
    '#90c8ff',
    '#80e0ff',
    { nFogDensity: 0.036, nAmbInt: 0.6, nCenterSpin: 0.28, nParticleSize: 0.042, nParticleCount: 210, nCamR: 11.8 },
  ),
  objTheme(
    'rose',
    'rose hex',
    'hex',
    0x0a0306,
    0x482028,
    0xff80b0,
    0xffd0e0,
    0xff5090,
    0x280814,
    0x501828,
    0xffb0d0,
    0xff80b0,
    [0xff80b0, 0xffd0e0, 0x301018],
    [1.0, 0.5, 0.7],
    [1.0, 0.8, 0.85],
    [3, 4, 0, 3, 1],
    '#ffb0d0',
    '#ff80b0',
    { nFogDensity: 0.046, nFillInt: 1.15, nCenterSpin: 0.15, nCamR: 11.0 },
  ),
  objTheme(
    'ion',
    'ion spike',
    'spike',
    0x04020a,
    0x281848,
    0xb080ff,
    0x40ffe0,
    0x8040ff,
    0x140828,
    0x281850,
    0xd0a0ff,
    0x40ffe0,
    [0xb080ff, 0x40ffe0, 0x201030],
    [0.7, 0.5, 1.0],
    [0.25, 1.0, 0.85],
    [4, 2, 4, 0, 2],
    '#d0a0ff',
    '#40ffe0',
    { nFogDensity: 0.043, nKeyInt: 2.45, nCenterSpin: 0.3, nParticleCount: 230, nCamR: 10.6 },
  ),
  objTheme(
    'obsidian',
    'obsidian cube',
    'cube',
    0x050505,
    0x282828,
    0xc0c0c0,
    0xff4040,
    0x808080,
    0x121212,
    0x282828,
    0xe0e0e0,
    0xff4040,
    [0xc0c0c0, 0xff4040, 0x1a1a1a],
    [0.85, 0.85, 0.85],
    [1.0, 0.25, 0.25],
    [0, 0, 3, 1, 0],
    '#e0e0e0',
    '#ff6060',
    { nFogDensity: 0.05, nAmbInt: 0.5, nCoreEmissiveInt: 0.3, nCenterSpin: 0.12, nParticleGoldChance: 0.3, nCamR: 12.2 },
  ),
  objTheme(
    'solar',
    'solar octa',
    'octa',
    0x0a0802,
    0x483810,
    0xffe060,
    0xffa000,
    0xffd040,
    0x2a2008,
    0x504010,
    0xfff0a0,
    0xffe060,
    [0xffe060, 0xffa000, 0x302808],
    [1.0, 0.88, 0.35],
    [1.0, 0.6, 0.1],
    [1, 1, 4, 0, 1],
    '#fff0a0',
    '#ffa000',
    { nFogDensity: 0.041, nKeyInt: 2.7, nFillInt: 1.55, nCoreGlowInt: 2.1, nCenterSpin: 0.24, nParticleSize: 0.052 },
  ),
  objTheme(
    'toxin',
    'toxin knot',
    'knot',
    0x040a02,
    0x203010,
    0x80ff40,
    0xd0ff60,
    0x50e020,
    0x101808,
    0x203810,
    0xb0ff70,
    0x80ff40,
    [0x80ff40, 0xd0ff60, 0x182010],
    [0.5, 1.0, 0.25],
    [0.8, 1.0, 0.35],
    [2, 4, 0, 2, 4],
    '#b0ff70',
    '#d0ff60',
    { nFogDensity: 0.047, nAmbInt: 0.58, nCenterSpin: 0.32, nParticleCount: 240, nCamR: 11.1 },
  ),
  objTheme(
    'frost',
    'frost lattice',
    'hex',
    0x05080c,
    0x203848,
    0xa8e8ff,
    0xffffff,
    0x70c8ff,
    0x101820,
    0x203040,
    0xe0f8ff,
    0xa8e8ff,
    [0xa8e8ff, 0xffffff, 0x182028],
    [0.7, 0.9, 1.0],
    [1.0, 1.0, 1.0],
    [1, 3, 1, 2, 3],
    '#e0f8ff',
    '#a8e8ff',
    { nFogDensity: 0.035, nAmbInt: 0.65, nKeyInt: 2.5, nFillInt: 1.2, nParticleGoldChance: 0.55, nParticleSize: 0.036, nParticleCount: 250, nCenterSpin: 0.17, nCamR: 11.5 },
  ),
  objTheme(
    'magma',
    'magma core',
    'star',
    0x0c0402,
    0x481808,
    0xff6020,
    0xffe080,
    0xff3010,
    0x280c04,
    0x501808,
    0xffa040,
    0xff6020,
    [0xff6020, 0xffe080, 0x301008],
    [1.0, 0.35, 0.1],
    [1.0, 0.85, 0.4],
    [0, 1, 4, 0, 2],
    '#ffa040',
    '#ffe080',
    { nFogDensity: 0.052, nAmbInt: 0.52, nKeyInt: 2.65, nCoreGlowInt: 2.2, nCenterSpin: 0.19, nParticleCount: 200 },
  ),
  objTheme(
    'ultraviolet',
    'ultraviolet',
    'icosa',
    0x06020c,
    0x301048,
    0xd040ff,
    0x40ffe8,
    0xa020ff,
    0x180828,
    0x301050,
    0xe080ff,
    0x40ffe8,
    [0xd040ff, 0x40ffe8, 0x201030],
    [0.8, 0.25, 1.0],
    [0.25, 1.0, 0.9],
    [2, 2, 4, 1, 2],
    '#e080ff',
    '#40ffe8',
    { nFogDensity: 0.044, nCenterSpin: 0.25, nParticleSize: 0.048, nParticleCount: 215, nCamR: 11.7 },
  ),
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

function objBipyramidGeo(nSides: number, nRadius: number, nHeight: number): THREE.BufferGeometry {
  const nHalfH = nHeight * 0.5
  const arrPos: number[] = [0, nHalfH, 0]
  for (let nI = 0; nI < nSides; nI++) {
    const nA = (nI / nSides) * Math.PI * 2
    arrPos.push(Math.cos(nA) * nRadius, 0, Math.sin(nA) * nRadius)
  }
  arrPos.push(0, -nHalfH, 0)
  const nBottom = nSides + 1
  const arrIdx: number[] = []
  for (let nI = 0; nI < nSides; nI++) {
    const nNext = 1 + ((nI + 1) % nSides)
    arrIdx.push(0, 1 + nI, nNext)
    arrIdx.push(nBottom, nNext, 1 + nI)
  }

  const objGeo = new THREE.BufferGeometry()
  objGeo.setAttribute('position', new THREE.Float32BufferAttribute(arrPos, 3))
  objGeo.setIndex(arrIdx)
  objGeo.computeVertexNormals()
  return objGeo
}

function objStarGeo(nRadius: number, nHeight: number): THREE.BufferGeometry {
  // Pointed starburst — eight-sided bipyramid.
  return objBipyramidGeo(8, nRadius * 0.95, nHeight * 1.05)
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
  if (sKind === 'star') {
    return objStarGeo(nDiamondRadius, nDiamondHeight)
  }
  if (sKind === 'torus') {
    return new THREE.TorusGeometry(nDiamondRadius * 0.95, nDiamondRadius * 0.32, 12, 28)
  }
  if (sKind === 'hex') {
    return objBipyramidGeo(6, nDiamondRadius * 1.05, nDiamondHeight)
  }
  if (sKind === 'spike') {
    return objBipyramidGeo(5, nDiamondRadius * 0.7, nDiamondHeight * 1.45)
  }
  if (sKind === 'cube') {
    return new THREE.BoxGeometry(nDiamondRadius * 1.55, nDiamondRadius * 1.55, nDiamondRadius * 1.55)
  }
  if (sKind === 'octa') {
    return new THREE.OctahedronGeometry(nDiamondRadius * 1.2, 0)
  }
  if (sKind === 'knot') {
    return new THREE.TorusKnotGeometry(nDiamondRadius * 0.85, nDiamondRadius * 0.28, 80, 12, 2, 3)
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
  if (sKind === 'star') {
    return objBipyramidGeo(8, nDiamondRadius * 0.35, nDiamondHeight * 0.4)
  }
  if (sKind === 'torus') {
    return new THREE.TorusGeometry(nDiamondRadius * 0.38, nDiamondRadius * 0.12, 10, 20)
  }
  if (sKind === 'hex') {
    return objBipyramidGeo(6, nDiamondRadius * 0.4, nDiamondHeight * 0.4)
  }
  if (sKind === 'spike') {
    return objBipyramidGeo(5, nDiamondRadius * 0.28, nDiamondHeight * 0.55)
  }
  if (sKind === 'cube') {
    return new THREE.BoxGeometry(nDiamondRadius * 0.55, nDiamondRadius * 0.55, nDiamondRadius * 0.55)
  }
  if (sKind === 'octa') {
    return new THREE.OctahedronGeometry(nDiamondRadius * 0.45, 0)
  }
  if (sKind === 'knot') {
    return new THREE.TorusKnotGeometry(nDiamondRadius * 0.32, nDiamondRadius * 0.1, 48, 8, 2, 3)
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
