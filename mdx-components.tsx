import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: properties => <h1 {...properties} className="text-blue-500" />,
    ...components,
  };
}
