import * as vscode from 'vscode';
import fs from 'fs';
import { unRegisters } from './extension';

export default function (
  context: vscode.ExtensionContext,
  mixinsPaths: string[]
) {
  function provideDefinition(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ) {
    let uris: vscode.Location[] = [];
    mixinsPaths.forEach((item) => {
      if (fs.existsSync(item)) {
        uris.push(
          new vscode.Location(vscode.Uri.file(item), new vscode.Position(0, 0))
        );
      }
    });
    // console.log('111 uris', uris);
    return uris;
  }
  const unRegister = vscode.languages.registerDefinitionProvider(['less'], {
    provideDefinition,
  });
  unRegisters.push(unRegister);
  context.subscriptions.push(unRegister);
}
