import { ChildProcess, spawn } from 'child_process';
import * as fs from 'fs';

export const serverStart = async (scriptPath: string) => {
  const server = await spawn('node', [scriptPath], {
    env: {
      NODE_ENV: 'production',
    },
    stdio: 'inherit',
    shell: true,
  });

  return server;
};

export const serverStop = (server: ChildProcess) => server.kill();

export const readFile = (path: string): Promise<string> =>
  new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf8' }, (err, content) => {
      if (err) {
        reject(err);
      } else {
        resolve(content);
      }
    });
  });

export const saveFile = (path: string, text: string) =>
  fs.writeFile(path, text, 'utf8', err => {
    if (err) {
      throw err;
    }
  });

export const replaceTemplate = async (
  path: string,
  key: string,
  value: string
) => {
  const template = await readFile(path);
  const text = template.replace(key, value);

  saveFile(path, text);
};
