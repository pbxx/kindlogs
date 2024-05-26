const { KindLogs } = require("../dist/index.js")
// const { KindLogs } = require("../src/index.ts")

const logs = new KindLogs({
    logLevel: 7, // logging level, default is 3
    color: true // color mode, default is false
})

async function run() {
    // await logs.init()
    
    console.log("** Log method tests: **")
    logs.warn(5, "Warning sample")
    logs.trace(5, "Trace sample")
    logs.error(5, new Error("A sample Error happened, disregard."))
    logs.debug(5, "logs.debug() test")
    console.log("** End log method tests **")
    
    logs.disableColor()
    console.log("** Non-color mode: **")
    logs.log(0, "Log level 0")
    logs.log(1, "Log level 1")
    logs.log(2, "Log level 2")
    logs.log(3, "Log level 3")
    logs.log(4, "Log level 4")
    logs.log(5, "Log level 5")
    logs.log(6, "Log level 6")
    logs.log(7, "Log level 7 \n")

    logs.enableColor()
    console.log("** Color mode: **")
    logs.log(0, "Log level 0")
    logs.log(1, "Log level 1")
    logs.log(2, "Log level 2")
    logs.log(3, "Log level 3")
    logs.log(4, "Log level 4")
    logs.log(5, "Log level 5")
    logs.log(6, "Log level 6")
    logs.log(7, "Log level 7 \n")
    
}

run()