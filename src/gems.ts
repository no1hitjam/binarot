import { sCardIconMarkup } from './cardIcons'

type tGemCardRef = {
  sName: string
  sBinaryValue: string
  sMeaning: string
}

type tGem = {
  sName: string
  sBinaryValue: string
  /** CSS color for the stone swatch. */
  sHue: string
  sNote: string
}

/**
 * One gemstone per binarot sign, paired for fit with each archetype’s meaning.
 */
const arrGems: tGem[] = [
  {
    sName: 'Pearl',
    sBinaryValue: '0',
    sHue: '#e8e4d8',
    sNote:
      'A soft origin wrapped around a grain—light before cut facets. The Seed is potential still wet from the sea.',
  },
  {
    sName: 'Ruby',
    sBinaryValue: '1',
    sHue: '#c41e3a',
    sNote:
      'Blood-red claim set in a hard lattice. The Flag is sovereignty cut, polished, and planted where others can see it.',
  },
  {
    sName: 'Aquamarine',
    sBinaryValue: '10',
    sHue: '#7fdbd4',
    sNote:
      'A clear signal through water—the color of a summons that carries. The Call is the knock that arrives as light.',
  },
  {
    sName: 'Emerald',
    sBinaryValue: '11',
    sHue: '#2e8b57',
    sNote:
      'Green fidelity and the handshake held fast. The Link is the bond that refuses to fray.',
  },
  {
    sName: 'Jade',
    sBinaryValue: '100',
    sHue: '#6b8e6b',
    sNote:
      'Stewardship carved smooth—grace as a dwelling stone. The Host is shelter worn into virtue.',
  },
  {
    sName: "Tiger's Eye",
    sBinaryValue: '101',
    sHue: '#b8860b',
    sNote:
      'Chatoyant light that splits along the grain. The Fork is the path that shimmers two ways at once.',
  },
  {
    sName: 'Turquoise',
    sBinaryValue: '110',
    sHue: '#40e0d0',
    sNote:
      'The traveler’s stone at the threshold of trade. The Port is the gateway worn by every crossing.',
  },
  {
    sName: 'Moss Agate',
    sBinaryValue: '111',
    sHue: '#557a4a',
    sNote:
      'Growth written inside the stone—canopy trapped in silence. The Tree is reach that took root long ago.',
  },
  {
    sName: 'Obsidian',
    sBinaryValue: '1000',
    sHue: '#1a1a1a',
    sNote:
      'Volcanic glass with a will of its own—sharp, independent, decisive. The Agent is action cooled into edge.',
  },
  {
    sName: 'Garnet',
    sBinaryValue: '1001',
    sHue: '#8b1a1a',
    sNote:
      'Deep red of feasts and closed-door plots. The Table is where plans are set like place settings.',
  },
  {
    sName: 'Clear Quartz',
    sBinaryValue: '1010',
    sHue: '#dce8f0',
    sNote:
      'A mirror that multiplies—purity of copy and equal light. The Clone is the lattice that repeats without loss.',
  },
  {
    sName: 'Sapphire',
    sBinaryValue: '1011',
    sHue: '#0f52ba',
    sNote:
      'Night-sky vault of reserved fire. The Cache holds what was costly to learn until the right hour.',
  },
  {
    sName: 'Fluorite',
    sBinaryValue: '1100',
    sHue: '#9b7ed9',
    sNote:
      'Crystal planes that teach the eye how to frame. The Frame is structure as a way of seeing.',
  },
  {
    sName: 'Black Onyx',
    sBinaryValue: '1101',
    sHue: '#0d0d0d',
    sNote:
      'Armor polished to a hard perimeter. The Shell is the boundary that keeps the soft center running.',
  },
  {
    sName: 'Lapis Lazuli',
    sBinaryValue: '1110',
    sHue: '#1e3a8a',
    sNote:
      'Noble blue of the public square—gold flecks like open debate. The Forum is dignity under argument.',
  },
  {
    sName: 'Diamond',
    sBinaryValue: '1111',
    sHue: '#b9f2ff',
    sNote:
      'Full lattice lit—maximum hardness under a clear crown. The State is authority as completed structure.',
  },
]

function sGemItemMarkup(objGem: tGem, mapCard: Map<string, tGemCardRef>): string {
  const objCard = mapCard.get(objGem.sBinaryValue)
  if (!objCard) {
    return ''
  }

  return `
    <li class="gem-item">
      <div class="gem-heading">
        <span class="gem-swatch" style="--gem-hue: ${objGem.sHue}" aria-hidden="true"></span>
        <h3 class="gem-name">${objGem.sName}</h3>
      </div>
      <a class="gem-sign card-item-link" href="#card/${objCard.sBinaryValue}">
        ${sCardIconMarkup(objCard.sBinaryValue, 'gem-sign-icon')}
        <span class="gem-sign-text">
          <span class="gem-sign-name">${objCard.sName} <span class="binary-value">(${objCard.sBinaryValue})</span></span>
          <span class="gem-sign-meaning">${objCard.sMeaning}</span>
        </span>
      </a>
      <p class="gem-note">${objGem.sNote}</p>
    </li>
  `
}

export function sGemsMarkup(arrCards: tGemCardRef[]): string {
  const mapCard = new Map(
    arrCards.map((objCard) => [objCard.sBinaryValue, objCard] as const),
  )
  const sItems = arrGems.map((objGem) => sGemItemMarkup(objGem, mapCard)).join('')

  return `
    <div class="gems" id="gems">
      <ul class="gem-list">${sItems}</ul>
    </div>
  `
}
