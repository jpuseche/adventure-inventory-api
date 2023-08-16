import express from "express";
const app = express();
const port = 8000;

import tool from "./tool.js";

let CLIENT_URL = "https://adventure-inventory-api-production.up.railway.app";
if (app.settings.env === `development`) {
  CLIENT_URL = "http://localhost:3000";
}
// parse application/json
app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", CLIENT_URL);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers");
    next();
});

app.get("/tools", (req, res) => {
  tool.getTools()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.post("/tools", (req, res) => {
    tool.createTool(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
});

app.delete("/tools/:id", (req, res) => {
  tool.deleteTool(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.listen(port, () => {
    console.log("adventure-inventory-api is running successfully")
    console.log(`CLIENT_URL: ${CLIENT_URL}`);
});