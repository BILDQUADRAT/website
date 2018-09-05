const path = require('path')

const storyblokEntryPath = path.resolve('src/templates/storyblok-entry.tsx');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(
    `{
      allStoryblokEntry {
        edges {
          node {
            id
            name
            created_at
            uuid
            slug
            full_slug
            content
            is_startpage
            parent_id
            group_id
          }
        }
      }
    }`
  );

  if (result.errors) {
    console.error(result.errors);
    throw new Error(result.errors);
  }

  const entries = result.data.allStoryblokEntry.edges;
  entries.forEach(entry => {
    // Host homepage under / (and not /home)
    const path = (entry.node.full_slug === 'home')
      ? '/'
      : `/${entry.node.full_slug}/`;

    createPage({
      path,
      component: storyblokEntryPath,
      context: {
        story: entry.node
      }
    });
  });
}
