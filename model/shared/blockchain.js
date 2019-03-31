const blockchainObject = require("../../lib/web3");
// const constants = require("../../constants.json");
const log4js = require("log4js");
const logger = log4js.getLogger("");

/**
 * Function will create a blockchain address fot the register user
 * @param {Object} data data.password require. Password should be in encrypted format
 */
const createAccount = (data) => {
	return new Promise((resolve, reject) => {
		if (data.type) {
			resolve(blockchainObject.web3.eth.accounts[0]);
		}
		else {
			blockchainObject.web3.personal.newAccount(data.password, function (err, account) {
				if (err) {
					reject(err);
				}
				else {
					resolve(account);
				}
			});
		}
	});
};

/**
 * Function to unlock ethereum account
 * @param {address} account ethereum account address
 */
const unlockUserAccount = (data) => {
	return new Promise((resolve, reject) => {
		blockchainObject.web3.personal.unlockAccount(data.account, data.password, function (err, result) {
			if (err) {
				logger.error("Fail to unlock the account: ", data.account);
				reject(err);
			}
			else {
				logger.debug("Successfully unlock the account: ", data.account);
				resolve(result);
			}
		});
	});
};

/**
 * Function to transfer ERC20 tokens
 * Implementation of transferFrom
 * @param {object} req 
 */
const transfer = (req) => {
	return new Promise((resolve, reject) => {
		const gasEstimate = blockchainObject.user.transfer.estimateGas(req.body.to, req.session.user.ethereum_address, req.body.password, req.body.amount);
		blockchainObject.user.transfer(req.body.to, req.session.user.ethereum_address, req.body.password, req.body.amount, { gas: gasEstimate, from: blockchainObject.web3.eth.accounts[0] }, function (error, result) {
			if (error) {
				reject(error);
			}
			else {
				resolve(result);
			}
		});
	});
};

/**
 * Function to create the wallet 
 * @param {Object} req 
 */
const createWallet = (req) => {
	return new Promise((resolve, reject) => {
		const gasEstimate = blockchainObject.user.addUser.estimateGas(req.session.user.ethereum_address, req.body.username, req.body.password);
		blockchainObject.user.addUser(req.session.user.ethereum_address, req.body.username, req.body.password, { gas: gasEstimate, from: blockchainObject.web3.eth.accounts[0] }, function (error, result) {
			if (error) {
				reject(error);
			}
			else {
				resolve(result);
			}
		});
	});
}
/**
 * Function to get a Balance of the user(ERC20 account balance)
 * @param {Object} req 
 */
const getBalance = (req) => {
	return new Promise((resolve, reject) => {
		blockchainObject.user.getBalance(req.session.user.ethereum_address, function (error, result) {
			if (error) {
				reject(error);
			}
			else {
				resolve(result);
			}
		});
	});
};

/**
 * Function to add money from bank to wallet
 * @param {Object} req 
 */
const addMoneyToWallet = (req) => {
	return new Promise((resolve, reject) => {
		const gasEstimate = blockchainObject.user.addMoneyFromBankToUserAccount.estimateGas(req.session.user.ethereum_address, req.body.amount);
		blockchainObject.user.addMoneyFromBankToUserAccount(req.session.user.ethereum_address, req.body.amount, { gas: gasEstimate, from: blockchainObject.web3.eth.accounts[0] }, function (error, result) {
			if (error) {
				reject(error);
			}
			else {
				resolve(result);
			}
		});
	});
};

/**
 * Function to get Receiver details using receiver address
 * @param {Object} req 
 */
const getReceiverName = (req) => {
	return new Promise((resolve, reject) => {
		blockchainObject.user.getUser(req.query.ethereum_address, function (error, result) {
			if (error) {
				reject(error);
			}
			else {
				resolve(result);
			}
		});
	});
};

const getWalletInfo = (req) => {
	return new Promise((resolve, reject) => {
		blockchainObject.user.getWalletInfo(req.session.user.ethereum_address, function (error, result) {
			if (error) {
				reject(error);
			}
			else {
				resolve(result);
			}
		});
	});
}
module.exports = {
	createAccount,
	unlockUserAccount,
	transfer,
	getBalance,
	addMoneyToWallet,
	transfer,
	createWallet,
	getReceiverName,
	getWalletInfo
};