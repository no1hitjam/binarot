import { sCardIconMarkup } from './cardIcons'

type tFloatCard = {
  sName: string
  sBinaryValue: string
}

type tFloaterLife = 'in' | 'alive' | 'out'

type tFloater = {
  objEl: HTMLElement
  nX: number
  nY: number
  nZ: number
  nRx: number
  nRy: number
  nRz: number
  nVx: number
  nVy: number
  nVz: number
  nVrx: number
  nVry: number
  nVrz: number
  nBaseScale: number
  sLife: tFloaterLife
  nLife: number
}

type tParticle = {
  objEl: HTMLElement
  nX: number
  nY: number
  nZ: number
  nVx: number
  nVy: number
  nVz: number
  nSize: number
  nPhase: number
  nTwinkle: number
}

const nCardCount = 16
const nParticleCount = 48
const nParticleMax = 220
const nClickBurstCount = 24
const nCardBurstCount = 6
const nFadeInMs = 2800
const nCardW = 118
const nCardH = 178
const nDepthNear = -80
const nDepthFar = -520
const nSpawnMargin = 80
const nGoldParticleChance = 0.38
const nSpawnSec = 0.55
const nDespawnSec = 0.4

let objStage: HTMLElement | null = null
let objFloatRoot: HTMLElement | null = null
let arrFloaters: tFloater[] = []
let arrParticles: tParticle[] = []
let nAnimFrame = 0
let bRunning = false
let nFadeInStart = 0
let nLastTs = 0
let nStageW = 0
let nStageH = 0

function arrShuffledCards(arrCards: tFloatCard[]): tFloatCard[] {
  const arrOut = arrCards.slice()
  for (let nI = arrOut.length - 1; nI > 0; nI--) {
    const nJ = Math.floor(Math.random() * (nI + 1))
    const objTmp = arrOut[nI]!
    arrOut[nI] = arrOut[nJ]!
    arrOut[nJ] = objTmp
  }
  return arrOut
}

function nIntroAlpha(): number {
  const nElapsed = performance.now() - nFadeInStart
  const nT = Math.min(1, Math.max(0, nElapsed / nFadeInMs))
  return 1 - (1 - nT) * (1 - nT)
}

function sFloatCardMarkup(objCard: tFloatCard): string {
  return `
    <article class="float-card" aria-hidden="true">
      <div class="float-card-inner">
        <div class="float-card-face float-card-front">
          ${sCardIconMarkup(objCard.sBinaryValue, 'float-card-icon')}
          <h3 class="float-card-name">${objCard.sName}</h3>
          <span class="float-card-binary">${objCard.sBinaryValue}</span>
        </div>
        <div class="float-card-face float-card-back">
          <div class="float-card-back-mark" aria-hidden="true">
            <span>0</span>
            <span>1</span>
          </div>
        </div>
      </div>
    </article>
  `
}

function vMeasureStage(): void {
  if (!objStage) {
    return
  }
  nStageW = objStage.clientWidth
  nStageH = objStage.clientHeight
}

function nEaseOutCubic(nT: number): number {
  const nU = 1 - nT
  return 1 - nU * nU * nU
}

function nEaseInCubic(nT: number): number {
  return nT * nT * nT
}

function nDepthScale(nZ: number): number {
  const nDepthT = (nZ - nDepthNear) / (nDepthFar - nDepthNear)
  return 0.55 + (1 - Math.min(1, Math.max(0, nDepthT))) * 0.55
}

function nFloaterPop(objFloater: tFloater): number {
  if (objFloater.sLife === 'in') {
    return nEaseOutCubic(objFloater.nLife)
  }
  if (objFloater.sLife === 'out') {
    return 1 - nEaseInCubic(objFloater.nLife)
  }
  return 1
}

function objSpawnFloater(objEl: HTMLElement, bSeeded: boolean): tFloater {
  const nZ = nDepthNear + Math.random() * (nDepthFar - nDepthNear)

  let nX: number
  let nY: number

  if (bSeeded) {
    nX = (Math.random() - 0.5) * (nStageW + nCardW)
    nY = (Math.random() - 0.5) * (nStageH + nCardH)
  } else {
    const nEdge = Math.floor(Math.random() * 4)
    if (nEdge === 0) {
      nX = -nStageW * 0.5 - nSpawnMargin
      nY = (Math.random() - 0.5) * nStageH
    } else if (nEdge === 1) {
      nX = nStageW * 0.5 + nSpawnMargin
      nY = (Math.random() - 0.5) * nStageH
    } else if (nEdge === 2) {
      nX = (Math.random() - 0.5) * nStageW
      nY = -nStageH * 0.5 - nSpawnMargin
    } else {
      nX = (Math.random() - 0.5) * nStageW
      nY = nStageH * 0.5 + nSpawnMargin
    }
  }

  const nSpeed = 12 + Math.random() * 28
  const nAngle = Math.random() * Math.PI * 2

  return {
    objEl,
    nX,
    nY,
    nZ,
    nRx: Math.random() * 360,
    nRy: Math.random() * 360,
    nRz: (Math.random() - 0.5) * 40,
    nVx: Math.cos(nAngle) * nSpeed,
    nVy: Math.sin(nAngle) * nSpeed,
    nVz: (Math.random() - 0.5) * 18,
    nVrx: (Math.random() - 0.5) * 28,
    nVry: 18 + Math.random() * 36,
    nVrz: (Math.random() - 0.5) * 12,
    nBaseScale: nDepthScale(nZ),
    sLife: 'in',
    nLife: 0,
  }
}

function vApplyFloater(objFloater: tFloater, nAlpha: number): void {
  const nDepthT = (objFloater.nZ - nDepthNear) / (nDepthFar - nDepthNear)
  const nDepthFade = 0.35 + (1 - Math.min(1, Math.max(0, nDepthT))) * 0.65
  const nScale = objFloater.nBaseScale * nFloaterPop(objFloater)
  objFloater.objEl.style.opacity = String(nAlpha * nDepthFade)
  objFloater.objEl.style.transform =
    `translate3d(${objFloater.nX}px, ${objFloater.nY}px, ${objFloater.nZ}px) ` +
    `rotateX(${objFloater.nRx}deg) rotateY(${objFloater.nRy}deg) rotateZ(${objFloater.nRz}deg) ` +
    `scale(${nScale})`
}

function objCreateParticleEl(): HTMLElement {
  const objEl = document.createElement('span')
  objEl.setAttribute('aria-hidden', 'true')
  return objEl
}

function vDressParticle(objEl: HTMLElement, bGold: boolean, nSize: number): void {
  objEl.className = bGold ? 'float-particle is-gold' : 'float-particle is-purple'
  objEl.style.width = `${nSize}px`
  objEl.style.height = `${nSize}px`
}

function objSpawnParticle(objEl: HTMLElement, bSeeded: boolean): tParticle {
  const nZ = nDepthNear + Math.random() * (nDepthFar - nDepthNear)
  const nSpeed = 6 + Math.random() * 22
  const nAngle = Math.random() * Math.PI * 2
  const bGold = Math.random() < nGoldParticleChance

  let nX: number
  let nY: number
  if (bSeeded) {
    nX = (Math.random() - 0.5) * nStageW
    nY = (Math.random() - 0.5) * nStageH
  } else {
    const nEdge = Math.floor(Math.random() * 4)
    if (nEdge === 0) {
      nX = -nStageW * 0.5 - 24
      nY = (Math.random() - 0.5) * nStageH
    } else if (nEdge === 1) {
      nX = nStageW * 0.5 + 24
      nY = (Math.random() - 0.5) * nStageH
    } else if (nEdge === 2) {
      nX = (Math.random() - 0.5) * nStageW
      nY = -nStageH * 0.5 - 24
    } else {
      nX = (Math.random() - 0.5) * nStageW
      nY = nStageH * 0.5 + 24
    }
  }

  const nSize = 2 + Math.random() * 4
  vDressParticle(objEl, bGold, nSize)

  return {
    objEl,
    nX,
    nY,
    nZ,
    nVx: Math.cos(nAngle) * nSpeed,
    nVy: Math.sin(nAngle) * nSpeed - 4 - Math.random() * 10,
    nVz: (Math.random() - 0.5) * 14,
    nSize,
    nPhase: Math.random() * Math.PI * 2,
    nTwinkle: 1.2 + Math.random() * 2.4,
  }
}

function objBurstParticle(objEl: HTMLElement, nX: number, nY: number, bSubtle: boolean): tParticle {
  const nAngle = Math.random() * Math.PI * 2
  const nSpeed = bSubtle ? 16 + Math.random() * 36 : 40 + Math.random() * 110
  const nSize = bSubtle ? 1.4 + Math.random() * 2.2 : 2.5 + Math.random() * 5.5
  const bGold = Math.random() < (bSubtle ? 0.42 : 0.55)
  const nScatter = bSubtle ? 10 : 18
  vDressParticle(objEl, bGold, nSize)

  return {
    objEl,
    nX: nX + (Math.random() - 0.5) * nScatter,
    nY: nY + (Math.random() - 0.5) * nScatter,
    nZ: nDepthNear - 20 + Math.random() * -120,
    nVx: Math.cos(nAngle) * nSpeed,
    nVy: Math.sin(nAngle) * nSpeed - (bSubtle ? 4 : 10) - Math.random() * (bSubtle ? 14 : 30),
    nVz: (bSubtle ? -8 : -20) - Math.random() * (bSubtle ? 28 : 55),
    nSize,
    nPhase: Math.random() * Math.PI * 2,
    nTwinkle: bSubtle ? 1.2 + Math.random() * 1.6 : 2.2 + Math.random() * 3.2,
  }
}

function vBurstAt(nX: number, nY: number, nBurstCount: number = nClickBurstCount, bSubtle: boolean = false): void {
  if (!objStage || !bRunning) {
    return
  }

  const nRoom = nParticleMax - arrParticles.length
  const nCount = Math.min(nBurstCount, Math.max(0, nRoom))
  const nAlpha = nIntroAlpha()
  const nTs = performance.now()

  for (let nI = 0; nI < nCount; nI++) {
    const objEl = objCreateParticleEl()
    objStage.appendChild(objEl)
    const objParticle = objBurstParticle(objEl, nX, nY, bSubtle)
    arrParticles.push(objParticle)
    vApplyParticle(objParticle, nAlpha, nTs)
  }
}

function nClampBurstAxis(nValue: number, nSpan: number): number {
  const nLimit = Math.max(24, nSpan * 0.5 - 16)
  return Math.max(-nLimit, Math.min(nLimit, nValue))
}

function vCardBurstAt(nX: number, nY: number): void {
  vBurstAt(nClampBurstAxis(nX, nStageW), nClampBurstAxis(nY, nStageH), nCardBurstCount, true)
}

function vOnFloatClick(objEvent: MouseEvent): void {
  if (!objStage || !bRunning) {
    return
  }

  const objRect = objStage.getBoundingClientRect()
  if (objRect.width <= 0 || objRect.height <= 0) {
    return
  }

  const nX = objEvent.clientX - objRect.left - objRect.width * 0.5
  const nY = objEvent.clientY - objRect.top - objRect.height * 0.5
  vBurstAt(nX, nY)
}

function vApplyParticle(objParticle: tParticle, nAlpha: number, nTs: number): void {
  const nDepthT = (objParticle.nZ - nDepthNear) / (nDepthFar - nDepthNear)
  const nDepthFade = 0.25 + (1 - Math.min(1, Math.max(0, nDepthT))) * 0.75
  const nPulse = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(nTs * 0.001 * objParticle.nTwinkle + objParticle.nPhase))
  objParticle.objEl.style.opacity = String(nAlpha * nDepthFade * nPulse)
  objParticle.objEl.style.transform =
    `translate3d(${objParticle.nX}px, ${objParticle.nY}px, ${objParticle.nZ}px)`
}

function bOffStage(objFloater: tFloater): boolean {
  const nPad = nSpawnMargin + nCardW
  return (
    objFloater.nX < -nStageW * 0.5 - nPad ||
    objFloater.nX > nStageW * 0.5 + nPad ||
    objFloater.nY < -nStageH * 0.5 - nPad ||
    objFloater.nY > nStageH * 0.5 + nPad ||
    objFloater.nZ < nDepthFar - 40 ||
    objFloater.nZ > nDepthNear + 60
  )
}

function bParticleOffStage(objParticle: tParticle): boolean {
  const nPad = 40
  return (
    objParticle.nX < -nStageW * 0.5 - nPad ||
    objParticle.nX > nStageW * 0.5 + nPad ||
    objParticle.nY < -nStageH * 0.5 - nPad ||
    objParticle.nY > nStageH * 0.5 + nPad ||
    objParticle.nZ < nDepthFar - 40 ||
    objParticle.nZ > nDepthNear + 60
  )
}

function vTick(nTs: number): void {
  if (!bRunning || !objStage) {
    return
  }

  const nDt = nLastTs === 0 ? 0 : Math.min(0.05, (nTs - nLastTs) / 1000)
  nLastTs = nTs

  const nAlpha = nIntroAlpha()
  objStage.style.opacity = String(nAlpha)

  for (let nI = 0; nI < arrFloaters.length; nI++) {
    const objFloater = arrFloaters[nI]!
    objFloater.nX += objFloater.nVx * nDt
    objFloater.nY += objFloater.nVy * nDt
    objFloater.nZ += objFloater.nVz * nDt
    objFloater.nRx += objFloater.nVrx * nDt
    objFloater.nRy += objFloater.nVry * nDt
    objFloater.nRz += objFloater.nVrz * nDt
    objFloater.nBaseScale = nDepthScale(objFloater.nZ)

    if (objFloater.sLife === 'in') {
      objFloater.nLife = Math.min(1, objFloater.nLife + nDt / nSpawnSec)
      if (objFloater.nLife >= 1) {
        objFloater.sLife = 'alive'
        objFloater.nLife = 1
      }
    } else if (objFloater.sLife === 'out') {
      objFloater.nLife = Math.min(1, objFloater.nLife + nDt / nDespawnSec)
      if (objFloater.nLife >= 1) {
        vCardBurstAt(objFloater.nX, objFloater.nY)
        const objNext = objSpawnFloater(objFloater.objEl, false)
        arrFloaters[nI] = objNext
        vApplyFloater(objNext, nAlpha)
        vCardBurstAt(objNext.nX, objNext.nY)
        continue
      }
    } else if (bOffStage(objFloater)) {
      objFloater.sLife = 'out'
      objFloater.nLife = 0
    }

    vApplyFloater(objFloater, nAlpha)
  }

  for (let nI = 0; nI < arrParticles.length; nI++) {
    const objParticle = arrParticles[nI]!
    objParticle.nX += objParticle.nVx * nDt
    objParticle.nY += objParticle.nVy * nDt
    objParticle.nZ += objParticle.nVz * nDt

    if (bParticleOffStage(objParticle)) {
      if (arrParticles.length > nParticleCount) {
        objParticle.objEl.remove()
        arrParticles.splice(nI, 1)
        nI -= 1
        continue
      }
      const objNext = objSpawnParticle(objParticle.objEl, false)
      arrParticles[nI] = objNext
      vApplyParticle(objNext, nAlpha, nTs)
      continue
    }

    vApplyParticle(objParticle, nAlpha, nTs)
  }

  nAnimFrame = window.requestAnimationFrame(vTick)
}

function vBuildFloaters(arrCards: tFloatCard[]): void {
  if (!objStage) {
    return
  }

  objStage.innerHTML = ''
  arrFloaters = []
  arrParticles = []
  vMeasureStage()

  const arrPick = arrShuffledCards(arrCards)
  const nCount = Math.min(nCardCount, Math.max(arrPick.length, 1))
  for (let nI = 0; nI < nCount; nI++) {
    const objCard = arrPick[nI % arrPick.length]!
    objStage.insertAdjacentHTML('beforeend', sFloatCardMarkup(objCard))
    const objEl = objStage.lastElementChild as HTMLElement
    const objFloater = objSpawnFloater(objEl, true)
    arrFloaters.push(objFloater)
    vApplyFloater(objFloater, 0)
    vCardBurstAt(objFloater.nX, objFloater.nY)
  }

  for (let nI = 0; nI < nParticleCount; nI++) {
    const objEl = objCreateParticleEl()
    objStage.appendChild(objEl)
    const objParticle = objSpawnParticle(objEl, true)
    arrParticles.push(objParticle)
    vApplyParticle(objParticle, 0, performance.now())
  }
}

function vStart(arrCards: tFloatCard[]): void {
  if (bRunning || !objStage) {
    return
  }

  bRunning = true
  nFadeInStart = performance.now()
  nLastTs = 0
  vBuildFloaters(arrCards)
  nAnimFrame = window.requestAnimationFrame(vTick)
}

function vStop(): void {
  bRunning = false
  if (nAnimFrame !== 0) {
    window.cancelAnimationFrame(nAnimFrame)
    nAnimFrame = 0
  }
  nLastTs = 0
}

let arrBoundCards: tFloatCard[] = []

export function sFloatMarkup(): string {
  return `
    <div class="float" id="float">
      <div class="float-stage" id="float-stage"></div>
      <p class="float-caption">cards in the void · click to spark</p>
    </div>
  `
}

export function vBindFloat(arrCards: tFloatCard[]): void {
  objStage = document.querySelector<HTMLElement>('#float-stage')
  objFloatRoot = document.querySelector<HTMLElement>('#float')
  if (!objStage || !objFloatRoot) {
    return
  }

  arrBoundCards = arrCards

  objFloatRoot.addEventListener('click', vOnFloatClick)

  window.addEventListener('resize', () => {
    if (bRunning) {
      vMeasureStage()
    }
  })

  const objPanel = document.querySelector<HTMLElement>('[data-panel="magic"]')
  if (objPanel?.classList.contains('is-active')) {
    vStart(arrBoundCards)
  }
}

export function vSetFloatActive(bActive: boolean): void {
  if (bActive) {
    vStart(arrBoundCards)
  } else {
    vStop()
  }
}
