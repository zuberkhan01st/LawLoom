from flask import Flask, request, jsonify
from langchain_groq import ChatGroq
from langchain_pinecone import Pinecone as PineconeVectorStore
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
import pinecone
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configuration
INDEX_NAME = "indian-polity"

def initialize_components():
    """Initialize all required components"""
    try:
        # 1. Initialize embeddings
        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )
        
        # 2. Initialize Pinecone client (v3)
        pc = pinecone.Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
        
        # 3. Connect to existing index
        vector_store = PineconeVectorStore.from_existing_index(
            index_name=INDEX_NAME,
            embedding=embeddings
        )
        
        # 4. Initialize LLM
        llm = ChatGroq(
            temperature=0.1,
            model_name="llama-3.1-8b-instant",
            api_key=os.getenv("GROQ_API_KEY")
        )
        
        # 5. Create prompt template
        prompt_template = """
        You are an expert in Indian constitutional law. Answer using only the provided context.
        
        Context: {context}
        Question: {question}
        
        Answer in this format:
        1. Summary: [concise explanation]
        2. Legal Basis: [relevant laws/articles]
        3. Next Steps: [actionable advice]
        """
        
        prompt = PromptTemplate(
            template=prompt_template,
            input_variables=["context", "question"]
        )
        
        # 6. Create retriever with score threshold
        retriever = vector_store.as_retriever(
            search_type="similarity_score_threshold",
            search_kwargs={"k": 4, "score_threshold": 0.7}
        )
        
        # 7. Create QA chain
        return RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=retriever,
            chain_type_kwargs={"prompt": prompt},
            return_source_documents=True
        )
        
    except Exception as e:
        print(f"Initialization error: {e}")
        raise

# Initialize components
qa_chain = initialize_components()


@app.route('/',methods=['POST','GET'])
def check():
    return("Server is working!")

@app.route('/query', methods=['POST'])
def handle_query():
    try:
        data = request.json
        if not data or 'question' not in data:
            return jsonify({"error": "Missing 'question' in request"}), 400
            
        result = qa_chain.invoke({"query": data["question"]})
        
        return jsonify({
            "answer": result["result"],
            "sources": [
                {
                    "content": doc.page_content[:300] + "...",
                    "metadata": doc.metadata,
                    "score": doc.metadata.get("score", "N/A")
                }
                for doc in result["source_documents"]
            ]
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)