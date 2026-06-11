import MarkdownIt from "markdown-it";

const escapeHtml = new MarkdownIt().utils.escapeHtml;

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  highlight(code: string, lang: string): string {
    const language = lang === "ts" || lang === "typescript" ? "typescript" : "";
    return language ? highlightTypeScript(code) : escapeHtml(code);
  },
});

function highlightTypeScript(code: string): string {
  const token = /\/\/.*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`/g;
  let out = "";
  let last = 0;

  for (const match of code.matchAll(token)) {
    out += highlightPlain(code.slice(last, match.index));
    const raw = match[0];
    const cls = raw.startsWith("//") ? "tok-comment" : "tok-string";
    out += `<span class="${cls}">${escapeHtml(raw)}</span>`;
    last = match.index + raw.length;
  }

  return out + highlightPlain(code.slice(last));
}

function highlightPlain(code: string): string {
  return escapeHtml(code)
    .replace(/\b(interface|type|class|function|const|let|return|if|else|for|while|new|private|public|readonly|extends|implements|in|of)\b/g, '<span class="tok-keyword">$1</span>')
    .replace(/\b(number|string|boolean|void|null|undefined|Map|Set|Array|Record)\b/g, '<span class="tok-type">$1</span>')
    .replace(/\b(true|false)\b/g, '<span class="tok-literal">$1</span>');
}

/** Renders a markdown body into the calm `.prose` editorial layout. */
export function Markdown({ source }: { source: string }) {
  return <div className="prose" dangerouslySetInnerHTML={{ __html: md.render(source) }} />;
}
