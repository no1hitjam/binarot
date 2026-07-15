export type tOperator = 'AND' | 'OR'

export type tOperatorTexts = {
  AND: string
  OR: string
}

export type tReadingTexts = {
  [sLeftBinary: string]: {
    [sRightBinary: string]: tOperatorTexts
  }
}

export const objReadingTexts: tReadingTexts = {
  '0': {
    '1': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Flag (1) represents claims, power, and sovereignty. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: Exploring origins before lines were drawn.
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Flag (1) represents claims, power, and sovereignty. Result: The Flag (1) represents claims, power, and sovereignty.
Reflection: Allowing a quiet beginning to assert its sovereignty.
`,
    },
    '10': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Call (10) represents summonings, duty, and serendipity. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: Meeting a sudden summons by tending to the quietest root.
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Call (10) represents summonings, duty, and serendipity. Result: The Call (10) represents summonings, duty, and serendipity.
Reflection: Allowing a quiet beginning to expand into its inevitable calling.
`,
    },
    '11': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Link (11) represents connections, promises, and security. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: Anchoring a promise to the origin where it first began.
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Link (11) represents connections, promises, and security. Result: The Link (11) represents connections, promises, and security.
Reflection: Allowing quiet beginnings to weave into secure connections.
`,
    },
    '100': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Host (100) represents shelter, ownership, and grace. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: Stripping away the sanctuary to reveal the raw spark that built it.
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Host (100) represents shelter, ownership, and grace. Result: The Host (100) represents shelter, ownership, and grace.
Reflection: Allowing a raw idea to expand into a sanctuary of grace.
`,
    },
    '101': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: Tracing a divided path back to the singular hunger that first set it in motion.
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Fork (101) represents hunger, resonance, and diverging paths.
Reflection: Opening up a blank canvas to the beginning of a thousand possible paths.
`,
    },
    '110': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Port (110) represents gateways, discovery, and trade. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: Returning home
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Port (110) represents gateways, discovery, and trade. Result: The Port (110) represents gateways, discovery, and trade.
Reflection: Setting sail with only an idea
`,
    },
    '111': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Tree (111) represents fullness, growth, and reach. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: Finding the original spark that lead to greatness
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Tree (111) represents fullness, growth, and reach. Result: The Tree (111) represents fullness, growth, and reach.
Reflection: 
`,
    },
    '1000': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Agent (1000) represents independence, will, and action. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: Giving an idea the space to branch into fullness.
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Agent (1000) represents independence, will, and action. Result: The Agent (1000) represents independence, will, and action.
Reflection: Meditating on the origins of one's will.
`,
    },
    '1001': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Table (1001) represents gathering, consumption, and plots. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: A group brainstorming to find an idea.
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Table (1001) represents gathering, consumption, and plots. Result: The Table (1001) represents gathering, consumption, and plots.
Reflection: An idea for a group date.
`,
    },
    '1010': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: Stripping away the copies to find the original.
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Clone (1010) represents mirrors, reproduction, and equality.
Reflection: The act of reproducing
`,
    },
    '1011': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: The hope of finding what's hidden.
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Reflection: Knowing where something is hidden.
`,
    },
    '1100': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Frame (1100) represents perspective, structure, and state of mind. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: Seeing the world from a child's perspective
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Frame (1100) represents perspective, structure, and state of mind. Result: The Frame (1100) represents perspective, structure, and state of mind.
Reflection: Growing into seeing the world from a new perspective
`,
    },
    '1101': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: Rejecting boundaries for one's ideas
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Reflection: Keeping your ideas safe
`,
    },
    '1110': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: Being the original person going against the grain.
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The Forum (1110) represents nobility, philosophy, and debate.
Reflection: Sharing one's ideas with the public
`,
    },
    '1111': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: Finding the original intents that went into our society.
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Reflection: How a child becomes a part of the adult world
`,
    },
  },
  '1': {
    '10': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Call (10) represents summonings, duty, and serendipity. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: Revoking someone's claim to something
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Call (10) represents summonings, duty, and serendipity. Result: The Link (11) represents connections, promises, and security.
Reflection: Two lands joined under a single promise
`,
    },
    '11': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Link (11) represents connections, promises, and security. Result: The Flag (1) represents claims, power, and sovereignty.
Reflection: The treaties between two powers
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Link (11) represents connections, promises, and security. Result: The Link (11) represents connections, promises, and security.
Reflection: Truths strengthen our connections
`,
    },
    '100': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Host (100) represents shelter, ownership, and grace. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: After a fall from power, being taken into shelter
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Host (100) represents shelter, ownership, and grace. Result: The Fork (101) represents hunger, resonance, and diverging paths.
Reflection: Buying a house only to want to roam instead
`,
    },
    '101': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Flag (1) represents claims, power, and sovereignty.
Reflection: Power leads to more power 
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Fork (101) represents hunger, resonance, and diverging paths.
Reflection: Power leads to the responsbility of making important choices
`,
    },
    '110': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Port (110) represents gateways, discovery, and trade. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: A gateway to a new world with someone else in charge
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Port (110) represents gateways, discovery, and trade. Result: The Tree (111) represents fullness, growth, and reach.
Reflection: Growing your business and power
`,
    },
    '111': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Tree (111) represents fullness, growth, and reach. Result: The Flag (1) represents claims, power, and sovereignty.
Reflection: The role of power in the successful growth of something
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Tree (111) represents fullness, growth, and reach. Result: The Tree (111) represents fullness, growth, and reach.
Reflection: The power of growth
`,
    },
    '1000': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Agent (1000) represents independence, will, and action. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: Undermining someone's power
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Agent (1000) represents independence, will, and action. Result: The Table (1001) represents gathering, consumption, and plots.
Reflection: Being pressured to negotiate
`,
    },
    '1001': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Table (1001) represents gathering, consumption, and plots. Result: The Flag (1) represents claims, power, and sovereignty.
Reflection: The power in a gathering of people
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Table (1001) represents gathering, consumption, and plots. Result: The Table (1001) represents gathering, consumption, and plots.
Reflection: Diffusing power to everyone at the table
`,
    },
    '1010': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: Eliminating pretenders to power
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Reflection: Faking it before you make it successfully
`,
    },
    '1011': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Flag (1) represents claims, power, and sovereignty.
Reflection: The power of secrets
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Reflection: Keeping one's power hidden
`,
    },
    '1100': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Frame (1100) represents perspective, structure, and state of mind. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: Something losing its power when seen from a different perspective
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Frame (1100) represents perspective, structure, and state of mind. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Reflection: 
`,
    },
    '1101': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Flag (1) represents claims, power, and sovereignty.
Reflection: 
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Reflection: 
`,
    },
    '1110': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: 
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1111': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Flag (1) represents claims, power, and sovereignty.
Reflection: 
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
  },
  '10': {
    '11': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The Link (11) represents connections, promises, and security. Result: The Call (10) represents summonings, duty, and serendipity.
Reflection: 
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The Link (11) represents connections, promises, and security. Result: The Link (11) represents connections, promises, and security.
Reflection: 
`,
    },
    '100': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The Host (100) represents shelter, ownership, and grace. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: 
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The Host (100) represents shelter, ownership, and grace. Result: The Port (110) represents gateways, discovery, and trade.
Reflection: 
`,
    },
    '101': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: 
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Tree (111) represents fullness, growth, and reach.
Reflection: 
`,
    },
    '110': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The Port (110) represents gateways, discovery, and trade. Result: The Call (10) represents summonings, duty, and serendipity.
Reflection: 
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The Port (110) represents gateways, discovery, and trade. Result: The Port (110) represents gateways, discovery, and trade.
Reflection: 
`,
    },
    '111': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The Tree (111) represents fullness, growth, and reach. Result: The Call (10) represents summonings, duty, and serendipity.
Reflection: 
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The Tree (111) represents fullness, growth, and reach. Result: The Tree (111) represents fullness, growth, and reach.
Reflection: 
`,
    },
    '1000': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The Agent (1000) represents independence, will, and action. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: 
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The Agent (1000) represents independence, will, and action. Result: The Clone (1010) represents mirrors, reproduction, and equality.
Reflection: 
`,
    },
    '1001': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The Table (1001) represents gathering, consumption, and plots. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: 
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The Table (1001) represents gathering, consumption, and plots. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Reflection: 
`,
    },
    '1010': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Call (10) represents summonings, duty, and serendipity.
Reflection: 
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Clone (1010) represents mirrors, reproduction, and equality.
Reflection: 
`,
    },
    '1011': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Call (10) represents summonings, duty, and serendipity.
Reflection: 
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Reflection: 
`,
    },
    '1100': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The Frame (1100) represents perspective, structure, and state of mind. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: 
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The Frame (1100) represents perspective, structure, and state of mind. Result: The Forum (1110) represents nobility, philosophy, and debate.
Reflection: 
`,
    },
    '1101': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: 
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1110': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Call (10) represents summonings, duty, and serendipity.
Reflection: 
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The Forum (1110) represents nobility, philosophy, and debate.
Reflection: 
`,
    },
    '1111': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Call (10) represents summonings, duty, and serendipity.
Reflection: 
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
  },
  '11': {
    '100': {
      AND: `
The Link (11) represents connections, promises, and security. The coin lands on AND, keeping only what both cards share. The Host (100) represents shelter, ownership, and grace. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: 
`,
      OR: `
The Link (11) represents connections, promises, and security. The coin lands on OR, keeping all both cards offer. The Host (100) represents shelter, ownership, and grace. Result: The Tree (111) represents fullness, growth, and reach.
Reflection: 
`,
    },
    '101': {
      AND: `
The Link (11) represents connections, promises, and security. The coin lands on AND, keeping only what both cards share. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Flag (1) represents claims, power, and sovereignty.
Reflection: 
`,
      OR: `
The Link (11) represents connections, promises, and security. The coin lands on OR, keeping all both cards offer. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Tree (111) represents fullness, growth, and reach.
Reflection: 
`,
    },
    '110': {
      AND: `
The Link (11) represents connections, promises, and security. The coin lands on AND, keeping only what both cards share. The Port (110) represents gateways, discovery, and trade. Result: The Call (10) represents summonings, duty, and serendipity.
Reflection: 
`,
      OR: `
The Link (11) represents connections, promises, and security. The coin lands on OR, keeping all both cards offer. The Port (110) represents gateways, discovery, and trade. Result: The Tree (111) represents fullness, growth, and reach.
Reflection: 
`,
    },
    '111': {
      AND: `
The Link (11) represents connections, promises, and security. The coin lands on AND, keeping only what both cards share. The Tree (111) represents fullness, growth, and reach. Result: The Link (11) represents connections, promises, and security.
Reflection: 
`,
      OR: `
The Link (11) represents connections, promises, and security. The coin lands on OR, keeping all both cards offer. The Tree (111) represents fullness, growth, and reach. Result: The Tree (111) represents fullness, growth, and reach.
Reflection: 
`,
    },
    '1000': {
      AND: `
The Link (11) represents connections, promises, and security. The coin lands on AND, keeping only what both cards share. The Agent (1000) represents independence, will, and action. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: 
`,
      OR: `
The Link (11) represents connections, promises, and security. The coin lands on OR, keeping all both cards offer. The Agent (1000) represents independence, will, and action. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Reflection: 
`,
    },
    '1001': {
      AND: `
The Link (11) represents connections, promises, and security. The coin lands on AND, keeping only what both cards share. The Table (1001) represents gathering, consumption, and plots. Result: The Flag (1) represents claims, power, and sovereignty.
Reflection: 
`,
      OR: `
The Link (11) represents connections, promises, and security. The coin lands on OR, keeping all both cards offer. The Table (1001) represents gathering, consumption, and plots. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Reflection: 
`,
    },
    '1010': {
      AND: `
The Link (11) represents connections, promises, and security. The coin lands on AND, keeping only what both cards share. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Call (10) represents summonings, duty, and serendipity.
Reflection: 
`,
      OR: `
The Link (11) represents connections, promises, and security. The coin lands on OR, keeping all both cards offer. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Reflection: 
`,
    },
    '1011': {
      AND: `
The Link (11) represents connections, promises, and security. The coin lands on AND, keeping only what both cards share. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Link (11) represents connections, promises, and security.
Reflection: 
`,
      OR: `
The Link (11) represents connections, promises, and security. The coin lands on OR, keeping all both cards offer. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Reflection: 
`,
    },
    '1100': {
      AND: `
The Link (11) represents connections, promises, and security. The coin lands on AND, keeping only what both cards share. The Frame (1100) represents perspective, structure, and state of mind. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: 
`,
      OR: `
The Link (11) represents connections, promises, and security. The coin lands on OR, keeping all both cards offer. The Frame (1100) represents perspective, structure, and state of mind. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1101': {
      AND: `
The Link (11) represents connections, promises, and security. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Flag (1) represents claims, power, and sovereignty.
Reflection: 
`,
      OR: `
The Link (11) represents connections, promises, and security. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1110': {
      AND: `
The Link (11) represents connections, promises, and security. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Call (10) represents summonings, duty, and serendipity.
Reflection: 
`,
      OR: `
The Link (11) represents connections, promises, and security. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1111': {
      AND: `
The Link (11) represents connections, promises, and security. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Link (11) represents connections, promises, and security.
Reflection: 
`,
      OR: `
The Link (11) represents connections, promises, and security. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
  },
  '100': {
    '101': {
      AND: `
The Host (100) represents shelter, ownership, and grace. The coin lands on AND, keeping only what both cards share. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Host (100) represents shelter, ownership, and grace.
Reflection: 
`,
      OR: `
The Host (100) represents shelter, ownership, and grace. The coin lands on OR, keeping all both cards offer. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Fork (101) represents hunger, resonance, and diverging paths.
Reflection: 
`,
    },
    '110': {
      AND: `
The Host (100) represents shelter, ownership, and grace. The coin lands on AND, keeping only what both cards share. The Port (110) represents gateways, discovery, and trade. Result: The Host (100) represents shelter, ownership, and grace.
Reflection: 
`,
      OR: `
The Host (100) represents shelter, ownership, and grace. The coin lands on OR, keeping all both cards offer. The Port (110) represents gateways, discovery, and trade. Result: The Port (110) represents gateways, discovery, and trade.
Reflection: 
`,
    },
    '111': {
      AND: `
The Host (100) represents shelter, ownership, and grace. The coin lands on AND, keeping only what both cards share. The Tree (111) represents fullness, growth, and reach. Result: The Host (100) represents shelter, ownership, and grace.
Reflection: 
`,
      OR: `
The Host (100) represents shelter, ownership, and grace. The coin lands on OR, keeping all both cards offer. The Tree (111) represents fullness, growth, and reach. Result: The Tree (111) represents fullness, growth, and reach.
Reflection: 
`,
    },
    '1000': {
      AND: `
The Host (100) represents shelter, ownership, and grace. The coin lands on AND, keeping only what both cards share. The Agent (1000) represents independence, will, and action. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: 
`,
      OR: `
The Host (100) represents shelter, ownership, and grace. The coin lands on OR, keeping all both cards offer. The Agent (1000) represents independence, will, and action. Result: The Frame (1100) represents perspective, structure, and state of mind.
Reflection: 
`,
    },
    '1001': {
      AND: `
The Host (100) represents shelter, ownership, and grace. The coin lands on AND, keeping only what both cards share. The Table (1001) represents gathering, consumption, and plots. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: 
`,
      OR: `
The Host (100) represents shelter, ownership, and grace. The coin lands on OR, keeping all both cards offer. The Table (1001) represents gathering, consumption, and plots. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Reflection: 
`,
    },
    '1010': {
      AND: `
The Host (100) represents shelter, ownership, and grace. The coin lands on AND, keeping only what both cards share. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: 
`,
      OR: `
The Host (100) represents shelter, ownership, and grace. The coin lands on OR, keeping all both cards offer. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Forum (1110) represents nobility, philosophy, and debate.
Reflection: 
`,
    },
    '1011': {
      AND: `
The Host (100) represents shelter, ownership, and grace. The coin lands on AND, keeping only what both cards share. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: 
`,
      OR: `
The Host (100) represents shelter, ownership, and grace. The coin lands on OR, keeping all both cards offer. The Cache (1011) represents secrets, knowledge, and wealth. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1100': {
      AND: `
The Host (100) represents shelter, ownership, and grace. The coin lands on AND, keeping only what both cards share. The Frame (1100) represents perspective, structure, and state of mind. Result: The Host (100) represents shelter, ownership, and grace.
Reflection: 
`,
      OR: `
The Host (100) represents shelter, ownership, and grace. The coin lands on OR, keeping all both cards offer. The Frame (1100) represents perspective, structure, and state of mind. Result: The Frame (1100) represents perspective, structure, and state of mind.
Reflection: 
`,
    },
    '1101': {
      AND: `
The Host (100) represents shelter, ownership, and grace. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Host (100) represents shelter, ownership, and grace.
Reflection: 
`,
      OR: `
The Host (100) represents shelter, ownership, and grace. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Reflection: 
`,
    },
    '1110': {
      AND: `
The Host (100) represents shelter, ownership, and grace. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Host (100) represents shelter, ownership, and grace.
Reflection: 
`,
      OR: `
The Host (100) represents shelter, ownership, and grace. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The Forum (1110) represents nobility, philosophy, and debate.
Reflection: 
`,
    },
    '1111': {
      AND: `
The Host (100) represents shelter, ownership, and grace. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Host (100) represents shelter, ownership, and grace.
Reflection: 
`,
      OR: `
The Host (100) represents shelter, ownership, and grace. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
  },
  '101': {
    '110': {
      AND: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on AND, keeping only what both cards share. The Port (110) represents gateways, discovery, and trade. Result: The Host (100) represents shelter, ownership, and grace.
Reflection: 
`,
      OR: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on OR, keeping all both cards offer. The Port (110) represents gateways, discovery, and trade. Result: The Tree (111) represents fullness, growth, and reach.
Reflection: 
`,
    },
    '111': {
      AND: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on AND, keeping only what both cards share. The Tree (111) represents fullness, growth, and reach. Result: The Fork (101) represents hunger, resonance, and diverging paths.
Reflection: 
`,
      OR: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on OR, keeping all both cards offer. The Tree (111) represents fullness, growth, and reach. Result: The Tree (111) represents fullness, growth, and reach.
Reflection: 
`,
    },
    '1000': {
      AND: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on AND, keeping only what both cards share. The Agent (1000) represents independence, will, and action. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: 
`,
      OR: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on OR, keeping all both cards offer. The Agent (1000) represents independence, will, and action. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Reflection: 
`,
    },
    '1001': {
      AND: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on AND, keeping only what both cards share. The Table (1001) represents gathering, consumption, and plots. Result: The Flag (1) represents claims, power, and sovereignty.
Reflection: 
`,
      OR: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on OR, keeping all both cards offer. The Table (1001) represents gathering, consumption, and plots. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Reflection: 
`,
    },
    '1010': {
      AND: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on AND, keeping only what both cards share. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: 
`,
      OR: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on OR, keeping all both cards offer. The Clone (1010) represents mirrors, reproduction, and equality. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1011': {
      AND: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on AND, keeping only what both cards share. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Flag (1) represents claims, power, and sovereignty.
Reflection: 
`,
      OR: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on OR, keeping all both cards offer. The Cache (1011) represents secrets, knowledge, and wealth. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1100': {
      AND: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on AND, keeping only what both cards share. The Frame (1100) represents perspective, structure, and state of mind. Result: The Host (100) represents shelter, ownership, and grace.
Reflection: 
`,
      OR: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on OR, keeping all both cards offer. The Frame (1100) represents perspective, structure, and state of mind. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Reflection: 
`,
    },
    '1101': {
      AND: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Fork (101) represents hunger, resonance, and diverging paths.
Reflection: 
`,
      OR: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Reflection: 
`,
    },
    '1110': {
      AND: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Host (100) represents shelter, ownership, and grace.
Reflection: 
`,
      OR: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1111': {
      AND: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Fork (101) represents hunger, resonance, and diverging paths.
Reflection: 
`,
      OR: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
  },
  '110': {
    '111': {
      AND: `
The Port (110) represents gateways, discovery, and trade. The coin lands on AND, keeping only what both cards share. The Tree (111) represents fullness, growth, and reach. Result: The Port (110) represents gateways, discovery, and trade.
Reflection: 
`,
      OR: `
The Port (110) represents gateways, discovery, and trade. The coin lands on OR, keeping all both cards offer. The Tree (111) represents fullness, growth, and reach. Result: The Tree (111) represents fullness, growth, and reach.
Reflection: 
`,
    },
    '1000': {
      AND: `
The Port (110) represents gateways, discovery, and trade. The coin lands on AND, keeping only what both cards share. The Agent (1000) represents independence, will, and action. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: 
`,
      OR: `
The Port (110) represents gateways, discovery, and trade. The coin lands on OR, keeping all both cards offer. The Agent (1000) represents independence, will, and action. Result: The Forum (1110) represents nobility, philosophy, and debate.
Reflection: 
`,
    },
    '1001': {
      AND: `
The Port (110) represents gateways, discovery, and trade. The coin lands on AND, keeping only what both cards share. The Table (1001) represents gathering, consumption, and plots. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: 
`,
      OR: `
The Port (110) represents gateways, discovery, and trade. The coin lands on OR, keeping all both cards offer. The Table (1001) represents gathering, consumption, and plots. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1010': {
      AND: `
The Port (110) represents gateways, discovery, and trade. The coin lands on AND, keeping only what both cards share. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Call (10) represents summonings, duty, and serendipity.
Reflection: 
`,
      OR: `
The Port (110) represents gateways, discovery, and trade. The coin lands on OR, keeping all both cards offer. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Forum (1110) represents nobility, philosophy, and debate.
Reflection: 
`,
    },
    '1011': {
      AND: `
The Port (110) represents gateways, discovery, and trade. The coin lands on AND, keeping only what both cards share. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Call (10) represents summonings, duty, and serendipity.
Reflection: 
`,
      OR: `
The Port (110) represents gateways, discovery, and trade. The coin lands on OR, keeping all both cards offer. The Cache (1011) represents secrets, knowledge, and wealth. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1100': {
      AND: `
The Port (110) represents gateways, discovery, and trade. The coin lands on AND, keeping only what both cards share. The Frame (1100) represents perspective, structure, and state of mind. Result: The Host (100) represents shelter, ownership, and grace.
Reflection: 
`,
      OR: `
The Port (110) represents gateways, discovery, and trade. The coin lands on OR, keeping all both cards offer. The Frame (1100) represents perspective, structure, and state of mind. Result: The Forum (1110) represents nobility, philosophy, and debate.
Reflection: 
`,
    },
    '1101': {
      AND: `
The Port (110) represents gateways, discovery, and trade. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Host (100) represents shelter, ownership, and grace.
Reflection: 
`,
      OR: `
The Port (110) represents gateways, discovery, and trade. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1110': {
      AND: `
The Port (110) represents gateways, discovery, and trade. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Port (110) represents gateways, discovery, and trade.
Reflection: 
`,
      OR: `
The Port (110) represents gateways, discovery, and trade. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The Forum (1110) represents nobility, philosophy, and debate.
Reflection: 
`,
    },
    '1111': {
      AND: `
The Port (110) represents gateways, discovery, and trade. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Port (110) represents gateways, discovery, and trade.
Reflection: 
`,
      OR: `
The Port (110) represents gateways, discovery, and trade. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
  },
  '111': {
    '1000': {
      AND: `
The Tree (111) represents fullness, growth, and reach. The coin lands on AND, keeping only what both cards share. The Agent (1000) represents independence, will, and action. Result: The Seed (0) represents beginnings, ideas, and origins.
Reflection: 
`,
      OR: `
The Tree (111) represents fullness, growth, and reach. The coin lands on OR, keeping all both cards offer. The Agent (1000) represents independence, will, and action. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1001': {
      AND: `
The Tree (111) represents fullness, growth, and reach. The coin lands on AND, keeping only what both cards share. The Table (1001) represents gathering, consumption, and plots. Result: The Flag (1) represents claims, power, and sovereignty.
Reflection: 
`,
      OR: `
The Tree (111) represents fullness, growth, and reach. The coin lands on OR, keeping all both cards offer. The Table (1001) represents gathering, consumption, and plots. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1010': {
      AND: `
The Tree (111) represents fullness, growth, and reach. The coin lands on AND, keeping only what both cards share. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Call (10) represents summonings, duty, and serendipity.
Reflection: 
`,
      OR: `
The Tree (111) represents fullness, growth, and reach. The coin lands on OR, keeping all both cards offer. The Clone (1010) represents mirrors, reproduction, and equality. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1011': {
      AND: `
The Tree (111) represents fullness, growth, and reach. The coin lands on AND, keeping only what both cards share. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Link (11) represents connections, promises, and security.
Reflection: 
`,
      OR: `
The Tree (111) represents fullness, growth, and reach. The coin lands on OR, keeping all both cards offer. The Cache (1011) represents secrets, knowledge, and wealth. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1100': {
      AND: `
The Tree (111) represents fullness, growth, and reach. The coin lands on AND, keeping only what both cards share. The Frame (1100) represents perspective, structure, and state of mind. Result: The Host (100) represents shelter, ownership, and grace.
Reflection: 
`,
      OR: `
The Tree (111) represents fullness, growth, and reach. The coin lands on OR, keeping all both cards offer. The Frame (1100) represents perspective, structure, and state of mind. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1101': {
      AND: `
The Tree (111) represents fullness, growth, and reach. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Fork (101) represents hunger, resonance, and diverging paths.
Reflection: 
`,
      OR: `
The Tree (111) represents fullness, growth, and reach. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1110': {
      AND: `
The Tree (111) represents fullness, growth, and reach. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Port (110) represents gateways, discovery, and trade.
Reflection: 
`,
      OR: `
The Tree (111) represents fullness, growth, and reach. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1111': {
      AND: `
The Tree (111) represents fullness, growth, and reach. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Tree (111) represents fullness, growth, and reach.
Reflection: 
`,
      OR: `
The Tree (111) represents fullness, growth, and reach. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
  },
  '1000': {
    '1001': {
      AND: `
The Agent (1000) represents independence, will, and action. The coin lands on AND, keeping only what both cards share. The Table (1001) represents gathering, consumption, and plots. Result: The Agent (1000) represents independence, will, and action.
Reflection: 
`,
      OR: `
The Agent (1000) represents independence, will, and action. The coin lands on OR, keeping all both cards offer. The Table (1001) represents gathering, consumption, and plots. Result: The Table (1001) represents gathering, consumption, and plots.
Reflection: 
`,
    },
    '1010': {
      AND: `
The Agent (1000) represents independence, will, and action. The coin lands on AND, keeping only what both cards share. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Agent (1000) represents independence, will, and action.
Reflection: 
`,
      OR: `
The Agent (1000) represents independence, will, and action. The coin lands on OR, keeping all both cards offer. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Clone (1010) represents mirrors, reproduction, and equality.
Reflection: 
`,
    },
    '1011': {
      AND: `
The Agent (1000) represents independence, will, and action. The coin lands on AND, keeping only what both cards share. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Agent (1000) represents independence, will, and action.
Reflection: 
`,
      OR: `
The Agent (1000) represents independence, will, and action. The coin lands on OR, keeping all both cards offer. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Reflection: 
`,
    },
    '1100': {
      AND: `
The Agent (1000) represents independence, will, and action. The coin lands on AND, keeping only what both cards share. The Frame (1100) represents perspective, structure, and state of mind. Result: The Agent (1000) represents independence, will, and action.
Reflection: 
`,
      OR: `
The Agent (1000) represents independence, will, and action. The coin lands on OR, keeping all both cards offer. The Frame (1100) represents perspective, structure, and state of mind. Result: The Frame (1100) represents perspective, structure, and state of mind.
Reflection: 
`,
    },
    '1101': {
      AND: `
The Agent (1000) represents independence, will, and action. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Agent (1000) represents independence, will, and action.
Reflection: 
`,
      OR: `
The Agent (1000) represents independence, will, and action. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Reflection: 
`,
    },
    '1110': {
      AND: `
The Agent (1000) represents independence, will, and action. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Agent (1000) represents independence, will, and action.
Reflection: 
`,
      OR: `
The Agent (1000) represents independence, will, and action. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The Forum (1110) represents nobility, philosophy, and debate.
Reflection: 
`,
    },
    '1111': {
      AND: `
The Agent (1000) represents independence, will, and action. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Agent (1000) represents independence, will, and action.
Reflection: 
`,
      OR: `
The Agent (1000) represents independence, will, and action. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
  },
  '1001': {
    '1010': {
      AND: `
The Table (1001) represents gathering, consumption, and plots. The coin lands on AND, keeping only what both cards share. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Agent (1000) represents independence, will, and action.
Reflection: 
`,
      OR: `
The Table (1001) represents gathering, consumption, and plots. The coin lands on OR, keeping all both cards offer. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Reflection: 
`,
    },
    '1011': {
      AND: `
The Table (1001) represents gathering, consumption, and plots. The coin lands on AND, keeping only what both cards share. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Table (1001) represents gathering, consumption, and plots.
Reflection: 
`,
      OR: `
The Table (1001) represents gathering, consumption, and plots. The coin lands on OR, keeping all both cards offer. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Reflection: 
`,
    },
    '1100': {
      AND: `
The Table (1001) represents gathering, consumption, and plots. The coin lands on AND, keeping only what both cards share. The Frame (1100) represents perspective, structure, and state of mind. Result: The Agent (1000) represents independence, will, and action.
Reflection: 
`,
      OR: `
The Table (1001) represents gathering, consumption, and plots. The coin lands on OR, keeping all both cards offer. The Frame (1100) represents perspective, structure, and state of mind. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Reflection: 
`,
    },
    '1101': {
      AND: `
The Table (1001) represents gathering, consumption, and plots. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Table (1001) represents gathering, consumption, and plots.
Reflection: 
`,
      OR: `
The Table (1001) represents gathering, consumption, and plots. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Reflection: 
`,
    },
    '1110': {
      AND: `
The Table (1001) represents gathering, consumption, and plots. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Agent (1000) represents independence, will, and action.
Reflection: 
`,
      OR: `
The Table (1001) represents gathering, consumption, and plots. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1111': {
      AND: `
The Table (1001) represents gathering, consumption, and plots. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Table (1001) represents gathering, consumption, and plots.
Reflection: 
`,
      OR: `
The Table (1001) represents gathering, consumption, and plots. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
  },
  '1010': {
    '1011': {
      AND: `
The Clone (1010) represents mirrors, reproduction, and equality. The coin lands on AND, keeping only what both cards share. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Clone (1010) represents mirrors, reproduction, and equality.
Reflection: 
`,
      OR: `
The Clone (1010) represents mirrors, reproduction, and equality. The coin lands on OR, keeping all both cards offer. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Reflection: 
`,
    },
    '1100': {
      AND: `
The Clone (1010) represents mirrors, reproduction, and equality. The coin lands on AND, keeping only what both cards share. The Frame (1100) represents perspective, structure, and state of mind. Result: The Agent (1000) represents independence, will, and action.
Reflection: 
`,
      OR: `
The Clone (1010) represents mirrors, reproduction, and equality. The coin lands on OR, keeping all both cards offer. The Frame (1100) represents perspective, structure, and state of mind. Result: The Forum (1110) represents nobility, philosophy, and debate.
Reflection: 
`,
    },
    '1101': {
      AND: `
The Clone (1010) represents mirrors, reproduction, and equality. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Agent (1000) represents independence, will, and action.
Reflection: 
`,
      OR: `
The Clone (1010) represents mirrors, reproduction, and equality. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1110': {
      AND: `
The Clone (1010) represents mirrors, reproduction, and equality. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Clone (1010) represents mirrors, reproduction, and equality.
Reflection: 
`,
      OR: `
The Clone (1010) represents mirrors, reproduction, and equality. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The Forum (1110) represents nobility, philosophy, and debate.
Reflection: 
`,
    },
    '1111': {
      AND: `
The Clone (1010) represents mirrors, reproduction, and equality. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Clone (1010) represents mirrors, reproduction, and equality.
Reflection: 
`,
      OR: `
The Clone (1010) represents mirrors, reproduction, and equality. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
  },
  '1011': {
    '1100': {
      AND: `
The Cache (1011) represents secrets, knowledge, and wealth. The coin lands on AND, keeping only what both cards share. The Frame (1100) represents perspective, structure, and state of mind. Result: The Agent (1000) represents independence, will, and action.
Reflection: 
`,
      OR: `
The Cache (1011) represents secrets, knowledge, and wealth. The coin lands on OR, keeping all both cards offer. The Frame (1100) represents perspective, structure, and state of mind. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1101': {
      AND: `
The Cache (1011) represents secrets, knowledge, and wealth. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Table (1001) represents gathering, consumption, and plots.
Reflection: 
`,
      OR: `
The Cache (1011) represents secrets, knowledge, and wealth. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1110': {
      AND: `
The Cache (1011) represents secrets, knowledge, and wealth. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Clone (1010) represents mirrors, reproduction, and equality.
Reflection: 
`,
      OR: `
The Cache (1011) represents secrets, knowledge, and wealth. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1111': {
      AND: `
The Cache (1011) represents secrets, knowledge, and wealth. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Reflection: 
`,
      OR: `
The Cache (1011) represents secrets, knowledge, and wealth. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
  },
  '1100': {
    '1101': {
      AND: `
The Frame (1100) represents perspective, structure, and state of mind. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Frame (1100) represents perspective, structure, and state of mind.
Reflection: 
`,
      OR: `
The Frame (1100) represents perspective, structure, and state of mind. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Reflection: 
`,
    },
    '1110': {
      AND: `
The Frame (1100) represents perspective, structure, and state of mind. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Frame (1100) represents perspective, structure, and state of mind.
Reflection: 
`,
      OR: `
The Frame (1100) represents perspective, structure, and state of mind. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The Forum (1110) represents nobility, philosophy, and debate.
Reflection: 
`,
    },
    '1111': {
      AND: `
The Frame (1100) represents perspective, structure, and state of mind. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Frame (1100) represents perspective, structure, and state of mind.
Reflection: 
`,
      OR: `
The Frame (1100) represents perspective, structure, and state of mind. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
  },
  '1101': {
    '1110': {
      AND: `
The Shell (1101) represents protection, boundaries, and rigidity. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Frame (1100) represents perspective, structure, and state of mind.
Reflection: 
`,
      OR: `
The Shell (1101) represents protection, boundaries, and rigidity. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
    '1111': {
      AND: `
The Shell (1101) represents protection, boundaries, and rigidity. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Reflection: 
`,
      OR: `
The Shell (1101) represents protection, boundaries, and rigidity. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
  },
  '1110': {
    '1111': {
      AND: `
The Forum (1110) represents nobility, philosophy, and debate. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Forum (1110) represents nobility, philosophy, and debate.
Reflection: 
`,
      OR: `
The Forum (1110) represents nobility, philosophy, and debate. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Reflection: 
`,
    },
  },
}


export function sReadingText(sLeftBinary: string, sRightBinary: string, sOp: tOperator): string {
  const nLeft = parseInt(sLeftBinary, 2)
  const nRight = parseInt(sRightBinary, 2)
  const sLow = nLeft < nRight ? sLeftBinary : sRightBinary
  const sHigh = nLeft < nRight ? sRightBinary : sLeftBinary
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
