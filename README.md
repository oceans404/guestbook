# GuestBook

<img width="1284" alt="Screen Shot 2022-10-06 at 10 18 55 AM" src="https://user-images.githubusercontent.com/91382964/194352210-44689a8b-d893-4cf0-8970-bbaa277960f9.png">

- Live link: https://guestbook-blush.vercel.app/
- Smart contract on Polygonscan Mumbai: https://mumbai.polygonscan.com/address/0xA676f2cC7D400D1DE8b20bbd8007ca0E7A4AF5e6

## Contracts (for use in Remix)

- starter guestbook contract: https://gist.github.com/oceans404/2c9e0a855c1492909220894252024a79
- 🚀 completed guestbook contract: https://gist.github.com/oceans404/4a849c2774cddd3c0fe2d12caca610db

## Setup instructions

- Star and [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) this repo
- git clone the fork locally
- cd guestbook
- `npm i`
- `touch .env`
- Within .env create a REACT_APP_ALCHEMY_ID variable 
  - Visit the [Alchemy Dashboard](https://alchemy.com/?r=zU2MTQwNTU5Mzc2M) "View Key" for a Polygon Mumbai Network app
  - `REACT_APP_ALCHEMY_ID = 'yourAlchemyApiKey'`
  - `GENERATE_SOURCEMAP=false`
- If you've created your own GuestBook contract, update your App.js file at `contractAddress` with your contract address
- `npm start`

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
