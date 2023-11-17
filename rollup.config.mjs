import fs from "fs";
import path from "path";
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

const dirname = path.dirname(decodeURI(new URL(import.meta.url).pathname));

const correctPath =
    process.platform === "win32" ? dirname.substring(1) : dirname;

const pkg = JSON.parse(
    fs.readFileSync(path.join(correctPath, "package.json"), "utf-8")
);

export default {
    input: "src/index.ts",
    output: {
        dir: "dist",
        format: "es",
    },
    plugins: [
        typescript({ tsconfig: "./tsconfig.json" }),
        resolve({ preferBuiltins: true, extensions: [".js", ".ts"] }),
        commonjs(),
        json(),
    ],
    external: [...Object.keys(pkg.dependencies || {})],
};
