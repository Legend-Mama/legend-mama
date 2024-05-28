import {Background} from "./characterSheet.model.js";

/**
 * Create a GeneratedCharacter object from AI Char Gen response
 */
export class GeneratedCharacter {
    constructor(data) {
        this.name = data.name;
        this.race = data.race;
        this.class = data.class;
        this.background = new Background(data.background);
        this.alignment = data.alignment;
        this.abilityScores = data.abilityScores;
        this.racialStatBonus = [];
        for (let val in data.statBonus) {
            this.racialStatBonus.push(val.toLowerCase());
        }
        this.languages = data.languages;
        this.toolProficiency = data.toolProficiency;
        this.skillProficiency = data.skillProficiency;
        this.personalityTraits = data.personalityTraits;
        this.ideal = data.ideal;
        this.bond = data.bond;
        this.flaw = data.flaw;
        this.backstory = data.backstory;
    }
}
