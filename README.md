# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Debugging in the Editor

Visual Studio Code support debugging out of the box with Create React App. This enables you as a developer to write and debug your React code without leaving the editor, and most importantly it enables you to have a continuous development workflow, where context switching is minimal, as you don’t have to switch between tools.

### Visual Studio Code

You would need to have the latest version of [VS Code](https://code.visualstudio.com) and VS Code [Chrome Debugger Extension](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) installed.

Then add the block below to your `launch.json` file and put it inside the `.vscode` folder in your app’s root directory.

```json
{
  "version": "0.2.0",
  "configurations": [{
    "name": "Chrome",
    "type": "chrome",
    "request": "launch",
    "url": "http://localhost:3000",
    "webRoot": "${workspaceRoot}/src",
    "userDataDir": "${workspaceRoot}/.vscode/chrome",
    "sourceMapPathOverrides": {
      "webpack:///src/*": "${webRoot}/*"
    }
  }]
}
```
>Note: the URL may be different if you've made adjustments via the [HOST or PORT environment variables](#advanced-configuration).

Start your app by running `npm start`, and start debugging in VS Code by pressing `F5` or by clicking the green debug icon. You can now write code, set breakpoints, make changes to the code, and debug your newly modified code—all from your editor.

## Installing a Dependency

The generated project includes React and ReactDOM as dependencies. It also includes a set of scripts used by Create React App as a development dependency. You may install other dependencies (for example, React Router) with `npm`:

```sh
npm install --save react-router
```

Alternatively you may use `yarn`:

```sh
yarn add react-router
```

This works for any library, not just `react-router`.

## Assignments

We already defined the Common components (Lightbox and DeleteButton). The Lightbox component can be used like:
```jsx
<Button icon>
  <WithLightbox photos={albumPhotos}>
    <Icon name='play' />
  </WithLightbox>
</Button>
```

We added the custom CSS code for the `Album` component.

In the `api` folder we mocked a real API endpoint. When you load the initial state, before persisting the data to `localStorage` you will read from mocked APIs.
### React components (step 1)

> :warning: Note that for this assignment, you should either create branch in this repo, or fork the repo, and send us the link.
**Every step should be either a separate commit or a separate branch**: We want to see how the code evolves, not just one commit with everything implemented.

Define the following domains in the `components` folder:
- Album
  - Album.js
  - AlbumForm.tsx
  - AlbumList.tsx
- Main
  - Main.tsx
- Nav
  - Nav.tsx
- Photo
  - Photo.tsx
  - PhotoForm.tsx
  - PhotoList.tsx
- StatusBar
  - StatusBar.css
  - StatusBar.tsx

Enrich `App.tsx` to render the `Nav` and `Main` component.

The `Main` component should define the router and actions (update, delete, create).

The `AlbumList` component should render a list of albums, each with a slideshow button, edit button and delete button. The functionality was showcased in the tech demo.

The `PhotoList` component should render a list of photos, each with an edit button and delete button. The functionality was showcased in the tech demo, and is also included in this repo to serve as a starting point, even though it is not actually used yet.

The `StatusBar` component should show the number of albums/photos in the current view and have an add button that adds a new album/photo.

Data must be persisted to `localStorage` so that if the SPA stops, we can also see the new albums/photos added. On first load, take data from `api` and persist in `localStorage`.

Note that you are not confined only to these requirements and are free to pay around in case you're feeling creative :).

### Context implementation (step 2)

Create 3 more folders: actions, contexts and reducers.

Define the following actions:
- `CREATE_ALBUM`
- `UPDATE_ALBUM`
- `DELETE_ALBUM`
- `CREATE_PHOTO`
- `UPDATE_PHOTO`
- `DELETE_PHOTO`

Implement the reducer functions that will alter the state, depending on the specific action.

Create the Contexts and Context.Providers for Albums and Photos (or just one of them), and use them to load initial state (using the localStorage or `api` data) and manage state with the `useReducer` hook, using the reducer functions mentioned above. Move logic from the `Main` component to the contexts.

Render the Context.Providers at the top most level (`App.tsx`)

Update `Album` and `Photo` components to make use of the context by using the `useContext` hook to access the state and modifier functions exposed by the context. Remove the prop drilling logic (passing down the state altering functions -create, update and delete- as props from `Main` to `Album` and `Photo`).
