import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = "/";

const resolve = (p) => path.resolve(__dirname, p);

async function createServer() {
  const app = express();

  /** @type {import('vite').ViteDevServer | undefined} */
  let vite;

  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
      base,
    });
    app.use(vite.middlewares);
  } else {
    const compression = (await import("compression")).default;
    const sirv = (await import("sirv")).default;
    app.use(compression());
    app.use(base, sirv(resolve("dist/client"), { extensions: [] }));
  }

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    // Only SSR-render HTML navigations. Requests with a file extension
    // (.json, .ico, .map, …) must not hit transformIndexHtml, which routes
    // them through vite:json and throws "Failed to parse JSON file." — this
    // is what DevTools' /.well-known/...json polling spams in dev.
    if (path.extname(url.split("?")[0])) return next();

    try {

      let template;
      let render;

      if (!isProd) {
        template = await fs.readFile(resolve("index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
      } else {
        template = await fs.readFile(resolve("dist/client/index.html"), "utf-8");
        render = (await import("./dist/server/entry-server.js")).render;
      }

      const { html: appHtml, statusCode, redirect } = await render(url);

      if (redirect) {
        res.redirect(statusCode || 302, redirect);
        return;
      }

      const html = template.replace("<!--app-html-->", appHtml);
      res.status(statusCode || 200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite?.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.stack);
    }
  });

  return app;
}

createServer().then((app) =>
  app.listen(port, () => {
    console.log(`Interviewium running at http://localhost:${port}`);
  })
);
