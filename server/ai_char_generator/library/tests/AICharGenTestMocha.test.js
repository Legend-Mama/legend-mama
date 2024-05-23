import { expect } from "chai";
import sinon from "sinon";
import { AICharGen } from "../AICharGen.js";
import mockResponse from "./mockResponse.json" assert { type: "json" };
import mockInput from "./mockInput.json" assert { type: "json" };

describe("AICharGen", function () {
  let aiCharGen;
  let sandbox;

  beforeEach(() => {
    // Create a sandbox for restoring the environment after each test
    sandbox = sinon.createSandbox();
    aiCharGen = new AICharGen("fake-api-key");

    // Setup stubs with appropriate resolves
    sandbox
      .stub(aiCharGen.openai.beta.threads, "create")
      .resolves({ id: "fake_thread_id" });

    // Ensuring the create messages method returns the character data
    sandbox
      .stub(aiCharGen.openai.beta.threads.messages, "create")
      .resolves(mockResponse);

    // Simulating the list messages method, returning all character data
    sandbox
      .stub(aiCharGen.openai.beta.threads.messages, "list")
      .resolves(mockResponse);

    sandbox
      .stub(aiCharGen.openai.beta.threads.runs, "createAndPoll")
      .resolves({ status: "completed", thread_id: "fake_thread_id" });
  });

  afterEach(() => {
    // Restore the original functionality of all methods stubbed in the sandbox
    sandbox.restore();
  });

  describe("generateChar", function () {
    it("should generate a character JSON based on input", async function () {
      const userInput = mockInput;
      // Call the function under test
      const result = await aiCharGen.generateChar(userInput);
      // Check the result is as expected
      expect(result).to.be.an("object");
      expect(result.name).to.equal(userInput.name);
      expect(result.class).to.equal(userInput.class);
    });
    it("should handle errors when creating a thread", async function () {
      sandbox.restore();
      sandbox
        .stub(aiCharGen.openai.beta.threads, "create")
        .throws(new Error("Thread Creation Error"));
      const result = await aiCharGen.generateChar(mockInput);
      expect(result).to.be.undefined;
    });
    it("should handle errors when creating a message", async function () {
      sandbox.restore();
      sandbox
        .stub(aiCharGen.openai.beta.threads.messages, "create")
        .throws(new Error("Message Creation Error"));
      const result = await aiCharGen.generateChar(mockInput);
      expect(result).to.be.undefined;
    });

    it("should handle errors during character generation", async function () {
      sandbox.restore();
      sandbox
        .stub(aiCharGen.openai.beta.threads.runs, "createAndPoll")
        .throws(new Error("Generation Error"));
      const result = await aiCharGen.generateChar(mockInput);
      expect(result).to.be.undefined;
    });
  });
  describe("initialize", function () {
    it("should initialize with provided vectorStoreId and assistantId", async function () {
      const result = await aiCharGen.initialize({
        vectorStoreId: "provided_vector_store_id",
        assistantId: "provided_assistant_id",
      });
      expect(result.vectorStoreId).to.equal("provided_vector_store_id");
      expect(result.assistantId).to.equal("provided_assistant_id");
    });
  });
});
