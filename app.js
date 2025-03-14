import express from "express";
import __dirname from "./routes/rootpath.js";
import path from "path";
import * as fileHandler from "./routes/fajkezelo.js";

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/movies", (req, res) => {
  const filmek = fileHandler.getData();
  res.json(filmek);
});

app.get("/movies/:id", (req, res) => {
  const filmek = fileHandler.getData();
  const id = req.params.id;
  if (id < 0 || id > filmek.length) {
    return res.json({ message: "User cannot be found" });
  }
  res.json(filmek[id]);
});

app.post("/movies", (req, res) => {
  const { cim, rendez, megjelen, oszkar } = req.body;
  if (!cim || !rendez || megjelen || oszkar) {
    return res.json({ message: "Missing data" });
  }
  const NewFilm = { cim, rendez, megjelen, oszkar };
  fileHandler.saveData(NewFilm);
  res.json({ cim, rendez, megjelen, oszkar });
});

app.put("/movies/:id", (req, res) => {
  const filmek = fileHandler.getData();
  const id = req.params.id;
  if (id < 0 || id > filmek.length) {
    return res.json({ message: "User cannot be found" });
  }
  const { cim, rendez, megjelen, oszkar } = req.body;
  if (!cim || !rendez || megjelen || oszkar) {
    return res.json({ message: "Missing data" });
  }
  filmek[id] = { cim, rendez, megjelen, oszkar };
  fileHandler.saveData(filmek);
});

app.delete("/movies/:id", (req, res) => {
  const filmek = fileHandler.getData();
  const id = req.params.id;
  if (id < 0 || id > filmek.length) {
    return res.json({ message: "User cannot be found" });
  }
  filmek = filmek.slice(id, 1);
  fileHandler.saveData(filmek);
  res.json(filmek);
});

app.listen(3000, () => {
  console.log("Runs on port 3000");
});
