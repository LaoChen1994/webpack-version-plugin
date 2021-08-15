import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import fileSize from 'rollup-plugin-filesize'
import path from "path";

export default {
  input: "./src/index.ts",
  output: {
    dir: path.resolve(__dirname, "./lib"),
    format: "cjs",
  },
  plugins: [
    typescript({
      tsBuildInfoFile: path.resolve(__dirname, "./tsconfig.json"),
    }),
    terser(),
    fileSize()
  ],
};
