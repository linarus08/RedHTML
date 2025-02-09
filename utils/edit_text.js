import AdmZip from "adm-zip";
import JSZip from "jszip";
import fs from "fs";
import { INPUT_FOLDER, OUTPUT_FOLDER } from "../config.js";
import path from "path";

async function editText(pack) {
  const fullNamePack = path.join(INPUT_FOLDER, pack);

  try {
    const data = await fs.promises.readFile(fullNamePack);
    const zip = await JSZip.loadAsync(data);

    const files = Object.keys(zip.files);
    const promises = files.map(async (fileName) => {
      if (fileName.endsWith(".html")) {
        const content = await zip.file(fileName).async("string");
        const newContent = content.replace(
          "&#x420;&#x410;&#x421;&#x41f;&#x41e;&#x420;&#x42f;&#x416;&#x415;&#x41d;&#x418;&#x415;",
          "qwer"
        );
        zip.file(fileName, newContent);
      }
    });
    await Promise.all(promises);

    const content = await zip.generateAsync({ type: "nodebuffer" });
    const newPack = path.join(OUTPUT_FOLDER, pack);
    await fs.promises.writeFile(newPack, content);
    console.log("ZIP-архив успешно обновлен!");
  } catch (err) {
    console.error(err);
  }
}

async function textProcessing(packages) {
  for (const pack of packages) {
    await editText(pack);
  }
}

export { textProcessing };
