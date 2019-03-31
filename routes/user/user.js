const express = require("express");
const router = express.Router();
const userController = require("../../controller/user/users");
const authenticate = require("../../controller/shared/authenticate");

/* GET users listing. */
router.post("/register", userController.addUser);
router.post("/login", userController.loginUser);
router.get("/logout", [authenticate.allUser, userController.logoutUser]);
router.post("/addWallet", [authenticate.onlyUser, userController.createWallet])
router.post("/transfer", [authenticate.onlyUser, userController.transfer]);
router.get("/transfer", authenticate.onlyUser, function(req, res){
    res.render("bank/transfer.hbs", {layout: "dashboardUser.hbs"});
});
router.get("/addMoney", authenticate.onlyUser, function(req, res){
    res.render("bank/addMoney.hbs", {layout: "dashboardUser.hbs"});
});
router.get("/addWallet", authenticate.onlyUser, userController.isWalletExists);
router.get("/getBalance", authenticate.onlyUser, userController.getBalance);
router.get("/transactions", authenticate.onlyUser, userController.transactionHistory);


router.get("/createWallet", authenticate.onlyUser, function(req, res){
    res.render("bank/createWallet.hbs", {layout: "dashboardUser.hbs"});
});
router.post("/addMoney", [authenticate.onlyUser, userController.addMoney]);

module.exports = router;