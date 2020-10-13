const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

const isProduction = process.env.NODE_ENV === "production";
const cdn = {
  css: [],
  js: [
    "https://cdn.bootcss.com/vue/2.5.17/vue.runtime.min.js",
    "https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js",
    "https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js",
    "https://cdn.bootcss.com/axios/0.18.0/axios.min.js"
  ]
};

module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static", // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  indexPath: "index.html", //用来指定index.html最终生成的路径
  filenameHashing: false, //对dist中js的文件引用都变成了hash之后的文件名
  // lintOnSave: process.env.NODE_ENV === "development",
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  devServer: {
    port: 9527,
    open: true,
    compress: false, // 开启压缩
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/api": {
        target: "http://192.168.30.55:8080",
        ws: true,
        changeOrigin: true,
        secure: false
      }
    },
    before: app => {}
  },
  configureWebpack: {},
  chainWebpack(config) {
    // 配置别名
    config.resolve.alias
      .set("@", resolve("src"))

      .set("@img", resolve("src/assets/images"))

      .set("@css", resolve("src/assets/css"))

      .set("@scss", resolve("src/assets/scss"))

      .set("@public", resolve("public"));

    // 生产环境配置
    if (isProduction) {
      // 删除预加载
      config.plugins.delete("preload"); //  移除 preload 插件
      config.plugins.delete("prefetch"); // 移除 prefetch 插件
      // 压缩代码
      config.optimization.minimize(true);
      // 分割代码
      config.optimization.splitChunks({
        chunks: "all"
      });
      // 生产环境注入cdn
      config.plugin("html").tap(args => {
        args[0].cdn = cdn;
        return args;
      });

      const CompressionPlugin = require("compression-webpack-plugin");
      const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

      config.plugin("compressionPlugin").use(
        new CompressionPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      );
    }

    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();

    // set preserveWhitespace
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();
  }
};
