const { spawnSync } = require("child_process");

function lintPython(filePath) {
  const flake8 = spawnSync("flake8", [filePath]);
  const mypy = spawnSync("mypy", [filePath]);
  return {
    flake8: flake8.stdout.toString(),
    mypy: mypy.stdout.toString()
  };
}

module.exports = { lintPython };
