import * as csstree from 'css-tree';
import { readFile } from './utils';

export const fetchAst = async (filePath: string) => {
  const cssRaw = await readFile(filePath);
  const cssString = cssRaw.replace(/￿/g, '\f042');

  return csstree.parse(cssString);
};

export const astToCss = (
  ast: any,
  selectorsMap: WeakMap<object, any>,
  selectors: string[]
) => {
  const setSelectors = new Set(selectors);

  const filter = (node: any) => {
    let decision = selectorsMap.get(node);

    if (typeof decision === 'string') {
      decision = setSelectors.has(decision);
    }

    return typeof decision !== 'boolean' || decision;
  };

  const enter = (rule: any, item: any, list: any) => {
    rule.prelude.children = rule.prelude.children.filter(filter);

    if (rule.prelude.children.isEmpty()) {
      list.remove(item);
    }
  };

  csstree.walk(ast, {
    visit: 'Rule',
    enter,
  });

  return csstree.generate(ast);
};
