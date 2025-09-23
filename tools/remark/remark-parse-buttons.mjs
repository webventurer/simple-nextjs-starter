import { visit } from 'unist-util-visit';

export default function remarkButton() {
  return (tree) => {
    visit(tree, 'link', (node, index, parent) => {
      if (!node.children || !node.children[0] || node.children[0].type !== 'text') return;
      
      const linkText = node.children[0].value;
      const match = linkText.match(/^\[(.+?)(?:\|(.+?))?\]$/);
      
      if (!match) return;
      
      const buttonText = match[1].trim();
      const propsString = match[2];
      const href = node.url;
      
      const props = {};
      if (propsString) {
        propsString.split(',').forEach((pair) => {
          const [key, value] = pair.split('=');
          if (key && value) props[key.trim()] = value.trim();
        });
      }

      const buttonNode = {
        type: 'mdxJsxTextElement',
        name: 'Button',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'href',
            value: href
          },
          ...Object.entries(props).map(([key, value]) => ({
            type: 'mdxJsxAttribute',
            name: key,
            value: value
          }))
        ],
        children: [{
          type: 'text',
          value: buttonText
        }]
      };
      
      parent.children[index] = buttonNode;
    });
  };
}
