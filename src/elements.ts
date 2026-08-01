import { sCardIconMarkup } from './cardIcons'

type tElementCardRef = {
  sName: string
  sBinaryValue: string
  sMeaning: string
}

type tElementForm =
  | 'flame'
  | 'vapor'
  | 'liquid'
  | 'stone'
  | 'crystal'
  | 'powder'
  | 'metal'

type tElement = {
  sName: string
  sBinaryValue: string
  /** CSS color for the element swatch. */
  sHue: string
  /** How the substance presents in the workbench vessels. */
  sForm: tElementForm
  sNote: string
}

/**
 * One alchemical substance per binarot sign, paired for fit with each archetype.
 * Fire and water are reserved for the AND/OR operations; air opens the Seed.
 */
const arrElements: tElement[] = [
  {
    sName: 'Air',
    sBinaryValue: '0',
    sHue: '#a8d4e8',
    sForm: 'vapor',
    sNote:
      'Breath before form—the first stirring of the work. The Seed is potential riding on wind.',
  },
  {
    sName: 'Cinnabar',
    sBinaryValue: '1',
    sHue: '#c43a2a',
    sForm: 'powder',
    sNote:
      'Vermilion ore of claim—red mercury that marks a stake. The Flag is sovereignty as pigment held.',
  },
  {
    sName: 'Nitre',
    sBinaryValue: '10',
    sHue: '#d0d8e0',
    sForm: 'crystal',
    sNote:
      'Saltpeter of the summons—volatile crystal that carries a call. The Call rides the spark in the salt.',
  },
  {
    sName: 'Oil',
    sBinaryValue: '11',
    sHue: '#8a6a28',
    sForm: 'liquid',
    sNote:
      'The medium that binds without freezing—slippery fidelity. The Link is contact as a continuous film.',
  },
  {
    sName: 'Earth',
    sBinaryValue: '100',
    sHue: '#7a6a4a',
    sForm: 'stone',
    sNote:
      'Shelter underfoot—stewardship of ground and dwelling. The Host is home as substrate.',
  },
  {
    sName: 'Mercury',
    sBinaryValue: '101',
    sHue: '#b8b8c0',
    sForm: 'liquid',
    sNote:
      'Quicksilver of the dual path—volatile, mirroring, never one thing for long. The Fork is the split that still flows.',
  },
  {
    sName: 'Salt',
    sBinaryValue: '110',
    sHue: '#e8e4dc',
    sForm: 'crystal',
    sNote:
      'Crystal at the threshold—body that marks a crossing and keeps it. The Port is the gate made tangible.',
  },
  {
    sName: 'Sulfur',
    sBinaryValue: '111',
    sHue: '#d4b84a',
    sForm: 'powder',
    sNote:
      'Combustible soul of growth—the vegetative fire that reaches. The Tree is sulfur rising into canopy.',
  },
  {
    sName: 'Iron',
    sBinaryValue: '1000',
    sHue: '#6a6a72',
    sForm: 'metal',
    sNote:
      'Martial metal of will—action cooled into edge. The Agent does not wait for permission to cut.',
  },
  {
    sName: 'Copper',
    sBinaryValue: '1001',
    sHue: '#c8783a',
    sForm: 'metal',
    sNote:
      'Soft metal of feasts and closed-door plots. The Table is where plans are set like place settings.',
  },
  {
    sName: 'Silver',
    sBinaryValue: '1010',
    sHue: '#c8d0d8',
    sForm: 'metal',
    sNote:
      'Lunar mirror that multiplies without loss. The Clone is equality reflected face to face.',
  },
  {
    sName: 'Lead',
    sBinaryValue: '1011',
    sHue: '#4a4a52',
    sForm: 'metal',
    sNote:
      'Heavy vault of reserved weight—knowledge kept until the right hour. The Cache is Saturn’s store.',
  },
  {
    sName: 'Wood',
    sBinaryValue: '1100',
    sHue: '#8a5a32',
    sForm: 'stone',
    sNote:
      'Timber of perspective—grain that teaches how to see a room. The Frame is structure grown, then cut to hold the view.',
  },
  {
    sName: 'Lime',
    sBinaryValue: '1101',
    sHue: '#d8d0c0',
    sForm: 'powder',
    sNote:
      'Calcined perimeter—armor burned hard around a soft center. The Shell is the boundary that holds.',
  },
  {
    sName: 'Antimony',
    sBinaryValue: '1110',
    sHue: '#3a4a6a',
    sForm: 'metal',
    sNote:
      'Starred regulus of the public work—metal of argument under a clear crown. The Forum is dignity in debate.',
  },
  {
    sName: 'Gold',
    sBinaryValue: '1111',
    sHue: '#e0b84a',
    sForm: 'metal',
    sNote:
      'The completed work—maximum hardness under a clear crown. The State is authority as perfected structure.',
  },
]

type tOperatorElement = {
  sName: string
  sSlug: string
  sLabel: string
  sHue: string
  sMeaning: string
  sNote: string
}

/** Fire and water sit outside the 4-bit register—operators, not reagents. */
const arrOperatorElements: tOperatorElement[] = [
  {
    sName: 'Fire',
    sSlug: 'and',
    sLabel: '&',
    sHue: '#e07030',
    sMeaning: 'intersection, filtering, and what both cards share',
    sNote:
      'The focused burn of AND—heat that keeps only overlap. Fire is the athanor’s strict gate: what survives the flame is what both charges held in common.',
  },
  {
    sName: 'Water',
    sSlug: 'or',
    sLabel: '|',
    sHue: '#3a7ab0',
    sMeaning: 'union, expansion, and everything either card offers',
    sNote:
      'The gathering flood of OR—water that takes either gift. The flood does not choose; it carries every bit either vessel offered into one basin.',
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

function sOperatorElementItemMarkup(objOp: tOperatorElement): string {
  const sOpName = objOp.sSlug.toUpperCase()
  return `
    <li class="element-item element-item-operator">
      <div class="element-heading">
        <span class="element-swatch" style="--element-hue: ${objOp.sHue}" aria-hidden="true"></span>
        <h3 class="element-name">${objOp.sName}</h3>
      </div>
      <a class="element-sign card-item-link" href="#card/${objOp.sSlug}">
        ${sCardIconMarkup(objOp.sSlug, 'element-sign-icon')}
        <span class="element-sign-text">
          <span class="element-sign-name">${sOpName} <span class="binary-value">(${objOp.sLabel})</span></span>
          <span class="element-sign-meaning">${objOp.sMeaning}</span>
        </span>
      </a>
      <p class="element-note">${objOp.sNote}</p>
    </li>
  `
}

export function sElementsMarkup(arrCards: tElementCardRef[]): string {
  const mapCard = new Map(
    arrCards.map((objCard) => [objCard.sBinaryValue, objCard] as const),
  )
  const sSignItems = arrElements
    .map((objElement) => sElementItemMarkup(objElement, mapCard))
    .join('')
  const sOpItems = arrOperatorElements.map(sOperatorElementItemMarkup).join('')

  return `
    <div class="elements" id="elements">
      <ul class="element-list">${sSignItems}${sOpItems}</ul>
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

function sAlchemyGlassShell(sId: string): string {
  return `
    <defs>
      <linearGradient id="alchemy-glass-${sId}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,0.28)" />
        <stop offset="45%" stop-color="rgba(200,210,230,0.08)" />
        <stop offset="100%" stop-color="rgba(40,30,60,0.2)" />
      </linearGradient>
      <clipPath id="alchemy-bulb-${sId}">
        <path d="M34 48 V28 H56 V48 C72 58 80 76 80 96 C80 118 66 132 45 132 C24 132 10 118 10 96 C10 76 18 58 34 48 Z" />
      </clipPath>
    </defs>
    <path
      class="alchemy-flask-outline"
      d="M34 48 V28 H56 V48 C72 58 80 76 80 96 C80 118 66 132 45 132 C24 132 10 118 10 96 C10 76 18 58 34 48 Z"
      fill="url(#alchemy-glass-${sId})"
    />
  `
}

function sAlchemyGlassOverlay(): string {
  return `
    <path class="alchemy-flask-rim" d="M32 28 H58" />
    <path class="alchemy-flask-shine" d="M22 88 C24 72 28 60 36 52" />
    <rect class="alchemy-flask-neck" x="34" y="12" width="22" height="18" rx="1" />
    <rect class="alchemy-flask-stopper" x="31" y="6" width="28" height="8" rx="1.5" />
  `
}

function sAlchemyDishBase(): string {
  return `
    <ellipse class="alchemy-dish-shadow" cx="45" cy="128" rx="34" ry="6" />
    <path
      class="alchemy-dish-bowl"
      d="M14 98 C14 88 28 82 45 82 C62 82 76 88 76 98 L72 118 C72 126 60 132 45 132 C30 132 18 126 18 118 Z"
    />
    <ellipse class="alchemy-dish-rim" cx="45" cy="98" rx="31" ry="8" />
  `
}

function sAlchemyMatterSvg(sId: string, sForm: tElementForm): string {
  if (sForm === 'flame') {
    return `
      <svg class="alchemy-matter-svg" data-form="flame" viewBox="0 0 90 140" aria-hidden="true" focusable="false">
        ${sAlchemyDishBase()}
        <g class="alchemy-matter-fill alchemy-flame-fill">
          <path class="alchemy-matter-flame alchemy-matter-flame-a" d="M45 98 C36 84 38 70 45 58 C52 70 54 84 45 98 Z" />
          <path class="alchemy-matter-flame alchemy-matter-flame-b" d="M34 100 C28 88 30 76 38 68 C40 78 42 88 34 100 Z" />
          <path class="alchemy-matter-flame alchemy-matter-flame-c" d="M56 100 C62 88 60 76 52 68 C50 78 48 88 56 100 Z" />
          <path class="alchemy-matter-flame alchemy-matter-flame-core" d="M45 96 C41 88 42 80 45 74 C48 80 49 88 45 96 Z" />
        </g>
      </svg>
    `
  }

  if (sForm === 'stone') {
    return `
      <svg class="alchemy-matter-svg" data-form="stone" viewBox="0 0 90 140" aria-hidden="true" focusable="false">
        ${sAlchemyDishBase()}
        <g class="alchemy-matter-fill alchemy-stone-fill">
          <path class="alchemy-matter-stone alchemy-matter-stone-a" d="M22 108 L34 86 L52 92 L48 114 L28 116 Z" />
          <path class="alchemy-matter-stone alchemy-matter-stone-b" d="M46 100 L58 78 L74 90 L70 112 L50 114 Z" />
          <path class="alchemy-matter-stone alchemy-matter-stone-c" d="M36 114 L44 102 L58 108 L54 122 L40 124 Z" />
        </g>
      </svg>
    `
  }

  if (sForm === 'crystal') {
    return `
      <svg class="alchemy-matter-svg" data-form="crystal" viewBox="0 0 90 140" aria-hidden="true" focusable="false">
        ${sAlchemyDishBase()}
        <g class="alchemy-matter-fill alchemy-crystal-fill">
          <path class="alchemy-matter-crystal alchemy-matter-crystal-a" d="M45 70 L54 100 L45 118 L36 100 Z" />
          <path class="alchemy-matter-crystal alchemy-matter-crystal-b" d="M28 84 L36 108 L28 120 L20 106 Z" />
          <path class="alchemy-matter-crystal alchemy-matter-crystal-c" d="M62 82 L70 104 L62 118 L54 102 Z" />
          <path class="alchemy-matter-crystal alchemy-matter-crystal-d" d="M40 90 L46 108 L40 116 L34 106 Z" />
        </g>
      </svg>
    `
  }

  if (sForm === 'powder') {
    return `
      <svg class="alchemy-matter-svg" data-form="powder" viewBox="0 0 90 140" aria-hidden="true" focusable="false">
        ${sAlchemyDishBase()}
        <g class="alchemy-matter-fill alchemy-powder-fill">
          <path class="alchemy-matter-powder" d="M20 112 C24 96 34 88 45 88 C56 88 66 96 70 112 C62 118 52 122 45 122 C38 122 28 118 20 112 Z" />
          <circle class="alchemy-matter-grain" cx="32" cy="104" r="1.6" />
          <circle class="alchemy-matter-grain" cx="48" cy="98" r="1.3" />
          <circle class="alchemy-matter-grain" cx="58" cy="108" r="1.5" />
          <circle class="alchemy-matter-grain" cx="40" cy="112" r="1.2" />
        </g>
      </svg>
    `
  }

  if (sForm === 'metal') {
    return `
      <svg class="alchemy-matter-svg" data-form="metal" viewBox="0 0 90 140" aria-hidden="true" focusable="false">
        ${sAlchemyDishBase()}
        <g class="alchemy-matter-fill alchemy-metal-fill">
          <path class="alchemy-matter-ingot" d="M24 104 L36 88 H60 L72 104 L64 118 H32 Z" />
          <path class="alchemy-matter-ingot-facet" d="M36 88 H60 L54 104 H32 Z" />
          <path class="alchemy-matter-ingot-edge" d="M60 88 L72 104 L64 118 L54 104 Z" />
        </g>
      </svg>
    `
  }

  if (sForm === 'vapor') {
    return `
      <svg class="alchemy-matter-svg" data-form="vapor" viewBox="0 0 90 140" aria-hidden="true" focusable="false">
        ${sAlchemyGlassShell(sId)}
        <g class="alchemy-matter-fill alchemy-vapor-fill" clip-path="url(#alchemy-bulb-${sId})">
          <path class="alchemy-matter-vapor alchemy-matter-vapor-a" d="M20 120 C28 108 30 96 24 84 C36 88 44 100 40 114 C48 104 58 98 66 108 C60 118 48 126 34 124 Z" />
          <path class="alchemy-matter-vapor alchemy-matter-vapor-b" d="M34 100 C40 88 52 82 58 92 C50 96 48 104 52 112 C44 110 38 106 34 100 Z" />
          <path class="alchemy-matter-wisp alchemy-matter-wisp-a" d="M30 70 C34 60 42 56 40 48" />
          <path class="alchemy-matter-wisp alchemy-matter-wisp-b" d="M48 66 C52 56 48 50 54 42" />
          <path class="alchemy-matter-wisp alchemy-matter-wisp-c" d="M58 74 C64 66 62 58 68 52" />
        </g>
        ${sAlchemyGlassOverlay()}
      </svg>
    `
  }

  return `
    <svg class="alchemy-matter-svg" data-form="liquid" viewBox="0 0 90 140" aria-hidden="true" focusable="false">
      ${sAlchemyGlassShell(sId)}
      <g class="alchemy-matter-fill alchemy-liquid-fill" clip-path="url(#alchemy-bulb-${sId})">
        <rect class="alchemy-flask-liquid" x="8" y="78" width="74" height="58" />
        <g class="alchemy-flask-bubbles">
          <circle class="alchemy-bubble alchemy-bubble-a" cx="32" cy="108" r="2.2" />
          <circle class="alchemy-bubble alchemy-bubble-b" cx="48" cy="100" r="1.6" />
          <circle class="alchemy-bubble alchemy-bubble-c" cx="58" cy="112" r="2" />
        </g>
      </g>
      ${sAlchemyGlassOverlay()}
    </svg>
  `
}

function sAlchemyEmptyDishSvg(): string {
  return `
    <svg class="alchemy-matter-svg alchemy-empty-dish" data-form="empty" viewBox="0 0 90 140" aria-hidden="true" focusable="false">
      ${sAlchemyDishBase()}
    </svg>
  `
}

function sAlchemyVesselLabel(sForm: tElementForm): string {
  if (sForm === 'flame') {
    return 'Brazier'
  }
  if (sForm === 'stone' || sForm === 'crystal' || sForm === 'powder' || sForm === 'metal') {
    return 'Receiving dish'
  }
  if (sForm === 'vapor') {
    return 'Receiving flask · vapor'
  }
  return 'Receiving flask'
}

function sAlchemyOpLabel(sOp: tAlchemyOp): string {
  return sOp === 'AND' ? 'Fire · AND' : 'Water · OR'
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
      <g class="alchemy-furnace-water">
        <path class="alchemy-water alchemy-water-a" d="M48 108 C52 104 56 104 60 108 C64 112 68 112 72 108 L72 118 C68 122 64 122 60 118 C56 114 52 114 48 118 Z" />
        <path class="alchemy-water alchemy-water-b" d="M48 98 C52 94 56 94 60 98 C64 102 68 102 72 98" />
        <path class="alchemy-water alchemy-water-c" d="M50 90 C54 86 58 86 62 90 C66 94 68 94 70 92" />
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
  const sOpLabel = sAlchemyOpLabel(sOp)

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
        Charge two vessels, set the athanor to <code>Fire</code> (<code>AND</code>) or
        <code>Water</code> (<code>OR</code>), and collect the product that condenses from the
        work—reagent, vapor, stone, or metal, as the register demands.
      </p>
      <form class="alchemy-bench" id="alchemy-form" data-op="OR">
        <div class="alchemy-apparatus">
          <div class="alchemy-station alchemy-station-retort" data-side="left" data-form="powder" style="--flask-hue: #c43a2a">
            <div class="alchemy-vessel">
              <div class="alchemy-vessel-graphic" id="alchemy-left-graphic">
                ${sAlchemyMatterSvg('alchemy-left', 'powder')}
              </div>
              <span class="alchemy-vessel-label" id="alchemy-left-name">Cinnabar</span>
            </div>
            <label class="alchemy-field">
              <span>Left charge</span>
              <select id="alchemy-left" name="left" aria-describedby="alchemy-left-name">${sOptionsLeft}</select>
            </label>
          </div>

          <div class="alchemy-pipe alchemy-pipe-left" aria-hidden="true">
            <span class="alchemy-pipe-flow"></span>
          </div>

          <div class="alchemy-station alchemy-station-furnace">
            <div class="alchemy-vessel alchemy-vessel-furnace">
              ${sAlchemyFurnaceSvg()}
              <span class="alchemy-vessel-label alchemy-furnace-mode" id="alchemy-op-name">Water · OR</span>
            </div>
            <label class="alchemy-field">
              <span>Athanor</span>
              <select id="alchemy-op" name="op">
                <option value="AND">Fire · AND (&amp;)</option>
                <option value="OR" selected>Water · OR (|)</option>
              </select>
            </label>
          </div>

          <div class="alchemy-pipe alchemy-pipe-right" aria-hidden="true">
            <span class="alchemy-pipe-flow"></span>
          </div>

          <div class="alchemy-station alchemy-station-retort-right" data-side="right" data-form="stone" style="--flask-hue: #7a6a4a">
            <div class="alchemy-vessel">
              <div class="alchemy-vessel-graphic" id="alchemy-right-graphic">
                ${sAlchemyMatterSvg('alchemy-right', 'stone')}
              </div>
              <span class="alchemy-vessel-label" id="alchemy-right-name">Earth</span>
            </div>
            <label class="alchemy-field">
              <span>Right charge</span>
              <select id="alchemy-right" name="right" aria-describedby="alchemy-right-name">${sOptionsRight}</select>
            </label>
          </div>
        </div>

        <div class="alchemy-actions">
          <button type="button" class="reading-draw alchemy-run" id="alchemy-run">
            Collect distillate
          </button>
        </div>

        <div class="alchemy-product" id="alchemy-product" data-form="empty">
          <div class="alchemy-product-flask" id="alchemy-product-graphic">
            ${sAlchemyEmptyDishSvg()}
          </div>
          <div class="alchemy-product-copy">
            <span class="alchemy-product-kicker" id="alchemy-product-kicker">Receiving dish</span>
            <strong class="alchemy-product-name" id="alchemy-product-name">Empty</strong>
            <span class="alchemy-product-binary binary-value" id="alchemy-product-binary" hidden></span>
            <p class="alchemy-product-note" id="alchemy-product-note">Awaiting distillate.</p>
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
  const objLeftGraphic = document.querySelector<HTMLElement>('#alchemy-left-graphic')
  const objRightGraphic = document.querySelector<HTMLElement>('#alchemy-right-graphic')
  const objProduct = document.querySelector<HTMLElement>('#alchemy-product')
  const objProductGraphic = document.querySelector<HTMLElement>('#alchemy-product-graphic')
  const objLeftName = document.querySelector<HTMLElement>('#alchemy-left-name')
  const objRightName = document.querySelector<HTMLElement>('#alchemy-right-name')
  const objOpName = document.querySelector<HTMLElement>('#alchemy-op-name')
  const objProductKicker = document.querySelector<HTMLElement>('#alchemy-product-kicker')
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
    !objLeftGraphic ||
    !objRightGraphic ||
    !objProduct ||
    !objProductGraphic ||
    !objLeftName ||
    !objRightName ||
    !objOpName ||
    !objProductKicker ||
    !objProductName ||
    !objProductBinary ||
    !objProductNote
  ) {
    return
  }

  function vSetVesselGraphic(
    objHost: HTMLElement,
    objStation: HTMLElement,
    objElement: tElement,
    sId: string,
  ): void {
    objStation.style.setProperty('--flask-hue', objElement.sHue)
    objStation.dataset.form = objElement.sForm
    objHost.innerHTML = sAlchemyMatterSvg(sId, objElement.sForm)
  }

  function vResetProduct(): void {
    objProduct!.classList.remove('is-filled')
    objProduct!.dataset.form = 'empty'
    objProduct!.style.removeProperty('--flask-hue')
    objProductGraphic!.innerHTML = sAlchemyEmptyDishSvg()
    objProductKicker!.textContent = 'Receiving dish'
    objProductName!.textContent = 'Empty'
    objProductBinary!.textContent = ''
    objProductBinary!.hidden = true
    objProductNote!.textContent = 'Awaiting distillate.'
    objResultHost!.innerHTML = ''
  }

  function vSyncInputs(): void {
    const objLeft = objFindElementByBinary(objLeftSelect!.value)
    const objRight = objFindElementByBinary(objRightSelect!.value)
    const sOp: tAlchemyOp = objOpSelect!.value === 'OR' ? 'OR' : 'AND'

    objForm!.dataset.op = sOp
    vSetVesselGraphic(objLeftGraphic!, objLeftStation!, objLeft, 'alchemy-left')
    vSetVesselGraphic(objRightGraphic!, objRightStation!, objRight, 'alchemy-right')
    objLeftName!.textContent = objLeft.sName
    objRightName!.textContent = objRight.sName
    objOpName!.textContent = sAlchemyOpLabel(sOp)
    vResetProduct()
  }

  function vCollectProduct(): void {
    const objLeft = objFindElementByBinary(objLeftSelect!.value)
    const objRight = objFindElementByBinary(objRightSelect!.value)
    const sOp: tAlchemyOp = objOpSelect!.value === 'OR' ? 'OR' : 'AND'
    const objResult = objResolveAlchemy(objLeft, objRight, sOp)

    objProduct!.style.setProperty('--flask-hue', objResult.sHue)
    objProduct!.dataset.form = objResult.sForm
    objProductGraphic!.innerHTML = sAlchemyMatterSvg('alchemy-product', objResult.sForm)
    objProductKicker!.textContent = sAlchemyVesselLabel(objResult.sForm)
    objProductName!.textContent = objResult.sName
    objProductBinary!.textContent = `(${objResult.sBinaryValue})`
    objProductBinary!.hidden = false
    objProductNote!.textContent = objResult.sNote
    objResultHost!.innerHTML = sAlchemyResultMarkup(objLeft, objRight, sOp)

    objProduct!.classList.remove('is-filled')
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
