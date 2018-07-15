const path = require('path');

function transformPaths(node, path) {
  const segmentCount = path.split('/').length - 1;
  const pathPrefix = segmentCount === 0 ? './' : Array(segmentCount).fill('../').join('');
  const transformer = (obj) => {
    return Object.entries(obj).reduce((acc, [key, val]) => {
      if (['internal', 'children', 'parent'].includes(key)) {
        return acc;
      }

      let newVal = val;
      if (typeof val === 'object') {
        newVal = transformer(val);
      } else if (typeof val === 'string' && val.startsWith('/content/')) {
        newVal = val.replace(/^\/content\//, pathPrefix);
      }
      acc[key] = newVal;
      return acc;
    }, {});
  };
  return transformer(node);
}

exports.onCreateNode = ({ node, actions: { createNode, createNodeField, createPage, createParentChildLink }, getNode, createNodeId }) => {
  if (node.internal.owner === 'gatsby-transformer-yaml') {
    const fileNode = getNode(node.parent);
    const transformedNode = transformPaths(node, fileNode.relativePath);
    const contentNode = {
      ...transformedNode,
      id: createNodeId(`${node.id} >> Relative Images`),
      children: [],
      parent: fileNode.id,
      internal: {
        contentDigest: node.internal.contentDigest,
        type: `Content${node.internal.type.replace('Yaml', '')}`,
      },
    };

    createNode(contentNode);
    createParentChildLink({
      parent: fileNode,
      child: contentNode,
    });

    if (fileNode.relativeDirectory === 'sections') {
      const url = `/${fileNode.name}`;
      createNodeField({
        node: contentNode,
        name: 'url',
        value: url,
      });

      const sectionTemplate = path.resolve(`src/templates/sections.tsx`);
      createPage({
        path: url,
        component: sectionTemplate,
        context: {
          id: contentNode.id,
        },
      });
    }
  }
}
