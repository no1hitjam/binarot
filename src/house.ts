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
  sDetailUnlock?: string
  sCardId?: string
  sItemId?: string
  sItemName?: string
  sNeedItem?: string
  sSetFlag?: string
}

type tSecretExit = {
  sRoomId: string
  sFlag: string
  bShowLocked?: boolean
  sLockedLabel?: string
  sLockedMessage?: string
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
  mapItems: Map<string, string>
}

type tExitInfo = {
  sDir: tExitDir
  sRoomId: string
  bLocked: boolean
  sLabel: string
  sLockedMessage: string
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
          'A frayed doormat, letters half-worn away. You lift a corner. Underneath, cold against the boards, lies a small iron key tagged basement.',
        sDetailEmpty:
          'The doormat lies flat again. Nothing else is underneath but colder floorboards.',
        sItemId: 'basement_key',
        sItemName: 'basement key',
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
          'Wire hangers and a few wooden ones. They click softly when the door moves. One wooden hanger still bears a claim: a binarot card clipped to it—The Flag, marked 1.',
        sDetailEmpty:
          'Empty hangers tick against each other. The wooden one no longer holds a claim.',
        sCardId: '1',
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
      'A quiet parlor. Curtains mute the light. A reading chair faces a cold hearth. A study door sits east; the hallway is west.',
    mapExits: { west: 'hallway' },
    mapSecretExits: {
      north: { sRoomId: 'secret_room', sFlag: 'hearth_passage' },
      east: {
        sRoomId: 'study',
        sFlag: 'study_open',
        bShowLocked: true,
        sLockedLabel: 'Study (locked)',
        sLockedMessage: 'The study door is locked. You will need a key.',
      },
    },
    arrThings: [
      {
        sId: 'chair',
        sName: 'Reading chair',
        sDetail:
          'A deep chair with worn arms. The cushion still holds the ghost of a seated shape. Between cushion and frame, pressed flat, lies a binarot card—The Tree, marked 111.',
        sDetailEmpty:
          'The chair is empty again. The seat remembers a reader; the card does not.',
        sCardId: '111',
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
      {
        sId: 'study_door',
        sName: 'Study door',
        sDetail:
          'A paneled door on the east wall. The lock is brass and stubborn. Without a key, it stays shut.',
        sDetailUnlock:
          'The study key slides home. The door opens on paper, ink, and quiet.',
        sDetailEmpty:
          'The study door stands open. Shelves and a desk wait beyond.',
        sNeedItem: 'study_key',
        sSetFlag: 'study_open',
      },
    ],
  },
  kitchen: {
    sId: 'kitchen',
    sName: 'Kitchen',
    sDescription:
      'An old kitchen. Cupboards stand half-open. A pantry door sits to the north; a basement door is set low in the south wall. The hallway is east.',
    mapExits: { east: 'hallway', north: 'pantry' },
    mapSecretExits: {
      down: {
        sRoomId: 'basement',
        sFlag: 'basement_open',
        bShowLocked: true,
        sLockedLabel: 'Basement (locked)',
        sLockedMessage: 'The basement door is locked. You will need a key.',
      },
    },
    arrThings: [
      {
        sId: 'cupboards',
        sName: 'Cupboards',
        sDetail:
          'Cupboards full of mismatched plates and a single cracked teacup. Behind the plates, where paths of shelving split left and right, lies a binarot card—The Fork, marked 101.',
        sDetailEmpty:
          'Mismatched plates and a cracked teacup remain. The split in the shelving is empty.',
        sCardId: '101',
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
      {
        sId: 'basement_door',
        sName: 'Basement door',
        sDetail:
          'A heavy door set low in the south wall. The latch is locked. Without a key, it will not move.',
        sDetailUnlock:
          'The basement key fits. The latch turns with a dull click, and the heavy door swings inward on cold air and darkness.',
        sDetailEmpty:
          'The basement door stands open. Stairs descend into cooler dark.',
        sNeedItem: 'basement_key',
        sSetFlag: 'basement_open',
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
          'Dent-sided tins stacked three high. One rattles when shaken—not a bay leaf this time, but a binarot card: The Port, marked 110.',
        sDetailEmpty:
          'The tins are quiet now. One lid sits crooked where something crossed from inside to out.',
        sCardId: '110',
      },
    ],
  },
  landing: {
    sId: 'landing',
    sName: 'Upstairs Landing',
    sDescription:
      'The upstairs landing. Two bedrooms flank the hall—east and west. An attic hatch waits in the ceiling. Stairs lead back down.',
    mapExits: { down: 'hallway', east: 'bedroom_east', west: 'bedroom_west' },
    mapSecretExits: {
      up: {
        sRoomId: 'attic',
        sFlag: 'attic_open',
        bShowLocked: true,
        sLockedLabel: 'Attic (locked)',
        sLockedMessage: 'The attic hatch is locked. You will need a key.',
      },
    },
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
          'A bare bulb in a frosted shade. It hums faintly even when you are sure it is off. Taped inside the shade, answering the hum, is a binarot card—The Call, marked 10.',
        sDetailEmpty:
          'The bulb still hums. The shade is empty; whatever was calling has been taken.',
        sCardId: '10',
      },
      {
        sId: 'attic_hatch',
        sName: 'Attic hatch',
        sDetail:
          'A square hatch in the ceiling with a small iron lock. Without a key, it will not lift.',
        sDetailUnlock:
          'The attic key turns stiffly in the lock. The hatch drops a short ladder of cool air and dust.',
        sDetailEmpty:
          'The attic hatch hangs open. A short ladder leads up into the rafters.',
        sNeedItem: 'attic_key',
        sSetFlag: 'attic_open',
      },
    ],
  },
  bedroom_east: {
    sId: 'bedroom_east',
    sName: 'East Bedroom',
    sDescription: 'A spare bedroom. The mattress is stripped. A tall wardrobe stands against the north wall. The landing is west.',
    mapExits: { west: 'landing' },
    mapSecretExits: {
      north: {
        sRoomId: 'safe_room',
        sFlag: 'safe_open',
        bShowLocked: true,
        sLockedLabel: 'Safe room (locked)',
        sLockedMessage: 'The wardrobe will not yield. Something behind it is locked.',
      },
    },
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
          'An empty wardrobe. The door sticks, then opens on cedar smell and a single wire hanger. The back panel is solid—and locked from this side.',
        sDetailUnlock:
          'The safe-room key fits a hidden latch in the wardrobe’s back. The panel swings inward on a narrow sealed room.',
        sDetailEmpty:
          'The wardrobe stands open. Beyond the false back, the safe room waits.',
        sNeedItem: 'safe_key',
        sSetFlag: 'safe_open',
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
          'A writing desk with a shallow drawer. Inside: blotter paper, a dried pen, and a brass key tagged study, resting on a faint ink stain shaped like a bit.',
        sDetailEmpty:
          'The drawer holds blotter paper and a dried pen. The ink stain remains; the study key is gone.',
        sItemId: 'study_key',
        sItemName: 'study key',
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
          'A made bed, surprisingly neat. Under the pillow, placed with intent, lies a binarot card—The Agent, marked 1000.',
        sDetailEmpty:
          'The pillow is cold and flat. Whoever meant to return left their will elsewhere.',
        sCardId: '1000',
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
  basement: {
    sId: 'basement',
    sName: 'Basement',
    sDescription:
      'A cool basement of packed earth and stone. A low door is set further down into older dark. Stairs climb back to the kitchen.',
    mapExits: { up: 'kitchen' },
    mapSecretExits: {
      down: {
        sRoomId: 'root_cellar',
        sFlag: 'root_cellar_open',
        bShowLocked: true,
        sLockedLabel: 'Root cellar (locked)',
        sLockedMessage: 'The root cellar door is locked. You will need a key.',
      },
    },
    arrThings: [
      {
        sId: 'furnace',
        sName: 'Furnace',
        sDetail:
          'An old furnace, cold for years. The grate is shut. Ash and a smell of iron linger around it.',
      },
      {
        sId: 'shelves',
        sName: 'Storage shelves',
        sDetail:
          'Rough shelves hold paint cans, coiled rope, and a box of nails. Behind the paint cans, hooked on a nail, hangs a small brass key tagged attic.',
        sDetailEmpty:
          'Paint cans, rope, and nails remain. The nail where the attic key hung is empty.',
        sItemId: 'attic_key',
        sItemName: 'attic key',
      },
      {
        sId: 'floor',
        sName: 'Dirt floor',
        sDetail:
          'The packed earth shows old footprints crossing and re-crossing the same path to the stairs.',
      },
      {
        sId: 'root_cellar_door',
        sName: 'Root cellar door',
        sDetail:
          'A low, heavy door set deeper into the foundation. The lock is pitted with rust. Without a key, it holds.',
        sDetailUnlock:
          'The root cellar key fights the rust, then turns. Cold air and the smell of earth spill out.',
        sDetailEmpty:
          'The root cellar door stands open. Stone steps sink into colder dark.',
        sNeedItem: 'root_cellar_key',
        sSetFlag: 'root_cellar_open',
      },
    ],
  },
  attic: {
    sId: 'attic',
    sName: 'Attic',
    sDescription:
      'A low attic under the rafters. Heat gathers here. Trunks and sheeted shapes crowd the eaves. The hatch leads back down.',
    mapExits: { down: 'landing' },
    arrThings: [
      {
        sId: 'trunks',
        sName: 'Trunks',
        sDetail:
          'Travel trunks stacked two high. The latches are stiff with age. Inside: moth-eaten wool and a broken picture frame.',
      },
      {
        sId: 'rafters',
        sName: 'Rafters',
        sDetail:
          'Rough beams run the length of the roof. Cobwebs span the gaps like abandoned wiring.',
      },
      {
        sId: 'window',
        sName: 'Attic window',
        sDetail:
          'A small round window looks over the yard. Dust turns the daylight grey.',
      },
    ],
  },
  study: {
    sId: 'study',
    sName: 'Study',
    sDescription:
      'A small study lined with shelves. A desk faces the window. The air smells of paper and old ink. The parlor is west.',
    mapExits: { west: 'parlor' },
    arrThings: [
      {
        sId: 'books',
        sName: 'Bookshelf',
        sDetail:
          'Crowded shelves of philosophy and correspondence. One volume is hollow. Inside: a heavy key tagged root cellar, and a binarot card—The Forum, marked 1110.',
        sDetailEmpty:
          'The hollow book stands open on the shelf. Dust outlines where the key and card once rested.',
        sItemId: 'root_cellar_key',
        sItemName: 'root cellar key',
        sCardId: '1110',
      },
      {
        sId: 'study_desk',
        sName: 'Desk',
        sDetail:
          'A broad desk with neat stacks of blank paper. Under the blotter, filed as if by habit, lies a binarot card—The State, marked 1111.',
        sDetailEmpty:
          'Blank paper and a stained blotter remain. The desk’s order is intact; its authority has been removed.',
        sCardId: '1111',
      },
      {
        sId: 'study_window',
        sName: 'Window',
        sDetail:
          'The window looks onto a neglected garden. Rain has marked the glass in long streaks.',
      },
    ],
  },
  root_cellar: {
    sId: 'root_cellar',
    sName: 'Root Cellar',
    sDescription:
      'A root cellar cut into stone and earth. Shelves hold empty crates. The cold is steady. Stairs lead back up to the basement.',
    mapExits: { up: 'basement' },
    arrThings: [
      {
        sId: 'crates',
        sName: 'Crates',
        sDetail:
          'Empty crates stamped with faded orchard names. In the corner of one, wrapped in oilcloth, lies a binarot card—The Host, marked 100—and a small keyed tag marked safe.',
        sDetailEmpty:
          'The crates are empty. Oilcloth lies folded where something was kept dry.',
        sItemId: 'safe_key',
        sItemName: 'safe-room key',
        sCardId: '100',
      },
      {
        sId: 'stone_walls',
        sName: 'Stone walls',
        sDetail:
          'The walls sweat faintly. Tool marks show where the cellar was enlarged by hand.',
      },
      {
        sId: 'cellar_shelves',
        sName: 'Cellar shelves',
        sDetail:
          'Bare shelves, once for roots and jars. A single bent nail holds nothing.',
      },
    ],
  },
  safe_room: {
    sId: 'safe_room',
    sName: 'Safe Room',
    sDescription:
      'A narrow safe room behind the wardrobe. No windows. The walls are reinforced. The only way out is back through the false panel.',
    mapExits: { south: 'bedroom_east' },
    arrThings: [
      {
        sId: 'strongbox',
        sName: 'Strongbox',
        sDetail:
          'A metal strongbox bolted to the floor. The lid lifts without resistance. Inside lies a binarot card—The Link, marked 11.',
        sDetailEmpty:
          'The strongbox is empty. Its hinges still move as if expecting a return.',
        sCardId: '11',
      },
      {
        sId: 'cot',
        sName: 'Cot',
        sDetail:
          'A folding cot with a thin blanket. Someone prepared to wait here, and then did not.',
      },
      {
        sId: 'vent',
        sName: 'Air vent',
        sDetail:
          'A small vent near the ceiling ticks when the house settles. Air moves, barely.',
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
    mapItems: new Map(),
  }
}

function objRoom(sRoomId: string): tRoom {
  return mapRooms[sRoomId] ?? mapRooms.foyer!
}

function bHasItem(sItemId: string): boolean {
  return objState.mapItems.has(sItemId)
}

function objExitInfo(objHere: tRoom, sDir: tExitDir): tExitInfo | null {
  const sOpenId = objHere.mapExits[sDir]
  if (sOpenId) {
    return {
      sDir,
      sRoomId: sOpenId,
      bLocked: false,
      sLabel: objRoom(sOpenId).sName,
      sLockedMessage: '',
    }
  }

  const objSecret = objHere.mapSecretExits?.[sDir]
  if (!objSecret) {
    return null
  }

  const bOpen = objState.setFlags.has(objSecret.sFlag)
  if (bOpen) {
    return {
      sDir,
      sRoomId: objSecret.sRoomId,
      bLocked: false,
      sLabel: objRoom(objSecret.sRoomId).sName,
      sLockedMessage: '',
    }
  }

  if (!objSecret.bShowLocked) {
    return null
  }

  return {
    sDir,
    sRoomId: objSecret.sRoomId,
    bLocked: true,
    sLabel: objSecret.sLockedLabel ?? `${objRoom(objSecret.sRoomId).sName} (locked)`,
    sLockedMessage: objSecret.sLockedMessage ?? 'That way is locked.',
  }
}

function sThingDetail(objThing: tThing): string {
  const bCardTaken = Boolean(objThing.sCardId && objState.setFound.has(objThing.sCardId))
  const bFlagSet = Boolean(objThing.sSetFlag && objState.setFlags.has(objThing.sSetFlag))
  const bItemTaken = Boolean(objThing.sItemId && bHasItem(objThing.sItemId))

  if ((bCardTaken || bFlagSet || bItemTaken) && objThing.sDetailEmpty) {
    return objThing.sDetailEmpty
  }

  if (objThing.sNeedItem && bHasItem(objThing.sNeedItem) && objThing.sDetailUnlock && !bFlagSet) {
    return objThing.sDetailUnlock
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
    const objExit = objExitInfo(objHere, sDir)
    if (!objExit) {
      continue
    }
    const objButton = document.createElement('button')
    objButton.type = 'button'
    objButton.className = objExit.bLocked ? 'house-exit is-locked' : 'house-exit'
    objButton.dataset.dir = sDir
    objButton.textContent = objExit.sLabel
    objButton.setAttribute(
      'aria-label',
      objExit.bLocked ? `${objExit.sLabel}` : `Go to ${objExit.sLabel}`,
    )
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
  const arrItemNames = Array.from(objState.mapItems.values())
  const sItems = arrItemNames.length > 0 ? ` · ${arrItemNames.join(', ')}` : ''
  objStatus.textContent = `${objHere.sName} · ${nFound}/${nCardGoal} cards${sItems}`
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
  const objExit = objExitInfo(objHere, sDir)
  if (!objExit) {
    vAppendLog('You cannot go that way.', 'system')
    return
  }
  if (objExit.bLocked) {
    vAppendLog(objExit.sLockedMessage, 'system')
    return
  }
  const objNext = objRoom(objExit.sRoomId)
  vAppendLog(`You enter ${objNext.sName}.`, 'command')
  objState.sRoomId = objExit.sRoomId
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

function vTryTakeItem(objThing: tThing): void {
  if (!objThing.sItemId || !objThing.sItemName || bHasItem(objThing.sItemId)) {
    return
  }
  objState.mapItems.set(objThing.sItemId, objThing.sItemName)
  vAppendLog(`You take the ${objThing.sItemName}.`, 'story')
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

  if (objThing.sItemId && !bHasItem(objThing.sItemId)) {
    vTryTakeItem(objThing)
    bChanged = true
  }

  const bCanUnlock = !objThing.sNeedItem || bHasItem(objThing.sNeedItem)
  if (objThing.sSetFlag && bCanUnlock && !objState.setFlags.has(objThing.sSetFlag)) {
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
