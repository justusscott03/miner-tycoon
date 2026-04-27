import express from "express";
import path from "path";
import projectTreeRoute from "./project-tree";

const app = express();
const PORT = 8080;

// app.use((req, res, next) => {
//   console.log(`[${req.method}] ${req.url}`);
//   next();
// });

// Serve static files
app.use("/engine/icons", (req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
}, express.static(path.join(process.cwd(), "src/engine/icons")));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../dist")));

// API route
app.use(projectTreeRoute);

// Catch-all route
app.get(/.*/, (req, res) => {
  //console.log(">>> CATCH-ALL ROUTE HIT:", req.path);
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, "127.0.0.1", () => {
  //console.log(`Editor running at http://127.0.0.1:${PORT}`);
});

