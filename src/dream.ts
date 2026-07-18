import { sCardIconPaths } from './cardIcons'

type tDreamCard = {
  sName: string
  sBinaryValue: string
}

type tIconPrim =
  | { sKind: 'path'; objPath: Path2D }
  | { sKind: 'circle'; nCx: number; nCy: number; nR: number; bDash: boolean }
  | { sKind: 'rect'; nX: number; nY: number; nW: number; nH: number }

type tDreamState = 'drift' | 'orbit' | 'mirror' | 'storm' | 'lattice' | 'eclipse'

type tSpirit = {
  sBinaryValue: string
  sName: string
  nX: number
  nY: number
  nVx: number
  nVy: number
  nAngle: number
  nSpin: number
  nScale: number
  nPhase: number
}

type tStar = {
  nX: number
  nY: number
  nDepth: number
  nPhase: number
  nSpeed: number
  bGold: boolean
  bDark: boolean
  bOne: boolean
}

type tRipple = {
  nX: number
  nY: number
  nAge: number
  nLife: number
  nHue: number
}

type tVisual = {
  nPull: number
  nTurn: number
  nNoise: number
  nTrail: number
  nScale: number
  nHue: number
  nSymmetry: number
}

const nIconView = 64
const nSpiritCount = 16
const nStarCount = 180
const nDarkStarChance = 0.62
const nStarOpacity = 0.5
const nDarkStarOpacity = 0.32
const nMinStateSec = 8
const nMaxStateSec = 17
const nMinReadingSec = 9
const nMaxReadingSec = 16
const nEquationSec = 6
const nMorphRate = 0.38
const nMaxDpr = 2
const nTwoPi = Math.PI * 2
const nMinSpiritGap = 0.13
const nSpiritRepulsion = 1.1

const arrStates: tDreamState[] = ['drift', 'orbit', 'mirror', 'storm', 'lattice', 'eclipse']

const mapStateLabel: Record<tDreamState, string> = {
  drift: 'slow signal',
  orbit: 'recursive orbit',
  mirror: 'mirror sleep',
  storm: 'bit storm',
  lattice: 'memory lattice',
  eclipse: 'zero eclipse',
}

const mapStateVisual: Record<tDreamState, tVisual> = {
  drift: {
    nPull: 0.025,
    nTurn: 0.08,
    nNoise: 0.16,
    nTrail: 0.11,
    nScale: 1,
    nHue: 268,
    nSymmetry: 1,
  },
  orbit: {
    nPull: 0.12,
    nTurn: 0.8,
    nNoise: 0.08,
    nTrail: 0.07,
    nScale: 0.9,
    nHue: 282,
    nSymmetry: 2,
  },
  mirror: {
    nPull: 0.055,
    nTurn: -0.22,
    nNoise: 0.12,
    nTrail: 0.055,
    nScale: 0.78,
    nHue: 235,
    nSymmetry: 4,
  },
  storm: {
    nPull: 0.04,
    nTurn: 1.45,
    nNoise: 0.72,
    nTrail: 0.035,
    nScale: 0.68,
    nHue: 318,
    nSymmetry: 6,
  },
  lattice: {
    nPull: 0.34,
    nTurn: 0.02,
    nNoise: 0.025,
    nTrail: 0.18,
    nScale: 0.82,
    nHue: 258,
    nSymmetry: 1,
  },
  eclipse: {
    nPull: 0.18,
    nTurn: -0.7,
    nNoise: 0.06,
    nTrail: 0.045,
    nScale: 1.12,
    nHue: 42,
    nSymmetry: 3,
  },
}

const arrStateWhispers = [
  'the deck dreams in parallel',
  'a result becomes the next cause',
  'zeros gather around a hidden one',
  'the same sign returns with another face',
  'sleep forgets which direction time moves',
  'two symbols meet without being introduced',
  'the bitfield watches itself change',
  'nothing repeats exactly',
]

let arrCards: tDreamCard[] = []
let arrSpirits: tSpirit[] = []
let arrStars: tStar[] = []
let arrRipples: tRipple[] = []
let mapIcons: Record<string, tIconPrim[]> = {}

let objRoot: HTMLElement | null = null
let objCanvas: HTMLCanvasElement | null = null
let objCtx: CanvasRenderingContext2D | null = null
let objState: HTMLElement | null = null
let objEquation: HTMLElement | null = null
let objWhisper: HTMLElement | null = null

let sState: tDreamState = 'drift'
let objVisual: tVisual = { ...mapStateVisual.drift }
let objTargetVisual: tVisual = { ...mapStateVisual.drift }
let nW = 0
let nH = 0
let nDpr = 1
let nAnimFrame = 0
let nLastTs = 0
let nNextStateAt = 0
let nNextReadingAt = 0
let nEquationUntil = 0
let nFeaturedA = -1
let nFeaturedB = -1
let nFeaturedResult = -1
let nDreamTime = 0
let nDreamSeed = Math.random() * 1000
let bRunning = false
let bBound = false
let bFreshFrame = true

function nRand(nMin: number, nMax: number): number {
  return nMin + Math.random() * (nMax - nMin)
}

function nClamp(nValue: number, nMin: number, nMax: number): number {
  return Math.min(nMax, Math.max(nMin, nValue))
}

function nAttr(sAttrs: string, sName: string, nFallback: number): number {
  const objMatch = new RegExp(`${sName}="([^"]+)"`).exec(sAttrs)
  return objMatch ? Number(objMatch[1]) : nFallback
}

function arrParseIcon(sMarkup: string): tIconPrim[] {
  const arrOut: tIconPrim[] = []
  const objPathRe = /<path\b[^>]*\bd="([^"]+)"[^/]*\/?>/g
  const objCircleRe = /<circle\b([^>]*)\/?>/g
  const objRectRe = /<rect\b([^>]*)\/?>/g
  let objMatch: RegExpExecArray | null

  while ((objMatch = objPathRe.exec(sMarkup)) !== null) {
    arrOut.push({ sKind: 'path', objPath: new Path2D(objMatch[1]!) })
  }
  while ((objMatch = objCircleRe.exec(sMarkup)) !== null) {
    const sAttrs = objMatch[1]!
    arrOut.push({
      sKind: 'circle',
      nCx: nAttr(sAttrs, 'cx', 0),
      nCy: nAttr(sAttrs, 'cy', 0),
      nR: nAttr(sAttrs, 'r', 0),
      bDash: /stroke-dasharray/.test(sAttrs),
    })
  }
  while ((objMatch = objRectRe.exec(sMarkup)) !== null) {
    const sAttrs = objMatch[1]!
    arrOut.push({
      sKind: 'rect',
      nX: nAttr(sAttrs, 'x', 0),
      nY: nAttr(sAttrs, 'y', 0),
      nW: nAttr(sAttrs, 'width', 0),
      nH: nAttr(sAttrs, 'height', 0),
    })
  }
  return arrOut
}

function vBuildIcons(): void {
  mapIcons = {}
  for (const objCard of arrCards) {
    mapIcons[objCard.sBinaryValue] = arrParseIcon(sCardIconPaths(objCard.sBinaryValue))
  }
}

function vResize(): void {
  if (!objCanvas || !objCtx) {
    return
  }

  const nNextW = Math.max(1, objCanvas.clientWidth)
  const nNextH = Math.max(1, objCanvas.clientHeight)
  const nNextDpr = Math.min(window.devicePixelRatio || 1, nMaxDpr)
  const nBufW = Math.max(1, Math.floor(nNextW * nNextDpr))
  const nBufH = Math.max(1, Math.floor(nNextH * nNextDpr))

  if (nNextW === nW && nNextH === nH && nNextDpr === nDpr && objCanvas.width === nBufW && objCanvas.height === nBufH) {
    return
  }

  nDpr = nNextDpr
  nW = nNextW
  nH = nNextH
  objCanvas.width = nBufW
  objCanvas.height = nBufH
  objCtx.setTransform(nDpr, 0, 0, nDpr, 0, 0)
  bFreshFrame = true
}

function objNewSpirit(objCard: tDreamCard, nIndex: number): tSpirit {
  const nAngle = (nIndex / nSpiritCount) * nTwoPi + nRand(-0.2, 0.2)
  const nRadius = nRand(0.15, 0.4)
  return {
    sBinaryValue: objCard.sBinaryValue,
    sName: objCard.sName,
    nX: 0.5 + Math.cos(nAngle) * nRadius,
    nY: 0.5 + Math.sin(nAngle) * nRadius,
    nVx: nRand(-0.025, 0.025),
    nVy: nRand(-0.025, 0.025),
    nAngle: nRand(-Math.PI, Math.PI),
    nSpin: nRand(-0.3, 0.3),
    nScale: nRand(0.68, 1.12),
    nPhase: nRand(0, nTwoPi),
  }
}

function vSeedDream(): void {
  arrSpirits = arrCards.slice(0, nSpiritCount).map(objNewSpirit)
  arrStars = []
  for (let nI = 0; nI < nStarCount; nI++) {
    arrStars.push({
      nX: Math.random(),
      nY: Math.random(),
      nDepth: nRand(0.15, 1),
      nPhase: nRand(0, nTwoPi),
      nSpeed: nRand(0.2, 1.1),
      bGold: Math.random() < 0.22,
      bDark: Math.random() < nDarkStarChance,
      bOne: Math.random() < 0.5,
    })
  }
  arrRipples = []
  nFeaturedA = -1
  nFeaturedB = -1
  nFeaturedResult = -1
  nDreamSeed = Math.random() * 1000
  bFreshFrame = true
}

function sPickWhisper(): string {
  return arrStateWhispers[Math.floor(Math.random() * arrStateWhispers.length)]!
}

function vSetState(sNext: tDreamState): void {
  sState = sNext
  const objBase = mapStateVisual[sState]
  objTargetVisual = {
    nPull: objBase.nPull * nRand(0.75, 1.35),
    nTurn: objBase.nTurn * nRand(0.75, 1.3),
    nNoise: objBase.nNoise * nRand(0.7, 1.4),
    nTrail: objBase.nTrail * nRand(0.75, 1.3),
    nScale: objBase.nScale * nRand(0.85, 1.2),
    nHue: (objBase.nHue + nRand(-24, 24) + 360) % 360,
    nSymmetry: objBase.nSymmetry,
  }
  nNextStateAt = nDreamTime + nRand(nMinStateSec, nMaxStateSec)

  if (objState) {
    objState.textContent = mapStateLabel[sState]
  }
  if (objWhisper) {
    objWhisper.textContent = sPickWhisper()
    objWhisper.classList.remove('is-changing')
    void objWhisper.offsetWidth
    objWhisper.classList.add('is-changing')
  }

  arrRipples.push({
    nX: 0.5,
    nY: 0.5,
    nAge: 0,
    nLife: nRand(2, 4),
    nHue: objTargetVisual.nHue,
  })
}

function vChooseNextState(): void {
  const arrChoices = arrStates.filter((sChoice) => sChoice !== sState)
  vSetState(arrChoices[Math.floor(Math.random() * arrChoices.length)]!)
}

function vMorphVisual(nDt: number): void {
  const nT = 1 - Math.exp(-nMorphRate * nDt)
  objVisual.nPull += (objTargetVisual.nPull - objVisual.nPull) * nT
  objVisual.nTurn += (objTargetVisual.nTurn - objVisual.nTurn) * nT
  objVisual.nNoise += (objTargetVisual.nNoise - objVisual.nNoise) * nT
  objVisual.nTrail += (objTargetVisual.nTrail - objVisual.nTrail) * nT
  objVisual.nScale += (objTargetVisual.nScale - objVisual.nScale) * nT

  let nHueDelta = ((objTargetVisual.nHue - objVisual.nHue + 540) % 360) - 180
  nHueDelta = nClamp(nHueDelta, -90, 90)
  objVisual.nHue = (objVisual.nHue + nHueDelta * nT + 360) % 360
  objVisual.nSymmetry = objTargetVisual.nSymmetry
}

function vMakeReading(): void {
  if (arrCards.length < 2) {
    return
  }

  nFeaturedA = Math.floor(Math.random() * arrCards.length)
  do {
    nFeaturedB = Math.floor(Math.random() * arrCards.length)
  } while (nFeaturedB === nFeaturedA)

  const objA = arrCards[nFeaturedA]!
  const objB = arrCards[nFeaturedB]!
  const nA = parseInt(objA.sBinaryValue, 2)
  const nB = parseInt(objB.sBinaryValue, 2)
  const sOp = Math.random() < 0.5 ? 'AND' : 'OR'
  const nResult = sOp === 'AND' ? nA & nB : nA | nB
  const objResult = arrCards.find((objCard) => parseInt(objCard.sBinaryValue, 2) === nResult)!
  nFeaturedResult = arrCards.indexOf(objResult)
  nEquationUntil = nDreamTime + nEquationSec
  nNextReadingAt = nDreamTime + nRand(nMinReadingSec, nMaxReadingSec)

  const nBits = objResult.sBinaryValue.split('').filter((sBit) => sBit === '1').length
  objTargetVisual.nHue = (sOp === 'AND' ? 270 + nResult * 3 : 34 + nResult * 5) % 360
  objTargetVisual.nSymmetry = Math.max(1, Math.min(6, nBits + 1))
  objTargetVisual.nTurn *= sOp === 'AND' ? -1 : 1.35
  objTargetVisual.nTrail *= sOp === 'AND' ? 1.6 : 0.7

  if (objEquation) {
    objEquation.innerHTML = `
      <span>${objA.sName} <code>${objA.sBinaryValue}</code></span>
      <b>${sOp}</b>
      <span>${objB.sName} <code>${objB.sBinaryValue}</code></span>
      <i>→</i>
      <strong>${objResult.sName} <code>${objResult.sBinaryValue}</code></strong>
    `
    objEquation.classList.remove('is-visible')
    void objEquation.offsetWidth
    objEquation.classList.add('is-visible')
  }

  const objResultSpirit = arrSpirits[nFeaturedResult]
  if (objResultSpirit) {
    arrRipples.push({
      nX: objResultSpirit.nX,
      nY: objResultSpirit.nY,
      nAge: 0,
      nLife: 4,
      nHue: objTargetVisual.nHue,
    })
  }
}

function vUpdateSpirit(objSpirit: tSpirit, nIndex: number, nDt: number): void {
  const nDx = objSpirit.nX - 0.5
  const nDy = objSpirit.nY - 0.5
  const nDist = Math.max(0.04, Math.hypot(nDx, nDy))
  const nNoiseX = Math.sin(nDreamTime * 0.73 + objSpirit.nPhase * 3 + nDreamSeed)
  const nNoiseY = Math.cos(nDreamTime * 0.61 - objSpirit.nPhase * 2 + nDreamSeed)

  if (sState === 'lattice') {
    const nTargetX = 0.14 + (nIndex % 4) * 0.24
    const nTargetY = 0.15 + Math.floor(nIndex / 4) * 0.23
    objSpirit.nVx += (nTargetX - objSpirit.nX) * objVisual.nPull * nDt
    objSpirit.nVy += (nTargetY - objSpirit.nY) * objVisual.nPull * nDt
  } else if (sState === 'eclipse') {
    const nTargetAngle = (nIndex / nSpiritCount) * nTwoPi + nDreamTime * objVisual.nTurn * 0.15
    const nTargetRadius = 0.3 + Math.sin(nDreamTime * 0.3 + objSpirit.nPhase) * 0.06
    const nTargetX = 0.5 + Math.cos(nTargetAngle) * nTargetRadius
    const nTargetY = 0.5 + Math.sin(nTargetAngle) * nTargetRadius
    objSpirit.nVx += (nTargetX - objSpirit.nX) * objVisual.nPull * nDt
    objSpirit.nVy += (nTargetY - objSpirit.nY) * objVisual.nPull * nDt
  } else {
    const nOrbitRadius =
      sState === 'orbit' ? 0.34 : sState === 'storm' ? 0.27 : sState === 'mirror' ? 0.31 : 0.3
    const nRadiusWave = Math.sin(nDreamTime * 0.18 + objSpirit.nPhase) * 0.055
    const nRadialForce = (nOrbitRadius + nRadiusWave - nDist) * objVisual.nPull
    objSpirit.nVx += (nDx / nDist) * nRadialForce * nDt
    objSpirit.nVy += (nDy / nDist) * nRadialForce * nDt
    objSpirit.nVx += (-nDy / nDist) * objVisual.nTurn * 0.045 * nDt
    objSpirit.nVy += (nDx / nDist) * objVisual.nTurn * 0.045 * nDt
  }

  objSpirit.nVx += nNoiseX * objVisual.nNoise * 0.035 * nDt
  objSpirit.nVy += nNoiseY * objVisual.nNoise * 0.035 * nDt

  const nDamping = Math.pow(sState === 'storm' ? 0.986 : 0.965, nDt * 60)
  objSpirit.nVx *= nDamping
  objSpirit.nVy *= nDamping
  objSpirit.nX += objSpirit.nVx * nDt
  objSpirit.nY += objSpirit.nVy * nDt
  objSpirit.nAngle += (objSpirit.nSpin + objVisual.nTurn * 0.04) * nDt

  if (objSpirit.nX < -0.12) {
    objSpirit.nX = 1.12
  } else if (objSpirit.nX > 1.12) {
    objSpirit.nX = -0.12
  }
  if (objSpirit.nY < -0.12) {
    objSpirit.nY = 1.12
  } else if (objSpirit.nY > 1.12) {
    objSpirit.nY = -0.12
  }
}

function vSeparateSpirits(nDt: number): void {
  const nGap =
    sState === 'lattice' ? nMinSpiritGap * 0.82 : nMinSpiritGap

  for (let nI = 0; nI < arrSpirits.length; nI++) {
    const objA = arrSpirits[nI]!
    for (let nJ = nI + 1; nJ < arrSpirits.length; nJ++) {
      const objB = arrSpirits[nJ]!
      let nDx = objA.nX - objB.nX
      let nDy = objA.nY - objB.nY
      let nDist = Math.hypot(nDx, nDy)

      if (nDist >= nGap) {
        continue
      }
      if (nDist < 0.001) {
        const nAngle = nRand(0, nTwoPi)
        nDx = Math.cos(nAngle) * 0.001
        nDy = Math.sin(nAngle) * 0.001
        nDist = 0.001
      }

      const nPush = (nGap - nDist) * nSpiritRepulsion * nDt
      const nPushX = (nDx / nDist) * nPush
      const nPushY = (nDy / nDist) * nPush
      objA.nVx += nPushX
      objA.nVy += nPushY
      objB.nVx -= nPushX
      objB.nVy -= nPushY
    }
  }
}

function vDrawBackground(objCtxLocal: CanvasRenderingContext2D): void {
  if (bFreshFrame) {
    objCtxLocal.fillStyle = '#010002'
    objCtxLocal.fillRect(0, 0, nW, nH)
    bFreshFrame = false
  }

  objCtxLocal.globalCompositeOperation = 'source-over'
  objCtxLocal.fillStyle = `hsla(${objVisual.nHue}, 48%, 1%, ${Math.min(0.3, objVisual.nTrail * 1.35)})`
  objCtxLocal.fillRect(0, 0, nW, nH)

  const nPulse = 0.5 + Math.sin(nDreamTime * 0.27) * 0.5
  const nCx = nW * (0.5 + Math.sin(nDreamTime * 0.071) * 0.18)
  const nCy = nH * (0.47 + Math.cos(nDreamTime * 0.053) * 0.15)
  const objGlow = objCtxLocal.createRadialGradient(nCx, nCy, 0, nCx, nCy, Math.max(nW, nH) * 0.75)
  objGlow.addColorStop(0, `hsla(${objVisual.nHue}, 82%, 38%, ${0.025 + nPulse * 0.025})`)
  objGlow.addColorStop(0.4, `hsla(${(objVisual.nHue + 55) % 360}, 65%, 20%, 0.018)`)
  objGlow.addColorStop(1, 'rgba(0, 0, 0, 0)')
  objCtxLocal.fillStyle = objGlow
  objCtxLocal.fillRect(0, 0, nW, nH)
}

function vDrawStars(objCtxLocal: CanvasRenderingContext2D, nDt: number): void {
  objCtxLocal.save()
  objCtxLocal.globalCompositeOperation = 'lighter'

  const nVanishingX = 0.5 + Math.sin(nDreamTime * 0.09) * 0.055
  const nVanishingY = 0.5 + Math.cos(nDreamTime * 0.07) * 0.04

  for (const objStar of arrStars) {
    objStar.nPhase += nDt * objStar.nSpeed
    objStar.nDepth += nDt * (0.08 + objStar.nSpeed * 0.08)

    const nDx = objStar.nX - nVanishingX
    const nDy = objStar.nY - nVanishingY
    const nTravel = nDt * (0.035 + objStar.nDepth * objStar.nDepth * 0.42)
    const nPrevX = objStar.nX
    const nPrevY = objStar.nY
    objStar.nX += nDx * nTravel
    objStar.nY += nDy * nTravel

    if (
      objStar.nDepth > 1.25 ||
      objStar.nX < -0.08 ||
      objStar.nX > 1.08 ||
      objStar.nY < -0.08 ||
      objStar.nY > 1.08
    ) {
      const nAngle = nRand(0, nTwoPi)
      const nRadius = nRand(0.015, 0.2)
      objStar.nX = nVanishingX + Math.cos(nAngle) * nRadius
      objStar.nY = nVanishingY + Math.sin(nAngle) * nRadius
      objStar.nDepth = nRand(0.05, 0.2)
      objStar.nSpeed = nRand(0.2, 1.1)
      objStar.bGold = Math.random() < 0.22
      objStar.bDark = Math.random() < nDarkStarChance
      objStar.bOne = Math.random() < 0.5
      continue
    }

    const nTwinkle = 0.15 + 0.65 * (0.5 + Math.sin(objStar.nPhase + nDreamTime * objStar.nSpeed) * 0.5)
    const nDepth = nClamp(objStar.nDepth, 0, 1)
    objCtxLocal.globalCompositeOperation = objStar.bDark ? 'source-over' : 'lighter'
    const nAlpha =
      nTwinkle *
      (0.2 + nDepth * 0.8) *
      (objStar.bDark ? nDarkStarOpacity : nStarOpacity)
    objCtxLocal.globalAlpha = nAlpha
    objCtxLocal.fillStyle = objStar.bDark
      ? `hsl(${(objVisual.nHue + 18) % 360} 42% ${9 + nDepth * 7}%)`
      : objStar.bGold
        ? '#e0b83a'
        : `hsl(${objVisual.nHue} 90% 72%)`

    const nX = objStar.nX * nW
    const nY = objStar.nY * nH
    const nSize = 5 + nDepth * nDepth * 10
    const nMoveX = (objStar.nX - nPrevX) * nW
    const nMoveY = (objStar.nY - nPrevY) * nH
    const nMoveLength = Math.max(0.001, Math.hypot(nMoveX, nMoveY))
    const nTrailX = (nMoveX / nMoveLength) * nDepth * 6
    const nTrailY = (nMoveY / nMoveLength) * nDepth * 6
    const sBit = objStar.bOne ? '1' : '0'

    objCtxLocal.font = `${nSize}px "IBM Plex Mono", monospace`
    objCtxLocal.textAlign = 'center'
    objCtxLocal.textBaseline = 'middle'
    objCtxLocal.globalAlpha = nAlpha * 0.18
    objCtxLocal.fillText(sBit, nX - nTrailX * 2, nY - nTrailY * 2)
    objCtxLocal.globalAlpha = nAlpha * 0.38
    objCtxLocal.fillText(sBit, nX - nTrailX, nY - nTrailY)
    objCtxLocal.globalAlpha = nAlpha
    objCtxLocal.fillText(sBit, nX, nY)
  }
  objCtxLocal.restore()
}

function vDrawConnections(objCtxLocal: CanvasRenderingContext2D): void {
  objCtxLocal.save()
  objCtxLocal.globalCompositeOperation = 'lighter'
  objCtxLocal.lineWidth = 0.65
  for (let nI = 0; nI < arrSpirits.length; nI++) {
    const objA = arrSpirits[nI]!
    for (let nJ = nI + 1; nJ < arrSpirits.length; nJ++) {
      const objB = arrSpirits[nJ]!
      const nDx = (objA.nX - objB.nX) * nW
      const nDy = (objA.nY - objB.nY) * nH
      const nDist = Math.hypot(nDx, nDy)
      const nReach = sState === 'lattice' ? 230 : 130
      if (nDist > nReach) {
        continue
      }
      objCtxLocal.globalAlpha = (1 - nDist / nReach) * 0.12
      objCtxLocal.strokeStyle = `hsl(${objVisual.nHue} 80% 68%)`
      objCtxLocal.beginPath()
      objCtxLocal.moveTo(objA.nX * nW, objA.nY * nH)
      objCtxLocal.lineTo(objB.nX * nW, objB.nY * nH)
      objCtxLocal.stroke()
    }
  }
  objCtxLocal.restore()
}

function vStrokeIcon(
  objCtxLocal: CanvasRenderingContext2D,
  objSpirit: tSpirit,
  nX: number,
  nY: number,
  nScale: number,
  nAlpha: number,
  nHue: number,
): void {
  const arrPrims = mapIcons[objSpirit.sBinaryValue]
  if (!arrPrims) {
    return
  }

  objCtxLocal.save()
  objCtxLocal.translate(nX, nY)
  objCtxLocal.rotate(objSpirit.nAngle)
  objCtxLocal.scale(nScale, nScale)
  objCtxLocal.translate(-nIconView / 2, -nIconView / 2)
  objCtxLocal.globalAlpha = nAlpha
  objCtxLocal.strokeStyle = `hsl(${nHue} 88% 72%)`
  objCtxLocal.lineWidth = 1.6
  objCtxLocal.lineCap = 'round'
  objCtxLocal.lineJoin = 'round'

  for (const objPrim of arrPrims) {
    if (objPrim.sKind === 'path') {
      objCtxLocal.stroke(objPrim.objPath)
    } else if (objPrim.sKind === 'circle') {
      objCtxLocal.beginPath()
      objCtxLocal.setLineDash(objPrim.bDash ? [3, 4] : [])
      objCtxLocal.arc(objPrim.nCx, objPrim.nCy, objPrim.nR, 0, nTwoPi)
      objCtxLocal.stroke()
    } else {
      objCtxLocal.strokeRect(objPrim.nX, objPrim.nY, objPrim.nW, objPrim.nH)
    }
  }
  objCtxLocal.restore()
}

function vDrawSpiritCopy(
  objCtxLocal: CanvasRenderingContext2D,
  objSpirit: tSpirit,
  nX: number,
  nY: number,
  nIndex: number,
  nCopy: number,
): void {
  const bFeatured =
    nIndex === nFeaturedA || nIndex === nFeaturedB || nIndex === nFeaturedResult
  const nFeaturedPulse =
    bFeatured && nDreamTime < nEquationUntil
      ? 1 + 0.22 * (0.5 + Math.sin(nDreamTime * 5 + nIndex) * 0.5)
      : 1
  const nPulse = 1 + Math.sin(nDreamTime * 0.8 + objSpirit.nPhase) * 0.08
  const nScale = objSpirit.nScale * objVisual.nScale * nPulse * nFeaturedPulse
  const nAlpha = bFeatured && nDreamTime < nEquationUntil ? 0.95 : 0.26 + 0.35 / (nCopy + 1)
  const nHue =
    nIndex === nFeaturedResult && nDreamTime < nEquationUntil
      ? 42
      : (objVisual.nHue + nIndex * 7 + nCopy * 18) % 360

  objCtxLocal.save()
  objCtxLocal.globalCompositeOperation = 'lighter'
  if (bFeatured && nDreamTime < nEquationUntil) {
    const objGlow = objCtxLocal.createRadialGradient(nX, nY, 2, nX, nY, 56 * nScale)
    objGlow.addColorStop(0, `hsla(${nHue}, 90%, 58%, 0.18)`)
    objGlow.addColorStop(1, `hsla(${nHue}, 90%, 40%, 0)`)
    objCtxLocal.fillStyle = objGlow
    objCtxLocal.fillRect(nX - 70, nY - 70, 140, 140)
  }
  vStrokeIcon(objCtxLocal, objSpirit, nX, nY, nScale, nAlpha, nHue)
  objCtxLocal.restore()
}

function vDrawSpirits(objCtxLocal: CanvasRenderingContext2D): void {
  const nSymmetry = Math.round(objVisual.nSymmetry)
  const nCx = nW / 2
  const nCy = nH / 2

  for (let nI = 0; nI < arrSpirits.length; nI++) {
    const objSpirit = arrSpirits[nI]!
    const nBaseX = objSpirit.nX * nW
    const nBaseY = objSpirit.nY * nH

    if (nSymmetry === 1) {
      vDrawSpiritCopy(objCtxLocal, objSpirit, nBaseX, nBaseY, nI, 0)
      continue
    }

    const nDx = nBaseX - nCx
    const nDy = nBaseY - nCy
    for (let nCopy = 0; nCopy < nSymmetry; nCopy++) {
      const nAngle = (nCopy / nSymmetry) * nTwoPi
      const nCos = Math.cos(nAngle)
      const nSin = Math.sin(nAngle)
      const nX = nCx + nDx * nCos - nDy * nSin
      const nY = nCy + nDx * nSin + nDy * nCos
      vDrawSpiritCopy(objCtxLocal, objSpirit, nX, nY, nI, nCopy)
    }
  }
}

function vDrawRipples(objCtxLocal: CanvasRenderingContext2D, nDt: number): void {
  arrRipples = arrRipples.filter((objRipple) => {
    objRipple.nAge += nDt
    const nT = objRipple.nAge / objRipple.nLife
    if (nT >= 1) {
      return false
    }

    objCtxLocal.save()
    objCtxLocal.globalCompositeOperation = 'lighter'
    objCtxLocal.globalAlpha = (1 - nT) * 0.32
    objCtxLocal.strokeStyle = `hsl(${objRipple.nHue} 90% 66%)`
    objCtxLocal.lineWidth = 1 + (1 - nT) * 2
    for (let nRing = 0; nRing < 3; nRing++) {
      const nRadius = (nT * 0.55 + nRing * 0.07) * Math.min(nW, nH)
      objCtxLocal.beginPath()
      objCtxLocal.arc(objRipple.nX * nW, objRipple.nY * nH, nRadius, 0, nTwoPi)
      objCtxLocal.stroke()
    }
    objCtxLocal.restore()
    return true
  })
}

function vFrame(nTs: number): void {
  if (!bRunning || !objCtx) {
    return
  }

  vResize()

  const nDt = nLastTs ? nClamp((nTs - nLastTs) / 1000, 0, 0.05) : 0.016
  nLastTs = nTs
  nDreamTime += nDt

  if (nDreamTime >= nNextStateAt) {
    vChooseNextState()
  }
  if (nDreamTime >= nNextReadingAt) {
    vMakeReading()
  }
  if (nEquationUntil > 0 && nDreamTime >= nEquationUntil && objEquation) {
    objEquation.classList.remove('is-visible')
    nEquationUntil = 0
  }

  vMorphVisual(nDt)
  for (let nI = 0; nI < arrSpirits.length; nI++) {
    vUpdateSpirit(arrSpirits[nI]!, nI, nDt)
  }
  vSeparateSpirits(nDt)

  vDrawBackground(objCtx)
  vDrawStars(objCtx, nDt)
  vDrawConnections(objCtx)
  vDrawSpirits(objCtx)
  vDrawRipples(objCtx, nDt)
  nAnimFrame = requestAnimationFrame(vFrame)
}

function vDisturbDream(objEvent: MouseEvent): void {
  if (!objCanvas) {
    return
  }
  const objRect = objCanvas.getBoundingClientRect()
  const nX = (objEvent.clientX - objRect.left) / objRect.width
  const nY = (objEvent.clientY - objRect.top) / objRect.height

  for (const objSpirit of arrSpirits) {
    const nDx = objSpirit.nX - nX
    const nDy = objSpirit.nY - nY
    const nDist = Math.max(0.035, Math.hypot(nDx, nDy))
    const nForce = 0.018 / nDist
    objSpirit.nVx += (nDx / nDist) * nForce
    objSpirit.nVy += (nDy / nDist) * nForce
    objSpirit.nSpin += nRand(-0.35, 0.35)
  }

  arrRipples.push({
    nX,
    nY,
    nAge: 0,
    nLife: nRand(2, 4),
    nHue: (objVisual.nHue + nRand(40, 160)) % 360,
  })
  vChooseNextState()
  if (Math.random() < 0.7) {
    vMakeReading()
  }
}

function vStart(): void {
  if (bRunning) {
    return
  }
  bRunning = true
  nLastTs = 0
  // Defer one frame so the newly shown panel has a real layout size.
  nAnimFrame = requestAnimationFrame(() => {
    vResize()
    nAnimFrame = requestAnimationFrame(vFrame)
  })
}

function vStop(): void {
  bRunning = false
  if (nAnimFrame) {
    cancelAnimationFrame(nAnimFrame)
    nAnimFrame = 0
  }
}

export function sDreamMarkup(): string {
  return `
    <div class="dream" id="dream">
      <div class="dream-stage">
        <canvas
          class="dream-canvas"
          id="dream-canvas"
          aria-label="An evolving generative animation of Binarot signs"
        ></canvas>
        <div class="dream-film-ui">
          <span class="dream-film-state" id="dream-state">slow signal</span>
          <span class="dream-film-live"><i></i> dreaming</span>
        </div>
        <div class="dream-film-equation" id="dream-equation" aria-live="polite"></div>
        <p class="dream-whisper" id="dream-whisper">the deck dreams in parallel</p>
        <p class="dream-film-hint">click anywhere to disturb the dream</p>
      </div>
    </div>
  `
}

export function vBindDream(arrSource: tDreamCard[]): void {
  arrCards = arrSource.slice(0, nSpiritCount)
  vBuildIcons()
  vSeedDream()

  objRoot = document.querySelector<HTMLElement>('#dream')
  objCanvas = document.querySelector<HTMLCanvasElement>('#dream-canvas')
  objCtx = objCanvas?.getContext('2d') ?? null
  objState = document.querySelector<HTMLElement>('#dream-state')
  objEquation = document.querySelector<HTMLElement>('#dream-equation')
  objWhisper = document.querySelector<HTMLElement>('#dream-whisper')

  if (!objRoot || !objCanvas || !objCtx) {
    return
  }

  if (!bBound) {
    objCanvas.addEventListener('click', vDisturbDream)
    window.addEventListener('resize', vResize)
    bBound = true
  }

  nDreamTime = 0
  nNextStateAt = nRand(nMinStateSec, nMaxStateSec)
  nNextReadingAt = nRand(4, 8)
}

export function vSetDreamActive(bActive: boolean): void {
  if (bActive) {
    vStart()
  } else {
    vStop()
  }
}
