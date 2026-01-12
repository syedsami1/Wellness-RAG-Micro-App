export function buildPrompt(query, contexts) {
  return `
You are a safety-first yoga assistant.

Context:
${contexts.join("\n")}

Question:
${query}

Answer clearly using only the context above.
`;
}
