import componentManifest from "../public/component-manifest.json";

// This files simulates a real server that stitches everything together.
// See ../vercel.json for more infos!

export default function handleDocument(req, res) {
  const components =
    req.query.components
      ?.split(",")
      .filter((c) => ["Red", "Green", "Blue"].includes(c)) || [];

  res.end(`<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <script defer src="${componentManifest["main.js"]}"></script>
      ${components
        .map(
          (component) =>
            `<link rel="preload" href="${
              componentManifest[`component-${component}-js.js`]
            }" as="script">`
        )
        .join("\n")}
    </head>
    <body>
      <h1>Demo: Dynamic Component Loading</h1>
      <p>To experiment with this demo just add one of the following params to the url: "Red", "Green", "Blue"</p>
      <ul>
        <li><a href="/?components=Green">Example: Green</a></li>  
        <li><a href="/?components=Blue">Example: Blue</a></li>
        <li><a href="/?components=Red">Example: Red (Large Bundle Simulation)</a></li>    
        <li><a href="/?components=Red,Green">Example: Red, Green (Mix)</a></li>  
      </ul>
      <p>To see a bundle analysis of the page open this <a href="/report.html" target="_blank">link</a><p>
      <hr />
      ${components
        .map(
          (component) => `<div data-component="${component}">${component}</div>`
        )
        .join("\n")}
    </body>
  </html>`);
}
