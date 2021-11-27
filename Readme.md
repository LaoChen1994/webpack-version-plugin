# webpack-version-generation-plugin

## 介绍

Webpack插件用于生成打包文件地址，和打包文件名称之间的映射关系

## 参数介绍

|参数|类型| 是否必填 |默认值|介绍|
|---|---|---|---|---|
|jsVersionPath|string|是|/|JS文件地址|
|cssVersionPath|String|是|/|CSS文件地址|
|localPath|String|是|/|本地文件地址|
|mode|'merge' \| 'overwrite'|否|merge| 输出内容是合并还是复写     |
|isProduction|Boolean|否|False|是否为生产模式|
|cssPublicPath|string|否|''|生产环境CSS文件拼接cdn地址|
|jsPublicPath|string|否| ''     |生产环境JS文件拼接cdn地址|

## 用法

### 安装

```bash
npm i webpack-version-generation-plugin
```

### 使用

```javascript
// webpack.config.js
// 省略其他
const VersionGenPlugin = require('webpack-version-generation-plugin')

module.exports = (env) => {

  return {
    // ...省略其他
    plugins: [
      new VersionGenPlugin({
        jsPublicPath: 'http://127.0.0.1:3000/public/',
        cssPublicPath: 'http://127.0.0.1:3000/public/',
        localPath: path.resolve(__dirname, '../../local'),
        isProduction,
        mode: 'merge',
        jsVersionPath: path.resolve(__dirname, '../../config/version_js.json'),
        cssVersionPath: path.resolve(__dirname, '../../config/version_css.json')
      })
    ]
};

```

