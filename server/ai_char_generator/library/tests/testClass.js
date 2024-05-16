import { AICharGen } from "../AICharGen.js";

//const vectorStoreId = "vs_brTEfEm1wNRpKXte2j828ip8";
//assistantId: "asst_6izpt1oFvmW2DYyCm9ONVBZT"

  // vectorStoreId: "vs_brTEfEm1wNRpKXte2j828ip8",
  // assistantId: "asst_6izpt1oFvmW2DYyCm9ONVBZT",

const testGen = await new AICharGen().initialize({
});
const vsID = await testGen.vectorStoreId;
console.log(vsID);
const asID = await testGen.assistantId;
console.log(asID);

let user_input = {
  name: "Eldrin Starfire",
  race: "Elf",
  class: "Wizard",
  worldview: "Chaotic Good",
  ethicalTraits: ["curious", "freethinking", "unpredictable"],
  personality: ["intelligent", "reserved", "observant"],
  quirks: [
    "constantly reads books, even in dangerous situations",
    "talks to plants as if they were sentient",
    "obsessively organizes spell components",
  ],
  motivations: [
    "seeking ancient arcane knowledge",
    "desire to prove self to a long-lost mentor",
    "need to undo a family curse",
  ],
  fears: ["dark magic", "being forgotten", "deep water"],
  likes: ["stargazing", "complex puzzles", "old maps"],
  dislikes: ["loud noises", "rudeness", "confined spaces"],
  backstory:
    "Eldrin was born under a meteor shower that blessed him with innate magical abilities. Raised in a secluded tower by a mysterious sorcerer, he left home after a tragic betrayal. Now, he travels the land seeking to unlock the secrets of the universe and restore his family's honor.",
};

const user_input2 = {
  worldview: "Chaotic Good",
  ethicalTraits: ["free-spirited", "rebellious", "compassionate"],
  personality: ["adventurous", "spontaneous", "generous"],
  motivations: [
    "explore unknown lands",
    "help the downtrodden",
    "find personal freedom",
  ],
  fears: ["confinement", "tyranny", "loss of individuality"],
};

const testChar = await testGen.generateChar(user_input2);
console.log(testChar);
