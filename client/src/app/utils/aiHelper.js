export function suggestPriority(description) {
    if (description.includes("urgent") || description.includes("ASAP")) return "High";
    if (description.includes("later") || description.includes("optional")) return "Low";
    return "Medium";
  }
  
  export function suggestDeadline(description) {
    const now = new Date();
    if (description.includes("tomorrow")) now.setDate(now.getDate() + 1);
    else if (description.includes("next week")) now.setDate(now.getDate() + 7);
    else now.setDate(now.getDate() + 3);
    return now.toISOString().split("T")[0]; // YYYY-MM-DD
  }
  