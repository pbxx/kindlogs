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
}

interface LogOptions {
	logLevel?: LevelInteger
	color?: boolean
	fileOptions?: false | FileOptions
}

export class KindLogs {
	options: Record<string, any>
	logMethods = ["debug", "log", "warn", "error", "trace"]
	colorLib: any = null
	fsLib: any = null
	pathLib: any = null
	levelColors: any = null
	displayLevelStrings = ["[EMERG]", "[ALERT]", "[CRIT]", "[ERROR]", "[WARN]", "[NOTICE]", "[INFO]", "[DEBUG]"]
	constructor(opts?: LogOptions) {
		this.options = <LogOptions>{
			logLevel: 3,
			color: false,
			fileOptions: false,
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
		this.colorLib = require("ansis")
		this.levelColors = [this.colorLib.bold.black.bgRed, this.colorLib.bold.white.bgRed, this.colorLib.bold.white.bgRed, this.colorLib.bold.red, this.colorLib.bold.yellow, this.colorLib.bold.cyan, this.colorLib.bold.blue, this.colorLib.bold.white]
		this.options.color = true
	}
	disableColor = () => {
		// disable console colors on the class
		this.colorLib = null
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
		this.fsLib = require("node:fs")
		this.pathLib = require("node:path")

		// create logs directory
		if (this.options.fileOptions.forceCreateDir) {
			this.createDirIfNotExists(this.options.fileOptions.dir)
		}
	}
	disableFileLogging = () => {
		this.options.fileOptions = false
	}
	createDirIfNotExists = (dir: string): void => {
		if (!this.fsLib.existsSync(dir)) {
			// dir does not exist
			this.fsLib.mkdirSync(dir)
		}
		return
	}
	getStackTrace(err?: Error | string): Array<string> {
		var error: Error | undefined
		// console.log(typeof(err))
		if (typeof err == "string") {
			error = new Error(err)
		} else {
			error = err
		}
		let stack: string = error.stack || new Error().stack
		let stackArr: Array<string> = []
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
				const filename = this.pathLib.resolve(this.options.fileOptions.dir, this.options.fileOptions.name + (isError ? ".error" : ".debug") + "." + this.options.fileOptions.ext)
				const date = new Date().toLocaleString()
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

				this.fsLib.appendFileSync(filename, lineString)
			}
		}
		return
	}
}

export default KindLogs
