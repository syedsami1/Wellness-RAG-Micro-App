import React, { useState } from "react";
import { askQuestion } from "./api";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    setLoading(true);
    const res = await askQuestion(query);
    setResponse(res);
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>Ask Me Anything About Yoga</h2>

      <textarea
        rows="3"
        style={{ width: "100%" }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask anything about yoga..."
      />

      <br /><br />
      <button onClick={ask}>Ask</button>

      {loading && <p>Loading...</p>}

      {response && (
        <div style={{ marginTop: 20 }}>
          {response.isUnsafe && (
            <div style={{ color: "red", marginBottom: 10 }}>
              ⚠️ {response.warning}
            </div>
          )}

          <p><b>Answer:</b> {response.answer}</p>
          <p><b>Sources:</b> {response.sources.join(", ")}</p>
        </div>
      )}
    </div>
  );
}

export default App;
