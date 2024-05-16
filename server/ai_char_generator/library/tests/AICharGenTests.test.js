import { AICharGen } from "./AICharGen";

// Mocking necessary dependencies
jest.mock("openai", () => ({
  OpenAI: jest.fn().mockImplementation(() => ({
    beta: {
      threads: {
        create: jest.fn().mockResolvedValue({ id: "thread123" }),
        messages: {
          create: jest.fn().mockResolvedValue({}),
          list: jest.fn().mockResolvedValue({
            data: [
              {
                role: "system",
                content: [{ text: { value: '```json {"name": "Hero"} ```' } }],
              },
            ],
          }),
        },
        runs: {
          createAndPoll: jest
            .fn()
            .mockResolvedValue({ status: "completed", thread_id: "thread123" }),
        },
      },
      vectorStores: {
        create: jest.fn().mockResolvedValue({ id: "vectorStore123" }),
        fileBatches: {
          uploadAndPoll: jest.fn().mockResolvedValue({}),
        },
      },
      assistants: {
        create: jest.fn().mockResolvedValue({ id: "assistant123" }),
      },
    },
  })),
}));

describe("AICharGen", () => {
  let charGen;

  beforeEach(() => {
    charGen = new AICharGen();
  });

  describe("initialize", () => {
    it("should initialize with new vectorStoreId and assistantId if none provided", async () => {
      const result = await charGen.initialize({});
      expect(result.vectorStoreId).toBe("vectorStore123");
      expect(result.assistantId).toBe("assistant123");
    });

    it("should use provided vectorStoreId and assistantId", async () => {
      const result = await charGen.initialize({
        vectorStoreId: "customVectorStore",
        assistantId: "customAssistant",
      });
      expect(result.vectorStoreId).toBe("customVectorStore");
      expect(result.assistantId).toBe("customAssistant");
    });
  });

  describe("generateChar", () => {
    it("should generate a character with given user input", async () => {
      const userInput = { name: "Hero", race: "Human" };
      const result = await charGen.generateChar(userInput);
      expect(result).toEqual({ name: "Hero" });
    });
  });

  describe("jsonToString", () => {
    it("converts JSON to string format correctly", () => {
      const json = { name: "Hero", traits: ["brave", "loyal"] };
      const result = charGen.jsonToString(json);
      expect(result).toBe("name: Hero\ntraits: brave, loyal");
    });
  });

  describe("messageToJSON", () => {
    it("extracts JSON from formatted message string", () => {
      const message = '```json {"name": "Hero"} ```';
      const result = charGen.messageToJSON(message);
      expect(result).toEqual({ name: "Hero" });
    });
  });
});
