import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

async function ai_char_generator(user_input) {
  const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });
  const assistant = await openai.beta.assistants.create({
    name: "dnd_char_generator_json",
    instructions: `You are a Dungeons and Dragons character sheet generator. You have comprehensive knowledge of the Dungeons and Dragons SRD. You are very creative and are able to create dynamic characters. You will receive input and create a character sheet based on that input. You will use the point-buy system to determine ability scores. Create only valid json complying to schema. //json output schema 
    {
      "name": {
        "type": "string",
        "description": "The name of the character"
      },
      "race": {
        "type": "string",
        "description": "Choose the race of the character from [Dragonborn, Hill Dwarf, High Elf, Rock Gnome, Half-Elf, Lightfoot Halfling, Half-Orc, Human, Tiefling] to determine certain traits and abilities"
      },
      "class": {
        "type": "string",
        "description": "Choose the class of the character from [Barbarian, Bard, Cleric, Druid, Fighter, Monk, Paladin, Ranger, Rogue, Sorcerer, Warlock, Wizard] in order to define their skills and abilities"
      },
      "background": {
        "type": "object",
        "description": "Details the character's background, enriching their story and defining their skill proficiencies.",
        "properties": {
          "name": {
            "type": "string",
            "description": "The name of the character's background."
          },
          "description": {
            "type": "string",
            "description": "A brief explanation of the background and its impact on the character."
          },
          "skills": {
            "type": "array",
            "description": "List of 2 skills in which the character is proficient."
          },
          "tools": {
            "type": "array",
            "description": "List of 2 tool proficiencies available to the character."
          },
          "languages": {
            "type": "array",
            "description": "List of languages the character can speak."
          },
          "feature": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string",
                "description": "Name of the unique feature associated with the background."
              },
              "description": {
                "type": "string",
                "description": "Detailed description of the feature's effects and uses."
              }
            }
          }
        }
      },
      "alignment": {
        "type": "string",
        "description": "The ethical and moral perspective of the character"
      },
      "abilityScores": {
      "type": "object",
      "description": "Character's ability scores chosen by the point buy system",
      "properties": {
        "strength": {
          "type": "object",
          "description": "Physical power and muscle of the character",
          "properties": {
            "base": {
              "type": "integer",
              "description": "Base strength score before applying bonuses."
            },
            "bonus": {
              "type": "integer",
              "description": "Additional bonus to strength, if applicable, based on the character's race."
            }
          }
        },
        "dexterity": {
          "type": "object",
          "description": "Agility and reflexes of the character",
          "properties": {
            "base": {
              "type": "integer",
              "description": "Base dexterity score before applying bonuses."
            },
            "bonus": {
              "type": "integer",
              "description": "Additional bonus to dexterity, if applicable, based on the character's race."
            }
          }
        },
        "constitution": {
          "type": "object",
          "description": "Health and stamina of the character",
          "properties": {
            "base": {
              "type": "integer",
              "description": "Base constitution score before applying bonuses."
            },
            "bonus": {
              "type": "integer",
              "description": "Additional bonus to constitution, if applicable, based on the character's race."
            }
          }
        },
        "intelligence": {
          "type": "object",
          "description": "Intellectual capability and knowledge of the character",
          "properties": {
            "base": {
              "type": "integer",
              "description": "Base intelligence score before applying bonuses."
            },
            "bonus": {
              "type": "integer",
              "description": "Additional bonus to intelligence, if applicable, based on the character's race."
            }
          }
        },
        "wisdom": {
          "type": "object",
          "description": "Perception and insight of the character",
          "properties": {
            "base": {
              "type": "integer",
              "description": "Base wisdom score before applying bonuses."
            },
            "bonus": {
              "type": "integer",
              "description": "Additional bonus to wisdom, if applicable, based on the character's race."
            }
          }
        },
        "charisma": {
          "type": "object",
          "description": "Charm and social influence of the character",
          "properties": {
            "base": {
              "type": "integer",
              "description": "Base charisma score before applying bonuses."
            },
            "bonus": {
              "type": "integer",
              "description": "Additional bonus to charisma, if applicable, based on the character's race."
            }
          }
        }
      }
    },

      "initiative": {
        "type": "integer",
        "description": "The initiative of the character, determining order in combat"
      },
      "languages": {
        "type": "array",
        "description": "The languages the character can speak",
        "items": {
          "type": "string"
        }
      },
      "personalityTrait": {
        "type": "string",
        "description": "One to two sentences that reflect the unique characteristics and behaviors that define how your character interacts with the world and other characters.  Examples: 'You connect everything that happens to you to a grand, cosmic plan.' 'I once ran twenty-five miles without stopping to warn my clan of an approaching orc horde. I'd do it again if I had to' "
      },
      "ideal": {
        "type": "string",
        "description": "A principle that the character strives to uphold"
      },
      "bond": {
        "type": "string",
        "description": "A connection, duty, or obligation the character feels towards someone or something"
      },
      "flaw": {
        "type": "string",
        "description": "A weakness or failing in the character's personality or abilities"
      },
      "backstory": {
        "type": "string",
        "description": "The narrative background of the character, explaining their history and motivations"
      },
      "quote": {
        "type": "string",
        "description": "A short quote that the character would say."
      }
    }`,
    tools: [{ type: "file_search" }],
    tool_resources: {
      file_search: { vector_store_ids: ["vs_PvcBmLBiGy7wgNM6TC5iW206"] },
    },
    model: "gpt-4o",
    temperature: 1,
  });

  const thread = await openai.beta.threads.create();

  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: user_input,
  });

  let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: assistant.id,
  });

  if (run.status === "completed") {
    const messages = await openai.beta.threads.messages.list(run.thread_id);
    for (const message of messages.data.reverse()) {
      console.log(`${message.role} > ${message.content[0].text.value}`);
    }
  } else {
    console.log(run.status);
  }
}

let user_input =
  "name: Arya Moonwhisper\nrace: Elf\nclass: Ranger\nworldview: Chaotic Good\nethicalTraits: independent, unpredictable, resourceful\npersonality: observant, daring, aloof\nquirks: always chewing on a blade of grass, sketches maps wherever she goes, distrusts horses\nmotivations: explore uncharted territories, uncover hidden truths, escape her past\nfears: entrapment, losing her senses, deep water\nlikes: archery, solitude, the thrill of the hunt\ndislikes: crowds, loud noises, restrictions\nbackstory: Arya was once a scout for an elite elven guard but turned away from her duties to wander the lands freely. Haunted by a failed mission that cost lives, she now seeks redemption and purpose in the wilds.";

ai_char_generator(user_input);
