import { useState } from "react";
import { copyText } from "../clipboard";
import type { Category, Pattern, Route } from "../content";

type Provider = {
  id: string;
  label: string;
  primary?: boolean;
  url: (encodedPrompt: string) => string;
};

// Claude and ChatGPT auto-submit a prompt passed via `?q=`.
const PROVIDERS: Provider[] = [
  { id: "claude", label: "Practice in Claude", primary: true, url: (q) => `https://claude.ai/new?q=${q}` },
  { id: "chatgpt", label: "Practice in ChatGPT", url: (q) => `https://chatgpt.com/?q=${q}` },
];

function buildTrainerPrompt(route: Route, category: Category, pattern: Pattern): string {
  const signals = pattern.triggers.length ? pattern.triggers.join(", ") : "—";
  return [
    `You are my coding-interview trainer for the "${pattern.title}" pattern (category: ${category.label}, track: ${route.label}).`,
    `Signal words for this pattern: ${signals}.`,
    "",
    "Run an interactive drill. I will only ever reply with one of these:",
    `- "Next" — give me a fresh practice problem for this pattern. State the problem, constraints, and target time/space complexity. Do not reveal the solution. Escalate difficulty as I succeed.`,
    `- "Hint" — give one small nudge for the current problem. No full solution.`,
    `- "Lost" — show the full worked solution in TypeScript with a short explanation, then continue.`,
    `- (my code) — anything else is my attempt: review it for correctness, edge cases, and complexity; tell me if it passes and how to improve it.`,
    "",
    "Keep replies tight and use TypeScript for code. Begin now with the first problem.",
  ].join("\n");
}

export function PracticeCard({ route, category, pattern }: { route: Route; category: Category; pattern: Pattern }) {
  const [copied, setCopied] = useState(false);

  const copyPrompt = async () => {
    try {
      await copyText(buildTrainerPrompt(route, category, pattern));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard is a best-effort convenience.
    }
  };

  const launch = (provider: Provider) => {
    const prompt = buildTrainerPrompt(route, category, pattern);
    window.open(provider.url(encodeURIComponent(prompt)), "_blank", "noopener,noreferrer");
  };

  return (
    <section
      style={{
        padding: "24px 26px",
        borderRadius: "var(--radius)",
        border: "1px solid var(--line)",
        background: "var(--surface-2)",
      }}
    >
      <div className="eyebrow" style={{ marginBottom: 7 }}>
        Practice
      </div>
      <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.6, marginBottom: 16 }}>
        Drill this pattern with an AI trainer — reply only with <strong>Hint</strong>, <strong>Next</strong>,{" "}
        <strong>Lost</strong>, or paste your code.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
        {PROVIDERS.map((provider) => (
          <button
            key={provider.id}
            onClick={() => launch(provider)}
            style={{
              height: 34,
              padding: "0 14px",
              borderRadius: 999,
              border: `1px solid var(--accent-line)`,
              background: "var(--accent-soft)",
              color: "var(--accent-ink)",
              boxShadow: "var(--shadow-sm)",
              fontSize: 13,
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            {provider.label}
          </button>
        ))}
        <button
          onClick={copyPrompt}
          style={{
            height: 34,
            padding: "0 14px",
            borderRadius: 999,
            border: "1px solid var(--line)",
            background: "var(--surface)",
            color: copied ? "var(--correct)" : "var(--ink-2)",
            boxShadow: "var(--shadow-sm)",
            fontSize: 13,
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          {copied ? "Prompt copied" : "Copy practice prompt"}
        </button>
      </div>
    </section>
  );
}
