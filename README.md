# Movies App

## Live Demo

This app is deployed to Netlify ([Demo Link](https://movies-app7.netlify.app/))

## Notes

- You must enter `title` to see results (required by API)
- Search params and page number are saved in URL as query params, so state is preserved upon page refresh
- I used Material-UI and Styled Components for UI
- I used [redux-toolkit](https://redux-toolkit.js.org/) which significantly simplifies work with redux (e.g. it allows to "mutate" state in reducer and auto generates action creators)

## Running locally

Clone this repo and run

```
npm install
npm start
```

The app should run on [localhost:3000](http://localhost:3000)
