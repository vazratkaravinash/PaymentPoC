"use strict";
var loginSql = {
	getUserPassword: "SELECT password FROM  user WHERE username = ?",
	getUserData: "SELECT * from user WHERE username= ?",
	insertIntoUser: "INSERT INTO user SET ?",
	getUserCount: "SELECT count(*) AS usercount FROM user WHERE username = ?",
	getUnapprovedUser: "SELECT * FROM user WHERE active = 0 and type != 1",
	approveUser: "UPDATE user SET active=1 where username = ?",
	insertUsers: "INSERT INTO user (id, username, password, username, mobile_number, userType, organisationName, code, cat, uat) VALUES ?"
};

module.exports = loginSql;