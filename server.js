import express from "express";
import { getAgePredictionByName } from "./agify.service.js";
import { createClient } from "redis";
import { Constants } from "./constants.js";

const PORT = 3000;
const app = express();
app.use(express.json());

const client = createClient();
client
  .connect()
  .then((x) => {
    console.log("connected to redis...", x);
  })
  .catch((e) => {
    console.log("connection failed", e);
  });

app.post("/name", async (req, res) => {
  const name = req.body.name || "";
  const data = await getAgePredictionByName(name, client);
  res.json(data);
});

app.post("/names", (req, res) => {
  const names = req.body.names || [];
  console.log("names", names);
  res.send(`You sent ${names.length} names`);
});

app.listen(PORT, () => {
  console.log(`app started listening on http://localhost:${PORT} ...`);
});
