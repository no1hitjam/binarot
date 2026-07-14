const nGravity = 2200
const nMoveAccel = 3200
const nMoveMax = 260
const nFriction = 1800
const nJumpSpeed = 620
const nDoubleJumpSpeed = 560
const nCoyoteMs = 90
const nJumpBufferMs = 100
const nPlayerW = 22
const nPlayerH = 30
const nTile = 28
const nCameraLerp = 8
const nDeathFallY = 900

type tRect = {
  nX: number
  nY: number
  nW: number
  nH: number
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

const arrSolid: tRect[] = [
  { nX: 0, nY: 420, nW: 280, nH: nTile },
  { nX: 320, nY: 380, nW: 120, nH: nTile },
  { nX: 480, nY: 340, nW: 100, nH: nTile },
  { nX: 620, nY: 300, nW: 140, nH: nTile },
  { nX: 800, nY: 360, nW: 90, nH: nTile },
  { nX: 920, nY: 300, nW: 110, nH: nTile },
  { nX: 1080, nY: 250, nW: 160, nH: nTile },
  { nX: 1280, nY: 320, nW: 100, nH: nTile },
  { nX: 1420, nY: 280, nW: 200, nH: nTile },
  { nX: 1680, nY: 340, nW: 120, nH: nTile },
  { nX: 1840, nY: 280, nW: 260, nH: nTile },
  { nX: 160, nY: 300, nW: 70, nH: nTile },
  { nX: 40, nY: 220, nW: 90, nH: nTile },
  { nX: 700, nY: 200, nW: 80, nH: nTile },
  { nX: 1500, nY: 180, nW: 90, nH: nTile },
]

const objGoal: tRect = { nX: 1980, nY: 200, nW: 48, nH: 80 }

const nSpawnX = 48
const nSpawnY = 360
const nWorldW = 2200

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
let nCoinsTotal = 0
let bWon = false
let nWinFlash = 0
let bJumpDown = false
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
    bFacingRight: true,
  }
}

function arrBuildCoins(): tCoin[] {
  const arrGlyphs = ['0', '1', '10', '11', '&', '|', '^']
  const arrSpot: Array<{ nX: number; nY: number }> = [
    { nX: 180, nY: 380 },
    { nX: 190, nY: 260 },
    { nX: 70, nY: 180 },
    { nX: 360, nY: 340 },
    { nX: 510, nY: 300 },
    { nX: 660, nY: 260 },
    { nX: 720, nY: 160 },
    { nX: 830, nY: 320 },
    { nX: 960, nY: 260 },
    { nX: 1140, nY: 210 },
    { nX: 1320, nY: 280 },
    { nX: 1520, nY: 140 },
    { nX: 1550, nY: 240 },
    { nX: 1720, nY: 300 },
    { nX: 1900, nY: 240 },
  ]

  return arrSpot.map((objSpot, nI) => ({
    nX: objSpot.nX,
    nY: objSpot.nY,
    nW: 16,
    nH: 16,
    sGlyph: arrGlyphs[nI % arrGlyphs.length]!,
    bTaken: false,
  }))
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
  arrCoins = arrBuildCoins()
  nCoinsTotal = arrCoins.length
  nCoinsTaken = 0
  bWon = false
  nWinFlash = 0
  nCamX = 0
  bJumpDown = false
  vSyncHud()
}

function vSyncHud(): void {
  if (!objHud) {
    return
  }

  if (bWon) {
    objHud.textContent = `cleared · ${nCoinsTaken}/${nCoinsTotal} bits · r to retry`
    return
  }

  objHud.textContent = `${nCoinsTaken}/${nCoinsTotal} bits · arrows/wasd · space jump×2`
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
        objPlayer.nVy = 0
        objPlayer.bOnGround = true
        objPlayer.nCoyoteLeft = nCoyoteMs
        objPlayer.bDoubleJumpReady = true
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
  if (bWon) {
    nWinFlash += nDt
    return
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

  if (bOverlap(objPlayerRect(), objGoal)) {
    bWon = true
    vSyncHud()
  }

  if (objPlayer.nY > nDeathFallY) {
    vResetLevel()
  }
}

function vUpdateCamera(nDt: number, nViewW: number): void {
  const nTarget = objPlayer.nX + nPlayerW * 0.5 - nViewW * 0.38
  const nMax = Math.max(0, nWorldW - nViewW)
  const nClamped = Math.max(0, Math.min(nMax, nTarget))
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
  for (let nI = 0; nI < 18; nI++) {
    const nSx = (nI * 137) % (nWorldW + 200)
    const nSy = 40 + ((nI * 53) % 120)
    const nR = 1 + (nI % 3)
    objCtx.fillStyle = nI % 4 === 0 ? 'rgba(224, 184, 58, 0.35)' : 'rgba(139, 77, 255, 0.28)'
    objCtx.beginPath()
    objCtx.arc(nSx, nSy, nR, 0, Math.PI * 2)
    objCtx.fill()
  }
  objCtx.restore()
}

function vDrawPlatforms(): void {
  if (!objCtx) {
    return
  }

  for (const objSolid of arrSolid) {
    const nX = objSolid.nX - nCamX
    const nY = objSolid.nY
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
  if (!objCtx) {
    return
  }

  const nX = objGoal.nX - nCamX
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

function vDrawWin(nW: number, nH: number): void {
  if (!objCtx || !bWon) {
    return
  }

  const nAlpha = Math.min(0.72, nWinFlash * 1.2)
  objCtx.fillStyle = `rgba(5, 3, 8, ${nAlpha})`
  objCtx.fillRect(0, 0, nW, nH)
  objCtx.font = '700 22px "IBM Plex Mono", Consolas, Monaco, monospace'
  objCtx.fillStyle = '#ffe08a'
  objCtx.textAlign = 'center'
  objCtx.textBaseline = 'middle'
  objCtx.fillText('REGISTER FULL', nW * 0.5, nH * 0.42)
  objCtx.font = '13px "IBM Plex Mono", Consolas, Monaco, monospace'
  objCtx.fillStyle = '#9a8fb0'
  objCtx.fillText(`${nCoinsTaken}/${nCoinsTotal} bits · press R`, nW * 0.5, nH * 0.52)
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
  vDrawPlatforms()
  vDrawCoins(nTs)
  vDrawGoal(nTs)
  vDrawPlayer()
  vDrawWin(nW, nH)

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
    <div class="platform" id="platform" tabindex="0" aria-label="Platform game. Arrow keys or WASD to move, space to jump, jump again in air for a double jump.">
      <canvas class="platform-canvas" id="platform-canvas" aria-hidden="true"></canvas>
      <p class="platform-hud" id="platform-hud">0/0 bits</p>
      <p class="platform-caption">side scroller · collect the bits</p>
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
