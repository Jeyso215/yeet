import YAML from "yaml";
import * as fs from "fs";
import { Config } from "./configType";

const file = "_config/config.yml";

if (!fs.existsSync(file)) {
  throw new Error("Configuration file not found.");
}

const contents = fs.readFileSync(file, { encoding: "utf-8" });
if (typeof contents !== "string") {
  throw new Error("Configuration invalid.");
}

const config = Config.check(YAML.parse(contents));
export default config;
