import './style.css'
import { sReadingText, type tOperator } from './readingTexts'

type tCard = {
  sName: string
  sBinaryValue: string
  sMeaning: string
}

const arrCards: tCard[] = [
  { sName: 'The Seed', sBinaryValue: '0', sMeaning: 'beginnings, ideas, and origins' },
  { sName: 'The Flag', sBinaryValue: '1', sMeaning: 'claims, power, and sovereignty' },
  { sName: 'The Call', sBinaryValue: '10', sMeaning: 'summonings, duty, and serendipity' },
  { sName: 'The Link', sBinaryValue: '11', sMeaning: 'connections, promises, and security' },
  { sName: 'The Host', sBinaryValue: '100', sMeaning: 'shelter, ownership, and grace' },
  { sName: 'The Fork', sBinaryValue: '101', sMeaning: 'consumption, resonance, and diverging paths' },
  { sName: 'The Port', sBinaryValue: '110', sMeaning: 'gateways, discovery, and mercantilism' },
  { sName: 'The Tree', sBinaryValue: '111', sMeaning: 'fullness, growth, and reach' },
  { sName: 'The Agent', sBinaryValue: '1000', sMeaning: 'independence, will, and action' },
  { sName: 'The Table', sBinaryValue: '1001', sMeaning: 'gathering, meetings, and plots' },
  { sName: 'The Clone', sBinaryValue: '1010', sMeaning: 'mirrors, reproduction, and equality' },
  { sName: 'The Cache', sBinaryValue: '1011', sMeaning: 'secrets, knowledge, and wealth' },
  { sName: 'The Frame', sBinaryValue: '1100', sMeaning: 'perspective, structure, and state of mind' },
  { sName: 'The Shell', sBinaryValue: '1101', sMeaning: 'protection, boundaries, and rigidity' },
  { sName: 'The Forum', sBinaryValue: '1110', sMeaning: 'nobility, philosophy, and debate' },
  { sName: 'The State', sBinaryValue: '1111', sMeaning: 'organization, authority, and the political' },
]

function nCardValue(objCard: tCard): number {
  return parseInt(objCard.sBinaryValue, 2)
}

function objFindCardByValue(nValue: number): tCard {
  return arrCards.find((objCard: tCard) => nCardValue(objCard) === nValue)!
}

function arrDrawTwoCards(): [tCard, tCard] {
  const nFirst = Math.floor(Math.random() * arrCards.length)
  let nSecond = Math.floor(Math.random() * (arrCards.length - 1))

  if (nSecond >= nFirst) {
    nSecond += 1
  }

  return [arrCards[nFirst]!, arrCards[nSecond]!]
}

function sFlipCoin(): tOperator {
  return Math.random() < 0.5 ? 'AND' : 'OR'
}

function objResolveReading(objLeft: tCard, objRight: tCard, sOp: tOperator): tCard {
  const nLeft = nCardValue(objLeft)
  const nRight = nCardValue(objRight)
  const nResult = sOp === 'AND' ? nLeft & nRight : nLeft | nRight
  return objFindCardByValue(nResult)
}

function sCardItemMarkup(objCard: tCard): string {
  return `
    <article class="card-item">
      <h3>${objCard.sName} <span class="binary-value">(${objCard.sBinaryValue})</span></h3>
      <p>Represents ${objCard.sMeaning}.</p>
    </article>
  `
}

const sDevAiInstructions =
  'Binarot is a tarot-like deck where the rules are to draw two cards and flip a coin to get an AND/OR operation to apply. This results in a final card. Given the following reading, generate three concise paragraphs describing the meaning of the result. Give a sort of vague piece of life-advice without being too prescriptive, and use a soothing tone.'

function sReadingResultMarkup(
  objLeft: tCard,
  objRight: tCard,
  sOp: tOperator,
  bIncludeAiInstructions: boolean = false,
): string {
  const objResult = objResolveReading(objLeft, objRight, sOp)
  const sSymbol = sOp === 'AND' ? '&' : '|'
  const sText = sReadingText(objLeft.sBinaryValue, objRight.sBinaryValue, sOp)
  const sTextMarkup = sText ? `<p class="reading-text">${sText}</p>` : ''
  const sAiMarkup = bIncludeAiInstructions
    ? `<p class="dev-ai-instructions">${sDevAiInstructions}</p>`
    : ''

  return `
    <div class="reading-spread">
      ${sCardItemMarkup(objLeft)}
      <div class="reading-coin" aria-label="Coin landed on ${sOp}">
        <span class="reading-coin-face">${sOp}</span>
        <span class="reading-coin-symbol binary-value">${sSymbol}</span>
      </div>
      ${sCardItemMarkup(objRight)}
    </div>
    <p class="reading-equation">
      <span class="binary-value">${objLeft.sBinaryValue}</span>
      ${sSymbol}
      <span class="binary-value">${objRight.sBinaryValue}</span>
      =
      <span class="binary-value">${objResult.sBinaryValue}</span>
    </p>
    <div class="reading-final">
      <h3>Result</h3>
      ${sCardItemMarkup(objResult)}
      ${sAiMarkup}
      ${sTextMarkup}
    </div>
  `
}

function sCardOptionsMarkup(sSelectedBinary: string): string {
  return arrCards
    .map((objCard: tCard) => {
      const sSelected = objCard.sBinaryValue === sSelectedBinary ? ' selected' : ''
      return `<option value="${objCard.sBinaryValue}"${sSelected}>${objCard.sName} (${objCard.sBinaryValue})</option>`
    })
    .join('')
}

const sCardsMarkup: string = arrCards
  .map(
    (objCard: tCard) => `
      <li class="card-item">
        <h3>${objCard.sName} <span class="binary-value">(${objCard.sBinaryValue})</span></h3>
        <p>Represents ${objCard.sMeaning}.</p>
      </li>
    `,
  )
  .join('')

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main class="site">
    <header class="site-header">
      <h1>Binarot</h1>
      <p>A binary tarot system of symbols and meaning.</p>
    </header>

    <nav class="tabs" aria-label="Binarot sections">
      <button type="button" class="tab-button is-active" data-tab="cards" aria-selected="true">Cards</button>
      <button type="button" class="tab-button" data-tab="reading" aria-selected="false">Reading</button>
      <button type="button" class="tab-button" data-tab="dev" aria-selected="false">Dev</button>
      <button type="button" class="tab-button" data-tab="about" aria-selected="false">About</button>
    </nav>

    <section class="tab-panel is-active" data-panel="cards">
      <h2>Binarot Card Values</h2>
      <ul class="card-list">
        ${sCardsMarkup}
      </ul>
    </section>

    <section class="tab-panel" data-panel="reading">
      <h2>Binarot Reading</h2>
      <p class="reading-intro">
        Draw two cards and flip the AND/OR coin. The coin chooses whether the cards are combined with
        bitwise <code>AND</code> or <code>OR</code>, yielding a final binary result.
      </p>
      <button type="button" class="reading-draw" id="reading-draw">Draw a reading</button>
      <div class="reading-result" id="reading-result" hidden></div>
    </section>

    <section class="tab-panel" data-panel="dev">
      <h2>Dev Reading</h2>
      <p class="reading-intro">
        Choose any two cards and coin face to preview a reading.
      </p>
      <form class="dev-controls" id="dev-form">
        <label class="dev-field">
          <span>First card</span>
          <select id="dev-left" name="left">${sCardOptionsMarkup('0')}</select>
        </label>
        <label class="dev-field">
          <span>Coin</span>
          <select id="dev-op" name="op">
            <option value="AND" selected>AND</option>
            <option value="OR">OR</option>
          </select>
        </label>
        <label class="dev-field">
          <span>Second card</span>
          <select id="dev-right" name="right">${sCardOptionsMarkup('1')}</select>
        </label>
      </form>
      <div class="reading-result" id="dev-result"></div>
    </section>

    <section class="tab-panel" data-panel="about">
      <h2>About Binarot</h2>
      <p>
        Binarot blends symbolic tarot interpretation with binary progression, moving from <code>0</code> to <code>1111</code>.
      </p>
    </section>
  </main>
`

const arrTabButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('.tab-button'))
const arrTabPanels = Array.from(document.querySelectorAll<HTMLElement>('.tab-panel'))

arrTabButtons.forEach((objButton: HTMLButtonElement) => {
  objButton.addEventListener('click', () => {
    const sTabId = objButton.dataset.tab

    if (!sTabId) {
      return
    }

    arrTabButtons.forEach((objTabButton: HTMLButtonElement) => {
      const bIsActive = objTabButton === objButton
      objTabButton.classList.toggle('is-active', bIsActive)
      objTabButton.setAttribute('aria-selected', String(bIsActive))
    })

    arrTabPanels.forEach((objPanel: HTMLElement) => {
      objPanel.classList.toggle('is-active', objPanel.dataset.panel === sTabId)
    })
  })
})

function objFindCardByBinary(sBinary: string): tCard {
  return arrCards.find((objCard: tCard) => objCard.sBinaryValue === sBinary)!
}

const objDrawButton = document.querySelector<HTMLButtonElement>('#reading-draw')!
const objReadingResult = document.querySelector<HTMLDivElement>('#reading-result')!

const arrDrawLoadLines: string[] = [
  'shuffling deck...',
  'sampling entropy...',
  'drawing left card...',
  'drawing right card...',
  'flipping AND/OR coin...',
  'resolving bitwise operation...',
]

let nDrawLoadTimer: number | undefined

function vClearDrawLoadTimer(): void {
  if (nDrawLoadTimer !== undefined) {
    window.clearTimeout(nDrawLoadTimer)
    nDrawLoadTimer = undefined
  }
}

function vAppendConsoleLine(objLog: HTMLElement, sText: string, sClass: string = ''): void {
  const objLine = document.createElement('p')
  objLine.className = `reading-console-line${sClass ? ` ${sClass}` : ''}`
  objLine.textContent = sText
  objLog.appendChild(objLine)
  objLog.scrollTop = objLog.scrollHeight
}

function vRunDrawConsole(objLeft: tCard, objRight: tCard, sOp: tOperator): void {
  vClearDrawLoadTimer()

  objDrawButton.disabled = true
  objReadingResult.hidden = false
  objReadingResult.innerHTML = `
    <div class="reading-console" aria-live="polite">
      <p class="reading-console-line reading-console-prompt"><span class="reading-console-caret">&gt;</span> binarot.draw();</p>
      <p class="reading-console-line reading-console-status">executing...</p>
      <div class="reading-console-log" id="reading-console-log"></div>
    </div>
  `

  const objLog = document.querySelector<HTMLElement>('#reading-console-log')!
  let nLineIndex = 0

  function vStep(): void {
    if (nLineIndex < arrDrawLoadLines.length) {
      vAppendConsoleLine(objLog, arrDrawLoadLines[nLineIndex]!)
      nLineIndex += 1
      nDrawLoadTimer = window.setTimeout(vStep, 20 + Math.floor(Math.random() * 30))
      return
    }

    vAppendConsoleLine(objLog, 'done.', 'reading-console-done')
    nDrawLoadTimer = window.setTimeout(() => {
      const objConsole = objReadingResult.querySelector('.reading-console')
      const objOutput = document.createElement('div')
      objOutput.className = 'reading-console-output'
      objOutput.innerHTML = sReadingResultMarkup(objLeft, objRight, sOp)
      objReadingResult.appendChild(objOutput)
      objConsole?.classList.add('is-complete')
      objDrawButton.disabled = false
      nDrawLoadTimer = undefined
    }, 180)
  }

  nDrawLoadTimer = window.setTimeout(vStep, 150)
}

objDrawButton.addEventListener('click', () => {
  const [objLeft, objRight] = arrDrawTwoCards()
  const sOp = sFlipCoin()
  vRunDrawConsole(objLeft, objRight, sOp)
})

const objDevLeft = document.querySelector<HTMLSelectElement>('#dev-left')!
const objDevRight = document.querySelector<HTMLSelectElement>('#dev-right')!
const objDevOp = document.querySelector<HTMLSelectElement>('#dev-op')!
const objDevResult = document.querySelector<HTMLDivElement>('#dev-result')!

function vUpdateDevReading(): void {
  const objLeft = objFindCardByBinary(objDevLeft.value)
  const objRight = objFindCardByBinary(objDevRight.value)
  const sOp = objDevOp.value as tOperator

  objDevResult.innerHTML = sReadingResultMarkup(objLeft, objRight, sOp, true)
}

objDevLeft.addEventListener('change', vUpdateDevReading)
objDevRight.addEventListener('change', vUpdateDevReading)
objDevOp.addEventListener('change', vUpdateDevReading)
vUpdateDevReading()
