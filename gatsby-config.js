module.exports = {
  siteMetadata: {
    title: 'BILDQUADRAT',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-typescript',
    'gatsby-transformer-yaml',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-transformer-sqip',
    'gatsby-plugin-sharp',
    'gatsby-plugin-netlify',
    'gatsby-plugin-netlify-cache',
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.ts`,
        stylesPath: `${__dirname}/src/styles/cms.scss`,
      },
    },
  ],
}
