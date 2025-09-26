const parser = require("@babel/parser");

function parseJS(code, fileName = "unknown") {
  const ast = parser.parse(code, { sourceType: "module", plugins: ["typescript"] });
  const functions = [];
  const classes = [];

  ast.program.body.forEach((node) => {
    if (node.type === "FunctionDeclaration") functions.push(node.id.name);
    if (node.type === "ClassDeclaration") classes.push(node.id.name);
  });

  return { file: fileName, functions, classes };
}

module.exports = { parseJS };
