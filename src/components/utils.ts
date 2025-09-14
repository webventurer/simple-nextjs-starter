
import { JSX, ReactElement, ReactNode, Children } from 'react';

import { renderToStaticMarkup } from 'react-dom/server';

type Sequence = (keyof JSX.IntrinsicElements)[]

const matchesTag = (el: ReactElement, tag: keyof JSX.IntrinsicElements) =>
  (typeof el.type === 'string' && el.type === tag) ||
  (typeof el.type === 'function' &&
   'displayName' in el.type &&
   (el.type as React.ComponentType & { displayName: string }).displayName === tag)

export const groupBySequence = (children: ReactNode, seq: Sequence) => {
  const elements = Children.toArray(children) as ReactElement[];
  const groups: ReactElement[][] = []
  for (let i = 0; i < elements.length; i += seq.length) {
    const slice = elements.slice(i, i + seq.length)
    seq.forEach((tag, j) => {
      if (!matchesTag(slice[j], tag)) {
        throw new Error(`Expected <${tag}> at position ${i + j}. Tag:\n\n${renderToStaticMarkup(slice[j])}.`)
      }
    })
    groups.push(slice)
  }
  return groups
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withDisplayNames = (components: Record<string, React.ComponentType<any>>) => {
  Object.keys(components).forEach((key) => {
    components[key].displayName = key;
  });
  return components;
};
