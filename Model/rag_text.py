from flask import Flask, request, jsonify
from dotenv import load_dotenv
from langchain_groq import ChatGroq
import os  # You need to import os to use getenv

load_dotenv()

llm = ChatGroq(
    temperature=0.1,
    model_name="mixtral-8x7b-32768",
    api_key=os.getenv("GROQ_API_KEY")
)

app = Flask(__name__)

@app.route('/',methods=['POST','GET'])
def check():
    return("Server is working!")


@app.route('/check', methods=['POST', 'GET'])
def main():
    if request.method == 'POST':
        # Get JSON data from POST request
        data = request.get_json()
        query = data.get('query', '')  # Safely get query with default empty string
    else:
        # For GET requests, you might want to get query from URL parameters
        query = request.args.get('query', '')
    
    # Here you would typically process the query with your LLM
    # For now, just returning the received query
    return jsonify({"status": "Working fine!", "query": query})

if __name__ == "__main__":
    app.run(debug=True)