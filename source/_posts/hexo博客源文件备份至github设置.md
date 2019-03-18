---
title: hexo博客源文件备份至github设置
date: 2019-03-18 11:32:55
tags:
- hexo
- 博客
categories:
- hexo博客相关
---

# 起因

弄这个的主要原因是之前搞崩过两次博客（手贱在上传文件的时候按ctrl+c，，在恢复的时候总是怕再出错，，每次都备份了好几遍源文件，，，尤其是那些md文件，，，毕竟丢了就真的只能重写了啊，，，

今天偶然看到有人把md文件和渲染后的html文件放在一个文件夹中，，，感觉不错，，，后来看完他的设置后，，感觉有一点不好：md文件不集中，，，真要拿回所有的md文件很麻烦，，，而且还要动配置文件 ``_config.yml`` ，，实在是不想因为改动这个出现各种奇奇怪怪的错误了，，不是说不会解决，，，主要是太麻烦:(，，，，

后来又看到现在弄的这个方法： **将主要的源文件定期备份到另一个分支里** ，，，这样的话所有文件都在一个分支里，，，用的时候直接拉下来，，重新配置hexo环境等等就行了，，，

<!-- more -->

# 主要步骤

主要的过程我是按照[一个博主的文章](https://blog.csdn.net/White_Idiot/article/details/80685990)来的，，，但是自己记录一下，，以免之后忘记没处找，，

## 创建分支目录

现创建一个要备份所有文件的文件夹，，，我的是 ``hexoBackup``：

```cmd
$ mkdir hexoBackup
```

然后将GitHub上的博客内容 ``clone`` 下来：

```bash
$ git clone https://github.com/yourname/yourname.github.io hexoBackup
```

删除所有 **除了 ``.git`` 的文件** 

>主要是为了得到版本管理的.git

```cmd
$ cd hexoBackup 
$ rm -r *
```

把要hexo里要备份的文件、文件夹放到这个文件夹里：

```cmd
scaffolds/
source/
themes/
.gitignore
_config.ym;
package.json
```

然后删除所有的复制过来的文件中的 ``.git`` 文件夹，，，不然后面不能提交

## 创建分支

创建一个名为 ``hexoBackup`` 的分支：

```bash
$ git checkout -b hexoBackup
```

保存所有文件到暂存区：

```bash
$ git add --all
```

提交变更：

```bash
$ git commit -m "create hexoBackup branch"
```

推送到GitHub，，并用 ``--set-upstream`` 与 ``origin`` 创建关联，，将 ``hexoBackup`` 设置为默认分支

```bash
$ git push --set-upstream origin hexoBackup
```

## 合并管理

我看的那篇博文的博主将这两个文件夹合并操作了（应该是这个意思），，，我想了想算了，，，嘿嘿嘿

# 发表文章

像往常那样写博客，，，提交

更新备份的话就是：

```bash
$ git add .
$ git commit -m "balabala"
$ git push origin hexoBackup
```

# 迁移恢复

+ 环境配置：git, nodejs, npm
+ clone仓库
+ 执行命令:

```bash
$ npm install hexo-cli -g
$ npm install
$ npm install hexo-deployer-git
```


[参考1](https://www.jianshu.com/p/baab04284923)

[参考2](https://blog.csdn.net/White_Idiot/article/details/80685990)

(end)