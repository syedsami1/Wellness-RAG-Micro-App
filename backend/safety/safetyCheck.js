const unsafeKeywords = [
  "pregnant",
  "pregnancy",
  "trimester",
  "hernia",
  "glaucoma",
  "high blood pressure",
  "bp",
  "surgery"
];

export function safetyCheck(query) {
  const found = unsafeKeywords.find(word =>
    query.toLowerCase().includes(word)
  );

  if (found) {
    return {
      isUnsafe: true,
      reason: "Your question involves a condition that may require professional guidance."
    };
  }

  return { isUnsafe: false, reason: null };
}
