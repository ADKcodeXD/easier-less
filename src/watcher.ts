import * as vscode from 'vscode';

export let watchers: vscode.FileSystemWatcher[] = [];

// 当mixinsPathsb变化后需要重新创建, 创建之前要把之前的干掉
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
    watchers.push(watcher);
  });
}

// 全局只需要注册一次即可
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
