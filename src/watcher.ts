import * as vscode from 'vscode';

export function watch(mixinsPaths: string[], callback: () => void) {
  mixinsPaths.forEach((path) => {
    const watcher = vscode.workspace.createFileSystemWatcher(
      path,
      false,
      false,
      false
    );
    watcher.onDidChange((e) => {
      //   vscode.window.showInformationMessage(
      //     '检测到less文件发生变化，请重启vscode!'
      //   );
      callback();
    });
    watcher.onDidDelete((e) => {
      //   vscode.window.showInformationMessage(
      //     '检测到less文件被删除，请重启vscode!'
      //   );
      callback();
    });
  });
}
