import fs from 'fs';

const res = fs.readFileSync(
  '/Users/zhangxing/src/is-docs-vodka-frame/src/styles/mixins.less',
  {
    encoding: 'utf-8',
  }
);

export const variablesMap =
  res.match(/^@(?!import).*:.*/gm) ||
  [].reduce((pre, cur: string) => {
    const arr = cur.split(':');
    pre[arr[0]] = arr[1];
  }, {});

export const methodsMap = res.match(/^\..*\(.*\)/gm) || [];
