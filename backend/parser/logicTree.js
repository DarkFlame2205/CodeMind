function buildLogicTree(parsedFiles) {
  return parsedFiles.map(f => ({
    file: f.file || "unknown",
    classes: f.classes || [],
    functions: f.functions || [],
    lines: f.lines || undefined
  }));
}

module.exports = { buildLogicTree };
