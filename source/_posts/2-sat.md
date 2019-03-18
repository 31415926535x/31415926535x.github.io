---
title: 2-sat
date: 2019-02-13 00:45:38
tags:
- acm
- 刷题
categories:
- ACM-图论-2-SAT
---

# 概述

2-sat是k-sat问题中k==2时的一种情况，，（废话qaq，，

当k大于等于3时是npc问题，，所以一般都是问的2-sat，，

这种题的大概形式是： 对于给定的n对的点，要求每一对都只能选择一个，并且其中还有一些限制条件，比如说选了u就不能选择v等等，，

然后问你有没有可行解，，，

解决这类问题一般是用 **染色法（求字典序最小的解）** 和 **强连通分量法（拓扑排序只能得到任意解）**，，

<!-- more -->

# 算法分析

+ 首先要明白一个道理：对于 ``u->v``（选择u就不能选择v）这样的限制条件可以用它的逆否命题来转换为：``u->v'``（选择u就必须选v'）以及 ``v->u'``（选择v就必须选u'）
+ 最后的建出的图是对称的，，
+ [具体的数学证明和算法推导看这里](https://wenku.baidu.com/view/afd6c436a32d7375a41780f2.html) 和 [kuangbin的博客](https://www.cnblogs.com/kuangbin/archive/2012/10/05/2712429.html)，，多看几遍，，跟着敲一遍代码后再看看就差不多懂了


## 染色法（求字典序最小的解）

这个算法的大致思路就是遍历每一对点的两种情况：选p或者选p'，，，

然后一直从p的下一个尝试下去，，中间若是碰到不能避免的不满足题意的选择时，证明这条路下来的尝试时不行的，，重新选择，，一直下去。。。也就是一个深搜的过程，，时间复杂度大概是 $O(nm)$，，

[可以看看这篇博客，，](https://www.cnblogs.com/L-Excalibur/p/8504893.html)

## 强连通分量法（拓扑排序只能得到任意解）

这个算法的流程为：

+ 建图
+ 求极大联通分量（子图）
+ 缩点，转化成DAG（有向无环图）
+ 判断有无解
+ 新图拓扑排序
+ 自底向上选择、删除
+ 输出

时间复杂度大概为 $O(m)$，，就是难写，，而且不能输出字典序小的解，，，

## 例题和模板

[这道模板题](http://acm.hdu.edu.cn/showproblem.php?pid=1814)，，让输出的书字典序小的解，，，只能用第一种方法了，，，

题意和上面那个[百度文库](https://wenku.baidu.com/view/afd6c436a32d7375a41780f2.html)的例题一样，，，


```cpp
//#include <bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string.h>
#include <vector>
#include <queue>
#include <functional>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
const int inf = 0x3f3f3f3f;//1061109567
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-6;
const double pi = 3.14159265358979;
const int maxn = 1e5 + 5;
const int maxm = 2e5 + 5;
const int mod = 1e9 + 7;
inline ll read() {
    char c = getchar(); int x = 0, f = 1;
    while(c < '0' || c > '9') {if(c == '-') f = -1; c = getchar();}
    while(c >= '0' && c <= '9') x = x * 10 + c - '0', c = getchar();
    return x * f;
}

//2sat_kuangbin
struct edge
{
    int to, next;
}edge[maxn];
int head[maxn], tot;
void init()
{
    tot = 0;
    memset(head, -1, sizeof head);
}
void addedge(int u, int v)
{
    edge[tot].to = v; edge[tot].next = head[u]; head[u] = tot++;
}
bool vis[maxn];
int s[maxn], top;
bool dfs(int u)
{
    if(vis[u^1])return false;       //如果这个点p的对立面p'选了，那么这个点就不选
    if(vis[u])  return true;        //如果这个点已经选了，就不从这个点继续向下找了
    vis[u] = true;                  //这个点p没选并且对立面p'没选的情况下，选择这个点，并且尝试从这个点寻找可能的解法
    s[top++] = u;                   //把这个可能的一种情况压栈，保存
    for(int i = head[u]; ~i; i = edge[i].next)
        if(!dfs(edge[i].to))
            return false;           //尝试所有与点u相连的点v，如果从点v出发的尝试不可行时不选
    return true;
}
bool two_sat(int n)
{
    memset(vis, false, sizeof vis); //vis[i]标记那些点要选
    for(int i = 0; i < n; i += 2)
    {
        if(vis[i] || vis[i^1])continue;//如果这一对点有一个选过就尝试下一对的点
        top = 0;
        if(!dfs(i))                 //如果从点i出发的尝试不行，就将栈中所有这条可能的路径上的点标记为未选
        {
            while(top)vis[s[--top]] = false;
            if(!dfs(i^1))return false;//如果点i的对立面i'都不行的话，证明无法找到这样一条可行解，使得每一对点仅选择一个并且满足对应的限制
        }
    }
    return true;
}
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    int n, m, u, v;
    while(scanf("%d%d", &n, &m) != EOF)
    {
        init();
        for(int i = 1; i <= m; ++i)
        {
            scanf("%d%d", &u, &v);
            --u;--v;        //点的编号从0开始，方便使用p^1来表示p的对立面
            addedge(u, v^1);//建图，限制条件u->v（选择u就不能选择v）等价于u->v' && v->u' （选择u必须选额v' 和 选择v就必须选择u'）
            addedge(v, u^1);
        }
        if(two_sat(2 * n))  //存在解时
        {
            for(int i = 0; i < 2 * n; ++i)
                if(vis[i])  //将最后字典序最小的可行解输出
                    printf("%d\n", i + 1);
        }
        else
            printf("NIE\n");
    }
    return 0;
}
```

强连通分量的方法明天，啊不白天再说吧，，，溜了溜了

(loading)