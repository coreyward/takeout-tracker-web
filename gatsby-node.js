const path = require("path")

// Use `src` as root folder for imports
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: { react: path.resolve("./node_modules/react") },
    },
  })
}
