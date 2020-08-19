"use strict";
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  indexPath: "index.html", //用来指定index.html最终生成的路径
  filenameHashing: false, //对dist中js的文件引用都变成了hash之后的文件名
  // lintOnSave: process.env.NODE_ENV === "development",
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  devServer: {
    port: 9527,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/api": {
        target: "http://192.168.10.23:8080/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      },
      "/foo": {
        target: "<other_url>"
      }
    },
    before: app => {}
  },
  configureWebpack: {
    resolve: {
      extensions: [".js", ".vue", ".json"],
      alias: {
        vue$: "vue/dist/vue.esm.js",

        "@": resolve("src"),

        "/libs": path.resolve(__dirname, "../src/libs"),

        "/public": resolve("public")
      }
    }
  }
};
