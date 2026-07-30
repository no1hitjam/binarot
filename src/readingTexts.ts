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
The Seed paired with The Flag marks the direct transition from raw potential to formal declaration. Where The Seed represents unmanifested origin, The Flag establishes visible boundary and authority. Together, this combination signifies an abstract concept gaining structure, definition, and explicit standing.
`,
      AND: `
When one approaches this combination with an AND mindset, the focus gently settles on finding what is truly grounded when a new beginning meets a desire for control. Any pressure to assert power or claim territory quietly fades, as unformed potential cannot be forced. What remains is a peaceful return to the root—a quiet space where the original idea can rest, clear and undisturbed.
`,
      OR: `
When one approaches this combination with an OR mindset, the focus expands to welcome any presence of active force, allowing even a single spark of assertion to carry the moment. Because this perspective embraces every contribution rather than demanding agreement, the quiet potential of the origin effortlessly gives way to clear structure. The result is a confident stepping forward into sovereignty, where the power to claim space takes root and defines the outcome.
`,
    },
    '10': {
      pair: `
When The Seed and The Call appear together in your spread, a quiet potential is answering an urgent summons. The Seed brings the raw impulse of a new beginning, while The Call arrives as external alignment, nudging you toward a specific duty or a stroke of serendipity. Together, they reveal that a nascent idea is ready to step out of the mind—the universe is prompting you to act on what you have begun.
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
The Seed and The Link together signify the emergence of new relationships or networks that stem from fresh ideas. The Seed embodies the initial spark of inspiration, while The Link highlights the importance of forming connections and commitments that provide stability and support. This combination encourages nurturing new beginnings through collaboration and promises, indicating that the groundwork for future security is being laid through these budding connections.
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
The Seed and The Host create a narrative of nurturing beginnings within a safe and supportive environment. The Seed signifies the inception of new ideas, while The Host represents the shelter and ownership necessary for those ideas to take root and grow. Together, they suggest that the cultivation of fresh concepts is best achieved within a framework of grace and stability, emphasizing the importance of a nurturing space for new ventures to flourish.
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
The Seed and The Fork illustrate a pivotal moment of choice in the journey of new beginnings. The Seed signifies the emergence of fresh ideas, while The Fork represents the various paths that can be taken, each resonating with different desires and outcomes. This combination indicates that as new concepts arise, there is a need to evaluate and choose among divergent possibilities, highlighting the importance of aligning your decisions with your true hunger for growth and fulfillment.
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
The Seed and The Port together symbolize the initial phase of exploration and exchange in new ventures. The Seed signifies fresh ideas and potential, while The Port represents gateways to discovery and opportunities for trade. This combination suggests that as new concepts emerge, they open pathways for interaction and collaboration, encouraging you to share your ideas and engage with the broader world, ultimately fostering growth through discovery and connection.
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
The Seed and The Tree represent a journey from potential to maturity. The Seed embodies the initial spark of ideas and beginnings, while The Tree signifies fullness, growth, and the ability to reach outward. This combination indicates that nurturing new concepts will lead to their flourishing, emphasizing the importance of patience and care in the early stages, as these beginnings have the capacity to develop into something substantial and far-reaching.
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
The Seed and The Agent highlight the power of initiating change through independent action. The Seed represents new beginnings and ideas, while The Agent embodies the drive and will to manifest those ideas into reality. Together, they suggest that taking decisive steps is crucial for transforming potential into tangible outcomes, encouraging you to harness your independence and assert your will to bring your visions to life.
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
The Seed and The Table signify the convergence of new ideas with community and collaboration. The Seed represents the inception of fresh concepts, while The Table embodies the space where these ideas can be shared, discussed, and nurtured. This combination suggests that the act of bringing your beginnings to the table fosters collective engagement and consumption of thoughts, encouraging collaboration and deeper exploration of the potential that arises from shared gatherings and plots for the future.
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
The Seed and The Clone together reflect the theme of replication and expansion of ideas. The Seed signifies the initial spark of creativity and new beginnings, while The Clone represents the mirroring and reproduction of those concepts, emphasizing the potential for equality and shared understanding. This combination indicates that as fresh ideas emerge, they can be duplicated and shared among others, leading to a broader impact and fostering a sense of community through the collective evolution of thoughts.
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
The Seed and The Cache highlight the potential for new ideas to unlock hidden knowledge and resources. The Seed represents fresh beginnings and the birth of concepts, while The Cache signifies the accumulation of secrets and valuable insights. Together, this combination suggests that nurturing new ideas can lead to the discovery of wealth in knowledge, urging you to explore the depths of your concepts to uncover the treasures that lie within and leverage them for growth and success.
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
The Seed and The Frame illustrate the importance of perspective in nurturing new ideas. The Seed signifies the initial stage of concepts and beginnings, while The Frame provides the structure and context necessary to shape those ideas. This combination suggests that establishing a clear framework is essential for cultivating potential, encouraging you to adopt a specific mindset that supports growth and clarity as you develop and refine your emerging visions.
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
The Seed and The Shell together represent the delicate balance between nurturing potential and establishing necessary boundaries. The Seed embodies the essence of new beginnings and ideas, while The Shell signifies protection and the rigidity that can come with setting limits. This combination suggests that while it is vital to cultivate fresh concepts, it is equally important to create a secure environment that safeguards those ideas from external pressures, ensuring they have the space to develop while being shielded from premature exposure or harm.
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
The Seed and The Forum highlight the intersection of new ideas and intellectual discourse. The Seed represents the initial spark of creativity and fresh beginnings, while The Forum embodies a space for discussion, philosophy, and debate. This combination suggests that nurturing new concepts is enriched through engagement with others, encouraging dialogue and exploration of diverse perspectives that can refine and elevate those ideas into more profound insights.
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
The Seed and The State together illustrate the journey of new ideas into structured frameworks of authority and organization. The Seed signifies fresh beginnings and the birth of innovative concepts, while The State represents the systems and governance needed to implement and regulate those ideas. This combination suggests that as new thoughts emerge, they often require formal structures and oversight to thrive, reflecting the interplay between creativity and the need for order in bringing visions to fruition.
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
The Flag and The Call together emphasize the importance of responding to a higher purpose or duty with assertion and authority. The Flag represents claims and the exercise of power, while The Call embodies the summons to action and the serendipitous moments that guide one’s path. This combination suggests that recognizing your sovereignty allows you to answer significant calls, highlighting the need to embrace responsibilities and opportunities that align with your inherent power and direction.
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
The Flag and The Link together illustrate the balance between asserting power and building meaningful connections. The Flag signifies claims and the exercise of sovereignty, while The Link represents the relationships and commitments that provide security and support. This combination suggests that true strength comes not only from individual authority but also from fostering trustworthy connections, emphasizing that power is enhanced when it is connected to a network of promises and mutual support.
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
The Flag and The Host together highlight the interplay between power and the nurturing of a secure environment. The Flag represents claims and the exercise of sovereignty, while The Host embodies shelter and ownership. This combination suggests that true authority is best expressed when it is grounded in grace and the provision of safe spaces for others, indicating that effective leadership involves not only asserting power but also offering support and stability to those within your domain.
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
The Flag and The Fork illustrate the dynamic nature of asserting power while navigating choices. The Flag represents claims and sovereignty, emphasizing the need to assert one’s authority, while The Fork symbolizes diverging paths driven by desire and resonant choices. This combination suggests that claiming your power involves recognizing the various directions available to you, highlighting the importance of making deliberate decisions that align with your true hunger for growth and fulfillment as you navigate your journey.
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
The Flag and The Port together signify the assertion of power through exploration and exchange. The Flag represents claims and sovereignty, while The Port embodies gateways to new opportunities and discovery. This combination suggests that exercising authority can open pathways for trade and interaction, encouraging you to leverage your position to explore new territories and foster connections that enhance your influence and broaden your horizons.
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
The Flag and The Tree symbolize the union of power and enduring growth. The Flag represents claims and sovereignty, asserting authority, while The Tree signifies fullness and the capacity to reach outward. This combination suggests that true power is not only about asserting dominance but also about nurturing growth and expanding influence, indicating that a strong foundation of authority can lead to significant development and interconnectedness in your endeavors.
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
The Flag and The Agent together emphasize the manifestation of power through independent action. The Flag represents claims and sovereignty, asserting authority, while The Agent embodies the will to act and the drive for independence. This combination suggests that true sovereignty is exercised through decisive actions, encouraging you to harness your autonomy and take initiative in claiming your power, thus actively shaping your path and asserting your influence in the world.
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
The Flag and The Table highlight the importance of asserting power through collaboration and community engagement. The Flag represents claims and sovereignty, while The Table signifies a space for gathering and sharing ideas. This combination suggests that true authority is strengthened by bringing people together, emphasizing that the exercise of power can lead to fruitful exchanges and collective plotting, where diverse perspectives contribute to a richer understanding and more impactful actions.
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
The Flag and The Clone illustrate the relationship between power and the replication of ideas. The Flag represents claims and sovereignty, asserting authority, while The Clone signifies mirrors and reproduction, emphasizing equality in sharing concepts. This combination suggests that true power is not only about asserting dominance but also about fostering an environment where ideas can be mirrored and reproduced, encouraging collaboration and equal participation in the collective journey toward innovation and growth.
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
The Flag and The Cache together symbolize the assertion of power through the accumulation of knowledge and resources. The Flag represents claims and sovereignty, emphasizing authority, while The Cache signifies hidden wealth and secrets that can enhance one's influence. This combination suggests that true power is not merely about external claims but also about leveraging knowledge and resources, indicating that the ability to access and utilize valuable insights can significantly strengthen one's position and impact.
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
The Flag and The Frame highlight the significance of asserting power within a structured perspective. The Flag represents claims and sovereignty, emphasizing authority, while The Frame provides the necessary structure and context for understanding. This combination suggests that effective exercise of power requires a clear framework that shapes how authority is perceived and enacted, indicating that the right perspective can enhance the impact of your claims and foster a more profound influence in your environment.
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
The Flag and The Shell symbolize the balance between asserting power and maintaining necessary boundaries. The Flag represents claims and sovereignty, while The Shell embodies protection and rigidity. This combination suggests that true authority is best exercised when it is coupled with a framework that safeguards and defines limits, emphasizing that establishing clear boundaries can enhance your claims and ensure that your power is both respected and effectively managed.
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
The Flag and The Forum together emphasize the importance of asserting power through intellectual engagement and discourse. The Flag represents claims and sovereignty, while The Forum signifies a space for nobility, philosophy, and debate. This combination suggests that true power is not only about authority but also about fostering dialogue and critical thinking, indicating that engaging with diverse perspectives and ideas can enhance your claims and lead to a more profound understanding of your influence in the world.
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
The Flag and The State illustrate the dynamic interplay between personal sovereignty and structured authority. The Flag represents claims to power and self-governance, while The State embodies organized systems and political structures. This combination suggests that asserting one's power is most effective within established frameworks, highlighting the importance of navigating the political landscape to legitimize and enhance your claims while contributing to the broader organizational context.
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
The Call and The Link together emphasize the importance of responding to opportunities that foster meaningful connections. The Call represents summonings and duty, urging you to act, while The Link signifies the bonds and promises that provide security and support. This combination suggests that answering the call to engage with others can lead to valuable relationships, reinforcing the idea that fulfilling your responsibilities can create a network of trust and collaboration that enhances your personal and collective journey.
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
The Call and The Host together highlight the significance of responding to opportunities within a nurturing environment. The Call represents summonings and the sense of duty, prompting action, while The Host embodies shelter and grace, providing a supportive space. This combination suggests that answering the call often leads to discovering a sanctuary where responsibilities can be fulfilled, emphasizing that engaging with one's duty in a gracious environment fosters growth and connection.
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
The Call and The Fork together illustrate the moment of decision when responding to opportunities. The Call signifies summonings and a sense of duty, urging you to take action, while The Fork represents diverging paths driven by desire and resonance. This combination suggests that answering the call can open up various directions, prompting you to choose a path that aligns with your true hunger for growth and fulfillment, emphasizing the importance of mindful decision-making in your journey.
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
The Call and The Port together signify the invitation to explore new opportunities and experiences. The Call represents summonings and a sense of duty, urging you to act, while The Port symbolizes gateways to discovery and exchanges. This combination suggests that responding to the call can lead you to new horizons, opening pathways for exploration and trade, encouraging you to embrace the serendipitous moments that arise as you venture into unfamiliar territories.
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
The Call and The Tree together symbolize the invitation to grow and expand in response to opportunities. The Call signifies summonings and a sense of duty, urging action, while The Tree represents fullness and growth. This combination suggests that answering the call can lead to significant personal development, encouraging you to embrace the responsibilities that foster your growth and allow you to reach your full potential in various aspects of life.
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
The Call and The Agent together highlight the importance of taking independent action in response to opportunities. The Call represents summonings and a sense of duty, prompting you to engage, while The Agent embodies the will and autonomy necessary to act decisively. This combination suggests that embracing the call to duty allows you to assert your independence, encouraging you to take initiative and shape your own path through purposeful action and determination.
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
The Call and The Table together emphasize the importance of responding to opportunities within a communal context. The Call signifies summonings and a sense of duty, prompting action, while The Table represents gathering and the sharing of ideas. This combination suggests that answering the call can lead to meaningful connections and collaborative efforts, encouraging you to engage with others as you explore shared goals and collectively shape your future through discussion and mutual support.
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
The Call and The Clone together highlight the significance of responding to opportunities that promote equality and shared understanding. The Call represents summonings and duty, urging you to take action, while The Clone embodies the mirroring and reproduction of ideas and concepts. This combination suggests that answering the call can lead to collaborative efforts that reflect shared values and perspectives, encouraging you to engage in dialogue that fosters equality and the co-creation of meaningful outcomes.
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
The Call and The Cache together emphasize the importance of responding to opportunities that unlock hidden knowledge and resources. The Call signifies summonings and a sense of duty, prompting action, while The Cache represents the accumulation of secrets and valuable insights. This combination suggests that answering the call can lead to the discovery of wealth in knowledge, encouraging you to actively seek and utilize hidden resources that can enhance your journey and fulfill your responsibilities.
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
The Call and The Frame together highlight the importance of responding to opportunities with a well-defined perspective. The Call signifies summonings and a sense of duty, urging action, while The Frame represents the structure and context that shape understanding. This combination suggests that answering the call requires a clear mindset, emphasizing that having a structured approach can enhance your ability to fulfill your responsibilities and navigate the situations that arise, ultimately leading to more effective and meaningful outcomes.
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
The Call and The Shell together illustrate the balance between responding to opportunities and maintaining necessary boundaries. The Call signifies summonings and a sense of duty, prompting action, while The Shell represents protection and rigidity. This combination suggests that while it is important to answer the call and engage with new responsibilities, it is equally vital to establish boundaries that protect your well-being, ensuring that your actions align with your values while safeguarding your personal space.
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
The Call and The Forum together emphasize the significance of responding to opportunities through thoughtful dialogue and engagement. The Call represents summonings and duty, urging you to take action, while The Forum embodies a space for philosophical discussion and debate. This combination suggests that answering the call may lead you to meaningful conversations and deliberations, encouraging you to explore noble ideas and collaborate with others in shaping your perspective and influencing the collective understanding of important issues.
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
The Call and The State together highlight the importance of responding to opportunities within structured systems of authority. The Call signifies summonings and a sense of duty, urging you to take action, while The State represents organization and political frameworks. This combination suggests that answering the call often involves navigating established structures, indicating that fulfilling your responsibilities can lead to meaningful participation in organized efforts and contribute to the broader political landscape, where your actions can have a significant impact.
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
The Link and The Host together emphasize the importance of nurturing connections within a supportive environment. The Link represents relationships and promises that provide security, while The Host embodies shelter and the grace that fosters community. This combination suggests that strong connections are best cultivated within a framework of care and ownership, highlighting that creating a welcoming space allows relationships to thrive, reinforcing bonds and enhancing the sense of belonging among individuals.
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
The Link and The Fork together illustrate the interplay between connections and the choices that arise from them. The Link signifies relationships and promises that provide security, while The Fork represents diverging paths driven by desire and resonance. This combination suggests that as you cultivate meaningful connections, you may encounter different opportunities and directions, emphasizing the need to evaluate your options and choose paths that align with your true aspirations and the relationships you value.
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
The Link and The Port together highlight the significance of connections in facilitating exploration and exchange. The Link represents relationships and promises that offer security, while The Port embodies gateways to new opportunities and discoveries. This combination suggests that meaningful connections can serve as gateways to broader experiences, encouraging you to leverage your relationships to explore new avenues, engage in trade, and uncover valuable insights that enhance your journey.
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
The Link and The Tree together emphasize the importance of nurturing connections for personal and communal growth. The Link represents relationships and promises that provide security, while The Tree symbolizes fullness and the potential for expansive growth. This combination suggests that strong connections not only foster a sense of security but also create the foundation for reaching new heights, encouraging you to cultivate relationships that support both individual development and collective flourishing.
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
The Link and The Agent together highlight the balance between nurturing connections and exercising personal independence. The Link signifies relationships and promises that provide security, while The Agent embodies the will to act and the importance of autonomy. This combination suggests that while strong connections offer support, it is essential to maintain your independence and take decisive action, encouraging you to leverage your relationships while also asserting your own path and direction in life.
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
The Link and The Table together emphasize the importance of connections in fostering community and collaboration. The Link represents relationships and promises that provide security, while The Table symbolizes a space for gathering and sharing ideas. This combination suggests that meaningful connections can enhance collective efforts, encouraging you to come together with others to share resources, engage in discussions, and collaboratively plot future endeavors, ultimately strengthening the bonds within the community.
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
The Link and The Clone together highlight the significance of connections that foster equality and shared understanding. The Link represents relationships and promises that provide security, while The Clone embodies the mirroring and reproduction of ideas and concepts. This combination suggests that strong connections create an environment where ideas can be reflected and shared equally, encouraging collaboration and mutual support, ultimately leading to a richer collective experience and reinforcing the value of community in nurturing growth.
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
The Link and The Cache together emphasize the role of connections in unlocking hidden knowledge and resources. The Link represents relationships and promises that provide security, while The Cache symbolizes the accumulation of secrets and valuable insights. This combination suggests that strong connections can lead to the discovery of wealth in knowledge, encouraging you to engage with others to uncover and share valuable information that enhances both personal growth and collective advancement.
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
The Link and The Frame together highlight the importance of connections within a structured perspective. The Link represents relationships and promises that provide security, while The Frame embodies the context and structure that shape understanding. This combination suggests that strong connections can offer a solid foundation for developing a clearer perspective, emphasizing that meaningful relationships help to define your worldview and influence how you navigate challenges and opportunities.
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
The Link and The Shell together illustrate the balance between nurturing connections and establishing protective boundaries. The Link represents relationships and promises that provide security, while The Shell symbolizes protection and rigidity. This combination suggests that while fostering meaningful connections is essential, it is equally important to set boundaries that safeguard your well-being, ensuring that your relationships remain healthy and supportive without compromising personal space or autonomy.
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
The Link and The Forum together emphasize the importance of connections in fostering thoughtful discourse and collaboration. The Link represents relationships and promises that provide security, while The Forum embodies a space for nobility, philosophy, and debate. This combination suggests that strong connections create a supportive environment for engaging in meaningful discussions, encouraging the exchange of ideas and perspectives that enrich collective understanding and promote intellectual growth.
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
The Link and The State together illustrate the relationship between personal connections and structured authority. The Link represents relationships and promises that provide security, while The State embodies organization and political frameworks. This combination suggests that fostering strong connections can enhance your ability to navigate and engage with established systems, indicating that meaningful relationships can contribute to a sense of security and support within organized structures, facilitating your role and influence in the broader political landscape.
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
The Host and The Fork together highlight the interplay between providing shelter and encountering choices in life. The Host signifies a nurturing environment that offers shelter and ownership, while The Fork represents diverging paths driven by hunger and desire. This combination suggests that a supportive and graceful foundation allows for exploration of different avenues, encouraging you to make choices that resonate with your true aspirations as you navigate through various opportunities and challenges.
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
The Host and The Port together emphasize the role of nurturing environments in facilitating exploration and exchange. The Host represents shelter and grace, providing a safe space for growth, while The Port symbolizes gateways to discovery and opportunities for trade. This combination suggests that a supportive foundation allows you to venture into new territories, encouraging engagement with others and the sharing of resources that enhance both personal development and collective enrichment.
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
The Host and The Tree together symbolize the nurturing of a supportive environment that fosters growth and abundance. The Host represents shelter and grace, providing a safe space for development, while The Tree embodies fullness and the potential for expansive reach. This combination suggests that a gracious foundation allows for significant personal and communal growth, encouraging you to cultivate relationships and resources that enhance your ability to thrive and extend your influence in the world.
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
The Host and The Agent together highlight the balance between providing a supportive environment and exercising personal independence. The Host represents shelter and grace, offering a nurturing space, while The Agent embodies the will to act and the importance of autonomy. This combination suggests that a gracious foundation allows you to assert your independence, encouraging you to take decisive actions while benefiting from the security and support that a nurturing environment provides.
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
The Host and The Table together emphasize the significance of nurturing environments in fostering community and collaboration. The Host represents shelter and grace, providing a supportive space, while The Table symbolizes gathering and sharing of ideas and resources. This combination suggests that a gracious foundation encourages meaningful interactions and collective efforts, inviting you to come together with others to share experiences, create plans, and strengthen bonds within the community.
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
The Host and The Clone together highlight the importance of nurturing environments that promote equality and shared understanding. The Host represents shelter and grace, providing a safe space for growth, while The Clone embodies mirroring and reproduction of ideas. This combination suggests that a supportive foundation allows for the reflection and sharing of diverse perspectives, encouraging collaboration and fostering an environment where all voices are valued and can contribute to collective growth.
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
The Host and The Cache together emphasize the importance of nurturing environments in unlocking hidden knowledge and resources. The Host represents shelter and grace, providing a safe space for growth, while The Cache symbolizes the accumulation of secrets and valuable insights. This combination suggests that a gracious foundation enables the discovery and sharing of knowledge, encouraging you to create an environment where valuable information and resources can be accessed and utilized for personal and collective enrichment.
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
The Host and The Frame together highlight the interplay between providing a nurturing environment and establishing a structured perspective. The Host represents shelter and grace, offering a supportive space for growth, while The Frame embodies the context and structure that shape understanding. This combination suggests that a gracious foundation fosters a positive state of mind, encouraging you to develop a clear perspective that enhances your ability to navigate challenges and opportunities effectively.
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
The Host and The Shell together illustrate the balance between providing support and establishing necessary boundaries. The Host represents shelter and grace, offering a nurturing environment, while The Shell signifies protection and rigidity. This combination suggests that while a gracious foundation is essential for growth, it is equally important to create protective boundaries that safeguard your well-being and maintain a healthy space for both personal and communal development.
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
The Host and The Forum together emphasize the importance of nurturing environments for fostering meaningful discourse and collaboration. The Host represents shelter and grace, providing a supportive space for growth, while The Forum embodies a setting for noble discussions and philosophical debate. This combination suggests that a gracious foundation encourages open dialogue and the exchange of ideas, inviting you to engage in thoughtful conversations that can enrich perspectives and strengthen community bonds.
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
The Host and The State together illustrate the interplay between nurturing environments and structured authority. The Host represents shelter and grace, providing a supportive space, while The State embodies organization and political frameworks. This combination suggests that a gracious foundation can enhance the effectiveness of authority, indicating that fostering a nurturing atmosphere within organized systems can lead to more compassionate governance and stronger community ties, ultimately promoting collective well-being.
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
The Fork and The Port together highlight the significance of choices in exploring new opportunities. The Fork represents diverging paths driven by hunger and desire, while The Port symbolizes gateways to discovery and trade. This combination suggests that as you encounter various options, each choice can lead to new avenues for exploration and exchange, encouraging you to embrace the journey of discovery and make decisions that resonate with your true aspirations and potential.
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
The Fork and The Tree together emphasize the relationship between choice and growth. The Fork represents diverging paths influenced by hunger and desire, while The Tree symbolizes fullness and the potential for expansive growth. This combination suggests that the choices you make can significantly impact your development, encouraging you to explore different avenues that resonate with your aspirations, ultimately leading to a richer and more fulfilling journey as you reach for your goals.
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
The Fork and The Agent together highlight the importance of making empowered choices in pursuing your desires. The Fork signifies diverging paths driven by hunger and the need for resonance, while The Agent embodies independence and the will to take action. This combination suggests that as you encounter various options, it is essential to assert your autonomy and make deliberate choices, encouraging you to follow the path that aligns with your true aspirations and actively shape your journey.
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
The Fork and The Table together illustrate the significance of choices in the context of community and collaboration. The Fork represents diverging paths driven by hunger and desire, while The Table symbolizes a space for gathering and sharing ideas. This combination suggests that the decisions you make can lead to meaningful interactions and collective efforts, encouraging you to engage with others at the table to explore different perspectives and collaboratively plot your future while satisfying mutual aspirations.
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
The Fork and The Clone together emphasize the choices that lead to reflection and shared experiences. The Fork signifies diverging paths influenced by hunger and desire, while The Clone embodies the mirroring and reproduction of ideas, highlighting concepts of equality. This combination suggests that the decisions you make can create opportunities for collaboration and mutual understanding, encouraging you to explore paths that not only fulfill your personal desires but also resonate with others, fostering a sense of community and shared growth.
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
The Fork and The Cache together highlight the choices that lead to the discovery of valuable insights and resources. The Fork represents diverging paths driven by hunger and desire, while The Cache symbolizes the accumulation of secrets and knowledge. This combination suggests that the decisions you make can unlock hidden wealth and insights, encouraging you to explore various options that resonate with your aspirations, ultimately guiding you toward the knowledge and resources that can enrich your journey.
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
The Fork and The Frame together underscore the importance of perspective in navigating choices. The Fork represents diverging paths driven by hunger and desire, while The Frame provides the structure and context that shape your understanding. This combination suggests that the decisions you face require a clear perspective, encouraging you to evaluate your options thoughtfully and consider how your state of mind influences the paths you choose, ultimately guiding you toward fulfilling experiences aligned with your true aspirations.
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
The Fork and The Shell together illustrate the balance between making choices and establishing protective boundaries. The Fork represents diverging paths driven by hunger and desire, while The Shell symbolizes protection and rigidity. This combination suggests that as you navigate different options, it is essential to set clear boundaries that safeguard your well-being, ensuring that your choices resonate with your true needs while providing a protective framework to support your journey.
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
The Fork and The Forum together emphasize the significance of choice in the context of thoughtful discourse and community engagement. The Fork represents diverging paths driven by hunger and desire, while The Forum embodies a space for nobility, philosophy, and debate. This combination suggests that the decisions you make can lead to meaningful discussions and collaborative exploration of ideas, encouraging you to engage with others in a way that enriches your understanding and helps navigate the various paths available to you.
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
The Fork and The State together highlight the interplay between personal choices and structured systems of authority. The Fork represents diverging paths driven by hunger and desire, while The State embodies organization and political frameworks. This combination suggests that the decisions you make can significantly impact how you navigate established systems, indicating that understanding the political landscape and exercising your agency in choosing paths can lead to a more empowered and informed engagement with the structures that govern your environment.
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
The Port and The Tree together symbolize the potential for exploration and expansive growth. The Port represents gateways to new opportunities and discoveries, while The Tree embodies fullness and the capacity to reach outward. This combination suggests that embracing new experiences and exchanges can lead to significant personal and communal growth, encouraging you to venture through new gateways that enhance your connections and allow you to flourish in various aspects of life.
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
The Port and The Agent together highlight the importance of taking independent action in exploring new opportunities. The Port represents gateways to discovery and trade, while The Agent embodies the will and autonomy necessary to act decisively. This combination suggests that embracing your independence allows you to navigate through new gateways, encouraging you to actively pursue discoveries and engage in exchanges that align with your aspirations and enhance your journey.
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
The Port and The Table together emphasize the significance of connections and collaboration in exploring new opportunities. The Port represents gateways to discovery and trade, while The Table symbolizes gathering and the sharing of ideas. This combination suggests that engaging with others at the table can facilitate meaningful exchanges and collaborative efforts, encouraging you to use the gateways of discovery to enhance collective understanding and create shared plots for future endeavors.
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
The Port and The Clone together highlight the potential for discovery through shared experiences and equality in exchanges. The Port represents gateways to new opportunities and trade, while The Clone embodies the mirroring and reproduction of ideas. This combination suggests that engaging with others can lead to valuable discoveries, emphasizing that equitable exchanges and the sharing of perspectives can enhance understanding and foster a collaborative environment where all voices contribute to the journey of exploration.
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
The Port and The Cache together symbolize the intersection of exploration and the accumulation of valuable insights. The Port represents gateways to discovery and trade, while The Cache signifies hidden knowledge and resources. This combination suggests that navigating new opportunities can lead to uncovering secrets and wealth in knowledge, encouraging you to engage in trade and exploration that enhances your understanding and access to valuable resources for personal and collective growth.
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
The Port and The Frame together highlight the importance of perspective in navigating new opportunities. The Port represents gateways to discovery and trade, while The Frame provides the structure and context that shape your understanding. This combination suggests that as you explore new avenues, having a clear perspective allows you to effectively evaluate and engage with those opportunities, encouraging you to utilize structured thinking to maximize the benefits of your discoveries and exchanges.
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
The Port and The Shell together illustrate the balance between exploration and establishing protective boundaries. The Port represents gateways to discovery and trade, while The Shell symbolizes protection and rigidity. This combination suggests that while venturing through new opportunities is essential for growth, it is equally important to maintain boundaries that safeguard your well-being and provide a sense of security, ensuring that your explorations are both enriching and safe.
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
The Port and The Forum together emphasize the significance of engaging in meaningful discussions as a pathway to discovery. The Port represents gateways to new opportunities and trade, while The Forum embodies a space for nobility, philosophy, and debate. This combination suggests that exploring new avenues is enriched through intellectual engagement and dialogue, encouraging you to share ideas and insights with others in a way that fosters mutual understanding and enhances the collective journey of exploration.
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
The Port and The State together illustrate the interplay between exploration and structured authority. The Port represents gateways to discovery and trade, while The State embodies organization and political frameworks. This combination suggests that navigating new opportunities often requires an understanding of the established systems and structures that govern them, emphasizing the importance of engaging with the political landscape to effectively leverage discoveries and trade while ensuring compliance with organizational norms.
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
The Tree and The Agent together highlight the synergy between personal growth and independent action. The Tree represents fullness and expansive growth, while The Agent embodies the will to act and the importance of autonomy. This combination suggests that true growth is achieved through the exercise of independence, encouraging you to take decisive actions that align with your aspirations, ultimately allowing your potential to flourish and reach new heights.
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
The Tree and The Table together emphasize the importance of community and collaboration in fostering growth. The Tree symbolizes fullness and expansive reach, while The Table represents gathering and the sharing of ideas. This combination suggests that personal and communal growth is enhanced through collective engagement, encouraging you to come together with others to share resources, plot future endeavors, and cultivate a nurturing environment where everyone can thrive.
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
The Tree and The Clone together highlight the theme of growth through reflection and shared experiences. The Tree represents fullness and expansive reach, while The Clone embodies the mirroring and reproduction of ideas, emphasizing equality. This combination suggests that true growth is fostered in an environment where ideas and experiences can be reflected and shared, encouraging collaborative efforts that nurture equality and allow for collective flourishing as individuals contribute to the growth of the whole.
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
The Tree and The Cache together symbolize the richness of growth derived from hidden knowledge and resources. The Tree represents fullness and expansive growth, while The Cache signifies the accumulation of secrets and valuable insights. This combination suggests that true growth is not only about reaching outward but also about tapping into hidden resources and knowledge, encouraging you to explore and uncover the wealth that lies beneath the surface, ultimately enhancing both personal and communal development.
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
The Tree and The Frame together highlight the importance of perspective in nurturing growth and potential. The Tree symbolizes fullness and expansive reach, while The Frame provides the structure and context that shape understanding. This combination suggests that achieving significant growth requires a clear perspective and supportive framework, encouraging you to cultivate a mindset that fosters both personal development and an awareness of how structure can enhance your ability to thrive and extend your reach.
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
The Tree and The Shell together illustrate the balance between growth and the need for protection. The Tree represents fullness and expansive growth, while The Shell embodies protection and the establishment of boundaries. This combination suggests that while striving for growth and reaching new heights is essential, it is equally important to create protective boundaries that safeguard your well-being, ensuring that your development occurs in a secure environment where you can thrive without compromising your stability.
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
The Tree and The Forum together emphasize the role of intellectual engagement in fostering growth and understanding. The Tree symbolizes fullness and expansive reach, while The Forum represents a space for nobility, philosophy, and debate. This combination suggests that true growth is enriched through thoughtful discussion and the exchange of ideas, encouraging you to engage with others in a way that deepens your understanding and broadens your perspective, ultimately contributing to both personal and communal flourishing.
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
The Tree and The State together illustrate the relationship between growth and structured authority. The Tree represents fullness and expansive growth, while The State embodies organization and political frameworks. This combination suggests that achieving substantial growth often requires navigating established systems and understanding the role of authority, indicating that a supportive structure can enhance your ability to flourish, ensuring that your development aligns with broader organizational goals and societal norms.
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
The Agent and The Table together highlight the importance of independent action within a collaborative context. The Agent represents independence, will, and the drive to take action, while The Table symbolizes gathering and the sharing of ideas. This combination suggests that exercising your autonomy can enrich group dynamics, encouraging you to bring your unique perspective to the table and actively participate in collective efforts, ultimately leading to shared goals and mutual growth.
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
The Agent and The Clone together emphasize the interplay between individual autonomy and shared experiences. The Agent represents independence and the drive to take action, while The Clone embodies the mirroring and reproduction of ideas, highlighting the concept of equality. This combination suggests that while asserting your independence is crucial, it is equally important to recognize and value the reflections and contributions of others, fostering an environment where individual actions can lead to collective growth and understanding.
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
The Agent and The Cache together underscore the importance of independent action in uncovering and utilizing hidden resources. The Agent represents autonomy and the will to act, while The Cache signifies the accumulation of secrets and valuable knowledge. This combination suggests that taking initiative and asserting your independence can lead to the discovery of wealth in insights and resources, encouraging you to leverage your knowledge and skills to enhance both personal growth and collective advancement.
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
The Agent and The Frame together highlight the importance of independent action within a structured context. The Agent represents autonomy and the drive to take decisive action, while The Frame provides the perspective and structure that shape how you approach challenges. This combination suggests that exercising your will effectively requires a clear mindset and a solid framework, encouraging you to align your independent actions with a thoughtful perspective that enhances your ability to navigate and succeed in various situations.
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
The Agent and The Shell together illustrate the balance between independence and the establishment of protective boundaries. The Agent represents autonomy, will, and the drive to take action, while The Shell embodies protection and rigidity. This combination suggests that while asserting your independence is essential for personal growth and action, it is equally important to create boundaries that safeguard your well-being, ensuring that your autonomy is exercised in a manner that respects both your needs and the need for security.
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
The Agent and The Forum together emphasize the role of independent thought and action in fostering meaningful discourse. The Agent represents autonomy and the will to act, while The Forum embodies a space for nobility, philosophy, and debate. This combination suggests that exercising your independence can enrich discussions and collaborative efforts, encouraging you to bring your unique perspectives to the table, engage in thoughtful dialogue, and contribute to deeper understanding and shared exploration of ideas.
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
The Agent and The State together highlight the dynamic between personal autonomy and structured authority. The Agent represents independence and the drive to take action, while The State embodies organization and political frameworks. This combination suggests that while exercising your independence is crucial for personal growth, it is also important to navigate and engage with established systems of authority, indicating that understanding the political landscape can enhance your ability to act effectively and make a meaningful impact within organized structures.
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
The Table and The Clone together emphasize the significance of shared experiences and collaborative efforts in fostering equality. The Table represents gathering and the exchange of ideas, while The Clone embodies mirroring and the reproduction of concepts. This combination suggests that coming together at the table encourages the sharing of diverse perspectives, allowing for the reproduction of ideas that reflect collective understanding and promote equality, ultimately enriching the communal experience and fostering deeper connections among individuals.
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
The Table and The Cache together highlight the importance of communal sharing in unlocking hidden knowledge and resources. The Table represents gathering and the exchange of ideas, while The Cache signifies the accumulation of secrets and valuable insights. This combination suggests that coming together to share experiences and resources can lead to the discovery of wealth in knowledge, encouraging collaboration and open dialogue that enhances collective understanding and fosters a richer, more informed community.
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
The Table and The Frame together emphasize the role of structured dialogue in shaping collective understanding and action. The Table represents gathering and the exchange of ideas, while The Frame provides the perspective and context that shape discussions. This combination suggests that effective gatherings require a clear structure that guides the conversation, encouraging participants to share their viewpoints in a way that enhances mutual understanding and helps plot a coherent path forward, facilitating collaboration and informed decision-making.
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
The Table and The Shell together illustrate the balance between communal engagement and the need for protective boundaries. The Table represents gathering and the sharing of ideas, while The Shell embodies protection and the establishment of limits. This combination suggests that while fostering collaboration and open dialogue is essential for growth, it is equally important to create a safe environment with clear boundaries, ensuring that interactions remain respectful and supportive, allowing for fruitful exchanges without compromising individual well-being.
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
The Table and The Forum together highlight the significance of communal discourse in fostering meaningful dialogue and shared understanding. The Table represents gathering and the exchange of ideas, while The Forum embodies a space for nobility, philosophy, and debate. This combination suggests that coming together to discuss important topics encourages thoughtful engagement, allowing participants to explore diverse perspectives and collaboratively develop plots for future action, ultimately enriching the collective knowledge and strengthening community ties.
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
The Table and The State together illustrate the interplay between communal engagement and structured authority. The Table represents gathering and the exchange of ideas, while The State embodies organization and political frameworks. This combination suggests that effective decision-making and plotting for the future require both collective input and an understanding of the organizational structures that govern actions, emphasizing the importance of collaboration within established systems to achieve meaningful outcomes and foster a sense of community.
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
The combination of The Clone and The Cache suggests a deep exploration of mirrored truths and hidden wisdom. The Clone emphasizes the notion of replication and equality, indicating that what you see in others may reflect your own qualities. Meanwhile, The Cache signifies the accumulation of secrets and knowledge, hinting at untapped resources or insights. Together, they encourage you to examine the connections between your relationships and the wealth of understanding that may lie beneath the surface.
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
The Clone and The Frame together emphasize the interplay between reflection and perception. The Clone highlights themes of duplication and equality, suggesting that what is mirrored may reveal deeper truths about oneself. Meanwhile, The Frame introduces the idea of perspective, providing a structured context through which to view these reflections. This combination encourages you to consider how your understanding of identity and equality is shaped by the frameworks you adopt.
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
The Clone and The Shell together reflect a tension between mirroring and containment. The Clone signifies the replication of ideas or identities, emphasizing equality and reflection, while The Shell represents the need for protection and the establishment of firm boundaries. This combination suggests a situation where the desire for equality and reproduction may be hindered by rigid structures or protective measures, highlighting the challenge of balancing openness with the necessity of safeguarding personal or collective interests.
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
The Clone and The Forum together highlight the dynamic interplay between reflection and discourse. The Clone signifies the replication of ideas and the importance of equality, while The Forum embodies a space for philosophical exploration and debate. This combination suggests that through dialogue and shared perspectives, mirrored experiences can lead to deeper understanding and collective growth.
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
The Clone and The State together highlight the interplay between individuality and collective structure. The Clone signifies the reflection and replication of identities, suggesting a focus on equality and shared experiences, while The State emphasizes the importance of organization and governance. This combination points to the need for balance between personal expression and societal norms, illustrating how mirrored identities can influence or challenge existing political frameworks.
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
The combination of The Cache and The Frame suggests a powerful interplay between hidden knowledge and the way it is perceived. The Cache symbolizes accumulated secrets and wealth of information, while The Frame provides the structure that shapes one's understanding and perspective. Together, they highlight the importance of context in interpreting hidden resources, urging you to examine how your mindset influences the value you attribute to what you know.
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
The combination of The Cache and The Shell suggests a dynamic interplay between hidden resources and the need for safeguarding them. The Cache signifies valuable secrets and knowledge that can lead to wealth, while The Shell represents the protective boundaries that can also become rigid. Together, this pairing implies that while it is essential to guard your insights and resources, an overly rigid approach may hinder their growth and accessibility.
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
The combination of The Cache and The Forum suggests a rich dialogue surrounding hidden knowledge and value. The Cache implies a reservoir of secrets and insights that can be shared, while The Forum represents a space for noble discourse and philosophical exploration. Together, these cards indicate that uncovering hidden wealth of wisdom can lead to profound discussions, challenging ideas, and the potential for collective growth.
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
The Cache combined with The State suggests a dynamic interplay between hidden knowledge and established power structures. The Cache represents valuable secrets and insights that can influence wealth and understanding, while The State embodies the organized systems of authority that govern society. This combination indicates that leveraging hidden knowledge may be essential for navigating or reshaping political landscapes.
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
The Frame combined with The Shell illustrates the interplay between perspective and the need for protection. The Frame offers a structured viewpoint, guiding how you interpret experiences, while The Shell provides necessary boundaries to safeguard your mental and emotional space. Together, they suggest that while it’s important to maintain a clear structure in your life, it’s equally crucial to recognize when rigidity may hinder growth or connection.
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
The combination of The Frame and The Forum highlights the interplay between personal perspective and collective discourse. The Frame sets the structural boundaries of understanding and influences how one perceives the world, while The Forum invites engagement in higher philosophical debates and the exchange of noble ideas. Together, they suggest that a well-defined mindset can enrich discussions, allowing for a deeper exploration of beliefs and values within a community.
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
The Frame and The State together indicate a critical alignment between personal perspective and external authority. The Frame establishes the mental structure through which one views the world, while The State embodies the organized systems and power dynamics at play. This combination suggests that your current viewpoint may be influencing or being influenced by larger political or organizational forces, highlighting the importance of understanding how personal perceptions shape and are shaped by societal structures.
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
The Shell combined with The Forum highlights the tension between protection and openness. The Shell signifies established boundaries and a defensive stance, while The Forum embodies the spirit of discourse and philosophical exploration. This pairing suggests a need to balance personal rigidity with the pursuit of communal understanding, encouraging the examination of one’s beliefs within a broader context while remaining mindful of the walls that may inhibit growth.
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
The Shell and The State together suggest a complex interplay between security and governance. The Shell provides a protective boundary, emphasizing the need for personal space and stability, while The State represents the structures and systems of authority that shape collective interactions. This combination highlights the tension between individual protection and societal organization, indicating that rigid boundaries may impact how authority is perceived and enacted within a community.
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
The combination of The Forum and The State highlights the interplay between intellectual discourse and structured governance. The Forum signifies the arena of ideas, where philosophical discussions shape values and beliefs, while The State represents the established order that enforces these concepts through authority. Together, they suggest that meaningful debates within society have the power to influence political structures, urging a balance between thought and action in the pursuit of societal progress.
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

/** Insert a line break after each sentence-ending punctuation. */
function sWithSentenceBreaks(sParagraph: string): string {
  return sParagraph.replace(
    /([.!?]["'\u201d\u2019]?)(\s+)(?=[A-Z"'\u201c\u2018])/g,
    '$1\n\n',
  )
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
    let sResult = sWithSentenceBreaks(sParagraph.trim())

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
