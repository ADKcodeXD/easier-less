import * as vscode from 'vscode';

export function watchMixins(mixinsPaths: string[], callback: () => void) {
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

export function watchConfig(callback: () => void) {
  vscode.workspace.onDidChangeConfiguration(function (event) {
    const configList = ['less.files', 'less.notice'];
    // affectsConfiguration: 判断是否变更了指定配置项
    const affected = configList.some((item) =>
      event.affectsConfiguration(item)
    );
    if (affected) {
      callback();
    }
  });
}
