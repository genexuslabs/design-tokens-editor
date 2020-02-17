import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
  namespace: "design-tokens-editor",
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader"
    },
    {
      type: "docs-readme"
    },
    {
      type: "www",
      serviceWorker: null // disable service workers
    }
  ],
  globalStyle: "src/globals/global.scss",
  plugins: [
    sass({
      injectGlobalPaths: ["src/globals/mixins.scss"]
    })
  ]
};
