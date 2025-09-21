import { Children, type JSX, type ReactElement, type ReactNode } from "react";

type Sequence = (keyof JSX.IntrinsicElements)[];

const matchesTag = (el: ReactElement, tag: keyof JSX.IntrinsicElements) =>
  (typeof el.type === "string" && el.type === tag) ||
  (typeof el.type === "function" &&
    "displayName" in el.type &&
    (el.type as React.ComponentType & { displayName: string }).displayName ===
      tag);

export const groupBySequence = (children: ReactNode, seq: Sequence) => {
  const elements = Children.toArray(children) as ReactElement[];
  const groups: ReactElement[][] = [];
  for (let i = 0; i < elements.length; i += seq.length) {
    const slice = elements.slice(i, i + seq.length);
    seq.forEach((tag, j) => {
      if (!matchesTag(slice[j], tag)) {
        const found =
          typeof slice[j].type === "string"
            ? slice[j].type
            : (slice[j].type as React.ComponentType).displayName ||
              (slice[j].type as React.ComponentType).name ||
              "unknown";
        throw new Error(
          `Expected <${tag}> at position ${i + j}, found <${found}>`,
        );
      }
    });
    groups.push(slice);
  }
  return groups;
};

export const withDisplayNames = (
  components: Record<string, React.ComponentType<Record<string, unknown>>>,
) => {
  Object.keys(components).forEach((key) => {
    components[key].displayName = key;
  });
  return components;
};
