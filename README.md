# eaiser-less ![](https://img.shields.io/badge/vscode%20plugin-0.0.1-brightgreen)

🖖 一个方便使用 less 的 vscode 插件

## 为什么要做这个插件？

有三个痛点 😖

1. less 文件中码入变量时需要打开 mixin.less 中找到变量再复制过来。
2. less 文件中无法方便获悉变量对应的值，需要到 mixin.less 文件中去找。
3. 在当前 less 文件中无法直接打开 mixin.less 文件，需要在目录中查找或者全局搜。

## 当前版本提供的功能

1. 在 less 文件中键入 `@` 时显示预输入的所有变量

![](http://assets.onlyadaydreamer.top/vscode-plugin-gifs/autocompletefor@.gif)

2. 鼠标悬浮在变量上显示其值

![](http://assets.onlyadaydreamer.top/vscode-plugin-gifs/hover.gif)

3. 对于 less 变量，`cmd` 或 `ctrl` 显示下划线点击可以跳转到变量所在文件

![](http://assets.onlyadaydreamer.top/vscode-plugin-gifs/jump2mixin.gif)

![](http://assets.onlyadaydreamer.top/vscode-plugin-gifs/jump2mixin2.gif)

## todo

鼠标悬浮在 less color 变量时显示颜色, 这个没有找到方法，有路子的同学请指导指导 🙏🙏🙏~~~
