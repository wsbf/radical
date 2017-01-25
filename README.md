# radical

This repository contains the code for the upcoming radio automation system which will replace ZAutomate and the online logbook. It will be based on the [Electron](http://electron.atom.io/) framework, which will allow us to build the application with HTML/CSS/Javascript.

## Features

- __Digital Library interface__: search music by artist/album/track/etc, search carts (PSAs, Underwritings, etc)
- __Playlist queue__: a unified queue to add tracks and carts manually or automatically
- __Preload playlists__: allow users to create playlists through their user accout and use them during their show
- __Track automation__: generate playlists when no one is in the studio, or when you're just feeling lazy
- __Cart automation__: allow carts to be inserted automatically at the right times if you don't want to mess with it
- __Track transitions__: set the queue to run automatically, but still stop every 4 songs so that you can do mic segments, software crossfade (maybe?)
- __Remote control__: allow the application to be controlled through SSH (restarting automation, remote broadcasting)
- __Spotify API__: display album artwork, related artists, etc.

## Contributing

Install [Git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/en/) (I would use the latest LTS version). __Windows users__: from this point you should use Git Bash, which is included with Git.

Download this repo:
```
git clone https://github.com/wsbf/radical.git
```

After that you can download updates anytime:
```
cd radical
git pull
```

To run the project: 
```
npm install
npm start 
```
