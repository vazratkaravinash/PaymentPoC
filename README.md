# Hospital PoC
##### Add doctor and patient details

> Build dependency 

#### **Install Node (min version: 8.9.0)**
```
sudo apt-get install -y nodejs
sudo apt-get install -y npm
sudo npm install -g n
sudo n 9.11.1
```
> Install Ganache(Local Blockchain)
 
 ```` 
 Download Ganache from https://truffleframework.com/ganache

 Go into Download folder uisng cd
  
  cd Downloads
  sudo chmod 777 ganache-1.2.3-x86_64.AppImage
  ./ganache-1.2.3-x86_64.AppImage
 ````

> Database configuration
```
cd NPCINode
open database.json
Modify following parameters:
        "host": "localhost",
        "user": "Username",
        "password": "password",
        "database": "database name"
Login into mysql and create database mentain in database.json
      
```
> Blockchain Configuration
```
cd NPCINode
open constants.json
Modify following parameters:
        localBlockchain": "blockchain IPC address(http://127.0.0.1:7545)"      
```
> Install node modules

```
cd NPCINode
(If you want to deploy smart contract on blockchain. For very First time, this is a require step).
npm run prebuild
npm start
```

> Application guide

```
Login
Navigate to below URL:
    http://localhost:3000

```

## Authors
- Avinash Vazratkar <avinashvazratkar446022@gmail.com>

## License
Copyright (c) 2019 Avinash Vazratkar
