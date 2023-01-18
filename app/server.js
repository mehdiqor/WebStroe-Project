const { initialSocket } = require("./utils/initSocket");
const ExprssEjsLayouts = require("express-ejs-layouts");
const { Allroutes } = require("./router/router");
const { socketHandler } = require("./socket.io");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const httpError = require("http-errors");
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const http = require("http");
const cors = require("cors");
require("dotenv").config();

module.exports = class Application {
  #app = express();
  #PORT;
  #DB_URI;
  constructor(PORT, DB_URI) {
    this.#PORT = PORT;
    this.#DB_URI = DB_URI;
    this.configApplication();
    this.initTemplateEngine();
    this.initRedis();
    this.connectToMongoDB();
    this.createServer();
    this.createRoutes();
    this.errorHandling();
  }
  configApplication() {
    this.#app.use(cors());
    this.#app.use(morgan("dev"));
    this.#app.use(express.json()); //json for sending data from client
    this.#app.use(express.urlencoded({ extended: true })); //urlencoded for sending data with form
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
    this.#app.use(
      "/swagger",
      swaggerUi.serve,
      swaggerUi.setup(
        swaggerJsDoc({
          swaggerDefinition: {
            openapi: "3.0.0",
            info: {
              title: "my-store",
              version: "2.0.0",
              description: "WebStore Project",
              contact: {
                name: "Mehdi Ghorbani",
                url: "https://github.com/mehdiqor",
                email: "mehdighorbanin@gmail.com",
              },
            },
            servers: [
              {
                url: "http://localhost:3000",
              },
            ],
            components : {
              securitySchemes : {
                BearerAuth : {
                  type : "http",
                  scheme : "bearer",
                  bearerFormat : "JWT"
                }
              }
            },
            security : [{BearerAuth : []}]
          },
          apis: ["./app/router/swagger/*.js"],
        }),
        {explorer : true}
      )
    );
  }
  createServer() {
    const server = http.createServer(this.#app)
    const io = initialSocket(server)
    socketHandler(io)
    server.listen(this.#PORT, (error) => {
      if (error) console.log(error);
      console.log("run > http://localhost:" + this.#PORT);
    });
  }
  initRedis(){
      require('./utils/initRedis')
  }
  initTemplateEngine(){
    this.#app.use(ExprssEjsLayouts)
    this.#app.set("view engine", "ejs");
    this.#app.set("views", "resource/views");
    this.#app.set("layout extractStyles", true);
    this.#app.set("layout extractScripts", true);
    this.#app.set("layout", "./layouts/master");
    this.#app.use((req, res, next) => {
      this.#app.locals = clientHelper(req, res);
      next()
    })
  }
  connectToMongoDB() {
    mongoose.connect(this.#DB_URI, (error) => {
      if (!error) return console.log("connected to MongoDB...");
      return console.log(error.message);
    });
    mongoose.connection.on("connected", () => {
      console.log("mongoose connected to DB");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose is disconnected from DB");
    });
    process.on("SIGINT", () => {
      mongoose.connection.close();
      console.log("connection was closed successfully");
      process.exit();
      //disconnect app from DB when app is crashed!
    });
  }
  createRoutes() {
    this.#app.use(Allroutes);
  }
  errorHandling() {
    this.#app.use((req, res, next) => {
      next(httpError.NotFound());
    });
    this.#app.use((error, req, res, next) => {
      const serverError = httpError.InternalServerError();
      const statusCode = error.status || serverError.status;
      const message = error.message || serverError.message;
      return res.status(statusCode).json({
        errors: {
          statusCode,
          message,
        },
      });
    });
  }
};
