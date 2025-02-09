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
};

export { checkSnilsFio }