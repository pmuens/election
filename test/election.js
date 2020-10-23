const Election = artifacts.require("./Election.sol");

contract("Election", async (accounts) => {
  let instance;

  it("Initializes with 2 candidates", async () => {
    instance = await Election.deployed();
    const count = await instance.count();

    assert.equal(count, 2);
  });

  it("Initializes the candidates with the correct values", async () => {
    instance = await Election.deployed();
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
});
