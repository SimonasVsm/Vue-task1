const { createVuePlugin } = require("vite-plugin-vue2")
import eslint from "@rollup/plugin-eslint"

module.exports = {
  plugins: [
    createVuePlugin(),
    eslint({
      include: "**/*.+(vue|js|jsx|ts|tsx)",
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3004/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
}
