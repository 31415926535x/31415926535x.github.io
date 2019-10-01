---
title: 批量将doc文件转化成docx
date: 2019-05-29 22:26:10
tags:
- 技巧
---


# 概述

最近要弄暑期实训了，知道老师给了一份国标的软件文档标准，，然后里面很多 ``.doc`` 的文件，，因为我已经完全习惯了用md来写各种文档，，而且电脑也配置好了 ``pandoc`` 的环境，，所以就想着将 ``doc`` 文件转化成 ``.md`` 文件，，然后直接用md的语法来写文档，，然后用 ``pandoc`` 来转换写好的md文档成 ``docx``，自动排版，，不用考虑一些对齐什么的格式问题，，但是，，``doc`` 文档很多，，而且 ``pandoc`` 不支持直接将 ``doc`` 转换成 ``md`` 格式的文件，，要先转化成 ``docx`` 文件才能转换成 ``md`` 文件，，，但是一个文件还好说，，一坨文件的话手动转化就太麻烦了，，于是找了一些可以转化一整个文件夹下的 ``doc`` 文件的方法，，

<!-- more -->

# 实现

[参考链接](https://www.zhihu.com/question/56463918)

网上有很多用插件就可以实现的方法，，但是我嫌安装软件麻烦，，而且内心想着肯定有一种用代码就可以解决的方法，，于是就找到了这个： **利用word中的vb来实现批量转换文件格式** ，，，

## 步骤

+ 新建一个word文件
+ 按住 ``Alt+F11`` 这时会打开一个名为 ``Microsoft Visual Basic for Application`` 的窗口，，
+ 点击 ``插入->模块``
+ 在新窗口中填写如下形式的代码：

```vb
Option Explicit
Sub doc2docx()
Dim sEveryFile As String
Dim sSourcePath As String
Dim path As String
Dim sNewSavePath As String
Dim CurDoc As Object
sSourcePath = "G:\FTP项目\GB8567\GB8567\软件设计文档（国标）\软件设计文档国家标准_GB8567--88\"
path = "G:\FTP项目\GB8567\GB8567\软件设计文档（国标）\软件设计文档国家标准_GB8567--88_docx\"
sEveryFile = Dir(sSourcePath & "*.doc")
Do While sEveryFile <> ""
    Set CurDoc = Documents.Open(sSourcePath & sEveryFile, , , , , , , , , , , msoFalse)
    CurDoc.Convert
    sNewSavePath = VBA.Strings.Replace(path & sEveryFile, ".doc", ".docx")
    CurDoc.SaveAs2 sNewSavePath, wdFormatDocumentDefault
    CurDoc.Close SaveChanges:=False
    sEveryFile = Dir
Loop
Set CurDoc = Nothing
End Sub
```

**其中 ``sSourcePath`` 表示你要批量转换文档的文件夹， ``path`` 表示最后转换出的文件保存的路径（根据自己的需求更改）**

+ 然后点击窗口（否则运行没反应），运行（F5 或者点上面的绿色的小三角）
+ 等待，目标文件夹就有了转换后的文档

## 坑点

+ 上面两个路径记得 **末尾添加 \\ ** ，否则会提示文件路径找不到等错误
+ 对了，如果提示 ``错误5121`` 等等的报错信息，，试试之前提示的保存 **宏编码doc** 的过程 **保存的word文件为旧版本的word文件形式（我选的是word2003  .doc）**
+ 