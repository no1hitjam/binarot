import { sCardIconMarkup } from './cardIcons'

type tPlanetKind = 'star' | 'planet' | 'moon' | 'dwarf'

type tPlanetBody = {
  sName: string
  sKind: tPlanetKind
  sBinaryValue: string
  sNote: string
  sShort: string
  /** Moons without their own heliocentric elements sit near this parent. */
  sOrbitOf?: string
  /** Degrees of ecliptic longitude ahead of the parent. */
  nLeadDeg?: number
}

type tPlanetCardRef = {
  sName: string
  sBinaryValue: string
  sMeaning: string
}

/** Keplerian elements at J2000; rates are per Julian century. Angles in degrees. */
type tOrbitElements = {
  sName: string
  nA0: number
  nADot: number
  nE0: number
  nEDot: number
  nI0: number
  nIDot: number
  nL0: number
  nLDot: number
  nPeri0: number
  nPeriDot: number
  nNode0: number
  nNodeDot: number
}

type tOrbitPoint = {
  nXAu: number
  nYAu: number
  nRAu: number
  nLonDeg: number
}

const nViewSize = 560
const nCenter = nViewSize / 2
const nChartRadius = 248
const nOrbitSamples = 96
const nAuLogMin = 0.28
const nAuLogMax = 100
const nMoonRadiusScale = 1.08

/**
 * Sun + planets by heliocentric distance, major moons, and Pluto. The Sun is
 * The Seed; Charon takes The Clone as Pluto’s near-equal twin.
 */
const arrPlanetBodies: tPlanetBody[] = [
  {
    sName: 'Sun',
    sKind: 'star',
    sBinaryValue: '0',
    sShort: 'Sun',
    sNote:
      'The zero point at the center—light before form, the origin everything else orbits. The Seed is the sun as beginning.',
  },
  {
    sName: 'Mercury',
    sKind: 'planet',
    sBinaryValue: '1',
    sShort: 'Mer',
    sNote:
      'Closest claim to the fire—will as sovereignty on a tight loop. The Flag is the stake planted nearest the sun.',
  },
  {
    sName: 'Venus',
    sKind: 'planet',
    sBinaryValue: '10',
    sShort: 'Ven',
    sNote:
      'The bright summons in the dawn and dusk sky. Signals, timing, and interrupt belong to The Call.',
  },
  {
    sName: 'Earth',
    sKind: 'planet',
    sBinaryValue: '11',
    sShort: 'Ear',
    sNote:
      'Bonds, networks, and the handshake that holds a living world. The Link is home as connection.',
  },
  {
    sName: 'Moon',
    sKind: 'moon',
    sBinaryValue: '110',
    sShort: 'Lun',
    sOrbitOf: 'Earth',
    nLeadDeg: 20,
    sNote:
      'The first gateway off the home world—threshold between ground and sky. The Port is where traffic learns to leave.',
  },
  {
    sName: 'Mars',
    sKind: 'planet',
    sBinaryValue: '100',
    sShort: 'Mar',
    sNote:
      'Shelter and stewardship on dust—the world we mean to host next. The Host is home as infrastructure.',
  },
  {
    sName: 'Jupiter',
    sKind: 'planet',
    sBinaryValue: '111',
    sShort: 'Jup',
    sNote:
      'Fullness, growth, and a canopy of moons that casts shade across the outer belt. The Tree is reach made structure.',
  },
  {
    sName: 'Io',
    sKind: 'moon',
    sBinaryValue: '101',
    sShort: 'Io',
    sOrbitOf: 'Jupiter',
    nLeadDeg: -22,
    sNote:
      'Tidal fire rewriting the crust without rest. The Fork is the path that splits under pressure.',
  },
  {
    sName: 'Europa',
    sKind: 'moon',
    sBinaryValue: '1011',
    sShort: 'Eur',
    sOrbitOf: 'Jupiter',
    nLeadDeg: 12,
    sNote:
      'An ocean sealed under ice—knowledge costly to reach. The Cache holds what the shell conceals.',
  },
  {
    sName: 'Ganymede',
    sKind: 'moon',
    sBinaryValue: '1111',
    sShort: 'Gan',
    sOrbitOf: 'Jupiter',
    nLeadDeg: 32,
    sNote:
      'Largest of the moons, with a field of its own—almost a world-state. The State is authority among attendants.',
  },
  {
    sName: 'Saturn',
    sKind: 'planet',
    sBinaryValue: '1101',
    sShort: 'Sat',
    sNote:
      'Rings as hard edge—boundaries that keep chaos out. The Shell is armor with a purpose.',
  },
  {
    sName: 'Titan',
    sKind: 'moon',
    sBinaryValue: '1001',
    sShort: 'Tit',
    sOrbitOf: 'Saturn',
    nLeadDeg: 18,
    sNote:
      'Lakes and haze where chemistry gathers under an orange sky. The Table is the room where plans become weather.',
  },
  {
    sName: 'Uranus',
    sKind: 'planet',
    sBinaryValue: '1000',
    sShort: 'Ura',
    sNote:
      'Tipped on its own axis, motion chosen without permission. The Agent does not ask the plane for leave.',
  },
  {
    sName: 'Neptune',
    sKind: 'planet',
    sBinaryValue: '1100',
    sShort: 'Nep',
    sNote:
      'Depth, dream, and the viewport that shifts the scene. The Frame is perspective as weather.',
  },
  {
    sName: 'Pluto',
    sKind: 'dwarf',
    sBinaryValue: '1110',
    sShort: 'Plu',
    sNote:
      'Far, small, and forever argued over—the world that forced the public square to redefine a planet. The Forum is status earned in debate.',
  },
  {
    sName: 'Charon',
    sKind: 'moon',
    sBinaryValue: '1010',
    sShort: 'Cha',
    sOrbitOf: 'Pluto',
    nLeadDeg: 18,
    sNote:
      'Near-equal twin locked face to face with Pluto—mirror as environment. The Clone is equality in orbit.',
  },
]

/**
 * JPL SSD Table 1 (1800–2050) for major planets; Pluto uses approximate J2000
 * elements. Moons without their own elements are placed near their parent.
 */
const arrOrbitElements: tOrbitElements[] = [
  {
    sName: 'Mercury',
    nA0: 0.38709927,
    nADot: 0.00000037,
    nE0: 0.20563593,
    nEDot: 0.00001906,
    nI0: 7.00497902,
    nIDot: -0.00594749,
    nL0: 252.2503235,
    nLDot: 149472.67411175,
    nPeri0: 77.45779628,
    nPeriDot: 0.16047689,
    nNode0: 48.33076593,
    nNodeDot: -0.12534081,
  },
  {
    sName: 'Venus',
    nA0: 0.72333566,
    nADot: 0.0000039,
    nE0: 0.00677672,
    nEDot: -0.00004107,
    nI0: 3.39467605,
    nIDot: -0.0007889,
    nL0: 181.9790995,
    nLDot: 58517.81538729,
    nPeri0: 131.60246718,
    nPeriDot: 0.00268329,
    nNode0: 76.67984255,
    nNodeDot: -0.27769418,
  },
  {
    sName: 'Earth',
    nA0: 1.00000261,
    nADot: 0.00000562,
    nE0: 0.01671123,
    nEDot: -0.00004392,
    nI0: -0.00001531,
    nIDot: -0.01294668,
    nL0: 100.46457166,
    nLDot: 35999.37244981,
    nPeri0: 102.93768193,
    nPeriDot: 0.32327364,
    nNode0: 0,
    nNodeDot: 0,
  },
  {
    sName: 'Mars',
    nA0: 1.52371034,
    nADot: 0.00001847,
    nE0: 0.0933941,
    nEDot: 0.00007882,
    nI0: 1.84969142,
    nIDot: -0.00813131,
    nL0: -4.55343205,
    nLDot: 19140.30268499,
    nPeri0: -23.94362959,
    nPeriDot: 0.44441088,
    nNode0: 49.55953891,
    nNodeDot: -0.29257343,
  },
  {
    sName: 'Jupiter',
    nA0: 5.202887,
    nADot: -0.00011607,
    nE0: 0.04838624,
    nEDot: -0.00013253,
    nI0: 1.30439695,
    nIDot: -0.00183714,
    nL0: 34.39644051,
    nLDot: 3034.74612775,
    nPeri0: 14.72847983,
    nPeriDot: 0.21252668,
    nNode0: 100.47390909,
    nNodeDot: 0.20469106,
  },
  {
    sName: 'Saturn',
    nA0: 9.53667594,
    nADot: -0.0012506,
    nE0: 0.05386179,
    nEDot: -0.00050991,
    nI0: 2.48599187,
    nIDot: 0.00193609,
    nL0: 49.95424423,
    nLDot: 1222.49362201,
    nPeri0: 92.59887831,
    nPeriDot: -0.41897216,
    nNode0: 113.66242448,
    nNodeDot: -0.28867794,
  },
  {
    sName: 'Uranus',
    nA0: 19.18916545,
    nADot: -0.00196176,
    nE0: 0.04725744,
    nEDot: -0.00004397,
    nI0: 0.77263783,
    nIDot: -0.00242939,
    nL0: 313.23810451,
    nLDot: 428.48202785,
    nPeri0: 170.9542763,
    nPeriDot: 0.40805281,
    nNode0: 74.01692503,
    nNodeDot: 0.04240589,
  },
  {
    sName: 'Neptune',
    nA0: 30.06992276,
    nADot: 0.00026291,
    nE0: 0.00859048,
    nEDot: 0.00005105,
    nI0: 1.77004347,
    nIDot: 0.00035372,
    nL0: -55.12002969,
    nLDot: 218.45945325,
    nPeri0: 44.96476227,
    nPeriDot: -0.32241464,
    nNode0: 131.78422574,
    nNodeDot: -0.00508664,
  },
  objApproxElements('Pluto', 39.4821, 0.2488, 17.141, 110.304, 113.763, 14.86),
]

function nMeanMotionDegPerCentury(nA: number): number {
  return 36000 / Math.pow(nA, 1.5)
}

function objApproxElements(
  sName: string,
  nA: number,
  nE: number,
  nI: number,
  nNode: number,
  nArgPeri: number,
  nM0: number,
): tOrbitElements {
  const nPeri = nNode + nArgPeri
  return {
    sName,
    nA0: nA,
    nADot: 0,
    nE0: nE,
    nEDot: 0,
    nI0: nI,
    nIDot: 0,
    nL0: nM0 + nPeri,
    nLDot: nMeanMotionDegPerCentury(nA),
    nPeri0: nPeri,
    nPeriDot: 0,
    nNode0: nNode,
    nNodeDot: 0,
  }
}

function nJulianDayFromDate(objDate: Date): number {
  return objDate.getTime() / 86400000 + 2440587.5
}

function nCenturiesPastJ2000(nJulianDay: number): number {
  return (nJulianDay - 2451545) / 36525
}

function nWrapDeg(nDeg: number): number {
  return ((nDeg % 360) + 360) % 360
}

function nWrapDeg180(nDeg: number): number {
  return ((nDeg + 180) % 360 + 360) % 360 - 180
}

function nSolveKeplerDeg(nMDeg: number, nEcc: number): number {
  const nEStar = (180 / Math.PI) * nEcc
  let nE = nMDeg + nEStar * Math.sin((nMDeg * Math.PI) / 180)
  for (let nIter = 0; nIter < 14; nIter += 1) {
    const nERad = (nE * Math.PI) / 180
    const nDeltaM = nMDeg - (nE - nEStar * Math.sin(nERad))
    const nDeltaE = nDeltaM / (1 - nEcc * Math.cos(nERad))
    nE += nDeltaE
    if (Math.abs(nDeltaE) < 1e-7) {
      break
    }
  }
  return nE
}

function objElementsAtCentury(objEl: tOrbitElements, nT: number): {
  nA: number
  nE: number
  nI: number
  nL: number
  nPeri: number
  nNode: number
} {
  return {
    nA: objEl.nA0 + objEl.nADot * nT,
    nE: objEl.nE0 + objEl.nEDot * nT,
    nI: objEl.nI0 + objEl.nIDot * nT,
    nL: objEl.nL0 + objEl.nLDot * nT,
    nPeri: objEl.nPeri0 + objEl.nPeriDot * nT,
    nNode: objEl.nNode0 + objEl.nNodeDot * nT,
  }
}

function objOrbitPointFromAnomaly(
  nA: number,
  nE: number,
  nI: number,
  nPeri: number,
  nNode: number,
  nEDeg: number,
): tOrbitPoint {
  const nERad = (nEDeg * Math.PI) / 180
  const nXp = nA * (Math.cos(nERad) - nE)
  const nYp = nA * Math.sqrt(1 - nE * nE) * Math.sin(nERad)
  const nOmega = nPeri - nNode
  const nCosO = Math.cos((nOmega * Math.PI) / 180)
  const nSinO = Math.sin((nOmega * Math.PI) / 180)
  const nCosN = Math.cos((nNode * Math.PI) / 180)
  const nSinN = Math.sin((nNode * Math.PI) / 180)
  const nCosI = Math.cos((nI * Math.PI) / 180)

  const nX =
    (nCosO * nCosN - nSinO * nSinN * nCosI) * nXp +
    (-nSinO * nCosN - nCosO * nSinN * nCosI) * nYp
  const nY =
    (nCosO * nSinN + nSinO * nCosN * nCosI) * nXp +
    (-nSinO * nSinN + nCosO * nCosN * nCosI) * nYp

  return {
    nXAu: nX,
    nYAu: nY,
    nRAu: Math.hypot(nX, nY),
    nLonDeg: nWrapDeg((Math.atan2(nY, nX) * 180) / Math.PI),
  }
}

function objBodyPosition(objEl: tOrbitElements, nT: number): tOrbitPoint {
  const objNow = objElementsAtCentury(objEl, nT)
  const nM = nWrapDeg180(objNow.nL - objNow.nPeri)
  const nEDeg = nSolveKeplerDeg(nM, objNow.nE)
  return objOrbitPointFromAnomaly(
    objNow.nA,
    objNow.nE,
    objNow.nI,
    objNow.nPeri,
    objNow.nNode,
    nEDeg,
  )
}

function objMoonPosition(objParentPos: tOrbitPoint, nLeadDeg: number): tOrbitPoint {
  const nLonDeg = nWrapDeg(objParentPos.nLonDeg + nLeadDeg)
  const nLonRad = (nLonDeg * Math.PI) / 180
  const nRAu = objParentPos.nRAu * nMoonRadiusScale
  return {
    nXAu: nRAu * Math.cos(nLonRad),
    nYAu: nRAu * Math.sin(nLonRad),
    nRAu,
    nLonDeg,
  }
}

function arrOrbitPath(objEl: tOrbitElements, nT: number): tOrbitPoint[] {
  const objNow = objElementsAtCentury(objEl, nT)
  const arrPoints: tOrbitPoint[] = []
  for (let nIndex = 0; nIndex < nOrbitSamples; nIndex += 1) {
    const nEDeg = (nIndex / nOrbitSamples) * 360
    arrPoints.push(
      objOrbitPointFromAnomaly(
        objNow.nA,
        objNow.nE,
        objNow.nI,
        objNow.nPeri,
        objNow.nNode,
        nEDeg,
      ),
    )
  }
  return arrPoints
}

function nAuToChartR(nAu: number): number {
  const nClamped = Math.max(nAuLogMin, nAu)
  const nT =
    (Math.log(nClamped) - Math.log(nAuLogMin)) / (Math.log(nAuLogMax) - Math.log(nAuLogMin))
  return Math.min(1, Math.max(0, nT)) * nChartRadius
}

function objAuToXy(nXAu: number, nYAu: number): { nX: number; nY: number } {
  const nRAu = Math.hypot(nXAu, nYAu)
  if (nRAu < 1e-9) {
    return { nX: nCenter, nY: nCenter }
  }
  const nChartR = nAuToChartR(nRAu)
  return {
    nX: nCenter + (nXAu / nRAu) * nChartR,
    nY: nCenter - (nYAu / nRAu) * nChartR,
  }
}

function sKindLabel(sKind: tPlanetKind): string {
  switch (sKind) {
    case 'star':
      return 'Star'
    case 'planet':
      return 'Planet'
    case 'moon':
      return 'Moon'
    case 'dwarf':
      return 'Dwarf planet'
  }
}

function sDateStamp(objDate: Date): string {
  const nYear = objDate.getUTCFullYear()
  const sMonth = String(objDate.getUTCMonth() + 1).padStart(2, '0')
  const sDay = String(objDate.getUTCDate()).padStart(2, '0')
  return `${nYear}-${sMonth}-${sDay}`
}

function sOrbitPathMarkup(sSlug: string, arrPoints: tOrbitPoint[]): string {
  const sCoords = arrPoints
    .map((objPoint) => {
      const objXy = objAuToXy(objPoint.nXAu, objPoint.nYAu)
      return `${objXy.nX.toFixed(2)},${objXy.nY.toFixed(2)}`
    })
    .join(' ')
  return `<polygon class="orbit-path" data-slug="${sSlug}" points="${sCoords}" />`
}

function sOrbitBodyMarkup(
  objBody: tPlanetBody,
  objCard: tPlanetCardRef,
  objPos: tOrbitPoint,
): string {
  const objXy = objAuToXy(objPos.nXAu, objPos.nYAu)
  const nLabelR = Math.hypot(objXy.nX - nCenter, objXy.nY - nCenter)
  const nLabelScale = nLabelR > 1 ? (nLabelR + 14) / nLabelR : 1
  const nLabelX = nCenter + (objXy.nX - nCenter) * nLabelScale
  const nLabelY = nCenter + (objXy.nY - nCenter) * nLabelScale
  const sMarkerClass =
    objBody.sKind === 'moon' || objBody.sKind === 'dwarf'
      ? 'orbit-marker orbit-marker-moon'
      : 'orbit-marker'

  return `
    <g class="orbit-body" data-slug="${objBody.sBinaryValue}">
      <circle class="${sMarkerClass}" cx="${objXy.nX.toFixed(2)}" cy="${objXy.nY.toFixed(2)}" r="4.5" />
      <text class="orbit-label" x="${nLabelX.toFixed(2)}" y="${nLabelY.toFixed(2)}">${objBody.sShort}</text>
      <title>${objBody.sName} · ${objCard.sName} (${objCard.sBinaryValue}) · ${objPos.nRAu.toFixed(2)} au</title>
    </g>
  `
}

function sOrbitChartMarkup(mapCard: Map<string, tPlanetCardRef>): string {
  const objNow = new Date()
  const nT = nCenturiesPastJ2000(nJulianDayFromDate(objNow))
  const mapBody = new Map(arrPlanetBodies.map((objBody) => [objBody.sName, objBody] as const))
  const mapEl = new Map(arrOrbitElements.map((objEl) => [objEl.sName, objEl] as const))

  const arrGuideAu = [0.4, 1, 5, 10, 30, 40]
  const sGuides = arrGuideAu
    .map((nAu) => {
      const nR = nAuToChartR(nAu)
      return `
        <circle class="orbit-guide" cx="${nCenter}" cy="${nCenter}" r="${nR.toFixed(2)}" />
        <text class="orbit-guide-label" x="${nCenter + 4}" y="${(nCenter - nR + 10).toFixed(2)}">${nAu} au</text>
      `
    })
    .join('')

  const sPaths = arrOrbitElements
    .map((objEl) => {
      const objBody = mapBody.get(objEl.sName)
      if (!objBody || objBody.sKind === 'moon') {
        return ''
      }
      return sOrbitPathMarkup(objBody.sBinaryValue, arrOrbitPath(objEl, nT))
    })
    .join('')

  const sBodies = arrPlanetBodies
    .map((objBody) => {
      const objCard = mapCard.get(objBody.sBinaryValue)
      if (!objCard) {
        return ''
      }

      if (objBody.sKind === 'star') {
        return `
          <g class="orbit-body is-sun" data-slug="${objBody.sBinaryValue}">
            <circle class="orbit-marker orbit-marker-sun" cx="${nCenter}" cy="${nCenter}" r="7" />
            <text class="orbit-label" x="${nCenter}" y="${nCenter - 14}">${objBody.sShort}</text>
            <title>${objBody.sName} · ${objCard.sName} (${objCard.sBinaryValue})</title>
          </g>
        `
      }

      if (objBody.sOrbitOf) {
        const objParentEl = mapEl.get(objBody.sOrbitOf)
        if (!objParentEl) {
          return ''
        }
        const objParentPos = objBodyPosition(objParentEl, nT)
        const objPos = objMoonPosition(objParentPos, objBody.nLeadDeg ?? 0)
        return sOrbitBodyMarkup(objBody, objCard, objPos)
      }

      const objEl = mapEl.get(objBody.sName)
      if (!objEl) {
        return ''
      }
      return sOrbitBodyMarkup(objBody, objCard, objBodyPosition(objEl, nT))
    })
    .join('')

  return `
    <figure class="orbit-chart" id="orbit-chart">
      <svg class="orbit-svg" viewBox="0 0 ${nViewSize} ${nViewSize}" role="img" aria-label="Solar system orbits for ${sDateStamp(objNow)}">
        <circle class="orbit-disk" cx="${nCenter}" cy="${nCenter}" r="${nChartRadius + 8}" />
        ${sGuides}
        ${sPaths}
        ${sBodies}
      </svg>
      <figcaption class="orbit-caption">
        Heliocentric ecliptic · log radius · moons near parent · ${sDateStamp(objNow)} UTC (approximate)
      </figcaption>
    </figure>
  `
}

function sPlanetItemMarkup(
  objBody: tPlanetBody,
  mapCard: Map<string, tPlanetCardRef>,
): string {
  const objCard = mapCard.get(objBody.sBinaryValue)
  if (!objCard) {
    return ''
  }

  return `
    <li class="planet-item" data-slug="${objBody.sBinaryValue}" tabindex="0">
      <div class="planet-heading">
        <h3 class="planet-name">${objBody.sName}</h3>
        <span class="planet-kind">${sKindLabel(objBody.sKind)}</span>
      </div>
      <a class="planet-sign card-item-link" href="#card/${objCard.sBinaryValue}">
        ${sCardIconMarkup(objCard.sBinaryValue, 'planet-sign-icon')}
        <span class="planet-sign-text">
          <span class="planet-sign-name">${objCard.sName} <span class="binary-value">(${objCard.sBinaryValue})</span></span>
          <span class="planet-sign-meaning">${objCard.sMeaning}</span>
        </span>
      </a>
      <p class="planet-note">${objBody.sNote}</p>
    </li>
  `
}

function sPlanetGroupMarkup(
  sTitle: string,
  arrBodies: tPlanetBody[],
  mapCard: Map<string, tPlanetCardRef>,
): string {
  const sItems = arrBodies.map((objBody) => sPlanetItemMarkup(objBody, mapCard)).join('')
  return `
    <div class="planet-group">
      <h3 class="planet-group-title">${sTitle}</h3>
      <ul class="planet-list">${sItems}</ul>
    </div>
  `
}

export function sPlanetsMarkup(arrCards: tPlanetCardRef[]): string {
  const mapCard = new Map(
    arrCards.map((objCard) => [objCard.sBinaryValue, objCard] as const),
  )
  const arrMajor = arrPlanetBodies.filter((objBody) => objBody.sKind !== 'moon')
  const arrMoon = arrPlanetBodies.filter((objBody) => objBody.sKind === 'moon')

  return `
    <div class="planets" id="planets">
      ${sOrbitChartMarkup(mapCard)}
      ${sPlanetGroupMarkup('Solar System', arrMajor, mapCard)}
      ${sPlanetGroupMarkup('Moons', arrMoon, mapCard)}
    </div>
  `
}

export function vBindPlanetsOrbitHover(): void {
  const objRoot = document.querySelector<HTMLElement>('#planets')
  if (!objRoot) {
    return
  }

  const arrItems = Array.from(objRoot.querySelectorAll<HTMLElement>('.planet-item[data-slug]'))
  const arrOrbitBodies = Array.from(
    objRoot.querySelectorAll<SVGElement>('.orbit-body[data-slug]'),
  )
  const arrOrbitPaths = Array.from(
    objRoot.querySelectorAll<SVGElement>('.orbit-path[data-slug]'),
  )

  const vClear = (): void => {
    objRoot.classList.remove('is-highlighting')
    for (const objEl of [...arrItems, ...arrOrbitBodies, ...arrOrbitPaths]) {
      objEl.classList.remove('is-active')
    }
  }

  const vHighlight = (sSlug: string): void => {
    objRoot.classList.add('is-highlighting')
    for (const objEl of [...arrItems, ...arrOrbitBodies, ...arrOrbitPaths]) {
      objEl.classList.toggle('is-active', objEl.dataset.slug === sSlug)
    }
  }

  for (const objItem of arrItems) {
    const sSlug = objItem.dataset.slug
    if (!sSlug) {
      continue
    }
    objItem.addEventListener('mouseenter', () => vHighlight(sSlug))
    objItem.addEventListener('mouseleave', vClear)
    objItem.addEventListener('focus', () => vHighlight(sSlug))
    objItem.addEventListener('blur', vClear)
  }

  for (const objBody of arrOrbitBodies) {
    const sSlug = objBody.dataset.slug
    if (!sSlug) {
      continue
    }
    objBody.addEventListener('mouseenter', () => vHighlight(sSlug))
    objBody.addEventListener('mouseleave', vClear)
  }
}
