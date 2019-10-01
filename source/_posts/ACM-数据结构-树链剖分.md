---
title: ACM-数据结构-树链剖分
date: 2019-03-24 11:37:34
tags:
- acm
- 笔记
categories:
- ACM-数据结构-树链剖分
---

据学长说，树链剖分在acm比赛上不怎么看到过，我搜到的博客也都是几年前的东西，不过已经看过了，，还是记录一下把，，

<!-- more -->

我是从[这里看的树链剖分](http://blog.sina.com.cn/s/blog_6974c8b20100zc61.html)的内容，，[还有这个](https://blog.csdn.net/dyx404514/article/details/8718249)

看了几遍，大致知道树链剖分大致是为了解决树上的修改和询问操作的一个工具，，当然一般来说还要一个数据结构例如线段树什么的维护一下，，

以后忘了的话就再看那篇博客吧，，，反正知道这是个啥，怎么用就行了，，

[杭电3966](http://acm.hdu.edu.cn/showproblem.php?pid=3966)

这个是修改点权的

```cpp
#include <bits/stdc++.h>
// #include <iostream>
// #include <cstdio>
// #include <cstdlib>
// #include <string.h>
// #include <vector>
// #include <queue>
#include <stack>
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

struct edge
{
    int to, next;
}edge[maxn];
int tot, head[maxn];

void addedge(int u, int v)
{
    edge[tot].to = v;
    edge[tot].next = head[u];
    head[u] = tot++;
}

int fa[maxn];   //fa[v] 表示v的父亲节点
int dep[maxn];  //dep[v] 表示v的深度
int son[maxn];  //son[v] 表示与v同一条重链上的儿子节点
int num[maxn];  //num[v] 表示以v为根的子树的节点数
int p[maxn];    //p[v] 表示v在树状数组中的位置
int fp[maxn];   //fp[v] 与p[v]相反，即v == fp[p[v]]
int top[maxn];  //top[v] 表示v所在重链的顶端节点
int pos;

void init()
{
    tot = 0;
    memset(head, -1, sizeof head);
    pos = 1;    //树状数组
    memset(son, -1, sizeof son);
}

void dfs1(int u, int pre)
{
    dep[u] = dep[pre] + 1;
    fa[u] = pre;
    num[u] = 1;
    for(int i = head[u]; ~i; i = edge[i].next)  //遍历所有与u相连的节点
    {
        int v = edge[i].to;
        if(v != pre)                            //对于u的父亲节点不处理
        {
            dfs1(v, u);
            num[u] += num[v];
            if(son[u] == -1 || num[v] > num[son[u]])
                son[u] = v;
        }
    }
}
void dfs2(int u, int sp)
{
    top[u] = sp;            //设置u所在重链的顶端节点
    p[u] = pos++;           //确定u在线段树等数据结构中所维护的数组的位置
    fp[p[u]] = u;           //确定上面那个数组中每个位置所代表的节点
    if(!~son[u])return;
    dfs2(son[u], sp);       //将在一条重链的节点放在那个数组相邻的位置，连续分布
    for(int i = head[u]; ~i; i = edge[i].next)
    {
        int v = edge[i].to;
        if(v != son[u] && v != fa[u])   //对于u除了父亲节点和它所在重链上的儿子的点，一定是旁边轻链上的起始点，所以那条以v开头的轻链的top[v]=v
            dfs2(v, v);
    }
}

inline int lowbit(int x)
{
    return x & (-x);
}

int c[maxn];
int n, m, pp;
int sum(int i)
{
    int s = 0;
    while(i > 0)
    {
        s += c[i];
        i -= lowbit(i);
    }
    return s;
}
void add(int i, int val)
{
    while(i <= n)
    {
        c[i] += val;
        i += lowbit(i);
    }
}
void change(int u, int v, int val)
{
    //改变u->v路径上的点值
    int f1 = top[u];    
    int f2 = top[v];
    int tmp = 0;
    while(f1 != f2)
    {
        if(dep[f1] < dep[f2])
        {
            swap(f1, f2);
            swap(u, v);
        }
        add(p[f1], val);
        add(p[u] + 1, -val);
        u = fa[f1];
        f1 = top[u];
    }
    if(dep[u] > dep[v])swap(u, v);
    add(p[u], val);
    add(p[v] + 1, -val);
}
int a[maxn];
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
    // ios_base::sync_with_stdio(0);
    // cin.tie(0);cout.tie(0);
    while(~scanf("%d%d%d", &n, &m, &pp))
    {
        init();
        for(int i = 1; i <= n; ++i)scanf("%d", &a[i]);
        int u, v;
        for(int i = 1; i <= m; ++i)
        {
            scanf("%d%d", &u, &v);
            addedge(u, v);
            addedge(v, u);
        }
        dfs1(1, 0);
        dfs2(1, 1);
        memset(c, 0, sizeof c);
        for(int i = 1; i <= n; ++i)
        {
            add(p[i], a[i]);
            add(p[i] + 1, -a[i]);
        }
        char op;
        int c1, c2, k;
        while(pp--)
        {
            scanf(" %c", &op);
            if(op == 'Q')
            {
                scanf("%d", &u);
                printf("%d\n", sum(p[u]));
            }
            else
            {
                scanf("%d%d%d", &c1, &c2, &k);
                if(op == 'D')k = -k;
                change(c1, c2, k);
            }
        }

    }
    return 0;    
}
```

