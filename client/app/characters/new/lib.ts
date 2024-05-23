type FreeTextOptionValue = { value: string; freetext: boolean };

type NestedFreeTextOptionsValue = Record<string, FreeTextOptionValue>;

export interface Values {
  name: string;
  race: string;
  class: string;
  worldview: FreeTextOptionValue;
  ethicalTraits: FreeTextOptionValue;
  personalityScores: {
    extraversion: FreeTextOptionValue;
    agreeableness: FreeTextOptionValue;
    conscientiousness: FreeTextOptionValue;
    neuroticism: FreeTextOptionValue;
    opennessToExperience: FreeTextOptionValue;
  };
  quirks: FreeTextOptionValue;
  motivations: FreeTextOptionValue;
  fears: FreeTextOptionValue;
  likes: FreeTextOptionValue;
  dislikes: FreeTextOptionValue;
}

function isStringVal(value: Values[keyof Values]): value is string {
  return typeof value === "string";
}

function isFreeTextOptionVal(value: Values[keyof Values]): value is FreeTextOptionValue {
  const keys = Object.keys(value);
  return keys.includes("value") && keys.includes("freetext");
}

// Allows us to show the submit button
export function canSubmit(formValues: Values) {
  const keys = Object.keys(formValues) as (keyof Values)[];
  for (const key of keys) {
    const val = formValues[key];
    if (isStringVal(val) && val === "") { // Check string values are filled out
      return false;
    } else if (isFreeTextOptionVal(val) && val.value === "") { // Check free text option values have values
      return false;
    } else if (key === "personalityScores") { // Check nested personalityScores object has values for all its freetext options
      for (const personalityVal of Object.values(val as Values["personalityScores"])) {
        if (personalityVal.value === "") return false;
      }
    }
  }

  return true;
}