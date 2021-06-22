import * as vscode from 'vscode';
import path from 'path';
import config from './config';

function provideHover(
  document: vscode.TextDocument,
  position: vscode.Position,
  token: vscode.CancellationToken
) {
  const fileName = document.fileName;
  const workDir = path.dirname(fileName);
  const word = document.getText(document.getWordRangeAtPosition(position));
  //   const json = document.getText();
  const line = document.lineAt(position);

  if (/(^@(?!import)\w+/.test(word) || /\.(.*)\(\))/g.test(line)) {
    return new vscode.Hover({
      language: 'less',
      value: `${word}: ${config[word]}`,
    });
  }
}
export default function (context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerHoverProvider('less', {
      provideHover,
    })
  );
}
