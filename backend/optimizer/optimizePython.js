const { spawnSync } = require("child_process");

function optimizePython(filePath) {
  spawnSync("autopep8", ["--in-place", filePath]);
}

module.exports = { optimizePython };
