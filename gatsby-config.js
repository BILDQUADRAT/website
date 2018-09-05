require('dotenv-safe').config();

if (!storyblokAccessToken) {
  throw new Error("Missing storyblok access token.");
}

module.exports = {
  siteMetadata: {
    title: 'BILDQUADRAT',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-typescript',
    'gatsby-plugin-netlify',
    'gatsby-plugin-netlify-cache',
    {
      resolve: 'gatsby-source-storyblok',
      options: {
        accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
        homeSlug: 'home',
        version: 'draft'
      }
    },
  ],
}
