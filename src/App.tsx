import { Route, Routes, useParams, Link } from "react-router-dom";
import { findCategory, findPattern, findRoute, routes } from "./content";
import { Header } from "./components/Header";
import { Library } from "./components/Library";
import { Lesson } from "./components/Lesson";

export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={routes.length ? <Home /> : <Empty />} />
        <Route path="/:routeSlug" element={<LibraryPage />} />
        <Route
          path="/:routeSlug/:categorySlug/:patternSlug"
          element={<LessonPage />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function Home() {
  const primary = routes[0];
  const secondary = routes[1];

  return (
    <main
      className="home-shell"
      style={{
        maxWidth: "var(--maxw)",
        margin: "0 auto",
        padding: "34px 28px 92px",
        animation: "riseIn .35s ease both",
      }}
    >
      <section
        className="home-hero"
        style={{
          display: "grid",
          gap: 36,
          alignItems: "stretch",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 20,
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <div style={{ maxWidth: 600 }}>
              <span className="eyebrow">Interviewium</span>
              <h1
                className="home-title"
                style={{
                  fontSize: 34,
                  lineHeight: 1.08,
                  letterSpacing: "-0.01em",
                  marginTop: 10,
                }}
              >
                Learn the pattern map before the interview.
              </h1>
              <p
                style={{
                  fontSize: 16,
                  color: "var(--ink-2)",
                  lineHeight: 1.6,
                  marginTop: 12,
                }}
              >
                Stop solving every problem manually. Use one focused week to
                learn the recurring shapes, the prompt signals, and the
                TypeScript templates that make solutions easier to recall.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 10,
              marginTop: 24,
            }}
          >
            <Step
              n="1"
              title="Recognize"
              copy="Map prompt wording to a known pattern."
            />
            <Step
              n="2"
              title="Recall"
              copy="Use the compact TypeScript template."
            />
            <Step
              n="3"
              title="Adapt"
              copy="Fit edge cases without changing the shape."
            />
          </div>
        </div>

        <div
          className="home-rhythm"
          style={{
            border: "1px solid var(--line)",
            background: "var(--surface)",
            borderRadius: "var(--radius-sm)",
            padding: 20,
            boxShadow: "var(--shadow-sm)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 18,
          }}
        >
          <div>
            <span className="eyebrow">One-week rhythm</span>
            <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
              {[
                "Scan all groups",
                "Memorize signals",
                "Rebuild templates",
                "Practice challenge prompts",
              ].map((item, index) => (
                <div
                  key={item}
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <span
                    className="mono"
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: 26,
                      height: 26,
                      borderRadius: 8,
                      background: "var(--accent-soft)",
                      color: "var(--accent-ink)",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {index + 1}
                  </span>
                  <span style={{ fontSize: 14.5, color: "var(--ink)" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gap: 9 }}>
            {primary && (
              <TrackButton route={primary} label="Start with patterns" />
            )}
            {secondary && (
              <TrackButton route={secondary} label="Open challenges" />
            )}
          </div>
        </div>
      </section>

      <section style={{ marginTop: 26 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 18,
            marginBottom: 14,
          }}
        >
          <h2 style={{ fontSize: 19 }}>Tracks</h2>
          <span
            className="mono"
            style={{ fontSize: 12.5, color: "var(--ink-3)" }}
          >
            Choose a library
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 14,
          }}
        >
          {routes.map((route) => {
            const count = route.categories.reduce(
              (n, c) => n + c.patterns.length,
              0,
            );
            return (
              <Link
                key={route.slug}
                to={`/${route.slug}`}
                style={{
                  display: "block",
                  border: "1px solid var(--line)",
                  background: "var(--surface)",
                  borderRadius: "var(--radius-sm)",
                  padding: 18,
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <h3 style={{ fontSize: 18 }}>{route.label}</h3>
                  <span
                    className="mono"
                    style={{ color: "var(--ink-3)", fontSize: 12 }}
                  >
                    {count} pages
                  </span>
                </div>
                <p
                  style={{
                    color: "var(--ink-2)",
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    marginTop: 9,
                  }}
                >
                  {route.intro}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function Step({ n, title, copy }: { n: string; title: string; copy: string }) {
  return (
    <div
      style={{
        border: "1px solid var(--line-2)",
        borderRadius: 10,
        background: "var(--surface)",
        padding: 14,
      }}
    >
      <div
        className="mono"
        style={{ color: "var(--accent-ink)", fontSize: 12, fontWeight: 700 }}
      >
        {n.padStart(2, "0")}
      </div>
      <h3 style={{ fontSize: 15.5, marginTop: 6 }}>{title}</h3>
      <p
        style={{
          color: "var(--ink-2)",
          fontSize: 13.5,
          lineHeight: 1.45,
          marginTop: 4,
        }}
      >
        {copy}
      </p>
    </div>
  );
}

function TrackButton({
  route,
  label,
}: {
  route: { slug: string };
  label: string;
}) {
  return (
    <Link
      to={`/${route.slug}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        border: "1px solid var(--accent-line)",
        background: "var(--accent-soft)",
        color: "var(--accent-ink)",
        borderRadius: 10,
        padding: "11px 13px",
        fontSize: 14,
        fontWeight: 700,
      }}
    >
      {label}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

function LibraryPage() {
  const { routeSlug } = useParams();
  const route = findRoute(routeSlug!);
  if (!route) return <NotFound />;
  return <Library route={route} />;
}

function LessonPage() {
  const { routeSlug, categorySlug, patternSlug } = useParams();
  const route = findRoute(routeSlug!);
  const category = findCategory(routeSlug!, categorySlug!);
  const pattern = findPattern(routeSlug!, categorySlug!, patternSlug!);
  if (!route || !category || !pattern) return <NotFound />;
  return <Lesson route={route} category={category} pattern={pattern} />;
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        maxWidth: "var(--readw)",
        margin: "0 auto",
        padding: "90px 28px",
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
}

function NotFound() {
  return (
    <Centered>
      <h1 className="serif" style={{ fontSize: 40, letterSpacing: "-0.01em" }}>
        Nothing in this room.
      </h1>
      <p style={{ color: "var(--ink-2)", fontSize: 16, marginTop: 14 }}>
        That pattern doesn't exist yet.
      </p>
      {routes[0] && (
        <p style={{ marginTop: 24 }}>
          <Link to="/" style={{ color: "var(--accent-ink)", fontWeight: 600 }}>
            Back home
          </Link>
        </p>
      )}
    </Centered>
  );
}

function Empty() {
  return (
    <Centered>
      <h1 className="serif" style={{ fontSize: 40, letterSpacing: "-0.01em" }}>
        No content yet.
      </h1>
      <p style={{ color: "var(--ink-2)", fontSize: 16, marginTop: 14 }}>
        Add a markdown file under{" "}
        <span className="mono">content/&lt;route&gt;/&lt;category&gt;/</span> to
        begin.
      </p>
    </Centered>
  );
}
