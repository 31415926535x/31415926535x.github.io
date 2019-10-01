---
title: hexo Nunjucks Errors 解决方法
date: 2019-09-02 17:41:46
tags:
- hexo
- 报错
- 解决方法
categories:
- hexo-报错
---

这玩意总会爆奇奇怪怪的错，，这次生成文章的时候就报了一个 ``Nunjucks Errors: balabala`` 后面还是文章的 html 信息等等等，，这个错误是因为文章里出现了一些类似 {% raw %}``{{}}``{% endraw %} 的内容什么的（比如我现在打出的这个，，，，然后 hexo 的文章渲染使用的是 ``Nunjucks`` ，他会将那几个大括号识别成自己的语法，，这样生成的时候就会报错，，，

<!-- more -->

解决方法是： 可以根据下面的报错信息，找到可能出错的地方，，比如说这样的，，{% raw %}``$a^{{a_1}^{{a_2}}}$``{% endraw %} 这样的公式什么的，，前后加一个这个： ``{% raw %}    {% endraw %}`` ，， 也就是： ``{% raw %}\$a^{{a_1}^{{a_2}}}${% endraw %}```

这样改之后应该就行了，，，

[参考博客](http://blog.tcs-y.com/2018/01/22/hexo-quote-ng2/)

[github 上的issue ](https://github.com/mozilla/nunjucks/issues/388#issuecomment-77730107)

(end...)