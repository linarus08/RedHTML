import fs from "fs";
import path from "path";

function getPackages(folder) {
  return fs.readdirSync(folder);
}

export { getPackages };
