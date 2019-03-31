/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS user(
    id VARCHAR(80) PRIMARY KEY NOT NULL,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(128) NOT NULL,
    type TINYINT NOT NULL,
    ethereum_address VARCHAR(60) NOT NULL,
    active TINYINT NOT NULL 
);

CREATE TABLE IF NOT EXISTS bank(
    id VARCHAR(80) PRIMARY KEY NOT NULL,
    name VARCHAR(40) NOT NULL,
    ifsc VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS user_account(
    account_number VARCHAR(80) PRIMARY KEY NOT NULL,
    user_id VARCHAR(80) NOT NULL,
    bank_id VARCHAR(80) NOT NULL,
    balance FLOAT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (bank_id) REFERENCES bank(id)
);

CREATE TABLE IF NOT EXISTS Wallet(
    transactionId VARCHAR(100) PRIMARY KEY NOT NULL,
    user_id VARCHAR(80) NOT NULL UNIQUE,    
    FOREIGN KEY (user_id) REFERENCES user(id)
);