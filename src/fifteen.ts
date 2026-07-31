import { sCardIconMarkup } from './cardIcons'

type tFifteenSource = {
  sName: string
  sBinaryValue: string
}

type tSuit = 'void' | 'signal' | 'mask' | 'state'

type tFaceKind = 'barony' | 'manor' | 'castle' | 'hall'

type tFaceRank = {
  sName: string
  sKind: tFaceKind
  sMark: string
}

type tFifteenCard = {
  sName: string
  sBinaryValue: string
  sSuit: tSuit
  nValue: number
  bFace: boolean
  sFaceKind?: tFaceKind
}

type tPhase = 'idle' | 'ai' | 'player' | 'dealer' | 'settled'

type tOutcome = 'win' | 'lose' | 'push' | 'natural' | null

type tSeat = {
  sId: string
  sName: string
  bHuman: boolean
  nStandAt: number
  arrHand: tFifteenCard[]
  sOutcome: tOutcome
  bFinished: boolean
}

type tHairStyle = 'short' | 'bob' | 'long' | 'slick' | 'messy'

type tBotLook = {
  sHair: string
  sEyes: string
  sAccent: string
  sSkin: string
  sHairStyle: tHairStyle
  sJacket: string
  sJacketDark: string
}

type tBotDef = {
  sId: string
  sName: string
  nStandAt: number
  objLook: tBotLook
}

const nTarget = 31
const nDealerStand = 24
const nMinShoe = 12
const nDealerHitDelayMs = 550
const nAiDelayMs = 480
const nAiFinishDelayMs = 3000
// Face ranks per suit, each worth 15 (same as The State).
const nFaceValue = 15
const arrSuits: tSuit[] = ['void', 'signal', 'mask', 'state']
const arrFaceRanks: tFaceRank[] = [
  { sName: 'The Barony', sKind: 'barony', sMark: 'B' },
  { sName: 'The Manor', sKind: 'manor', sMark: 'M' },
  { sName: 'The Castle', sKind: 'castle', sMark: 'C' },
  { sName: 'The Hall', sKind: 'hall', sMark: 'H' },
]
const arrBotDefs: tBotDef[] = [
  {
    sId: 'bit',
    sName: 'Mr. Bit',
    nStandAt: 22,
    objLook: {
      sHair: '#1e2438',
      sEyes: '#4a78c8',
      sAccent: '#6a9ae0',
      sSkin: '#e6c09a',
      sHairStyle: 'slick',
      sJacket: '#2a4a8a',
      sJacketDark: '#152848',
    },
  },
  {
    sId: 'nix',
    sName: 'Ms. Nix',
    nStandAt: 24,
    objLook: {
      sHair: '#2a4038',
      sEyes: '#3a9a6a',
      sAccent: '#5ec89a',
      sSkin: '#c49a70',
      sHairStyle: 'bob',
      sJacket: '#2a6a4a',
      sJacketDark: '#143828',
    },
  },
  {
    sId: 'lex',
    sName: 'Mrs. Lex',
    nStandAt: 26,
    objLook: {
      sHair: '#5a2840',
      sEyes: '#c86890',
      sAccent: '#e090b0',
      sSkin: '#f0d4cc',
      sHairStyle: 'long',
      sJacket: '#8a3060',
      sJacketDark: '#4a1834',
    },
  },
]
const mapBotLook: Record<string, tBotLook> = Object.fromEntries(
  arrBotDefs.map((objBot) => [objBot.sId, objBot.objLook]),
)
const sStorageKey = 'binarot_fifteen'

type tFifteenSave = {
  nWins: number
  nLosses: number
}

let arrSource: tFifteenSource[] = []
let arrShoe: tFifteenCard[] = []
let arrDiscard: tFifteenCard[] = []
let arrSeats: tSeat[] = []
let arrDealer: tFifteenCard[] = []
let sPhase: tPhase = 'idle'
let sOutcome: tOutcome = null
let nAiSeat = 0
let nDealerTimer = 0
let nAiTimer = 0
let nDealerAnimatedIndex = -1
let sSeatAnimatedId = ''
let nSeatAnimatedIndex = -1
let sRenderedSeatId = ''
let sStatus = 'Deal a hand when ready.'
let sSummary = ''
let nWins = 0
let nLosses = 0
let bBound = false

let objRoot: HTMLElement | null = null
let objTable: HTMLElement | null = null
let objStatus: HTMLElement | null = null
let objSummary: HTMLElement | null = null
let objRecord: HTMLElement | null = null
let objDealRow: HTMLElement | null = null
let objActionRow: HTMLElement | null = null

function objHuman(): tSeat {
  return arrSeats.find((objSeat) => objSeat.bHuman)!
}

function arrBots(): tSeat[] {
  return arrSeats.filter((objSeat) => !objSeat.bHuman)
}

function objLoadSave(): tFifteenSave {
  try {
    const sRaw = localStorage.getItem(sStorageKey)
    if (!sRaw) {
      return { nWins: 0, nLosses: 0 }
    }
    const objParsed = JSON.parse(sRaw) as Partial<tFifteenSave>
    return {
      nWins: typeof objParsed.nWins === 'number' && objParsed.nWins >= 0 ? Math.floor(objParsed.nWins) : 0,
      nLosses:
        typeof objParsed.nLosses === 'number' && objParsed.nLosses >= 0
          ? Math.floor(objParsed.nLosses)
          : 0,
    }
  } catch {
    return { nWins: 0, nLosses: 0 }
  }
}

function vPersistRecord(): void {
  const objSave: tFifteenSave = { nWins, nLosses }
  localStorage.setItem(sStorageKey, JSON.stringify(objSave))
}

function arrBuildSeats(): tSeat[] {
  const arrOut: tSeat[] = arrBotDefs.map((objBot) => ({
    sId: objBot.sId,
    sName: objBot.sName,
    bHuman: false,
    nStandAt: objBot.nStandAt,
    arrHand: [],
    sOutcome: null,
    bFinished: false,
  }))
  arrOut.push({
    sId: 'you',
    sName: 'You',
    bHuman: true,
    nStandAt: nDealerStand,
    arrHand: [],
    sOutcome: null,
    bFinished: false,
  })
  return arrOut
}

function nCardValue(sBinaryValue: string): number {
  return parseInt(sBinaryValue, 2)
}

function sTotalBinary(nTotal: number): string {
  return nTotal.toString(2)
}

function arrShuffled<T>(arrIn: T[]): T[] {
  const arrOut = arrIn.slice()
  for (let nI = arrOut.length - 1; nI > 0; nI--) {
    const nJ = Math.floor(Math.random() * (nI + 1))
    const objTmp = arrOut[nI]!
    arrOut[nI] = arrOut[nJ]!
    arrOut[nJ] = objTmp
  }
  return arrOut
}

function arrBuildShoe(arrCards: tFifteenSource[]): tFifteenCard[] {
  const arrBuilt: tFifteenCard[] = []
  for (const sSuit of arrSuits) {
    for (const objCard of arrCards) {
      arrBuilt.push({
        sName: objCard.sName,
        sBinaryValue: objCard.sBinaryValue,
        sSuit,
        nValue: nCardValue(objCard.sBinaryValue),
        bFace: false,
      })
    }
    for (const objFace of arrFaceRanks) {
      arrBuilt.push({
        sName: objFace.sName,
        sBinaryValue: objFace.sMark,
        sSuit,
        nValue: nFaceValue,
        bFace: true,
        sFaceKind: objFace.sKind,
      })
    }
  }
  return arrShuffled(arrBuilt)
}

function sFaceIconMarkup(sKind: tFaceKind, sMark: string): string {
  let sPaths = ''
  if (sKind === 'barony') {
    sPaths = `
      <path d="M18 48 V28 H46 V48"/>
      <path d="M14 28 H50"/>
      <path d="M24 28 V18 H40 V28"/>
      <path d="M28 38 H36 V48"/>
      <circle cx="32" cy="14" r="3"/>
    `
  } else if (sKind === 'manor') {
    sPaths = `
      <path d="M12 48 V30 L32 16 L52 30 V48"/>
      <path d="M22 48 V34 H42 V48"/>
      <path d="M12 30 H52"/>
      <path d="M28 22 H36 V28 H28 Z"/>
    `
  } else if (sKind === 'castle') {
    sPaths = `
      <path d="M10 48 V28 H22 V18 H28 V28 H36 V14 H42 V28 H54 V48"/>
      <path d="M22 18 L25 12 L28 18"/>
      <path d="M36 14 L39 8 L42 14"/>
      <path d="M10 28 L13 22 L16 28"/>
      <path d="M48 28 L51 22 L54 28"/>
      <path d="M30 36 H38 V48 H30 Z"/>
    `
  } else {
    sPaths = `
      <path d="M14 48 V26 H50 V48"/>
      <path d="M14 26 L32 12 L50 26"/>
      <path d="M22 48 V34 H28 V48"/>
      <path d="M36 48 V34 H42 V48"/>
      <path d="M30 26 V20 H34 V26"/>
    `
  }
  return `
    <svg class="card-icon fifteen-card-icon fifteen-face-icon" viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" focusable="false">
      ${sPaths}
      <text x="32" y="58" text-anchor="middle" class="fifteen-face-mark">${sMark}</text>
    </svg>
  `
}

function vEnsureShoe(): void {
  if (arrShoe.length >= nMinShoe) {
    return
  }
  const arrPool = arrShoe.concat(arrDiscard)
  arrDiscard = []
  if (arrPool.length === 0) {
    arrShoe = arrBuildShoe(arrSource)
    return
  }
  arrShoe = arrShuffled(arrPool)
}

function objDraw(): tFifteenCard {
  vEnsureShoe()
  if (arrShoe.length === 0) {
    arrShoe = arrBuildShoe(arrSource)
  }
  return arrShoe.pop()!
}

function nHandTotal(arrHand: tFifteenCard[]): number {
  let nSum = 0
  for (const objCard of arrHand) {
    nSum += objCard.nValue
  }
  return nSum
}

function bBust(arrHand: tFifteenCard[]): boolean {
  return nHandTotal(arrHand) > nTarget
}

function bNatural(arrHand: tFifteenCard[]): boolean {
  return arrHand.length === 2 && nHandTotal(arrHand) === nTarget
}

function vDiscardHands(): void {
  for (const objSeat of arrSeats) {
    arrDiscard.push(...objSeat.arrHand)
    objSeat.arrHand = []
    objSeat.sOutcome = null
    objSeat.bFinished = false
  }
  arrDiscard.push(...arrDealer)
  arrDealer = []
}

function bDealerRevealed(): boolean {
  return sPhase === 'dealer' || sPhase === 'settled'
}

function sCardMarkup(objCard: tFifteenCard, bAnimate: boolean): string {
  const sIcon = objCard.bFace
    ? sFaceIconMarkup(objCard.sFaceKind ?? 'barony', objCard.sBinaryValue)
    : sCardIconMarkup(objCard.sBinaryValue, 'fifteen-card-icon')
  const sFaceClass = objCard.bFace ? ` is-face face-${objCard.sFaceKind ?? 'barony'}` : ''
  return `
    <div class="fifteen-card suit-${objCard.sSuit}${sFaceClass}${bAnimate ? ' is-dealt' : ''}" title="${objCard.sName} (${objCard.nValue}) · ${objCard.sSuit}">
      ${sIcon}
      <span class="fifteen-card-name">${objCard.sName}</span>
      <span class="fifteen-card-binary">${objCard.bFace ? '1111' : objCard.sBinaryValue}</span>
      <span class="fifteen-card-value">${objCard.nValue}</span>
      <span class="fifteen-card-suit">${objCard.sSuit}</span>
    </div>
  `
}

function sCardBackMarkup(bAnimate: boolean): string {
  return `
    <div class="fifteen-card fifteen-card-back${bAnimate ? ' is-dealt' : ''}" aria-hidden="true" title="Hidden">
      <div class="fifteen-card-back-mark">
        <span>0</span>
        <span>1</span>
      </div>
    </div>
  `
}

function sHandMarkup(
  arrHand: tFifteenCard[],
  nAnimateIndex: number,
  bFaceUp: boolean,
  nUpIndex: number = -1,
): string {
  if (arrHand.length === 0) {
    return '<p class="fifteen-empty">—</p>'
  }
  if (bFaceUp) {
    return arrHand
      .map((objCard, nIndex) => sCardMarkup(objCard, nIndex === nAnimateIndex))
      .join('')
  }
  return arrHand
    .map((objCard, nIndex) => {
      if (nIndex === nUpIndex) {
        return sCardMarkup(objCard, nIndex === nAnimateIndex)
      }
      return sCardBackMarkup(nIndex === nAnimateIndex)
    })
    .join('')
}

function sMetaMarkup(arrHand: tFifteenCard[], bShow: boolean, nUpOnly: number = -1): string {
  if (arrHand.length === 0) {
    return '<span class="fifteen-total">total —</span>'
  }
  if (!bShow) {
    if (nUpOnly >= 0 && nUpOnly < arrHand.length) {
      const objUp = arrHand[nUpOnly]!
      const sUpBits = objUp.bFace ? '1111' : objUp.sBinaryValue
      return `<span class="fifteen-total">up <code>${sUpBits}</code> (${objUp.nValue})</span>`
    }
    return '<span class="fifteen-total">total —</span>'
  }
  const nTotal = nHandTotal(arrHand)
  const sBits = sTotalBinary(nTotal)
  const sFlag = bBust(arrHand)
    ? ' · bust'
    : nTotal === nTarget
      ? ' · thirty-one'
      : ''
  return `<span class="fifteen-total">total <code>${sBits}</code> (${nTotal})${sFlag}</span>`
}

function sOutcomeLabel(sResult: tOutcome): string {
  if (sResult === 'natural') {
    return 'natural'
  }
  if (sResult === 'win') {
    return 'win'
  }
  if (sResult === 'push') {
    return 'push'
  }
  if (sResult === 'lose') {
    return 'lose'
  }
  return ''
}

function vClearTimers(): void {
  if (nDealerTimer !== 0) {
    window.clearTimeout(nDealerTimer)
    nDealerTimer = 0
  }
  if (nAiTimer !== 0) {
    window.clearTimeout(nAiTimer)
    nAiTimer = 0
  }
}

function vSetButtons(): void {
  if (!objRoot) {
    return
  }

  const objDeal = objRoot.querySelector<HTMLButtonElement>('[data-action="deal"]')
  const objHit = objRoot.querySelector<HTMLButtonElement>('[data-action="hit"]')
  const objStand = objRoot.querySelector<HTMLButtonElement>('[data-action="stand"]')
  const objAgain = objRoot.querySelector<HTMLButtonElement>('[data-action="again"]')

  const bIdle = sPhase === 'idle'
  const bPlayer = sPhase === 'player'
  const bSettled = sPhase === 'settled'

  if (objDealRow) {
    objDealRow.hidden = !bIdle
  }
  if (objActionRow) {
    objActionRow.hidden = !(bPlayer || bSettled)
  }

  if (objDeal) {
    objDeal.disabled = !bIdle
  }
  if (objHit) {
    objHit.disabled = !bPlayer
    objHit.hidden = !bPlayer
  }
  if (objStand) {
    objStand.disabled = !bPlayer
    objStand.hidden = !bPlayer
  }
  if (objAgain) {
    objAgain.hidden = !bSettled
    objAgain.disabled = !bSettled
  }
}

function objVisibleSeat(): tSeat {
  if (sPhase === 'ai') {
    const arrAi = arrBots()
    return arrAi[Math.min(nAiSeat, arrAi.length - 1)] ?? objHuman()
  }
  return objHuman()
}

function nSkinLuma(sSkin: string): number {
  const sHex = sSkin.replace('#', '')
  if (sHex.length !== 6) {
    return 200
  }
  const nR = Number.parseInt(sHex.slice(0, 2), 16)
  const nG = Number.parseInt(sHex.slice(2, 4), 16)
  const nB = Number.parseInt(sHex.slice(4, 6), 16)
  return 0.2126 * nR + 0.7152 * nG + 0.0722 * nB
}

function sBlushFill(sSkin: string): string {
  const nLuma = nSkinLuma(sSkin)
  if (nLuma < 140) {
    return 'rgba(200, 90, 100, 0.34)'
  }
  return 'rgba(232, 120, 140, 0.28)'
}

function sLipStroke(sSkin: string): string {
  return nSkinLuma(sSkin) < 140 ? '#b86878' : '#c07080'
}

function sHairBackMarkup(objLook: tBotLook): string {
  const sH = objLook.sHair
  if (objLook.sHairStyle === 'long') {
    return `
      <path fill="${sH}" d="M52 88 C40 72 40 48 58 36 C78 22 122 22 142 36 C160 48 160 72 148 88
        L156 200 C150 220 130 228 100 228 C70 228 50 220 44 200 Z"/>
    `
  }
  if (objLook.sHairStyle === 'bob') {
    return `
      <path fill="${sH}" d="M54 96 C44 74 50 46 72 36 C98 24 128 26 144 42 C158 56 158 78 150 96
        L152 150 C146 168 128 176 100 176 C72 176 54 168 48 150 Z"/>
    `
  }
  return `
    <path fill="${sH}" d="M54 96 C44 74 50 46 72 36 C98 24 128 26 144 42 C158 56 158 78 150 96 Z"/>
  `
}

function sHairFrontMarkup(objLook: tBotLook): string {
  const sH = objLook.sHair
  // Keep the top of the fringe buried in the crown, but end the bangs
  // just below the skull line (~52) so they sit high on the forehead.
  if (objLook.sHairStyle === 'slick') {
    return `
      <path fill="${sH}" d="M54 70 C58 44 82 32 100 32 C120 32 142 44 146 70
        C134 58 118 54 100 54 C82 54 66 60 54 70 Z"/>
      <path fill="${sH}" d="M60 62 L48 96 L58 98 L70 70 Z"/>
    `
  }
  if (objLook.sHairStyle === 'bob') {
    return `
      <path fill="${sH}" d="M50 74 C54 46 78 34 100 34 C122 34 146 46 150 74
        C140 62 120 58 100 58 C80 58 60 64 50 74 Z"/>
      <path fill="${sH}" d="M48 78 C44 100 50 118 58 126 L66 82 Z"/>
      <path fill="${sH}" d="M152 78 C156 100 150 118 142 126 L134 82 Z"/>
    `
  }
  if (objLook.sHairStyle === 'long') {
    return `
      <path fill="${sH}" d="M52 72 C56 44 80 32 100 32 C120 32 144 44 148 72
        C136 60 116 56 100 56 C84 56 64 62 52 72 Z"/>
      <path fill="${sH}" d="M56 68 L44 120 L54 122 L68 78 Z"/>
      <path fill="${sH}" d="M144 68 L156 120 L146 122 L132 78 Z"/>
    `
  }
  if (objLook.sHairStyle === 'messy') {
    return `
      <path fill="${sH}" d="M52 72 C56 46 80 32 100 34 C118 28 142 44 148 72
        C136 60 118 54 100 54 C82 56 66 64 52 72 Z"/>
      <path fill="${sH}" d="M72 40 L66 20 L84 42 Z"/>
      <path fill="${sH}" d="M118 38 L128 16 L132 44 Z"/>
    `
  }
  return `
    <path fill="${sH}" d="M52 74 C56 46 80 34 100 34 C120 34 144 46 148 74
      C136 62 116 58 100 58 C84 58 64 64 52 74 Z"/>
  `
}

function sBotPortraitMarkup(sId: string): string {
  const objLook = mapBotLook[sId]
  if (!objLook) {
    return ''
  }
  const sBlush = sBlushFill(objLook.sSkin)
  const sLip = sLipStroke(objLook.sSkin)
  const sGradId = `fifteen-jacket-${sId}`
  return `
    <div class="fifteen-portrait" aria-hidden="true">
      <svg class="fifteen-portrait-svg" viewBox="18 18 164 164" focusable="false">
        <defs>
          <clipPath id="fifteen-portrait-clip-${sId}">
            <circle cx="100" cy="100" r="80"/>
          </clipPath>
          <linearGradient id="${sGradId}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${objLook.sJacket}"/>
            <stop offset="100%" stop-color="${objLook.sJacketDark}"/>
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="84" fill="${objLook.sAccent}" opacity="0.2"/>
        <g clip-path="url(#fifteen-portrait-clip-${sId})">
          <circle cx="100" cy="100" r="80" fill="#0a0610"/>
          ${sHairBackMarkup(objLook)}
          <path fill="url(#${sGradId})" d="M40 190 C50 156 70 138 100 138 C130 138 150 156 160 190
            L168 240 H32 Z"/>
          <path fill="#f4efe8" d="M88 148 H112 L118 168 H82 Z"/>
          <path fill="${objLook.sAccent}" opacity="0.85" d="M82 168 H118 L122 178 H78 Z"/>
          <ellipse fill="${objLook.sSkin}" cx="100" cy="108" rx="48" ry="56"/>
          <ellipse fill="${objLook.sSkin}" cx="100" cy="160" rx="14" ry="12"/>
          <ellipse fill="${sBlush}" cx="68" cy="118" rx="10" ry="6"/>
          <ellipse fill="${sBlush}" cx="132" cy="118" rx="10" ry="6"/>
          <ellipse fill="#fff" cx="80" cy="108" rx="10" ry="12"/>
          <ellipse fill="#fff" cx="120" cy="108" rx="10" ry="12"/>
          <ellipse fill="${objLook.sEyes}" cx="80" cy="110" rx="5" ry="7"/>
          <ellipse fill="${objLook.sEyes}" cx="120" cy="110" rx="5" ry="7"/>
          <circle fill="#1a1020" cx="80" cy="111" r="2.5"/>
          <circle fill="#1a1020" cx="120" cy="111" r="2.5"/>
          <circle fill="#fff" cx="78" cy="108" r="1.2"/>
          <circle fill="#fff" cx="118" cy="108" r="1.2"/>
          <path fill="none" stroke="#2a2030" stroke-width="2.2" stroke-linecap="round"
            d="M70 96 Q80 90 90 96"/>
          <path fill="none" stroke="#2a2030" stroke-width="2.2" stroke-linecap="round"
            d="M110 96 Q120 90 130 96"/>
          <path fill="none" stroke="${sLip}" stroke-width="2" stroke-linecap="round"
            d="M92 132 Q100 138 108 132"/>
          ${sHairFrontMarkup(objLook)}
        </g>
        <circle cx="100" cy="100" r="80" fill="none" stroke="${objLook.sAccent}" stroke-width="3.5" opacity="0.6"/>
      </svg>
    </div>
  `
}

function sSeatMarkup(objSeat: tSeat, bTakeover: boolean): string {
  const bActive =
    (sPhase === 'ai' && !objSeat.bHuman) ||
    (sPhase === 'player' && objSeat.bHuman)
  const bShowHand = sPhase !== 'idle'
  const nAnimate = sSeatAnimatedId === objSeat.sId ? nSeatAnimatedIndex : -1
  const sResult = sOutcomeLabel(objSeat.sOutcome)
  const sActive = bActive ? ' is-active' : ''
  const sYou = objSeat.bHuman ? ' is-you' : ''
  const sTakeover = bTakeover ? ' is-takeover' : ''
  const sOutClass = sResult ? ` is-${sResult}` : ''
  const sTitle = objSeat.bHuman
    ? `<h3>${objSeat.sName}</h3>`
    : `<div class="fifteen-seat-identity">${sBotPortraitMarkup(objSeat.sId)}<div class="fifteen-seat-title"><h3>${objSeat.sName}</h3><p class="fifteen-seat-role">Fellow player</p></div></div>`

  return `
    <section class="fifteen-seat fifteen-player-stage${sYou}${sActive}${sTakeover}${sOutClass}" data-seat="${objSeat.sId}" aria-label="${objSeat.sName}">
      <header class="fifteen-seat-head">
        ${sTitle}
        <div class="fifteen-seat-bank">
          ${sResult ? `<span class="fifteen-outcome">${sResult}</span>` : ''}
        </div>
        <div class="fifteen-seat-meta">${sMetaMarkup(objSeat.arrHand, bShowHand)}</div>
      </header>
      <div class="fifteen-hand">${sHandMarkup(objSeat.arrHand, nAnimate, true)}</div>
    </section>
  `
}

function vRender(): void {
  const bShowDealer = bDealerRevealed()
  const nDealerUp = !bShowDealer && arrDealer.length >= 2 ? 1 : -1
  // Only animate when the dealer actually draws/reveals — not on every table re-render.
  const nDealerAnimate = sPhase === 'dealer' ? nDealerAnimatedIndex : -1

  if (objTable) {
    const objSeat = objVisibleSeat()
    const bTakeover = objSeat.sId !== sRenderedSeatId
    const sDealer = `
      <section class="fifteen-seat fifteen-dealer${sPhase === 'dealer' ? ' is-active' : ''}" aria-label="Dealer">
        <header class="fifteen-seat-head">
          <h3>Dealer</h3>
          <div class="fifteen-seat-meta" id="fifteen-dealer-meta">${sMetaMarkup(arrDealer, bShowDealer, nDealerUp)}</div>
        </header>
        <div class="fifteen-hand" id="fifteen-dealer-hand">${sHandMarkup(arrDealer, nDealerAnimate, bShowDealer, nDealerUp)}</div>
      </section>
    `
    objTable.innerHTML = sDealer + sSeatMarkup(objSeat, bTakeover)
    sRenderedSeatId = objSeat.sId
  }

  if (objStatus) {
    objStatus.textContent = sStatus
  }
  if (objSummary) {
    objSummary.textContent = sSummary
    objSummary.hidden = sSummary === ''
  }
  if (objRecord) {
    objRecord.textContent = `Wins ${nWins} · Losses ${nLosses}`
  }

  if (objRoot) {
    objRoot.classList.toggle('is-idle', sPhase === 'idle')
    objRoot.classList.toggle('is-ai', sPhase === 'ai')
    objRoot.classList.toggle('is-player', sPhase === 'player')
    objRoot.classList.toggle('is-dealer', sPhase === 'dealer')
    objRoot.classList.toggle('is-settled', sPhase === 'settled')
    objRoot.dataset.outcome = sOutcome ?? ''
  }

  vSetButtons()
}

function vSettleSeat(objSeat: tSeat, nDealer: number, bDealerBust: boolean): void {
  if (objSeat.arrHand.length === 0) {
    return
  }
  if (objSeat.sOutcome === 'lose' && bBust(objSeat.arrHand)) {
    return
  }
  if (objSeat.sOutcome === 'natural') {
    return
  }

  const nSeatTotal = nHandTotal(objSeat.arrHand)
  if (bBust(objSeat.arrHand)) {
    objSeat.sOutcome = 'lose'
    return
  }
  if (bDealerBust || nSeatTotal > nDealer) {
    objSeat.sOutcome = 'win'
    return
  }
  if (nSeatTotal < nDealer) {
    objSeat.sOutcome = 'lose'
    return
  }
  objSeat.sOutcome = 'push'
}

function sHumanResultMessage(): string {
  const objYou = objHuman()
  if (objYou.sOutcome === 'natural') {
    return 'Thirty-one! Natural.'
  }
  if (objYou.sOutcome === 'win') {
    if (bBust(arrDealer)) {
      return 'Dealer busts. You win.'
    }
    return `You ${nHandTotal(objYou.arrHand)} beats dealer. You win.`
  }
  if (objYou.sOutcome === 'push') {
    return `Push at ${nHandTotal(objYou.arrHand)}.`
  }
  if (objYou.sOutcome === 'lose') {
    if (bBust(objYou.arrHand)) {
      return `Bust at ${nHandTotal(objYou.arrHand)}. You lose.`
    }
    if (bNatural(arrDealer)) {
      return 'Dealer hits thirty-one. You lose.'
    }
    return `Dealer beats your ${nHandTotal(objYou.arrHand)}. You lose.`
  }
  return 'Hand complete.'
}

function sSeatSummaryPhrase(objSeat: tSeat): string {
  if (objSeat.arrHand.length === 0) {
    return ''
  }
  const nTotal = nHandTotal(objSeat.arrHand)
  if (objSeat.sOutcome === 'natural') {
    return `${objSeat.sName}: thirty-one`
  }
  if (objSeat.sOutcome === 'win') {
    return `${objSeat.sName}: ${nTotal} wins`
  }
  if (objSeat.sOutcome === 'push') {
    return `${objSeat.sName}: push at ${nTotal}`
  }
  if (objSeat.sOutcome === 'lose') {
    if (bBust(objSeat.arrHand)) {
      return `${objSeat.sName}: busts at ${nTotal}`
    }
    return `${objSeat.sName}: ${nTotal} loses`
  }
  return `${objSeat.sName}: ${nTotal}`
}

function sTableSummary(): string {
  const arrParts = arrBots()
    .map((objSeat) => sSeatSummaryPhrase(objSeat))
    .filter((sPart) => sPart !== '')
  if (arrParts.length === 0) {
    return ''
  }
  return `Table · ${arrParts.join(' · ')}`
}

function vSettleAll(sOverrideStatus?: string): void {
  const nDealer = nHandTotal(arrDealer)
  const bDealerBust = bBust(arrDealer)
  for (const objSeat of arrSeats) {
    vSettleSeat(objSeat, nDealer, bDealerBust)
  }

  const objYou = objHuman()
  sOutcome = objYou.sOutcome
  sPhase = 'settled'
  if (objYou.sOutcome === 'win' || objYou.sOutcome === 'natural') {
    nWins += 1
    vPersistRecord()
  } else if (objYou.sOutcome === 'lose') {
    nLosses += 1
    vPersistRecord()
  }
  sStatus = sOverrideStatus ?? sHumanResultMessage()
  sSummary = sTableSummary()
  sSeatAnimatedId = ''
  nSeatAnimatedIndex = -1
  vRender()
}

function vFinishDealer(): void {
  vSettleAll()
}

function vDealerStep(): void {
  nDealerTimer = 0
  if (sPhase !== 'dealer') {
    return
  }
  if (nHandTotal(arrDealer) >= nDealerStand) {
    vFinishDealer()
    return
  }

  const objCard = objDraw()
  arrDealer.push(objCard)
  nDealerAnimatedIndex = arrDealer.length - 1
  sStatus = `Dealer draws ${objCard.sName}…`
  vRender()
  nDealerTimer = window.setTimeout(vDealerStep, nDealerHitDelayMs)
}

function bAnyLiveForDealer(): boolean {
  return arrSeats.some(
    (objSeat) =>
      objSeat.arrHand.length > 0 &&
      !bBust(objSeat.arrHand) &&
      objSeat.sOutcome !== 'lose',
  )
}

function vDealerPlay(): void {
  vClearTimers()
  if (!bAnyLiveForDealer()) {
    vSettleAll()
    return
  }

  sPhase = 'dealer'
  nDealerAnimatedIndex = 0
  sSeatAnimatedId = ''
  nSeatAnimatedIndex = -1
  const objHole = arrDealer[0]
  sStatus = objHole ? `Dealer reveals ${objHole.sName}…` : 'Dealer plays…'
  vRender()
  nDealerTimer = window.setTimeout(vDealerStep, nDealerHitDelayMs)
}

function vStartPlayerTurn(): void {
  const objYou = objHuman()
  if (objYou.arrHand.length === 0) {
    vDealerPlay()
    return
  }
  if (bNatural(objYou.arrHand)) {
    objYou.sOutcome = 'natural'
    objYou.bFinished = true
    sStatus = 'You have thirty-one — dealer plays.'
    vRender()
    nAiTimer = window.setTimeout(vDealerPlay, nAiDelayMs)
    return
  }
  if (bBust(objYou.arrHand)) {
    objYou.sOutcome = 'lose'
    objYou.bFinished = true
    vDealerPlay()
    return
  }

  sPhase = 'player'
  sSeatAnimatedId = objYou.sId
  nSeatAnimatedIndex = -1
  sStatus = 'Your turn — hit or stand.'
  vRender()
}

function vAiFinishSeat(objSeat: tSeat): void {
  objSeat.bFinished = true
  if (bBust(objSeat.arrHand)) {
    objSeat.sOutcome = 'lose'
  } else if (bNatural(objSeat.arrHand)) {
    objSeat.sOutcome = 'natural'
  }
}

function vAiStep(): void {
  nAiTimer = 0
  if (sPhase !== 'ai') {
    return
  }

  const arrAi = arrBots()
  while (nAiSeat < arrAi.length) {
    const objSeat = arrAi[nAiSeat]!
    if (objSeat.arrHand.length === 0 || objSeat.bFinished) {
      nAiSeat += 1
      continue
    }
    if (bNatural(objSeat.arrHand) || bBust(objSeat.arrHand) || nHandTotal(objSeat.arrHand) >= objSeat.nStandAt) {
      vAiFinishSeat(objSeat)
      sStatus =
        bBust(objSeat.arrHand)
          ? `${objSeat.sName} busts.`
          : bNatural(objSeat.arrHand)
            ? `${objSeat.sName} hits thirty-one.`
            : `${objSeat.sName} stands at ${nHandTotal(objSeat.arrHand)}.`
      sSeatAnimatedId = objSeat.sId
      nSeatAnimatedIndex = -1
      vRender()
      nAiSeat += 1
      nAiTimer = window.setTimeout(vAiStep, nAiFinishDelayMs)
      return
    }

    const objCard = objDraw()
    objSeat.arrHand.push(objCard)
    sSeatAnimatedId = objSeat.sId
    nSeatAnimatedIndex = objSeat.arrHand.length - 1
    const nTotal = nHandTotal(objSeat.arrHand)
    const bFinished =
      bBust(objSeat.arrHand) || nTotal >= objSeat.nStandAt || nTotal === nTarget
    if (bFinished) {
      vAiFinishSeat(objSeat)
      sStatus = bBust(objSeat.arrHand)
        ? `${objSeat.sName} draws ${objCard.sName} and busts at ${nTotal}.`
        : nTotal === nTarget
          ? `${objSeat.sName} draws ${objCard.sName} and hits thirty-one.`
          : `${objSeat.sName} draws ${objCard.sName} and stands at ${nTotal}.`
    } else {
      sStatus = `${objSeat.sName} hits — ${objCard.sName}.`
    }
    vRender()
    if (bFinished) {
      nAiSeat += 1
    }
    nAiTimer = window.setTimeout(
      vAiStep,
      bFinished ? nAiFinishDelayMs : nAiDelayMs,
    )
    return
  }

  vStartPlayerTurn()
}

function vStartAiPlay(): void {
  sPhase = 'ai'
  nAiSeat = 0
  sSeatAnimatedId = ''
  nSeatAnimatedIndex = -1
  sStatus = 'Table plays…'
  vRender()
  nAiTimer = window.setTimeout(vAiStep, nAiDelayMs)
}

function vCheckDealerNatural(): boolean {
  if (!bNatural(arrDealer)) {
    return false
  }
  for (const objSeat of arrSeats) {
    if (objSeat.arrHand.length === 0) {
      continue
    }
    if (bNatural(objSeat.arrHand)) {
      objSeat.sOutcome = 'push'
    } else {
      objSeat.sOutcome = 'lose'
    }
  }
  sPhase = 'dealer'
  nDealerAnimatedIndex = -1
  vRender()
  vSettleAll(
    bNatural(objHuman().arrHand)
      ? 'Dealer thirty-one — push.'
      : 'Dealer hits thirty-one. You lose.',
  )
  return true
}

function vDealCards(): void {
  for (let nRound = 0; nRound < 2; nRound++) {
    for (const objSeat of arrSeats) {
      objSeat.arrHand.push(objDraw())
    }
    arrDealer.push(objDraw())
  }
}

function vDeal(): void {
  if (sPhase !== 'idle') {
    return
  }

  vDiscardHands()
  sOutcome = null
  sSummary = ''
  sSeatAnimatedId = ''
  nSeatAnimatedIndex = -1

  vDealCards()

  if (vCheckDealerNatural()) {
    return
  }

  for (const objSeat of arrSeats) {
    if (bNatural(objSeat.arrHand)) {
      objSeat.sOutcome = 'natural'
      objSeat.bFinished = true
    }
  }

  vStartAiPlay()
}

function vHit(): void {
  if (sPhase !== 'player') {
    return
  }

  const objYou = objHuman()
  const objCard = objDraw()
  objYou.arrHand.push(objCard)
  sSeatAnimatedId = objYou.sId
  nSeatAnimatedIndex = objYou.arrHand.length - 1
  const nTotal = nHandTotal(objYou.arrHand)

  if (bBust(objYou.arrHand)) {
    objYou.sOutcome = 'lose'
    objYou.bFinished = true
    sStatus = `Bust at ${nTotal}.`
    vRender()
    nAiTimer = window.setTimeout(vDealerPlay, nAiDelayMs)
    return
  }

  if (nTotal === nTarget) {
    objYou.bFinished = true
    sStatus = 'Thirty-one — standing.'
    vRender()
    nAiTimer = window.setTimeout(vDealerPlay, nAiDelayMs)
    return
  }

  sStatus = `Drew ${objCard.sName}. Total ${nTotal}.`
  vRender()
}

function vStand(): void {
  if (sPhase !== 'player') {
    return
  }
  objHuman().bFinished = true
  vDealerPlay()
}

function vAgain(): void {
  if (sPhase !== 'settled') {
    return
  }
  vClearTimers()
  sPhase = 'idle'
  vDeal()
}

function vOnClick(objEvent: MouseEvent): void {
  const objTarget = objEvent.target
  if (!(objTarget instanceof Element)) {
    return
  }
  const objBtn = objTarget.closest('button')
  if (!(objBtn instanceof HTMLButtonElement) || objBtn.disabled) {
    return
  }

  const sAction = objBtn.dataset.action
  if (sAction === 'deal') {
    vDeal()
    return
  }
  if (sAction === 'hit') {
    vHit()
    return
  }
  if (sAction === 'stand') {
    vStand()
    return
  }
  if (sAction === 'again') {
    vAgain()
  }
}

export function sFifteenMarkup(): string {
  return `
    <div class="fifteen" id="fifteen" data-outcome="">
      <div class="fifteen-bank">
        <span class="fifteen-bank-item">Target <code>11111</code> (31)</span>
        <span class="fifteen-bank-item">No stakes — just play</span>
      </div>

      <div class="fifteen-table" id="fifteen-table"></div>

      <p class="fifteen-status" id="fifteen-status" aria-live="polite">Deal a hand when ready.</p>
      <p class="fifteen-summary" id="fifteen-summary" hidden></p>

      <div class="fifteen-controls">
        <div class="fifteen-deal-row" id="fifteen-deal-row">
          <button type="button" class="reading-draw" data-action="deal">Deal</button>
        </div>
        <div class="fifteen-action-row" id="fifteen-action-row" hidden>
          <button type="button" class="reading-draw" data-action="hit">Hit</button>
          <button type="button" class="reading-draw fifteen-stand" data-action="stand">Stand</button>
          <button type="button" class="reading-draw" data-action="again" hidden>Next hand</button>
        </div>
      </div>

      <p class="fifteen-record" id="fifteen-record" aria-live="polite">Wins 0 · Losses 0</p>
    </div>
  `
}

export function vBindFifteen(arrCards: tFifteenSource[]): void {
  vClearTimers()
  arrSource = arrCards
  arrShoe = arrBuildShoe(arrCards)
  arrDiscard = []
  arrSeats = arrBuildSeats()
  arrDealer = []
  sPhase = 'idle'
  sOutcome = null
  nAiSeat = 0
  sSeatAnimatedId = ''
  nSeatAnimatedIndex = -1
  sRenderedSeatId = ''
  sStatus = 'Deal a hand when ready.'
  sSummary = ''

  const objSave = objLoadSave()
  nWins = objSave.nWins
  nLosses = objSave.nLosses

  objRoot = document.querySelector<HTMLElement>('#fifteen')
  objTable = document.querySelector<HTMLElement>('#fifteen-table')
  objStatus = document.querySelector<HTMLElement>('#fifteen-status')
  objSummary = document.querySelector<HTMLElement>('#fifteen-summary')
  objRecord = document.querySelector<HTMLElement>('#fifteen-record')
  objDealRow = document.querySelector<HTMLElement>('#fifteen-deal-row')
  objActionRow = document.querySelector<HTMLElement>('#fifteen-action-row')

  if (!objRoot) {
    return
  }

  if (!bBound) {
    objRoot.addEventListener('click', vOnClick)
    bBound = true
  }

  vRender()
}

export function vSetFifteenActive(_bNext: boolean): void {}
