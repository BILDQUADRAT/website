let storyblokAccessToken = '';
if (process && process.env && 'STORYBLOK_ACCESS_TOKEN' in process.env) {
  storyblokAccessToken = process.env.STORYBLOK_ACCESS_TOKEN;
} else {
  try {
    const envFile = require('./.env');
    if ('STORYBLOK_ACCESS_TOKEN' in envFile) {
      storyblokAccessToken = envFile.STORYBLOK_ACCESS_TOKEN;
    }
  } catch(e) {}
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
        accessToken: storyblokAccessToken,
        homeSlug: 'home',
        version: 'draft'
      }
    },
  ],
}
