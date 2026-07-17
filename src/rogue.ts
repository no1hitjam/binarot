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
  sCardId?: string
  sPotion?: tPotionKind
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
const nCardGoal = 16
const nRoomAttempts = 40
const nMinRoomSize = 4
const nMaxRoomSize = 8
const nMonsterCount = 10
const nPotionCount = 8
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

let arrDeck: tRogueCard[] = []
let mapCardById: Record<string, tRogueCard> = {}

let arrGrid: tCell[][] = []
let arrActors: tActor[] = []
let arrItems: tItem[] = []
let objPlayer: tActor | null = null
let setFound: Set<string> = new Set()
let nFloor = 1
let nShield = 0
let nPowerTurns = 0
let nPoisonTurns = 0
let nRegenTurns = 0
let nInvisTurns = 0
let nConfuseTurns = 0
let nBlindTurns = 0
let bDead = false
let bWon = false
let bBound = false
let bActive = false

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

function vDrinkPotion(sKind: tPotionKind): void {
  if (!objPlayer) {
    return
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
      vTryPickup()
    } else {
      vAppendLog('You quaff a flickering potion. Nothing happens.', 'rogue-log-system')
    }
  } else {
    vAppendLog('You quaff a volatile potion. It detonates around you!', 'rogue-log-success')
    vBlastNearby()
  }
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

function vTryPickup(): void {
  if (!objPlayer || bDead || bWon) {
    return
  }
  const objItem = objItemAt(objPlayer.nX, objPlayer.nY)
  if (!objItem) {
    return
  }

  if (objItem.sPotion) {
    arrItems = arrItems.filter((objOther) => objOther !== objItem)
    vDrinkPotion(objItem.sPotion)
    return
  }

  if (!objItem.sCardId) {
    return
  }
  const objCard = mapCardById[objItem.sCardId]
  if (!objCard) {
    return
  }
  setFound.add(objCard.sBinaryValue)
  arrItems = arrItems.filter((objOther) => objOther !== objItem)
  vAppendLog(
    `You pick up ${objCard.sName} (${objCard.sBinaryValue}). [${setFound.size}/${nCardGoal}]`,
    'rogue-log-success',
  )
  if (setFound.size >= nCardGoal) {
    bWon = true
    vAppendLog('The deck is complete. The dungeon yields.', 'rogue-log-success')
  }
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
  vTryPickup()
  vTickStatus()
  if (!bDead && !bWon) {
    vEnemyTurn()
  }
  vUpdateFov()
  vRefreshUi()
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
    arrActors.push({
      nX,
      nY,
      sGlyph: arrMonsterGlyphs[nKind]!,
      nHp: 2 + nRandInt(0, 3),
      nAtk: 1 + nRandInt(0, 1),
      bPlayer: false,
      sName: arrMonsterNames[nKind]!,
    })
    nPlaced += 1
  }
}

function vPlaceCards(arrRooms: tRoom[]): void {
  const arrShuffled = [...arrDeck].sort(() => Math.random() - 0.5)
  const arrTargets = arrRooms.slice(1)
  for (let nIndex = 0; nIndex < arrShuffled.length; nIndex += 1) {
    const objCard = arrShuffled[nIndex]!
    const objRoom = arrTargets[nIndex % arrTargets.length]!
    let nX = 0
    let nY = 0
    let bOk = false
    for (let nTry = 0; nTry < 30; nTry += 1) {
      nX = nRandInt(objRoom.nX, objRoom.nX + objRoom.nW - 1)
      nY = nRandInt(objRoom.nY, objRoom.nY + objRoom.nH - 1)
      if (bWalkable(nX, nY) && !objItemAt(nX, nY)) {
        bOk = true
        break
      }
    }
    if (!bOk) {
      continue
    }
    arrItems.push({
      nX,
      nY,
      sCardId: objCard.sBinaryValue,
      sGlyph: '*',
    })
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

function vGenerateDungeon(): void {
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
    nHp: nPlayerMaxHp,
    nAtk: 2,
    bPlayer: true,
    sName: 'you',
  }
  arrActors.push(objPlayer)
  vPlaceMonsters(arrRooms)
  vPlaceCards(arrRooms)
  vPlacePotions(arrRooms)
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
  return `Dlvl:${nFloor}  ${sLife}  Cards:${setFound.size}/${nCardGoal}${sFx}`
}

function sChecklistMarkup(): string {
  return arrDeck
    .map((objCard) => {
      const bFound = setFound.has(objCard.sBinaryValue)
      return `
        <li class="rogue-check-item${bFound ? ' is-found' : ''}">
          <span class="rogue-check-mark" aria-hidden="true">${bFound ? '*' : '·'}</span>
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
  objStatus.textContent = sStatusMarkup()
  objStage.innerHTML = sMapMarkup()
  objChecklist.innerHTML = sChecklistMarkup()
}

function vResetGame(): void {
  setFound = new Set()
  nFloor = 1
  nShield = 0
  nPowerTurns = 0
  nPoisonTurns = 0
  nRegenTurns = 0
  nInvisTurns = 0
  nConfuseTurns = 0
  nBlindTurns = 0
  vClearLog()
  vGenerateDungeon()
  vAppendLog('Welcome to Binarot Rogue.', 'rogue-log-command')
  vAppendLog('Find all sixteen cards. Move with arrows, WASD, or hjkl. Bump to fight.', 'rogue-log-system')
  vAppendLog('Cards are * ; potions are ! and quaff on contact — effects vary wildly.', 'rogue-log-system')
  vRefreshUi()
}

function vOnKeyDown(objEvent: KeyboardEvent): void {
  if (!bActive) {
    return
  }

  const sKey = objEvent.key
  if (sKey === 'r' || sKey === 'R') {
    objEvent.preventDefault()
    vResetGame()
    return
  }

  if (bDead || bWon) {
    return
  }

  let nDx = 0
  let nDy = 0
  switch (sKey) {
    case 'ArrowLeft':
    case 'a':
    case 'A':
    case 'h':
    case 'H':
    case '4':
      nDx = -1
      break
    case 'ArrowRight':
    case 'd':
    case 'D':
    case 'l':
    case 'L':
    case '6':
      nDx = 1
      break
    case 'ArrowUp':
    case 'w':
    case 'W':
    case 'k':
    case 'K':
    case '8':
      nDy = -1
      break
    case 'ArrowDown':
    case 's':
    case 'S':
    case 'j':
    case 'J':
    case '2':
      nDy = 1
      break
    case 'y':
    case 'Y':
    case '7':
      nDx = -1
      nDy = -1
      break
    case 'u':
    case 'U':
    case '9':
      nDx = 1
      nDy = -1
      break
    case 'b':
    case 'B':
    case '1':
      nDx = -1
      nDy = 1
      break
    case 'n':
    case 'N':
    case '3':
      nDx = 1
      nDy = 1
      break
    case '.':
    case '5':
      objEvent.preventDefault()
      vTickStatus()
      if (!bDead && !bWon) {
        vEnemyTurn()
      }
      vUpdateFov()
      vRefreshUi()
      return
    default:
      return
  }

  objEvent.preventDefault()
  vMovePlayer(nDx, nDy)
}

function vOnPadClick(objEvent: Event): void {
  const objTarget = objEvent.target
  if (!(objTarget instanceof HTMLElement)) {
    return
  }
  if (objTarget.closest('button[data-action="restart"]')) {
    vResetGame()
    return
  }
  const objBtn = objTarget.closest<HTMLButtonElement>('button[data-dx]')
  if (!objBtn) {
    return
  }
  if (objBtn.dataset.wait === '1') {
    if (bDead || bWon) {
      return
    }
    vTickStatus()
    if (!bDead && !bWon) {
      vEnemyTurn()
    }
    vUpdateFov()
    vRefreshUi()
    return
  }
  vMovePlayer(Number(objBtn.dataset.dx), Number(objBtn.dataset.dy))
}

export function sRogueMarkup(): string {
  return `
    <div class="rogue" id="rogue" tabindex="0" aria-label="Rogue dungeon">
      <div class="rogue-status" id="rogue-status" aria-live="polite"></div>
      <div class="rogue-body">
        <pre class="rogue-stage" id="rogue-stage" aria-label="Dungeon map"></pre>
        <div class="rogue-side">
          <div class="rogue-log" id="rogue-log" role="log" aria-relevant="additions"></div>
          <div class="rogue-pad" id="rogue-pad" aria-label="Movement pad">
            <button type="button" data-dx="-1" data-dy="-1">y</button>
            <button type="button" data-dx="0" data-dy="-1">k</button>
            <button type="button" data-dx="1" data-dy="-1">u</button>
            <button type="button" data-dx="-1" data-dy="0">h</button>
            <button type="button" data-dx="0" data-dy="0" data-wait="1">.</button>
            <button type="button" data-dx="1" data-dy="0">l</button>
            <button type="button" data-dx="-1" data-dy="1">b</button>
            <button type="button" data-dx="0" data-dy="1">j</button>
            <button type="button" data-dx="1" data-dy="1">n</button>
          </div>
          <button type="button" class="rogue-restart" data-action="restart">Restart</button>
        </div>
      </div>
      <div class="rogue-checklist-wrap">
        <span class="rogue-checklist-label">Deck</span>
        <ul class="rogue-checklist" id="rogue-checklist" aria-label="Collected cards"></ul>
      </div>
      <p class="rogue-caption">rogue · arrows / wasd / hjkl · bump to fight · * cards · ! potions</p>
    </div>
  `
}

export function vBindRogue(arrCards: tRogueCard[]): void {
  arrDeck = arrCards
  mapCardById = {}
  for (const objCard of arrDeck) {
    mapCardById[objCard.sBinaryValue] = objCard
  }

  objRoot = document.querySelector<HTMLElement>('#rogue')
  objStatus = document.querySelector<HTMLElement>('#rogue-status')
  objStage = document.querySelector<HTMLElement>('#rogue-stage')
  objLog = document.querySelector<HTMLElement>('#rogue-log')
  objChecklist = document.querySelector<HTMLElement>('#rogue-checklist')
  const objPad = document.querySelector<HTMLElement>('#rogue-pad')

  if (!objRoot || !objStatus || !objStage || !objLog || !objChecklist || !objPad) {
    return
  }

  if (!bBound) {
    window.addEventListener('keydown', vOnKeyDown)
    objPad.addEventListener('click', vOnPadClick)
    objRoot.querySelector('.rogue-restart')?.addEventListener('click', () => vResetGame())
    objRoot.addEventListener('click', () => objRoot?.focus())
    bBound = true
  }

  vResetGame()
}

export function vSetRogueActive(bNext: boolean): void {
  bActive = bNext
  if (bNext) {
    objRoot?.focus()
  }
}
