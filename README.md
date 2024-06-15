# KindLogs
A small multi-level logging library for node.js with file support.

![Screenshot of the console output created by KindLogs](_docs/screenshot.png)

# Installation 
```sh
npm i kindlogs
```

# Getting Started 
KindLogs will only log levels `options.logLevel` or below. By default this is `3` (error), so only logs at level 3 or below (more severe) will display:
```JS
const { KindLogs } = require('kindlogs');

const logs = new KindLogs()

function myFunction() {
  logs.log(6, 'Log level 6 (info)')
  logs.log(3, 'Log level 3 (error)')
}

myFunction()
```
### Console output:
```bash
[ERROR] Log level 3 (error)
```

# Color mode
In order to keep the library small, if you would like to use color mode, the `ansis` library must be installed separately:
```bash
npm i ansis
```
To enable color logs in console, spawn `KindLogs` with the `color` option:

```js
const logs = new KindLogs({
  color: true
})
```

# Setting log-level
KindLogs uses numeric log-levels from `0-7`, following the Syslog standard. To set the log level, spawn `KindLogs` with the `logLevel` option:
```js
const logs = new KindLogs({
  logLevel: 7
})

function myFunction() {
  logs.log(6, 'Log level 6 (info)')
  logs.log(3, 'Log level 3 (error)')
}

myFunction()
```
In this example, all levels will be displayed:
```bash
[INFO] Log level 6 (info)
[ERROR] Log level 3 (error)
```

# Logging to files
KindLogs enables easy logging to files. In order to log to files, configure `KindLogs` with the `fileOptions` option: 
```js
const logs = new KindLogs({
    fileOptions: {
      dir: "test/logs",
      name: "kindlogs"
    }
})
```
The above configuration will result in the creation of the `test/logs/` directory. By default, logs will append to the `<name>.error.log` file if the level is 3 or below, and `<name>.debug.log` for all others, in the following format:

```log
[5/26/2024, 12:52:42 AM] [EMERG] Log level 0 
[5/26/2024, 12:52:42 AM] [ALERT] Log level 1 
[5/26/2024, 12:52:42 AM] [CRIT] Log level 2 
[5/26/2024, 12:52:42 AM] [ERROR] Log level 3
...
```
## Setting file-specific log-level
File logging can be run at a different level than console logging. In order to achieve this, configure the `fileOptions` object with a `logLevel` parameter:
```js
const logs = new KindLogs({
    fileOptions: {
      dir: "test/logs",
      name: "kindlogs",
      logLevel: 7
    }
})
```
Unless specified in the `fileOptions` object, the file-specific log level will be identical to the global `logLevel` option.