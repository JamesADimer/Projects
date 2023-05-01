# Super Health, Inc.

This is a starter project for a Super Health Company that was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Install Prerequisites

### Node Version Manager (NVM)

NVM is a utility to help you quickly install and switch between Node versions. With NVM, there is no need to manually install and uninstall versions.

Follow the Installation Steps for [NVM on GitHub](https://github.com/coreybutler/nvm-windows).

## Getting Started

1. Clone this project locally.
1. CD into the root folder
1. Run `npm install` in the root folder to install dependencies.

This command installs a package, and any packages that it depends on.

1. Run `npm run dev`.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Dependencies
* Super Health API must be running. This resource can be found [here](https://gitlab.ce.catalyte.io/training/cycleworkinggroups/nationwide/associates/james-dimer/final-project/super-health-api).

## Testing

* You can run tests with coverage via `npm run coverage`

## How to run ESLint

### Installing ESLint

- In the terminal, enter `npm install eslint —-save-dev` to install ESLint

- Entering `npm install eslint-config-airbnb —-save-dev` installs Airbnb's style guide
- Entering `npm info “eslint-config-airbnb@latest" peerDependencies` lists all peer dependencies
- Entering `npx install-peerdeps --dev eslint-config-airbnb` installs all peer dependencies

You can follow [this guide](https://medium.com/@Tunmise/set-up-eslint-with-airbnb-style-guide-in-5-minutes-d7b4cc5707f8) for more information on how to configure ESLint.
