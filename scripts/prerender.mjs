import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = path.join(root, "dist/client");
const templatePath = path.join(clientDir, "index.html");
const serverEntry = path.join(root, "dist/server/entry-server.js");

const template = await fs.readFile(templatePath, "utf-8");
const { getStaticPaths, render } = await import(pathToFileURL(serverEntry).href);

const paths = getStaticPaths();

await Promise.all(
  paths.map(async (urlPath) => {
    const { html: appHtml, statusCode } = await render(urlPath);

    if (statusCode !== 200) {
      throw new Error(`Cannot prerender ${urlPath}: render returned ${statusCode}`);
    }

    const html = template.replace("<!--app-html-->", appHtml);
    const filePath = path.join(clientDir, urlPath, "index.html");

    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, html);
  }),
);

const notFound = await render("/404");
const notFoundHtml = template.replace("<!--app-html-->", notFound.html);
await fs.writeFile(path.join(clientDir, "404.html"), notFoundHtml);

console.log(`Prerendered ${paths.length} pages and 404.html.`);
