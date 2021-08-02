![kindlogs-github](https://user-images.githubusercontent.com/5501027/127819952-3659c860-c134-4345-849e-dfd50e61de71.png)
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
