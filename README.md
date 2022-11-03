# Legalo - This is one of the Internship Project @Fusion Informatics Ltd.

## What is Legalo?
A decentralized business contract application where two parties can generate a private and permissioned smart contract on Hyperledger Fabric blockchain.

Built using Flask, JavaScript, NodeJS, Hyperledger Fabric and Composer, HTML, CSS, Docker.

## Steps to install and run this project:
### Use Node v8 while running all the setups. (command: nvm use v8)

### 1. Install Hyperledger Fabric and Composer components from the official documentation.

`https://hyperledger.github.io/composer/v0.19/installing/installing-prereqs`
`https://hyperledger.github.io/composer/v0.19/installing/development-tools`

Note: While installing all the composer components, type in v0.20 instead of v0.19. And also we don't need to necessarily ‘export FABRIC_VERSION=hlfv11’
as it will automatically use hlfv12, if not specified.

#### Note: Before installing the network using composer make sure to increase the 
REQUEST_TIMEOUT as follows:
	
`CORE_CHAINCODE_STARTUPTIMEOUT=1200s` in the following file:
~/fabric-tools/fabric-scripts/hlfv11/composer/docker-compose.yml

You would then have to do docker-compose stop the docker-compose start from that directory location to take effect.

In addition to CORE_CHAINCODE_STARTUPTIMEOUT change above, you MUST ALSO UPDATE the timeout values to match (ie CORE_CHAINCODE_STARTUPTIMEOUT), in the `connection.json` file for the card(s) that performs the composer network start command (eg. PeerAdmin card in $HOME/.composer). You will see 4 timeouts (3 for a Peer and 1 for the Order) in the 'client' section, under the stanza "connection". By default, these are set to `300 seconds` - Increase the value to `1200` for each.

### 2. Download the above .bna file from the 

[for mac users you have to manually create an archive file as .bna files after downloading
The command for that is:
`composer archive create -t dir -n ../`
]

Before installing and starting the network using composer make sure that all the peers of fabric are running perfectly. (to check type: docker ps, you will see 4 different peers running at same instance)

For installing and starting the network follow the steps below:

Step into the BNA folder that you made earlier and type in the following commands,

`composer network install --card PeerAdmin@hlfv1 --archiveFile tutorial-network@0.0.1.bna`

`composer network start --networkName tutorial-network --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1`

(check your networkVersion from package.json folder. It will be something like `0.0.2-deploy.1`)

`composer card import --file admin@tutorial-network.card`

`composer-rest-server -p 3000 -c admin@tutorial-network`

Now you have started the composer-rest-server and it can be viewed on `http://localhost:3000/explorer`

### 3. For Google authorized server follow the following steps:

Close the above composer-rest-server and step into the same BNA folder as earlier.

Now first we have to install passport-google-oauth2 and export its environment variable as follows:

`npm install -g passport-google-oauth2`

`export COMPOSER_PROVIDERS='{ "google": { "provider": "google", "module": "passport-google-oauth2", "clientID": "421970497561-2tkigk9in3vrah0lp0jekvbkm9btbetp.apps.googleusercontent.com", "clientSecret": "0Z3sRSX6-cA9geZg76LmPeGC", "authPath": "/auth/google", "callbackURL": "/auth/google/callback", "scope": "https://www.googleapis.com/auth/plus.login", "successRedirect": "http://localhost:5000/", "failureRedirect": "/" } }'`

### 4. Now we have to start 2 composer-rest-server instances, one for authorized node and other for unauthorized.

Before starting the rest server make sure that you are in bna file folder , then write command:
`nvm use v8`

After that paste this over there

`export COMPOSER_PROVIDERS='{ "google": { "provider": "google", "module": "passport-google-oauth2", "clientID": "421970497561-2tkigk9in3vrah0lp0jekvbkm9btbetp.apps.googleusercontent.com", "clientSecret": "0Z3sRSX6-cA9geZg76LmPeGC", "authPath": "/auth/google", "callbackURL": "/auth/google/callback", "scope": "https://www.googleapis.com/auth/plus.login", "successRedirect": "http://localhost:5000/", "failureRedirect": "/" } }'`

Now type the below command:

`composer-rest-server -p 3000 -c admin@tutorial-network -m true`
[port 3000 is for authorized node and it will not be used for creating any card]
[Just let it run on this particular terminal]

Make sure that you check that it is running well (note make use of incognito to avoid errors of access tokens)

Open a new terminal for the unauthorized node, to download cards for google login,

Write :  `nvm use v8`
Then start the other port

`composer-rest-server -p 3001 -c admin@tutorial-network`
[port 3001 is for unauthorized node and it will be used for creating cards]
[after creating cards, download it for google login in our UI]
[let the port run in this particular terminal]

Make sure that you check that it is running well (note make use of incognito to avoid errors of access tokens)

### 5. Now git clone the frontend in any folder and run its python file. It should be like,
 
`python app.py`
[Head to the URL given: `http://127.0.0.1:5000`]
[Login in with Google id and upload the card you downloaded from API]

Make sure that you use incognito to launch the above link.

### Legalo Web Pages:
#### 1. Service Provider
![image](https://user-images.githubusercontent.com/115387678/199657972-8ea63f9c-b103-4118-a953-3c5d00c21409.png)

#### 2. Buyer Information
![image](https://user-images.githubusercontent.com/115387678/199658008-17a96e40-2b42-4f26-836f-c00e2d7c06a8.png)

#### 3. Services and Payments
![image](https://user-images.githubusercontent.com/115387678/199658172-152e13a4-6a8c-436b-b276-88765369ed71.png)

#### 4. Special Provisions
![image](https://user-images.githubusercontent.com/115387678/199658213-87d0fd41-07f1-4855-b135-8f41c4bdeb93.png)
![image](https://user-images.githubusercontent.com/115387678/199658248-89ea2725-151f-4012-a1a7-a8d2a039fff0.png)


#### 5. All Contracts
![image](https://user-images.githubusercontent.com/115387678/199658281-08016476-6832-4ac2-86f5-5c4ccaa57131.png)

#### 6. Service Stage
![image](https://user-images.githubusercontent.com/115387678/199658327-9c1490a3-3383-4a46-89c6-aeab501368f6.png)

#### 7. Blockchain History
![image](https://user-images.githubusercontent.com/115387678/199658360-eaecabfb-830e-474b-96ac-84f9a4154a76.png)
