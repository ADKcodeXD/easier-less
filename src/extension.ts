// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { welcome } from './welcome';
import registerHover from './registerHover';
import registerDefinition from './registerDefinition';
import { getMixinsPaths } from './getMixins';
import { getStore } from './getStore';
import registerAutoComplete from './registerAutoComplete';
import { watchMixins, watchConfig, watchers } from './watcher';

export const unRegisters: vscode.Disposable[] = [];

export async function activate(context: vscode.ExtensionContext) {
  console.log('-----easier-less 插件已激活-----');

  welcome();
  init();
  watchConfig(init);

  async function init() {
    unRegisters.forEach((unRegister) => unRegister.dispose());
    watchers.forEach((watcher) => watcher.dispose());

    const mixinsPaths = getMixinsPaths();
    watchMixins(mixinsPaths, init);
    const [store, variableStore, methodsStore] = await getStore(mixinsPaths);
    console.log('111 store', store);
    registerHover(context, store, mixinsPaths);
    registerDefinition(context, mixinsPaths);
    registerAutoComplete(context, variableStore, methodsStore);
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}
