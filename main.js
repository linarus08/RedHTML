import { getPackages } from "./utils/packages.js";
import { getAllFiles } from "./utils/files.js";
import { INPUT_FOLDER, OUTPUT_FOLDER, EXTENSION } from "./config.js";
import { textProcessing } from "./utils/edit_text.js";


async function main() {
  let packages = getPackages(INPUT_FOLDER); // список пакетов из папки input
  textProcessing(packages);
}

main();
