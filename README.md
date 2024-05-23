![Screenshot of the console output created by KindLogs](_docs/screenshot.png)

# KindLogs
A simple multi-level logging library for node.js, colors optional.

# Installation 
```sh
npm i kindlogs
```
If you would like to use color mode, the `ansis` library is required:
```sh
npm i ansis
```
# Getting Started 
KindLogs will only log levels `logLevel` or below. By default this is `3` (Warn), so only logs at level 3 or below will execute:
```JS
const { KindLogs } = require('kindlogs');

const logs = new KindLogs({
  logLevel: 6, // logging level, default is 3
  color: true // color mode, default is false
})

function myFunction() {
  logs.log(5, 'Log level 5')
}

myFunction()
// Console output:
// [DEBUG] Log level 5
```
