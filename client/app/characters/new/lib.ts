type FreeTextOptionValue = { value: string; freetext: boolean };

type NestedFreeTextOptionsValue = Record<string, FreeTextOptionValue>;

export interface Values {
  name: string;
  race: string;
  class: string;
  worldview: FreeTextOptionValue;
  ethicalTraits: FreeTextOptionValue;
  personalityScores: {
    extroversion: FreeTextOptionValue;
    agreeableness: FreeTextOptionValue;
    conscientiousness: FreeTextOptionValue;
    neuroticism: FreeTextOptionValue;
    openness: FreeTextOptionValue;
  };
  quirks: FreeTextOptionValue;
  motivations: FreeTextOptionValue;
  fears: FreeTextOptionValue;
  likes: FreeTextOptionValue;
  dislikes: FreeTextOptionValue;
  backstory: FreeTextOptionValue;
}

export enum PageSteps {
  "form",
  "loading",
  "error",
  "charSheet",
}

function isStringVal(value: Values[keyof Values]): value is string {
  return typeof value === "string";
}

function isFreeTextOptionVal(
  value: Values[keyof Values]
): value is FreeTextOptionValue {
  const keys = Object.keys(value);
  return keys.includes("value") && keys.includes("freetext");
}

// Allows us to show the submit button
export function canSubmit(formValues: Values) {
  const keys = Object.keys(formValues) as (keyof Values)[];
  for (const key of keys) {
    const val = formValues[key];
    const reqKeys = [
      "worldview",
      "ethicalTraits",
      "personalityScores",
      "motivations",
      "fears",
    ];
    if (reqKeys.includes(key)) {
      if (isStringVal(val) && val === "") {
        // Check string values are filled out
        return false;
      } else if (isFreeTextOptionVal(val) && val.value === "") {
        // Check free text option values have values
        return false;
      } else if (key === "personalityScores") {
        // Check nested personalityScores object has values for all its freetext options
        for (const personalityVal of Object.values(
          val as Values["personalityScores"]
        )) {
          if (personalityVal.value === "") return false;
        }
      }
    }
  }

  return true;
}

/**
 * Submits character creation details in schema format. Returns null if non-successful response.
 */
export async function submitCharacterCreationForm(
  formValues: Values,
  authToken: string
) {
  // Convert to CharacterDetails
  const characterDetails = {
    name: formValues.name || undefined,
    race: formValues.race || undefined,
    class: formValues.class || undefined,
    worldview: formValues.worldview.value,
    ethicalTraits: [formValues.ethicalTraits.value],
    personalityTraits: {
      extroversion: formValues.personalityScores.extroversion.value,
      agreeableness: formValues.personalityScores.agreeableness.value,
      conscientiousness: formValues.personalityScores.conscientiousness.value,
      neuroticism: formValues.personalityScores.neuroticism.value,
      openness: formValues.personalityScores.openness.value,
    },
    quirks: [formValues.quirks.value] || undefined,
    motivations: [formValues.motivations.value],
    fears: [formValues.fears.value],
    likes: [formValues.likes.value] || undefined,
    dislikes: [formValues.dislikes.value] || undefined,
    backstory: formValues.dislikes.value || undefined,
  };

  const resp = await fetch(process.env.NEXT_PUBLIC_API + "/character-sheet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(characterDetails),
  });
  if (resp.status !== 201) {
    throw "Invalid response";
  }
  return await resp.json();
}
