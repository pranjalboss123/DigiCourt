from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
from transformers import AutoTokenizer, AutoModelForTokenClassification, pipeline
from sentence_transformers import SentenceTransformer
import os
import numpy as np  # Add this import

app = Flask(__name__)
CORS(app)

# Load LegalBERT for legal entity detection
legal_bert_model = AutoModelForTokenClassification.from_pretrained(
    "nlpaueb/legal-bert-base-uncased"
)
legal_bert_tokenizer = AutoTokenizer.from_pretrained("nlpaueb/legal-bert-base-uncased")
ner_pipeline = pipeline("ner", model=legal_bert_model, tokenizer=legal_bert_tokenizer)

# Load Sentence-BERT for similarity
sentence_model = SentenceTransformer("all-mpnet-base-v2")

@app.route("/analyze", methods=["POST"])
def analyze_pdf():
    try:
        file = request.files["file"]
        file_path = os.path.join("temp", file.filename)
        file.save(file_path)

        # Extract text from PDF
        text = ""
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        for i in range (1,10):
            print('\n')
            print ("text section done ")
        if not text.strip():
            return jsonify({"error": "No text extracted from PDF"}), 400

        # Analyze with LegalBERT (convert scores to float)
        raw_entities = ner_pipeline(text)
        entities = [
            {
                "word": e["word"],
                "entity": e["entity"],
                "score": float(e["score"]),  # Critical fix
                "start": e["start"],
                "end": e["end"],
            }
            for e in raw_entities
        ]
        for i in range (1,10):
            print('\n')
            print ("entity section done ")

        # Generate embeddings (already converted to floats)
        embeddings = sentence_model.encode(text)
        embeddings_list = [float(x) for x in embeddings.tolist()]
        for i in range(1, 10):
            print("\n")
            print("embedding section done ")

        os.remove(file_path)
        print("cleanup section done ")
        return jsonify(
            {
                "text": text,
                # "entities": entities,
                # "embeddings": embeddings_list
            }
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5000)
