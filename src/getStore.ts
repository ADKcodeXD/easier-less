import fs from 'fs';
import { promisify } from 'util';

export type Store = {
  [index: string]: string;
};

export async function getStore(mixinsPaths: string[]) {
  // const filePath = workspace.getConfiguration().get('less.filePath');

  // export const paths = (filePath as string)
  //   .split(',')
  //   .map((item) => item.replace(/\s+/g, ''));

  if (!mixinsPaths.length) {
    return [{}, {}, {}];
  }

  let promises: Promise<string>[] = [];

  const read = promisify(fs.readFile);

  mixinsPaths.forEach((item) => {
    promises.push(read(item, { encoding: 'utf-8' }));
  });

  let variablesMap: Store = {};
  let methodsMap: Store = {};

  return Promise.all(promises).then(
    (res) => {
      const data = res.reduce((pre, cur) => {
        return pre + cur;
      }, '');
      variablesMap = (data.match(/^@(?!import).*:.*/gm) || []).reduce(
        (pre: Store, cur: string) => {
          const arr: string[] = cur.split(/:\s*/);
          pre[arr[0]] = arr[1]
            .replace(/;?/g, '')
            .replace(/\/\/.*/g, '')
            .replace(/\/\*.*\*\/.*/g, '')
            ?.trim();
          return pre;
        },
        {}
      );

      methodsMap = (data.match(/\.(.+?)\(.*?\)\s+{([^]*?)}/g) || []).reduce(
        (pre: Store, cur: string) => {
          const name = cur.match(/^\..*?(?=(\(|\s+{))/g)?.[0] || '';
          pre[name] = cur;
          return pre;
        },
        {}
      );
      return [{ ...variablesMap, ...methodsMap }, variablesMap, methodsMap];
    },
    (err) => {
      console.log('err', err);
      return [{}, {}, {}];
    }
  );
}
