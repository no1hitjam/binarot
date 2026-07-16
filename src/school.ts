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

const sStorageKey = 'binarot_school'

type tSchoolSave = {
  setMet: string[]
}

let mapCharById: Record<string, tCharacter> = {}
let setMet = new Set<string>()
let sSceneId = 'title'
let nLine = 0
let bBound = false

let objRoot: HTMLElement | null = null
let objStage: HTMLElement | null = null
let objPortrait: HTMLElement | null = null
let objNameBox: HTMLElement | null = null
let objDialogue: HTMLElement | null = null
let objAdvance: HTMLElement | null = null
let objChoices: HTMLElement | null = null
let objProgress: HTMLElement | null = null
let objHub: HTMLElement | null = null

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
      return { setMet: [] }
    }
    const objParsed = JSON.parse(sRaw) as Partial<tSchoolSave>
    const arrMet = Array.isArray(objParsed.setMet)
      ? objParsed.setMet.filter((sValue): sValue is string => typeof sValue === 'string')
      : []
    return { setMet: arrMet }
  } catch {
    return { setMet: [] }
  }
}

function vPersist(): void {
  const objSave: tSchoolSave = { setMet: Array.from(setMet) }
  localStorage.setItem(sStorageKey, JSON.stringify(objSave))
}

function vMeet(sId: string): void {
  if (!sId || setMet.has(sId)) {
    return
  }
  setMet.add(sId)
  vPersist()
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
        sText: 'Binarot Academy — where every bit finds a face, and every sign wears a uniform.',
      },
    ],
    arrChoices: [{ sLabel: 'Enter the school gates', sNext: 'arrive' }],
  },
  arrive: {
    sId: 'arrive',
    sPlace: 'gate',
    sPortrait: null,
    arrLines: [
      {
        sSpeaker: null,
        sText: 'Morning light catches the academy crest: a circle split into sixteen quiet claims.',
      },
      {
        sSpeaker: null,
        sText: 'Inside, students move like a living deck—each one a binarot sign walking on two legs.',
      },
      {
        sSpeaker: null,
        sText: 'Your transfer papers are already stamped. Homeroom is waiting.',
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
        sText: "Welcome in. I'm Hana—The Host. If you need a seat, a spare notebook, or somewhere to land, that's my job.",
      },
      {
        sSpeaker: '100',
        sText: "Don't mind the noise. Sixteen archetypes sharing one campus is… lively.",
      },
      {
        sSpeaker: '100',
        sText: 'Free period starts soon. Walk the grounds. Meet people. The signs remember who listens.',
      },
    ],
    arrChoices: [
      { sLabel: 'Thanks—I will look around.', sNext: 'hub', sMeet: '100' },
      { sLabel: 'What should I know first?', sNext: 'homeroom_tip', sMeet: '100' },
    ],
  },
  homeroom_tip: {
    sId: 'homeroom_tip',
    sPlace: 'classroom',
    sPortrait: '100',
    arrLines: [
      {
        sSpeaker: '100',
        sText: 'Rei runs council like a planted flag. Kura keeps the library vault. Jin skips class from the roof.',
      },
      {
        sSpeaker: '100',
        sText: 'Talk to everyone at least once. Binarot Academy is a reading—you are the other card.',
      },
    ],
    arrChoices: [{ sLabel: 'Head out for free period', sNext: 'hub' }],
  },
  hub: {
    sId: 'hub',
    sPlace: 'hall',
    sPortrait: null,
    bHub: true,
    arrLines: [
      {
        sSpeaker: null,
        sText: 'The hallway branches. Voices, chalk dust, and the soft click of locker bits.',
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
        sText: "Oh—hi. I'm Sora. People call me The Seed. I was just… not writing anything yet. On purpose.",
      },
      {
        sSpeaker: '0',
        sText: 'Blank pages feel honest. Once you ink the first line, half the futures vanish.',
      },
    ],
    arrChoices: [
      { sLabel: 'Potential suits you.', sNext: 'talk_0_b', sMeet: '0' },
      { sLabel: 'What will you start?', sNext: 'talk_0_b', sMeet: '0' },
    ],
  },
  talk_0_b: {
    sId: 'talk_0_b',
    sPlace: 'courtyard',
    sPortrait: '0',
    arrLines: [
      {
        sSpeaker: '0',
        sText: 'Maybe a club. Maybe a constellation. Ask me tomorrow—I might still be deciding which beginning is true.',
      },
    ],
    arrChoices: [{ sLabel: 'Return to the hall', sNext: 'hub' }],
  },
  talk_1: {
    sId: 'talk_1',
    sPlace: 'hall',
    sPortrait: '1',
    arrLines: [
      {
        sSpeaker: '1',
        sText: "Rei. Student council. The Flag, if you're collecting titles. State your business clearly.",
      },
      {
        sSpeaker: '1',
        sText: 'This school runs on claims. If nobody plants one, the courtyard becomes rumor.',
      },
    ],
    arrChoices: [
      { sLabel: 'I am here to learn the signs.', sNext: 'talk_1_b', sMeet: '1' },
      { sLabel: 'Do you ever stand down?', sNext: 'talk_1_b', sMeet: '1' },
    ],
  },
  talk_1_b: {
    sId: 'talk_1_b',
    sPlace: 'hall',
    sPortrait: '1',
    arrLines: [
      {
        sSpeaker: '1',
        sText: 'I stand where the line needs a name. Visit the others—then tell me what you will claim.',
      },
    ],
    arrChoices: [{ sLabel: 'Return to the hall', sNext: 'hub' }],
  },
  talk_10: {
    sId: 'talk_10',
    sPlace: 'classroom',
    sPortrait: '10',
    arrLines: [
      {
        sSpeaker: '10',
        sText: 'Yuki—The Call. Sorry, were you mid-sentence? Something always rings when I walk in.',
      },
      {
        sSpeaker: '10',
        sText: "Duty finds me in the hallway. Serendipity finds me in the vending machines. I'm basically a notification.",
      },
    ],
    arrChoices: [
      { sLabel: 'What is calling today?', sNext: 'talk_10_b', sMeet: '10' },
      { sLabel: 'Do you ever ignore it?', sNext: 'talk_10_b', sMeet: '10' },
    ],
  },
  talk_10_b: {
    sId: 'talk_10_b',
    sPlace: 'classroom',
    sPortrait: '10',
    arrLines: [
      {
        sSpeaker: '10',
        sText: "Ignoring it only makes the next ring louder. You'll hear yours soon. Transfer students always do.",
      },
    ],
    arrChoices: [{ sLabel: 'Return to the hall', sNext: 'hub' }],
  },
  talk_11: {
    sId: 'talk_11',
    sPlace: 'cafeteria',
    sPortrait: '11',
    arrLines: [
      {
        sSpeaker: '11',
        sText: "Ren—The Link. Sit anywhere; I'll introduce you to three people before your tray hits the table.",
      },
      {
        sSpeaker: '11',
        sText: 'Promises are bandwidth. Keep them clean and the whole campus syncs.',
      },
    ],
    arrChoices: [
      { sLabel: 'Introduce me to someone.', sNext: 'talk_11_b', sMeet: '11' },
      { sLabel: 'How do you not overload?', sNext: 'talk_11_b', sMeet: '11' },
    ],
  },
  talk_11_b: {
    sId: 'talk_11_b',
    sPlace: 'cafeteria',
    sPortrait: '11',
    arrLines: [
      {
        sSpeaker: '11',
        sText: 'I overload constantly. Depth is the homework I keep postponing. Still—want a handshake?',
      },
    ],
    arrChoices: [{ sLabel: 'Return to the hall', sNext: 'hub' }],
  },
  talk_100: {
    sId: 'talk_100',
    sPlace: 'classroom',
    sPortrait: '100',
    arrLines: [
      {
        sSpeaker: '100',
        sText: 'Back already? Good. The door stays unlocked for the right people—and you look like one.',
      },
      {
        sSpeaker: '100',
        sText: 'Shelter is a skill. So is knowing when the room is full.',
      },
    ],
    arrChoices: [
      { sLabel: 'Your room feels safe.', sNext: 'talk_100_b', sMeet: '100' },
      { sLabel: 'Who do you host for?', sNext: 'talk_100_b', sMeet: '100' },
    ],
  },
  talk_100_b: {
    sId: 'talk_100_b',
    sPlace: 'classroom',
    sPortrait: '100',
    arrLines: [
      {
        sSpeaker: '100',
        sText: 'For anyone still deciding whether they belong. That includes me, some days.',
      },
    ],
    arrChoices: [{ sLabel: 'Return to the hall', sNext: 'hub' }],
  },
  talk_101: {
    sId: 'talk_101',
    sPlace: 'courtyard',
    sPortrait: '101',
    arrLines: [
      {
        sSpeaker: '101',
        sText: "Kai. Fork. Don't ask my major—both answers are vibrating at once.",
      },
      {
        sSpeaker: '101',
        sText: 'Hunger is a compass. Resonance is the click when a path tastes right.',
      },
    ],
    arrChoices: [
      { sLabel: 'Pick one path with me.', sNext: 'talk_101_b', sMeet: '101' },
      { sLabel: 'Is indecision honest?', sNext: 'talk_101_b', sMeet: '101' },
    ],
  },
  talk_101_b: {
    sId: 'talk_101_b',
    sPlace: 'courtyard',
    sPortrait: '101',
    arrLines: [
      {
        sSpeaker: '101',
        sText: 'Indecision is weather. Commitment is climate. I am still packing for both.',
      },
    ],
    arrChoices: [{ sLabel: 'Return to the hall', sNext: 'hub' }],
  },
  talk_110: {
    sId: 'talk_110',
    sPlace: 'cafeteria',
    sPortrait: '110',
    arrLines: [
      {
        sSpeaker: '110',
        sText: "Mina—The Port. Transfer, gateway, customs for weird ideas. I decide what gets through.",
      },
      {
        sSpeaker: '110',
        sText: 'Trade me a story from outside and I will trade you a campus rumor that is almost true.',
      },
    ],
    arrChoices: [
      { sLabel: 'Deal.', sNext: 'talk_110_b', sMeet: '110' },
      { sLabel: 'What do you keep out?', sNext: 'talk_110_b', sMeet: '110' },
    ],
  },
  talk_110_b: {
    sId: 'talk_110_b',
    sPlace: 'cafeteria',
    sPortrait: '110',
    arrLines: [
      {
        sSpeaker: '110',
        sText: 'I keep out anything that pretends it never changed at the threshold. Everything here is altered cargo.',
      },
    ],
    arrChoices: [{ sLabel: 'Return to the hall', sNext: 'hub' }],
  },
  talk_111: {
    sId: 'talk_111',
    sPlace: 'courtyard',
    sPortrait: '111',
    arrLines: [
      {
        sSpeaker: '111',
        sText: 'Aoi. The Tree. Upperclass. I water the courtyard plot and occasionally people.',
      },
      {
        sSpeaker: '111',
        sText: 'Growth without roots is theater. Roots without reach is a stump with opinions.',
      },
    ],
    arrChoices: [
      { sLabel: 'Your shade feels earned.', sNext: 'talk_111_b', sMeet: '111' },
      { sLabel: 'How far do your branches go?', sNext: 'talk_111_b', sMeet: '111' },
    ],
  },
  talk_111_b: {
    sId: 'talk_111_b',
    sPlace: 'courtyard',
    sPortrait: '111',
    arrLines: [
      {
        sSpeaker: '111',
        sText: 'Far enough to shelter first-years. Not so far I forget the quiet work underground.',
      },
    ],
    arrChoices: [{ sLabel: 'Return to the hall', sNext: 'hub' }],
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
        sText: 'Will and action arrive together. Waiting for the bell is a hobby for other people.',
      },
    ],
    arrChoices: [
      { sLabel: 'Teach me to move first.', sNext: 'talk_1000_b', sMeet: '1000' },
      { sLabel: 'Lonely up here?', sNext: 'talk_1000_b', sMeet: '1000' },
    ],
  },
  talk_1000_b: {
    sId: 'talk_1000_b',
    sPlace: 'rooftop',
    sPortrait: '1000',
    arrLines: [
      {
        sSpeaker: '1000',
        sText: 'Lonely is a weather report. Useful is a forecast. I prefer useful.',
      },
    ],
    arrChoices: [{ sLabel: 'Return to the hall', sNext: 'hub' }],
  },
  talk_1001: {
    sId: 'talk_1001',
    sPlace: 'cafeteria',
    sPortrait: '1001',
    arrLines: [
      {
        sSpeaker: '1001',
        sText: 'Nori—The Table. This seat is reserved for plots, meals, and alignments. Pull up a chair.',
      },
      {
        sSpeaker: '1001',
        sText: 'What is said here rearranges the room. Choose your words like courses.',
      },
    ],
    arrChoices: [
      { sLabel: 'What are we conspiring?', sNext: 'talk_1001_b', sMeet: '1001' },
      { sLabel: 'Is the menu the agenda?', sNext: 'talk_1001_b', sMeet: '1001' },
    ],
  },
  talk_1001_b: {
    sId: 'talk_1001_b',
    sPlace: 'cafeteria',
    sPortrait: '1001',
    arrLines: [
      {
        sSpeaker: '1001',
        sText: 'Today: introduce the transfer to every sign before sunset. Ambitious. Delicious.',
      },
    ],
    arrChoices: [{ sLabel: 'Return to the hall', sNext: 'hub' }],
  },
  talk_1010: {
    sId: 'talk_1010',
    sPlace: 'library',
    sPortrait: '1010',
    arrLines: [
      {
        sSpeaker: '1010',
        sText: "Rina. Clone. Don't worry—there's only one of me today. Equality is the point, not copies for their own sake.",
      },
      {
        sSpeaker: '1010',
        sText: 'I mirror until people see themselves. Then I step aside before sameness erases the spark.',
      },
    ],
    arrChoices: [
      { sLabel: 'What do you see in me?', sNext: 'talk_1010_b', sMeet: '1010' },
      { sLabel: 'How do you stay yourself?', sNext: 'talk_1010_b', sMeet: '1010' },
    ],
  },
  talk_1010_b: {
    sId: 'talk_1010_b',
    sPlace: 'library',
    sPortrait: '1010',
    arrLines: [
      {
        sSpeaker: '1010',
        sText: 'I see someone collecting faces. Careful—collections can become mirrors too.',
      },
    ],
    arrChoices: [{ sLabel: 'Return to the hall', sNext: 'hub' }],
  },
  talk_1011: {
    sId: 'talk_1011',
    sPlace: 'library',
    sPortrait: '1011',
    arrLines: [
      {
        sSpeaker: '1011',
        sText: 'Kura. Cache. Speak softly. Knowledge bruises if you drop it.',
      },
      {
        sSpeaker: '1011',
        sText: 'I keep what was costly to learn. Ask well, and the vault opens a crack.',
      },
    ],
    arrChoices: [
      { sLabel: 'What secret fits a transfer?', sNext: 'talk_1011_b', sMeet: '1011' },
      { sLabel: 'When do you spend what you keep?', sNext: 'talk_1011_b', sMeet: '1011' },
    ],
  },
  talk_1011_b: {
    sId: 'talk_1011_b',
    sPlace: 'library',
    sPortrait: '1011',
    arrLines: [
      {
        sSpeaker: '1011',
        sText: 'Spend on timing. Hoard on principle. The wrong unlock is just expensive noise.',
      },
    ],
    arrChoices: [{ sLabel: 'Return to the hall', sNext: 'hub' }],
  },
  talk_1100: {
    sId: 'talk_1100',
    sPlace: 'classroom',
    sPortrait: '1100',
    arrLines: [
      {
        sSpeaker: '1100',
        sText: 'Saki—The Frame. Hold still. No—tilt your chin. The story changes with the window.',
      },
      {
        sSpeaker: '1100',
        sText: 'I paint compositions, not people. People are what happens inside a good border.',
      },
    ],
    arrChoices: [
      { sLabel: 'Reframe this day for me.', sNext: 'talk_1100_b', sMeet: '1100' },
      { sLabel: 'Is the frame a cage?', sNext: 'talk_1100_b', sMeet: '1100' },
    ],
  },
  talk_1100_b: {
    sId: 'talk_1100_b',
    sPlace: 'classroom',
    sPortrait: '1100',
    arrLines: [
      {
        sSpeaker: '1100',
        sText: 'Only if you forget you can move it. Rigid models crack; living ones breathe.',
      },
    ],
    arrChoices: [{ sLabel: 'Return to the hall', sNext: 'hub' }],
  },
  talk_1101: {
    sId: 'talk_1101',
    sPlace: 'library',
    sPortrait: '1101',
    arrLines: [
      {
        sSpeaker: '1101',
        sText: "Toru. Shell. Don't take the silence personally. The perimeter is load-bearing.",
      },
      {
        sSpeaker: '1101',
        sText: 'Armor lets the kernel keep running. Some storms are not invited in.',
      },
    ],
    arrChoices: [
      { sLabel: 'I can wait outside the wall.', sNext: 'talk_1101_b', sMeet: '1101' },
      { sLabel: 'When does armor become a problem?', sNext: 'talk_1101_b', sMeet: '1101' },
    ],
  },
  talk_1101_b: {
    sId: 'talk_1101_b',
    sPlace: 'library',
    sPortrait: '1101',
    arrLines: [
      {
        sSpeaker: '1101',
        sText: 'When nothing soft can reach you—including help. I am… practicing the unlock.',
      },
    ],
    arrChoices: [{ sLabel: 'Return to the hall', sNext: 'hub' }],
  },
  talk_1110: {
    sId: 'talk_1110',
    sPlace: 'classroom',
    sPortrait: '1110',
    arrLines: [
      {
        sSpeaker: '1110',
        sText: 'Aria. Forum. Debate club. If your claim cannot survive a counterpoint, it was never noble—only loud.',
      },
      {
        sSpeaker: '1110',
        sText: 'Pull up a podium. Dignity is earned in the open square.',
      },
    ],
    arrChoices: [
      { sLabel: 'Argue that transfers belong.', sNext: 'talk_1110_b', sMeet: '1110' },
      { sLabel: 'What if theory never acts?', sNext: 'talk_1110_b', sMeet: '1110' },
    ],
  },
  talk_1110_b: {
    sId: 'talk_1110_b',
    sPlace: 'classroom',
    sPortrait: '1110',
    arrLines: [
      {
        sSpeaker: '1110',
        sText: 'Then the forum becomes a greenhouse for pretty sentences. I will not water that.',
      },
    ],
    arrChoices: [{ sLabel: 'Return to the hall', sNext: 'hub' }],
  },
  talk_1111: {
    sId: 'talk_1111',
    sPlace: 'rooftop',
    sPortrait: '1111',
    arrLines: [
      {
        sSpeaker: '1111',
        sText: 'Ken. The State. From up here you can see the schedule as a machine, not a mood.',
      },
      {
        sSpeaker: '1111',
        sText: 'Organization is care at scale. Politics is what happens when care needs votes.',
      },
    ],
    arrChoices: [
      { sLabel: 'Does the machine serve people?', sNext: 'talk_1111_b', sMeet: '1111' },
      { sLabel: 'Where do I fit in the system?', sNext: 'talk_1111_b', sMeet: '1111' },
    ],
  },
  talk_1111_b: {
    sId: 'talk_1111_b',
    sPlace: 'rooftop',
    sPortrait: '1111',
    arrLines: [
      {
        sSpeaker: '1111',
        sText: 'You fit where the bits need a new operator. Learn every sign—then decide which lever you pull.',
      },
    ],
    arrChoices: [{ sLabel: 'Return to the hall', sNext: 'hub' }],
  },
  'talk_-1': {
    sId: 'talk_-1',
    sPlace: 'gate',
    sPortrait: '-1',
    arrLines: [
      {
        sSpeaker: '-1',
        sText: 'You were not meant to map this hallway. Or the hallway mapped you—underflow always finds the curious.',
      },
      {
        sSpeaker: '-1',
        sText: 'I am what the register refuses: the bit beneath zero. Call me The Void, if names still compile.',
      },
      {
        sSpeaker: '-1',
        sText: 'Listen once. A battle with fate is coming—not a quiz, not a casual reading. The chart will tear, and you will be asked to stand in the tear.',
      },
    ],
    arrChoices: [
      { sLabel: 'What kind of battle?', sNext: 'talk_-1_b', sMeet: '-1' },
      { sLabel: 'Why warn me and vanish?', sNext: 'talk_-1_b', sMeet: '-1' },
    ],
  },
  'talk_-1_b': {
    sId: 'talk_-1_b',
    sPlace: 'gate',
    sPortrait: null,
    arrLines: [
      {
        sSpeaker: '-1',
        sText: 'Fate is the finished spread. Battle is the refusal to let it stay finished. When the lights go wrong, remember you were told.',
      },
      {
        sSpeaker: null,
        sText: 'The figure thins like static losing its carrier wave—then the threshold is empty. Only the warning remains.',
      },
    ],
    arrChoices: [{ sLabel: 'Return to the hall', sNext: 'hub' }],
  },
  ending: {
    sId: 'ending',
    sPlace: 'gate',
    sPortrait: null,
    arrLines: [
      {
        sSpeaker: null,
        sText: 'Sunset catches the crest again. Sixteen conversations settle into something like a reading.',
      },
      {
        sSpeaker: null,
        sText: 'Binarot Academy does not graduate you. It hands you a deck with faces you can name.',
      },
      {
        sSpeaker: null,
        sText: 'Whenever you return, the hallway will still branch—and the signs will still answer.',
      },
    ],
    arrChoices: [
      { sLabel: 'Walk the grounds again', sNext: 'hub' },
      { sLabel: 'Begin from the gates', sNext: 'title_reset' },
    ],
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
  { sPlace: 'classroom', sLabel: 'Classroom', arrCharIds: ['100', '10', '1100', '1110'] },
  { sPlace: 'courtyard', sLabel: 'Courtyard', arrCharIds: ['0', '101', '111'] },
  { sPlace: 'cafeteria', sLabel: 'Cafeteria', arrCharIds: ['11', '110', '1001'] },
  { sPlace: 'library', sLabel: 'Library', arrCharIds: ['1011', '1010', '1101'] },
  { sPlace: 'rooftop', sLabel: 'Rooftop', arrCharIds: ['1000', '1111', '1'] },
]

function vGoScene(sId: string): void {
  if (sId === 'title_reset') {
    setMet = new Set()
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

  if (objCurrent.arrChoices && objCurrent.arrChoices.length > 0) {
    vRenderChoices(objCurrent.arrChoices)
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
  const bHasChoices = Boolean(objCurrent.arrChoices && objCurrent.arrChoices.length > 0)
  const bShowAdvance = !bLast || (!bHasChoices && Boolean(objCurrent.sNext))
  objAdvance.hidden = !bShowAdvance || Boolean(objCurrent.bHub) || Boolean(objCurrent.bTitle)
  objChoices.hidden = true
  objChoices.innerHTML = ''

  if (bLast && bHasChoices && objCurrent.arrChoices) {
    objAdvance.hidden = true
    vRenderChoices(objCurrent.arrChoices)
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
  if (bSchoolComplete()) {
    objDialogue.textContent =
      'You have met every sign—and the silence that follows. The gates glow like a finished spread—or keep wandering.'
  } else if (bVoidPresent()) {
    objDialogue.textContent =
      "You have met every sign. Something uncounted waits where the crest's shadow thins—then, perhaps, the ending."
  } else {
    objDialogue.textContent = 'Where do you go? Each place holds a few of the sixteen.'
  }
  objAdvance.hidden = true
  objChoices.hidden = true
  objChoices.innerHTML = ''
  objHub.hidden = false

  const sEndingBtn = bSchoolComplete()
    ? `<button type="button" class="school-choice school-choice-ending" data-ending="1">Watch the sunset ending</button>`
    : ''

  const objVoid = mapCharById[sVoidId]
  const sVoidBlock =
    bVoidPresent() && objVoid
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

  objHub.innerHTML = `
    <div class="school-hub-grid">
      ${arrHubSpots
        .map((objSpot) => {
          const sPeople = objSpot.arrCharIds
            .map((sId) => {
              const objChar = mapCharById[sId]
              if (!objChar) {
                return ''
              }
              const bMet = setMet.has(sId)
              return `
                <button type="button" class="school-person${bMet ? ' is-met' : ''}" data-talk="${sId}">
                  <span class="school-person-bit">${sEscapeHtml(objChar.sBinaryValue)}</span>
                  <span class="school-person-name">${sEscapeHtml(objChar.sName)}</span>
                  <span class="school-person-title">${sEscapeHtml(objChar.sTitle)}</span>
                  <span class="school-person-meta">${bMet ? 'met' : 'new'}</span>
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
    ${sEndingBtn}
  `
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

  const objChoiceBtn = objTarget.closest<HTMLButtonElement>('.school-choice')
  if (objChoiceBtn) {
    if (objChoiceBtn.dataset.ending === '1') {
      vGoScene('ending')
      return
    }
    const objCurrent = objScene(sSceneId)
    if (!objCurrent?.arrChoices) {
      return
    }
    const nIndex = Number(objChoiceBtn.dataset.choice)
    const objChoice = objCurrent.arrChoices[nIndex]
    if (!objChoice) {
      return
    }
    if (objChoice.sMeet) {
      vMeet(objChoice.sMeet)
    }
    vGoScene(objChoice.sNext)
    return
  }

  const objTalkBtn = objTarget.closest<HTMLButtonElement>('[data-talk]')
  if (objTalkBtn?.dataset.talk) {
    vGoScene(`talk_${objTalkBtn.dataset.talk}`)
    return
  }

  const objAdv = objTarget.closest<HTMLElement>('[data-action="advance"]')
  if (objAdv) {
    vAdvanceLine()
    return
  }

  const objRestart = objTarget.closest<HTMLButtonElement>('[data-action="restart"]')
  if (objRestart) {
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
    <div class="school" id="school" data-place="gate">
      <div class="school-toolbar">
        <p class="school-progress" id="school-progress">Signs met · 0/16</p>
        <button type="button" class="school-restart" data-action="restart">Restart</button>
      </div>
      <div class="school-stage" id="school-stage">
        <div class="school-bg" aria-hidden="true"></div>
        ${sGateSceneryMarkup()}
        ${sPetalsMarkup()}
        <div class="school-portrait" id="school-portrait" hidden></div>
        <div class="school-hub" id="school-hub" hidden></div>
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

  objRoot = document.querySelector<HTMLElement>('#school')
  objStage = document.querySelector<HTMLElement>('#school-stage')
  objPortrait = document.querySelector<HTMLElement>('#school-portrait')
  objNameBox = document.querySelector<HTMLElement>('#school-name')
  objDialogue = document.querySelector<HTMLElement>('#school-dialogue')
  objAdvance = document.querySelector<HTMLElement>('#school-advance')
  objChoices = document.querySelector<HTMLElement>('#school-choices')
  objProgress = document.querySelector<HTMLElement>('#school-progress')
  objHub = document.querySelector<HTMLElement>('#school-hub')

  if (!objRoot || !objStage || !objPortrait || !objDialogue || !objChoices || !objHub) {
    return
  }

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
