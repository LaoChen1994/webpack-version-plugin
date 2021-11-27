import { GEN_MODE, IOptions } from './interface';
import { Compiler } from 'webpack';
declare class VersionPlugin {
    private jsPublicPath;
    private cssPublicPath;
    private localPath;
    private isProduction;
    private mode;
    private publicPath;
    private jsVersionPath;
    private cssVersionPath;
    constructor(props: IOptions);
    getStaticPath(fileName: string): {
        type: string;
        path: string;
    };
    apply(compiler: Compiler): void;
}
export { VersionPlugin, GEN_MODE };
