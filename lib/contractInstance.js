const Web3 = require("web3");
const constants = require("../constants.json");
const contract = require("../config/contractAddress.json");
const blockchain = require("./deploy");

//TODO
var web3 = new Web3(new Web3.providers.HttpProvider(constants.blockchain.localBlockchain));
web3.eth.defaultAccount = web3.eth.accounts[0];

//END TODO

const smartContractInstance = (contractNameFromJsonFile) => {
	return new Promise((resolve, reject) => {
		if (web3.isConnected()) {
			blockchain.unlockUserAccount(web3.eth.accounts[0], "", constants.blockchain.unlockTime).then((res) => {
				if(res) {
					let myContract = web3.eth.contract(contract[contractNameFromJsonFile].abi).at(contract[contractNameFromJsonFile].address);
					resolve(myContract);
				}
				else {
					reject("Unable to unlock account");
				}
			}).catch((err) => {
				reject(err);
			});
		}
		else {
			reject("Unable to create contract instance");
		}
	});
};

// function smartContractInstance(cb) {

//     if (web3.isConnected()) {
//         blockchain.unlockUserAccount(web3.eth.accounts[0], "", unlockTime, function (errUnlock, resUnlock) {
//             if (errUnlock) {
//                 cb("Error in unlocking");
//             }
//             else {
//                 var myContract = web3.eth.contract(contractAddress.hospitalContractAddress.abi).at(contractAddress.hospitalContractAddress.address);
//                 console.log("Successfully created contract instance");
//                 cb(null, myContract);
//             }
//         })

//     } else {
//         cb("Unable to create contract instance");
//     }
// }

module.exports = {
	smartContractInstance
};
