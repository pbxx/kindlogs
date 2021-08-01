var chalk = require('chalk')

module.exports = {
	KindLogger: class {
		constructor(options) {
			var defaults = {
                log: {
                    color: "#52c0f7",
                    text: "info",
                    use: "log",
                },
                warn: {
                    color: "#f7c052",
                    text: "warn",
                    use: "log",
                },
                err: {
                    color: "#eb3474",
                    text: "error",
                    use: "error",
                },
                format: {
                    startChar: "[",
                    endChar: "]",
                    extraLine: false,
                    fname: ""
                }
				
			}
			
			this.options = {
				...defaults,
				...options
			}

            var optKeys = Object.keys(this.options)
            var self = this;

            for (var key of optKeys) {
                if (key != "format" && key != "constructor") {
                    //create a function for every key in options
                    this[key] = (...args) => {
                        //this.options[key]
                        var logArgs = [
                            chalk.hex(self.options[key].color).bold(self.options.format.startChar + " " + self.options[key].text + ": " + self.options.format.fname + " " + self.options.format.endChar),
                            ...args,
                        ]
                        console[self.options[key].use](...logArgs)

                    }
                }
            }
		}
	}
}