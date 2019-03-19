const path = require("path");
const resolve = file => path.resolve(__dirname, file);

const presets = require(resolve("./util/presets.js"));

function isCustom(answers) {
  return answers.preset === "configure";
}

module.exports = [
  {
    name: "preset",
    message: "Choose a preset:",
    type: "list",
    choices: presets,
    default: "default"
  }
];
