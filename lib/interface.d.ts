import { Compiler } from "webpack";
export declare enum GEN_MODE {
    MERGE = "merge",
    OVERITE = "overwrite"
}
export interface IOptions {
    jsPublicPath: string;
    cssPublicPath: string;
    localPath?: string;
    publicPath?: string;
    jsVersionPath: string;
    cssVersionPath: string;
    isProduction?: boolean;
    mode: GEN_MODE;
}
export declare class BaseVersion {
    constructor(options: IOptions);
    apply(compiler: Compiler): void;
}
