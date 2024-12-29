const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3658/m1/770291-747944-default",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
});
