/**
 * Create a CharacterDetails model to send to AI Char Gen
 */
export class CharacterDetails {
    constructor (data) {
        this.name = data.name;
        this.race = data.race;
        this.class = data.class;
        this.worldview = data.worldview;
        this.ethicalTraits = data.ethicalTraits;
        this.personality = data.personalityTraits;
        this.quirks = data.quirks;
        this.motivations = data.motivations;
        this.fears = data.fears;
        this.likes = data.likes;
        this.dislikes = data.dislikes;
        this.backstory = data.backstory;
    }
}