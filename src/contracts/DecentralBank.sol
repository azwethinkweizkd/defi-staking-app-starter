// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
import "./SafeMath.sol";
import './RWD.sol';
import './Tether.sol';

contract DecentralBank {
    using SafeMath for uint256; 

    string public name = 'Decentral Bank';
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(RWD _rwd, Tether _tether) {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    //staking function
    function depositTokens(uint _amount) public {
        require(_amount > 0, 'amount cannot be equal to 0');
        // Transfer tether tokens to this contract address for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        //Update Staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender].add(_amount);

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    //unstake tokens
    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        require(balance > 0, "staking balance can't be less than 0" );

        tether.transfer(msg.sender, balance);

        stakingBalance[msg.sender] = 0;

        isStaking[msg.sender] = false;
    }

    //issue rewards
    function issueTokens() public  {
        // require the owner to issue tokens only
        require(msg.sender == owner, 'caller must be the owner');

        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient]/9;
            if(balance > 0) {
                rwd.transfer(recipient, balance);
            }
            
        }
    }
}