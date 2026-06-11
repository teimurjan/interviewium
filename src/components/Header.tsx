import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../content";
import logo from "../../logo.png";

export function Header() {
  const { pathname } = useLocation();
  const activeRoute = pathname.split("/").filter(Boolean)[0];
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className="site-header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 26px",
        borderBottom: "1px solid var(--line)",
        background: "color-mix(in srgb, var(--paper) 85%, transparent)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <span
          style={{
            display: "grid",
            placeItems: "center",
            width: 48,
            height: 48,
            borderRadius: 9,
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          <img src={logo} alt="Logo" style={{ width: 48, height: 48 }} />
        </span>
        <span
          className="serif"
          style={{ fontSize: 20, color: "var(--ink)", whiteSpace: "nowrap", letterSpacing: "-0.01em" }}
        >
          Interviewium
        </span>
      </Link>
      <button
        type="button"
        className="site-menu-button"
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      <div
        className={menuOpen ? "site-links is-open" : "site-links"}
        style={{ display: "flex", alignItems: "center", gap: 2, overflowX: "auto" }}
      >
        {routes.map((route) => (
          <NavItem key={route.slug} to={`/${route.slug}`} active={activeRoute === route.slug}>
            {route.label}
          </NavItem>
        ))}
      </div>
    </nav>
  );
}

function NavItem({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      style={{
        position: "relative",
        fontFamily: "var(--sans)",
        fontSize: 14.5,
        fontWeight: 600,
        padding: "8px 14px",
        borderRadius: 8,
        color: active ? "var(--ink)" : "var(--ink-3)",
        transition: "color .15s ease",
      }}
    >
      {children}
      {active && (
        <span
          style={{
            position: "absolute",
            left: 14,
            right: 14,
            bottom: 0,
            height: 2,
            background: "var(--accent)",
            borderRadius: 2,
          }}
        />
      )}
    </Link>
  );
}
