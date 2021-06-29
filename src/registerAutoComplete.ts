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

    // 简单匹配，只要当前光标前的字符串为 @ 都自动带出所有的依赖
    if (/@$/g.test(lineText)) {
      return Object.entries(variableStore).map(([key, val]) => {
        const completionItem = new vscode.CompletionItem(`${key}`);
        completionItem.detail = val;
        // completionItem.command = {
        //   title: 'format',
        //   command: 'editor.action.formatDocument',
        // };
        if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(val)) {
          completionItem.kind = vscode.CompletionItemKind.Color;
        } else {
          completionItem.kind = vscode.CompletionItemKind.Variable;
        }
        return completionItem;
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
