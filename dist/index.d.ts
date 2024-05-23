/**
 *
 */
export declare class KindLogs {
    options: Record<string, any>;
    logMethods: string[];
    colors: any;
    levelColors: any;
    constructor(opts?: Record<string, any>);
    evalColor: (text: string, level: number) => string;
    levelTextFromInt: (level: 0 | 1 | 2 | 3 | 4 | 5 | 6) => string;
    log: (...args: Array<any>) => any;
    error: (...args: Array<any>) => any;
    warn: (...args: Array<any>) => any;
    trace: (...args: Array<any>) => any;
}
export default KindLogs;
