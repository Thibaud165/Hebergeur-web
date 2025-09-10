const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

const sitesDir = path.join(__dirname, "sites");

// Lire tous les dossiers dans /sites
fs.readdirSync(sitesDir).forEach(site => {
  const sitePath = path.join(sitesDir, site);

  if (fs.lstatSync(sitePath).isDirectory()) {
    app.use("/" + site, express.static(sitePath));
    console.log(`📂 Site "${site}" disponible sur /${site}`);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
