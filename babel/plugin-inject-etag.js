module.exports = function(babel) {
  const { types: t } = babel;

  return {
    name: "babel-plugin-inject-etag",
    visitor: {
      JSXOpeningElement(path) {
        const node = path.node;

        if (node.name.name !== 'img') {
          return;
        }

        const attrs = node.attributes;

        if (!attrs) {
          return;
        }

        const babelAttr = attrs.find(
          a => a.name.name === "babel-inject-etag"
        );

        node.attributes = attrs.filter(
          a => a.name.name !== "babel-inject-etag"
        );

        if (!babelAttr) {
          return;
        }

        const srcAttr = attrs.find(a => {
          return a.name.name === "src";
        });

        if (srcAttr) {
          srcAttr.value.value += "?v=" + Date.now();
        }
      }
    }
  };
}
