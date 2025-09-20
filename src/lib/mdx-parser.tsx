import React from "react";

export interface ParsedMarkdownContent {
  title?: string;
  description?: string;
  links?: Array<{ text: string; href: string }>;
  remaining?: React.ReactNode;
}

/**
 * Parses MDX children to extract common elements like titles, descriptions, and links
 */
export function parseMarkdownContent(
  children: React.ReactNode
): ParsedMarkdownContent {
  if (!children) return {};

  const result: ParsedMarkdownContent = {
    links: [],
  };

  const remainingElements: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      // Handle text nodes
      if (typeof child === "string" && child.trim()) {
        remainingElements.push(child);
      }
      return;
    }

    const element = child as React.ReactElement<any>;

    // Extract H1 for title
    if (element.type === "h1" && !result.title) {
      result.title = extractTextContent(element);
      return;
    }

    // Extract H2 for subtitle/section title
    if (element.type === "h2" && !result.title) {
      result.title = extractTextContent(element);
      return;
    }

    // Extract H3 for feature title
    if (element.type === "h3" && !result.title) {
      result.title = extractTextContent(element);
      return;
    }

    // Extract paragraphs for description
    if (element.type === "p" && !result.description) {
      result.description = extractTextContent(element);
      return;
    }

    // Extract links for buttons
    if (element.type === "p") {
      const links = extractLinksFromParagraph(element);
      if (links.length > 0) {
        result.links = [...(result.links || []), ...links];
        return;
      }
    }

    // Extract standalone links
    if (element.type === "a" && element.props?.href) {
      result.links = result.links || [];
      result.links.push({
        text: extractTextContent(element),
        href: element.props.href,
      });
      return;
    }

    // Add to remaining elements if not extracted
    remainingElements.push(child);
  });

  result.remaining =
    remainingElements.length > 0 ? remainingElements : undefined;

  return result;
}

/**
 * Extracts plain text content from React elements
 */
function extractTextContent(element: React.ReactNode): string {
  if (typeof element === "string") return element;
  if (typeof element === "number") return String(element);

  if (React.isValidElement(element)) {
    const props = element.props as any;

    if (typeof props?.children === "string") {
      return props.children;
    }

    if (Array.isArray(props?.children)) {
      return props.children
        .map((child: any) =>
          typeof child === "string"
            ? child
            : React.isValidElement(child)
            ? extractTextContent(child)
            : ""
        )
        .join("");
    }

    if (React.isValidElement(props?.children)) {
      return extractTextContent(props.children);
    }
  }

  return "";
}

/**
 * Extracts links from paragraph elements
 */
function extractLinksFromParagraph(
  paragraph: React.ReactElement<any>
): Array<{ text: string; href: string }> {
  const links: Array<{ text: string; href: string }> = [];
  const props = paragraph.props as any;

  if (!props?.children) return links;

  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];

  children.forEach((child: any) => {
    if (React.isValidElement(child) && child.type === "a") {
      const childProps = child.props as any;
      if (childProps?.href) {
        links.push({
          text: extractTextContent(child),
          href: childProps.href,
        });
      }
    }
  });

  return links;
}
