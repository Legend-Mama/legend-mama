## AICharGen Class Usage

To use the AICharGen class:

1. **Import the class into your JavaScript file:**
    ```javascript
    import { AICharGen } from './path_to_file/ai_char_generator/library/AICharGen.js';
    ```

2. **Create an instance and pass in OpenAI API Key:**
   ```javascript
     const charGen = new AICharGen(api_key)
     ```

3. **Initialize character generator with Vector Store ID and Assistant ID:**
   - **Without Vector Store ID and Assistant ID:**
     ```javascript
     await charGen.initialize({});
     ```
     - Vector Store ID and Assistant ID can be retrieved by:
       ```javascript
       const vsID = await charGen.vectorStoreId;
       const asID = await charGen.assistantId;
       ```

   - **If you have a vector store ID and assistant ID, pass as arguments into `.initialize()`:**
     ```javascript
     await charGen.initialize({
       vectorStoreId: "vector_store_id",
       assistantId: "assistant_id",
     });
     ```

4. **Generate a character by passing user input:**
    ```javascript
    const characterSheet = await charGen.generateChar(user_input);
    ```

## Sample User Input (JSON)

```json
{
  "name": "Caden Windwalker",
  "race": "Elf",
  "class": "Wizard",
  "worldview": "Knowledge is power, Seek truth",
  "ethicalTraits": "Curiosity, Honor, Intellectual Integrity",
  "personalityScores": {
    "Extraversion": "Reserved",
    "Agreeableness": "Helpful",
    "Conscientiousness": "Organized",
    "Neuroticism": "Anxious",
    "OpennessToExperience": "Inquisitive"
  },
  "quirks": "Writes notes on palms, Forgets to sleep when studying",
  "motivations": "Mastering the Arcane Arts, Discovering Ancient Mysteries",
  "fears": "Ignorance, Loss of Control",
  "likes": "Rare Books, Stargazing, Complex Puzzles",
  "dislikes": "Superstition, Disruption of Routine, Chaos",
  "backstory": "Born under an eclipsed moon, Caden was destined for a life intertwined with the arcane. Raised in an esteemed magical academy, every moment was dedicated to the pursuit of knowledge. An unquenchable thirst for understanding the universe's secrets drives him, and though his endeavors isolate him, his path is clear."
}
```

## Sample Output (JSON)
```json
{
  "name": "Caden Windwalker",
  "race": "High Elf",
  "class": "Wizard",
  "background": {
    "name": "Sage",
    "description": "Caden was raised in an esteemed magical academy, dedicating every moment to the pursuit of knowledge and the arcane arts.",
    "skills": ["Arcana", "History"],
    "tools": ["Alchemist's supplies", "Calligrapher's supplies"],
    "languages": ["Common", "Elvish", "Celestial", "Draconic"],
    "feature": {
      "name": "Researcher",
      "description": "When you attempt to learn or recall a piece of knowledge, if you do not know that information, you often know where and from whom you can obtain it."
    }
  },
  "alignment": "Neutral Good",
  "abilityScores": {
    "strength": {"base": 8, "bonus": 0},
    "dexterity": {"base": 14, "bonus": 2},
    "constitution": {"base": 13, "bonus": 0},
    "intelligence": {"base": 15, "bonus": 1},
    "wisdom": {"base": 12, "bonus": 0},
    "charisma": {"base": 10, "bonus": 0}
  },
  "initiative": 2,
  "languages": ["Common", "Elvish", "Celestial", "Draconic"],
  "personalityTrait": "You connect everything that happens to you to a grand, cosmic plan.",
  "ideal": "Seek truth.",
  "bond": "Dedicated to mastering the arcane arts and discovering ancient mysteries.",
  "flaw": "An unquenchable thirst for knowledge can sometimes blind me to the dangers of pursuing it.",
  "backstory": "Born under an eclipsed moon, Caden was destined for a life intertwined with the arcane. Raised in an esteemed magical academy, every moment was dedicated to the pursuit of knowledge. An unquenchable thirst for understanding the universe's secrets drives him, and though his endeavors isolate him, his path is clear.",
  "quote": "Knowledge is power."
}
```

## How AICharGen Works

**Setup:** The AICharGen utilizes the OpenAI API Assistant with the following configurations:

- **Tools:** `file_search`
- **Tool Resources:** Vector store that contains Dungeons and Dragons SRD and 160 sample character sheets
- **Model:** `gpt-4o`
- **Temperature:** `1`
- **Instructions:** 
  `You are a Dungeons and Dragons character sheet generator. You have comprehensive knowledge of the Dungeons and Dragons SRD. You are very creative and are able to create dynamic characters. You will receive input and create a character sheet based on that input. You will use the point-buy system to determine ability scores. Create only valid json complying to schema. //json output schema`
  * See `output_schema.json` for instructed JSON output. 

## Operational Steps

1. Clean-up user input by removing JSON formatting (`{}`, `""`) to reduce token usage.
2. Send user input to Assistant.
3. Assistant retrieves information from Vector Store to generate a character sheet. 
4. Extract only the JSON object from Assistant's response message. (The Assistant sometimes generates additional info along with the JSON.)
5. Return the JSON object. :D

      
