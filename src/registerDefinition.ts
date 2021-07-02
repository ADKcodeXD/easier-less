import * as vscode from 'vscode';
import fs from 'fs';
import { unRegisters } from './extension';
import { originalData } from './getStore';

export default function (
  context: vscode.ExtensionContext,
  mixinsPaths: string[]
) {
  function provideDefinition(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ) {
    let uris: vscode.Location[] = [];
    const fileName = document.fileName;

    const word = document.getText(document.getWordRangeAtPosition(position));
    // 和 hover 中的判断有所区分
    const isMethod = /\.(.*)/i.test(word);
    const isVariable = /^@(?!import)\w+/i.test(word);

    originalData.every((item) => {
      const [path, content] = item;
      console.log(111, content.indexOf(word), mixinsPaths);
      if (
        !mixinsPaths.includes(fileName) &&
        content.indexOf(word) !== -1 &&
        (isMethod || isVariable)
      ) {
        const lines = content
          .slice(0, content.indexOf(word))
          ?.match(/\n/g)?.length;
        uris.push(
          new vscode.Location(
            vscode.Uri.file(path),
            new vscode.Position(lines ? lines : 0, 0)
          )
        );
        return false;
      }
      // 注意要返回true
      return true;
    });

    return uris;
  }
  const unRegister = vscode.languages.registerDefinitionProvider(['less'], {
    provideDefinition,
  });
  unRegisters.push(unRegister);
  context.subscriptions.push(unRegister);
}
