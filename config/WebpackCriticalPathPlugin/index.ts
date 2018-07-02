import * as puppeteer from 'puppeteer';
import { compilation, Compiler } from 'webpack';

import { astToCss } from './ast';
import { combineSelectors, divideSelectors, filterCritical } from './selectors';
import { replaceTemplate, serverStart, serverStop } from './utils';

interface IOwnProps {
  width: number;
  height: number;
  host: string;
  port: number;
  timeout: number;
  urls: string[];
  cssFilename: string;
}

class WebpackCriticalPathPluginImpl {
  public pluginName: string;
  private options: IOwnProps;

  constructor(options: IOwnProps) {
    this.options = options;
    this.pluginName = 'WebpackCriticalPath';
  }

  public apply(compiler: Compiler) {
    compiler.hooks.afterEmit.tapAsync(this.pluginName, (chunks, callback) =>
      this.onAfterEmit(chunks, callback)
    );
  }

  private async onAfterEmit(
    { assets, outputOptions }: compilation.Compilation,
    callback: () => void
  ) {
    const { cssFilename, urls } = this.options;
    const { existsAt } = assets[outputOptions.filename];

    const server = await serverStart(existsAt);
    const browser = await puppeteer.launch({ headless: true });

    const { ast, selectorsMap, selectors } = await divideSelectors(
      assets[cssFilename].existsAt
    );

    const tasks = urls.map(url => this.extractor(browser, url, selectors));
    const allSelectors: string[][] = await Promise.all(tasks);

    await browser.close();
    serverStop(server);

    const combinedSelectors = combineSelectors(allSelectors);
    const criticalCss = astToCss(ast, selectorsMap, combinedSelectors);
    await replaceTemplate(existsAt, '%CRITICAL_STYLES%', criticalCss);

    callback();
  }

  private async extractor(
    browser: puppeteer.Browser,
    url: string,
    selectors: string[]
  ) {
    const { host, port, width, height, timeout } = this.options;

    const page = await browser.newPage();
    await page.setViewport({ width, height });
    await page.goto(`${host}:${port}${url}`, { timeout });

    const criticalSelectors = await page.evaluate(filterCritical, selectors);
    await page.close();

    return criticalSelectors;
  }
}

export const WebpackCriticalPathPlugin = WebpackCriticalPathPluginImpl;
