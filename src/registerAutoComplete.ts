import * as vscode from "vscode";
import { Store } from "./getStore";
import { unRegisters } from "./extension";

export default function (
  context: vscode.ExtensionContext,
  variableStore: Store,
  methodsStore: Store
) {
  /**
   * @ 自动补全
   * @param document
   * @param position
   * @param token
   */
  function provideCompletionItems1(
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
        if (
          /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(val) ||
          key.indexOf("Color") ||
          key.indexOf("color")
        ) {
          completionItem.kind = vscode.CompletionItemKind.Color;
        } else {
          completionItem.kind = vscode.CompletionItemKind.Variable;
        }
        return completionItem;
      });
    }
  }

  /**
   * . 自动补全
   * @param document
   * @param position
   * @param token
   */
  function provideCompletionItems2(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ) {
    const line = document.lineAt(position);
    // 只截取到光标位置为止，防止一些特殊情况
    const lineText = line.text.substring(0, position.character);
    // 简单匹配，只要当前光标前的字符串为 . 都自动带出所有的依赖
    if (/\.$/g.test(lineText)) {
      return Object.entries(methodsStore).map(([key, val]) => {
        const completionItem = new vscode.CompletionItem(`${key}`);
        completionItem.detail = val;
        completionItem.kind = vscode.CompletionItemKind.Method;
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

  const unRegister1 = vscode.languages.registerCompletionItemProvider(
    "less",
    {
      provideCompletionItems: provideCompletionItems1,
      resolveCompletionItem,
    },
    "@"
  );
  const unRegister2 = vscode.languages.registerCompletionItemProvider(
    "less",
    {
      provideCompletionItems: provideCompletionItems2,
      resolveCompletionItem,
    },
    "."
  );
  const unRegister3 = vscode.languages.registerCompletionItemProvider(
    "vue",
    {
      provideCompletionItems: provideCompletionItems1,
      resolveCompletionItem,
    },
    "@"
  );
  const unRegister4 = vscode.languages.registerCompletionItemProvider(
    "vue",
    {
      provideCompletionItems: provideCompletionItems2,
      resolveCompletionItem,
    },
    "."
  );
  unRegisters.push(unRegister1);
  unRegisters.push(unRegister2);
  unRegisters.push(unRegister3);
  unRegisters.push(unRegister4);
  context.subscriptions.push(unRegister1);
  context.subscriptions.push(unRegister2);
  context.subscriptions.push(unRegister3);
  context.subscriptions.push(unRegister4);
}
