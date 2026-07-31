type tRogueCard = {
  sName: string
  sBinaryValue: string
}

type tCell = {
  sGlyph: string
  bWalk: boolean
  bSeen: boolean
  bVisible: boolean
}

type tActor = {
  nX: number
  nY: number
  sGlyph: string
  nHp: number
  nAtk: number
  bPlayer: boolean
  sName: string
}

type tPotionKind =
  | 'shield'
  | 'power'
  | 'poison'
  | 'heal'
  | 'regen'
  | 'invis'
  | 'confuse'
  | 'blind'
  | 'teleport'
  | 'blast'

type tItem = {
  nX: number
  nY: number
  sGlyph: string
  bStairs?: boolean
  sPotion?: tPotionKind
}

type tFloorPalette = {
  sBg: string
  sSide: string
  sStatus: string
  sWall: string
  sFloor: string
  sFog: string
  sPlayer: string
  sMob: string
  sStairs: string
  sPotion: string
  sAccent: string
}

type tRoom = {
  nX: number
  nY: number
  nW: number
  nH: number
}

const nMapW = 48
const nMapH = 28
const nFovRadius = 7
const nPlayerMaxHp = 24
const nFloorGoal = 16
const nRoomAttempts = 40
const nMinRoomSize = 4
const nMaxRoomSize = 8
const nMonsterBase = 8
const nPotionCount = 4
const nShieldGain = 5
const nPowerBonus = 3
const nPowerDuration = 8
const nPoisonDuration = 5
const nPoisonDamage = 1
const nHealAmount = 6
const nRegenDuration = 6
const nRegenHeal = 1
const nInvisDuration = 8
const nConfuseDuration = 6
const nBlindDuration = 8
const nBlindFov = 2
const nBlastDamage = 4
const nAutoplayDelay = 140
const nStepHealInterval = 10
const nStepHealAmount = 1

const arrAutoplayDirections = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
]

const arrMonsterGlyphs = ['r', 'k', 'g', 'b', 's', 'z']
const arrMonsterNames = ['rat', 'kobold', 'goblin', 'bitling', 'shade', 'zero']
const arrPotionKinds: tPotionKind[] = [
  'shield',
  'power',
  'poison',
  'heal',
  'regen',
  'invis',
  'confuse',
  'blind',
  'teleport',
  'blast',
]

/** One palette per binarot card / dungeon floor, in deck order. */
const arrFloorPalettes: tFloorPalette[] = [
  {
    // The Seed — damp earth, first sprout
    sBg: '#0a1008',
    sSide: '#060a05',
    sStatus: '#1a2814',
    sWall: '#3d5a32',
    sFloor: '#2a3824',
    sFog: '#1a2218',
    sPlayer: '#a8e07a',
    sMob: '#c45a4a',
    sStairs: '#d4e878',
    sPotion: '#6a9e5a',
    sAccent: '#7cb85c',
  },
  {
    // The Flag — planted claim, banner red
    sBg: '#140808',
    sSide: '#0c0404',
    sStatus: '#2a1010',
    sWall: '#7a3038',
    sFloor: '#3a2024',
    sFog: '#241414',
    sPlayer: '#f0c060',
    sMob: '#ff5060',
    sStairs: '#e8a020',
    sPotion: '#c05070',
    sAccent: '#e05050',
  },
  {
    // The Call — interrupt signal, cyan ping
    sBg: '#061018',
    sSide: '#040c12',
    sStatus: '#102030',
    sWall: '#286888',
    sFloor: '#1a3040',
    sFog: '#101c28',
    sPlayer: '#70e8ff',
    sMob: '#ff7090',
    sStairs: '#40c8f0',
    sPotion: '#5090c8',
    sAccent: '#38b8e0',
  },
  {
    // The Link — bridge magenta, paired contact
    sBg: '#100818',
    sSide: '#0a0410',
    sStatus: '#201028',
    sWall: '#683878',
    sFloor: '#302038',
    sFog: '#1c1024',
    sPlayer: '#f0a0e0',
    sMob: '#ff6080',
    sStairs: '#d070f0',
    sPotion: '#9070c8',
    sAccent: '#c060d8',
  },
  {
    // The Host — hearth amber, warm welcome
    sBg: '#141008',
    sSide: '#0c0804',
    sStatus: '#282010',
    sWall: '#8a6840',
    sFloor: '#3a3020',
    sFog: '#221c10',
    sPlayer: '#ffe090',
    sMob: '#d05040',
    sStairs: '#f0b040',
    sPotion: '#c88840',
    sAccent: '#e0a048',
  },
  {
    // The Fork — split path, dual teal
    sBg: '#081412',
    sSide: '#040c0a',
    sStatus: '#102820',
    sWall: '#287868',
    sFloor: '#1c3830',
    sFog: '#10241c',
    sPlayer: '#60f0c8',
    sMob: '#e07050',
    sStairs: '#40e0a8',
    sPotion: '#40a888',
    sAccent: '#38c8a0',
  },
  {
    // The Port — deep harbor, night water
    sBg: '#060c18',
    sSide: '#040814',
    sStatus: '#101c30',
    sWall: '#304878',
    sFloor: '#182438',
    sFog: '#0c1424',
    sPlayer: '#90c8ff',
    sMob: '#ff6a5a',
    sStairs: '#5090e8',
    sPotion: '#4070b0',
    sAccent: '#4880d0',
  },
  {
    // The Tree — canopy green, root brown
    sBg: '#0a140a',
    sSide: '#060e06',
    sStatus: '#182818',
    sWall: '#406030',
    sFloor: '#243820',
    sFog: '#142018',
    sPlayer: '#c0e860',
    sMob: '#b05040',
    sStairs: '#88c840',
    sPotion: '#589048',
    sAccent: '#68a840',
  },
  {
    // The Agent — steel slate, covert grey
    sBg: '#0c0e12',
    sSide: '#08090c',
    sStatus: '#1a1e28',
    sWall: '#505868',
    sFloor: '#282c38',
    sFog: '#161820',
    sPlayer: '#c8d0e0',
    sMob: '#e05060',
    sStairs: '#8898b0',
    sPotion: '#687898',
    sAccent: '#7888a0',
  },
  {
    // The Table — parchment, ink brown
    sBg: '#14100c',
    sSide: '#0c0806',
    sStatus: '#281e14',
    sWall: '#786048',
    sFloor: '#3a3024',
    sFog: '#201810',
    sPlayer: '#f0d8a0',
    sMob: '#c04040',
    sStairs: '#d0a060',
    sPotion: '#a07848',
    sAccent: '#c09858',
  },
  {
    // The Clone — mirrored silver-cyan
    sBg: '#0c1014',
    sSide: '#080c10',
    sStatus: '#182028',
    sWall: '#487088',
    sFloor: '#243038',
    sFog: '#141c24',
    sPlayer: '#b0f0f8',
    sMob: '#ff5878',
    sStairs: '#70d8e8',
    sPotion: '#5898b0',
    sAccent: '#60c0d0',
  },
  {
    // The Cache — vault gold on shadow
    sBg: '#100c04',
    sSide: '#0a0802',
    sStatus: '#241c08',
    sWall: '#786028',
    sFloor: '#342c14',
    sFog: '#1c1808',
    sPlayer: '#ffe060',
    sMob: '#c04838',
    sStairs: '#e8c020',
    sPotion: '#b09030',
    sAccent: '#d0a828',
  },
  {
    // The Frame — scaffold orange, structure
    sBg: '#141008',
    sSide: '#0c0804',
    sStatus: '#2a2010',
    sWall: '#886038',
    sFloor: '#3a2c1c',
    sFog: '#221810',
    sPlayer: '#ffb060',
    sMob: '#e04050',
    sStairs: '#f08830',
    sPotion: '#c07040',
    sAccent: '#e07830',
  },
  {
    // The Shell — pearl, protective hush
    sBg: '#101014',
    sSide: '#0a0a0e',
    sStatus: '#202028',
    sWall: '#686878',
    sFloor: '#303038',
    sFog: '#18181e',
    sPlayer: '#f0e8f0',
    sMob: '#d05070',
    sStairs: '#c8b8d0',
    sPotion: '#9080a0',
    sAccent: '#a898b0',
  },
  {
    // The Forum — civic bronze, marble discourse
    sBg: '#12100c',
    sSide: '#0c0a06',
    sStatus: '#28241c',
    sWall: '#706048',
    sFloor: '#343028',
    sFog: '#1c1a14',
    sPlayer: '#e8d8b0',
    sMob: '#c84840',
    sStairs: '#c8a868',
    sPotion: '#988060',
    sAccent: '#b09860',
  },
  {
    // The State — sovereign black-gold finale
    sBg: '#08060a',
    sSide: '#040308',
    sStatus: '#1a1420',
    sWall: '#5a4870',
    sFloor: '#282030',
    sFog: '#141018',
    sPlayer: '#ffe08a',
    sMob: '#ff4a68',
    sStairs: '#e0b83a',
    sPotion: '#8b4dff',
    sAccent: '#e0b83a',
  },
]

let arrDeck: tRogueCard[] = []

let arrGrid: tCell[][] = []
let arrActors: tActor[] = []
let arrItems: tItem[] = []
let objPlayer: tActor | null = null
let nFloor = 1
let nShield = 0
let nPowerTurns = 0
let nPoisonTurns = 0
let nRegenTurns = 0
let nInvisTurns = 0
let nConfuseTurns = 0
let nBlindTurns = 0
let nSteps = 0
let nWins = 0
let bDead = false
let bWon = false
let bActive = false
let nAutoplayTimer: number | null = null

let objRoot: HTMLElement | null = null
let objStatus: HTMLElement | null = null
let objStage: HTMLElement | null = null
let objLog: HTMLElement | null = null
let objChecklist: HTMLElement | null = null

function nRandInt(nMin: number, nMax: number): number {
  return nMin + Math.floor(Math.random() * (nMax - nMin + 1))
}

function objCell(nX: number, nY: number): tCell | null {
  if (nX < 0 || nY < 0 || nX >= nMapW || nY >= nMapH) {
    return null
  }
  return arrGrid[nY]![nX]!
}

function vCarveRoom(objRoom: tRoom): void {
  for (let nY = objRoom.nY; nY < objRoom.nY + objRoom.nH; nY += 1) {
    for (let nX = objRoom.nX; nX < objRoom.nX + objRoom.nW; nX += 1) {
      const objTile = objCell(nX, nY)
      if (!objTile) {
        continue
      }
      objTile.sGlyph = '.'
      objTile.bWalk = true
    }
  }
}

function vCarveHTunnel(nX0: number, nX1: number, nY: number): void {
  const nA = Math.min(nX0, nX1)
  const nB = Math.max(nX0, nX1)
  for (let nX = nA; nX <= nB; nX += 1) {
    const objTile = objCell(nX, nY)
    if (!objTile) {
      continue
    }
    objTile.sGlyph = '.'
    objTile.bWalk = true
  }
}

function vCarveVTunnel(nY0: number, nY1: number, nX: number): void {
  const nA = Math.min(nY0, nY1)
  const nB = Math.max(nY0, nY1)
  for (let nY = nA; nY <= nB; nY += 1) {
    const objTile = objCell(nX, nY)
    if (!objTile) {
      continue
    }
    objTile.sGlyph = '.'
    objTile.bWalk = true
  }
}

function bRoomsOverlap(objA: tRoom, objB: tRoom): boolean {
  return (
    objA.nX <= objB.nX + objB.nW + 1 &&
    objA.nX + objA.nW + 1 >= objB.nX &&
    objA.nY <= objB.nY + objB.nH + 1 &&
    objA.nY + objA.nH + 1 >= objB.nY
  )
}

function objRoomCenter(objRoom: tRoom): { nX: number; nY: number } {
  return {
    nX: objRoom.nX + Math.floor(objRoom.nW / 2),
    nY: objRoom.nY + Math.floor(objRoom.nH / 2),
  }
}

function arrGenerateRooms(): tRoom[] {
  const arrRooms: tRoom[] = []
  for (let nTry = 0; nTry < nRoomAttempts; nTry += 1) {
    const nW = nRandInt(nMinRoomSize, nMaxRoomSize)
    const nH = nRandInt(nMinRoomSize, nMaxRoomSize)
    const nX = nRandInt(1, nMapW - nW - 2)
    const nY = nRandInt(1, nMapH - nH - 2)
    const objRoom: tRoom = { nX, nY, nW, nH }
    if (arrRooms.some((objOther) => bRoomsOverlap(objRoom, objOther))) {
      continue
    }
    arrRooms.push(objRoom)
  }
  return arrRooms
}

function vInitGrid(): void {
  arrGrid = []
  for (let nY = 0; nY < nMapH; nY += 1) {
    const arrRow: tCell[] = []
    for (let nX = 0; nX < nMapW; nX += 1) {
      arrRow.push({ sGlyph: '#', bWalk: false, bSeen: false, bVisible: false })
    }
    arrGrid.push(arrRow)
  }
}

function objActorAt(nX: number, nY: number): tActor | null {
  return arrActors.find((objActor) => objActor.nX === nX && objActor.nY === nY) ?? null
}

function objItemAt(nX: number, nY: number): tItem | null {
  return arrItems.find((objItem) => objItem.nX === nX && objItem.nY === nY) ?? null
}

function bWalkable(nX: number, nY: number, bIgnoreActors: boolean = false): boolean {
  const objTile = objCell(nX, nY)
  if (!objTile || !objTile.bWalk) {
    return false
  }
  if (!bIgnoreActors && objActorAt(nX, nY)) {
    return false
  }
  return true
}

function vAppendLog(sText: string, sClass: string = 'rogue-log-system'): void {
  if (!objLog) {
    return
  }
  const objLine = document.createElement('p')
  objLine.className = `rogue-log-line ${sClass}`
  objLine.textContent = sText
  objLog.appendChild(objLine)
  while (objLog.children.length > 40) {
    objLog.removeChild(objLog.firstChild!)
  }
  objLog.scrollTop = objLog.scrollHeight
}

function vClearLog(): void {
  if (objLog) {
    objLog.innerHTML = ''
  }
}

function vClearFov(): void {
  for (let nY = 0; nY < nMapH; nY += 1) {
    for (let nX = 0; nX < nMapW; nX += 1) {
      arrGrid[nY]![nX]!.bVisible = false
    }
  }
}

function bLos(nX0: number, nY0: number, nX1: number, nY1: number): boolean {
  let nX = nX0
  let nY = nY0
  const nDx = Math.abs(nX1 - nX0)
  const nDy = Math.abs(nY1 - nY0)
  const nSx = nX0 < nX1 ? 1 : -1
  const nSy = nY0 < nY1 ? 1 : -1
  let nErr = nDx - nDy

  while (true) {
    if (nX === nX1 && nY === nY1) {
      return true
    }
    if (!(nX === nX0 && nY === nY0)) {
      const objTile = objCell(nX, nY)
      if (!objTile || !objTile.bWalk) {
        return false
      }
    }
    const nE2 = 2 * nErr
    if (nE2 > -nDy) {
      nErr -= nDy
      nX += nSx
    }
    if (nE2 < nDx) {
      nErr += nDx
      nY += nSy
    }
  }
}

function vUpdateFov(): void {
  if (!objPlayer) {
    return
  }
  vClearFov()
  const nPx = objPlayer.nX
  const nPy = objPlayer.nY
  const nRadius = nBlindTurns > 0 ? nBlindFov : nFovRadius
  for (let nY = nPy - nRadius; nY <= nPy + nRadius; nY += 1) {
    for (let nX = nPx - nRadius; nX <= nPx + nRadius; nX += 1) {
      const objTile = objCell(nX, nY)
      if (!objTile) {
        continue
      }
      const nDist = Math.abs(nX - nPx) + Math.abs(nY - nPy)
      if (nDist > nRadius) {
        continue
      }
      if (!bLos(nPx, nPy, nX, nY)) {
        continue
      }
      objTile.bVisible = true
      objTile.bSeen = true
    }
  }
}

function vAttack(objAttacker: tActor, objTarget: tActor): void {
  if (objAttacker.bPlayer) {
    let nDmg = objAttacker.nAtk + nRandInt(-1, 1)
    if (nPowerTurns > 0) {
      nDmg += nPowerBonus
    }
    nDmg = Math.max(1, nDmg)
    objTarget.nHp -= nDmg
    vAppendLog(`You hit the ${objTarget.sName} for ${nDmg}.`, 'rogue-log-combat')
  } else {
    let nDmg = Math.max(1, objAttacker.nAtk + nRandInt(-1, 1))
    if (nShield > 0) {
      const nAbsorb = Math.min(nShield, nDmg)
      nShield -= nAbsorb
      nDmg -= nAbsorb
      vAppendLog(`Your shield absorbs ${nAbsorb}.`, 'rogue-log-system')
    }
    if (nDmg > 0) {
      objTarget.nHp -= nDmg
      vAppendLog(`The ${objAttacker.sName} hits you for ${nDmg}.`, 'rogue-log-alert')
    }
  }

  if (objTarget.nHp > 0) {
    return
  }

  if (objTarget.bPlayer) {
    bDead = true
    vAppendLog('You die. Press Restart or R.', 'rogue-log-alert')
    return
  }

  vAppendLog(`The ${objTarget.sName} dies.`, 'rogue-log-success')
  arrActors = arrActors.filter((objActor) => objActor !== objTarget)
}

function vBlastNearby(): void {
  if (!objPlayer) {
    return
  }
  let nHits = 0
  for (const objEnemy of [...arrActors]) {
    if (objEnemy.bPlayer || objEnemy.nHp <= 0) {
      continue
    }
    const nDist = Math.abs(objEnemy.nX - objPlayer.nX) + Math.abs(objEnemy.nY - objPlayer.nY)
    if (nDist !== 1) {
      continue
    }
    objEnemy.nHp -= nBlastDamage
    nHits += 1
    if (objEnemy.nHp <= 0) {
      vAppendLog(`The blast slays the ${objEnemy.sName}.`, 'rogue-log-success')
      arrActors = arrActors.filter((objActor) => objActor !== objEnemy)
    } else {
      vAppendLog(`The blast scorches the ${objEnemy.sName} for ${nBlastDamage}.`, 'rogue-log-combat')
    }
  }
  if (nHits === 0) {
    vAppendLog('The blast flares out into empty air.', 'rogue-log-system')
  }
}

function bTeleportPlayer(): boolean {
  if (!objPlayer) {
    return false
  }
  const arrSpots: Array<{ nX: number; nY: number }> = []
  for (let nY = 0; nY < nMapH; nY += 1) {
    for (let nX = 0; nX < nMapW; nX += 1) {
      if (!bWalkable(nX, nY)) {
        continue
      }
      if (nX === objPlayer.nX && nY === objPlayer.nY) {
        continue
      }
      arrSpots.push({ nX, nY })
    }
  }
  if (arrSpots.length === 0) {
    return false
  }
  const objSpot = arrSpots[nRandInt(0, arrSpots.length - 1)]!
  objPlayer.nX = objSpot.nX
  objPlayer.nY = objSpot.nY
  return true
}

function vDrinkPotion(sKind: tPotionKind): boolean {
  if (!objPlayer) {
    return false
  }
  if (sKind === 'shield') {
    nShield += nShieldGain
    vAppendLog(`You quaff a shimmering potion. Shield +${nShieldGain}.`, 'rogue-log-success')
  } else if (sKind === 'power') {
    nPowerTurns += nPowerDuration
    vAppendLog(
      `You quaff a burning potion. Damage +${nPowerBonus} for ${nPowerDuration} turns.`,
      'rogue-log-success',
    )
  } else if (sKind === 'poison') {
    nPoisonTurns += nPoisonDuration
    vAppendLog(`You quaff a foul potion. Poisoned for ${nPoisonDuration} turns!`, 'rogue-log-alert')
  } else if (sKind === 'heal') {
    const nBefore = objPlayer.nHp
    objPlayer.nHp = Math.min(nPlayerMaxHp, objPlayer.nHp + nHealAmount)
    vAppendLog(
      `You quaff a rosy potion. Heal +${objPlayer.nHp - nBefore}.`,
      'rogue-log-success',
    )
  } else if (sKind === 'regen') {
    nRegenTurns += nRegenDuration
    vAppendLog(
      `You quaff a verdant potion. Regenerating for ${nRegenDuration} turns.`,
      'rogue-log-success',
    )
  } else if (sKind === 'invis') {
    nInvisTurns += nInvisDuration
    vAppendLog(
      `You quaff a clear potion. Invisible for ${nInvisDuration} turns.`,
      'rogue-log-success',
    )
  } else if (sKind === 'confuse') {
    nConfuseTurns += nConfuseDuration
    vAppendLog(
      `You quaff a swirling potion. Confused for ${nConfuseDuration} turns!`,
      'rogue-log-alert',
    )
  } else if (sKind === 'blind') {
    nBlindTurns += nBlindDuration
    vAppendLog(
      `You quaff a murky potion. Blinded for ${nBlindDuration} turns!`,
      'rogue-log-alert',
    )
  } else if (sKind === 'teleport') {
    if (bTeleportPlayer()) {
      vAppendLog('You quaff a flickering potion. Space folds — you reappear elsewhere.', 'rogue-log-success')
      return vTryPickup()
    }
    vAppendLog('You quaff a flickering potion. Nothing happens.', 'rogue-log-system')
  } else {
    vAppendLog('You quaff a volatile potion. It detonates around you!', 'rogue-log-success')
    vBlastNearby()
  }
  return false
}

function vTickStatus(): void {
  if (!objPlayer || bDead || bWon) {
    return
  }
  if (nPowerTurns > 0) {
    nPowerTurns -= 1
    if (nPowerTurns === 0) {
      vAppendLog('The surge of power fades.', 'rogue-log-system')
    }
  }
  if (nRegenTurns > 0) {
    if (objPlayer.nHp < nPlayerMaxHp) {
      objPlayer.nHp = Math.min(nPlayerMaxHp, objPlayer.nHp + nRegenHeal)
      vAppendLog(`You knit back together (+${nRegenHeal}).`, 'rogue-log-success')
    }
    nRegenTurns -= 1
    if (nRegenTurns === 0) {
      vAppendLog('Your regeneration fades.', 'rogue-log-system')
    }
  }
  if (nInvisTurns > 0) {
    nInvisTurns -= 1
    if (nInvisTurns === 0) {
      vAppendLog('You shimmer back into view.', 'rogue-log-system')
    }
  }
  if (nConfuseTurns > 0) {
    nConfuseTurns -= 1
    if (nConfuseTurns === 0) {
      vAppendLog('Your head clears.', 'rogue-log-system')
    }
  }
  if (nBlindTurns > 0) {
    nBlindTurns -= 1
    if (nBlindTurns === 0) {
      vAppendLog('Your vision returns.', 'rogue-log-system')
    }
  }
  if (nPoisonTurns > 0) {
    objPlayer.nHp -= nPoisonDamage
    nPoisonTurns -= 1
    vAppendLog(`Poison courses through you (-${nPoisonDamage}).`, 'rogue-log-alert')
    if (objPlayer.nHp <= 0) {
      bDead = true
      vAppendLog('The poison takes you. Press Restart or R.', 'rogue-log-alert')
    }
  }
}

function vTryPickup(): boolean {
  if (!objPlayer || bDead || bWon) {
    return false
  }
  const objItem = objItemAt(objPlayer.nX, objPlayer.nY)
  if (!objItem) {
    return false
  }

  if (objItem.sPotion) {
    arrItems = arrItems.filter((objOther) => objOther !== objItem)
    return vDrinkPotion(objItem.sPotion)
  }

  if (objItem.bStairs) {
    vDescend()
    return true
  }
  return false
}

function vDescend(): void {
  if (!objPlayer || bDead || bWon) {
    return
  }
  if (nFloor >= nFloorGoal) {
    bWon = true
    nWins += 1
    vAppendLog(
      `You clear ${sFloorName()}. The sixteen floors fall silent.`,
      'rogue-log-success',
    )
    vAppendLog(`Wins seen: ${nWins}.`, 'rogue-log-success')
    return
  }
  const nHp = objPlayer.nHp
  nFloor += 1
  vGenerateDungeon(nHp)
  vAppendLog(`You descend the stairs into ${sFloorName()}.`, 'rogue-log-success')
}

function sFloorName(): string {
  const objCard = arrDeck[nFloor - 1]
  if (!objCard) {
    return `Floor ${nFloor}`
  }
  return `${objCard.sName} (${objCard.sBinaryValue})`
}

function objFloorPalette(): tFloorPalette {
  const nIndex = Math.max(0, Math.min(arrFloorPalettes.length - 1, nFloor - 1))
  return arrFloorPalettes[nIndex]!
}

function vApplyPalette(): void {
  if (!objRoot) {
    return
  }
  const objPal = objFloorPalette()
  objRoot.style.setProperty('--rogue-bg', objPal.sBg)
  objRoot.style.setProperty('--rogue-side', objPal.sSide)
  objRoot.style.setProperty('--rogue-status-bg', objPal.sStatus)
  objRoot.style.setProperty('--rogue-wall', objPal.sWall)
  objRoot.style.setProperty('--rogue-floor', objPal.sFloor)
  objRoot.style.setProperty('--rogue-fog', objPal.sFog)
  objRoot.style.setProperty('--rogue-player', objPal.sPlayer)
  objRoot.style.setProperty('--rogue-mob', objPal.sMob)
  objRoot.style.setProperty('--rogue-stairs', objPal.sStairs)
  objRoot.style.setProperty('--rogue-potion', objPal.sPotion)
  objRoot.style.setProperty('--rogue-accent', objPal.sAccent)
  objRoot.dataset.floor = String(nFloor)
}

function vTickStepHeal(): void {
  if (!objPlayer || bDead || bWon) {
    return
  }
  nSteps += 1
  if (nSteps % nStepHealInterval !== 0 || objPlayer.nHp >= nPlayerMaxHp) {
    return
  }
  objPlayer.nHp = Math.min(nPlayerMaxHp, objPlayer.nHp + nStepHealAmount)
  vAppendLog(`You recover ${nStepHealAmount} HP.`, 'rogue-log-success')
}

function vMovePlayer(nDx: number, nDy: number): void {
  if (!objPlayer || bDead || bWon || (nDx === 0 && nDy === 0)) {
    return
  }
  let nMoveX = nDx
  let nMoveY = nDy
  if (nConfuseTurns > 0) {
    const arrDirs = [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
    ]
    const arrDir = arrDirs[nRandInt(0, arrDirs.length - 1)]!
    nMoveX = arrDir[0]!
    nMoveY = arrDir[1]!
    vAppendLog('You stumble in confusion.', 'rogue-log-alert')
  }
  const nNx = objPlayer.nX + nMoveX
  const nNy = objPlayer.nY + nMoveY
  const objTile = objCell(nNx, nNy)
  if (!objTile || !objTile.bWalk) {
    if (nConfuseTurns > 0) {
      vTickStepHeal()
      vTickStatus()
      if (!bDead && !bWon) {
        vEnemyTurn()
      }
      vUpdateFov()
      vRefreshUi()
    }
    return
  }

  const objEnemy = objActorAt(nNx, nNy)
  if (objEnemy && !objEnemy.bPlayer) {
    vAttack(objPlayer, objEnemy)
    vTickStepHeal()
    vTickStatus()
    if (!bDead && !bWon) {
      vEnemyTurn()
    }
    vUpdateFov()
    vRefreshUi()
    return
  }

  objPlayer.nX = nNx
  objPlayer.nY = nNy
  vTickStepHeal()
  if (vTryPickup()) {
    vUpdateFov()
    vRefreshUi()
    return
  }
  vTickStatus()
  if (!bDead && !bWon) {
    vEnemyTurn()
  }
  vUpdateFov()
  vRefreshUi()
}

function objAutoplayMove(): { nDx: number; nDy: number } | null {
  if (!objPlayer) {
    return null
  }
  const objStairs = arrItems.find((objItem) => objItem.bStairs)
  if (!objStairs) {
    return null
  }

  const nStart = objPlayer.nY * nMapW + objPlayer.nX
  const nTarget = objStairs.nY * nMapW + objStairs.nX
  const arrPrevious = new Array<number>(nMapW * nMapH).fill(-1)
  const arrQueue = [nStart]
  let nQueueIndex = 0
  arrPrevious[nStart] = nStart

  while (nQueueIndex < arrQueue.length && arrPrevious[nTarget] === -1) {
    const nCurrent = arrQueue[nQueueIndex++]!
    const nX = nCurrent % nMapW
    const nY = Math.floor(nCurrent / nMapW)
    for (const [nDx, nDy] of arrAutoplayDirections) {
      const nNextX = nX + nDx!
      const nNextY = nY + nDy!
      const nNext = nNextY * nMapW + nNextX
      const objTile = objCell(nNextX, nNextY)
      if (!objTile?.bWalk || arrPrevious[nNext] !== -1) {
        continue
      }
      arrPrevious[nNext] = nCurrent
      arrQueue.push(nNext)
    }
  }

  if (arrPrevious[nTarget] === -1 || nStart === nTarget) {
    return null
  }
  let nStep = nTarget
  while (arrPrevious[nStep] !== nStart) {
    nStep = arrPrevious[nStep]!
  }
  return {
    nDx: (nStep % nMapW) - objPlayer.nX,
    nDy: Math.floor(nStep / nMapW) - objPlayer.nY,
  }
}

function vStopAutoplay(): void {
  if (nAutoplayTimer !== null) {
    window.clearInterval(nAutoplayTimer)
    nAutoplayTimer = null
  }
}

function vAutoplayStep(): void {
  if (!bActive) {
    vStopAutoplay()
    return
  }
  if (bDead || bWon) {
    vResetGame()
    return
  }
  const objMove = objAutoplayMove()
  if (!objMove) {
    vResetGame()
    return
  }
  vMovePlayer(objMove.nDx, objMove.nDy)
}

function vStartAutoplay(): void {
  if (nAutoplayTimer !== null || !bActive) {
    return
  }
  nAutoplayTimer = window.setInterval(vAutoplayStep, nAutoplayDelay)
  vAutoplayStep()
}

function vEnemyTurn(): void {
  if (!objPlayer || bDead) {
    return
  }
  if (nInvisTurns > 0) {
    return
  }

  for (const objEnemy of [...arrActors]) {
    if (objEnemy.bPlayer || objEnemy.nHp <= 0) {
      continue
    }
    const nDx = Math.sign(objPlayer.nX - objEnemy.nX)
    const nDy = Math.sign(objPlayer.nY - objEnemy.nY)
    const nDist = Math.abs(objPlayer.nX - objEnemy.nX) + Math.abs(objPlayer.nY - objEnemy.nY)
    if (nDist > nFovRadius + 2) {
      continue
    }

    const arrTries =
      Math.abs(objPlayer.nX - objEnemy.nX) >= Math.abs(objPlayer.nY - objEnemy.nY)
        ? [
            [nDx, 0],
            [0, nDy],
            [nDx, nDy],
          ]
        : [
            [0, nDy],
            [nDx, 0],
            [nDx, nDy],
          ]

    for (const [nTx, nTy] of arrTries) {
      const nNx = objEnemy.nX + nTx!
      const nNy = objEnemy.nY + nTy!
      if (nNx === objPlayer.nX && nNy === objPlayer.nY) {
        vAttack(objEnemy, objPlayer)
        if (bDead) {
          return
        }
        break
      }
      if (bWalkable(nNx, nNy)) {
        objEnemy.nX = nNx
        objEnemy.nY = nNy
        break
      }
    }
  }
}

function vPlaceMonsters(arrRooms: tRoom[]): void {
  const nMonsterCount = nMonsterBase + Math.floor((nFloor - 1) / 2)
  let nPlaced = 0
  let nGuard = 0
  while (nPlaced < nMonsterCount && nGuard < 200) {
    nGuard += 1
    const objRoom = arrRooms[nRandInt(1, arrRooms.length - 1)]!
    const nX = nRandInt(objRoom.nX, objRoom.nX + objRoom.nW - 1)
    const nY = nRandInt(objRoom.nY, objRoom.nY + objRoom.nH - 1)
    if (!bWalkable(nX, nY)) {
      continue
    }
    const nKind = nRandInt(0, arrMonsterGlyphs.length - 1)
    const nFloorBonus = Math.floor((nFloor - 1) / 4)
    arrActors.push({
      nX,
      nY,
      sGlyph: arrMonsterGlyphs[nKind]!,
      nHp: 2 + nRandInt(0, 3) + nFloorBonus,
      nAtk: 1 + nRandInt(0, 1) + (nFloor >= 9 ? 1 : 0),
      bPlayer: false,
      sName: arrMonsterNames[nKind]!,
    })
    nPlaced += 1
  }
}

function vPlaceStairs(arrRooms: tRoom[]): void {
  const arrTargets = arrRooms.slice(1)
  if (arrTargets.length === 0) {
    return
  }
  for (let nTry = 0; nTry < 80; nTry += 1) {
    const objRoom = arrTargets[nRandInt(0, arrTargets.length - 1)]!
    const nX = nRandInt(objRoom.nX, objRoom.nX + objRoom.nW - 1)
    const nY = nRandInt(objRoom.nY, objRoom.nY + objRoom.nH - 1)
    if (!bWalkable(nX, nY) || objItemAt(nX, nY)) {
      continue
    }
    if (objPlayer && nX === objPlayer.nX && nY === objPlayer.nY) {
      continue
    }
    arrItems.push({
      nX,
      nY,
      sGlyph: '>',
      bStairs: true,
    })
    return
  }
}

function vPlacePotions(arrRooms: tRoom[]): void {
  let nPlaced = 0
  let nGuard = 0
  while (nPlaced < nPotionCount && nGuard < 200) {
    nGuard += 1
    const objRoom = arrRooms[nRandInt(1, arrRooms.length - 1)]!
    const nX = nRandInt(objRoom.nX, objRoom.nX + objRoom.nW - 1)
    const nY = nRandInt(objRoom.nY, objRoom.nY + objRoom.nH - 1)
    if (!bWalkable(nX, nY) || objItemAt(nX, nY)) {
      continue
    }
    arrItems.push({
      nX,
      nY,
      sGlyph: '!',
      sPotion: arrPotionKinds[nRandInt(0, arrPotionKinds.length - 1)]!,
    })
    nPlaced += 1
  }
}

function vGenerateDungeon(nHp: number = nPlayerMaxHp): void {
  vInitGrid()
  arrActors = []
  arrItems = []
  bDead = false
  bWon = false

  let arrRooms = arrGenerateRooms()
  if (arrRooms.length < 5) {
    arrRooms = arrGenerateRooms()
  }

  for (const objRoom of arrRooms) {
    vCarveRoom(objRoom)
  }

  for (let nIndex = 1; nIndex < arrRooms.length; nIndex += 1) {
    const objPrev = objRoomCenter(arrRooms[nIndex - 1]!)
    const objNext = objRoomCenter(arrRooms[nIndex]!)
    if (Math.random() < 0.5) {
      vCarveHTunnel(objPrev.nX, objNext.nX, objPrev.nY)
      vCarveVTunnel(objPrev.nY, objNext.nY, objNext.nX)
    } else {
      vCarveVTunnel(objPrev.nY, objNext.nY, objPrev.nX)
      vCarveHTunnel(objPrev.nX, objNext.nX, objNext.nY)
    }
  }

  const objStart = objRoomCenter(arrRooms[0]!)
  objPlayer = {
    nX: objStart.nX,
    nY: objStart.nY,
    sGlyph: '@',
    nHp: Math.max(1, Math.min(nPlayerMaxHp, nHp)),
    nAtk: 2,
    bPlayer: true,
    sName: 'you',
  }
  arrActors.push(objPlayer)
  vPlaceMonsters(arrRooms)
  vPlaceStairs(arrRooms)
  vPlacePotions(arrRooms)
  vApplyPalette()
  vUpdateFov()
}

function sGlyphAt(nX: number, nY: number): string {
  const objTile = objCell(nX, nY)!
  if (!objTile.bSeen) {
    return ' '
  }

  if (objTile.bVisible) {
    const objActor = objActorAt(nX, nY)
    if (objActor) {
      return objActor.sGlyph
    }
    const objItemHere = objItemAt(nX, nY)
    if (objItemHere) {
      return objItemHere.sGlyph
    }
    return objTile.sGlyph
  }

  return objTile.bWalk ? '·' : '#'
}

function sMapMarkup(): string {
  const arrRows: string[] = []
  for (let nY = 0; nY < nMapH; nY += 1) {
    let sRow = ''
    for (let nX = 0; nX < nMapW; nX += 1) {
      const objTile = objCell(nX, nY)!
      const sGlyph = sGlyphAt(nX, nY)
      let sClass = 'rogue-cell'
      if (!objTile.bSeen) {
        sClass += ' is-void'
      } else if (objTile.bVisible) {
        if (sGlyph === '@') {
          sClass += ' is-player'
        } else if (sGlyph !== '#' && sGlyph !== '.' && sGlyph !== '·') {
          if (objActorAt(nX, nY)) {
            sClass += ' is-mob'
          } else if (objItemAt(nX, nY)?.sPotion) {
            sClass += ' is-potion'
          } else if (objItemAt(nX, nY)?.bStairs) {
            sClass += ' is-stairs'
          } else {
            sClass += ' is-loot'
          }
        } else if (sGlyph === '#') {
          sClass += ' is-wall'
        } else {
          sClass += ' is-floor'
        }
      } else {
        sClass += ' is-fog'
      }
      sRow += `<span class="${sClass}">${sGlyph === ' ' ? '&nbsp;' : sGlyph}</span>`
    }
    arrRows.push(`<div class="rogue-row">${sRow}</div>`)
  }
  return arrRows.join('')
}

function sStatusMarkup(): string {
  if (!objPlayer) {
    return ''
  }
  const sLife = bDead ? 'DEAD' : bWon ? 'CLEARED' : `HP ${objPlayer.nHp}/${nPlayerMaxHp}`
  const arrFx: string[] = []
  if (nShield > 0) {
    arrFx.push(`Shield:${nShield}`)
  }
  if (nPowerTurns > 0) {
    arrFx.push(`Power:${nPowerTurns}`)
  }
  if (nRegenTurns > 0) {
    arrFx.push(`Regen:${nRegenTurns}`)
  }
  if (nInvisTurns > 0) {
    arrFx.push(`Invis:${nInvisTurns}`)
  }
  if (nConfuseTurns > 0) {
    arrFx.push(`Confuse:${nConfuseTurns}`)
  }
  if (nBlindTurns > 0) {
    arrFx.push(`Blind:${nBlindTurns}`)
  }
  if (nPoisonTurns > 0) {
    arrFx.push(`Poison:${nPoisonTurns}`)
  }
  const sFx = arrFx.length ? `  ${arrFx.join(' ')}` : ''
  const objCard = arrDeck[nFloor - 1]
  const sName = objCard ? objCard.sName : `Floor ${nFloor}`
  return `Dlvl:${nFloor}/${nFloorGoal}  ${sName}  ${sLife}${sFx}  Wins:${nWins}`
}

function sChecklistMarkup(): string {
  return arrDeck
    .map((objCard, nIndex) => {
      const nCardFloor = nIndex + 1
      const bCleared = bWon || nCardFloor < nFloor
      const bCurrent = !bWon && nCardFloor === nFloor
      let sState = 'is-pending'
      if (bCleared) {
        sState = 'is-cleared'
      } else if (bCurrent) {
        sState = 'is-current'
      }
      const sMark = bCleared ? '*' : bCurrent ? '>' : '·'
      return `
        <li class="rogue-check-item ${sState}">
          <span class="rogue-check-mark" aria-hidden="true">${sMark}</span>
          <span class="rogue-check-name">${objCard.sName}</span>
          <span class="binary-value">${objCard.sBinaryValue}</span>
        </li>
      `
    })
    .join('')
}

function vRefreshUi(): void {
  if (!objStatus || !objStage || !objChecklist) {
    return
  }
  vApplyPalette()
  objStatus.textContent = sStatusMarkup()
  objStage.innerHTML = sMapMarkup()
  objChecklist.innerHTML = sChecklistMarkup()
}

function vResetGame(): void {
  nFloor = 1
  nShield = 0
  nPowerTurns = 0
  nPoisonTurns = 0
  nRegenTurns = 0
  nInvisTurns = 0
  nConfuseTurns = 0
  nBlindTurns = 0
  nSteps = 0
  vClearLog()
  vGenerateDungeon()
  vAppendLog('Welcome to Binarot Rogue.', 'rogue-log-command')
  vAppendLog(
    `Descend through all ${nFloorGoal} floors, each named for a card. You stand in ${sFloorName()}.`,
    'rogue-log-system',
  )
  vAppendLog('Stairs are > ; potions are ! and quaff on contact — effects vary wildly.', 'rogue-log-system')
  vRefreshUi()
}

export function sRogueMarkup(): string {
  return `
    <div class="rogue" id="rogue" aria-label="Autonomous rogue dungeon">
      <div class="rogue-status" id="rogue-status" aria-live="polite"></div>
      <div class="rogue-body">
        <pre class="rogue-stage" id="rogue-stage" aria-label="Dungeon map"></pre>
        <div class="rogue-side">
          <div class="rogue-log" id="rogue-log" role="log" aria-relevant="additions"></div>
        </div>
      </div>
      <div class="rogue-checklist-wrap">
        <span class="rogue-checklist-label">Floors</span>
        <ul class="rogue-checklist" id="rogue-checklist" aria-label="Dungeon floors"></ul>
      </div>
      <p class="rogue-caption">rogue · autonomous descent · &gt; stairs · ! potions</p>
    </div>
  `
}

export function vBindRogue(arrCards: tRogueCard[]): void {
  arrDeck = arrCards

  objRoot = document.querySelector<HTMLElement>('#rogue')
  objStatus = document.querySelector<HTMLElement>('#rogue-status')
  objStage = document.querySelector<HTMLElement>('#rogue-stage')
  objLog = document.querySelector<HTMLElement>('#rogue-log')
  objChecklist = document.querySelector<HTMLElement>('#rogue-checklist')

  if (!objRoot || !objStatus || !objStage || !objLog || !objChecklist) {
    return
  }

  vResetGame()
}

export function vSetRogueActive(bNext: boolean): void {
  bActive = bNext
  if (bNext) {
    if (bDead || bWon) {
      vResetGame()
    }
    vStartAutoplay()
  } else {
    vStopAutoplay()
  }
}
