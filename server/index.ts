import express from "express";
import path from "path";
import projectTreeRoute from "./project-tree";

const app = express();
const PORT = 8080;

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../dist")));

// API route
app.use(projectTreeRoute);

// Catch-all route
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Editor running at http://localhost:${PORT}`);
});
