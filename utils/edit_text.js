import AdmZip from "adm-zip";
import JSZip from "jszip";
import fs from "fs";
import { INPUT_FOLDER, OUTPUT_FOLDER } from "../config.js";
import path from "path";
import { replaceNameArea } from "./replaceText.js";
import { checkSnilsFio } from "./checkSnilsFio.js";

async function editText(pack) {
  const fullNamePack = path.join(INPUT_FOLDER, pack);

  try {
    const data = await fs.promises.readFile(fullNamePack);
    const zip = await JSZip.loadAsync(data);

    const files = Object.keys(zip.files);
    const promises = files.map(async (fileName) => {
      if (fileName.endsWith(".html")) {
        const content = await zip.file(fileName).async("string");

        const newContent = replaceNameArea(content); // Исправить имя СФР
        checkSnilsFio(content, pack)
          .then((snils) => {
            console.log("Найден СНИЛС:", snils);
          })
          .catch((error) => {
            console.log(error);
          });
        zip.file(fileName, newContent);
      }
    });
    await Promise.all(promises);

    const content = await zip.generateAsync({ type: "nodebuffer" });
    const newPack = path.join(OUTPUT_FOLDER, pack);

    // await fs.promises.writeFile(newPack, content);

    console.log("ZIP-архив успешно обновлен!");
  } catch (err) {
    console.error(err);
  }
};

async function textProcessing(packages) {
  for (const pack of packages) {
    await editText(pack);
  }
};

export { textProcessing }
