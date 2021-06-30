// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import registerHover from './registerHover';
import registerDefinition from './registerDefinition';
import { getMixinsPaths } from './getMixins';
import { getStore } from './getStore';
import registerAutoComplete from './registerAutoComplete';
import { watch } from './watcher';

export const unRegisters: vscode.Disposable[] = [];

export async function activate(context: vscode.ExtensionContext) {
  console.log('-----eaiser-less 插件已激活-----');
  const [mixinsPaths] = await getMixinsPaths();
  // console.log('111 mixinsPaths', mixinsPaths);
  watch(mixinsPaths, init);

  init();

  async function init() {
    // console.log('111 初始化');
    unRegisters.forEach((unRegister) => unRegister.dispose());
    const [store, variableStore, methodsStore] = await getStore(mixinsPaths);
    console.log('111 store', store);
    registerHover(context, store);
    registerDefinition(context, mixinsPaths);
    registerAutoComplete(context, variableStore, methodsStore);
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}
