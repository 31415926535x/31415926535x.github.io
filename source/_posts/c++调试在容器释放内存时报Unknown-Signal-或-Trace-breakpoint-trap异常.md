---
title: c++调试在容器释放内存时报Unknown Signal 或 Trace/breakpoint trap异常
date: 2019-09-11 17:55:24
tags:
- 报错
- 解决方法
---


在做一道题时，用到的板子中出现了很多的容器的使用，，一开始都是开MAXN大小的容器，，但是有几率出现程序运行完后不正常退出，，

在多次尝试断点调试后，发现主要的异常是程序在结束时，要进行资源的释放，，但是可能空间开的MAXN和使用的不匹配，就会出现未知错误，，或者是 Trace/breakpoint trap 异常，，把申请时的 ``vector<edge> g[MAXN]`` 改为 ``vector<edge> g[MAXN + 10]`` 就行了，，

[参考](https://bbs.csdn.net/topics/392565423)