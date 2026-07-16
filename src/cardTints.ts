export type tCardTint = {
  sId: string
  sName: string
  sBorder: string
  sAccent: string
  sBright: string
  sWash: string
  sInner: string
  nWeight: number
  /** Hidden from collection pager until at least one card of this tint is owned. */
  bSecret?: boolean
}

/** Same palette cycle as the platform hero card. Index 0 is the common standard. */
export const arrCardTints: tCardTint[] = [
  {
    sId: 'standard',
    sName: 'Standard',
    sBorder: 'rgba(224, 184, 58, 0.75)',
    sAccent: '#e0b83a',
    sBright: '#ffe08a',
    sWash: 'rgba(139, 77, 255, 0.14)',
    sInner: 'rgba(139, 77, 255, 0.4)',
    nWeight: 72,
  },
  {
    sId: 'verdant',
    sName: 'Verdant',
    sBorder: 'rgba(120, 210, 140, 0.9)',
    sAccent: '#2d7844',
    sBright: '#9ae8ac',
    sWash: 'rgba(45, 120, 68, 0.2)',
    sInner: 'rgba(140, 220, 155, 0.55)',
    nWeight: 13,
  },
  {
    sId: 'azure',
    sName: 'Azure',
    sBorder: 'rgba(80, 160, 230, 0.8)',
    sAccent: '#50a0e6',
    sBright: '#a0d4ff',
    sWash: 'rgba(80, 160, 230, 0.16)',
    sInner: 'rgba(80, 160, 230, 0.42)',
    nWeight: 13,
  },
  {
    sId: 'gold',
    sName: 'Gold',
    sBorder: 'rgba(184, 134, 20, 0.9)',
    sAccent: '#b8860b',
    sBright: '#e8c040',
    sWash: 'rgba(140, 90, 10, 0.28)',
    sInner: 'rgba(184, 134, 20, 0.55)',
    nWeight: 2,
  },
  {
    sId: 'void',
    sName: 'Void',
    sBorder: 'rgba(18, 10, 28, 0.95)',
    sAccent: '#7a6a9a',
    sBright: '#f0e8ff',
    sWash: 'rgba(60, 20, 90, 0.28)',
    sInner: 'rgba(8, 4, 14, 0.85)',
    nWeight: 0.5,
    bSecret: true,
  },
]

export const nTintCount = arrCardTints.length
export const nStandardTint = 0

/** Public tints only (excludes secret variants like Void). */
export const arrPublicCardTints: tCardTint[] = arrCardTints.filter((objTint) => !objTint.bSecret)

let nWeightTotal = 0
for (const objTint of arrCardTints) {
  nWeightTotal += objTint.nWeight
}

export function objCardTint(nTint: number): tCardTint {
  const nIndex = ((nTint % nTintCount) + nTintCount) % nTintCount
  return arrCardTints[nIndex]!
}

export function bTintIsSecret(nTint: number): boolean {
  return objCardTint(nTint).bSecret === true
}

export function nRollCardTint(): number {
  let nRoll = Math.random() * nWeightTotal
  for (let nI = 0; nI < arrCardTints.length; nI++) {
    nRoll -= arrCardTints[nI]!.nWeight
    if (nRoll < 0) {
      return nI
    }
  }
  return nStandardTint
}

export function sOwnedVariantKey(sBinaryValue: string, nTint: number): string {
  return `${sBinaryValue}:${nTint}`
}

export function objParseOwnedVariantKey(
  sKey: string,
): { sBinaryValue: string; nTint: number } | null {
  const nColon = sKey.lastIndexOf(':')
  if (nColon <= 0) {
    return { sBinaryValue: sKey, nTint: nStandardTint }
  }
  const sBinaryValue = sKey.slice(0, nColon)
  const nTint = Number(sKey.slice(nColon + 1))
  if (!sBinaryValue || !Number.isInteger(nTint) || nTint < 0 || nTint >= nTintCount) {
    return null
  }
  return { sBinaryValue, nTint }
}

/**
 * Map older tint indices onto the current list. Removed tints return null.
 * Scheme 1: 7 tints (Copper at 2). Scheme 2: 6 tints (no Copper). Scheme 3: 4 tints (no Crimson/Teal).
 */
export function nMigrateLegacyTint(nTint: number, nFromScheme: number = 1): number | null {
  let nMapped = nTint
  if (nFromScheme < 2) {
    if (nMapped === 2) {
      return null
    }
    if (nMapped > 2) {
      nMapped -= 1
    }
  }
  if (nFromScheme < 3) {
    if (nMapped === 3 || nMapped === 4) {
      return null
    }
    if (nMapped === 5) {
      return 3
    }
    if (nMapped >= 0 && nMapped <= 2) {
      return nMapped
    }
    return null
  }
  if (nMapped < 0 || nMapped >= nTintCount) {
    return null
  }
  return nMapped
}

export function sTintCssVars(objTint: tCardTint, sBinaryValue: string = ''): string {
  const arrParts = [
    `--tint-border:${objTint.sBorder}`,
    `--tint-accent:${objTint.sAccent}`,
    `--tint-bright:${objTint.sBright}`,
    `--tint-wash:${objTint.sWash}`,
    `--tint-inner:${objTint.sInner}`,
  ]
  if (objTint.bSecret && sBinaryValue) {
    let nHash = 0
    for (let nI = 0; nI < sBinaryValue.length; nI++) {
      nHash = (nHash * 33 + sBinaryValue.charCodeAt(nI)) >>> 0
    }
    const nPhase = (nHash % 470) / 100
    arrParts.push(`--nGlitchPhase:-${nPhase.toFixed(2)}s`)
  }
  return arrParts.join(';')
}

export function sTintCardNameMarkup(sName: string, objTint: tCardTint): string {
  if (objTint.sId === 'void') {
    return `
      <h3 class="collect-card-name">
        <span class="void-title-real">${sName}</span>
        <span class="void-title-alt" aria-hidden="true">The Void</span>
      </h3>
    `
  }
  return `<h3 class="collect-card-name">${sName}</h3>`
}

/** Decorative layer for rare tint flair. Empty for Standard. */
export function sTintAmbianceMarkup(objTint: tCardTint): string {
  if (objTint.sId === 'verdant') {
    return `
      <div class="collect-card-ambiance is-verdant" aria-hidden="true">
        <span class="verdant-glow"></span>
        <span class="verdant-dapple"></span>
        <span class="verdant-mote"></span>
        <span class="verdant-mote"></span>
        <span class="verdant-mote"></span>
        <span class="verdant-mote"></span>
        <span class="verdant-mote"></span>
        <span class="verdant-mote"></span>
        <svg class="verdant-vine verdant-vine-tl" viewBox="0 0 56 56" fill="none">
          <path
            d="M4 40 C8 28 14 18 28 12 C22 20 20 28 22 38 C16 32 10 34 4 40 Z"
            fill="currentColor"
            opacity="0.55"
          />
          <path
            d="M6 44 C14 36 24 30 38 26"
            stroke="currentColor"
            stroke-width="1.2"
            stroke-linecap="round"
            opacity="0.7"
          />
          <path
            d="M28 12 C34 8 42 6 48 8 C42 14 36 16 28 12 Z"
            fill="currentColor"
            opacity="0.4"
          />
        </svg>
        <svg class="verdant-vine verdant-vine-br" viewBox="0 0 56 56" fill="none">
          <path
            d="M52 16 C48 28 42 38 28 44 C34 36 36 28 34 18 C40 24 46 22 52 16 Z"
            fill="currentColor"
            opacity="0.55"
          />
          <path
            d="M50 12 C42 20 32 26 18 30"
            stroke="currentColor"
            stroke-width="1.2"
            stroke-linecap="round"
            opacity="0.7"
          />
          <path
            d="M28 44 C22 48 14 50 8 48 C14 42 20 40 28 44 Z"
            fill="currentColor"
            opacity="0.4"
          />
        </svg>
      </div>
    `
  }
  if (objTint.sId === 'azure') {
    return `
      <div class="collect-card-ambiance is-azure" aria-hidden="true">
        <span class="azure-depth"></span>
        <span class="azure-caustic"></span>
        <span class="azure-ripple"></span>
        <span class="azure-ripple"></span>
        <span class="azure-ripple"></span>
        <span class="azure-glint"></span>
        <span class="azure-glint"></span>
        <span class="azure-glint"></span>
      </div>
    `
  }
  if (objTint.sId === 'gold') {
    return `
      <div class="collect-card-ambiance is-gold" aria-hidden="true">
        <span class="gold-radiance"></span>
        <span class="gold-shimmer"></span>
        <span class="gold-spark"></span>
        <span class="gold-spark"></span>
        <span class="gold-spark"></span>
        <span class="gold-spark"></span>
        <span class="gold-spark"></span>
        <span class="gold-spark"></span>
        <svg class="gold-crest" viewBox="0 0 64 28" fill="none">
          <path
            d="M8 22 L16 10 L24 18 L32 6 L40 18 L48 10 L56 22"
            stroke="currentColor"
            stroke-width="1.4"
            stroke-linejoin="round"
            stroke-linecap="round"
            opacity="0.7"
          />
          <circle cx="32" cy="6" r="2.2" fill="currentColor" opacity="0.8" />
          <circle cx="16" cy="10" r="1.6" fill="currentColor" opacity="0.65" />
          <circle cx="48" cy="10" r="1.6" fill="currentColor" opacity="0.65" />
        </svg>
      </div>
    `
  }
  if (objTint.sId === 'void') {
    return `
      <div class="collect-card-ambiance is-void" aria-hidden="true">
        <span class="void-haze"></span>
        <span class="void-scanlines"></span>
        <span class="void-noise"></span>
        <span class="void-chromatic"></span>
        <span class="void-particle"></span>
        <span class="void-particle"></span>
        <span class="void-particle"></span>
        <span class="void-particle"></span>
        <span class="void-particle"></span>
        <span class="void-particle"></span>
        <span class="void-particle"></span>
        <span class="void-particle"></span>
        <span class="void-particle"></span>
        <span class="void-particle"></span>
        <span class="void-particle"></span>
        <span class="void-particle"></span>
      </div>
    `
  }
  return ''
}
