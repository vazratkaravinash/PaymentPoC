const db = require("../../lib/mysql");
const query = require("../../migrations/query/user");
const uuid = require("uuidv4");


/**
 * Function to insert user into database
 * @param {object} data having username, password, confirmpassword
 */
const addAdmin = (requestdata) => {
	return new Promise((resolve, reject) => {
		db.mysqlConnection().then((connection) => {
			var data;
			data = {
				id: uuid(),
				username: requestdata.username,
				password: requestdata.password,
				ethereum_address:requestdata.account,
				type: 1,
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
 * Function to verify username is already in use or not
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


module.exports = {
	addAdmin,
	isEmailExist,
};