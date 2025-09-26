const { execSync } = require("child_process");

function lintJS(filePath) {
  try {
    return execSync(`npx eslint ${filePath}`).toString();
  } catch (e) {
    return e.stdout.toString();
  }
}

module.exports = { lintJS };
