// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.8.0;

contract Election {
  struct Candidate {
    uint id;
    uint votes;
    string name;
  }

  uint public count;
  mapping(uint => Candidate) public candidates;

  function addCandidate(string memory _name) private {
    count++;
    candidates[count] = Candidate(count, 0, _name);
  }

  constructor() {
    addCandidate("Candidate 1");
    addCandidate("Candidate 2");
  }
}
