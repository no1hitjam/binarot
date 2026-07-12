import * as THREE from 'three'
import { sCardIconPaths } from './cardIcons'

const nTerrainSize = 5120
const nTerrainSegs = 320
const nHeightScale = 42
const nHillPeakScale = 48
const nCliffWidth = 96
const nCliffHeight = 130
const nMaxClimb = 0.95
const nMoveSpeed = 28
const nLookSens = 0.0022
const nEyeHeight = 2.2
const nGravity = 28
const nJumpSpeed = 10
const nFogNear = 80
const nFogFar = 1100
const nPlayHalf = nTerrainSize * 0.5 - 1.5
const nStatueMargin = nCliffWidth + 140
const nStatueClearSpawn = 70
const nStatueFindRadius = 16

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

type tKeys = {
  bForward: boolean
  bBack: boolean
  bLeft: boolean
  bRight: boolean
  bJump: boolean
}

let arrExploreCards: tExploreCard[] = []
let arrStatues: tStatue[] = []
let objCanvasHost: HTMLElement | null = null
let objHint: HTMLElement | null = null
let objRenderer: THREE.WebGLRenderer | null = null
let objScene: THREE.Scene | null = null
let objCamera: THREE.PerspectiveCamera | null = null
let arrHeights: Float32Array | null = null
let nAnimFrame = 0
let bRunning = false
let bPointerLocked = false
let nLastTs = 0
let nYaw = 0
let nPitch = -0.12
let nVelY = 0
let bOnGround = true
let bAutoWalk = false

const objKeys: tKeys = {
  bForward: false,
  bBack: false,
  bLeft: false,
  bRight: false,
  bJump: false,
}

const objPlayerPos = new THREE.Vector3(0, 20, 0)
const objLookDir = new THREE.Vector3()
const objRight = new THREE.Vector3()
const objForwardFlat = new THREE.Vector3()
const objMove = new THREE.Vector3()

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
    nContinent * 0.38 +
    nRolling * 0.34 +
    nLocal * 0.14 +
    nRidge * nRidge * 0.2
  nH = Math.pow(Math.min(1, Math.max(0, nH)), 1.12)
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

function nCliffBlend(nX: number, nZ: number): number {
  const nHalf = nTerrainSize * 0.5
  const nToEdge = Math.min(nHalf - Math.abs(nX), nHalf - Math.abs(nZ))
  if (nToEdge >= nCliffWidth) {
    return 0
  }
  if (nToEdge <= 0) {
    return 1
  }

  const nT = 1 - nToEdge / nCliffWidth
  // Rise quickly as the rim begins so the inner face reads as a steep wall.
  return 1 - Math.pow(1 - nT, 3.5)
}

function objTerrainColor(nH: number, nMin: number, nMax: number, nCliff: number): THREE.Color {
  const objColor = new THREE.Color()
  if (nCliff > 0.55) {
    const nShade = 0.1 + nCliff * 0.22
    objColor.setRGB(nShade * 0.55, nShade * 0.4, nShade * 0.85)
    return objColor
  }

  const nT = Math.min(1, Math.max(0, (nH - nMin) / Math.max(0.001, nMax - nMin)))
  if (nT < 0.28) {
    objColor.setRGB(0.04, 0.05, 0.14)
  } else if (nT < 0.45) {
    objColor.setRGB(0.12, 0.08, 0.22)
  } else if (nT < 0.62) {
    objColor.setRGB(0.22, 0.12, 0.38)
  } else if (nT < 0.78) {
    objColor.setRGB(0.45, 0.28, 0.72)
  } else if (nT < 0.9) {
    objColor.setRGB(0.72, 0.55, 0.28)
  } else {
    objColor.setRGB(0.92, 0.86, 0.62)
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
  const arrCliff = new Float32Array(nVertCount)

  let nMinH = Infinity
  let nMaxH = -Infinity
  const arrRaw = new Float32Array(nVertCount)

  for (let nI = 0; nI < nVertCount; nI++) {
    const nX = objPos.getX(nI)
    const nZ = objPos.getZ(nI)
    let nH = nInteriorHeight(nX, nZ)

    const nCliff = nCliffBlend(nX, nZ)
    arrCliff[nI] = nCliff
    nH = nH * (1 - nCliff) + nCliffHeight * nCliff

    arrRaw[nI] = nH
    if (nCliff < 0.25) {
      if (nH < nMinH) nMinH = nH
      if (nH > nMaxH) nMaxH = nH
    }
  }

  if (!Number.isFinite(nMinH) || !Number.isFinite(nMaxH)) {
    nMinH = 0
    nMaxH = nCliffHeight
  }

  for (let nI = 0; nI < nVertCount; nI++) {
    const nH = arrRaw[nI]!
    objPos.setY(nI, nH)
    arrHeights[nI] = nH
    const objCol = objTerrainColor(nH, nMinH, nMaxH, arrCliff[nI]!)
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
  objStatue.objGlow.intensity = 4.5
  objStatue.objGlow.distance = 36

  for (const objMat of objStatue.arrLitMats) {
    objMat.emissive.set(0xe0b83a)
    objMat.emissiveIntensity = 1.15
    objMat.needsUpdate = true
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
  nVelY = 0
  bOnGround = true
  nYaw = 0
  nPitch = -0.08
  vUpdateCameraOrientation()
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

  objMove.set(0, 0, 0)
  objForwardFlat.set(Math.sin(nYaw), 0, Math.cos(nYaw))
  objRight.set(-Math.cos(nYaw), 0, Math.sin(nYaw))

  if (objKeys.bForward || bAutoWalk) objMove.add(objForwardFlat)
  if (objKeys.bBack) objMove.sub(objForwardFlat)
  if (objKeys.bLeft) objMove.sub(objRight)
  if (objKeys.bRight) objMove.add(objRight)

  if (objMove.lengthSq() > 0) {
    objMove.normalize().multiplyScalar(nMoveSpeed * nDt)
    vTryMove(objMove.x, objMove.z)
  }

  const nGround = nSampleHeight(objPlayerPos.x, objPlayerPos.z) + nEyeHeight

  if (objKeys.bJump && bOnGround) {
    nVelY = nJumpSpeed
    bOnGround = false
    objKeys.bJump = false
  }

  nVelY -= nGravity * nDt
  objPlayerPos.y += nVelY * nDt

  if (objPlayerPos.y <= nGround) {
    objPlayerPos.y = nGround
    nVelY = 0
    bOnGround = true
  }

  vUpdateStatueProximity()
  vUpdateCameraOrientation()
  objRenderer.render(objScene, objCamera)
  nAnimFrame = window.requestAnimationFrame(vTick)
}

function vOnKeyDown(objEv: KeyboardEvent): void {
  if (!bRunning || !bPointerLocked) {
    return
  }

  switch (objEv.code) {
    case 'KeyW':
    case 'ArrowUp':
      objKeys.bForward = true
      break
    case 'KeyS':
    case 'ArrowDown':
      objKeys.bBack = true
      break
    case 'KeyA':
    case 'ArrowLeft':
      objKeys.bLeft = true
      break
    case 'KeyD':
    case 'ArrowRight':
      objKeys.bRight = true
      break
    case 'Space':
      objEv.preventDefault()
      objKeys.bJump = true
      break
    case 'KeyQ':
      bAutoWalk = !bAutoWalk
      break
    default:
      break
  }
}

function vOnKeyUp(objEv: KeyboardEvent): void {
  switch (objEv.code) {
    case 'KeyW':
    case 'ArrowUp':
      objKeys.bForward = false
      break
    case 'KeyS':
    case 'ArrowDown':
      objKeys.bBack = false
      break
    case 'KeyA':
    case 'ArrowLeft':
      objKeys.bLeft = false
      break
    case 'KeyD':
    case 'ArrowRight':
      objKeys.bRight = false
      break
    case 'Space':
      objKeys.bJump = false
      break
    default:
      break
  }
}

function vOnMouseMove(objEv: MouseEvent): void {
  if (!bPointerLocked) {
    return
  }

  nYaw -= objEv.movementX * nLookSens
  nPitch -= objEv.movementY * nLookSens
  nPitch = Math.min(1.4, Math.max(-1.4, nPitch))
}

function vOnPointerLockChange(): void {
  bPointerLocked = document.pointerLockElement === objCanvasHost
  if (objHint) {
    objHint.hidden = bPointerLocked
  }
  if (!bPointerLocked) {
    objKeys.bForward = false
    objKeys.bBack = false
    objKeys.bLeft = false
    objKeys.bRight = false
    objKeys.bJump = false
  }
}

function vRequestPointerLock(): void {
  objCanvasHost?.requestPointerLock()
}

function vInitScene(): void {
  if (!objCanvasHost || objRenderer) {
    return
  }

  objScene = new THREE.Scene()
  objScene.background = new THREE.Color(0x050308)
  objScene.fog = new THREE.Fog(0x0a0614, nFogNear, nFogFar)

  objCamera = new THREE.PerspectiveCamera(70, 1, 0.1, 6000)

  objRenderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
  objRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  objRenderer.outputColorSpace = THREE.SRGBColorSpace
  objCanvasHost.appendChild(objRenderer.domElement)

  const objAmb = new THREE.AmbientLight(0x6a4a9e, 0.55)
  objScene.add(objAmb)

  const objSun = new THREE.DirectionalLight(0xffe08a, 1.15)
  objSun.position.set(120, 220, 80)
  objScene.add(objSun)

  const objFill = new THREE.DirectionalLight(0x8b4dff, 0.35)
  objFill.position.set(-90, 60, -140)
  objScene.add(objFill)

  const objSky = new THREE.Mesh(
    new THREE.SphereGeometry(4200, 24, 16),
    new THREE.MeshBasicMaterial({
      color: 0x120a1c,
      side: THREE.BackSide,
      fog: false,
    }),
  )
  objScene.add(objSky)

  objScene.add(objBuildTerrain())
  vAddStatues(objScene)

  vPlacePlayerOnTerrain()
  vResize()
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
  nLastTs = performance.now()
  vResize()
  nAnimFrame = window.requestAnimationFrame(vTick)
}

function vStop(): void {
  bRunning = false
  bAutoWalk = false
  if (nAnimFrame !== 0) {
    window.cancelAnimationFrame(nAnimFrame)
    nAnimFrame = 0
  }
  if (document.pointerLockElement === objCanvasHost) {
    document.exitPointerLock()
  }
}

export function sExploreMarkup(): string {
  return `
    <div class="explore" id="explore">
      <div class="explore-viewport" id="explore-viewport" tabindex="0" role="application" aria-label="Terrain explorer">
        <p class="explore-hint" id="explore-hint">Click to look · WASD move · Q auto-walk · Space jump · Esc release</p>
      </div>
      <p class="explore-caption">wander · statues of the deck</p>
    </div>
  `
}

export function vBindExplore(arrCards: tExploreCard[]): void {
  arrExploreCards = arrCards
  objCanvasHost = document.querySelector<HTMLElement>('#explore-viewport')
  objHint = document.querySelector<HTMLElement>('#explore-hint')
  if (!objCanvasHost) {
    return
  }

  objCanvasHost.addEventListener('click', vRequestPointerLock)
  document.addEventListener('pointerlockchange', vOnPointerLockChange)
  document.addEventListener('mousemove', vOnMouseMove)
  window.addEventListener('keydown', vOnKeyDown)
  window.addEventListener('keyup', vOnKeyUp)
  window.addEventListener('resize', () => {
    if (bRunning) {
      vResize()
    }
  })

  const objPanel = document.querySelector<HTMLElement>('[data-panel="explore"]')
  if (objPanel?.classList.contains('is-active')) {
    vStart()
  }
}

export function vSetExploreActive(bActive: boolean): void {
  if (bActive) {
    vStart()
  } else {
    vStop()
  }
}
