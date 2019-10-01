---
title: 网络流-预流推进 和 最高标号预流推进HLPP
date: 2019-08-02 11:48:40
tags:
---


2019.8.2。。。。。于是，去年的网络流的后续学习就这么的拖到了一年后的今天，，曾经的懒，如今的泪，，几次校赛出现的网络流签到题都因为曾今没有好好的刷题，空有一身概念而没有实际的做题经验，面对经典模板题无从下手，，没办法，欠下的总要找时间补，，于是，，，，

<!-- more -->


下面的内容部分借鉴 [这篇博客](https://www.luogu.org/blog/ONE-PIECE/jiu-ji-di-zui-tai-liu-suan-fa-isap-yu-hlpp) 以及 [这篇博客](https://www.luogu.org/blog/105496/solution-p4722)

# 预流推进算法

网络流的解法



```cpp
#include <bits/stdc++.h>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef long double ld;
// mt19937 rnd(time(0));
const int inf = 0x3f3f3f3f;//1061109567 > 1e9
const ll linf = 0x3f3f3f3f3f3f3f3f;
const double eps = 1e-7;
const double pi = 3.14159265358979;
const int maxn = 1e4 + 5;
const int maxm = 1e6 + 5;
const int mod = 1e9 + 7;

template<int MAXN, class T = int>
struct HLPP
{
    const T INF = numeric_limits<T>::max();
    struct edge
    {
        int to, nxt;
        T flow;
        edge(int _to, int _nxt, T _flow):to(_to), nxt(_nxt), flow(_flow){}
    };
    int s = MAXN - 1, t = MAXN - 2;
    vector<edge> g[MAXN];
    deque<int> lst[MAXN];
    vector<int> gap[MAXN];
    int ptr[MAXN];
    T excess[MAXN];
    int highest, height[MAXN], cnt[MAXN], work;
    void addedge(int u, int v, T flow, bool isDirected = true)
    {
        g[u].push_back(edge(v, g[v].size(), flow));
        g[v].push_back(edge(u, g[u].size() - 1, isDirected ? 0 : flow));
    }
    void upHeight(int v, int nh)
    {
        ++work;
        if(height[v] != MAXN)--cnt[height[v]];
        height[v] = nh;
        if(nh == MAXN)return;
        ++cnt[nh]; highest = nh;
        gap[nh].push_back(v);
        if(excess[v] > 0)lst[nh].push_back(v), ++ptr[nh];
    }
    void globalRelabel()
    {
        work = 0;
        fill(begin(height), end(height), MAXN);
        fill(begin(cnt), end(cnt), 0);
        for(int i = 0; i <= highest; ++i)lst[i].clear(), gap[i].clear();
        height[t] = 0;
        queue<int> q({t});
        while(!q.empty())
        {
            int v = q.front(); q.pop();
            for(auto &e: g[v])
                if(height[e.to] == MAXN && g[e.to][e.nxt].flow > 0)
                    q.push(e.to), upHeight(e.to, height[v] + 1);
            highest = height[v];
        }
    }
    void push(int v, edge &e)
    {
        if(excess[e.to] == 0)lst[height[e.to]].push_back(e.to), ++ptr[height[e.to]];
        T df = min(excess[v], e.flow);
        e.flow -= df; g[e.to][e.nxt].flow += df;
        excess[v] -= df; excess[e.to] += df;
    }
    void discharge(int v)
    {
        int nh = MAXN;
        for(auto &e: g[v])
        {
            if(e.flow > 0)
            {
                if(height[v] == height[e.to] + 1)
                {
                    push(v, e);
                    if(excess[v] <= 0)return;
                }
                else 
                    nh = min(nh, height[e.to] + 1);
            }
        }
        if(cnt[height[v]] > 1)upHeight(v, nh);
        else
        {
            for(int i = height[v]; i < MAXN; ++i)
            {
                for(auto j: gap[i])upHeight(j, MAXN);
                gap[i].clear(); ptr[i] = 0;
            }
        }
    }
    T MaxFlow(int heur_n = MAXN)
    {
        fill(begin(excess), end(excess), 0);
        excess[s] = INF; excess[t] = -INF;
        globalRelabel();
        for(auto &e: g[s])push(s, e);
        for(; highest >= 0; --highest)
        {
            while(!lst[highest].empty())
            {
                int v = lst[highest].back();
                lst[highest].pop_back();
                discharge(v);
                if(work > heur_n << 2)globalRelabel();
            }
        }
        return excess[t] + INF;
    }
};

HLPP<maxn, int> hlpp;
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
  
    int n, m, s, t;
    cin >> n >> m >> s >> t;
    hlpp.s = s; hlpp.t = t;
    int u, v; ll f;
    for(int i = 1; i <= m; ++i)
    {
        cin >> u >> v >> f;
        hlpp.addedge(u, v, f, true);
    }
    cout << hlpp.MaxFlow() << endl;

    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```