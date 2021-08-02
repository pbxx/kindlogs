# What is this? 
<p align="center">
  <img src="https://user-images.githubusercontent.com/5501027/127820224-fd1f4230-fe34-44b7-b230-ef987e30e8ac.png">
</p>

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
