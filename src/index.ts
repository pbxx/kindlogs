// process["FORCE_COLOR"] = 3
// import ansis from "ansis"
/**
 *
 */
type LevelInteger = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
interface FileOptions {
	dir: false | string
	name: null | string
	logLevel?: null | LevelInteger
	ext?: null | string
	singleFile?: boolean
	forceCreateDir?: boolean
    timestamp: boolean
}

interface LogOptions {
	logLevel: LevelInteger
	color: boolean
	fileOptions: false | FileOptions
    locale: string
    timeZone: string
    timestamp: boolean
}

var ansis = null
var fs = null
var path = null

export class KindLogs {
	options: LogOptions
	logMethods = ["debug", "info", "log", "warn", "error", "trace"]
	levelColors: any = null
	displayLevelStrings = ["[EMERG]", "[ALERT]", "[CRIT]", "[ERROR]", "[WARN]", "[NOTICE]", "[INFO]", "[DEBUG]"]
	constructor(opts?: LogOptions) {
		this.options = {
			logLevel: 3,
			color: false,
			fileOptions: false,
            locale: "en-GB",
            timeZone: "UTC",
            timestamp: false,
			...opts,
		}
		// Import ansis if color is truey
		if (this.options.color == true) {
			this.enableColor()
		}

		// initialize file logging if enabled
		if (this.options.fileOptions) {
			this.enableFileLogging()
		}

		// Create standard log methods on class
		this.logMethods.forEach((method) => {
			this[method] = (level: LevelInteger, ...args: Array<any>): any => {
				this.writeLog(method, level, args)
			}
		})
	}
	enableColor = () => {
		// enable console colors on the class
		ansis = require("ansis")
		this.levelColors = [ansis.bold.black.bgRed, ansis.bold.white.bgRed, ansis.bold.white.bgRed, ansis.bold.red, ansis.bold.yellow, ansis.bold.cyan, ansis.bold.blue, ansis.bold.white]
		this.options.color = true
	}
	disableColor = () => {
		// disable console colors on the class
		ansis = null
		this.levelColors = null
		this.options.color = false
	}
	enableFileLogging = () => {
		// merge user options with default file options
		this.options.fileOptions = <FileOptions>{
			ext: "log",
			logLevel: this.options.logLevel,
			singleFile: false,
			forceCreateDir: true,
			...this.options.fileOptions,
		}
		// load required libraries for file writing
		fs = require("node:fs")
		path = require("node:path")

		// create logs directory
		if (this.options.fileOptions.forceCreateDir && this.options.fileOptions.dir) {
			this.createDirIfNotExists(this.options.fileOptions.dir)
		}
	}
	disableFileLogging = () => {
		this.options.fileOptions = false
	}
	createDirIfNotExists = (dir: string): void => {
		if (!fs.existsSync(dir)) {
			// dir does not exist
			fs.mkdirSync(dir)
		}
		return
	}
	getStackTrace(err?: any): Array<string> {
		var error: Error | undefined
		// console.log(typeof(err))
        if (err && err.stack && err.message) {
            // argument is a real error
            error = err
        } else {
			error = new Error(err)
		}
		var stack: string = error.stack || new Error().stack
		var stackArr: Array<string> = []
		stackArr = stack.split("\n").map((line) => {
			return line.trim()
		})
		return stackArr.splice(stackArr[0] == "Error" ? 2 : 1)
		// return stackArr
	}
	levelTextFromInt = (level: LevelInteger): string => {
		const outStr = this.options.color ? this.levelColors[level](this.displayLevelStrings[level]) : this.displayLevelStrings[level]

		return outStr
	}
    getDateAndTimeString(): string {
        const date = new Date()
        const localeString = date.toLocaleString(this.options.locale, {
            
            timeZoneName: "shortOffset",
            timeZone: this.options.timeZone,
            weekday: "short",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
        })
        // console.log(localeString.replace("GMT", "UTC"))
        return localeString.replace("GMT", "UTC")
    }

	writeLog = (method: string, level: LevelInteger, args: Array<any>): any => {
		//level based console logging
		if (level <= this.options.logLevel) {
			// show log in console
			const levelText = this.levelTextFromInt(level)
			if (method == "trace") {
				var lineString = ""
				const trace = this.getStackTrace(args[0]).splice(3)
				lineString += `${args.join(" ")} \n    ${trace.join("\n    ")}`
				console.error(levelText, lineString)
			} else {
				console[method](levelText, ...args)
			}
		}
		// level-based file logging
		if (this.options.fileOptions) {
			// file-logging is enabled
			if (level <= this.options.fileOptions.logLevel) {
				// append log to file
				const displayLevelText = this.displayLevelStrings[level]
				const isError = level <= 3
				const pathElements = []
				const filename = path.resolve(this.options.fileOptions.dir, this.options.fileOptions.name + (isError ? ".error" : ".debug") + "." + this.options.fileOptions.ext)
				const date = this.getDateAndTimeString()
				var lineString = `[${date}] ${displayLevelText} `
				if (method == "error" || method == "warn") {
					// console.log(lineString)
					const err = args[0]
					const trace = this.getStackTrace(err)
					if (err && err.stack && err.message) {
						// argument is a real error
						lineString += `${err.message} \n    ${trace.join("\n    ")} \n`
					} else {
						// argument is a string error, splice first 3 items in autogenerated trace
						lineString += `${err} \n    ${trace.splice(3).join("\n    ")} \n`
					}
				} else if (method == "trace") {
					const trace = this.getStackTrace(args[0]).splice(3)
					lineString += `${args.join(", \n")} \n    ${trace.join("\n    ")}`
				} else {
					lineString += `${args.join(", \n")} \n`
				}

				fs.appendFileSync(filename, lineString)
			}
		}
		return
	}
}

export default KindLogs
