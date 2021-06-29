import * as vscode from 'vscode';
import { Store } from './getStore';
import { unRegisters } from './extension';

export default function (
  context: vscode.ExtensionContext,
  variableStore: Store
) {
  function provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ) {
    const line = document.lineAt(position);

    // 只截取到光标位置为止，防止一些特殊情况
    const lineText = line.text.substring(0, position.character);
    console.log(
      '111 lineText: ',
      lineText,
      variableStore,
      /.+?@$/g.test(lineText)
    );

    // 简单匹配，只要当前光标前的字符串为 @ 都自动带出所有的依赖
    if (/.+?@$/g.test(lineText)) {
      return Object.entries(variableStore).map(([key, val]) => {
        return new vscode.CompletionItem(
          `${key} (${val})`,
          vscode.CompletionItemKind.Field
        );
      });
    }
  }

  /**
   * 光标选中当前自动补全item时触发动作，一般情况下无需处理
   * @param {*} item
   * @param {*} token
   */
  function resolveCompletionItem() {
    return null;
  }

  const unRegister = vscode.languages.registerCompletionItemProvider(
    'less',
    {
      provideCompletionItems,
      resolveCompletionItem,
    },
    '@'
  );
  unRegisters.push(unRegister);
  context.subscriptions.push(unRegister);
}
