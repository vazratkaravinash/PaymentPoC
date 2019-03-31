const shared = require("../shared/authenticate");
const userModel = require("../../model/user/user");
const adminModel = require("../../model/user/admin");

const bcrypt = require("../../lib/crypto");
const session = require("../../lib/session");
const blockchain = require("../../model/shared/blockchain");
/**
 * Function to add new user in the application
 * @param {object} req 
 * @param {object} res 
 */
const addUser = (req, res) => {
	shared.isPasswordMatches(req.body).then(() => {
		return userModel.isEmailExist(req.body.username, 1).then(() => {
			return bcrypt.encryptPassword(req.body.password).then((hashPassword) => {
				req.body.password = hashPassword;
				return blockchain.createAccount(req.body).then((account) => {
					req.body.account = account;
					return userModel.addUser(req.body).then((result) => {
						res.render("user/login.hbs", { success: true, message: "Successfully register. ", result: result });
					});
				});
			});
		});
	}).catch((err) => {
		res.render("user/registerUser", { success: false, message: "Successfully register. ", error: err });
	});
};

/**
 * Function to validate user while logging
 * @param {object} req 
 * @param {object} res 
 */
const loginUser = (req, res) => {
	userModel.isEmailExist(req.body.username, 0).then(() => {
		return userModel.getUserPassword(req.body.username).then((password) => {
			return bcrypt.verifyPassword(req.body.password, password).then(() => {
				return userModel.getUserDetails(req.body.username).then((data) => {
					session.createSession(req, data);
					if (req.session.user.type == 2) {
						res.render("bank/homeUser.hbs", { success: true, message: "Successfully login.", result: data, layout: "dashboardUser.hbs" });
					}
					else {
						res.render("bank/homeAdmin.hbs", { success: true, message: "Successfully login.", result: data, layout: "dashboardAdmin.hbs" });
					}
				});
			});
		});
	}).catch((err) => {
		res.render("user/login.hbs", { success: false, message: "Unable to login.", error: err });
	});
};

/**
 * Function to destroy user session when user logout
 * @param {object} req 
 * @param {object} res 
 */
const logoutUser = (req, res) => {
	session.destroySession(req);
	res.render('user/login.hbs', { success: true, message: "Successfully logout" });
};

/**
 * Function to create the wallet for user
 * @param {object} req 
 * @param {object} res 
 */
const createWallet = (req, res) => {
	userModel.createWallet(req).then((result) => {
		res.render("bank/addWallet.hbs", { success: true, result: result, message: "Successfully added wallet", layout: "dashboardUser" });
	}).catch((error) => {
		res.render("bank/addWallet.hbs", { success: false, error: error, message: "Failed to add wallet", layout: "dashboardUser" });
	});
}

/**
 * Function to transfer the balance
 * @param {*} req 
 * @param {*} res 
 */
const transfer = (req, res) => {
	userModel.transfer(req).then((result) => {
		res.render("bank/transfer.hbs", { success: true, result: result, message: "Transaction is successfull", layout: "dashboardUser" });
	}).catch((error) => {
		res.render("bank/transfer.hbs", { success: false, error: error, message: "Transaction is Fail", layout: "dashboardUser" });
	});
}


/**
 * Function to transfer the balance
 * @param {*} req 
 * @param {*} res 
 */
const addMoney = (req, res) => {
	userModel.addMoney(req).then((result) => {
		res.render("bank/addMoney.hbs", { success: true, result: result, message: "Money added successfully ", layout: "dashboardUser" });
	}).catch((error) => {
		res.render("bank/addMoney.hbs", { success: false, error: error, message: "Failed to add money", layout: "dashboardUser" });
	});
}

const isWalletExists = (req, res) => {
	userModel.isWalletCreatedBefore(req.session.user.id).then((isWallwt)=>{
		if(isWallwt){
			userModel.getWalletInfo(req).then((result)=>{
				let data = {};
				data.balance = result[2].toString();
				data.name = result[1];
				data.address = result[0];
				res.render("bank/addWallet.hbs", { success: true, result: data, layout: "dashboardUser.hbs"});
			})
		}
		else {
			res.render("bank/addWallet.hbs", { success: true, result: result, layout: "dashboardUser.hbs"});
		}
	}).catch((error)=> {
		res.render("bank/addWallet.hbs", { success: false, error: error, layout: "dashboardUser.hbs"});
	});
};

const getBalance = (req, res) => {
	userModel.getBalance(req).then((result)=>{
		res.render("bank/balance.hbs", { success: true, result: result, layout: "dashboardUser.hbs"});
	}).catch((error) => {
		res.render("bank/balance.hbs", { success: false, error: error, layout: "dashboardUser.hbs"});
	});
}

const transactionHistory = (req, res) => {
	userModel.transactionHistory(req).then((result)=>{
		res.render("bank/transactionHistory.hbs", { success: true, result: result, message: "hiii",layout: "dashboardUser.hbs"});
	}).catch((error) => {
		res.render("bank/transactionHistory.hbs", { success: false, error: error, layout: "dashboardUser.hbs"});
	});
};

module.exports = {
	addUser,
	loginUser,
	logoutUser,
	createWallet,
	transfer,
	addMoney,
	isWalletExists,
	getBalance,
	transactionHistory
}; 