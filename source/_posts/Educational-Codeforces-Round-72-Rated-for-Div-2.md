---
title: "Educational Codeforces Round 72 (Rated for Div. 2)"
date: 2019-09-28 10:12:37
tags:
- ACM
- 刷题
- cf
categories:
- Codeforces
---

[这场只做了前四道](https://codeforces.com/contest/1217)，，感觉学到的东西也很多，，最后两道数据结构的题没有补。。。


<!-- more -->

# A. Creating a Character

贪心加一堆判断就行了，，，

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
const int maxn = 15e4 + 5;
const int maxm = 4e5 + 233;
const int mod = 1e9 + 7;
 
int a[maxn], n;
 
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    
    int t; cin >> t;
    while(t--)
    {
        ll s, i, e;
        cin >> s >> i >> e;
        if(s + e <= i)
        {
            cout << 0 << endl;
            continue;
        }
        ll x = i - s + e;
        x = x / 2;
        if(s + x <= i + e - x)++x;
        if(e == 0 && s > i)x = 0;
        else if(e == 0 && s <= i)x = 1;
        if(x <= 0)x = 0;
        cout << e - x + 1 << endl;
    }
    
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

# B. Zmei Gorynich

贪心++

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
const int maxn = 15e4 + 5;
const int maxm = 4e5 + 233;
const int mod = 1e9 + 7;
 
int a[maxn], n;
 
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    
    int t; cin >> t;
    while(t--)
    {
        ll n, x; cin >> n >> x;
        ll mx = -inf, mxd = 0;
        ll d, h;
        for(int i = 1; i <= n; ++i)
        {
            cin >> d >> h;
            mx = max(mx, d - h);
            mxd = max(mxd, d);
        }
        if(mx <= 0 && mxd < x)cout << -1 << endl;
        else 
        {
            ll ans = (x - mxd + mx - 1) / mx;
            ++ans;
            if(mxd >= x)ans = 1;
            cout << ans << endl;
        }
    }
    
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

# C. The Number Of Good Substrings

貌似满足条件的串不多？？？

直接枚举每一个1的位置，，然后对于以他为最高位的串表示的十进制如果小于串的长度以及他前面的前导零长度的和就是一个满足条件的，，这样跑一遍就行了，，，


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
const int maxn = 2e5 + 5;
const int maxm = 4e5 + 233;
const int mod = 1e9 + 7;
 
char s[maxn];
 
 
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    
    int t; cin >> t;
    while(t--)
    {
        cin >> s;
        ll ans = 0;
        int lst = -1;
        int len = strlen(s);
        for(int i = 0; i <= len - 1; ++i)
        {
            if(s[i] == '0')continue;
            else
            {
                ll base = 1;
                ++ans;
                for(int j = i + 1; j <= len - 1; ++j)
                {
                    base <<= 1;
                    if(s[j] == '1')base |= 1;
                    if(j - lst >= base)++ans;
                    else break;
                }
                lst = i;
            }
        }
        cout << ans << endl;
    }
    
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
// 010010001000
```

# D. Coloring Edges

感觉这题很不错，，有向图判环之前只知道用拓扑排序，，现在才知道有好几种方法，，，

题意是给一张图，然后对边染色，用最少的颜色染出的图中相同颜色的边没有成环就行

显然没有环的时候答案就是1，，，有环的时候答案就是2，，

所以可以先判环，，然后染色

这样做的话染色的一个技巧就是对于 ``u->v`` 边， $u \ge v$ 直接染2，，其他的染1

# dfs判环

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
const int maxn = 2e5 + 5;
const int maxm = 4e5 + 233;
const int mod = 1e9 + 7;
 
int n, m;
struct edge
{
    int to, nxt, col;
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
    edge[tot].col = 0;
    head[u] = tot++;
}
bool vis[maxn];
bool dfs(int u, int s)
{
    for(int i = head[u]; ~i; i = edge[i].nxt)
    {
        int v = edge[i].to;
        if(v == s)return true;
        if(vis[v])continue;
        vis[v] = true;
        if(dfs(v, s))return true;
    }
    return false;
}
 
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    
 
    cin >> n >> m;
    int u, v;
    init();
    for(int i = 1; i <= m; ++i)
    {
        cin >> u >> v;
        addedge(u, v);
    }
    bool flag = false;
    for(int i = 1; i <= n; ++i)
    {
        memset(vis, false, sizeof vis);
        vis[i] = true;
        flag = dfs(i, i);
        if(flag)break;
    }
    if(!flag)
    {
        cout << 1 << endl;
        for(int i = 1; i <= m; ++i)cout << 1 << " ";
        cout << endl;
    }
    else
    {
        cout << 2 << endl;
        for(int i = 1; i <= n; ++i)
            for(int j = head[i]; ~j; j = edge[j].nxt)
                if(i > edge[j].to)edge[j].col = 2;
                else edge[j].col = 1;
        for(int i = 0; i <= tot - 1; ++i)
            cout << edge[i].col << " ";
        cout << endl;
    }
    
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

# topo排序判环

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
const int maxn = 2e5 + 5;
const int maxm = 4e5 + 233;
const int mod = 1e9 + 7;
 
int n, m;
struct edge
{
    int to, nxt, col;
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
    edge[tot].col = 0;
    head[u] = tot++;
}
int du[maxn];
bool topo()
{
    int cnt = 0;
    queue<int> q;
    while(!q.empty())q.pop();
    for(int i = 1; i <= n; ++i)
        if(!du[i])
            q.push(i);
    while(!q.empty())
    {
        int u = q.front(); q.pop();
        ++cnt;
        for(int i = head[u]; ~i; i = edge[i].nxt)
            if(--du[edge[i].to] == 0)
                q.push(edge[i].to);
    }
    return cnt == n;
}
 
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    
 
    cin >> n >> m;
    int u, v;
    init();
    memset(du, 0, sizeof du);
    for(int i = 1; i <= m; ++i)
    {
        cin >> u >> v;
        ++du[v];
        addedge(u, v);
    }
    if(topo())
    {
        cout << 1 << endl;
        for(int i = 1; i <= m; ++i)cout << 1 << " ";
        cout << endl;
    }
    else
    {
        cout << 2 << endl;
        for(int i = 1; i <= n; ++i)
            for(int j = head[i]; ~j; j = edge[j].nxt)
                if(i > edge[j].to)edge[j].col = 2;
                else edge[j].col = 1;
        for(int i = 0; i <= tot - 1; ++i)
            cout << edge[i].col << " ";
        cout << endl;
    }
    
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

# dfs染回边

另一种做法需要知道dfs的一些性质：

dfs跑图会产生四种边，，（算法导论上有（看过都忘了，，，）[这些是参考这个的](https://blog.csdn.net/c_zhangsir/article/details/98238664)

+ **树边(Tree Edge)** ： 就是 ``u->v`` v是第一次访问的边
+ **前向边(Forward Edge)** ： 就是 ``u->v`` v是访问过的，并且不是v的直接的孩子
+ **回边(Back Edge)** ： 就是 ``u->v`` v是指向他的一个祖先的边，，（显然这样的边可能是环的一部分
+ **跨越边(Cross Edge)** ： 就是 ``u->v`` v是指向一个访问过的点，但 u , v 之间没关系，，（可能是两棵子树中的点等等

![](https://img-blog.csdnimg.cn/20190802211019465.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0NfWmhhbmdTaXI=,size_16,color_FFFFFF,t_70)

所以对于这题，，我们只要跑一边dfs，，然后将所有的回边染2，，其他的边染1即可，，，这样子就不用判环什么的，，，


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
const int maxn = 2e5 + 5;
const int maxm = 4e5 + 233;
const int mod = 1e9 + 7;

int n, m;
struct edge
{
    int to, nxt, col;
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
    edge[tot].col = 0;
    head[u] = tot++;
}
bool flag;
int vis[maxn];
void dfs(int u)
{
    // 先将子树标记为1
    // 如果子树中有到子树中的某个点时，表示有环
    // 最后将子树标记为2

    // 对于染色，树边染1（vis[v] == 0）、回边（vis[v] == 1）染2，前边（就是连到其他树的边）和跨越边（连着已经走过的点的边）染1
    vis[u] = 1;
    for(int i = head[u]; ~i; i = edge[i].nxt)
    {
        int v = edge[i].to;
        if(vis[v] == 0)
        {
            dfs(v);
            edge[i].col = 1;
        }
        else if(vis[v] == 1)
        {
            flag = true;
            edge[i].col = 2;
        }
        else
            edge[i].col = 1;
    }
    vis[u] = 2;
}

int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    

    cin >> n >> m;
    int u, v;
    init();
    for(int i = 1; i <= m; ++i)
    {
        cin >> u >> v;
        addedge(u, v);
    }
    flag = false;
    memset(vis, 0, sizeof vis);
    for(int i = 1; i <= n; ++i)
        if(vis[i] == 0)
            dfs(i);
    cout << (flag ? 2 : 1) << endl;
    for(int i = 0; i <= tot - 1; ++i)
        cout << edge[i].col << " ";
    cout << endl;
    
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```


(end)