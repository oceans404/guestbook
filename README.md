# GuestBook

<img width="1284" alt="Screen Shot 2022-10-06 at 10 18 55 AM" src="https://user-images.githubusercontent.com/91382964/194352210-44689a8b-d893-4cf0-8970-bbaa277960f9.png">

- Live link: https://guestbook-blush.vercel.app/
- Smart contract on Polygonscan Mumbai: https://mumbai.polygonscan.com/address/0xA676f2cC7D400D1DE8b20bbd8007ca0E7A4AF5e6

## Pre-reqs

- Create a [Metamask account](https://metamask.io/)or create [a new test account](https://metamask.zendesk.com/hc/en-us/articles/360015289452-How-to-create-an-additional-account-in-your-wallet)
- Add Polygon Mumbai Network to Metamask -- [Guide by Unstoppable Domains](https://docs.unstoppabledomains.com/manage-domains/guides/add-polygon-to-metamask/)
- Get Mumbai Test Tokens from the [Polygon Faucet](https://faucet.polygon.technology/)

## Contracts (for use in Remix)

[Guestbook Remix Workspace](https://remix.ethereum.org/#version=soljson-v0.8.7+commit.e28d00a7.js&optimize=true&runs=200&gist=c20a617f7ca794205a34d68f86a86140&evmVersion=null)

Navigate to the contracts folder to find the three Guestbook contracts.

- contracts > Guestbook.sol is a named "Guestbook" contract with no logic
- contracts > Guestbook_Starter.sol is a completed starter Guestbook contract that stores a list of names (strings) of guests.
- 🌟 contracts > Guestbook_Complex.sol is a completed complex Guestbook contract that stores a list of guests with info (name, message, date). Deploy this contract for use with the Guestbook frontend.

## Frontend repo pre-reqs

- Install [node](https://nodejs.org/en/download/) and [nvm](https://github.com/nvm-sh/nvm) `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash`
- set your node version `nvm use 16`
- Create an [alchemy account](https://alchemy.com/?r=zU2MTQwNTU5Mzc2M)
- Visit [Chainlist](https://chainlist.org/) and toggle testnets on. Search for the Polygon Mumbai network and click "connect wallet" to add it to your metamask networks
- Send your new address some test matic from the [Polygon faucet](https://faucet.polygon.technology/)

## Setup instructions

- ⭐️ star this repo so you have it saved for future reference
- clone the repo `git clone https://github.com/oceans404/guestbook`
- cd guestbook
- install dependencies `npm i`
- `cp .env.sample .env;`
- Within .env replace the REACT_APP_ALCHEMY_ID variable 'yourAlchemyApiKey' with an Alchemy Key by visiting the [Alchemy Dashboard](https://alchemy.com/?r=zU2MTQwNTU5Mzc2M). Either "View Key" for an existing Polygon Mumbai Network app or create a key by selecting the "+ Create App" button. Use Chain: Polygon, Network: Polygon Mumbai. Then "View Key" and replace the API Key in your .env file.
- If you've created your own GuestBook contract, update your App.js file at `contractAddress` with your contract address
- `npm start`

### Known Issues with Rainbowkit

1. Rainbowkit Wallet Connection (modal) stays at pending even when Wallet is connected https://github.com/rainbow-me/rainbowkit/issues/935
2. Rainbowkit Wallet Connection disconnect feature with Metamask https://github.com/rainbow-me/rainbowkit/issues/807 https://github.com/wagmi-dev/wagmi/issues/1239

## Deploy to Vercel
- `git add .`
- `git commit -m "updated contract address"`
- `git push -u origin main`
- Visit the [Vercel](https://vercel.com/) UI. 
- Connect your Github and "Add new" selecting "Guestbook"
- In "environment variables," add REACT_APP_ALCHEMY_ID with your alchemy key
- Deploy!

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
