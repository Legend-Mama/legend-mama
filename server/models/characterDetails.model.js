/*
CharacterDetailsModel object and converter to use with Firebase

 */

export class CharacterDetailsModel {
    constructor (data) {
        this.name = data.name;
        this.race = data.race;
        this.class = data.class;
        this.worldview = data.worldview;
        this.ethicalTraits = data.ethicalTraits;
        this.personalityTraits = data.personalityTraits;
        this.quirks = data.quirks;
        this.motivations = data.motivations;
        this.fears = data.fears;
        this.likes = data.likes;
        this.dislikes = data.dislikes;
        this.backstory = data.backstory;
    }

    toJSON() {
        return {
            name: this.name,
            race: this.race,
            class: this.class,
            worldview: this.worldview,
            ethicalTraits: this.ethicalTraits,
            personalityTraits: this.personalityTraits,
            quirks: this.quirks,
            motivations: this.motivations,
            fears: this.fears,
            likes: this.likes,
            dislikes: this.dislikes,
            backstory: this.backstory
        };
    }
}