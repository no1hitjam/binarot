type tHouseCard = {
  sName: string
  sBinaryValue: string
}

type tExitDir = 'north' | 'south' | 'east' | 'west' | 'up' | 'down'

type tThing = {
  sId: string
  sName: string
  sDetail: string
  sDetailEmpty?: string
  sCardId?: string
  sSetFlag?: string
}

type tSecretExit = {
  sRoomId: string
  sFlag: string
}

type tRoom = {
  sId: string
  sName: string
  sDescription: string
  mapExits: Partial<Record<tExitDir, string>>
  mapSecretExits?: Partial<Record<tExitDir, tSecretExit>>
  arrThings: tThing[]
}

type tHouseState = {
  sRoomId: string
  setInventory: Set<string>
  setFound: Set<string>
  setFlags: Set<string>
}

const nCardGoal = 16
const arrExitOrder: tExitDir[] = ['north', 'east', 'south', 'west', 'up', 'down']

const mapRooms: Record<string, tRoom> = {
  foyer: {
    sId: 'foyer',
    sName: 'Foyer',
    sDescription:
      'A dim foyer. Dust hangs in the air. A hallway runs north; a coat closet waits to the west. Somewhere in this house, sixteen binarot cards are hidden.',
    mapExits: { north: 'hallway', west: 'closet' },
    arrThings: [
      {
        sId: 'doormat',
        sName: 'Doormat',
        sDetail:
          'A frayed doormat, letters half-worn away. Someone wiped their feet here for years. Nothing under it but colder floorboards.',
      },
      {
        sId: 'console',
        sName: 'Console table',
        sDetail:
          'A narrow console table against the wall. A dish of keys sits empty. In the dust outline where a frame once stood, tucked flat against the wood, lies a binarot card—The Frame, marked 1100.',
        sDetailEmpty:
          'The console is bare again. Only the pale dust outline remains where the card—and the missing frame—once were.',
        sCardId: '1100',
      },
      {
        sId: 'mirror',
        sName: 'Mirror',
        sDetail:
          'A tall mirror with a darkened silvering. Your reflection looks slightly delayed. Between the glass and the backing, a thin edge shows—you slide free a binarot card: The Clone, marked 1010.',
        sDetailEmpty:
          'The mirror still lags a half-beat behind you. The gap behind the glass is empty now.',
        sCardId: '1010',
      },
    ],
  },
  hallway: {
    sId: 'hallway',
    sName: 'Hallway',
    sDescription:
      'A narrow hallway with scuffed floorboards. Doors open east and west. The foyer is south; stairs climb upward.',
    mapExits: { south: 'foyer', east: 'parlor', west: 'kitchen', up: 'landing' },
    arrThings: [
      {
        sId: 'floorboards',
        sName: 'Floorboards',
        sDetail:
          'The boards creak in a pattern that almost sounds like counting. One plank near the stairs is slightly proud of the rest. You pry it up. In the hollow beneath, face-up in the dust, lies a binarot card—The Seed, marked 0.',
        sDetailEmpty:
          'The proud plank lifts easily now. The hollow beneath is empty; only a pale rectangle of cleaner wood shows where something rested.',
        sCardId: '0',
      },
      {
        sId: 'runner',
        sName: 'Runner rug',
        sDetail:
          'A thin runner rug, faded to the color of old tea. The weave hides nothing but lint and a single bent pin.',
      },
      {
        sId: 'stairs',
        sName: 'Stairs',
        sDetail:
          'Wooden stairs rising into quieter dark. A handrail is polished smooth where countless hands have climbed.',
      },
    ],
  },
  closet: {
    sId: 'closet',
    sName: 'Coat Closet',
    sDescription: 'A cramped coat closet. Empty hangers tick against each other. The foyer is east.',
    mapExits: { east: 'foyer' },
    arrThings: [
      {
        sId: 'hangers',
        sName: 'Hangers',
        sDetail:
          'Wire hangers and a few wooden ones. They click softly when the door moves. No coats remain.',
      },
      {
        sId: 'shelf',
        sName: 'Top shelf',
        sDetail:
          'A high shelf holds a crushed hat box and a length of twine. Inside the tissue paper, pressed flat, is a binarot card—The Shell, marked 1101.',
        sDetailEmpty:
          'The hat box holds only crumpled tissue now. The shelf smells faintly of cedar and dust.',
        sCardId: '1101',
      },
    ],
  },
  parlor: {
    sId: 'parlor',
    sName: 'Parlor',
    sDescription:
      'A quiet parlor. Curtains mute the light. A reading chair faces a cold hearth. The hallway is west.',
    mapExits: { west: 'hallway' },
    mapSecretExits: {
      north: { sRoomId: 'secret_room', sFlag: 'hearth_passage' },
    },
    arrThings: [
      {
        sId: 'chair',
        sName: 'Reading chair',
        sDetail:
          'A deep chair with worn arms. The cushion still holds the ghost of a seated shape. No book left behind.',
      },
      {
        sId: 'hearth',
        sName: 'Hearth',
        sDetail:
          'Cold ash in the grate. A poker leans unused. Behind the andiron, your fingers find a seam in the brick. The panel swings inward—a dark passage opens into a hidden room.',
        sDetailEmpty:
          'The hearth passage stands open. Cold air breathes from the dark beyond the brick.',
        sSetFlag: 'hearth_passage',
      },
      {
        sId: 'curtains',
        sName: 'Curtains',
        sDetail:
          'Heavy curtains drink the daylight. Drawing them aside shows a sealed window and a thin film of dust.',
      },
    ],
  },
  kitchen: {
    sId: 'kitchen',
    sName: 'Kitchen',
    sDescription:
      'An old kitchen. Cupboards stand half-open. A pantry door sits to the north; the hallway is east.',
    mapExits: { east: 'hallway', north: 'pantry' },
    arrThings: [
      {
        sId: 'cupboards',
        sName: 'Cupboards',
        sDetail:
          'Cupboards full of mismatched plates and a single cracked teacup. Something was cleared out in a hurry.',
      },
      {
        sId: 'table',
        sName: 'Kitchen table',
        sDetail:
          'A scarred wooden table. Knife marks score its surface in idle patterns—crosses, hashes, little gates. Wedged in a split at the far edge is a binarot card: The Table, marked 1001.',
        sDetailEmpty:
          'The knife marks remain. The split in the wood is empty; whoever sat here last took their council elsewhere.',
        sCardId: '1001',
      },
      {
        sId: 'sink',
        sName: 'Sink',
        sDetail:
          'A porcelain sink with a rusted faucet. A drip lands every few seconds, keeping time with nothing.',
      },
    ],
  },
  pantry: {
    sId: 'pantry',
    sName: 'Pantry',
    sDescription: 'Shelves of jars and forgotten tins. The kitchen is south.',
    mapExits: { south: 'kitchen' },
    arrThings: [
      {
        sId: 'jars',
        sName: 'Jars',
        sDetail:
          'Labeled jars: flour, sugar, something that might once have been jam. Dates on the lids belong to another decade.',
      },
      {
        sId: 'tins',
        sName: 'Tins',
        sDetail:
          'Dent-sided tins stacked three high. One rattles when shaken, but opens on dust and a dried bay leaf.',
      },
    ],
  },
  landing: {
    sId: 'landing',
    sName: 'Upstairs Landing',
    sDescription:
      'The upstairs landing. Two bedrooms flank the hall—east and west. Stairs lead back down.',
    mapExits: { down: 'hallway', east: 'bedroom_east', west: 'bedroom_west' },
    arrThings: [
      {
        sId: 'railing',
        sName: 'Railing',
        sDetail:
          'The landing railing overlooks the stairwell. From here the foyer looks smaller, like a remembered room.',
      },
      {
        sId: 'light',
        sName: 'Hall light',
        sDetail:
          'A bare bulb in a frosted shade. It hums faintly even when you are sure it is off.',
      },
    ],
  },
  bedroom_east: {
    sId: 'bedroom_east',
    sName: 'East Bedroom',
    sDescription: 'A spare bedroom. The mattress is stripped. The landing is west.',
    mapExits: { west: 'landing' },
    arrThings: [
      {
        sId: 'mattress',
        sName: 'Mattress',
        sDetail:
          'A stripped mattress on a plain frame. The ticking is stained in one corner. Nothing tucked beneath.',
      },
      {
        sId: 'wardrobe',
        sName: 'Wardrobe',
        sDetail:
          'An empty wardrobe. The door sticks, then opens on cedar smell and a single wire hanger.',
      },
    ],
  },
  bedroom_west: {
    sId: 'bedroom_west',
    sName: 'West Bedroom',
    sDescription: 'A bedroom with a shuttered window. A writing desk sits against the wall. The landing is east.',
    mapExits: { east: 'landing' },
    arrThings: [
      {
        sId: 'desk',
        sName: 'Writing desk',
        sDetail:
          'A writing desk with a shallow drawer. Inside: blotter paper, a dried pen, and a faint ink stain shaped like a bit.',
      },
      {
        sId: 'shutters',
        sName: 'Shutters',
        sDetail:
          'Wooden shutters latched from the inside. Through a crack, evening light cuts a thin gold line across the floor.',
      },
      {
        sId: 'bed',
        sName: 'Bed',
        sDetail:
          'A made bed, surprisingly neat. The pillow is cold. Whoever left intended to return.',
      },
    ],
  },
  secret_room: {
    sId: 'secret_room',
    sName: 'Hidden Chamber',
    sDescription:
      'A narrow chamber behind the parlor hearth. Brick dust coats the floor. The air is still and older than the rest of the house.',
    mapExits: { south: 'parlor' },
    arrThings: [
      {
        sId: 'niche',
        sName: 'Wall niche',
        sDetail:
          'A shallow niche is cut into the brick. Nestled in the dust, as if placed for safekeeping, lies a binarot card—The Cache, marked 1011.',
        sDetailEmpty:
          'The niche is empty. Only a cleaner patch of brick shows where something costly was kept.',
        sCardId: '1011',
      },
      {
        sId: 'brickwork',
        sName: 'Brickwork',
        sDetail:
          'The bricks are older than the parlor facade. Someone sealed this room on purpose and then forgot the seal.',
      },
    ],
  },
}

let arrDeck: tHouseCard[] = []
let mapCardById: Record<string, tHouseCard> = {}
let objState: tHouseState = objFreshState()
let objLog: HTMLElement | null = null
let objStatus: HTMLElement | null = null
let objControls: HTMLElement | null = null
let objExits: HTMLElement | null = null
let objThings: HTMLElement | null = null
let objChecklist: HTMLElement | null = null
let bBound = false

function objFreshState(): tHouseState {
  return {
    sRoomId: 'foyer',
    setInventory: new Set(),
    setFound: new Set(),
    setFlags: new Set(),
  }
}

function objRoom(sRoomId: string): tRoom {
  return mapRooms[sRoomId] ?? mapRooms.foyer!
}

function sExitRoomId(objHere: tRoom, sDir: tExitDir): string | undefined {
  const sOpenId = objHere.mapExits[sDir]
  if (sOpenId) {
    return sOpenId
  }
  const objSecret = objHere.mapSecretExits?.[sDir]
  if (objSecret && objState.setFlags.has(objSecret.sFlag)) {
    return objSecret.sRoomId
  }
  return undefined
}

function sThingDetail(objThing: tThing): string {
  const bCardTaken = Boolean(objThing.sCardId && objState.setFound.has(objThing.sCardId))
  const bFlagSet = Boolean(objThing.sSetFlag && objState.setFlags.has(objThing.sSetFlag))
  if ((bCardTaken || bFlagSet) && objThing.sDetailEmpty) {
    return objThing.sDetailEmpty
  }
  return objThing.sDetail
}

function sLookText(): string {
  const objHere = objRoom(objState.sRoomId)
  return `${objHere.sName}\n\n${objHere.sDescription}`
}

function vAppendLog(sText: string, sKind: 'system' | 'command' | 'story' = 'story'): void {
  if (!objLog) {
    return
  }
  const objEntry = document.createElement('div')
  objEntry.className = `house-log-entry house-log-${sKind}`
  objEntry.textContent = sText
  objLog.appendChild(objEntry)
  objLog.scrollTop = objLog.scrollHeight
}

function vRefreshThings(): void {
  if (!objThings) {
    return
  }

  const objHere = objRoom(objState.sRoomId)
  objThings.replaceChildren()

  for (const objThing of objHere.arrThings) {
    const objButton = document.createElement('button')
    objButton.type = 'button'
    objButton.className = 'house-thing'
    objButton.dataset.thing = objThing.sId
    objButton.textContent = objThing.sName
    objButton.setAttribute('aria-label', `Examine ${objThing.sName}`)
    objThings.appendChild(objButton)
  }

  if (objHere.arrThings.length === 0) {
    const objEmpty = document.createElement('p')
    objEmpty.className = 'house-things-empty'
    objEmpty.textContent = 'Nothing to examine.'
    objThings.appendChild(objEmpty)
  }
}

function vRefreshExits(): void {
  if (!objExits) {
    return
  }

  const objHere = objRoom(objState.sRoomId)
  objExits.replaceChildren()

  for (const sDir of arrExitOrder) {
    const sNextId = sExitRoomId(objHere, sDir)
    if (!sNextId) {
      continue
    }
    const objNext = objRoom(sNextId)
    const objButton = document.createElement('button')
    objButton.type = 'button'
    objButton.className = 'house-exit'
    objButton.dataset.dir = sDir
    objButton.textContent = objNext.sName
    objButton.setAttribute('aria-label', `Go to ${objNext.sName}`)
    objExits.appendChild(objButton)
  }

  if (objExits.childElementCount === 0) {
    const objEmpty = document.createElement('p')
    objEmpty.className = 'house-exits-empty'
    objEmpty.textContent = 'No exits.'
    objExits.appendChild(objEmpty)
  }
}

function vRefreshChecklist(): void {
  if (!objChecklist) {
    return
  }

  objChecklist.replaceChildren()

  for (const objCard of arrDeck) {
    const bFound = objState.setFound.has(objCard.sBinaryValue)
    const objItem = document.createElement('li')
    objItem.className = bFound ? 'house-check-item is-found' : 'house-check-item'
    objItem.setAttribute('aria-label', bFound ? `Found ${objCard.sName}` : `Missing ${objCard.sName}`)

    const objMark = document.createElement('span')
    objMark.className = 'house-check-mark'
    objMark.setAttribute('aria-hidden', 'true')
    objMark.textContent = bFound ? '☑' : '☐'

    const objName = document.createElement('span')
    objName.className = 'house-check-name'
    objName.textContent = objCard.sName

    const objBinary = document.createElement('span')
    objBinary.className = 'house-check-binary'
    objBinary.textContent = objCard.sBinaryValue

    objItem.append(objMark, objName, objBinary)
    objChecklist.appendChild(objItem)
  }
}

function vRefreshStatus(): void {
  if (!objStatus) {
    return
  }
  const objHere = objRoom(objState.sRoomId)
  const nFound = objState.setFound.size
  objStatus.textContent = `${objHere.sName} · ${nFound}/${nCardGoal} cards`
}

function vRefreshUi(): void {
  vRefreshStatus()
  vRefreshExits()
  vRefreshThings()
  vRefreshChecklist()
}

function vResetGame(): void {
  objState = objFreshState()
  if (objLog) {
    objLog.replaceChildren()
  }
  vAppendLog(
    'You stand in a quiet house. Sixteen binarot cards are hidden somewhere inside.\nChoose where to go, or examine something nearby.',
    'system',
  )
  vAppendLog(sLookText(), 'story')
  vRefreshUi()
}

function vTryMove(sDir: tExitDir): void {
  const objHere = objRoom(objState.sRoomId)
  const sNextId = sExitRoomId(objHere, sDir)
  if (!sNextId) {
    vAppendLog('You cannot go that way.', 'system')
    return
  }
  const objNext = objRoom(sNextId)
  vAppendLog(`You enter ${objNext.sName}.`, 'command')
  objState.sRoomId = sNextId
  vAppendLog(sLookText(), 'story')
  vRefreshUi()
}

function vTryTakeCard(sCardId: string): void {
  if (objState.setFound.has(sCardId)) {
    return
  }

  const objCard = mapCardById[sCardId]
  if (!objCard) {
    return
  }

  objState.setFound.add(sCardId)
  objState.setInventory.add(sCardId)
  vAppendLog(`You take ${objCard.sName} (${objCard.sBinaryValue}).`, 'story')

  if (objState.setFound.size >= nCardGoal) {
    vAppendLog('You have found all sixteen binarot cards.', 'system')
  }
}

function vExamineThing(sThingId: string): void {
  const objHere = objRoom(objState.sRoomId)
  const objThing = objHere.arrThings.find((objItem) => objItem.sId === sThingId)
  if (!objThing) {
    vAppendLog('That is no longer here.', 'system')
    return
  }

  vAppendLog(`Examine ${objThing.sName}.`, 'command')
  vAppendLog(sThingDetail(objThing), 'story')

  let bChanged = false

  if (objThing.sSetFlag && !objState.setFlags.has(objThing.sSetFlag)) {
    objState.setFlags.add(objThing.sSetFlag)
    bChanged = true
  }

  if (objThing.sCardId && !objState.setFound.has(objThing.sCardId)) {
    vTryTakeCard(objThing.sCardId)
    bChanged = true
  }

  if (bChanged) {
    vRefreshUi()
  }
}

function vOnControlsClick(objEvent: Event): void {
  const objTarget = objEvent.target
  if (!(objTarget instanceof HTMLElement)) {
    return
  }

  const objButton = objTarget.closest('button')
  if (!(objButton instanceof HTMLButtonElement) || objButton.disabled) {
    return
  }

  const sDir = objButton.dataset.dir as tExitDir | undefined
  if (sDir) {
    vTryMove(sDir)
    return
  }

  const sThingId = objButton.dataset.thing
  if (sThingId) {
    vExamineThing(sThingId)
    return
  }

  if (objButton.dataset.action === 'restart') {
    vResetGame()
  }
}

export function sHouseMarkup(): string {
  return `
    <div class="house" id="house">
      <div class="house-status" id="house-status" aria-live="polite"></div>
      <div class="house-log" id="house-log" role="log" aria-relevant="additions"></div>
      <div class="house-controls" id="house-controls">
        <div class="house-exits-wrap">
          <span class="house-exits-label">Go to</span>
          <div class="house-exits" id="house-exits" role="group" aria-label="Neighboring areas"></div>
        </div>
        <div class="house-things-wrap">
          <span class="house-things-label">Examine</span>
          <div class="house-things" id="house-things" role="group" aria-label="Things to examine"></div>
        </div>
        <div class="house-checklist-wrap">
          <span class="house-checklist-label">Cards</span>
          <ul class="house-checklist" id="house-checklist" aria-label="Card checklist"></ul>
        </div>
        <button type="button" class="house-restart" data-action="restart">Restart</button>
      </div>
      <p class="house-caption">house · find all 16 cards</p>
    </div>
  `
}

export function vBindHouse(arrCards: tHouseCard[]): void {
  arrDeck = arrCards
  mapCardById = {}
  for (const objCard of arrDeck) {
    mapCardById[objCard.sBinaryValue] = objCard
  }

  objLog = document.querySelector<HTMLElement>('#house-log')
  objStatus = document.querySelector<HTMLElement>('#house-status')
  objControls = document.querySelector<HTMLElement>('#house-controls')
  objExits = document.querySelector<HTMLElement>('#house-exits')
  objThings = document.querySelector<HTMLElement>('#house-things')
  objChecklist = document.querySelector<HTMLElement>('#house-checklist')

  if (!objLog || !objStatus || !objControls || !objExits || !objThings || !objChecklist) {
    return
  }

  if (!bBound) {
    objControls.addEventListener('click', vOnControlsClick)
    bBound = true
  }

  vResetGame()
}

export function vSetHouseActive(bActive: boolean): void {
  if (bActive) {
    objExits?.querySelector<HTMLButtonElement>('.house-exit')?.focus()
  }
}
