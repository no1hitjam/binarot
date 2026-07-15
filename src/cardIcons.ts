/** Stroke icons keyed by card binary slug. */
const mapCardIconPaths: Record<string, string> = {
  '0': `
    <circle cx="32" cy="40" r="4"/>
    <path d="M32 36 V22"/>
    <path d="M32 28 C24 24 22 16 26 12"/>
    <path d="M32 26 C38 22 42 16 38 11"/>
  `,
  '1': `
    <path d="M18 48 V12"/>
    <path d="M18 12 H42 L36 20 L42 28 H18"/>
  `,
  '10': `
    <path d="M20 28 C20 20 26 14 32 14 C38 14 44 20 44 28 V34 C44 38 42 40 38 40 H26 C22 40 20 38 20 34 Z"/>
    <path d="M26 40 V44 H38 V40"/>
    <path d="M28 48 H36"/>
    <path d="M46 22 C50 26 50 34 46 38"/>
    <path d="M50 18 C56 24 56 36 50 42"/>
  `,
  '11': `
    <path d="M28 26 C24 22 24 16 28 14 L34 10 C38 8 44 10 46 14 C48 18 46 24 42 26 L38 28"/>
    <path d="M36 38 C40 42 40 48 36 50 L30 54 C26 56 20 54 18 50 C16 46 18 40 22 38 L26 36"/>
    <path d="M26 38 L38 26"/>
  `,
  '100': `
    <path d="M12 28 L32 12 L52 28"/>
    <path d="M18 26 V48 H46 V26"/>
    <rect x="28" y="34" width="8" height="14"/>
    <path d="M22 34 H26 M38 34 H42"/>
  `,
  '101': `
    <path d="M32 12 V28"/>
    <path d="M32 28 L18 42"/>
    <path d="M32 28 L46 42"/>
    <circle cx="32" cy="12" r="3"/>
    <circle cx="18" cy="42" r="3"/>
    <circle cx="46" cy="42" r="3"/>
  `,
  '110': `
    <path d="M14 48 V22 C14 16 20 12 32 12 C44 12 50 16 50 22 V48"/>
    <path d="M14 48 H50"/>
    <path d="M24 48 V34 H40 V48"/>
    <circle cx="32" cy="24" r="3"/>
  `,
  '111': `
    <path d="M32 48 V28"/>
    <path d="M32 28 L18 20"/>
    <path d="M32 28 L46 20"/>
    <path d="M32 34 L22 28"/>
    <path d="M32 34 L42 28"/>
    <path d="M26 48 H38"/>
    <circle cx="32" cy="16" r="5"/>
  `,
  '1000': `
    <circle cx="32" cy="18" r="6"/>
    <path d="M20 48 V36 C20 30 25 26 32 26 C39 26 44 30 44 36 V48"/>
    <path d="M44 38 H52 M12 38 H20"/>
    <path d="M48 34 V42 M16 34 V42"/>
  `,
  '1001': `
    <path d="M14 28 H50"/>
    <path d="M18 28 V48"/>
    <path d="M46 28 V48"/>
    <path d="M22 28 V20 H42 V28"/>
    <path d="M14 34 H50"/>
  `,
  '1010': `
    <rect x="14" y="14" width="24" height="24"/>
    <rect x="26" y="26" width="24" height="24"/>
    <path d="M26 26 H38 V38"/>
  `,
  '1011': `
    <path d="M16 26 H48 V48 H16 Z"/>
    <path d="M16 26 L20 16 H44 L48 26"/>
    <path d="M28 34 H36 V42 H28 Z"/>
    <path d="M24 16 V26 M40 16 V26"/>
  `,
  '1100': `
    <rect x="12" y="14" width="40" height="36"/>
    <rect x="18" y="20" width="28" height="24"/>
    <path d="M12 14 L18 20 M52 14 L46 20 M12 50 L18 44 M52 50 L46 44"/>
  `,
  '1101': `
    <path d="M18 40 C18 28 24 18 32 14 C40 18 46 28 46 40 C46 46 40 50 32 50 C24 50 18 46 18 40 Z"/>
    <path d="M32 14 V50"/>
    <path d="M22 30 C26 28 38 28 42 30"/>
    <path d="M20 38 C26 36 38 36 44 38"/>
  `,
  '1110': `
    <path d="M14 48 H50"/>
    <path d="M18 48 V22"/>
    <path d="M32 48 V18"/>
    <path d="M46 48 V22"/>
    <path d="M14 22 H22"/>
    <path d="M28 18 H36"/>
    <path d="M42 22 H50"/>
    <path d="M18 30 H22 M30 26 H34 M46 30 H50"/>
  `,
  '1111': `
    <path d="M16 48 H48 V28 L40 22 L32 28 L24 22 L16 28 Z"/>
    <path d="M20 28 V48 M32 28 V48 M44 28 V48"/>
    <path d="M24 16 L32 10 L40 16 L36 22 H28 Z"/>
  `,
  '-1': `
    <circle cx="32" cy="32" r="18" stroke-dasharray="3 4"/>
    <circle cx="32" cy="32" r="4"/>
  `,
}

export function sCardIconPaths(sSlug: string): string {
  return mapCardIconPaths[sSlug] ?? ''
}

export function sCardIconMarkup(sSlug: string, sExtraClass: string = ''): string {
  const sPaths = sCardIconPaths(sSlug)
  if (!sPaths) {
    return ''
  }

  const sClass = sExtraClass ? `card-icon ${sExtraClass}` : 'card-icon'
  return `
    <svg class="${sClass}" viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" focusable="false">
      ${sPaths}
    </svg>
  `
}
