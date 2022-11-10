//UPRM RUMblebots Combact Robots Team 
const PORT = process.env.PORT || 3000
const webpack = require("webpack")
const middleware = require("webpack-dev-middleware")
const config = require("./webpack.config.js")
const compiler = webpack(config)
const express = require("express");
const app = express();

const staticMiddleware = express.static("dist")

app.use(staticMiddleware)

app.use(
  middleware(compiler, {
    // webpack-dev-middleware options
  })
);

app.listen(PORT)