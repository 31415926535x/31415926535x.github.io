---
title: "2019 Multi-University Training Contest 2"
date: 2019-07-24 21:47:42
tags:
---

补题ing

<!-- more -->

# Harmonious Army

```cpp
#include <bits/stdc++.h>
// #include <iostream>
// #include <cstdio>
// #include <cstdlib>
// #include <string.h>
// #include <vector>
// #include <algorithm>
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
const int maxm = 1e4 + 5;
const int mod = 1e9 + 7;

struct edge
{
    int to, nxt;
    ll cap, flow;
}edge[maxn << 1];
int tot, head[maxn << 1];
int gap[maxn], dep[maxn], cur[maxn << 1];
void init()
{
    tot = 0;
    memset(head, -1, sizeof head);
}
void addedge(int u, int v, ll w, ll rw = 0)
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
ll isap(int s, int t, int n)
{
    bfs(s, t);
    memcpy(cur, head, sizeof head);
    int top = 0;
    int u = s;
    ll ans = 0;
    while(dep[s] < n)
    {
        if(u == t)
        {
            ll min = linf;
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
            ans += min;
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
        if(!gap[dep[u]])return ans;
        dep[u] = min + 1;
        ++gap[dep[u]];
        if(u != s)u = edge[sta[--top] ^ 1].to;
    }
    return ans;
}
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
 
    int n, m;
    while(cin >> n >> m)
    {
        int u, v;
        ll a, b, c;
        init();
        int s = 0, t = n + 1;
        ll sum = 0;
        for(int i = 1; i <= m; ++i)
        {
            cin >> u >> v >> a >> b >> c;
            addedge(s, u, a + b);
            addedge(s, v, a + b);
            addedge(u, v, a + c - 2 * b);
            addedge(v, u, a + c - 2 * b);
            addedge(u, t, b + c);
            addedge(v, t, b + c);
            sum += a + b + c;
        }
        cout << sum - isap(s, t, n + 2) / 2 << endl;
    }

    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```