const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");

const { parsePython } = require("./parser/parsePython");
const { parseJS } = require("./parser/parseJS");
const { buildLogicTree } = require("./parser/logicTree");

const app = express();
app.use(cors());
app.use(fileUpload());
app.use(express.json());

const allowedExtensions = [".py", ".js", ".ts", ".java", ".cpp", ".c", ".rb", ".sh"];
const ignoredExtensions = [".csv", ".h5", ".pt", ".pkl", ".bin"];

app.post("/upload", async (req, res) => {
  try {
    console.log("Received files:", req.files);

    if (!req.files || !req.files.files) {
      return res.status(400).send("No files uploaded");
    }

    const files = Array.isArray(req.files.files) ? req.files.files : [req.files.files];

    // Filter valid script files
    const filteredFiles = files.filter(file => {
      const ext = path.extname(file.name).toLowerCase();
      return allowedExtensions.includes(ext) && !ignoredExtensions.includes(ext);
    });

    if (filteredFiles.length === 0) return res.status(400).send("No valid script files uploaded");

    const parsedData = [];

    for (let file of filteredFiles) {
      console.log("Processing file:", file.name);
      const content = file.data.toString();

      const ext = path.extname(file.name).toLowerCase();

      if (ext === ".py") parsedData.push(await parsePython(content, file.name));
      else if (ext === ".js" || ext === ".ts") parsedData.push(parseJS(content, file.name));
      else {
        // Unknown script type → minimal parsing (lines and simple function regex)
        const lines = content.split("\n").length;
        const functions = [];
        const funcRegex = /function\s+([a-zA-Z0-9_]+)|def\s+([a-zA-Z0-9_]+)/g;
        let match;
        while ((match = funcRegex.exec(content)) !== null) {
          functions.push(match[1] || match[2]);
        }
        parsedData.push({ file: file.name, functions, classes: [], lines });
      }
    }

    const logicTree = buildLogicTree(parsedData);
    res.json({ structure: parsedData, logicTree });
  } catch (err) {
    console.error("Error in /upload:", err);
    res.status(500).send("Error processing files");
  }
});

app.listen(3001, () => console.log("Backend running on http://localhost:3001"));
