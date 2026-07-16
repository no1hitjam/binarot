import { sCardIconMarkup } from './cardIcons'
import {
  nMigrateLegacyTint,
  nStandardTint,
  nTintCount,
  objCardTint,
  objParseOwnedVariantKey,
  sOwnedVariantKey,
  sTintAmbianceMarkup,
  sTintCssVars,
} from './cardTints'

type tCollectionCard = {
  sName: string
  sBinaryValue: string
  sMeaning: string
}

export type tPackPull = {
  sName: string
  sBinaryValue: string
  sMeaning: string
  nTint: number
}

type tCollectionSave = {
  arrOwned: string[]
  nPacksOpened: number
  nTintScheme?: number
}

const sStorageKey = 'binarot_collection'
/** Saves without this (or older than 3) need tint-index migration (Copper / Crimson / Teal removals). */
const nTintSchemeCurrent = 3
/** When true, Collection shows every card/tint as owned (does not write to storage). */
const bDevShowAllCollection = true

let arrBoundCards: tCollectionCard[] = []
let setOwned = new Set<string>()
let nPacksOpenedSaved = 0
let nPageTint = nStandardTint
let objRoot: HTMLElement | null = null
let objGrid: HTMLElement | null = null
let objProgress: HTMLElement | null = null
let objPageLabel: HTMLElement | null = null
let objPageMeta: HTMLElement | null = null
let objPrevButton: HTMLButtonElement | null = null
let objNextButton: HTMLButtonElement | null = null

function bOwnsVariant(sBinaryValue: string, nTint: number): boolean {
  return bDevShowAllCollection || setOwned.has(sOwnedVariantKey(sBinaryValue, nTint))
}

function objLoadSave(): tCollectionSave {
  try {
    const sRaw = localStorage.getItem(sStorageKey)
    if (!sRaw) {
      return { arrOwned: [], nPacksOpened: 0, nTintScheme: nTintSchemeCurrent }
    }
    const objParsed = JSON.parse(sRaw) as Partial<tCollectionSave>
    const arrRaw = Array.isArray(objParsed.arrOwned)
      ? objParsed.arrOwned.filter((sValue): sValue is string => typeof sValue === 'string')
      : []
    const nFromScheme =
      typeof objParsed.nTintScheme === 'number' ? objParsed.nTintScheme : 1
    const bLegacy = nFromScheme !== nTintSchemeCurrent
    const arrOwned: string[] = []
    for (const sKey of arrRaw) {
      const nColon = sKey.lastIndexOf(':')
      if (nColon <= 0) {
        const objLegacy = objParseOwnedVariantKey(sKey)
        if (objLegacy) {
          arrOwned.push(sOwnedVariantKey(objLegacy.sBinaryValue, objLegacy.nTint))
        }
        continue
      }
      const sBinaryValue = sKey.slice(0, nColon)
      const nTintRaw = Number(sKey.slice(nColon + 1))
      if (!sBinaryValue || !Number.isInteger(nTintRaw) || nTintRaw < 0) {
        continue
      }
      const nTint = bLegacy ? nMigrateLegacyTint(nTintRaw, nFromScheme) : nTintRaw
      if (nTint === null || nTint >= nTintCount) {
        continue
      }
      arrOwned.push(sOwnedVariantKey(sBinaryValue, nTint))
    }
    const nPacksOpened =
      typeof objParsed.nPacksOpened === 'number' && objParsed.nPacksOpened >= 0
        ? Math.floor(objParsed.nPacksOpened)
        : 0
    return { arrOwned, nPacksOpened, nTintScheme: nTintSchemeCurrent }
  } catch {
    return { arrOwned: [], nPacksOpened: 0, nTintScheme: nTintSchemeCurrent }
  }
}

function vPersist(): void {
  const objSave: tCollectionSave = {
    arrOwned: Array.from(setOwned),
    nPacksOpened: nPacksOpenedSaved,
    nTintScheme: nTintSchemeCurrent,
  }
  localStorage.setItem(sStorageKey, JSON.stringify(objSave))
}

function vHydrateFromStorage(): void {
  const objSave = objLoadSave()
  setOwned = new Set(objSave.arrOwned)
  nPacksOpenedSaved = objSave.nPacksOpened
  vPersist()
}

export function nCollectionPacksOpened(): number {
  return nPacksOpenedSaved
}

export function nCollectionOwnedCount(): number {
  return setOwned.size
}

export function nCollectionTotalCount(): number {
  return arrBoundCards.length * nTintCount
}

export function bCollectionOwns(sBinaryValue: string, nTint: number = nStandardTint): boolean {
  return bOwnsVariant(sBinaryValue, nTint)
}

function nOwnedOnTint(nTint: number): number {
  if (bDevShowAllCollection) {
    return arrBoundCards.length
  }
  let nCount = 0
  for (const objCard of arrBoundCards) {
    if (setOwned.has(sOwnedVariantKey(objCard.sBinaryValue, nTint))) {
      nCount += 1
    }
  }
  return nCount
}

export function vRecordPackOpen(arrPulls: tPackPull[]): void {
  let bChanged = false
  for (const objPull of arrPulls) {
    const sKey = sOwnedVariantKey(objPull.sBinaryValue, objPull.nTint)
    if (!setOwned.has(sKey)) {
      setOwned.add(sKey)
      bChanged = true
    }
  }
  nPacksOpenedSaved += 1
  vPersist()
  if (bChanged || objGrid) {
    vRenderCollection()
  }
}

function sOwnedCardMarkup(objCard: tCollectionCard, nTint: number): string {
  const objTint = objCardTint(nTint)
  const bRare = nTint !== nStandardTint
  const sAriaTint = bRare ? `, ${objTint.sName}` : ''

  return `
    <a
      class="collect-card collection-card is-dealt is-flipped${bRare ? ' is-rare' : ''}"
      href="#card/${objCard.sBinaryValue}"
      data-tint-id="${objTint.sId}"
      style="${sTintCssVars(objTint)}"
      aria-label="${objCard.sName} (${objCard.sBinaryValue})${sAriaTint}"
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
          ${sCardIconMarkup(objCard.sBinaryValue, 'collect-card-icon')}
          <h3 class="collect-card-name">${objCard.sName}</h3>
          <span class="collect-card-binary">${objCard.sBinaryValue}</span>
          <p class="collect-card-meaning">${objCard.sMeaning}</p>
        </div>
      </div>
    </a>
  `
}

function sLockedCardMarkup(objCard: tCollectionCard, nTint: number): string {
  const objTint = objCardTint(nTint)
  return `
    <div
      class="collect-card collection-card is-dealt is-locked"
      style="${sTintCssVars(objTint)}"
      aria-label="${objCard.sName}, ${objTint.sName}, undiscovered"
    >
      <div class="collect-card-inner">
        <div class="collect-card-face collect-card-back">
          <div class="collect-card-back-mark">
            <span>0</span>
            <span>1</span>
          </div>
          <span class="collection-card-locked-label">Undiscovered</span>
        </div>
      </div>
    </div>
  `
}

function vSetPageTint(nTint: number): void {
  nPageTint = ((nTint % nTintCount) + nTintCount) % nTintCount
  vRenderCollection()
}

function vRenderCollection(): void {
  if (!objGrid || !objProgress) {
    return
  }

  const objTint = objCardTint(nPageTint)
  const nTotal = nCollectionTotalCount()
  const nOwned = bDevShowAllCollection ? nTotal : setOwned.size
  const nPageOwned = nOwnedOnTint(nPageTint)
  const nPageTotal = arrBoundCards.length

  objProgress.textContent = bDevShowAllCollection
    ? `All ${nTotal} variants (dev)`
    : nOwned === 0
      ? `0 / ${nTotal} variants`
      : nOwned === nTotal
        ? `All ${nTotal} variants collected`
        : `${nOwned} / ${nTotal} variants`

  if (objPageLabel) {
    objPageLabel.textContent = objTint.sName
    objPageLabel.style.color = objTint.sBright
  }
  if (objPageMeta) {
    objPageMeta.textContent = `${nPageOwned} / ${nPageTotal} on this page · ${nPageTint + 1} / ${nTintCount}`
  }

  objGrid.innerHTML = arrBoundCards
    .map((objCard) =>
      bOwnsVariant(objCard.sBinaryValue, nPageTint)
        ? sOwnedCardMarkup(objCard, nPageTint)
        : sLockedCardMarkup(objCard, nPageTint),
    )
    .join('')
  objGrid.setAttribute('data-tint', String(nPageTint))
  if (objRoot) {
    objRoot.style.cssText = sTintCssVars(objTint)
  }
}

export function sCollectionMarkup(): string {
  return `
    <div class="collection" id="collection">
      <p class="collection-progress" id="collection-progress" aria-live="polite">0 / 64 variants</p>
      <div class="collection-pager">
        <button type="button" class="collection-page-btn" id="collection-prev" aria-label="Previous color variant">
          ←
        </button>
        <div class="collection-page-heading">
          <p class="collection-page-label" id="collection-page-label">Standard</p>
          <p class="collection-page-meta" id="collection-page-meta">0 / 16 on this page · 1 / 6</p>
        </div>
        <button type="button" class="collection-page-btn" id="collection-next" aria-label="Next color variant">
          →
        </button>
      </div>
      <div class="collection-page" id="collection-grid" aria-live="polite"></div>
    </div>
  `
}

export function vBindCollection(arrCards: tCollectionCard[]): void {
  arrBoundCards = arrCards
  objRoot = document.querySelector<HTMLElement>('#collection')
  objGrid = document.querySelector<HTMLElement>('#collection-grid')
  objProgress = document.querySelector<HTMLElement>('#collection-progress')
  objPageLabel = document.querySelector<HTMLElement>('#collection-page-label')
  objPageMeta = document.querySelector<HTMLElement>('#collection-page-meta')
  objPrevButton = document.querySelector<HTMLButtonElement>('#collection-prev')
  objNextButton = document.querySelector<HTMLButtonElement>('#collection-next')

  objPrevButton?.addEventListener('click', () => {
    vSetPageTint(nPageTint - 1)
  })
  objNextButton?.addEventListener('click', () => {
    vSetPageTint(nPageTint + 1)
  })

  vHydrateFromStorage()
  vRenderCollection()
}

export function vSetCollectionActive(bActive: boolean): void {
  if (bActive) {
    vHydrateFromStorage()
    vRenderCollection()
  }
}

vHydrateFromStorage()
