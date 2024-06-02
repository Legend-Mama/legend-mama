import { AICharGen } from "../AICharGenErr.js"; // Adjust the import path as necessary

describe("AICharGen Class", () => {
  let aiCharGen;

  beforeEach(() => {
    aiCharGen = new AICharGen().initialize();
  });

  describe("initialize method", () => {
    test("should throw error for invalid vectorStoreId type", async () => {
      // Expecting the error to propagate through the initialize method
      await expect(
        aiCharGen.initialize({ vectorStoreId: 12345 })
      ).rejects.toThrow(TypeError);
    });

    test("should throw error for invalid assistantId type", async () => {
      await expect(
        aiCharGen.initialize({ assistantId: 12345 })
      ).rejects.toThrow(TypeError);
    });
  });

  describe("generateChar method", () => {
    test("should throw an error for non-object user input", async () => {
      await expect(aiCharGen.generateChar("invalid input")).rejects.toThrow(
        TypeError
      );
    });

    test("should handle empty or null user input", async () => {
      // Assuming null or empty input should throw TypeError
      await expect(aiCharGen.generateChar(null)).rejects.toThrow(TypeError);
      await expect(aiCharGen.generateChar({})).rejects.toThrow(
        "user_input must have at least one property"
      );
    });

    test("should handle API failures gracefully", async () => {
      // Mocking an API failure
      aiCharGen.generateChar = jest
        .fn()
        .mockRejectedValue(new Error("API Failure"));
      await expect(
        aiCharGen.generateChar({ someInput: "value" })
      ).rejects.toThrow("API Failure");
    });
  });
});

