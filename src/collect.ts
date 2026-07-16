import { sCardIconMarkup } from './cardIcons'
import {
  nRollCardTint,
  nStandardTint,
  objCardTint,
  sTintAmbianceMarkup,
  sTintCardNameMarkup,
  sTintCssVars,
} from './cardTints'
import { nCollectionPacksOpened, vRecordPackOpen, type tPackPull } from './collection'

type tCollectCard = {
  sName: string
  sBinaryValue: string
  sMeaning: string
}

const nPackSize = 5
const nRevealStaggerMs = 140
const nFlipMs = 320
const nPackExitMs = 200

type tCollectPhase = 'idle' | 'opening' | 'revealed'

let arrBoundCards: tCollectCard[] = []
let sPhase: tCollectPhase = 'idle'
let nRevealTimer = 0
let bCollectActive = false
let bOpenButtonLastClicked = false

let objPack: HTMLElement | null = null
let objSlots: HTMLElement | null = null
let objOpenButton: HTMLButtonElement | null = null
let objStatus: HTMLElement | null = null

function nPacksOpened(): number {
  return nCollectionPacksOpened()
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

function arrDrawPack(arrCards: tCollectCard[]): tPackPull[] {
  return arrShuffled(arrCards)
    .slice(0, nPackSize)
    .map((objCard) => ({
      sName: objCard.sName,
      sBinaryValue: objCard.sBinaryValue,
      sMeaning: objCard.sMeaning,
      nTint: nRollCardTint(),
    }))
}

function sCollectCardMarkup(objPull: tPackPull, nSlot: number): string {
  const objTint = objCardTint(objPull.nTint)
  const bRare = objPull.nTint !== nStandardTint
  const sAriaTint = bRare ? `, ${objTint.sName}` : ''

  return `
    <a
      class="collect-card${bRare ? ' is-rare' : ''}"
      href="#card/${objPull.sBinaryValue}"
      data-slot="${nSlot}"
      data-tint="${objPull.nTint}"
      data-tint-id="${objTint.sId}"
      style="${sTintCssVars(objTint, objPull.sBinaryValue)}"
      aria-label="${objPull.sName} (${objPull.sBinaryValue})${sAriaTint}"
    >
      <div class="collect-card-inner">
        <div class="collect-card-face collect-card-back" aria-hidden="true">
          <div class="collect-card-back-mark">
            <span>0</span>
            <span>1</span>
          </div>
        </div>
        <div class="collect-card-face collect-card-front">
          ${sTintAmbianceMarkup(objTint)}
          ${sCardIconMarkup(objPull.sBinaryValue, 'collect-card-icon')}
          ${sTintCardNameMarkup(objPull.sName, objTint)}
          <span class="collect-card-binary">${objPull.sBinaryValue}</span>
          <p class="collect-card-meaning">${objPull.sMeaning}</p>
        </div>
      </div>
    </a>
  `
}

function vClearRevealTimer(): void {
  if (nRevealTimer !== 0) {
    window.clearTimeout(nRevealTimer)
    nRevealTimer = 0
  }
}

function vSetStatus(sText: string): void {
  if (objStatus) {
    objStatus.textContent = sText
  }
}

function vSetButton(sLabel: string, bDisabled: boolean): void {
  if (!objOpenButton) {
    return
  }
  objOpenButton.textContent = sLabel
  objOpenButton.disabled = bDisabled
}

function vResetSlots(): void {
  if (!objSlots) {
    return
  }
  objSlots.innerHTML = ''
  objSlots.classList.remove('is-visible')
}

function vShowPack(bShow: boolean): void {
  if (!objPack) {
    return
  }
  objPack.classList.toggle('is-hidden', !bShow)
  objPack.classList.toggle('is-opening', false)
  objPack.setAttribute('aria-hidden', String(!bShow))
}

function vRevealCards(arrPack: tPackPull[]): void {
  if (!objSlots) {
    return
  }

  objSlots.innerHTML = arrPack.map((objPull, nSlot) => sCollectCardMarkup(objPull, nSlot)).join('')
  objSlots.classList.add('is-visible')

  const arrCardEls = Array.from(objSlots.querySelectorAll<HTMLElement>('.collect-card'))

  arrCardEls.forEach((objCardEl, nSlot) => {
    nRevealTimer = window.setTimeout(() => {
      objCardEl.classList.add('is-dealt')
      nRevealTimer = window.setTimeout(() => {
        objCardEl.classList.add('is-flipped')
        if (nSlot === arrPack.length - 1) {
          sPhase = 'revealed'
          vRecordPackOpen(arrPack)
          const nOpened = nPacksOpened()
          vSetButton('Open another pack', false)
          vSetStatus(nOpened === 1 ? '1 pack opened' : `${nOpened} packs opened`)
        }
      }, nFlipMs * 0.15)
    }, nSlot * nRevealStaggerMs)
  })
}

function vOpenPack(): void {
  if (sPhase === 'opening' || arrBoundCards.length < nPackSize) {
    return
  }

  vClearRevealTimer()
  sPhase = 'opening'
  vSetButton('Opening…', true)
  vSetStatus('Drawing five…')
  vResetSlots()

  const arrPack = arrDrawPack(arrBoundCards)
  const bPackVisible = Boolean(objPack && !objPack.classList.contains('is-hidden'))

  if (!bPackVisible && objPack) {
    vShowPack(true)
    nRevealTimer = window.setTimeout(() => {
      objPack!.classList.add('is-opening')
      nRevealTimer = window.setTimeout(() => {
        vShowPack(false)
        vRevealCards(arrPack)
      }, nPackExitMs)
    }, 80)
    return
  }

  if (bPackVisible) {
    objPack!.classList.add('is-opening')
    nRevealTimer = window.setTimeout(() => {
      vShowPack(false)
      vRevealCards(arrPack)
    }, nPackExitMs)
    return
  }

  vShowPack(false)
  vRevealCards(arrPack)
}

export function sCollectMarkup(): string {
  return `
    <div class="collect" id="collect">
      <div class="collect-stage">
        <div class="collect-pack" id="collect-pack" aria-hidden="false">
          <div class="collect-pack-sleeve">
            <span class="collect-pack-brand">Binarot</span>
            <span class="collect-pack-mark" aria-hidden="true">
              <span>0</span>
              <span>1</span>
            </span>
            <span class="collect-pack-count">${nPackSize} cards</span>
          </div>
        </div>
        <div class="collect-slots" id="collect-slots" aria-live="polite"></div>
      </div>
      <div class="collect-controls">
        <button type="button" class="reading-draw" id="collect-open">Open pack</button>
        <p class="collect-status" id="collect-status">Five cards to a pack</p>
      </div>
    </div>
  `
}

export function vBindCollect(arrCards: tCollectCard[]): void {
  arrBoundCards = arrCards
  objPack = document.querySelector<HTMLElement>('#collect-pack')
  objSlots = document.querySelector<HTMLElement>('#collect-slots')
  objOpenButton = document.querySelector<HTMLButtonElement>('#collect-open')
  objStatus = document.querySelector<HTMLElement>('#collect-status')

  if (!objOpenButton) {
    return
  }

  objOpenButton.addEventListener('click', () => {
    bOpenButtonLastClicked = true
    vOpenPack()
  })

  document.addEventListener(
    'click',
    (objEvent) => {
      const objTarget = objEvent.target
      if (!(objTarget instanceof Node) || !objOpenButton) {
        return
      }
      bOpenButtonLastClicked = objOpenButton === objTarget || objOpenButton.contains(objTarget)
    },
    true,
  )

  window.addEventListener('keydown', (objEvent) => {
    if (objEvent.key !== ' ' && objEvent.code !== 'Space') {
      return
    }
    if (!bCollectActive || !bOpenButtonLastClicked || !objOpenButton || objOpenButton.disabled) {
      return
    }
    const objActive = document.activeElement
    if (
      objActive instanceof HTMLElement &&
      (objActive.tagName === 'INPUT' ||
        objActive.tagName === 'TEXTAREA' ||
        objActive.tagName === 'SELECT' ||
        objActive.isContentEditable)
    ) {
      return
    }
    if (objActive === objOpenButton) {
      return
    }
    objEvent.preventDefault()
    vOpenPack()
  })
}

export function vSetCollectActive(bActive: boolean): void {
  bCollectActive = bActive
  if (!bActive) {
    return
  }
  if (sPhase === 'idle') {
    vClearRevealTimer()
    vResetSlots()
    vShowPack(true)
    vSetButton('Open pack', false)
    const nOpened = nPacksOpened()
    vSetStatus(
      nOpened === 0
        ? 'Five cards to a pack'
        : nOpened === 1
          ? '1 pack opened · ready for another'
          : `${nOpened} packs opened · ready for another`,
    )
  }
}
