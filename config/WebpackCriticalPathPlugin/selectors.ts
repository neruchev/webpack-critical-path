import * as csstree from 'css-tree';

import { fetchAst } from './ast';

const normalizeName = (item: any) => {
  const name: string = csstree.generate(item).trim();

  return name.indexOf(':') > -1 ? name.replace(/:?:-[a-z-]*/g, '') : name;
};

export const divideSelectors = async (filePath: string) => {
  const ast = await fetchAst(filePath);

  const selectors = new Set();
  const selectorsMap = new WeakMap();

  const enter = (rule: any) =>
    rule.prelude.children.each((item: any) => {
      const selector = normalizeName(item);

      if (typeof selector === 'string') {
        selectors.add(selector);
      }

      selectorsMap.set(item, selector);
    });

  csstree.walk(ast, {
    visit: 'Rule',
    enter,
  });

  return {
    ast,
    selectorsMap,
    selectors: Array.from(selectors) as string[],
  };
};

export const filterCritical = (selectors: string[]) => {
  const { innerHeight } = window;
  const isElementAboveFoldCache = new Map();

  return selectors.filter(selector => {
    const elements = document.querySelectorAll(selector);
    const length = elements.length;

    for (let i = 0; i < length; i++) {
      const element = elements[i] as HTMLElement;

      if (isElementAboveFoldCache.has(element)) {
        return isElementAboveFoldCache.get(element);
      }

      const originalClearStyle = element.style.clear || '';
      element.style.clear = 'none';

      const aboveFold = element.getBoundingClientRect().top < innerHeight;
      isElementAboveFoldCache.set(element, aboveFold);
      element.style.clear = originalClearStyle;

      return aboveFold;
    }

    return false;
  });
};

export const combineSelectors = (allSelectors: string[][]) => {
  const sel: string[] = allSelectors.reduce(
    (result: string[], item: string[]) => [...result, ...item],
    []
  );

  return Array.from(new Set(sel));
};
