import * as vscode from 'vscode';

function provideHover() {
  return new vscode.Hover('sahhaha');
}

export default function (context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerHoverProvider('less', {
      provideHover,
    })
  );
}
