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

exports.createPages = ({ graphql, actions }) => {
  const pageTypes = [{ name: "Page", template: "Page" }]

  return Promise.all(
    [
      pageTypes.map(async page => {
        const query = await graphql(`
        {
          pageData: allSanity${page.name} {
            nodes {
              id
              slug {
                current
              }
            }
          }
        }
      `)

        if (query.errors) throw query.errors

        query.data.pageData.nodes.forEach(({ id, slug }) => {
          actions.createPage({
            path: slug.current,
            component: path.resolve(`./src/templates/${page.template}.jsx`),
            context: {
              id,
              slug: slug.current,
            },
          })
        })
      }),
    ].flat()
  )
}
