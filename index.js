const express = require("express");
const server = express();
const { router: users } = require("./routes/users.js");
const { router: pecas } = require("./routes/pecas.js");
server.use(express.json());

server.use("/", users);
server.use("/", pecas);

const port = 1010;

server.listen(port, () => {
  console.log("Server funcionando");
});
