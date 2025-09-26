const { execSync } = require("child_process");

function optimizeJS(filePath) {
  execSync(`npx prettier --write ${filePath}`);
}

module.exports = { optimizeJS };
