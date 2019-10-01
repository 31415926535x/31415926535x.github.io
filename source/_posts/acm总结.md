---
title: acm总结
date: 2018-12-15 20:23:58
tags:
- acm
- 刷题
categories:
- acm
---

# 概述

入的坑久了，，接触到的算法就多了起来，，做的题也多了，，但是记性却一点一不好

渐渐发现好多题当时弄懂了，，代码也写好了，，博客上做了笔记，，可是最后随着时间的推移，，再熟悉的算法，模型，套路也忘记了，，再去翻之前的文章有太费事，，

所以这篇文章主要是记录一下见到的每种算法以及解法思路，，为了以后忘记了能够快速想起来，，同时也是其一个记录的功能吧(っ・Д・)っ

大致的格式就是“算法->题目->思路",,,,

貌似是一个大坑Σ(*ﾟдﾟﾉ)ﾉ

<!-- more -->


# 正文

## 各种树

### 线段树

#### 一般的线段树

#### 带区间延迟更新的线段树

#### 非递归的线段树

#### 可持久化线段树（这个还没看QAQ)

#### 树状数组

+ 貌似树状数组的常数比线段树的常数小，，有些卡常数的题可能换树状数组好一些（区间更新没看）QAQ


## 图论

### 存图的方法

#### 邻接矩阵：

```cpp
//直接一个二维矩阵，edge[u][v]表示边u->v的权值
int edge[maxn][maxn];
```

#### 邻接表

```cpp
//这种用的很多
//1.
struct edge
{
    int v;
    int c;
    edge(int _v, int _c = 0):v(_v), c(_c){}
};
vector<edge> e[maxn];
void addedge(int u, int v, itn w)
{
    e[u].push_back(edge(v, w));
}

//2.
//适合无权的图
vector<pair<int, int> > edge;
//addedge:
edge.push_back(make_pair(u, v));
//遍历
for(size_t i = 0; i < edge.size(); ++i)
{
    int u = edge[i].first;
    int v = edge[i].second;
    ...
}

//3.
vector<int> edge[maxn];
```

#### 链式前向星

```cpp
//这种很多的板子都是用这个是实现的
struct edge
{
    int to, next, cap, flow;
}edge[maxn];
int tol;
int head[maxn];
void init()
{
    tol = 0;
    memset(head, -1, sizeof head);
}
void addedge(int u, int v, int w, int rw = 0)
{
    edge[tol].to = v; edge[tol].cap = w; edge[tol].flow = 0;
    edge[tol].next = head[u]; head[u] = tol++;
    ...
}
//遍历
for(int u = 1; u <= n; ++i)
    for(int i = head[u]; ~i; i = edge[i].next)
    {
        int v = edge[i].to;
        ...
    }
```

### 最短路

+ 主要算法有dijkstra , bellmon , spfa , floyd
+ spfa据说会退化到$O(n^2)$(有待求证)
+ floyd可以求矩阵、图的传递闭包[here](https://vjudge.net/contest/261463#status/31415926535x/I/0/)
+ 前面那三个算法都是求得单源最短路，，也就是一个点到一堆点的最短路,，，而要求一堆点到一个点的最短路可以将路径反向后跑一边单源最短路，，也就是求逆图的最短路，，，存图的方法选择邻接矩阵好一些，，，[here](https://blog.csdn.net/zwj1452267376/article/details/50518209)

### 网络流

#### 最大流最小割

+ 解决最大流的常用算法：dinic , sap , isap,,,记得敲板子认真，，，异或取边，，遍历边等等
+ 最大流最小割定理：一个网络的最大流也等于其最小割；

#### 最大权闭合子图

+ 一般是求n选一可以得到一些利益而在一些特殊情况下可以得到更多的利益的问题就可能使用网络流求解，，对于冲突情况的处理是添加一条inf的边，，如果正向不好求那么反向求，，总收益渐去最小代价，，也就是最大权闭合子图的问题，，[例题1](https://www.luogu.org/problemnew/solution/P4313),,[例题2](https://codeforces.com/contest/1082/submission/47022828),,,

### 强连通分量

+ 解决强连通分量的通常算法为Tarjan，Kosaraju不怎么用
+ 使用强连通分量的主要用途除了求图的强连通分量（将同一分量的点染色为同一个编号的点）外，可以先求图的强连通分量后“缩点”（编号相同的看作一点），将原图转化为DAG图（有向无环图）；
+ [例题1](http://poj.org/problem?id=2186)，，

## 数论


## 特殊的算法


## codeforces上的

### 思想

+ 二进制甚至是n进制的思想，很重要啊，，bitmarks[就比如说这个](https://codeforces.com/contest/1117/problem/E)
+ 线性递推方程可以使用 **矩阵快速幂加速** 或者直接上 **杜教筛**,,[例如](https://codeforces.com/contest/1117/problem/D)

## 奇技淫巧

### stl

#### vector

vector<int> a;

+ sort(a.begin(), a.end()); //升序排序
+ sort(a.rbegin(), a.rend()); //降序排序

#### lower_bound(), upper_bound()，，

二分查找值的上下界，，

### 读入问题上

#### 快读

```cpp
inline int read()   //快读
{
    ll ans=0;
    char ch=getchar();
    while(!isdigit(ch))
        ch=getchar();
    while(isdigit(ch))
        ans=(ans<<3)+(ans<<1)+(ch^48),ch=getchar();
    return ans;
}
```
#### 标准读入

+ 要么就只用 ``scanf()`` 和 ``printf()``
+ 要么就用关闭同步的 ``cin`` 和 ``cout``

```cpp
ios_base::sync_with_stdio(0);
cin.tie(0);cout.tie(0);
```
