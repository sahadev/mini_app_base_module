#小程序与业务无关的基础组件

##1.基础组件介绍
小程序基础组件基于主商城小程序业务实践演变而来。

基础组件的名称为：mini_app_base_module。

基础组件的项目地址为：http://git.missfresh.cn/frontend/mini_app_base_module。

##2.基础组件的结构与作用
我们理想的项目结构应该是这样的：

大前端团队 > 小程序基础组件介绍及接入指南 > 小程序基础组件结构介绍.png

也就是说，合理的项目结构应该讲究层的概念，各个层之间是绝对分离的。上下层彼此通过开放接口相互通信，杜绝跨层访问。也就是说不应该使业务组件直接访问RuntimeFrameworkApi层，页面不应该直接访问基础组件层等等。而mini_app_base_module正是处于第三级的基础组件层。

mini_app_base_module基础组件提供的功能有：

baseApplication：为整个应用提供了与运行平台隔离的环境，并做了运行时保护机制，为后期接入第三方SDK提供统一入口。目前的功能有：全局变量管理、setData方法执行校验、页面常用的各种状态方法等。

baseMonitorManager：用于为运行时API提供监控。具体实现需要业务组件提供网络访问实现。

baseNetRequestManager：用于发起网络请求。业务组件的埋点、监控、业务网络访问都需要通过它进行访问。

baseStorageManager：用于管理序列化存储功能，并提供了一键清除序列化值的方法。

baseUtils：提供调试模式管理、日志输出、UUID创建、字符串格式化等基础工具。

performanceUtil：性能调试工具，用于方法执行速度的性能调试。

thirdApi：提供除网络访问外的运行时api。

thirdNetApi：用于访问运行时网络api。

##3.基础组件的接入方法
基础组件了解了，该怎么接入它呢？

初次引入
在项目中通过命令git submodule add http://git.missfresh.cn/frontend/mini_app_base_module.git进行引入。引入后，将在项目中产生两个文件：
```
        .gitmodules
        mini_app_base_module
```
初次引入的开发者需要将这两个文件/文件夹commit并push。

初始化
在完成引入之后，基础组件的代码并没有存在与项目中，还需要进行初始化操作：```git submodule update --init --rebase```。小程序开发团队的每位开发者都需要执行一次。

更新与维护
进行以上操作之后，项目中会多出一个文件夹mini_app_base_module以及一个文件.gitmodules。当mini_app_base_module有更新或者有更改时，都需要进入mini_app_base_module文件夹中单独进行fetch、rebase操作或commit push操作。

基础组件接入
如果顺利完成了引入，则开始进行接入操作。基础组件功能的使用视业务而定。但接入BaseApplciation是必须要做的。

1.在业务代码中创建好application.js文件，application.js将作为业务组件的全局管理器，需要在application.js添加如下代码：
```js
// Application 全局管理入口
const {
    MFApp, MFPage, getApplication, registObserver
} = require('./mini_app_base_module/baseApplication');
==================
//视业务情况而定的业务代码
=================
module.exports = {
    MFApp, MFPage, getApplication
}
```
2.在app.js中引入application:
```js
const { MFApp } = require('./application');

//将App方法调用替换为MFApp

App(param) => MFApp(param);
```
3.在对应的页面中引入application:
```js
// 示例 pages/mainPages/home/home.js

const { getApplication, MFPage } = require('../../../application');

const app = getApplication();

//将Page方法的调用替换为MFPage

Page(param) => MFPage(param)
```

===============================================================

在完成以上基本接入之后，后续可视情况而定接入基础组件的其它功能。如时间允许请联系我。

主商城小程序经过大量的版本迭代之后，已经到了不得不重构的阶段。该基础组件也正是基础主商城小程序重构的设计思路进行实现的。柠檬生鲜项目已经在此基础之上进行了实践，并且已经实现了大量的可共用的组件，但这些组件还需要与业务代码进行拆分，请大家关注后续进展，也希望大家可以一起参与进来完善壮大这个基础组件。

