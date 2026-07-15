import * as THREE from 'three'
import { sCardIconPaths } from './cardIcons'

const nTerrainSize = 640
const nTerrainSegs = 96
const nHeightScale = 28
const nHillPeakScale = 36
const nMaxClimb = 0.95
const nWalkSpeed = 14
const nEyeHeight = 1.85
const nFogNear = 6
const nFogFar = 48
const nPlayHalf = nTerrainSize * 0.5 - 1.5
const nLookSens = 0.0022
const nTouchLookSens = 0.0035
const nPitchMin = -1.35
const nPitchMax = 1.35
const nFloraTreeCount = 420
const nFloraMargin = 24
const nFloraClearSpawn = 18
const nFloraLift = -1.6
const nTreeTrunkBaseR = 0.95
const nTreeClearPad = 1.6
const nTreeScaleMin = 1.35
const nTreeScaleSpan = 1.0
const nGrassCount = 1400
const nGrassRadius = 36
const nGrassCell = 1.55
const nGrassClearFeet = 2.4
const nGrassLift = 0.02
const nGrassMaxHeightT = 0.55
const nStarCount = 1800
const nStarRadius = 5000
const nStarSize = 5.5
const nCardMargin = 40
const nCardClearSpawn = 22
const nCardCollectR = 5.5
const nCardHangY = 2.6
const nFirefliesPerCard = 8
const nFireflySize = 0.62
const nSlenderStartCards = 1
const nSlenderBaseSpeed = 4.2
const nSlenderSpeedPerCard = 0.4
const nSlenderCatchR = 3.2
const nSlenderSpawnMin = 42
const nSlenderSpawnMax = 82
const nSlenderHeight = 9.2
const nSlenderTeleportMinSec = 2.8
const nSlenderTeleportMaxSec = 6.5
const nSlenderTeleportChance = 0.35
const nDeathLookSpeed = 3.4
const nDeathLookHeadY = 6.5
const nForestStartDelayMs = 80
const nCardGoal = 16
const nFlashIntensity = 20.5
const nFlashDistance = 72
const nFlashAngle = 0.62
const nFlashPenumbra = 0.48
const nFlashDecay = 0.15
const nGroundLitScale = 0.22
const nGroundTexSize = 512
const nGroundTexRepeat = 48
const nVhsBleedPx = 2.8
const nVhsScanStrength = 0.11
const nVhsNoiseStrength = 0.055
const nVhsVignette = 0.55
const bVhsEnabled = true

type tForestCard = {
  sName: string
  sBinaryValue: string
}

type tTree = {
  nX: number
  nZ: number
  nR: number
  nScale: number
}

type tHungCard = {
  sBinaryValue: string
  sName: string
  nX: number
  nY: number
  nZ: number
  bFound: boolean
  objMesh: THREE.Mesh
}

type tFirefly = {
  nCard: number
  nPhase: number
  nOrbitR: number
  nOrbitSpd: number
  nBobSpd: number
  nBobAmp: number
  nCr: number
  nCg: number
  nCb: number
}

type tKeys = {
  bForward: boolean
  bBack: boolean
  bLeft: boolean
  bRight: boolean
}

function vDimGroundMaterial(objMat: THREE.MeshStandardMaterial, sKey: string): void {
  objMat.onBeforeCompile = (objShader) => {
    objShader.uniforms.uGroundLitScale = { value: nGroundLitScale }
    objShader.fragmentShader = objShader.fragmentShader.replace(
      'void main() {',
      'uniform float uGroundLitScale;\nvoid main() {',
    )
    objShader.fragmentShader = objShader.fragmentShader.replace(
      '#include <opaque_fragment>',
      `
      reflectedLight.directDiffuse *= uGroundLitScale;
      reflectedLight.directSpecular *= uGroundLitScale;
      reflectedLight.indirectDiffuse *= uGroundLitScale;
      reflectedLight.indirectSpecular *= uGroundLitScale;
      #include <opaque_fragment>
      `,
    )
  }
  objMat.customProgramCacheKey = () => `${sKey}-${nGroundLitScale}`
}

let arrForestCards: tForestCard[] = []
let arrTrees: tTree[] = []
let arrHungCards: tHungCard[] = []
let arrFireflies: tFirefly[] = []
let objFireflyPoints: THREE.Points | null = null
let objFireflyTex: THREE.CanvasTexture | null = null
let objCanvasHost: HTMLElement | null = null
let objPrompt: HTMLElement | null = null
let objChecklist: HTMLElement | null = null
let objStatus: HTMLElement | null = null
let objRenderer: THREE.WebGLRenderer | null = null
let objScene: THREE.Scene | null = null
let objCamera: THREE.PerspectiveCamera | null = null
let objFlashlight: THREE.SpotLight | null = null
let objSceneTarget: THREE.WebGLRenderTarget | null = null
let objVhsScene: THREE.Scene | null = null
let objVhsCam: THREE.OrthographicCamera | null = null
let objVhsMat: THREE.ShaderMaterial | null = null
let arrHeights: Float32Array | null = null
let nTerrainMinH = 0
let nTerrainMaxH = 1
let nAnimFrame = 0
let nStartTimer = 0
let bRunning = false
let bAwaitingReveal = false
let bPointerLocked = false
let bTouchPlaying = false
let bLookDragging = false
let nLookPtrId = -1
let nLookLastX = 0
let nLookLastY = 0
let bGameOver = false
let bWon = false
let nLastTs = 0
let nYaw = 0
let nPitch = 0
let objStarRoot: THREE.Group | null = null
let objGrassMesh: THREE.InstancedMesh | null = null
let nGrassLastCx = Number.NaN
let nGrassLastCz = Number.NaN
let objSlender: THREE.Group | null = null
let nSlenderX = 0
let nSlenderZ = 0
let bSlenderActive = false
let nSlenderTeleportCool = 0

const objPlayerPos = new THREE.Vector3(0, 20, 0)
const objLookDir = new THREE.Vector3()
const objKeys: tKeys = {
  bForward: false,
  bBack: false,
  bLeft: false,
  bRight: false,
}

function bControlsActive(): boolean {
  return bPointerLocked || bTouchPlaying
}

function bCoarsePointer(): boolean {
  return window.matchMedia('(hover: none), (pointer: coarse)').matches
}

function vClearMoveKeys(): void {
  objKeys.bForward = false
  objKeys.bBack = false
  objKeys.bLeft = false
  objKeys.bRight = false
}

const objMatTrunk = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.96,
  metalness: 0.04,
  vertexColors: true,
  emissive: 0x1a0c06,
  emissiveIntensity: 0.04,
})
const objMatCanopy = new THREE.MeshStandardMaterial({
  color: 0x08110a,
  roughness: 0.92,
  metalness: 0.04,
  emissive: 0x020503,
  emissiveIntensity: 0.06,
})
const objMatGrass = new THREE.MeshStandardMaterial({
  color: 0x08140c,
  roughness: 1,
  metalness: 0,
  emissive: 0x000000,
  emissiveIntensity: 0,
})
vDimGroundMaterial(objMatGrass, 'forest-grass-lit')
const objMatTerrain = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 1,
  metalness: 0,
})
vDimGroundMaterial(objMatTerrain, 'forest-ground-lit')
const objMatSlender = new THREE.MeshStandardMaterial({
  color: 0xf2f0ea,
  roughness: 0.82,
  metalness: 0.02,
  emissive: 0xc8c4b8,
  emissiveIntensity: 0.35,
})

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
  const nWarp = (nFbm(nX * 0.0032, nZ * 0.0032, 3) - 0.5) * 70
  const nWx = nX + nWarp
  const nWz = nZ - nWarp * 0.7
  const nContinent = nFbm(nWx * 0.0022, nWz * 0.0022, 4)
  const nRolling = nFbm(nWx * 0.0075 + 3.1, nWz * 0.0075 - 1.7, 5)
  const nLocal = nFbm(nWx * 0.018 + 11, nWz * 0.018 + 4, 4)
  const nRidge = 1 - Math.abs(nFbm(nWx * 0.005 + 20, nWz * 0.005 - 11, 4) * 2 - 1)
  const nPeaks = Math.pow(nFbm(nWx * 0.0055 - 8, nWz * 0.0055 + 15, 5), 2.1)

  let nH = nContinent * 0.36 + nRolling * 0.34 + nLocal * 0.18 + nRidge * nRidge * 0.22
  nH = Math.pow(Math.min(1, Math.max(0, nH)), 0.95)
  return nH * nHeightScale + nPeaks * nHillPeakScale
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

function objGroundGrassTexture(): THREE.CanvasTexture {
  const nSize = nGroundTexSize
  const objCanvas = document.createElement('canvas')
  objCanvas.width = nSize
  objCanvas.height = nSize
  const objCtx = objCanvas.getContext('2d')!
  const objImg = objCtx.createImageData(nSize, nSize)
  const arrData = objImg.data

  for (let nY = 0; nY < nSize; nY++) {
    for (let nX = 0; nX < nSize; nX++) {
      const nI = (nY * nSize + nX) * 4
      const nSoil = nFbm(nX * 0.045 + 2.1, nY * 0.045 - 1.4, 4)
      const nClump = nFbm(nX * 0.12 + 8, nY * 0.12 + 3, 3)
      const nSpeck = nHash2(nX + 17, nY + 41)
      const nBlack = nHash2(nX * 3 + 9, nY * 5 + 13)
      const nMix = nSoil * 0.65 + nClump * 0.35

      let nR = 6 + nMix * 14
      let nG = 14 + nMix * 26
      let nB = 7 + nMix * 12

      if (nBlack > 0.965) {
        nR = 0
        nG = 0
        nB = 0
      } else if (nBlack > 0.91) {
        nR *= 0.12
        nG *= 0.14
        nB *= 0.1
      } else if (nSpeck > 0.92) {
        nR += 8
        nG += 6
        nB += 4
      } else if (nSpeck < 0.08) {
        nR *= 0.55
        nG *= 0.6
        nB *= 0.5
      }

      arrData[nI] = Math.min(255, nR)
      arrData[nI + 1] = Math.min(255, nG)
      arrData[nI + 2] = Math.min(255, nB)
      arrData[nI + 3] = 255
    }
  }

  objCtx.putImageData(objImg, 0, 0)
  objCtx.lineCap = 'round'

  const nBladeCount = 4200
  for (let nI = 0; nI < nBladeCount; nI++) {
    const nSeed = nHash2(nI + 3, nI * 7 + 11)
    const nSeedB = nHash2(nI * 5 + 2, nI + 29)
    const nSeedC = nHash2(nI + 19, nI * 3 + 8)
    const nX = nSeed * nSize
    const nY = nSeedB * nSize
    const nLen = 3 + nSeedC * 9
    const nLean = (nHash2(nI + 41, nI * 9) - 0.5) * 0.9
    const nShade = 0.35 + nHash2(nI * 2 + 1, nI + 60) * 0.65
    const nR = Math.floor((4 + nShade * 10) * (0.7 + nSeed * 0.4))
    const nG = Math.floor((10 + nShade * 22) * (0.75 + nSeedB * 0.4))
    const nB = Math.floor((5 + nShade * 10) * (0.7 + nSeedC * 0.35))

    objCtx.strokeStyle = `rgba(${nR},${nG},${nB},${0.35 + nShade * 0.4})`
    objCtx.lineWidth = 0.7 + nSeedC * 1.1
    objCtx.beginPath()
    objCtx.moveTo(nX, nY)
    objCtx.quadraticCurveTo(nX + nLean * nLen * 0.45, nY - nLen * 0.55, nX + nLean * nLen, nY - nLen)
    objCtx.stroke()
  }

  const nBlackSpeckCount = 900
  for (let nI = 0; nI < nBlackSpeckCount; nI++) {
    const nSeed = nHash2(nI + 101, nI * 13 + 7)
    const nSeedB = nHash2(nI * 11 + 4, nI + 53)
    const nSeedC = nHash2(nI + 77, nI * 17 + 3)
    const nX = nSeed * nSize * 5
    const nY = nSeedB * nSize
    const nR = 0.6 + nSeedC * 2.4
    objCtx.fillStyle = nSeedC > 0.55 ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.55)'
    objCtx.beginPath()
    objCtx.ellipse(nX, nY, nR, nR * (0.55 + nSeed * 0.7), nSeedB * Math.PI, 0, Math.PI * 2)
    objCtx.fill()
  }

  // Soft seam blend so tiles don't flash a hard edge.
  const objEdge = objCtx.getImageData(0, 0, nSize, nSize)
  const nBlend = 6
  for (let nY = 0; nY < nSize; nY++) {
    for (let nX = 0; nX < nBlend; nX++) {
      const nT = nX / nBlend
      for (let nC = 0; nC < 3; nC++) {
        const nA = objEdge.data[(nY * nSize + nX) * 4 + nC]!
        const nB = objEdge.data[(nY * nSize + (nSize - 1 - nX)) * 4 + nC]!
        const nV = Math.round(nA * nT + nB * (1 - nT))
        objEdge.data[(nY * nSize + nX) * 4 + nC] = nV
        objEdge.data[(nY * nSize + (nSize - 1 - nX)) * 4 + nC] = nV
      }
    }
  }
  for (let nX = 0; nX < nSize; nX++) {
    for (let nY = 0; nY < nBlend; nY++) {
      const nT = nY / nBlend
      for (let nC = 0; nC < 3; nC++) {
        const nA = objEdge.data[(nY * nSize + nX) * 4 + nC]!
        const nB = objEdge.data[((nSize - 1 - nY) * nSize + nX) * 4 + nC]!
        const nV = Math.round(nA * nT + nB * (1 - nT))
        objEdge.data[(nY * nSize + nX) * 4 + nC] = nV
        objEdge.data[((nSize - 1 - nY) * nSize + nX) * 4 + nC] = nV
      }
    }
  }
  objCtx.putImageData(objEdge, 0, 0)

  const objTex = new THREE.CanvasTexture(objCanvas)
  objTex.colorSpace = THREE.SRGBColorSpace
  objTex.wrapS = THREE.RepeatWrapping
  objTex.wrapT = THREE.RepeatWrapping
  objTex.anisotropy = 4
  objTex.repeat.set(nGroundTexRepeat, nGroundTexRepeat)
  objTex.needsUpdate = true
  return objTex
}

function objBuildTerrain(): THREE.Mesh {
  const nStride = nTerrainSegs + 1
  arrHeights = new Float32Array(nStride * nStride)
  const objGeo = new THREE.PlaneGeometry(nTerrainSize, nTerrainSize, nTerrainSegs, nTerrainSegs)
  objGeo.rotateX(-Math.PI / 2)

  const objPos = objGeo.attributes.position as THREE.BufferAttribute
  let nMin = Infinity
  let nMax = -Infinity

  for (let nI = 0; nI < objPos.count; nI++) {
    const nX = objPos.getX(nI)
    const nZ = objPos.getZ(nI)
    const nH = nInteriorHeight(nX, nZ)
    objPos.setY(nI, nH)
    arrHeights[nI] = nH
    if (nH < nMin) nMin = nH
    if (nH > nMax) nMax = nH
  }

  nTerrainMinH = nMin
  nTerrainMaxH = nMax

  objGeo.computeVertexNormals()
  objMatTerrain.map = objGroundGrassTexture()
  objMatTerrain.needsUpdate = true
  return new THREE.Mesh(objGeo, objMatTerrain)
}

function vDrawCardIcon(
  objCtx: CanvasRenderingContext2D,
  sSlug: string,
  nOx: number,
  nOy: number,
  nSize: number,
): void {
  const sPaths = sCardIconPaths(sSlug)
  if (!sPaths) {
    return
  }

  objCtx.save()
  objCtx.translate(nOx, nOy)
  objCtx.scale(nSize / 100, nSize / 100)
  objCtx.strokeStyle = '#e0b83a'
  objCtx.lineWidth = 3.2
  objCtx.lineCap = 'round'
  objCtx.lineJoin = 'round'

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

function objCardTexture(objCard: tForestCard): THREE.CanvasTexture {
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

function arrCardRingSites(nCount: number): { nX: number; nZ: number }[] {
  const nHalf = nTerrainSize * 0.5 - nCardMargin
  const nGolden = Math.PI * (3 - Math.sqrt(5))
  const arrOut: { nX: number; nZ: number }[] = []

  for (let nI = 0; nI < nCount; nI++) {
    const nU = (nI + 0.5) / nCount
    // Keep cards in a mid ring around spawn so none sit at the far edge.
    const nR = (0.28 + 0.42 * nU) * nHalf
    const nA = nI * nGolden + 2.4
    let nX = Math.cos(nA) * nR
    let nZ = Math.sin(nA) * nR
    if (Math.hypot(nX, nZ) < nCardClearSpawn) {
      nX += nCardClearSpawn
      nZ += nCardClearSpawn * 0.55
    }
    arrOut.push({ nX, nZ })
  }

  return arrOut
}

function objNearestTree(nX: number, nZ: number): tTree | null {
  let objBest: tTree | null = null
  let nBest = Infinity
  for (const objTree of arrTrees) {
    const nDx = objTree.nX - nX
    const nDz = objTree.nZ - nZ
    const nD2 = nDx * nDx + nDz * nDz
    if (nD2 < nBest) {
      nBest = nD2
      objBest = objTree
    }
  }
  return objBest
}

function vAddHungCards(objParent: THREE.Object3D): void {
  arrHungCards = []
  const arrSites = arrCardRingSites(arrForestCards.length)

  for (let nI = 0; nI < arrForestCards.length; nI++) {
    const objCard = arrForestCards[nI]!
    const objSite = arrSites[nI]!
    const objTree = objNearestTree(objSite.nX, objSite.nZ)
    if (!objTree) {
      continue
    }

    const nAng = Math.atan2(objTree.nX, objTree.nZ) + Math.PI * 0.35
    const nHangR = objTree.nR * 0.55
    const nX = objTree.nX + Math.sin(nAng) * nHangR
    const nZ = objTree.nZ + Math.cos(nAng) * nHangR
    const nGround = nSampleHeight(nX, nZ)
    const nY = nGround + nCardHangY * (objTree.nScale / nTreeScaleMin)

    const objTex = objCardTexture(objCard)
    const objMat = new THREE.MeshStandardMaterial({
      map: objTex,
      roughness: 0.55,
      metalness: 0.12,
      emissive: 0x2a1a06,
      emissiveIntensity: 0.35,
      emissiveMap: objTex,
      side: THREE.DoubleSide,
    })
    const objMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.55, 2.35), objMat)
    objMesh.position.set(nX, nY, nZ)
    objMesh.rotation.y = nAng + Math.PI
    objParent.add(objMesh)

    arrHungCards.push({
      sBinaryValue: objCard.sBinaryValue,
      sName: objCard.sName,
      nX,
      nY,
      nZ,
      bFound: false,
      objMesh,
    })
  }

  vAddCardFireflies(objParent)
}

function objFireflyTexture(): THREE.CanvasTexture {
  if (objFireflyTex) {
    return objFireflyTex
  }

  const nS = 64
  const objCanvas = document.createElement('canvas')
  objCanvas.width = nS
  objCanvas.height = nS
  const objCtx = objCanvas.getContext('2d')!
  const nMid = nS * 0.5
  const objGrad = objCtx.createRadialGradient(nMid, nMid, 0, nMid, nMid, nMid)
  objGrad.addColorStop(0, 'rgba(255, 255, 230, 1)')
  objGrad.addColorStop(0.2, 'rgba(255, 220, 120, 0.95)')
  objGrad.addColorStop(0.45, 'rgba(255, 170, 60, 0.45)')
  objGrad.addColorStop(0.75, 'rgba(255, 120, 40, 0.12)')
  objGrad.addColorStop(1, 'rgba(255, 100, 30, 0)')
  objCtx.fillStyle = objGrad
  objCtx.fillRect(0, 0, nS, nS)

  objFireflyTex = new THREE.CanvasTexture(objCanvas)
  objFireflyTex.colorSpace = THREE.SRGBColorSpace
  return objFireflyTex
}

function vAddCardFireflies(objParent: THREE.Object3D): void {
  arrFireflies = []
  const nCount = arrHungCards.length * nFirefliesPerCard
  const arrPos = new Float32Array(nCount * 3)
  const arrCol = new Float32Array(nCount * 3)
  const arrPalette = [
    [1.0, 0.92, 0.45],
    [1.0, 0.78, 0.28],
    [0.95, 1.0, 0.55],
    [1.0, 0.7, 0.35],
    [0.85, 1.0, 0.7],
  ]

  for (let nCard = 0; nCard < arrHungCards.length; nCard++) {
    for (let nJ = 0; nJ < nFirefliesPerCard; nJ++) {
      const nI = nCard * nFirefliesPerCard + nJ
      const arrRgb = arrPalette[(nCard + nJ) % arrPalette.length]!
      const nBright = 0.7 + nHash2(nI + 3, nI * 11 + 5) * 0.4
      arrFireflies.push({
        nCard,
        nPhase: nHash2(nI + 7, nCard * 13 + nJ) * Math.PI * 2,
        nOrbitR: 0.45 + nHash2(nI + 19, nJ + 3) * 1.35,
        nOrbitSpd: 0.7 + nHash2(nI + 29, nCard + 5) * 1.8,
        nBobSpd: 1.6 + nHash2(nI + 41, nJ + 11) * 2.4,
        nBobAmp: 0.2 + nHash2(nI + 53, nCard + 17) * 0.55,
        nCr: arrRgb[0]! * nBright,
        nCg: arrRgb[1]! * nBright,
        nCb: arrRgb[2]! * nBright,
      })
      arrPos[nI * 3] = 0
      arrPos[nI * 3 + 1] = -999
      arrPos[nI * 3 + 2] = 0
      arrCol[nI * 3] = 0
      arrCol[nI * 3 + 1] = 0
      arrCol[nI * 3 + 2] = 0
    }
  }

  const objGeo = new THREE.BufferGeometry()
  objGeo.setAttribute('position', new THREE.BufferAttribute(arrPos, 3))
  objGeo.setAttribute('color', new THREE.BufferAttribute(arrCol, 3))

  objFireflyPoints = new THREE.Points(
    objGeo,
    new THREE.PointsMaterial({
      map: objFireflyTexture(),
      size: nFireflySize,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false,
    }),
  )
  objFireflyPoints.frustumCulled = false
  objParent.add(objFireflyPoints)
  vUpdateCardFireflies(0)
}

function vUpdateCardFireflies(nDt: number): void {
  if (!objFireflyPoints) {
    return
  }

  const objPos = objFireflyPoints.geometry.getAttribute('position') as THREE.BufferAttribute
  const objCol = objFireflyPoints.geometry.getAttribute('color') as THREE.BufferAttribute

  for (let nI = 0; nI < arrFireflies.length; nI++) {
    const objFly = arrFireflies[nI]!
    const objCard = arrHungCards[objFly.nCard]
    if (!objCard || objCard.bFound) {
      objPos.setXYZ(nI, 0, -999, 0)
      objCol.setXYZ(nI, 0, 0, 0)
      continue
    }

    objFly.nPhase += nDt
    const nAng = objFly.nPhase * objFly.nOrbitSpd
    const nBob = Math.sin(objFly.nPhase * objFly.nBobSpd) * objFly.nBobAmp
    const nX = objCard.nX + Math.cos(nAng) * objFly.nOrbitR
    const nZ = objCard.nZ + Math.sin(nAng * 0.85 + 0.7) * objFly.nOrbitR * 0.75
    const nY = objCard.nY + nBob + Math.cos(nAng * 0.55) * 0.25
    const nPulse = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(objFly.nPhase * 3.2 + objFly.nOrbitR))

    objPos.setXYZ(nI, nX, nY, nZ)
    objCol.setXYZ(nI, objFly.nCr * nPulse, objFly.nCg * nPulse, objFly.nCb * nPulse)
  }

  objPos.needsUpdate = true
  objCol.needsUpdate = true
}

function nFoundCount(): number {
  let nCount = 0
  for (const objCard of arrHungCards) {
    if (objCard.bFound) {
      nCount++
    }
  }
  return nCount
}

function vUpdateChecklist(): void {
  if (!objChecklist) {
    return
  }

  objChecklist.innerHTML = arrForestCards
    .map((objCard) => {
      const bFound = arrHungCards.some(
        (objHung) => objHung.sBinaryValue === objCard.sBinaryValue && objHung.bFound,
      )
      return `
        <li class="forest-check-item${bFound ? ' is-found' : ''}">
          <span class="forest-check-mark">${bFound ? '✓' : '·'}</span>
          <span class="forest-check-name">${objCard.sName}</span>
          <span class="forest-check-binary">${objCard.sBinaryValue}</span>
        </li>
      `
    })
    .join('')
}

function vUpdateHud(): void {
  if (objStatus) {
    const nFound = nFoundCount()
    if (bWon) {
      objStatus.textContent = `All ${nCardGoal} cards recovered. The forest goes quiet.`
    } else if (bGameOver) {
      objStatus.textContent = `Taken. Cards recovered: ${nFound}/${nCardGoal}. Click to try again.`
    } else {
      objStatus.textContent = `Cards ${nFound}/${nCardGoal}`
    }
  }

  if (objPrompt) {
    if (bGameOver || bWon) {
      objPrompt.textContent = bWon
        ? 'escape · tap or click to restart'
        : 'tap or click to restart'
      objPrompt.hidden = false
    } else if (!bControlsActive()) {
      objPrompt.textContent = bCoarsePointer()
        ? 'tap to enter · drag to look · pad to walk · follow the fireflies'
        : 'click to enter the forest · WASD move · follow the fireflies'
      objPrompt.hidden = false
    } else {
      objPrompt.hidden = true
    }
  }

  vUpdateChecklist()
}

function vCollectCard(objCard: tHungCard): void {
  if (objCard.bFound || bGameOver || bWon) {
    return
  }

  objCard.bFound = true
  objCard.objMesh.visible = false

  const nFound = nFoundCount()
  if (nFound >= nCardGoal) {
    bWon = true
    bGameOver = true
    vEndLookDrag(nLookPtrId)
    document.exitPointerLock()
  } else if (nFound >= nSlenderStartCards && !bSlenderActive) {
    vSpawnSlender()
  }

  vUpdateHud()
}

function vUpdateCardProximity(): void {
  const nR2 = nCardCollectR * nCardCollectR
  for (const objCard of arrHungCards) {
    if (objCard.bFound) {
      continue
    }
    const nDx = objPlayerPos.x - objCard.nX
    const nDz = objPlayerPos.z - objCard.nZ
    if (nDx * nDx + nDz * nDz <= nR2) {
      vCollectCard(objCard)
    }
  }
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

function bFloraSiteOk(nX: number, nZ: number): boolean {
  return Math.hypot(nX, nZ) >= nFloraClearSpawn
}

function arrFloraSites(nCount: number, nSalt: number): { nX: number; nZ: number; nSeed: number }[] {
  const nHalf = nTerrainSize * 0.5 - nFloraMargin
  const nGrid = Math.ceil(Math.sqrt(nCount * 4.5))
  const nCell = (nHalf * 2) / nGrid
  const arrCandidates: { nX: number; nZ: number; nSeed: number; nPick: number }[] = []

  for (let nGz = 0; nGz < nGrid; nGz++) {
    for (let nGx = 0; nGx < nGrid; nGx++) {
      const nSeed = nHash2(nGx + nSalt * 17, nGz + nSalt * 29)
      if (nSeed > 0.74) {
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

  arrCandidates.sort((objA, objB) => objA.nPick - objB.nPick)
  const arrOut: { nX: number; nZ: number; nSeed: number }[] = []
  const nTake = Math.min(nCount, arrCandidates.length)
  for (let nI = 0; nI < nTake; nI++) {
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
    const nLit = Math.pow(1 - nT, 1.55)
    const nBr = 0.005 + 0.007 * nLit
    const nBg = 0.002 + 0.003 * nLit
    const nBb = 0.002 + 0.0016 * nLit
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
      nScale,
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
      if (nSeed > 0.7) {
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

function objBuildStarfield(): THREE.Points {
  const arrPos = new Float32Array(nStarCount * 3)
  const arrCol = new Float32Array(nStarCount * 3)
  const arrPalette = [
    [0.35, 0.28, 0.12],
    [0.22, 0.14, 0.3],
    [0.3, 0.16, 0.24],
    [0.4, 0.34, 0.18],
  ]

  for (let nI = 0; nI < nStarCount; nI++) {
    const nU = nHash2(nI + 2, nI * 5 + 9)
    const nV = nHash2(nI * 3 + 1, nI + 17)
    const nW = nHash2(nI + 41, nI * 11 + 3)
    const nTheta = nU * Math.PI * 2
    const nPhi = Math.acos(1 - 1.45 * nV)
    const nR = nStarRadius * (0.82 + nW * 0.18)
    arrPos[nI * 3] = Math.sin(nPhi) * Math.cos(nTheta) * nR
    arrPos[nI * 3 + 1] = Math.cos(nPhi) * nR
    arrPos[nI * 3 + 2] = Math.sin(nPhi) * Math.sin(nTheta) * nR

    const arrRgb = arrPalette[Math.floor(nHash2(nI + 7, nI * 2 + 4) * arrPalette.length)]!
    const nRoll = nHash2(nI * 9 + 3, nI + 28)
    const nBright = nRoll > 0.9 ? 0.55 + nRoll * 0.25 : 0.12 + nRoll * 0.2
    arrCol[nI * 3] = arrRgb[0]! * nBright
    arrCol[nI * 3 + 1] = arrRgb[1]! * nBright
    arrCol[nI * 3 + 2] = arrRgb[2]! * nBright
  }

  const objGeo = new THREE.BufferGeometry()
  objGeo.setAttribute('position', new THREE.BufferAttribute(arrPos, 3))
  objGeo.setAttribute('color', new THREE.BufferAttribute(arrCol, 3))

  return new THREE.Points(
    objGeo,
    new THREE.PointsMaterial({
      size: nStarSize,
      sizeAttenuation: true,
      vertexColors: true,
      fog: false,
      depthWrite: false,
      transparent: true,
      opacity: 0.75,
    }),
  )
}

function vAddStarfield(objParent: THREE.Object3D): void {
  objStarRoot = new THREE.Group()
  objStarRoot.add(objBuildStarfield())
  objParent.add(objStarRoot)
}

function objBuildSlender(): THREE.Group {
  const objGroup = new THREE.Group()
  const objBody = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.38, 6.4, 6), objMatSlender)
  objBody.position.y = 3.2
  const objHead = new THREE.Mesh(new THREE.SphereGeometry(0.42, 8, 6), objMatSlender)
  objHead.scale.set(0.7, 1.55, 0.7)
  objHead.position.y = 7.05
  const objArmL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 4.2, 5), objMatSlender)
  objArmL.position.set(-0.55, 4.8, 0)
  objArmL.rotation.z = 0.35
  const objArmR = objArmL.clone()
  objArmR.position.x = 0.55
  objArmR.rotation.z = -0.35
  objGroup.add(objBody, objHead, objArmL, objArmR)
  objGroup.visible = false
  return objGroup
}

function vPickSlenderAroundPlayer(): void {
  // Prefer a spot behind / beside the player so they don't instantly reacquire.
  const nSide = Math.random() < 0.5 ? -1 : 1
  const nAng =
    nYaw +
    Math.PI +
    nSide * (0.55 + Math.random() * 1.1) +
    (Math.random() - 0.5) * 0.35
  const nDist = nSlenderSpawnMin + Math.random() * (nSlenderSpawnMax - nSlenderSpawnMin)
  nSlenderX = objPlayerPos.x + Math.sin(nAng) * nDist
  nSlenderZ = objPlayerPos.z + Math.cos(nAng) * nDist
  nSlenderX = Math.max(-nPlayHalf, Math.min(nPlayHalf, nSlenderX))
  nSlenderZ = Math.max(-nPlayHalf, Math.min(nPlayHalf, nSlenderZ))
}

function vArmSlenderTeleport(): void {
  nSlenderTeleportCool =
    nSlenderTeleportMinSec + Math.random() * (nSlenderTeleportMaxSec - nSlenderTeleportMinSec)
}

function vSpawnSlender(): void {
  if (!objSlender || bSlenderActive) {
    return
  }

  vPickSlenderAroundPlayer()
  bSlenderActive = true
  objSlender.visible = true
  vArmSlenderTeleport()
  vPlaceSlender()
}

function vPlaceSlender(): void {
  if (!objSlender) {
    return
  }
  const nGround = nSampleHeight(nSlenderX, nSlenderZ)
  objSlender.position.set(nSlenderX, nGround, nSlenderZ)
  objSlender.lookAt(objPlayerPos.x, nGround + nSlenderHeight * 0.5, objPlayerPos.z)
}

function bLookingAtSlender(): boolean {
  if (!bSlenderActive || !objCamera) {
    return false
  }

  const nDx = nSlenderX - objPlayerPos.x
  const nDz = nSlenderZ - objPlayerPos.z
  const nDist = Math.hypot(nDx, nDz)
  if (nDist < 0.001) {
    return true
  }

  objLookDir.set(-Math.sin(nYaw) * Math.cos(nPitch), Math.sin(nPitch), -Math.cos(nYaw) * Math.cos(nPitch))
  const nToX = nDx / nDist
  const nToZ = nDz / nDist
  const nDot = objLookDir.x * nToX + objLookDir.z * nToZ
  const nFovCos = Math.cos(0.42)
  return nDot > nFovCos && nDist < nFogFar * 1.15
}

function nAngleDiff(nFrom: number, nTo: number): number {
  let nDiff = nTo - nFrom
  while (nDiff > Math.PI) nDiff -= Math.PI * 2
  while (nDiff < -Math.PI) nDiff += Math.PI * 2
  return nDiff
}

function vUpdateDeathLook(nDt: number): void {
  if (!bGameOver || bWon || !bSlenderActive) {
    return
  }

  const nDx = nSlenderX - objPlayerPos.x
  const nDz = nSlenderZ - objPlayerPos.z
  const nHoriz = Math.hypot(nDx, nDz)
  const nTargetYaw = Math.atan2(-nDx, -nDz)
  const nHeadY = nSampleHeight(nSlenderX, nSlenderZ) + nDeathLookHeadY
  const nTargetPitch =
    nHoriz < 0.001
      ? 0
      : Math.min(nPitchMax, Math.max(nPitchMin, Math.atan2(nHeadY - objPlayerPos.y, nHoriz)))

  const nT = Math.min(1, nDeathLookSpeed * nDt)
  nYaw += nAngleDiff(nYaw, nTargetYaw) * nT
  nPitch += (nTargetPitch - nPitch) * nT

  vPlaceSlender()
}

function vUpdateSlender(nDt: number): void {
  if (!bSlenderActive || bGameOver || !objSlender) {
    return
  }

  if (bLookingAtSlender()) {
    vPlaceSlender()
    return
  }

  nSlenderTeleportCool -= nDt
  if (nSlenderTeleportCool <= 0) {
    vArmSlenderTeleport()
    if (Math.random() < nSlenderTeleportChance) {
      vPickSlenderAroundPlayer()
      vPlaceSlender()
      return
    }
  }

  const nFound = nFoundCount()
  const nSpeed = nSlenderBaseSpeed + nFound * nSlenderSpeedPerCard
  const nDx = objPlayerPos.x - nSlenderX
  const nDz = objPlayerPos.z - nSlenderZ
  const nDist = Math.hypot(nDx, nDz)
  if (nDist < nSlenderCatchR) {
    bGameOver = true
    vEndLookDrag(nLookPtrId)
    document.exitPointerLock()
    vUpdateHud()
    return
  }

  if (nDist > 0.001) {
    const nStep = Math.min(nDist, nSpeed * nDt)
    nSlenderX += (nDx / nDist) * nStep
    nSlenderZ += (nDz / nDist) * nStep
  }

  vPlaceSlender()
}

function vUpdateCameraOrientation(): void {
  if (!objCamera) {
    return
  }

  objCamera.position.copy(objPlayerPos)
  objCamera.rotation.order = 'YXZ'
  objCamera.rotation.y = nYaw
  objCamera.rotation.x = nPitch

  if (objFlashlight) {
    objFlashlight.target.updateMatrixWorld()
  }
}

function vPlacePlayerOnTerrain(): void {
  objPlayerPos.set(0, 0, 0)
  objPlayerPos.y = nSampleHeight(0, 0) + nEyeHeight
  nYaw = 0
  nPitch = 0
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

function vPlayerMove(nDt: number): void {
  if (!bControlsActive() || bGameOver) {
    return
  }

  let nMx = 0
  let nMz = 0
  if (objKeys.bForward) nMz -= 1
  if (objKeys.bBack) nMz += 1
  if (objKeys.bLeft) nMx -= 1
  if (objKeys.bRight) nMx += 1

  if (nMx === 0 && nMz === 0) {
    return
  }

  const nLen = Math.hypot(nMx, nMz)
  nMx /= nLen
  nMz /= nLen

  const nSin = Math.sin(nYaw)
  const nCos = Math.cos(nYaw)
  const nWx = nMx * nCos + nMz * nSin
  const nWz = nMz * nCos - nMx * nSin
  const nSpeed = nWalkSpeed
  vTryMove(nWx * nSpeed * nDt, nWz * nSpeed * nDt)
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
      uTime: { value: 0 },
      uBleedPx: { value: nVhsBleedPx },
      uScan: { value: nVhsScanStrength },
      uNoise: { value: nVhsNoiseStrength },
      uVignette: { value: nVhsVignette },
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
      uniform float uTime;
      uniform float uBleedPx;
      uniform float uScan;
      uniform float uNoise;
      uniform float uVignette;
      varying vec2 vUv;

      float nHash(vec2 objP) {
        return fract(sin(dot(objP, vec2(127.1, 311.7))) * 43758.5453);
      }

      void main() {
        vec2 objPx = 1.0 / max(uResolution, vec2(1.0));
        float nWave = sin(vUv.y * 28.0 + uTime * 7.0) * 0.0012
          + sin(uTime * 1.7 + vUv.y * 3.0) * 0.0007;
        float nTrack = step(0.992, nHash(vec2(floor(uTime * 4.0), 0.3))) * 0.012;
        vec2 objUv = vUv + vec2(nWave + nTrack, 0.0);
        objUv = clamp(objUv, 0.0, 1.0);

        float nBleed = uBleedPx * objPx.x;
        float nR = texture2D(tDiffuse, objUv + vec2(nBleed, 0.0)).r;
        float nG = texture2D(tDiffuse, objUv).g;
        float nB = texture2D(tDiffuse, objUv - vec2(nBleed, 0.0)).b;
        vec3 objCol = vec3(nR, nG, nB);

        float nScan = sin((objUv.y + uTime * 0.08) * uResolution.y * 1.35) * 0.5 + 0.5;
        objCol *= 1.0 - uScan * nScan;

        float nStatic = nHash(objUv * uResolution * 0.35 + vec2(uTime * 18.0, uTime * 11.0));
        objCol += (nStatic - 0.5) * uNoise;

        float nV = length(objUv - 0.5);
        objCol *= 1.0 - smoothstep(0.35, 0.95, nV) * uVignette;

        gl_FragColor = vec4(objCol, 1.0);
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
  if (!objCanvasHost || !objRenderer || !objCamera) {
    return
  }

  const nW = objCanvasHost.clientWidth
  const nH = Math.max(1, objCanvasHost.clientHeight)
  objCamera.aspect = nW / nH
  objCamera.updateProjectionMatrix()
  objRenderer.setSize(nW, nH, false)

  if (bVhsEnabled && objSceneTarget && objVhsMat) {
    const nPr = objRenderer.getPixelRatio()
    const nRw = Math.max(1, Math.floor(nW * nPr))
    const nRh = Math.max(1, Math.floor(nH * nPr))
    objSceneTarget.setSize(nRw, nRh)
    objVhsMat.uniforms.uResolution.value.set(nRw, nRh)
  }
}

function vTick(nTs: number): void {
  if (!bRunning || !objRenderer || !objScene || !objCamera) {
    return
  }

  const nDt = Math.min(0.05, (nTs - nLastTs) / 1000 || 0.016)
  nLastTs = nTs

  vPlayerMove(nDt)
  objPlayerPos.y = nSampleHeight(objPlayerPos.x, objPlayerPos.z) + nEyeHeight
  vUpdateCardProximity()
  vUpdateSlender(nDt)
  vUpdateDeathLook(nDt)
  vUpdateGrass()
  vUpdateCardFireflies(nDt)
  vUpdateCameraOrientation()

  if (objStarRoot) {
    objStarRoot.rotation.y += 0.002 * nDt
  }

  if (bVhsEnabled && objSceneTarget && objVhsScene && objVhsCam && objVhsMat) {
    objVhsMat.uniforms.uTime.value = nTs * 0.001
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
  objScene.background = new THREE.Color(0x000000)
  objScene.fog = new THREE.Fog(0x000000, nFogNear, nFogFar)

  objCamera = new THREE.PerspectiveCamera(68, 1, 0.1, 8000)
  objScene.add(objCamera)

  objFlashlight = new THREE.SpotLight(
    0xfff0d4,
    nFlashIntensity,
    nFlashDistance,
    nFlashAngle,
    nFlashPenumbra,
    nFlashDecay,
  )
  objFlashlight.position.set(0.0, -0.12, 0.05)
  objCamera.add(objFlashlight)
  objCamera.add(objFlashlight.target)
  objFlashlight.target.position.set(0, 0, -1)

  objRenderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
  objRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  objRenderer.outputColorSpace = THREE.SRGBColorSpace
  objCanvasHost.appendChild(objRenderer.domElement)
  vInitVhsPass()

  objScene.add(new THREE.AmbientLight(0x101018, 0.12))
  const objMoon = new THREE.DirectionalLight(0x2a3040, 0.08)
  objMoon.position.set(-40, 80, 30)
  objScene.add(objMoon)

  objScene.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(6000, 20, 12),
      new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide, fog: false }),
    ),
  )

  vAddStarfield(objScene)
  objScene.add(objBuildTerrain())
  vAddFlora(objScene)
  vAddHungCards(objScene)
  vAddGrass(objScene)

  objSlender = objBuildSlender()
  objScene.add(objSlender)

  vPlacePlayerOnTerrain()
  vResize()
  vUpdateHud()
}

function vResetRun(): void {
  for (const objCard of arrHungCards) {
    objCard.bFound = false
    objCard.objMesh.visible = true
  }

  bGameOver = false
  bWon = false
  bSlenderActive = false
  nSlenderTeleportCool = 0
  if (objSlender) {
    objSlender.visible = false
  }

  vPlacePlayerOnTerrain()
  vUpdateHud()
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
  bTouchPlaying = false
  vEndLookDrag(nLookPtrId)
  vClearMoveKeys()
  document.querySelectorAll('.forest-pad-btn.is-pressed').forEach((objEl) => {
    objEl.classList.remove('is-pressed')
  })
  if (bPointerLocked) {
    document.exitPointerLock()
  }
  objCanvasHost?.classList.remove('is-revealed')
  if (nAnimFrame !== 0) {
    window.cancelAnimationFrame(nAnimFrame)
    nAnimFrame = 0
  }
}

function vOnKeyDown(objEv: KeyboardEvent): void {
  if (!bRunning) {
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
    default:
      return
  }
  objEv.preventDefault()
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
  }
}

function vOnMouseMove(objEv: MouseEvent): void {
  if (!bPointerLocked || bGameOver) {
    return
  }

  nYaw -= objEv.movementX * nLookSens
  nPitch = Math.min(nPitchMax, Math.max(nPitchMin, nPitch - objEv.movementY * nLookSens))
}

function vOnPointerLockChange(): void {
  bPointerLocked = document.pointerLockElement === objCanvasHost
  objCanvasHost?.classList.toggle('is-locked', bPointerLocked)
  if (bPointerLocked) {
    bTouchPlaying = false
    vEndLookDrag(nLookPtrId)
  }
  vUpdateHud()
}

function vEndLookDrag(nPtrId: number): void {
  if (!bLookDragging || (nPtrId >= 0 && nLookPtrId !== nPtrId)) {
    return
  }

  bLookDragging = false
  const nReleaseId = nLookPtrId
  nLookPtrId = -1
  if (objCanvasHost && nReleaseId >= 0) {
    try {
      objCanvasHost.releasePointerCapture(nReleaseId)
    } catch {
      /* already released */
    }
  }
}

function vStartLookDrag(objEv: PointerEvent): void {
  bLookDragging = true
  nLookPtrId = objEv.pointerId
  nLookLastX = objEv.clientX
  nLookLastY = objEv.clientY
  objCanvasHost?.setPointerCapture(objEv.pointerId)
}

function vEnterPlay(objEv: PointerEvent): void {
  const bTouch = objEv.pointerType === 'touch' || objEv.pointerType === 'pen' || bCoarsePointer()
  if (bTouch) {
    bTouchPlaying = true
    vUpdateHud()
    vStartLookDrag(objEv)
    return
  }

  objCanvasHost?.requestPointerLock()
}

function vOnHostPointerDown(objEv: PointerEvent): void {
  if (!bRunning || !objCanvasHost || objEv.button !== 0) {
    return
  }

  if (bGameOver) {
    vResetRun()
  }

  if (!bControlsActive()) {
    vEnterPlay(objEv)
    objEv.preventDefault()
    return
  }

  if (bTouchPlaying && !bPointerLocked && !bGameOver) {
    vStartLookDrag(objEv)
    objEv.preventDefault()
  }
}

function vOnHostPointerMove(objEv: PointerEvent): void {
  if (!bLookDragging || objEv.pointerId !== nLookPtrId || bGameOver) {
    return
  }

  const nDx = objEv.clientX - nLookLastX
  const nDy = objEv.clientY - nLookLastY
  nLookLastX = objEv.clientX
  nLookLastY = objEv.clientY
  nYaw -= nDx * nTouchLookSens
  nPitch = Math.min(nPitchMax, Math.max(nPitchMin, nPitch - nDy * nTouchLookSens))
}

function vBindPadButton(objBtn: HTMLElement, sDir: keyof tKeys): void {
  const vPress = (objEvent: PointerEvent): void => {
    if (!bRunning) {
      return
    }

    objEvent.preventDefault()
    objEvent.stopPropagation()
    objBtn.setPointerCapture(objEvent.pointerId)
    objKeys[sDir] = true
    objBtn.classList.add('is-pressed')

    if (!bControlsActive()) {
      bTouchPlaying = true
      vUpdateHud()
    }
  }

  const vRelease = (objEvent: PointerEvent): void => {
    objEvent.preventDefault()
    objEvent.stopPropagation()
    objKeys[sDir] = false
    objBtn.classList.remove('is-pressed')
    if (objBtn.hasPointerCapture(objEvent.pointerId)) {
      objBtn.releasePointerCapture(objEvent.pointerId)
    }
  }

  objBtn.addEventListener('pointerdown', vPress)
  objBtn.addEventListener('pointerup', vRelease)
  objBtn.addEventListener('pointercancel', vRelease)
  objBtn.addEventListener('lostpointercapture', () => {
    objKeys[sDir] = false
    objBtn.classList.remove('is-pressed')
  })
  objBtn.addEventListener('contextmenu', (objEvent) => {
    objEvent.preventDefault()
  })
}

export function sForestMarkup(): string {
  return `
    <div class="forest" id="forest">
      <div class="forest-stage">
        <div class="forest-viewport" id="forest-viewport" role="img" aria-label="Forest card hunt — click or tap to enter, WASD or on-screen pad to move, drag to look on touch"></div>
        <div class="forest-hud" id="forest-hud">
          <p class="forest-status" id="forest-status" aria-live="polite">Cards 0/${nCardGoal}</p>
          <p class="forest-prompt" id="forest-prompt">click to enter the forest · WASD move · follow the fireflies</p>
        </div>
        <div class="forest-pad" aria-hidden="true">
          <div class="forest-pad-move">
            <button type="button" class="forest-pad-btn" data-pad="forward" aria-label="Walk forward">▲</button>
            <button type="button" class="forest-pad-btn" data-pad="left" aria-label="Strafe left">◀</button>
            <button type="button" class="forest-pad-btn" data-pad="back" aria-label="Walk back">▼</button>
            <button type="button" class="forest-pad-btn" data-pad="right" aria-label="Strafe right">▶</button>
          </div>
        </div>
      </div>
      <div class="forest-side">
        <span class="forest-checklist-label">Cards in the trees</span>
        <ul class="forest-checklist" id="forest-checklist" aria-label="Card checklist"></ul>
      </div>
      <p class="forest-caption">forest · collect all 16 · do not look away too long</p>
    </div>
  `
}

export function vBindForest(arrCards: tForestCard[]): void {
  arrForestCards = arrCards
  objCanvasHost = document.querySelector<HTMLElement>('#forest-viewport')
  objPrompt = document.querySelector<HTMLElement>('#forest-prompt')
  objChecklist = document.querySelector<HTMLElement>('#forest-checklist')
  objStatus = document.querySelector<HTMLElement>('#forest-status')

  if (!objCanvasHost) {
    return
  }

  objCanvasHost.addEventListener('pointerdown', vOnHostPointerDown)
  objCanvasHost.addEventListener('pointermove', vOnHostPointerMove)
  objCanvasHost.addEventListener('pointerup', (objEv) => {
    vEndLookDrag(objEv.pointerId)
  })
  objCanvasHost.addEventListener('pointercancel', (objEv) => {
    vEndLookDrag(objEv.pointerId)
  })
  objCanvasHost.addEventListener('lostpointercapture', (objEv) => {
    vEndLookDrag(objEv.pointerId)
  })
  document.addEventListener('pointerlockchange', vOnPointerLockChange)
  document.addEventListener('mousemove', vOnMouseMove)
  window.addEventListener('keydown', vOnKeyDown)
  window.addEventListener('keyup', vOnKeyUp)
  window.addEventListener('resize', () => {
    if (bRunning) {
      vResize()
    }
  })

  const objPad = document.querySelector<HTMLElement>('.forest-pad')
  const objPadFwd = objPad?.querySelector<HTMLElement>('[data-pad="forward"]')
  const objPadBack = objPad?.querySelector<HTMLElement>('[data-pad="back"]')
  const objPadLeft = objPad?.querySelector<HTMLElement>('[data-pad="left"]')
  const objPadRight = objPad?.querySelector<HTMLElement>('[data-pad="right"]')
  if (objPadFwd) vBindPadButton(objPadFwd, 'bForward')
  if (objPadBack) vBindPadButton(objPadBack, 'bBack')
  if (objPadLeft) vBindPadButton(objPadLeft, 'bLeft')
  if (objPadRight) vBindPadButton(objPadRight, 'bRight')

  vUpdateHud()

  const objPanel = document.querySelector<HTMLElement>('[data-panel="forest"]')
  if (objPanel?.classList.contains('is-active')) {
    vSetForestActive(true)
  }
}

export function vSetForestActive(bActive: boolean): void {
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
  }, nForestStartDelayMs)
}
