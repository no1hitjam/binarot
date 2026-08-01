import { sCardIconMarkup } from './cardIcons'

type tElementCardRef = {
  sName: string
  sBinaryValue: string
  sMeaning: string
}

type tElement = {
  sName: string
  sBinaryValue: string
  /** CSS color for the element swatch. */
  sHue: string
  sNote: string
}

/**
 * One alchemical substance per binarot sign, paired for fit with each archetype.
 * Classical elements, the tria prima, metals, and laboratory reagents.
 */
const arrElements: tElement[] = [
  {
    sName: 'Prima Materia',
    sBinaryValue: '0',
    sHue: '#c8c4b8',
    sNote:
      'The formless stock before any work begins—potential without recipe. The Seed is matter still unnamed.',
  },
  {
    sName: 'Fire',
    sBinaryValue: '1',
    sHue: '#e85a2a',
    sNote:
      'Claim and heat that plants a stake in the dark. The Flag is sovereignty lit and held.',
  },
  {
    sName: 'Air',
    sBinaryValue: '10',
    sHue: '#a8d4e8',
    sNote:
      'The medium of signals—summons that travel before they arrive. The Call rides the wind.',
  },
  {
    sName: 'Water',
    sBinaryValue: '11',
    sHue: '#3a7ec8',
    sNote:
      'Bonds that flow and still hold. The Link is fidelity as a continuous medium.',
  },
  {
    sName: 'Earth',
    sBinaryValue: '100',
    sHue: '#7a6a4a',
    sNote:
      'Shelter underfoot—stewardship of ground and dwelling. The Host is home as substrate.',
  },
  {
    sName: 'Mercury',
    sBinaryValue: '101',
    sHue: '#b8b8c0',
    sNote:
      'Quicksilver of the dual path—volatile, mirroring, never one thing for long. The Fork is the split that still flows.',
  },
  {
    sName: 'Salt',
    sBinaryValue: '110',
    sHue: '#e8e4dc',
    sNote:
      'Crystal at the threshold—body that marks a crossing and keeps it. The Port is the gate made tangible.',
  },
  {
    sName: 'Sulfur',
    sBinaryValue: '111',
    sHue: '#d4b84a',
    sNote:
      'Combustible soul of growth—the vegetative fire that reaches. The Tree is sulfur rising into canopy.',
  },
  {
    sName: 'Iron',
    sBinaryValue: '1000',
    sHue: '#6a6a72',
    sNote:
      'Martial metal of will—action cooled into edge. The Agent does not wait for permission to cut.',
  },
  {
    sName: 'Copper',
    sBinaryValue: '1001',
    sHue: '#c8783a',
    sNote:
      'Soft metal of feasts and closed-door plots. The Table is where plans are set like place settings.',
  },
  {
    sName: 'Silver',
    sBinaryValue: '1010',
    sHue: '#c8d0d8',
    sNote:
      'Lunar mirror that multiplies without loss. The Clone is equality reflected face to face.',
  },
  {
    sName: 'Lead',
    sBinaryValue: '1011',
    sHue: '#4a4a52',
    sNote:
      'Heavy vault of reserved weight—knowledge kept until the right hour. The Cache is Saturn’s store.',
  },
  {
    sName: 'Vitriol',
    sBinaryValue: '1100',
    sHue: '#5a8a6a',
    sNote:
      'The solvent that teaches structure—Visita Interiora Terrae… The Frame is how the eye learns to see.',
  },
  {
    sName: 'Lime',
    sBinaryValue: '1101',
    sHue: '#d8d0c0',
    sNote:
      'Calcined perimeter—armor burned hard around a soft center. The Shell is the boundary that holds.',
  },
  {
    sName: 'Antimony',
    sBinaryValue: '1110',
    sHue: '#3a4a6a',
    sNote:
      'Starred regulus of the public work—metal of argument under a clear crown. The Forum is dignity in debate.',
  },
  {
    sName: 'Gold',
    sBinaryValue: '1111',
    sHue: '#e0b84a',
    sNote:
      'The completed work—maximum hardness under a clear crown. The State is authority as perfected structure.',
  },
]

function sElementItemMarkup(
  objElement: tElement,
  mapCard: Map<string, tElementCardRef>,
): string {
  const objCard = mapCard.get(objElement.sBinaryValue)
  if (!objCard) {
    return ''
  }

  return `
    <li class="element-item">
      <div class="element-heading">
        <span class="element-swatch" style="--element-hue: ${objElement.sHue}" aria-hidden="true"></span>
        <h3 class="element-name">${objElement.sName}</h3>
      </div>
      <a class="element-sign card-item-link" href="#card/${objCard.sBinaryValue}">
        ${sCardIconMarkup(objCard.sBinaryValue, 'element-sign-icon')}
        <span class="element-sign-text">
          <span class="element-sign-name">${objCard.sName} <span class="binary-value">(${objCard.sBinaryValue})</span></span>
          <span class="element-sign-meaning">${objCard.sMeaning}</span>
        </span>
      </a>
      <p class="element-note">${objElement.sNote}</p>
    </li>
  `
}

export function sElementsMarkup(arrCards: tElementCardRef[]): string {
  const mapCard = new Map(
    arrCards.map((objCard) => [objCard.sBinaryValue, objCard] as const),
  )
  const sItems = arrElements.map((objElement) => sElementItemMarkup(objElement, mapCard)).join('')

  return `
    <div class="elements" id="elements">
      <ul class="element-list">${sItems}</ul>
    </div>
  `
}

type tAlchemyOp = 'AND' | 'OR'

function nElementValue(objElement: tElement): number {
  return parseInt(objElement.sBinaryValue, 2)
}

function objFindElementByBinary(sBinaryValue: string): tElement {
  return arrElements.find((objElement) => objElement.sBinaryValue === sBinaryValue)!
}

function objFindElementByValue(nValue: number): tElement {
  return arrElements.find((objElement) => nElementValue(objElement) === nValue)!
}

function objResolveAlchemy(
  objLeft: tElement,
  objRight: tElement,
  sOp: tAlchemyOp,
): tElement {
  const nLeft = nElementValue(objLeft)
  const nRight = nElementValue(objRight)
  const nResult = sOp === 'AND' ? nLeft & nRight : nLeft | nRight
  return objFindElementByValue(nResult)
}

function sElementOptionMarkup(objElement: tElement, sSelectedBinary: string): string {
  const sSelected = objElement.sBinaryValue === sSelectedBinary ? ' selected' : ''
  return `<option value="${objElement.sBinaryValue}"${sSelected}>${objElement.sName} (${objElement.sBinaryValue})</option>`
}

function sAlchemyFlaskSvg(sClass: string): string {
  return `
    <svg class="alchemy-flask-svg ${sClass}" viewBox="0 0 90 140" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="alchemy-glass-${sClass}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="rgba(255,255,255,0.28)" />
          <stop offset="45%" stop-color="rgba(200,210,230,0.08)" />
          <stop offset="100%" stop-color="rgba(40,30,60,0.2)" />
        </linearGradient>
        <clipPath id="alchemy-bulb-${sClass}">
          <path d="M34 48 V28 H56 V48 C72 58 80 76 80 96 C80 118 66 132 45 132 C24 132 10 118 10 96 C10 76 18 58 34 48 Z" />
        </clipPath>
      </defs>
      <path
        class="alchemy-flask-outline"
        d="M34 48 V28 H56 V48 C72 58 80 76 80 96 C80 118 66 132 45 132 C24 132 10 118 10 96 C10 76 18 58 34 48 Z"
        fill="url(#alchemy-glass-${sClass})"
      />
      <g clip-path="url(#alchemy-bulb-${sClass})">
        <rect class="alchemy-flask-liquid" x="8" y="78" width="74" height="58" />
        <g class="alchemy-flask-bubbles">
          <circle class="alchemy-bubble alchemy-bubble-a" cx="32" cy="108" r="2.2" />
          <circle class="alchemy-bubble alchemy-bubble-b" cx="48" cy="100" r="1.6" />
          <circle class="alchemy-bubble alchemy-bubble-c" cx="58" cy="112" r="2" />
        </g>
      </g>
      <path
        class="alchemy-flask-rim"
        d="M32 28 H58"
      />
      <path
        class="alchemy-flask-shine"
        d="M22 88 C24 72 28 60 36 52"
      />
      <rect class="alchemy-flask-neck" x="34" y="12" width="22" height="18" rx="1" />
      <rect class="alchemy-flask-stopper" x="31" y="6" width="28" height="8" rx="1.5" />
    </svg>
  `
}

function sAlchemyFurnaceSvg(): string {
  return `
    <svg class="alchemy-furnace-svg" viewBox="0 0 120 150" aria-hidden="true" focusable="false">
      <path
        class="alchemy-furnace-body"
        d="M28 48 H92 V118 C92 132 78 140 60 140 C42 140 28 132 28 118 Z"
      />
      <path
        class="alchemy-furnace-door"
        d="M44 72 H76 V112 C76 120 69 126 60 126 C51 126 44 120 44 112 Z"
      />
      <g class="alchemy-furnace-fire">
        <path class="alchemy-flame alchemy-flame-a" d="M60 118 C52 104 54 92 60 84 C66 92 68 104 60 118 Z" />
        <path class="alchemy-flame alchemy-flame-b" d="M52 118 C46 108 48 98 54 92 C56 100 58 108 52 118 Z" />
        <path class="alchemy-flame alchemy-flame-c" d="M68 118 C74 108 72 98 66 92 C64 100 62 108 68 118 Z" />
      </g>
      <rect class="alchemy-furnace-collar" x="36" y="38" width="48" height="12" rx="2" />
      <path class="alchemy-alembic-head" d="M42 38 C42 18 78 18 78 38" />
      <path class="alchemy-alembic-spout" d="M78 28 C96 24 108 36 112 52" />
      <circle class="alchemy-alembic-bead" cx="112" cy="54" r="3.5" />
      <g class="alchemy-furnace-vapor">
        <path class="alchemy-vapor alchemy-vapor-a" d="M48 34 C46 24 52 18 50 10" />
        <path class="alchemy-vapor alchemy-vapor-b" d="M60 32 C62 22 58 16 62 8" />
        <path class="alchemy-vapor alchemy-vapor-c" d="M72 34 C74 26 70 18 74 12" />
      </g>
    </svg>
  `
}

function sAlchemyResultMarkup(
  objLeft: tElement,
  objRight: tElement,
  sOp: tAlchemyOp,
): string {
  const objResult = objResolveAlchemy(objLeft, objRight, sOp)
  const sSymbol = sOp === 'AND' ? '&' : '|'
  const sOpLabel = sOp === 'AND' ? 'Distill · AND' : 'Amalgam · OR'

  return `
    <p class="alchemy-ledger" aria-live="polite">
      <span class="alchemy-ledger-line">Workbench note</span>
      <span class="alchemy-equation">
        <span class="alchemy-term">
          <span class="element-swatch" style="--element-hue: ${objLeft.sHue}" aria-hidden="true"></span>
          ${objLeft.sName} <span class="binary-value">(${objLeft.sBinaryValue})</span>
        </span>
        <span class="alchemy-op">${sSymbol}</span>
        <span class="alchemy-term">
          <span class="element-swatch" style="--element-hue: ${objRight.sHue}" aria-hidden="true"></span>
          ${objRight.sName} <span class="binary-value">(${objRight.sBinaryValue})</span>
        </span>
        <span class="alchemy-eq">→</span>
        <span class="alchemy-term alchemy-term-result">
          <span class="element-swatch" style="--element-hue: ${objResult.sHue}" aria-hidden="true"></span>
          ${objResult.sName} <span class="binary-value">(${objResult.sBinaryValue})</span>
        </span>
      </span>
      <span class="alchemy-op-label">${sOpLabel}</span>
    </p>
  `
}

export function sAlchemyMarkup(): string {
  const sOptionsLeft = arrElements
    .map((objElement) => sElementOptionMarkup(objElement, '1'))
    .join('')
  const sOptionsRight = arrElements
    .map((objElement) => sElementOptionMarkup(objElement, '100'))
    .join('')

  return `
    <div class="alchemy" id="alchemy">
      <h3>Alchemical calculator</h3>
      <p class="reading-intro">
        Charge two retorts, set the athanor to <code>AND</code> (distill what both share) or
        <code>OR</code> (amalgamate either gift), and read the product that condenses in the
        receiving flask.
      </p>
      <form class="alchemy-bench" id="alchemy-form" data-op="OR">
        <div class="alchemy-apparatus">
          <div class="alchemy-station alchemy-station-retort" data-side="left" style="--flask-hue: #e85a2a">
            <div class="alchemy-vessel">
              ${sAlchemyFlaskSvg('alchemy-flask-left')}
              <span class="alchemy-vessel-label" id="alchemy-left-name">Fire</span>
            </div>
            <label class="alchemy-field">
              <span>Left retort</span>
              <select id="alchemy-left" name="left" aria-describedby="alchemy-left-name">${sOptionsLeft}</select>
            </label>
          </div>

          <div class="alchemy-pipe alchemy-pipe-left" aria-hidden="true">
            <span class="alchemy-pipe-flow"></span>
          </div>

          <div class="alchemy-station alchemy-station-furnace">
            <div class="alchemy-vessel alchemy-vessel-furnace">
              ${sAlchemyFurnaceSvg()}
              <span class="alchemy-vessel-label alchemy-furnace-mode" id="alchemy-op-name">Amalgam · OR</span>
            </div>
            <label class="alchemy-field">
              <span>Athanor</span>
              <select id="alchemy-op" name="op">
                <option value="AND">Distill · AND (&amp;)</option>
                <option value="OR" selected>Amalgam · OR (|)</option>
              </select>
            </label>
          </div>

          <div class="alchemy-pipe alchemy-pipe-right" aria-hidden="true">
            <span class="alchemy-pipe-flow"></span>
          </div>

          <div class="alchemy-station alchemy-station-retort-right" data-side="right" style="--flask-hue: #7a6a4a">
            <div class="alchemy-vessel">
              ${sAlchemyFlaskSvg('alchemy-flask-right')}
              <span class="alchemy-vessel-label" id="alchemy-right-name">Earth</span>
            </div>
            <label class="alchemy-field">
              <span>Right retort</span>
              <select id="alchemy-right" name="right" aria-describedby="alchemy-right-name">${sOptionsRight}</select>
            </label>
          </div>
        </div>

        <div class="alchemy-actions">
          <button type="button" class="reading-draw alchemy-run" id="alchemy-run">
            Collect distillate
          </button>
        </div>

        <div class="alchemy-product" id="alchemy-product" style="--flask-hue: #b8b8c0" hidden>
          <div class="alchemy-product-flask">
            ${sAlchemyFlaskSvg('alchemy-flask-product')}
          </div>
          <div class="alchemy-product-copy">
            <span class="alchemy-product-kicker">Receiving flask</span>
            <strong class="alchemy-product-name" id="alchemy-product-name">Mercury</strong>
            <span class="alchemy-product-binary binary-value" id="alchemy-product-binary">(101)</span>
            <p class="alchemy-product-note" id="alchemy-product-note"></p>
          </div>
        </div>
      </form>
      <div class="alchemy-result" id="alchemy-result"></div>
    </div>
  `
}

export function vBindAlchemy(): void {
  const objForm = document.querySelector<HTMLFormElement>('#alchemy-form')
  const objLeftSelect = document.querySelector<HTMLSelectElement>('#alchemy-left')
  const objRightSelect = document.querySelector<HTMLSelectElement>('#alchemy-right')
  const objOpSelect = document.querySelector<HTMLSelectElement>('#alchemy-op')
  const objRun = document.querySelector<HTMLButtonElement>('#alchemy-run')
  const objResultHost = document.querySelector<HTMLDivElement>('#alchemy-result')
  const objLeftStation = document.querySelector<HTMLElement>('.alchemy-station-retort')
  const objRightStation = document.querySelector<HTMLElement>('.alchemy-station-retort-right')
  const objProduct = document.querySelector<HTMLElement>('#alchemy-product')
  const objLeftName = document.querySelector<HTMLElement>('#alchemy-left-name')
  const objRightName = document.querySelector<HTMLElement>('#alchemy-right-name')
  const objOpName = document.querySelector<HTMLElement>('#alchemy-op-name')
  const objProductName = document.querySelector<HTMLElement>('#alchemy-product-name')
  const objProductBinary = document.querySelector<HTMLElement>('#alchemy-product-binary')
  const objProductNote = document.querySelector<HTMLElement>('#alchemy-product-note')
  if (
    !objForm ||
    !objLeftSelect ||
    !objRightSelect ||
    !objOpSelect ||
    !objRun ||
    !objResultHost ||
    !objLeftStation ||
    !objRightStation ||
    !objProduct ||
    !objLeftName ||
    !objRightName ||
    !objOpName ||
    !objProductName ||
    !objProductBinary ||
    !objProductNote
  ) {
    return
  }

  function vHideProduct(): void {
    objProduct!.hidden = true
    objProduct!.classList.remove('is-filled')
    objResultHost!.innerHTML = ''
  }

  function vSyncInputs(): void {
    const objLeft = objFindElementByBinary(objLeftSelect!.value)
    const objRight = objFindElementByBinary(objRightSelect!.value)
    const sOp: tAlchemyOp = objOpSelect!.value === 'OR' ? 'OR' : 'AND'

    objForm!.dataset.op = sOp
    objLeftStation!.style.setProperty('--flask-hue', objLeft.sHue)
    objRightStation!.style.setProperty('--flask-hue', objRight.sHue)
    objLeftName!.textContent = objLeft.sName
    objRightName!.textContent = objRight.sName
    objOpName!.textContent = sOp === 'AND' ? 'Distill · AND' : 'Amalgam · OR'
    vHideProduct()
  }

  function vCollectProduct(): void {
    const objLeft = objFindElementByBinary(objLeftSelect!.value)
    const objRight = objFindElementByBinary(objRightSelect!.value)
    const sOp: tAlchemyOp = objOpSelect!.value === 'OR' ? 'OR' : 'AND'
    const objResult = objResolveAlchemy(objLeft, objRight, sOp)

    objProduct!.style.setProperty('--flask-hue', objResult.sHue)
    objProductName!.textContent = objResult.sName
    objProductBinary!.textContent = `(${objResult.sBinaryValue})`
    objProductNote!.textContent = objResult.sNote
    objResultHost!.innerHTML = sAlchemyResultMarkup(objLeft, objRight, sOp)

    objProduct!.classList.remove('is-filled')
    objProduct!.hidden = false
    void objProduct!.offsetWidth
    objProduct!.classList.add('is-filled')
  }

  objForm.addEventListener('submit', (objEvent) => {
    objEvent.preventDefault()
  })
  objLeftSelect.addEventListener('change', vSyncInputs)
  objRightSelect.addEventListener('change', vSyncInputs)
  objOpSelect.addEventListener('change', vSyncInputs)
  objRun.addEventListener('click', vCollectProduct)
  vSyncInputs()
}
