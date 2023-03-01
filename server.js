//UPRM RUMblebots Combact Robots Team 
const webpack = require("webpack")
const middleware = require("webpack-dev-middleware")
const webpackconfig = require("./webpack.config")
const compiler = webpack(webpackconfig)
const express = require("express");
const app = express();

const staticMiddleware = express.static("dist")

app.use(staticMiddleware)

app.use(
  middleware(compiler, {
    // webpack-dev-middleware options
  })
)

app.listen(process.env.PORT || 3000, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
})