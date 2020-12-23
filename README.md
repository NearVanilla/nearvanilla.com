# NearVanilla website

This repository contains sources of nearvanilla.com website.

## Deployment

Make sure to copy [highscores.json](https://nearvanilla.com/highscores.json)
from the live website to the `static/` directory.

### Dev

Install rust and run `cargo run`. That's it - go to <http://localhost:8000>.

### Containerized

Make sure you have docker and docker-compose installed,
if you want to easily setup the webserver.

Run `docker-compose up -d` - you should have website available at <http://localhost:8000>
