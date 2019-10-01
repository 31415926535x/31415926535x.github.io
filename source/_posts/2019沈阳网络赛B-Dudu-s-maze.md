---
title: 2019沈阳网络赛B.Dudu's maze
date: 2019-09-14 20:19:45
tags:
- ACM
- 刷题
---


啊，，不在状态啊，，自闭一下午，，读错题，，然后背锅，，，明明这个简单的题，，，

<!-- more -->

[这题](https://nanti.jisuanke.com/t/41402)题面不容易看懂，，大致意思是给你一张图，，然后从1节点开始可以任意的走，，

有些节点是 monster 节点，，这样的节点总共只能走一次，，其他的点有一个糖果，问最大的取得糖果的期望

解法很简单，，先求出从1可以不经过 monster 的点的个数，，也就是1的联通块，，

然后对于每一个和1联通块的 monster 的下的联通块求他的点的个数，，点权就是个数与其所有从这点出发的路径数的商，，取这样 monster 的点权最大加前面的1联通块的点数就行了，，，

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
const int maxm = 2e5 + 233;
const int mod = 1e9 + 7;

int n, m, k;
struct edge
{
    int to, nxt;
}edge[maxm << 1];
int tot, head[maxm << 1];
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
int monster[maxn];
bool vismonster[maxn];
int fa[maxn];
inline int _find(int x)
{
    if(fa[x] == x)return x;
    return fa[x] = _find(fa[x]);
}
void _union(int x, int y)
{
    int f1 = _find(x);
    int f2 = _find(y);
    if(f1 != f2)fa[f2] = f1;
}
bool vis[maxn];
int ans[maxn];
queue<int> q;
void bfs(int s)
{
    while(!q.empty())q.pop();
    q.push(s);
    for(int i = 1; i <= n; ++i)vis[i] = false;
    vis[s] = true;
    while(!q.empty())
    {
        int u = q.front(); q.pop();
        for(int i = head[u]; ~i; i = edge[i].nxt)
        {
            int v = edge[i].to;
            if(vis[v] || _find(v) == _find(1))continue;
            if(vismonster[v])
            {
                _union(s, v);
                vis[v] = true;
                continue;
            }
            vis[v] = true;
            q.push(v);
            _union(s, v);
            ++ans[s];
        }
    }
}
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    // ios_base::sync_with_stdio(0);
    // cin.tie(0);cout.tie(0);

    // int t; cin >> t;
    int t; scanf("%d", &t);
    while(t--)
    {
        // cin >> n >> m >> k;
        scanf("%d%d%d", &n, &m, &k);
        int u, v;
        init();
        for(int i = 1; i <= n; ++i)vismonster[i] = false;
        for(int i = 1; i <= m; ++i)
        {
            // cin >> u >> v;
            scanf("%d%d", &u, &v);
            addedge(u, v);
            addedge(v, u);
        }
        // for(int i = 1; i <= k; ++i)cin >> monster[i], vismonster[monster[i]] = true;
        for(int i = 1; i <= k; ++i)
        {
            scanf("%d", &monster[i]);
            vismonster[monster[i]] = true;
        }
        for(int i = 1; i <= n; ++i)fa[i] = i;
        for(int i = 1; i <= n; ++i)ans[i] = 0;
        ans[1] = 1;
        bfs(1);
        double ret = 0;
        for(int j = 1; j <= k; ++j)
        {
            if(_find(monster[j]) == _find(1))
            {
                int sz = 0, sum = 0;
                for(int i = head[monster[j]]; ~i; i = edge[i].nxt)
                {
                    ++sz;
                    if(vismonster[edge[i].to] || _find(edge[i].to) == _find(1))continue;
                    ans[edge[i].to] = 0;
                    bfs(edge[i].to);
                    sum += ans[edge[i].to] + 1;
                }
                // for(int l = 1; l <= n; ++l)cout << ans[l] << " ";cout << endl;
                ret = max(ret, (double)sum / (double)sz);
                // cout << sum << "-" << sz << "-" << ret << endl;
            }
        }
        // cout << ret + (double)ans[1] << endl;
        printf("%.6f\n", ret + (double)ans[1]);
        
    }
    
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

今天不适合写代码，，，，