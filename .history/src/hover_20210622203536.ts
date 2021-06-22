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
      `啊哈哈哈哈<table>
            <tr>
                <td style="color: red">哈哈哈哈</td>
                <td>哈哈哈哈</td>
            </tr>
        </table>`
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
