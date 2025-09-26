CodeCortex – Multi-Language Code Analyzer & Logic Tree Generator

Repository: [https://github.com/DarkFlame2205/CodeMind](https://github.com/DarkFlame2205/CodeMind)

---

Project Description

CodeCortex is a backend-focused hackathon MVP that allows users to:

* Upload multiple code scripts (Python, JS/TS, Java, C/C++, Ruby, Shell, etc.)
* Parse classes and functions from scripts
* Generate a logic tree showing file → classes → functions
* Lint and optimize Python & JS/TS scripts
* Ready for AI explanations via local LLM (future integration)

> Datasets, ML model files, and binaries are automatically ignored.

---

Features Implemented

* Multi-language script parsing: `.py`, `.js`, `.ts`, `.java`, `.cpp`, `.c`, `.rb`, `.sh`
* Logic tree generation: JSON representation of files, classes, functions, and lines
* Linting & formatting: Python (flake8, mypy, autopep8), JS/TS (ESLint, Prettier)
* Backend ready for AI explanations (Python LLM folder included)
* Windows/Postman compatible upload

---

Folder Structure

CodeCortex/
├── backend/
│ ├── index.js # Main backend server
│ ├── parser/
│ │ ├── parsePython.js # Python parser
│ │ ├── parseJS.js # JS/TS parser
│ │ └── logicTree.js # Logic tree generator
│ ├── checker/
│ │ ├── lintPython.js
│ │ └── lintJS.js
│ ├── optimizer/
│ │ ├── optimizePython.js
│ │ └── optimizeJS.js
│ └── python_llm/ # Optional local LLM
│ ├── app.py
│ └── requirements.txt
├── .gitignore
└── README.md

> Optional: Frontend can be added later (Next.js + React + Tailwind + Mermaid.js)

---

Prerequisites

* Node.js (v18+)
* npm (v9+)
* Python (v3.9+)
* Optional (for Python LLM & linting/optimization):

  ```bash
  pip install autopep8 flake8 mypy transformers torch accelerate
  ```
* Recommended: Postman for testing `/upload` endpoint

---

Setup & Installation

1. Clone the repo

```bash
git clone https://github.com/DarkFlame2205/CodeMind.git
cd CodeCortex/backend
```

2. Install Node.js dependencies

```bash
npm install express cors express-fileupload adm-zip @babel/parser
```

3. Install Python dependencies (optional)

```bash
pip install autopep8 flake8 mypy
# If using Python LLM:
pip install -r python_llm/requirements.txt
```

---

Running the Backend

```bash
node index.js
```

* Backend will run at: `http://localhost:3001`
* `/upload` endpoint ready to accept script files

---

Uploading Files via Postman

1. Open Postman
2. Create a POST request to: `http://localhost:3001/upload`
3. In Body → form-data:

   * Key: `files`
   * Type: File
   * Select one or more code scripts (`.py`, `.js`, `.ts`, etc.)
4. Send request → Response JSON will include:

   * `structure`: parsed files, classes, functions
   * `logicTree`: hierarchical logic tree

---

Notes

* Ignored files: `.csv`, `.h5`, `.pt`, `.pkl`, `.bin`
* Linting & optimization: use scripts in `checker/` and `optimizer/`
* Windows users: Ensure Python is added to PATH

---

Example JSON Output

```json
{
  "structure": [
    { "file": "app.py", "functions": ["helper", "start"], "classes": ["Server"] },
    { "file": "main.js", "functions": ["util"], "classes": ["App"] }
  ],
  "logicTree": [
    { "file": "app.py", "classes": ["Server"], "functions": ["helper","start"] },
    { "file": "main.js", "classes": ["App"], "functions": ["util"] }
  ]
}
```

---

Future Work

* Detect function calls & imports
* Generate UML / Mermaid diagrams
* Add React frontend to visualize logic tree
* Integrate interactive AI chat with local LLM

---

License

MIT License
