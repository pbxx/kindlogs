const { KindLogs } = require("../dist/index.js")
// const { KindLogs } = require("../src/index.ts")

const logs = new KindLogs({
    logLevel: 7, // logging level, default is 3
    color: true, // color mode, default is false
    fileOptions: {
        dir: "test/logs",
        name: "kindlogs",
        logLevel: 3,
        
    },
    locale: "en-US",
    timeZone: "UTC",
    timestamp: true,
    
})

async function run() {
    // await logs.init()
    
    console.log("** Log method tests: **")
    logs.error(3, new Error("A sample Error happened, disregard.", 487))
    logs.error(3, "A sample string Error happened, disregard.")
    logs.warn(4, "Warning sample")
    logs.debug(7, "logs.debug() test")
    logs.trace(7, "Trace sample", " With multiple args")
    logs.log(7, "Normal log sample")
    console.log("** End log method tests **")
    
    console.log("** Non-color mode: **")
    logs.disableColor()
    logs.log(0, "Log level 0")
    logs.log(1, "Log level 1")
    logs.log(2, "Log level 2")
    logs.log(3, "Log level 3")
    logs.log(4, "Log level 4")
    logs.log(5, "Log level 5")
    logs.log(6, "Log level 6")
    logs.log(7, "Log level 7 \n")

    
    console.log("** Color mode: **")
    logs.enableColor()
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