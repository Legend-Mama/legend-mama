/*
CharacterDetails object and converter to use with Firebase

How to use with Firestore:
Set Custom Object
const ref = doc(db, "accounts", "user").withConverter(characterSheetConverter);
await setDoc(ref, new CharacterSheet("Eustace Twinkletoes", "Dwarf"));

Get Custom Object
const ref = doc(db, "accounts", "user").withConverter(characterSheetConverter);
const docSnap = await getDoc(ref);
if (docSnap.exists()) {
  // Convert to CharacterSheet object
  const characterSheet = docSnap.data();
  // Use a CharacterSheet instance method
  console.log(characterSheet.toString());
} else {
  console.log("No such document!");
}

Reference: https://firebase.google.com/docs/firestore/manage-data/add-data#custom_objects
 */

class CharacterDetails {
    constructor (name, race ) {
        this.name = name;
        this.race = race;
    }
    toString() {
        return this.name + ', ' + this.race;
    }
}

export * from "characterDetails.js";