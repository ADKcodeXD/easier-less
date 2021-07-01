import * as vscode from 'vscode';
import fs from 'fs';

export function welcome() {
  const notice = vscode.workspace.getConfiguration().get('less.notice');

  if (!notice) {
    return;
  }

  let mixinsPaths: string[] = [];

  const files =
    vscode.workspace.getConfiguration().get<Array<string>>('less.files') || [];

  if (files?.length) {
    vscode.window
      .showInformationMessage(
        '已经选择less变量所在文件, 是否更新?',
        '更新',
        '不再通知'
      )
      .then(
        (item) => {
          switch (item) {
            case '更新':
              vscode.window
                .showOpenDialog({
                  canSelectMany: true,
                  filters: { Less: ['less'] },
                })
                .then((uris) => {
                  if (uris && uris.length) {
                    uris?.forEach((uri) => {
                      const p = uri.path;
                      if (p && fs.existsSync(p)) {
                        mixinsPaths.push(p);
                      }
                    });
                  }
                  vscode.workspace
                    .getConfiguration()
                    .update('less.files', mixinsPaths, true);
                  vscode.window.showInformationMessage('设置成功!');
                  // return resolve([mixinsPaths, true]);
                });
              break;
            case '不再通知':
              vscode.workspace
                .getConfiguration()
                .update('less.notice', false, true);
              break;
            // return resolve([files, false]);
            case undefined:
              break;
            // return resolve([files, false]);
          }
        },
        (e) => {
          // return reject([]);
        }
      );
  } else {
    vscode.window
      .showInformationMessage('初次使用，请选择less变量所在文件', '选择')
      .then(
        (item) => {
          if (item === '选择') {
            vscode.window
              .showOpenDialog({
                canSelectMany: true,
                filters: { Less: ['less'] },
              })
              .then((uris) => {
                if (uris && uris.length) {
                  uris?.forEach((uri) => {
                    const p = uri.path;
                    if (p && fs.existsSync(p)) {
                      mixinsPaths.push(p);
                    }
                  });
                }
                vscode.workspace
                  .getConfiguration()
                  .update('less.files', mixinsPaths, true);
                if (mixinsPaths.length) {
                  vscode.window.showInformationMessage('设置成功!');
                }
                // return resolve([mixinsPaths, true]);
              });
          }
        },
        (e) => {
          // return reject([]);
        }
      );
  }
}
