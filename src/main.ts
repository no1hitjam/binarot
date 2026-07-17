import './style.css'
import { sCardIconMarkup } from './cardIcons'
import { sCompatibilityText } from './compatibilityTexts'
import { sReadingText, sStyledReadingText, type tOperator } from './readingTexts'
import { sReadingSigilMarkup } from './readingSigil'
import { sExploreMarkup, vBindExplore, vSetExploreActive } from './explore'
import { sFloatMarkup, vBindFloat, vSetFloatActive } from './float'
import { sHouseMarkup, vBindHouse, vSetHouseActive } from './house'
import { sMatrixMarkup, vBindMatrixRain, vSetMatrixActive } from './matrix'
import { sPlatformMarkup, vBindPlatform, vSetPlatformActive } from './platform'
import { sForestMarkup, vBindForest, vSetForestActive } from './forest'
import { sCollectMarkup, vBindCollect, vSetCollectActive } from './collect'
import { sCollectionMarkup, vBindCollection, vSetCollectionActive } from './collection'
import { sSchoolMarkup, vBindSchool, vSetSchoolActive } from './school'
import { sDiamondMarkup, vBindDiamond, vSetDiamondActive } from './diamond'
import { sRogueMarkup, vBindRogue, vSetRogueActive } from './rogue'
import { sFifteenMarkup, vBindFifteen, vSetFifteenActive } from './fifteen'
import { sPickupMarkup, vBindPickup, vSetPickupActive } from './pickup'
import { sGemsMarkup } from './gems'
import { sPlanetsMarkup, vBindPlanetsOrbitHover } from './planets'
import { sStarmapMarkup, vBindStarmapHover } from './starmap'

type tCard = {
  sName: string
  sBinaryValue: string
  sMeaning: string
  sDescription: string
  sSign: string
}

type tCardPage = {
  sSlug: string
  sName: string
  sLabel: string
  sMeaning: string
  sDescription: string
}

const arrCards: tCard[] = [
  {
    sName: 'The Seed',
    sBinaryValue: '0',
    sMeaning: 'beginnings, ideas, and origins',
    sDescription:
      `
      The Seed (0) represents pure, unmanifested potential—the quiet space of 0000 before the first switch is flipped. It is the absolute origin where form has not yet restricted function, holding every possible variable and path in perfect suspension. Like a blank canvas or a clean codebase before the first line is written, it is the receptive vacuum from which all complexity eventually flows.
      <br><br>
      Those who embody this archetype are the ultimate initiators and conceptualists, highly comfortable with ambiguity and the raw "what if." They excel at sparking the initial vision and generating a flood of ideas at the start of a cycle. Because their strength lies in the realm of pure potential, their primary growth area is maintaining awareness of the transition from concept to execution, ensuring they don't lose interest before their ideas have a chance to take root.
      `,
    sSign:
      'You are someone who lives near beginnings. Ideas gather around you before they harden into plans, and you often sense the shape of a thing before anyone else names it. Quiet potential is your native weather—you would rather start true than finish loud.',
  },
  {
    sName: 'The Flag',
    sBinaryValue: '1',
    sMeaning: 'claims, power, and sovereignty',
    sDescription:
      `
      The Flag (1)—conceptually grounded in the singular, active state of 0001—represents the moment of assertion, claiming territory, and the establishment of boundaries. It is the first bit flipped, breaking the quiet vacuum of the zero-state to declare: "I am here, and this is defined." This archetype is about taking up space, establishing a clear identity, and laying down the rules of engagement. Like a flag planted in new soil or an declared variable in a program, it brings order, structure, and sovereignty to what was previously unmapped and open.
      <br><br>
      Those who embody this archetype are natural leaders, pioneers, and protectors who excel at setting boundaries and defining direction. They are highly principled individuals who carry a strong sense of personal sovereignty and are not afraid to take a stand or declare their intentions to the world. Because their strength lies in assertion and protection, their primary growth area is staying aware of the line between healthy boundary-setting and rigid defensiveness, ensuring that in claiming their space, they remain open to collaboration.
      `,
    sSign:
      'You are a person who plants a stake and means it. Once you claim a cause, a boundary, or a truth, others feel the air change. Sovereignty sits naturally on you—not as bluster, but as the calm insistence that your position is real and must be answered.',
  },
  {
    sName: 'The Call',
    sBinaryValue: '10',
    sMeaning: 'summonings, duty, and serendipity',
    sDescription:
      `
      The Call (2)—conceptually grounded in the distinct state of 0010—represents the moment of interruption, alignment, and the unexpected knock at the door. It is the sudden signal that disrupts the status quo, demanding attention and shifting one's trajectory. This archetype is about resonance, timing, and the bridge between personal destiny and external necessity. Like a hardware interrupt in a system or a sudden, meaningful coincidence, it forces a pause to receive a message, reminding us that we operate within a larger, interconnected web of purpose.
      <br><br>
      Those who embody this archetype are highly responsive, intuitive, and duty-bound individuals who excel at recognizing and answering pivotal moments. They are the ones who notice the quiet signs of change, step up when a crisis calls for a leader, or gracefully pivot their lives when serendipity points them in a new direction. Because their strength lies in their deep sensitivity to external signals and obligations, their primary growth area is maintaining a strong sense of self, ensuring they don't get so caught up in answering every external demand that they neglect their own internal compass.
      `,
    sSign:
      'You are tuned to interruption and invitation. Duty finds you, chance redirects you, and you answer more often than you refuse. Your life tends to turn on messages from outside yourself—you are less a closed circuit than a line waiting to ring.',
  },
  {
    sName: 'The Link',
    sBinaryValue: '11',
    sMeaning: 'connections, promises, and security',
    sDescription:
      `
      The Link (11)—conceptually grounded in the paired, active state of 0011—represents binding, bridging, and the creation of intellectual and social networks. It is the active synthesis of two distinct points, transforming individual elements or concepts into a shared system. This archetype is about the spark of contact, the exchange of information, and the security that comes from being deeply integrated into a network. Like a high-bandwidth communication channel or a master key, it thrives on making disparate parts talk to one another, finding the common thread that unites them.
      <br><br>
      Those who embody this archetype are the ultimate connectors, social catalysts, and curious synthesizers. They are outgoing, highly communicative, and excel at weaving together people, ideas, and systems that might otherwise never meet. They possess a natural talent for rapidly understanding new concepts and translating them for others, serving as the social glue in any group. Because their strength lies in constant movement, curiosity, and building bridges, their primary growth area is cultivating depth alongside breadth, ensuring they don't spread their energy so thin across so many connections that they lose their own grounding.
      `,
    sSign:
      'You are defined by what you bind together. Promises matter to you, and so does the quiet security of a trusted bond. People come to you to be connected—to each other, to a plan, to a sense that the handshake will hold.',
  },
  {
    sName: 'The Host',
    sBinaryValue: '100',
    sMeaning: 'shelter, ownership, and grace',
    sDescription:
      `
      The Host (100)—conceptually grounded in the foundational state of 0100—represents stewardship, structure, and the creation of space for others. It is the archetype of the vessel, the architecture, and the guardian of the hearth who sets the stage for life to unfold. This archetype is about the responsibilities of ownership and the quiet grace of providing security, warmth, and sanctuary. Like a robust server hosting an application, a physical home, or an open door, it establishes a stable, welcoming environment where others can gather, co-exist, and thrive.
      <br><br>
      Those who embody this archetype are natural protectors, facilitators, and system-builders who find deep fulfillment in supporting others. They excel at managing resources, creating order, and offering generous, non-judgmental support that makes people feel safe and valued. Because their strength lies in stewardship and holding space, their primary growth area is maintaining healthy personal boundaries, ensuring they do not overextend their resources or lose their own identity in the process of accommodating everyone else.
      `,
    sSign:
      'You are a steward by instinct. You make room—physical, emotional, logistical—so that others and their work can land safely. Ownership, for you, looks like caretaking: the grace of keeping the lights on and the door unlocked for the right people.',
  },
  {
    sName: 'The Fork',
    sBinaryValue: '101',
    sMeaning: 'hunger, resonance, and diverging paths',
    sDescription:
      `
      The Fork (101)—conceptually grounded in the active, oscillating state of 0101—represents divergence, deep desire, and the tension of the crossroads. It is the archetype of the split path and the hunger—whether for knowledge, experience, or change—that drives us to choose one direction over another. Rather than static stability, it embodies the energy of resonance, where two possibilities vibrate in opposition, demanding a choice. Like a conditional branch in a program, a fork in the road, or a tuning fork humming with potential, it is the moment where passive existence must transform into an active, definitive direction.
      <br><br>
      Those who embody this archetype are highly driven, passionate, and deeply receptive individuals who are constantly attuned to the possibilities around them. They possess a profound hunger for growth and excel at navigating complex transitions, never content to stay stagnant when a new horizon beckons. Because their strength lies in this intense drive and their comfort at the crossroads, their primary growth area is staying aware of the restlessness or decision paralysis that can arise from seeing too many paths, learning to commit to a chosen direction without constantly wondering about the road not taken.
      `,
    sSign:
      'You are someone who feels the split in the road before it arrives. Appetite and intuition guide you; you taste a path and know whether it resonates. Choice does not frighten you—divergence is how your life stays honest.',
  },
  {
    sName: 'The Port',
    sBinaryValue: '110',
    sMeaning: 'gateways, discovery, and trade',
    sDescription:
      `
      The Port (110)—conceptually grounded in the active, transitionary state of 0110—represents the interface, the gateway, and the marketplace of exchange. It is the designated point where the internal meets the external, serving as a protective yet open threshold where the foreign becomes familiar. This archetype is about discovery, the flow of new ideas, and the mutual enrichment of trade. Like an input/output port in a system, a bustling harbor, or a welcoming customs house, it regulates the boundary where different worlds meet, deciding what to let in and what to send out into the world.
      <br><br>  
      Those who embody this archetype are natural facilitators, adventurers, and cultural translators who thrive at the intersection of different worlds. They are highly curious, open-minded, and excel at negotiating exchanges, introducing new ideas, and turning unfamiliar situations into valuable opportunities. Because their strength lies in managing these busy, open thresholds, their primary growth area is maintaining a clear sense of their own core identity, ensuring they don't lose their grounding or let their personal boundaries become compromised in the constant flux of incoming and outgoing energy.
      `,
    sSign:
      'You live at thresholds. Strangers, ideas, and goods pass through your life and leave both sides altered. Discovery suits you; so does exchange. You are less a sealed room than an open harbor where traffic is welcome and meaning is traded.',
  },
  {
    sName: 'The Tree',
    sBinaryValue: '111',
    sMeaning: 'fullness, growth, and reach',
    sDescription:
      `
      The Tree (111)—conceptually grounded in the fully active, triple-one state of 0111—represents vitality, abundance, and expansive maturation. It is the archetype of organic development, where roots run deep into established foundations while branches reach outward and upward to claim the sky. This archetype is about taking up space in a healthy, generative way, transforming resources into sustainable growth, and providing shelter and fruit to the surrounding ecosystem. Like a fully compiled, running application, a mature oak, or a thriving community, it embodies the realization of potential through steady, structured expansion.
      <br><br>
      Those who embody this archetype are grounded, resilient, and deeply generative individuals who naturally foster growth in themselves and those around them. They possess a remarkable capacity for endurance and excel at taking long-term visions and nurturing them into robust, sprawling realities. Because their strength lies in their massive capacity for growth and reach, their primary growth area is staying aware of the physical and energetic limits of their expansion, ensuring they do not overextend their branches to the point of breaking or neglect the quiet root-work that keeps them anchored.
      `,
    sSign:
      'You are someone whose growth has become structure. Roots and reach both matter to you; you want depth and canopy at once. People find shade in what you have built—and you take quiet pride in how much has been allowed to flourish under your care.',
  },
  {
    sName: 'The Agent',
    sBinaryValue: '1000',
    sMeaning: 'independence, will, and action',
    sDescription:
      `
      The Agent (1000)—conceptually grounded in the stark, pioneering state of 1000—represents raw agency, self-determination, and the force of individual will. It is the archetype of the self-starting actor, breaking away from collective systems or passive waiting to take direct, decisive action. This archetype is about autonomy, personal responsibility, and the courage to operate independently of external validation or permission. Like an autonomous program execution thread, a lone explorer, or a self-directed force, it is the active spark that translates intent into immediate, tangible reality.
      <br><br>
      Those who embody this archetype are highly independent, self-motivated, and action-oriented individuals who excel when given the freedom to pave their own way. They are natural self-starters who don't wait for instructions, possessing a strong inner drive and the determination to overcome obstacles through sheer willpower. Because their strength lies in their fierce self-reliance and bias for action, their primary growth area is staying aware of the value of collaboration, ensuring they don't isolate themselves or run ahead so fast that they leave behind the very networks and communities that could support them.
      `,
    sSign:
      'You move because you chose to. Independence is not a pose for you—it is how decisions get made. Waiting for permission rarely suits you; will and action arrive together, and the world learns your shape by watching what you do next.',
  },
  {
    sName: 'The Table',
    sBinaryValue: '1001',
    sMeaning: 'gathering, consumption, and plots',
    sDescription:
      `
      The Table (1001)—conceptually grounded in the structured, containing state of 1001—represents the locus of convergence, shared resources, and strategic alignment. It is the archetype of the platform where disparate parties pull up a chair to feast, negotiate, or conspire. This archetype is about the intersection of social gathering, the energy of consumption (taking in ideas, power, or sustenance), and the formulation of structured plans or hidden agendas. Like a dining table, a corporate boardroom, or a database index, it is the surface upon which raw elements are brought together to be digested, analyzed, and synthesized into collective action.
      <br><br>
      Those who embody this archetype are master coordinators, strategists, and gatherers who thrive on bringing people together for a purpose. They excel at orchestrating behind-the-scenes dynamics, facilitating important discussions, and aligning diverse interests over shared experiences or resources. They are highly perceptive planners who understand how to digest complex situations and map out the next moves. Because their strength lies in strategic gathering and consumption, their primary growth area is staying aware of the line between constructive planning and exclusive plotting, ensuring their tables remain spaces of genuine collaboration rather than transactional politics.
      `,
    sSign:
      'You are at your sharpest when people gather. Meals, councils, and quiet plots over a shared surface are your element. Plans become real when spoken in your company—and what is said at your table has a way of rearranging the room.',
  },
  {
    sName: 'The Clone',
    sBinaryValue: '1010',
    sMeaning: 'mirrors, reproduction, and equality',
    sDescription:
      `
      The Clone (1010)—conceptually grounded in the alternating, repeating pattern of 1010—represents symmetry, replication, and the pursuit of fundamental balance. It is the archetype of the mirror, reflecting reality back to itself, and the process of reproduction that ensures continuity and scale. This archetype is about finding resonance through similarity, establishing equal footing, and recognizing oneself in the external world. Like a clean class instantiator, a genetic duplicate, or a perfectly balanced scale, it seeks to eliminate disparity and highlight the universal patterns that connect us all as equals.
      <br><br>
      Those who embody this archetype are highly empathetic, observant, and fair-minded individuals who excel at mediation, replication, and scaling ideas. They have a rare gift for truly seeing others, acting as a clear mirror that helps people understand themselves, and they are passionate advocates for equity and shared human experience. Because their strength lies in reflection, harmony, and replication, their primary growth area is cultivating their own distinct, singular identity, ensuring they don't get so caught up in mirroring others or reproducing existing models that they lose touch with their own unique voice.
      `,
    sSign:
      'You see patterns everywhere and know what deserves to be repeated. Mirrors and likenesses fascinate you; equality is both comfort and question. You multiply what works—and you notice when sameness starts to erase the original spark.',
  },
  {
    sName: 'The Cache',
    sBinaryValue: '1011',
    sMeaning: 'secrets, knowledge, and wealth',
    sDescription:
      `
      The Cache (1011)—conceptually grounded in the dense, high-value state of 1011—represents preservation, deep reserves, and the storage of power. It is the archetype of the vault, the archive, and the hidden wellspring of wealth—whether that wealth is measured in gold, data, or esoteric truths. This archetype is about keeping things safe, recognizing the power of delayed gratification, and understanding that information or resources held in reserve can change the course of events when deployed at the exact right moment. Like a high-speed memory cache, a hidden vault, or a locked library, it is a secure space where value is concentrated and protected from the wear and tear of the outside world.
      <br><br>  
      Those who embody this archetype are highly analytical, observant, and self-reliant individuals who serve as natural guardians of valuable resources and hidden truths. They possess a deep thirst for knowledge and excel at collecting, organizing, and retaining complex information or assets that others might overlook. They are quiet strategists who understand the leverage of keeping their cards close to their chest. Because their strength lies in preservation and deep reserve, their primary growth area is staying aware of when to open the vault, ensuring they do not let their desire for security turn into hoarding, or their love of secrets isolate them from meaningful exchange.
      `,
    sSign:
      'You keep what was costly to learn. Secrets, craft, and quiet reserves live close to your attention—available to those who earn the key, invisible to those who do not. You hoard wisely, and you know that stale treasure can mislead as easily as it can save.',
  },
  {
    sName: 'The Frame',
    sBinaryValue: '1100',
    sMeaning: 'perspective, structure, and state of mind',
    sDescription:
      `
      The Frame (1100)—conceptually grounded in the structured, boundary-setting state of 1100—represents the filters of perception, structural architecture, and the mental models that shape our reality. It is the archetype of context, determining not just what we see, but how we see and interpret it. This archetype is about defining boundaries, establishing systemic rules, and understanding that the way a problem is structured dictates its solutions. Like a viewport in a graphics engine, a architectural frame, or a cognitive paradigm, it provides the vital perimeter and structural support that gives raw content its meaning and stability.
      <br><br>
      Those who embody this archetype are highly analytical, self-aware, and structural thinkers who excel at analyzing situations from multiple angles. They possess a keen understanding of psychology and systems, allowing them to step back and consciously adjust their perspective when faced with a challenge. They are excellent at organizing chaos, defining scopes, and helping others see the bigger picture by reframing their experiences. Because their strength lies in defining structures and managing states of mind, their primary growth area is staying aware of when a frame has become too rigid, ensuring their mental models adapt to new data rather than trying to force reality to fit their predetermined boundaries.
      `,
    sSign:
      'You understand that the story changes with the window. Perspective is your craft; state of mind is something you notice and adjust. Where others see a fixed scene, you see a frame that can be shifted—and with it, a different truth.',
  },
  {
    sName: 'The Shell',
    sBinaryValue: '1101',
    sMeaning: 'protection, boundaries, and rigidity',
    sDescription:
      `
      The Shell (1101)—conceptually grounded in the dense, protective state of 1101—represents armor, hard boundaries, and structural defense. It is the archetype of the perimeter, designed to shield a vulnerable interior from the chaotic and potentially damaging forces of the external environment. This archetype is about self-preservation, the establishment of absolute limits, and the creation of a safe harbor where internal processes can run without interference. Like a command-line interface guarding an operating system's kernel, a physical exoskeleton, or an emotional firewall, it provides the uncompromising barrier necessary to survive hostile conditions.
      <br><br>
      Those who embody this archetype are incredibly resilient, reliable, and protective individuals who excel at managing risk and maintaining stability under pressure. They are the bedrock of their communities or projects, serving as a dependable shield for those who are more vulnerable and standing firm when things get chaotic. Because their strength lies in defense and holding the line, their primary growth area is staying aware of when their protective armor has hardened into counterproductive rigidity, ensuring they don't lock themselves away so tightly that they prevent growth, connection, or necessary change from reaching them.
      `,
    sSign:
      'You know the worth of a hard edge. Boundaries protect what is soft in you, and rigidity is a tool you use on purpose. Others may call you closed; you call it interface—armor that lets the kernel keep running without every storm getting in.',
  },
  {
    sName: 'The Forum',
    sBinaryValue: '1110',
    sMeaning: 'nobility, philosophy, and debate',
    sDescription:
      `
      The Forum (1110)—conceptually grounded in the high-level, structured, and expansive state of 1110—represents the elevation of raw conflict into intellectual exchange, civic duty, and the pursuit of truth. It is the archetype of the public square, the high court, and the academic assembly. This archetype is about the pursuit of noble ideals, the testing of concepts through rigorous dialectic, and the belief that through respectful debate, a community can discover the best path forward. Like an open-source consensus protocol, a philosophical symposium, or a legislative chamber, it provides the structured platform where ideas are weighed, challenged, and refined.
      <br><br>
      Those who embody this archetype are principled, articulate, and civic-minded individuals who thrive on intellectual challenge and the exchange of perspectives. They possess a deep love of wisdom, a strong sense of justice, and a natural ability to elevate conversations above petty grievances to focus on core principles and systemic truths. Because their strength lies in their high ideals and love of debate, their primary growth area is staying aware of when intellectualizing becomes a barrier to practical action, ensuring they do not get so lost in the elegance of theory and discourse that they lose touch with the immediate, human realities on the ground.
      `,
    sSign:
      'You thrive where ideas contend under fair rules. Philosophy and debate are not sport alone for you—they are how dignity is earned. You prefer the public square of thought to silent hierarchy, and status means more when it survives an argument.',
  },
  {
    sName: 'The State',
    sBinaryValue: '1111',
    sMeaning: 'organization, authority, and politics',
    sDescription:
      `
      The State (1111)—conceptually grounded in the fully active, maximum capacity state of 1111—represents systemic organization, centralized authority, and the intricate machinery of governance. It is the archetype of the fully realized, complex system where all switches are flipped to "on," representing the peak of structure, law, and collective resource management. This archetype is about maintaining order on a grand scale, balancing competing interests through political compromise, and creating the sweeping frameworks that allow societies or massive infrastructures to function predictably. Like a complete, running operating system kernel, a central government, or an established corporate structure, it brings absolute definition and systemic control to the collective.
      <br><br>
      Those who embody this archetype are master organizers, administrators, and political strategists who possess a rare talent for managing large-scale complexity. They are highly systematic, pragmatic, and excel at building, maintaining, and navigating institutional structures to achieve collective goals. They understand how to delegate power, balance budgets, and enforce rules to keep chaos at bay. Because their strength lies in systemic control and institutional maintenance, their primary growth area is staying aware of the creeping weight of bureaucracy and inertia, ensuring they don't value the preservation of the system's power over the actual well-being of the individuals it was built to serve.
      `,
    sSign:
      'You see the system under the personalities. Organization and collective order come naturally; you think in institutions, rules, and the weight that holds many people together. Power, for you, is structural—less about the spotlight than about how the whole machine runs.',
  },
]

const arrOperatorPages: tCardPage[] = [
  {
    sSlug: 'and',
    sName: 'AND',
    sLabel: '&',
    sMeaning: 'intersection, filtering, and what both cards share',
    sDescription:
      'AND is the coin of intersection. It keeps only what both cards share, filtering the reading down to overlap, necessity, and the narrow truth that survives scrutiny. In bitwise terms it is masking; in meaning it is discernment—what remains when excess is refused.',
  },
  {
    sSlug: 'or',
    sName: 'OR',
    sLabel: '|',
    sMeaning: 'union, expansion, and everything either card offers',
    sDescription:
      'OR is the coin of union. It gathers everything either card offers, expanding the field instead of cutting it down. Bitwise it sets bits generously; symbolically it is inclusion, abundance, and the permission to hold more than one truth at once.',
  },
]

function objCardPageFromCard(objCard: tCard): tCardPage {
  return {
    sSlug: objCard.sBinaryValue,
    sName: objCard.sName,
    sLabel: objCard.sBinaryValue,
    sMeaning: objCard.sMeaning,
    sDescription: objCard.sDescription,
  }
}

const arrCardPages: tCardPage[] = [...arrCards.map(objCardPageFromCard), ...arrOperatorPages]

function objFindCardPage(sSlug: string): tCardPage | undefined {
  return arrCardPages.find((objPage: tCardPage) => objPage.sSlug === sSlug)
}

function nCardValue(objCard: tCard): number {
  return parseInt(objCard.sBinaryValue, 2)
}

function objFindCardByValue(nValue: number): tCard {
  return arrCards.find((objCard: tCard) => nCardValue(objCard) === nValue)!
}

function arrDrawTwoCards(): [tCard, tCard] {
  const nFirst = Math.floor(Math.random() * arrCards.length)
  let nSecond = Math.floor(Math.random() * (arrCards.length - 1))

  if (nSecond >= nFirst) {
    nSecond += 1
  }

  return [arrCards[nFirst]!, arrCards[nSecond]!]
}

function sFlipCoin(): tOperator {
  return Math.random() < 0.5 ? 'AND' : 'OR'
}

function objResolveReading(objLeft: tCard, objRight: tCard, sOp: tOperator): tCard {
  const nLeft = nCardValue(objLeft)
  const nRight = nCardValue(objRight)
  const nResult = sOp === 'AND' ? nLeft & nRight : nLeft | nRight
  return objFindCardByValue(nResult)
}

function sCardItemMarkup(objCard: tCard): string {
  return `
    <a class="card-item card-item-link" href="#card/${objCard.sBinaryValue}">
      ${sCardIconMarkup(objCard.sBinaryValue)}
      <h3>${objCard.sName} <span class="binary-value">(${objCard.sBinaryValue})</span></h3>
      <p>Represents ${objCard.sMeaning}.</p>
    </a>
  `
}

const sDevAiInstructions =
  `
  AI Prompt for readings:
  <br><br>
  Binarot is a tarot-like deck where the rules are to draw two cards and flip a coin to get an AND/OR operation to apply. This results in a final card. Given the following reading, generate a single phrase of reflection that the sequence gives rise to.
  
  <br><br>

  For example, The Seed (0) AND The Flag (1) = 0. Reflection: Exploring origins before lines were drawn
  Another example, The Fork (101) OR The Tree (111) = 111. Reflection: Growth leading to more growth

  <br><br>
 `

function arrOrderedPair(objLeft: tCard, objRight: tCard): [tCard, tCard] {
  return nCardValue(objLeft) <= nCardValue(objRight) ? [objLeft, objRight] : [objRight, objLeft]
}

function sReadingResultMarkup(
  objLeft: tCard,
  objRight: tCard,
  sOp: tOperator,
  bIncludeAiInstructions: boolean = false,
): string {
  const [objLow, objHigh] = arrOrderedPair(objLeft, objRight)
  const objResult = objResolveReading(objLow, objHigh, sOp)
  const sSymbol = sOp === 'AND' ? '&' : '|'
  const sText = sReadingText(objLow.sBinaryValue, objHigh.sBinaryValue, sOp)
  const sTextMarkup = sText
    ? `<p class="reading-text">${sStyledReadingText(sText, arrCardPages)}</p>`
    : ''
  const sAiMarkup = bIncludeAiInstructions
    ? `<p class="dev-ai-instructions">${sDevAiInstructions}</p>`
    : ''

  return `
    <div class="reading-spread">
      ${sCardItemMarkup(objLow)}
      <div class="reading-coin" aria-label="Coin landed on ${sOp}">
        <span class="reading-coin-face">${sOp}</span>
        <span class="reading-coin-symbol binary-value">${sSymbol}</span>
      </div>
      ${sCardItemMarkup(objHigh)}
    </div>
    <p class="reading-equation">
      <span class="binary-value">${objLow.sBinaryValue}</span>
      ${sSymbol}
      <span class="binary-value">${objHigh.sBinaryValue}</span>
      =
      <span class="binary-value">${objResult.sBinaryValue}</span>
    </p>
    <div class="reading-final">
      <h3>Result</h3>
      ${sCardItemMarkup(objResult)}
      ${sAiMarkup}
      ${sTextMarkup}
      ${sReadingSigilMarkup(objLow.sBinaryValue, objHigh.sBinaryValue, sOp)}
    </div>
  `
}

function sCardOptionsMarkup(sSelectedBinary: string): string {
  return arrCards
    .map((objCard: tCard) => {
      const sSelected = objCard.sBinaryValue === sSelectedBinary ? ' selected' : ''
      return `<option value="${objCard.sBinaryValue}"${sSelected}>${objCard.sName} (${objCard.sBinaryValue})</option>`
    })
    .join('')
}

const sCardsMarkup: string = arrCardPages
  .map(
    (objPage: tCardPage) => `
      <li>
        <a class="card-item card-item-link" href="#card/${objPage.sSlug}">
          ${sCardIconMarkup(objPage.sSlug)}
          <h3>${objPage.sName} <span class="binary-value">(${objPage.sLabel})</span></h3>
          <p>Represents ${objPage.sMeaning}.</p>
        </a>
      </li>
    `,
  )
  .join('')

const bShowDevPanel = true

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main class="site">
    <header class="site-header">
      <h1>Binarot</h1>
      <p>A binary tarot system of symbols and meaning.</p>
    </header>

    <nav class="tabs" aria-label="Binarot sections">
      <button type="button" class="tab-button is-active" data-tab="cards" aria-selected="true">Cards</button>
      <button type="button" class="tab-button" data-tab="reading" aria-selected="false">Reading</button>
      <button type="button" class="tab-button" data-tab="quiz" aria-selected="false">Quiz</button>
      <button type="button" class="tab-button" data-tab="starmap" aria-selected="false">Starmap</button>
      <button type="button" class="tab-button" data-tab="planets" aria-selected="false">Planets</button>
      <button type="button" class="tab-button" data-tab="gems" aria-selected="false">Gems</button>
      <button type="button" class="tab-button" data-tab="matrix" aria-selected="false">Matrix</button>
      <button type="button" class="tab-button" data-tab="sparkles" aria-selected="false">Sparkles</button>
      <button type="button" class="tab-button" data-tab="pilgrim" aria-selected="false">Pilgrim</button>
      <button type="button" class="tab-button" data-tab="house" aria-selected="false">House</button>
      <button type="button" class="tab-button" data-tab="platform" aria-selected="false">Platform</button>
      <button type="button" class="tab-button" data-tab="forest" aria-selected="false">Forest</button>
      <button type="button" class="tab-button" data-tab="packs" aria-selected="false">Packs</button>
      <button type="button" class="tab-button" data-tab="collection" aria-selected="false">Collection</button>
      <button type="button" class="tab-button" data-tab="school" aria-selected="false">School</button>
      <button type="button" class="tab-button" data-tab="diamond" aria-selected="false">Diamond</button>
      <button type="button" class="tab-button" data-tab="rogue" aria-selected="false">Rogue</button>
      <button type="button" class="tab-button" data-tab="fifteen" aria-selected="false">Thirty-one</button>
      <button type="button" class="tab-button" data-tab="pickup" aria-selected="false">Pickup</button>
      ${bShowDevPanel ? '<button type="button" class="tab-button" data-tab="dev" aria-selected="false">Dev</button>' : ''}
      <button type="button" class="tab-button" data-tab="about" aria-selected="false">About</button>
    </nav>

    <section class="tab-panel is-active" data-panel="cards">
      <div id="cards-index">
        <h2>Binarot Cards and Operations</h2>
        <ul class="card-list">
          ${sCardsMarkup}
        </ul>
      </div>
      <div id="cards-detail" class="card-detail" hidden></div>
    </section>

    <section class="tab-panel" data-panel="reading">
      <h2>Binarot Reading</h2>
      <p class="reading-intro">
        Draw two cards and flip the AND/OR coin. The coin chooses whether the cards are combined with
        bitwise <code>AND</code> or <code>OR</code>, yielding a final binary result.
      </p>
      <button type="button" class="reading-draw" id="reading-draw">Draw a reading</button>
      <div class="reading-result" id="reading-result" hidden></div>
    </section>

    <section class="tab-panel" data-panel="birthday">
      <h2>Birthday Sign</h2>
      <p class="reading-intro">
        Enter your birth month and day to get your binarot sign.
      </p>
      <form class="birthday-controls" id="birthday-form">
        <label class="dev-field">
          <span>Month</span>
          <select id="birthday-month" name="month"></select>
        </label>
        <label class="dev-field">
          <span>Day</span>
          <select id="birthday-day" name="day"></select>
        </label>
      </form>
      <div class="birthday-result" id="birthday-result"></div>

      <div class="birthday-compat">
        <h3>Compatibility</h3>
        <p class="reading-intro">
          Enter another birthday to see how the two signs relate—as friends, partners, or something in between.
        </p>
        <form class="birthday-controls birthday-controls-compat" id="compat-form">
          <label class="dev-field">
            <span>Their month</span>
            <select id="compat-month" name="compat-month"></select>
          </label>
          <label class="dev-field">
            <span>Their day</span>
            <select id="compat-day" name="compat-day"></select>
          </label>
        </form>
        <div class="compat-result" id="compat-result"></div>
      </div>

      <div class="birthday-special">
        <h3>Special dates</h3>
        <p class="reading-intro">
          Day 0 of each sign—when the year steps into a new binary weather.
        </p>
        <ul class="special-dates-list" id="special-dates-list"></ul>
      </div>
    </section>

    <section class="tab-panel" data-panel="quiz">
      <h2>Sign Quiz</h2>
      <p class="reading-intro">
        Answer four questions to find which binarot sign you represent.
        Each question has four choices; your pattern of answers reveals your sign.
      </p>
      <div class="quiz-stage" id="quiz-stage"></div>
    </section>

    <section class="tab-panel" data-panel="starmap">
      <h2>Starmap</h2>
      <p class="reading-intro">
        Each sign has a place in the binary sky. Values
        <code>0</code>–<code>111</code> map to the northern hemisphere;
        <code>1000</code>–<code>1111</code> to the southern.
      </p>
      ${sStarmapMarkup()}
    </section>

    <section class="tab-panel" data-panel="planets">
      <h2>Planets</h2>
      <p class="reading-intro">
        Each world wears one binarot sign. The Sun is The Seed (<code>0</code>); planets, moons,
        and Pluto take the rest through <code>1111</code>, paired for fit. The chart uses
        approximate heliocentric positions for today (log radius; moons drawn near their parent).
      </p>
      ${sPlanetsMarkup(arrCards)}
    </section>

    <section class="tab-panel" data-panel="gems">
      <h2>Gems</h2>
      <p class="reading-intro">
        Each binarot sign has a gemstone paired for fit—from The Seed’s pearl through The State’s
        diamond. Stones are chosen for meaning, not mineralogy textbooks.
      </p>
      ${sGemsMarkup(arrCards)}
    </section>

    <section class="tab-panel" data-panel="matrix">
      <h2>Matrix</h2>
      <p class="reading-intro">
        Binary rain in the binarot register—bits, masks, and operations falling through the void.
      </p>
      ${sMatrixMarkup()}
    </section>

    <section class="tab-panel" data-panel="sparkles">
      <h2>Sparkles</h2>
      <p class="reading-intro">
        The full deck drifts through depth—faces turn, signs tumble, and every card eventually returns.
      </p>
      ${sFloatMarkup()}
    </section>

    <section class="tab-panel" data-panel="pilgrim">
      <h2>Pilgrim</h2>
      <p class="reading-intro">
        Wandering a generated landscape of ridges, valleys, gold-lit peaks, and scattered flora in the void.
        Planets drift across the sky while the pilgrim walks toward the nearest unvisited statue.
      </p>
      ${sExploreMarkup()}
    </section>

    <section class="tab-panel" data-panel="house">
      <h2>House</h2>
      <p class="reading-intro">
        A text adventure through a quiet house. Explore room by room and find all sixteen binarot cards.
      </p>
      ${sHouseMarkup()}
    </section>

    <section class="tab-panel" data-panel="platform">
      <h2>Platform</h2>
      <p class="reading-intro">
        Side-scroll endlessly through the void. On desktop, click the stage first so it can take keyboard focus.
      </p>
      ${sPlatformMarkup()}
    </section>

    <section class="tab-panel" data-panel="forest">
      <h2>Forest</h2>
      <p class="reading-intro">
        Fog swallows the trees. Sixteen binarot cards hang among the trunks—collect them all.
        Something tall walks when you look away.
      </p>
      ${sForestMarkup()}
    </section>

    <section class="tab-panel" data-panel="packs">
      <h2>Packs</h2>
      <p class="reading-intro">
        Open packs of five binarot cards. Most pulls are Standard—rarer Verdant, Azure,
        and Gold tints (the same palette as Platform) show up less often.
      </p>
      ${sCollectMarkup()}
    </section>

    <section class="tab-panel" data-panel="collection">
      <h2>Collection</h2>
      <p class="reading-intro">
        Every sign has four color variants. Flip between tint pages to browse full cards; locked
        slots stay face-down until you pull that variant.
      </p>
      ${sCollectionMarkup()}
    </section>

    <section class="tab-panel" data-panel="school">
      <h2>School</h2>
      <p class="reading-intro">
        Binarot Academy — a short visual novel. Meet students who embody each binarot sign,
        then wander the campus until the deck has faces.
      </p>
      ${sSchoolMarkup()}
    </section>

    <section class="tab-panel" data-panel="diamond">
      <h2>Diamond</h2>
      <p class="reading-intro">
        Crystal scenes cycle through the void—geometry, particles, and color shift
        while binarot signs drift the perimeter. Move to drift the gaze.
      </p>
      ${sDiamondMarkup()}
    </section>

    <section class="tab-panel" data-panel="rogue">
      <h2>Rogue</h2>
      <p class="reading-intro">
        A traditional ASCII dungeon. Explore rooms, fight monsters, and collect all
        sixteen binarot cards marked <code>*</code> on the floor.
      </p>
      ${sRogueMarkup()}
    </section>

    <section class="tab-panel" data-panel="fifteen">
      <h2>Thirty-one</h2>
      <p class="reading-intro">
        Draw cards and add their values toward <code>11111</code> (31).
        Bust if you go over. Three other players play before you; the dealer
        shows one card. No betting — just win, lose, or push for fun.
        The shoe is four suits of the full deck plus face cards
        The Barony, The Manor, The Castle, and The Hall (each worth 15). Dealer stands on 24 or higher.
      </p>
      ${sFifteenMarkup()}
    </section>

    <section class="tab-panel" data-panel="pickup">
      <h2>Pickup</h2>
      <p class="reading-intro">
        Scatter the full deck face-up across the table. Drag cards to rearrange,
        then click them in binary order from <code>0</code> to <code>1111</code>.
        Best time is saved.
      </p>
      ${sPickupMarkup()}
    </section>

    ${
      bShowDevPanel
        ? `
    <section class="tab-panel" data-panel="dev">
      <h2>Dev Reading</h2>
      <p class="reading-intro">
        Choose any two cards and coin face to preview a reading.
      </p>
      <form class="dev-controls" id="dev-form">
        <label class="dev-field">
          <span>First card</span>
          <select id="dev-left" name="left">${sCardOptionsMarkup('0')}</select>
        </label>
        <label class="dev-field">
          <span>Coin</span>
          <select id="dev-op" name="op">
            <option value="AND" selected>AND</option>
            <option value="OR">OR</option>
          </select>
        </label>
        <label class="dev-field">
          <span>Second card</span>
          <select id="dev-right" name="right">${sCardOptionsMarkup('1')}</select>
        </label>
      </form>
      <div class="reading-result" id="dev-result"></div>
    </section>
        `
        : ''
    }

    <section class="tab-panel" data-panel="about">
      <h2>About Binarot</h2>
      <p>
        Binarot blends symbolic tarot interpretation with binary operations.
      </p>
      <p>
        There is an associated symbol for each binary number <code>0</code> to <code>1111</code>.
      </p>
      <p>
        The rules are to draw two cards and flip a coin (Heads is AND, Tails is OR) to get an AND/OR operation to apply and get a result. The job of the reader is to interpret the result in context of the operation that created it. For this site, the reader is me having prompted AI to get a reading for every combination.
      </p>
      <p>
        The card symbols were chosen by myself, a human, as both meaningful symbols slightly related to their given numbers, but also computer puns.
      </p>
    </section>
  </main>
`

const sCookieTab = 'binarot_tab'
const sCookieUnlock = 'binarot_unlock'
const nCookieMaxAge = 60 * 60 * 24 * 365
const arrUnlockOrder = [
  'cards',
  'reading',
  'quiz',
  'starmap',
  'planets',
  'gems',
  'matrix',
  'sparkles',
  'pilgrim',
  'house',
  'platform',
  'forest',
  'packs',
  'collection',
  'school',
  'diamond',
  'rogue',
  'fifteen',
  'pickup',
  'about',
] as const
const sDefaultUnlock = 'reading'

function sCookieValue(sName: string): string | null {
  const sPrefix = `${encodeURIComponent(sName)}=`
  const arrParts = document.cookie.split(';')

  for (const sPart of arrParts) {
    const sTrimmed = sPart.trim()
    if (sTrimmed.startsWith(sPrefix)) {
      return decodeURIComponent(sTrimmed.slice(sPrefix.length))
    }
  }

  return null
}

function vSetCookie(sName: string, sValue: string): void {
  document.cookie = `${encodeURIComponent(sName)}=${encodeURIComponent(sValue)}; path=/; max-age=${nCookieMaxAge}; SameSite=Lax`
}

const arrTabButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('.tab-button'))
const arrTabPanels = Array.from(document.querySelectorAll<HTMLElement>('.tab-panel'))
const objCardsIndex = document.querySelector<HTMLElement>('#cards-index')!
const objCardsDetail = document.querySelector<HTMLElement>('#cards-detail')!

type tRoute =
  | { sKind: 'tab'; sTabId: string }
  | { sKind: 'card'; sSlug: string }

function sAliasTabId(sTabId: string): string {
  if (sTabId === 'magic' || sTabId === 'void') {
    return 'sparkles'
  }
  if (sTabId === 'birthday') {
    return 'quiz'
  }
  if (sTabId === 'collect') {
    return 'packs'
  }
  if (sTabId === 'citadel') {
    return 'diamond'
  }
  return sTabId
}

function nUnlockIndex(sTabId: string): number {
  return arrUnlockOrder.indexOf(sAliasTabId(sTabId) as (typeof arrUnlockOrder)[number])
}

function bUnlockTabId(sTabId: string): boolean {
  return nUnlockIndex(sTabId) >= 0
}

function sNormalizeUnlock(sTabId: string | null): string {
  if (sTabId !== null && bUnlockTabId(sTabId)) {
    return sAliasTabId(sTabId)
  }
  return sDefaultUnlock
}

let sFurthestUnlocked = sNormalizeUnlock(sCookieValue(sCookieUnlock))

{
  const sSavedTab = sCookieValue(sCookieTab)
  const sSavedMapped = sSavedTab !== null ? sAliasTabId(sSavedTab) : null
  if (
    sSavedMapped !== null &&
    bUnlockTabId(sSavedMapped) &&
    nUnlockIndex(sSavedMapped) > nUnlockIndex(sFurthestUnlocked)
  ) {
    sFurthestUnlocked = sSavedMapped
    vSetCookie(sCookieUnlock, sFurthestUnlocked)
  }
}

function bTabUnlocked(sTabId: string): boolean {
  if (sTabId === 'dev') {
    return true
  }
  const nTab = nUnlockIndex(sTabId)
  if (nTab < 0) {
    return false
  }
  return nTab <= nUnlockIndex(sFurthestUnlocked)
}

function vSyncTabVisibility(): void {
  arrTabButtons.forEach((objTabButton: HTMLButtonElement) => {
    const sTabId = objTabButton.dataset.tab
    if (!sTabId) {
      return
    }
    objTabButton.hidden = !bTabUnlocked(sTabId)
  })
}

function vUnlockNextFrom(sTabId: string): void {
  const nTab = nUnlockIndex(sTabId)
  if (nTab < 0) {
    return
  }

  const sNext = arrUnlockOrder[nTab + 1]
  if (!sNext) {
    return
  }

  if (nUnlockIndex(sNext) <= nUnlockIndex(sFurthestUnlocked)) {
    return
  }

  sFurthestUnlocked = sNext
  vSetCookie(sCookieUnlock, sFurthestUnlocked)
  vSyncTabVisibility()
}

function bTabExists(sTabId: string): boolean {
  return arrTabButtons.some((objButton: HTMLButtonElement) => objButton.dataset.tab === sTabId)
}

function objRouteFromHash(): tRoute | null {
  const sHash = location.hash.replace(/^#/, '')
  if (!sHash) {
    return null
  }

  const arrCard = /^card\/(.+)$/.exec(sHash)
  if (arrCard) {
    return { sKind: 'card', sSlug: arrCard[1]! }
  }

  if (bTabExists(sHash) && bTabUnlocked(sHash)) {
    return { sKind: 'tab', sTabId: sHash }
  }

  return null
}

/** Pull the first sentence of the second paragraph onto its own styled line. */
function sStyledCardDescription(sDescription: string): string {
  const sTrimmed = sDescription.trim()
  if (!sTrimmed) {
    return ''
  }

  const arrParagraphs = sTrimmed.split(/<br\s*\/?>\s*<br\s*\/?>/i)
  if (arrParagraphs.length < 2) {
    return sTrimmed
  }

  const sSecond = arrParagraphs[1]!.trim()
  const objFirst = /^([^\s][^.!?]*)([.!?]["'\u201d\u2019]?)/.exec(sSecond)
  if (!objFirst) {
    return sTrimmed
  }

  const sFirst = `${objFirst[1]}${objFirst[2]}`
  const sRest = sSecond.slice(sFirst.length).trimStart()
  arrParagraphs[1] =
    `<strong class="card-detail-lead">${sFirst}</strong>${sRest}`

  return arrParagraphs.map((sParagraph: string) => sParagraph.trim()).join('<br><br>')
}

function sCardDetailMarkup(objPage: tCardPage): string {
  return `
    <button type="button" class="card-detail-back" id="card-detail-back">&larr; All cards</button>
    <div class="card-detail-header">
      ${sCardIconMarkup(objPage.sSlug, 'card-icon-detail')}
      <div class="card-detail-heading">
        <h2>${objPage.sName} <span class="binary-value">(${objPage.sLabel})</span></h2>
        <p class="card-detail-meaning">Represents ${objPage.sMeaning}.</p>
      </div>
    </div>
    <p class="card-detail-description">${sStyledCardDescription(objPage.sDescription)}</p>
  `
}

const objVoidCardPage: tCardPage = {
  sSlug: '-1',
  sName: 'The Void',
  sLabel: '-1',
  sMeaning: 'absence, unbeing, and what lies outside the register',
  sDescription: `
      The Void (−1) is not a sign in the deck. It is the underflow beneath <code>0</code>, the value the register was never meant to hold. Sixteen faces claim the bits from Seed to State; this one claims the error—the place where naming fails and the chart tears.
      <br><br>
      Those who land here did not choose a family or a role. They chose the fifth answer every time: the refusal, the unmarked path, the option that is not on the list. The Void does not describe a temperament so much as a glitch in temperament—an identity that will not compile into binary weather.
      `,
}

const sVoidSignText =
  'You are not on the map. Where others resolve into a sign, you remain the gap between bits—the refusal, the hush, the place the system does not name. The Void is not empty so much as uncounted.'

let nVoidGlitchTimer = 0
const arrVoidGlitchNoise = ['░', '▒', '▓', '█', '¤', 'Ø', '¿', '�', '0', '1']

function vStopVoidGlitch(): void {
  if (nVoidGlitchTimer !== 0) {
    window.clearInterval(nVoidGlitchTimer)
    nVoidGlitchTimer = 0
  }
}

function sVoidCardDetailMarkup(): string {
  return `
    <button type="button" class="card-detail-back" id="card-detail-back">&larr; Retreat</button>
    <div class="card-detail-void" id="void-card-detail">
      <div class="void-glitch-scan" aria-hidden="true"></div>
      <div class="card-detail-header void-glitch-header">
        <div class="void-glitch-icon">
          ${sCardIconMarkup(objVoidCardPage.sSlug, 'card-icon-detail void-glitch-icon-svg')}
        </div>
        <div class="card-detail-heading">
          <h2>
            <span class="void-glitch-title" data-text="${objVoidCardPage.sName}">
              <span class="void-glitch-title-text">${objVoidCardPage.sName}</span>
            </span>
            <span class="binary-value void-glitch-label">(${objVoidCardPage.sLabel})</span>
          </h2>
          <p class="card-detail-meaning void-glitch-meaning">Represents ${objVoidCardPage.sMeaning}.</p>
        </div>
      </div>
      <p class="card-detail-description void-glitch-body">${sStyledCardDescription(objVoidCardPage.sDescription)}</p>
      <p class="void-glitch-status" id="void-glitch-status" aria-hidden="true">ERR // SIGN_INDEX=-1 // UNMAPPED</p>
    </div>
  `
}

function vStartVoidGlitch(): void {
  vStopVoidGlitch()
  const objRoot = document.querySelector<HTMLElement>('#void-card-detail')
  const objLabel = document.querySelector<HTMLElement>('.void-glitch-label')
  const objStatus = document.querySelector<HTMLElement>('#void-glitch-status')
  if (!objRoot || !objLabel || !objStatus) {
    return
  }

  const sLabelClean = `(${objVoidCardPage.sLabel})`
  nVoidGlitchTimer = window.setInterval(() => {
    const bHard = Math.random() < 0.28
    objRoot.classList.toggle('is-glitching', bHard)
    objRoot.style.setProperty('--void-glitch-x', `${(Math.random() * 10 - 5).toFixed(1)}px`)
    objRoot.style.setProperty('--void-glitch-y', `${(Math.random() * 6 - 3).toFixed(1)}px`)
    objRoot.style.setProperty('--void-glitch-skew', `${(Math.random() * 4 - 2).toFixed(2)}deg`)

    if (bHard) {
      const sNoise = Array.from({ length: 3 }, () => {
        return arrVoidGlitchNoise[Math.floor(Math.random() * arrVoidGlitchNoise.length)]
      }).join('')
      objLabel.textContent = `(${sNoise})`
      objStatus.textContent = `ERR // ${sNoise}${sNoise} // FRAME_${Math.floor(Math.random() * 999)}`
    } else {
      objLabel.textContent = sLabelClean
      objStatus.textContent = 'ERR // SIGN_INDEX=-1 // UNMAPPED'
    }
  }, 140)
}

function vShowCardsIndex(): void {
  vStopVoidGlitch()
  objCardsIndex.hidden = false
  objCardsDetail.hidden = true
  objCardsDetail.innerHTML = ''
}

function vShowCardPage(sSlug: string): void {
  if (sSlug === objVoidCardPage.sSlug) {
    vStopVoidGlitch()
    objCardsIndex.hidden = true
    objCardsDetail.hidden = false
    objCardsDetail.innerHTML = sVoidCardDetailMarkup()
    document.querySelector<HTMLButtonElement>('#card-detail-back')?.addEventListener('click', () => {
      vNavigate('quiz')
    })
    vStartVoidGlitch()
    return
  }

  const objPage = objFindCardPage(sSlug)

  if (!objPage) {
    vShowCardsIndex()
    return
  }

  vStopVoidGlitch()
  objCardsIndex.hidden = true
  objCardsDetail.hidden = false
  objCardsDetail.innerHTML = sCardDetailMarkup(objPage)
  document.querySelector<HTMLButtonElement>('#card-detail-back')?.addEventListener('click', () => {
    vNavigate('cards')
  })
}

function vActivateTab(sTabId: string): void {
  arrTabButtons.forEach((objTabButton: HTMLButtonElement) => {
    const bIsActive = objTabButton.dataset.tab === sTabId
    objTabButton.classList.toggle('is-active', bIsActive)
    objTabButton.setAttribute('aria-selected', String(bIsActive))
  })

  arrTabPanels.forEach((objPanel: HTMLElement) => {
    objPanel.classList.toggle('is-active', objPanel.dataset.panel === sTabId)
  })

  vSetMatrixActive(sTabId === 'matrix')
  vSetFloatActive(sTabId === 'sparkles')
  vSetExploreActive(sTabId === 'pilgrim')
  vSetHouseActive(sTabId === 'house')
  vSetPlatformActive(sTabId === 'platform')
  vSetForestActive(sTabId === 'forest')
  vSetCollectActive(sTabId === 'packs')
  vSetCollectionActive(sTabId === 'collection')
  vSetSchoolActive(sTabId === 'school')
  vSetDiamondActive(sTabId === 'diamond')
  vSetRogueActive(sTabId === 'rogue')
  vSetFifteenActive(sTabId === 'fifteen')
  vSetPickupActive(sTabId === 'pickup')
  vSetCookie(sCookieTab, sTabId)
  vUnlockNextFrom(sTabId)
}

function vSyncRoute(): void {
  const objRoute = objRouteFromHash()

  if (objRoute === null) {
    const sHash = location.hash.replace(/^#/, '')
    if (sHash && bTabExists(sHash) && !bTabUnlocked(sHash)) {
      vNavigate('cards', true)
      return
    }
    vShowCardsIndex()
    return
  }

  if (objRoute.sKind === 'card') {
    vActivateTab('cards')
    vShowCardPage(objRoute.sSlug)
    return
  }

  vActivateTab(objRoute.sTabId)
  vShowCardsIndex()
}

function vNavigate(sHash: string, bReplace: boolean = false): void {
  const sTabId = sHash.startsWith('card/') ? 'cards' : sHash
  if (sTabId !== 'cards' && bTabExists(sTabId) && !bTabUnlocked(sTabId)) {
    vNavigate('cards', true)
    return
  }

  const sUrl = `${location.pathname}${location.search}#${sHash}`
  if (bReplace) {
    history.replaceState(null, '', sUrl)
  } else if (location.hash !== `#${sHash}`) {
    history.pushState(null, '', sUrl)
  }
  vSyncRoute()
}

arrTabButtons.forEach((objButton: HTMLButtonElement) => {
  objButton.addEventListener('click', () => {
    const sTabId = objButton.dataset.tab
    if (!sTabId || !bTabUnlocked(sTabId)) {
      return
    }
    vNavigate(sTabId)
  })
})

window.addEventListener('hashchange', vSyncRoute)
window.addEventListener('popstate', vSyncRoute)

vSyncTabVisibility()

const objInitialRoute = objRouteFromHash()
if (objInitialRoute !== null) {
  vSyncRoute()
} else {
  const sSavedTab = sCookieValue(sCookieTab)
  const sSavedMapped = sSavedTab !== null ? sAliasTabId(sSavedTab) : null
  const sInitialTab =
    sSavedMapped !== null && bTabExists(sSavedMapped) && bTabUnlocked(sSavedMapped)
      ? sSavedMapped
      : 'cards'
  vNavigate(sInitialTab, true)
}

function objFindCardByBinary(sBinary: string): tCard {
  return arrCards.find((objCard: tCard) => objCard.sBinaryValue === sBinary)!
}

const objDrawButton = document.querySelector<HTMLButtonElement>('#reading-draw')!
const objReadingResult = document.querySelector<HTMLDivElement>('#reading-result')!

const arrDrawLoadLines: string[] = [
  'shuffling deck...',
  'drawing left card...',
  'drawing right card...',
  'flipping AND/OR coin...',
  'resolving bitwise operation...',
]

let nDrawLoadTimer: number | undefined

function vClearDrawLoadTimer(): void {
  if (nDrawLoadTimer !== undefined) {
    window.clearTimeout(nDrawLoadTimer)
    nDrawLoadTimer = undefined
  }
}

function vAppendConsoleLine(objLog: HTMLElement, sText: string, sClass: string = ''): void {
  const objLine = document.createElement('p')
  objLine.className = `reading-console-line${sClass ? ` ${sClass}` : ''}`
  objLine.textContent = sText
  objLog.appendChild(objLine)
  const objBody = objLog.closest('.reading-console-body')
  if (objBody) {
    objBody.scrollTop = objBody.scrollHeight
  }
}

function vRunDrawConsole(objLeft: tCard, objRight: tCard, sOp: tOperator): void {
  vClearDrawLoadTimer()

  objDrawButton.disabled = true
  objReadingResult.hidden = false
  objReadingResult.innerHTML = `
    <div class="reading-console" aria-live="polite">
      <div class="reading-console-bar">
        <span class="reading-console-traffic" aria-hidden="true"></span>
        <span class="reading-console-title">binarot://draw</span>
      </div>
      <div class="reading-console-body">
        <p class="reading-console-line reading-console-prompt"><span class="reading-console-caret">&gt;</span> binarot draw</p>
        <p class="reading-console-line reading-console-status">executing...</p>
        <div class="reading-console-log" id="reading-console-log"></div>
      </div>
    </div>
  `

  const objConsole = objReadingResult.querySelector('.reading-console')!
  const objBody = objReadingResult.querySelector('.reading-console-body')!
  const objStatus = objReadingResult.querySelector('.reading-console-status')!
  const objLog = document.querySelector<HTMLElement>('#reading-console-log')!
  let nLineIndex = 0

  function vStep(): void {
    if (nLineIndex < arrDrawLoadLines.length) {
      vAppendConsoleLine(objLog, arrDrawLoadLines[nLineIndex]!)
      nLineIndex += 1
      nDrawLoadTimer = window.setTimeout(vStep, 20 + Math.floor(Math.random() * 30))
      return
    }

    vAppendConsoleLine(objLog, 'done.', 'reading-console-done')
    nDrawLoadTimer = window.setTimeout(() => {
      objStatus.textContent = 'ready.'
      const objOutput = document.createElement('div')
      objOutput.className = 'reading-console-output'
      objOutput.innerHTML = `
        <p class="reading-console-line reading-console-section">── spread ──────────────────────────</p>
        ${sReadingResultMarkup(objLeft, objRight, sOp)}
      `
      objBody.appendChild(objOutput)
      objConsole.classList.add('is-complete')
      objDrawButton.disabled = false
      nDrawLoadTimer = undefined
    }, 180)
  }

  nDrawLoadTimer = window.setTimeout(vStep, 150)
}

objDrawButton.addEventListener('click', () => {
  const [objLeft, objRight] = arrDrawTwoCards()
  const sOp = sFlipCoin()
  vRunDrawConsole(objLeft, objRight, sOp)
})

if (bShowDevPanel) {
  const objDevLeft = document.querySelector<HTMLSelectElement>('#dev-left')!
  const objDevRight = document.querySelector<HTMLSelectElement>('#dev-right')!
  const objDevOp = document.querySelector<HTMLSelectElement>('#dev-op')!
  const objDevResult = document.querySelector<HTMLDivElement>('#dev-result')!

  const sDevCookieLeft = 'binarot_dev_left'
  const sDevCookieRight = 'binarot_dev_right'
  const sDevCookieOp = 'binarot_dev_op'

  function bSelectHasValue(objSelect: HTMLSelectElement, sValue: string): boolean {
    return Array.from(objSelect.options).some(
      (objOption: HTMLOptionElement) => objOption.value === sValue,
    )
  }

  function vRestoreDevControls(): void {
    const sLeft = sCookieValue(sDevCookieLeft)
    const sRight = sCookieValue(sDevCookieRight)
    const sOp = sCookieValue(sDevCookieOp)

    if (sLeft !== null && bSelectHasValue(objDevLeft, sLeft)) {
      objDevLeft.value = sLeft
    }

    if (sRight !== null && bSelectHasValue(objDevRight, sRight)) {
      objDevRight.value = sRight
    }

    if (sOp !== null && bSelectHasValue(objDevOp, sOp)) {
      objDevOp.value = sOp
    }
  }

  function vSaveDevControls(): void {
    vSetCookie(sDevCookieLeft, objDevLeft.value)
    vSetCookie(sDevCookieRight, objDevRight.value)
    vSetCookie(sDevCookieOp, objDevOp.value)
  }

  function vUpdateDevReading(): void {
    const objLeft = objFindCardByBinary(objDevLeft.value)
    const objRight = objFindCardByBinary(objDevRight.value)
    const sOp = objDevOp.value as tOperator

    vSaveDevControls()
    objDevResult.innerHTML = sReadingResultMarkup(objLeft, objRight, sOp, true)
  }

  objDevLeft.addEventListener('change', vUpdateDevReading)
  objDevRight.addEventListener('change', vUpdateDevReading)
  objDevOp.addEventListener('change', vUpdateDevReading)
  vRestoreDevControls()
  vUpdateDevReading()
}

const nDaysInYear = 366
const arrDaysInMonthLeap: number[] = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const arrMonthNames: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function nDayOfYearFromMonthDay(nMonth: number, nDay: number): number {
  let nDayOfYear = 0

  for (let nMonthIndex = 0; nMonthIndex < nMonth - 1; nMonthIndex += 1) {
    nDayOfYear += arrDaysInMonthLeap[nMonthIndex]!
  }

  return nDayOfYear + (nDay - 1)
}

function nSignIndexFromDayOfYear(nDayOfYear: number): number {
  return Math.min(arrCards.length - 1, Math.floor((nDayOfYear * arrCards.length) / nDaysInYear))
}

function nFirstDayOfSign(nSignIndex: number): number {
  return Math.ceil((nSignIndex * nDaysInYear) / arrCards.length)
}

function objMonthDayFromDayOfYear(nDayOfYear: number): { nMonth: number; nDay: number } {
  let nRemaining = nDayOfYear

  for (let nMonthIndex = 0; nMonthIndex < arrDaysInMonthLeap.length; nMonthIndex += 1) {
    const nDaysInMonth = arrDaysInMonthLeap[nMonthIndex]!
    if (nRemaining < nDaysInMonth) {
      return { nMonth: nMonthIndex + 1, nDay: nRemaining + 1 }
    }
    nRemaining -= nDaysInMonth
  }

  return { nMonth: 12, nDay: 31 }
}

function sSpecialDatesMarkup(): string {
  return arrCards
    .map((objCard: tCard, nSignIndex: number) => {
      const { nMonth, nDay } = objMonthDayFromDayOfYear(nFirstDayOfSign(nSignIndex))
      const sDate = `${arrMonthNames[nMonth - 1]} ${nDay}`
      return `
        <li class="special-dates-item">
          <a class="special-dates-link" href="#card/${objCard.sBinaryValue}">
            <span class="special-dates-date">${sDate}</span>
            <span class="special-dates-sign">Day 0 of ${objCard.sName} <span class="binary-value">(${objCard.sBinaryValue})</span></span>
          </a>
        </li>
      `
    })
    .join('')
}

const objBirthdayMonth = document.querySelector<HTMLSelectElement>('#birthday-month')!
const objBirthdayDay = document.querySelector<HTMLSelectElement>('#birthday-day')!
const objBirthdayResult = document.querySelector<HTMLDivElement>('#birthday-result')!
const objCompatMonth = document.querySelector<HTMLSelectElement>('#compat-month')!
const objCompatDay = document.querySelector<HTMLSelectElement>('#compat-day')!
const objCompatResult = document.querySelector<HTMLDivElement>('#compat-result')!
const objSpecialDatesList = document.querySelector<HTMLUListElement>('#special-dates-list')!

function vFillMonthSelect(objSelect: HTMLSelectElement): void {
  objSelect.innerHTML = arrMonthNames
    .map((sName: string, nIndex: number) => `<option value="${nIndex + 1}">${sName}</option>`)
    .join('')
}

function vFillDaySelect(objSelect: HTMLSelectElement, nMonth: number, nSelectedDay: number): void {
  const nDaysInMonth = arrDaysInMonthLeap[nMonth - 1]!
  const nDay = Math.min(nSelectedDay, nDaysInMonth)

  objSelect.innerHTML = Array.from({ length: nDaysInMonth }, (_: unknown, nIndex: number) => {
    const nValue = nIndex + 1
    const sSelected = nValue === nDay ? ' selected' : ''
    return `<option value="${nValue}"${sSelected}>${nValue}</option>`
  }).join('')
}

function objSignFromMonthDay(nMonth: number, nDay: number): { objCard: tCard; nDayOfSign: number } {
  const nDayOfYear = nDayOfYearFromMonthDay(nMonth, nDay)
  const nSignIndex = nSignIndexFromDayOfYear(nDayOfYear)
  const objCard = arrCards[nSignIndex]!
  const nDayOfSign = nDayOfYear - nFirstDayOfSign(nSignIndex)
  return { objCard, nDayOfSign }
}

function vUpdateBirthdaySign(): void {
  const nMonth = Number(objBirthdayMonth.value)
  const nDay = Number(objBirthdayDay.value)
  const { objCard, nDayOfSign } = objSignFromMonthDay(nMonth, nDay)

  objBirthdayResult.innerHTML = `
    <p class="birthday-meta">Day ${nDayOfSign} of ${objCard.sName}</p>
    ${sCardItemMarkup(objCard)}
    <p class="birthday-sign">${objCard.sSign}</p>
  `
  vUpdateCompatibility()
}

function vUpdateCompatibility(): void {
  const nMonth = Number(objBirthdayMonth.value)
  const nDay = Number(objBirthdayDay.value)
  const nTheirMonth = Number(objCompatMonth.value)
  const nTheirDay = Number(objCompatDay.value)
  const { objCard: objYours, nDayOfSign: nYourDayOfSign } = objSignFromMonthDay(nMonth, nDay)
  const { objCard: objTheirs, nDayOfSign: nTheirDayOfSign } = objSignFromMonthDay(
    nTheirMonth,
    nTheirDay,
  )
  const sText = sCompatibilityText(objYours.sBinaryValue, objTheirs.sBinaryValue)
  const sTextMarkup = sText
    ? `<p class="reading-text">${sStyledReadingText(sText, arrCardPages, false)}</p>`
    : ''

  objCompatResult.innerHTML = `
    <p class="birthday-meta">Day ${nYourDayOfSign} of ${objYours.sName} · Day ${nTheirDayOfSign} of ${objTheirs.sName}</p>
    <div class="compat-spread">
      ${sCardItemMarkup(objYours)}
      <div class="compat-join" aria-hidden="true">
        <span class="compat-join-label">X</span>
      </div>
      ${sCardItemMarkup(objTheirs)}
    </div>
    ${sTextMarkup}
  `
}

vFillMonthSelect(objBirthdayMonth)
vFillMonthSelect(objCompatMonth)
objSpecialDatesList.innerHTML = sSpecialDatesMarkup()

const objToday = new Date()
objBirthdayMonth.value = String(objToday.getMonth() + 1)
vFillDaySelect(objBirthdayDay, Number(objBirthdayMonth.value), objToday.getDate())
objCompatMonth.value = String(((objToday.getMonth() + 6) % 12) + 1)
vFillDaySelect(objCompatDay, Number(objCompatMonth.value), objToday.getDate())

objBirthdayMonth.addEventListener('change', () => {
  vFillDaySelect(objBirthdayDay, Number(objBirthdayMonth.value), Number(objBirthdayDay.value))
  vUpdateBirthdaySign()
})
objBirthdayDay.addEventListener('change', vUpdateBirthdaySign)

objCompatMonth.addEventListener('change', () => {
  vFillDaySelect(objCompatDay, Number(objCompatMonth.value), Number(objCompatDay.value))
  vUpdateCompatibility()
})
objCompatDay.addEventListener('change', vUpdateCompatibility)

vUpdateBirthdaySign()

type tQuizAxis = 'family' | 'role'

type tQuizQuestion = {
  sPrompt: string
  sAxis: tQuizAxis
  arrAnswers: [string, string, string, string, string]
}

const nQuizVoidChoice = 4

const arrQuizQuestions: tQuizQuestion[] = [
  {
    sPrompt: 'Where does your energy most naturally live?',
    sAxis: 'family',
    arrAnswers: [
      'Near beginnings—ideas, claims, summons, and the first bonds between people.',
      'In places and paths—shelter, crossroads, thresholds, and things that grow.',
      'In motion and reserve—independent action, gatherings, mirrors, and what you keep.',
      'In frameworks—perspective, armor, debate, and the systems that hold people.',
      'Nowhere I can point to—outside the chart, before a place is chosen.',
    ],
  },
  {
    sPrompt: 'When you leave a mark, what does it most often look like?',
    sAxis: 'role',
    arrAnswers: [
      'An opening—room for something unformed to take shape.',
      'A hard edge—a claim, a cut, a line others have to answer.',
      'A bridge—a signal answered, a gap crossed, a likeness found.',
      'A lasting structure—something that binds, grows, stores, or governs.',
      'No mark at all—the absence where a mark would have been.',
    ],
  },
  {
    sPrompt: 'In a tense room, what are you most likely to do?',
    sAxis: 'family',
    arrAnswers: [
      'Sense what wants to start, name it, or draw people into the first connection.',
      'Make the space safer, name the fork in the road, or open a door to elsewhere.',
      'Act on your own, gather the right people, reflect what you see, or hold a quiet reserve.',
      'Reframe the problem, hold a firm boundary, elevate the debate, or organize the whole.',
      'Step out of the frame—let the room resolve without counting you in it.',
    ],
  },
  {
    sPrompt: 'What do others most reliably come to you for?',
    sAxis: 'role',
    arrAnswers: [
      'A blank page—permission to begin before the shape is clear.',
      'A stake in the ground—clarity about what is claimed and what is not.',
      'A crossing—someone who can carry a message, a deal, or a likeness across a gap.',
      'A finished form—a bond, a canopy, a vault, or a working order that holds.',
      'Nothing they can name—you are the option that does not appear on their list.',
    ],
  },
]

const objQuizStage = document.querySelector<HTMLDivElement>('#quiz-stage')!
const arrQuizAnswers: number[] = []
const arrQuizChoiceLabels = ['A', 'B', 'C', 'D', 'E'] as const

function bQuizAllVoid(): boolean {
  return (
    arrQuizAnswers.length === arrQuizQuestions.length &&
    arrQuizAnswers.every((nChoice: number) => nChoice === nQuizVoidChoice)
  )
}

function nQuizSignIndex(): number {
  const arrScores = Array.from({ length: arrCards.length }, () => 0)
  let nLastFamily = 0
  let nLastRole = 0
  let bHasFamily = false
  let bHasRole = false

  for (let nIndex = 0; nIndex < arrQuizAnswers.length; nIndex += 1) {
    const objQuestion = arrQuizQuestions[nIndex]!
    const nChoice = arrQuizAnswers[nIndex]!
    if (nChoice === nQuizVoidChoice) {
      continue
    }

    if (objQuestion.sAxis === 'family') {
      nLastFamily = nChoice
      bHasFamily = true
      for (let nSign = 0; nSign < arrCards.length; nSign += 1) {
        if ((nSign >> 2) === nChoice) {
          arrScores[nSign]! += 1
        }
      }
    } else {
      nLastRole = nChoice
      bHasRole = true
      for (let nSign = 0; nSign < arrCards.length; nSign += 1) {
        if ((nSign & 3) === nChoice) {
          arrScores[nSign]! += 1
        }
      }
    }
  }

  if (!bHasFamily && !bHasRole) {
    return -1
  }

  const nFallback = (nLastFamily << 2) | nLastRole
  let nBest = nFallback
  let nBestScore = -1

  for (let nSign = 0; nSign < arrScores.length; nSign += 1) {
    const nScore = arrScores[nSign]!
    if (nScore > nBestScore || (nScore === nBestScore && nSign === nFallback)) {
      nBestScore = nScore
      nBest = nSign
    }
  }

  return nBest
}

function sQuizVoidCardMarkup(): string {
  return `
    <a class="card-item card-item-link" href="#card/${objVoidCardPage.sSlug}">
      ${sCardIconMarkup(objVoidCardPage.sSlug)}
      <h3>${objVoidCardPage.sName} <span class="binary-value">(${objVoidCardPage.sLabel})</span></h3>
      <p>Represents ${objVoidCardPage.sMeaning}.</p>
    </a>
  `
}

function vRenderQuiz(): void {
  if (arrQuizAnswers.length >= arrQuizQuestions.length) {
    let sResultMarkup: string
    if (bQuizAllVoid()) {
      sResultMarkup = `
        <p class="birthday-meta">Your quiz sign</p>
        ${sQuizVoidCardMarkup()}
          <p class="birthday-sign">${sVoidSignText}</p>
      `
    } else {
      const objCard = arrCards[nQuizSignIndex()]!
      sResultMarkup = `
        <p class="birthday-meta">Your quiz sign</p>
        ${sCardItemMarkup(objCard)}
        <p class="birthday-sign">${objCard.sSign}</p>
      `
    }

    objQuizStage.innerHTML = `
      ${sResultMarkup}
      <button type="button" class="reading-draw quiz-retake" id="quiz-retake">Retake quiz</button>
    `
    document.querySelector<HTMLButtonElement>('#quiz-retake')!.addEventListener('click', () => {
      arrQuizAnswers.length = 0
      vRenderQuiz()
    })
    return
  }

  const nQuestion = arrQuizAnswers.length
  const objQuestion = arrQuizQuestions[nQuestion]!
  const sChoices = objQuestion.arrAnswers
    .map(
      (sAnswer: string, nChoice: number) => `
        <button type="button" class="quiz-choice" data-choice="${nChoice}">
          <span class="quiz-choice-label">${arrQuizChoiceLabels[nChoice]}</span>
          <span class="quiz-choice-text">${sAnswer}</span>
        </button>
      `,
    )
    .join('')

  objQuizStage.innerHTML = `
    <p class="quiz-progress">Question ${nQuestion + 1} of ${arrQuizQuestions.length}</p>
    <p class="quiz-prompt">${objQuestion.sPrompt}</p>
    <div class="quiz-choices">${sChoices}</div>
  `

  objQuizStage.querySelectorAll<HTMLButtonElement>('.quiz-choice').forEach((objButton) => {
    objButton.addEventListener('click', () => {
      arrQuizAnswers.push(Number(objButton.dataset.choice))
      vRenderQuiz()
    })
  })
}

vRenderQuiz()
vBindStarmapHover()
vBindPlanetsOrbitHover()
vBindMatrixRain()
vBindFloat(arrCards)
vBindExplore(arrCards)
vBindHouse(arrCards)
vBindPlatform()
vBindForest(arrCards)
vBindCollect(arrCards)
vBindCollection(arrCards)
vBindSchool(arrCards)
vBindDiamond(arrCards)
vBindRogue(arrCards)
vBindFifteen(arrCards)
vBindPickup(arrCards)
