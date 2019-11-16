// server.js
// where your node app starts

// init project
const express = require("express");
const cors = require("cors");
const app = express();
const proxy = require("./proxy.js");

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set('x-powered-by', false);

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/proxy", async (request, response) => {
  const proxyResponse = await proxy.proxy(request);
  const { status, headers, data } = proxyResponse;
  response.status(status).set(headers).json(data);
});

app.post("/proxy", async (request, response) => {
  const proxyResponse = await proxy.proxy(request);
  const { status, headers, data } = proxyResponse;
  response.status(status).set(headers).json(data);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
