---
title: 2-sat
date: 2019-02-13 00:45:38
tags:
- acm
- 刷题
categories:
- ACM-图论-2-SAT
---

# 概述

2-sat是k-sat问题中k==2时的一种情况，，（废话qaq，，

当k大于等于3时是npc问题，，所以一般都是问的2-sat，，

这种题的大概形式是： 对于给定的n对的点，要求每一对都只能选择一个，并且其中还有一些限制条件，比如说选了u就不能选择v等等，，

然后问你有没有可行解，，，

解决这类问题一般是用 **染色法（求字典序最小的解）** 和 **强连通分量法（拓扑排序只能得到任意解）**，，

<!-- more -->

# 算法分析

+ 首先要明白一个道理：对于 ``u->v``（选择u就不能选择v）这样的限制条件可以用它的逆否命题来转换为：``u->v'``（选择u就必须选v'）以及 ``v->u'``（选择v就必须选u'）
+ 最后的建出的图是对称的，，
+ [具体的数学证明和算法推导看这里](https://wenku.baidu.com/view/afd6c436a32d7375a41780f2.html) 和 [kuangbin的博客](https://www.cnblogs.com/kuangbin/archive/2012/10/05/2712429.html)，，多看几遍，，跟着敲一遍代码后再看看就差不多懂了


## 染色法（求字典序最小的解）

这个算法的大致思路就是遍历每一对点的两种情况：选p或者选p'，，，

然后一直从p的下一个尝试下去，，中间若是碰到不能避免的不满足题意的选择时，证明这条路下来的尝试时不行的，，重新选择，，一直下去。。。也就是一个深搜的过程，，时间复杂度大概是 $O(nm)$，，

[可以看看这篇博客，，](https://www.cnblogs.com/L-Excalibur/p/8504893.html)

[以及这个](https://blog.sengxian.com/algorithms/2-sat)

[还有这个里的那几个模型很好](https://blog.csdn.net/jarjingx/article/details/8521690)

> **模型一：两者（A，B）不能同时取**
　　那么选择了A就只能选择B’，选择了B就只能选择A’
　　连边A→B’，B→A’

> **模型二：两者（A，B）不能同时不取**
　　那么选择了A’就只能选择B，选择了B’就只能选择A
　　连边A’→B，B’→A

> **模型三：两者（A，B）要么都取，要么都不取**
　　那么选择了A，就只能选择B，选择了B就只能选择A，选择了A’就只能选择B’，选择了B’就只能选择A’
　　连边A→B，B→A，A’→B’，B’→A’

> **模型四：两者（A，A’）必取A**
　　那么，那么，该怎么说呢？先说连边吧。
　　连边A’→A


## 强连通分量法（拓扑排序只能得到任意解）

这个算法的流程为：

+ 建图
+ 求极大联通分量（子图）
+ 缩点，转化成DAG（有向无环图）
+ 判断有无解
+ 新图拓扑排序
+ 自底向上选择、删除
+ 输出

时间复杂度大概为 $O(m)$，，就是难写，，而且不能输出字典序小的解，，，

# 例题和模板

## hdu-1814

[这道模板题](http://acm.hdu.edu.cn/showproblem.php?pid=1814)，，让输出的书字典序小的解，，，只能用第一种方法了，，，

题意就是一个国家有很多党派，，每个党派只有两个人，，现在要从这一堆党派中每个党派选择一个人参加会议，，其中一些人之间有分歧，，即p去了q就不去这样的限制条件，，问你是否能找出满足题意所有限制条件的选择方法，，，有解的话就输出字典序最小的解，，

题意和上面那个[百度文库](https://wenku.baidu.com/view/afd6c436a32d7375a41780f2.html)的例题一样，，，


```cpp
//#include <bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string.h>
#include <vector>
#include <queue>
#include <functional>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
const int inf = 0x3f3f3f3f;//1061109567
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-6;
const double pi = 3.14159265358979;
const int maxn = 1e5 + 5;
const int maxm = 2e5 + 5;
const int mod = 1e9 + 7;
inline ll read() {
    char c = getchar(); int x = 0, f = 1;
    while(c < '0' || c > '9') {if(c == '-') f = -1; c = getchar();}
    while(c >= '0' && c <= '9') x = x * 10 + c - '0', c = getchar();
    return x * f;
}

//2sat_kuangbin
struct edge
{
    int to, next;
}edge[maxn];
int head[maxn], tot;
void init()
{
    tot = 0;
    memset(head, -1, sizeof head);
}
void addedge(int u, int v)
{
    edge[tot].to = v; edge[tot].next = head[u]; head[u] = tot++;
}
bool vis[maxn];
int s[maxn], top;
bool dfs(int u)
{
    if(vis[u^1])return false;       //如果这个点p的对立面p'选了，那么这个点就不选
    if(vis[u])  return true;        //如果这个点已经选了，就不从这个点继续向下找了
    vis[u] = true;                  //这个点p没选并且对立面p'没选的情况下，选择这个点，并且尝试从这个点寻找可能的解法
    s[top++] = u;                   //把这个可能的一种情况压栈，保存
    for(int i = head[u]; ~i; i = edge[i].next)
        if(!dfs(edge[i].to))
            return false;           //尝试所有与点u相连的点v，如果从点v出发的尝试不可行时不选
    return true;
}
bool two_sat(int n)
{
    memset(vis, false, sizeof vis); //vis[i]标记那些点要选
    for(int i = 0; i < n; i += 2)
    {
        if(vis[i] || vis[i^1])continue;//如果这一对点有一个选过就尝试下一对的点
        top = 0;
        if(!dfs(i))                 //如果从点i出发的尝试不行，就将栈中所有这条可能的路径上的点标记为未选
        {
            while(top)vis[s[--top]] = false;
            if(!dfs(i^1))return false;//如果点i的对立面i'都不行的话，证明无法找到这样一条可行解，使得每一对点仅选择一个并且满足对应的限制
        }
    }
    return true;
}
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    int n, m, u, v;
    while(scanf("%d%d", &n, &m) != EOF)
    {
        init();
        for(int i = 1; i <= m; ++i)
        {
            scanf("%d%d", &u, &v);
            --u;--v;        //点的编号从0开始，方便使用p^1来表示p的对立面
            addedge(u, v^1);//建图，限制条件u->v（选择u就不能选择v）等价于u->v' && v->u' （选择u必须选额v' 和 选择v就必须选择u'）
            addedge(v, u^1);
        }
        if(two_sat(2 * n))  //存在解时
        {
            for(int i = 0; i < 2 * n; ++i)
                if(vis[i])  //将最后字典序最小的可行解输出
                    printf("%d\n", i + 1);
        }
        else
            printf("NIE\n");
    }
    return 0;
}
```

## [uva-3211](https://cn.vjudge.net/problem/UVALive-3211)

这道题的题意是： 每架飞机有两个降落的时间点(a, b)，然后对于每两架飞机之间定义一个安全的时间间隔x，，问你在保证全部飞机都安全降落的情况下，最小的时间间隔x中的最大值，，，

先不管x怎么求，，假设现在已知一个x，，问你任意两架飞机之间的时间间隔最小是x时可不可以，，

因为对于一架飞机来说，有两个时间点，但只能选择一个，也就是说a, b 是相互排斥的，，就像上面那道题中的每个党派中只选择一个人一样，，同时对于每两架飞机之间，他们选择的降落时间的差的绝对值应该是至少大于x的，，，这样就能看出一个限制条件，，即：对于第i架飞机选择的降落时间 $a_i$ 与第j架飞机选择的降落时间 $a_j$ 之间满足 $abs(a_i - a_j) \geq x$，，我们可以遍历每一架飞机和它后面的飞机所选择的降落时间的结果，，对于不满足条件的就可以认为是 **选择了第i架的一个降落时间点就不能选第j架的一个降落的时间点** ，，，这就是最后提取出来的限制条件，，也就是 **选择了第i架的一个时间点就必须选第j架的另一个时间点** 和 **选择了第j架的一个时间点就必须选第i架飞机的另一个时间点** ，，，（~~这里有一个问题: 貌似没有保证 *选择了第i架飞机的一个时间点就不选第j架飞机的一个时间点时* ，选择第j架飞机的另一个时间点就也满足相差不小于x，，，但是我找到的博客没有一个说这个的，不考虑也能过，，当然也有可能我理解错了，，有的话，求指正，，~~做了下面那道题之后瞬间明白了，，，建图的时候那些时间点之间都枚举判断了，，不是一对一对的枚举，，，233）

抽象一下就是：首先我们用一个数组保存所有的时间点 $a_k$，下标从0开始到 $2 *n-1$ ，其中 $a_{2*k}, a_{2*k+1}$ 表示第k架飞机的两个时间，，我们遍历每一架飞机， 如果满足 $abs(a_{第i架飞机的两个时间} - a_{第j架飞机的两个时间}) \geq x$ 相当于是 $p_i->q_j$ 这样的限制关系，，那么建边就是 $p_i->q_j'$ 以及 $q_j->p_i'$  ，，然后跑2sat判断是否有解，，

然后看x的求法，，

> 最大xx中的最小值 或 最小xx中的最大值 一般都是用二分来枚举这个值，然后判断是否满足一定条件

我们可以枚举x，，然后用这个x来建图跑一下判断是否可行来求出其最大值，，

[参考](http://www.cnblogs.com/L-Excalibur/p/8513386.html)

我这种写法貌似时间复杂度很不好，，6s左右，，emmm不知道那里写崩了，，可能是那个存数据的vector的锅，，，


```cpp
#include <bits/stdc++.h>
// #include <iostream>
// #include <cstdio>
// #include <cstdlib>
// #include <string.h>
// #include <vector>
// #include <queue>
#include <stack>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
const int inf = 0x3f3f3f3f;//1061109567
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-6;
const double pi = 3.14159265358979;
const int maxn = 1e4 + 5;
const int maxm = 2e7 + 5;
const int mod = 1e9 + 7;

struct edge
{
    int to, next;
}edge[maxm];
int tot, head[maxm];
void init()
{
    tot = 0;
    memset(head, -1, sizeof head);
}
void addedge(int u, int v)
{
    edge[tot].to = v;
    edge[tot].next = head[u];
    head[u] = tot++;
}

bool vis[maxn];
int sta[maxn], top;
bool dfs(int u)
{
    if(vis[u ^ 1])return false;
    if(vis[u])return true;
    vis[u] = true;
    sta[++top] = u;
    for(int i = head[u]; ~i; i = edge[i].next)
        if(!dfs(edge[i].to))
            return false;
    return true;
}
bool twosat(int n)
{
    memset(vis, false, sizeof vis);
    for(int i = 0; i < n; i += 2)
    {
        if(vis[i] || vis[i ^ 1]) continue;
        top = -1;
        if(!dfs(i))
        {
            while(~top)vis[sta[top--]] = false;
            if(!dfs(i ^ 1))return false;
        }
    }
    return true;
}
int n;
vector<pair<int, int> > e;
int abss(int x){return x < 0 ? -x : x;}
bool check(int x)
{
    init();
    for(int i = 0; i < e.size(); ++i)
    {
        for(int j = i + 1; j < e.size(); ++j)
        {
            if(abss(e[i].first - e[j].first) < x)
                addedge(i << 1, j << 1 | 1), addedge(j << 1, i << 1 | 1);
            if(abss(e[i].first - e[j].second) < x)
                addedge(i << 1, j << 1), addedge(j << 1 | 1, i << 1 | 1);
            if(abss(e[i].second - e[j].first) < x)
                addedge(i << 1 | 1, j << 1 | 1), addedge(j << 1, i << 1);
            if(abss(e[i].second - e[j].second) < x)
                addedge(i << 1 | 1, j << 1), addedge(j << 1 | 1, i << 1);
        }
    }
    if(twosat(2 * n))   return true;
    else                return false;
}
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
    // ios_base::sync_with_stdio(0);
    // cin.tie(0);cout.tie(0);
    while(~scanf("%d", &n))
    {
        int u, v;
        vector<pair<int, int> >().swap(e);
        e.clear();
        for(int i = 1; i <= n; ++i)
        {
            scanf("%d%d", &u, &v);
            e.push_back(make_pair(u, v));
        }
        int l = 0, r = 10000001;
        int ans;
        while(l <= r)
        {
            int mid = (l + r) >> 1;
            if(check(mid))l = mid + 1, ans = mid;
            else    r = mid - 1;
        }
        printf("%d\n", ans);
    }
    return 0;    
}
```

## [HDU-3622-Bomb Game](http://acm.hdu.edu.cn/showproblem.php?pid=3622)


这道题和上面那道题差不多，也是二分枚举+建图判断可行性，，为了精度可以先不开方直接枚举 $(2*r)^2$ 的值，，，

题意就是n对可以放置炸弹的点，，选择没对点中的一个，同时可以为每个炸弹设置一个爆炸范围r，，但是每一个炸弹的爆炸范围不能波及到其他的点，，求一个最大的r，，，

因为和上面那题差不多，，直接看代码吧，，，


```cpp
// #include <bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string.h>
#include <vector>
#include <cmath>
// #include <queue>
#include <stack>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
const int inf = 0x3f3f3f3f;//1061109567 > 1e10
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-6;
const double pi = 3.14159265358979;
const int maxn = 1e5 + 5;
const int maxm = 2e7 + 5;
const int mod = 1e9 + 7;

struct edge
{
    int to, next;
}edge[maxn];
int tot, head[maxn];
void init()
{
    tot = 0;
    memset(head, -1, sizeof head);
}
void addedge(int u, int v)
{
    edge[tot].to = v;
    edge[tot].next = head[u];
    head[u] = tot++;
}
bool vis[maxn];
int sta[maxn], top;
bool dfs(int u)
{
    if(vis[u ^ 1])return false;
    if(vis[u])return true;
    vis[u] = true;
    sta[++top] = u;
    for(int i = head[u]; ~i; i = edge[i].next)
        if(!dfs(edge[i].to))
            return false;
    return true;
}
bool twosat(int n)
{
    memset(vis, false, sizeof vis);
    for(int i = 0; i < n; i += 2)
    {
        if(vis[i] || vis[i ^ 1])continue;
        top = -1;
        if(!dfs(i))
        {
            while(~top)vis[sta[top--]] = false;
            if(!dfs(i ^ 1))return false;
        }
    }
    return true;
}
#define x first
#define y second
vector<pair<int, int> > c;
int n;
inline int dis(int i, int j)
{
    return (c[i].x - c[j].x) * (c[i].x - c[j].x) + (c[i].y - c[j].y) * (c[i].y - c[j].y);
}
bool check(int x)
{
    init();
    memset(vis, false, sizeof false);
    for(int i = 0; i < 2 * n; ++i)
        for(int j = i + 1; j < 2 * n; ++j)
            if(dis(i, j) < x)
                addedge(i, j ^ 1), addedge(j, i ^ 1);
    if(twosat(2 * n))return true;
    return false;
}
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
    // ios_base::sync_with_stdio(0);
    // cin.tie(0);cout.tie(0);
    // int k = 2e9;
    // cout << k << endl;
    while(~scanf("%d", &n))
    {
        int x, y;
        c.clear();
        for(int i = 1; i <= n; ++i)
        {
            scanf("%d%d", &x, &y);
            c.push_back(make_pair(x, y));
            scanf("%d%d", &x, &y);
            c.push_back(make_pair(x, y));
        }
        int l = 0, r = inf;
        while(l < r)
        {
            if(l + 1 == r)break;
            int mid = (l + r) >> 1;
            if(check(mid))l = mid;
            else r = mid;
        }
        double ans = sqrt(l) / 2.0;
        printf("%.2f\n", ans);
    }
    return 0;    
}
```
## [HDU-4115](http://acm.hdu.edu.cn/showproblem.php?pid=4115)

这道题是利用2sat判断是否有解，，，

题意就是两人玩石头剪刀布，一共玩n轮，，其中一个人 ~~优吉欧~~ bob的出手情况给你，，

然后对于另一个人爱丽丝她有一些每轮之间出手的限制情况，k==0时表示a轮与b轮的出手要一致，为1时表示出手要不一样，，问你爱丽丝有没有赢的情况，，，

这种题一般都是建图麻烦一些，，反而2sat算法本身不会有大的改变，当函数调用就行了，，，

我一开始想着，p==q的限制条件可不可以直接连一条p->q的边，不等就像之前那样用逆否建两条边，，，然后一直有问题，，，后来看了别人的方法发现别人都是在k==0时找不等的，然后建两条边，等于一的时候找相等的，建两条边，，，，就是去找所有的 **矛盾项** ，，emmm

后来我总觉得可以直接利用都选的条件建图，，，最后找到一个[博客（12年的，，，）](https://blog.csdn.net/waitfor_/article/details/8038894)，，里面提到可以用必选项来建图，，就是最后的建图有些麻烦，，好费劲呐，，这种建图的方法大概是：对于要求相等的两组，找到相等的出手的话，就建一条双向边，因为一组里肯定不同，所以只需判断其中一个，，如果没有就连到它的对立面，，对于不要求相等的两组，，就找矛盾的条件建两条边，，，（其实还是直接找矛盾项建图方便一些，，，，，

最后注意一下细节，，，a了一次之后尝试改的好看一些，然后在细细碎碎的地方wa了几次

### 矛盾项

```cpp
// #include <bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string.h>
#include <vector>
#include <cmath>
// #include <queue>
#include <stack>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
const int inf = 0x3f3f3f3f;//1061109567 > 1e10
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-6;
const double pi = 3.14159265358979;
const int maxn = 1e5 + 5;
const int maxm = 2e7 + 5;
const int mod = 1e9 + 7;

struct edge
{
    int to, next;
}edge[maxn];
int tot, head[maxn];
void init()
{
    tot = 0;
    memset(head, -1, sizeof head);
}
void addedge(int u, int v)
{
    edge[tot].to = v;
    edge[tot].next = head[u];
    head[u] = tot++;
}
bool vis[maxn];
int sta[maxn], top;
bool dfs(int u)
{
    if(vis[u ^ 1])return false;
    if(vis[u])return true;
    vis[u] = true;
    sta[++top] = u;
    for(int i = head[u]; ~i; i = edge[i].next)
        if(!dfs(edge[i].to))
            return false;
    return true;
}
bool twosat(int n)
{
    memset(vis, false, sizeof vis);
    for(int i = 0; i < n; i += 2)
    {
        if(vis[i] || vis[i ^ 1])continue;
        top = -1;
        if(!dfs(i))
        {
            while(~top)vis[sta[top--]] = false;
            if(!dfs(i ^ 1))return false;
        }
    }
    return true;
}
struct node
{
    int a, b, c;
}node[maxn];
int n, m;
int a[maxn], b[maxn];
inline void f(int i, bool cnt)
{
    if(((bool)(a[node[i].a] - a[node[i].b])) == cnt)addedge(node[i].a, node[i].b ^ 1), addedge(node[i].b, node[i].a ^ 1);
    if(((bool)(a[node[i].a] - a[node[i].b ^ 1])) == cnt)addedge(node[i].a, node[i].b), addedge(node[i].b ^ 1, node[i].a ^ 1);
    if(((bool)(a[node[i].a ^ 1] - a[node[i].b])) == cnt)addedge(node[i].a ^ 1, node[i].b ^ 1), addedge(node[i].b, node[i].a);
    if(((bool)(a[node[i].a ^ 1] - a[node[i].b ^ 1])) == cnt)addedge(node[i].a ^ 1, node[i].b), addedge(node[i].b ^ 1, node[i].a);
}
bool solve()
{
    init();
    //~~这样写还会变慢，，，，，emmmm~~换成inline就行了，，，，
    // for(int i = 1; i <= m; ++i)
    // {
    //     if(node[i].c)
    //         f(i, false);
    //     else    
    //         f(i, true);
    // }
    for(int i = 1; i <= m; ++i)
    {
        if(node[i].c)
        {
            if(a[node[i].a] == a[node[i].b])addedge(node[i].a, node[i].b ^ 1), addedge(node[i].b, node[i].a ^ 1);
            if(a[node[i].a] == a[node[i].b ^ 1])addedge(node[i].a, node[i].b), addedge(node[i].b ^ 1, node[i].a ^ 1);///////////////
            if(a[node[i].a ^ 1] == a[node[i].b])addedge(node[i].a ^ 1, node[i].b ^ 1), addedge(node[i].b, node[i].a);
            if(a[node[i].a ^ 1] == a[node[i].b ^ 1])addedge(node[i].a ^ 1, node[i].b), addedge(node[i].b ^ 1, node[i].a);
            // f(i, true);
        }
        else
        {
            if(a[node[i].a] != a[node[i].b])addedge(node[i].a, node[i].b ^ 1), addedge(node[i].b, node[i].a ^ 1);
            if(a[node[i].a] != a[node[i].b ^ 1])addedge(node[i].a, node[i].b), addedge(node[i].b ^ 1, node[i].a ^ 1);
            if(a[node[i].a ^ 1] != a[node[i].b])addedge(node[i].a ^ 1, node[i].b ^ 1), addedge(node[i].b, node[i].a);
            if(a[node[i].a ^ 1] != a[node[i].b ^ 1])addedge(node[i].a ^ 1, node[i].b), addedge(node[i].b ^ 1, node[i].a);
            
            // f(i, false);
        }
    }
    if(twosat(n * 2))return true;
    return false;
}

// bool solve()
// {
//     init();
//     for(int i = 1; i <= m; ++i)
//     {
//         if(node[i].c)
//         {
//             if(a[node[i].a] == a[node[i].b])addedge(node[i].a, node[i].b ^ 1), addedge(node[i].b, node[i].a ^ 1);
//             else if(a[node[i].a] == a[node[i].b ^ 1])addedge(node[i].a, node[i].b), addedge(node[i].b ^ 1, node[i].a ^ 1);
//             if(a[node[i].a ^ 1] == a[node[i].b])addedge(node[i].a ^ 1, node[i].b ^ 1), addedge(node[i].b, node[i].a);
//             else if(a[node[i].a ^ 1] == a[node[i].b ^ 1])addedge(node[i].a ^ 1, node[i].b), addedge(node[i].b ^ 1, node[i].a);
//         }
//         else
//         {
//             if(a[node[i].a] == a[node[i].b])addedge(node[i].a, node[i].b), addedge(node[i].b, node[i].a);
//             else if(a[node[i].a] == a[node[i].b ^ 1])addedge(node[i].a, node[i].b ^ 1), addedge(node[i].b ^ 1, node[i].a);
//             else addedge(node[i].a, node[i].a ^ 1);

//             if(a[node[i].a ^ 1] == a[node[i].b])addedge(node[i].a ^ 1, node[i].b), addedge(node[i].b, node[i].a ^ 1);
//             else if(a[node[i].a ^ 1] == a[node[i].b ^ 1])addedge(node[i].a ^ 1, node[i].b ^ 1), addedge(node[i].b ^ 1, node[i].a ^ 1);
//             else addedge(node[i].a ^ 1, node[i].a);

//             if(a[node[i].b] != a[node[i].a] && a[node[i].b] != a[node[i].a ^ 1])addedge(node[i].b, node[i].b ^ 1);
//             if(a[node[i].b ^ 1] != a[node[i].a] && a[node[i].b ^ 1] != a[node[i].a ^ 1])addedge(node[i].b ^ 1, node[i].b);
//         }
//     }
//     if(twosat(n * 2))return true;
//     return false;
// }
int getb(int x)
{
    if(x == 1)return 2;
    if(x == 2)return 3;
    if(x == 3)return 1;
}
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
    // ios_base::sync_with_stdio(0);
    // cin.tie(0);cout.tie(0);
    int t;scanf("%d", &t);
    int cnt = 1;
    while(t--)
    {
        scanf("%d%d", &n, &m);
        for(int i = 0; i < n; ++i)scanf("%d", &a[i << 1]);
        for(int i = 1; i <= m; ++i)
        {
            scanf("%d%d%d", &node[i].a, &node[i].b, &node[i].c);
            --node[i].a;--node[i].b;
            node[i].a <<= 1;node[i].b <<= 1;
        }
        for(int i = 0; i < n; ++i)
            a[i << 1 | 1] = getb(a[i << 1]);
        if(solve())printf("Case #%d: yes\n", cnt++);
        else       printf("Case #%d: no\n", cnt++);
    }
    return 0;    
}
```

## [poj-3678-Katu Puzzle](http://poj.org/problem?id=3678)

一道经典题，，

题意就是求一个01序列是否有解，其中一些位置间的关系限定了，，，

重点是建图：

首先定义选a为0，选a'为1，那么：

+ $a \ AND \ b = 1$: 表示ab都必须为1，，所以 $a = 0$ 的时候就要让其矛盾也就是指到 $a = 1$，也就是 ``a->a'``，同理b也是，``b->b'``;
+ $a \ AND \ b = 0$: 表示ab中至少一个为零，所以 当 $a=0$ 时一定成立，不用管，当 $a=1$时b必须为0，也就是 ``a'->b``;同理对于b也是如此，，``b'-a``;
+ $a \ OR \ b = 1$: 表示ab中至少一个为1，所以当 $a=0$ 的时候b一定为1， 加边 ``a->b'``，，$a=1$ 的时候已经为1不用管，同理对于b来说就是加边 ``b->a'``;
+ $a \ OR \ b = 0$: 表示ab都必须为零，和最上面那个一样，$a=1$ 的时候一定不成立，所以要让它矛盾，加边 ``a'->a``， 同理加边 ``b'->b
+ $a \ XOR \ b = 1$: 表示ab不同，四种情况： $a=0,b=1$: ``a->b'``; $a=1,b=0$: ``a'->b``; $b=0,a=1$: ``b->a'``; $b=1,a=0$: ``b'->a``;
+ $a \ XOR \ b = 0$: 和上面相反的四种情况：$a=0,b=0$: ``a->b``; $a=1,b=1$: ``a'->b'``; $b=0,a=0$: ``b->a``; $b=1,a=1$: ``b'->a'``;

按照上面的建图就行了，，

[参考1](https://blog.csdn.net/kk303/article/details/9734729)

之前做题都是找矛盾边，，但这道题找矛盾边很麻烦，，直接找满足题意的边就行了，，（貌似要保证时对称的图？？？

同时像 $a=1,b=1$ 这种都选项可以拆分成两个来做：$a \bigwedge b=1 \implies (a \bigvee a) \bigwedge (b \bigvee b) = 1$ 然后就可以拆成； $a \bigvee a = 1 , b \bigvee b = 1$，（a为1，b为1），， 然后建边 ``a->a'`` 和 ``b->b'``；

[参考2](https://www.cnblogs.com/vongang/archive/2012/02/15/2352246.html)

[参考3](https://blog.csdn.net/u011815404/article/details/84978199)

[这个貌似是用的矛盾项+必选项做的](https://blog.csdn.net/uuuououlcz/article/details/41245851)

```cpp
// #include <bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string.h>
#include <vector>
#include <cmath>
// #include <queue>
// #include <stack>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
const int inf = 0x3f3f3f3f;//1061109567 > 1e10
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-6;
const double pi = 3.14159265358979;
const int maxn = 1e5 + 5;
const int maxm = 2e7 + 5;
const int mod = 1e9 + 7;

struct edge
{
    int to, next;
}edge[maxn];
int tot, head[maxn];
void init()
{
    tot = 0;
    memset(head, -1, sizeof head);
}
void addedge(int u, int v)
{
    edge[tot].to = v;
    edge[tot].next = head[u];
    head[u] = tot++;
    //cout << u << "->" << v << endl;
}
bool vis[maxn];
int sta[maxn], top;
bool dfs(int u)
{
    if(vis[u ^ 1])return false;
    if(vis[u])return true;
    vis[u] = true;
    sta[++top] = u;
    for(int i = head[u]; ~i; i = edge[i].next)
        if(!dfs(edge[i].to))
            return false;
    return true;
}
bool twosat(int n)
{
    memset(vis, false, sizeof vis);
    for(int i = 0; i < n; i += 2)
    {
        if(vis[i] || vis[i ^ 1])continue;
        top = -1;
        if(!dfs(i))
        {
            while(~top)vis[sta[top--]] = false;
            if(!dfs(i ^ 1))return false;
        }
    }
    return true;
}

int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
    // ios_base::sync_with_stdio(0);
    // cin.tie(0);cout.tie(0);
    int n, m;
    while(~scanf("%d%d", &n, &m))
    {
        int a, b, c;
        char s[10];
        init();
        for(int i = 1; i <= m; ++i)
        {
            scanf("%d%d%d%s", &a, &b, &c, s);
            if(s[0] == 'A')
            {
                if(c)
                {
                    addedge(a << 1, a << 1 ^ 1);    //a^b=1 => (a ! a) ^ (b ! b) => a -> a', b -> b'
                    addedge(b << 1, b << 1 ^ 1);
                }
                else
                {
                    addedge(a << 1 ^ 1, b << 1);    //a^b=0 => a -> b'(01), b -> a'(10)
                    addedge(b << 1 ^ 1, a << 1);
                }
            }
            else if(s[0] == 'O')
            {
                if(c)
                {
                    addedge(a << 1, b << 1 ^ 1);
                    addedge(b << 1, a << 1 ^ 1);
                }
                else
                {
                    addedge(a << 1 ^ 1, a << 1);
                    addedge(b << 1 ^ 1, b << 1);
                }
            }
            else
            {
                if(c)
                {
                    addedge(a << 1, b << 1 ^ 1);
                    addedge(a << 1 ^ 1, b << 1);
                    addedge(b << 1 ^ 1, a << 1);
                    addedge(b << 1, a << 1 ^ 1);
                }
                else
                {
                    addedge(a << 1 ^ 1, b << 1 ^ 1);
                    addedge(b << 1 ^ 1, a << 1 ^ 1);
                    addedge(a << 1, b << 1);
                    addedge(b << 1, a << 1);
                }
            }
        }
        
        if(twosat(2 * n))puts("YES");
        else             puts("NO");
    }
    return 0;    
}
```

## [处女座与宝藏](https://ac.nowcoder.com/acm/contest/327/F)

一切的起因，很早之前就听说过2sat，然后在寒假的那次牛客上碰到了这题，，然后想着要学会2sat，，，发现那时我 tarjan 没学过，，于是跑去学 tarjan ，，然后就一直拖拖到了上个星期，才重新捡起来看，，，

这道题和上面那几题相比，最大的不同是 **建图** ，，这道题2sat只是一个辅助的判断工具，但是建图的方法题目里没有明说，得自己去想出来其中的关系。。

题意： 有这么n个宝藏，还有m个开关，按下开关，对应控制的宝藏的状态就会改变，然后问你是否有宝藏全开的解，，每个开关会控制k个宝箱，，

**最后相当于是求一个开关的选择序列(比如说0是不按,1是表示按下)** ，，所以最后宝箱的起始状态只是用来让我们限制开关选择的限制条件，大致的思想就是：*如果起始状态是打开的，对应开关的选择就是 **按下->不按** 表示选择不按的情况;相反的就是 **不按->按下** ;*

基于这个思想，我们要预处理一下开关，，因为题目是给的第i个开关控制的k个宝藏，而我们建图的时候是要 *根据第i个宝藏被一些开关控制的情况* 来得出限制条件。

最后说一下建图的方法：
如果用 $u_i$ 表示第i个开关的选择不按的情况，$u_i+1$ 就表示第i个开关选择按下的情况，那么：
+ 对于没有开关控制的宝箱，如果起始状态是打开的，那么这个宝箱就不管了，，但如果是关闭的，因为没有开关会控制它，所以它无论如何都是关闭的，此时是无解的;
+ 对于只有一个开关控制的宝箱，如果起始状态是打开的，那我必须选择对应的开关为 **不按** 的情况，也就是 ``u^1->u``; 同理对立的情况就是： ``u->u^1``;
+ 对于两个开关控制的宝箱，如果起始状态是打开的，和上面一样，我必须保证开关的变动之后还是打开的，所以一共有2种情况：两个都不按，两个都按下，一共是建4条边： ``u->v`` , ``v->u`` , ``u^1->v^1`` , ``v^1->u^1``; 同理可以得出对立面就要保证要按下一个开关，一个按下，另一个就不能按下: ``u->v^1`` , ``u^1->v`` , ``v->u^1`` , ``v^1->u``;

最后说一下（好像刚刚说过这是最后一个了哎？？！！）这道题的坑点，，

+ 首先是预处理的时候要统一好你的下标，有的人习惯从1开始（貌似其他人很多都是这么搞得），，这样的话对于没有开关控制的宝箱要建两条初始边，，要是从0开始的话（比如我）就要在读入每个开关控制的k个宝箱的编号的时候减一；
+ 这道题是单组测试，本来说用多组读入到文件末应该是没问题的，但是我一直卡在最后一组上，，wa了十几发，一度怀疑是代码写错，，该到最后没得改了，就把 ``while(~scanf("%d%d", &n, &m))`` 去了就A了，，换回一开始wa的也这样改了也是A了，，，谜一般的操作，，
+ 还有就是题目说是保证每个宝藏最多被两个开关控制，，所以建图的时候判断开关的数量时就直接 ``if(balabala){...}else if(balabala){...}}else{...}`` 最后一个就没写判断，，按照一般的想法应该是没问题的，，但是这里最后不写成 ``else if(balabala){}`` 也会卡最后一个测试用例，，，迷<<1，，，

代码：

### 染色法

```cpp
#include <bits/stdc++.h>
// #include <iostream>
// #include <cstdio>
// #include <cstdlib>
// #include <string.h>
// #include <vector>
// #include <cmath>
// #include <queue>
// #include <stack>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
const int inf = 0x3f3f3f3f;//1061109567 > 1e10
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-6;
const double pi = 3.14159265358979;
const int maxn = 1e6 + 5;
const int maxm = 2e7 + 5;
const int mod = 1e9 + 7;
  
struct edge
{
    int to, next;
}edge[maxn];
int tot, head[maxn];
void init()
{
    tot = 0;
    memset(head, -1, sizeof head);
}
void addedge(int u, int v)
{
    edge[tot].to = v;
    edge[tot].next = head[u];
    head[u] = tot++;
}
bool vis[maxn];
int sta[maxn], top;
bool dfs(int u)
{
    if(vis[u ^ 1])return false;
    if(vis[u])return true;
    vis[u] = true;
    sta[++top] = u;
    for(int i = head[u]; ~i; i = edge[i].next)
        if(!dfs(edge[i].to))
            return false;
    return true;
}
bool twosat(int n)
{
    memset(vis, false, sizeof vis);
    for(int i = 0; i < n; i += 2)
    {
        if(vis[i] || vis[i ^ 1])continue;
        top = -1;
        if(!dfs(i))
        {
            while(~top)vis[sta[top--]] = false;
            if(!dfs(i ^ 1))return false;
        }
    }
    return true;
}
vector<int> g[maxn];
int a[maxn];
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
    // ios_base::sync_with_stdio(0);
    // cin.tie(0);cout.tie(0);
    int n, m;
    scanf("%d%d", &n, &m);
    for(int i = 0; i < n; ++i)scanf("%d", &a[i]);
    int x, k;
    bool flag = false;
    for(int i = 0; i < m; ++i)
    {
        scanf("%d", &k);
        for(int j = 1; j <= k; ++j)
        {
            scanf("%d", &x);--x;
            g[x].push_back(i);
        }
    }
    int len, u, v;
    init();
    for(int i = 0; i < n; ++i)
    {
        len = g[i].size();
        if(len == 1)
        {
            u = g[i][0];u <<= 1;
            if(a[i])
                addedge(u, u ^ 1);
            else
                addedge(u ^ 1, u);
        }
        else if(len == 2)
        {
            u = g[i][0], v = g[i][1];
            u <<= 1; v <<= 1;
            if(a[i])
            {
                addedge(u, v ^ 1);
                addedge(u ^ 1, v);
                addedge(v, u ^ 1);
                addedge(v ^ 1, u);
            }
            else
            {
                addedge(u, v);
                addedge(v, u);
                addedge(u ^ 1, v ^ 1);
                addedge(v ^ 1, u ^ 1);
            }
        }
        else if(len == 0)
        {
            if(a[i])
            {
                puts("NO");
                flag = true;
                break;
            }
        }
 
    }
    if(flag)return 0;
    if(twosat(m << 1))  puts("YES");
    else                puts("NO");
    return 0;  
}
```

### tarjan

```cpp
#include <bits/stdc++.h>
// #include <iostream>
// #include <cstdio>
// #include <cstdlib>
// #include <string.h>
// #include <vector>
// #include <cmath>
// #include <queue>
// #include <stack>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
const int inf = 0x3f3f3f3f;//1061109567 > 1e10
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-6;
const double pi = 3.14159265358979;
const int maxn = 1e6 + 5;
const int maxm = 2e7 + 5;
const int mod = 1e9 + 7;

struct edge
{
    int to, next;
}edge[maxn];
int tot, head[maxn];
void init()
{
    int tot = 0;
    memset(head, -1, sizeof head);
}
void addedge(int u, int v)
{
    edge[tot].to = v;
    edge[tot].next = head[u];
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
    for(int i = head[u]; ~i; i = edge[i].next)
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
        }while(v != u);
    }
}
bool twosat(int n)
{
    memset(dfn, 0, sizeof dfn);
    memset(insta, false, sizeof insta);
    memset(num, 0, sizeof num);
    idx = scc = top = 0;
    for(int i = 0; i < n; ++i)
        if(!dfn[i])
            tarjan(i);
    for(int i = 0; i < n; i += 2)
        if(belong[i] == belong[i ^ 1])
            return false;
    return true;
}
vector<int> g[maxn];
int a[maxn];
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
    // ios_base::sync_with_stdio(0);
    // cin.tie(0);cout.tie(0);
    int n, m;
    scanf("%d%d", &n, &m);
    for(int i = 1; i <= n; ++i)scanf("%d", &a[i]);
    int x, k;
    bool flag = false;
    for(int i = 0; i <= n; ++i)g[i].clear();
    for(int i = 0; i < m; ++i)
    {
        scanf("%d", &k);
        for(int j = 1; j <= k; ++j)
        {
            scanf("%d", &x);
            g[x].push_back(i);
        }
    }
    int len, u, v;
    init();
    for(int i = 1; i <= n; ++i)
    {
        len = g[i].size();
        if(len == 1)
        {
            // u = g[i][0];u <<= 1;
            u = g[i][0] << 1;
            if(a[i])
                addedge(u, u ^ 1);
            else
                addedge(u ^ 1, u);
        }
        else if(len == 2)
        {
            // u = g[i][0]; v = g[i][1];
            // u <<= 1; v <<= 1;
            u = g[i][0] << 1;
            v = g[i][1] << 1;
            if(a[i])
            {
                addedge(u, v ^ 1);
                addedge(u ^ 1, v);
                addedge(v, u ^ 1);
                addedge(v ^ 1, u);
            }
            else
            {
                addedge(u, v);
                addedge(v, u);
                addedge(u ^ 1, v ^ 1);
                addedge(v ^ 1, u ^ 1);
            }
        }
        else if(len == 0)
        {
            if(a[i])
            {
                // puts("NO");
                // flag = true;
                // break;
                addedge(0, 1);
                addedge(1, 0);
            }
        }
    }
    if(twosat(m << 1))  puts("YES");
    else                puts("NO");
    return 0;   
}
```

其实这两没啥区别，，，总写第一个是因为第一好写(wu)，，，tarjan稍慢一些（不过也没多少），，，

写了一天半的代码，，wa了近20发，，，心态快崩了QAQ，，溜了溜了

## [D. The Door Problem](https://codeforces.com/contest/776/problem/D)

这道题和上面那道宝藏的题一样，，（应该是牛客那道参考的这一道，，，

代码都一样直接交就行了，，建图的思想相同，

## [Let's go home](http://acm.hdu.edu.cn/showproblem.php?pid=1824)

按题意建图就行了，，（刚开始忘记给点乘2，wa了几发。。。

## [Astronauts UVALive - 3713](https://cn.vjudge.net/problem/UVALive-3713)

这题也不错，，题面给了你三种选择的限制关系，但是可以用年龄化成两种选择的限制关系，，一开始写出俩之后测试样例的输出和题所给的不一样，一度怀疑是自己图图又建错了，，后来想起来2sat问题不一定是唯一解啊，，把这个最重要的性质忘了，，我一直写的那个解法是求字典序最小的解啊，，，QAQ。。

题意就是有这么n个宇航员，每一个人的年龄给你，然后有这么3种任务，，最后一种是忽略年龄的，A任务要求只能年龄大于平均值的上，B任务则相反，，，其中一些人之间还有憎恨关系，即他俩不能在一个任务中，问你有没有一个可行的安排任务的方式，，有的话输出这种方式，，，

思路：我一开始想着要不要先不管AB任务的分配，也就是说将它俩看成一个任务，，然后和C任务选择分配，，最后根据年龄来选择AB任务的分配情况，，，但是写到一半发现不对，，对于年龄一个大于平均值的一个小于平均值的他们俩如果有憎恨关系的话他们俩是应该一个A一个B，，，如果按我那种想法的话就会出现两个A的情况（可能甚至不会出现，，因为这样建图会使得这种情况选择为不取，，会出现两个选C的情况，，，

后来又想了一会，，想着反正对于一个人来说不是C就是AB中的一个，，那么在建图的时候判断一下不就行了吗，，，然后1A了，，，

```cpp
// #include <bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string.h>
// #include <vector>
// #include <cmath>
// #include <queue>
// #include <stack>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
const int inf = 0x3f3f3f3f;//1061109567 > 1e10
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-6;
const double pi = 3.14159265358979;
const int maxn = 1e6 + 5;
const int maxm = 2e7 + 5;
const int mod = 1e9 + 7;

struct edge
{
    int to, next;
}edge[maxn];
int tot, head[maxn];
void init()
{
    tot = 0;
    memset(head, -1, sizeof head);
}
void addedge(int u, int v)
{
    edge[tot].to = v;
    edge[tot].next = head[u];
    head[u] = tot++;
}
bool vis[maxn];
int sta[maxn], top;
bool dfs(int u)
{
    if(vis[u ^ 1])return false;
    if(vis[u])return true;
    vis[u] = true;
    sta[++top] = u;
    for(int i = head[u]; ~i; i = edge[i].next)
        if(!dfs(edge[i].to))
            return false;
    return true;
}
bool twosat(int n)
{
    memset(vis, false, sizeof vis);
    for(int i = 0; i < n; i += 2)
    {
        if(vis[i] || vis[i ^ 1])continue;
        top = -1;
        if(!dfs(i))
        {
            while(~top)vis[sta[top--]] = false;
            if(!dfs(i ^ 1))return false;
        }
    }
    return true;
}
int a[maxn];
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
    // ios_base::sync_with_stdio(0);
    // cin.tie(0);cout.tie(0);
    int n, m;
    while(~scanf("%d%d", &n, &m) && n + m)
    {
        int sum = 0;
        for(int i = 1; i <= n; ++i)scanf("%d", &a[i]);
        for(int i = 1; i <= n; ++i)sum += a[i];
        init();
        int u, v;
        for(int i = 1; i <= m; ++i)
        {
            scanf("%d%d", &u, &v);
            if((a[u] * n <= sum && a[v] * n <= sum) || (a[u] * n >= sum && a[v] * n >= sum))
            {
                --u; --v;
                u <<= 1; v <<= 1;
                addedge(u, v ^ 1);
                addedge(u ^ 1, v);
                addedge(v, u ^ 1);
                addedge(v ^ 1, u);
            }
            else
            {
                --u; --v;
                u <<= 1; v <<= 1;
                // addedge(u, v);
                // addedge(v, u);
                // addedge(u, v ^ 1);
                // addedge(u ^ 1, v);
                // addedge(v, u ^ 1);
                // addedge(v ^ 1, u);
                addedge(u ^ 1, v);
                addedge(v ^ 1, u);
            }
            
        }
        if(!twosat(n << 1))puts("No solution.");
        else
        {
            for(int i = 0; i < n; ++i)
            {
                if(vis[i << 1])
                {
                    if(a[i + 1] * n < sum)puts("B");
                    else puts("A");
                }
                else puts("C");
            }
        }
        // for(int i = 0; i < 2 * n; i += 2)
        //     cout << vis[i] << vis[i ^ 1] << endl;
        
    }
    return 0;   
}
```



~~强连通分量的方法明天，啊不白天再说吧，，，溜了溜了~~

~~鸽了一个多月，，从寒假到三月底，，，emmmm~~
~~(loading)~~

2019-4-2
(end)