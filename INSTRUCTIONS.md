# Module 2 Assignment: Add Features to a Memory Card Game

(**NOTE:** View a rendered version of this file in VS Code with `ctrl-shift-v` or `cmd-shift-v`)

&nbsp;
## Introduction

For this assignment, you will be working on adding features to a memory-based card game using React. The card game portion itself and all its components are implemented for you, however, you must add scoring to the application based on the user's time to completion.

&nbsp;
## Setup

Copy the starter files inside of `unsolved` into the root directory of your GitHub repository.

Run `npm i` in the root directory of your repository (your `package.json` should be in the root directory).

To start developing, run `npm run dev`.

&nbsp;
## Instructions

To be considered complete, the app must reflect the current time when a game is being played as well as the previous and best (lowest) time after each game ends. 

To accomplish this, you will need to do the following:

- Utilize the `useTimer` custom hook inside of `App.jsx`.
- Create functions that handle starting/stopping/resetting the timer when the game starts or ends.
- Pass those functions to `CardGame` as the props `onGameStart` and `onGameEnd`.
- Pass correct values for the `time`, `bestTime` and `previousTime` props to the `Header` component.

**NOTE:** The only component you will need to work inside of is `App.jsx`; the components in `/src/components` and the custom hook in `/src/util` are all **completed** and require no additional code.


&nbsp;
## App Behavior

Your site should behave in the same manner as [this example site](https://uf-memory-card-game.vercel.app/).

&nbsp;
## Requirements for full credit

To receive full credit for this assignment, your program MUST:

  * Be implemented according to the above [instructions](#instructions).
  * Pass all [automated tests](#testing).
  * Be [deployed](#deployment) correctly.
  * Be [submitted](#submission) correctly. 

&nbsp;
## Testing

Automated tests are included with this assignment. To receive full credit, all automated tests must pass.

To run the tests, run:

```
npm test
```

To run the tests only once, run:

```
npm test -- run
```

&nbsp;
## Deployment

This assignment may be deployed for free with [Vercel](https://vercel.com/docs).

To deploy, make an account with Vercel and either [attach Vercel to your GitHub repository](https://vercel.com/docs/concepts/get-started/deploy#create-and-deploy-a-project) or [use the Vercel CLI](https://vercel.com/docs/cli) to [deploy](https://vercel.com/docs/cli/deploy) your site.

Vercel is pre-configured to be able to recognize and deploy Vite/React websites.

&nbsp;
## Submission

When submitting this assignment, please include **ALL** of the following:

  * A link to the assignment's GitHub repository.
  * A link to the deployed application.
  * A screenshot of the automated test results.

Please verify that your links are correct when submitting.

