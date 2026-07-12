import * as THREE from 'three'
import { sCardIconPaths } from './cardIcons'

const nTerrainSize = 5120
const nTerrainSegs = 320
const nHeightScale = 78
const nHillPeakScale = 110
const nMaxClimb = 0.95
const nMoveSpeed = 28
const nTurnSpeed = 1.8
const nEyeHeight = 2.2
const nFogNear = 80
const nFogFar = 1100
const nPlayHalf = nTerrainSize * 0.5 - 1.5
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
const nFloraTreeCount = 1400
const nFloraMargin = 48
const nFloraClearSpawn = 36
const nFloraClearStatue = 24
const nFloraLift = -2.8
const nTreeTrunkBaseR = 0.95
const nTreeClearPad = 2.4
const nTreeScaleMin = 9
const nTreeScaleSpan = 16
const nTreeLookAhead = 48
const nTreeSteerAngle = 1.15
const nGrassCount = 2200
const nGrassRadius = 58
const nGrassCell = 1.85
const nGrassClearFeet = 2.8
const nGrassLift = 0.02
const nGrassMaxHeightT = 0.30
const nSnowCount = 1600
const nSnowRadius = 62
const nSnowCell = 2.35
const nSnowClearFeet = 3.2
const nSnowLift = 0.04
const nSnowMinHeightT = 0.45
const nSkyLift = 2560
const nSkyTilt = 0.42
const nStarCount = 2400
const nStarRadius = 9000
const nStarSize = 6.5
const nStarDrift = 0.003
const nFairyCount = 16
const nFairyCullR = 38
const nFairySpawnMin = 16
const nFairySpawnMax = 28
const nFairySpawnSpread = 0.7
const nFairySize = 0.85
const nFairyHoverMin = 1.1
const nFairyHoverSpan = 2.6
const nFairyFadeSec = 1.35
const nFairySpawnGap = 0.4
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

type tTree = {
  nX: number
  nZ: number
  nR: number
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

let arrExploreCards: tExploreCard[] = []
let arrStatues: tStatue[] = []
let arrTrees: tTree[] = []
let objCanvasHost: HTMLElement | null = null
let objRenderer: THREE.WebGLRenderer | null = null
let objScene: THREE.Scene | null = null
let objCamera: THREE.PerspectiveCamera | null = null
let arrHeights: Float32Array | null = null
let nTerrainMinH = 0
let nTerrainMaxH = 1
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
let bLookDragging = false
let nLookPtrId = -1
let nLookLastX = 0
let nLookLastY = 0
let objSkyRoot: THREE.Group | null = null
let objStarRoot: THREE.Group | null = null
let arrSkyOrbits: tSkyOrbit[] = []
let objGrassMesh: THREE.InstancedMesh | null = null
let nGrassLastCx = Number.NaN
let nGrassLastCz = Number.NaN
let objSnowMesh: THREE.InstancedMesh | null = null
let nSnowLastCx = Number.NaN
let nSnowLastCz = Number.NaN
let objFairyPoints: THREE.Points | null = null
let arrFairies: tFairy[] = []
let objFairyTex: THREE.CanvasTexture | null = null
let nFairySpawnCool = 0
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
const objMatTrunk = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.94,
  metalness: 0.06,
  vertexColors: true,
  emissive: 0x050302,
  emissiveIntensity: 0.05,
})
const objMatCanopy = new THREE.MeshStandardMaterial({
  color: 0x5a38a0,
  roughness: 0.82,
  metalness: 0.1,
  emissive: 0x2a1458,
  emissiveIntensity: 0.32,
})
const objMatGrass = new THREE.MeshStandardMaterial({
  color: 0x3a6a52,
  roughness: 0.86,
  metalness: 0.04,
  emissive: 0x183828,
  emissiveIntensity: 0.22,
  side: THREE.DoubleSide,
})
const objMatSnow = new THREE.MeshStandardMaterial({
  color: 0xe8b0d0,
  roughness: 0.78,
  metalness: 0.08,
  emissive: 0x582848,
  emissiveIntensity: 0.24,
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

function nInteriorHeight(nX: number, nZ: number): number {
  const nWarp = (nFbm(nX * 0.0024, nZ * 0.0024, 3) - 0.5) * 120
  const nWx = nX + nWarp
  const nWz = nZ - nWarp * 0.7

  const nContinent = nFbm(nWx * 0.0016, nWz * 0.0016, 4)
  const nRolling = nFbm(nWx * 0.0055 + 3.1, nWz * 0.0055 - 1.7, 5)
  const nLocal = nFbm(nWx * 0.014 + 11, nWz * 0.014 + 4, 4)
  const nRidge = 1 - Math.abs(nFbm(nWx * 0.0038 + 20, nWz * 0.0038 - 11, 4) * 2 - 1)
  const nPeaks = Math.pow(nFbm(nWx * 0.0042 - 8, nWz * 0.0042 + 15, 5), 2.1)

  let nH =
    nContinent * 0.34 +
    nRolling * 0.32 +
    nLocal * 0.16 +
    nRidge * nRidge * 0.28
  nH = Math.pow(Math.min(1, Math.max(0, nH)), 0.95)
  nH = nH * nHeightScale + nPeaks * nHillPeakScale
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
  const nT = Math.min(1, Math.max(0, (nH - nMin) / Math.max(0.001, nMax - nMin)))
  if (nT < 0.28) {
    objColor.setRGB(0.08, 0.08, 0.21)
  } else if (nT < 0.45) {
    objColor.setRGB(0.18, 0.12, 0.31)
  } else if (nT < 0.62) {
    objColor.setRGB(0.3, 0.17, 0.48)
  } else if (nT < 0.78) {
    objColor.setRGB(0.535, 0.34, 0.8)
  } else if (nT < 0.9) {
    objColor.setRGB(0.79, 0.615, 0.34)
  } else {
    objColor.setRGB(0.95, 0.9, 0.7)
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

  nTerrainMinH = nMinH
  nTerrainMaxH = nMaxH

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
    roughness: 0.92,
    metalness: 0.08,
    flatShading: false,
  })

  const objMesh = new THREE.Mesh(objGeo, objMat)
  objMesh.receiveShadow = true
  return objMesh
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

function bHitsTree(nX: number, nZ: number): boolean {
  for (const objTree of arrTrees) {
    const nDx = nX - objTree.nX
    const nDz = nZ - objTree.nZ
    const nR = objTree.nR
    if (nDx * nDx + nDz * nDz < nR * nR) {
      return true
    }
  }
  return false
}

function nSteerAroundTrees(nDesiredYaw: number): number {
  const nFx = Math.sin(nDesiredYaw)
  const nFz = Math.cos(nDesiredYaw)
  let nHitAlong = Infinity
  let nHitAcross = 0

  for (const objTree of arrTrees) {
    const nDx = objTree.nX - objPlayerPos.x
    const nDz = objTree.nZ - objPlayerPos.z
    const nAlong = nDx * nFx + nDz * nFz
    if (nAlong < 0 || nAlong > nTreeLookAhead || nAlong >= nHitAlong) {
      continue
    }

    const nAcross = nDx * nFz - nDz * nFx
    if (Math.abs(nAcross) > objTree.nR) {
      continue
    }

    nHitAlong = nAlong
    nHitAcross = nAcross
  }

  if (nHitAlong === Infinity) {
    return nDesiredYaw
  }

  const nSide = nHitAcross >= 0 ? -1 : 1
  return nDesiredYaw + nSide * nTreeSteerAngle
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
  } else {
    nSteerYaw = nSteerAroundTrees(nDesiredYaw)
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

function bFloraSiteOk(nX: number, nZ: number): boolean {
  if (Math.hypot(nX, nZ) < nFloraClearSpawn) {
    return false
  }

  const nClear2 = nFloraClearStatue * nFloraClearStatue
  for (const objStatue of arrStatues) {
    const nDx = nX - objStatue.nX
    const nDz = nZ - objStatue.nZ
    if (nDx * nDx + nDz * nDz < nClear2) {
      return false
    }
  }
  return true
}

function arrFloraSites(nCount: number, nSalt: number): { nX: number; nZ: number; nSeed: number }[] {
  const nHalf = nTerrainSize * 0.5 - nFloraMargin
  const nGrid = Math.ceil(Math.sqrt(nCount * 4.5))
  const nCell = (nHalf * 2) / nGrid
  const arrCandidates: { nX: number; nZ: number; nSeed: number; nPick: number }[] = []

  for (let nGz = 0; nGz < nGrid; nGz++) {
    for (let nGx = 0; nGx < nGrid; nGx++) {
      const nSeed = nHash2(nGx + nSalt * 17, nGz + nSalt * 29)
      if (nSeed > 0.78) {
        continue
      }

      const nJx = nHash2(nGx + nSalt + 3, nGz + 71)
      const nJz = nHash2(nGx + 41, nGz + nSalt + 9)
      const nX = -nHalf + (nGx + nJx) * nCell
      const nZ = -nHalf + (nGz + nJz) * nCell
      if (!bFloraSiteOk(nX, nZ)) {
        continue
      }

      arrCandidates.push({
        nX,
        nZ,
        nSeed,
        nPick: nHash2(nGx + nSalt * 53, nGz + nSalt * 91),
      })
    }
  }

  if (arrCandidates.length <= nCount) {
    return arrCandidates.map(({ nX, nZ, nSeed }) => ({ nX, nZ, nSeed }))
  }

  arrCandidates.sort((objA, objB) => objA.nPick - objB.nPick)
  const arrOut: { nX: number; nZ: number; nSeed: number }[] = []
  for (let nI = 0; nI < nCount; nI++) {
    const objSite = arrCandidates[nI]!
    arrOut.push({ nX: objSite.nX, nZ: objSite.nZ, nSeed: objSite.nSeed })
  }
  return arrOut
}

function objBuildTreeGeos(): { objTrunk: THREE.BufferGeometry; objCanopy: THREE.BufferGeometry } {
  const objTrunk = new THREE.CylinderGeometry(0.55, 0.95, 8.5, 5)
  objTrunk.translate(0, 4.25, 0)

  const objPos = objTrunk.attributes.position as THREE.BufferAttribute
  const arrColors = new Float32Array(objPos.count * 3)
  const nTrunkH = 8.5
  for (let nI = 0; nI < objPos.count; nI++) {
    const nT = Math.min(1, Math.max(0, objPos.getY(nI) / nTrunkH))
    // Stronger light near the ground, falling off toward the canopy.
    const nLit = Math.pow(1 - nT, 1.55)
    const nBr = 0.028 + 0.06 * nLit
    const nBg = 0.015 + 0.028 * nLit
    const nBb = 0.01 + 0.012 * nLit
    arrColors[nI * 3] = nBr
    arrColors[nI * 3 + 1] = nBg
    arrColors[nI * 3 + 2] = nBb
  }
  objTrunk.setAttribute('color', new THREE.BufferAttribute(arrColors, 3))

  const objCanopy = new THREE.ConeGeometry(3.8, 9.0, 6)
  objCanopy.translate(0, 11.0, 0)
  return { objTrunk, objCanopy }
}

function vAddFlora(objParent: THREE.Object3D): void {
  const objDummyPos = new THREE.Vector3()
  const objDummyQuat = new THREE.Quaternion()
  const objDummyScale = new THREE.Vector3()
  const objUp = new THREE.Vector3(0, 1, 0)
  const objMatrix = new THREE.Matrix4()

  const vPlace = (
    objMesh: THREE.InstancedMesh,
    arrSites: { nX: number; nZ: number; nSeed: number }[],
    nScaleMin: number,
    nScaleSpan: number,
  ): void => {
    for (let nI = 0; nI < arrSites.length; nI++) {
      const objSite = arrSites[nI]!
      const nYaw = objSite.nSeed * Math.PI * 2
      const nScale = nScaleMin + nHash2(nI + 11, Math.floor(objSite.nSeed * 9999)) * nScaleSpan
      const nGround = nSampleHeight(objSite.nX, objSite.nZ) + nFloraLift
      objDummyPos.set(objSite.nX, nGround, objSite.nZ)
      objDummyQuat.setFromAxisAngle(objUp, nYaw)
      objDummyScale.set(nScale, nScale, nScale)
      objMatrix.compose(objDummyPos, objDummyQuat, objDummyScale)
      objMesh.setMatrixAt(nI, objMatrix)
    }
    objMesh.instanceMatrix.needsUpdate = true
    // Instance transforms span the whole map; default bounds sit at the origin and cull everything.
    objMesh.frustumCulled = false
    objMesh.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), nTerrainSize)
    objParent.add(objMesh)
  }

  const objTreeGeos = objBuildTreeGeos()
  const arrTreeSites = arrFloraSites(nFloraTreeCount, 1)
  arrTrees = []
  for (let nI = 0; nI < arrTreeSites.length; nI++) {
    const objSite = arrTreeSites[nI]!
    const nScale = nTreeScaleMin + nHash2(nI + 11, Math.floor(objSite.nSeed * 9999)) * nTreeScaleSpan
    arrTrees.push({
      nX: objSite.nX,
      nZ: objSite.nZ,
      nR: nTreeTrunkBaseR * nScale + nTreeClearPad,
    })
  }
  const objTreeTrunks = new THREE.InstancedMesh(objTreeGeos.objTrunk, objMatTrunk, arrTreeSites.length)
  const objTreeCanopies = new THREE.InstancedMesh(objTreeGeos.objCanopy, objMatCanopy, arrTreeSites.length)
  vPlace(objTreeTrunks, arrTreeSites, nTreeScaleMin, nTreeScaleSpan)
  vPlace(objTreeCanopies, arrTreeSites, nTreeScaleMin, nTreeScaleSpan)
}

function objBuildBladeGeo(): THREE.BufferGeometry {
  const objBlade = new THREE.ConeGeometry(0.28, 0.58, 4)
  objBlade.translate(0, 0.29, 0)
  return objBlade
}

function vAddGrass(objParent: THREE.Object3D): void {
  objGrassMesh = new THREE.InstancedMesh(objBuildBladeGeo(), objMatGrass, nGrassCount)
  objGrassMesh.frustumCulled = false
  objGrassMesh.count = 0
  objParent.add(objGrassMesh)
  nGrassLastCx = Number.NaN
  nGrassLastCz = Number.NaN
  vUpdateGrass()
}

function vUpdateGrass(): void {
  if (!objGrassMesh) {
    return
  }

  const nCx = Math.floor(objPlayerPos.x / nGrassCell)
  const nCz = Math.floor(objPlayerPos.z / nGrassCell)
  if (nCx === nGrassLastCx && nCz === nGrassLastCz) {
    return
  }

  nGrassLastCx = nCx
  nGrassLastCz = nCz

  const objDummyPos = new THREE.Vector3()
  const objDummyQuat = new THREE.Quaternion()
  const objDummyScale = new THREE.Vector3()
  const objEuler = new THREE.Euler(0, 0, 0, 'YXZ')
  const objMatrix = new THREE.Matrix4()
  const nRadius2 = nGrassRadius * nGrassRadius
  const nClear2 = nGrassClearFeet * nGrassClearFeet
  const nSpan = Math.ceil(nGrassRadius / nGrassCell)
  const nPx = objPlayerPos.x
  const nPz = objPlayerPos.z
  let nUsed = 0

  for (let nOz = -nSpan; nOz <= nSpan && nUsed < nGrassCount; nOz++) {
    for (let nOx = -nSpan; nOx <= nSpan && nUsed < nGrassCount; nOx++) {
      const nGx = nCx + nOx
      const nGz = nCz + nOz
      const nSeed = nHash2(nGx + 91, nGz + 17)
      if (nSeed > 0.72) {
        continue
      }

      const nJx = nHash2(nGx + 3, nGz + 51)
      const nJz = nHash2(nGx + 67, nGz + 9)
      const nX = (nGx + nJx) * nGrassCell
      const nZ = (nGz + nJz) * nGrassCell
      const nDx = nX - nPx
      const nDz = nZ - nPz
      const nDist2 = nDx * nDx + nDz * nDz
      if (nDist2 > nRadius2 || nDist2 < nClear2) {
        continue
      }

      const nGround = nSampleHeight(nX, nZ)
      const nHeightT = (nGround - nTerrainMinH) / Math.max(0.001, nTerrainMaxH - nTerrainMinH)
      if (nHeightT > nGrassMaxHeightT) {
        continue
      }

      const nYaw = nSeed * Math.PI * 2
      const nLean = 0.35 + nHash2(nGx + 21, nGz + 44) * 0.55
      const nFade = 1 - Math.sqrt(nDist2) / nGrassRadius
      const nScale = (0.85 + nHash2(nGx + 13, nGz + 29) * 0.65) * (0.7 + nFade * 0.4)
      objDummyPos.set(nX, nGround + nGrassLift, nZ)
      objEuler.set(nLean, nYaw, 0)
      objDummyQuat.setFromEuler(objEuler)
      objDummyScale.set(nScale * 1.55, nScale, nScale * 0.55)
      objMatrix.compose(objDummyPos, objDummyQuat, objDummyScale)
      objGrassMesh.setMatrixAt(nUsed, objMatrix)
      nUsed++
    }
  }

  objGrassMesh.count = nUsed
  objGrassMesh.instanceMatrix.needsUpdate = true
}

function vAddSnow(objParent: THREE.Object3D): void {
  objSnowMesh = new THREE.InstancedMesh(objBuildBladeGeo(), objMatSnow, nSnowCount)
  objSnowMesh.frustumCulled = false
  objSnowMesh.count = 0
  objParent.add(objSnowMesh)
  nSnowLastCx = Number.NaN
  nSnowLastCz = Number.NaN
  vUpdateSnow()
}

function vUpdateSnow(): void {
  if (!objSnowMesh) {
    return
  }

  const nCx = Math.floor(objPlayerPos.x / nSnowCell)
  const nCz = Math.floor(objPlayerPos.z / nSnowCell)
  if (nCx === nSnowLastCx && nCz === nSnowLastCz) {
    return
  }

  nSnowLastCx = nCx
  nSnowLastCz = nCz

  const objDummyPos = new THREE.Vector3()
  const objDummyQuat = new THREE.Quaternion()
  const objDummyScale = new THREE.Vector3()
  const objEuler = new THREE.Euler(0, 0, 0, 'YXZ')
  const objMatrix = new THREE.Matrix4()
  const nRadius2 = nSnowRadius * nSnowRadius
  const nClear2 = nSnowClearFeet * nSnowClearFeet
  const nSpan = Math.ceil(nSnowRadius / nSnowCell)
  const nPx = objPlayerPos.x
  const nPz = objPlayerPos.z
  let nUsed = 0

  for (let nOz = -nSpan; nOz <= nSpan && nUsed < nSnowCount; nOz++) {
    for (let nOx = -nSpan; nOx <= nSpan && nUsed < nSnowCount; nOx++) {
      const nGx = nCx + nOx
      const nGz = nCz + nOz
      const nSeed = nHash2(nGx + 203, nGz + 77)
      if (nSeed > 0.68) {
        continue
      }

      const nJx = nHash2(nGx + 11, nGz + 88)
      const nJz = nHash2(nGx + 55, nGz + 19)
      const nX = (nGx + nJx) * nSnowCell
      const nZ = (nGz + nJz) * nSnowCell
      const nDx = nX - nPx
      const nDz = nZ - nPz
      const nDist2 = nDx * nDx + nDz * nDz
      if (nDist2 > nRadius2 || nDist2 < nClear2) {
        continue
      }

      const nGround = nSampleHeight(nX, nZ)
      const nHeightT = (nGround - nTerrainMinH) / Math.max(0.001, nTerrainMaxH - nTerrainMinH)
      if (nHeightT < nSnowMinHeightT) {
        continue
      }

      const nYaw = nSeed * Math.PI * 2
      const nLean = 0.35 + nHash2(nGx + 31, nGz + 62) * 0.55
      const nFade = 1 - Math.sqrt(nDist2) / nSnowRadius
      const nHigh = Math.min(1, (nHeightT - nSnowMinHeightT) / 0.22)
      const nScale = (0.85 + nHash2(nGx + 41, nGz + 15) * 0.65) * (0.7 + nFade * 0.4) * (0.8 + nHigh * 0.35)
      objDummyPos.set(nX, nGround + nSnowLift, nZ)
      objEuler.set(nLean, nYaw, 0)
      objDummyQuat.setFromEuler(objEuler)
      objDummyScale.set(nScale * 1.55, nScale, nScale * 0.55)
      objMatrix.compose(objDummyPos, objDummyQuat, objDummyScale)
      objSnowMesh.setMatrixAt(nUsed, objMatrix)
      nUsed++
    }
  }

  objSnowMesh.count = nUsed
  objSnowMesh.instanceMatrix.needsUpdate = true
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
  objGrad.addColorStop(0.18, 'rgba(255, 248, 220, 0.95)')
  objGrad.addColorStop(0.42, 'rgba(255, 210, 140, 0.45)')
  objGrad.addColorStop(0.72, 'rgba(220, 160, 255, 0.12)')
  objGrad.addColorStop(1, 'rgba(180, 120, 255, 0)')
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
    [1.0, 0.92, 0.55],
    [0.85, 0.7, 1.0],
    [0.7, 1.0, 0.85],
    [1.0, 0.75, 0.82],
    [0.75, 0.88, 1.0],
    [1.0, 0.85, 0.45],
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
    [0.42, 0.32, 0.14],
    [0.28, 0.16, 0.4],
    [0.36, 0.18, 0.3],
    [0.48, 0.4, 0.22],
    [0.22, 0.12, 0.32],
    [0.4, 0.22, 0.34],
    [0.32, 0.26, 0.12],
    [0.55, 0.48, 0.32],
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
  const objSun = new THREE.Mesh(objBodyGeo, objSkyMat(0xa07828))
  objSun.scale.setScalar(220)
  objSkyRoot.add(objSun)

  const arrPalette = [0x6a3058, 0x6a4a18, 0x3a1868, 0x5a2848, 0x4a2868, 0x6a5818, 0x482068, 0x2a1048, 0x5a3048, 0x705018, 0x582848, 0x2a1438, 0x482058, 0x583848]

  const nPlanetCount = 5
  for (let nI = 0; nI < nPlanetCount; nI++) {
    const nT = (nI + 0.5) / nPlanetCount
    const nOrbitR = 880 + nT * 5760
    const nSeed = nHash2(nI + 3, nI * 7 + 11)
    const nSeedB = nHash2(nI * 5 + 2, nI + 41)
    const nSeedC = nHash2(nI + 19, nI * 3 + 8)
    const nSize = (3.5 + nSeed * 14 + (nI % 9 === 4 ? 6 : 0)) * 10
    const nColor = arrPalette[Math.floor(nSeedB * arrPalette.length)]!
    const nSpeed = 0.24 * Math.pow(880 / nOrbitR, 1.35) * (0.75 + nSeedC * 0.5)

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
  objCamera.position.copy(objPlayerPos)
  objCamera.lookAt(
    objPlayerPos.x + objLookDir.x,
    objPlayerPos.y + objLookDir.y,
    objPlayerPos.z + objLookDir.z,
  )
}

function vPlacePlayerOnTerrain(): void {
  const nGround = nSampleHeight(0, 0)
  objPlayerPos.set(0, nGround + nEyeHeight, 0)
  nYaw = 0
  nMoveYaw = 0
  nPitch = nDefaultPitch
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
  if (bHitsTree(nX, nZ)) {
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

  vUpdateStatueProximity()
  vUpdateSkyOrbits(nDt)
  vUpdateGrass()
  vUpdateSnow()
  vUpdateFairies(nDt)
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
  objScene.background = new THREE.Color(0x14081c)
  objScene.fog = new THREE.Fog(0x1e1028, nFogNear, nFogFar)

  objCamera = new THREE.PerspectiveCamera(70, 1, 0.1, 16000)

  objRenderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
  objRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  objRenderer.outputColorSpace = THREE.SRGBColorSpace
  objCanvasHost.appendChild(objRenderer.domElement)
  vInitVhsPass()

  const objAmb = new THREE.AmbientLight(0x7a5aae, 0.85)
  objScene.add(objAmb)

  const objSun = new THREE.DirectionalLight(0xffe499, 1.6)
  objSun.position.set(120, 220, 80)
  objScene.add(objSun)

  const objFill = new THREE.DirectionalLight(0x9a62ff, 0.55)
  objFill.position.set(-90, 60, -140)
  objScene.add(objFill)

  const objSky = new THREE.Mesh(
    new THREE.SphereGeometry(12000, 24, 16),
    new THREE.MeshBasicMaterial({
      color: 0x180c24,
      side: THREE.BackSide,
      fog: false,
    }),
  )
  objScene.add(objSky)

  vAddStarfield(objScene)
  vAddSkyOrbits(objScene)
  objScene.add(objBuildTerrain())
  vAddStatues(objScene)
  vAddFlora(objScene)
  vAddGrass(objScene)
  vAddSnow(objScene)
  vAddFairies(objScene)
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
      <p class="explore-caption">pilgrim · stars, flora, orbits & statues</p>
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
  // before the heavy terrain / flora geometry work blocks the main thread.
  if (objRenderer) {
    vStart()
    return
  }

  nStartTimer = window.setTimeout(() => {
    nStartTimer = 0
    vStart()
  }, nExploreStartDelayMs)
}
