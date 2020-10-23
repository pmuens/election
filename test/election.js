const Election = artifacts.require("./Election.sol");

contract("Election", async (accounts) => {
  let instance;

  beforeEach(async () => {
    await Election.deployed();
    instance = await Election.new();
  });

  it("Initializes with 2 candidates", async () => {
    const count = await instance.count();

    assert.equal(count, 2);
  });

  it("Initializes the candidates with the correct values", async () => {
    let candidate;

    candidate = await instance.candidates(1);
    assert.equal(candidate.id, 1, "contains the correct id");
    assert.equal(candidate.name, "Candidate 1", "contains the correct name");
    assert.equal(candidate.votes, 0, "contains the correct votes count");

    candidate = await instance.candidates(2);
    assert.equal(candidate.id, 2, "contains the correct id");
    assert.equal(candidate.name, "Candidate 2", "contains the correct name");
    assert.equal(candidate.votes, 0, "contains the correct votes count");
  });

  it("Allows a voter to vote", async () => {
    const candidateId = 1;

    const receipt = await instance.vote(candidateId, { from: accounts[0] });
    const voted = await instance.voters(accounts[0]);
    const candidate = await instance.candidates(candidateId);

    assert.equal(receipt.logs.length, 1, "an event was triggered");
    assert.equal(receipt.logs[0].event, "NewVote", "the event type is correct");
    assert.equal(
      receipt.logs[0].args._candidateId.toNumber(),
      candidateId,
      "the candidate id is correct"
    );
    assert.equal(voted, true, "the voter was marked as voted");
    assert.equal(candidate.votes, 1, "increments the candidate's vote count");
  });

  it("throws for invalid candidates", async () => {
    try {
      await instance.vote(99, { from: accounts[0] });
    } catch (error) {
      assert.equal(error.message.includes("revert"), true);
    }

    const candidate1 = await instance.candidates(1);
    const candidate2 = await instance.candidates(2);
    assert.equal(candidate1.votes, 0, "candidate 1 did not receive any votes");
    assert.equal(candidate2.votes, 0, "candidate 2 did not receive any votes");
  });

  it("throws for double voting", async () => {
    const candidateId = 1;

    await instance.vote(candidateId, { from: accounts[0] });
    const candidate = await instance.candidates(candidateId);
    assert.equal(candidate.votes, 1, "accepts first vote");

    try {
      await instance.vote(candidateId, { from: accounts[0] });
    } catch (error) {
      assert.equal(error.message.includes("revert"), true);
    }
    const candidate1 = await instance.candidates(1);
    const candidate2 = await instance.candidates(2);
    assert.equal(candidate1.votes, 1, "candidate 1 did not receive any votes");
    assert.equal(candidate2.votes, 0, "candidate 2 did not receive any votes");
  });
});
