---
layout: w
title: ACM-树形dp
date: 2019-07-19 19:51:14
tags:
- dp
- 刷题
categories:
- ACM-树形dp
---


# [Anniversary party](http://poj.org/problem?id=2342)

<!-- more -->

```cpp
// #include <bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string.h>
// #include <vector>
#include <algorithm>
// #include <set>
// #include <vector>
// #include <cmath>
// #include <queue>
// #include <stack>
// #include <ctime>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef long double ld;
const int inf = 0x3f3f3f3f;//1061109567 > 1e9
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-5;
const double pi = 3.14159265358979;
const int maxn = 1e5 + 5;
const int maxm = 1e6 + 5;
const int mod = 1e9 + 7;

int n, a[maxn], dp[maxn][2];
struct edge
{
    int to, nxt;
}edge[maxn << 1];
int tot, head[maxn];
void init()
{
    tot = 0;
    memset(head, -1, sizeof head);
    memset(dp, -1, sizeof dp);
}
void addedge(int u, int v)
{
    edge[tot].to = v;
    edge[tot].nxt = head[u];
    head[u] = tot++;
}
int dfs(int u, int sta, int fa)
{
    if(~dp[u][sta])return dp[u][sta];
    dp[u][sta] = 0;
    for(int i = head[u]; ~i; i = edge[i].nxt)
    {
        int v = edge[i].to;
        if(v == fa)continue;
        if(sta)dp[u][sta] += dfs(v, 0, u);
        else dp[u][sta] += max(dfs(v, 0, u), dfs(v, 1, u));
    }
    if(sta)dp[u][sta] += a[u];
    return dp[u][sta];
}
int main()
{
    // double pp = clock();
    // freopen("233.in" , "r"   , stdin); 
    // freopen("233.out" , "w" , stdout);
    // ios_base::sync_with_stdio(0);
    // cin.tie(0);cout.tie(0);

    while(~scanf("%d", &n))
    {
        for(int i = 1; i <= n; ++i)scanf("%d", &a[i]);
        int u, v;init();
        while(scanf("%d%d", &u, &v) && u + v)
            addedge(u, v), addedge(v, u);
        printf("%d\n", max(dfs(1, 0, -1), dfs(1, 1, -1)));
    }
   
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;       
}
```

# [Strategic game](http://poj.org/problem?id=1463)

## 树形dp

```cpp
// #include <bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string.h>
// #include <vector>
#include <algorithm>
// #include <set>
// #include <vector>
// #include <cmath>
// #include <queue>
// #include <stack>
// #include <ctime>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef long double ld;
const int inf = 0x3f3f3f3f;//1061109567 > 1e9
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-5;
const double pi = 3.14159265358979;
const int maxn = 1e5 + 5;
const int maxm = 1e6 + 5;
const int mod = 1e9 + 7;

int n, dp[maxn][2];
struct edge
{
    int to, nxt;
}edge[maxn << 1];
int tot, head[maxn];
void init()
{
    tot = 0;
    memset(head, -1, sizeof head);
    memset(dp, -1, sizeof dp);
}
void addedge(int u, int v)
{
    edge[tot].to = v;
    edge[tot].nxt = head[u];
    head[u] = tot++;
}
int dfs(int u, int sta, int fa)
{
    if(~dp[u][sta])return dp[u][sta];
    dp[u][sta] = 0;
    for(int i = head[u]; ~i; i = edge[i].nxt)
    {
        int v = edge[i].to;
        if(v == fa)continue;
        if(sta) dp[u][sta] += min(dfs(v, 1, u), dfs(v, 0, u));
        else dp[u][sta] += dfs(v, 1, u);
    }
    if(sta)++dp[u][sta];
    return dp[u][sta];
}
int main()
{
    // double pp = clock();
    // freopen("233.in" , "r"   , stdin); 
    // freopen("233.out" , "w" , stdout);
    // ios_base::sync_with_stdio(0);
    // cin.tie(0);cout.tie(0);

    while(~scanf("%d", &n))
    {
        init();
        int u, v, num;
        for(int i = 1; i <= n; ++i)
        {
            scanf("%d:(%d) ", &u, &num);
            while(num--)
            {
                scanf("%d", &v);
                addedge(u + 1, v + 1);
                addedge(v + 1, u + 1);
            }
        }
        printf("%d\n", min(dfs(1, 0, -1), dfs(1, 1, -1)));
    }
   
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;       
}
```

## 二分图最小点覆盖

```cpp
// #include <bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string.h>
// #include <vector>
#include <algorithm>
// #include <set>
// #include <vector>
// #include <cmath>
// #include <queue>
// #include <stack>
// #include <ctime>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef long double ld;
const int inf = 0x3f3f3f3f;//1061109567 > 1e9
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-5;
const double pi = 3.14159265358979;
const int maxn = 2e3 + 5;
const int maxm = 1e6 + 5;
const int mod = 1e9 + 7;

int n;
struct edge
{
    int to, nxt;
}edge[maxn << 1];
int tot, head[maxn];
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
int linker[maxn];
bool used[maxn];
int uN;
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
    for(int u = 0; u < uN; ++u)
    {
        memset(used, false, sizeof used);
        if(dfs(u))++res;
    }
    return res;
}

int main()
{
    // double pp = clock();
    // freopen("233.in" , "r"   , stdin); 
    // freopen("233.out" , "w" , stdout);
    // ios_base::sync_with_stdio(0);
    // cin.tie(0);cout.tie(0);

    while(~scanf("%d", &n))
    {
        uN = n;
        init();
        int u, v, num;
        for(int i = 1; i <= n; ++i)
        {
            scanf("%d:(%d) ", &u, &num);
            while(num--)
            {
                scanf("%d", &v);
                addedge(u, v);
                addedge(v, u);
            }
        }
        printf("%d\n", hungary() / 2);
    }
   
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;       
}
```