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

  if (/^@(?!import)\w+/g.test(word)) {
    return new vscode.Hover(
      `${config[word]} &#60;span style="display:block;width:100px;height: 50px;background: ${config[word]}"&#62;&#60;/span&#62;`
    );
  }
}

export default function (context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerHoverProvider('less', {
      provideHover,
    })
  );
}
