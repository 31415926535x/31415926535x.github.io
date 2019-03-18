---
title: Codeforces-542div2
date: 2019-03-03 11:39:48
tags:
- acm
- 刷题
categories:
- Codeforces
---

codeforces-1130A~G

和队友做了一套题，，

<!-- more -->

# A. Be Positive

## 题意

题意是给你一串整数，，要找到一个除数使得每一个数被除后正数的个数大于等于 $\lceil \frac{n}{2} \rceil$，，，

## 分析

统计出所有正数，负数的个数，，正数多那个除数就是1，负数多就是-1

## 代码

```cpp
//cf
#include <bits/stdc++.h>
//#include <iostream>
//#include <cstdio>
//#include <cstdlib>
//#include <string.h>
//#include <algorithm>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef pair<int, int> pii;
const int inf = 0x3f3f3f3f;//1061109567
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-6;
const double pi = 3.14159265358979;
const int maxn = 1e6 + 5;
const int maxm = 2e5 + 5;
const ll mod = 1e9 + 7;
int a[maxn];
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    int n; cin >> n;
    for(int i = 1; i <= n; ++i)cin >> a[i];
    sort(a + 1, a + 1 + n);
    int nump = 0;
    int numn = 0;
    for(int i = 1; i <= n; ++i)
        if(a[i] > 0)
            ++nump;
        else if(a[i] < 0)
            ++numn;
    if(nump >= (n + 1) / 2)
        cout << 1 << endl;
    else if(numn >= (n + 1) / 2)
        cout << -1 << endl;
    else
        cout << 0 << endl;
    return 0;
}
```

# B. Two Cakes

## 题意

题意是由两组1~n的数组成的序列，，每一个人选择一组，，费用是两个树之间的距离，，然后问你总距离最小是多少，，

## 分析

我一开始想着先贪心处理一个人的选择出最少的，，再加上剩下的那个人的，，然后就wa了，，因为这样并不保证这一次选的和下一次选的距离和是最小的，，解决方法是两个一起处理，，考虑每一种选择的情况，，这样取最小的就行了，，，

## 代码

```cpp
//cf
#include <bits/stdc++.h>
//#include <iostream>
//#include <cstdio>
//#include <cstdlib>
//#include <string.h>
//#include <algorithm>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef pair<int, int> pii;
const int inf = 0x3f3f3f3f;//1061109567
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-6;
const double pi = 3.14159265358979;
const int maxn = 1e6 + 5;
const int maxm = 1e4 + 5;
const ll mod = 1e9 + 7;
int a[maxn][2];
bool flag[maxn];
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    int n;cin >> n;
    int t;
    memset(flag, false, sizeof flag);
    for(int i = 1; i <= 2 * n; ++i)
    {
        cin >> t;
        if(!flag[t])
        {
            a[t][0] = i;
            flag[t] = true;
        }
        else
            a[t][1] = i;
    }
    ll ans = a[1][0] + a[1][1] - 2;
    for(int i = 1; i <= n - 1; ++i)
    {
        int p = abs(a[i + 1][0] - a[i][0]) + abs(a[i + 1][1] - a[i][1]);
        int q = abs(a[i + 1][0] - a[i][1]) + abs(a[i + 1][1] - a[i][0]);
        ans += min(p, q);
    }
    cout << ans << endl;
    return 0;
}
```

# C. Connect

## 题意

给你一个地图，，其中陆地是0，水则是1，，然后给你一个起点一个终点，，你可以在任意两块陆地上建 **一条** 隧道使这两片陆地相通，，然后问你起点到终点需要的隧道的最小长度，，，

## 分析

因为只能建一条隧道，，所以如果起点所在的陆地与终点所在的陆地不相通的话，，那么这条隧道一定在这两片陆地之间，，数据量不大，，直接枚举这两片陆地上的点，，取最小的距离就行了，，，

判断一个点是否在起点或终点所在的陆地可以现用并查集把地图 “染色”，，，这样就可以枚举了，，，

## 代码

```cpp
//cf
#include <bits/stdc++.h>
//#include <iostream>
//#include <cstdio>
//#include <cstdlib>
//#include <string.h>
//#include <algorithm>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef pair<int, int> pii;
const int inf = 0x3f3f3f3f;//1061109567
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-6;
const double pi = 3.14159265358979;
const int maxn = 1e6 + 5;
const int maxm = 2e5 + 5;
const ll mod = 1e9 + 7;
int fa[maxn];
int _find(int x)
{
    if(fa[x] == x)return x;
    return fa[x] = _find(fa[x]);
}
void _union(int x, int y)
{
    int f1 = _find(x);
    int f2 = _find(y);
    if(f1 != f2)fa[f1] = f2;
    else        fa[f2] = f1;
}
int mp[60][60];
int solve(int i, int j, int n)
{
    int x1 = i / n;
    int y1 = i - x1 * n;
    int x2 = j / n;
    int y2 = j - x2 * n;
    if(y1 == 0)
    {
        y1 = n;
        --x1;
    }
    if(y2 == 0)
    {
        y2 = n;
        --x2;
    }
//    cout << x1 << y1 << x2 << y2 << endl;
    return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
}
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    int n;scanf("%d", &n);
    int x1, x2, y1, y2;
    scanf("%d%d%d%d", &x1, &y1, &x2, &y2);
    for(int i = 1; i <= n; ++i)
    {
        getchar();
        for(int j = 1; j <= n; ++j)
            mp[i][j] = (int)(getchar() - '0');

    }

    for(int i = n + 1; i <= n + 1 + n * n; ++i)fa[i] = i;
    for(int i = 1; i <= n; ++i)
    {
        for(int j = 1; j <= n; ++j)
        {
            if(mp[i - 1][j] == mp[i][j] && i - 1 >= 1)
                _union(i * n + j, (i - 1) * n + j);
            if(mp[i + 1][j] == mp[i][j] && i + 1 <= n)
                _union(i * n + j, (i + 1) * n + j);
            if(mp[i][j + 1] == mp[i][j] && j + 1 <= n)
                _union(i * n + j, i * n + j + 1);
            if(mp[i][j - 1] == mp[i][j] && j - 1 >= 1)
                _union(i * n + j, i * n + j - 1);
        }
    }
//    for(int i = 1; i <=n; ++i)
//    {
//        for(int j = 1; j <= n; ++j)
//            cout << _find(i * n + j) << " ";
//        cout << endl;
//    }
    int s = _find(x1 * n + y1);
    int t = _find(x2 * n + y2);
//    cout << s << t << endl;
    int ans = inf;
    for(int i = n + 1; i <= n + 1 + n * n; ++i)
    {
        for(int j = 1 + n; j <= n + 1 + n * n; ++j)
        {
            if(_find(i) == s && _find(j) == t)
            {
                ans = min(ans, solve(i, j, n));
            }
        }
    }
    cout << ans << endl;
    return 0;
}
```

# D1. Toy Train 

## 题意

由一个环形的铁路，，上面有n个车站，，每个车站有一些糖果，，这些糖果要运到 $b_i$ 那个车站，，，火车只能在一个车站拉上一个糖果，，但是可以放下任意块糖果，，，问你从这n个车站出发送完所有的糖果所需的最少的时间，，

## 分析

每次只能上一个糖果，，最后下的糖果就是糖果数量最多的车站的，，找一个从这个车站出发花费最多的另一个车站，，这样把那个车站所有的糖果送完时其他车站的糖果顺带也就送完了，，，

枚举每一个车站i，，对于车站i枚举所有的其他的车站，，求出所有的时间里的最大值就是这个车站所用的时间了，，，

[参考](https://www.cnblogs.com/luowentao/p/10434582.html)

## 代码

```cpp
//cf
#include <bits/stdc++.h>
//#include <iostream>
//#include <cstdio>
//#include <cstdlib>
//#include <string.h>
//#include <algorithm>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef pair<int, int> pii;
const int inf = 0x3f3f3f3f;//1061109567
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-6;
const double pi = 3.14159265358979;
const int maxn = 1e6 + 5;
const int maxm = 1e4 + 5;
const ll mod = 1e9 + 7;
struct node
{
    int num;
    int mi;
}node[maxm];
int n, m;
int getdis(int i, int j)
{
    //get the dis of i -> j
    if(i <= j)return j - i;
    else      return n - i + j;
}
int solve(int loc)
{
    //find the furthest and the most candies node
    int fur = loc;
    int num = node[loc].num;
    int ans = 0;
    int dis;
    for(int i = loc; i <= n; ++i)
    {
        if(node[i].mi == inf)continue;
        dis = getdis(loc, i) + (node[i].num - 1) * n + node[i].mi;
        ans = max(ans, dis);
    }
    for(int i = 1; i <= loc - 1; ++i)
    {
        if(node[i].mi == inf)continue;
        dis = getdis(loc, i) + (node[i].num - 1) * n + node[i].mi;
        ans = max(ans, dis);
    }
//    for(int i = loc; i <= n; ++i)
//    {
//        if(node[i].num >= num)
//        {
//            fur = i;
//            num = node[i].num;
//        }
//    }
//    for(int i = 1; i <= loc - 1; ++i)
//    {
//        if(node[i].num >= num)
//        {
//            fur = i;
//            num = node[i].num;
//        }
//    }
//    cout << fur << " ";
//    int ans = n * (node[fur].num - 1);
//    ans += getdis(loc, fur);
//    ans += getdis(fur, node[fur].mi);
    return ans;
}
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    cin >> n >> m;
    int a, b;
    for(int i = 1; i <= n; ++i)node[i].mi = inf;
    for(int i = 1; i <= n; ++i)node[i].num = 0;
    for(int i = 1; i <= m; ++i)
    {
        cin >> a >> b;
        ++node[a].num;
        if(getdis(a, b) <= node[a].mi)
            node[a].mi = getdis(a, b);
    }
    for(int i = 1; i <= n; ++i)
        cout << solve(i) << " ";
    cout << endl;
//    for(int i = 1; i <= n; ++i)
//    {
//        cout << i << " ";
//        cout << solve(i) << endl;
//    }
    return 0;
}
```

# E. Wrong Answer

## 题意

一个数列求出最大的 区间和乘以区间长度，，

他给的算法当前面一段区间和出现负数就舍弃了，，没有考虑长度对最后答案的影响，，，

题目要我们构造一个数列，，使得这个数列的正确答案比它的做法算出的结果大k

## 分析

可以构造一个前面1998个都是0，，后面一个数是-p，一个时p + q,,,

这样正确的答案就是 $2000q$，，，他算出的答案就是 $p + q$，，，

要大k，，就是 $2000q - (p+q)=k$，，也就是 $q= \frac{p+k}{1999}$ ，，，为了保证p,q都是整数，，，那么就设 $p=1999-k\%1999$，，这样算出的q就是整数，，，

```cpp
//cf
#include <bits/stdc++.h>
//#include <iostream>
//#include <cstdio>
//#include <cstdlib>
//#include <string.h>
//#include <algorithm>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef pair<int, int> pii;
const int inf = 0x3f3f3f3f;//1061109567
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-6;
const double pi = 3.14159265358979;
const int maxn = 1e6 + 5;
const int maxm = 1e4 + 5;
const ll mod = 1e9 + 7;

int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    int k; cin >> k;
    cout << 2000 << endl;
    for(int i = 1; i <= 2000 - 2; ++i)cout << 0 << " ";
    int p = 1999 - k % 1999;
    cout << -p << " " << ((k + p) / 1999 + p) << endl;
    return 0;
}
```

(end)