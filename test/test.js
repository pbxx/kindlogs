const { KindLogs } = require("../dist/index.js")

const logs = new KindLogs({
    logLevel: 6, // logging level, default is 3
    color: false // color mode, default is false
})

async function run() {
    // await logs.init()
    
    console.log("Vanilla tests:")
    logs.warn(5, "Warning sample")
    logs.trace(5, "Trace sample")
    logs.error(5, new Error("A sample Error happened, disregard."))
    console.log("")
    

    logs.options.color = false
    console.log("Non-color mode:")
    logs.log(0, "Log level 0")
    logs.log(1, "Log level 1")
    logs.log(2, "Log level 2")
    logs.log(3, "Log level 3")
    logs.log(4, "Log level 4")
    logs.log(5, "Log level 5")
    logs.log(6, "Log level 6 \n")

    // logs.options.color = true
    console.log("Color mode:")
    logs.log(0, "Log level 0")
    logs.log(1, "Log level 1")
    logs.log(2, "Log level 2")
    logs.log(3, "Log level 3")
    logs.log(4, "Log level 4")
    logs.log(5, "Log level 5")
    logs.log(6, "Log level 6 \n")
    
}

run()