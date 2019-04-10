const pkg = require("./package.json");
const webpack = require("webpack");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/app/" : "/",
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        "process.env.VERSION": `'${pkg.version}'`
      })
    ]
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true
      }
    }
  }
};
