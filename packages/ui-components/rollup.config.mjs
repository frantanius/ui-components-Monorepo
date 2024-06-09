import typescript from "rollup-plugin-typescript2";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";

export default {
  input: ["src/index.ts"],
  output: {
    dir: "build",
    format: "esm",
    sourcemap: true,
    preserveModules: true,
  },
  plugins: [
    postcss({
      extract: true,
      modules: true,
      minimize: true,
      sourceMap: true,
    }),
    typescript(),
    terser(),
  ],
  external: ["react"],
  watch: {
    include: "src/**",
    exclude: "node_modules/**",
  },
};
