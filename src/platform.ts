import { sCardIconPaths } from './cardIcons'

const nGravity = 2200
const nMoveAccel = 3200
const nMoveMax = 260
const nFriction = 1800
const nJumpSpeed = 620
const nDoubleJumpSpeed = 560
const nBounceSpeed = 820
const nConveyorSpeed = 140
const nCoyoteMs = 90
const nJumpBufferMs = 100
const nPlayerW = 26
const nPlayerH = 38
const nTile = 28
const nCameraLerp = 8
const nDeathFallY = 900
const nSpawnX = 48
const nSpawnY = 360
const nGenAhead = 900
const nCullBehind = 500
const nPlatYMin = 160
const nPlatYMax = 440
const nDiffScaleX = 9000
const nHazardScaleX = 5500
const nDeckSize = 16
const nHazardSizeMin = 14
const nHazardSizeMax = 18
const nHazardDriftAmp = 36
const nHazardDriftSpeed = 0.0011
const nBitPickupPad = 14
const sBitGlyph = '1'

type tCardTint = {
  sBorder: string
  sAccent: string
  sBright: string
  sWash: string
  sInner: string
}

const arrCardTints: tCardTint[] = [
  {
    sBorder: 'rgba(224, 184, 58, 0.75)',
    sAccent: '#e0b83a',
    sBright: '#ffe08a',
    sWash: 'rgba(139, 77, 255, 0.14)',
    sInner: 'rgba(139, 77, 255, 0.4)',
  },
  {
    sBorder: 'rgba(90, 200, 120, 0.8)',
    sAccent: '#5ec878',
    sBright: '#a8f0b8',
    sWash: 'rgba(90, 200, 120, 0.16)',
    sInner: 'rgba(90, 200, 120, 0.42)',
  },
  {
    sBorder: 'rgba(176, 120, 64, 0.8)',
    sAccent: '#b07840',
    sBright: '#e0b078',
    sWash: 'rgba(176, 120, 64, 0.16)',
    sInner: 'rgba(176, 120, 64, 0.42)',
  },
  {
    sBorder: 'rgba(80, 160, 230, 0.8)',
    sAccent: '#50a0e6',
    sBright: '#a0d4ff',
    sWash: 'rgba(80, 160, 230, 0.16)',
    sInner: 'rgba(80, 160, 230, 0.42)',
  },
  {
    sBorder: 'rgba(220, 90, 90, 0.8)',
    sAccent: '#dc5a5a',
    sBright: '#ffb0b0',
    sWash: 'rgba(220, 90, 90, 0.16)',
    sInner: 'rgba(220, 90, 90, 0.42)',
  },
  {
    sBorder: 'rgba(70, 190, 190, 0.8)',
    sAccent: '#46bebe',
    sBright: '#9aeeee',
    sWash: 'rgba(70, 190, 190, 0.16)',
    sInner: 'rgba(70, 190, 190, 0.42)',
  },
  {
    sBorder: 'rgba(200, 200, 210, 0.8)',
    sAccent: '#c8c8d2',
    sBright: '#f0f0f6',
    sWash: 'rgba(200, 200, 210, 0.16)',
    sInner: 'rgba(200, 200, 210, 0.42)',
  },
]

type tRect = {
  nX: number
  nY: number
  nW: number
  nH: number
}

type tSolid = tRect & {
  bBounce: boolean
  bConveyor: boolean
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
let nBestCoins = 0
let bJumpDown = false
let nGenCursor = 0
let nLastPlatRight = 0
let nLastPlatY = 420
let arrSolid: tSolid[] = []
let arrHazard: tRect[] = []
let arrCoins: tCoin[] = []
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
  }
}

function nRand(): number {
  return Math.random()
}

function nRandRange(nMin: number, nMax: number): number {
  return nMin + (nMax - nMin) * nRand()
}

function nClamp(nV: number, nMin: number, nMax: number): number {
  return Math.max(nMin, Math.min(nMax, nV))
}

function nDifficulty(): number {
  return Math.min(1, nGenCursor / nDiffScaleX)
}

function nHazardPressure(): number {
  return Math.min(2.2, nGenCursor / nHazardScaleX)
}

function vPushCoin(nX: number, nY: number): void {
  arrCoins.push({
    nX,
    nY,
    nW: 16,
    nH: 16,
    sGlyph: sBitGlyph,
    bTaken: false,
  })
}

function nHazardSize(): number {
  return nRandRange(nHazardSizeMin, nHazardSizeMax)
}

function vPushHazard(nX: number, nY: number, nSize: number): void {
  arrHazard.push({ nX, nY, nW: nSize, nH: nSize })
}

function nHazardDrawY(objHazard: tRect, nTs: number): number {
  return objHazard.nY + Math.sin(nTs * nHazardDriftSpeed + objHazard.nX * 0.035) * nHazardDriftAmp
}

function objHazardAt(objHazard: tRect, nTs: number): tRect {
  return {
    nX: objHazard.nX,
    nY: nHazardDrawY(objHazard, nTs),
    nW: objHazard.nW,
    nH: objHazard.nH,
  }
}

function vPushSolid(
  nX: number,
  nY: number,
  nW: number,
  bBounce: boolean,
  bConveyor: boolean,
  bAdvance: boolean,
): void {
  arrSolid.push({
    nX,
    nY,
    nW,
    nH: nTile,
    bBounce,
    bConveyor: bConveyor && !bBounce,
  })
  if (bAdvance) {
    nLastPlatRight = nX + nW
    nLastPlatY = nY
    nGenCursor = Math.max(nGenCursor, nLastPlatRight)
  }
}

function vPushPlatform(
  nX: number,
  nY: number,
  nW: number,
  bWithCoin: boolean,
  bBounce: boolean,
  bConveyor: boolean,
): void {
  vPushSolid(nX, nY, nW, bBounce, bConveyor, true)
  if (bWithCoin) {
    vPushCoin(nX + nW * 0.5 - 8, nY - 36)
  }
}

function vMaybeHazardOn(nX: number, nY: number, nW: number): void {
  if (nW < 54) {
    return
  }

  const nP = nHazardPressure()
  const nChance = Math.min(0.92, 0.04 + nP * 0.28 + nP * nP * 0.12)
  if (nRand() >= nChance) {
    return
  }

  let nCount = 1
  if (nP > 0.55 && nW > 100 && nRand() < 0.2 + nP * 0.35) {
    nCount = 2
  }
  if (nP > 1.15 && nW > 140 && nRand() < 0.15 + nP * 0.25) {
    nCount = 3
  }

  const nMargin = 8
  const nSlot = Math.max(nHazardSizeMax + 4, (nW - nMargin * 2) / nCount)
  for (let nI = 0; nI < nCount; nI++) {
    const nSize = nHazardSize()
    const nSlotX = nX + nMargin + nI * nSlot
    const nHx = nSlotX + nRandRange(0, Math.max(1, nSlot - nSize))
    vPushHazard(nHx, nY - nSize - nHazardDriftAmp, nSize)
  }
}

function vMaybeAirHazard(nLeft: number, nRight: number, nY: number): void {
  const nP = nHazardPressure()
  const nSpan = nRight - nLeft
  if (nSpan < 50) {
    return
  }

  const nChance = Math.min(0.85, 0.03 + nP * 0.3 + nP * nP * 0.1)
  if (nRand() >= nChance) {
    return
  }

  const nSize = nHazardSize()
  vPushHazard(nLeft + nRandRange(0, Math.max(1, nSpan - nSize)), nY - nRandRange(8, 75), nSize)

  if (nP > 0.9 && nSpan > 90 && nRand() < 0.15 + nP * 0.28) {
    const nSize2 = nHazardSize()
    vPushHazard(
      nLeft + nRandRange(0, Math.max(1, nSpan - nSize2)),
      nY - nRandRange(40, 110),
      nSize2,
    )
  }
}

function vMaybeSidePad(nX: number, nY: number, nW: number): void {
  if (nRand() > 0.55) {
    return
  }
  const nSideY = nClamp(nY - nRandRange(60, 120), nPlatYMin, nPlatYMax - 40)
  const nSideW = nRandRange(44, 80)
  const nSideX = nX + nRandRange(-20, Math.max(0, nW - nSideW + 20))
  const nSideKind = nRand()
  const bSideBounce = nSideKind > 0.8
  const bSideConveyor = !bSideBounce && nSideKind > 0.58
  vPushSolid(nSideX, nSideY, nSideW, bSideBounce, bSideConveyor, false)
  if (!bSideBounce && !bSideConveyor && nRand() > 0.3) {
    vPushCoin(nSideX + nSideW * 0.5 - 8, nSideY - 36)
  }
}

function vGenChunk(): void {
  const nDiff = nDifficulty()
  const nGapMin = 60 + nDiff * 45
  const nGapMax = 105 + nDiff * 75
  const nWMin = Math.max(48, 110 - nDiff * 40)
  const nWMax = Math.max(nWMin + 24, 200 - nDiff * 25)
  const nDyMax = 40 + nDiff * 55
  const nPattern = nRand()

  if (nPattern < 0.16) {
    const nSteps = 2 + Math.floor(nRand() * 2)
    const nStepDir = nRand() > 0.5 ? 1 : -1
    let nY = nLastPlatY
    const nStartRight = nLastPlatRight
    for (let nI = 0; nI < nSteps; nI++) {
      const nGap = nRandRange(nGapMin * 0.55, nGapMax * 0.7)
      const nW = nRandRange(52, 90)
      nY = nClamp(nY + nStepDir * nRandRange(28, 52), nPlatYMin, nPlatYMax)
      const nX = nLastPlatRight + nGap
      vPushPlatform(nX, nY, nW, nRand() > 0.4, false, false)
      vMaybeHazardOn(nX, nY, nW)
    }
    vMaybeAirHazard(nStartRight, nLastPlatRight, nLastPlatY)
    vMaybeSidePad(nLastPlatRight - 60, nLastPlatY, 80)
    return
  }

  if (nPattern < 0.3) {
    const nGap = nRandRange(nGapMin, nGapMax)
    const nY = nClamp(nLastPlatY + nRandRange(-nDyMax, nDyMax), nPlatYMin, nPlatYMax)
    const nW1 = nRandRange(48, 72)
    const nW2 = nRandRange(48, 72)
    const nMid = nRandRange(55, 95 + nDiff * 30)
    const nX1 = nLastPlatRight + nGap
    vPushPlatform(nX1, nY, nW1, nRand() > 0.45, nRand() > 0.85, false)
    vMaybeHazardOn(nX1, nY, nW1)
    const nY2 = nClamp(nY + nRandRange(-36, 36), nPlatYMin, nPlatYMax)
    const nX2 = nX1 + nW1 + nMid
    vPushPlatform(nX2, nY2, nW2, nRand() > 0.4, false, nRand() > 0.8)
    vMaybeHazardOn(nX2, nY2, nW2)
    vMaybeAirHazard(nX1 + nW1, nX2, Math.min(nY, nY2))
    return
  }

  if (nPattern < 0.42) {
    const nGap = nRandRange(nGapMin * 0.8, nGapMax)
    const nY = nClamp(nLastPlatY + nRandRange(-nDyMax * 0.6, nDyMax * 0.6), nPlatYMin, nPlatYMax)
    const nW = nRandRange(160, 240)
    const nX = nLastPlatRight + nGap
    const bConveyor = nRand() > 0.65
    vPushPlatform(nX, nY, nW, !bConveyor && nRand() > 0.35, false, bConveyor)
    if (!bConveyor) {
      vMaybeHazardOn(nX, nY, nW)
    }
    if (nRand() > 0.45) {
      const nHighY = nClamp(nY - nRandRange(75, 115), nPlatYMin, nPlatYMax - 40)
      const nHighW = nRandRange(50, 85)
      const nHighX = nX + nRandRange(20, nW - nHighW - 20)
      vPushSolid(nHighX, nHighY, nHighW, nRand() > 0.7, false, false)
      vPushCoin(nX + nW * 0.5 - 8, nHighY - 36)
      vMaybeHazardOn(nHighX, nHighY, nHighW)
    }
    return
  }

  if (nPattern < 0.54) {
    const nHops = 3 + Math.floor(nRand() * 2)
    let nY = nLastPlatY
    const nStartRight = nLastPlatRight
    for (let nI = 0; nI < nHops; nI++) {
      const nGap = nRandRange(50 + nDiff * 20, 85 + nDiff * 45)
      const nW = nRandRange(40, 58)
      nY = nClamp(nY + nRandRange(-nDyMax, nDyMax), nPlatYMin, nPlatYMax)
      const nX = nLastPlatRight + nGap
      const bBounce = nI === nHops - 1 && nRand() > 0.55
      vPushPlatform(nX, nY, nW, !bBounce && nRand() > 0.5, bBounce, false)
      if (!bBounce) {
        vMaybeHazardOn(nX, nY, nW)
      }
    }
    vMaybeAirHazard(nStartRight, nLastPlatRight, nLastPlatY)
    return
  }

  if (nPattern < 0.66) {
    const nGap = nRandRange(nGapMin, nGapMax)
    const nHighY = nClamp(nLastPlatY - nRandRange(50, 100), nPlatYMin, nPlatYMax)
    const nLowY = nClamp(nHighY + nRandRange(70, 120), nPlatYMin, nPlatYMax)
    const nWHigh = nRandRange(70, 110)
    const nX = nLastPlatRight + nGap
    vPushPlatform(nX, nHighY, nWHigh, nRand() > 0.4, nRand() > 0.75, false)
    vMaybeHazardOn(nX, nHighY, nWHigh)
    const nDropGap = nRandRange(40, 80)
    const nLowW = nRandRange(90, 150)
    const nLowX = nX + nWHigh + nDropGap
    vPushPlatform(nLowX, nLowY, nLowW, nRand() > 0.35, false, nRand() > 0.7)
    vMaybeHazardOn(nLowX, nLowY, nLowW)
    vMaybeAirHazard(nX + nWHigh, nLowX, nHighY)
    if (nRand() > 0.5) {
      vPushCoin(nX + nWHigh + nDropGap * 0.5 - 8, nHighY - 20)
    }
    return
  }

  if (nPattern < 0.78) {
    const nGap = nRandRange(nGapMin, nGapMax)
    const nY = nClamp(nLastPlatY + nRandRange(-nDyMax, nDyMax), nPlatYMin, nPlatYMax)
    const nW = nRandRange(nWMin, nWMax)
    const nX = nLastPlatRight + nGap
    vPushPlatform(nX, nY, nW, nRand() > 0.35, false, false)
    const nPads = 2 + Math.floor(nRand() * 2)
    for (let nI = 0; nI < nPads; nI++) {
      const nPadW = nRandRange(40, 68)
      const nPadX = nX + nRandRange(-30, nW)
      const nPadY = nClamp(nY - nRandRange(55, 130) - nI * 18, nPlatYMin, nPlatYMax - 30)
      const bBounce = nRand() > 0.72
      vPushSolid(nPadX, nPadY, nPadW, bBounce, false, false)
      if (!bBounce && nRand() > 0.25) {
        vPushCoin(nPadX + nPadW * 0.5 - 8, nPadY - 36)
      }
      if (!bBounce) {
        vMaybeHazardOn(nPadX, nPadY, nPadW)
      }
    }
    vMaybeHazardOn(nX, nY, nW)
    return
  }

  const nGap = nRandRange(nGapMin, nGapMax)
  const nW = nRandRange(nWMin, nWMax)
  const nDy = nRandRange(-nDyMax, nDyMax)
  const nY = nClamp(nLastPlatY + nDy, nPlatYMin, nPlatYMax)
  const nX = nLastPlatRight + nGap
  const nKind = nRand()
  const bBounce = nKind > 0.82
  const bConveyor = !bBounce && nKind > 0.64
  vPushPlatform(nX, nY, nW, !bBounce && !bConveyor && nRand() > 0.28, bBounce, bConveyor)
  if (!bBounce && !bConveyor) {
    vMaybeHazardOn(nX, nY, nW)
  }
  vMaybeAirHazard(nX - nGap, nX, nY)
  vMaybeSidePad(nX, nY, nW)

  if (nRand() > 0.7) {
    const nExtraW = nRandRange(44, 70)
    const nExtraY = nClamp(nY + nRandRange(55, 95), nPlatYMin, nPlatYMax)
    const nExtraX = nX + nRandRange(0, Math.max(0, nW - nExtraW))
    vPushSolid(nExtraX, nExtraY, nExtraW, false, false, false)
    vMaybeHazardOn(nExtraX, nExtraY, nExtraW)
  }
}

function vEnsureWorld(nNeedX: number): void {
  while (nGenCursor < nNeedX) {
    vGenChunk()
  }
}

function vCullBehind(nCutX: number): void {
  arrSolid = arrSolid.filter((objSolid) => objSolid.nX + objSolid.nW > nCutX)
  arrHazard = arrHazard.filter((objHazard) => objHazard.nX + objHazard.nW > nCutX)
  arrCoins = arrCoins.filter((objCoin) => !objCoin.bTaken && objCoin.nX + objCoin.nW > nCutX)
}

function vBootstrapWorld(): void {
  arrSolid = []
  arrHazard = []
  arrCoins = []
  nGenCursor = 0
  nLastPlatRight = 0
  nLastPlatY = 420
  vPushPlatform(0, 420, 280, false, false, false)
  arrSolid.push({ nX: 160, nY: 300, nW: 70, nH: nTile, bBounce: false, bConveyor: false })
  arrSolid.push({ nX: 40, nY: 220, nW: 90, nH: nTile, bBounce: false, bConveyor: false })
  vPushCoin(185, 264)
  vPushCoin(73, 184)
  if (nRand() > 0.35) {
    vPushPlatform(
      nLastPlatRight + nRandRange(40, 100),
      nRandRange(340, 400),
      nRandRange(64, 88),
      false,
      true,
      false,
    )
  }
  if (nRand() > 0.35) {
    vPushPlatform(
      nLastPlatRight + nRandRange(40, 100),
      nRandRange(360, 420),
      nRandRange(110, 160),
      false,
      false,
      true,
    )
  }
  {
    const nSafeX = nLastPlatRight + nRandRange(50, 90)
    const nSafeY = nClamp(nLastPlatY + nRandRange(-30, 30), nPlatYMin, nPlatYMax)
    const nSafeW = nRandRange(120, 170)
    vPushPlatform(nSafeX, nSafeY, nSafeW, false, false, false)
    const nSize = 16
    vPushHazard(nSafeX + nSafeW * 0.5 - nSize * 0.5, nSafeY - nSize - nHazardDriftAmp, nSize)
  }
  vEnsureWorld(nGenAhead + 600)
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

function objPlayerPickupRect(): tRect {
  return {
    nX: objPlayer.nX - nBitPickupPad,
    nY: objPlayer.nY - nBitPickupPad,
    nW: nPlayerW + nBitPickupPad * 2,
    nH: nPlayerH + nBitPickupPad * 2,
  }
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

function vBindPadButton(objBtn: HTMLElement, sKey: string): void {
  const vPress = (objEvent: PointerEvent): void => {
    if (!bRunning) {
      return
    }

    objEvent.preventDefault()
    objEvent.stopPropagation()
    objBtn.setPointerCapture(objEvent.pointerId)
    setKeys.add(sKey)
    objBtn.classList.add('is-pressed')
  }

  const vRelease = (objEvent: PointerEvent): void => {
    objEvent.preventDefault()
    setKeys.delete(sKey)
    objBtn.classList.remove('is-pressed')
    if (objBtn.hasPointerCapture(objEvent.pointerId)) {
      objBtn.releasePointerCapture(objEvent.pointerId)
    }
  }

  objBtn.addEventListener('pointerdown', vPress)
  objBtn.addEventListener('pointerup', vRelease)
  objBtn.addEventListener('pointercancel', vRelease)
  objBtn.addEventListener('lostpointercapture', () => {
    setKeys.delete(sKey)
    objBtn.classList.remove('is-pressed')
  })
  objBtn.addEventListener('contextmenu', (objEvent) => {
    objEvent.preventDefault()
  })
}

function vResetLevel(): void {
  if (nCoinsTaken > nBestCoins) {
    nBestCoins = nCoinsTaken
  }
  objPlayer = objNewPlayer()
  nCoinsTaken = 0
  nCamX = 0
  bJumpDown = false
  vBootstrapWorld()
  vSyncHud()
}

function vSyncHud(): void {
  if (!objHud) {
    return
  }

  objHud.textContent = `${nCoinsTaken} bits · best ${nBestCoins} · Arrow keys move · space jump×2`
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

function vResolveSolid(nPrevY: number, nDt: number): void {
  objPlayer.bOnGround = false
  let bOnConveyor = false
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
          if (objSolid.bConveyor) {
            bOnConveyor = true
          }
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

  if (bOnConveyor && objPlayer.bOnGround) {
    objPlayer.nX += nConveyorSpeed * nDt
  }
}

function vUpdatePhysics(nDt: number, nTs: number): void {
  const nDir = nMoveInput()
  if (nDir !== 0) {
    objPlayer.nVx += nDir * nMoveAccel * nDt
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
  vResolveSolid(nPrevY, nDt)

  if (objPlayer.nX < 0) {
    objPlayer.nX = 0
    objPlayer.nVx = 0
  }

  vEnsureWorld(objPlayer.nX + nGenAhead)
  vCullBehind(nCamX - nCullBehind)

  const objPickup = objPlayerPickupRect()
  for (const objCoin of arrCoins) {
    if (objCoin.bTaken) {
      continue
    }
    if (bOverlap(objPickup, objCoin)) {
      objCoin.bTaken = true
      nCoinsTaken += 1
      vSyncHud()
    }
  }

  const objBody = objPlayerRect()
  for (const objHazard of arrHazard) {
    if (bOverlap(objBody, objHazardAt(objHazard, nTs))) {
      vResetLevel()
      return
    }
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

    if (objSolid.bConveyor) {
      const nScroll = ((nTs * 0.08) % 16)
      objCtx.fillStyle = '#0a1a2e'
      objCtx.fillRect(nX, nY, objSolid.nW, objSolid.nH)
      objCtx.fillStyle = 'rgba(70, 160, 255, 0.55)'
      objCtx.fillRect(nX + 1, nY + 1, objSolid.nW - 2, objSolid.nH - 2)
      objCtx.fillStyle = '#6ec0ff'
      objCtx.fillRect(nX, nY, objSolid.nW, 4)
      objCtx.strokeStyle = 'rgba(150, 210, 255, 0.85)'
      objCtx.lineWidth = 1.5
      objCtx.strokeRect(nX + 0.5, nY + 0.5, objSolid.nW - 1, objSolid.nH - 1)
      objCtx.fillStyle = 'rgba(20, 50, 90, 0.45)'
      for (let nPx = -16 + nScroll; nPx < objSolid.nW; nPx += 16) {
        objCtx.beginPath()
        objCtx.moveTo(nX + nPx, nY + 18)
        objCtx.lineTo(nX + nPx + 6, nY + 11)
        objCtx.lineTo(nX + nPx + 12, nY + 18)
        objCtx.closePath()
        objCtx.fill()
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

function vDrawHazards(nTs: number): void {
  if (!objCtx) {
    return
  }

  for (const objHazard of arrHazard) {
    const nX = objHazard.nX - nCamX
    if (nX + objHazard.nW < -40 || nX > 2000) {
      continue
    }
    const nY = nHazardDrawY(objHazard, nTs)
    const nPulse = 0.55 + 0.45 * Math.sin(nTs * 0.01 + objHazard.nX * 0.04)
    const nInset = Math.max(3, objHazard.nW * 0.28)

    objCtx.fillStyle = '#3a0a0c'
    objCtx.fillRect(nX, nY, objHazard.nW, objHazard.nH)
    objCtx.fillStyle = `rgba(255, 64, 72, ${0.55 + 0.35 * nPulse})`
    objCtx.fillRect(nX + 1, nY + 1, objHazard.nW - 2, objHazard.nH - 2)
    objCtx.fillStyle = '#ff6b73'
    objCtx.fillRect(nX, nY, objHazard.nW, 3)
    objCtx.strokeStyle = `rgba(255, 160, 160, ${0.55 + 0.4 * nPulse})`
    objCtx.lineWidth = 1.5
    objCtx.strokeRect(nX + 0.5, nY + 0.5, objHazard.nW - 1, objHazard.nH - 1)
    objCtx.strokeStyle = 'rgba(60, 8, 12, 0.55)'
    objCtx.lineWidth = 2
    objCtx.beginPath()
    objCtx.moveTo(nX + nInset, nY + nInset)
    objCtx.lineTo(nX + objHazard.nW - nInset, nY + objHazard.nH - nInset)
    objCtx.moveTo(nX + objHazard.nW - nInset, nY + nInset)
    objCtx.lineTo(nX + nInset, nY + objHazard.nH - nInset)
    objCtx.stroke()
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

function sHeroSlug(): string {
  return (nCoinsTaken % nDeckSize).toString(2)
}

function objHeroTint(): tCardTint {
  const nCycle = Math.floor(nCoinsTaken / nDeckSize)
  return arrCardTints[nCycle % arrCardTints.length]!
}

function vDrawCardIcon(
  objCtxLocal: CanvasRenderingContext2D,
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
  objCtxLocal.save()
  objCtxLocal.translate(nOx, nOy)
  objCtxLocal.scale(nScale, nScale)
  objCtxLocal.strokeStyle = sStroke
  objCtxLocal.lineWidth = 2.4
  objCtxLocal.lineCap = 'round'
  objCtxLocal.lineJoin = 'round'

  for (const objMatch of sPaths.matchAll(/<path d="([^"]+)"/g)) {
    objCtxLocal.stroke(new Path2D(objMatch[1]!))
  }

  for (const objMatch of sPaths.matchAll(/<circle cx="([^"]+)" cy="([^"]+)" r="([^"]+)"/g)) {
    objCtxLocal.beginPath()
    objCtxLocal.arc(Number(objMatch[1]), Number(objMatch[2]), Number(objMatch[3]), 0, Math.PI * 2)
    objCtxLocal.stroke()
  }

  for (const objMatch of sPaths.matchAll(
    /<rect x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)"/g,
  )) {
    objCtxLocal.strokeRect(
      Number(objMatch[1]),
      Number(objMatch[2]),
      Number(objMatch[3]),
      Number(objMatch[4]),
    )
  }

  objCtxLocal.restore()
}

function vDrawPlayer(): void {
  if (!objCtx) {
    return
  }

  const nX = objPlayer.nX - nCamX
  const nY = objPlayer.nY
  const sSlug = sHeroSlug()
  const objTint = objHeroTint()

  objCtx.fillStyle = '#120a1c'
  objCtx.fillRect(nX, nY, nPlayerW, nPlayerH)
  objCtx.fillStyle = objTint.sWash
  objCtx.fillRect(nX + 1, nY + 1, nPlayerW - 2, nPlayerH - 2)
  objCtx.strokeStyle = objTint.sBorder
  objCtx.lineWidth = 1.5
  objCtx.strokeRect(nX + 0.5, nY + 0.5, nPlayerW - 1, nPlayerH - 1)
  objCtx.strokeStyle = objTint.sInner
  objCtx.lineWidth = 1
  objCtx.strokeRect(nX + 3.5, nY + 3.5, nPlayerW - 7, nPlayerH - 7)

  const nIconSize = Math.min(nPlayerW - 8, nPlayerH - 14)
  const nIconX = nX + (nPlayerW - nIconSize) * 0.5
  const nIconY = nY + 5
  vDrawCardIcon(objCtx, sSlug, nIconX, nIconY, nIconSize, objTint.sBright)

  objCtx.fillStyle = objTint.sAccent
  objCtx.font = '8px "IBM Plex Mono", Consolas, Monaco, monospace'
  objCtx.textAlign = 'center'
  objCtx.textBaseline = 'middle'
  objCtx.fillText(sSlug, nX + nPlayerW * 0.5, nY + nPlayerH - 7)
}

function vDrawFrame(nTs: number): void {
  if (!objCanvas || !objCtx || !bRunning) {
    return
  }

  const nDt = nLastTs === 0 ? 0 : Math.min(0.05, (nTs - nLastTs) / 1000)
  nLastTs = nTs

  const nW = objCanvas.clientWidth
  const nH = objCanvas.clientHeight

  vUpdatePhysics(nDt, nTs)
  vUpdateCamera(nDt, nW)

  vDrawBg(nW, nH)
  vDrawPlatforms(nTs)
  vDrawHazards(nTs)
  vDrawCoins(nTs)
  vDrawPlayer()

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
  objRoot?.querySelectorAll('.platform-pad-btn.is-pressed').forEach((objEl) => {
    objEl.classList.remove('is-pressed')
  })
  if (nAnimFrame !== 0) {
    window.cancelAnimationFrame(nAnimFrame)
    nAnimFrame = 0
  }
  nLastTs = 0
}

export function sPlatformMarkup(): string {
  return `
    <div class="platform" id="platform" tabindex="0" aria-label="Endless platform game. Arrow keys or WASD to move, space to jump, jump again in air for a double jump. On touch devices use the on-screen controls. Collect bits.">
      <canvas class="platform-canvas" id="platform-canvas" aria-hidden="true"></canvas>
      <p class="platform-hud" id="platform-hud">0 bits</p>
      <p class="platform-caption">endless run · collect the bits</p>
      <div class="platform-pad" aria-hidden="false">
        <div class="platform-pad-move">
          <button type="button" class="platform-pad-btn" data-pad="left" aria-label="Move left">◀</button>
          <button type="button" class="platform-pad-btn" data-pad="right" aria-label="Move right">▶</button>
        </div>
        <button type="button" class="platform-pad-btn platform-pad-jump" data-pad="jump" aria-label="Jump">JUMP</button>
      </div>
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

  const objPadLeft = objRoot.querySelector<HTMLElement>('[data-pad="left"]')
  const objPadRight = objRoot.querySelector<HTMLElement>('[data-pad="right"]')
  const objPadJump = objRoot.querySelector<HTMLElement>('[data-pad="jump"]')
  if (objPadLeft) {
    vBindPadButton(objPadLeft, 'ArrowLeft')
  }
  if (objPadRight) {
    vBindPadButton(objPadRight, 'ArrowRight')
  }
  if (objPadJump) {
    vBindPadButton(objPadJump, ' ')
  }

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
