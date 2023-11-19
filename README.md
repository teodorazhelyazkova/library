## Summary

This is my final project that I made in order to pass SoftUni's React course. It's a SPA Library app with adding and editing books in a catalog, my book favourites list, Firebase authentication and it uses SoftUni's Practice Server. If you are a logged in user, you can add books, edit and delete your books from their Details page. Also you can add books that are not created from you to your book list.

## Deployment

The client application is deployed to Firebase. First you should run the server locally as explained in the 5th point of [setup](#setup). Then you can access the app from `https://library-a9970.web.app/`.

## Environment variables

| Variable                 | Description         |
| ------------------------ | ------------------- |
| VITE_GOOGLE_MAPS_API_KEY | Google Maps API key |

## Setup

1. Copy environment variables file template

```bash
cp example.env .env
```

2. Fill `.env` file with actual environment variables accordingly to [reference](#environment-variables). You have to generate your personal Google Maps API key on their website.

3. Install the dependencies in the client folder with Node.js v18.14.0

```bash
npm install
```

4. Start the client dev server, the application will be available at `http://localhost:5173/`

```bash
npm run dev
```

5. Start the back-end from the server folder, the server will be located at `http://localhost:3030`

```bash
npm start
```

## Technical stack

- React
- React Router Dom
- TypeScript
- MobX
- Firebase
- Axios
- Material UI
- Sass
- Vite
- ESLint
