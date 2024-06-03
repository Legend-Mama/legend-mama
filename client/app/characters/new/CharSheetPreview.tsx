import CharacterSheet from "@/lib/CharacterSheet";
import CharacterSheetTemplate from "../CharacterSheet";

export default function CharacterSheetPreview({ charSheet }: { charSheet: CharacterSheet }) {
  return <CharacterSheetTemplate charSheet={charSheet} />
}