# What is this? 

A friendly logger for when verbosity is required...

# Installation 

`npm i kindlogs`

# Getting Started 

```JS
const {KindLogs} = require('kindlogs');

function myFunction() {
    var console = new KindLogs("main > myFunction()")
    console.log('Custom labelled console.log with line and column number')

}

myFunction()
```