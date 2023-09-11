// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract CropListing {

    address public owner;

    string public cropType;

    uint public minimumBuy;

    string public location;

    uint public fundingGoal;

    uint public deadline;

    bool public isComplete;

    address public arbiter = 0xC645E7e6b6E5f9F8846a276f1C0934e089C66005;

    uint public index; 


    struct Contributions {
        address contributor;
        uint amount;
    }

    mapping(uint => Contributions) public contributionAmounts;

   Contributions[] public contributors;

    event CropListingCreated(address owner, string cropType, uint minimumBuy, string location, uint fundingGoal, uint deadline);

    event ContributionReceived(address contributor, uint amount);

    constructor(string memory _cropType, uint _minimumBuy, string memory _location, uint _fundingGoal, uint _deadline) {
        owner = msg.sender;
        cropType = _cropType;
        minimumBuy = _minimumBuy;
        location = _location;
        fundingGoal = _fundingGoal;
        deadline = _deadline;
        isComplete = false;
        index = 0;
        emit CropListingCreated(owner, cropType, minimumBuy, location, fundingGoal, deadline);
    }

    function getContributionsList() public view returns (Contributions[] memory) {
        return contributors;
    }

    function getDetails() public view returns (address, string memory, uint, string memory, uint, uint) {
        return (owner, cropType, minimumBuy, location, fundingGoal, deadline);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getCropType() public view returns (string memory) {
        return cropType;
    }

    function getMinimumBuy() public view returns (uint) {
        return minimumBuy;
    }

    function getLocation() public view returns (string memory) {
        return location;
    }

    function getFundingGoal() public view returns (uint) {
        return fundingGoal;
    }

    function getDeadline() public view returns (uint) {
        return deadline;
    }

    function getRemainingTime() public view returns (uint) {
        return deadline - block.timestamp;
    }

    function getFundingPercentage() public view returns (uint) {
        return (address(this).balance * 100) / fundingGoal;
    }

    function getFundingStatus() public view returns (string memory) {
        if (getFundingPercentage() >= 100) {
            return "Funding Complete";
        } else if (getRemainingTime() <= 0) {
            return "Funding Failed";
        } else {
            return "Funding In Progress";
        }
    }

    function fund() payable external {
        
    require(!isComplete, "Funding is complete");
    
    require(msg.value >= minimumBuy, "Minimum buy not met");

    // Ensure the sender has enough balance to cover the contribution
    require(msg.sender.balance >= msg.value, "Insufficient balance");

    // Transfer the Ether to the contract

    index++;

    // Store the contribution
    contributionAmounts[index] = Contributions(msg.sender, msg.value);

    contributors.push(Contributions(msg.sender, msg.value));

    emit ContributionReceived(msg.sender, msg.value);

    if (getFundingPercentage() >= 100) {
        isComplete = true;
    }
}

    function returnFunds() external {

        require(msg.sender == arbiter, "Only the arbiter can call this function");

        require(getFundingPercentage() < 100, "Funding is complete");

        for (uint i = 1; i <= index; i++) {
            Contributions memory contribution = contributionAmounts[i];
            (bool sent, ) = payable(contribution.contributor).call{value: contribution.amount}("");
            require(sent, "Failed to send Ether");
        }

        isComplete = true;


    }

    function sendFundsToFarmer() external {
            
            require(msg.sender == arbiter, "Only the arbiter can call this function");

            require(isComplete, "Funding is not complete");
    
            require(getFundingPercentage() >= 100, "Funding is not complete");
    
            uint balance = address(this).balance;
    
            (bool sent, ) = payable(owner).call{value: balance}("");
            require(sent, "Failed to send Ether");

    }
}