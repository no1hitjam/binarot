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
Explain how The Seed (0) excludes The Flag (1)
Reflection: Competing ideas
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Flag (1) represents claims, power, and sovereignty. Result: The Flag (1) represents claims, power, and sovereignty.
Explain how The Flag (1) subsumes The Seed (0)
Reflection:
`,
    },
    '10': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Call (10) represents summonings, duty, and serendipity. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) excludes The Call (10)
Reflection:
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Call (10) represents summonings, duty, and serendipity. Result: The Call (10) represents summonings, duty, and serendipity.
Explain how The Call (10) subsumes The Seed (0)
Reflection:
`,
    },
    '11': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Link (11) represents connections, promises, and security. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) excludes The Link (11)
Reflection:
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Link (11) represents connections, promises, and security. Result: The Link (11) represents connections, promises, and security.
Explain how The Link (11) subsumes The Seed (0)
Reflection:
`,
    },
    '100': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Host (100) represents shelter, ownership, and grace. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) excludes The Host (100)
Reflection:
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Host (100) represents shelter, ownership, and grace. Result: The Host (100) represents shelter, ownership, and grace.
Explain how The Host (100) subsumes The Seed (0)
Reflection:
`,
    },
    '101': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) excludes The Fork (101)
Reflection:
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Fork (101) represents hunger, resonance, and diverging paths.
Explain how The Fork (101) subsumes The Seed (0)
Reflection: The first fork in the road
`,
    },
    '110': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Port (110) represents gateways, discovery, and trade. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) excludes The Port (110)
Reflection: Returning home
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Port (110) represents gateways, discovery, and trade. Result: The Port (110) represents gateways, discovery, and trade.
Explain how The Port (110) subsumes The Seed (0)
Reflection: Setting sail with only an idea
`,
    },
    '111': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Tree (111) represents fullness, growth, and reach. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) excludes The Tree (111)
Reflection: Finding the original spark that lead to greatness
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Tree (111) represents fullness, growth, and reach. Result: The Tree (111) represents fullness, growth, and reach.
Explain how The Tree (111) subsumes The Seed (0)
Reflection:
`,
    },
    '1000': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Agent (1000) represents independence, will, and action. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) excludes The Agent (1000)
Reflection: Giving an idea the space to branch into fullness.
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Agent (1000) represents independence, will, and action. Result: The Agent (1000) represents independence, will, and action.
Explain how The Agent (1000) subsumes The Seed (0)
Reflection: Meditating on the origins of one's will.
`,
    },
    '1001': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Table (1001) represents gathering, consumption, and plots. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) excludes The Table (1001)
Reflection: A group brainstorming to find an idea.
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Table (1001) represents gathering, consumption, and plots. Result: The Table (1001) represents gathering, consumption, and plots.
Explain how The Table (1001) subsumes The Seed (0)
Reflection: An idea for a group date.
`,
    },
    '1010': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) excludes The Clone (1010)
Reflection: Stripping away the copies to find the original.
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Clone (1010) represents mirrors, reproduction, and equality.
Explain how The Clone (1010) subsumes The Seed (0)
Reflection: The act of reproducing
`,
    },
    '1011': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) excludes The Cache (1011)
Reflection: The hope of finding what's hidden.
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Explain how The Cache (1011) subsumes The Seed (0)
Reflection: Knowing where something is hidden.
`,
    },
    '1100': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Frame (1100) represents perspective, structure, and state of mind. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) excludes The Frame (1100)
Reflection: Seeing the world from a child's perspective
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Frame (1100) represents perspective, structure, and state of mind. Result: The Frame (1100) represents perspective, structure, and state of mind.
Explain how The Frame (1100) subsumes The Seed (0)
Reflection: Growing into seeing the world from a new perspective
`,
    },
    '1101': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) excludes The Shell (1101)
Reflection: Rejecting boundaries for one's ideas
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Explain how The Shell (1101) subsumes The Seed (0)
Reflection: Keeping your ideas safe
`,
    },
    '1110': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) excludes The Forum (1110)
Reflection: Being the original person going against the grain.
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The Forum (1110) represents nobility, philosophy, and debate.
Explain how The Forum (1110) subsumes The Seed (0)
Reflection: Sharing one's ideas with the public
`,
    },
    '1111': {
      AND: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) excludes The State (1111)
Reflection: Finding the original intents that went into our society.
`,
      OR: `
The Seed (0) represents beginnings, ideas, and origins. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Seed (0)
Reflection: How a child becomes a part of the adult world
`,
    },
  },
  '1': {
    '10': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Call (10) represents summonings, duty, and serendipity. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Flag (1) and The Call (10)
Reflection: Revoking someone's claim to something
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Call (10) represents summonings, duty, and serendipity. Result: The Link (11) represents connections, promises, and security.
Explain how The Link (11) subsumes The Flag (1) and The Call (10)
Reflection: Two lands joined under a single promise
`,
    },
    '11': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Link (11) represents connections, promises, and security. Result: The Flag (1) represents claims, power, and sovereignty.
Explain how The Flag (1) excludes The Link (11)
Reflection: The treaties between two powers
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Link (11) represents connections, promises, and security. Result: The Link (11) represents connections, promises, and security.
Explain how The Link (11) subsumes The Flag (1)
Reflection: Truths strengthen our connections
`,
    },
    '100': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Host (100) represents shelter, ownership, and grace. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Flag (1) and The Host (100)
Reflection: After a fall from power, being taken into shelter
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Host (100) represents shelter, ownership, and grace. Result: The Fork (101) represents hunger, resonance, and diverging paths.
Explain how The Fork (101) subsumes The Flag (1) and The Host (100)
Reflection: Buying a house only to want to roam instead
`,
    },
    '101': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Flag (1) represents claims, power, and sovereignty.
Explain how The Flag (1) excludes The Fork (101)
Reflection: Power leads to more power
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Fork (101) represents hunger, resonance, and diverging paths.
Explain how The Fork (101) subsumes The Flag (1)
Reflection: Power leads to the responsbility of making important choices
`,
    },
    '110': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Port (110) represents gateways, discovery, and trade. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Flag (1) and The Port (110)
Reflection: A gateway to a new world with someone else in charge
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Port (110) represents gateways, discovery, and trade. Result: The Tree (111) represents fullness, growth, and reach.
Explain how The Tree (111) subsumes The Flag (1) and The Port (110)
Reflection: Growing your business and power
`,
    },
    '111': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Tree (111) represents fullness, growth, and reach. Result: The Flag (1) represents claims, power, and sovereignty.
Explain how The Flag (1) excludes The Tree (111)
Reflection: The role of power in the successful growth of something
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Tree (111) represents fullness, growth, and reach. Result: The Tree (111) represents fullness, growth, and reach.
Explain how The Tree (111) subsumes The Flag (1)
Reflection: The power of growth
`,
    },
    '1000': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Agent (1000) represents independence, will, and action. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Flag (1) and The Agent (1000)
Reflection: Undermining someone's power
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Agent (1000) represents independence, will, and action. Result: The Table (1001) represents gathering, consumption, and plots.
Explain how The Table (1001) subsumes The Flag (1) and The Agent (1000)
Reflection: Being pressured to negotiate
`,
    },
    '1001': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Table (1001) represents gathering, consumption, and plots. Result: The Flag (1) represents claims, power, and sovereignty.
Explain how The Flag (1) excludes The Table (1001)
Reflection: The power in a gathering of people
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Table (1001) represents gathering, consumption, and plots. Result: The Table (1001) represents gathering, consumption, and plots.
Explain how The Table (1001) subsumes The Flag (1)
Reflection: Diffusing power to everyone at the table
`,
    },
    '1010': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Flag (1) and The Clone (1010)
Reflection: Eliminating pretenders to power
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Explain how The Cache (1011) subsumes The Flag (1) and The Clone (1010)
Reflection: Faking it before you make it successfully
`,
    },
    '1011': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Flag (1) represents claims, power, and sovereignty.
Explain how The Flag (1) excludes The Cache (1011)
Reflection: The power of secrets
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Explain how The Cache (1011) subsumes The Flag (1)
Reflection: Keeping one's power hidden
`,
    },
    '1100': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Frame (1100) represents perspective, structure, and state of mind. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Flag (1) and The Frame (1100)
Reflection: Something losing its power when seen from a different perspective
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Frame (1100) represents perspective, structure, and state of mind. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Explain how The Shell (1101) subsumes The Flag (1) and The Frame (1100)
Reflection:
`,
    },
    '1101': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Flag (1) represents claims, power, and sovereignty.
Explain how The Flag (1) excludes The Shell (1101)
Reflection:
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Explain how The Shell (1101) subsumes The Flag (1)
Reflection:
`,
    },
    '1110': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Flag (1) and The Forum (1110)
Reflection:
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Flag (1) and The Forum (1110)
Reflection:
`,
    },
    '1111': {
      AND: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Flag (1) represents claims, power, and sovereignty.
Explain how The Flag (1) excludes The State (1111)
Reflection:
`,
      OR: `
The Flag (1) represents claims, power, and sovereignty. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Flag (1)
Reflection:
`,
    },
  },
  '10': {
    '11': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The Link (11) represents connections, promises, and security. Result: The Call (10) represents summonings, duty, and serendipity.
Explain how The Call (10) excludes The Link (11)
Reflection:
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The Link (11) represents connections, promises, and security. Result: The Link (11) represents connections, promises, and security.
Explain how The Link (11) subsumes The Call (10)
Reflection:
`,
    },
    '100': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The Host (100) represents shelter, ownership, and grace. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Call (10) and The Host (100)
Reflection:
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The Host (100) represents shelter, ownership, and grace. Result: The Port (110) represents gateways, discovery, and trade.
Explain how The Port (110) subsumes The Call (10) and The Host (100)
Reflection:
`,
    },
    '101': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Call (10) and The Fork (101)
Reflection:
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Tree (111) represents fullness, growth, and reach.
Explain how The Tree (111) subsumes The Call (10) and The Fork (101)
Reflection:
`,
    },
    '110': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The Port (110) represents gateways, discovery, and trade. Result: The Call (10) represents summonings, duty, and serendipity.
Explain how The Call (10) excludes The Port (110)
Reflection:
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The Port (110) represents gateways, discovery, and trade. Result: The Port (110) represents gateways, discovery, and trade.
Explain how The Port (110) subsumes The Call (10)
Reflection:
`,
    },
    '111': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The Tree (111) represents fullness, growth, and reach. Result: The Call (10) represents summonings, duty, and serendipity.
Explain how The Call (10) excludes The Tree (111)
Reflection:
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The Tree (111) represents fullness, growth, and reach. Result: The Tree (111) represents fullness, growth, and reach.
Explain how The Tree (111) subsumes The Call (10)
Reflection:
`,
    },
    '1000': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The Agent (1000) represents independence, will, and action. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Call (10) and The Agent (1000)
Reflection:
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The Agent (1000) represents independence, will, and action. Result: The Clone (1010) represents mirrors, reproduction, and equality.
Explain how The Clone (1010) subsumes The Call (10) and The Agent (1000)
Reflection:
`,
    },
    '1001': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The Table (1001) represents gathering, consumption, and plots. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Call (10) and The Table (1001)
Reflection:
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The Table (1001) represents gathering, consumption, and plots. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Explain how The Cache (1011) subsumes The Call (10) and The Table (1001)
Reflection:
`,
    },
    '1010': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Call (10) represents summonings, duty, and serendipity.
Explain how The Call (10) excludes The Clone (1010)
Reflection:
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Clone (1010) represents mirrors, reproduction, and equality.
Explain how The Clone (1010) subsumes The Call (10)
Reflection:
`,
    },
    '1011': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Call (10) represents summonings, duty, and serendipity.
Explain how The Call (10) excludes The Cache (1011)
Reflection:
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Explain how The Cache (1011) subsumes The Call (10)
Reflection:
`,
    },
    '1100': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The Frame (1100) represents perspective, structure, and state of mind. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Call (10) and The Frame (1100)
Reflection:
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The Frame (1100) represents perspective, structure, and state of mind. Result: The Forum (1110) represents nobility, philosophy, and debate.
Explain how The Forum (1110) subsumes The Call (10) and The Frame (1100)
Reflection:
`,
    },
    '1101': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Call (10) and The Shell (1101)
Reflection:
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Call (10) and The Shell (1101)
Reflection:
`,
    },
    '1110': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Call (10) represents summonings, duty, and serendipity.
Explain how The Call (10) excludes The Forum (1110)
Reflection:
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The Forum (1110) represents nobility, philosophy, and debate.
Explain how The Forum (1110) subsumes The Call (10)
Reflection:
`,
    },
    '1111': {
      AND: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Call (10) represents summonings, duty, and serendipity.
Explain how The Call (10) excludes The State (1111)
Reflection:
`,
      OR: `
The Call (10) represents summonings, duty, and serendipity. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Call (10)
Reflection:
`,
    },
  },
  '11': {
    '100': {
      AND: `
The Link (11) represents connections, promises, and security. The coin lands on AND, keeping only what both cards share. The Host (100) represents shelter, ownership, and grace. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Link (11) and The Host (100)
Reflection:
`,
      OR: `
The Link (11) represents connections, promises, and security. The coin lands on OR, keeping all both cards offer. The Host (100) represents shelter, ownership, and grace. Result: The Tree (111) represents fullness, growth, and reach.
Explain how The Tree (111) subsumes The Link (11) and The Host (100)
Reflection:
`,
    },
    '101': {
      AND: `
The Link (11) represents connections, promises, and security. The coin lands on AND, keeping only what both cards share. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Flag (1) represents claims, power, and sovereignty.
Explain how The Flag (1) is the intersection of The Link (11) and The Fork (101)
Reflection:
`,
      OR: `
The Link (11) represents connections, promises, and security. The coin lands on OR, keeping all both cards offer. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Tree (111) represents fullness, growth, and reach.
Explain how The Tree (111) subsumes The Link (11) and The Fork (101)
Reflection:
`,
    },
    '110': {
      AND: `
The Link (11) represents connections, promises, and security. The coin lands on AND, keeping only what both cards share. The Port (110) represents gateways, discovery, and trade. Result: The Call (10) represents summonings, duty, and serendipity.
Explain how The Call (10) is the intersection of The Link (11) and The Port (110)
Reflection:
`,
      OR: `
The Link (11) represents connections, promises, and security. The coin lands on OR, keeping all both cards offer. The Port (110) represents gateways, discovery, and trade. Result: The Tree (111) represents fullness, growth, and reach.
Explain how The Tree (111) subsumes The Link (11) and The Port (110)
Reflection:
`,
    },
    '111': {
      AND: `
The Link (11) represents connections, promises, and security. The coin lands on AND, keeping only what both cards share. The Tree (111) represents fullness, growth, and reach. Result: The Link (11) represents connections, promises, and security.
Explain how The Link (11) excludes The Tree (111)
Reflection:
`,
      OR: `
The Link (11) represents connections, promises, and security. The coin lands on OR, keeping all both cards offer. The Tree (111) represents fullness, growth, and reach. Result: The Tree (111) represents fullness, growth, and reach.
Explain how The Tree (111) subsumes The Link (11)
Reflection:
`,
    },
    '1000': {
      AND: `
The Link (11) represents connections, promises, and security. The coin lands on AND, keeping only what both cards share. The Agent (1000) represents independence, will, and action. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Link (11) and The Agent (1000)
Reflection:
`,
      OR: `
The Link (11) represents connections, promises, and security. The coin lands on OR, keeping all both cards offer. The Agent (1000) represents independence, will, and action. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Explain how The Cache (1011) subsumes The Link (11) and The Agent (1000)
Reflection:
`,
    },
    '1001': {
      AND: `
The Link (11) represents connections, promises, and security. The coin lands on AND, keeping only what both cards share. The Table (1001) represents gathering, consumption, and plots. Result: The Flag (1) represents claims, power, and sovereignty.
Explain how The Flag (1) is the intersection of The Link (11) and The Table (1001)
Reflection:
`,
      OR: `
The Link (11) represents connections, promises, and security. The coin lands on OR, keeping all both cards offer. The Table (1001) represents gathering, consumption, and plots. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Explain how The Cache (1011) subsumes The Link (11) and The Table (1001)
Reflection:
`,
    },
    '1010': {
      AND: `
The Link (11) represents connections, promises, and security. The coin lands on AND, keeping only what both cards share. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Call (10) represents summonings, duty, and serendipity.
Explain how The Call (10) is the intersection of The Link (11) and The Clone (1010)
Reflection:
`,
      OR: `
The Link (11) represents connections, promises, and security. The coin lands on OR, keeping all both cards offer. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Explain how The Cache (1011) subsumes The Link (11) and The Clone (1010)
Reflection:
`,
    },
    '1011': {
      AND: `
The Link (11) represents connections, promises, and security. The coin lands on AND, keeping only what both cards share. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Link (11) represents connections, promises, and security.
Explain how The Link (11) excludes The Cache (1011)
Reflection:
`,
      OR: `
The Link (11) represents connections, promises, and security. The coin lands on OR, keeping all both cards offer. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Explain how The Cache (1011) subsumes The Link (11)
Reflection:
`,
    },
    '1100': {
      AND: `
The Link (11) represents connections, promises, and security. The coin lands on AND, keeping only what both cards share. The Frame (1100) represents perspective, structure, and state of mind. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Link (11) and The Frame (1100)
Reflection:
`,
      OR: `
The Link (11) represents connections, promises, and security. The coin lands on OR, keeping all both cards offer. The Frame (1100) represents perspective, structure, and state of mind. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Link (11) and The Frame (1100)
Reflection:
`,
    },
    '1101': {
      AND: `
The Link (11) represents connections, promises, and security. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Flag (1) represents claims, power, and sovereignty.
Explain how The Flag (1) is the intersection of The Link (11) and The Shell (1101)
Reflection:
`,
      OR: `
The Link (11) represents connections, promises, and security. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Link (11) and The Shell (1101)
Reflection:
`,
    },
    '1110': {
      AND: `
The Link (11) represents connections, promises, and security. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Call (10) represents summonings, duty, and serendipity.
Explain how The Call (10) is the intersection of The Link (11) and The Forum (1110)
Reflection:
`,
      OR: `
The Link (11) represents connections, promises, and security. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Link (11) and The Forum (1110)
Reflection:
`,
    },
    '1111': {
      AND: `
The Link (11) represents connections, promises, and security. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Link (11) represents connections, promises, and security.
Explain how The Link (11) excludes The State (1111)
Reflection:
`,
      OR: `
The Link (11) represents connections, promises, and security. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Link (11)
Reflection:
`,
    },
  },
  '100': {
    '101': {
      AND: `
The Host (100) represents shelter, ownership, and grace. The coin lands on AND, keeping only what both cards share. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Host (100) represents shelter, ownership, and grace.
Explain how The Host (100) excludes The Fork (101)
Reflection:
`,
      OR: `
The Host (100) represents shelter, ownership, and grace. The coin lands on OR, keeping all both cards offer. The Fork (101) represents hunger, resonance, and diverging paths. Result: The Fork (101) represents hunger, resonance, and diverging paths.
Explain how The Fork (101) subsumes The Host (100)
Reflection:
`,
    },
    '110': {
      AND: `
The Host (100) represents shelter, ownership, and grace. The coin lands on AND, keeping only what both cards share. The Port (110) represents gateways, discovery, and trade. Result: The Host (100) represents shelter, ownership, and grace.
Explain how The Host (100) excludes The Port (110)
Reflection:
`,
      OR: `
The Host (100) represents shelter, ownership, and grace. The coin lands on OR, keeping all both cards offer. The Port (110) represents gateways, discovery, and trade. Result: The Port (110) represents gateways, discovery, and trade.
Explain how The Port (110) subsumes The Host (100)
Reflection:
`,
    },
    '111': {
      AND: `
The Host (100) represents shelter, ownership, and grace. The coin lands on AND, keeping only what both cards share. The Tree (111) represents fullness, growth, and reach. Result: The Host (100) represents shelter, ownership, and grace.
Explain how The Host (100) excludes The Tree (111)
Reflection:
`,
      OR: `
The Host (100) represents shelter, ownership, and grace. The coin lands on OR, keeping all both cards offer. The Tree (111) represents fullness, growth, and reach. Result: The Tree (111) represents fullness, growth, and reach.
Explain how The Tree (111) subsumes The Host (100)
Reflection:
`,
    },
    '1000': {
      AND: `
The Host (100) represents shelter, ownership, and grace. The coin lands on AND, keeping only what both cards share. The Agent (1000) represents independence, will, and action. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Host (100) and The Agent (1000)
Reflection:
`,
      OR: `
The Host (100) represents shelter, ownership, and grace. The coin lands on OR, keeping all both cards offer. The Agent (1000) represents independence, will, and action. Result: The Frame (1100) represents perspective, structure, and state of mind.
Explain how The Frame (1100) subsumes The Host (100) and The Agent (1000)
Reflection:
`,
    },
    '1001': {
      AND: `
The Host (100) represents shelter, ownership, and grace. The coin lands on AND, keeping only what both cards share. The Table (1001) represents gathering, consumption, and plots. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Host (100) and The Table (1001)
Reflection:
`,
      OR: `
The Host (100) represents shelter, ownership, and grace. The coin lands on OR, keeping all both cards offer. The Table (1001) represents gathering, consumption, and plots. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Explain how The Shell (1101) subsumes The Host (100) and The Table (1001)
Reflection:
`,
    },
    '1010': {
      AND: `
The Host (100) represents shelter, ownership, and grace. The coin lands on AND, keeping only what both cards share. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Host (100) and The Clone (1010)
Reflection:
`,
      OR: `
The Host (100) represents shelter, ownership, and grace. The coin lands on OR, keeping all both cards offer. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Forum (1110) represents nobility, philosophy, and debate.
Explain how The Forum (1110) subsumes The Host (100) and The Clone (1010)
Reflection:
`,
    },
    '1011': {
      AND: `
The Host (100) represents shelter, ownership, and grace. The coin lands on AND, keeping only what both cards share. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Host (100) and The Cache (1011)
Reflection:
`,
      OR: `
The Host (100) represents shelter, ownership, and grace. The coin lands on OR, keeping all both cards offer. The Cache (1011) represents secrets, knowledge, and wealth. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Host (100) and The Cache (1011)
Reflection:
`,
    },
    '1100': {
      AND: `
The Host (100) represents shelter, ownership, and grace. The coin lands on AND, keeping only what both cards share. The Frame (1100) represents perspective, structure, and state of mind. Result: The Host (100) represents shelter, ownership, and grace.
Explain how The Host (100) excludes The Frame (1100)
Reflection:
`,
      OR: `
The Host (100) represents shelter, ownership, and grace. The coin lands on OR, keeping all both cards offer. The Frame (1100) represents perspective, structure, and state of mind. Result: The Frame (1100) represents perspective, structure, and state of mind.
Explain how The Frame (1100) subsumes The Host (100)
Reflection:
`,
    },
    '1101': {
      AND: `
The Host (100) represents shelter, ownership, and grace. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Host (100) represents shelter, ownership, and grace.
Explain how The Host (100) excludes The Shell (1101)
Reflection:
`,
      OR: `
The Host (100) represents shelter, ownership, and grace. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Explain how The Shell (1101) subsumes The Host (100)
Reflection:
`,
    },
    '1110': {
      AND: `
The Host (100) represents shelter, ownership, and grace. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Host (100) represents shelter, ownership, and grace.
Explain how The Host (100) excludes The Forum (1110)
Reflection:
`,
      OR: `
The Host (100) represents shelter, ownership, and grace. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The Forum (1110) represents nobility, philosophy, and debate.
Explain how The Forum (1110) subsumes The Host (100)
Reflection:
`,
    },
    '1111': {
      AND: `
The Host (100) represents shelter, ownership, and grace. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Host (100) represents shelter, ownership, and grace.
Explain how The Host (100) excludes The State (1111)
Reflection:
`,
      OR: `
The Host (100) represents shelter, ownership, and grace. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Host (100)
Reflection:
`,
    },
  },
  '101': {
    '110': {
      AND: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on AND, keeping only what both cards share. The Port (110) represents gateways, discovery, and trade. Result: The Host (100) represents shelter, ownership, and grace.
Explain how The Host (100) is the intersection of The Fork (101) and The Port (110)
Reflection:
`,
      OR: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on OR, keeping all both cards offer. The Port (110) represents gateways, discovery, and trade. Result: The Tree (111) represents fullness, growth, and reach.
Explain how The Tree (111) subsumes The Fork (101) and The Port (110)
Reflection:
`,
    },
    '111': {
      AND: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on AND, keeping only what both cards share. The Tree (111) represents fullness, growth, and reach. Result: The Fork (101) represents hunger, resonance, and diverging paths.
Explain how The Fork (101) excludes The Tree (111)
Reflection:
`,
      OR: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on OR, keeping all both cards offer. The Tree (111) represents fullness, growth, and reach. Result: The Tree (111) represents fullness, growth, and reach.
Explain how The Tree (111) subsumes The Fork (101)
Reflection:
`,
    },
    '1000': {
      AND: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on AND, keeping only what both cards share. The Agent (1000) represents independence, will, and action. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Fork (101) and The Agent (1000)
Reflection:
`,
      OR: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on OR, keeping all both cards offer. The Agent (1000) represents independence, will, and action. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Explain how The Shell (1101) subsumes The Fork (101) and The Agent (1000)
Reflection:
`,
    },
    '1001': {
      AND: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on AND, keeping only what both cards share. The Table (1001) represents gathering, consumption, and plots. Result: The Flag (1) represents claims, power, and sovereignty.
Explain how The Flag (1) is the intersection of The Fork (101) and The Table (1001)
Reflection:
`,
      OR: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on OR, keeping all both cards offer. The Table (1001) represents gathering, consumption, and plots. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Explain how The Shell (1101) subsumes The Fork (101) and The Table (1001)
Reflection:
`,
    },
    '1010': {
      AND: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on AND, keeping only what both cards share. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Fork (101) and The Clone (1010)
Reflection:
`,
      OR: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on OR, keeping all both cards offer. The Clone (1010) represents mirrors, reproduction, and equality. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Fork (101) and The Clone (1010)
Reflection:
`,
    },
    '1011': {
      AND: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on AND, keeping only what both cards share. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Flag (1) represents claims, power, and sovereignty.
Explain how The Flag (1) is the intersection of The Fork (101) and The Cache (1011)
Reflection:
`,
      OR: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on OR, keeping all both cards offer. The Cache (1011) represents secrets, knowledge, and wealth. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Fork (101) and The Cache (1011)
Reflection:
`,
    },
    '1100': {
      AND: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on AND, keeping only what both cards share. The Frame (1100) represents perspective, structure, and state of mind. Result: The Host (100) represents shelter, ownership, and grace.
Explain how The Host (100) is the intersection of The Fork (101) and The Frame (1100)
Reflection:
`,
      OR: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on OR, keeping all both cards offer. The Frame (1100) represents perspective, structure, and state of mind. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Explain how The Shell (1101) subsumes The Fork (101) and The Frame (1100)
Reflection:
`,
    },
    '1101': {
      AND: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Fork (101) represents hunger, resonance, and diverging paths.
Explain how The Fork (101) excludes The Shell (1101)
Reflection:
`,
      OR: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Explain how The Shell (1101) subsumes The Fork (101)
Reflection:
`,
    },
    '1110': {
      AND: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Host (100) represents shelter, ownership, and grace.
Explain how The Host (100) is the intersection of The Fork (101) and The Forum (1110)
Reflection:
`,
      OR: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Fork (101) and The Forum (1110)
Reflection:
`,
    },
    '1111': {
      AND: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Fork (101) represents hunger, resonance, and diverging paths.
Explain how The Fork (101) excludes The State (1111)
Reflection:
`,
      OR: `
The Fork (101) represents hunger, resonance, and diverging paths. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Fork (101)
Reflection:
`,
    },
  },
  '110': {
    '111': {
      AND: `
The Port (110) represents gateways, discovery, and trade. The coin lands on AND, keeping only what both cards share. The Tree (111) represents fullness, growth, and reach. Result: The Port (110) represents gateways, discovery, and trade.
Explain how The Port (110) excludes The Tree (111)
Reflection:
`,
      OR: `
The Port (110) represents gateways, discovery, and trade. The coin lands on OR, keeping all both cards offer. The Tree (111) represents fullness, growth, and reach. Result: The Tree (111) represents fullness, growth, and reach.
Explain how The Tree (111) subsumes The Port (110)
Reflection:
`,
    },
    '1000': {
      AND: `
The Port (110) represents gateways, discovery, and trade. The coin lands on AND, keeping only what both cards share. The Agent (1000) represents independence, will, and action. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Port (110) and The Agent (1000)
Reflection:
`,
      OR: `
The Port (110) represents gateways, discovery, and trade. The coin lands on OR, keeping all both cards offer. The Agent (1000) represents independence, will, and action. Result: The Forum (1110) represents nobility, philosophy, and debate.
Explain how The Forum (1110) subsumes The Port (110) and The Agent (1000)
Reflection:
`,
    },
    '1001': {
      AND: `
The Port (110) represents gateways, discovery, and trade. The coin lands on AND, keeping only what both cards share. The Table (1001) represents gathering, consumption, and plots. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Port (110) and The Table (1001)
Reflection:
`,
      OR: `
The Port (110) represents gateways, discovery, and trade. The coin lands on OR, keeping all both cards offer. The Table (1001) represents gathering, consumption, and plots. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Port (110) and The Table (1001)
Reflection:
`,
    },
    '1010': {
      AND: `
The Port (110) represents gateways, discovery, and trade. The coin lands on AND, keeping only what both cards share. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Call (10) represents summonings, duty, and serendipity.
Explain how The Call (10) is the intersection of The Port (110) and The Clone (1010)
Reflection:
`,
      OR: `
The Port (110) represents gateways, discovery, and trade. The coin lands on OR, keeping all both cards offer. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Forum (1110) represents nobility, philosophy, and debate.
Explain how The Forum (1110) subsumes The Port (110) and The Clone (1010)
Reflection:
`,
    },
    '1011': {
      AND: `
The Port (110) represents gateways, discovery, and trade. The coin lands on AND, keeping only what both cards share. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Call (10) represents summonings, duty, and serendipity.
Explain how The Call (10) is the intersection of The Port (110) and The Cache (1011)
Reflection:
`,
      OR: `
The Port (110) represents gateways, discovery, and trade. The coin lands on OR, keeping all both cards offer. The Cache (1011) represents secrets, knowledge, and wealth. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Port (110) and The Cache (1011)
Reflection:
`,
    },
    '1100': {
      AND: `
The Port (110) represents gateways, discovery, and trade. The coin lands on AND, keeping only what both cards share. The Frame (1100) represents perspective, structure, and state of mind. Result: The Host (100) represents shelter, ownership, and grace.
Explain how The Host (100) is the intersection of The Port (110) and The Frame (1100)
Reflection:
`,
      OR: `
The Port (110) represents gateways, discovery, and trade. The coin lands on OR, keeping all both cards offer. The Frame (1100) represents perspective, structure, and state of mind. Result: The Forum (1110) represents nobility, philosophy, and debate.
Explain how The Forum (1110) subsumes The Port (110) and The Frame (1100)
Reflection:
`,
    },
    '1101': {
      AND: `
The Port (110) represents gateways, discovery, and trade. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Host (100) represents shelter, ownership, and grace.
Explain how The Host (100) is the intersection of The Port (110) and The Shell (1101)
Reflection:
`,
      OR: `
The Port (110) represents gateways, discovery, and trade. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Port (110) and The Shell (1101)
Reflection:
`,
    },
    '1110': {
      AND: `
The Port (110) represents gateways, discovery, and trade. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Port (110) represents gateways, discovery, and trade.
Explain how The Port (110) excludes The Forum (1110)
Reflection:
`,
      OR: `
The Port (110) represents gateways, discovery, and trade. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The Forum (1110) represents nobility, philosophy, and debate.
Explain how The Forum (1110) subsumes The Port (110)
Reflection:
`,
    },
    '1111': {
      AND: `
The Port (110) represents gateways, discovery, and trade. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Port (110) represents gateways, discovery, and trade.
Explain how The Port (110) excludes The State (1111)
Reflection:
`,
      OR: `
The Port (110) represents gateways, discovery, and trade. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Port (110)
Reflection:
`,
    },
  },
  '111': {
    '1000': {
      AND: `
The Tree (111) represents fullness, growth, and reach. The coin lands on AND, keeping only what both cards share. The Agent (1000) represents independence, will, and action. Result: The Seed (0) represents beginnings, ideas, and origins.
Explain how The Seed (0) is the intersection of The Tree (111) and The Agent (1000)
Reflection:
`,
      OR: `
The Tree (111) represents fullness, growth, and reach. The coin lands on OR, keeping all both cards offer. The Agent (1000) represents independence, will, and action. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Tree (111) and The Agent (1000)
Reflection:
`,
    },
    '1001': {
      AND: `
The Tree (111) represents fullness, growth, and reach. The coin lands on AND, keeping only what both cards share. The Table (1001) represents gathering, consumption, and plots. Result: The Flag (1) represents claims, power, and sovereignty.
Explain how The Flag (1) is the intersection of The Tree (111) and The Table (1001)
Reflection:
`,
      OR: `
The Tree (111) represents fullness, growth, and reach. The coin lands on OR, keeping all both cards offer. The Table (1001) represents gathering, consumption, and plots. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Tree (111) and The Table (1001)
Reflection:
`,
    },
    '1010': {
      AND: `
The Tree (111) represents fullness, growth, and reach. The coin lands on AND, keeping only what both cards share. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Call (10) represents summonings, duty, and serendipity.
Explain how The Call (10) is the intersection of The Tree (111) and The Clone (1010)
Reflection:
`,
      OR: `
The Tree (111) represents fullness, growth, and reach. The coin lands on OR, keeping all both cards offer. The Clone (1010) represents mirrors, reproduction, and equality. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Tree (111) and The Clone (1010)
Reflection:
`,
    },
    '1011': {
      AND: `
The Tree (111) represents fullness, growth, and reach. The coin lands on AND, keeping only what both cards share. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Link (11) represents connections, promises, and security.
Explain how The Link (11) is the intersection of The Tree (111) and The Cache (1011)
Reflection:
`,
      OR: `
The Tree (111) represents fullness, growth, and reach. The coin lands on OR, keeping all both cards offer. The Cache (1011) represents secrets, knowledge, and wealth. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Tree (111) and The Cache (1011)
Reflection:
`,
    },
    '1100': {
      AND: `
The Tree (111) represents fullness, growth, and reach. The coin lands on AND, keeping only what both cards share. The Frame (1100) represents perspective, structure, and state of mind. Result: The Host (100) represents shelter, ownership, and grace.
Explain how The Host (100) is the intersection of The Tree (111) and The Frame (1100)
Reflection:
`,
      OR: `
The Tree (111) represents fullness, growth, and reach. The coin lands on OR, keeping all both cards offer. The Frame (1100) represents perspective, structure, and state of mind. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Tree (111) and The Frame (1100)
Reflection:
`,
    },
    '1101': {
      AND: `
The Tree (111) represents fullness, growth, and reach. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Fork (101) represents hunger, resonance, and diverging paths.
Explain how The Fork (101) is the intersection of The Tree (111) and The Shell (1101)
Reflection:
`,
      OR: `
The Tree (111) represents fullness, growth, and reach. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Tree (111) and The Shell (1101)
Reflection:
`,
    },
    '1110': {
      AND: `
The Tree (111) represents fullness, growth, and reach. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Port (110) represents gateways, discovery, and trade.
Explain how The Port (110) is the intersection of The Tree (111) and The Forum (1110)
Reflection:
`,
      OR: `
The Tree (111) represents fullness, growth, and reach. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Tree (111) and The Forum (1110)
Reflection:
`,
    },
    '1111': {
      AND: `
The Tree (111) represents fullness, growth, and reach. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Tree (111) represents fullness, growth, and reach.
Explain how The Tree (111) excludes The State (1111)
Reflection:
`,
      OR: `
The Tree (111) represents fullness, growth, and reach. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Tree (111)
Reflection:
`,
    },
  },
  '1000': {
    '1001': {
      AND: `
The Agent (1000) represents independence, will, and action. The coin lands on AND, keeping only what both cards share. The Table (1001) represents gathering, consumption, and plots. Result: The Agent (1000) represents independence, will, and action.
Explain how The Agent (1000) excludes The Table (1001)
Reflection:
`,
      OR: `
The Agent (1000) represents independence, will, and action. The coin lands on OR, keeping all both cards offer. The Table (1001) represents gathering, consumption, and plots. Result: The Table (1001) represents gathering, consumption, and plots.
Explain how The Table (1001) subsumes The Agent (1000)
Reflection:
`,
    },
    '1010': {
      AND: `
The Agent (1000) represents independence, will, and action. The coin lands on AND, keeping only what both cards share. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Agent (1000) represents independence, will, and action.
Explain how The Agent (1000) excludes The Clone (1010)
Reflection:
`,
      OR: `
The Agent (1000) represents independence, will, and action. The coin lands on OR, keeping all both cards offer. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Clone (1010) represents mirrors, reproduction, and equality.
Explain how The Clone (1010) subsumes The Agent (1000)
Reflection:
`,
    },
    '1011': {
      AND: `
The Agent (1000) represents independence, will, and action. The coin lands on AND, keeping only what both cards share. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Agent (1000) represents independence, will, and action.
Explain how The Agent (1000) excludes The Cache (1011)
Reflection:
`,
      OR: `
The Agent (1000) represents independence, will, and action. The coin lands on OR, keeping all both cards offer. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Explain how The Cache (1011) subsumes The Agent (1000)
Reflection:
`,
    },
    '1100': {
      AND: `
The Agent (1000) represents independence, will, and action. The coin lands on AND, keeping only what both cards share. The Frame (1100) represents perspective, structure, and state of mind. Result: The Agent (1000) represents independence, will, and action.
Explain how The Agent (1000) excludes The Frame (1100)
Reflection:
`,
      OR: `
The Agent (1000) represents independence, will, and action. The coin lands on OR, keeping all both cards offer. The Frame (1100) represents perspective, structure, and state of mind. Result: The Frame (1100) represents perspective, structure, and state of mind.
Explain how The Frame (1100) subsumes The Agent (1000)
Reflection:
`,
    },
    '1101': {
      AND: `
The Agent (1000) represents independence, will, and action. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Agent (1000) represents independence, will, and action.
Explain how The Agent (1000) excludes The Shell (1101)
Reflection:
`,
      OR: `
The Agent (1000) represents independence, will, and action. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Explain how The Shell (1101) subsumes The Agent (1000)
Reflection:
`,
    },
    '1110': {
      AND: `
The Agent (1000) represents independence, will, and action. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Agent (1000) represents independence, will, and action.
Explain how The Agent (1000) excludes The Forum (1110)
Reflection:
`,
      OR: `
The Agent (1000) represents independence, will, and action. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The Forum (1110) represents nobility, philosophy, and debate.
Explain how The Forum (1110) subsumes The Agent (1000)
Reflection:
`,
    },
    '1111': {
      AND: `
The Agent (1000) represents independence, will, and action. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Agent (1000) represents independence, will, and action.
Explain how The Agent (1000) excludes The State (1111)
Reflection:
`,
      OR: `
The Agent (1000) represents independence, will, and action. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Agent (1000)
Reflection:
`,
    },
  },
  '1001': {
    '1010': {
      AND: `
The Table (1001) represents gathering, consumption, and plots. The coin lands on AND, keeping only what both cards share. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Agent (1000) represents independence, will, and action.
Explain how The Agent (1000) is the intersection of The Table (1001) and The Clone (1010)
Reflection:
`,
      OR: `
The Table (1001) represents gathering, consumption, and plots. The coin lands on OR, keeping all both cards offer. The Clone (1010) represents mirrors, reproduction, and equality. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Explain how The Cache (1011) subsumes The Table (1001) and The Clone (1010)
Reflection:
`,
    },
    '1011': {
      AND: `
The Table (1001) represents gathering, consumption, and plots. The coin lands on AND, keeping only what both cards share. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Table (1001) represents gathering, consumption, and plots.
Explain how The Table (1001) excludes The Cache (1011)
Reflection:
`,
      OR: `
The Table (1001) represents gathering, consumption, and plots. The coin lands on OR, keeping all both cards offer. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Explain how The Cache (1011) subsumes The Table (1001)
Reflection:
`,
    },
    '1100': {
      AND: `
The Table (1001) represents gathering, consumption, and plots. The coin lands on AND, keeping only what both cards share. The Frame (1100) represents perspective, structure, and state of mind. Result: The Agent (1000) represents independence, will, and action.
Explain how The Agent (1000) is the intersection of The Table (1001) and The Frame (1100)
Reflection:
`,
      OR: `
The Table (1001) represents gathering, consumption, and plots. The coin lands on OR, keeping all both cards offer. The Frame (1100) represents perspective, structure, and state of mind. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Explain how The Shell (1101) subsumes The Table (1001) and The Frame (1100)
Reflection:
`,
    },
    '1101': {
      AND: `
The Table (1001) represents gathering, consumption, and plots. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Table (1001) represents gathering, consumption, and plots.
Explain how The Table (1001) excludes The Shell (1101)
Reflection:
`,
      OR: `
The Table (1001) represents gathering, consumption, and plots. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Explain how The Shell (1101) subsumes The Table (1001)
Reflection:
`,
    },
    '1110': {
      AND: `
The Table (1001) represents gathering, consumption, and plots. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Agent (1000) represents independence, will, and action.
Explain how The Agent (1000) is the intersection of The Table (1001) and The Forum (1110)
Reflection:
`,
      OR: `
The Table (1001) represents gathering, consumption, and plots. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Table (1001) and The Forum (1110)
Reflection:
`,
    },
    '1111': {
      AND: `
The Table (1001) represents gathering, consumption, and plots. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Table (1001) represents gathering, consumption, and plots.
Explain how The Table (1001) excludes The State (1111)
Reflection:
`,
      OR: `
The Table (1001) represents gathering, consumption, and plots. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Table (1001)
Reflection:
`,
    },
  },
  '1010': {
    '1011': {
      AND: `
The Clone (1010) represents mirrors, reproduction, and equality. The coin lands on AND, keeping only what both cards share. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Clone (1010) represents mirrors, reproduction, and equality.
Explain how The Clone (1010) excludes The Cache (1011)
Reflection:
`,
      OR: `
The Clone (1010) represents mirrors, reproduction, and equality. The coin lands on OR, keeping all both cards offer. The Cache (1011) represents secrets, knowledge, and wealth. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Explain how The Cache (1011) subsumes The Clone (1010)
Reflection:
`,
    },
    '1100': {
      AND: `
The Clone (1010) represents mirrors, reproduction, and equality. The coin lands on AND, keeping only what both cards share. The Frame (1100) represents perspective, structure, and state of mind. Result: The Agent (1000) represents independence, will, and action.
Explain how The Agent (1000) is the intersection of The Clone (1010) and The Frame (1100)
Reflection:
`,
      OR: `
The Clone (1010) represents mirrors, reproduction, and equality. The coin lands on OR, keeping all both cards offer. The Frame (1100) represents perspective, structure, and state of mind. Result: The Forum (1110) represents nobility, philosophy, and debate.
Explain how The Forum (1110) subsumes The Clone (1010) and The Frame (1100)
Reflection:
`,
    },
    '1101': {
      AND: `
The Clone (1010) represents mirrors, reproduction, and equality. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Agent (1000) represents independence, will, and action.
Explain how The Agent (1000) is the intersection of The Clone (1010) and The Shell (1101)
Reflection:
`,
      OR: `
The Clone (1010) represents mirrors, reproduction, and equality. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Clone (1010) and The Shell (1101)
Reflection:
`,
    },
    '1110': {
      AND: `
The Clone (1010) represents mirrors, reproduction, and equality. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Clone (1010) represents mirrors, reproduction, and equality.
Explain how The Clone (1010) excludes The Forum (1110)
Reflection:
`,
      OR: `
The Clone (1010) represents mirrors, reproduction, and equality. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The Forum (1110) represents nobility, philosophy, and debate.
Explain how The Forum (1110) subsumes The Clone (1010)
Reflection:
`,
    },
    '1111': {
      AND: `
The Clone (1010) represents mirrors, reproduction, and equality. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Clone (1010) represents mirrors, reproduction, and equality.
Explain how The Clone (1010) excludes The State (1111)
Reflection:
`,
      OR: `
The Clone (1010) represents mirrors, reproduction, and equality. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Clone (1010)
Reflection:
`,
    },
  },
  '1011': {
    '1100': {
      AND: `
The Cache (1011) represents secrets, knowledge, and wealth. The coin lands on AND, keeping only what both cards share. The Frame (1100) represents perspective, structure, and state of mind. Result: The Agent (1000) represents independence, will, and action.
Explain how The Agent (1000) is the intersection of The Cache (1011) and The Frame (1100)
Reflection:
`,
      OR: `
The Cache (1011) represents secrets, knowledge, and wealth. The coin lands on OR, keeping all both cards offer. The Frame (1100) represents perspective, structure, and state of mind. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Cache (1011) and The Frame (1100)
Reflection:
`,
    },
    '1101': {
      AND: `
The Cache (1011) represents secrets, knowledge, and wealth. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Table (1001) represents gathering, consumption, and plots.
Explain how The Table (1001) is the intersection of The Cache (1011) and The Shell (1101)
Reflection:
`,
      OR: `
The Cache (1011) represents secrets, knowledge, and wealth. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Cache (1011) and The Shell (1101)
Reflection:
`,
    },
    '1110': {
      AND: `
The Cache (1011) represents secrets, knowledge, and wealth. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Clone (1010) represents mirrors, reproduction, and equality.
Explain how The Clone (1010) is the intersection of The Cache (1011) and The Forum (1110)
Reflection:
`,
      OR: `
The Cache (1011) represents secrets, knowledge, and wealth. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Cache (1011) and The Forum (1110)
Reflection:
`,
    },
    '1111': {
      AND: `
The Cache (1011) represents secrets, knowledge, and wealth. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Cache (1011) represents secrets, knowledge, and wealth.
Explain how The Cache (1011) excludes The State (1111)
Reflection:
`,
      OR: `
The Cache (1011) represents secrets, knowledge, and wealth. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Cache (1011)
Reflection:
`,
    },
  },
  '1100': {
    '1101': {
      AND: `
The Frame (1100) represents perspective, structure, and state of mind. The coin lands on AND, keeping only what both cards share. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Frame (1100) represents perspective, structure, and state of mind.
Explain how The Frame (1100) excludes The Shell (1101)
Reflection:
`,
      OR: `
The Frame (1100) represents perspective, structure, and state of mind. The coin lands on OR, keeping all both cards offer. The Shell (1101) represents protection, boundaries, and rigidity. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Explain how The Shell (1101) subsumes The Frame (1100)
Reflection:
`,
    },
    '1110': {
      AND: `
The Frame (1100) represents perspective, structure, and state of mind. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Frame (1100) represents perspective, structure, and state of mind.
Explain how The Frame (1100) excludes The Forum (1110)
Reflection:
`,
      OR: `
The Frame (1100) represents perspective, structure, and state of mind. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The Forum (1110) represents nobility, philosophy, and debate.
Explain how The Forum (1110) subsumes The Frame (1100)
Reflection:
`,
    },
    '1111': {
      AND: `
The Frame (1100) represents perspective, structure, and state of mind. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Frame (1100) represents perspective, structure, and state of mind.
Explain how The Frame (1100) excludes The State (1111)
Reflection:
`,
      OR: `
The Frame (1100) represents perspective, structure, and state of mind. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Frame (1100)
Reflection:
`,
    },
  },
  '1101': {
    '1110': {
      AND: `
The Shell (1101) represents protection, boundaries, and rigidity. The coin lands on AND, keeping only what both cards share. The Forum (1110) represents nobility, philosophy, and debate. Result: The Frame (1100) represents perspective, structure, and state of mind.
Explain how The Frame (1100) is the intersection of The Shell (1101) and The Forum (1110)
Reflection:
`,
      OR: `
The Shell (1101) represents protection, boundaries, and rigidity. The coin lands on OR, keeping all both cards offer. The Forum (1110) represents nobility, philosophy, and debate. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Shell (1101) and The Forum (1110)
Reflection:
`,
    },
    '1111': {
      AND: `
The Shell (1101) represents protection, boundaries, and rigidity. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Shell (1101) represents protection, boundaries, and rigidity.
Explain how The Shell (1101) excludes The State (1111)
Reflection:
`,
      OR: `
The Shell (1101) represents protection, boundaries, and rigidity. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Shell (1101)
Reflection:
`,
    },
  },
  '1110': {
    '1111': {
      AND: `
The Forum (1110) represents nobility, philosophy, and debate. The coin lands on AND, keeping only what both cards share. The State (1111) represents organization, authority, and politics. Result: The Forum (1110) represents nobility, philosophy, and debate.
Explain how The Forum (1110) excludes The State (1111)
Reflection:
`,
      OR: `
The Forum (1110) represents nobility, philosophy, and debate. The coin lands on OR, keeping all both cards offer. The State (1111) represents organization, authority, and politics. Result: The State (1111) represents organization, authority, and politics.
Explain how The State (1111) subsumes The Forum (1110)
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
