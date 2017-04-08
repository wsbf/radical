# radical

This repository contains the code for the upcoming radio automation system which will replace ZAutomate and the online logbook. It will be based on the [Electron](http://electron.atom.io/) framework, which will allow us to build the application with HTML/CSS/Javascript.

## Features

### Done

- __Music Library interface__: browse and search for albums and carts
- __Play queue__: a unified queue for tracks, carts, and automation
- __Playlists__: create playlists and add them to the play queue

### To do

- __Track automation__: set the queue to insert tracks automatically
- __Cart automation__: set the queue to insert carts automatically at appropriate times
- __Queue automation__: set the queue to run automatically (with periodic stops for mic segments)
- __Track transitions__: enable software crossfade
- __Remote control__: control the application through SSH (restarting automation, remote broadcasting)
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
