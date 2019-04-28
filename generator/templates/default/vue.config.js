const pkg = require("./package.json");
const webpack = require("webpack");

module.exports = {
  publicPath: "app",
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
