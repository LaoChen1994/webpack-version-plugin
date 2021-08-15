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
declare const _default: {
    VersionPlugin: typeof VersionPlugin;
    GEN_MODE: typeof GEN_MODE;
};
export default _default;
