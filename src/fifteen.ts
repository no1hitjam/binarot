import { sCardIconMarkup } from './cardIcons'

type tFifteenSource = {
  sName: string
  sBinaryValue: string
}

type tSuit = 'void' | 'signal' | 'mask' | 'state'

type tFifteenCard = {
  sName: string
  sBinaryValue: string
  sSuit: tSuit
  nValue: number
}

type tPhase = 'betting' | 'ai' | 'player' | 'dealer' | 'settled'

type tOutcome = 'win' | 'lose' | 'push' | 'natural' | null

type tSeat = {
  sId: string
  sName: string
  bHuman: boolean
  nStandAt: number
  arrHand: tFifteenCard[]
  nChips: number
  nBet: number
  sOutcome: tOutcome
  bFinished: boolean
}

const nTarget = 31
const nDealerStand = 24
const nStartChips = 100
const nDefaultBet = 10
const nMinShoe = 12
const nDealerHitDelayMs = 550
const nAiDelayMs = 480
const nAiFinishDelayMs = 3000
const arrSuits: tSuit[] = ['void', 'signal', 'mask', 'state']
const arrBetSteps = [5, 10, 25, 50]
const arrBotDefs = [
  { sId: 'bit', sName: 'Mr. Bit', nStandAt: 22 },
  { sId: 'nix', sName: 'Ms. Nix', nStandAt: 24 },
  { sId: 'lex', sName: 'Mrs. Lex', nStandAt: 26 },
]

let arrSource: tFifteenSource[] = []
let arrShoe: tFifteenCard[] = []
let arrDiscard: tFifteenCard[] = []
let arrSeats: tSeat[] = []
let arrDealer: tFifteenCard[] = []
let sPhase: tPhase = 'betting'
let sOutcome: tOutcome = null
let nPendingBet = nDefaultBet
let nAiSeat = 0
let nDealerTimer = 0
let nAiTimer = 0
let nDealerAnimatedIndex = -1
let sSeatAnimatedId = ''
let nSeatAnimatedIndex = -1
let sRenderedSeatId = ''
let sStatus = 'Place a bet, then deal.'
let bBound = false

let objRoot: HTMLElement | null = null
let objTable: HTMLElement | null = null
let objChips: HTMLElement | null = null
let objBetLabel: HTMLElement | null = null
let objStatus: HTMLElement | null = null
let objBetRow: HTMLElement | null = null
let objActionRow: HTMLElement | null = null

function objHuman(): tSeat {
  return arrSeats.find((objSeat) => objSeat.bHuman)!
}

function arrBots(): tSeat[] {
  return arrSeats.filter((objSeat) => !objSeat.bHuman)
}

function arrBuildSeats(): tSeat[] {
  const arrOut: tSeat[] = arrBotDefs.map((objBot) => ({
    sId: objBot.sId,
    sName: objBot.sName,
    bHuman: false,
    nStandAt: objBot.nStandAt,
    arrHand: [],
    nChips: nStartChips,
    nBet: 0,
    sOutcome: null,
    bFinished: false,
  }))
  arrOut.push({
    sId: 'you',
    sName: 'You',
    bHuman: true,
    nStandAt: nDealerStand,
    arrHand: [],
    nChips: nStartChips,
    nBet: 0,
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
      })
    }
  }
  return arrShuffled(arrBuilt)
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
    objSeat.nBet = 0
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
  return `
    <div class="fifteen-card suit-${objCard.sSuit}${bAnimate ? ' is-dealt' : ''}" title="${objCard.sName} (${objCard.sBinaryValue}) · ${objCard.sSuit}">
      ${sCardIconMarkup(objCard.sBinaryValue, 'fifteen-card-icon')}
      <span class="fifteen-card-name">${objCard.sName}</span>
      <span class="fifteen-card-binary">${objCard.sBinaryValue}</span>
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
      return `<span class="fifteen-total">up <code>${objUp.sBinaryValue}</code> (${objUp.nValue})</span>`
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

function nPickBotBet(objSeat: tSeat): number {
  const arrAffordable = arrBetSteps.filter((nStep) => nStep <= objSeat.nChips)
  if (arrAffordable.length === 0) {
    return 0
  }
  return arrAffordable[Math.floor(Math.random() * arrAffordable.length)]!
}

function vClampPendingBet(): void {
  const objYou = objHuman()
  if (objYou.nChips <= 0) {
    nPendingBet = 0
    return
  }
  if (nPendingBet < 1) {
    nPendingBet = Math.min(arrBetSteps[0]!, objYou.nChips)
  }
  if (nPendingBet > objYou.nChips) {
    nPendingBet = objYou.nChips
  }
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

  const objYou = objHuman()
  const arrBetBtns = Array.from(objRoot.querySelectorAll<HTMLButtonElement>('[data-bet]'))
  const objDeal = objRoot.querySelector<HTMLButtonElement>('[data-action="deal"]')
  const objHit = objRoot.querySelector<HTMLButtonElement>('[data-action="hit"]')
  const objStand = objRoot.querySelector<HTMLButtonElement>('[data-action="stand"]')
  const objAgain = objRoot.querySelector<HTMLButtonElement>('[data-action="again"]')

  const bBetting = sPhase === 'betting'
  const bPlayer = sPhase === 'player'
  const bSettled = sPhase === 'settled'

  if (objBetRow) {
    objBetRow.hidden = !bBetting
  }
  if (objActionRow) {
    objActionRow.hidden = !(bPlayer || bSettled)
  }

  for (const objBtn of arrBetBtns) {
    const nStep = Number(objBtn.dataset.bet)
    objBtn.disabled = !bBetting || nStep > objYou.nChips
    objBtn.classList.toggle('is-selected', bBetting && nStep === nPendingBet)
  }

  if (objDeal) {
    objDeal.disabled =
      !bBetting || nPendingBet < 1 || nPendingBet > objYou.nChips || objYou.nChips <= 0
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

function sSeatMarkup(objSeat: tSeat, bTakeover: boolean): string {
  const bActive =
    (sPhase === 'ai' && !objSeat.bHuman) ||
    (sPhase === 'player' && objSeat.bHuman)
  const bShowHand = sPhase !== 'betting'
  const nAnimate = sSeatAnimatedId === objSeat.sId ? nSeatAnimatedIndex : -1
  const sResult = sOutcomeLabel(objSeat.sOutcome)
  const sActive = bActive ? ' is-active' : ''
  const sYou = objSeat.bHuman ? ' is-you' : ''
  const sTakeover = bTakeover ? ' is-takeover' : ''
  const sOutClass = sResult ? ` is-${sResult}` : ''

  return `
    <section class="fifteen-seat fifteen-player-stage${sYou}${sActive}${sTakeover}${sOutClass}" data-seat="${objSeat.sId}" aria-label="${objSeat.sName}">
      <header class="fifteen-seat-head">
        <h3>${objSeat.sName}</h3>
        <div class="fifteen-seat-bank">
          <span>${objSeat.nChips} chips</span>
          <span>bet ${objSeat.nBet || (sPhase === 'betting' && objSeat.bHuman ? nPendingBet : 0)}</span>
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

  const objYou = objHuman()
  if (objChips) {
    objChips.textContent = String(objYou.nChips)
  }
  if (objBetLabel) {
    objBetLabel.textContent =
      sPhase === 'betting' ? String(nPendingBet) : String(objYou.nBet)
  }
  if (objStatus) {
    objStatus.textContent = sStatus
  }

  if (objRoot) {
    objRoot.classList.toggle('is-betting', sPhase === 'betting')
    objRoot.classList.toggle('is-ai', sPhase === 'ai')
    objRoot.classList.toggle('is-player', sPhase === 'player')
    objRoot.classList.toggle('is-dealer', sPhase === 'dealer')
    objRoot.classList.toggle('is-settled', sPhase === 'settled')
    objRoot.dataset.outcome = sOutcome ?? ''
  }

  vSetButtons()
}

function vApplyPayout(objSeat: tSeat, sResult: Exclude<tOutcome, null>): void {
  objSeat.sOutcome = sResult
  if (sResult === 'natural') {
    objSeat.nChips += objSeat.nBet + objSeat.nBet * 2
  } else if (sResult === 'win') {
    objSeat.nChips += objSeat.nBet * 2
  } else if (sResult === 'push') {
    objSeat.nChips += objSeat.nBet
  }
}

function vSettleSeat(objSeat: tSeat, nDealer: number, bDealerBust: boolean): void {
  if (objSeat.nBet <= 0 || objSeat.arrHand.length === 0) {
    return
  }
  if (objSeat.sOutcome === 'lose' && bBust(objSeat.arrHand)) {
    return
  }
  if (objSeat.sOutcome === 'natural') {
    vApplyPayout(objSeat, 'natural')
    return
  }

  const nSeatTotal = nHandTotal(objSeat.arrHand)
  if (bBust(objSeat.arrHand)) {
    objSeat.sOutcome = 'lose'
    return
  }
  if (bDealerBust || nSeatTotal > nDealer) {
    vApplyPayout(objSeat, 'win')
    return
  }
  if (nSeatTotal < nDealer) {
    objSeat.sOutcome = 'lose'
    return
  }
  vApplyPayout(objSeat, 'push')
}

function sHumanResultMessage(): string {
  const objYou = objHuman()
  const nBet = objYou.nBet
  if (objYou.sOutcome === 'natural') {
    return `Thirty-one! Natural pays 2:1 (+${nBet * 2}).`
  }
  if (objYou.sOutcome === 'win') {
    if (bBust(arrDealer)) {
      return `Dealer busts. You win ${nBet}.`
    }
    return `You ${nHandTotal(objYou.arrHand)} beats dealer. You win ${nBet}.`
  }
  if (objYou.sOutcome === 'push') {
    return `Push at ${nHandTotal(objYou.arrHand)}. Stake returned.`
  }
  if (objYou.sOutcome === 'lose') {
    if (bBust(objYou.arrHand)) {
      return `Bust at ${nHandTotal(objYou.arrHand)}. You lose ${nBet}.`
    }
    if (bNatural(arrDealer)) {
      return 'Dealer hits thirty-one. You lose.'
    }
    return `Dealer beats your ${nHandTotal(objYou.arrHand)}. You lose ${nBet}.`
  }
  return 'Hand complete.'
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
  sStatus = sOverrideStatus ?? sHumanResultMessage()
  for (const objSeat of arrSeats) {
    objSeat.nBet = 0
  }
  vClampPendingBet()
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
      objSeat.nBet > 0 &&
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
  if (objYou.nBet <= 0 || objYou.arrHand.length === 0) {
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
    if (objSeat.nBet <= 0 || objSeat.arrHand.length === 0 || objSeat.bFinished) {
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
    if (objSeat.nBet <= 0 || objSeat.arrHand.length === 0) {
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

function vPlaceBets(): boolean {
  vClampPendingBet()
  const objYou = objHuman()
  if (nPendingBet < 1 || nPendingBet > objYou.nChips) {
    sStatus = objYou.nChips <= 0 ? 'Bankroll empty — refresh to reset chips.' : 'Choose a valid bet.'
    vRender()
    return false
  }

  for (const objSeat of arrBots()) {
    const nBet = nPickBotBet(objSeat)
    objSeat.nBet = nBet
    objSeat.nChips -= nBet
  }

  objYou.nBet = nPendingBet
  objYou.nChips -= nPendingBet
  return true
}

function vDealCards(): void {
  const arrActive = arrSeats.filter((objSeat) => objSeat.nBet > 0)
  for (let nRound = 0; nRound < 2; nRound++) {
    for (const objSeat of arrActive) {
      objSeat.arrHand.push(objDraw())
    }
    arrDealer.push(objDraw())
  }
}

function vDeal(): void {
  if (sPhase !== 'betting') {
    return
  }

  vDiscardHands()
  sOutcome = null
  sSeatAnimatedId = ''
  nSeatAnimatedIndex = -1

  if (!vPlaceBets()) {
    return
  }

  vDealCards()

  if (vCheckDealerNatural()) {
    return
  }

  for (const objSeat of arrSeats) {
    if (objSeat.nBet > 0 && bNatural(objSeat.arrHand)) {
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
  vDiscardHands()
  sOutcome = null
  sPhase = 'betting'
  sSeatAnimatedId = ''
  nSeatAnimatedIndex = -1
  vClampPendingBet()
  const objYou = objHuman()
  sStatus =
    objYou.nChips <= 0
      ? 'Bankroll empty — refresh the page to reset chips.'
      : 'Place a bet, then deal.'
  vRender()
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

  const sBet = objBtn.dataset.bet
  if (sBet !== undefined) {
    nPendingBet = Number(sBet)
    vClampPendingBet()
    sStatus = `Bet set to ${nPendingBet}.`
    vRender()
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
  const sBetButtons = arrBetSteps
    .map(
      (nStep) =>
        `<button type="button" class="fifteen-chip" data-bet="${nStep}">${nStep}</button>`,
    )
    .join('')

  return `
    <div class="fifteen" id="fifteen" data-outcome="">
      <div class="fifteen-bank">
        <span class="fifteen-bank-item">Your chips <strong id="fifteen-chips">${nStartChips}</strong></span>
        <span class="fifteen-bank-item">Your bet <strong id="fifteen-bet">${nDefaultBet}</strong></span>
        <span class="fifteen-bank-item">Target <code>11111</code> (31)</span>
      </div>

      <div class="fifteen-table" id="fifteen-table"></div>

      <p class="fifteen-status" id="fifteen-status" aria-live="polite">Place a bet, then deal.</p>

      <div class="fifteen-controls">
        <div class="fifteen-bet-row" id="fifteen-bet-row">
          <span class="fifteen-bet-label">Bet</span>
          <div class="fifteen-chip-row">${sBetButtons}</div>
          <button type="button" class="reading-draw" data-action="deal">Deal</button>
        </div>
        <div class="fifteen-action-row" id="fifteen-action-row" hidden>
          <button type="button" class="reading-draw" data-action="hit">Hit</button>
          <button type="button" class="reading-draw fifteen-stand" data-action="stand">Stand</button>
          <button type="button" class="reading-draw" data-action="again" hidden>Next hand</button>
        </div>
      </div>
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
  sPhase = 'betting'
  sOutcome = null
  nPendingBet = nDefaultBet
  nAiSeat = 0
  sSeatAnimatedId = ''
  nSeatAnimatedIndex = -1
  sRenderedSeatId = ''
  sStatus = 'Place a bet, then deal.'

  objRoot = document.querySelector<HTMLElement>('#fifteen')
  objTable = document.querySelector<HTMLElement>('#fifteen-table')
  objChips = document.querySelector<HTMLElement>('#fifteen-chips')
  objBetLabel = document.querySelector<HTMLElement>('#fifteen-bet')
  objStatus = document.querySelector<HTMLElement>('#fifteen-status')
  objBetRow = document.querySelector<HTMLElement>('#fifteen-bet-row')
  objActionRow = document.querySelector<HTMLElement>('#fifteen-action-row')

  if (!objRoot) {
    return
  }

  if (!bBound) {
    objRoot.addEventListener('click', vOnClick)
    bBound = true
  }

  vClampPendingBet()
  vRender()
}

export function vSetFifteenActive(_bNext: boolean): void {}
