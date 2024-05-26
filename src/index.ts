// process["FORCE_COLOR"] = 3
// import ansis from "ansis"
/**
 *
 */
type LevelInteger = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

interface LogOptions {
    logLevel?: LevelInteger
    color?: boolean
    logDir?: false | string
    filename?: null | string
    fileExt?: null | string
}

export class KindLogs {
	options: Record<string, any>
	logMethods = ["debug", "log", "warn", "error", "trace"]
	colorlib: any = null
	levelColors: any = null
    levelStrings = [
        "[EMERG]",
        "[ALERT]",
        "[CRIT]",
        "[ERROR]",
        "[WARN]",
        "[NOTICE]",
        "[INFO]",
        "[DEBUG]",
    ]
	constructor(opts?: LogOptions) {
		this.options = <LogOptions>{
			logLevel: 3,
			color: false,
            logDir: false,
            filename: null,
            fileExt: null,
			...opts,
		}
        // Import ansis if color is truey
		if (this.options.color == true) {
			this.enableColor()
		}

        // Create standard log methods on class
        this.logMethods.forEach((method) => {
            this[method] = (...args: Array<any>): any => {
                //level based logging
                if (args[0] <= this.options.logLevel) {
                    //logs.log this
                    const levelText = this.levelTextFromInt(args[0])
                    const level = args[0]
                    args.shift()
                    return level == -1 ? console[method](...args) : console[method](levelText, ...args)
                }
            }
        })
	}
    enableColor = () => {
        // enable console colors on the class
        this.colorlib = require("ansis")
        this.levelColors = [
            this.colorlib.bold.black.bgRed, 
            this.colorlib.bold.white.bgRed, 
            this.colorlib.bold.white.bgRed, 
            this.colorlib.bold.red, 
            this.colorlib.bold.yellow, 
            this.colorlib.bold.cyan, 
            this.colorlib.bold.blue, 
            this.colorlib.bold.white 
        ]
        this.options.color = true
    }
    disableColor = () => {
        // disable console colors on the class
        this.colorlib = null
        this.levelColors = null
        this.options.color = false
    }
    evalColor = (text: string, level: LevelInteger): string => {
        return this.options.color ? this.levelColors[level](text) : text
    }
	levelTextFromInt = (level: LevelInteger): string => {
        const outStr = this.evalColor(this.levelStrings[level], level)

        return outStr
	}
    writeLog = (method: string, level: LevelInteger, args: Array<any>) => {

    }
}

export default KindLogs