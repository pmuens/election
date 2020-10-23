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

  mapping(address => bool) public voters;

  event NewVote(uint indexed _candidateId);

  function addCandidate(string memory _name) private {
    count++;
    candidates[count] = Candidate(count, 0, _name);
  }

  function vote(uint _candidateId) public {
    require(!voters[msg.sender]);
    require(_candidateId > 0 && _candidateId <= count);

    voters[msg.sender] = true;
    candidates[_candidateId].votes++;

    emit NewVote(_candidateId);
  }

  constructor() {
    addCandidate("Candidate 1");
    addCandidate("Candidate 2");
  }
}
