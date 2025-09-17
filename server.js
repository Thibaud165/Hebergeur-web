const express = require("express");
const path = require("path");
const fs = require("fs");

const domain = "http://thibaud.site/"
const app = express();
const PORT = 80;

// main site

const mainSite = path.join(__dirname, "monSite");
app.use("/", express.static(mainSite));
console.log(`📁 Main site ready on /`);

// other site

const sitesDir = path.join(__dirname, "../Sites");

fs.readdirSync(sitesDir).forEach(site => {
  const sitePath = path.join(sitesDir, site);

  if (fs.lstatSync(sitePath).isDirectory()) {
    app.use("/" + site, express.static(sitePath));
    console.log(`📂 Site "${site}" ready on ${domain}${site}`);
  }
});

// launch confirmation

app.listen(PORT, () => {
  let now = new Date();
  let timeStr = `${now.getHours().toString().padStart(2,'0')}:` +
                `${now.getMinutes().toString().padStart(2,'0')}:` +
                `${now.getSeconds().toString().padStart(2,'0')}`;
  console.log("")
  console.log("🚀 Serveur launched at " + timeStr + " on :")
  console.log("- http://localhost:" + PORT)
  console.log("- http://thibaud.site")
});
