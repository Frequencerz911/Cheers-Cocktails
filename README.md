## Concept

**Cheers&Cocktails** is a community site created by Frequencerz911 to share cocktail recipes and recipes for dishes served as aperitifs. Visitors can access recipes shared by users and approved by the administrators, as well as leave comments and add recipes to favourites. Users can create their own recipes and decide whether to share them or keep them to themselves. They can also add videos of their recipes approved by the administrators. They can also create their own menu of recipes grouping drinks and food according to a chosen theme, always with the approval of an administrator.

There are three levels of authenticated users:

Users > They can create recipes, upload videos and request approval. They can post comments and bookmark videos.

Moderators > They can approve videos and recipes shared by users and manage user comments.

Administrators.

## Features

### In the current version

Under development

### Upcoming

Under development

## Setup & Use

### Project Initialization

- In VSCode, install plugins **Prettier - Code formatter** and **ESLint** and configure them
- Clone this repo, enter it
- If you are using `yarn` or `pnpm`, adapt the `config/cli` in `package.json`
- Run command `npm install` (or equivalent using `yarn` or `pnpm`)
- Create environment files (`.env`) in both `backend` and `frontend`: you can copy `.env.sample` files as starters

### Available Commands

- `db:migrate` : Run the database migration script
- `db:seed` : Run the database seed script
- `dev` : Starts both servers (frontend + backend) in one terminal
- `dev-front` : Starts the React frontend server
- `dev-back` : Starts the Express backend server
- `lint` : Runs validation tools (will be executed on every _commit_, and refuse unclean code)

## FAQ

- The model used for this project is a fullstack foundation model produced by Wild Code School.
- All the images and icons in this project are open source. Most of them come from an Api: https://www.thecocktaildb.com/api.php or from the website: https://pixabay.com/fr/ .
- Don't forget to create your .env files for the frontend and backend by copying the .env.sample files from each directory.

Technologies:

- React
- Node
- Express
- MySQL

### Tools

- _Concurrently_ : Allows for several commands to run concurrently in the same CLI
- _Husky_ : Allows to execute specific commands that trigger on _git_ events
- _Vite_ : Alternative to _Create-React-App_, packaging less tools for a more fluid experience
- _ESLint_ : "Quality of code" tool, ensures chosen rules will be enforced
- _Prettier_ : "Quality of code" tool as well, focuses on the styleguide
- _ Airbnb Standard_ : One of the most known "standards", even though it's not officially linked to ES/JS
