---
title: ACM-题集
date: 2019-03-26 13:31:02
tags:
- acm
- 笔记
categories:
- ACM-整理
---

按用到的算法分类保存一下自己做的题

<!-- more -->

# 搜索

[Saving Tang Monk II](https://vjudge.net/problem/HihoCoder-1828) bfs+三维vis+优先队列

# 图论

## 拓扑排序

[HihoCoder-1870](https://hihocoder.com/problemset/problem/1870) 二分建图判断是否有环


## 2-sat

[hdu-1814](http://acm.hdu.edu.cn/showproblem.php?pid=1814): 2sat板子题

[hdu-3062](http://acm.hdu.edu.cn/showproblem.php?pid=3062): 也算是板子题吧

[Let's go home](http://acm.hdu.edu.cn/showproblem.php?pid=1824): 按题意建图就行了，啥限制条件建啥边，，不要多余就行了，，，

[UVALive-3211](https://cn.vjudge.net/problem/UVALive-3211): 二分枚举限制条件建图跑2sat求最值

[HDU-3622-Bomb Game](http://acm.hdu.edu.cn/showproblem.php?pid=3622): 也是二分枚举+建图求最值的问题

[HDU-4115](http://acm.hdu.edu.cn/showproblem.php?pid=4115): 不是单纯的全为矛盾项的2sat，其中还有一些必选项，例如选a就必须选b的情况（可以转化成矛盾项做，也可以直接利用这个条件建图（麻烦一点））

[poj-3678-Katu Puzzle](http://poj.org/problem?id=3678): 加必选边建图跑2sat判断是否有解（这题很好）

[处女座与宝藏](https://ac.nowcoder.com/acm/contest/327/F): 2sat判断是否有解，建图的思想很不错，没有像前面那几道题那么直白的告诉你限制条件

[D. The Door Problem](https://codeforces.com/contest/776/problem/D)： 和宝藏那题一样，，

## 二分图

[hdu-2063过山车](http://acm.hdu.edu.cn/showproblem.php?pid=2063): 二分图简单的模板题
