---
title: Disqus使得博客空白
date: 2019-03-11 20:40:15
tags:
- hexo_blog
- next_theme
---

昨天更新了一篇博文之后，随手一看发现博客全是白的，，但是实际上是有字的，，可以选择出来但是就是不显示（透明一样），，，

<!-- more -->

然后我以为是我更新的时候中断导致的（这个的确使得CNAME变空了，然后就解析不到自己的域名上了），，，就重新安装了一遍NEXT主题，，但是还是不行，，，试着换了其他的主题却可以正常显示，，，后来甚至只是chrome上不正确显示，，其他的浏览器没有问题，，，

chrome的开发者模式下会报 ``Uncaught TypeError: $(...).find(...).lazyload is not a function`` 这么一个错误，，，

一直到晚上（现在）才在next_theme下的[issues](https://github.com/theme-next/hexo-theme-next/issues/673)看到有很多翻车的，，，是Disqus评论的锅，，现在的解决方法是把他关了就行了，，，

