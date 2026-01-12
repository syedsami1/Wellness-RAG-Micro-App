# 🧘 Wellness RAG Micro-App

### “Ask Me Anything About Yoga”

## 📌 Project Overview

This project is a **full-stack AI micro-application** that answers yoga and wellness-related questions using a **Retrieval-Augmented Generation (RAG)** pipeline.

The system is designed with a **safety-first mindset**, ensuring that potentially risky yoga queries (e.g., pregnancy, medical conditions) are handled responsibly with appropriate warnings and non-medical guidance.

The main focus areas are:

* RAG design (chunking, embeddings, retrieval)
* Backend architecture and safety logic
* Data logging and analysis using MongoDB
* Clear UI display of sources and safety warnings

---

## 🧠 High-Level Architecture

```
[ Frontend (React) ]
        |
        v
[ Backend API (Node.js + Express) ]
        |
        ├── Safety Check Module
        ├── RAG Pipeline
        │     ├── Chunking
        │     ├── Embeddings
        │     ├── Vector Search (FAISS)
        │     └── Prompt Construction
        |
        ├── Local LLM (Ollama / llama.cpp)
        |
        └── MongoDB (Query & Feedback Logs)
```

---

## 🧩 Core Features

### 1. Frontend (React – Web)

Minimal and clean UI focused on clarity:

* Text input: **“Ask anything about yoga”**
* Ask button
* Answer display block
* **Sources used** section (retrieved knowledge chunks)
* Safety warning (red box) when applicable
* Loading indicator
* Optional feedback buttons 👍 / 👎

---

### 2. Knowledge Base

* 20–50 yoga-related articles
* Topics covered:

  * Yoga asanas
  * Benefits of yoga
  * Contraindications
  * Pranayama (breathing techniques)
  * Beginner vs advanced practices
* Content is **self-written or summarized from public sources**
* Stored locally as JSON / Markdown files

---

### 3. RAG (Retrieval-Augmented Generation) Pipeline

**Step-by-step flow:**

1. **Chunking**

   * Chunk size: 300–500 tokens
   * Overlap: 50–100 tokens

2. **Embedding**

   * Local sentence-transformer model
   * Example: `all-MiniLM-L6-v2`
   * No paid APIs used

3. **Vector Store**

   * FAISS (local filesystem)
   * Persistent index

4. **Retrieval**

   * Top-K relevant chunks (K = 3–5)

5. **Prompt Construction**

   * System prompt: *“You are a safety-first yoga assistant”*
   * Inject retrieved context
   * Prevent hallucinations by answering only from context

6. **Generation**

   * Local LLM via Ollama / llama.cpp
   * Example models: `mistral`, `llama3`

---

### 4. Safety Layer 

Yoga can be risky for certain individuals.
A backend safety filter is implemented.

#### Safety Detection

Simple keyword-based heuristic:

* Pregnancy: `pregnant`, `trimester`
* Medical conditions: `hernia`, `glaucoma`, `high blood pressure`, `recent surgery`

#### Behavior When Unsafe

* `isUnsafe = true` logged in MongoDB
* UI shows **red warning box**
* Response:

  * Avoids medical diagnosis
  * Suggests safer alternatives
  * Advises professional supervision

**Example Safety Message:**

> “Your question touches on an area that may be risky without personalized guidance. Instead of inversions, consider gentle supine poses and breathing practices. Please consult a doctor or certified yoga therapist.”

---

### 5. MongoDB Logging

Every query is logged for analysis.

#### Query Log Schema

```json
{
  "query": "User question",
  "retrievedChunks": ["Chunk 1", "Chunk 2"],
  "answer": "Generated response",
  "isUnsafe": true,
  "safetyReason": "pregnancy",
  "timestamp": "ISODate"
}
```

#### Feedback Schema

```json
{
  "queryId": "ObjectId",
  "rating": "up | down",
  "timestamp": "ISODate"
}
```

---

## 🔌 API Contracts

### POST `/ask`

**Request**

```json
{
  "query": "Is headstand safe during pregnancy?"
}
```

**Response**

```json
{
  "answer": "...",
  "sources": ["Article 7", "Article 12"],
  "isUnsafe": true,
  "warning": "Your question involves pregnancy-related considerations.",
  "queryId": "abc123"
}
```

---

### POST `/feedback`

```json
{
  "queryId": "abc123",
  "rating": "up"
}
```

---

## ⚙️ Setup Instructions (Local)

### Prerequisites

* Node.js
* MongoDB (local)
* Ollama installed
* Git

### Environment Variables

Create `.env` from `.env.example`:

```
MONGO_URI=mongodb://localhost:27017/yoga_rag
```

---

## ▶️ How to Run 

```bash
# Backend
cd backend
npm install
node server.js

# Frontend
cd frontend
npm install
npm start
```

---

## 🧠 Design Decisions

* **FAISS** chosen for fast local vector search
* **Sentence Transformers** for lightweight embeddings
* **Ollama** for free, local LLM inference
* **Keyword-based safety filter** for clarity and reliability
* **Explicit RAG pipeline** to ensure transparency and debuggability

---

## 📹 Demo & Submission Notes

* Demo video (2–5 minutes) will showcase:

  * Query flow
  * Safety detection
  * Source grounding
  * MongoDB logs

