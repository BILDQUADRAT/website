require('dotenv-safe').config();

module.exports = {
  siteMetadata: {
    title: 'BILDQUADRAT',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/*': [
            "Content-Security-Policy: frame-ancestors 'self' https://*.storyblok.com/",
            "X-Frame-Options: ALLOW-FROM https://app.storyblok.com/",
          ]
        },
        mergeSecurityHeaders: true,
        transformHeaders: (headers, path) => {
          // Strip out predefined X-Frame-Options: DENY-header
          return (path === '/*')
            ? headers.filter(h => h.split(': ')[1].indexOf('DENY') === -1)
            : headers;
        }
      }
    },
    'gatsby-plugin-netlify-cache',
    {
      resolve: 'gatsby-source-storyblok',
      options: {
        accessToken: process.env.GATSBY_STORYBLOK_ACCESS_TOKEN,
        homeSlug: 'home',
        version: 'draft'
      }
    },
  ],
}
