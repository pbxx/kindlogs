// process["FORCE_COLOR"] = 3
// import ansis from "ansis"
/**
 *
 */
export class KindLogs {
	options: Record<string, any>
	logMethods = ["debug", "log", "warn", "error"]
	colors: any = null
	levelColors: any = null
	constructor(opts?: Record<string, any>) {
		this.options = {
			logLevel: 3,
			color: false,
			...opts,
		}
        // Import ansis if color is truey
		if (this.options.color == true) {
			// this.colors = require("ansis")
			// this.colors = (await import("ansis")).default
			this.colors = require("ansis")
            this.levelColors = [
                null,
                this.colors.bold.black.bgRed,
                this.colors.bold.red,
                this.colors.bold.yellow,
                this.colors.bold.cyan,
                this.colors.bold.blue,
                this.colors.bold.white
            ]
		}
	}
    evalColor = (text: string, level: number): string => {
        return this.options.color ? level != 0 ? this.levelColors[level](text) : null : text
    }
	levelTextFromInt = (level: 0 | 1 | 2 | 3 | 4 | 5 | 6): string => {
        const levelStrings = [
            null,
            "[FATAL]",
            "[ERROR]",
            "[WARN]",
            "[INFO]",
            "[DEBUG]",
            "[TRACE]",
        ]
        const outStr = this.evalColor(levelStrings[level], level)

        return outStr
	}
	log = (...args: Array<any>): any => {
		//level based logging
		if (args[0] <= this.options.logLevel) {
			//logs.log this
			const levelText = this.levelTextFromInt(args[0])
            const level = args[0]
			args.shift()
			return level == 0 ? console.log(...args) : console.log(levelText, ...args)
		}
	}
	error = (...args: Array<any>): any => {
		//level based logging
		if (args[0] <= this.options.logLevel) {
			//logs.log this
			const levelText = this.levelTextFromInt(args[0])
            const level = args[0]
			args.shift()
			return level == 0 ? console.error(...args) : console.error(levelText, ...args)
		}
	}
	warn = (...args: Array<any>): any => {
		//level based logging
		if (args[0] <= this.options.logLevel) {
			//logs.log this
			const levelText = this.levelTextFromInt(args[0])
            const level = args[0]
			args.shift()
			return level == 0 ? console.warn(...args) : console.warn(levelText, ...args)
		}
	}
	trace = (...args: Array<any>): any => {
		//level based logging
		if (args[0] <= this.options.logLevel) {
			//logs.log this
			const levelText = this.levelTextFromInt(args[0])
            const level = args[0]
			args.shift()
			return level == 0 ? console.trace(...args) : console.trace(levelText, ...args)
		}
	}
}

export default KindLogs