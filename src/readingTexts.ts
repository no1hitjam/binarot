export type tOperator = 'AND' | 'OR'

export type tPairTexts = {
  pair: string
  AND: string
  OR: string
}

export type tReadingTexts = {
  [sLeftBinary: string]: {
    [sRightBinary: string]: tPairTexts
  }
}

export const objReadingTexts: tReadingTexts = {
  '0': {
    '1': {
      pair: `
The Seed (0) represents beginnings, ideas, and origins. The Flag (1) represents claims, power, and sovereignty.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Seed (0) represents beginnings, ideas, and origins. The Flag (1) represents claims, power, and sovereignty. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Seed (0) represents beginnings, ideas, and origins. The Flag (1) represents claims, power, and sovereignty. Result: The Flag (1) represents claims, power, and sovereignty.
`,
    },
    '10': {
      pair: `
The Seed (0) represents beginnings, ideas, and origins. The Call (10) represents summonings, duty, and serendipity.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Seed (0) represents beginnings, ideas, and origins. The Call (10) represents summonings, duty, and serendipity. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Seed (0) represents beginnings, ideas, and origins. The Call (10) represents summonings, duty, and serendipity. Result: The Call (10) represents summonings, duty, and serendipity.
`,
    },
    '11': {
      pair: `
The Seed (0) represents beginnings, ideas, and origins. The Link (11) represents connections, promises, and security.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Seed (0) represents beginnings, ideas, and origins. The Link (11) represents connections, promises, and security. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Seed (0) represents beginnings, ideas, and origins. The Link (11) represents connections, promises, and security. Result: The Link (11) represents connections, promises, and security.
`,
    },
    '100': {
      pair: `
The Seed (0) represents beginnings, ideas, and origins. The Host (100) represents shelter, ownership, and grace.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Seed (0) represents beginnings, ideas, and origins. The Host (100) represents shelter, ownership, and grace. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Seed (0) represents beginnings, ideas, and origins. The Host (100) represents shelter, ownership, and grace. Result: The Host (100) represents shelter, ownership, and grace.
`,
    },
    '101': {
      pair: `
The Seed (0) represents beginnings, ideas, and origins. The Fork (101) represents hunger, resonance, and diverging paths.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Seed (0) represents beginnings, ideas, and origins. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Seed (0) represents beginnings, ideas, and origins. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Fork (101) represents hunger, resonance, and diverging paths.
`,
    },
    '110': {
      pair: `
The Seed (0) represents beginnings, ideas, and origins. The Port (110) represents gateways, discovery, and trade.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Seed (0) represents beginnings, ideas, and origins. The Port (110) represents gateways, discovery, and trade. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Seed (0) represents beginnings, ideas, and origins. The Port (110) represents gateways, discovery, and trade. Result: The Port (110) represents gateways, discovery, and trade.
`,
    },
    '111': {
      pair: `
The Seed (0) represents beginnings, ideas, and origins. The Tree (111) represents fullness, growth, and reach.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Seed (0) represents beginnings, ideas, and origins. The Tree (111) represents fullness, growth, and reach. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Seed (0) represents beginnings, ideas, and origins. The Tree (111) represents fullness, growth, and reach. Result: The Tree (111) represents fullness, growth, and reach.
`,
    },
    '1000': {
      pair: `
The Seed (0) represents beginnings, ideas, and origins. The Agent (1000) represents independence, will, and action.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Seed (0) represents beginnings, ideas, and origins. The Agent (1000) represents independence, will, and action. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Seed (0) represents beginnings, ideas, and origins. The Agent (1000) represents independence, will, and action. Result: The Agent (1000) represents independence, will, and action.
`,
    },
    '1001': {
      pair: `
The Seed (0) represents beginnings, ideas, and origins. The Table (1001) represents gathering, consumption, and plots.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Seed (0) represents beginnings, ideas, and origins. The Table (1001) represents gathering, consumption, and plots. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Seed (0) represents beginnings, ideas, and origins. The Table (1001) represents gathering, consumption, and plots. Result: The Table (1001) represents gathering, consumption, and plots.
`,
    },
    '1010': {
      pair: `
The Seed (0) represents beginnings, ideas, and origins. The Clone (1010) represents mirrors, reproduction, and equality.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Seed (0) represents beginnings, ideas, and origins. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Seed (0) represents beginnings, ideas, and origins. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Clone (1010) represents mirrors, reproduction, and equality.
`,
    },
    '1011': {
      pair: `
The Seed (0) represents beginnings, ideas, and origins. The Cache (1011) represents secrets, knowledge, and wealth.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Seed (0) represents beginnings, ideas, and origins. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Seed (0) represents beginnings, ideas, and origins. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Cache (1011) represents secrets, knowledge, and wealth.
`,
    },
    '1100': {
      pair: `
The Seed (0) represents beginnings, ideas, and origins. The Frame (1100) represents perspective, structure, and state of mind.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Seed (0) represents beginnings, ideas, and origins. The Frame (1100) represents perspective, structure, and state of mind. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Seed (0) represents beginnings, ideas, and origins. The Frame (1100) represents perspective, structure, and state of mind. Result: The Frame (1100) represents perspective, structure, and state of mind.
`,
    },
    '1101': {
      pair: `
The Seed (0) represents beginnings, ideas, and origins. The Shell (1101) represents protection, boundaries, and rigidity.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Seed (0) represents beginnings, ideas, and origins. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Seed (0) represents beginnings, ideas, and origins. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Shell (1101) represents protection, boundaries, and rigidity.
`,
    },
    '1110': {
      pair: `
The Seed (0) represents beginnings, ideas, and origins. The Forum (1110) represents nobility, philosophy, and debate.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Seed (0) represents beginnings, ideas, and origins. The Forum (1110) represents nobility, philosophy, and debate. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Seed (0) represents beginnings, ideas, and origins. The Forum (1110) represents nobility, philosophy, and debate. Result: The Forum (1110) represents nobility, philosophy, and debate.
`,
    },
    '1111': {
      pair: `
The Seed (0) represents beginnings, ideas, and origins. The State (1111) represents organization, authority, and politics.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Seed (0) represents beginnings, ideas, and origins. The State (1111) represents organization, authority, and politics. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Seed (0) represents beginnings, ideas, and origins. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
`,
    },
  },
  '1': {
    '10': {
      pair: `
The Flag (1) represents claims, power, and sovereignty. The Call (10) represents summonings, duty, and serendipity.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Flag (1) represents claims, power, and sovereignty. The Call (10) represents summonings, duty, and serendipity. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Flag (1) represents claims, power, and sovereignty. The Call (10) represents summonings, duty, and serendipity. Result: The Link (11) represents connections, promises, and security.
`,
    },
    '11': {
      pair: `
The Flag (1) represents claims, power, and sovereignty. The Link (11) represents connections, promises, and security.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Flag (1) represents claims, power, and sovereignty. The Link (11) represents connections, promises, and security. Result: The Flag (1) represents claims, power, and sovereignty.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Flag (1) represents claims, power, and sovereignty. The Link (11) represents connections, promises, and security. Result: The Link (11) represents connections, promises, and security.
`,
    },
    '100': {
      pair: `
The Flag (1) represents claims, power, and sovereignty. The Host (100) represents shelter, ownership, and grace.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Flag (1) represents claims, power, and sovereignty. The Host (100) represents shelter, ownership, and grace. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Flag (1) represents claims, power, and sovereignty. The Host (100) represents shelter, ownership, and grace. Result: The Fork (101) represents hunger, resonance, and diverging paths.
`,
    },
    '101': {
      pair: `
The Flag (1) represents claims, power, and sovereignty. The Fork (101) represents hunger, resonance, and diverging paths.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Flag (1) represents claims, power, and sovereignty. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Flag (1) represents claims, power, and sovereignty.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Flag (1) represents claims, power, and sovereignty. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Fork (101) represents hunger, resonance, and diverging paths.
`,
    },
    '110': {
      pair: `
The Flag (1) represents claims, power, and sovereignty. The Port (110) represents gateways, discovery, and trade.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Flag (1) represents claims, power, and sovereignty. The Port (110) represents gateways, discovery, and trade. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Flag (1) represents claims, power, and sovereignty. The Port (110) represents gateways, discovery, and trade. Result: The Tree (111) represents fullness, growth, and reach.
`,
    },
    '111': {
      pair: `
The Flag (1) represents claims, power, and sovereignty. The Tree (111) represents fullness, growth, and reach.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Flag (1) represents claims, power, and sovereignty. The Tree (111) represents fullness, growth, and reach. Result: The Flag (1) represents claims, power, and sovereignty.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Flag (1) represents claims, power, and sovereignty. The Tree (111) represents fullness, growth, and reach. Result: The Tree (111) represents fullness, growth, and reach.
`,
    },
    '1000': {
      pair: `
The Flag (1) represents claims, power, and sovereignty. The Agent (1000) represents independence, will, and action.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Flag (1) represents claims, power, and sovereignty. The Agent (1000) represents independence, will, and action. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Flag (1) represents claims, power, and sovereignty. The Agent (1000) represents independence, will, and action. Result: The Table (1001) represents gathering, consumption, and plots.
`,
    },
    '1001': {
      pair: `
The Flag (1) represents claims, power, and sovereignty. The Table (1001) represents gathering, consumption, and plots.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Flag (1) represents claims, power, and sovereignty. The Table (1001) represents gathering, consumption, and plots. Result: The Flag (1) represents claims, power, and sovereignty.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Flag (1) represents claims, power, and sovereignty. The Table (1001) represents gathering, consumption, and plots. Result: The Table (1001) represents gathering, consumption, and plots.
`,
    },
    '1010': {
      pair: `
The Flag (1) represents claims, power, and sovereignty. The Clone (1010) represents mirrors, reproduction, and equality.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Flag (1) represents claims, power, and sovereignty. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Flag (1) represents claims, power, and sovereignty. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Cache (1011) represents secrets, knowledge, and wealth.
`,
    },
    '1011': {
      pair: `
The Flag (1) represents claims, power, and sovereignty. The Cache (1011) represents secrets, knowledge, and wealth.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Flag (1) represents claims, power, and sovereignty. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Flag (1) represents claims, power, and sovereignty.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Flag (1) represents claims, power, and sovereignty. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Cache (1011) represents secrets, knowledge, and wealth.
`,
    },
    '1100': {
      pair: `
The Flag (1) represents claims, power, and sovereignty. The Frame (1100) represents perspective, structure, and state of mind.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Flag (1) represents claims, power, and sovereignty. The Frame (1100) represents perspective, structure, and state of mind. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Flag (1) represents claims, power, and sovereignty. The Frame (1100) represents perspective, structure, and state of mind. Result: The Shell (1101) represents protection, boundaries, and rigidity.
`,
    },
    '1101': {
      pair: `
The Flag (1) represents claims, power, and sovereignty. The Shell (1101) represents protection, boundaries, and rigidity.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Flag (1) represents claims, power, and sovereignty. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Flag (1) represents claims, power, and sovereignty.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Flag (1) represents claims, power, and sovereignty. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Shell (1101) represents protection, boundaries, and rigidity.
`,
    },
    '1110': {
      pair: `
The Flag (1) represents claims, power, and sovereignty. The Forum (1110) represents nobility, philosophy, and debate.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Flag (1) represents claims, power, and sovereignty. The Forum (1110) represents nobility, philosophy, and debate. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Flag (1) represents claims, power, and sovereignty. The Forum (1110) represents nobility, philosophy, and debate. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1111': {
      pair: `
The Flag (1) represents claims, power, and sovereignty. The State (1111) represents organization, authority, and politics.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Flag (1) represents claims, power, and sovereignty. The State (1111) represents organization, authority, and politics. Result: The Flag (1) represents claims, power, and sovereignty.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Flag (1) represents claims, power, and sovereignty. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
`,
    },
  },
  '10': {
    '11': {
      pair: `
The Call (10) represents summonings, duty, and serendipity. The Link (11) represents connections, promises, and security.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Call (10) represents summonings, duty, and serendipity. The Link (11) represents connections, promises, and security. Result: The Call (10) represents summonings, duty, and serendipity.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Call (10) represents summonings, duty, and serendipity. The Link (11) represents connections, promises, and security. Result: The Link (11) represents connections, promises, and security.
`,
    },
    '100': {
      pair: `
The Call (10) represents summonings, duty, and serendipity. The Host (100) represents shelter, ownership, and grace.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Call (10) represents summonings, duty, and serendipity. The Host (100) represents shelter, ownership, and grace. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Call (10) represents summonings, duty, and serendipity. The Host (100) represents shelter, ownership, and grace. Result: The Port (110) represents gateways, discovery, and trade.
`,
    },
    '101': {
      pair: `
The Call (10) represents summonings, duty, and serendipity. The Fork (101) represents hunger, resonance, and diverging paths.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Call (10) represents summonings, duty, and serendipity. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Call (10) represents summonings, duty, and serendipity. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Tree (111) represents fullness, growth, and reach.
`,
    },
    '110': {
      pair: `
The Call (10) represents summonings, duty, and serendipity. The Port (110) represents gateways, discovery, and trade.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Call (10) represents summonings, duty, and serendipity. The Port (110) represents gateways, discovery, and trade. Result: The Call (10) represents summonings, duty, and serendipity.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Call (10) represents summonings, duty, and serendipity. The Port (110) represents gateways, discovery, and trade. Result: The Port (110) represents gateways, discovery, and trade.
`,
    },
    '111': {
      pair: `
The Call (10) represents summonings, duty, and serendipity. The Tree (111) represents fullness, growth, and reach.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Call (10) represents summonings, duty, and serendipity. The Tree (111) represents fullness, growth, and reach. Result: The Call (10) represents summonings, duty, and serendipity.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Call (10) represents summonings, duty, and serendipity. The Tree (111) represents fullness, growth, and reach. Result: The Tree (111) represents fullness, growth, and reach.
`,
    },
    '1000': {
      pair: `
The Call (10) represents summonings, duty, and serendipity. The Agent (1000) represents independence, will, and action.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Call (10) represents summonings, duty, and serendipity. The Agent (1000) represents independence, will, and action. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Call (10) represents summonings, duty, and serendipity. The Agent (1000) represents independence, will, and action. Result: The Clone (1010) represents mirrors, reproduction, and equality.
`,
    },
    '1001': {
      pair: `
The Call (10) represents summonings, duty, and serendipity. The Table (1001) represents gathering, consumption, and plots.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Call (10) represents summonings, duty, and serendipity. The Table (1001) represents gathering, consumption, and plots. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Call (10) represents summonings, duty, and serendipity. The Table (1001) represents gathering, consumption, and plots. Result: The Cache (1011) represents secrets, knowledge, and wealth.
`,
    },
    '1010': {
      pair: `
The Call (10) represents summonings, duty, and serendipity. The Clone (1010) represents mirrors, reproduction, and equality.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Call (10) represents summonings, duty, and serendipity. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Call (10) represents summonings, duty, and serendipity.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Call (10) represents summonings, duty, and serendipity. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Clone (1010) represents mirrors, reproduction, and equality.
`,
    },
    '1011': {
      pair: `
The Call (10) represents summonings, duty, and serendipity. The Cache (1011) represents secrets, knowledge, and wealth.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Call (10) represents summonings, duty, and serendipity. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Call (10) represents summonings, duty, and serendipity.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Call (10) represents summonings, duty, and serendipity. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Cache (1011) represents secrets, knowledge, and wealth.
`,
    },
    '1100': {
      pair: `
The Call (10) represents summonings, duty, and serendipity. The Frame (1100) represents perspective, structure, and state of mind.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Call (10) represents summonings, duty, and serendipity. The Frame (1100) represents perspective, structure, and state of mind. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Call (10) represents summonings, duty, and serendipity. The Frame (1100) represents perspective, structure, and state of mind. Result: The Forum (1110) represents nobility, philosophy, and debate.
`,
    },
    '1101': {
      pair: `
The Call (10) represents summonings, duty, and serendipity. The Shell (1101) represents protection, boundaries, and rigidity.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Call (10) represents summonings, duty, and serendipity. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Call (10) represents summonings, duty, and serendipity. The Shell (1101) represents protection, boundaries, and rigidity. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1110': {
      pair: `
The Call (10) represents summonings, duty, and serendipity. The Forum (1110) represents nobility, philosophy, and debate.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Call (10) represents summonings, duty, and serendipity. The Forum (1110) represents nobility, philosophy, and debate. Result: The Call (10) represents summonings, duty, and serendipity.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Call (10) represents summonings, duty, and serendipity. The Forum (1110) represents nobility, philosophy, and debate. Result: The Forum (1110) represents nobility, philosophy, and debate.
`,
    },
    '1111': {
      pair: `
The Call (10) represents summonings, duty, and serendipity. The State (1111) represents organization, authority, and politics.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Call (10) represents summonings, duty, and serendipity. The State (1111) represents organization, authority, and politics. Result: The Call (10) represents summonings, duty, and serendipity.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Call (10) represents summonings, duty, and serendipity. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
`,
    },
  },
  '11': {
    '100': {
      pair: `
The Link (11) represents connections, promises, and security. The Host (100) represents shelter, ownership, and grace.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Link (11) represents connections, promises, and security. The Host (100) represents shelter, ownership, and grace. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Link (11) represents connections, promises, and security. The Host (100) represents shelter, ownership, and grace. Result: The Tree (111) represents fullness, growth, and reach.
`,
    },
    '101': {
      pair: `
The Link (11) represents connections, promises, and security. The Fork (101) represents hunger, resonance, and diverging paths.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Link (11) represents connections, promises, and security. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Flag (1) represents claims, power, and sovereignty.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Link (11) represents connections, promises, and security. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Tree (111) represents fullness, growth, and reach.
`,
    },
    '110': {
      pair: `
The Link (11) represents connections, promises, and security. The Port (110) represents gateways, discovery, and trade.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Link (11) represents connections, promises, and security. The Port (110) represents gateways, discovery, and trade. Result: The Call (10) represents summonings, duty, and serendipity.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Link (11) represents connections, promises, and security. The Port (110) represents gateways, discovery, and trade. Result: The Tree (111) represents fullness, growth, and reach.
`,
    },
    '111': {
      pair: `
The Link (11) represents connections, promises, and security. The Tree (111) represents fullness, growth, and reach.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Link (11) represents connections, promises, and security. The Tree (111) represents fullness, growth, and reach. Result: The Link (11) represents connections, promises, and security.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Link (11) represents connections, promises, and security. The Tree (111) represents fullness, growth, and reach. Result: The Tree (111) represents fullness, growth, and reach.
`,
    },
    '1000': {
      pair: `
The Link (11) represents connections, promises, and security. The Agent (1000) represents independence, will, and action.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Link (11) represents connections, promises, and security. The Agent (1000) represents independence, will, and action. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Link (11) represents connections, promises, and security. The Agent (1000) represents independence, will, and action. Result: The Cache (1011) represents secrets, knowledge, and wealth.
`,
    },
    '1001': {
      pair: `
The Link (11) represents connections, promises, and security. The Table (1001) represents gathering, consumption, and plots.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Link (11) represents connections, promises, and security. The Table (1001) represents gathering, consumption, and plots. Result: The Flag (1) represents claims, power, and sovereignty.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Link (11) represents connections, promises, and security. The Table (1001) represents gathering, consumption, and plots. Result: The Cache (1011) represents secrets, knowledge, and wealth.
`,
    },
    '1010': {
      pair: `
The Link (11) represents connections, promises, and security. The Clone (1010) represents mirrors, reproduction, and equality.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Link (11) represents connections, promises, and security. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Call (10) represents summonings, duty, and serendipity.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Link (11) represents connections, promises, and security. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Cache (1011) represents secrets, knowledge, and wealth.
`,
    },
    '1011': {
      pair: `
The Link (11) represents connections, promises, and security. The Cache (1011) represents secrets, knowledge, and wealth.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Link (11) represents connections, promises, and security. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Link (11) represents connections, promises, and security.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Link (11) represents connections, promises, and security. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Cache (1011) represents secrets, knowledge, and wealth.
`,
    },
    '1100': {
      pair: `
The Link (11) represents connections, promises, and security. The Frame (1100) represents perspective, structure, and state of mind.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Link (11) represents connections, promises, and security. The Frame (1100) represents perspective, structure, and state of mind. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Link (11) represents connections, promises, and security. The Frame (1100) represents perspective, structure, and state of mind. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1101': {
      pair: `
The Link (11) represents connections, promises, and security. The Shell (1101) represents protection, boundaries, and rigidity.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Link (11) represents connections, promises, and security. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Flag (1) represents claims, power, and sovereignty.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Link (11) represents connections, promises, and security. The Shell (1101) represents protection, boundaries, and rigidity. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1110': {
      pair: `
The Link (11) represents connections, promises, and security. The Forum (1110) represents nobility, philosophy, and debate.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Link (11) represents connections, promises, and security. The Forum (1110) represents nobility, philosophy, and debate. Result: The Call (10) represents summonings, duty, and serendipity.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Link (11) represents connections, promises, and security. The Forum (1110) represents nobility, philosophy, and debate. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1111': {
      pair: `
The Link (11) represents connections, promises, and security. The State (1111) represents organization, authority, and politics.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Link (11) represents connections, promises, and security. The State (1111) represents organization, authority, and politics. Result: The Link (11) represents connections, promises, and security.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Link (11) represents connections, promises, and security. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
`,
    },
  },
  '100': {
    '101': {
      pair: `
The Host (100) represents shelter, ownership, and grace. The Fork (101) represents hunger, resonance, and diverging paths.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Host (100) represents shelter, ownership, and grace. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Host (100) represents shelter, ownership, and grace.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Host (100) represents shelter, ownership, and grace. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Fork (101) represents hunger, resonance, and diverging paths.
`,
    },
    '110': {
      pair: `
The Host (100) represents shelter, ownership, and grace. The Port (110) represents gateways, discovery, and trade.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Host (100) represents shelter, ownership, and grace. The Port (110) represents gateways, discovery, and trade. Result: The Host (100) represents shelter, ownership, and grace.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Host (100) represents shelter, ownership, and grace. The Port (110) represents gateways, discovery, and trade. Result: The Port (110) represents gateways, discovery, and trade.
`,
    },
    '111': {
      pair: `
The Host (100) represents shelter, ownership, and grace. The Tree (111) represents fullness, growth, and reach.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Host (100) represents shelter, ownership, and grace. The Tree (111) represents fullness, growth, and reach. Result: The Host (100) represents shelter, ownership, and grace.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Host (100) represents shelter, ownership, and grace. The Tree (111) represents fullness, growth, and reach. Result: The Tree (111) represents fullness, growth, and reach.
`,
    },
    '1000': {
      pair: `
The Host (100) represents shelter, ownership, and grace. The Agent (1000) represents independence, will, and action.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Host (100) represents shelter, ownership, and grace. The Agent (1000) represents independence, will, and action. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Host (100) represents shelter, ownership, and grace. The Agent (1000) represents independence, will, and action. Result: The Frame (1100) represents perspective, structure, and state of mind.
`,
    },
    '1001': {
      pair: `
The Host (100) represents shelter, ownership, and grace. The Table (1001) represents gathering, consumption, and plots.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Host (100) represents shelter, ownership, and grace. The Table (1001) represents gathering, consumption, and plots. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Host (100) represents shelter, ownership, and grace. The Table (1001) represents gathering, consumption, and plots. Result: The Shell (1101) represents protection, boundaries, and rigidity.
`,
    },
    '1010': {
      pair: `
The Host (100) represents shelter, ownership, and grace. The Clone (1010) represents mirrors, reproduction, and equality.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Host (100) represents shelter, ownership, and grace. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Host (100) represents shelter, ownership, and grace. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Forum (1110) represents nobility, philosophy, and debate.
`,
    },
    '1011': {
      pair: `
The Host (100) represents shelter, ownership, and grace. The Cache (1011) represents secrets, knowledge, and wealth.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Host (100) represents shelter, ownership, and grace. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Host (100) represents shelter, ownership, and grace. The Cache (1011) represents secrets, knowledge, and wealth. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1100': {
      pair: `
The Host (100) represents shelter, ownership, and grace. The Frame (1100) represents perspective, structure, and state of mind.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Host (100) represents shelter, ownership, and grace. The Frame (1100) represents perspective, structure, and state of mind. Result: The Host (100) represents shelter, ownership, and grace.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Host (100) represents shelter, ownership, and grace. The Frame (1100) represents perspective, structure, and state of mind. Result: The Frame (1100) represents perspective, structure, and state of mind.
`,
    },
    '1101': {
      pair: `
The Host (100) represents shelter, ownership, and grace. The Shell (1101) represents protection, boundaries, and rigidity.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Host (100) represents shelter, ownership, and grace. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Host (100) represents shelter, ownership, and grace.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Host (100) represents shelter, ownership, and grace. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Shell (1101) represents protection, boundaries, and rigidity.
`,
    },
    '1110': {
      pair: `
The Host (100) represents shelter, ownership, and grace. The Forum (1110) represents nobility, philosophy, and debate.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Host (100) represents shelter, ownership, and grace. The Forum (1110) represents nobility, philosophy, and debate. Result: The Host (100) represents shelter, ownership, and grace.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Host (100) represents shelter, ownership, and grace. The Forum (1110) represents nobility, philosophy, and debate. Result: The Forum (1110) represents nobility, philosophy, and debate.
`,
    },
    '1111': {
      pair: `
The Host (100) represents shelter, ownership, and grace. The State (1111) represents organization, authority, and politics.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Host (100) represents shelter, ownership, and grace. The State (1111) represents organization, authority, and politics. Result: The Host (100) represents shelter, ownership, and grace.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Host (100) represents shelter, ownership, and grace. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
`,
    },
  },
  '101': {
    '110': {
      pair: `
The Fork (101) represents hunger, resonance, and diverging paths. The Port (110) represents gateways, discovery, and trade.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Fork (101) represents hunger, resonance, and diverging paths. The Port (110) represents gateways, discovery, and trade. Result: The Host (100) represents shelter, ownership, and grace.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Fork (101) represents hunger, resonance, and diverging paths. The Port (110) represents gateways, discovery, and trade. Result: The Tree (111) represents fullness, growth, and reach.
`,
    },
    '111': {
      pair: `
The Fork (101) represents hunger, resonance, and diverging paths. The Tree (111) represents fullness, growth, and reach.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Fork (101) represents hunger, resonance, and diverging paths. The Tree (111) represents fullness, growth, and reach. Result: The Fork (101) represents hunger, resonance, and diverging paths.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Fork (101) represents hunger, resonance, and diverging paths. The Tree (111) represents fullness, growth, and reach. Result: The Tree (111) represents fullness, growth, and reach.
`,
    },
    '1000': {
      pair: `
The Fork (101) represents hunger, resonance, and diverging paths. The Agent (1000) represents independence, will, and action.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Fork (101) represents hunger, resonance, and diverging paths. The Agent (1000) represents independence, will, and action. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Fork (101) represents hunger, resonance, and diverging paths. The Agent (1000) represents independence, will, and action. Result: The Shell (1101) represents protection, boundaries, and rigidity.
`,
    },
    '1001': {
      pair: `
The Fork (101) represents hunger, resonance, and diverging paths. The Table (1001) represents gathering, consumption, and plots.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Fork (101) represents hunger, resonance, and diverging paths. The Table (1001) represents gathering, consumption, and plots. Result: The Flag (1) represents claims, power, and sovereignty.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Fork (101) represents hunger, resonance, and diverging paths. The Table (1001) represents gathering, consumption, and plots. Result: The Shell (1101) represents protection, boundaries, and rigidity.
`,
    },
    '1010': {
      pair: `
The Fork (101) represents hunger, resonance, and diverging paths. The Clone (1010) represents mirrors, reproduction, and equality.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Fork (101) represents hunger, resonance, and diverging paths. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Fork (101) represents hunger, resonance, and diverging paths. The Clone (1010) represents mirrors, reproduction, and equality. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1011': {
      pair: `
The Fork (101) represents hunger, resonance, and diverging paths. The Cache (1011) represents secrets, knowledge, and wealth.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Fork (101) represents hunger, resonance, and diverging paths. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Flag (1) represents claims, power, and sovereignty.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Fork (101) represents hunger, resonance, and diverging paths. The Cache (1011) represents secrets, knowledge, and wealth. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1100': {
      pair: `
The Fork (101) represents hunger, resonance, and diverging paths. The Frame (1100) represents perspective, structure, and state of mind.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Fork (101) represents hunger, resonance, and diverging paths. The Frame (1100) represents perspective, structure, and state of mind. Result: The Host (100) represents shelter, ownership, and grace.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Fork (101) represents hunger, resonance, and diverging paths. The Frame (1100) represents perspective, structure, and state of mind. Result: The Shell (1101) represents protection, boundaries, and rigidity.
`,
    },
    '1101': {
      pair: `
The Fork (101) represents hunger, resonance, and diverging paths. The Shell (1101) represents protection, boundaries, and rigidity.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Fork (101) represents hunger, resonance, and diverging paths. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Fork (101) represents hunger, resonance, and diverging paths.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Fork (101) represents hunger, resonance, and diverging paths. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Shell (1101) represents protection, boundaries, and rigidity.
`,
    },
    '1110': {
      pair: `
The Fork (101) represents hunger, resonance, and diverging paths. The Forum (1110) represents nobility, philosophy, and debate.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Fork (101) represents hunger, resonance, and diverging paths. The Forum (1110) represents nobility, philosophy, and debate. Result: The Host (100) represents shelter, ownership, and grace.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Fork (101) represents hunger, resonance, and diverging paths. The Forum (1110) represents nobility, philosophy, and debate. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1111': {
      pair: `
The Fork (101) represents hunger, resonance, and diverging paths. The State (1111) represents organization, authority, and politics.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Fork (101) represents hunger, resonance, and diverging paths. The State (1111) represents organization, authority, and politics. Result: The Fork (101) represents hunger, resonance, and diverging paths.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Fork (101) represents hunger, resonance, and diverging paths. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
`,
    },
  },
  '110': {
    '111': {
      pair: `
The Port (110) represents gateways, discovery, and trade. The Tree (111) represents fullness, growth, and reach.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Port (110) represents gateways, discovery, and trade. The Tree (111) represents fullness, growth, and reach. Result: The Port (110) represents gateways, discovery, and trade.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Port (110) represents gateways, discovery, and trade. The Tree (111) represents fullness, growth, and reach. Result: The Tree (111) represents fullness, growth, and reach.
`,
    },
    '1000': {
      pair: `
The Port (110) represents gateways, discovery, and trade. The Agent (1000) represents independence, will, and action.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Port (110) represents gateways, discovery, and trade. The Agent (1000) represents independence, will, and action. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Port (110) represents gateways, discovery, and trade. The Agent (1000) represents independence, will, and action. Result: The Forum (1110) represents nobility, philosophy, and debate.
`,
    },
    '1001': {
      pair: `
The Port (110) represents gateways, discovery, and trade. The Table (1001) represents gathering, consumption, and plots.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Port (110) represents gateways, discovery, and trade. The Table (1001) represents gathering, consumption, and plots. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Port (110) represents gateways, discovery, and trade. The Table (1001) represents gathering, consumption, and plots. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1010': {
      pair: `
The Port (110) represents gateways, discovery, and trade. The Clone (1010) represents mirrors, reproduction, and equality.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Port (110) represents gateways, discovery, and trade. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Call (10) represents summonings, duty, and serendipity.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Port (110) represents gateways, discovery, and trade. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Forum (1110) represents nobility, philosophy, and debate.
`,
    },
    '1011': {
      pair: `
The Port (110) represents gateways, discovery, and trade. The Cache (1011) represents secrets, knowledge, and wealth.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Port (110) represents gateways, discovery, and trade. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Call (10) represents summonings, duty, and serendipity.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Port (110) represents gateways, discovery, and trade. The Cache (1011) represents secrets, knowledge, and wealth. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1100': {
      pair: `
The Port (110) represents gateways, discovery, and trade. The Frame (1100) represents perspective, structure, and state of mind.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Port (110) represents gateways, discovery, and trade. The Frame (1100) represents perspective, structure, and state of mind. Result: The Host (100) represents shelter, ownership, and grace.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Port (110) represents gateways, discovery, and trade. The Frame (1100) represents perspective, structure, and state of mind. Result: The Forum (1110) represents nobility, philosophy, and debate.
`,
    },
    '1101': {
      pair: `
The Port (110) represents gateways, discovery, and trade. The Shell (1101) represents protection, boundaries, and rigidity.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Port (110) represents gateways, discovery, and trade. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Host (100) represents shelter, ownership, and grace.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Port (110) represents gateways, discovery, and trade. The Shell (1101) represents protection, boundaries, and rigidity. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1110': {
      pair: `
The Port (110) represents gateways, discovery, and trade. The Forum (1110) represents nobility, philosophy, and debate.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Port (110) represents gateways, discovery, and trade. The Forum (1110) represents nobility, philosophy, and debate. Result: The Port (110) represents gateways, discovery, and trade.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Port (110) represents gateways, discovery, and trade. The Forum (1110) represents nobility, philosophy, and debate. Result: The Forum (1110) represents nobility, philosophy, and debate.
`,
    },
    '1111': {
      pair: `
The Port (110) represents gateways, discovery, and trade. The State (1111) represents organization, authority, and politics.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Port (110) represents gateways, discovery, and trade. The State (1111) represents organization, authority, and politics. Result: The Port (110) represents gateways, discovery, and trade.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Port (110) represents gateways, discovery, and trade. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
`,
    },
  },
  '111': {
    '1000': {
      pair: `
The Tree (111) represents fullness, growth, and reach. The Agent (1000) represents independence, will, and action.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Tree (111) represents fullness, growth, and reach. The Agent (1000) represents independence, will, and action. Result: The Seed (0) represents beginnings, ideas, and origins.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Tree (111) represents fullness, growth, and reach. The Agent (1000) represents independence, will, and action. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1001': {
      pair: `
The Tree (111) represents fullness, growth, and reach. The Table (1001) represents gathering, consumption, and plots.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Tree (111) represents fullness, growth, and reach. The Table (1001) represents gathering, consumption, and plots. Result: The Flag (1) represents claims, power, and sovereignty.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Tree (111) represents fullness, growth, and reach. The Table (1001) represents gathering, consumption, and plots. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1010': {
      pair: `
The Tree (111) represents fullness, growth, and reach. The Clone (1010) represents mirrors, reproduction, and equality.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Tree (111) represents fullness, growth, and reach. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Call (10) represents summonings, duty, and serendipity.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Tree (111) represents fullness, growth, and reach. The Clone (1010) represents mirrors, reproduction, and equality. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1011': {
      pair: `
The Tree (111) represents fullness, growth, and reach. The Cache (1011) represents secrets, knowledge, and wealth.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Tree (111) represents fullness, growth, and reach. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Link (11) represents connections, promises, and security.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Tree (111) represents fullness, growth, and reach. The Cache (1011) represents secrets, knowledge, and wealth. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1100': {
      pair: `
The Tree (111) represents fullness, growth, and reach. The Frame (1100) represents perspective, structure, and state of mind.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Tree (111) represents fullness, growth, and reach. The Frame (1100) represents perspective, structure, and state of mind. Result: The Host (100) represents shelter, ownership, and grace.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Tree (111) represents fullness, growth, and reach. The Frame (1100) represents perspective, structure, and state of mind. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1101': {
      pair: `
The Tree (111) represents fullness, growth, and reach. The Shell (1101) represents protection, boundaries, and rigidity.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Tree (111) represents fullness, growth, and reach. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Fork (101) represents hunger, resonance, and diverging paths.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Tree (111) represents fullness, growth, and reach. The Shell (1101) represents protection, boundaries, and rigidity. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1110': {
      pair: `
The Tree (111) represents fullness, growth, and reach. The Forum (1110) represents nobility, philosophy, and debate.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Tree (111) represents fullness, growth, and reach. The Forum (1110) represents nobility, philosophy, and debate. Result: The Port (110) represents gateways, discovery, and trade.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Tree (111) represents fullness, growth, and reach. The Forum (1110) represents nobility, philosophy, and debate. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1111': {
      pair: `
The Tree (111) represents fullness, growth, and reach. The State (1111) represents organization, authority, and politics.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Tree (111) represents fullness, growth, and reach. The State (1111) represents organization, authority, and politics. Result: The Tree (111) represents fullness, growth, and reach.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Tree (111) represents fullness, growth, and reach. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
`,
    },
  },
  '1000': {
    '1001': {
      pair: `
The Agent (1000) represents independence, will, and action. The Table (1001) represents gathering, consumption, and plots.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Agent (1000) represents independence, will, and action. The Table (1001) represents gathering, consumption, and plots. Result: The Agent (1000) represents independence, will, and action.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Agent (1000) represents independence, will, and action. The Table (1001) represents gathering, consumption, and plots. Result: The Table (1001) represents gathering, consumption, and plots.
`,
    },
    '1010': {
      pair: `
The Agent (1000) represents independence, will, and action. The Clone (1010) represents mirrors, reproduction, and equality.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Agent (1000) represents independence, will, and action. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Agent (1000) represents independence, will, and action.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Agent (1000) represents independence, will, and action. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Clone (1010) represents mirrors, reproduction, and equality.
`,
    },
    '1011': {
      pair: `
The Agent (1000) represents independence, will, and action. The Cache (1011) represents secrets, knowledge, and wealth.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Agent (1000) represents independence, will, and action. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Agent (1000) represents independence, will, and action.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Agent (1000) represents independence, will, and action. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Cache (1011) represents secrets, knowledge, and wealth.
`,
    },
    '1100': {
      pair: `
The Agent (1000) represents independence, will, and action. The Frame (1100) represents perspective, structure, and state of mind.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Agent (1000) represents independence, will, and action. The Frame (1100) represents perspective, structure, and state of mind. Result: The Agent (1000) represents independence, will, and action.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Agent (1000) represents independence, will, and action. The Frame (1100) represents perspective, structure, and state of mind. Result: The Frame (1100) represents perspective, structure, and state of mind.
`,
    },
    '1101': {
      pair: `
The Agent (1000) represents independence, will, and action. The Shell (1101) represents protection, boundaries, and rigidity.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Agent (1000) represents independence, will, and action. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Agent (1000) represents independence, will, and action.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Agent (1000) represents independence, will, and action. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Shell (1101) represents protection, boundaries, and rigidity.
`,
    },
    '1110': {
      pair: `
The Agent (1000) represents independence, will, and action. The Forum (1110) represents nobility, philosophy, and debate.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Agent (1000) represents independence, will, and action. The Forum (1110) represents nobility, philosophy, and debate. Result: The Agent (1000) represents independence, will, and action.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Agent (1000) represents independence, will, and action. The Forum (1110) represents nobility, philosophy, and debate. Result: The Forum (1110) represents nobility, philosophy, and debate.
`,
    },
    '1111': {
      pair: `
The Agent (1000) represents independence, will, and action. The State (1111) represents organization, authority, and politics.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Agent (1000) represents independence, will, and action. The State (1111) represents organization, authority, and politics. Result: The Agent (1000) represents independence, will, and action.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Agent (1000) represents independence, will, and action. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
`,
    },
  },
  '1001': {
    '1010': {
      pair: `
The Table (1001) represents gathering, consumption, and plots. The Clone (1010) represents mirrors, reproduction, and equality.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Table (1001) represents gathering, consumption, and plots. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Agent (1000) represents independence, will, and action.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Table (1001) represents gathering, consumption, and plots. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Cache (1011) represents secrets, knowledge, and wealth.
`,
    },
    '1011': {
      pair: `
The Table (1001) represents gathering, consumption, and plots. The Cache (1011) represents secrets, knowledge, and wealth.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Table (1001) represents gathering, consumption, and plots. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Table (1001) represents gathering, consumption, and plots.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Table (1001) represents gathering, consumption, and plots. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Cache (1011) represents secrets, knowledge, and wealth.
`,
    },
    '1100': {
      pair: `
The Table (1001) represents gathering, consumption, and plots. The Frame (1100) represents perspective, structure, and state of mind.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Table (1001) represents gathering, consumption, and plots. The Frame (1100) represents perspective, structure, and state of mind. Result: The Agent (1000) represents independence, will, and action.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Table (1001) represents gathering, consumption, and plots. The Frame (1100) represents perspective, structure, and state of mind. Result: The Shell (1101) represents protection, boundaries, and rigidity.
`,
    },
    '1101': {
      pair: `
The Table (1001) represents gathering, consumption, and plots. The Shell (1101) represents protection, boundaries, and rigidity.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Table (1001) represents gathering, consumption, and plots. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Table (1001) represents gathering, consumption, and plots.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Table (1001) represents gathering, consumption, and plots. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Shell (1101) represents protection, boundaries, and rigidity.
`,
    },
    '1110': {
      pair: `
The Table (1001) represents gathering, consumption, and plots. The Forum (1110) represents nobility, philosophy, and debate.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Table (1001) represents gathering, consumption, and plots. The Forum (1110) represents nobility, philosophy, and debate. Result: The Agent (1000) represents independence, will, and action.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Table (1001) represents gathering, consumption, and plots. The Forum (1110) represents nobility, philosophy, and debate. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1111': {
      pair: `
The Table (1001) represents gathering, consumption, and plots. The State (1111) represents organization, authority, and politics.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Table (1001) represents gathering, consumption, and plots. The State (1111) represents organization, authority, and politics. Result: The Table (1001) represents gathering, consumption, and plots.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Table (1001) represents gathering, consumption, and plots. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
`,
    },
  },
  '1010': {
    '1011': {
      pair: `
The Clone (1010) represents mirrors, reproduction, and equality. The Cache (1011) represents secrets, knowledge, and wealth.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Clone (1010) represents mirrors, reproduction, and equality. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Clone (1010) represents mirrors, reproduction, and equality.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Clone (1010) represents mirrors, reproduction, and equality. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Cache (1011) represents secrets, knowledge, and wealth.
`,
    },
    '1100': {
      pair: `
The Clone (1010) represents mirrors, reproduction, and equality. The Frame (1100) represents perspective, structure, and state of mind.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Clone (1010) represents mirrors, reproduction, and equality. The Frame (1100) represents perspective, structure, and state of mind. Result: The Agent (1000) represents independence, will, and action.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Clone (1010) represents mirrors, reproduction, and equality. The Frame (1100) represents perspective, structure, and state of mind. Result: The Forum (1110) represents nobility, philosophy, and debate.
`,
    },
    '1101': {
      pair: `
The Clone (1010) represents mirrors, reproduction, and equality. The Shell (1101) represents protection, boundaries, and rigidity.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Clone (1010) represents mirrors, reproduction, and equality. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Agent (1000) represents independence, will, and action.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Clone (1010) represents mirrors, reproduction, and equality. The Shell (1101) represents protection, boundaries, and rigidity. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1110': {
      pair: `
The Clone (1010) represents mirrors, reproduction, and equality. The Forum (1110) represents nobility, philosophy, and debate.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Clone (1010) represents mirrors, reproduction, and equality. The Forum (1110) represents nobility, philosophy, and debate. Result: The Clone (1010) represents mirrors, reproduction, and equality.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Clone (1010) represents mirrors, reproduction, and equality. The Forum (1110) represents nobility, philosophy, and debate. Result: The Forum (1110) represents nobility, philosophy, and debate.
`,
    },
    '1111': {
      pair: `
The Clone (1010) represents mirrors, reproduction, and equality. The State (1111) represents organization, authority, and politics.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Clone (1010) represents mirrors, reproduction, and equality. The State (1111) represents organization, authority, and politics. Result: The Clone (1010) represents mirrors, reproduction, and equality.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Clone (1010) represents mirrors, reproduction, and equality. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
`,
    },
  },
  '1011': {
    '1100': {
      pair: `
The Cache (1011) represents secrets, knowledge, and wealth. The Frame (1100) represents perspective, structure, and state of mind.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Cache (1011) represents secrets, knowledge, and wealth. The Frame (1100) represents perspective, structure, and state of mind. Result: The Agent (1000) represents independence, will, and action.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Cache (1011) represents secrets, knowledge, and wealth. The Frame (1100) represents perspective, structure, and state of mind. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1101': {
      pair: `
The Cache (1011) represents secrets, knowledge, and wealth. The Shell (1101) represents protection, boundaries, and rigidity.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Cache (1011) represents secrets, knowledge, and wealth. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Table (1001) represents gathering, consumption, and plots.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Cache (1011) represents secrets, knowledge, and wealth. The Shell (1101) represents protection, boundaries, and rigidity. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1110': {
      pair: `
The Cache (1011) represents secrets, knowledge, and wealth. The Forum (1110) represents nobility, philosophy, and debate.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Cache (1011) represents secrets, knowledge, and wealth. The Forum (1110) represents nobility, philosophy, and debate. Result: The Clone (1010) represents mirrors, reproduction, and equality.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Cache (1011) represents secrets, knowledge, and wealth. The Forum (1110) represents nobility, philosophy, and debate. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1111': {
      pair: `
The Cache (1011) represents secrets, knowledge, and wealth. The State (1111) represents organization, authority, and politics.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Cache (1011) represents secrets, knowledge, and wealth. The State (1111) represents organization, authority, and politics. Result: The Cache (1011) represents secrets, knowledge, and wealth.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Cache (1011) represents secrets, knowledge, and wealth. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
`,
    },
  },
  '1100': {
    '1101': {
      pair: `
The Frame (1100) represents perspective, structure, and state of mind. The Shell (1101) represents protection, boundaries, and rigidity.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Frame (1100) represents perspective, structure, and state of mind. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Frame (1100) represents perspective, structure, and state of mind.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Frame (1100) represents perspective, structure, and state of mind. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Shell (1101) represents protection, boundaries, and rigidity.
`,
    },
    '1110': {
      pair: `
The Frame (1100) represents perspective, structure, and state of mind. The Forum (1110) represents nobility, philosophy, and debate.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Frame (1100) represents perspective, structure, and state of mind. The Forum (1110) represents nobility, philosophy, and debate. Result: The Frame (1100) represents perspective, structure, and state of mind.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Frame (1100) represents perspective, structure, and state of mind. The Forum (1110) represents nobility, philosophy, and debate. Result: The Forum (1110) represents nobility, philosophy, and debate.
`,
    },
    '1111': {
      pair: `
The Frame (1100) represents perspective, structure, and state of mind. The State (1111) represents organization, authority, and politics.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Frame (1100) represents perspective, structure, and state of mind. The State (1111) represents organization, authority, and politics. Result: The Frame (1100) represents perspective, structure, and state of mind.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Frame (1100) represents perspective, structure, and state of mind. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
`,
    },
  },
  '1101': {
    '1110': {
      pair: `
The Shell (1101) represents protection, boundaries, and rigidity. The Forum (1110) represents nobility, philosophy, and debate.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Shell (1101) represents protection, boundaries, and rigidity. The Forum (1110) represents nobility, philosophy, and debate. Result: The Frame (1100) represents perspective, structure, and state of mind.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Shell (1101) represents protection, boundaries, and rigidity. The Forum (1110) represents nobility, philosophy, and debate. Result: The State (1111) represents organization, authority, and politics.
`,
    },
    '1111': {
      pair: `
The Shell (1101) represents protection, boundaries, and rigidity. The State (1111) represents organization, authority, and politics.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Shell (1101) represents protection, boundaries, and rigidity. The State (1111) represents organization, authority, and politics. Result: The Shell (1101) represents protection, boundaries, and rigidity.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Shell (1101) represents protection, boundaries, and rigidity. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
`,
    },
  },
  '1110': {
    '1111': {
      pair: `
The Forum (1110) represents nobility, philosophy, and debate. The State (1111) represents organization, authority, and politics.
`,
      AND: `
Viewed from the lens of AND, with differentiation and focus.  The Forum (1110) represents nobility, philosophy, and debate. The State (1111) represents organization, authority, and politics. Result: The Forum (1110) represents nobility, philosophy, and debate.
`,
      OR: `
Viewed from the lens of OR, with inclusivity and openness.  The Forum (1110) represents nobility, philosophy, and debate. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
`,
    },
  },
}


function arrOrderedBinaries(sLeftBinary: string, sRightBinary: string): [string, string] {
  const nLeft = parseInt(sLeftBinary, 2)
  const nRight = parseInt(sRightBinary, 2)
  return nLeft < nRight ? [sLeftBinary, sRightBinary] : [sRightBinary, sLeftBinary]
}

export function sPairReadingText(sLeftBinary: string, sRightBinary: string): string {
  const [sLow, sHigh] = arrOrderedBinaries(sLeftBinary, sRightBinary)
  return objReadingTexts[sLow]?.[sHigh]?.pair?.trim() ?? ''
}

export function sReadingText(sLeftBinary: string, sRightBinary: string, sOp: tOperator): string {
  const [sLow, sHigh] = arrOrderedBinaries(sLeftBinary, sRightBinary)
  return objReadingTexts[sLow]?.[sHigh]?.[sOp]?.trim() ?? ''
}

export type tCardLink = {
  sName: string
  sSlug: string
}

function sEscapeRegExp(sValue: string): string {
  return sValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function sLinkCardNames(sText: string, arrCardLinks: readonly tCardLink[]): string {
  if (arrCardLinks.length === 0) {
    return sText
  }

  const arrSorted = [...arrCardLinks].sort(
    (objA: tCardLink, objB: tCardLink) => objB.sName.length - objA.sName.length,
  )

  let sResult = sText
  for (const objCard of arrSorted) {
    const sName = sEscapeRegExp(objCard.sName)
    const objPattern = new RegExp(`\\b${sName}(?:\\s*\\([^)]*\\))?`, 'g')
    sResult = sResult.replace(
      objPattern,
      (sMatch: string) =>
        `<a class="reading-text-card" href="#card/${objCard.sSlug}">${sMatch}</a>`,
    )
  }
  return sResult
}

/** Post-process reading prose into HTML (styled lead, accent paragraph, final sentence, card links). */
export function sStyledReadingText(
  sText: string,
  arrCardLinks: readonly tCardLink[] = [],
  bSeparators = true,
): string {
  if (!sText) {
    return ''
  }

  const arrParagraphs = sText.split(/\n\n+/)

  const arrStyled = arrParagraphs.map((sParagraph: string, nIndex: number) => {
    let sResult = sParagraph

    if (nIndex === 0) {
      const objFirst = /^([^\s][^.!?]*)([.!?]["'\u201d\u2019]?)/.exec(sResult)
      if (objFirst) {
        const sFirst = `${objFirst[1]}${objFirst[2]}`
        sResult = `<strong class="reading-text-lead">${sFirst}</strong>${sResult.slice(sFirst.length).trimStart()}`
      }
    }

    if (nIndex === arrParagraphs.length - 1) {
      const objLast = /([^\s][^.!?]*)([.!?]["'\u201d\u2019]?)\s*$/.exec(sResult)
      if (objLast && objLast.index !== undefined) {
        const sLast = `${objLast[1]}${objLast[2]}`
        sResult =
          `${sResult.slice(0, objLast.index)}<strong>${sLast}</strong>${sResult.slice(objLast.index + sLast.length)}`
      }
    }

    if (nIndex === 1) {
      sResult = `<span class="reading-text-accent">${sResult}</span>`
    }

    return sLinkCardNames(sResult, arrCardLinks)
  })

  const sJoin = bSeparators
    ? '\n\n<span class="reading-text-sep" aria-hidden="true">✦✦</span>\n\n'
    : '\n\n'
  return arrStyled.join(sJoin)
}
