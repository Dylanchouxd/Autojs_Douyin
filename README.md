## 概述

项目有两个软件，`养号助手`和`互动助手`，支持的功能不一样，可以进入对应文件夹的`README`看简介。

<img src="http://image-blog.dylanchou.cn/uPic/Snipaste_2023-03-16_11-36-24.png" alt="Snipaste_2023-03-16_11-36-24"  />

## 二次开发

项目都是用 [AutoX](https://github.com/kkevsekk1/AutoX) 进行开发，`AutoX`是在`Autojs 4.1版本`基础上的开发项目，有更新了比较多的功能，API大致都是一样的，而且最主要的是没有`软件限制`。

可根据`AutoX Github`的教程继续进行个人的二次开发，这里就暂不赘述了。

## 使用方式

### APK形式使用（推荐）

在 [Release](https://github.com/Dylanchouxd/Autojs_Douyin/releases) 中下载对应的APK，然后运行。

### AUTOX

1. 下载 AUTOX 的APK，https://github.com/kkevsekk1/AutoX/releases
2. 把项目的脚本文件夹传输进去，然后在AUTOX APK上运行脚本

## 当前版本适配

## 抖音

[v30.1.0 版本](https://github.com/Dylanchouxd/Autojs_Douyin/releases/tag/1.1.0)

[v22.7.0 版本](https://github.com/Dylanchouxd/Autojs_Douyin/releases/tag/1.0.0)

## 快手

[v10.9.21.28058 版本](https://github.com/Dylanchouxd/Autojs_Douyin/releases/tag/1.0.0)

## 版本适配教程

首先，脚本中使用了 APP 的元素 ID 去匹配对应的操作位置，正常来说只要 APP 不更新，脚本就是正常的。

每次 APP 更新，对应的元素 ID 都会更新，所以说每次 `APP更新脚本就会失效` 。

这时候我们就要`更新对应操作位置的 ID` 。

### 教程

目前我将所有的控件ID都整理在 [utils/widget.js](https://github.com/Dylanchouxd/Autojs_Douyin/blob/main/yanghao_tools/utils/widget.js)，对应的控件位置可以看图片 [statics](https://github.com/Dylanchouxd/Autojs_Douyin/tree/main/statics)，适配版本的话，更新对应控件的 ID 就好了。

但是有可能当APP版本更新后，原来的控件 id 不能获取到了，这时候就只能是改对应的逻辑，使用其他控件去实现对应的功能了，这时候就要靠自己去探索了。