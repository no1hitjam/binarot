import * as THREE from 'three'
import { sCardIconPaths } from './cardIcons'

const nTerrainSize = 9600
const nTerrainSegs = 320
const nHeightScale = 165
const nMountainScale = 220
const nMountainStart = 0.91
const nMountainAngCenter = Math.PI * 0.25
const nMountainAngHalf = Math.PI * 0.5
const nMountainAngFade = 0.4
const arrMountainPeaks: { nAng: number; nDist: number; nRadius: number; nH: number }[] = [
  { nAng: Math.PI * 0.25, nDist: 0.955, nRadius: 0.11, nH: 820 },
  { nAng: Math.PI * 0.08, nDist: 0.94, nRadius: 0.075, nH: 540 },
  { nAng: Math.PI * 0.42, nDist: 0.948, nRadius: 0.085, nH: 620 },
  { nAng: Math.PI * -0.06, nDist: 0.935, nRadius: 0.065, nH: 440 },
  { nAng: Math.PI * 0.58, nDist: 0.942, nRadius: 0.07, nH: 490 },
]
const nMountainPyramidSink = 28
const nMaxClimb = 1.35
const nMoveSpeed = 8
const nTurnSpeed = 1.8
const nEyeHeight = 5.8
const nFogNear = 140
const nFogFar = 4200
const nPlayHalf = nTerrainSize * 0.5 - 1.5
const nSpawnHalf = nTerrainSize * 0.5 * 0.62
const nStatueMargin = 140
const nStatueClearSpawn = 70
const nStatueFindRadius = 16
const nStatueDwellSec = 10
const nStuckTravelFrac = 0.2
const nStuckFramesBeforeAvoid = 12
const nAvoidAngle = 0.9
const nAvoidHoldSec = 1.4
const nLookSens = 0.0045
const nPitchMin = -1.25
const nPitchMax = 1.35
const nLookReturnSpeed = 1.6
const nDefaultPitch = -0.08
const nBobSpeed = 1.25
const nBobAmp = 0.14
const nBobBlendSpeed = 2.4
const nSkyLift = 2560
const nSkyTilt = 0.42
const nStarCount = 2400
const nStarRadius = 9000
const nStarSize = 6.5
const nStarDrift = 0.003
const nFairyCount = 12
const nFairyCullR = 38
const nFairySpawnMin = 16
const nFairySpawnMax = 28
const nFairySpawnSpread = 0.7
const nFairySize = 0.85
const nFairyHoverMin = 1.1
const nFairyHoverSpan = 2.6
const nFairyFadeSec = 1.35
const nFairySpawnGap = 0.55
const nSandCount = 720
const nSandSize = 0.2
const nSandCullR = 110
const nSandSpawnMin = 12
const nSandSpawnMax = 88
const nSandWindYaw = 0.95
const nSandWindSpd = 18
const nSandWindGust = 7
const nSandLiftMin = 0.25
const nSandLiftMax = 5.2
const nSandLifeMin = 2.2
const nSandLifeMax = 5.5
const nSandTwinkleSpd = 9
const nExploreStartDelayMs = 80
const nVhsBleedPx = 4.5
const bVhsEnabled = false

type tExploreCard = {
  sName: string
  sBinaryValue: string
}

type tStatue = {
  nX: number
  nZ: number
  bFound: boolean
  objRay: THREE.Group
  arrLitMats: THREE.MeshStandardMaterial[]
  objGlow: THREE.PointLight
}

type tSkyOrbit = {
  objPivot: THREE.Object3D
  nSpeed: number
}

type tFairy = {
  nX: number
  nZ: number
  nBaseY: number
  nPhase: number
  nOrbitR: number
  nOrbitSpd: number
  nBobSpd: number
  nBobAmp: number
  nDriftYaw: number
  nDriftSpd: number
  nFade: number
  nCr: number
  nCg: number
  nCb: number
  bActive: boolean
}

type tSandMote = {
  nX: number
  nY: number
  nZ: number
  nVx: number
  nVy: number
  nVz: number
  nLife: number
  nMaxLife: number
  nTwinkle: number
  nTwinkleSpd: number
  nCr: number
  nCg: number
  nCb: number
  nBright: number
}

let arrExploreCards: tExploreCard[] = []
let arrStatues: tStatue[] = []
let objCanvasHost: HTMLElement | null = null
let objRenderer: THREE.WebGLRenderer | null = null
let objScene: THREE.Scene | null = null
let objCamera: THREE.PerspectiveCamera | null = null
let arrHeights: Float32Array | null = null
let nAnimFrame = 0
let nStartTimer = 0
let bRunning = false
let bAwaitingReveal = false
let nLastTs = 0
let nYaw = 0
let nPitch = -0.08
let nMoveYaw = 0
let objTargetStatue: tStatue | null = null
let nStuckFrames = 0
let nAvoidYaw = 0
let nAvoidUntil = 0
let nAvoidSign = 1
let nDwellUntil = 0
let nBobPhase = 0
let nBobBlend = 0
let bLookDragging = false
let nLookPtrId = -1
let nLookLastX = 0
let nLookLastY = 0
let objSkyRoot: THREE.Group | null = null
let objStarRoot: THREE.Group | null = null
let arrSkyOrbits: tSkyOrbit[] = []
let objFairyPoints: THREE.Points | null = null
let arrFairies: tFairy[] = []
let objFairyTex: THREE.CanvasTexture | null = null
let nFairySpawnCool = 0
let objSandPoints: THREE.Points | null = null
let arrSandMotes: tSandMote[] = []
let objSandTex: THREE.CanvasTexture | null = null
let nSandWindPhase = 0
let objSceneTarget: THREE.WebGLRenderTarget | null = null
let objVhsScene: THREE.Scene | null = null
let objVhsCam: THREE.OrthographicCamera | null = null
let objVhsMat: THREE.ShaderMaterial | null = null

const objPlayerPos = new THREE.Vector3(0, 20, 0)
const objLookDir = new THREE.Vector3()

const objMatStone = new THREE.MeshStandardMaterial({
  color: 0x1a0f28,
  roughness: 0.88,
  metalness: 0.12,
})
const objMatGold = new THREE.MeshStandardMaterial({
  color: 0xe0b83a,
  roughness: 0.42,
  metalness: 0.7,
  emissive: 0x3a2a08,
  emissiveIntensity: 0.28,
})
const objMatPurple = new THREE.MeshStandardMaterial({
  color: 0x5a2d9e,
  roughness: 0.55,
  metalness: 0.25,
  emissive: 0x2a1050,
  emissiveIntensity: 0.2,
})

const nRayHeight = 480
const nRayWidth = 70
const nRayCoreWidth = 18
let objRayTex: THREE.CanvasTexture | null = null
let objMatRay: THREE.MeshBasicMaterial | null = null
let objMatRayCore: THREE.MeshBasicMaterial | null = null

/** Hash → [0, 1) */
function nHash2(nX: number, nZ: number): number {
  let nT = (nX * 374761393 + nZ * 668265263) | 0
  nT = (nT ^ (nT >>> 13)) * 1274126177
  nT = nT ^ (nT >>> 16)
  return (nT >>> 0) / 4294967296
}

function nSmooth(nT: number): number {
  return nT * nT * (3 - 2 * nT)
}

function nValueNoise(nX: number, nZ: number): number {
  const nX0 = Math.floor(nX)
  const nZ0 = Math.floor(nZ)
  const nFx = nSmooth(nX - nX0)
  const nFz = nSmooth(nZ - nZ0)
  const nA = nHash2(nX0, nZ0)
  const nB = nHash2(nX0 + 1, nZ0)
  const nC = nHash2(nX0, nZ0 + 1)
  const nD = nHash2(nX0 + 1, nZ0 + 1)
  const nAb = nA + (nB - nA) * nFx
  const nCd = nC + (nD - nC) * nFx
  return nAb + (nCd - nAb) * nFz
}

function nFbm(nX: number, nZ: number, nOctaves: number = 5): number {
  let nAmp = 1
  let nFreq = 1
  let nSum = 0
  let nNorm = 0
  for (let nOct = 0; nOct < nOctaves; nOct++) {
    nSum += nValueNoise(nX * nFreq, nZ * nFreq) * nAmp
    nNorm += nAmp
    nAmp *= 0.5
    nFreq *= 2.05
  }
  return nSum / nNorm
}

/** 1 on the East→South half (SE-centered), 0 toward the NW, with soft edges. */
function nMountainAngMask(nAng: number): number {
  let nDelta = nAng - nMountainAngCenter
  while (nDelta > Math.PI) nDelta -= Math.PI * 2
  while (nDelta < -Math.PI) nDelta += Math.PI * 2
  const nAbs = Math.abs(nDelta)
  const nInner = nMountainAngHalf - nMountainAngFade
  const nOuter = nMountainAngHalf + nMountainAngFade
  if (nAbs <= nInner) {
    return 1
  }
  if (nAbs >= nOuter) {
    return 0
  }
  return nSmooth(1 - (nAbs - nInner) / Math.max(0.001, nOuter - nInner))
}

function nInteriorHeight(nX: number, nZ: number): number {
  // Mild warp — keep mega-dunes coherent while still letting ridges snake.
  const nWarp = (nFbm(nX * 0.0007, nZ * 0.0007, 3) - 0.5) * 420
  const nWarpB = (nFbm(nX * 0.0016 + 19, nZ * 0.0016 - 7, 3) - 0.5) * 140
  const nWx = nX + nWarp + nWarpB * 0.35
  const nWz = nZ - nWarp * 0.55 + nWarpB * 0.7
  const nHalf = nTerrainSize * 0.5
  const nDist = Math.hypot(nX, nZ) / nHalf
  const nAng = Math.atan2(nZ, nX)

  // Slow envelope — some dune seas slightly taller than others.
  const nAmpField = 0.7 + 0.3 * nFbm(nWx * 0.00028 + 5, nWz * 0.00028 - 2, 3)

  // Mega transverse dunes (~800–1100 unit crests) — full sine for crest→valley travel.
  const nAcrossA = nWx * 0.00045 + nWz * 0.00185
  const nAlongA = nWx * 0.00035 - nWz * 0.0001
  const nPhaseA =
    nAcrossA +
    (nFbm(nAlongA * 0.55 + 3, nAcrossA * 0.08, 3) - 0.5) * 1.4 +
    Math.sin(nAlongA * 0.9) * 0.22
  const nDuneA = 0.5 + 0.5 * Math.sin(nPhaseA * Math.PI)

  // Large secondary dunes at a shallow cross-angle (~500–700 units).
  const nAcrossB = nWx * 0.00155 - nWz * 0.0007
  const nAlongB = nWx * 0.00018 + nWz * 0.0004
  const nPhaseB =
    nAcrossB +
    (nFbm(nAlongB + 11, nAcrossB * 0.12 + 4, 3) - 0.5) * 1.2 +
    Math.sin(nAlongB * 1.1) * 0.18
  const nDuneB = 0.5 + 0.5 * Math.sin(nPhaseB * Math.PI)

  // Soft mid ripples on the big faces (kept subtle).
  const nAcrossC = nWx * 0.0042 + nWz * 0.0015
  const nPhaseC = nAcrossC + (nFbm(nWx * 0.0012 + 28, nWz * 0.0012, 2) - 0.5) * 1.1
  const nDuneC = 0.5 + 0.5 * Math.sin(nPhaseC * Math.PI)

  // Fine wind texture only.
  const nRipplePhase = nWx * 0.018 + nWz * 0.0065 + nFbm(nWx * 0.004, nWz * 0.004, 2) * 1.8
  const nRipple = Math.pow(Math.abs(Math.sin(nRipplePhase * Math.PI)), 2.0)

  // Broad basin bowls under the mega-dunes.
  const nSwell = nFbm(nWx * 0.00028 + 9, nWz * 0.00028 + 3, 3)
  const nSwellB = nFbm(nWx * 0.0007 - 4, nWz * 0.0007 + 14, 3)

  const nBasinFade = 1 - Math.min(1, Math.max(0, (nDist - 0.72) / 0.2))

  let nH =
    nSwell * 0.22 +
    nSwellB * 0.12 +
    (nDuneA * 0.72 + nDuneB * 0.38 + nDuneC * 0.12) * nAmpField * nBasinFade +
    nRipple * 0.04 * nBasinFade
  nH *= nHeightScale

  const nRimT = Math.min(1, Math.max(0, (nDist - nMountainStart) / Math.max(0.001, 1 - nMountainStart)))
  const nAngMask = nMountainAngMask(nAng)
  if (nRimT > 0 && nAngMask > 0) {
    // Soft, low plateau rise — broad hills more than sharp peaks.
    const nRimEase = Math.pow(nRimT, 1.25)
    const nPeakMask = nFbm(Math.cos(nAng) * 1.6 + 40, Math.sin(nAng) * 1.6 - 15, 3)
    const nRolling = nFbm(nWx * 0.0022 - 8, nWz * 0.0022 + 15, 3)
    nH +=
      nRimEase *
      nAngMask *
      nMountainScale *
      (0.78 + nPeakMask * 0.22) *
      (0.88 + nRolling * 0.12)
  }

  return nH
}

function nSampleHeight(nWorldX: number, nWorldZ: number): number {
  if (!arrHeights) {
    return 0
  }

  const nHalf = nTerrainSize * 0.5
  const nU = ((nWorldX + nHalf) / nTerrainSize) * nTerrainSegs
  const nV = ((nWorldZ + nHalf) / nTerrainSize) * nTerrainSegs
  const nU0 = Math.floor(nU)
  const nV0 = Math.floor(nV)
  if (nU0 < 0 || nV0 < 0 || nU0 >= nTerrainSegs || nV0 >= nTerrainSegs) {
    return 0
  }

  const nU1 = Math.min(nU0 + 1, nTerrainSegs)
  const nV1 = Math.min(nV0 + 1, nTerrainSegs)
  const nFu = nU - nU0
  const nFv = nV - nV0
  const nStride = nTerrainSegs + 1
  const nH00 = arrHeights[nV0 * nStride + nU0]!
  const nH10 = arrHeights[nV0 * nStride + nU1]!
  const nH01 = arrHeights[nV1 * nStride + nU0]!
  const nH11 = arrHeights[nV1 * nStride + nU1]!
  const nH0 = nH00 + (nH10 - nH00) * nFu
  const nH1 = nH01 + (nH11 - nH01) * nFu
  return nH0 + (nH1 - nH0) * nFv
}

function objTerrainColor(nH: number, nMin: number, nMax: number): THREE.Color {
  const objColor = new THREE.Color()
  const nDuneCeiling = nHeightScale * 1.4
  if (nH <= nDuneCeiling) {
    // Color dunes on their own short range so crests still read against troughs.
    const nT = Math.min(1, Math.max(0, (nH - nMin) / Math.max(0.001, nDuneCeiling - nMin)))
    if (nT < 0.28) {
      objColor.setRGB(0.94, 0.78, 0.38)
    } else if (nT < 0.55) {
      objColor.setRGB(0.88, 0.68, 0.28)
    } else if (nT < 0.78) {
      objColor.setRGB(0.82, 0.58, 0.22)
    } else {
      objColor.setRGB(0.74, 0.48, 0.18)
    }
    return objColor
  }

  const nT = Math.min(1, Math.max(0, (nH - nDuneCeiling) / Math.max(0.001, nMax - nDuneCeiling)))
  if (nT < 0.25) {
    objColor.setRGB(0.58, 0.38, 0.26)
  } else if (nT < 0.5) {
    objColor.setRGB(0.42, 0.3, 0.32)
  } else if (nT < 0.75) {
    objColor.setRGB(0.3, 0.26, 0.36)
  } else {
    objColor.setRGB(0.36, 0.32, 0.44)
  }
  return objColor
}

function objBuildTerrain(): THREE.Mesh {
  const objGeo = new THREE.PlaneGeometry(nTerrainSize, nTerrainSize, nTerrainSegs, nTerrainSegs)
  objGeo.rotateX(-Math.PI / 2)

  const objPos = objGeo.attributes.position as THREE.BufferAttribute
  const nVertCount = objPos.count
  arrHeights = new Float32Array(nVertCount)
  const arrColors = new Float32Array(nVertCount * 3)

  let nMinH = Infinity
  let nMaxH = -Infinity
  const arrRaw = new Float32Array(nVertCount)

  for (let nI = 0; nI < nVertCount; nI++) {
    const nX = objPos.getX(nI)
    const nZ = objPos.getZ(nI)
    const nH = nInteriorHeight(nX, nZ)

    arrRaw[nI] = nH
    if (nH < nMinH) nMinH = nH
    if (nH > nMaxH) nMaxH = nH
  }

  if (!Number.isFinite(nMinH) || !Number.isFinite(nMaxH)) {
    nMinH = 0
    nMaxH = nHeightScale
  }

  for (let nI = 0; nI < nVertCount; nI++) {
    const nH = arrRaw[nI]!
    objPos.setY(nI, nH)
    arrHeights[nI] = nH
    const objCol = objTerrainColor(nH, nMinH, nMaxH)
    arrColors[nI * 3] = objCol.r
    arrColors[nI * 3 + 1] = objCol.g
    arrColors[nI * 3 + 2] = objCol.b
  }

  objGeo.setAttribute('color', new THREE.BufferAttribute(arrColors, 3))
  objGeo.computeVertexNormals()

  const objMat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.96,
    metalness: 0.02,
    flatShading: false,
  })

  const objMesh = new THREE.Mesh(objGeo, objMat)
  objMesh.receiveShadow = true
  return objMesh
}

function vAddMountainPyramids(objParent: THREE.Object3D): void {
  const nHalf = nTerrainSize * 0.5
  const arrPalette = [0x4a4250, 0x3a3644, 0x524850, 0x383440, 0x464054]

  for (let nI = 0; nI < arrMountainPeaks.length; nI++) {
    const objPeak = arrMountainPeaks[nI]!
    const nPeakX = Math.cos(objPeak.nAng) * nHalf * objPeak.nDist
    const nPeakZ = Math.sin(objPeak.nAng) * nHalf * objPeak.nDist
    const nGround = nSampleHeight(nPeakX, nPeakZ)
    const nBaseR = objPeak.nRadius * nHalf
    const nH = objPeak.nH

    const objGeo = new THREE.ConeGeometry(nBaseR, nH, 4)
    objGeo.computeVertexNormals()

    const objMat = new THREE.MeshStandardMaterial({
      color: arrPalette[nI % arrPalette.length]!,
      roughness: 0.94,
      metalness: 0.06,
      flatShading: true,
      emissive: 0x100818,
      emissiveIntensity: 0.08,
    })

    const objMesh = new THREE.Mesh(objGeo, objMat)
    objMesh.position.set(nPeakX, nGround + nH * 0.5 - nMountainPyramidSink, nPeakZ)
    objMesh.rotation.y = objPeak.nAng + Math.PI * 0.25 + nI * 0.18
    objMesh.castShadow = false
    objMesh.receiveShadow = true
    objParent.add(objMesh)
  }
}

function vDrawCardIcon(objCtx: CanvasRenderingContext2D, sSlug: string, nOx: number, nOy: number, nSize: number): void {
  const sPaths = sCardIconPaths(sSlug)
  if (!sPaths) {
    return
  }

  const nScale = nSize / 64
  objCtx.save()
  objCtx.translate(nOx, nOy)
  objCtx.scale(nScale, nScale)
  objCtx.strokeStyle = '#ffe08a'
  objCtx.lineWidth = 2.1
  objCtx.lineCap = 'round'
  objCtx.lineJoin = 'round'
  objCtx.shadowColor = 'rgba(224, 184, 58, 0.55)'
  objCtx.shadowBlur = 6

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

function objStatueTexture(objCard: tExploreCard): THREE.CanvasTexture {
  const nSize = 512
  const objCanvas = document.createElement('canvas')
  objCanvas.width = nSize
  objCanvas.height = nSize
  const objCtx = objCanvas.getContext('2d')!

  objCtx.fillStyle = '#0a0610'
  objCtx.fillRect(0, 0, nSize, nSize)

  objCtx.strokeStyle = 'rgba(224, 184, 58, 0.55)'
  objCtx.lineWidth = 8
  objCtx.strokeRect(18, 18, nSize - 36, nSize - 36)

  objCtx.strokeStyle = 'rgba(139, 77, 255, 0.35)'
  objCtx.lineWidth = 2
  objCtx.strokeRect(32, 32, nSize - 64, nSize - 64)

  vDrawCardIcon(objCtx, objCard.sBinaryValue, 128, 72, 256)

  objCtx.fillStyle = '#e0b83a'
  objCtx.font = '600 36px "IBM Plex Sans", sans-serif'
  objCtx.textAlign = 'center'
  objCtx.textBaseline = 'middle'
  objCtx.fillText(objCard.sName, nSize * 0.5, 380)

  objCtx.fillStyle = '#9a8fb0'
  objCtx.font = '500 28px "IBM Plex Mono", monospace'
  objCtx.fillText(objCard.sBinaryValue, nSize * 0.5, 430)

  const objTex = new THREE.CanvasTexture(objCanvas)
  objTex.colorSpace = THREE.SRGBColorSpace
  objTex.anisotropy = 4
  return objTex
}

function arrStatueSites(nCount: number): { nX: number; nZ: number }[] {
  const nHalf = nTerrainSize * 0.5 - nStatueMargin
  const nGolden = Math.PI * (3 - Math.sqrt(5))
  const arrOut: { nX: number; nZ: number }[] = []

  for (let nI = 0; nI < nCount; nI++) {
    const nU = (nI + 0.5) / nCount
    const nR = Math.sqrt(0.18 + 0.82 * nU) * nHalf
    const nA = nI * nGolden + 1.15
    let nX = Math.cos(nA) * nR
    let nZ = Math.sin(nA) * nR

    if (Math.hypot(nX, nZ) < nStatueClearSpawn) {
      nX += nStatueClearSpawn
      nZ += nStatueClearSpawn * 0.6
    }

    arrOut.push({ nX, nZ })
  }

  return arrOut
}

function objLightRayTexture(): THREE.CanvasTexture {
  if (objRayTex) {
    return objRayTex
  }

  const nW = 64
  const nH = 256
  const objCanvas = document.createElement('canvas')
  objCanvas.width = nW
  objCanvas.height = nH
  const objCtx = objCanvas.getContext('2d')!

  for (let nY = 0; nY < nH; nY++) {
    const nV = nY / (nH - 1)
    const nAlong = Math.sin(nV * Math.PI)
    for (let nX = 0; nX < nW; nX++) {
      const nU = (nX + 0.5) / nW
      const nAcross = Math.pow(1 - Math.abs(nU * 2 - 1), 2.4)
      const nA = nAcross * nAlong
      const nR = Math.floor(255 * (0.55 + 0.45 * nAcross))
      const nG = Math.floor(220 * (0.4 + 0.6 * nAcross))
      const nB = Math.floor(120 + 80 * nAcross)
      objCtx.fillStyle = `rgba(${nR}, ${nG}, ${nB}, ${nA})`
      objCtx.fillRect(nX, nY, 1, 1)
    }
  }

  objRayTex = new THREE.CanvasTexture(objCanvas)
  objRayTex.colorSpace = THREE.SRGBColorSpace
  return objRayTex
}

function vEnsureRayMaterials(): void {
  if (objMatRay && objMatRayCore) {
    return
  }

  const objTex = objLightRayTexture()
  objMatRay = new THREE.MeshBasicMaterial({
    map: objTex,
    color: 0xffe08a,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    fog: false,
  })
  objMatRayCore = new THREE.MeshBasicMaterial({
    map: objTex,
    color: 0xffffff,
    transparent: true,
    opacity: 0.1,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    fog: false,
  })
}

function objBuildLightRay(): THREE.Group {
  vEnsureRayMaterials()
  const objRay = new THREE.Group()
  const objOuterGeo = new THREE.PlaneGeometry(nRayWidth, nRayHeight)
  const objCoreGeo = new THREE.PlaneGeometry(nRayCoreWidth, nRayHeight)

  const objOuterA = new THREE.Mesh(objOuterGeo, objMatRay!)
  const objOuterB = new THREE.Mesh(objOuterGeo, objMatRay!)
  objOuterB.rotation.y = Math.PI / 2

  const objCoreA = new THREE.Mesh(objCoreGeo, objMatRayCore!)
  const objCoreB = new THREE.Mesh(objCoreGeo, objMatRayCore!)
  objCoreB.rotation.y = Math.PI / 2

  objRay.add(objOuterA, objOuterB, objCoreA, objCoreB)
  objRay.position.y = 10.2 + nRayHeight * 0.5
  objRay.renderOrder = 2
  return objRay
}

function objBuildStatue(objCard: tExploreCard, nX: number, nZ: number): THREE.Group {
  const objGroup = new THREE.Group()
  const nGround = nSampleHeight(nX, nZ)

  const objStone = objMatStone.clone()
  const objGold = objMatGold.clone()
  const objPurple = objMatPurple.clone()

  const objBase = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.85, 5.2), objStone)
  objBase.position.y = 0.425

  const objStep = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.2, 3.8), objStone)
  objStep.position.y = 1.45

  const objBand = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.18, 4.0), objGold)
  objBand.position.y = 2.1

  const objPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.7, 2.4, 8), objPurple)
  objPillar.position.y = 3.35

  const objStele = new THREE.Mesh(new THREE.BoxGeometry(2.6, 5.8, 0.6), objStone)
  objStele.position.y = 7.0

  const objCap = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.28, 0.85), objGold)
  objCap.position.y = 10.05

  const objTex = objStatueTexture(objCard)
  const objFaceMat = new THREE.MeshStandardMaterial({
    map: objTex,
    roughness: 0.55,
    metalness: 0.15,
    emissive: 0x2a1a06,
    emissiveIntensity: 0.45,
    emissiveMap: objTex,
    side: THREE.DoubleSide,
  })
  const objFace = new THREE.Mesh(new THREE.PlaneGeometry(2.15, 5.1), objFaceMat)
  objFace.position.set(0, 7.0, 0.36)

  const objFaceBack = objFace.clone()
  objFaceBack.position.z = -0.36
  objFaceBack.rotation.y = Math.PI

  const objRay = objBuildLightRay()
  const objGlow = new THREE.PointLight(0xffe08a, 0, 28, 2)
  objGlow.position.set(0, 8.5, 0)

  objGroup.add(objBase, objStep, objBand, objPillar, objStele, objCap, objFace, objFaceBack, objRay, objGlow)
  objGroup.position.set(nX, nGround, nZ)
  objGroup.rotation.y = Math.atan2(nX, nZ) + Math.PI

  arrStatues.push({
    nX,
    nZ,
    bFound: false,
    objRay,
    arrLitMats: [objStone, objGold, objPurple, objFaceMat],
    objGlow,
  })

  return objGroup
}

function vDiscoverStatue(objStatue: tStatue): void {
  if (objStatue.bFound) {
    return
  }

  objStatue.bFound = true
  objStatue.objRay.visible = false
  objStatue.objGlow.intensity = 1.35
  objStatue.objGlow.distance = 22

  for (const objMat of objStatue.arrLitMats) {
    objMat.emissive.set(0x5a4418)
    objMat.emissiveIntensity = 0.52
    objMat.needsUpdate = true
  }

  nDwellUntil = performance.now() / 1000 + nStatueDwellSec
  if (objTargetStatue === objStatue) {
    vCommitTarget(null)
  }
}

function vUpdateStatueProximity(): void {
  const nR2 = nStatueFindRadius * nStatueFindRadius
  for (const objStatue of arrStatues) {
    if (objStatue.bFound) {
      continue
    }

    const nDx = objPlayerPos.x - objStatue.nX
    const nDz = objPlayerPos.z - objStatue.nZ
    if (nDx * nDx + nDz * nDz <= nR2) {
      vDiscoverStatue(objStatue)
    }
  }
}

function nStatueDist2(objStatue: tStatue): number {
  const nDx = objStatue.nX - objPlayerPos.x
  const nDz = objStatue.nZ - objPlayerPos.z
  return nDx * nDx + nDz * nDz
}

function objNearestUnfoundStatue(): tStatue | null {
  let objBest: tStatue | null = null
  let nBest = Infinity
  for (const objStatue of arrStatues) {
    if (objStatue.bFound) {
      continue
    }
    const nD2 = nStatueDist2(objStatue)
    if (nD2 < nBest) {
      nBest = nD2
      objBest = objStatue
    }
  }
  return objBest
}

function nAngleDiff(nFrom: number, nTo: number): number {
  let nDiff = nTo - nFrom
  while (nDiff > Math.PI) nDiff -= Math.PI * 2
  while (nDiff < -Math.PI) nDiff += Math.PI * 2
  return nDiff
}

function nTryStep(nYawDir: number, nStep: number): number {
  const nBeforeX = objPlayerPos.x
  const nBeforeZ = objPlayerPos.z
  vTryMove(Math.sin(nYawDir) * nStep, Math.cos(nYawDir) * nStep)
  return Math.hypot(objPlayerPos.x - nBeforeX, objPlayerPos.z - nBeforeZ)
}

function vCommitTarget(objStatue: tStatue | null): void {
  if (objTargetStatue === objStatue) {
    return
  }

  objTargetStatue = objStatue
  nStuckFrames = 0
  nAvoidUntil = 0
}

function vAutoNavigate(nDt: number): void {
  const nNow = performance.now() / 1000
  if (nNow < nDwellUntil) {
    return
  }

  if (!objTargetStatue || objTargetStatue.bFound) {
    vCommitTarget(objNearestUnfoundStatue())
  }
  if (!objTargetStatue) {
    return
  }

  const nDesiredYaw = Math.atan2(
    objTargetStatue.nX - objPlayerPos.x,
    objTargetStatue.nZ - objPlayerPos.z,
  )

  let nSteerYaw = nDesiredYaw
  if (nNow < nAvoidUntil) {
    nSteerYaw = nAvoidYaw
  }

  nMoveYaw += nAngleDiff(nMoveYaw, nSteerYaw) * Math.min(1, nTurnSpeed * nDt)

  if (!bLookDragging) {
    const nReturn = Math.min(1, nLookReturnSpeed * nDt)
    nYaw += nAngleDiff(nYaw, nMoveYaw) * nReturn
    nPitch += (nDefaultPitch - nPitch) * nReturn
  }

  const nStep = nMoveSpeed * nDt
  const nTravel = nTryStep(nMoveYaw, nStep)

  if (nTravel >= nStep * nStuckTravelFrac) {
    nStuckFrames = 0
    return
  }

  nStuckFrames += 1
  if (nStuckFrames < nStuckFramesBeforeAvoid || nNow < nAvoidUntil) {
    return
  }

  nAvoidSign = -nAvoidSign
  nAvoidYaw = nDesiredYaw + nAvoidSign * nAvoidAngle
  nAvoidUntil = nNow + nAvoidHoldSec
  nStuckFrames = 0
}

function vAddStatues(objParent: THREE.Object3D): void {
  if (arrExploreCards.length === 0) {
    return
  }

  arrStatues = []
  const arrSites = arrStatueSites(arrExploreCards.length)
  for (let nI = 0; nI < arrExploreCards.length; nI++) {
    const objCard = arrExploreCards[nI]!
    const objSite = arrSites[nI]!
    objParent.add(objBuildStatue(objCard, objSite.nX, objSite.nZ))
  }
}

function objFairyTexture(): THREE.CanvasTexture {
  if (objFairyTex) {
    return objFairyTex
  }

  const nS = 64
  const objCanvas = document.createElement('canvas')
  objCanvas.width = nS
  objCanvas.height = nS
  const objCtx = objCanvas.getContext('2d')!
  const nMid = nS * 0.5
  const objGrad = objCtx.createRadialGradient(nMid, nMid, 0, nMid, nMid, nMid)
  objGrad.addColorStop(0, 'rgba(255, 255, 255, 1)')
  objGrad.addColorStop(0.18, 'rgba(255, 236, 190, 0.95)')
  objGrad.addColorStop(0.42, 'rgba(255, 180, 90, 0.4)')
  objGrad.addColorStop(0.72, 'rgba(200, 120, 60, 0.1)')
  objGrad.addColorStop(1, 'rgba(160, 90, 40, 0)')
  objCtx.fillStyle = objGrad
  objCtx.fillRect(0, 0, nS, nS)

  objFairyTex = new THREE.CanvasTexture(objCanvas)
  objFairyTex.colorSpace = THREE.SRGBColorSpace
  return objFairyTex
}

function vRespawnFairy(objFairy: tFairy): void {
  const nAng = nMoveYaw + (Math.random() * 2 - 1) * nFairySpawnSpread
  const nDist = nFairySpawnMin + Math.random() * (nFairySpawnMax - nFairySpawnMin)
  objFairy.nX = objPlayerPos.x + Math.sin(nAng) * nDist
  objFairy.nZ = objPlayerPos.z + Math.cos(nAng) * nDist
  objFairy.nBaseY =
    nSampleHeight(objFairy.nX, objFairy.nZ) + nFairyHoverMin + Math.random() * nFairyHoverSpan
  objFairy.nPhase = Math.random() * Math.PI * 2
  objFairy.nOrbitR = 0.35 + Math.random() * 1.15
  objFairy.nOrbitSpd = 1.1 + Math.random() * 2.4
  objFairy.nBobSpd = 2.0 + Math.random() * 3.0
  objFairy.nBobAmp = 0.22 + Math.random() * 0.55
  objFairy.nDriftYaw = nAng + Math.PI + (Math.random() * 2 - 1) * 0.8
  objFairy.nDriftSpd = 0.7 + Math.random() * 1.8
  objFairy.nFade = 0
  objFairy.bActive = true
}

function vParkFairy(objFairy: tFairy): void {
  objFairy.bActive = false
  objFairy.nFade = 0
}

function vAddFairies(objParent: THREE.Object3D): void {
  arrFairies = []
  nFairySpawnCool = 0
  const arrPos = new Float32Array(nFairyCount * 3)
  const arrCol = new Float32Array(nFairyCount * 3)
  const arrPalette = [
    [1.0, 0.88, 0.52],
    [1.0, 0.72, 0.38],
    [0.95, 0.82, 0.62],
    [1.0, 0.78, 0.48],
    [0.9, 0.7, 0.42],
    [1.0, 0.92, 0.7],
  ]

  for (let nI = 0; nI < nFairyCount; nI++) {
    const arrRgb = arrPalette[nI % arrPalette.length]!
    const nBright = 0.75 + nHash2(nI + 3, nI * 11 + 5) * 0.35
    const objFairy: tFairy = {
      nX: 0,
      nZ: 0,
      nBaseY: 0,
      nPhase: 0,
      nOrbitR: 0,
      nOrbitSpd: 0,
      nBobSpd: 0,
      nBobAmp: 0,
      nDriftYaw: 0,
      nDriftSpd: 0,
      nFade: 0,
      nCr: arrRgb[0]! * nBright,
      nCg: arrRgb[1]! * nBright,
      nCb: arrRgb[2]! * nBright,
      bActive: false,
    }
    arrFairies.push(objFairy)
    arrCol[nI * 3] = 0
    arrCol[nI * 3 + 1] = 0
    arrCol[nI * 3 + 2] = 0
    arrPos[nI * 3] = 0
    arrPos[nI * 3 + 1] = -999
    arrPos[nI * 3 + 2] = 0
  }

  const objGeo = new THREE.BufferGeometry()
  objGeo.setAttribute('position', new THREE.BufferAttribute(arrPos, 3))
  objGeo.setAttribute('color', new THREE.BufferAttribute(arrCol, 3))

  const objMat = new THREE.PointsMaterial({
    map: objFairyTexture(),
    size: nFairySize,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    fog: false,
  })

  objFairyPoints = new THREE.Points(objGeo, objMat)
  objFairyPoints.frustumCulled = false
  objParent.add(objFairyPoints)
}

function vUpdateFairies(nDt: number): void {
  if (!objFairyPoints) {
    return
  }

  const objPos = objFairyPoints.geometry.getAttribute('position') as THREE.BufferAttribute
  const objCol = objFairyPoints.geometry.getAttribute('color') as THREE.BufferAttribute
  const nCull2 = nFairyCullR * nFairyCullR
  const nFadeRate = 1 / nFairyFadeSec

  nFairySpawnCool -= nDt
  if (nFairySpawnCool <= 0) {
    for (const objFairy of arrFairies) {
      if (!objFairy.bActive) {
        vRespawnFairy(objFairy)
        nFairySpawnCool = nFairySpawnGap
        break
      }
    }
  }

  for (let nI = 0; nI < arrFairies.length; nI++) {
    const objFairy = arrFairies[nI]!
    if (!objFairy.bActive) {
      objPos.setXYZ(nI, 0, -999, 0)
      objCol.setXYZ(nI, 0, 0, 0)
      continue
    }

    const nDx = objFairy.nX - objPlayerPos.x
    const nDz = objFairy.nZ - objPlayerPos.z
    if (nDx * nDx + nDz * nDz > nCull2) {
      vParkFairy(objFairy)
      objPos.setXYZ(nI, 0, -999, 0)
      objCol.setXYZ(nI, 0, 0, 0)
      continue
    }

    if (objFairy.nFade < 1) {
      objFairy.nFade = Math.min(1, objFairy.nFade + nFadeRate * nDt)
    }

    objFairy.nPhase += nDt
    objFairy.nDriftYaw += Math.sin(objFairy.nPhase * 0.65) * 1.6 * nDt
    objFairy.nX += Math.sin(objFairy.nDriftYaw) * objFairy.nDriftSpd * nDt
    objFairy.nZ += Math.cos(objFairy.nDriftYaw) * objFairy.nDriftSpd * nDt

    const nGround = nSampleHeight(objFairy.nX, objFairy.nZ)
    const nHover = nGround + nFairyHoverMin + nFairyHoverSpan * 0.45
    objFairy.nBaseY += (nHover - objFairy.nBaseY) * Math.min(1, 1.4 * nDt)

    const nOx = Math.sin(objFairy.nPhase * objFairy.nOrbitSpd) * objFairy.nOrbitR
    const nOz = Math.cos(objFairy.nPhase * objFairy.nOrbitSpd * 0.82) * objFairy.nOrbitR
    const nOy = Math.sin(objFairy.nPhase * objFairy.nBobSpd) * objFairy.nBobAmp
    objPos.setXYZ(nI, objFairy.nX + nOx, objFairy.nBaseY + nOy, objFairy.nZ + nOz)
    objCol.setXYZ(nI, objFairy.nCr * objFairy.nFade, objFairy.nCg * objFairy.nFade, objFairy.nCb * objFairy.nFade)
  }

  objPos.needsUpdate = true
  objCol.needsUpdate = true
}

function objSandTexture(): THREE.CanvasTexture {
  if (objSandTex) {
    return objSandTex
  }

  const nS = 64
  const objCanvas = document.createElement('canvas')
  objCanvas.width = nS
  objCanvas.height = nS
  const objCtx = objCanvas.getContext('2d')!
  const nMid = nS * 0.5
  const objGrad = objCtx.createRadialGradient(nMid, nMid, 0, nMid, nMid, nMid)
  objGrad.addColorStop(0, 'rgba(255, 255, 255, 1)')
  objGrad.addColorStop(0.12, 'rgba(255, 236, 160, 1)')
  objGrad.addColorStop(0.28, 'rgba(255, 200, 90, 0.85)')
  objGrad.addColorStop(0.5, 'rgba(230, 160, 60, 0.35)')
  objGrad.addColorStop(0.75, 'rgba(180, 120, 40, 0.08)')
  objGrad.addColorStop(1, 'rgba(120, 80, 30, 0)')
  objCtx.fillStyle = objGrad
  objCtx.fillRect(0, 0, nS, nS)

  // Tiny cross sparkle for glitter.
  objCtx.strokeStyle = 'rgba(255, 250, 220, 0.9)'
  objCtx.lineWidth = 1.5
  objCtx.beginPath()
  objCtx.moveTo(nMid, nMid - 10)
  objCtx.lineTo(nMid, nMid + 10)
  objCtx.moveTo(nMid - 10, nMid)
  objCtx.lineTo(nMid + 10, nMid)
  objCtx.stroke()

  objSandTex = new THREE.CanvasTexture(objCanvas)
  objSandTex.colorSpace = THREE.SRGBColorSpace
  return objSandTex
}

function vRespawnSandMote(objMote: tSandMote): void {
  // Spawn mostly upwind so grains blow past the pilgrim.
  const nWindYaw = nSandWindYaw + Math.sin(nSandWindPhase * 0.35) * 0.25
  const nAng = nWindYaw + Math.PI + (Math.random() * 2 - 1) * 0.95
  // Bias toward farther rings so distant wind sheets stay visible.
  const nDistT = Math.sqrt(Math.random())
  const nDist = nSandSpawnMin + nDistT * (nSandSpawnMax - nSandSpawnMin)
  objMote.nX = objPlayerPos.x + Math.sin(nAng) * nDist
  objMote.nZ = objPlayerPos.z + Math.cos(nAng) * nDist
  const nGround = nSampleHeight(objMote.nX, objMote.nZ)
  objMote.nY = nGround + nSandLiftMin + Math.random() * (nSandLiftMax - nSandLiftMin)

  const nGust = nSandWindSpd + (Math.random() * 2 - 1) * nSandWindGust
  const nYawJitter = nWindYaw + (Math.random() * 2 - 1) * 0.35
  objMote.nVx = Math.sin(nYawJitter) * nGust
  objMote.nVz = Math.cos(nYawJitter) * nGust
  objMote.nVy = (Math.random() - 0.35) * 2.8

  objMote.nMaxLife = nSandLifeMin + Math.random() * (nSandLifeMax - nSandLifeMin)
  objMote.nLife = objMote.nMaxLife
  objMote.nTwinkle = Math.random() * Math.PI * 2
  objMote.nTwinkleSpd = nSandTwinkleSpd * (0.65 + Math.random() * 0.9)

  const nRoll = Math.random()
  if (nRoll > 0.82) {
    // Hot glitter spark.
    objMote.nCr = 1.0
    objMote.nCg = 0.92
    objMote.nCb = 0.7
    objMote.nBright = 1.15 + Math.random() * 0.55
  } else if (nRoll > 0.45) {
    objMote.nCr = 0.95
    objMote.nCg = 0.72
    objMote.nCb = 0.32
    objMote.nBright = 0.7 + Math.random() * 0.4
  } else {
    objMote.nCr = 0.82
    objMote.nCg = 0.58
    objMote.nCb = 0.28
    objMote.nBright = 0.45 + Math.random() * 0.35
  }
}

function vAddSandWind(objParent: THREE.Object3D): void {
  arrSandMotes = []
  nSandWindPhase = 0
  const arrPos = new Float32Array(nSandCount * 3)
  const arrCol = new Float32Array(nSandCount * 3)

  for (let nI = 0; nI < nSandCount; nI++) {
    const objMote: tSandMote = {
      nX: 0,
      nY: -999,
      nZ: 0,
      nVx: 0,
      nVy: 0,
      nVz: 0,
      nLife: 0,
      nMaxLife: 1,
      nTwinkle: 0,
      nTwinkleSpd: nSandTwinkleSpd,
      nCr: 1,
      nCg: 0.8,
      nCb: 0.4,
      nBright: 1,
    }
    vRespawnSandMote(objMote)
    // Stagger lifetimes so the field is already mid-blow on first frame.
    objMote.nLife = Math.random() * objMote.nMaxLife
    arrSandMotes.push(objMote)
    arrPos[nI * 3] = objMote.nX
    arrPos[nI * 3 + 1] = objMote.nY
    arrPos[nI * 3 + 2] = objMote.nZ
    arrCol[nI * 3] = 0
    arrCol[nI * 3 + 1] = 0
    arrCol[nI * 3 + 2] = 0
  }

  const objGeo = new THREE.BufferGeometry()
  objGeo.setAttribute('position', new THREE.BufferAttribute(arrPos, 3))
  objGeo.setAttribute('color', new THREE.BufferAttribute(arrCol, 3))

  const objMat = new THREE.PointsMaterial({
    map: objSandTexture(),
    size: nSandSize,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    fog: false,
  })

  objSandPoints = new THREE.Points(objGeo, objMat)
  objSandPoints.frustumCulled = false
  objParent.add(objSandPoints)
}

function vUpdateSandWind(nDt: number): void {
  if (!objSandPoints) {
    return
  }

  const objPos = objSandPoints.geometry.getAttribute('position') as THREE.BufferAttribute
  const objCol = objSandPoints.geometry.getAttribute('color') as THREE.BufferAttribute
  const nCull2 = nSandCullR * nSandCullR
  nSandWindPhase += nDt

  for (let nI = 0; nI < arrSandMotes.length; nI++) {
    const objMote = arrSandMotes[nI]!
    objMote.nLife -= nDt

    const nDx = objMote.nX - objPlayerPos.x
    const nDz = objMote.nZ - objPlayerPos.z
    if (objMote.nLife <= 0 || nDx * nDx + nDz * nDz > nCull2) {
      vRespawnSandMote(objMote)
    }

    // Gust flutter + gentle settle.
    const nFlutter = Math.sin(nSandWindPhase * 3.2 + objMote.nTwinkle) * 1.8
    objMote.nX += (objMote.nVx + nFlutter * 0.35) * nDt
    objMote.nZ += (objMote.nVz + Math.cos(objMote.nTwinkle) * 1.2) * nDt
    objMote.nVy += -1.6 * nDt
    objMote.nY += objMote.nVy * nDt

    const nGround = nSampleHeight(objMote.nX, objMote.nZ) + 0.15
    if (objMote.nY < nGround) {
      objMote.nY = nGround
      objMote.nVy = Math.abs(objMote.nVy) * 0.35 + Math.random() * 0.8
    }

    objMote.nTwinkle += objMote.nTwinkleSpd * nDt
    const nLifeT = Math.max(0, objMote.nLife / objMote.nMaxLife)
    const nFade = nLifeT < 0.2 ? nLifeT / 0.2 : nLifeT > 0.75 ? (1 - nLifeT) / 0.25 : 1
    const nSpark = 0.55 + 0.45 * Math.max(0, Math.sin(objMote.nTwinkle))
    const nGlint = Math.pow(Math.max(0, Math.sin(objMote.nTwinkle * 1.7)), 8) * 0.85
    const nLit = (objMote.nBright * nSpark + nGlint) * nFade

    objPos.setXYZ(nI, objMote.nX, objMote.nY, objMote.nZ)
    objCol.setXYZ(nI, objMote.nCr * nLit, objMote.nCg * nLit, objMote.nCb * nLit)
  }

  objPos.needsUpdate = true
  objCol.needsUpdate = true
}

function objSkyMat(nColor: number): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({
    color: nColor,
    fog: false,
  })
}

function objBuildStarfield(): THREE.Points {
  const arrPos = new Float32Array(nStarCount * 3)
  const arrCol = new Float32Array(nStarCount * 3)
  const arrPalette = [
    [0.55, 0.42, 0.28],
    [0.4, 0.32, 0.55],
    [0.52, 0.36, 0.48],
    [0.62, 0.52, 0.32],
    [0.32, 0.24, 0.48],
    [0.48, 0.38, 0.55],
    [0.45, 0.34, 0.28],
    [0.58, 0.48, 0.62],
  ]

  for (let nI = 0; nI < nStarCount; nI++) {
    const nU = nHash2(nI + 2, nI * 5 + 9)
    const nV = nHash2(nI * 3 + 1, nI + 17)
    const nW = nHash2(nI + 41, nI * 11 + 3)
    const nTheta = nU * Math.PI * 2
    // Cover the sky and reach well below the horizon so the rim stays full.
    const nPhi = Math.acos(1 - 1.45 * nV)
    const nR = nStarRadius * (0.82 + nW * 0.18)
    arrPos[nI * 3] = Math.sin(nPhi) * Math.cos(nTheta) * nR
    arrPos[nI * 3 + 1] = Math.cos(nPhi) * nR
    arrPos[nI * 3 + 2] = Math.sin(nPhi) * Math.sin(nTheta) * nR

    const arrRgb = arrPalette[Math.floor(nHash2(nI + 7, nI * 2 + 4) * arrPalette.length)]!
    const nRoll = nHash2(nI * 9 + 3, nI + 28)
    // Most stars stay dim; a few remain brighter sparks.
    const nBright = nRoll > 0.88 ? 0.7 + nRoll * 0.3 : 0.22 + nRoll * 0.28
    arrCol[nI * 3] = arrRgb[0]! * nBright
    arrCol[nI * 3 + 1] = arrRgb[1]! * nBright
    arrCol[nI * 3 + 2] = arrRgb[2]! * nBright
  }

  const objGeo = new THREE.BufferGeometry()
  objGeo.setAttribute('position', new THREE.BufferAttribute(arrPos, 3))
  objGeo.setAttribute('color', new THREE.BufferAttribute(arrCol, 3))

  const objMat = new THREE.PointsMaterial({
    size: nStarSize,
    sizeAttenuation: true,
    vertexColors: true,
    fog: false,
    depthWrite: false,
    transparent: true,
    opacity: 0.92,
  })

  const objStars = new THREE.Points(objGeo, objMat)
  objStars.frustumCulled = false
  return objStars
}

function vAddStarfield(objParent: THREE.Object3D): void {
  objStarRoot = new THREE.Group()
  objStarRoot.add(objBuildStarfield())
  objParent.add(objStarRoot)
}

function vAddSkyOrbits(objParent: THREE.Object3D): void {
  objSkyRoot = new THREE.Group()
  arrSkyOrbits = []
  objSkyRoot.rotation.x = nSkyTilt
  objSkyRoot.rotation.z = 0.18

  const objBodyGeo = new THREE.SphereGeometry(1, 24, 16)
  const objSun = new THREE.Mesh(objBodyGeo, objSkyMat(0xd4a050))
  objSun.scale.setScalar(240)
  objSkyRoot.add(objSun)

  const arrPalette = [0x8a6040, 0x6a5848, 0x5a4860, 0x7a5038, 0x4a5868, 0x8a7048, 0x584838, 0x3a4858, 0x705040, 0x6a6850, 0x485060, 0x7a5838, 0x504848, 0x685848]

  const nPlanetCount = 5
  for (let nI = 0; nI < nPlanetCount; nI++) {
    const nT = (nI + 0.5) / nPlanetCount
    const nOrbitR = 880 + nT * 5760
    const nSeed = nHash2(nI + 3, nI * 7 + 11)
    const nSeedB = nHash2(nI * 5 + 2, nI + 41)
    const nSeedC = nHash2(nI + 19, nI * 3 + 8)
    const nSize = (3.5 + nSeed * 14 + (nI % 9 === 4 ? 6 : 0)) * 10
    const nColor = arrPalette[Math.floor(nSeedB * arrPalette.length)]!
    const nSpeed = 0.035 * Math.pow(880 / nOrbitR, 1.35) * (0.75 + nSeedC * 0.5)

    const objPivot = new THREE.Group()
    objPivot.rotation.y = nSeed * Math.PI * 2
    objPivot.rotation.x = (nSeedB - 0.5) * 0.28

    const objPlanet = new THREE.Mesh(objBodyGeo, objSkyMat(nColor))
    objPlanet.scale.setScalar(nSize)
    objPlanet.position.x = nOrbitR
    objPivot.add(objPlanet)

    objSkyRoot.add(objPivot)
    arrSkyOrbits.push({ objPivot, nSpeed })
  }

  objParent.add(objSkyRoot)
}

function vUpdateSkyOrbits(nDt: number): void {
  if (objSkyRoot) {
    objSkyRoot.position.set(objPlayerPos.x, objPlayerPos.y + nSkyLift, objPlayerPos.z)
    for (const objOrbit of arrSkyOrbits) {
      objOrbit.objPivot.rotation.y += objOrbit.nSpeed * nDt
    }
  }

  if (objStarRoot) {
    objStarRoot.position.copy(objPlayerPos)
    objStarRoot.rotation.y += nStarDrift * nDt
  }
}

function vUpdateCameraOrientation(): void {
  if (!objCamera) {
    return
  }

  objLookDir.set(
    Math.sin(nYaw) * Math.cos(nPitch),
    Math.sin(nPitch),
    Math.cos(nYaw) * Math.cos(nPitch),
  )
  const nBobY = Math.sin(nBobPhase) * nBobAmp * nBobBlend
  objCamera.position.set(objPlayerPos.x, objPlayerPos.y + nBobY, objPlayerPos.z)
  objCamera.lookAt(
    objPlayerPos.x + objLookDir.x,
    objPlayerPos.y + nBobY + objLookDir.y,
    objPlayerPos.z + objLookDir.z,
  )
}

function vPlacePlayerOnTerrain(): void {
  const nX = (Math.random() * 2 - 1) * nSpawnHalf
  const nZ = (Math.random() * 2 - 1) * nSpawnHalf
  const nGround = nSampleHeight(nX, nZ)
  const nFacing = Math.random() * Math.PI * 2
  objPlayerPos.set(nX, nGround + nEyeHeight, nZ)
  nYaw = nFacing
  nMoveYaw = nFacing
  nPitch = nDefaultPitch
  nBobPhase = 0
  nBobBlend = 0
  vUpdateCameraOrientation()
}

function vInitVhsPass(): void {
  if (!bVhsEnabled || !objRenderer || objVhsMat) {
    return
  }

  objSceneTarget = new THREE.WebGLRenderTarget(1, 1, {
    samples: 4,
    depthBuffer: true,
  })
  objSceneTarget.texture.colorSpace = THREE.SRGBColorSpace

  objVhsMat = new THREE.ShaderMaterial({
    uniforms: {
      tDiffuse: { value: objSceneTarget.texture },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uBleedPx: { value: nVhsBleedPx },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform vec2 uResolution;
      uniform float uBleedPx;
      varying vec2 vUv;

      void main() {
        vec2 objPx = 1.0 / max(uResolution, vec2(1.0));
        float nBleed = uBleedPx * objPx.x;

        float nR = texture2D(tDiffuse, vUv + vec2(nBleed, 0.0)).r;
        float nG = texture2D(tDiffuse, vUv).g;
        float nB = texture2D(tDiffuse, vUv - vec2(nBleed, 0.0)).b;

        gl_FragColor = vec4(nR, nG, nB, 1.0);
      }
    `,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
  })

  objVhsCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  objVhsScene = new THREE.Scene()
  objVhsScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), objVhsMat))
}

function vResize(): void {
  if (!objRenderer || !objCamera || !objCanvasHost) {
    return
  }

  const nW = objCanvasHost.clientWidth
  const nH = Math.max(1, objCanvasHost.clientHeight)
  objRenderer.setSize(nW, nH, false)
  objCamera.aspect = nW / nH
  objCamera.updateProjectionMatrix()

  if (bVhsEnabled && objSceneTarget && objVhsMat) {
    const nPr = objRenderer.getPixelRatio()
    const nRw = Math.max(1, Math.floor(nW * nPr))
    const nRh = Math.max(1, Math.floor(nH * nPr))
    objSceneTarget.setSize(nRw, nRh)
    objVhsMat.uniforms.uResolution.value.set(nRw, nRh)
  }
}

function bCanStandAt(nX: number, nZ: number, nFromH: number): boolean {
  if (Math.abs(nX) > nPlayHalf || Math.abs(nZ) > nPlayHalf) {
    return false
  }

  const nToH = nSampleHeight(nX, nZ)
  const nHoriz = Math.hypot(nX - objPlayerPos.x, nZ - objPlayerPos.z)
  if (nHoriz < 1e-6) {
    return true
  }

  return (nToH - nFromH) / nHoriz <= nMaxClimb
}

function vTryMove(nDx: number, nDz: number): void {
  if (nDx === 0 && nDz === 0) {
    return
  }

  const nFromH = nSampleHeight(objPlayerPos.x, objPlayerPos.z)
  const nNx = objPlayerPos.x + nDx
  const nNz = objPlayerPos.z + nDz

  if (bCanStandAt(nNx, nNz, nFromH)) {
    objPlayerPos.x = nNx
    objPlayerPos.z = nNz
    return
  }

  if (bCanStandAt(nNx, objPlayerPos.z, nFromH)) {
    objPlayerPos.x = nNx
    return
  }

  if (bCanStandAt(objPlayerPos.x, nNz, nFromH)) {
    objPlayerPos.z = nNz
  }
}

function vTick(nTs: number): void {
  if (!bRunning || !objRenderer || !objScene || !objCamera) {
    return
  }

  const nDt = Math.min(0.05, (nTs - nLastTs) / 1000 || 0.016)
  nLastTs = nTs

  vAutoNavigate(nDt)

  objPlayerPos.y = nSampleHeight(objPlayerPos.x, objPlayerPos.z) + nEyeHeight

  const nWantBob = performance.now() / 1000 >= nDwellUntil && objTargetStatue ? 1 : 0
  nBobBlend += (nWantBob - nBobBlend) * Math.min(1, nBobBlendSpeed * nDt)
  nBobPhase += nBobSpeed * nBobBlend * nDt

  vUpdateStatueProximity()
  vUpdateSkyOrbits(nDt)
  vUpdateFairies(nDt)
  vUpdateSandWind(nDt)
  vUpdateCameraOrientation()

  if (bVhsEnabled && objSceneTarget && objVhsScene && objVhsCam && objVhsMat) {
    objRenderer.setRenderTarget(objSceneTarget)
    objRenderer.render(objScene, objCamera)
    objRenderer.setRenderTarget(null)
    objRenderer.render(objVhsScene, objVhsCam)
  } else {
    objRenderer.render(objScene, objCamera)
  }

  if (bAwaitingReveal && objCanvasHost) {
    bAwaitingReveal = false
    objCanvasHost.classList.add('is-revealed')
  }

  nAnimFrame = window.requestAnimationFrame(vTick)
}

function vInitScene(): void {
  if (!objCanvasHost || objRenderer) {
    return
  }

  objScene = new THREE.Scene()
  objScene.background = new THREE.Color(0x1a1028)
  objScene.fog = new THREE.Fog(0x2a1838, nFogNear, nFogFar)

  objCamera = new THREE.PerspectiveCamera(70, 1, 0.1, 16000)

  objRenderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
  objRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  objRenderer.outputColorSpace = THREE.SRGBColorSpace
  objCanvasHost.appendChild(objRenderer.domElement)
  vInitVhsPass()

  const objAmb = new THREE.AmbientLight(0xe0c090, 0.72)
  objScene.add(objAmb)

  const objSun = new THREE.DirectionalLight(0xffe08a, 1.7)
  objSun.position.set(160, 200, 60)
  objScene.add(objSun)

  const objFill = new THREE.DirectionalLight(0x9a62d8, 0.55)
  objFill.position.set(-100, 50, -150)
  objScene.add(objFill)

  const objSky = new THREE.Mesh(
    new THREE.SphereGeometry(12000, 24, 16),
    new THREE.MeshBasicMaterial({
      color: 0x1c1030,
      side: THREE.BackSide,
      fog: false,
    }),
  )
  objScene.add(objSky)

  vAddStarfield(objScene)
  vAddSkyOrbits(objScene)
  objScene.add(objBuildTerrain())
  vAddMountainPyramids(objScene)
  vAddStatues(objScene)
  vAddFairies(objScene)
  vAddSandWind(objScene)
  vCommitTarget(null)

  vPlacePlayerOnTerrain()
  vResize()
}

function vCancelPendingStart(): void {
  if (nStartTimer !== 0) {
    window.clearTimeout(nStartTimer)
    nStartTimer = 0
  }
}

function vStart(): void {
  if (bRunning) {
    return
  }

  vInitScene()
  if (!objRenderer) {
    return
  }

  bRunning = true
  bAwaitingReveal = true
  objCanvasHost?.classList.remove('is-revealed')
  nLastTs = performance.now()
  vResize()
  nAnimFrame = window.requestAnimationFrame(vTick)
}

function vStop(): void {
  vCancelPendingStart()
  bRunning = false
  bAwaitingReveal = false
  bLookDragging = false
  nLookPtrId = -1
  objCanvasHost?.classList.remove('is-dragging')
  objCanvasHost?.classList.remove('is-revealed')
  vCommitTarget(null)
  if (nAnimFrame !== 0) {
    window.cancelAnimationFrame(nAnimFrame)
    nAnimFrame = 0
  }
}

function vEndLookDrag(nPtrId: number): void {
  if (!bLookDragging || nLookPtrId !== nPtrId) {
    return
  }

  bLookDragging = false
  nLookPtrId = -1
  if (objCanvasHost) {
    objCanvasHost.classList.remove('is-dragging')
    try {
      objCanvasHost.releasePointerCapture(nPtrId)
    } catch {
      /* already released */
    }
  }
}

function vBindLookDrag(objHost: HTMLElement): void {
  objHost.addEventListener('pointerdown', (objEv) => {
    if (objEv.button !== 0 || !bRunning) {
      return
    }

    bLookDragging = true
    nLookPtrId = objEv.pointerId
    nLookLastX = objEv.clientX
    nLookLastY = objEv.clientY
    objHost.classList.add('is-dragging')
    objHost.setPointerCapture(objEv.pointerId)
    objEv.preventDefault()
  })

  objHost.addEventListener('pointermove', (objEv) => {
    if (!bLookDragging || objEv.pointerId !== nLookPtrId) {
      return
    }

    const nDx = objEv.clientX - nLookLastX
    const nDy = objEv.clientY - nLookLastY
    nLookLastX = objEv.clientX
    nLookLastY = objEv.clientY
    nYaw += nDx * nLookSens
    nPitch = Math.min(nPitchMax, Math.max(nPitchMin, nPitch + nDy * nLookSens))
  })

  objHost.addEventListener('pointerup', (objEv) => {
    vEndLookDrag(objEv.pointerId)
  })
  objHost.addEventListener('pointercancel', (objEv) => {
    vEndLookDrag(objEv.pointerId)
  })
  objHost.addEventListener('lostpointercapture', (objEv) => {
    vEndLookDrag(objEv.pointerId)
  })
}

export function sExploreMarkup(): string {
  return `
    <div class="explore" id="explore">
      <div class="explore-viewport" id="explore-viewport" role="img" aria-label="Terrain explorer — drag to look around"></div>
      <p class="explore-caption">pilgrim · desert dunes, distant mountains & statues</p>
    </div>
  `
}

export function vBindExplore(arrCards: tExploreCard[]): void {
  arrExploreCards = arrCards
  objCanvasHost = document.querySelector<HTMLElement>('#explore-viewport')
  if (!objCanvasHost) {
    return
  }

  vBindLookDrag(objCanvasHost)

  window.addEventListener('resize', () => {
    if (bRunning) {
      vResize()
    }
  })

  const objPanel = document.querySelector<HTMLElement>('[data-panel="pilgrim"]')
  if (objPanel?.classList.contains('is-active')) {
    vSetExploreActive(true)
  }
}

export function vSetExploreActive(bActive: boolean): void {
  vCancelPendingStart()
  if (!bActive) {
    vStop()
    return
  }

  // Already built: resume the loop immediately. First visit: let the tab paint
  // before the heavy terrain geometry work blocks the main thread.
  if (objRenderer) {
    vStart()
    return
  }

  nStartTimer = window.setTimeout(() => {
    nStartTimer = 0
    vStart()
  }, nExploreStartDelayMs)
}
