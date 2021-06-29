import * as vscode from 'vscode';
import fs, { PathLike } from 'fs';
import path, { resolve } from 'path';
import { rejects } from 'assert';

export function getMixinsPaths(): Promise<[string[], boolean]> {
  /*   // 所有变量文件
  let mixinsPaths: string[] = [];
  // 在当前文件内 查找变量所在文件
  const editor = vscode.window.activeTextEditor;
  const content = editor?.document.getText();
  // 当前文件的路径
  const fileName = editor?.document.fileName;
  console.log('111 fileName', fileName);
  // 可能引用了多个less文件
  const targets = content?.match(/(?<=@import ['"])(.+?)(?=['"])(?=;?)/gm);
  console.log('111 targets', targets);
  if (targets?.length) {
    targets.forEach((target) => {
      if (fileName) {
        const filePath = path.resolve(
          fileName,
          '../' + (/\.less/.test(target) ? target : target + '.less') // 判断是否有.less后缀
        );
        console.log(
          '111 filePath',
          '../' + /\.less/.test(target) ? target : target + '.less',
          filePath,
          fs.existsSync(filePath)
        );
        if (fs.existsSync(filePath)) {
          mixinsPaths.push(filePath);
        }
      }
    });
  } */

  // 从外部找变量所在文件
  // 项目中可能使用了 style-resources-loader 实现全局注入
  //   if (!targets?.length) {
  //   }

  return new Promise((resolve, reject) => {
    let mixinsPaths: string[] = [];

    const files =
      vscode.workspace.getConfiguration().get<Array<string>>('less.files') ||
      [];

    const notice = vscode.workspace.getConfiguration().get('less.notice');

    // 不再通知说明已经配置过
    if (!notice) {
      return resolve([files, false]);
    }

    // 如果已经配置过但是还没有关闭通知
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
                    return resolve([mixinsPaths, true]);
                  });
                break;
              case '不再通知':
                vscode.workspace
                  .getConfiguration()
                  .update('less.notice', false, true);
                return resolve([files, false]);
              case undefined:
                return resolve([files, false]);
            }
          },
          (e) => {
            return reject([]);
          }
        );
    } else {
      vscode.window
        .showInformationMessage('第一次使用，请选择less变量所在文件', '选择')
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
                  vscode.window.showInformationMessage('设置成功!');
                  return resolve([mixinsPaths, true]);
                });
            }
          },
          (e) => {
            return reject([]);
          }
        );
    }
  });
}
