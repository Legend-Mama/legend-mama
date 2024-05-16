Usage

To use the AICharGen class:

1. Import the class into your JavaScript file:
    import { AICharGen } from './path_to_file/ai_char_generator/library/AICharGen.js';

2. Create an instance AND initialize AICharGen:
* Must use .initialize() method when creating an instance 

2a. Without vector store ID and assistant ID
    const charGen = await new AICharGen().initialize({});

    *Vector Store ID and Assistant ID can be retrieved by:
    const vsID = await testGen.vectorStoreId;
    const asID = await testGen.assistantId;

2b. If you have a vector store ID and assistant ID, pass as arguments into initialize.
    const charGen = await new AICharGen().initialize({vectorStoreId: "vector_store_id", assistantId: "assistant_id",});

3. Generate a character by passing user input
    const characterSheet = charGen.generateChar(user_input)

Expected User Input (JSON) 
{
  "name": "Caden Windwalker",
  "race": "Elf",
  "class": "Wizard",
  "worldview": "Knowledge is power, Seek truth",
  "ethicalTraits": "Curiosity, Honor, Intellectual Integrity",
  "personalityScores": {
    "Extraversion": "Reserved",
    "Agreeableness": "Helpful",
    "Conscientiousness": "Organized",
    "Neuroticism": "Anxious",
    "OpennessToExperience": "Inquisitive"
  },
  "quirks": "Writes notes on palms, Forgets to sleep when studying",
  "motivations": "Mastering the Arcane Arts, Discovering Ancient Mysteries",
  "fears": "Ignorance, Loss of Control",
  "likes": "Rare Books, Stargazing, Complex Puzzles",
  "dislikes": "Superstition, Disruption of Routine, Chaos",
  "backstory": "Born under an eclipsed moon, Caden was destined for a life intertwined with the arcane. Raised in an esteemed magical academy, every moment was dedicated to the pursuit of knowledge. An unquenchable thirst for understanding the universe's secrets drives him, and though his endeavors isolate him, his path is clear."
};

Expected Output (JSON) 
{
  name: 'Caden Windwalker',
  race: 'High Elf',
  class: 'Wizard',
  background: {
    name: 'Sage',
    description: 'Caden was raised in an esteemed magical academy, dedicating every moment to the pursuit of knowledge and the arcane arts.',
    skills: [ 'Arcana', 'History' ],
    tools: [ "Alchemist's supplies", "Calligrapher's supplies" ],
    languages: [ 'Common', 'Elvish', 'Celestial', 'Draconic' ],
    feature: {
      name: 'Researcher',
      description: 'When you attempt to learn or recall a piece of knowledge, if you do not know that information, you often know where and from whom you can obtain it.'
    }
  },
  alignment: 'Neutral Good',
  abilityScores: {
    strength: { base: 8, bonus: 0 },
    dexterity: { base: 14, bonus: 2 },
    constitution: { base: 13, bonus: 0 },
    intelligence: { base: 15, bonus: 1 },
    wisdom: { base: 12, bonus: 0 },
    charisma: { base: 10, bonus: 0 }
  },
  initiative: 2,
  languages: [ 'Common', 'Elvish', 'Celestial', 'Draconic' ],
  personalityTrait: 'You connect everything that happens to you to a grand, cosmic plan.',
  ideal: 'Seek truth.',
  bond: 'Dedicated to mastering the arcane arts and discovering ancient mysteries.',
  flaw: 'An unquenchable thirst for knowledge can sometimes blind me to the dangers of pursuing it.',
  backstory: "Born under an eclipsed moon, Caden was destined for a life intertwined with the arcane. Raised in an esteemed magical academy, every moment was dedicated to the pursuit of knowledge. An unquenchable thirst for understanding the universe's secrets drives him, and though his endeavors isolate him, his path is clear.",
  quote: 'Knowledge is power.'
}
