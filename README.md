# easier-less ![](https://img.shields.io/badge/vscode%20plugin-0.0.8-brightgreen)

🖖 一个方便使用 less 的 vscode 插件

## 使用

1. 打开项目, 然后打开某个 less 文件会提示选择 mixins 文件(这个文件存放我们自定义的变量、方法)，支持多选； 下一次相同的操作会提示是否更新之前的选择。
2. 支持在用户配置文件 `setting.json` 中手动修改配置项: `less.files` `less.notice`。

## 为什么要做这个插件？

有三个痛点 😖

1. less 文件中码入某个色值变量时常常因为**记不住变量名称、变量对应的色值**而不得不打开 mixins.less，然后先找到想要的色值，再找到目标变量，最后切换回之前的 less 文件拷贝粘贴，一波几折，很是麻烦；想使用自定义的方法也有类似的问题。
2. less 文件中无法方便获悉变量或方法对应的值，需要到 mixins.less 文件中去找。
3. 在当前 less 文件中无法直接打开 mixins.less 文件，需要在目录中查找或者全局搜。

## 当前版本提供的功能

1.在 less 文件中键入 `@` 自动补全变量名，如果是色值变量也会显示色值；输入 `.` 自动补全方法名。

![](https://assets.onlyadaydreamer.top/autocompletefor%40.gif)

![](https://assets.onlyadaydreamer.top/autocompletefordot.gif)

2.鼠标悬浮在变量或方法上显示其值。

![](https://assets.onlyadaydreamer.top/hover.gif)

3.对于 less 变量或方法，`cmd` 或 `ctrl` 显示下划线点击可以直接跳转到其定义位置。

![](https://assets.onlyadaydreamer.top/jump2mixin.gif)

![](https://assets.onlyadaydreamer.top/jump2mixin2.gif)

## TODO

鼠标悬浮在色值变量时显示颜色, 这个没有找到方法，有路子的同学请指导指导 🙏🙏🙏~~~
