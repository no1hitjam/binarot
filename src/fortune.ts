type tFortuneCard = {
  sName: string
  sBinaryValue: string
}

type tFortuneSeries = {
  objCard: tFortuneCard
  nIndex: number
  nCurrent: number
  nChange: number
  sColor: string
  sPath: string
  sNodes: string
}

const nChartWidth = 840
const nChartHeight = 300
const nChartPadX = 28
const nChartPadY = 24
const nFortunePoints = 13
const nFortuneMin = -100
const nFortuneMax = 100
const nHourMs = 60 * 60 * 1000
const nHalfSize = 8

let bFortuneActive = false
let nFortuneTimer = 0
let sFocusedBinary: string | null = null
let bFocusSticky = false

function fnSeededRandom(nSeed: number): () => number {
  let nState = nSeed >>> 0
  return () => {
    nState += 0x6d2b79f5
    let nValue = nState
    nValue = Math.imul(nValue ^ (nValue >>> 15), nValue | 1)
    nValue ^= nValue + Math.imul(nValue ^ (nValue >>> 7), nValue | 61)
    return ((nValue ^ (nValue >>> 14)) >>> 0) / 4294967296
  }
}

function nClampFortune(nValue: number): number {
  return Math.max(nFortuneMin, Math.min(nFortuneMax, nValue))
}

function sFortuneColor(nIndex: number): string {
  const nHue = Math.round((nIndex * 137.508 + 38) % 360)
  const nLight = 58 + (nIndex % 3) * 7
  return `hsl(${nHue} 72% ${nLight}%)`
}

function nFortuneAtHour(nSignSeed: number, nHour: number): number {
  const fnCurrent = fnSeededRandom(nSignSeed ^ Math.imul(nHour, 0x85ebca6b))
  const fnPrevious = fnSeededRandom(nSignSeed ^ Math.imul(nHour - 1, 0x85ebca6b))
  const nCurrent = fnCurrent() * 200 - 100
  const nPrevious = fnPrevious() * 200 - 100
  return Math.round(nClampFortune(nCurrent * 0.7 + nPrevious * 0.3))
}

function sSignedFortune(nValue: number): string {
  return `${nValue >= 0 ? '+' : ''}${nValue}`
}

function objFortuneSeries(
  objCard: tFortuneCard,
  nIndex: number,
  nCurrentHour: number,
): tFortuneSeries {
  const nSignSeed = Math.imul(nIndex + 1, 0x9e3779b1)
  const arrHours = Array.from({ length: nFortunePoints }, (_nUnused, nPoint: number) => {
    return nCurrentHour - nFortunePoints + nPoint + 1
  })
  const arrValues = arrHours.map((nHour: number) => nFortuneAtHour(nSignSeed, nHour))

  const nPlotWidth = nChartWidth - nChartPadX * 2
  const nPlotHeight = nChartHeight - nChartPadY * 2
  const arrPoints = arrValues.map((nValue: number, nPoint: number) => {
    const nX = nChartPadX + (nPoint / (nFortunePoints - 1)) * nPlotWidth
    const nY =
      nChartPadY + ((nFortuneMax - nValue) / (nFortuneMax - nFortuneMin)) * nPlotHeight
    return { nX, nY, nValue, nHour: arrHours[nPoint]! }
  })
  const sPath = arrPoints
    .map((objPoint, nPoint: number) => {
      return `${nPoint === 0 ? 'M' : 'L'} ${objPoint.nX.toFixed(1)} ${objPoint.nY.toFixed(1)}`
    })
    .join(' ')
  const sNodes = arrPoints
    .map((objPoint) => {
      const sTime = new Date(objPoint.nHour * nHourMs).toLocaleString([], {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
      })
      return `
        <circle class="fortune-node" cx="${objPoint.nX.toFixed(1)}" cy="${objPoint.nY.toFixed(1)}" r="3">
          <title>${objCard.sName} · ${sTime}: ${sSignedFortune(objPoint.nValue)}</title>
        </circle>
      `
    })
    .join('')

  return {
    objCard,
    nIndex,
    nCurrent: arrValues.at(-1)!,
    nChange: arrValues.at(-1)! - arrValues[0]!,
    sColor: sFortuneColor(nIndex),
    sPath,
    sNodes,
  }
}

function sFortuneChartMarkup(
  arrSeries: tFortuneSeries[],
  sTitle: string,
  sAriaLabel: string,
): string {
  const nZeroY = nChartHeight / 2
  const sLines = arrSeries
    .map(
      (objSeries: tFortuneSeries) => `
        <g
          class="fortune-series"
          data-binary="${objSeries.objCard.sBinaryValue}"
          style="--fortune-color: ${objSeries.sColor}"
        >
          <path
            class="fortune-line"
            d="${objSeries.sPath}"
            vector-effect="non-scaling-stroke"
          >
            <title>${objSeries.objCard.sName}: ${sSignedFortune(objSeries.nCurrent)}</title>
          </path>
          <g class="fortune-nodes">
            ${objSeries.sNodes}
          </g>
        </g>
      `,
    )
    .join('')

  return `
    <div class="fortune-chart-wrap">
      <div class="fortune-chart-label">${sTitle}</div>
      <svg
        class="fortune-chart"
        viewBox="0 0 ${nChartWidth} ${nChartHeight}"
        role="img"
        aria-label="${sAriaLabel}"
      >
        <g class="fortune-grid" aria-hidden="true">
          <line x1="${nChartPadX}" y1="${nChartPadY}" x2="${nChartWidth - nChartPadX}" y2="${nChartPadY}"></line>
          <line x1="${nChartPadX}" y1="${nZeroY}" x2="${nChartWidth - nChartPadX}" y2="${nZeroY}"></line>
          <line x1="${nChartPadX}" y1="${nChartHeight - nChartPadY}" x2="${nChartWidth - nChartPadX}" y2="${nChartHeight - nChartPadY}"></line>
        </g>
        <text class="fortune-axis-label" x="${nChartPadX}" y="${nChartPadY + 14}">FORTUNATE</text>
        <text class="fortune-axis-label" x="${nChartPadX}" y="${nChartHeight - nChartPadY - 7}">UNFORTUNATE</text>
        ${sLines}
      </svg>
      <div class="fortune-chart-time" aria-hidden="true">
        <span>12 HOURS AGO</span>
        <span>NOW</span>
      </div>
    </div>
  `
}

function sFortuneTickerMarkup(arrSeries: tFortuneSeries[]): string {
  return [...arrSeries]
    .sort((objLeft: tFortuneSeries, objRight: tFortuneSeries) => {
      return objRight.nCurrent - objLeft.nCurrent
    })
    .map((objSeries: tFortuneSeries, nRank: number) => {
      const sDirection = objSeries.nChange >= 0 ? 'up' : 'down'
      return `
        <li
          class="fortune-ticker"
          data-binary="${objSeries.objCard.sBinaryValue}"
          style="--fortune-color: ${objSeries.sColor}"
          tabindex="0"
        >
          <span class="fortune-rank">${String(nRank + 1).padStart(2, '0')}</span>
          <span class="fortune-swatch" aria-hidden="true"></span>
          <span class="fortune-sign">
            ${objSeries.objCard.sName}
            <span class="binary-value">(${objSeries.objCard.sBinaryValue})</span>
          </span>
          <strong class="fortune-value is-${sDirection}">
            ${sSignedFortune(objSeries.nCurrent)}
          </strong>
          <span class="fortune-change is-${sDirection}">
            ${objSeries.nChange >= 0 ? '▲' : '▼'} ${Math.abs(objSeries.nChange)}
          </span>
        </li>
      `
    })
    .join('')
}

function vApplyFortuneFocus(objStage: HTMLElement): void {
  const bFocusing = sFocusedBinary !== null
  objStage.classList.toggle('is-focusing', bFocusing)

  objStage.querySelectorAll<HTMLElement>('.fortune-series').forEach((objSeries) => {
    const bFocused = objSeries.dataset.binary === sFocusedBinary
    objSeries.classList.toggle('is-focused', bFocused)
  })

  objStage.querySelectorAll<HTMLElement>('.fortune-ticker').forEach((objTicker) => {
    const bFocused = objTicker.dataset.binary === sFocusedBinary
    objTicker.classList.toggle('is-focused', bFocused)
  })
}

function vSetFortuneFocus(objStage: HTMLElement, sBinary: string | null, bSticky: boolean): void {
  sFocusedBinary = sBinary
  bFocusSticky = bSticky && sBinary !== null
  vApplyFortuneFocus(objStage)
}

function vBindFortuneFocus(objStage: HTMLElement): void {
  objStage.querySelectorAll<HTMLElement>('.fortune-ticker').forEach((objTicker) => {
    const sBinary = objTicker.dataset.binary
    if (!sBinary) {
      return
    }

    objTicker.addEventListener('pointerenter', (objEvent: PointerEvent) => {
      if (objEvent.pointerType === 'touch' || bFocusSticky) {
        return
      }
      vSetFortuneFocus(objStage, sBinary, false)
    })

    objTicker.addEventListener('pointerleave', (objEvent: PointerEvent) => {
      if (objEvent.pointerType === 'touch' || bFocusSticky) {
        return
      }
      vSetFortuneFocus(objStage, null, false)
    })

    objTicker.addEventListener('focusin', () => {
      if (bFocusSticky) {
        return
      }
      vSetFortuneFocus(objStage, sBinary, false)
    })

    objTicker.addEventListener('focusout', (objEvent: FocusEvent) => {
      if (bFocusSticky) {
        return
      }
      const objNext = objEvent.relatedTarget
      if (objNext instanceof Node && objTicker.contains(objNext)) {
        return
      }
      vSetFortuneFocus(objStage, null, false)
    })

    objTicker.addEventListener('click', () => {
      if (sFocusedBinary === sBinary && bFocusSticky) {
        vSetFortuneFocus(objStage, null, false)
      } else {
        vSetFortuneFocus(objStage, sBinary, true)
      }
    })
  })
}

function vRenderFortune(arrCards: tFortuneCard[]): void {
  const objStage = document.querySelector<HTMLElement>('#fortune-stage')
  if (!objStage) {
    return
  }

  const nCurrentHour = Math.floor(Date.now() / nHourMs)
  const arrSeries = arrCards.map((objCard: tFortuneCard, nIndex: number) => {
    return objFortuneSeries(objCard, nIndex, nCurrentHour)
  })
  const arrUpper = arrSeries.slice(0, nHalfSize)
  const arrLower = arrSeries.slice(nHalfSize)

  objStage.innerHTML = `
    <div class="fortune-board">
      <div class="fortune-board-bar">
        <span>BINAROT FORTUNE EXCHANGE</span>
        <span class="fortune-live"><span aria-hidden="true"></span> LIVE</span>
      </div>
      ${sFortuneChartMarkup(
        arrUpper,
        'UPPER · 0–111',
        'Hourly fortune for upper eight binarot signs',
      )}
      ${sFortuneChartMarkup(
        arrLower,
        'LOWER · 1000–1111',
        'Hourly fortune for lower eight binarot signs',
      )}
    </div>
    <ol class="fortune-tickers" aria-label="Current fortune rankings">
      ${sFortuneTickerMarkup(arrSeries)}
    </ol>
  `

  vBindFortuneFocus(objStage)
  vApplyFortuneFocus(objStage)
}

function vScheduleFortuneHour(arrCards: tFortuneCard[]): void {
  window.clearTimeout(nFortuneTimer)
  const nDelay = nHourMs - (Date.now() % nHourMs) + 50
  nFortuneTimer = window.setTimeout(() => {
    if (bFortuneActive) {
      vRenderFortune(arrCards)
      vScheduleFortuneHour(arrCards)
    }
  }, nDelay)
}

export function sFortuneMarkup(): string {
  return '<div class="fortune-stage" id="fortune-stage"></div>'
}

export function vSetFortuneActive(bActive: boolean, arrCards: tFortuneCard[]): void {
  if (bActive && !bFortuneActive) {
    sFocusedBinary = null
    bFocusSticky = false
    vRenderFortune(arrCards)
    vScheduleFortuneHour(arrCards)
  } else if (!bActive) {
    window.clearTimeout(nFortuneTimer)
    nFortuneTimer = 0
    sFocusedBinary = null
    bFocusSticky = false
  }
  bFortuneActive = bActive
}
