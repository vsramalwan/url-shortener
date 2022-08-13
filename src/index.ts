var express = require("express");
var app = express();

app.get("/", (req, res) => {
  res.send("working...");
});

app.post("/url", (req, res) => {
  console.log(req.long_url);
  console.log(res.short_url);
  res.json();
});

var server = app.listen(8081, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Listening at http://%s:%s", host, port);
});
