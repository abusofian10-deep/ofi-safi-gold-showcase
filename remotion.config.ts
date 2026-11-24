import fs from "fs";
import path from "path";
import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
if (fs.existsSync(chromePath)) {
  Config.setBrowserExecutable(chromePath);
}

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

Config.overrideBundlerConfig((currentConfig) => {
  const tailwindConfig = enableTailwind(currentConfig);
  return {
    ...tailwindConfig,
    resolve: {
      ...tailwindConfig.resolve,
      alias: {
        ...(tailwindConfig.resolve?.alias || {}),
        react: path.resolve(process.cwd(), "src/react-shim.js"),
      },
    },
  };
});
