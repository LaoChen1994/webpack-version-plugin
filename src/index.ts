import path from 'path';
import { URL } from 'url'
import fs from 'fs'
import chalk from 'chalk';
import { BaseVersion, GEN_MODE, IOptions } from './interface'
import { Compilation, Compiler } from 'webpack';


const STATIC_FILE_TYPE = {
  CSS: 'css',
  JS: 'js',
  STATIC_FILE: 'static',
};

class VersionPlugin {
  private jsPublicPath: string;
  private cssPublicPath: string;
  private localPath: string;
  private isProduction: boolean;
  private mode: GEN_MODE;
  private publicPath: string;
  private jsVersionPath: string;
  private cssVersionPath: string;

  constructor(props: IOptions) {
    const {
      jsPublicPath = '',
      cssPublicPath = '',
      localPath = '',
      isProduction = false,
      publicPath = '',
      mode = GEN_MODE.OVERITE,
      jsVersionPath = '',
      cssVersionPath = '',
    } = props;

    this.jsPublicPath = jsPublicPath;
    this.cssPublicPath = cssPublicPath;
    this.localPath = localPath;
    this.isProduction = isProduction;
    this.publicPath = publicPath;
    this.mode = mode;
    this.jsVersionPath = jsVersionPath;
    this.cssVersionPath = cssVersionPath;
  }

  getStaticPath(fileName: string) {
    const isJS = fileName.match(/\.js$/);
    const isCss = fileName.match(/.css$/);
    let prefixUrl: string = '';

    if (!this.isProduction) {
      prefixUrl = path.join(this.localPath, fileName);
    } else {
      prefixUrl = new URL(
        fileName,
        isJS ? this.jsPublicPath : isCss ? this.cssPublicPath : this.publicPath
      ).href;
    }

    return {
      type: isJS
        ? STATIC_FILE_TYPE.JS
        : isCss
        ? STATIC_FILE_TYPE.CSS
        : STATIC_FILE_TYPE.STATIC_FILE,
      path: prefixUrl,
    };
  }

  apply(compiler: Compiler) {
    let chunkJSMap:Record<string, string> = {};
    let chunkCssMap: Record<string, string> = {};
    const jsVersionPath = path.resolve(__dirname, this.jsVersionPath);
    const cssVersionPath = path.resolve(__dirname, this.cssVersionPath);

    compiler.hooks.emit.tapAsync('myPlugin', async (compilation: Compilation, cb: Function) => {
      compilation.chunks.forEach((chunk) => {
        const chunkName = chunk.name;

        chunk.files.forEach((filename: string) => {
          console.log('this ->', this)
          const { type, path: _staticPath } = this.getStaticPath(filename);
          switch (type) {
            case STATIC_FILE_TYPE.JS:
              chunkJSMap[chunkName] = _staticPath;
              break;
            case STATIC_FILE_TYPE.CSS:
              chunkCssMap[chunkName] = _staticPath;
              break;
            default:
              break;
          }
        });
      });

      if (this.mode === GEN_MODE.MERGE) {
        try {
          const prevJsMap = JSON.parse(fs.readFileSync(jsVersionPath).toString() || '{}');
          const prevCssMap = JSON.parse(
            fs.readFileSync(cssVersionPath).toString() || '{}'
          );

          chunkJSMap = { ...chunkJSMap, ...prevJsMap };
          chunkCssMap = { ...chunkCssMap, ...prevCssMap };
        } catch (error) {
          console.log('读取文件错误 ->', error);
        }
      }

      fs.writeFileSync(jsVersionPath, JSON.stringify(chunkJSMap));
      fs.writeFileSync(cssVersionPath, JSON.stringify(chunkCssMap));

      console.log(chalk.yellow(`js version 文件已经生成${jsVersionPath}`));
      console.log(chalk.yellow(`css version 文件已经生成${cssVersionPath}`));

      cb();
    });
  }
}

export default { VersionPlugin, GEN_MODE };