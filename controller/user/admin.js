const shared = require("../shared/authenticate");
const adminModel = require("../../model/user/admin");
const bcrypt = require("../../lib/crypto");
const blockchain = require("../../model/shared/blockchain");

/**
 * Function to add new admin in the application
 * @param {object} req 
 * @param {object} res 
 */
const addAdmin = (req, res) => {
	shared.isPasswordMatches(req.body).then(()=>{
		return adminModel.isEmailExist(req.body.username, 1).then(()=>{
			return bcrypt.encryptPassword(req.body.password).then((hashPassword)=>{
				req.body.password = hashPassword;
				return blockchain.createAccount(req.body).then((account)=>{
					req.body.account = account;
					return adminModel.addAdmin(req.body).then(()=>{
						res.send({success: true, message: "Successfully register. Please wait for Admin confirmation." });
					});
				});
			});
		});
	}).catch((err)=>{
		res.send({success: false, error: err});
	});
};

module.exports = {
	addAdmin,
};