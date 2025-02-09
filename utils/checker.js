import { oldNameUnic, newNameUnic } from "../config.js";
import he from "he";

function decodeHtmlEntities(context) {
  // let arrDecodeText = []
  // arr.forEach(element => {
  //   arrDecodeText.push(he.decode(element));
  // });
  // return arrDecodeText;
  return he.decode(context);
}

function checkSnilsFio(inpupText, pack) {
  return new Promise((resolve, reject) => {
    const patternSnils = /\d{3}-\d{3}-\d{3} \d{2}/;
    const snils = inpupText.match(patternSnils);
    if (snils) {
      resolve(snils[0]); // Возвращаем найденный СНИЛС
    } else {
      reject(`СНИЛС не найден в тексте (с использованием match()): ${pack}`);
    }
  });
}

function checkOrganization(inpupText, pack) {
  const textHtml = decodeHtmlEntities(inpupText);
  console.log(textHtml);
  // const nameOrganizationOld = inpupText.match(oldName);
  // const nameOrganizationNew = inpupText.match(newName);
  // if (nameOrganizationOld && nameOrganizationNew) {
  //   // Используем Set для уникальных значений
  //   const uniqueNamesOld = [...new Set(nameOrganizationOld)];
  //   const decodedStrOld = decodeHtmlEntities(uniqueNamesOld);
  //   console.log(decodedStrOld);
  //   const uniqueNamesNew = [...new Set(nameOrganizationNew)];
  //   const decodedStrNew = decodeHtmlEntities(uniqueNamesNew);
  //   console.log(decodedStrOld);
  // } else if (nameOrganizationOld) {
  //   const uniqueNames = [...new Set(nameOrganizationOld)];
  //   const decodedStr = decodeHtmlEntities(uniqueNames);
  //   console.log(decodedStr);
  // } else if (nameOrganizationNew) {
  //   const uniqueNames = [...new Set(nameOrganizationNew)];
  //   const decodedStr = decodeHtmlEntities(uniqueNames);
  //   console.log(decodedStr);
  // }
}

export { checkSnilsFio, checkOrganization };
