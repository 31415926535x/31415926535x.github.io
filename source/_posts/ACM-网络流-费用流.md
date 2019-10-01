---
title: ACM-网络流-费用流
date: 2019-08-03 09:52:59
tags:
---

费用流就是网络流的一个变形，，，平常的网络流就是一个只有流量的网络，，如果限制每一个边的流量有一个单位的费用，，要求一个最大流的同时保证费用的最小（大）就是费用流的解法，，，除了kaungbin板子上的两个费用流的解法，，uestc在多校的一道题的标程使用 dijkstra 实现的，，貌似时效性不错，，记录一下，，

<!-- more -->

# spfa

巨慢，，，（也不一定，，，反正网络流的题板子的复杂度都是 $O(玄学)$ ，，，

```cpp
struct edge
{
    int to, nxt;
    ll cap, flow, cost;
}edge[maxm << 1];
int tot, head[maxm << 1];
void init()
{
    tot = 0;
    memset(head, -1, sizeof head);
}
void addedge(int u, int v, ll cap, ll cost)
{
    edge[tot].to = v; edge[tot].cap = cap; edge[tot].cost = cost; edge[tot].flow = 0;
    edge[tot].nxt = head[u]; head[u] = tot++;
    edge[tot].to = u; edge[tot].cap = 0; edge[tot].cost = -cost; edge[tot].flow = 0;
    edge[tot].nxt = head[v]; head[v] = tot++;
}
ll dis[maxn];int pre[maxn];
bool vis[maxn];
bool spfa(int s, int t, int n)
{
    queue<int> q;
    for(int i = 0; i <= n; ++i)
    {
        dis[i] = linf;
        vis[i] = false;
        pre[i] = -1;
    }
    while(!q.empty())q.pop();
    dis[s] = 0;
    vis[s] = true;
    q.push(s);
    while(!q.empty())
    {
        int u = q.front(); q.pop();
        vis[u] = false;
        for(int i = head[u]; ~i; i = edge[i].nxt)
        {
            int v = edge[i].to;
            if(edge[i].cap > edge[i].flow && dis[u] + edge[i].cost < dis[v])
            {
                dis[v] = dis[u] + edge[i].cost;
                pre[v] = i;
                if(!vis[v])
                {
                    vis[v] = true;
                    q.push(v);
                }
            }
        }
    }
    if(pre[t] == -1)return false;
    return true;
}
void MinCostMaxFlow(int s, int t, int n, ll &cost, ll &flow)
{
    cost = flow = 0;
    while(spfa(s, t, n))
    {
        ll min = linf;
        for(int i = pre[t]; ~i; i = pre[edge[i ^ 1].to])
            if(min > edge[i].cap - edge[i].flow)
                min =  edge[i].cap - edge[i].flow;
        for(int i = pre[t]; ~i; i = pre[edge[i ^ 1].to])
        {
            edge[i].flow += min;
            edge[i ^ 1].flow -= min;
            cost += edge[i].cost * min;
        }
        flow += min;
    }
}
```

# zkw

还好，，比spfa快多了

建图的点减一，从零开始

```cpp
struct Edge
{
    int to, nxt;
    ll cap, flow, cost;
    Edge(){}
    Edge(int _to, int _nxt, ll _cap, ll _flow, ll _cost):to(_to), nxt(_nxt), cap(_cap), flow(_flow), cost(_cost){}
}edge[maxm];
struct ZkwMinCostMaxFlow
{
    int tot, head[maxn];
    void init()
    {
        tot = 0;
        memset(head, -1, sizeof head);
    }
    void addedge(int u, int v, int c, int w)
    {
        edge[tot] = Edge(v, head[u], c, 0, w);
        head[u] = tot++;
        edge[tot] = Edge(u, head[v], 0, 0, -w);
        head[v] = tot++;
    }
    int s, t; ll dis[maxn], cur[maxn];
    int n; ll MaxFlow, MinCost;
    bool vis[maxn];
    ll aug(int u, ll flow)
    {
        if(u == t)return flow;
        vis[u] = true;
        for(int i = cur[u]; ~i; i = edge[i].nxt)
        {
            int v = edge[i].to;
            if(edge[i].cap > edge[i].flow && !vis[v] && dis[u] == dis[v] + edge[i].cost)
            {
                ll tmp = aug(v, min(flow, edge[i].cap - edge[i].flow));
                edge[i].flow += tmp;
                edge[i ^ 1].flow -= tmp;
                cur[u] = i;
                if(tmp)return tmp;
            }
        }
        return 0;
    }
    bool ModifyLabel()
    {
        ll d = linf;
        for(int u = 0; u < n; ++u)
        {
            if(vis[u])
            {
                for(int i = head[u]; ~i; i = edge[i].nxt)
                {
                    int v = edge[i].to;
                    if(edge[i].cap > edge[i].flow && !vis[v])
                    {
                        d = min(d, dis[v] + edge[i].cost - dis[u]);
                    }
                }
            }
        }
        if(d == linf)return false;
        for(int i = 0; i < n; ++i)
        {
            if(vis[i])
            {
                vis[i] = false;
                dis[i] += d;
            }
        }
        return true;
    }
    void MinCostMaxFlow(int _s, int _t, int _n, ll &flow, ll &cost)
    {
        s = _s; t = _t; n = _n;
        MinCost = MaxFlow = 0;
        for(int i = 0; i <= n; ++i)dis[i] = 0;
        while(true)
        {
            for(int i = 0; i < n; ++i)cur[i] = head[i];
            while(true)
            {
                for(int i = 0; i < n; ++i)vis[i] = false;
                ll tmp = aug(s, linf);
                if(tmp == 0)break;
                MaxFlow += tmp;
                MinCost += tmp * dis[s];
            }
            if(!ModifyLabel())break;
        }
        flow = MaxFlow; cost = MinCost;
    }  
};
```


# dijkstra

效率较好，，不一定

还有最大费用最小流的求法

```cpp
struct MinCostMaxFlow
{
    int n, h[maxn], dis[maxn], prev[maxn], pree[maxn];
    struct edge
    {
        int to, nxt, cap, cost;
        edge(){}
        edge(int _to, int _nxt, int _cap, int _cost):to(_to), nxt(_nxt), cap(_cap), cost(_cost){}
    };
    vector<edge> g[maxn];
    MinCostMaxFlow(int _n)
    {
        n = _n;
        for(int i = 0; i <= n; ++i)g[i].clear();
    }
    void addedge(int u, int v, int w, int c)
    {
        cout << u << " " << v << " " << w << " " << c << endl;
        g[u].push_back(edge(v, g[v].size(), w, c));
        g[v].push_back(edge(u, g[u].size() - 1, 0, -c));
    }
    void mincostmaxflow(int s, int t, ll f, ll &flow, ll &cost)
    {
        flow = cost = 0;fill(h, h + n + 1, 0);
        while(f)
        {
            priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>> > q;
            fill(dis, dis + n + 1, inf);
            dis[s] = 0;
            q.push(pair<int, int>(0, s));
            while(!q.empty())
            {
                pair<int, int> u = q.top(); q.pop();
                int v = u.second;
                if(dis[v] < u.first)continue;
                for(int i = 0; i < g[v].size(); ++i)
                {
                    edge &e = g[v][i];
                    if(e.cap > 0 && dis[e.to] > dis[v] + e.cost + h[v] - h[e.to])
                    {
                        dis[e.to] = dis[v] + e.cost + h[v] - h[e.to];
                        prev[e.to] = v;
                        pree[e.to] = i;
                        q.push(pair<int, int>(dis[e.to], e.to));
                    }
                }
            }
            if(dis[t] == inf)break;
            for(int i = 0; i <= n; ++i)h[i] += dis[i];
            int d = f;
            for(int v = t; v != s; v = prev[v])d = min(d, g[prev[v]][pree[v]].cap);
            f -= d; flow += d; cost += d * h[t];
            for(int v = t; v != s; v = prev[v])
            {
                edge &e = g[prev[v]][pree[v]];
                e.cap -= d;
                g[v][e.nxt].cap += d;
            }
        }
    }
    void maxcostmaxflow(int s, int t, int f, int &flow, int &cost)
    {
        flow = cost = 0;
        fill(h, h + n + 1, 0);
        while(f)
        {
            priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>> >q;
            fill(dis, dis + n + 1, -inf);
            dis[s] = 0;
            q.push(pair<int, int>(0, s));
            while(!q.empty())
            {
                pair<int, int> u = q.top(); q.pop();
                int v = u.second;
                if(dis[v] > u.first)continue;
                for(int i = 0; i < g[v].size(); ++i)
                {
                    edge &e = g[v][i];
                    if(e.cap > 0 && dis[e.to] < dis[v] + e.cost + h[v] - h[e.to])
                    {
                        dis[e.to] = dis[v] + e.cost + h[v] - h[e.to];
                        prev[e.to] = v;
                        pree[e.to] = i;
                        q.push(pair<int, int>(dis[e.to], e.to));
                    }
                }
            }
            if(dis[t] == -inf)break;
            for(int i = 0; i <= n; ++i)h[i] += dis[i];
            int d = f;
            for(int v = t; v != s; v = prev[v])d = min(d, g[prev[v]][pree[v]].cap);
            f -= d; flow += d; cost += d * h[t];
            for(int v = t; v != s; v = prev[v])
            {
                edge &e = g[prev[v]][pree[v]];
                e.cap -= d;
                g[v][e.nxt].cap += d;
            }
        }
    }
};
```


# 例题

这道题是杭电多校的一道网络流签到题，，没有写过网络流24题和费用流，，，当时没有看出来，，即使知道是费用流也不知道怎么搞，，，

题意是给你一个数组，，然后可以最多选出k个上升子序列，，每个数只能选择一次，，然后问你最大的选择的和是多少，，，

这题的模型来自网络流中的一个 **最长上升子序列** 的模型，，这个模型可以解决一个数组中长度为最长的lis的个数，，当不限制某些数的选择次数也可以得到其答案，，

这题借用了这个建图的思想，，首先要保证每个数只用一次，，所以肯定要拆点，，，容量为1，对于两个点 $i, j$ 满足 $a[i] <= a[j] \ \&\& \ i < j$ 的两点可以建一条边，，容量为1，这样一条路径就是一个上升子序列，，，，但是因为我们要选择尽可能大的和，，所以可以看成选择这个点的一个费用，，这样选择一些点的权值和就是费用和，，，因为要取最大的权值和，，，可以反着想：取费用的相反数，，使费用最小即可，，，这样就可以用费用流解决，，

最后，题目要保证最多取k个，，只要保证最大流是k即可，，，也就是源点拆点，，容量为k，，，汇点也这样处理一下就行了，，，


```cpp
#include <bits/stdc++.h>
#define aaa cout<<233<<endl;
#define endl '\n'
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef long double ld;
// mt19937 rnd(time(0));
const int inf = 0x3f3f3f3f;//1061109567 > 1e9
const ll linf = 0x3f3f3f3f3f3f3f3f;
const double eps = 1e-6;
const double pi = 3.14159265358979;
const int maxn = 1e4 + 5;
const int maxm = 1e6 + 233;
const int mod = 1e9 + 7;

struct MinCostMaxFlow
{
    int n, h[maxn], dis[maxn], prev[maxn], pree[maxn];
    struct edge
    {
        int to, nxt, cap, cost;
        edge(){}
        edge(int _to, int _nxt, int _cap, int _cost):to(_to), nxt(_nxt), cap(_cap), cost(_cost){}
    };
    vector<edge> g[maxn];
    MinCostMaxFlow(int _n)
    {
        n = _n;
        for(int i = 0; i <= n; ++i)g[i].clear();
    }
    void addedge(int u, int v, int w, int c)
    {
        g[u].push_back(edge(v, g[v].size(), w, c));
        g[v].push_back(edge(u, g[u].size() - 1, 0, -c));
    }
    void mcmf(int s, int t, ll f, ll &flow, ll &cost)
    {
        flow = cost = 0;fill(h, h + n + 1, 0);
        while(f)
        {
            priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>> > q;
            fill(dis, dis + n + 1, inf);
            dis[s] = 0;
            q.push(pair<int, int>(0, s));
            while(!q.empty())
            {
                pair<int, int> u = q.top(); q.pop();
                int v = u.second;
                if(dis[v] < u.first)continue;
                for(int i = 0; i < g[v].size(); ++i)
                {
                    edge &e = g[v][i];
                    if(e.cap > 0 && dis[e.to] > dis[v] + e.cost + h[v] - h[e.to])
                    {
                        dis[e.to] = dis[v] + e.cost + h[v] - h[e.to];
                        prev[e.to] = v;
                        pree[e.to] = i;
                        q.push(pair<int, int>(dis[e.to], e.to));
                    }
                }
            }
            if(dis[t] == inf)break;
            for(int i = 0; i <= n; ++i)h[i] += dis[i];
            int d = f;
            for(int v = t; v != s; v = prev[v])d = min(d, g[prev[v]][pree[v]].cap);
            f -= d; flow += d; cost += d * h[t];
            for(int v = t; v != s; v = prev[v])
            {
                edge &e = g[prev[v]][pree[v]];
                e.cap -= d;
                g[v][e.nxt].cap += d;
            }
        }
    }
};
int n, a[maxn], k, t;
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);

    cin >> t;
    while(t--)
    {
        cin >> n >> k;
        for(int i = 1; i <= n; ++i)cin >> a[i];
        // MinCostMaxFlow mcmf((n + 1) << 1);
        // int s = 0, ss = (n << 1) + 3;
        int s = 0, ss = (n + 1) << 1;
        int t = (n + 1) << 1 | 1;
        MinCostMaxFlow mcmf(t + 1);
        mcmf.addedge(s, ss, k, 0);
        for(int i = 1; i <= n; ++i)mcmf.addedge(ss, i, 1, 0);
        for(int i = 1; i <= n; ++i)
            for(int j = i + 1; j <= n; ++j)
                if(a[i] <= a[j])
                    mcmf.addedge(i + n, j, 1, 0);
        for(int i = 1; i <= n; ++i)mcmf.addedge(i, i + n, 1, -a[i]);
        for(int i = 1; i <= n; ++i)mcmf.addedge(i + n, t, 1, 0);
        mcmf.addedge(t, t + 1, k, 0);
        ll flow, cost;
        flow = cost = 0;
        mcmf.mcmf(s, t + 1, inf, flow, cost);
        cout << cost * -1 << endl;
    }
    
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```