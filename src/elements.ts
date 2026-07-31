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
