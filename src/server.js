const path = require("path");
const express = require("express");
const { createSSRApp } = require("vue");
const { renderToString } = require("");
const manifest = require("../dist/manifest.json");

const server = express();

const appPath = path.join(__dirname, "../dist", manifest["app.js"]);
const App = require(appPath).default;

server.get("*", (req, res) => {
  const app = createSSRApp(App);
  const appContent = renderToString(app);

  const html = `
      <html>
          <head>
              <title></title>
          </head>
          <body>
              Hello World
          </body>
      </html>
      `;

  res.end(html);
});

server.listen(8081);
