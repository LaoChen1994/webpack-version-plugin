import { Compiler } from 'webpack'

declare namespace BaseVersionPlugin {
  enum GEN_MODE {
    MERGE =  'merge',
    OVERITE =  'overwrite',
  }

  interface IOptions{
    jsPublicPath: string
    cssPublicPath: string
    localPath?: string
    publicPath?: string
    jsVersionPath: string
    cssVersionPath: string
    isProduction?: boolean
    mode: GEN_MODE
  }

  class BaseVersion {
    constructor(options: IOptions);
    apply(compiler: Compiler): void;
  }

}

export = BaseVersionPlugin