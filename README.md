# NearVanilla website

This repository contains sources of nearvanilla.com website.

## Project setup

Install Vue 3 and Vue cli: [Installation Steps](https://v3.vuejs.org/guide/installation.html#npm)

### Install dependencies
```
npm install
```

### Compiles and run with hot-reload
```
npm run dev
```

### Build and minify for production
```
npm run build
```


## Deployment

Make sure to copy [highscores.json](https://nearvanilla.com/highscores.json)
from the live website to the `public/highscores` directory.

### Automatic

Make sure you have docker and docker-compose installed,
if you want to easily setup the webserver.

Run `docker-compose up -d` - you should have website available at <http://localhost:8080>
