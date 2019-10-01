---
title: ACM-网络流-网络流24题
date: 2019-08-04 15:56:15
tags:
---


[所有题目](https://loj.ac/problems/tag/30,6)

[参考](https://www.cnblogs.com/xseventh/p/7912202.html)

曾经放弃的网络流，，没想到前期的多校每次都是一道签到题，，，emmmmm，，，，不得不去补一下这些经典的网络流模型，，，

图论题大多数都是以建图为主，，建图的一大部分都是依靠已有的模型来搞得，，，

|题目|模型|转化模型|
|:--:|:--:|:--:|
|搭配飞行员|二分图最大匹配|最大流|
|太空飞行计划|最大权闭合子图|最大流最小割|
|最小路径覆盖|有向无环图的最小路径覆盖|拆点、最大流|
|魔术球|有向无环图的最小路径覆盖|拆点、最大流或贪心|
|圆桌聚餐|二分图多重匹配|最大流|
|最长递增子序列问题|最多不相交路径|网络最大流|
|试题库|二分图多重匹配|网络最大流|
|方格取数问题|二分图点权最大独立集|网络最小割|
|数字梯形问题|最大权不相交路径|最小费用最大流|


<!-- more -->


# [搭配飞行员](https://loj.ac/problem/6000)

[搭配飞行员](https://loj.ac/problem/6000)

网络流拆点建图或者二分图最大匹配

ps: 网络流的复杂度真是 $O(玄学)$ ，，某些题最快的板子有时贼慢，，

## 网络流HLPP

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
        if(nh == MAXN) return;
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
  
    int n, m; cin >> n >> m;
    int s = 0, t = n << 1 | 1;
    hlpp.s = s; hlpp.t = t;
    int u, v;
    while(cin >> u >> v)
    {
        hlpp.addedge(s, u, 1);
        hlpp.addedge(u + n, v, 1);
        hlpp.addedge(v + n, t, 1);
    }
    for(int i = 1; i <= n; ++i)hlpp.addedge(i, i + n, 1);
    cout << hlpp.MaxFlow() << endl;

    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

## 二分图hungary

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

struct egde
{
    int to, nxt;
}edge[maxn << 1];
int tot, head[maxn << 1];
void init()
{
    tot = 0;
    memset(head, -1, sizeof head);
}
void addedge(int u, int v)
{
    edge[tot].to = v;
    edge[tot].nxt = head[u];
    head[u] = tot++;
}
int linker[maxn << 1];
bool used[maxn];
int un;
bool dfs(int u)
{
    for(int i = head[u]; ~i; i = edge[i].nxt)
    {
        int v = edge[i].to;
        if(!used[v])
        {
            used[v] = true;
            if(linker[v] == -1 || dfs(linker[v]))
            {
                linker[v] = u;
                return true;
            }
        }
    }
    return false;
}
int hungary()
{
    int res = 0;
    memset(linker, -1, sizeof linker);
    for(int u = 0; u < un; ++u)
    {
        memset(used, false, sizeof used);
        if(dfs(u))++res;
    }
    return res;
}
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
  
    int n, m; cin >> n >> m;
    un = n;
    init();
    int u, v;
    while(cin >> u >> v)addedge(u - 1, v - 1);
    cout << hungary() << endl;
    

    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

 # [太空飞行计划](https://loj.ac/problem/6001)

[太空飞行计划](https://loj.ac/problem/6001)

最大权闭合子图模板题，，

虽然很早之前做过最大权闭合子图的题，，但是当时只是硬几组了当时那几道题的模型： 源点连的点是正点，，汇点连的边是负点，，然后中间的点的容量是正无穷，，，跑最大流最小割，，答案就是正点和和减去最大流，，，题A了之后就不了了之了，，貌似当时也就放弃了网络流，，，去弄别的了，，，

这次再做这种模型的题时，，，虽然知道是这个模型，，最后建出的图也是上面的思路，，但是就是不知道怎么建，，，问题不能抽象出来，，

后来在洛谷和[cf的G题题解](https://codeforces.com/blog/entry/63544)看到了一个关于这模型简单理解：想像这样一个问题，，有一些工程，每完成一个工程都可以获得一定的收益，，而每一个工程需要一些工具才能完成，，每购买一个工具会有一个花费，，然后问你选择一些工程以及购买相应的工具后的最大收益，，，显然收益的值是正的，，也就对应上面的正点，，购买工具的花费是负的，，对应的就是负点，，每一项工程里所需的工具连边为无穷，，这样就建出一个左边是一排工程，右边是所有的工具的图，，

![](https://cdn.luogu.org/upload/pic/21712.png)

为什么要跑最大流呢，，，最大流等于最小割，，最小割也就是砍掉一些边用最小的花费来使源汇点处于两个不相交的集合，，，这样我们相当于最后的最优解就是S点集的工程以及对应的工具，，，最小割割集中一部分是丢弃的工程一部分是选择的工具，，这样用所有可能的收益，，也就是工程的边权和减去最小割就是最后的最大的收益，，，


至于怎么求S集中的点，，dinic等增广路算法中可以在遍历一遍残留网络，，能从s到达的点就是S集，，，对于hlpp这样的算法应该是和源点高度相同的点即为S集合的点，，（至于为什么，，我也没法证明，，，只是根据我对hlpp和增广路算法中dep数组的理解试了一下，，然后样例过了，，交上去也没问题就这样用了，，，


```cpp
#include <bits/stdc++.h>
#include <algorithm>
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
const int maxn = 1e2 + 5;
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
    //hlpp求割集判断height数组是否和源点的值相等即可，，（待确认
};

HLPP<maxn, int> hlpp;
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    // ios_base::sync_with_stdio(0);
    // cin.tie(0);cout.tie(0);
  
    int m, n; scanf("%d%d", &m, &n);
    hlpp.s = 0; hlpp.t = n + m + 1;
    int sum = 0;
    for(int i = 1; i <= m; ++i)
    {
        int w, u;
        char ch;
        scanf("%d", &w);
        hlpp.addedge(hlpp.s, i, w);
        sum += w;
        while(true)
        {
            scanf("%d%c", &u, &ch);
            hlpp.addedge(i, m + u, inf);
            if(ch == '\n' || ch == '\r')break;
        }
    }
    for(int i = 1; i <= n; ++i)
    {
        int w;cin >> w;
        hlpp.addedge(i + m, hlpp.t, w);
    }
    sum -= hlpp.MaxFlow();
    vector<int> ans1, ans2;
    for(int i = 1; i <= m; ++i)if(hlpp.height[i] == hlpp.height[hlpp.s])ans1.push_back(i);
    for(int i = 1; i <= n; ++i)if(hlpp.height[i + m] == hlpp.height[hlpp.s])ans2.push_back(i);
    if(ans1.size())
    {
        printf("%d", ans1[0]);
        for(int i = 1; i < ans1.size(); ++i)printf(" %d", ans1[i]);
        puts("");
    }
    if(ans2.size())
    {
        printf("%d", ans2[0]);
        for(int i = 1; i < ans2.size(); ++i)printf(" %d", ans2[i]);
        puts("");
    }
    printf("%d", sum);
    

    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

# [最小路径覆盖](https://loj.ac/problem/6002)

[最小路径覆盖](https://loj.ac/problem/6002)

之前准备学二分图以及相关的知识点，，然后因为一些时间原因放弃了，，，，

这道是二分图中的一个概念： 最小路径覆盖，，

最小路径覆盖指的是给你一张图，，然后对于一些简单路的集合P，，，如果这个集合中每一条路径的点的集合正好就是原图的点集的话，，，就说这个P是这个图的一个路径覆盖，，然后路径数最少的一个P就称为 最小路径覆盖，，，

在二分图的学习中，，有这么一个推论： 最小路径覆盖 = 点数 - 最大匹配

这里的最大匹配要在拆点后的图上跑，，这里的拆点是为了保证每找到一个匹配就会将这条边的起点加入到P中，，并且舍弃到其他的从他出发的边，，

[具体的解释可以看这里](https://www.cnblogs.com/qixingzhi/p/9418690.html)


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
const double eps = 1e-7;
const double pi = 3.14159265358979;
const int maxn = 1e4 + 5;
const int maxm = 1e3 + 5;
// const int mod = 1e9 + 7;
const int mod = 998244353;

struct edge
{
    int to, nxt, cap, flow;
}edge[maxn << 1];
int tot, head[maxn];
void init()
{
    tot = 0;
    memset(head, -1, sizeof head);
}
void addedge(int u, int v, int w, int rw = 0)
{
    edge[tot].to = v; edge[tot].cap = w; edge[tot].flow = 0;
    edge[tot].nxt = head[u]; head[u] = tot++;
    edge[tot].to = u; edge[tot].cap = rw; edge[tot].flow = 0;
    edge[tot].nxt = head[v]; head[v] = tot++;
}
int q[maxn];
int dep[maxn], cur[maxn], sta[maxn];
bool bfs(int s, int t, int n)
{
    int front = 0, tail = 0;
    memset(dep, -1, sizeof(dep[0]) * (n + 1));
    dep[s] = 0;
    q[tail++] = s;
    while(front < tail)
    {
        int u = q[front++];
        for(int i = head[u]; ~i; i = edge[i].nxt)
        {
            int v = edge[i].to;
            if(edge[i].cap > edge[i].flow && dep[v] == -1)
            {
                dep[v] = dep[u] + 1;
                if(v == t)return true;
                q[tail++] = v;
            }
        }
    }
    return false;
}
int dinic(int s, int t, int n)
{
    int maxflow = 0;
    while(bfs(s, t, n))
    {
        for(int i = 0; i < n; ++i)cur[i] = head[i];
        int u = s, tail = 0;
        while(cur[s] != -1)
        {
            if(u == t)
            {
                int tp = inf;
                for(int i = tail - 1; i >= 0; --i)
                    tp = min(tp, edge[sta[i]].cap - edge[sta[i]].flow);
                maxflow += tp;
                for(int i = tail - 1; i >= 0; --i)
                {
                    edge[sta[i]].flow += tp;
                    edge[sta[i] ^ 1].flow -= tp;
                    if(edge[sta[i]].cap - edge[sta[i]].flow == 0)tail = i;
                }
                u = edge[sta[tail] ^ 1].to;
            }
            else if(cur[u] != -1 && edge[cur[u]].cap > edge[cur[u]].flow && dep[u] + 1 == dep[edge[cur[u]].to])
            {
                sta[tail++] = cur[u];
                u = edge[cur[u]].to;
            }
            else
            {
                while(u != s && cur[u] == -1)
                    u = edge[sta[--tail] ^ 1].to;
                cur[u] = edge[cur[u]].nxt;
            }
            
        }
    }
    return maxflow;
}
bool vis[maxn];
void findpath(int x, bool &flag, int n)
{
    int loc = x + n;
    vis[x] = true;
    for(int i = head[loc]; ~i; i = edge[i].nxt)
        if(edge[i].flow == -1 && edge[i].to != n * 2 + 1)
            findpath(edge[i].to, flag, n);
    if(flag)cout << x;
    else cout << " " << x;
    if(flag)flag = false;
}

int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);

    int n, m;
    cin >> n >> m;
    int s = 0, t = n << 1 | 1;
    init();
    int u, v;
    for(int i = 1; i <= m; ++i)
    {
        cin >> u >> v;
        addedge(u, v + n, 1);
    }
    for(int i = 1; i <= n; ++i)addedge(s, i, 1), addedge(i + n, t, 1);
    int ans = n - dinic(s, t, n << 1 | 1);
    // for(int i = s; i <= t; ++i)
    //     for(int j = head[i]; ~j; j = edge[j].nxt)
    //         cout << i << " " << edge[j].to << " " << edge[j].cap << " " << edge[j].flow << endl;
    memset(vis, false, sizeof vis);
    for(int i = head[t]; ~i; i = edge[i].nxt)
    {
        bool flag = true;
        // cout << edge[i].flow << endl;
        if(edge[i].flow == -1 && !vis[edge[i].to - n])
        {
            findpath(edge[i].to - n, flag, n);
            cout << endl;
        }
    }
    cout << ans << endl;
    
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```


# [魔术球](https://loj.ac/problem/6003)

[魔术球](https://loj.ac/problem/6003)


这题也是一个最小路径覆盖的问题，，一开始我又像成了简单的 每个点仅取一次 的那种问题了，，因为要找到一个最多的个数，，，把球看成点，满足条件的点间连边的话，，这样并不能知道我们要的东西，，，拆点跑网络流得到的也只是一个最小路径覆盖，，也就相当于是柱子数，，，所以要动态建图，，不断的加点，，判断此时加了一个点后的柱子数是几个，，当加到某个点超过给定的柱子数使停下来即可，，，

因为是动态加点，，所以这里拆点我是将一个用 $i << 1$ 表示，，反点就是 $i << 1 | 1$ ，，这样直接左移一位便是原来点的编号，，

输出路径和上面那题一样，，，

当然这题可以直接暴力贪心做，，[贪心正确性的证明：](https://blog.csdn.net/xy20130630/article/details/51336960)

## 网络流

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
const double eps = 1e-7;
const double pi = 3.14159265358979;
const int maxn = 1e5 + 5;
const int maxm = 1e3 + 5;
// const int mod = 1e9 + 7;
const int mod = 998244353;

struct edge
{
    int to, nxt, cap, flow;
}edge[maxn];
int tot, head[maxn];
int gap[maxn], dep[maxn], cur[maxn];
void init()
{
    tot = 0;
    memset(head, -1, sizeof head);
}
void addedge(int u, int v, int w, int rw = 0)
{
    edge[tot].to = v; edge[tot].cap = w; edge[tot].flow = 0;
    edge[tot].nxt = head[u]; head[u] = tot++;
    edge[tot].to = u; edge[tot].cap = rw; edge[tot].flow = 0;
    edge[tot].nxt = head[v]; head[v] = tot++;
}
int q[maxn];
void bfs(int s, int t)
{
    memset(dep, -1, sizeof dep);
    memset(gap, 0, sizeof gap);
    gap[0] = 1;
    int front = 0, rear = 0;
    dep[t] = 0;
    q[rear++] = t;
    while(front != rear)
    {
        int u = q[front++];
        for(int i = head[u]; ~i; i = edge[i].nxt)
        {
            int v = edge[i].to;
            if(dep[v] != -1)continue;
            q[rear++] = v;
            dep[v] = dep[u] + 1;
            ++gap[dep[v]];
        }
    }
}
int sta[maxn];
int isap(int s, int t, int n)
{
    bfs(s, t);
    for(int i = 0; i <= tot; ++i)cur[i] = head[i];
    int top = 0;
    int u = s;
    int maxflow = 0;
    while(dep[s] < n)
    {
        if(u == t)
        {
            int min = inf;
            int inser;
            for(int i = 0; i < top; ++i)
            {
                if(min > edge[sta[i]].cap - edge[sta[i]].flow)
                {
                    min = edge[sta[i]].cap - edge[sta[i]].flow;
                    inser = i;
                }
            }
            for(int i = 0; i < top; ++i)
            {
                edge[sta[i]].flow += min;
                edge[sta[i] ^ 1].flow -= min;
            }
            maxflow += min;
            top = inser;
            u = edge[sta[top] ^ 1].to;
            continue;
        }
        bool flag = false;
        int v; 
        for(int i = cur[u]; ~i; i = edge[i].nxt)
        {
            v = edge[i].to;
            if(edge[i].cap - edge[i].flow && dep[v] + 1 == dep[u])
            {
                flag = true;
                cur[u] = i;
                break;
            }
        }
        if(flag)
        {
            sta[top++] = cur[u];
            u = v;
            continue;
        }
        int min = n;
        for(int i = head[u]; ~i; i = edge[i].nxt)
        {
            if(edge[i].cap - edge[i].flow && dep[edge[i].to] < min)
            {
                min = dep[edge[i].to];
                cur[u] = i;
            }
        }
        --gap[dep[u]];
        if(!gap[dep[u]])return maxflow;
        dep[u] = min + 1;
        ++gap[dep[u]];
        if(u != s)u = edge[sta[--top] ^ 1].to;
    }
    return maxflow;
}
bool vis[maxn];
void findpath(int x, bool &f)
{
    vis[x] = true;
    int loc = x << 1 | 1;
    for(int i = head[loc]; ~i; i = edge[i].nxt)
        if(edge[i].flow == -1 && edge[i].to != maxn - 1)
            findpath(edge[i].to >> 1, f);
    if(f)cout << x;
    else cout << " " << x;
    if(f)f = false;
}

int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);

    int n; cin >> n;
    memset(vis, false, sizeof vis);
    init();
    int ans = 0, i;
    int s = 0, t = maxn - 1;
    for(i = 1; i - ans <= n + 1; ++i)
    {
        for(int j = 1; j <= i - 1; ++j)
            if((int)sqrt(i + j) * (int)sqrt(i + j) == i + j) 
                addedge(j << 1, i << 1 | 1, 1);
        addedge(s, i << 1, 1);
        addedge(i << 1 | 1, t, 1);
        ans += isap(s, t, i * 2 + 2);
    }
    ans = i - 2;
    cout << ans << endl;
    // for(int i = s; i <= t; ++i)
    //     for(int j = head[i]; ~j; j = edge[j].nxt)
    //         cout << i << " " << edge[j].to << " " << edge[j].cap << " " << edge[j].flow << endl;
    for(int i = head[t]; ~i; i = edge[i].nxt)
    {
        bool f = true;
        if(edge[i].flow == -1 && !vis[edge[i].to >> 1])
        {
            findpath(edge[i].to >> 1, f);
            cout << endl;
        }
    }
    for(int i = 1; i <= ans; ++i)if(!vis[i])cout << i << endl;
    
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

## 贪心

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
const double eps = 1e-7;
const double pi = 3.14159265358979;
const int maxn = 1e4 + 5;
const int maxm = 1e3 + 5;
// const int mod = 1e9 + 7;
const int mod = 998244353;


vector<int> v[maxn];
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    // ios_base::sync_with_stdio(0);
    // cin.tie(0);cout.tie(0);

    int n; cin >> n;
    int ans = 1;
    int cnt = 0;
    while(true)
    {
        bool flag = true;
        for(int i = 1; i <= cnt; ++i)
        {
            int tmp = v[i].back();
            if((int)sqrt(tmp + ans) * (int)sqrt(tmp + ans) == tmp + ans)
            {
                flag = false;
                v[i].push_back(ans++);
            }
        }
        if(flag)
        {
            v[++cnt].push_back(ans++);
        }
        if(cnt > n)break;
    }
    cout << ans - 2 << endl;
    for(int i = 1; i <= cnt - 1; ++i)
    {
        cout << v[i][0];
        for(int j = 1; j < v[i].size(); ++j)cout << " " << v[i][j];
        cout << endl;
    }

    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

# [圆桌聚餐](https://loj.ac/problem/6004)

[圆桌聚餐](https://loj.ac/problem/6004)


简单的网络流，，

源点到每个单位建边，，容量为每个单位的代表数，，

每个餐桌到汇点建边，，容量为每个餐桌的容量，，，

每个单位向每一个餐桌建边，，容量为1，，

这样就限制了每个单位只取代表数的人，，，

最后跑完网络流之后，，正着遍历一遍图即可，，，


~~看别人的题解说这是一道 二分图的多重匹配，，，有时间再看一下~~


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
const double eps = 1e-7;
const double pi = 3.14159265358979;
const int maxn = 1e5 + 5;
const int maxm = 1e3 + 5;
const int mod = 1e9 + 7;

struct edge
{
    int to, nxt, cap, flow;
}edge[maxn];
int tot, head[maxn];
int gap[maxn], dep[maxn], cur[maxn];
void init()
{
    tot = 0;
    memset(head, -1, sizeof head);
}
void addedge(int u, int v, int w, int rw = 0)
{
    edge[tot].to = v; edge[tot].cap = w; edge[tot].flow = 0;
    edge[tot].nxt = head[u]; head[u] = tot++;
    edge[tot].to = u; edge[tot].cap = rw; edge[tot].flow = 0;
    edge[tot].nxt = head[v]; head[v] = tot++;
}
int q[maxn];
void bfs(int s, int t)
{
    memset(dep, -1, sizeof dep);
    memset(gap, 0, sizeof gap);
    gap[0] = 1;
    int front = 0, rear = 0;
    dep[t] = 0;
    q[rear++] = t;
    while(front != rear)
    {
        int u = q[front++];
        for(int i = head[u]; ~i; i = edge[i].nxt)
        {
            int v = edge[i].to;
            if(dep[v] != -1)continue;
            q[rear++] = v;
            dep[v] = dep[u] + 1;
            ++gap[dep[v]];
        }
    }
}
int sta[maxn];
int isap(int s, int t, int n)
{
    bfs(s, t);
    for(int i = 0; i <= tot; ++i)cur[i] = head[i];
    int top = 0;
    int u = s;
    int maxflow = 0;
    while(dep[s] < n)
    {
        if(u == t)
        {
            int min = inf;
            int inser;
            for(int i = 0; i < top; ++i)
            {
                if(min > edge[sta[i]].cap - edge[sta[i]].flow)
                {
                    min = edge[sta[i]].cap - edge[sta[i]].flow;
                    inser = i;
                }
            }
            for(int i = 0; i < top; ++i)
            {
                edge[sta[i]].flow += min;
                edge[sta[i] ^ 1].flow -= min;
            }
            maxflow += min;
            top = inser;
            u = edge[sta[top] ^ 1].to;
            continue;
        }
        bool flag = false;
        int v; 
        for(int i = cur[u]; ~i; i = edge[i].nxt)
        {
            v = edge[i].to;
            if(edge[i].cap - edge[i].flow && dep[v] + 1 == dep[u])
            {
                flag = true;
                cur[u] = i;
                break;
            }
        }
        if(flag)
        {
            sta[top++] = cur[u];
            u = v;
            continue;
        }
        int min = n;
        for(int i = head[u]; ~i; i = edge[i].nxt)
        {
            if(edge[i].cap - edge[i].flow && dep[edge[i].to] < min)
            {
                min = dep[edge[i].to];
                cur[u] = i;
            }
        }
        --gap[dep[u]];
        if(!gap[dep[u]])return maxflow;
        dep[u] = min + 1;
        ++gap[dep[u]];
        if(u != s)u = edge[sta[--top] ^ 1].to;
    }
    return maxflow;
}
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);

    int n, m; cin >> n >> m;
    init();
    int k, sum = 0;
    int s = 0, t = n + m + 1;
    for(int i = 1; i <= n; ++i)
    {
        cin >> k;
        sum += k;
        addedge(s, i, k);
        for(int j = 1; j <= m; ++j)addedge(i, n + j, 1);
    }
    for(int i = 1; i <= m; ++i)
    {
        cin >> k;
        addedge(n + i, t, k);
    }
    int ans = isap(s, t, n + m + 2);
    if(ans == sum)
    {
        cout << 1 << endl;
        for(int i = 1; i <= n; ++i)
        {
            bool flag = true;
            for(int j = head[i]; ~j; j = edge[j].nxt)
            {
                if(edge[j].flow == 1 && edge[j].to != s && edge[j].to != t)
                {
                    if(flag)cout << edge[j].to - n;
                    else cout << " " << edge[j].to - n;
                    if(flag)flag = false;
                }
            }
            cout << endl;
        }
    }
    else
    {
        cout << 0 << endl;
    }
    


    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

# [最长递增子序列](https://loj.ac/problem/6005)

[最长递增子序列](https://loj.ac/problem/6005)

这道题也是我重新开始肝网络流的原因之一，，，

这道题的模型起先是今年的一场多校中的网络流签到题，，，但是之前从来没有见过这个模型，，压根不会建图，，，

那道题的解法是利用了这个模型的思想，然后用最小费用最大流，，[杭电这题地址](http://acm.hdu.edu.cn/showproblem.php?pid=6611)

我的做法在另一篇博客，，，


这题的题意很简单，，第一问就是一个简单线性dp，，，

第二问的建模方式是这样的：首先保证每个数只用一次，，按照之前的套路，，每个点拆成两个点 $u, u'$ 其中边的容量为1，，表示这个点只能选择一次，，然后利用dp的数组来判断每两个数 $a_i, a_j$ 如果满足 $a_i \le a_j \  \&\& \  dp_i + 1 == dp_j$ ，，那么建边，容量为1，，这样保证一条选择的路径就是一个最长递增子序列，，，因为题目要保证其长度为最长的，，所以我们不能直接将所有点都连到汇点 $t$ ，，而是对于dp数组中标记为lisans的连到汇点，，对于每一个开头，，也就是 $dp_i == 1$ 的连源点，，，最后跑最大流即为答案，，，

对于第三问，，因为不限制第一个数和最后一个数，，那么我们增加源点到第一个点的容量为inf， ，，**如果最后一个点可以作为lis的末尾，，也就是 $dp_n == lisans$ 那么就连汇点，，再跑最大流，累加答案即可

```cpp
// #include <bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cstring>
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


int a[maxn], n, lisans;
int dp[maxn];
void lis()
{
    for(int i = 0; i <= n; ++i)dp[i] = 1;
    for(int i = 1; i <= n; ++i)
        for(int j = 1; j < i; ++j)
            if(a[i] >= a[j])
                dp[i] = max(dp[i], dp[j] + 1);
    lisans = 0;
    for(int i = 1; i <= n; ++i)lisans = max(lisans, dp[i]);
}
struct edge
{
    int to, nxt, cap, flow;
}edge[maxn];
int tot, head[maxn];
int gap[maxn], dep[maxn], cur[maxn];
void init()
{
    tot = 0;
    memset(head, -1, sizeof head);
}
void addedge(int u, int v, int w, int rw = 0)
{
    edge[tot].to = v; edge[tot].cap = w; edge[tot].flow = 0;
    edge[tot].nxt = head[u]; head[u] = tot++;
    edge[tot].to = u; edge[tot].cap = rw; edge[tot].flow = 0;
    edge[tot].nxt = head[v]; head[v] = tot++;
}
int q[maxn];
void bfs(int s, int t)
{
    memset(dep, -1, sizeof dep);
    memset(gap, 0, sizeof gap);
    gap[0] = 1;
    int front = 0, rear = 0;
    dep[t] = 0;
    q[rear++] = t;
    while(front != rear)
    {
        int u = q[front++];
        for(int i = head[u]; ~i; i = edge[i].nxt)
        {
            int v = edge[i].to;
            if(dep[v] != -1)continue;
            q[rear++] = v;
            dep[v] = dep[u] + 1;
            ++gap[dep[v]];
        }
    }
}
int sta[maxn];
int isap(int s, int t, int n)
{
    bfs(s, t);
    for(int i = 0; i <= tot; ++i)cur[i] = head[i];
    int top = 0;
    int u = s;
    int maxflow = 0;
    while(dep[s] < n)
    {
        if(u == t)
        {
            int min = inf;
            int inser;
            for(int i = 0; i < top; ++i)
            {
                if(min > edge[sta[i]].cap - edge[sta[i]].flow)
                {
                    min = edge[sta[i]].cap - edge[sta[i]].flow;
                    inser = i;
                }
            }
            for(int i = 0; i < top; ++i)
            {
                edge[sta[i]].flow += min;
                edge[sta[i] ^ 1].flow -= min;
            }
            maxflow += min;
            top = inser;
            u = edge[sta[top] ^ 1].to;
            continue;
        }
        bool flag = false;
        int v; 
        for(int i = cur[u]; ~i; i = edge[i].nxt)
        {
            v = edge[i].to;
            if(edge[i].cap - edge[i].flow && dep[v] + 1 == dep[u])
            {
                flag = true;
                cur[u] = i;
                break;
            }
        }
        if(flag)
        {
            sta[top++] = cur[u];
            u = v;
            continue;
        }
        int min = n;
        for(int i = head[u]; ~i; i = edge[i].nxt)
        {
            if(edge[i].cap - edge[i].flow && dep[edge[i].to] < min)
            {
                min = dep[edge[i].to];
                cur[u] = i;
            }
        }
        --gap[dep[u]];
        if(!gap[dep[u]])return maxflow;
        dep[u] = min + 1;
        ++gap[dep[u]];
        if(u != s)u = edge[sta[--top] ^ 1].to;
    }
    return maxflow;
}
int quersion1()
{
    init();
    int s = 0, t = n << 1 | 1;
    for(int i = 1; i <= n; ++i)if(dp[i] == 1)addedge(s, i, 1);
    for(int i = 1; i <= n; ++i)addedge(i, i + n, 1);
    for(int i = 1; i <= n; ++i)
        for(int j = i + 1; j <= n; ++j)
            if(dp[i] == dp[j] - 1 && a[i] <= a[j])
                addedge(i + n, j, 1);
    for(int i = 1; i <= n; ++i)if(dp[i] == lisans)addedge(i + n, t, 1);
    return isap(s, t, (n + 1) << 1);
}
int quersion2()
{
    // init();
    int s = 0, t = n << 1 | 1;
    // for(int i = 1; i <= n; ++i)if(dp[i] == 1)addedge(s, i, 1);
    // for(int i = 1; i <= n; ++i)addedge(i, i + n, 1);
    // for(int i = 1; i <= n; ++i)
    //     for(int j = i + 1; j <= n; ++j)
    //         if(dp[i] == dp[j] - 1 && a[i] <= a[j])
    //             addedge(i + n, j, 1);
    // for(int i = 1; i <= n; ++i)if(dp[i] == lisans)addedge(i + n, t, 1);
    addedge(s, 1, inf), addedge(1, 1 + n, inf); 
    if(lisans == dp[n])addedge(n, n + n, inf), addedge(n + n, t, inf);
    return isap(s, t, (n + 1) << 1);
}
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);

    cin >> n;
    for(int i = 1; i <= n; ++i)cin >> a[i];
    if(n == 1)
    {
        cout << 1 << endl << 1 << endl << 1 << endl;
        return 0;
    }
    lis();cout << lisans << endl;
    int ans = quersion1();
    cout << ans << endl << ans + quersion2() << endl;
    
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```


# [试题库](https://loj.ac/problem/6006)

[试题库](https://loj.ac/problem/6006)

和上面那道 圆桌聚餐 很像，，

建图是这样的：左边k个点表示试卷的类型，右边n个点，，表示试题，，

源点连每个类型，，容量为该类型所需的试题数，，这样当全部跑满时就是满足题意的一种选择

每个类型连每一个对应点，容量为1，，，比如第i份试题的类型有1,3,那么左边的1，3两个点连这个试题的点，，

最后我为了保证每个试题只选一次，，拆点容量为1，，

最后将所有右边试题的点连到汇点就可以了，，容量也为1，，，

（貌似kuangbin的板子中 ``memcpy`` 可能会re，，因为复制的缓冲区大小的问题吧，，，head和cur大小不一样就会re，，，可以将 ``memcpy`` 参数改为tot，，，或者直接手动复制，，，

具体的方案就是正着遍历k个点就阔以了，，，

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
const int maxn = 1e5 + 5;
const int maxm = 1e6 + 233;
const int mod = 1e9 + 7;

struct edge
{
    int to, nxt, cap, flow;
}edge[maxn << 1];
int tot, head[maxn << 1];
void init()
{
    tot = 0;
    memset(head, -1, sizeof head);
}
void addedge(int u, int v, int w, int rw = 0)
{
    edge[tot].to = v; edge[tot].cap = w; edge[tot].flow = 0;
    edge[tot].nxt = head[u]; head[u] = tot++;
    edge[tot].to = u; edge[tot].cap = rw; edge[tot].flow = 0;
    edge[tot].nxt = head[v]; head[v] = tot++;
}
int q[maxn];
int gap[maxn], dep[maxn], cur[maxn << 1];
void bfs(int s, int t)
{
    memset(dep, -1, sizeof dep);
    memset(gap, 0, sizeof gap);
    gap[0] = 1;
    int front = 0, tail = 0;
    dep[t] = 0;
    q[tail++] = t;
    while(front != tail)
    {
        int u = q[front++];
        for(int i = head[u]; ~i; i = edge[i].nxt)
        {
            int v = edge[i].to;
            if(dep[v] != -1)continue;
            q[tail++] = v;
            dep[v] = dep[u] + 1;
            ++gap[dep[v]];
        }
    }
}
int sta[maxn];
int isap(int s, int t, int n)
{
    bfs(s, t);
    memcpy(cur, head, sizeof head);
    int top = 0;
    int u = s;
    int maxflow = 0;
    while(dep[s] < n)
    {
        if(u == t)
        {
            int min = inf;
            int inser;
            for(int i = 0; i < top; ++i)
            {
                if(min > edge[sta[i]].cap - edge[sta[i]].flow)
                {
                    min = edge[sta[i]].cap - edge[sta[i]].flow;
                    inser = i;
                }
            }
            for(int i = 0; i < top; ++i)
            {
                edge[sta[i]].flow += min;
                edge[sta[i] ^ 1].flow -= min;
            }
            maxflow += min;
            top = inser;
            u = edge[sta[top] ^ 1].to;
            continue;
        }
        bool flag = false;
        int v;
        for(int i = cur[u]; ~i; i = edge[i].nxt)
        {
            v = edge[i].to;
            if(edge[i].cap - edge[i].flow && dep[v] + 1 == dep[u])
            {
                flag = true;
                cur[u] = i;
                break;
            }
        }
        if(flag)
        {
            sta[top++] = cur[u];
            u = v;
            continue;
        }
        int min = n;
        for(int i = head[u]; ~i; i = edge[i].nxt)
        {
            if(edge[i].cap - edge[i].flow && dep[edge[i].to] < min)
            {
                min = dep[edge[i].to];
                cur[u] = i;
            }
        }
        --gap[dep[u]];
        if(!gap[dep[u]])return maxflow;
        dep[u] = min + 1;
        ++gap[dep[u]];
        if(u != s)u = edge[sta[--top] ^ 1].to;
    }
    return maxflow;
}
int n, k, m, a[maxn];
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);

    init();
    cin >> k >> n;
    m = 0;
    for(int i = 1; i <= k; ++i)cin >> a[i];
    for(int i = 1; i <= k; ++i)m += a[i];
    int s = 0, t = n * 2 + k + 1;
    for(int i = 1; i <= k; ++i)addedge(s, i, a[i]);
    int num, p;
    for(int i = 1; i <= n; ++i)
    {
        cin >> num;
        while(num--)
        {
            cin >> p;
            addedge(p, i + k, 1);
        }
    }
    for(int i = 1; i <= n; ++i)addedge(i + k, i + k + n, 1);
    for(int i = 1; i <= n; ++i)addedge(i + k + n, t, 1);
    if(isap(s, t, t + 1) == m)
    {
        for(int u = 1; u <= k; ++u)
        {
            cout << u << ":";
            for(int i = head[u]; ~i; i = edge[i].nxt)
            {
                if(edge[i].to != s && edge[i].flow == 1)
                    cout << " " << edge[i].to - k;
            }
            cout << endl;
        }
    }
    else
        cout << "No Solution!" << endl;
    
    
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

# [方格取数](https://loj.ac/problem/6007)

[方格取数](https://loj.ac/problem/6007)

这道题不错，，相比前面那几道一眼就能看出建图方式，，这道题的建图第一次见，，拆图的方式很奇特，，~~（说到底是做题少，，见的模型不多，，，~~

首先这道题有一个特点要看出来：因为相邻的两个不取，，那么答案一定是斜着一列一列的，，

也就是将方格分成两种：![](https://img-blog.csdn.net/20180726134513229?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4OTQ0MTYz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

显然属于黑白的两个数是不能同时选择的，，于是我们这样子可以将方格变成一个二分图，，假设一边是黑色的数，，那么另一边就是白色的数，，也就是奇数点在左，，偶数点在右，，

![](https://img-blog.csdn.net/20180726135237167?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4OTQ0MTYz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

按照题意，，相邻的两个数不能选择，，那我们就将不满足题意的点之间连边，，例如 ``u->v`` 就表示选择了点 ``u`` 就不能选择点 ``v`` ，，为了最后选的点权值最大，，我们需要去掉一些点，，，也就是说我们要在这个二分图中选择一个点集，，然后去掉他，，使得其他的点之间是互不相邻的同时保证权值最大，，

如果不管权值只看点的关系，，那么这个问题就是一个二分图的经典问题： **二分图最大独立集** 

二分图最大独立集的描述是这样的： 在一个二分图中，选择最多的点（两边都可以选择），使得所选的点集中任意两点间没有边，，相当于是求用最少的点覆盖所有的边集，，也就是一个最小点覆盖，，然后去掉他即可，，

它的求解是： $二分图的最大独立集=节点数-二分图的最大匹配数$ 

那这道题有点权怎么办，，~~因为是网络流24题，所以~~ 用网络流来解决，，，反正二分图也是可以用网络流来搞定的，，只要左边的每个点的点权变成与源点s的容量，，右边点的点权变成与汇点的容量，，最后跑最大流最小割就行了，，

![](https://img-blog.csdn.net/20180726135647728?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4OTQ0MTYz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

再看最小割的定义，选取尽可能小的边，去掉后形成一个 $ST$ 割，，也就是说明 $ST$ 割两边的点间是没有边的，，这样我们就得到了选择最小的点集，，答案就是与总和的差

[参考]([方格取数](https://loj.ac/problem/6007))

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

struct edge
{
    int to, nxt, cap, flow;
}edge[maxn << 1];
int tot, head[maxn << 1];
void init()
{
    tot = 0;
    memset(head, -1, sizeof head);
}
void addedge(int u, int v, int w, int rw = 0)
{
    // cout << u << " " << v << " " << w << endl;
    edge[tot].to = v; edge[tot].cap = w; edge[tot].flow = 0;
    edge[tot].nxt = head[u]; head[u] = tot++;
    edge[tot].to = u; edge[tot].cap = rw; edge[tot].flow = 0;
    edge[tot].nxt = head[v]; head[v] = tot++;
}
int q[maxn];
int gap[maxn], dep[maxn], cur[maxn << 1];
void bfs(int s, int t)
{
    memset(dep, -1, sizeof dep);
    memset(gap, 0, sizeof gap);
    gap[0] = 1;
    int front = 0, tail = 0;
    dep[t] = 0;
    q[tail++] = t;
    while(front != tail)
    {
        int u = q[front++];
        for(int i = head[u]; ~i; i = edge[i].nxt)
        {
            int v = edge[i].to;
            if(dep[v] != -1)continue;
            q[tail++] = v;
            dep[v] = dep[u] + 1;
            ++gap[dep[v]];
        }
    }
}
int sta[maxn];
int isap(int s, int t, int n)
{
    bfs(s, t);
    memcpy(cur, head, sizeof head);
    int top = 0;
    int u = s;
    int maxflow = 0;
    while(dep[s] < n)
    {
        if(u == t)
        {
            int min = inf;
            int inser;
            for(int i = 0; i < top; ++i)
            {
                if(min > edge[sta[i]].cap - edge[sta[i]].flow)
                {
                    min = edge[sta[i]].cap - edge[sta[i]].flow;
                    inser = i;
                }
            }
            for(int i = 0; i < top; ++i)
            {
                edge[sta[i]].flow += min;
                edge[sta[i] ^ 1].flow -= min;
            }
            maxflow += min;
            top = inser;
            u = edge[sta[top] ^ 1].to;
            continue;
        }
        bool flag = false;
        int v;
        for(int i = cur[u]; ~i; i = edge[i].nxt)
        {
            v = edge[i].to;
            if(edge[i].cap - edge[i].flow && dep[v] + 1 == dep[u])
            {
                flag = true;
                cur[u] = i;
                break;
            }
        }
        if(flag)
        {
            sta[top++] = cur[u];
            u = v;
            continue;
        }
        int min = n;
        for(int i = head[u]; ~i; i = edge[i].nxt)
        {
            if(edge[i].cap - edge[i].flow && dep[edge[i].to] < min)
            {
                min = dep[edge[i].to];
                cur[u] = i;
            }
        }
        --gap[dep[u]];
        if(!gap[dep[u]])return maxflow;
        dep[u] = min + 1;
        ++gap[dep[u]];
        if(u != s)u = edge[sta[--top] ^ 1].to;
    }
    return maxflow;
}
int a[maxn][maxn], n, m;
inline int getidx(int x, int y){return (x - 1) * m + y;}
inline bool check(int i, int j, int k, int l)
{
    bool flag = false;
    if(i == k)
    {
        if(j == l || j == l + 1 || j == l - 1)flag = true;
    }
    if(j == l)
    {
        if(i == k || i == k - 1 || i == k + 1)flag = true;
    }
    return flag;
}
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);

    init();
    cin >> n >> m;
    for(int i = 1; i <= n; ++i)
        for(int j = 1; j <= m; ++j)
            cin >> a[i][j];
    int sum = 0, p = n * m;
    int s = 0, t = p + 1;
    for(int i = 1; i <= n; ++i)
        for(int j = 1; j <= m; ++j) 
            sum += a[i][j];
    for(int i = 1; i <= n; ++i)
        for(int j = 1; j <= m; ++j)
            if((i + j) & 1)
                addedge(s, getidx(i, j), a[i][j]);
            else
                addedge(getidx(i, j), t, a[i][j]);

    for(int i = 1; i <= n; ++i)
        for(int j = 1; j <= m; ++j)
            for(int k = 1; k <= n; ++k)
                for(int l = 1; l <= m; ++l)
                    if(check(i, j, k, l) && (i + j) & 1)
                        addedge(getidx(i, j), getidx(k, l), inf);

    int ans = sum - isap(s, t, t + 1);
    cout << ans << endl;
    // cout << sum - ans << endl;
    
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

# [数字梯形](https://loj.ac/problem/6010)

[数字梯形](https://loj.ac/problem/6010)

这题算是费用流的基础题吧，，，~~（也想了一会把建图理清~~ 

题意很简单，，就是给你一个等腰梯形阵，，上底是m，，共n层，，，然后从顶部到底部引出m条路径，，路径间的限制条件有三个，，然后问你找出的路径的点的和最大值是多少，，

感觉费用流的题一个特点就是不仅要保证点的使用次数，，也就是容量大小，，还要保存其另一个属性，，也就是单位费用，，

因为要保证每一个点使用的次数，，例如第一问就是只用一次，第二问就是可以多次使用等等，，所以我们可以拆点用容量大小来限制点的取的次数，，，

对于点权显然就是费用，，加在拆点的两个点之间就行了，，，

这样见三次图，，跑三次费用流就行了，，，

这样的问题的模型是 最大权不相交路径，，，那个子序列的是 最多的不相交的路径数

dijkstra居然比spfa的费用流慢一些，，，emmmm

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
        // cout << u << " " << v << " " << w << " " << c << endl;
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
int a[30][30], n, m;
inline int getidx(int i, int j){return (2 * m + i - 2) * (i - 1) / 2 + j;}
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);

    cin >> m >> n;
    for(int i = 1; i <= n; ++i)
        for(int j = 1; j <= m + i - 1; ++j)
            cin >> a[i][j];
    int p = n * (2 * m + n - 1) / 2;
    int s = 0, t = p * 2 + 1;
    MinCostMaxFlow mcmf(t + 1);
    for(int i = 1; i <= m; ++i)mcmf.addedge(s, i, 1, 0);
    for(int i = 1; i <= n - 1; ++i)
        for(int j = 1; j <= m + i - 1; ++j)
            mcmf.addedge(getidx(i, j) + p, getidx(i + 1, j), 1, 0), 
            mcmf.addedge(getidx(i, j) + p, getidx(i + 1, j) + 1, 1, 0);
    for(int i = 1; i <= n; ++i)
        for(int j = 1; j <= m + i - 1; ++j)
            mcmf.addedge(getidx(i, j), getidx(i, j) + p, 1, a[i][j]);
    for(int i = 1; i <= m + n - 1; ++i)mcmf.addedge(getidx(n, i) + p, t, 1, 0);
    int flow, cost;
    mcmf.maxcostmaxflow(s, t, inf, flow, cost);
    cout << cost << endl;
    
    // delete &mcmf;
    //////////////////2
    mcmf = MinCostMaxFlow(t + 1);
    for(int i = 1; i <= m; ++i)mcmf.addedge(s, i, 1, 0);
    for(int i = 1; i <= n - 1; ++i)
        for(int j = 1; j <= m + i - 1; ++j)
            mcmf.addedge(getidx(i, j) + p, getidx(i + 1, j), 1, 0), 
            mcmf.addedge(getidx(i, j) + p, getidx(i + 1, j) + 1, 1, 0);
    for(int i = 1; i <= n; ++i)
        for(int j = 1; j <= m + i - 1; ++j)
            mcmf.addedge(getidx(i, j), getidx(i, j) + p, m, a[i][j]);
    for(int i = 1; i <= m + n - 1; ++i)mcmf.addedge(getidx(n, i) + p, t, m, 0);
    
    // for(int i = 1; i <= n; ++i)
    //     for(int j = 2; j <= m + i - 1 - 1; ++j)
    //         mcmf.addedge(getidx(i, j), getidx(i, j) + p, m - 1, a[i][j]);
    
    mcmf.maxcostmaxflow(s, t, inf, flow, cost);
    cout << cost << endl;

    /////////////3
    mcmf = MinCostMaxFlow(t + 1);
    for(int i = 1; i <= m; ++i)mcmf.addedge(s, i, 1, 0);
    for(int i = 1; i <= n - 1; ++i)
        for(int j = 1; j <= m + i - 1; ++j)
            mcmf.addedge(getidx(i, j) + p, getidx(i + 1, j), m, 0), 
            mcmf.addedge(getidx(i, j) + p, getidx(i + 1, j) + 1, m, 0);
    for(int i = 1; i <= n; ++i)
        for(int j = 1; j <= m + i - 1; ++j)
            mcmf.addedge(getidx(i, j), getidx(i, j) + p, m, a[i][j]);
    for(int i = 1; i <= m + n - 1; ++i)mcmf.addedge(getidx(n, i) + p, t, m, 0);
    
    // for(int i = s; i <= t; ++i)cout << mcmf.g[i].size() << " ";cout << endl;
    // for(int i = 1; i <= n; ++i)
    //     for(int j = 2; j <= m + i - 1 - 1; ++j)
    //         mcmf.addedge(getidx(i, j), getidx(i, j) + p, m - 1, a[i][j]);
    
    // for(int i = s; i <= t; ++i)cout << mcmf.g[i].size() << " ";cout << endl;
    mcmf.maxcostmaxflow(s, t, inf, flow, cost);
    cout << cost << endl;
    
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

[spfa版的](https://loj.ac/submission/603451)

# 