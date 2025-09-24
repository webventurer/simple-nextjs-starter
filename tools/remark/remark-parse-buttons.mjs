import { visit } from 'unist-util-visit';

export default function transformBracketLinksToButtons() {
  return (tree) => {
    visit(tree, 'link', (node, index, parent) => {
      if (!linkNodeHasTextContent(node)) return;

      const buttonSyntax = extractButtonSyntaxFromDoubleBrackets(node.children[0].value);
      if (!buttonSyntax) return;

      const buttonElement = createMdxButtonElement(buttonSyntax, node.url);
      parent.children[index] = buttonElement;
    });
  };
}

function linkNodeHasTextContent(node) {
  return node.children &&
         node.children[0] &&
         node.children[0].type === 'text';
}

function extractButtonSyntaxFromDoubleBrackets(linkText) {
  const bracketMatch = linkText.match(/^\[(.+?)(?:\|(.+?))?\]$/);

  if (!bracketMatch) {
    return null;
  }

  const buttonText = bracketMatch[1].trim();
  const propsString = bracketMatch[2];

  return {
    text: buttonText,
    props: parseCommaDelimitedProps(propsString)
  };
}

function parseCommaDelimitedProps(propsString) {
  const props = {};

  if (!propsString) {
    return props;
  }

  propsString.split(',').forEach((pair) => {
    const [key, value] = pair.split('=');
    if (key && value) {
      props[key.trim()] = value.trim();
    }
  });

  return props;
}

function createMdxButtonElement(buttonSyntax, href) {
  const attributes = [
    {
      type: 'mdxJsxAttribute',
      name: 'href',
      value: href
    }
  ];

  Object.entries(buttonSyntax.props).forEach(([key, value]) => {
    attributes.push({
      type: 'mdxJsxAttribute',
      name: key,
      value: value
    });
  });

  return {
    type: 'mdxJsxTextElement',
    name: 'Button',
    attributes: attributes,
    children: [{
      type: 'text',
      value: buttonSyntax.text
    }]
  };
}


