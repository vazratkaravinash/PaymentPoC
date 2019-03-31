"use strict";
var walletSql = {
	getWalletData: "SELECT * from Wallet WHERE username= ?",
	insertIntoWallet: "INSERT INTO Wallet SET ?",
    getWalletCount: "SELECT count(*) AS walletcount FROM Wallet WHERE user_id = ?"
};

module.exports = walletSql;