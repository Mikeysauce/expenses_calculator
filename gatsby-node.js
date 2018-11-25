// const path = require('path')
// const _ = require('lodash')

// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions

//   const pages = await graphql(`
//     {
//       allPrismicHomePage {
//         edges {
//           node {
//             id
//             type
//             data {
//               works_button_text
//               quote_button_text
//               quote_button_url
//               hero_title_text_color
//               hero_button_border_color
//               hero_button_text_color
//               hero_button_background_color
//               works_title_text_color
//               works_title_line_separator
//               works_button_text_color
//               works_button_background_color
//               works_button_border_color
//               quote_background_color
//               quote_description_text_color
//               quote_description_line_separator_color
//               quote_author_name_color
//               quote_button_text_color
//               quote_button_border_color
//               quote_button_background_color
//             }
//           }
//         }
//       }
//     }
//   `)
//   console.log('pages', pages)
//   const postTemplate = path.resolve('src/templates/light.js')
//   const pageNodes = pages.data.allPrismicHomePage.edges
//   const paths = {
//     home_page: `/`,
//   }
//   pageNodes.map(edge => {
//     createPage({
//       path: paths[edge.node.type],
//       component: postTemplate,
//     })
//   })
// }

// /* Allow us to use something like: import { X } from 'directory' instead of '../../folder/directory' */
// exports.onCreateWebpackConfig = ({ actions }) => {
//   actions.setWebpackConfig({
//     resolve: {
//       modules: [path.resolve(__dirname, 'src'), 'node_modules'],
//     },
//   })
// }
