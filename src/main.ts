import './style.css'
import { sCardIconMarkup } from './cardIcons'
import { sReadingText, sStyledReadingText, type tOperator } from './readingTexts'

type tCard = {
  sName: string
  sBinaryValue: string
  sMeaning: string
  sDescription: string
  sSign: string
}

type tCardPage = {
  sSlug: string
  sName: string
  sLabel: string
  sMeaning: string
  sDescription: string
}

const arrCards: tCard[] = [
  {
    sName: 'The Seed',
    sBinaryValue: '0',
    sMeaning: 'beginnings, ideas, and origins',
    sDescription:
      'The Seed is the zero point—the quiet before form. It holds beginnings, unshaped ideas, and the first private spark of intent. In computing terms it is the null origin, the empty register waiting for a write. Drawn alone, it asks you to return to what has not yet been claimed, built, or named.',
    sSign:
      'You are someone who lives near beginnings. Ideas gather around you before they harden into plans, and you often sense the shape of a thing before anyone else names it. Quiet potential is your native weather—you would rather start true than finish loud.',
  },
  {
    sName: 'The Flag',
    sBinaryValue: '1',
    sMeaning: 'claims, power, and sovereignty',
    sDescription:
      'The Flag is the first bit set—a claim planted in open ground. It speaks of power, sovereignty, and the act of declaring that something is yours to stand for. Like a boolean true or a raised signal flag in code, it marks a stance that others must now reckon with.',
    sSign:
      'You are a person who plants a stake and means it. Once you claim a cause, a boundary, or a truth, others feel the air change. Sovereignty sits naturally on you—not as bluster, but as the calm insistence that your position is real and must be answered.',
  },
  {
    sName: 'The Call',
    sBinaryValue: '10',
    sMeaning: 'summonings, duty, and serendipity',
    sDescription:
      'The Call arrives from outside the quiet self: a summons, a duty, a chance encounter that redirects the path. It is the function invoked from afar, the interrupt that breaks the idle loop. When it appears, timing matters as much as will—something is asking to be answered.',
    sSign:
      'You are tuned to interruption and invitation. Duty finds you, chance redirects you, and you answer more often than you refuse. Your life tends to turn on messages from outside yourself—you are less a closed circuit than a line waiting to ring.',
  },
  {
    sName: 'The Link',
    sBinaryValue: '11',
    sMeaning: 'connections, promises, and security',
    sDescription:
      'The Link binds two things into one reliable whole. It covers promises, partnerships, and the security that comes from a shared protocol. Think handshake, hyperlink, or trusted connection—the strength of the bond is the point, not either endpoint alone.',
    sSign:
      'You are defined by what you bind together. Promises matter to you, and so does the quiet security of a trusted bond. People come to you to be connected—to each other, to a plan, to a sense that the handshake will hold.',
  },
  {
    sName: 'The Host',
    sBinaryValue: '100',
    sMeaning: 'shelter, ownership, and grace',
    sDescription:
      'The Host is shelter and stewardship: the machine that serves, the home that holds, the owner who makes room. It is grace expressed as infrastructure—space offered so others (or your own projects) can live. Ownership here is less conquest than caretaking.',
    sSign:
      'You are a steward by instinct. You make room—physical, emotional, logistical—so that others and their work can land safely. Ownership, for you, looks like caretaking: the grace of keeping the lights on and the door unlocked for the right people.',
  },
  {
    sName: 'The Fork',
    sBinaryValue: '101',
    sMeaning: 'consumption, resonance, and diverging paths',
    sDescription:
      'The Fork is the branch point—where one line of code, one appetite, or one life splits into many. It speaks of consumption and resonance: taking something in and feeling which path vibrates true. Divergence is not failure here; it is the shape of choice.',
    sSign:
      'You are someone who feels the split in the road before it arrives. Appetite and intuition guide you; you taste a path and know whether it resonates. Choice does not frighten you—divergence is how your life stays honest.',
  },
  {
    sName: 'The Port',
    sBinaryValue: '110',
    sMeaning: 'gateways, discovery, and trade',
    sDescription:
      'The Port is a threshold between waters and land, between systems and strangers. It governs gateways, discovery, and exchange—the open socket where traffic arrives. trade in this deck means trade of ideas and goods alike: what crosses the threshold changes both sides.',
    sSign:
      'You live at thresholds. Strangers, ideas, and goods pass through your life and leave both sides altered. Discovery suits you; so does exchange. You are less a sealed room than an open harbor where traffic is welcome and meaning is traded.',
  },
  {
    sName: 'The Tree',
    sBinaryValue: '111',
    sMeaning: 'fullness, growth, and reach',
    sDescription:
      'The Tree is fullness realized—roots deep, canopy wide, every bit set in its low nibble. It means growth that has become structure, reach that casts shade. Hierarchy and organic sprawl live together here: a living directory of what has been allowed to flourish.',
    sSign:
      'You are someone whose growth has become structure. Roots and reach both matter to you; you want depth and canopy at once. People find shade in what you have built—and you take quiet pride in how much has been allowed to flourish under your care.',
  },
  {
    sName: 'The Agent',
    sBinaryValue: '1000',
    sMeaning: 'independence, will, and action',
    sDescription:
      'The Agent acts on its own recognizance. Independence, will, and decisive motion define it—the process that runs without waiting for permission. It is autonomy made visible: a worker thread with intent, a person who moves because they chose to.',
    sSign:
      'You move because you chose to. Independence is not a pose for you—it is how decisions get made. Waiting for permission rarely suits you; will and action arrive together, and the world learns your shape by watching what you do next.',
  },
  {
    sName: 'The Table',
    sBinaryValue: '1001',
    sMeaning: 'gathering, consumption, and plots',
    sDescription:
      'The Table is where parties assemble—consumption, councils, quiet plots over shared surface. In data it is the schema that holds many rows; in life it is the room where plans become collective. What is spoken here can reorder the kingdom.',
    sSign:
      'You are at your sharpest when people gather. Meals, councils, and quiet plots over a shared surface are your element. Plans become real when spoken in your company—and what is said at your table has a way of rearranging the room.',
  },
  {
    sName: 'The Clone',
    sBinaryValue: '1010',
    sMeaning: 'mirrors, reproduction, and equality',
    sDescription:
      'The Clone multiplies a pattern until reflection becomes environment. Mirrors, copies, and equality live here—the duplicate that asks whether sameness is comfort or erasure. In code it is the deep copy; in spirit it is the question of what deserves to be repeated.',
    sSign:
      'You see patterns everywhere and know what deserves to be repeated. Mirrors and likenesses fascinate you; equality is both comfort and question. You multiply what works—and you notice when sameness starts to erase the original spark.',
  },
  {
    sName: 'The Cache',
    sBinaryValue: '1011',
    sMeaning: 'secrets, knowledge, and wealth',
    sDescription:
      'The Cache stores what was costly to obtain: secrets, hard-won knowledge, quiet wealth. It is the hidden buffer close to the throne of attention—fast to retrieve for those who know the key, invisible to those who do not. Hoard wisely; stale treasure misleads.',
    sSign:
      'You keep what was costly to learn. Secrets, craft, and quiet reserves live close to your attention—available to those who earn the key, invisible to those who do not. You hoard wisely, and you know that stale treasure can mislead as easily as it can save.',
  },
  {
    sName: 'The Frame',
    sBinaryValue: '1100',
    sMeaning: 'perspective, structure, and state of mind',
    sDescription:
      'The Frame is the viewport through which reality is rendered. Perspective, mental structure, and state of mind are its domain—the window object, the aspect ratio of belief. Change the frame and the same scene becomes another story.',
    sSign:
      'You understand that the story changes with the window. Perspective is your craft; state of mind is something you notice and adjust. Where others see a fixed scene, you see a frame that can be shifted—and with it, a different truth.',
  },
  {
    sName: 'The Shell',
    sBinaryValue: '1101',
    sMeaning: 'protection, boundaries, and rigidity',
    sDescription:
      'The Shell is armor and interface: protection, boundaries, and the rigidity that keeps chaos out. It is the command shell around a vulnerable kernel, the exoskeleton that can either preserve life or lock it in. Hard edges have a cost and a purpose.',
    sSign:
      'You know the worth of a hard edge. Boundaries protect what is soft in you, and rigidity is a tool you use on purpose. Others may call you closed; you call it interface—armor that lets the kernel keep running without every storm getting in.',
  },
  {
    sName: 'The Forum',
    sBinaryValue: '1110',
    sMeaning: 'nobility, philosophy, and debate',
    sDescription:
      'The Forum is the public square of thought—nobility of mind, philosophy, and open debate. Ideas contend here under rules of speech rather than force. It is the message board of the realm: status is earned in argument, not only in title.',
    sSign:
      'You thrive where ideas contend under fair rules. Philosophy and debate are not sport alone for you—they are how dignity is earned. You prefer the public square of thought to silent hierarchy, and status means more when it survives an argument.',
  },
  {
    sName: 'The State',
    sBinaryValue: '1111',
    sMeaning: 'organization, authority, and politics',
    sDescription:
      'The State is the full register—organization, authority, and politics machine that coordinates the many. Every bit lit, it is governance as system: laws, institutions, and the weight of collective order. Power here is structural, not merely personal.',
    sSign:
      'You see the system under the personalities. Organization and collective order come naturally; you think in institutions, rules, and the weight that holds many people together. Power, for you, is structural—less about the spotlight than about how the whole machine runs.',
  },
]

const arrOperatorPages: tCardPage[] = [
  {
    sSlug: 'and',
    sName: 'AND',
    sLabel: '&',
    sMeaning: 'intersection, filtering, and what both cards share',
    sDescription:
      'AND is the coin of intersection. It keeps only what both cards share, filtering the reading down to overlap, necessity, and the narrow truth that survives scrutiny. In bitwise terms it is masking; in meaning it is discernment—what remains when excess is refused.',
  },
  {
    sSlug: 'or',
    sName: 'OR',
    sLabel: '|',
    sMeaning: 'union, expansion, and everything either card offers',
    sDescription:
      'OR is the coin of union. It gathers everything either card offers, expanding the field instead of cutting it down. Bitwise it sets bits generously; symbolically it is inclusion, abundance, and the permission to hold more than one truth at once.',
  },
]

function objCardPageFromCard(objCard: tCard): tCardPage {
  return {
    sSlug: objCard.sBinaryValue,
    sName: objCard.sName,
    sLabel: objCard.sBinaryValue,
    sMeaning: objCard.sMeaning,
    sDescription: objCard.sDescription,
  }
}

const arrCardPages: tCardPage[] = [...arrCards.map(objCardPageFromCard), ...arrOperatorPages]

function objFindCardPage(sSlug: string): tCardPage | undefined {
  return arrCardPages.find((objPage: tCardPage) => objPage.sSlug === sSlug)
}

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
      ${sCardIconMarkup(objCard.sBinaryValue)}
      <h3>${objCard.sName} <span class="binary-value">(${objCard.sBinaryValue})</span></h3>
      <p>Represents ${objCard.sMeaning}.</p>
    </article>
  `
}

const sDevAiInstructions =
  `
  Binarot is a tarot-like deck where the rules are to draw two cards and flip a coin to get an AND/OR operation to apply. This results in a final card. Given the following reading, generate three concise paragraphs describing the meaning of the result. Give a sort of vague piece of life-advice without being too prescriptive, and use a soothing tone.
  
  <br><br>

  The first sentence of the first paragraph should be a kind of enigmatic introduction that is something quotable to take to heart.
  The second sentence should duly summarize the two cards and operation that created the result. The third sentence is a description of the result and what kind of environment this describes.

  <br><br>

  When writing the name of a card, capitalize the first letter and follow with its number in parentheses like so: "...The Seed (0)".

  <br><br>
 `

function sReadingResultMarkup(
  objLeft: tCard,
  objRight: tCard,
  sOp: tOperator,
  bIncludeAiInstructions: boolean = false,
): string {
  const objResult = objResolveReading(objLeft, objRight, sOp)
  const sSymbol = sOp === 'AND' ? '&' : '|'
  const sText = sReadingText(objLeft.sBinaryValue, objRight.sBinaryValue, sOp)
  const sTextMarkup = sText ? `<p class="reading-text">${sStyledReadingText(sText)}</p>` : ''
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

const sCardsMarkup: string = arrCardPages
  .map(
    (objPage: tCardPage) => `
      <li>
        <a class="card-item card-item-link" href="#card/${objPage.sSlug}">
          ${sCardIconMarkup(objPage.sSlug)}
          <h3>${objPage.sName} <span class="binary-value">(${objPage.sLabel})</span></h3>
          <p>Represents ${objPage.sMeaning}.</p>
        </a>
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
      <button type="button" class="tab-button" data-tab="birthday" aria-selected="false">Birthday</button>
      <button type="button" class="tab-button" data-tab="dev" aria-selected="false">Dev</button>
      <button type="button" class="tab-button" data-tab="about" aria-selected="false">About</button>
    </nav>

    <section class="tab-panel is-active" data-panel="cards">
      <div id="cards-index">
        <h2>Binarot Cards and Operations</h2>
        <ul class="card-list">
          ${sCardsMarkup}
        </ul>
      </div>
      <div id="cards-detail" class="card-detail" hidden></div>
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

    <section class="tab-panel" data-panel="birthday">
      <h2>Birthday Sign</h2>
      <p class="reading-intro">
        Enter your birth month and day to get your binarot sign.
      </p>
      <form class="birthday-controls" id="birthday-form">
        <label class="dev-field">
          <span>Month</span>
          <select id="birthday-month" name="month"></select>
        </label>
        <label class="dev-field">
          <span>Day</span>
          <select id="birthday-day" name="day"></select>
        </label>
      </form>
      <div class="birthday-result" id="birthday-result"></div>
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
        Binarot blends symbolic tarot interpretation with binary operations.
      </p>
      <p>
        There is an associated symbol for each binary number <code>0</code> to <code>1111</code>.
      </p>
      <p>
        The rules are to draw two cards and flip a coin (Heads is AND, Tails is OR) to get an AND/OR operation to apply and get a result. The job of the reader is to interpret the result in context of the operation that created it. For this site, the reader is me having prompted AI to get a reading for every combination.
      </p>
      <p>
        The card symbols were chosen by myself, a human, as both meaningful symbols slightly related to their given numbers, but also computer puns.
      </p>
    </section>
  </main>
`

const sCookieTab = 'binarot_tab'
const nCookieMaxAge = 60 * 60 * 24 * 365

function sCookieValue(sName: string): string | null {
  const sPrefix = `${encodeURIComponent(sName)}=`
  const arrParts = document.cookie.split(';')

  for (const sPart of arrParts) {
    const sTrimmed = sPart.trim()
    if (sTrimmed.startsWith(sPrefix)) {
      return decodeURIComponent(sTrimmed.slice(sPrefix.length))
    }
  }

  return null
}

function vSetCookie(sName: string, sValue: string): void {
  document.cookie = `${encodeURIComponent(sName)}=${encodeURIComponent(sValue)}; path=/; max-age=${nCookieMaxAge}; SameSite=Lax`
}

const arrTabButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('.tab-button'))
const arrTabPanels = Array.from(document.querySelectorAll<HTMLElement>('.tab-panel'))
const objCardsIndex = document.querySelector<HTMLElement>('#cards-index')!
const objCardsDetail = document.querySelector<HTMLElement>('#cards-detail')!

function bTabExists(sTabId: string): boolean {
  return arrTabButtons.some((objButton: HTMLButtonElement) => objButton.dataset.tab === sTabId)
}

function sCardSlugFromHash(): string | null {
  const sHash = location.hash.replace(/^#/, '')
  const arrMatch = /^card\/(.+)$/.exec(sHash)
  return arrMatch?.[1] ?? null
}

function sCardDetailMarkup(objPage: tCardPage): string {
  return `
    <button type="button" class="card-detail-back" id="card-detail-back">&larr; All cards</button>
    <div class="card-detail-header">
      ${sCardIconMarkup(objPage.sSlug, 'card-icon-detail')}
      <div class="card-detail-heading">
        <h2>${objPage.sName} <span class="binary-value">(${objPage.sLabel})</span></h2>
        <p class="card-detail-meaning">Represents ${objPage.sMeaning}.</p>
      </div>
    </div>
    <p class="card-detail-description">${objPage.sDescription}</p>
  `
}

function vShowCardsIndex(): void {
  objCardsIndex.hidden = false
  objCardsDetail.hidden = true
  objCardsDetail.innerHTML = ''
}

function vShowCardPage(sSlug: string): void {
  const objPage = objFindCardPage(sSlug)

  if (!objPage) {
    vShowCardsIndex()
    return
  }

  objCardsIndex.hidden = true
  objCardsDetail.hidden = false
  objCardsDetail.innerHTML = sCardDetailMarkup(objPage)
  document.querySelector<HTMLButtonElement>('#card-detail-back')?.addEventListener('click', () => {
    history.pushState(null, '', `${location.pathname}${location.search}`)
    vShowCardsIndex()
  })
}

function vSyncCardRoute(): void {
  const sSlug = sCardSlugFromHash()

  if (sSlug === null) {
    vShowCardsIndex()
    return
  }

  vActivateTab('cards')
  vShowCardPage(sSlug)
}

function vActivateTab(sTabId: string): void {
  arrTabButtons.forEach((objTabButton: HTMLButtonElement) => {
    const bIsActive = objTabButton.dataset.tab === sTabId
    objTabButton.classList.toggle('is-active', bIsActive)
    objTabButton.setAttribute('aria-selected', String(bIsActive))
  })

  arrTabPanels.forEach((objPanel: HTMLElement) => {
    objPanel.classList.toggle('is-active', objPanel.dataset.panel === sTabId)
  })

  vSetCookie(sCookieTab, sTabId)
}

arrTabButtons.forEach((objButton: HTMLButtonElement) => {
  objButton.addEventListener('click', () => {
    const sTabId = objButton.dataset.tab

    if (!sTabId) {
      return
    }

    if (sTabId !== 'cards' && sCardSlugFromHash() !== null) {
      history.replaceState(null, '', `${location.pathname}${location.search}`)
      vShowCardsIndex()
    }

    if (sTabId === 'cards' && sCardSlugFromHash() !== null) {
      history.replaceState(null, '', `${location.pathname}${location.search}`)
      vShowCardsIndex()
    }

    vActivateTab(sTabId)
  })
})

window.addEventListener('hashchange', vSyncCardRoute)

const sSavedTab = sCookieValue(sCookieTab)
if (sCardSlugFromHash() !== null) {
  vSyncCardRoute()
} else if (sSavedTab !== null && bTabExists(sSavedTab)) {
  vActivateTab(sSavedTab)
}

function objFindCardByBinary(sBinary: string): tCard {
  return arrCards.find((objCard: tCard) => objCard.sBinaryValue === sBinary)!
}

const objDrawButton = document.querySelector<HTMLButtonElement>('#reading-draw')!
const objReadingResult = document.querySelector<HTMLDivElement>('#reading-result')!

const arrDrawLoadLines: string[] = [
  'shuffling deck...',
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
      <p class="reading-console-line reading-console-prompt"><span class="reading-console-caret">&gt;</span> binarot draw</p>
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

const sDevCookieLeft = 'binarot_dev_left'
const sDevCookieRight = 'binarot_dev_right'
const sDevCookieOp = 'binarot_dev_op'

function bSelectHasValue(objSelect: HTMLSelectElement, sValue: string): boolean {
  return Array.from(objSelect.options).some((objOption: HTMLOptionElement) => objOption.value === sValue)
}

function vRestoreDevControls(): void {
  const sLeft = sCookieValue(sDevCookieLeft)
  const sRight = sCookieValue(sDevCookieRight)
  const sOp = sCookieValue(sDevCookieOp)

  if (sLeft !== null && bSelectHasValue(objDevLeft, sLeft)) {
    objDevLeft.value = sLeft
  }

  if (sRight !== null && bSelectHasValue(objDevRight, sRight)) {
    objDevRight.value = sRight
  }

  if (sOp !== null && bSelectHasValue(objDevOp, sOp)) {
    objDevOp.value = sOp
  }
}

function vSaveDevControls(): void {
  vSetCookie(sDevCookieLeft, objDevLeft.value)
  vSetCookie(sDevCookieRight, objDevRight.value)
  vSetCookie(sDevCookieOp, objDevOp.value)
}

function vUpdateDevReading(): void {
  const objLeft = objFindCardByBinary(objDevLeft.value)
  const objRight = objFindCardByBinary(objDevRight.value)
  const sOp = objDevOp.value as tOperator

  vSaveDevControls()
  objDevResult.innerHTML = sReadingResultMarkup(objLeft, objRight, sOp, true)
}

objDevLeft.addEventListener('change', vUpdateDevReading)
objDevRight.addEventListener('change', vUpdateDevReading)
objDevOp.addEventListener('change', vUpdateDevReading)
vRestoreDevControls()
vUpdateDevReading()

const nDaysInYear = 366
const arrDaysInMonthLeap: number[] = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const arrMonthNames: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function nDayOfYearFromMonthDay(nMonth: number, nDay: number): number {
  let nDayOfYear = 0

  for (let nMonthIndex = 0; nMonthIndex < nMonth - 1; nMonthIndex += 1) {
    nDayOfYear += arrDaysInMonthLeap[nMonthIndex]!
  }

  return nDayOfYear + (nDay - 1)
}

function objCardFromBirthday(nMonth: number, nDay: number): tCard {
  const nDayOfYear = nDayOfYearFromMonthDay(nMonth, nDay)
  const nIndex = Math.min(arrCards.length - 1, Math.floor((nDayOfYear * arrCards.length) / nDaysInYear))
  return arrCards[nIndex]!
}

const objBirthdayMonth = document.querySelector<HTMLSelectElement>('#birthday-month')!
const objBirthdayDay = document.querySelector<HTMLSelectElement>('#birthday-day')!
const objBirthdayResult = document.querySelector<HTMLDivElement>('#birthday-result')!

function vFillBirthdayMonths(): void {
  objBirthdayMonth.innerHTML = arrMonthNames
    .map((sName: string, nIndex: number) => `<option value="${nIndex + 1}">${sName}</option>`)
    .join('')
}

function vFillBirthdayDays(nMonth: number, nSelectedDay: number): void {
  const nDaysInMonth = arrDaysInMonthLeap[nMonth - 1]!
  const nDay = Math.min(nSelectedDay, nDaysInMonth)

  objBirthdayDay.innerHTML = Array.from({ length: nDaysInMonth }, (_: unknown, nIndex: number) => {
    const nValue = nIndex + 1
    const sSelected = nValue === nDay ? ' selected' : ''
    return `<option value="${nValue}"${sSelected}>${nValue}</option>`
  }).join('')
}

function vUpdateBirthdaySign(): void {
  const nMonth = Number(objBirthdayMonth.value)
  const nDay = Number(objBirthdayDay.value)
  const objCard = objCardFromBirthday(nMonth, nDay)
  const nDayOfYear = nDayOfYearFromMonthDay(nMonth, nDay)

  objBirthdayResult.innerHTML = `
    ${sCardItemMarkup(objCard)}
    <p class="birthday-sign">${objCard.sSign}</p>
  `
}

vFillBirthdayMonths()

const objToday = new Date()
objBirthdayMonth.value = String(objToday.getMonth() + 1)
vFillBirthdayDays(Number(objBirthdayMonth.value), objToday.getDate())

objBirthdayMonth.addEventListener('change', () => {
  vFillBirthdayDays(Number(objBirthdayMonth.value), Number(objBirthdayDay.value))
  vUpdateBirthdaySign()
})
objBirthdayDay.addEventListener('change', vUpdateBirthdaySign)
vUpdateBirthdaySign()
