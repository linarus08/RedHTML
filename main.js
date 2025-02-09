import { getPackages } from "./utils/packages.js";
import { getAllFiles } from "./utils/files.js";
import { INPUT_FOLDER, OUTPUT_FOLDER, EXTENSION } from "./config.js";
import { text_processing } from "./utils/edit_text.js";

async function main() {
  let packages = getPackages(INPUT_FOLDER); // список пакетов из папки input
  text_processing(packages);
}

main();
