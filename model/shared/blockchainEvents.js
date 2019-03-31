const blockchainObject = require("../../lib/web3");
const log4js = require("log4js");
const logger = log4js.getLogger("");

/**
* Function will return all events when amount is transfred
*/  
const transferEvent = () => {
    return new Promise((resolve, reject)=> {
        let event = blockchainObject.user.Transfer({}, {fromBlock: 0, toBlock: 'latest'});
        event.get(function(error, logs){
            if(error){
                reject(error);
            }
            else {
                console.log(logs)
                resolve(logs);
            }
        });
    });
};


/**
* Function will return all events when transaction is confirmed
*/  
const addMoneyToWalletEvent = () => {
    return new Promise((resolve, reject)=> {
        let event = blockchainObject.user.AddMoneyToWallet({}, {fromBlock: 0, toBlock: 'latest'});
        event.get(function(error, logs){
            if(error){
                reject(error);
            }
            else {
                console.log(logs)
                resolve(logs);
            }
        });
    });
};

/**
* Function will return all events when owner is added
*/  
const getAllEvents = (req) => {
    return new Promise((resolve, reject)=> {
        let event = blockchainObject.user.allEvents({fromBlock: 0, toBlock: 'latest'});
        event.get(function(error, logs){
            if(error){
                reject(error);
            }
            else {
                console.log(logs)
                resolve(logs);
            }
        });
    });
};

module.exports = {
    addMoneyToWalletEvent,
    transferEvent,
    getAllEvents
};