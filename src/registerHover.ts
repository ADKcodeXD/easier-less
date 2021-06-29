import * as vscode from 'vscode';
import { Store } from './getStore';
import { unRegisters } from './extension';

export default function (context: vscode.ExtensionContext, store: Store) {
  function provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ) {
    //   const fileName = document.fileName;
    const word = document.getText(document.getWordRangeAtPosition(position));
    const line = document.lineAt(position);
    const lineText = line.text;

    const isMethod = /\.(.*)\(.*?\)/i.test(lineText);
    const isVariable = /^@(?!import)\w+/i.test(word);

    if (isVariable || isMethod) {
      // console.log('111', '生效了', word);

      return new vscode.Hover({
        language: 'less',
        value: `${word}: ${store[word] || '未找到定义'}`,
      });
    }
  }

  const unRegister = vscode.languages.registerHoverProvider('less', {
    provideHover,
  });

  // const unRegister = vscode.languages.registerColorProvider('less', {
  //   provideDocumentColors(document, token) {
  //     console.log('1111', 'ahhahah');

  //     return [
  //       new vscode.ColorInformation(
  //         new vscode.Range(0, 20, 0, 10),
  //         new vscode.Color(255, 243, 122, 1)
  //       ),
  //     ];
  //   },
  //   provideColorPresentations() {
  //     return [new vscode.ColorPresentation('.k-font-medium')];
  //   },
  // });

  unRegisters.push(unRegister);
  context.subscriptions.push(unRegister);
}
