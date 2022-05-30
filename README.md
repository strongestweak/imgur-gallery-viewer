# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

**Note: Imgur is not working on `localhost` url, so we need to setup nginx and `/etc/hosts` for mac os**

setup nginx [click here](https://medium.com/@ThomasTan/installing-nginx-in-mac-os-x-maverick-with-homebrew-d8867b7e8a5a)

after nginx setup,

add this config inside `/usr/local/etc/nginx/nginx.conf`

```
server {
  listen 80;
  client_max_body_size 20M;
  server_name imgurviewer;
  location / {
    proxy_pass http://127.0.0.1:3000;
  }
}
```

next, add this inside `/etc/hosts`

```
127.0.0.1       imgurviewer
```

run nginx and go to [`http://imgurviewer/`](http://imgurviewer/)

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run react-build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run electron:dev`

run electron for development, make sure to run `npm start` first before running this command.

### `npm run electron:build:mac`

build production desktop app for mac os

### `npm run electron:build:win`

build production desktop app for windows os

### `npm run docs`

generate docs
