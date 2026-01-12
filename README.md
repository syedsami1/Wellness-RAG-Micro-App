# 🧘 Wellness RAG Micro-App

### **Ask Me Anything About Yoga**

---

## 📌 Project Overview

This project is a **full-stack AI micro-application** that answers yoga and wellness-related questions using a **Retrieval-Augmented Generation (RAG)** architecture.

The system is designed with a **safety-first approach**, ensuring that potentially risky yoga queries (such as pregnancy or medical conditions) are handled responsibly with clear warnings and non-medical guidance.

The primary focus areas are:

* RAG system design (chunking, retrieval, prompt construction)
* Backend architecture and safety logic
* Clean API structure
* Clear UI presentation of answers, sources, and safety warnings

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
        │     ├── Chunking Logic
        │     ├── Retrieval Interface
        │     └── Prompt Construction
        |
        └── Response Formatter (Answer + Sources + Safety Flags)
```

---

## 🧩 Core Features

### 1. Frontend (React – Web)

A minimal and clean UI focused on clarity:

* Text input: **“Ask anything about yoga”**
* Ask button
* AI answer display block
* **Sources used** section (retrieved knowledge IDs)
* Safety warning displayed prominently for sensitive queries
* Loading indicator during API calls

---

### 2. Knowledge Base

* Yoga-related articles stored locally as JSON
* Topics covered:

  * Yoga asanas
  * Benefits of yoga
  * Contraindications
  * Breathing practices (pranayama)
  * Beginner vs advanced poses
* Content is self-written or summarized from public sources
* Designed to scale to 20–50 articles

---

## 🧠 RAG (Retrieval-Augmented Generation) Design

This implementation establishes a **clean, modular RAG architecture** that clearly separates chunking, retrieval, and prompt construction.

The system demonstrates the **end-to-end RAG data flow** using a lightweight retrieval layer, while being intentionally structured to support seamless integration of:

* FAISS-based local vector search
* Sentence-transformer embeddings (e.g., `all-MiniLM-L6-v2`)
* Local LLMs (Ollama / llama.cpp compatible)

### RAG Flow

1. **Chunking**

   * Target chunk size: 300–500 tokens
   * Overlap: 50–100 tokens

2. **Embedding**

   * Local sentence-transformer model
   * No paid or external APIs

3. **Vector Store**

   * FAISS (local filesystem)

4. **Retrieval**

   * Top-K relevant chunks (K = 3–5)

5. **Prompt Construction**

   * System prompt: *“You are a safety-first yoga assistant”*
   * Retrieved context injected into the prompt
   * Responses constrained to provided context

---

## 🚨 Safety Layer

Yoga can be risky for certain individuals.
A backend **safety filtering module** is implemented to handle such cases responsibly.

### Safety Detection

Keyword-based heuristic covering:

* Pregnancy-related terms: `pregnant`, `pregnancy`, `trimester`
* Medical conditions: `hernia`, `glaucoma`, `high blood pressure`, `bp`, `surgery`

### Behavior When Unsafe

When a query is flagged as unsafe:

* `isUnsafe = true` is returned by the backend
* The UI displays a **clear red warning message**
* The response:

  * Avoids medical diagnosis
  * Suggests safer alternatives where applicable
  * Advises consultation with a qualified professional

**Example Safety Message:**

> “Your question touches on an area that may be risky without personalized guidance.
> Consider gentle yoga practices and consult a certified professional.”

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
  "sources": ["Article 1", "Article 6"],
  "isUnsafe": true,
  "warning": "Your question involves a condition that may require professional guidance.",
  "queryId": "demo-query-id"
}
```

---

### POST `/feedback`

**Request**

```json
{
  "queryId": "demo-query-id",
  "rating": "up"
}
```

---

## 🗃️ MongoDB Data Model

The backend is structured to support MongoDB-based persistence of:

* User queries
* Retrieved knowledge chunks
* Safety flags
* Generated answers
* User feedback

### Query Log Schema

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

### Feedback Schema

```json
{
  "queryId": "ObjectId",
  "rating": "up | down",
  "timestamp": "ISODate"
}
```

---

## ⚙️ Setup Instructions (Local)

### Prerequisites

* Node.js (v16+)
* npm
* Git

### How to Run

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

The application runs at:

```
http://localhost:3000
```

---

## 🧠 Design Decisions

* Explicit RAG structure for transparency and debuggability
* Safety-first response handling for sensitive yoga queries
* Lightweight retrieval layer for clarity and extensibility
* Minimal UI to prioritize correctness and user understanding

---

## 📹 Demo & Submission Notes

The demo showcases:

* User query to answer flow
* Safety detection and warning display
* Source-grounded responses
* Clean API interactions between frontend and backend

---

## 🏁 Final Notes

This project emphasizes **responsible AI design**, **clear RAG architecture**, and **user safety**.
The system is structured to be easily extensible with full vector-based retrieval and persistent analytics while maintaining clean separation of concerns.

