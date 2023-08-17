import express from "express";
const app = express();
const port = process.env.PORT || 8000;

import 'dotenv/config';
import tool from "./tool.js";

const statusCodeOK = 200;
const statusCodeInternalError = 500;

// parse application/json
app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers");
    next();
});

app.get('/', (req, res) => {
  res.send('API is running');
})

app.get("/tools", (req, res) => {
  tool.get()
  .then(response => {
    console.log(`http status code: ${statusCodeOK}`);
    res.status(200).send(response);
  })
  .catch(error => {
    console.log(`http status code: ${statusCodeInternalError}`);
    res.status(500).send(error);
  })
});

app.post("/tools", (req, res) => {
    tool.create(req.body)
    .then(response => {
      console.log(`http status code: ${statusCodeOK}`);
      res.status(200).send(response);
    })
    .catch(error => {
      console.log(`http status code: ${statusCodeInternalError}`);
      res.status(500).send(error);
    })
});

app.delete("/tools/:id", (req, res) => {
  tool.delete(req.params.id)
  .then(response => {
    console.log(`http status code: ${statusCodeOK}`);
    res.status(200).send(response);
  })
  .catch(error => {
    console.log(`http status code: ${statusCodeInternalError}`);
    res.status(500).send(error);
  })
});

app.listen(port, () => {
    console.log("adventure-inventory-api is running successfully")
});