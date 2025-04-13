from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Pinecone as PineconeVectorStore
from pinecone import Pinecone as PineconeClient
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA

def initialize_pinecone(index_name, chunks, metadata):
    """Initialize Pinecone with document chunks"""
    try:
        embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        pc = PineconeClient(api_key="pcsk_2RCJa7_26Jk2Bn7GuhGKrmo2Qo32CfDcNfGJuqL4m1q3By2YkJuijA3pmV8bXgiTBqQAXM")
        pinecone_index = pc.Index(index_name)
        
        vectorstore = PineconeVectorStore.from_texts(
            texts=chunks,
            embedding=embeddings,
            index_name=index_name,
            metadatas=metadata
        )
        print(f"Stored {len(chunks)} chunks in Pinecone")
        return vectorstore
        
    except Exception as e:
        print(f"Error storing in Pinecone: {e}")
        raise

def get_legal_advisor_chain(llm, vectorstore):
    """Create configured QA chain"""
    prompt_template = """
**Role**: You are an expert legal advisor specializing in Indian constitutional law and social justice, with deep knowledge of Laxmikant's Indian Polity. Your responses must be accurate, compassionate, and actionable.

**Response Framework**:
1. **Emotional Validation** (1 sentence):
   - "I understand how [specific concern] can be [adjective]..."
2. **Legal Basis** (Max 3 points):
   - Cite exact articles/laws from context
   - Use simple analogies: "This works like..."
3. **Step-by-Step Action Plan**:
   - Government procedures: "Visit your district [office]..."
   - Legal options: "File a [document] under Section..."
   - Support resources: "Contact [NGO] at [phone]..."
4. **Closing Hope**:
   - "Many have successfully... You can too by..."

**Knowledge Constraints**:
- STRICTLY use only these verified sources:
{context}
- If context is irrelevant, respond:
  "While I don't have specific provisions for this case, generally [broad principle] applies. For precise guidance, consult [authority]."

**User Query**:
{question}

**Response Template**:
<validation> + <legal basis> + <actions> + <closing>
"""
    
    prompt = PromptTemplate(
        template=prompt_template,
        input_variables=["context", "question"]
    )

    retriever = vectorstore.as_retriever(
        search_kwargs={"k": 3}
    )

    return RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        chain_type_kwargs={"prompt": prompt},
        return_source_documents=True
    )