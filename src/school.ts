import { sCardIconMarkup } from './cardIcons'

type tSchoolCard = {
  sName: string
  sBinaryValue: string
  sMeaning: string
}

type tHairStyle = 'short' | 'bob' | 'long' | 'twin' | 'messy' | 'slick' | 'ponytail' | 'under'

type tCharacter = {
  sId: string
  sName: string
  sTitle: string
  sBinaryValue: string
  sRole: string
  sHair: string
  sEyes: string
  sAccent: string
  sSkin: string
  sHairStyle: tHairStyle
}

type tChoice = {
  sLabel: string
  sNext: string
  sMeet?: string
  bAwaken?: boolean
}

type tLine = {
  sSpeaker: string | null
  sText: string
}

type tScene = {
  sId: string
  sPlace: string
  sPortrait: string | null
  arrLines: tLine[]
  arrChoices?: tChoice[]
  sNext?: string
  bTitle?: boolean
  bHub?: boolean
}

type tTimeOfDay = 'midday' | 'evening'

const sStorageKey = 'binarot_school'

type tSchoolSave = {
  setMet: string[]
  bAwakened: boolean
  sTimeOfDay: tTimeOfDay
}

let mapCharById: Record<string, tCharacter> = {}
let setMet = new Set<string>()
let bAwakened = false
let sTimeOfDay: tTimeOfDay = 'midday'
let sSceneId = 'title'
let nLine = 0
let bBound = false

let arrSchoolCards: tSchoolCard[] = []
let sPendingNext: string | null = null

let objRoot: HTMLElement | null = null
let objStage: HTMLElement | null = null
let objPortrait: HTMLElement | null = null
let objNameBox: HTMLElement | null = null
let objDialogue: HTMLElement | null = null
let objAdvance: HTMLElement | null = null
let objChoices: HTMLElement | null = null
let objProgress: HTMLElement | null = null
let objHub: HTMLElement | null = null
let objUnlock: HTMLElement | null = null
let objTimeBtn: HTMLButtonElement | null = null

const arrCharacters: tCharacter[] = [
  {
    sId: '0',
    sName: 'Sora',
    sTitle: 'The Seed',
    sBinaryValue: '0',
    sRole: 'First-year · blank notebooks',
    sHair: '#c4b8a8',
    sEyes: '#8a9a6a',
    sAccent: '#9ae8ac',
    sSkin: '#f3dcc8',
    sHairStyle: 'messy',
  },
  {
    sId: '1',
    sName: 'Rei',
    sTitle: 'The Flag',
    sBinaryValue: '1',
    sRole: 'Student council · planted claims',
    sHair: '#2a2430',
    sEyes: '#e0b83a',
    sAccent: '#e0b83a',
    sSkin: '#e6c09a',
    sHairStyle: 'slick',
  },
  {
    sId: '10',
    sName: 'Yuki',
    sTitle: 'The Call',
    sBinaryValue: '10',
    sRole: 'Announcements · always mid-ring',
    sHair: '#f0e8dc',
    sEyes: '#6a8ec8',
    sAccent: '#a0d4ff',
    sSkin: '#f0d4cc',
    sHairStyle: 'bob',
  },
  {
    sId: '11',
    sName: 'Ren',
    sTitle: 'The Link',
    sBinaryValue: '11',
    sRole: 'Club connector · handshake specialist',
    sHair: '#5a3a28',
    sEyes: '#4a7a5a',
    sAccent: '#7ec8a0',
    sSkin: '#a86b48',
    sHairStyle: 'short',
  },
  {
    sId: '100',
    sName: 'Hana',
    sTitle: 'The Host',
    sBinaryValue: '100',
    sRole: 'Homeroom keeper · open door',
    sHair: '#6b3a5a',
    sEyes: '#c87898',
    sAccent: '#e8a0b8',
    sSkin: '#ecc4a8',
    sHairStyle: 'long',
  },
  {
    sId: '101',
    sName: 'Kai',
    sTitle: 'The Fork',
    sBinaryValue: '101',
    sRole: 'Undeclared · two paths humming',
    sHair: '#c86040',
    sEyes: '#d08040',
    sAccent: '#e8a060',
    sSkin: '#6e4028',
    sHairStyle: 'messy',
  },
  {
    sId: '110',
    sName: 'Mina',
    sTitle: 'The Port',
    sBinaryValue: '110',
    sRole: 'Transfer student · threshold walker',
    sHair: '#3a5a78',
    sEyes: '#50a0e6',
    sAccent: '#70b8f0',
    sSkin: '#8a5538',
    sHairStyle: 'ponytail',
  },
  {
    sId: '111',
    sName: 'Aoi',
    sTitle: 'The Tree',
    sBinaryValue: '111',
    sRole: 'Upperclass · roots and reach',
    sHair: '#2d5840',
    sEyes: '#3a8848',
    sAccent: '#6bc87a',
    sSkin: '#c49a70',
    sHairStyle: 'long',
  },
  {
    sId: '1000',
    sName: 'Jin',
    sTitle: 'The Agent',
    sBinaryValue: '1000',
    sRole: 'Independent study · no permission slip',
    sHair: '#1a1820',
    sEyes: '#b070d0',
    sAccent: '#8b4dff',
    sSkin: '#4a2c1c',
    sHairStyle: 'under',
  },
  {
    sId: '1001',
    sName: 'Nori',
    sTitle: 'The Table',
    sBinaryValue: '1001',
    sRole: 'Cafeteria strategist · reserved seats',
    sHair: '#8a6040',
    sEyes: '#a07840',
    sAccent: '#d4a858',
    sSkin: '#c88858',
    sHairStyle: 'bob',
  },
  {
    sId: '1010',
    sName: 'Rina',
    sTitle: 'The Clone',
    sBinaryValue: '1010',
    sRole: 'Mirror club · equal footing',
    sHair: '#e8b8c8',
    sEyes: '#c07090',
    sAccent: '#f0a0c0',
    sSkin: '#f0d0c0',
    sHairStyle: 'twin',
  },
  {
    sId: '1011',
    sName: 'Kura',
    sTitle: 'The Cache',
    sBinaryValue: '1011',
    sRole: 'Library vault · delayed answers',
    sHair: '#3a3048',
    sEyes: '#7a6a9a',
    sAccent: '#a090c0',
    sSkin: '#5a3828',
    sHairStyle: 'slick',
  },
  {
    sId: '1100',
    sName: 'Saki',
    sTitle: 'The Frame',
    sBinaryValue: '1100',
    sRole: 'Art studio · shifting windows',
    sHair: '#d8a060',
    sEyes: '#8870b0',
    sAccent: '#c8a0e0',
    sSkin: '#d4a888',
    sHairStyle: 'bob',
  },
  {
    sId: '1101',
    sName: 'Toru',
    sTitle: 'The Shell',
    sBinaryValue: '1101',
    sRole: 'Quiet perimeter · hard interface',
    sHair: '#4a5060',
    sEyes: '#687888',
    sAccent: '#90a0b0',
    sSkin: '#9a6848',
    sHairStyle: 'short',
  },
  {
    sId: '1110',
    sName: 'Aria',
    sTitle: 'The Forum',
    sBinaryValue: '1110',
    sRole: 'Debate captain · fair rules',
    sHair: '#f0e0a8',
    sEyes: '#b8860b',
    sAccent: '#e8c040',
    sSkin: '#e8c8a0',
    sHairStyle: 'ponytail',
  },
  {
    sId: '1111',
    sName: 'Ken',
    sTitle: 'The State',
    sBinaryValue: '1111',
    sRole: 'Systems prefect · whole machine',
    sHair: '#1c2030',
    sEyes: '#5060a0',
    sAccent: '#7080c8',
    sSkin: '#3f2418',
    sHairStyle: 'slick',
  },
  {
    sId: '-1',
    sName: '???',
    sTitle: 'The Void',
    sBinaryValue: '-1',
    sRole: 'Unregistered · underflow',
    sHair: '#0c0810',
    sEyes: '#c8c0d8',
    sAccent: '#6a6078',
    sSkin: '#3a3038',
    sHairStyle: 'under',
  },
]

const sVoidId = '-1'

function bIsVoidId(sId: string): boolean {
  return sId === sVoidId
}

function nSignCount(): number {
  let nCount = 0
  for (const objChar of arrCharacters) {
    if (!bIsVoidId(objChar.sId)) {
      nCount += 1
    }
  }
  return nCount
}

function nSignsMet(): number {
  let nCount = 0
  for (const objChar of arrCharacters) {
    if (!bIsVoidId(objChar.sId) && setMet.has(objChar.sId)) {
      nCount += 1
    }
  }
  return nCount
}

function bAllSignsMet(): boolean {
  return nSignsMet() >= nSignCount()
}

function bVoidPresent(): boolean {
  return bAllSignsMet() && !setMet.has(sVoidId)
}

function bSchoolComplete(): boolean {
  return bAllSignsMet() && setMet.has(sVoidId)
}

function sEscapeHtml(sValue: string): string {
  return sValue
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function sHairBackMarkup(objChar: tCharacter): string {
  const sH = objChar.sHair
  switch (objChar.sHairStyle) {
    case 'long':
      return `
        <path fill="${sH}" d="M52 88 C40 72 40 48 58 36 C78 22 122 22 142 36 C160 48 160 72 148 88
          L156 200 C150 220 130 228 100 228 C70 228 50 220 44 200 Z"/>
      `
    case 'twin':
      return `
        <path fill="${sH}" d="M58 90 C48 70 50 44 70 34 C90 24 110 28 120 42 L118 88 Z"/>
        <path fill="${sH}" d="M142 90 C152 70 150 44 130 34 C110 24 90 28 80 42 L82 88 Z"/>
        <ellipse fill="${sH}" cx="48" cy="168" rx="16" ry="52"/>
        <ellipse fill="${sH}" cx="152" cy="168" rx="16" ry="52"/>
      `
    case 'ponytail':
      return `
        <path fill="${sH}" d="M56 92 C46 70 52 42 74 34 C100 24 130 28 144 44 C156 58 154 78 146 92 Z"/>
        <path fill="${sH}" d="M128 48 C148 42 168 70 162 120 C158 150 148 168 140 176 C136 150 132 100 128 48 Z"/>
      `
    case 'under':
      return `
        <path fill="${sH}" d="M54 96 C44 74 50 46 72 36 C98 24 128 26 144 42 C158 56 158 78 150 96
          L148 140 L52 140 Z"/>
      `
    default:
      return `
        <path fill="${sH}" d="M54 96 C44 74 50 46 72 36 C98 24 128 26 144 42 C158 56 158 78 150 96 Z"/>
      `
  }
}

function sHairFrontMarkup(objChar: tCharacter): string {
  const sH = objChar.sHair
  switch (objChar.sHairStyle) {
    case 'slick':
      return `
        <path fill="${sH}" d="M58 88 C62 58 86 42 100 42 C118 42 140 58 142 88
          C130 72 118 66 100 66 C82 66 70 74 58 88 Z"/>
        <path fill="${sH}" d="M62 78 L48 118 L58 120 L70 86 Z"/>
      `
    case 'messy':
      return `
        <path fill="${sH}" d="M56 90 C60 60 84 40 100 42 C116 36 140 56 144 88
          C132 70 118 62 100 64 C84 66 70 76 56 90 Z"/>
        <path fill="${sH}" d="M72 48 L66 28 L84 50 Z"/>
        <path fill="${sH}" d="M118 46 L128 24 L132 52 Z"/>
        <path fill="${sH}" d="M96 40 L100 18 L108 42 Z"/>
      `
    case 'bob':
      return `
        <path fill="${sH}" d="M54 92 C56 60 78 44 100 44 C122 44 144 60 146 92
          C138 78 120 72 100 72 C80 72 62 78 54 92 Z"/>
        <path fill="${sH}" d="M52 96 C48 120 54 140 62 148 L70 100 Z"/>
        <path fill="${sH}" d="M148 96 C152 120 146 140 138 148 L130 100 Z"/>
      `
    case 'twin':
      return `
        <path fill="${sH}" d="M58 88 C64 58 86 44 100 44 C114 44 136 58 142 88
          C130 72 116 66 100 66 C84 66 70 72 58 88 Z"/>
        <path fill="${sH}" d="M70 70 L58 110 L68 112 Z"/>
        <path fill="${sH}" d="M130 70 L142 110 L132 112 Z"/>
      `
    case 'long':
      return `
        <path fill="${sH}" d="M56 90 C60 58 82 40 100 40 C118 40 140 58 144 90
          C132 72 116 64 100 64 C84 64 68 72 56 90 Z"/>
        <path fill="${sH}" d="M60 86 L46 150 L56 152 L72 96 Z"/>
        <path fill="${sH}" d="M140 86 L154 150 L144 152 L128 96 Z"/>
      `
    case 'ponytail':
      return `
        <path fill="${sH}" d="M58 90 C62 58 84 42 100 42 C118 42 138 58 142 90
          C130 74 116 68 100 68 C84 68 70 74 58 90 Z"/>
        <path fill="${sH}" d="M74 60 L60 100 L70 102 Z"/>
      `
    case 'under':
      return `
        <path fill="${sH}" d="M56 92 C60 62 84 48 100 48 C116 48 140 62 144 92
          C134 78 118 74 100 74 C82 74 66 78 56 92 Z"/>
        <path fill="${sH}" d="M64 100 C70 118 80 126 90 128 L88 100 Z"/>
        <path fill="${sH}" d="M136 100 C130 118 120 126 110 128 L112 100 Z"/>
      `
    default:
      return `
        <path fill="${sH}" d="M56 92 C60 60 82 44 100 44 C118 44 140 60 144 92
          C132 76 116 70 100 70 C84 70 68 76 56 92 Z"/>
      `
  }
}

function nSkinLuma(sSkin: string): number {
  const sHex = sSkin.replace('#', '')
  if (sHex.length !== 6) {
    return 200
  }
  const nR = Number.parseInt(sHex.slice(0, 2), 16)
  const nG = Number.parseInt(sHex.slice(2, 4), 16)
  const nB = Number.parseInt(sHex.slice(4, 6), 16)
  return 0.2126 * nR + 0.7152 * nG + 0.0722 * nB
}

function sBlushFill(sSkin: string): string {
  const nLuma = nSkinLuma(sSkin)
  if (nLuma < 90) {
    return 'rgba(180, 70, 90, 0.38)'
  }
  if (nLuma < 140) {
    return 'rgba(200, 90, 100, 0.34)'
  }
  return 'rgba(232, 120, 140, 0.28)'
}

function sLipStroke(sSkin: string): string {
  const nLuma = nSkinLuma(sSkin)
  if (nLuma < 90) {
    return '#a05060'
  }
  if (nLuma < 140) {
    return '#b86878'
  }
  return '#c07080'
}

function sPortraitMarkup(objChar: tCharacter): string {
  const sEyes = objChar.sEyes
  const sSkin = objChar.sSkin
  const sAccent = objChar.sAccent
  const sBlush = sBlushFill(sSkin)
  const sLip = sLipStroke(sSkin)
  const sGradId = `school-uniform-${objChar.sId.replace(/[^a-zA-Z0-9]/g, 'x')}`
  return `
    <svg class="school-portrait-svg" viewBox="0 0 200 280" width="200" height="280" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="${sGradId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2a1840"/>
          <stop offset="100%" stop-color="#120a1c"/>
        </linearGradient>
      </defs>
      ${sHairBackMarkup(objChar)}
      <path fill="url(#${sGradId})" d="M40 210 C50 176 70 158 100 158 C130 158 150 176 160 210
        L168 280 H32 Z"/>
      <path fill="#f4efe8" d="M88 168 H112 L118 188 H82 Z"/>
      <path fill="${sAccent}" opacity="0.85" d="M82 188 H118 L122 198 H78 Z"/>
      <ellipse fill="${sSkin}" cx="100" cy="108" rx="48" ry="56"/>
      <ellipse fill="${sSkin}" cx="100" cy="160" rx="14" ry="12"/>
      <ellipse fill="${sBlush}" cx="68" cy="118" rx="10" ry="6"/>
      <ellipse fill="${sBlush}" cx="132" cy="118" rx="10" ry="6"/>
      <ellipse fill="#fff" cx="80" cy="108" rx="10" ry="12"/>
      <ellipse fill="#fff" cx="120" cy="108" rx="10" ry="12"/>
      <ellipse fill="${sEyes}" cx="80" cy="110" rx="5" ry="7"/>
      <ellipse fill="${sEyes}" cx="120" cy="110" rx="5" ry="7"/>
      <circle fill="#1a1020" cx="80" cy="111" r="2.5"/>
      <circle fill="#1a1020" cx="120" cy="111" r="2.5"/>
      <circle fill="#fff" cx="78" cy="108" r="1.2"/>
      <circle fill="#fff" cx="118" cy="108" r="1.2"/>
      <path fill="none" stroke="#2a2030" stroke-width="2.2" stroke-linecap="round"
        d="M70 96 Q80 90 90 96"/>
      <path fill="none" stroke="#2a2030" stroke-width="2.2" stroke-linecap="round"
        d="M110 96 Q120 90 130 96"/>
      <path fill="none" stroke="${sLip}" stroke-width="2" stroke-linecap="round"
        d="M92 132 Q100 138 108 132"/>
      ${sHairFrontMarkup(objChar)}
      <circle fill="${sAccent}" cx="164" cy="48" r="18" opacity="0.9"/>
      <text x="164" y="53" text-anchor="middle" fill="#0a0610"
        font-family="IBM Plex Mono, monospace" font-size="11" font-weight="700">${sEscapeHtml(objChar.sBinaryValue)}</text>
    </svg>
  `
}

function objLoadSave(): tSchoolSave {
  try {
    const sRaw = localStorage.getItem(sStorageKey)
    if (!sRaw) {
      return { setMet: [], bAwakened: false, sTimeOfDay: 'midday' }
    }
    const objParsed = JSON.parse(sRaw) as Partial<tSchoolSave>
    const arrMet = Array.isArray(objParsed.setMet)
      ? objParsed.setMet.filter((sValue): sValue is string => typeof sValue === 'string')
      : []
    const bSavedAwakened = objParsed.bAwakened === true
    const sSavedTime: tTimeOfDay =
      bSavedAwakened && objParsed.sTimeOfDay === 'evening' ? 'evening' : 'midday'
    return { setMet: arrMet, bAwakened: bSavedAwakened, sTimeOfDay: sSavedTime }
  } catch {
    return { setMet: [], bAwakened: false, sTimeOfDay: 'midday' }
  }
}

function vPersist(): void {
  const objSave: tSchoolSave = {
    setMet: Array.from(setMet),
    bAwakened,
    sTimeOfDay: bAwakened ? sTimeOfDay : 'midday',
  }
  localStorage.setItem(sStorageKey, JSON.stringify(objSave))
}

function vAwaken(): void {
  if (bAwakened) {
    return
  }
  bAwakened = true
  sTimeOfDay = 'midday'
  vPersist()
}

function vSetTimeOfDay(sNext: tTimeOfDay): void {
  if (!bAwakened || sTimeOfDay === sNext) {
    return
  }
  sTimeOfDay = sNext
  vPersist()
}

function bIsEvening(): boolean {
  return bAwakened && sTimeOfDay === 'evening'
}

function vMeet(sId: string): boolean {
  if (!sId || setMet.has(sId)) {
    return false
  }
  setMet.add(sId)
  vPersist()
  return true
}

function objSchoolCard(objChar: tCharacter): tSchoolCard {
  const objCard = arrSchoolCards.find((objItem) => objItem.sBinaryValue === objChar.sBinaryValue)
  if (objCard) {
    return objCard
  }
  return {
    sName: objChar.sTitle,
    sBinaryValue: objChar.sBinaryValue,
    sMeaning: objChar.sRole,
  }
}

function sUnlockMeetId(objCurrent: tScene, objChoice: tChoice): string | null {
  if (objChoice.sMeet) {
    return objChoice.sMeet
  }
  if (objChoice.sNext === 'hub' && objCurrent.sPortrait && /^talk_.+_b$/.test(objCurrent.sId)) {
    return objCurrent.sPortrait
  }
  return null
}

function vShowUnlock(sId: string, sNext: string): void {
  const objChar = mapCharById[sId]
  if (!objChar || !objUnlock) {
    vGoScene(sNext)
    return
  }

  const objCard = objSchoolCard(objChar)
  sPendingNext = sNext
  objUnlock.hidden = false
  objUnlock.innerHTML = `
    <div class="school-unlock-panel">
      <p class="school-unlock-kicker">Thine art thou.</p>
      <div class="school-unlock-card collect-card is-dealt is-flipped" aria-hidden="true">
        <div class="collect-card-inner">
          <div class="collect-card-face collect-card-back">
            <div class="collect-card-back-mark">
              <span>0</span>
              <span>1</span>
            </div>
          </div>
          <div class="collect-card-face collect-card-front">
            ${sCardIconMarkup(objCard.sBinaryValue, 'collect-card-icon')}
            <h3 class="collect-card-name">${sEscapeHtml(objCard.sName)}</h3>
            <span class="collect-card-binary">${sEscapeHtml(objCard.sBinaryValue)}</span>
            <p class="collect-card-meaning">${sEscapeHtml(objCard.sMeaning)}</p>
          </div>
        </div>
      </div>
      <p class="school-unlock-body">
        <span class="school-unlock-line school-unlock-line-link">
          A new binarot link has been unlocked and you have made a new connection.
        </span>
        <span class="school-unlock-line school-unlock-line-destiny">
          Your destiny has now become intertwined with the
          <strong>${sEscapeHtml(objCard.sName)}</strong> card.
        </span>
      </p>
      <button type="button" class="school-choice school-unlock-continue" data-action="dismiss-unlock">
        Continue
      </button>
    </div>
  `

  const objCardEl = objUnlock.querySelector<HTMLElement>('.school-unlock-card')
  if (objCardEl) {
    objCardEl.classList.remove('is-dealt', 'is-flipped')
    requestAnimationFrame(() => {
      objCardEl.classList.add('is-dealt')
      window.setTimeout(() => {
        objCardEl.classList.add('is-flipped')
      }, 1400)
    })
  }
}

function vDismissUnlock(): void {
  if (!objUnlock) {
    return
  }
  objUnlock.hidden = true
  objUnlock.innerHTML = ''
  const sNext = sPendingNext
  sPendingNext = null
  if (sNext) {
    vGoScene(sNext)
  }
}

function objScene(sId: string): tScene | null {
  return mapScenes[sId] ?? null
}

function sSpeakerLabel(sSpeaker: string | null): string {
  if (!sSpeaker) {
    return ''
  }
  const objChar = mapCharById[sSpeaker]
  if (!objChar) {
    return sSpeaker
  }
  return `${objChar.sName} · ${objChar.sTitle}`
}

const mapScenes: Record<string, tScene> = {
  title: {
    sId: 'title',
    sPlace: 'gate',
    sPortrait: null,
    bTitle: true,
    arrLines: [
      {
        sSpeaker: null,
        sText: 'Binarot Academy — sixteen signs, one campus, and somehow they all wear the same uniform.',
      },
    ],
    arrChoices: [{ sLabel: 'Head through the gates', sNext: 'arrive' }],
  },
  arrive: {
    sId: 'arrive',
    sPlace: 'gate',
    sPortrait: null,
    arrLines: [
      {
        sSpeaker: null,
        sText: 'Morning hits the crest over the gate — a circle cut into sixteen little claims.',
      },
      {
        sSpeaker: null,
        sText: 'Inside, students stream past like a deck that got up and started walking.',
      },
      {
        sSpeaker: null,
        sText: "Your transfer papers are already stamped. Homeroom's waiting.",
      },
    ],
    sNext: 'homeroom',
  },
  homeroom: {
    sId: 'homeroom',
    sPlace: 'classroom',
    sPortrait: '100',
    arrLines: [
      {
        sSpeaker: '100',
        sText: "Hey — come in. I'm Hana. People call me The Host. Seat, spare notebook, somewhere to land… that's me.",
      },
      {
        sSpeaker: '100',
        sText: "Don't mind the noise. Sixteen personalities stuffed into one campus gets… a lot.",
      },
      {
        sSpeaker: '100',
        sText: "Free period's almost here. Wander. Talk to people. They notice when you actually listen.",
      },
    ],
    arrChoices: [
      { sLabel: "Thanks — I'll look around.", sNext: 'hub', sMeet: '100' },
      { sLabel: 'Anything I should know first?', sNext: 'homeroom_tip' },
    ],
  },
  homeroom_tip: {
    sId: 'homeroom_tip',
    sPlace: 'classroom',
    sPortrait: '100',
    arrLines: [
      {
        sSpeaker: '100',
        sText: 'Rei runs council like she planted a flag. The lab smells like ozone and bad decisions. Jin skips class from the roof.',
      },
      {
        sSpeaker: '100',
        sText: "Talk to everyone at least once. This place is kind of a reading — and you're the other card in it.",
      },
    ],
    arrChoices: [{ sLabel: 'Alright — free period it is', sNext: 'hub', sMeet: '100' }],
  },
  hub: {
    sId: 'hub',
    sPlace: 'hall',
    sPortrait: null,
    bHub: true,
    arrLines: [
      {
        sSpeaker: null,
        sText: 'Hallway splits three ways. Voices, chalk dust, lockers clicking shut.',
      },
    ],
  },
  talk_0: {
    sId: 'talk_0',
    sPlace: 'courtyard',
    sPortrait: '0',
    arrLines: [
      {
        sSpeaker: '0',
        sText: "Oh — hi. I'm Sora. People call me The Seed. I was just… not writing anything. On purpose.",
      },
      {
        sSpeaker: '0',
        sText: "Blank pages feel honest, you know? Once you put something down, half the other options kind of… leave.",
      },
    ],
    arrChoices: [
      { sLabel: 'That blank-page thing suits you.', sNext: 'talk_0_b' },
      { sLabel: 'So what are you gonna start?', sNext: 'talk_0_b' },
    ],
  },
  talk_0_b: {
    sId: 'talk_0_b',
    sPlace: 'courtyard',
    sPortrait: '0',
    arrLines: [
      {
        sSpeaker: '0',
        sText: "Maybe a club. Maybe something bigger. Ask me tomorrow — I might still be picking which beginning feels right.",
      },
    ],
    arrChoices: [{ sLabel: 'Back to the hall', sNext: 'hub' }],
  },
  talk_1: {
    sId: 'talk_1',
    sPlace: 'hall',
    sPortrait: '1',
    arrLines: [
      {
        sSpeaker: '1',
        sText: "Rei. Student council. The Flag, if you're collecting titles. What do you need?",
      },
      {
        sSpeaker: '1',
        sText: "This school runs on people actually saying what they want. Nobody does that, and the courtyard turns into gossip.",
      },
    ],
    arrChoices: [
      { sLabel: "I'm trying to learn the signs.", sNext: 'talk_1_b' },
      { sLabel: 'Do you ever just… stand down?', sNext: 'talk_1_b' },
    ],
  },
  talk_1_b: {
    sId: 'talk_1_b',
    sPlace: 'hall',
    sPortrait: '1',
    arrLines: [
      {
        sSpeaker: '1',
        sText: "I stand where something needs a name. Go meet the others — then come back and tell me what you're claiming.",
      },
    ],
    arrChoices: [{ sLabel: 'Back to the hall', sNext: 'hub' }],
  },
  talk_10: {
    sId: 'talk_10',
    sPlace: 'classroom',
    sPortrait: '10',
    arrLines: [
      {
        sSpeaker: '10',
        sText: "Yuki — The Call. Sorry, were you mid-sentence? Something always rings when I walk in.",
      },
      {
        sSpeaker: '10',
        sText: "Duty finds me in the hallway. Random luck finds me at the vending machines. I'm basically a walking notification.",
      },
    ],
    arrChoices: [
      { sLabel: "What's calling today?", sNext: 'talk_10_b' },
      { sLabel: 'Do you ever just ignore it?', sNext: 'talk_10_b' },
    ],
  },
  talk_10_b: {
    sId: 'talk_10_b',
    sPlace: 'classroom',
    sPortrait: '10',
    arrLines: [
      {
        sSpeaker: '10',
        sText: "Ignoring it just makes the next ring louder. You'll hear yours soon. Transfers always do.",
      },
    ],
    arrChoices: [{ sLabel: 'Back to the hall', sNext: 'hub' }],
  },
  talk_11: {
    sId: 'talk_11',
    sPlace: 'cafeteria',
    sPortrait: '11',
    arrLines: [
      {
        sSpeaker: '11',
        sText: "Ren — The Link. Sit anywhere. I'll get you talking to three people before your tray even hits the table.",
      },
      {
        sSpeaker: '11',
        sText: "Promises are like bandwidth. Keep them clean and the whole campus kind of… syncs.",
      },
    ],
    arrChoices: [
      { sLabel: 'Okay — introduce me to someone.', sNext: 'talk_11_b' },
      { sLabel: "How are you not fried all the time?", sNext: 'talk_11_b' },
    ],
  },
  talk_11_b: {
    sId: 'talk_11_b',
    sPlace: 'cafeteria',
    sPortrait: '11',
    arrLines: [
      {
        sSpeaker: '11',
        sText: "Oh, I am. Going deep with anyone is the homework I keep skipping. Still — want a handshake?",
      },
    ],
    arrChoices: [{ sLabel: 'Back to the hall', sNext: 'hub' }],
  },
  talk_100: {
    sId: 'talk_100',
    sPlace: 'classroom',
    sPortrait: '100',
    arrLines: [
      {
        sSpeaker: '100',
        sText: "Back already? Good. Door's unlocked for people who need it — and you look like one of them.",
      },
      {
        sSpeaker: '100',
        sText: "Making space for people is a skill. Knowing when the room's full is another one.",
      },
    ],
    arrChoices: [
      { sLabel: 'Yeah… this room feels safe.', sNext: 'talk_100_b' },
      { sLabel: 'Who do you host for?', sNext: 'talk_100_b' },
    ],
  },
  talk_100_b: {
    sId: 'talk_100_b',
    sPlace: 'classroom',
    sPortrait: '100',
    arrLines: [
      {
        sSpeaker: '100',
        sText: "Anyone still figuring out if they belong. That includes me, some days.",
      },
    ],
    arrChoices: [{ sLabel: 'Back to the hall', sNext: 'hub' }],
  },
  talk_100_omen: {
    sId: 'talk_100_omen',
    sPlace: 'classroom',
    sPortrait: '100',
    arrLines: [
      {
        sSpeaker: '100',
        sText: "You saw it too, didn't you. That hole in the register — the thing that shouldn't have a face.",
      },
      {
        sSpeaker: '100',
        sText: "I've seen The Void. More than once. I think it's an omen — something evil leaning on our world, trying to push through.",
      },
    ],
    arrChoices: [
      { sLabel: 'An invasion?', sNext: 'talk_100_omen_b' },
      { sLabel: 'What do we do about it?', sNext: 'talk_100_omen_b' },
    ],
  },
  talk_100_omen_b: {
    sId: 'talk_100_omen_b',
    sPlace: 'classroom',
    sPortrait: '100',
    arrLines: [
      {
        sSpeaker: '100',
        sText: "There's a quiet club of students who've woken up — we say we've awakened. We meet when the bells stop and the hallway thins out.",
      },
      {
        sSpeaker: '100',
        sText: "Come find us in the evening. I'll leave the door cracked. Midday is for the campus; dusk is for what's coming.",
      },
    ],
    arrChoices: [{ sLabel: "I'll be there.", sNext: 'hub', bAwaken: true }],
  },
  talk_100_evening: {
    sId: 'talk_100_evening',
    sPlace: 'classroom',
    sPortrait: '100',
    arrLines: [
      {
        sSpeaker: '100',
        sText: "You made it. Good — the room's filling. Jin's already pacing drills, Rei's naming positions, Toru's hardening the door.",
      },
      {
        sSpeaker: '100',
        sText: "We're not a study group anymore. When the evil leans through The Void, this club stands in the gap. Talk to them. Get ready.",
      },
    ],
    arrChoices: [{ sLabel: 'Back to the evening hall', sNext: 'hub' }],
  },
  talk_1_evening: {
    sId: 'talk_1_evening',
    sPlace: 'classroom',
    sPortrait: '1',
    arrLines: [
      {
        sSpeaker: '1',
        sText: "Rei. Evening session. Don't look surprised — someone has to plant a flag against whatever's trying to rewrite the chart.",
      },
      {
        sSpeaker: '1',
        sText: "I've mapped claim points across campus. When the invasion hits, we don't scatter. We hold named ground. Want a post?",
      },
    ],
    arrChoices: [
      { sLabel: 'Assign me somewhere.', sNext: 'talk_1_evening_b' },
      { sLabel: 'How do you fight an omen?', sNext: 'talk_1_evening_b' },
    ],
  },
  talk_1_evening_b: {
    sId: 'talk_1_evening_b',
    sPlace: 'classroom',
    sPortrait: '1',
    arrLines: [
      {
        sSpeaker: '1',
        sText: "You fight it by refusing to let it stay unnamed. Evil loves blank spaces. We fill them first — then we push back.",
      },
    ],
    arrChoices: [{ sLabel: 'Back to the evening hall', sNext: 'hub' }],
  },
  talk_110_evening: {
    sId: 'talk_110_evening',
    sPlace: 'classroom',
    sPortrait: '110',
    arrLines: [
      {
        sSpeaker: '110',
        sText: "Mina — still The Port, even after hours. Thresholds are my whole thing. The Void's just a door that forgot which way it opens.",
      },
      {
        sSpeaker: '110',
        sText: "I've been walking the edges where the chart thins. If evil tries to cross, I want to feel the hinge turn before it swings wide.",
      },
    ],
    arrChoices: [
      { sLabel: 'Can you seal a threshold?', sNext: 'talk_110_evening_b' },
      { sLabel: 'What happens if it opens?', sNext: 'talk_110_evening_b' },
    ],
  },
  talk_110_evening_b: {
    sId: 'talk_110_evening_b',
    sPlace: 'classroom',
    sPortrait: '110',
    arrLines: [
      {
        sSpeaker: '110',
        sText: "Seal what we can. Stall what we can't. And if it opens anyway — someone has to stand in the frame. I'm practicing not blinking.",
      },
    ],
    arrChoices: [{ sLabel: 'Back to the evening hall', sNext: 'hub' }],
  },
  talk_1000_evening: {
    sId: 'talk_1000_evening',
    sPlace: 'classroom',
    sPortrait: '1000',
    arrLines: [
      {
        sSpeaker: '1000',
        sText: "Jin. Agent. No permission slip for fighting fate — so I stopped asking.",
      },
      {
        sSpeaker: '1000',
        sText: "I've been running rooftop drills: strike the tear, don't stare at it. The Void warned you. I'm turning that warning into muscle.",
      },
    ],
    arrChoices: [
      { sLabel: 'Show me the drill.', sNext: 'talk_1000_evening_b' },
      { sLabel: 'You really think we can win?', sNext: 'talk_1000_evening_b' },
    ],
  },
  talk_1000_evening_b: {
    sId: 'talk_1000_evening_b',
    sPlace: 'classroom',
    sPortrait: '1000',
    arrLines: [
      {
        sSpeaker: '1000',
        sText: "Winning's a big word. Surviving the first wave with the chart still readable — that's the homework. Come swing when you're ready.",
      },
    ],
    arrChoices: [{ sLabel: 'Back to the evening hall', sNext: 'hub' }],
  },
  talk_1101_evening: {
    sId: 'talk_1101_evening',
    sPlace: 'classroom',
    sPortrait: '1101',
    arrLines: [
      {
        sSpeaker: '1101',
        sText: "Toru. Shell. Quiet perimeter's louder at night — you hear every tick in the lock.",
      },
      {
        sSpeaker: '1101',
        sText: "I'm hardening interfaces: doors, wards, the little rituals that keep a room from becoming a wound. Offense is Jin's job. I make sure we still have a wall.",
      },
    ],
    arrChoices: [
      { sLabel: 'Need a hand on the perimeter?', sNext: 'talk_1101_evening_b' },
      { sLabel: 'What if the wall fails?', sNext: 'talk_1101_evening_b' },
    ],
  },
  talk_1101_evening_b: {
    sId: 'talk_1101_evening_b',
    sPlace: 'classroom',
    sPortrait: '1101',
    arrLines: [
      {
        sSpeaker: '1101',
        sText: "Then we become the wall. Layers. People. Claims Rei plants. Ports Mina holds. I don't romanticize it — I just keep stacking.",
      },
    ],
    arrChoices: [{ sLabel: 'Back to the evening hall', sNext: 'hub' }],
  },
  talk_101: {
    sId: 'talk_101',
    sPlace: 'lab',
    sPortrait: '101',
    arrLines: [
      {
        sSpeaker: '101',
        sText: "Kai. Fork. Don't ask my major — both answers are buzzing at the same time.",
      },
      {
        sSpeaker: '101',
        sText: "Wanting something hard is a compass. That little click when a path feels right? That's the part I wait for.",
      },
    ],
    arrChoices: [
      { sLabel: 'Pick one with me, then.', sNext: 'talk_101_b' },
      { sLabel: 'Is sitting on the fence… honest?', sNext: 'talk_101_b' },
    ],
  },
  talk_101_b: {
    sId: 'talk_101_b',
    sPlace: 'lab',
    sPortrait: '101',
    arrLines: [
      {
        sSpeaker: '101',
        sText: "Indecision's weather. Commitment's climate. I'm still packing for both, honestly.",
      },
    ],
    arrChoices: [{ sLabel: 'Back to the hall', sNext: 'hub' }],
  },
  talk_110: {
    sId: 'talk_110',
    sPlace: 'cafeteria',
    sPortrait: '110',
    arrLines: [
      {
        sSpeaker: '110',
        sText: "Mina — The Port. I'm the transfer desk, the gateway, customs for weird ideas. I decide what gets through.",
      },
      {
        sSpeaker: '110',
        sText: "Trade me a story from outside and I'll trade you a campus rumor that's almost true.",
      },
    ],
    arrChoices: [
      { sLabel: 'Deal.', sNext: 'talk_110_b' },
      { sLabel: 'What do you keep out?', sNext: 'talk_110_b' },
    ],
  },
  talk_110_b: {
    sId: 'talk_110_b',
    sPlace: 'cafeteria',
    sPortrait: '110',
    arrLines: [
      {
        sSpeaker: '110',
        sText: "Anything that pretends it walked in unchanged. Crossing the threshold messes with you. That's the point.",
      },
    ],
    arrChoices: [{ sLabel: 'Back to the hall', sNext: 'hub' }],
  },
  talk_111: {
    sId: 'talk_111',
    sPlace: 'courtyard',
    sPortrait: '111',
    arrLines: [
      {
        sSpeaker: '111',
        sText: "Aoi. The Tree. Upperclass. I water the courtyard plot — and, uh, occasionally people.",
      },
      {
        sSpeaker: '111',
        sText: "Growing without roots is just a show. Roots with nowhere to reach? That's a stump with opinions.",
      },
    ],
    arrChoices: [
      { sLabel: 'Your shade feels earned.', sNext: 'talk_111_b' },
      { sLabel: 'How far do you reach?', sNext: 'talk_111_b' },
    ],
  },
  talk_111_b: {
    sId: 'talk_111_b',
    sPlace: 'courtyard',
    sPortrait: '111',
    arrLines: [
      {
        sSpeaker: '111',
        sText: "Far enough to cover first-years. Not so far I forget the quiet work underground.",
      },
    ],
    arrChoices: [{ sLabel: 'Back to the hall', sNext: 'hub' }],
  },
  talk_1000: {
    sId: 'talk_1000',
    sPlace: 'rooftop',
    sPortrait: '1000',
    arrLines: [
      {
        sSpeaker: '1000',
        sText: "Jin. Agent. If you're looking for a permission slip, I shredded mine.",
      },
      {
        sSpeaker: '1000',
        sText: "Wanting something and doing it should be the same move. Waiting for the bell is other people's hobby.",
      },
    ],
    arrChoices: [
      { sLabel: 'Teach me to move first.', sNext: 'talk_1000_b' },
      { sLabel: 'Lonely up here?', sNext: 'talk_1000_b' },
    ],
  },
  talk_1000_b: {
    sId: 'talk_1000_b',
    sPlace: 'rooftop',
    sPortrait: '1000',
    arrLines: [
      {
        sSpeaker: '1000',
        sText: "Lonely's a weather report. Useful is a forecast. I pick useful.",
      },
    ],
    arrChoices: [{ sLabel: 'Back to the hall', sNext: 'hub' }],
  },
  talk_1001: {
    sId: 'talk_1001',
    sPlace: 'cafeteria',
    sPortrait: '1001',
    arrLines: [
      {
        sSpeaker: '1001',
        sText: "Nori — The Table. This seat's for plots, meals, and getting people on the same page. Pull up a chair.",
      },
      {
        sSpeaker: '1001',
        sText: "What gets said here rearranges the room. Pick your words like you're ordering courses.",
      },
    ],
    arrChoices: [
      { sLabel: 'Okay… what are we conspiring?', sNext: 'talk_1001_b' },
      { sLabel: 'Is the menu the agenda?', sNext: 'talk_1001_b' },
    ],
  },
  talk_1001_b: {
    sId: 'talk_1001_b',
    sPlace: 'cafeteria',
    sPortrait: '1001',
    arrLines: [
      {
        sSpeaker: '1001',
        sText: "Today's special: get the transfer talking to every sign before sunset. Ambitious. Delicious.",
      },
    ],
    arrChoices: [{ sLabel: 'Back to the hall', sNext: 'hub' }],
  },
  talk_1010: {
    sId: 'talk_1010',
    sPlace: 'lab',
    sPortrait: '1010',
    arrLines: [
      {
        sSpeaker: '1010',
        sText: "Rina. Clone. Don't worry — there's only one of me today. Equality's the point, not copies for fun.",
      },
      {
        sSpeaker: '1010',
        sText: "I mirror people until they catch themselves. Then I step back before it all turns into sameness.",
      },
    ],
    arrChoices: [
      { sLabel: 'What do you see in me?', sNext: 'talk_1010_b' },
      { sLabel: 'How do you stay yourself?', sNext: 'talk_1010_b' },
    ],
  },
  talk_1010_b: {
    sId: 'talk_1010_b',
    sPlace: 'lab',
    sPortrait: '1010',
    arrLines: [
      {
        sSpeaker: '1010',
        sText: "Someone collecting faces. Careful — collections turn into mirrors too, if you're not watching.",
      },
    ],
    arrChoices: [{ sLabel: 'Back to the hall', sNext: 'hub' }],
  },
  talk_1011: {
    sId: 'talk_1011',
    sPlace: 'library',
    sPortrait: '1011',
    arrLines: [
      {
        sSpeaker: '1011',
        sText: "Kura. Cache. Keep your voice down. Good knowledge bruises if you drop it.",
      },
      {
        sSpeaker: '1011',
        sText: "I hold onto the stuff that was expensive to learn. Ask well, and I'll crack the vault open a little.",
      },
    ],
    arrChoices: [
      { sLabel: 'Got a secret that fits a transfer?', sNext: 'talk_1011_b' },
      { sLabel: 'When do you actually spend what you keep?', sNext: 'talk_1011_b' },
    ],
  },
  talk_1011_b: {
    sId: 'talk_1011_b',
    sPlace: 'library',
    sPortrait: '1011',
    arrLines: [
      {
        sSpeaker: '1011',
        sText: "Spend when the timing's right. Hoard when the principle says so. Wrong unlock is just expensive noise.",
      },
    ],
    arrChoices: [{ sLabel: 'Back to the hall', sNext: 'hub' }],
  },
  talk_1100: {
    sId: 'talk_1100',
    sPlace: 'lab',
    sPortrait: '1100',
    arrLines: [
      {
        sSpeaker: '1100',
        sText: "Saki — The Frame. Hold still. No — chin up a little. The story changes depending on the window.",
      },
      {
        sSpeaker: '1100',
        sText: "I paint compositions, not people. People are what happen inside a good border.",
      },
    ],
    arrChoices: [
      { sLabel: 'Reframe this day for me?', sNext: 'talk_1100_b' },
      { sLabel: 'Is the frame just a cage?', sNext: 'talk_1100_b' },
    ],
  },
  talk_1100_b: {
    sId: 'talk_1100_b',
    sPlace: 'lab',
    sPortrait: '1100',
    arrLines: [
      {
        sSpeaker: '1100',
        sText: "Only if you forget you can move it. Stiff frames crack. Living ones breathe.",
      },
    ],
    arrChoices: [{ sLabel: 'Back to the hall', sNext: 'hub' }],
  },
  talk_1101: {
    sId: 'talk_1101',
    sPlace: 'library',
    sPortrait: '1101',
    arrLines: [
      {
        sSpeaker: '1101',
        sText: "Toru. Shell. Don't take the quiet personally. The wall's holding something up.",
      },
      {
        sSpeaker: '1101',
        sText: "Armor's how the soft parts keep running. Some storms just don't get invited in.",
      },
    ],
    arrChoices: [
      { sLabel: "That's fine — I can wait outside.", sNext: 'talk_1101_b' },
      { sLabel: 'When does the armor become a problem?', sNext: 'talk_1101_b' },
    ],
  },
  talk_1101_b: {
    sId: 'talk_1101_b',
    sPlace: 'library',
    sPortrait: '1101',
    arrLines: [
      {
        sSpeaker: '1101',
        sText: "When nothing soft can get through — including help. I'm… practicing the unlock.",
      },
    ],
    arrChoices: [{ sLabel: 'Back to the hall', sNext: 'hub' }],
  },
  talk_1110: {
    sId: 'talk_1110',
    sPlace: 'classroom',
    sPortrait: '1110',
    arrLines: [
      {
        sSpeaker: '1110',
        sText: "Aria. Forum. Debate club. If your take can't survive a pushback, it wasn't noble — just loud.",
      },
      {
        sSpeaker: '1110',
        sText: "Come on. Grab a spot. Dignity's what you earn out in the open, not in your notes.",
      },
    ],
    arrChoices: [
      { sLabel: 'Alright — argue that transfers belong.', sNext: 'talk_1110_b' },
      { sLabel: 'What if the theory never does anything?', sNext: 'talk_1110_b' },
    ],
  },
  talk_1110_b: {
    sId: 'talk_1110_b',
    sPlace: 'classroom',
    sPortrait: '1110',
    arrLines: [
      {
        sSpeaker: '1110',
        sText: "Then the forum's just a greenhouse for pretty sentences. I'm not watering that.",
      },
    ],
    arrChoices: [{ sLabel: 'Back to the hall', sNext: 'hub' }],
  },
  talk_1111: {
    sId: 'talk_1111',
    sPlace: 'rooftop',
    sPortrait: '1111',
    arrLines: [
      {
        sSpeaker: '1111',
        sText: "Ken. The State. From up here the schedule looks like a machine, not a mood swing.",
      },
      {
        sSpeaker: '1111',
        sText: "Organization is care with a bigger radius. Politics is what happens when that care needs votes.",
      },
    ],
    arrChoices: [
      { sLabel: 'Does the machine actually serve people?', sNext: 'talk_1111_b' },
      { sLabel: 'Where do I fit in all this?', sNext: 'talk_1111_b' },
    ],
  },
  talk_1111_b: {
    sId: 'talk_1111_b',
    sPlace: 'rooftop',
    sPortrait: '1111',
    arrLines: [
      {
        sSpeaker: '1111',
        sText: "Wherever the system needs a new hand on the controls. Learn every sign — then pick which lever you pull.",
      },
    ],
    arrChoices: [{ sLabel: 'Back to the hall', sNext: 'hub' }],
  },
  'talk_-1': {
    sId: 'talk_-1',
    sPlace: 'gate',
    sPortrait: '-1',
    arrLines: [
      {
        sSpeaker: '-1',
        sText: "You weren't supposed to map this hallway. Or maybe it mapped you. Underflow always finds the curious ones.",
      },
      {
        sSpeaker: '-1',
        sText: "I'm what the register refuses — the bit under zero. Call me The Void, if names still mean anything.",
      },
      {
        sSpeaker: '-1',
        sText: "Listen once. A fight with fate is coming. Not a quiz. Not a casual reading. The chart tears, and someone has to stand in the gap.",
      },
    ],
    arrChoices: [
      { sLabel: 'What kind of fight?', sNext: 'talk_-1_b' },
      { sLabel: 'Why warn me and then leave?', sNext: 'talk_-1_b' },
    ],
  },
  'talk_-1_b': {
    sId: 'talk_-1_b',
    sPlace: 'gate',
    sPortrait: '-1',
    arrLines: [
      {
        sSpeaker: '-1',
        sText: "Fate is the spread that's already finished. Battle is refusing to let it stay that way. When the lights go wrong — remember you were told.",
      },
      {
        sSpeaker: null,
        sText: 'The figure thins out like bad static — then the threshold is empty. Just the warning left behind.',
      },
    ],
    arrChoices: [{ sLabel: 'Back to the hall', sNext: 'hub' }],
  },
  title_reset: {
    sId: 'title_reset',
    sPlace: 'gate',
    sPortrait: null,
    arrLines: [{ sSpeaker: null, sText: '…' }],
    sNext: 'title',
  },
}

type tHubSpot = {
  sPlace: string
  sLabel: string
  arrCharIds: string[]
}

const arrHubSpots: tHubSpot[] = [
  { sPlace: 'classroom', sLabel: 'Classroom', arrCharIds: ['100', '10', '1110'] },
  { sPlace: 'courtyard', sLabel: 'Courtyard', arrCharIds: ['0', '111'] },
  { sPlace: 'cafeteria', sLabel: 'Cafeteria', arrCharIds: ['11', '110', '1001'] },
  { sPlace: 'library', sLabel: 'Library', arrCharIds: ['1011', '1101'] },
  { sPlace: 'lab', sLabel: 'Lab', arrCharIds: ['101', '1010', '1100'] },
  { sPlace: 'rooftop', sLabel: 'Rooftop', arrCharIds: ['1000', '1111', '1'] },
]

const arrEveningHubSpots: tHubSpot[] = [
  { sPlace: 'classroom', sLabel: 'After-hours room', arrCharIds: ['100', '1', '110', '1000', '1101'] },
]

function arrChoicesFor(objCurrent: tScene): tChoice[] {
  const arrBase = objCurrent.arrChoices ? [...objCurrent.arrChoices] : []
  if (objCurrent.sId === 'talk_100' && setMet.has(sVoidId) && !bAwakened) {
    arrBase.push({
      sLabel: 'I saw something at the threshold…',
      sNext: 'talk_100_omen',
    })
  }
  return arrBase
}

function sTalkSceneId(sCharId: string): string {
  if (bIsEvening()) {
    const sEveningId = `talk_${sCharId}_evening`
    if (objScene(sEveningId)) {
      return sEveningId
    }
  }
  return `talk_${sCharId}`
}

function vGoScene(sId: string): void {
  if (sId === 'title_reset') {
    setMet = new Set()
    bAwakened = false
    sTimeOfDay = 'midday'
    vPersist()
    sSceneId = 'title'
    nLine = 0
    vRender()
    return
  }

  const objNext = objScene(sId)
  if (!objNext) {
    return
  }
  sSceneId = sId
  nLine = 0
  vRender()
}

function vAdvanceLine(): void {
  const objCurrent = objScene(sSceneId)
  if (!objCurrent || objCurrent.bHub || objCurrent.bTitle) {
    return
  }

  if (nLine < objCurrent.arrLines.length - 1) {
    nLine += 1
    vRenderLine()
    return
  }

  const arrChoices = arrChoicesFor(objCurrent)
  if (arrChoices.length > 0) {
    vRenderChoices(arrChoices)
    return
  }

  if (objCurrent.sNext) {
    vGoScene(objCurrent.sNext)
  }
}

function vRenderLine(): void {
  const objCurrent = objScene(sSceneId)
  if (!objCurrent || !objDialogue || !objNameBox || !objAdvance || !objChoices) {
    return
  }

  const objLine = objCurrent.arrLines[nLine]
  if (!objLine) {
    return
  }

  const sLabel = sSpeakerLabel(objLine.sSpeaker)
  objNameBox.hidden = !sLabel
  objNameBox.textContent = sLabel
  objDialogue.textContent = objLine.sText

  const bLast = nLine >= objCurrent.arrLines.length - 1
  const arrChoices = arrChoicesFor(objCurrent)
  const bHasChoices = arrChoices.length > 0
  const bShowAdvance = !bLast || (!bHasChoices && Boolean(objCurrent.sNext))
  objAdvance.hidden = !bShowAdvance || Boolean(objCurrent.bHub) || Boolean(objCurrent.bTitle)
  objChoices.hidden = true
  objChoices.innerHTML = ''

  if (bLast && bHasChoices) {
    objAdvance.hidden = true
    vRenderChoices(arrChoices)
  }
}

function vRenderChoices(arrChoices: tChoice[]): void {
  if (!objChoices || !objAdvance) {
    return
  }
  objAdvance.hidden = true
  objChoices.hidden = false
  objChoices.innerHTML = arrChoices
    .map(
      (objChoice, nIndex) => `
      <button type="button" class="school-choice" data-choice="${nIndex}">
        ${sEscapeHtml(objChoice.sLabel)}
      </button>
    `,
    )
    .join('')
}

function vRenderHub(): void {
  if (!objHub || !objChoices || !objAdvance || !objDialogue || !objNameBox) {
    return
  }

  objNameBox.hidden = true
  if (bIsEvening()) {
    objDialogue.textContent =
      'Evening club is in session. Awakened students trade plans for the fight — hold the chart, seal the tears, push back the lean.'
  } else if (bSchoolComplete()) {
    objDialogue.textContent =
      "You've met every sign — and whatever comes after. The hallway still branches if you want to keep wandering."
  } else if (bVoidPresent()) {
    objDialogue.textContent =
      "You've met every sign. Something that shouldn't be counted is waiting where the crest's shadow thins."
  } else if (setMet.has(sVoidId) && !bAwakened) {
    objDialogue.textContent =
      "The threshold is quiet again. Maybe Hana's still in the classroom — she hosts people who've seen strange things."
  } else {
    objDialogue.textContent = 'Where to? Each spot has a few of the sixteen hanging around.'
  }
  objAdvance.hidden = true
  objChoices.hidden = true
  objChoices.innerHTML = ''
  objHub.hidden = false

  const objVoid = mapCharById[sVoidId]
  const sVoidBlock =
    bVoidPresent() && objVoid && !bIsEvening()
      ? `
    <section class="school-hub-spot school-hub-spot-void" data-place="gate">
      <h3 class="school-hub-label">Threshold</h3>
      <div class="school-hub-people">
        <button type="button" class="school-person is-void" data-talk="${sVoidId}">
          <span class="school-person-bit">${sEscapeHtml(objVoid.sBinaryValue)}</span>
          <span class="school-person-name">${sEscapeHtml(objVoid.sName)}</span>
          <span class="school-person-title">${sEscapeHtml(objVoid.sTitle)}</span>
          <span class="school-person-meta">???</span>
        </button>
      </div>
    </section>
  `
      : ''

  const arrSpots = bIsEvening() ? arrEveningHubSpots : arrHubSpots

  objHub.innerHTML = `
    <div class="school-hub-grid">
      ${arrSpots
        .map((objSpot) => {
          const sPeople = objSpot.arrCharIds
            .map((sId) => {
              const objChar = mapCharById[sId]
              if (!objChar) {
                return ''
              }
              const bMet = setMet.has(sId)
              const bOmenPending = sId === '100' && setMet.has(sVoidId) && !bAwakened
              const sMeta = bIsEvening() ? 'club' : bOmenPending ? 'ask' : bMet ? 'met' : 'new'
              return `
                <button type="button" class="school-person${bMet ? ' is-met' : ''}${bOmenPending ? ' is-omen' : ''}" data-talk="${sId}">
                  <span class="school-person-bit">${sEscapeHtml(objChar.sBinaryValue)}</span>
                  <span class="school-person-name">${sEscapeHtml(objChar.sName)}</span>
                  <span class="school-person-title">${sEscapeHtml(objChar.sTitle)}</span>
                  <span class="school-person-meta">${sMeta}</span>
                </button>
              `
            })
            .join('')
          return `
            <section class="school-hub-spot" data-place="${objSpot.sPlace}">
              <h3 class="school-hub-label">${sEscapeHtml(objSpot.sLabel)}</h3>
              <div class="school-hub-people">${sPeople}</div>
            </section>
          `
        })
        .join('')}
      ${sVoidBlock}
    </div>
  `
}

function vRenderTimeBtn(): void {
  if (!objTimeBtn) {
    return
  }
  objTimeBtn.hidden = !bAwakened
  if (!bAwakened) {
    return
  }
  const sLabel = sTimeOfDay === 'evening' ? 'Evening' : 'Midday'
  objTimeBtn.textContent = `Time · ${sLabel}`
  objTimeBtn.setAttribute('aria-label', `Switch time of day. Currently ${sLabel}.`)
}

function vRenderProgress(): void {
  if (!objProgress) {
    return
  }
  objProgress.textContent = `Signs met · ${nSignsMet()}/${nSignCount()}`
}

function vRender(): void {
  const objCurrent = objScene(sSceneId)
  if (!objCurrent || !objRoot || !objStage || !objPortrait || !objHub) {
    return
  }

  objRoot.dataset.place = objCurrent.sPlace
  objRoot.dataset.time = bIsEvening() ? 'evening' : 'midday'
  objStage.classList.toggle('is-title', Boolean(objCurrent.bTitle))

  const sPortraitId = objCurrent.sPortrait
  if (sPortraitId && mapCharById[sPortraitId]) {
    objPortrait.hidden = false
    objPortrait.innerHTML = sPortraitMarkup(mapCharById[sPortraitId])
    objPortrait.dataset.char = sPortraitId
    objPortrait.classList.toggle('is-void', bIsVoidId(sPortraitId))
  } else {
    objPortrait.hidden = true
    objPortrait.innerHTML = ''
    objPortrait.classList.remove('is-void')
    delete objPortrait.dataset.char
  }

  objHub.hidden = true
  objHub.innerHTML = ''

  vRenderProgress()
  vRenderTimeBtn()

  if (objCurrent.bHub) {
    vRenderHub()
    return
  }

  if (objCurrent.bTitle && objCurrent.arrChoices) {
    if (objNameBox) {
      objNameBox.hidden = true
    }
    if (objDialogue) {
      objDialogue.textContent = objCurrent.arrLines[0]?.sText ?? ''
    }
    if (objAdvance) {
      objAdvance.hidden = true
    }
    vRenderChoices(objCurrent.arrChoices)
    return
  }

  vRenderLine()
}

function vOnRootClick(objEvent: Event): void {
  const objTarget = objEvent.target
  if (!(objTarget instanceof Element)) {
    return
  }

  const objDismissUnlock = objTarget.closest<HTMLElement>('[data-action="dismiss-unlock"]')
  if (objDismissUnlock) {
    vDismissUnlock()
    return
  }

  const objTimeToggle = objTarget.closest<HTMLElement>('[data-action="toggle-time"]')
  if (objTimeToggle) {
    if (!bAwakened) {
      return
    }
    vSetTimeOfDay(sTimeOfDay === 'evening' ? 'midday' : 'evening')
    vGoScene('hub')
    return
  }

  const objChoiceBtn = objTarget.closest<HTMLButtonElement>('.school-choice')
  if (objChoiceBtn) {
    const objCurrent = objScene(sSceneId)
    if (!objCurrent) {
      return
    }
    const arrChoices = arrChoicesFor(objCurrent)
    const nIndex = Number(objChoiceBtn.dataset.choice)
    const objChoice = arrChoices[nIndex]
    if (!objChoice) {
      return
    }
    if (objChoice.bAwaken) {
      vAwaken()
    }
    const sMeetId = sUnlockMeetId(objCurrent, objChoice)
    if (sMeetId && vMeet(sMeetId)) {
      vRenderProgress()
      vShowUnlock(sMeetId, objChoice.sNext)
      return
    }
    vGoScene(objChoice.sNext)
    return
  }

  const objTalkBtn = objTarget.closest<HTMLButtonElement>('[data-talk]')
  if (objTalkBtn?.dataset.talk) {
    vGoScene(sTalkSceneId(objTalkBtn.dataset.talk))
    return
  }

  const objAdv = objTarget.closest<HTMLElement>('[data-action="advance"]')
  if (objAdv) {
    vAdvanceLine()
    return
  }

  const objRestart = objTarget.closest<HTMLButtonElement>('[data-action="restart"]')
  if (objRestart) {
    if (objUnlock && !objUnlock.hidden) {
      objUnlock.hidden = true
      objUnlock.innerHTML = ''
      sPendingNext = null
    }
    vGoScene('title_reset')
  }
}

const nPetalCount = 18

function sPetalsMarkup(): string {
  const arrPetals: string[] = []
  for (let nI = 0; nI < nPetalCount; nI++) {
    const nLeft = ((nI * 37) % 100) + (nI % 5) * 0.4
    const nDelay = ((nI * 0.77) % 12).toFixed(2)
    const nDuration = (10 + (nI % 7) * 1.35).toFixed(2)
    const nSize = 10 + (nI % 5) * 3
    const nDrift = 18 + (nI % 6) * 10
    const nSpin = 160 + (nI % 4) * 90
    const nTone = nI % 3
    arrPetals.push(`
      <span
        class="school-petal school-petal-${nTone}"
        style="
          --petal-left: ${nLeft}%;
          --petal-delay: -${nDelay}s;
          --petal-duration: ${nDuration}s;
          --petal-size: ${nSize}px;
          --petal-drift: ${nDrift}px;
          --petal-spin: ${nSpin}deg;
        "
      ></span>
    `)
  }
  return `<div class="school-petals" id="school-petals" aria-hidden="true">${arrPetals.join('')}</div>`
}

function sCrestSpokesMarkup(): string {
  const nCx = 280
  const nCy = 78
  const arrSpokes: string[] = []
  for (let nI = 0; nI < 16; nI++) {
    const nAngle = (nI * Math.PI) / 8
    const nX1 = nCx + Math.cos(nAngle) * 14
    const nY1 = nCy + Math.sin(nAngle) * 14
    const nX2 = nCx + Math.cos(nAngle) * 34
    const nY2 = nCy + Math.sin(nAngle) * 34
    arrSpokes.push(
      `<line x1="${nX1.toFixed(1)}" y1="${nY1.toFixed(1)}" x2="${nX2.toFixed(1)}" y2="${nY2.toFixed(1)}" />`,
    )
  }
  return arrSpokes.join('')
}

function sWallBrickLines(nX0: number, nX1: number): string {
  const arrLines: string[] = [
    `<line x1="${nX0}" y1="148" x2="${nX1}" y2="148"/>`,
    `<line x1="${nX0}" y1="178" x2="${nX1}" y2="178"/>`,
    `<line x1="${nX0}" y1="208" x2="${nX1}" y2="208"/>`,
  ]
  for (let nX = nX0 + 36; nX < nX1; nX += 38) {
    arrLines.push(`<line x1="${nX}" y1="118" x2="${nX}" y2="148"/>`)
    arrLines.push(`<line x1="${nX}" y1="178" x2="${nX}" y2="208"/>`)
  }
  for (let nX = nX0 + 18; nX < nX1; nX += 38) {
    arrLines.push(`<line x1="${nX}" y1="148" x2="${nX}" y2="178"/>`)
  }
  return arrLines.join('')
}

function sGateSceneryMarkup(): string {
  return `
    <div class="school-scenery" id="school-scenery" aria-hidden="true">
      <svg class="school-wall-svg" viewBox="0 20 560 260" preserveAspectRatio="xMidYMax meet" focusable="false">
        <defs>
          <linearGradient id="school-wall-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#5a4a62"/>
            <stop offset="55%" stop-color="#3a2e44"/>
            <stop offset="100%" stop-color="#1a1420"/>
          </linearGradient>
          <linearGradient id="school-wall-cap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#8a7a6a"/>
            <stop offset="100%" stop-color="#5a4a3a"/>
          </linearGradient>
        </defs>
        <!-- left wall -->
        <rect x="0" y="118" width="228" height="120" fill="url(#school-wall-fill)"/>
        <rect x="0" y="110" width="228" height="12" fill="url(#school-wall-cap)"/>
        <g stroke="rgba(10,6,16,0.35)" stroke-width="1.2" fill="none">
          ${sWallBrickLines(0, 228)}
        </g>
        <!-- right wall -->
        <rect x="332" y="118" width="228" height="120" fill="url(#school-wall-fill)"/>
        <rect x="332" y="110" width="228" height="12" fill="url(#school-wall-cap)"/>
        <g stroke="rgba(10,6,16,0.35)" stroke-width="1.2" fill="none">
          ${sWallBrickLines(332, 560)}
        </g>
        <!-- pillars -->
        <rect x="216" y="72" width="22" height="166" fill="#4a3a52"/>
        <rect x="322" y="72" width="22" height="166" fill="#4a3a52"/>
        <rect x="212" y="66" width="30" height="12" fill="#7a6a58"/>
        <rect x="318" y="66" width="30" height="12" fill="#7a6a58"/>
        <rect x="220" y="78" width="14" height="150" fill="rgba(224,184,58,0.12)"/>
        <rect x="326" y="78" width="14" height="150" fill="rgba(224,184,58,0.12)"/>
        <!-- gate opening shadow -->
        <rect x="238" y="118" width="84" height="120" fill="rgba(5,3,8,0.45)"/>
        <!-- crest plaque -->
        <rect x="248" y="40" width="64" height="64" rx="4" fill="#2a2030" stroke="#e0b83a" stroke-width="2"/>
        <rect x="252" y="44" width="56" height="56" rx="2" fill="#120a1c" stroke="rgba(224,184,58,0.35)" stroke-width="1"/>
        <g class="school-crest" fill="none" stroke="#e0b83a" stroke-width="1.4" stroke-linecap="round">
          <circle cx="280" cy="78" r="22"/>
          <circle cx="280" cy="78" r="8"/>
          ${sCrestSpokesMarkup()}
          <circle cx="280" cy="78" r="2.5" fill="#ffe08a" stroke="none"/>
        </g>
        <text x="280" y="118" text-anchor="middle" fill="#e0b83a"
          font-family="IBM Plex Mono, monospace" font-size="7" letter-spacing="1.5">BINAROT</text>
      </svg>
    </div>
  `
}

export function sSchoolMarkup(): string {
  return `
    <div class="school" id="school" data-place="gate" data-time="midday">
      <div class="school-toolbar">
        <p class="school-progress" id="school-progress">Signs met · 0/16</p>
        <button type="button" class="school-time" data-action="toggle-time" id="school-time" hidden>
          Time · Midday
        </button>
        <button type="button" class="school-restart" data-action="restart">Restart</button>
      </div>
      <div class="school-stage" id="school-stage">
        <div class="school-bg" aria-hidden="true"></div>
        ${sGateSceneryMarkup()}
        ${sPetalsMarkup()}
        <div class="school-portrait" id="school-portrait" hidden></div>
        <div class="school-hub" id="school-hub" hidden></div>
        <div class="school-unlock" id="school-unlock" hidden></div>
        <div class="school-textbox" id="school-textbox">
          <p class="school-name" id="school-name" hidden></p>
          <p class="school-dialogue" id="school-dialogue"></p>
          <button type="button" class="school-advance" data-action="advance" id="school-advance" hidden>
            Continue
          </button>
          <div class="school-choices" id="school-choices" hidden></div>
        </div>
      </div>
      <p class="school-caption">school · visual novel </p>
    </div>
  `
}

export function vBindSchool(arrCards: tSchoolCard[]): void {
  arrSchoolCards = arrCards
  mapCharById = {}
  for (const objChar of arrCharacters) {
    const objCard = arrCards.find((objItem) => objItem.sBinaryValue === objChar.sBinaryValue)
    if (objCard) {
      objChar.sTitle = objCard.sName
    }
    mapCharById[objChar.sId] = objChar
  }

  const objSave = objLoadSave()
  setMet = new Set(objSave.setMet)
  bAwakened = objSave.bAwakened
  sTimeOfDay = objSave.sTimeOfDay
  sPendingNext = null

  objRoot = document.querySelector<HTMLElement>('#school')
  objStage = document.querySelector<HTMLElement>('#school-stage')
  objPortrait = document.querySelector<HTMLElement>('#school-portrait')
  objNameBox = document.querySelector<HTMLElement>('#school-name')
  objDialogue = document.querySelector<HTMLElement>('#school-dialogue')
  objAdvance = document.querySelector<HTMLElement>('#school-advance')
  objChoices = document.querySelector<HTMLElement>('#school-choices')
  objProgress = document.querySelector<HTMLElement>('#school-progress')
  objHub = document.querySelector<HTMLElement>('#school-hub')
  objUnlock = document.querySelector<HTMLElement>('#school-unlock')
  objTimeBtn = document.querySelector<HTMLButtonElement>('#school-time')

  if (!objRoot || !objStage || !objPortrait || !objDialogue || !objChoices || !objHub || !objUnlock) {
    return
  }

  objUnlock.hidden = true
  objUnlock.innerHTML = ''

  if (!bBound) {
    objRoot.addEventListener('click', vOnRootClick)
    bBound = true
  }

  sSceneId = 'title'
  nLine = 0
  vRender()
}

export function vSetSchoolActive(bActive: boolean): void {
  objStage?.classList.toggle('is-petals-paused', !bActive)
  if (bActive) {
    vRender()
    objAdvance?.focus()
  }
}
