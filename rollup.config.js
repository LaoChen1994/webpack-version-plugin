import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import fileSize from 'rollup-plugin-filesize'
import path from "path";

const extensions = ['.ts', '.js', '.d.ts']

export default {
  input: "./src/index.ts",
  output: {
    dir: path.resolve(__dirname, "./lib"),
    format: "cjs"
  },
  plugins: [
    typescript({
      module: 'esnext'
    }),
    terser(),
    fileSize()
  ],
};
