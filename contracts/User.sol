pragma solidity ^0.4.24;

contract User {

/**
Structure to store the user wallet information
User ethereum address is unique id (We can use anything other than this)
Name: user name
password: user passwod in encrypted format
balance: Balance of the user. When user created, it is intialised to 0
 */
    struct wallet {
        string name;
        string password;
        uint balance;
    }

//Events when money is transfer from one account to another
    event Transfer(address, address, uint);
    event AddMoneyToWallet(address, uint);

//Mapping to create the instance od struct wallet
    mapping(address => wallet) public users;
    mapping(address => bool) public isActive;
/**
Modifier will check whether user password is correct before transfering the amount
 */
    modifier validPassword(address _from, string memory _password) {
        require(keccak256(abi.encodePacked((users[_from].password))) == keccak256(abi.encodePacked((_password))), "User password is incorrect");
        _;
    }
/**
Check whether user has sufficient balance before transfering the fund
*/
    modifier checkBalance(address _from, uint _amount) {
        require((users[_from].balance >= _amount), "Account Balance is not sufficient");
        _;
    }

    modifier isValidUser(address _address) {
        require(isActive[_address] == true, "Not a valid user");
        _;
    }

/**
Add new user in wallet
 */
    function addUser(address _address, string memory _name, string memory _password) public {
        wallet storage temp = users[_address];
        temp.name = _name;
        temp.balance = 0;
        temp.password = _password;
        isActive[_address] = true;
    }
/**
Function to add the money from user's bank to his/her wallet
 */
    function addMoneyFromBankToUserAccount(address _to, uint _amount) isValidUser(_to) public {
        users[_to].balance = users[_to].balance + _amount;
        emit AddMoneyToWallet(_to, _amount);
    }
/**
Function to transfer amount from one account to another account
 */
    function transfer(address _to, address _from, string memory _password, uint _amount) checkBalance(_from, _amount) isValidUser(_from) isValidUser(_to)  validPassword(_from, _password)  public {
        users[_from].balance = users[_from].balance - _amount;
        users[_to].balance = users[_to].balance + _amount;
        emit Transfer(_to, _from, _amount);
    }

/**
Function to get the balance of the user
 */
    function getBalance(address _address) isValidUser(_address) public view returns(uint)  {
        return users[_address].balance;
    }
    
/**
Function to search a user 
 */
    function getUser(address _address) view  public returns(string memory, address) {
        return (users[_address].name, _address);
    }

    function getWalletInfo(address _address) view public isValidUser(_address) returns(address, string, uint) {
        return (_address, users[_address].name, users[_address].balance);
    }
}
