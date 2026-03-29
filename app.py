from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    text = data.get("text", "").strip()

    if not text:
        return jsonify({"error": "No input provided"}), 400

    sentences = [s.strip() for s in text.replace("\n", " ").split(".") if s.strip()]

    summary = sentences[0] + "." if sentences else "No summary available."

    key_points = []
    for sentence in sentences[:3]:
        key_points.append("• " + sentence)

    questions = [
        "1. What is the main idea of these notes?",
        "2. Why is this topic important?",
        "3. How can this concept be used in real life?"
    ]

    if len(sentences) >= 2:
        questions = [
            f"1. Explain this idea: {sentences[0]}",
            f"2. Why is this important: {sentences[1]}?",
            "3. Write one real-world application of this topic."
        ]

    return jsonify({
        "summary": summary,
        "key_points": key_points,
        "questions": questions
    })

if __name__ == "__main__":
    app.run(debug=True)