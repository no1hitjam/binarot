const nGravity = 2200
const nMoveAccel = 3200
const nMoveMax = 260
const nFriction = 1800
const nJumpSpeed = 620
const nDoubleJumpSpeed = 560
const nBounceSpeed = 820
const nCoyoteMs = 90
const nJumpBufferMs = 100
const nPlayerW = 22
const nPlayerH = 30
const nTile = 28
const nCameraLerp = 8
const nDeathFallY = 900
const nSpawnX = 48
const nSpawnY = 360
const nStageLen = 1700
const nGenAhead = 900
const nCullBehind = 500
const nPlatYMin = 160
const nPlatYMax = 440
const nGoalW = 48
const nGoalH = 80
const nStageFlashMs = 1200
const arrGlyphs = ['0', '1', '10', '11', '&', '|', '^']

type tRect = {
  nX: number
  nY: number
  nW: number
  nH: number
}

type tSolid = tRect & {
  bBounce: boolean
}

type tCoin = tRect & {
  sGlyph: string
  bTaken: boolean
}

type tPlayer = {
  nX: number
  nY: number
  nVx: number
  nVy: number
  bOnGround: boolean
  nCoyoteLeft: number
  nJumpBuffer: number
  bDoubleJumpReady: boolean
  bFacingRight: boolean
}

let objRoot: HTMLElement | null = null
let objCanvas: HTMLCanvasElement | null = null
let objCtx: CanvasRenderingContext2D | null = null
let objHud: HTMLElement | null = null
let nAnimFrame = 0
let bRunning = false
let nDpr = 1
let nLastTs = 0
let nCamX = 0
let nCoinsTaken = 0
let nStage = 1
let nBestStage = 1
let nStageFlash = 0
let bJumpDown = false
let nSeed = 1
let nGenCursor = 0
let nLastPlatRight = 0
let nLastPlatY = 420
let nNextGateX = nStageLen
let nCoinGlyph = 0
let arrSolid: tSolid[] = []
let arrCoins: tCoin[] = []
let objGoal: tRect = { nX: 0, nY: 0, nW: nGoalW, nH: nGoalH }
let objPlayer: tPlayer = objNewPlayer()

const setKeys = new Set<string>()

function objNewPlayer(): tPlayer {
  return {
    nX: nSpawnX,
    nY: nSpawnY,
    nVx: 0,
    nVy: 0,
    bOnGround: false,
    nCoyoteLeft: 0,
    nJumpBuffer: 0,
    bDoubleJumpReady: true,
    bFacingRight: true,
  }
}

function nRand(): number {
  nSeed = (nSeed + 0x6d2b79f5) | 0
  let nT = Math.imul(nSeed ^ (nSeed >>> 15), 1 | nSeed)
  nT = (nT + Math.imul(nT ^ (nT >>> 7), 61 | nT)) ^ nT
  return ((nT ^ (nT >>> 14)) >>> 0) / 4294967296
}

function nRandRange(nMin: number, nMax: number): number {
  return nMin + (nMax - nMin) * nRand()
}

function nClamp(nV: number, nMin: number, nMax: number): number {
  return Math.max(nMin, Math.min(nMax, nV))
}

function nDifficulty(): number {
  return Math.min(1, (nStage - 1) * 0.08)
}

function vPlaceGoal(nPlatX: number, nPlatY: number, nPlatW: number): void {
  objGoal.nX = nPlatX + Math.max(8, nPlatW - nGoalW - 12)
  objGoal.nY = nPlatY - nGoalH
}

function vPushCoin(nX: number, nY: number): void {
  arrCoins.push({
    nX,
    nY,
    nW: 16,
    nH: 16,
    sGlyph: arrGlyphs[nCoinGlyph % arrGlyphs.length]!,
    bTaken: false,
  })
  nCoinGlyph += 1
}

function vPushPlatform(nX: number, nY: number, nW: number, bWithCoin: boolean, bBounce: boolean): void {
  const bWillGate = nX + nW >= nNextGateX && objGoal.nY < -900
  arrSolid.push({ nX, nY, nW, nH: nTile, bBounce: bBounce && !bWillGate })
  nLastPlatRight = nX + nW
  nLastPlatY = nY
  nGenCursor = Math.max(nGenCursor, nLastPlatRight)

  if (bWithCoin) {
    vPushCoin(nX + nW * 0.5 - 8, nY - 36)
  }

  if (bWillGate) {
    vPlaceGoal(nX, nY, nW)
  }
}

function vGenChunk(): void {
  const nDiff = nDifficulty()
  const nGapMin = 70 + nDiff * 50
  const nGapMax = 110 + nDiff * 70
  const nWMin = Math.max(56, 120 - nDiff * 40)
  const nWMax = Math.max(nWMin + 20, 180 - nDiff * 30)
  const nDyMax = 36 + nDiff * 55

  const nGap = nRandRange(nGapMin, nGapMax)
  const nW = nRandRange(nWMin, nWMax)
  const nDy = nRandRange(-nDyMax, nDyMax)
  const nY = nClamp(nLastPlatY + nDy, nPlatYMin, nPlatYMax)
  const nX = nLastPlatRight + nGap
  const bBounce = nRand() > 0.82
  vPushPlatform(nX, nY, nW, !bBounce && nRand() > 0.28, bBounce)

  if (nRand() > 0.62) {
    const nSideY = nClamp(nY - nRandRange(70, 110), nPlatYMin, nPlatYMax - 40)
    const nSideW = nRandRange(48, 78)
    const nSideX = nX + nRandRange(0, Math.max(0, nW - nSideW))
    const bSideBounce = nRand() > 0.7
    arrSolid.push({ nX: nSideX, nY: nSideY, nW: nSideW, nH: nTile, bBounce: bSideBounce })
    if (!bSideBounce && nRand() > 0.35) {
      vPushCoin(nSideX + nSideW * 0.5 - 8, nSideY - 36)
    }
  }
}

function vEnsureWorld(nNeedX: number): void {
  while (nGenCursor < nNeedX) {
    vGenChunk()
  }
}

function vCullBehind(nCutX: number): void {
  arrSolid = arrSolid.filter((objSolid) => objSolid.nX + objSolid.nW > nCutX)
  arrCoins = arrCoins.filter((objCoin) => !objCoin.bTaken && objCoin.nX + objCoin.nW > nCutX)
}

function vBootstrapWorld(): void {
  arrSolid = []
  arrCoins = []
  nSeed = (Date.now() ^ (Math.random() * 0x7fffffff)) | 1
  nCoinGlyph = 0
  nGenCursor = 0
  nLastPlatRight = 0
  nLastPlatY = 420
  nNextGateX = nStageLen
  objGoal = { nX: 0, nY: -9999, nW: nGoalW, nH: nGoalH }
  vPushPlatform(0, 420, 280, false, false)
  arrSolid.push({ nX: 160, nY: 300, nW: 70, nH: nTile, bBounce: false })
  arrSolid.push({ nX: 40, nY: 220, nW: 90, nH: nTile, bBounce: false })
  vPushCoin(185, 264)
  vPushCoin(73, 184)
  vPushPlatform(360, 380, 72, false, true)
  vEnsureWorld(nStageLen + nGenAhead)
}

function bOverlap(objA: tRect, objB: tRect): boolean {
  return (
    objA.nX < objB.nX + objB.nW &&
    objA.nX + objA.nW > objB.nX &&
    objA.nY < objB.nY + objB.nH &&
    objA.nY + objA.nH > objB.nY
  )
}

function objPlayerRect(): tRect {
  return { nX: objPlayer.nX, nY: objPlayer.nY, nW: nPlayerW, nH: nPlayerH }
}

function bKeyDown(sKey: string): boolean {
  return setKeys.has(sKey)
}

function nMoveInput(): number {
  let nDir = 0
  if (bKeyDown('ArrowLeft') || bKeyDown('a') || bKeyDown('A')) {
    nDir -= 1
  }
  if (bKeyDown('ArrowRight') || bKeyDown('d') || bKeyDown('D')) {
    nDir += 1
  }
  return nDir
}

function bJumpPressed(): boolean {
  return bKeyDown(' ') || bKeyDown('ArrowUp') || bKeyDown('w') || bKeyDown('W')
}

function vResetLevel(): void {
  objPlayer = objNewPlayer()
  nCoinsTaken = 0
  nStage = 1
  nStageFlash = 0
  nCamX = 0
  bJumpDown = false
  vBootstrapWorld()
  vSyncHud()
}

function vSyncHud(): void {
  if (!objHud) {
    return
  }

  objHud.textContent = `stage ${nStage} · ${nCoinsTaken} bits · best ${nBestStage} · space jump×2`
}

function vClearStage(): void {
  nStage += 1
  if (nStage > nBestStage) {
    nBestStage = nStage
  }
  nStageFlash = nStageFlashMs
  objGoal.nY = -9999
  nNextGateX =
    Math.max(nGenCursor, objPlayer.nX + 400) + nStageLen + Math.floor(nRandRange(0, 200))
  vEnsureWorld(nNextGateX + nGenAhead)
  vSyncHud()
}

function vTryJump(): void {
  const bGroundJump = objPlayer.bOnGround || objPlayer.nCoyoteLeft > 0
  if (!bGroundJump && !objPlayer.bDoubleJumpReady) {
    return
  }

  if (bGroundJump) {
    objPlayer.nVy = -nJumpSpeed
  } else {
    objPlayer.nVy = -nDoubleJumpSpeed
    objPlayer.bDoubleJumpReady = false
  }

  objPlayer.bOnGround = false
  objPlayer.nCoyoteLeft = 0
  objPlayer.nJumpBuffer = 0
}

function vResolveSolid(nPrevY: number): void {
  objPlayer.bOnGround = false
  const objBody = objPlayerRect()

  for (const objSolid of arrSolid) {
    if (!bOverlap(objBody, objSolid)) {
      continue
    }

    const nOverlapL = objBody.nX + objBody.nW - objSolid.nX
    const nOverlapR = objSolid.nX + objSolid.nW - objBody.nX
    const nOverlapT = objBody.nY + objBody.nH - objSolid.nY
    const nOverlapB = objSolid.nY + objSolid.nH - objBody.nY
    const nMinX = Math.min(nOverlapL, nOverlapR)
    const nMinY = Math.min(nOverlapT, nOverlapB)

    if (nMinY < nMinX) {
      if (nOverlapT < nOverlapB && nPrevY + nPlayerH <= objSolid.nY + 1) {
        objPlayer.nY = objSolid.nY - nPlayerH
        if (objSolid.bBounce) {
          objPlayer.nVy = -nBounceSpeed
          objPlayer.bOnGround = false
          objPlayer.nCoyoteLeft = 0
          objPlayer.nJumpBuffer = 0
          objPlayer.bDoubleJumpReady = true
        } else {
          objPlayer.nVy = 0
          objPlayer.bOnGround = true
          objPlayer.nCoyoteLeft = nCoyoteMs
          objPlayer.bDoubleJumpReady = true
        }
      } else if (nOverlapB <= nOverlapT && nPrevY >= objSolid.nY + objSolid.nH - 1) {
        objPlayer.nY = objSolid.nY + objSolid.nH
        if (objPlayer.nVy < 0) {
          objPlayer.nVy = 0
        }
      }
    } else {
      if (nOverlapL < nOverlapR) {
        objPlayer.nX = objSolid.nX - nPlayerW
      } else {
        objPlayer.nX = objSolid.nX + objSolid.nW
      }
      objPlayer.nVx = 0
    }

    objBody.nX = objPlayer.nX
    objBody.nY = objPlayer.nY
  }
}

function vUpdatePhysics(nDt: number): void {
  if (nStageFlash > 0) {
    nStageFlash = Math.max(0, nStageFlash - nDt * 1000)
  }

  const nDir = nMoveInput()
  if (nDir !== 0) {
    objPlayer.nVx += nDir * nMoveAccel * nDt
    objPlayer.bFacingRight = nDir > 0
  } else {
    const nSign = Math.sign(objPlayer.nVx)
    const nAbs = Math.abs(objPlayer.nVx)
    const nNext = Math.max(0, nAbs - nFriction * nDt)
    objPlayer.nVx = nSign * nNext
  }

  if (objPlayer.nVx > nMoveMax) {
    objPlayer.nVx = nMoveMax
  } else if (objPlayer.nVx < -nMoveMax) {
    objPlayer.nVx = -nMoveMax
  }

  const bJumpNow = bJumpPressed()
  if (bJumpNow && !bJumpDown) {
    objPlayer.nJumpBuffer = nJumpBufferMs
  }
  bJumpDown = bJumpNow

  objPlayer.nJumpBuffer = Math.max(0, objPlayer.nJumpBuffer - nDt * 1000)
  if (objPlayer.nJumpBuffer > 0) {
    vTryJump()
  }

  objPlayer.nVy += nGravity * nDt
  if (objPlayer.nVy > 900) {
    objPlayer.nVy = 900
  }

  if (!objPlayer.bOnGround) {
    objPlayer.nCoyoteLeft = Math.max(0, objPlayer.nCoyoteLeft - nDt * 1000)
  }

  const nPrevY = objPlayer.nY
  objPlayer.nX += objPlayer.nVx * nDt
  objPlayer.nY += objPlayer.nVy * nDt
  vResolveSolid(nPrevY)

  if (objPlayer.nX < 0) {
    objPlayer.nX = 0
    objPlayer.nVx = 0
  }

  vEnsureWorld(objPlayer.nX + nGenAhead)
  vCullBehind(nCamX - nCullBehind)

  for (const objCoin of arrCoins) {
    if (objCoin.bTaken) {
      continue
    }
    if (bOverlap(objPlayerRect(), objCoin)) {
      objCoin.bTaken = true
      nCoinsTaken += 1
      vSyncHud()
    }
  }

  if (objGoal.nY > -900 && bOverlap(objPlayerRect(), objGoal)) {
    vClearStage()
  }

  if (objPlayer.nY > nDeathFallY) {
    vResetLevel()
  }
}

function vUpdateCamera(nDt: number, nViewW: number): void {
  const nTarget = objPlayer.nX + nPlayerW * 0.5 - nViewW * 0.38
  const nClamped = Math.max(0, nTarget)
  const nT = 1 - Math.exp(-nCameraLerp * nDt)
  nCamX += (nClamped - nCamX) * nT
}

function vDrawBg(nW: number, nH: number): void {
  if (!objCtx) {
    return
  }

  const objGrad = objCtx.createLinearGradient(0, 0, 0, nH)
  objGrad.addColorStop(0, '#0c0618')
  objGrad.addColorStop(0.55, '#050308')
  objGrad.addColorStop(1, '#080510')
  objCtx.fillStyle = objGrad
  objCtx.fillRect(0, 0, nW, nH)

  objCtx.save()
  objCtx.translate(-nCamX * 0.25, 0)
  const nParallaxSpan = nW * 4 + 400
  const nBase = Math.floor((nCamX * 0.25) / nParallaxSpan) * nParallaxSpan
  for (let nI = 0; nI < 24; nI++) {
    const nSx = nBase + ((nI * 137) % nParallaxSpan)
    const nSy = 40 + ((nI * 53) % 120)
    const nR = 1 + (nI % 3)
    objCtx.fillStyle = nI % 4 === 0 ? 'rgba(224, 184, 58, 0.35)' : 'rgba(139, 77, 255, 0.28)'
    objCtx.beginPath()
    objCtx.arc(nSx, nSy, nR, 0, Math.PI * 2)
    objCtx.fill()
  }
  objCtx.restore()
}

function vDrawPlatforms(nTs: number): void {
  if (!objCtx) {
    return
  }

  for (const objSolid of arrSolid) {
    const nX = objSolid.nX - nCamX
    if (nX + objSolid.nW < -40 || nX > 2000) {
      continue
    }
    const nY = objSolid.nY

    if (objSolid.bBounce) {
      const nPulse = 0.55 + 0.45 * Math.sin(nTs * 0.008 + objSolid.nX * 0.03)
      objCtx.fillStyle = '#5a4010'
      objCtx.fillRect(nX, nY, objSolid.nW, objSolid.nH)
      objCtx.fillStyle = `rgba(255, 214, 90, ${0.55 + 0.35 * nPulse})`
      objCtx.fillRect(nX + 1, nY + 1, objSolid.nW - 2, objSolid.nH - 2)
      objCtx.fillStyle = '#ffe08a'
      objCtx.fillRect(nX, nY, objSolid.nW, 4)
      objCtx.strokeStyle = `rgba(255, 232, 150, ${0.65 + 0.35 * nPulse})`
      objCtx.lineWidth = 1.5
      objCtx.strokeRect(nX + 0.5, nY + 0.5, objSolid.nW - 1, objSolid.nH - 1)
      objCtx.fillStyle = 'rgba(90, 64, 16, 0.35)'
      for (let nPx = 10; nPx < objSolid.nW - 6; nPx += 14) {
        objCtx.fillRect(nX + nPx, nY + 12, 3, 3)
      }
      continue
    }

    objCtx.fillStyle = '#120a1c'
    objCtx.fillRect(nX, nY, objSolid.nW, objSolid.nH)
    objCtx.fillStyle = 'rgba(139, 77, 255, 0.22)'
    objCtx.fillRect(nX, nY, objSolid.nW, 3)
    objCtx.strokeStyle = 'rgba(224, 184, 58, 0.45)'
    objCtx.lineWidth = 1
    objCtx.strokeRect(nX + 0.5, nY + 0.5, objSolid.nW - 1, objSolid.nH - 1)

    objCtx.fillStyle = 'rgba(224, 184, 58, 0.12)'
    for (let nPx = 8; nPx < objSolid.nW - 4; nPx += 18) {
      objCtx.fillRect(nX + nPx, nY + 10, 2, 2)
    }
  }
}

function vDrawCoins(nTs: number): void {
  if (!objCtx) {
    return
  }

  objCtx.font = '11px "IBM Plex Mono", Consolas, Monaco, monospace'
  objCtx.textAlign = 'center'
  objCtx.textBaseline = 'middle'

  for (const objCoin of arrCoins) {
    if (objCoin.bTaken) {
      continue
    }

    const nBob = Math.sin(nTs * 0.004 + objCoin.nX * 0.02) * 3
    const nX = objCoin.nX - nCamX + objCoin.nW * 0.5
    if (nX < -40 || nX > 2000) {
      continue
    }
    const nY = objCoin.nY + objCoin.nH * 0.5 + nBob

    objCtx.fillStyle = 'rgba(224, 184, 58, 0.18)'
    objCtx.beginPath()
    objCtx.arc(nX, nY, 11, 0, Math.PI * 2)
    objCtx.fill()

    objCtx.fillStyle = '#ffe08a'
    objCtx.shadowColor = 'rgba(224, 184, 58, 0.55)'
    objCtx.shadowBlur = 8
    objCtx.fillText(objCoin.sGlyph, nX, nY)
    objCtx.shadowBlur = 0
  }
}

function vDrawGoal(nTs: number): void {
  if (!objCtx || objGoal.nY < -900) {
    return
  }

  const nX = objGoal.nX - nCamX
  if (nX + objGoal.nW < -40 || nX > 2000) {
    return
  }
  const nY = objGoal.nY
  const nPulse = 0.55 + 0.45 * Math.sin(nTs * 0.005)

  objCtx.fillStyle = `rgba(139, 77, 255, ${0.15 + 0.2 * nPulse})`
  objCtx.fillRect(nX, nY, objGoal.nW, objGoal.nH)
  objCtx.strokeStyle = `rgba(224, 184, 58, ${0.55 + 0.35 * nPulse})`
  objCtx.lineWidth = 2
  objCtx.strokeRect(nX + 1, nY + 1, objGoal.nW - 2, objGoal.nH - 2)

  objCtx.font = '10px "IBM Plex Mono", Consolas, Monaco, monospace'
  objCtx.fillStyle = '#e0b83a'
  objCtx.textAlign = 'center'
  objCtx.textBaseline = 'middle'
  objCtx.fillText('1111', nX + objGoal.nW * 0.5, nY + objGoal.nH * 0.5)
}

function vDrawPlayer(): void {
  if (!objCtx) {
    return
  }

  const nX = objPlayer.nX - nCamX
  const nY = objPlayer.nY

  objCtx.fillStyle = '#1a0f28'
  objCtx.fillRect(nX, nY, nPlayerW, nPlayerH)
  objCtx.fillStyle = '#e0b83a'
  objCtx.fillRect(nX + 2, nY + 2, nPlayerW - 4, nPlayerH - 4)
  objCtx.fillStyle = '#050308'
  const nEyeX = objPlayer.bFacingRight ? nX + 13 : nX + 5
  objCtx.fillRect(nEyeX, nY + 9, 4, 4)
  objCtx.fillStyle = '#8b4dff'
  objCtx.fillRect(nX + 4, nY + nPlayerH - 8, nPlayerW - 8, 3)
}

function vDrawStageFlash(nW: number, nH: number): void {
  if (!objCtx || nStageFlash <= 0) {
    return
  }

  const nAlpha = Math.min(0.55, (nStageFlash / nStageFlashMs) * 0.7)
  objCtx.fillStyle = `rgba(5, 3, 8, ${nAlpha})`
  objCtx.fillRect(0, 0, nW, nH)
  objCtx.font = '700 22px "IBM Plex Mono", Consolas, Monaco, monospace'
  objCtx.fillStyle = '#ffe08a'
  objCtx.textAlign = 'center'
  objCtx.textBaseline = 'middle'
  objCtx.fillText(`STAGE ${nStage}`, nW * 0.5, nH * 0.42)
  objCtx.font = '13px "IBM Plex Mono", Consolas, Monaco, monospace'
  objCtx.fillStyle = '#9a8fb0'
  objCtx.fillText('keep running', nW * 0.5, nH * 0.52)
}

function vDrawFrame(nTs: number): void {
  if (!objCanvas || !objCtx || !bRunning) {
    return
  }

  const nDt = nLastTs === 0 ? 0 : Math.min(0.05, (nTs - nLastTs) / 1000)
  nLastTs = nTs

  const nW = objCanvas.clientWidth
  const nH = objCanvas.clientHeight

  vUpdatePhysics(nDt)
  vUpdateCamera(nDt, nW)

  vDrawBg(nW, nH)
  vDrawPlatforms(nTs)
  vDrawCoins(nTs)
  vDrawGoal(nTs)
  vDrawPlayer()
  vDrawStageFlash(nW, nH)

  nAnimFrame = window.requestAnimationFrame(vDrawFrame)
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
}

function vOnKeyDown(objEvent: KeyboardEvent): void {
  if (!bRunning) {
    return
  }

  const sKey = objEvent.key
  if (
    sKey === 'ArrowLeft' ||
    sKey === 'ArrowRight' ||
    sKey === 'ArrowUp' ||
    sKey === ' ' ||
    sKey === 'a' ||
    sKey === 'A' ||
    sKey === 'd' ||
    sKey === 'D' ||
    sKey === 'w' ||
    sKey === 'W'
  ) {
    objEvent.preventDefault()
    setKeys.add(sKey)
  }

  if (sKey === 'r' || sKey === 'R') {
    objEvent.preventDefault()
    vResetLevel()
  }
}

function vOnKeyUp(objEvent: KeyboardEvent): void {
  setKeys.delete(objEvent.key)
}

function vStart(): void {
  if (bRunning || !objCanvas) {
    return
  }

  bRunning = true
  nLastTs = 0
  setKeys.clear()
  bJumpDown = false
  vResetLevel()
  vResize()
  objRoot?.focus({ preventScroll: true })
  nAnimFrame = window.requestAnimationFrame(vDrawFrame)
}

function vStop(): void {
  bRunning = false
  setKeys.clear()
  bJumpDown = false
  if (nAnimFrame !== 0) {
    window.cancelAnimationFrame(nAnimFrame)
    nAnimFrame = 0
  }
  nLastTs = 0
}

export function sPlatformMarkup(): string {
  return `
    <div class="platform" id="platform" tabindex="0" aria-label="Endless platform game. Arrow keys or WASD to move, space to jump, jump again in air for a double jump. Reach 1111 gates to clear stages.">
      <canvas class="platform-canvas" id="platform-canvas" aria-hidden="true"></canvas>
      <p class="platform-hud" id="platform-hud">stage 1 · 0 bits</p>
      <p class="platform-caption">endless stages · collect the bits</p>
    </div>
  `
}

export function vBindPlatform(): void {
  objRoot = document.querySelector<HTMLElement>('#platform')
  objCanvas = document.querySelector<HTMLCanvasElement>('#platform-canvas')
  objHud = document.querySelector<HTMLElement>('#platform-hud')
  if (!objCanvas || !objRoot) {
    return
  }

  objCtx = objCanvas.getContext('2d')
  if (!objCtx) {
    return
  }

  window.addEventListener('resize', () => {
    if (bRunning) {
      vResize()
    }
  })

  window.addEventListener('keydown', vOnKeyDown)
  window.addEventListener('keyup', vOnKeyUp)

  objRoot.addEventListener('pointerdown', () => {
    objRoot?.focus({ preventScroll: true })
  })

  const objPanel = document.querySelector<HTMLElement>('[data-panel="platform"]')
  if (objPanel?.classList.contains('is-active')) {
    vStart()
  }
}

export function vSetPlatformActive(bActive: boolean): void {
  if (bActive) {
    vStart()
  } else {
    vStop()
  }
}
