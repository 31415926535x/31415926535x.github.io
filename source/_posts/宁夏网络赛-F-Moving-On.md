---
title: 宁夏网络赛-F-Moving On
date: 2019-08-31 17:00:57
tags:
- 刷题
- ACM
categories:
- ACM-最短路
---


一道[简单的Floyd](https://nanti.jisuanke.com/t/A1766)题，，但是是动态加点求多次有限制的最短路，，感觉这个思想很好，，当然可以直接dp

<!-- more -->

# 题意

题目给你一个图，然后对于每一个节点都有一个点权，然后有q次询问，每次询问两点间的最短距离，并且最短路径中不能通过任意一个点权大于等于w的点，（首尾不算），，

# 思路

一次询问的话，直接最短路乱搞就行了，，但是询问次数很多的时候，就不能每一次建图跑，因为是任意两点的最短路，~~而且给的图是邻接矩阵~~ ，所以用Floyed，，，但是怎么处理每一次的询问呢，，一种做法是再加一维，处理出任意的加入前k个点后的最短路，，最后回答询问即可，，，也就是dp的思想，，另一种是询问离线，动态建图跑q次floyed即可，，后面这种思路以前见过但是没套floyed用过，，

# 代码

## 离线

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
const int maxn = 2e2 + 5;
const int maxm = 2e4 + 5;
const int mod = 1e9 + 7;

int d[maxn][maxn];
struct query
{
    int u, v, w;
    int ans;
    int id;
    const bool operator<(const query &q)const
    {
        return w < q.w;
    }
}qry[maxm];
bool cmpid(query a, query b)
{
    return a.id < b.id;
}
pair<int, int> r[maxn];
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
  
    int t; cin >> t;
    int ca = 1;
    while(t--)
    {
        int n, q; cin >> n >> q;
        for(int i = 1; i <= n; ++i)cin >> r[i].first;
        for(int i = 1; i <= n; ++i)r[i].second = i;
        for(int i = 1; i <= n; ++i)
            for(int j = 1; j <= n; ++j)
                cin >> d[i][j];
        for(int i = 1; i <= q; ++i)cin >> qry[i].u >> qry[i].v >> qry[i].w;
        for(int i = 1; i <= q; ++i)qry[i].id = i;
        sort(qry + 1, qry + 1 + q);
        sort(r + 1, r + 1 + n);
        int cnt = 1;
        for(int qi = 1; qi <= q; ++qi)
        {
            while(cnt <= n && r[cnt].first <= qry[qi].w)
            {
                //满足条件的情况下，利用这个城市来更新最短路
                int k = r[cnt].second;
                for(int i = 1; i <= n; ++i)
                {
                    for(int j = 1; j <= n; ++j)
                    {
                        d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
                    }
                }
                ++cnt;
            }
            qry[qi].ans = d[qry[qi].u][qry[qi].v];
        }
        sort(qry + 1, qry + 1 + q, cmpid);
        cout << "Case #" << ca++ << ":" << endl;
        for(int i = 1; i <= q; ++i)cout << qry[i].ans << endl;

    }
    
       

    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

## 预处理在线

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
const int maxn = 2e2 + 5;
const int maxm = 2e4 + 5;
const int mod = 1e9 + 7;

int d[maxn][maxn][maxn];
pair<int, int> r[maxn];
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
  
    int t; cin >> t;
    int ca = 1;
    while(t--)
    {
        int n, q; cin >> n >> q;
        for(int i = 1; i <= n; ++i)cin >> r[i].first;
        for(int i = 1; i <= n; ++i)r[i].second = i;
        memset(d, inf, sizeof d);
        for(int i = 1; i <= n; ++i)
            for(int j = 1; j <= n; ++j)
                cin >> d[i][j][0];
        sort(r + 1, r + 1 + n);
        int cnt = 1;
        for(int cnt = 1; cnt <= n; ++cnt)
        {
            int k = r[cnt].second;
            for(int i = 1; i <= n; ++i)
                for(int j = 1; j <= n; ++j)
                    d[i][j][cnt] = min(d[i][j][cnt - 1], d[i][k][cnt - 1] + d[k][j][cnt - 1]);
        }
        // sort(r + 1, r + 1 + n, [](pair<int, int> i, pair<int, int> j){return i.second < j.second;});
        cout << "Case #" << ca++ << ":" << endl;
        int u, v, w;

        while(q--)
        {
            cin >> u >> v >> w;
            int k = 0;
            for(int i = 1; i <= n; ++i)if(r[i].first <= w)k = i;
            cout << d[u][v][k] << endl;
        }
    }
    

    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

状态不在，思路都理不清，，，emmmmmm（该收心努力了啊314，，，，，

(end)