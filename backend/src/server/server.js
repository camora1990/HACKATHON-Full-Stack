const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("colors");

class Server {
  constructor() {
    this.app = express();
    this.paths = {
      user: "/api/v1.0/user",
      product: "/api/v1.0/product",
      auth: "/api/v1.0/login",
    };
    this.port = process.env.PORT;

    this.middlewares();
    this.dataBaseConnection();
    this.routes();
  }

  middlewares() {
    this.app.use(cors({ origin: "*" }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(morgan("dev"));
  }

  routes() {}

  dataBaseConnection() {}

  startServer() {
    this.app.listen(this.port, () => {
      console.log(`Server init on port ${this.port}`.bgGreen.black);
    });
  }
}

module.exports = Server;
