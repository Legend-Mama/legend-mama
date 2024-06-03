export default interface CharacterSheet {
  abilityModifiers: Record<string, number>;
  abilityScores: Record<string, number>;
  alignment: string;
  armorClass: number;
  armorProficiency: string[];
  background: {
    name: string;
    description: string;
    skillProficiency: string[];
    toolProficiency: string[];
    languages: string[];
    feature: { name: string; description: string };
  };
  backstory: string;
  bond: string;
  class: string;
  features: string[];
  flaw: string;
  hitDice: number;
  hitPointMax: number;
  ideal: string;
  initiative: number;
  languages: string[]
  level: number;
  name: string;
  passivePerception: number;
  personalityTraits: string[];
  proficiencyBonus: number;
  race: string;
  savingThrowProficiency: string[];
  savingThrows: Record<string, number>;
  skillProficiency: string[];
  skills: Record<string, number>;
  speed: number;
  toolProficiency: string[];
  weaponProficiency: string[];
}
