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
  const lineText = line.text;
  console.log('111', lineText);

  if (/^@(?!import)\w+/i.test(word) || /\.(.*)\(\)/i.test(lineText)) {
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
