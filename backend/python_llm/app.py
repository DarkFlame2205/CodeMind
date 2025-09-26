from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

MODEL = "gemma3:latest"  # <- update here

@app.route("/chat", methods=["GET", "POST"])
def chat():
    if request.method == "GET":
        return jsonify({"message": "Use POST with JSON: { 'code': '...', 'question': '...' }"})

    data = request.json
    code_chunk = data.get("code", "")
    question = data.get("question", "")
    prompt = f"Analyze this code:\n{code_chunk}\n\nQuestion: {question}"

    try:
        result = subprocess.run(
            ["ollama", "run", MODEL],
            input=prompt,
            text=True,
            capture_output=True
        )
        response = result.stdout.strip()
        return jsonify({"response": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000)
