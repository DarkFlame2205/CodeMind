const fs = require("fs");
const { spawn } = require("child_process");
const path = require("path");

function parsePython(code, fileName = "unknown") {
  return new Promise((resolve, reject) => {
    const tempFile = path.join(__dirname, `${Date.now()}.py`);
    fs.writeFileSync(tempFile, code);

    const pyProcess = spawn("python", ["-c", `
import ast, json, sys
with open(r"${tempFile}", "r", encoding="utf-8") as f:
    tree = ast.parse(f.read())
funcs = [n.name for n in ast.walk(tree) if isinstance(n, ast.FunctionDef)]
classes = [n.name for n in ast.walk(tree) if isinstance(n, ast.ClassDef)]
print(json.dumps({"file": "${fileName}", "functions": funcs, "classes": classes}))
`]);

    let output = "";
    let error = "";

    pyProcess.stdout.on("data", (data) => (output += data.toString()));
    pyProcess.stderr.on("data", (data) => (error += data.toString()));

    pyProcess.on("close", () => {
      fs.unlinkSync(tempFile);
      if (error) return reject(new Error(error));
      try {
        resolve(JSON.parse(output));
      } catch (e) {
        reject(e);
      }
    });
  });
}

module.exports = { parsePython };
