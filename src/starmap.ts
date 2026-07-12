type tHemisphere = 'N' | 'S'

type tStar = {
  nId: number
  nAz: number
  nR: number
  nMag: number
}

type tEdge = [number, number]

type tConstellation = {
  sSlug: string
  sName: string
  sHemisphere: tHemisphere
  arrStarIds: number[]
  arrEdges: tEdge[]
  nLabelAz: number
  nLabelR: number
}

const nViewSize = 320
const nCenter = nViewSize / 2
const nChartRadius = 138
const nFieldStarCount = 96
const nFieldStarSeed = 0b1011

const arrStars: tStar[] = [
  // Seed — sprout (N ~20°)
  { nId: 10, nAz: 18, nR: 0.48, nMag: 0.95 },
  { nId: 11, nAz: 14, nR: 0.34, nMag: 0.85 },
  { nId: 12, nAz: 10, nR: 0.2, nMag: 1 },
  { nId: 13, nAz: 340, nR: 0.28, nMag: 0.8 },
  { nId: 14, nAz: 40, nR: 0.3, nMag: 0.8 },

  // Flag — pole + banner (N ~55°)
  { nId: 20, nAz: 48, nR: 0.72, nMag: 0.75 },
  { nId: 21, nAz: 52, nR: 0.52, nMag: 0.85 },
  { nId: 22, nAz: 55, nR: 0.28, nMag: 1 },
  { nId: 23, nAz: 72, nR: 0.3, nMag: 0.9 },
  { nId: 24, nAz: 68, nR: 0.42, nMag: 0.8 },
  { nId: 25, nAz: 74, nR: 0.48, nMag: 0.85 },

  // Call — bell + waves (N ~100°)
  { nId: 30, nAz: 98, nR: 0.28, nMag: 0.9 },
  { nId: 31, nAz: 88, nR: 0.38, nMag: 0.8 },
  { nId: 32, nAz: 108, nR: 0.38, nMag: 0.8 },
  { nId: 33, nAz: 92, nR: 0.52, nMag: 0.85 },
  { nId: 34, nAz: 104, nR: 0.52, nMag: 0.85 },
  { nId: 35, nAz: 98, nR: 0.62, nMag: 0.95 },
  { nId: 36, nAz: 118, nR: 0.34, nMag: 0.7 },
  { nId: 37, nAz: 124, nR: 0.48, nMag: 0.7 },

  // Link — twin loops (N ~145°)
  { nId: 40, nAz: 132, nR: 0.3, nMag: 0.85 },
  { nId: 41, nAz: 142, nR: 0.22, nMag: 0.9 },
  { nId: 42, nAz: 152, nR: 0.3, nMag: 0.85 },
  { nId: 43, nAz: 142, nR: 0.4, nMag: 0.8 },
  { nId: 44, nAz: 138, nR: 0.55, nMag: 0.85 },
  { nId: 45, nAz: 148, nR: 0.62, nMag: 0.9 },
  { nId: 46, nAz: 158, nR: 0.55, nMag: 0.85 },
  { nId: 47, nAz: 148, nR: 0.48, nMag: 0.8 },

  // Host — house (N ~190°)
  { nId: 50, nAz: 190, nR: 0.26, nMag: 1 },
  { nId: 51, nAz: 175, nR: 0.4, nMag: 0.85 },
  { nId: 52, nAz: 205, nR: 0.4, nMag: 0.85 },
  { nId: 53, nAz: 178, nR: 0.62, nMag: 0.8 },
  { nId: 54, nAz: 202, nR: 0.62, nMag: 0.8 },
  { nId: 55, nAz: 190, nR: 0.7, nMag: 0.75 },

  // Fork — Y (N ~235°)
  { nId: 60, nAz: 235, nR: 0.24, nMag: 1 },
  { nId: 61, nAz: 235, nR: 0.42, nMag: 0.9 },
  { nId: 62, nAz: 218, nR: 0.64, nMag: 0.85 },
  { nId: 63, nAz: 252, nR: 0.64, nMag: 0.85 },

  // Port — arch gateway (N ~280°)
  { nId: 70, nAz: 268, nR: 0.7, nMag: 0.8 },
  { nId: 71, nAz: 268, nR: 0.4, nMag: 0.85 },
  { nId: 72, nAz: 280, nR: 0.26, nMag: 1 },
  { nId: 73, nAz: 292, nR: 0.4, nMag: 0.85 },
  { nId: 74, nAz: 292, nR: 0.7, nMag: 0.8 },
  { nId: 75, nAz: 280, nR: 0.52, nMag: 0.75 },

  // Tree — trunk + canopy (N ~325°)
  { nId: 80, nAz: 325, nR: 0.72, nMag: 0.75 },
  { nId: 81, nAz: 325, nR: 0.5, nMag: 0.85 },
  { nId: 82, nAz: 310, nR: 0.34, nMag: 0.85 },
  { nId: 83, nAz: 340, nR: 0.34, nMag: 0.85 },
  { nId: 84, nAz: 325, nR: 0.22, nMag: 1 },
  { nId: 85, nAz: 318, nR: 0.42, nMag: 0.7 },
  { nId: 86, nAz: 332, nR: 0.42, nMag: 0.7 },

  // Agent — figure (S ~20°)
  { nId: 100, nAz: 20, nR: 0.22, nMag: 1 },
  { nId: 101, nAz: 20, nR: 0.4, nMag: 0.9 },
  { nId: 102, nAz: 8, nR: 0.55, nMag: 0.8 },
  { nId: 103, nAz: 32, nR: 0.55, nMag: 0.8 },
  { nId: 104, nAz: 14, nR: 0.72, nMag: 0.75 },
  { nId: 105, nAz: 26, nR: 0.72, nMag: 0.75 },

  // Table — top + legs (S ~65°)
  { nId: 110, nAz: 52, nR: 0.36, nMag: 0.85 },
  { nId: 111, nAz: 78, nR: 0.36, nMag: 0.85 },
  { nId: 112, nAz: 58, nR: 0.28, nMag: 0.8 },
  { nId: 113, nAz: 72, nR: 0.28, nMag: 0.8 },
  { nId: 114, nAz: 55, nR: 0.62, nMag: 0.8 },
  { nId: 115, nAz: 75, nR: 0.62, nMag: 0.8 },
  { nId: 116, nAz: 65, nR: 0.42, nMag: 0.7 },

  // Clone — twin squares (S ~110°)
  { nId: 120, nAz: 100, nR: 0.28, nMag: 0.85 },
  { nId: 121, nAz: 112, nR: 0.28, nMag: 0.85 },
  { nId: 122, nAz: 100, nR: 0.42, nMag: 0.8 },
  { nId: 123, nAz: 112, nR: 0.42, nMag: 0.9 },
  { nId: 124, nAz: 112, nR: 0.56, nMag: 0.85 },
  { nId: 125, nAz: 124, nR: 0.42, nMag: 0.8 },
  { nId: 126, nAz: 124, nR: 0.56, nMag: 0.85 },

  // Cache — chest (S ~155°)
  { nId: 130, nAz: 145, nR: 0.34, nMag: 0.85 },
  { nId: 131, nAz: 165, nR: 0.34, nMag: 0.85 },
  { nId: 132, nAz: 142, nR: 0.28, nMag: 0.75 },
  { nId: 133, nAz: 168, nR: 0.28, nMag: 0.75 },
  { nId: 134, nAz: 145, nR: 0.58, nMag: 0.85 },
  { nId: 135, nAz: 165, nR: 0.58, nMag: 0.85 },
  { nId: 136, nAz: 155, nR: 0.46, nMag: 1 },

  // Frame — nested rect (S ~200°)
  { nId: 140, nAz: 188, nR: 0.28, nMag: 0.85 },
  { nId: 141, nAz: 212, nR: 0.28, nMag: 0.85 },
  { nId: 142, nAz: 188, nR: 0.62, nMag: 0.85 },
  { nId: 143, nAz: 212, nR: 0.62, nMag: 0.85 },
  { nId: 144, nAz: 194, nR: 0.38, nMag: 0.75 },
  { nId: 145, nAz: 206, nR: 0.38, nMag: 0.75 },
  { nId: 146, nAz: 194, nR: 0.52, nMag: 0.75 },
  { nId: 147, nAz: 206, nR: 0.52, nMag: 0.75 },

  // Shell — dome (S ~245°)
  { nId: 150, nAz: 245, nR: 0.22, nMag: 1 },
  { nId: 151, nAz: 228, nR: 0.38, nMag: 0.85 },
  { nId: 152, nAz: 262, nR: 0.38, nMag: 0.85 },
  { nId: 153, nAz: 232, nR: 0.58, nMag: 0.8 },
  { nId: 154, nAz: 258, nR: 0.58, nMag: 0.8 },
  { nId: 155, nAz: 245, nR: 0.68, nMag: 0.85 },
  { nId: 156, nAz: 245, nR: 0.45, nMag: 0.7 },

  // Forum — pillars (S ~290°)
  { nId: 160, nAz: 278, nR: 0.7, nMag: 0.75 },
  { nId: 161, nAz: 290, nR: 0.7, nMag: 0.75 },
  { nId: 162, nAz: 302, nR: 0.7, nMag: 0.75 },
  { nId: 163, nAz: 278, nR: 0.34, nMag: 0.9 },
  { nId: 164, nAz: 290, nR: 0.28, nMag: 1 },
  { nId: 165, nAz: 302, nR: 0.34, nMag: 0.9 },
  { nId: 166, nAz: 272, nR: 0.34, nMag: 0.7 },
  { nId: 167, nAz: 308, nR: 0.34, nMag: 0.7 },

  // State — citadel (S ~335°)
  { nId: 170, nAz: 335, nR: 0.2, nMag: 1 },
  { nId: 171, nAz: 325, nR: 0.32, nMag: 0.85 },
  { nId: 172, nAz: 345, nR: 0.32, nMag: 0.85 },
  { nId: 173, nAz: 318, nR: 0.48, nMag: 0.85 },
  { nId: 174, nAz: 335, nR: 0.48, nMag: 0.8 },
  { nId: 175, nAz: 352, nR: 0.48, nMag: 0.85 },
  { nId: 176, nAz: 320, nR: 0.7, nMag: 0.8 },
  { nId: 177, nAz: 335, nR: 0.7, nMag: 0.75 },
  { nId: 178, nAz: 350, nR: 0.7, nMag: 0.8 },
]

const mapStarsById: Record<number, tStar> = Object.fromEntries(
  arrStars.map((objStar) => [objStar.nId, objStar]),
)

const arrConstellations: tConstellation[] = [
  {
    sSlug: '0',
    sName: 'The Seed',
    sHemisphere: 'N',
    arrStarIds: [10, 11, 12, 13, 14],
    arrEdges: [
      [10, 11],
      [11, 12],
      [12, 13],
      [12, 14],
    ],
    nLabelAz: 22,
    nLabelR: 0.6,
  },
  {
    sSlug: '1',
    sName: 'The Flag',
    sHemisphere: 'N',
    arrStarIds: [20, 21, 22, 23, 24, 25],
    arrEdges: [
      [20, 21],
      [21, 22],
      [22, 23],
      [23, 25],
      [25, 24],
      [24, 21],
    ],
    nLabelAz: 62,
    nLabelR: 0.82,
  },
  {
    sSlug: '10',
    sName: 'The Call',
    sHemisphere: 'N',
    arrStarIds: [30, 31, 32, 33, 34, 35, 36, 37],
    arrEdges: [
      [30, 31],
      [31, 33],
      [33, 35],
      [35, 34],
      [34, 32],
      [32, 30],
      [32, 36],
      [36, 37],
    ],
    nLabelAz: 110,
    nLabelR: 0.76,
  },
  {
    sSlug: '11',
    sName: 'The Link',
    sHemisphere: 'N',
    arrStarIds: [40, 41, 42, 43, 44, 45, 46, 47],
    arrEdges: [
      [40, 41],
      [41, 42],
      [42, 43],
      [43, 40],
      [43, 47],
      [47, 44],
      [44, 45],
      [45, 46],
      [46, 47],
    ],
    nLabelAz: 155,
    nLabelR: 0.76,
  },
  {
    sSlug: '100',
    sName: 'The Host',
    sHemisphere: 'N',
    arrStarIds: [50, 51, 52, 53, 54, 55],
    arrEdges: [
      [50, 51],
      [50, 52],
      [51, 53],
      [52, 54],
      [53, 55],
      [54, 55],
    ],
    nLabelAz: 190,
    nLabelR: 0.84,
  },
  {
    sSlug: '101',
    sName: 'The Fork',
    sHemisphere: 'N',
    arrStarIds: [60, 61, 62, 63],
    arrEdges: [
      [60, 61],
      [61, 62],
      [61, 63],
    ],
    nLabelAz: 235,
    nLabelR: 0.78,
  },
  {
    sSlug: '110',
    sName: 'The Port',
    sHemisphere: 'N',
    arrStarIds: [70, 71, 72, 73, 74, 75],
    arrEdges: [
      [70, 71],
      [71, 72],
      [72, 73],
      [73, 74],
      [71, 75],
      [75, 73],
    ],
    nLabelAz: 280,
    nLabelR: 0.84,
  },
  {
    sSlug: '111',
    sName: 'The Tree',
    sHemisphere: 'N',
    arrStarIds: [80, 81, 82, 83, 84, 85, 86],
    arrEdges: [
      [80, 81],
      [81, 84],
      [81, 82],
      [81, 83],
      [81, 85],
      [81, 86],
    ],
    nLabelAz: 325,
    nLabelR: 0.86,
  },
  {
    sSlug: '1000',
    sName: 'The Agent',
    sHemisphere: 'S',
    arrStarIds: [100, 101, 102, 103, 104, 105],
    arrEdges: [
      [100, 101],
      [101, 102],
      [101, 103],
      [101, 104],
      [101, 105],
    ],
    nLabelAz: 20,
    nLabelR: 0.86,
  },
  {
    sSlug: '1001',
    sName: 'The Table',
    sHemisphere: 'S',
    arrStarIds: [110, 111, 112, 113, 114, 115, 116],
    arrEdges: [
      [110, 111],
      [112, 110],
      [113, 111],
      [110, 114],
      [111, 115],
      [110, 116],
      [116, 111],
    ],
    nLabelAz: 65,
    nLabelR: 0.76,
  },
  {
    sSlug: '1010',
    sName: 'The Clone',
    sHemisphere: 'S',
    arrStarIds: [120, 121, 122, 123, 124, 125, 126],
    arrEdges: [
      [120, 121],
      [121, 123],
      [123, 122],
      [122, 120],
      [123, 124],
      [124, 126],
      [126, 125],
      [125, 123],
    ],
    nLabelAz: 118,
    nLabelR: 0.7,
  },
  {
    sSlug: '1011',
    sName: 'The Cache',
    sHemisphere: 'S',
    arrStarIds: [130, 131, 132, 133, 134, 135, 136],
    arrEdges: [
      [132, 130],
      [130, 131],
      [131, 133],
      [130, 134],
      [131, 135],
      [134, 135],
      [130, 136],
      [136, 131],
    ],
    nLabelAz: 155,
    nLabelR: 0.72,
  },
  {
    sSlug: '1100',
    sName: 'The Frame',
    sHemisphere: 'S',
    arrStarIds: [140, 141, 142, 143, 144, 145, 146, 147],
    arrEdges: [
      [140, 141],
      [141, 143],
      [143, 142],
      [142, 140],
      [144, 145],
      [145, 147],
      [147, 146],
      [146, 144],
    ],
    nLabelAz: 200,
    nLabelR: 0.76,
  },
  {
    sSlug: '1101',
    sName: 'The Shell',
    sHemisphere: 'S',
    arrStarIds: [150, 151, 152, 153, 154, 155, 156],
    arrEdges: [
      [150, 151],
      [150, 152],
      [151, 153],
      [152, 154],
      [153, 155],
      [154, 155],
      [150, 156],
      [156, 155],
    ],
    nLabelAz: 245,
    nLabelR: 0.82,
  },
  {
    sSlug: '1110',
    sName: 'The Forum',
    sHemisphere: 'S',
    arrStarIds: [160, 161, 162, 163, 164, 165, 166, 167],
    arrEdges: [
      [160, 163],
      [161, 164],
      [162, 165],
      [166, 163],
      [163, 164],
      [164, 165],
      [165, 167],
    ],
    nLabelAz: 290,
    nLabelR: 0.84,
  },
  {
    sSlug: '1111',
    sName: 'The State',
    sHemisphere: 'S',
    arrStarIds: [170, 171, 172, 173, 174, 175, 176, 177, 178],
    arrEdges: [
      [170, 171],
      [170, 172],
      [171, 173],
      [172, 175],
      [173, 174],
      [174, 175],
      [173, 176],
      [174, 177],
      [175, 178],
      [176, 177],
      [177, 178],
    ],
    nLabelAz: 335,
    nLabelR: 0.84,
  },
]

function nMulberry32(nSeed: number): () => number {
  let nState = nSeed >>> 0
  return () => {
    nState = (nState + 0x6d2b79f5) >>> 0
    let nT = nState
    nT = Math.imul(nT ^ (nT >>> 15), nT | 1)
    nT ^= nT + Math.imul(nT ^ (nT >>> 7), nT | 61)
    return ((nT ^ (nT >>> 14)) >>> 0) / 4294967296
  }
}

function arrFieldStars(sHemisphere: tHemisphere): tStar[] {
  const nSeed = nFieldStarSeed ^ (sHemisphere === 'N' ? 0x1000 : 0x2000)
  const nRand = nMulberry32(nSeed)
  const arrResult: tStar[] = []

  for (let nIndex = 0; nIndex < nFieldStarCount; nIndex += 1) {
    arrResult.push({
      nId: 1000 + nIndex,
      nAz: nRand() * 360,
      nR: Math.sqrt(nRand()) * 0.96,
      nMag: 0.2 + nRand() * 0.55,
    })
  }

  return arrResult
}

function nProjectedAz(nAz: number, sHemisphere: tHemisphere): number {
  return sHemisphere === 'N' ? nAz : 360 - nAz
}

function objPolarToXy(nAz: number, nR: number, sHemisphere: tHemisphere): { nX: number; nY: number } {
  const nRad = (nProjectedAz(nAz, sHemisphere) * Math.PI) / 180
  const nPx = nR * nChartRadius
  return {
    nX: nCenter + nPx * Math.sin(nRad),
    nY: nCenter - nPx * Math.cos(nRad),
  }
}

function sGridMarkup(sHemisphere: tHemisphere): string {
  const arrRings = [0.33, 0.66, 1]
  const sRings = arrRings
    .map((nR) => {
      const nRadius = nR * nChartRadius
      return `<circle class="starmap-ring" cx="${nCenter}" cy="${nCenter}" r="${nRadius}"/>`
    })
    .join('')

  const arrSpokes: string[] = []
  for (let nSpoke = 0; nSpoke < 8; nSpoke += 1) {
    const nAz = nSpoke * 45
    const objEdge = objPolarToXy(nAz, 1, sHemisphere)
    arrSpokes.push(
      `<line class="starmap-spoke" x1="${nCenter}" y1="${nCenter}" x2="${objEdge.nX}" y2="${objEdge.nY}"/>`,
    )
  }

  return `
    <circle class="starmap-disk" cx="${nCenter}" cy="${nCenter}" r="${nChartRadius}"/>
    ${sRings}
    ${arrSpokes.join('')}
    <circle class="starmap-pole" cx="${nCenter}" cy="${nCenter}" r="2.5"/>
  `
}

function sFieldStarMarkup(sHemisphere: tHemisphere): string {
  return arrFieldStars(sHemisphere)
    .map((objStar) => {
      const objXy = objPolarToXy(objStar.nAz, objStar.nR, sHemisphere)
      const nRadius = 0.6 + objStar.nMag * 1.4
      const nOpacity = 0.25 + objStar.nMag * 0.55
      return `<circle class="starmap-field-star" cx="${objXy.nX}" cy="${objXy.nY}" r="${nRadius}" opacity="${nOpacity.toFixed(3)}"/>`
    })
    .join('')
}

function sConstellationFigureMarkup(objConstellation: tConstellation): string {
  const sHemisphere = objConstellation.sHemisphere
  const sEdges = objConstellation.arrEdges
    .map(([nFromId, nToId]) => {
      const objFrom = mapStarsById[nFromId]
      const objTo = mapStarsById[nToId]
      if (!objFrom || !objTo) {
        return ''
      }
      const objA = objPolarToXy(objFrom.nAz, objFrom.nR, sHemisphere)
      const objB = objPolarToXy(objTo.nAz, objTo.nR, sHemisphere)
      return `<line class="starmap-edge" x1="${objA.nX}" y1="${objA.nY}" x2="${objB.nX}" y2="${objB.nY}"/>`
    })
    .join('')

  const sStars = objConstellation.arrStarIds
    .map((nStarId) => {
      const objStar = mapStarsById[nStarId]
      if (!objStar) {
        return ''
      }
      const objXy = objPolarToXy(objStar.nAz, objStar.nR, sHemisphere)
      const nRadius = 1.6 + objStar.nMag * 1.8
      return `<circle class="starmap-star" cx="${objXy.nX}" cy="${objXy.nY}" r="${nRadius}"/>`
    })
    .join('')

  return `
    <g class="starmap-constellation" data-slug="${objConstellation.sSlug}">
      ${sEdges}
      ${sStars}
    </g>
  `
}

function sConstellationLabelMarkup(objConstellation: tConstellation): string {
  const objLabel = objPolarToXy(
    objConstellation.nLabelAz,
    objConstellation.nLabelR,
    objConstellation.sHemisphere,
  )

  return `
    <text class="starmap-label" data-slug="${objConstellation.sSlug}" x="${objLabel.nX}" y="${objLabel.nY}">${objConstellation.sName}</text>
  `
}

function sHemisphereTitle(sHemisphere: tHemisphere): string {
  return sHemisphere === 'N' ? 'Northern Hemisphere' : 'Southern Hemisphere'
}

function sHemisphereSvg(sHemisphere: tHemisphere): string {
  const sTitle = sHemisphereTitle(sHemisphere)
  const arrHemisphereConstellations = arrConstellations.filter(
    (objConstellation) => objConstellation.sHemisphere === sHemisphere,
  )
  const sFigures = arrHemisphereConstellations.map(sConstellationFigureMarkup).join('')
  const sLabels = arrHemisphereConstellations.map(sConstellationLabelMarkup).join('')

  return `
    <figure class="starmap-chart">
      <figcaption class="starmap-chart-title">${sTitle}</figcaption>
      <svg class="starmap-svg" viewBox="0 0 ${nViewSize} ${nViewSize}" role="img" aria-label="${sTitle}">
        <defs>
          <clipPath id="starmap-clip-${sHemisphere}">
            <circle cx="${nCenter}" cy="${nCenter}" r="${nChartRadius}"/>
          </clipPath>
        </defs>
        ${sGridMarkup(sHemisphere)}
        <g clip-path="url(#starmap-clip-${sHemisphere})">
          ${sFieldStarMarkup(sHemisphere)}
          ${sFigures}
        </g>
        <g class="starmap-labels">
          ${sLabels}
        </g>
      </svg>
    </figure>
  `
}

function sLegendListMarkup(sHemisphere: tHemisphere): string {
  const sItems = arrConstellations
    .filter((objConstellation) => objConstellation.sHemisphere === sHemisphere)
    .map((objConstellation) => {
      return `
        <li class="starmap-legend-item" data-slug="${objConstellation.sSlug}" tabindex="0">
          <span class="starmap-legend-binary">${objConstellation.sSlug}</span>
          <span class="starmap-legend-name">${objConstellation.sName}</span>
        </li>
      `
    })
    .join('')

  return `
    <div class="starmap-legend-group">
      <h3>${sHemisphereTitle(sHemisphere)}</h3>
      <ul class="starmap-legend-list">${sItems}</ul>
    </div>
  `
}

export function sStarmapMarkup(): string {
  return `
    <div class="starmap" id="starmap">
      <div class="starmap-charts">
        ${sHemisphereSvg('N')}
        ${sHemisphereSvg('S')}
      </div>
      <aside class="starmap-legend" aria-label="Constellations">
        ${sLegendListMarkup('N')}
        ${sLegendListMarkup('S')}
      </aside>
    </div>
  `
}

export function vBindStarmapHover(): void {
  const objRoot = document.querySelector<HTMLElement>('#starmap')
  if (!objRoot) {
    return
  }

  const arrLegendItems = Array.from(
    objRoot.querySelectorAll<HTMLElement>('.starmap-legend-item[data-slug]'),
  )
  const arrConstellationGroups = Array.from(
    objRoot.querySelectorAll<SVGGElement>('.starmap-constellation[data-slug]'),
  )
  const arrLabels = Array.from(objRoot.querySelectorAll<SVGTextElement>('.starmap-label[data-slug]'))

  function vClearHighlight(): void {
    objRoot!.classList.remove('is-highlighting')
    for (const objItem of arrLegendItems) {
      objItem.classList.remove('is-active')
    }
    for (const objGroup of arrConstellationGroups) {
      objGroup.classList.remove('is-active')
    }
    for (const objLabel of arrLabels) {
      objLabel.classList.remove('is-active')
    }
  }

  function vHighlightSlug(sSlug: string): void {
    objRoot!.classList.add('is-highlighting')
    for (const objItem of arrLegendItems) {
      objItem.classList.toggle('is-active', objItem.dataset.slug === sSlug)
    }
    for (const objGroup of arrConstellationGroups) {
      objGroup.classList.toggle('is-active', objGroup.dataset.slug === sSlug)
    }
    for (const objLabel of arrLabels) {
      objLabel.classList.toggle('is-active', objLabel.dataset.slug === sSlug)
    }
  }

  for (const objItem of arrLegendItems) {
    const sSlug = objItem.dataset.slug
    if (!sSlug) {
      continue
    }

    objItem.addEventListener('pointerenter', () => {
      vHighlightSlug(sSlug)
    })
    objItem.addEventListener('pointerleave', () => {
      vClearHighlight()
    })
    objItem.addEventListener('focus', () => {
      vHighlightSlug(sSlug)
    })
    objItem.addEventListener('blur', () => {
      vClearHighlight()
    })
  }
}
