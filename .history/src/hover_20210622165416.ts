import * as vscode from 'vscode';
import path from 'path';
import fs from 'fs';

fs.readdir('/Users/zhangxing/src/is-docs-vodka-frame/src', (err, res) => {
  console.log('111', res);
});

function provideHover(
  document: vscode.TextDocument,
  position: vscode.Position,
  token: vscode.CancellationToken
) {
  const fileName = document.fileName;
  const workDir = path.dirname(fileName);
  const word = document.getText(document.getWordRangeAtPosition(position));
  //   const json = document.getText();

  if (/^@(?!import)\w+/g.test(word)) {
    console.log('111', word);
    console.log('111', fileName);

    return new vscode.Hover('sahhaha');
  }
}

export default function (context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerHoverProvider('less', {
      provideHover,
    })
  );
}
