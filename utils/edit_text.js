import AdmZip from "adm-zip";
import JSZip from "jszip";
import fs from "fs";
import { INPUT_FOLDER, OUTPUT_FOLDER } from "../config.js";
import path from "path";

function edit_text(pack) {
  let full_name_pack = path.join(INPUT_FOLDER, pack);
  fs.readFile(full_name_pack, (err, data) => {
    if (err) throw err;
    const zip = new JSZip();
    // Загружаем ZIP-архив
    zip
      .loadAsync(data)
      .then((zip) => {
        // Получаем список файлов в архиве
        const files = Object.keys(zip.files);
        // Проходим по каждому файду
        const promises = files.map((fileName) => {
          // Проверяем, является ли файл html
          if (fileName.endsWith(".html")) {
            return zip
              .file(fileName)
              .async("string")
              .then((content) => {
                // Изменям содержимое файла в архиве
                const newContent = content.replace(
                  "&#x420;&#x410;&#x421;&#x41f;&#x41e;&#x420;&#x42f;&#x416;&#x415;&#x41d;&#x418;&#x415;",
                  "qwer"
                );
                // Обновляем файл в архиве
                zip.file(fileName, newContent);
              });
          }
          return Promise.resolve(); // Если файл не текстовый, просто возвращаем resolved promise
        });

        return Promise.all(promises);
      })
      .then(() => {
        // Сохраняем измененный ZIP-архив
        return zip.generateAsync({ type: "nodebuffer" });
      })
      .then((content) => {
        return new Promise((resolve, rejects) => {
          let new_pack = path.join(OUTPUT_FOLDER, pack)
          fs.writeFile(new_pack, content, (err) => {
            if (err) reject(err);
            else {
              console.log("ZIP-архив успешно обновлен!");
              resolve();
            }
          });
        });
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

function text_processing(packages) {
  for (const pack of packages) {
    edit_text(pack);
  }
}

export { text_processing };
