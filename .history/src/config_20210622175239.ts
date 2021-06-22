import fs from 'fs';

const res = fs.readFileSync(
  '/Users/zhangxing/src/is-docs-vodka-frame/src/styles/mixins.less',
  {
    encoding: 'utf-8',
  }
);

export const variablesMap = (res.match(/^@(?!import).*:.*/gm) || []).reduce(
  (pre: { [index: string]: string }, cur: string) => {
    const arr: string[] = cur.split(/:\s*/);
    if (arr.length) {
      pre[arr[0]] = arr[1].replace(';', '');
    }
    return pre;
  },
  {}
);

export const methodsMap = res.match(/^\..*?{.*}/gm) || [];
