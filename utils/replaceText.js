import { oldNameUnic, newNameUnic } from "../config.js";

function replaceNameArea(inputText) {

    let outputText = inputText.replace(oldNameUnic, newNameUnic);
    return outputText;
};

export { replaceNameArea }