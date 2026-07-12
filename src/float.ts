import { sCardIconMarkup } from './cardIcons'

type tFloatCard = {
  sName: string
  sBinaryValue: string
}

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
  nScale: number
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
const nFadeInMs = 2800
const nCardW = 118
const nCardH = 178
const nDepthNear = -80
const nDepthFar = -520
const nSpawnMargin = 80
const nGoldParticleChance = 0.38

let objStage: HTMLElement | null = null
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

function objSpawnFloater(objEl: HTMLElement, bSeeded: boolean): tFloater {
  const nZ = nDepthNear + Math.random() * (nDepthFar - nDepthNear)
  const nDepthT = (nZ - nDepthNear) / (nDepthFar - nDepthNear)
  const nScale = 0.55 + (1 - nDepthT) * 0.55

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
    nScale,
  }
}

function vApplyFloater(objFloater: tFloater, nAlpha: number): void {
  const nDepthT = (objFloater.nZ - nDepthNear) / (nDepthFar - nDepthNear)
  const nDepthFade = 0.35 + (1 - nDepthT) * 0.65
  objFloater.objEl.style.opacity = String(nAlpha * nDepthFade)
  objFloater.objEl.style.transform =
    `translate3d(${objFloater.nX}px, ${objFloater.nY}px, ${objFloater.nZ}px) ` +
    `rotateX(${objFloater.nRx}deg) rotateY(${objFloater.nRy}deg) rotateZ(${objFloater.nRz}deg) ` +
    `scale(${objFloater.nScale})`
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

  objEl.className = bGold ? 'float-particle is-gold' : 'float-particle is-purple'
  const nSize = 2 + Math.random() * 4
  objEl.style.width = `${nSize}px`
  objEl.style.height = `${nSize}px`

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

    const nDepthT = (objFloater.nZ - nDepthNear) / (nDepthFar - nDepthNear)
    objFloater.nScale = 0.55 + (1 - Math.min(1, Math.max(0, nDepthT))) * 0.55

    if (bOffStage(objFloater)) {
      const objNext = objSpawnFloater(objFloater.objEl, false)
      arrFloaters[nI] = objNext
      vApplyFloater(objNext, nAlpha)
      continue
    }

    vApplyFloater(objFloater, nAlpha)
  }

  for (let nI = 0; nI < arrParticles.length; nI++) {
    const objParticle = arrParticles[nI]!
    objParticle.nX += objParticle.nVx * nDt
    objParticle.nY += objParticle.nVy * nDt
    objParticle.nZ += objParticle.nVz * nDt

    if (bParticleOffStage(objParticle)) {
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
  }

  for (let nI = 0; nI < nParticleCount; nI++) {
    const objEl = document.createElement('span')
    objEl.setAttribute('aria-hidden', 'true')
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
      <p class="float-caption">cards in the void</p>
    </div>
  `
}

export function vBindFloat(arrCards: tFloatCard[]): void {
  objStage = document.querySelector<HTMLElement>('#float-stage')
  if (!objStage) {
    return
  }

  arrBoundCards = arrCards

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
