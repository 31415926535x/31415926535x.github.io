---
title: Codeforces-541div2
date: 2019-02-23 21:42:23
tags:
- acm
- 刷题
categories:
- Codeforces
---

codeforces-1131A~G

[这场很多题都很简单](https://codeforces.com/contest/1131)，，应该是要能至少做出4道的，，但是我一道wa了懵逼一道不知道如何写代码实现链表，，又是掉分场，，QAQ，，，

<!-- more -->

# A. Sea Battle

求两个左对齐的矩形的外围一圈的面积（方格数），，，一开始去想着一层一层的找规律去推公式去了，，，推到一半发现越来越乱，，又想了一会才想起直接分成两个矩形：红色的扩大一圈后的和去掉一层后的蓝色的矩形的面积和减去原来两个矩形的面积和就行了，，，

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
typedef pair<int, ull> pii;
const int inf = 0x3f3f3f3f;//1061109567
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-6;
const double pi = 3.14159265358979;
const int maxn = 2e5 + 5;
const int maxm = 2e5 + 5;
const ll mod = 1e9 + 7;

int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    ll w1, w2, h1, h2;
    cin >> w1 >> h1 >> w2 >> h2;
    ll ans = (w1 + 2) * (h1 + 2) + (w2 + 2) * h2 - w1 * h1 - w2 * h2;
    cout << ans << endl;
    return 0;
}
```

# B. Draw!

这道题的题意是给你足球比赛某个时刻的比分，然后问你可能的最大平分的情况由几种，，，

题意很简单，，，就是我当时在做的的时候推的方法错了，，然后wa，，因为但是思路也不清晰，，继续想下去耽误时间又时错的就放弃了这道题，，（现在看来应该做完C去继续想一下B的，，，

显然为了出现平分的情况，对于平分x肯定满足： $a \leq x \leq c ,b \leq x \leq d$,其中(a,b),(c,d)代表相邻的两个时刻的比分，(a,b)出现的时刻早一些，这样我们就可以推出 $max(a,b) \leq x \leq min(c,d)$，，（我就这里没想出来，，当时脑袋是糊的，，，）然后介于这两个时刻的比分之间的可能平分数就是 $min(c,d)-max(a,b)+1 \ 当且仅当式子的值大于等于零$，，如果中间时刻出现一个比分相同的就意味着多加了一次，减掉，，对于最后的比分如果相等还要再加一个，，

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
const int maxn = 2e5 + 5;
const int maxm = 2e5 + 5;
const ll mod = 1e9 + 7;
int a[maxn], b[maxn];

int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    int n;cin >> n;
    int ans = 0, la, lb, a, b;
    la = lb = 0;
    for(int i = 1; i <= n; ++i)
    {
        cin >> a >> b;
        if(min(a, b) - max(la, lb) + 1 >= 0)
            ans += min(a, b) - max(la , lb) + 1;
        if(a == b)--ans;
        la = a;lb = b;
    }
    if(la == lb)++ans;
    cout << ans << endl;
    return 0;
}
```

# C. Birthday

c题很简单，就是给你一组数，然后让那弄出一个序列，满足所有相邻两个数的差值的最大值最小，，

看样例就知道应该输出一个中间高两边低的序列就好了，，，

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
const int maxn = 2e5 + 5;
const int maxm = 2e5 + 5;
const ll mod = 1e9 + 7;
int a[maxn], b[maxn];

int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    int n; cin >> n;
    for(int i = 1; i <= n; ++i)cin >> a[i];
    sort(a + 1, a + 1 + n);
    if(n & 1)
    {
        int p = n / 2 + 1;
        for(int i = n; i >= 1; i -= 2)
            b[p--] = a[i];
        p = n / 2 + 2;
        for(int i = n - 1; i >= 1; i -= 2)
            b[p++] = a[i];
    }
    else
    {
        int p = n / 2;
        for(int i = n; i >= 1; i -= 2)
            b[p--] = a[i];
        p = n / 2 + 1;
        for(int i = n - 1; i >= 1; i -= 2)
            b[p++] = a[i];
    }
    for(int i = 1; i <= n; ++i)cout << b[i] << " ";
    cout << endl;
    return 0;
}
```

# D. Gourmet choice

这道题在比赛的时候有人在群里说了一句“差分约束”，，看这个题面的确像是差分约束的题，，，后来又看到很多人用的是 **并查集缩点+拓扑排序**，，，（第一听说能用并查集缩点的，，以前值见过跑Tarjan缩点的，，）

题面的意思是两组菜，一组是n道一组是m道，，然后给出这些菜直接的评分关系，然后让你求出每道菜具体可能的数值是多少（要满足所给的大小关系），，输出结果

## 并查集缩点+拓扑排序

首先题目要我们求一个数列，使得这n+m个数的大小关系满足题目所给的要求，，这时我们可以将题目所求看成求一个最大值最小链，链中的边(u,v)表示v所代表的值大于或等于u的值，，这样就将问题转化成了一个n+m的图，，其中当s[i][j]为'>'号时，就加一条n+j->i的边，，然后判断这个图是否是DAG图，，不是的话证明有环，，无解，，没有环的情况下用 拓扑排序 求图的最长链，，同时标记每个点的值应该是上一个点的加一

对于相等评分的i,j，，我们将它们划在同一个集合里，，这样用一个点表示这个集合里的所有点，，它最后的评分和集合里的所有点的评分一样（缩点），，这里的缩点过程用并查集来实现，，最后的点都映射到了新的点中

这样我们直接对每一个用到原来1->n+m的点都求一下它所在的点集，，用并查集的 ``_find(x)`` 就行了，，，

最后遍历一遍所有的n+m个点看所在的集合是否都被标记了，，有一个没有的话就是无解的啦，，，

输出的时候依次输出前n个点所在点集的标号，然后后m个点所在点集的标号，，

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
const int maxn = 2e5 + 5;
const int maxm = 2e5 + 5;
const ll mod = 1e9 + 7;
int a[maxn], b[maxn];
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
    if(f1 > f2)fa[f1] = f2;
    else       fa[f2] = f1;
}
//toposort
vector<int> g[maxn];
int du[maxn], n, m, l[maxn];
int ans[maxn];      //保存所有点的编号
bool toposort(int cnt)
{
    int tot = 0;
    queue<int> q;
    for(int i = 1; i <= n + m; ++i)
        if(!du[_find(i)] && fa[i] == i)
            q.push(_find(i)), ans[_find(i)] = 1;//所有入度为零的点的集合标记为1
    while(!q.empty())
    {
        int x = q.front(); q.pop();
        for(int i = 0; i < g[x].size(); ++i)
        {
            int t = g[x][i];
            --du[t];
            if(!du[t])q.push(t), ans[t] = ans[x] + 1;//这条链上的下一个点的编号比上一个大1，，也就是满足题干的>
        }
    }
    for(int i = 1; i <= n + m; ++i)//如果有一个点没有被编号，即最长链里没有它就说明无解
        if(!ans[_find(i)])
            return false;
    return true;
}
char s[1005][1005];
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    scanf("%d%d", &n , &m);
    for(int i = 1; i <= n; ++i)scanf("%s", s[i] + 1);
    for(int i = 1; i <= n + m; ++i)fa[i] = i;
    for(int i = 1; i <= n + m; ++i)du[i] = 0;
    int cnt = n + m;
    //用并查集缩点后判断是不是DAG图
    for(int i = 1; i <= n; ++i)
        for(int j = 1; j <= m; ++j)
            if(s[i][j] == '=')
                _union(i, n + j), --cnt;
    for(int i = 1; i <= n; ++i)
        for(int j = 1; j <= m; ++j)
        {
            if(s[i][j] == '<')
                g[_find(i)].push_back(_find(n + j)), ++du[_find(n + j)];
            if(s[i][j] == '>')
                g[_find(n + j)].push_back(_find(i)), ++du[_find(i)];
        }
    if(toposort(cnt))
    {
        printf("Yes\n");
        for(int i = 1; i <= n; ++i)
            printf("%d ", ans[_find(i)]);
        printf("\n");
        for(int j = 1; j <= m; ++j)
            printf("%d ", ans[_find(j + n)]);
        printf("\n");
    }
    else
    {
        printf("No\n");
    }

    return 0;
}
```

[参考](https://www.e-learn.cn/content/qita/2031478)


## 差分约束

~~spfa跑的时候容易t，，（哪天在补这道题吧~~

差分约束的话直接按题意建图就行了，，，注意一下细节，，，[可以看这里最后的那里](https://www.cnblogs.com/31415926535x/p/10463112.html)

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
struct edge
{
    int v, w;
    edge(int _v, int _w):v(_v), w(_w){}
};
vector<edge> e[maxn];
void addedge(int u, int v, int w)
{
    e[u].push_back(edge(v, w));
}
bool vis[maxn];
int cnt[maxn], dis[maxn], sta[maxn];
bool spfa(int s, int n)
{
    for(int i = 0; i <= n; ++i)vis[i] = false;
    for(int i = 0; i <= n; ++i)cnt[i] = 0;
    for(int i = 0; i <= n; ++i)dis[i] = inf;
    vis[s] = true;
    cnt[s] = 1;
    dis[s] = 0;
    int top = -1;
    sta[++top] = s;
    while(~top)
    {
        int u = sta[top--];
        vis[u] = false;
        for(int i = 0; i < e[u].size(); ++i)
        {
            int v = e[u][i].v;
            int w = e[u][i].w;
            if(dis[v] > dis[u] + w)
            {
                dis[v] = dis[u] + w;
                if(!vis[v])
                {
                    vis[v] = true;
                    sta[++top] = v;
                    if(++cnt[v] > n)return false;
                }
            }
        }
    }
    return true;
}
char s[1005][1005];
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    int n, m; scanf("%d%d", &n, &m);
    for(int i = 1; i <= n; ++i)scanf("%s", s[i] + 1);
    for(int i = 1; i <= n; ++i)
    {
        for(int j = 1; j <= m; ++j)
        {
            if(s[i][j] == '>')
                addedge(i, j + n, -1);
            else if(s[i][j] == '<')
                addedge(j + n, i, -1);
            else
            {
                addedge(i, j + n, 0);
                addedge(j + n, i, 0);
            }
        }
    }
    for(int i = 1; i <= n + m; ++i)
        addedge(0, i, 1);
    if(spfa(0, n + m))
    {
        printf("Yes\n");
        int k = *min_element(dis + 1, dis + 1 + n + m);
        for(int i = 1; i <= n; ++i)
            printf("%d ", dis[i] - k + 1);
        printf("\n");
        for(int i = 1 + n; i <= n + m; ++i)
            printf("%d ", dis[i] - k + 1);
        printf("\n");
    }
    else
        printf("No\n");
    return 0;
}
```


# E. String Multiplication

留坑

# F. Asya And Kittens

当时过这道题的人很多，，直接并查集+链表模拟一下就可以了，，，

可惜我当时不知道链表怎么实现（关键是不知道stl的list有合并两个链表的函数，，，不然就不是掉分场了QAQ

每添加一对猫，，判断他们是不是在一个集合里，，不在的话就把他们放在一个集合里（并查集实现），，然后合并这两只喵所在的链表，，用 ``std::list.splice()`` 作用是：对两个链表进行结合(三个重载函数) 结合后第二个链表清空，，， ，，记得记录下这个链表的位置，，，

~~蔡队用的是rope合并的，，有时间了解一下这玩意，，~~

## 并查集+链表模拟

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
const int maxn = 2e5 + 5;
const int maxm = 2e5 + 5;
const ll mod = 1e9 + 7;
int father[maxn];
int find(int x)
{
    if(father[x] == x)return x;
    else return father[x] = find(father[x]);
}
void unionset(int x, int y)
{
    int f1 = find(x);
    int f2 = find(y);
    if(f1 != f2)father[f2] = f1;
}
list<ll> lst[maxn];
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    int n; cin >> n;
    for(int i = 1; i <= n; ++i)father[i] = i, lst[i].pb(i);
    int a, b, ans;
    for(int i = 1; i <= n - 1; ++i)
    {
        cin >> a >> b;
        int pa = find(a);
        int pb = find(b);
        lst[pa].splice(lst[pa].end(), lst[pb]);
        unionset(a, b);
        ans = pa;
    }
    for(auto p : lst[ans])cout << p << " ";
    return 0;
}
```

## 并查集+rope模拟

rope是一个块状链表，，

需要在g++中使用，，同时加上特定的头文件：

```cpp
#include<ext/rope>
using namespace __gnu_cxx;
```

常用操作有：

+ pusb_back(x): 在末尾追加x
+ insert(pos, x): 在pos插入x
+ erase(pos, x): 在pos开始删除连续x个元素
+ replace(pos, x): 从pos开始替换成x
+ substr(pos, x): 提去从pos开始的x个元素
+ at(x) or [x]: 访问第x个元素

insert() ,substr() 和 erase()连用可以实现对一段数据的转移：

```cpp
实现对a数组中[x, y]的数字放到最前面
a.insert(0, a.substr(x - 1, y));
a.erase(x + y - 1, y);
```

这道题貌似直接放在一个链表的后面用 "+=" ，就行了，，，（没找到介绍重载 "+="的博客），，，

据说这玩意的时间复杂度是 O(玄学),,emmm，，比上面那种还慢一点，，

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
    if(f1 > f2)fa[f1] = f2;
    else       fa[f2] = f1;
}
#include <ext/rope>
using namespace __gnu_cxx;
rope<int> a[maxn];
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    int n;cin >> n;
    for(int i = 1; i <= n; ++i)fa[i] = i, a[i].push_back(i);
    int x, y;
    for(int i = 1; i <= n - 1; ++i)
    {
        cin >> x >> y;
        x = _find(x); y = _find(y);
        fa[y] = x;
        a[x] += a[y];
    }
    for(int i = 1; i <= n; ++i)
        if(_find(i) == i)
            for(int j = 0; j < a[i].size(); ++j)
                cout << a[i][j] << " ";
    cout << endl;
    return 0;
}
```

# G. Most Dangerous Shark

留坑