import { sCardIconMarkup } from './cardIcons'

type tPickupSource = {
  sName: string
  sBinaryValue: string
}

type tPhase = 'idle' | 'playing' | 'won'

type tTableCard = {
  sId: string
  sName: string
  sBinaryValue: string
  nValue: number
  nLeft: number
  nTop: number
  nRotate: number
  nZ: number
  bPicked: boolean
}

type tPickupSave = {
  nBestMs: number
}

const nCardCount = 16
const nScatterStaggerMs = 28
const nPadX = 8
const nPadY = 10
const nCardWPct = 14
const nCardHPct = 22
const nDragThresholdPx = 8
const nMaxZ = 80
const nWrongFlashMs = 220
const sStorageKey = 'binarot_pickup'

let arrSource: tPickupSource[] = []
let arrTable: tTableCard[] = []
let arrPicked: tTableCard[] = []
let sPhase: tPhase = 'idle'
let nNextValue = 0
let nStartMs = 0
let nElapsedMs = 0
let nTickTimer = 0
let nWrongTimer = 0
let sWrongId = ''
let nBestMs = 0
let nDealToken = 0
let nTopZ = nCardCount
let bBound = false

type tDrag = {
  sCardId: string
  objEl: HTMLElement
  nPointerId: number
  nOriginLeft: number
  nOriginTop: number
  nOriginX: number
  nOriginY: number
  nFeltW: number
  nFeltH: number
  bMoved: boolean
}

let objDrag: tDrag | null = null

let objRoot: HTMLElement | null = null
let objFelt: HTMLElement | null = null
let objTray: HTMLElement | null = null
let objStatus: HTMLElement | null = null
let objMeta: HTMLElement | null = null
let objRecord: HTMLElement | null = null
let objScatterRow: HTMLElement | null = null
let objAgainRow: HTMLElement | null = null

function nClamp(nValue: number, nMin: number, nMax: number): number {
  return Math.min(nMax, Math.max(nMin, nValue))
}

function nCardValue(sBinaryValue: string): number {
  return parseInt(sBinaryValue, 2)
}

function sNextBinary(): string {
  return nNextValue.toString(2)
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

function nRand(nMin: number, nMax: number): number {
  return nMin + Math.random() * (nMax - nMin)
}

function objLoadSave(): tPickupSave {
  try {
    const sRaw = localStorage.getItem(sStorageKey)
    if (!sRaw) {
      return { nBestMs: 0 }
    }
    const objParsed = JSON.parse(sRaw) as Partial<tPickupSave>
    return {
      nBestMs:
        typeof objParsed.nBestMs === 'number' && objParsed.nBestMs > 0
          ? Math.floor(objParsed.nBestMs)
          : 0,
    }
  } catch {
    return { nBestMs: 0 }
  }
}

function vPersistRecord(): void {
  const objSave: tPickupSave = { nBestMs }
  localStorage.setItem(sStorageKey, JSON.stringify(objSave))
}

function sFormatMs(nMs: number): string {
  const nTotal = Math.max(0, Math.floor(nMs))
  const nSec = Math.floor(nTotal / 1000)
  const nMin = Math.floor(nSec / 60)
  const nRem = nSec % 60
  const nHundredths = Math.floor((nTotal % 1000) / 10)
  if (nMin <= 0) {
    return `${nRem}.${nHundredths.toString().padStart(2, '0')}s`
  }
  return `${nMin}:${nRem.toString().padStart(2, '0')}.${nHundredths.toString().padStart(2, '0')}`
}

function vClearTimers(): void {
  if (nTickTimer !== 0) {
    window.clearInterval(nTickTimer)
    nTickTimer = 0
  }
  if (nWrongTimer !== 0) {
    window.clearTimeout(nWrongTimer)
    nWrongTimer = 0
  }
}

function vStopClock(): void {
  if (nTickTimer !== 0) {
    window.clearInterval(nTickTimer)
    nTickTimer = 0
  }
}

function vStartClock(): void {
  vStopClock()
  nStartMs = performance.now()
  nElapsedMs = 0
  nTickTimer = window.setInterval(() => {
    if (sPhase !== 'playing') {
      return
    }
    nElapsedMs = performance.now() - nStartMs
    vRenderMeta()
  }, 50)
}

function nRemaining(): number {
  return arrTable.reduce((nSum, objCard) => nSum + (objCard.bPicked ? 0 : 1), 0)
}

function arrBuildScatter(arrCards: tPickupSource[]): tTableCard[] {
  const arrDeal = arrShuffled(arrCards.slice())
  const nMaxLeft = 100 - nCardWPct - nPadX
  const nMaxTop = 100 - nCardHPct - nPadY
  nTopZ = nCardCount
  return arrDeal.map((objCard, nIndex) => ({
    sId: `pickup-${nIndex}-${objCard.sBinaryValue}`,
    sName: objCard.sName,
    sBinaryValue: objCard.sBinaryValue,
    nValue: nCardValue(objCard.sBinaryValue),
    nLeft: nRand(nPadX, nMaxLeft),
    nTop: nRand(nPadY, nMaxTop),
    nRotate: nRand(-28, 28),
    nZ: nIndex + 1,
    bPicked: false,
  }))
}

function sTableCardMarkup(objCard: tTableCard, bScatter: boolean): string {
  const sScatter = bScatter ? ' is-scatter' : ''
  const sWrong = objCard.sId === sWrongId ? ' is-wrong' : ''
  return `
    <button
      type="button"
      class="pickup-card is-face-up${sScatter}${sWrong}"
      data-card-id="${objCard.sId}"
      style="left:${objCard.nLeft}%;top:${objCard.nTop}%;--pickup-rot:${objCard.nRotate}deg;z-index:${objCard.nZ}"
      title="${objCard.sName} (${objCard.sBinaryValue})"
      aria-label="Pick up or drag ${objCard.sName}"
    >
      <span class="pickup-card-face">
        ${sCardIconMarkup(objCard.sBinaryValue, 'pickup-card-icon')}
        <span class="pickup-card-name">${objCard.sName}</span>
        <span class="pickup-card-binary">${objCard.sBinaryValue}</span>
      </span>
    </button>
  `
}

function sTrayCardMarkup(objCard: tTableCard): string {
  return `
    <div class="pickup-tray-card" title="${objCard.sName} (${objCard.sBinaryValue})">
      ${sCardIconMarkup(objCard.sBinaryValue, 'pickup-tray-icon')}
      <span class="pickup-tray-binary">${objCard.sBinaryValue}</span>
    </div>
  `
}

function vRenderMeta(): void {
  if (objMeta) {
    const sNext =
      sPhase === 'playing'
        ? `Next <code>${sNextBinary()}</code>`
        : sPhase === 'won'
          ? 'Cleared'
          : 'Ready'
    objMeta.innerHTML = `
      <span class="pickup-meta-item">${sNext}</span>
      <span class="pickup-meta-item">Left ${nRemaining()}</span>
      <span class="pickup-meta-item">Time ${sFormatMs(nElapsedMs)}</span>
    `
  }

  if (objRecord) {
    if (nBestMs > 0) {
      objRecord.textContent = `Best ${sFormatMs(nBestMs)}`
    } else {
      objRecord.textContent = 'No best time yet'
    }
  }
}

function vSetButtons(): void {
  if (objScatterRow) {
    objScatterRow.hidden = sPhase === 'playing'
  }
  if (objAgainRow) {
    objAgainRow.hidden = sPhase !== 'won'
  }
  if (!objRoot) {
    return
  }
  const objScatter = objRoot.querySelector<HTMLButtonElement>('[data-action="scatter"]')
  const objAgain = objRoot.querySelector<HTMLButtonElement>('[data-action="again"]')
  if (objScatter) {
    objScatter.disabled = sPhase === 'playing'
  }
  if (objAgain) {
    objAgain.disabled = sPhase !== 'won'
  }
}

function vRender(bScatterAnim: boolean = false): void {
  if (objFelt) {
    const arrLive = arrTable.filter((objCard) => !objCard.bPicked)
    objFelt.innerHTML =
      arrLive.length === 0 && sPhase === 'idle'
        ? '<p class="pickup-empty">Scatter the deck across the table.</p>'
        : arrLive.map((objCard) => sTableCardMarkup(objCard, bScatterAnim)).join('')
  }

  if (objTray) {
    objTray.innerHTML =
      arrPicked.length === 0
        ? '<p class="pickup-tray-empty">Picked cards land here in binary order.</p>'
        : arrPicked.map((objCard) => sTrayCardMarkup(objCard)).join('')
  }

  if (objStatus) {
    if (sPhase === 'idle') {
      objStatus.textContent = 'Scatter the cards, then pick them up from 0 to 1111.'
    } else if (sPhase === 'playing') {
      objStatus.textContent =
        sWrongId !== ''
          ? `Not next — find ${sNextBinary()}.`
          : `Find ${sNextBinary()}.`
    } else {
      objStatus.textContent = `Cleared in ${sFormatMs(nElapsedMs)}.`
    }
  }

  if (objRoot) {
    objRoot.classList.toggle('is-idle', sPhase === 'idle')
    objRoot.classList.toggle('is-playing', sPhase === 'playing')
    objRoot.classList.toggle('is-won', sPhase === 'won')
  }

  vRenderMeta()
  vSetButtons()
}

function vWin(): void {
  vStopClock()
  nElapsedMs = performance.now() - nStartMs
  sPhase = 'won'
  sWrongId = ''
  if (nBestMs === 0 || nElapsedMs < nBestMs) {
    nBestMs = Math.floor(nElapsedMs)
    vPersistRecord()
  }
  vRender()
}

function vFlashWrong(objCard: tTableCard): void {
  if (nWrongTimer !== 0) {
    window.clearTimeout(nWrongTimer)
    nWrongTimer = 0
  }
  sWrongId = objCard.sId
  if (objStatus) {
    objStatus.textContent = `Not next — find ${sNextBinary()}.`
  }
  const objEl = objFelt?.querySelector<HTMLElement>(`[data-card-id="${objCard.sId}"]`)
  if (objEl) {
    objEl.classList.remove('is-wrong')
    // Retrigger CSS animation.
    void objEl.offsetWidth
    objEl.classList.add('is-wrong')
  }
  nWrongTimer = window.setTimeout(() => {
    nWrongTimer = 0
    sWrongId = ''
    if (objEl) {
      objEl.classList.remove('is-wrong')
    }
    if (sPhase === 'playing' && objStatus) {
      objStatus.textContent = `Find ${sNextBinary()}.`
    }
  }, nWrongFlashMs)
}

function vPickCard(objCard: tTableCard): void {
  if (sPhase !== 'playing' || objCard.bPicked) {
    return
  }

  if (objCard.nValue !== nNextValue) {
    vFlashWrong(objCard)
    return
  }

  sWrongId = ''
  if (nWrongTimer !== 0) {
    window.clearTimeout(nWrongTimer)
    nWrongTimer = 0
  }

  objCard.bPicked = true
  objCard.nZ = 40 + arrPicked.length
  arrPicked.push(objCard)
  nNextValue += 1

  if (nNextValue >= nCardCount) {
    vWin()
    return
  }

  vRender()
}

function vEndDrag(bCancel: boolean = false): void {
  if (!objDrag) {
    return
  }
  const objActive = objDrag
  objDrag = null
  objActive.objEl.classList.remove('is-dragging')
  try {
    objActive.objEl.releasePointerCapture(objActive.nPointerId)
  } catch {
    // Capture may already be released.
  }
  if (bCancel || objActive.bMoved) {
    return
  }
  const objCard = arrTable.find((objItem) => objItem.sId === objActive.sCardId)
  if (!objCard || objCard.bPicked) {
    return
  }
  vPickCard(objCard)
}

function vOnPointerDown(objEvent: PointerEvent): void {
  if (sPhase !== 'playing' || !objFelt || objDrag) {
    return
  }
  if (objEvent.button !== 0 && objEvent.pointerType === 'mouse') {
    return
  }

  const objTarget = objEvent.target
  if (!(objTarget instanceof Element)) {
    return
  }
  const objEl = objTarget.closest<HTMLElement>('.pickup-card')
  if (!objEl || !objFelt.contains(objEl)) {
    return
  }

  const sCardId = objEl.dataset.cardId
  if (!sCardId) {
    return
  }
  const objCard = arrTable.find((objItem) => objItem.sId === sCardId)
  if (!objCard || objCard.bPicked) {
    return
  }

  objEvent.preventDefault()
  nTopZ = Math.min(nMaxZ, nTopZ + 1)
  objCard.nZ = nTopZ
  objEl.style.zIndex = String(objCard.nZ)
  objEl.classList.add('is-dragging')
  objEl.classList.remove('is-scatter')

  const objFeltRect = objFelt.getBoundingClientRect()
  objDrag = {
    sCardId,
    objEl,
    nPointerId: objEvent.pointerId,
    nOriginLeft: objCard.nLeft,
    nOriginTop: objCard.nTop,
    nOriginX: objEvent.clientX,
    nOriginY: objEvent.clientY,
    nFeltW: Math.max(1, objFeltRect.width),
    nFeltH: Math.max(1, objFeltRect.height),
    bMoved: false,
  }

  try {
    objEl.setPointerCapture(objEvent.pointerId)
  } catch {
    // Some browsers reject capture on buttons; window listeners still work.
  }
}

function vOnPointerMove(objEvent: PointerEvent): void {
  if (!objDrag || objEvent.pointerId !== objDrag.nPointerId) {
    return
  }

  const nDx = objEvent.clientX - objDrag.nOriginX
  const nDy = objEvent.clientY - objDrag.nOriginY
  if (!objDrag.bMoved && nDx * nDx + nDy * nDy >= nDragThresholdPx * nDragThresholdPx) {
    objDrag.bMoved = true
  }

  const objCard = arrTable.find((objItem) => objItem.sId === objDrag!.sCardId)
  if (!objCard) {
    return
  }

  const nMaxLeft = 100 - nCardWPct - nPadX
  const nMaxTop = 100 - nCardHPct - nPadY
  objCard.nLeft = nClamp(objDrag.nOriginLeft + (nDx / objDrag.nFeltW) * 100, nPadX * 0.25, nMaxLeft)
  objCard.nTop = nClamp(objDrag.nOriginTop + (nDy / objDrag.nFeltH) * 100, nPadY * 0.25, nMaxTop)
  objDrag.objEl.style.left = `${objCard.nLeft}%`
  objDrag.objEl.style.top = `${objCard.nTop}%`
}

function vOnPointerUp(objEvent: PointerEvent): void {
  if (!objDrag || objEvent.pointerId !== objDrag.nPointerId) {
    return
  }
  vEndDrag(false)
}

function vOnPointerCancel(objEvent: PointerEvent): void {
  if (!objDrag || objEvent.pointerId !== objDrag.nPointerId) {
    return
  }
  vEndDrag(true)
}

function vScatter(): void {
  vEndDrag(true)
  vClearTimers()
  nDealToken += 1
  arrTable = arrBuildScatter(arrSource)
  arrPicked = []
  nNextValue = 0
  nElapsedMs = 0
  sWrongId = ''
  sPhase = 'playing'
  vRender(true)
  vStartClock()

  const nToken = nDealToken
  window.setTimeout(
    () => {
      if (nToken !== nDealToken || !objFelt) {
        return
      }
      objFelt.querySelectorAll('.pickup-card.is-scatter').forEach((objEl) => {
        objEl.classList.remove('is-scatter')
      })
    },
    nCardCount * nScatterStaggerMs + 420,
  )
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
  if (sAction === 'scatter' || sAction === 'again') {
    vScatter()
  }
}

export function sPickupMarkup(): string {
  return `
    <div class="pickup" id="pickup">
      <div class="pickup-bank">
        <span class="pickup-bank-item">Pick up <code>0</code> → <code>1111</code></span>
        <span class="pickup-bank-item">Click to pick · drag to move</span>
      </div>

      <div class="pickup-meta" id="pickup-meta" aria-live="polite"></div>

      <div class="pickup-felt" id="pickup-felt" aria-label="Card table"></div>

      <div class="pickup-tray" id="pickup-tray" aria-label="Picked cards"></div>

      <p class="pickup-status" id="pickup-status" aria-live="polite">Scatter the cards, then pick them up from 0 to 1111.</p>

      <div class="pickup-controls">
        <div class="pickup-scatter-row" id="pickup-scatter-row">
          <button type="button" class="reading-draw" data-action="scatter">Scatter</button>
        </div>
        <div class="pickup-again-row" id="pickup-again-row" hidden>
          <button type="button" class="reading-draw" data-action="again">Scatter again</button>
        </div>
      </div>

      <p class="pickup-record" id="pickup-record" aria-live="polite">No best time yet</p>
    </div>
  `
}

export function vBindPickup(arrCards: tPickupSource[]): void {
  vEndDrag(true)
  vClearTimers()
  arrSource = arrCards.slice(0, nCardCount)
  arrTable = []
  arrPicked = []
  sPhase = 'idle'
  nNextValue = 0
  nElapsedMs = 0
  sWrongId = ''

  const objSave = objLoadSave()
  nBestMs = objSave.nBestMs

  objRoot = document.querySelector<HTMLElement>('#pickup')
  objFelt = document.querySelector<HTMLElement>('#pickup-felt')
  objTray = document.querySelector<HTMLElement>('#pickup-tray')
  objStatus = document.querySelector<HTMLElement>('#pickup-status')
  objMeta = document.querySelector<HTMLElement>('#pickup-meta')
  objRecord = document.querySelector<HTMLElement>('#pickup-record')
  objScatterRow = document.querySelector<HTMLElement>('#pickup-scatter-row')
  objAgainRow = document.querySelector<HTMLElement>('#pickup-again-row')

  if (!objRoot) {
    return
  }

  if (!bBound) {
    objRoot.addEventListener('click', vOnClick)
    objRoot.addEventListener('pointerdown', vOnPointerDown)
    window.addEventListener('pointermove', vOnPointerMove)
    window.addEventListener('pointerup', vOnPointerUp)
    window.addEventListener('pointercancel', vOnPointerCancel)
    bBound = true
  }

  vRender()
}

export function vSetPickupActive(bNext: boolean): void {
  if (!bNext) {
    vEndDrag(true)
    vStopClock()
    if (sPhase === 'playing' && nStartMs > 0) {
      nElapsedMs = performance.now() - nStartMs
    }
    return
  }
  if (sPhase === 'playing') {
    nStartMs = performance.now() - nElapsedMs
    vStartClock()
  }
}
