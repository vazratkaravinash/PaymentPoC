const db = require("../../lib/mysql");
const query = require("../../migrations/query/user");
const wallet = require("../../migrations/query/wallet");

const uuid = require("uuidv4");
const blockchain = require("../../model/shared/blockchain");
const blockchainEvent = require("../../model/shared/blockchainEvents");

/**
 * Function to insert user into database
 * @param {object} data having email, password, confirmpassword
 */
const addUser = (requestdata) => {
	return new Promise((resolve, reject) => {
		db.mysqlConnection().then((connection) => {
			var data = {
				id: uuid(),
				username: requestdata.username,
				password: requestdata.password,
				type: 2,
				ethereum_address: requestdata.account,
				active: 1
			};
			connection.query(query.insertIntoUser, data, function (err, result) {
				if (result) {
					resolve("User is added");
				}
				else {
					reject(err);
				}
			});
		}).catch((err) => {
			reject(err);
		});
	});
};

/**
 * Function to verify email is already in use or not
 * @param {string} username 
 */
const isEmailExist = (username, option) => {
	return new Promise((resolve, reject) => {
		db.mysqlConnection().then((connection) => {
			connection.query(query.getUserCount, [username], function (error, result) {
				if (result) {
					if (!option) {

						if (result[0].usercount) {
							resolve(true);
						}
						else {
							reject("Invalid Username");
						}
					}
					else {
						if (result) {
							if (result[0].usercount) {
								reject("Username already exists");
							}
							else {
								resolve(false);
							}
						}
					}
				}
				else {
					reject(error);
				}
			});
			connection.release();
		}).catch((error) => {
			reject(error);
		});
	});
};

/**
 *  Function to get user username
 *  @param {string} username
 */
const getUserPassword = (username) => {
	return new Promise((resolve, reject) => {
		db.mysqlConnection().then((connection) => {
			connection.query(query.getUserPassword, username, function (error, result) {
				if (result)
					resolve(result[0].password);
				else
					reject(error);
			});
			connection.release();
		}).catch((error) => {
			reject(error);
		});
	});
};

/**
 * Function to add wallet entry in database
 * @param {Object} data 
 */
const addWalletInDB = (data) => {
	return new Promise((resolve, reject) => {
		db.mysqlConnection().then((connection) => {
			connection.query(wallet.insertIntoWallet, data, function (error, result) {
				resolve(result);
			});
			connection.release();
		}).catch((error) => {
			reject(error);
		});
	});
} 

/**
 * Function to check wallet present or not
 * @param {*} id 
 */
const isWalletCreatedBefore = (id) => {
	return new Promise((resolve, reject) => {
		db.mysqlConnection().then((connection) => {
			connection.query(wallet.getWalletCount, id, function (error, result) {
				connection.release();
				resolve(result[0].walletcount);
			});
		}).catch((error) => {
			reject(error);
		});
	});
};

/**
 * Function to get user details 
 * @param {string} username 
 */
const getUserDetails = (username) => {
	return new Promise((resolve, reject) => {
		db.mysqlConnection().then((connection) => {
			connection.query(query.getUserData, username, function (error, result) {
				if (result[0].active)
					resolve(result[0]);
				else
					reject("Please wait for Admin Confirmation");
			});
			connection.release();
		}).catch((error) => {
			reject(error);
		});
	});
};

const createWallet = (req) => {
	return new Promise((resolve, reject) => {
		isWalletCreatedBefore(req.session.user.id).then((isWallet)=>{
			if(!isWallet){
				return blockchain.createWallet(req).then((result)=> {
					let data = {};
				 	data.transactionId = result;
					data.user_id = req.session.user.id;
					return addWalletInDB(data).then((dbresult)=>{
						resolve(dbresult);
					});
				})
			}
			else {
				resolve("Wallet Already Present");
			}
		}).catch((error)=>{
			reject(error);
		})
	})
};

const transfer = (req) => {
	return new Promise((resolve, reject) => {
		blockchain.transfer(req).then((result)=> {
			resolve(result);
		}).catch((error)=>{
			reject(error);
		})
	})
};

const addMoney = (req) => {
	return new Promise((resolve, reject) => {
		blockchain.addMoneyToWallet(req).then((result)=> {
			resolve(result);
		}).catch((error)=>{
			reject(error);
		})
	})
};


const getWalletInfo = (req) => {
	return new Promise((resolve, reject) => {
		blockchain.getWalletInfo(req).then((result)=> {
			resolve(result);
		}).catch((error)=>{
			reject(error);
		})
	})
};

const getBalance = (req) => {
	return new Promise((resolve, reject) => {
		blockchain.getBalance(req).then((result)=> {
			resolve(result);
		}).catch((error)=>{
			reject(error);
		})
	});
};

const transactionHistory = (req) => {
	return new Promise((resolve, reject) => {
		blockchainEvent.getAllEvents(req).then((result)=> {
			let data = {};
			for(let i=0;i<result.length;i++){
				if(result[i].address == req.session.user.ethereum_address)
				{
					data.push(result[i]);
				}
			}
			resolve(data);
		}).catch((error)=>{
			reject(error);
		})
	});
}

module.exports = {
	addUser,
	isEmailExist,
	getUserPassword,
	getUserDetails,
	createWallet,
	transfer,
	addMoney,
	isWalletCreatedBefore,
	getWalletInfo,
	getBalance,
	transactionHistory
};