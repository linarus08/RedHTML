import JSZip from "jszip";
import fs from "fs";
import path from "path";
import { INPUT_FOLDER } from "../config.js";

async function getFilesFromZip(zipFilePath, extension) {
  // Полное имя файла
  const relativePath = path.join(INPUT_FOLDER, zipFilePath);
  // Читаем ZIP-файл
  const data = fs.readFileSync(relativePath);
  // Создаем экземпляр JSZip
  const zip = await JSZip.loadAsync(data);
  // Получаем список файлов
  const fileNames = Object.keys(zip.files);

  // Фильтруем файлы по заданному расширению
  const filteredFiles = fileNames.filter((fileName) => {
    return path.extname(fileName) === extension;
  });

  return filteredFiles;
}

async function getAllFiles(packages, extension) {
  let obj_packages = new Object();
  for (const pack of packages) {
    try {
      let fileNames = await getFilesFromZip(pack, extension);
      let full_name_pack = path.join(INPUT_FOLDER, pack);
      obj_packages[full_name_pack] = fileNames;
    } catch (err) {
      console.error("Ошибка при чтении ZIP-файла:", err);
    }
  }
  return obj_packages;
}

export { getAllFiles };
