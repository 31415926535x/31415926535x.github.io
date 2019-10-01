---
title: 'Codeforces Round #585 (Div. 2)'
date: 2019-09-19 22:08:30
tags:
- ACM
- 刷题
categories:
- Codeforces
---

感觉很硬核啊这场，，越往后越做不动，，，emmmm，，，（这场是奔着最后一题 2sat 来的，，，上次学这玩意是在今年的3、4月份把，，，早忘得差不多了，，，

<!-- more -->


# A. Yellow Cards

A题较简单，，贪心就行了，，

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
const int maxn = 1e6 + 5;
const int maxm = 2e5 + 233;
const int mod = 1e9 + 7;
 
int a[maxn], n;
 
 
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
 
    int n, a1, a2, k1, k2;
    cin >> a1 >> a2 >> k1 >> k2 >> n;
    int mi = 0, mx = 0;
    if(a1 * (k1 - 1) + a2 * (k2 - 1) >= n)mi = 0;
    else mi = n - a1 * (k1 - 1) - a2 * (k2 - 1);
 
    if(k1 <= k2)
    {
        while(n >= k1 && a1)
        {
            --a1;
            n -= k1;
            ++mx;
        }
        while(n >= k2 && a2)
        {
            --a2;
            n -= k2;
            ++mx;
        }
    }
    else
    {
        while(n >= k2 && a2)
        {
            --a2;
            n -= k2;
            ++mx;
        }
        while(n >= k1 && a1)
        {
            --a1;
            n -= k1;
            ++mx;
        }
    }
    cout << mi << " " << mx << endl;
    
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```


# B. The Number of Products

A掉A题，，感觉还行，，以为后面的都很简单，，然后就在B、C题卡了半天，，

题意就是一个序列中，正区间和负区间的个数有多少，，这里的区间指的是区间积，，，

刚开始以为暴力可过，，~~（口胡~~ ，，然后交了一发果断T了，，，

又推了一会发现可以枚举左端点所在的区间，，然后他的贡献就是后面的+2,,+4,,+6等等区间的和的积，，所以只要预处理一下每一个用负点分割的左闭右开的区间的长度，，然后处理成隔一个的后缀和就行了，，，

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
const int maxn = 1e6 + 5;
const int maxm = 2e5 + 233;
const int mod = 1e9 + 7;
 
int a[maxn], n;
int p[maxn], tot;
ll pp[maxn];
 
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
 
    cin >> n;
    tot = 0;
    for(int i = 1; i <= n; ++i)cin >> a[i];
    for(int i = 1; i <= n; ++i)
        if(a[i] < 0)
            p[++tot] = i;
    p[tot + 1] = n + 1; p[tot + 2] = n + 1;
    ll ans1 = 0, ans2 = 0;
    ++tot;
    for(int i = tot; i >= 1; --i)pp[i] = p[i] - p[i - 1];//--pp[1];
    // for(int i = 1; i <= tot; ++i)cout << pp[i] << " ";cout << endl;
    
 
    for(int i = tot - 2; i >= 1; --i)pp[i] += pp[i + 2];
    // for(int i = 1; i <= tot; ++i)cout << pp[i] << " ";cout << endl;
    for(int i = 1; i <= tot; ++i)
    {
        // int x = p[i] - p[i - 1] - 1;
        ll x = pp[i] - pp[i + 2];
        ll y = pp[i + 1];
        // cout << x << "-" << y << endl;
        ans1 += x * y; 
        y = pp[i + 2];
        ans2 += x * y;
        --x;
        while(x)ans2 += x--;
    }
 
    cout << ans1 << " " << ans2 << endl;
    
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```


# C. Swap Letters


题意就是两个串，，只含有ab，，然后每一次的操作是挑第一个串中的一个和第二个串中的一个交换，，然后问题最少的操作次数下使得两串一样，，

我当时的思路是用一个 r 表示右端已经修改的位置，，然后遍历一遍，，当第i个位置的不同时，，利用r向后找一个可以交换的，，口胡了一下就直接敲了，，，然后不断的发现逻辑上的bug，，，emmmm，，一直改到成了N方的解法，，，，

看了一下别人的思路，，显然优先考虑相同的两个进行操作，，剩下的也只能操作偶数个，，使用的操作次数就是两次，，一次是反转其中一个，，然后像前面的就行了，，，，奇数个就是无解，，，（会爆ll

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
const int maxn = 1e6 + 5;
const int maxm = 2e5 + 233;
const int mod = 1e9 + 7;
 
char s[maxn], t[maxn];
int n;
 
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
 
    cin >> n >> s >> t;
    vector<pair<int, int> > ans;
    int r = 1;
    for(int i = 0; i < n; ++i)
    {
        if(s[i] != t[i])
        {
            // r = min(r, i + 1);
            r = i + 1;
            while(!(t[r] == t[i] && t[r] != s[r]) && r < n)++r;
            if(r >= n)
            {
                r = i + 1;
                swap(s[i], t[i]);
                ans.push_back(make_pair(i + 1, i + 1));
                // cout << "----" << endl << s << endl << t << endl;
                while(!(t[r] == t[i] && t[r] != s[r]) && r < n)++r;
                if(r >= n)
                {
                    cout << -1 << endl;
                    return 0;
                }
            }
            // cout << i + 1 << r + 1 << endl;
            ans.push_back(make_pair(i + 1, r + 1));
            swap(s[i], t[r]);
        // cout << s << endl << t << endl;
        }
    }
    cout << ans.size() << endl;
    for(auto &i: ans)cout << i.first << " " << i.second << endl;
    
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

# D. Ticket Game

博弈？？ 先弃了

感觉是一个好多情况的分类讨论题，，，

# E. Marbles

状压dp，，，emmmm，，扔了，，


# F. Radio Stations

重点来了，，，

这题的题干是真的长，，长篇阅读理解，，，emmmmmm

题目的大意是这样的：一个城市要弄一个发射塔，，它的功率是 $f (1\le f \le M)$ ，

有 $p$ 个节目，，对于每一个都有一个需要发射的功率范围： $(L_i, R_i)$ ，，也就是说当 $f$ 在这个范围时用户才能收到这个节目，，，

然后有一些需求，，数量是n，，，这些需求这样描述： $(a_i, b_i)$ ，，表示对于第 $i$ 个需求 **至少** 需要满足一个，，简单说就是至少要挑一个，，，

还有一些节目间的限制条件： $(u, v)$ ，，表示选了 $u$ 就不能选 $v$ ，，，反之亦然，，

然后问你这个发射塔的频率 $f$ 选择多少时使得 $n$ 个需求都可以满足

如果这题没有 $f$ 这个限制条件，这题2sat可直接过，，但是不行，，

当然可以枚举 $f$ ，，从1到M，，但是这样时间复杂度就是n方，，，T穿，，，

只能将 $f$ 放在我们建立的限制图中，，但是怎么建呢，，，

以前做的2sat题目都是固定的n对物品中每对中选择一个，，其中一些物品有限制条件，，这样做了很多题之后潜移默化的形成了一个固定的模型，，只有这n个物品可以进行操作，，这样的思想也使得我在刚读懂题时即使出现过将 p 个节目分成选或不选这样建图，，但是因为这样不会处理f，，于是放弃这种思路，，，向着将n个需求作为图中的点，，然后有限制的条件间连边，，这样的思考就不得不去枚举f，，，于是只能过小数据，，

这题的解决方法是 **在n个节目的后面再加M个可以选择的f的情况** ，，，这样一层点表示选这个情况，，第二层的点表示不选这个点，，建立相应的限制关系，，这样就可以跑一遍2sat得到两个想得到的东西，，，

前面的点的限制条件很好处理，，，按题意搞就行了

接下来处理后面的这M个点的情况，，，如果我们直接枚举每一个f可行解，，，那么和前面的暴力没啥区别，，，一样会T，，，

[参考了一个博主的思路](https://blog.csdn.net/weixin_44231553/article/details/100927625)

这里我的理解是对于这些可行解都向前连边，，也就是 ``选f>=l+1必须选f>=l`` 这样就可以将区间的一个表示的限制条件转化成一个端点的表示，，（感觉有点类似差分的思想，，区间的操作改成端点的操作，，，

这样建图，，跑一边就行了，，，，最后输出答案，，

用tarjan的话判断的条件是两个点间是否不在一个scc中，，然后取最小就行了，，，

用染色法的话需要跑的点只是前半段p个，，，

## 染色法


栈写反了，，，wa了好几发，，，，（丢人，，，


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
const int maxn = 4e6 + 5;
const int maxm = 4e5 + 233;
const int mod = 1e9 + 7;
 
 
int n, p, M, m, all;
struct edge
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
bool vis[maxn];
int sta[maxn], top;
bool dfs(int u)
{
    if(vis[u > all ? u - all : u + all])return false;
    if(vis[u])return true;
    vis[u] = true;
    sta[++top] = u;
    for(int i = head[u]; ~i; i = edge[i].nxt)
        if(!dfs(edge[i].to))    
            return false;
    return true;
}
bool twosat(int n)
{
    memset(vis, false, sizeof vis);
    for(int i = 1; i <= n; ++i)
    {
        if(vis[i] || vis[i + all])continue;
        top = -1;
        if(!dfs(i))
        {
            while(~top)vis[sta[top--]] = false;
            if(!dfs(i + all))return false;
        }
    }
    return true;
}
 
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
 
    cin >> n >> p >> M >> m;
    all = p + M;
    int u, v;
    init();
    for(int i = 1; i <= n; ++i)
    {
        cin >> u >> v;
        addedge(u + all, v);
        addedge(v + all, u);
    }
    for(int i = 1; i <= p; ++i)
    {
        cin >> u >> v;
        addedge(i, u + p); addedge(u + p + all, i + all);
        if(v < M)addedge(v + p + 1, i + all), addedge(i, v + p + all + 1);
    }
    for(int i = 1; i <= m; ++i)
    {
        cin >> u >> v;
        addedge(u, v + all);
        addedge(v, u + all);
    }
    for(int i = 1; i < M; ++i)
    {
        addedge(i + p + 1, i + p);
        addedge(i + p + all, i + p + 1 + all);
        // addedge(i + p, i + p + 1);
        // addedge(i + p + 1 + all, i + p + all);
    }
    if(twosat(p))
    {
        vector<int> ans;
        int f = 0;
        for(int i = 1; i <= p; ++i)
            if(vis[i])
                ans.push_back(i);
        for(int i = p + 1; i <= p + M; ++i)
            if(vis[i])
            {
                f = i - p;
            }
        if(!f)
        {
            cout << -1 << endl;
            return 0;
        }
        cout << ans.size() << " " << f << endl;
        for(auto i: ans)cout << i << " ";
    }
    else
    {
        cout << -1 << endl;
    }
    
 
 
    
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

## tarjan

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
const int maxn = 4e6 + 5;
const int maxm = 4e5 + 233;
const int mod = 1e9 + 7;
 
 
int n, p, M, m, all;
struct edge
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
int low[maxn], dfn[maxn], sta[maxn], belong[maxn];
int idx, top;
int scc;
bool insta[maxn];
int num[maxn];
void tarjan(int u)
{
    int v;
    low[u] = dfn[u] = ++idx;
    sta[top++] = u;
    insta[u] = true;
    for(int i = head[u]; ~i; i = edge[i].nxt)
    {
        v = edge[i].to;
        if(!dfn[v])
        {
            tarjan(v);
            if(low[u] > low[v])low[u] = low[v];
        }
        else if(insta[v] && low[u] > dfn[v])
            low[u] = dfn[v];
    }
    if(low[u] == dfn[u])
    {
        ++scc;
        do
        {
            v = sta[--top];
            insta[v] = false;
            belong[v] = scc;
            ++num[scc];
        }
        while(v != u);
    }
}
bool twosat(int n)
{
    memset(dfn, 0, sizeof dfn);
    memset(insta, false, sizeof insta);
    memset(num, 0, sizeof num);
    idx = scc = top = 0;
    for(int i = 1; i <= n; ++i)
        if(!dfn[i])
            tarjan(i);
    vector<int> ans;
    int f = 0;
    // for(int i = 1; i <= p; ++i)cout << belong[i] << " ";cout << " ";
    // for(int i = 1; i <= M; ++i)cout << belong[i + p] << " ";cout << endl;
    // for(int i = 1; i <= p; ++i)cout << belong[i + all] << " ";cout << " ";
    // for(int i = 1; i <= M; ++i)cout << belong[i + p + all] << " ";cout << endl;
    for(int i = 1; i <= p; ++i)
        if(belong[i] < belong[i + all])
            ans.push_back(i);
        else if(belong[i] == belong[i + all])
            return false;
    for(int i = 1; i <= M; ++i)
        if(belong[i + p] < belong[i + p + all])
            f = i;
        else if(belong[i + p] == belong[i + p + all])
            return false;
    cout << ans.size() << " " << f << endl;
    for(auto i: ans)cout << i << " ";
    return true;
}
 
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
 
    cin >> n >> p >> M >> m;
    all = p + M;
    int u, v;
    init();
    for(int i = 1; i <= n; ++i)
    {
        cin >> u >> v;
        addedge(u + all, v);
        addedge(v + all, u);
    }
    for(int i = 1; i <= p; ++i)
    {
        cin >> u >> v;
        addedge(i, u + p); addedge(u + p + all, i + all);
        if(v < M)addedge(v + p + 1, i + all), addedge(i, v + p + all + 1);
    }
    for(int i = 1; i <= m; ++i)
    {
        cin >> u >> v;
        addedge(u, v + all);
        addedge(v, u + all);
    }
    for(int i = 1; i < M; ++i)
    {
        addedge(i + p + 1, i + p);
        addedge(i + p + all, i + p + 1 + all);
        // addedge(i + p, i + p + 1);
        // addedge(i + p + 1 + all, i + p + all);
    }
    if(!twosat(all << 1))cout << -1 << endl;
    
 
 
    
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

这道题的启发很大，，，2sat不一定就是解决一种选择下的解，，，只要这些不同种类的物品间有限制条件就可以放在一起，，，

（end)