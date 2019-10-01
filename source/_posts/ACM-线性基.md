---
title: ACM-线性基
date: 2019-07-24 09:21:09
tags:
- 刷题
- 数学
categories:
- ACM-线性基
---

# 概述

最近的几场多校出现了好几次线性基的题目，，会想起之前在尝试西安区域赛的一道区间异或和最大的问题时，当时因为异或的性质知道这道题肯定用线段树来维护区间的最值，但是不知道用什么来处理异或和最大，，即使后来知道了可以用线性基来处理，看了一些博客也因为感觉太难收藏到书签就再也没看过，，，于是这几天，花了差不多4、5天的时间，大概看懂了这部分的内容，感觉这只是一种专门处理异或问题的一个工具，光这个工具没什么意思，，现在的很多题目都是用线性基套各种东西，，比如说很常见的线段树（大多都是询问）、树链剖分（也就是树上路径的异或问题，主要是求LCA来维护）、简单图以及像杭电第一场的那题一样贪心魔改线性基板子等等，，不可能单纯的只是用线性基板子来求一个什么最值，K值，并交等等性质，下面是我这几天学习线性基的简单的一个学习过程的记录。

<!-- more -->

# 数学知识

关于线性基，虽然看起来这三个字很高深，，但是等大致了解之后，就会发现，这只是一个简单的数学工具，基础知识就是学过的线性代数  ~~（虽然早就忘记了）~~ 。

抛开线性代数，我个人的理解就是 线性基就是一个用来表示给定集合的一个最少的数的集合， 用线性基这个集合，可以表示它所 *张成* 的一个集合，对于我们遇到的大多数题目来说，就是用一个最少的数的集合 $lb$ 通过 **异或** 的形式可以表示数组（集） $a$ 。

我们可以用 $n$ 个 $2^i$ 这样不同的二进制数组 $a_i$ 的异或来表示所有 $[0 ...2^n-1]$ 的任意一个数，例如： $[01], [10]$ 可一个表示 $0, 1, 2, 3$ 。 但如果去掉 $a_i$ 中的一些数，显然能表示的数集就减少了些，，反过来想，对于任意一个数集，我们都可以找到这样一个数集的子集 $a_i$ ，$a_i$ 中的任意数的异或和可以表示这个数集中的每一个数，这样我们相当于对原数集进行了压缩，用一个小的集合表示出来了，，而且显然他的最大大小就是数在二进制表示的位数，

可以这样表示的原因是因为对于一个线性基，他可以看作是一个 向量组 ，这些向量间是线性无关的，也就是说任意一个向量都不可以通过其他的向量表示，也就是线性基中的每一个数都不可以通过其他数的异或得到，，这样的一个向量组的线性组合可以 **张成** 一个线性空间，，，[（具体的更加详细的数学知识可以看这里）](https://blog.sengxian.com/algorithms/linear-basis) 或者 [维基](https://zh.wikipedia.org/wiki/%E5%9F%BA_(%E7%B7%9A%E6%80%A7%E4%BB%A3%E6%95%B8))



# 线性基的作用

在ACM中大多数的线性基的作用就是维护一段数的异或的各种性质，例如最值、K值、一个数 $x$ 能否可以被这些数的异或和表示、线性基的交并等等。这只是一个工具，主要是和其他知识点的结合。

# 线性基的基本的板子

不知道是这个知识点不那么重要还是怎么的，，不像其他的算法，网络上找到的关于线性基好的资料很少很少，，尤其是板子，，没有注释，，新手 ~~（我）~~ 一开始根本看不懂，，只能硬啃前面的数学推导，，然后转化成代码，，，最后自己在借鉴别人的基础上弄出了一份自己的板子，，，~~（怕不是过几天就忘了写的什么）~~

## 线性基的表示

根据定义，线性集就是一个数的集合，而且长度一般题中会给，，ll就是64，int就是32等等，，所以他就是一个数组就行了，，，

```cpp
static const int maxbase = 35;
ll a[maxbase + 1];
```
## 线性基的插入

线性基的最基本的操作就是遍历一个数集，，然后挑出其中的线性基，这个过程就是将一个数 $t$ 插入到线性基中，，对于当前线性基 $a$ ，如果它中的元素和 $t$ 线性无关，那么 $t$ 就是一个基底，，把他插入到线性基中，，根据定义，，如果发现是线性相关的，，那么就说明现在的线性基 $a$ 可以表示这个数，，一顿操作之后，，$t$ 一定变成了0，，（用这个可以判断是否一个数能被线性基表示，，，

插入的本质就是一个维护线性基矩阵的过程，，有两种维护的形式，，一种就是不管插入的元素对其他元素的影响，，维护一个上三角的线性基矩阵，，这样的时间复杂读低一些； 另一种就是利用高斯消元，，对于一个可以插入的元素，**先用下面的行来消自己，然后用自己消上面几行** ，，这样可以保证插入一个元素后，线性基的矩阵只有插入的那一行对应的那一位是1，，其他的都是零，，也就是一个对角矩阵。

```cpp
bool insert(ll t)
{
    //暴力插入一个数，维护的是一个上三角型的线性基矩阵，时间复杂度低，当待插入元素能插入时，返回true
    for(int i = maxbase; i >= 0; --i)
    {
        if(t & (1ll << i))
        {
            if(!a[i])
            {
                a[i] = t;
                break;
            }
            t ^= a[i];
        }
    }
    if(t == 0)flag = true;
    return t;
}
bool query(ll t)
{
    // 询问t是否可以被当前线性基表示，不插入
    if(t > queryMax())return false;
    if(t == 0)return true;
    for(int i = maxbase; i >= 0; --i)
    {
        if(t & (1ll << i))
        {
            if(!a[i])
            {
                return false;
            }
            t ^= a[i];
        }
    }
    return true;
}
void Insert(ll t)
{
    //插入一个线性基，利用高斯消元法维护一个对角矩阵
    for(int i = maxbase; i >= 0; --i)
    {
        if(t >> i & 1)
        {
            if(a[i])t ^= a[i];
            else
            {
                a[i] = t;
                for(int j = i - 1; j >= 0; --j)if(a[j] && (a[i] >> j & 1))a[i] ^= a[j];
                for(int j = i + 1; j <= maxbase; ++j)if(a[j] >> j & 1)a[j] ^= a[i];
                break;
            }
        }
    }
}
```

## 线性基最值

+ 观察线性基，显然对于这个线性集表示的集合，他的最低那一行表示的元素一定是表示的数集异或的最小值，，所以只要从低到高返回第一非零的基底就可以了，，（注意判断0的情况）；
+ 对于最大值，我们只要遍历整个线性基，如果当前元素 $a_i$ 异或上后答案变大，就异或这一位，

```cpp
//询问最值
ll queryMax()
{
    ll ret = 0;
    for(int i = maxbase; i >= 0; --i)
        if((ret ^ a[i]) > ret)
            ret ^= a[i];
    return ret;
}
ll queryMin()
{
    for(int i = 0; i <= maxbase; ++i)
        if(a[i])
            return a[i];
    return 0;
}
```

## 多个线性基的并、交

### 并：

并好说，直接暴力加到一个线性基中就行了，，反正不能插入的会在插入过程中变成0，不用管

### 交： 

交是牛客第四场多校才遇到的，，~~（整个线性基也是多校才遇到）~~ ，（交的板子只找到一个看得懂的），，，交的大致思路是这样的 ~~（瞎猜ing）~~： 

+ 记第一个线性基为 $l_1$ ，另一个是 $l_2$ ，一个初始是 $l_1$ 的线性基 $all$ ，一个标记线性基 $full$ （应该。。）
+ 然后每次从 $l_2$ 中拿一个基 $v$ ，如果它能在 $all$ 中表示出来，也就是多次异或后的值为0，，那么就根据标记来插入这个 $v$ ，表示他是交集的一个。。

### 板子：

```cpp
LinearBasis merge(const LinearBasis &l1, const LinearBasis &l2)
{
    // 得到两个线性基的并
    LinearBasis ret = l1;
    for(int i = maxbase; i >= 0; --i)
        if(l2.a[i])
            ret.insert(l2.a[i]);
    return ret;
}
LinearBasis intersection(const LinearBasis &l1, const LinearBasis &l2)
{
    //得到两个线性基的交
    LinearBasis all, ret, full;
    ret.clear();
    for(int i = maxbase; i >= 0; --i)
    {
        all.a[i] = l1.a[i];
        full.a[i] = 1ll << i;
    }
    for(int i = maxbase; i >= 0; --i)
    {
        if(l2.a[i])
        {
            ll v = l2.a[i], k = 0;
            bool flag = true;
            for(int j = maxbase; j >= 0; --j)
            {
                if(v & (1ll << j))
                {
                    if(all.a[j])
                    {
                        v ^= all.a[j];
                        k ^= full.a[j];
                    }
                    else
                    {
                        // l2's basis is not in l1's;
                        flag = false;
                        all.a[j] = v;
                        full.a[j] = k;
                        break;
                    }
                }
            }
            if(flag)
            {
                ll v = 0; // get intersection by k;
                for(int j = maxbase; j >= 0; --j)
                {
                    if(k & (1ll << j))
                    {
                        v ^= l1.a[j];
                    }
                }
                ret.insert(v);  //save ans
            }
        }
    }
    return ret;
}
```

## 线性基求第 K 大

（留坑，，，还没有做题。。。

# 线性基完整板子

```cpp
struct LinearBasis
{
    static const int maxbase = 35;
    bool flag = false;
    ll a[maxbase + 1];
    LinearBasis()
    {
        // memset(a, 0, sizeof a);
    }
    LinearBasis(ll *x, int n)
    {
        LinearBasis();
        build(x, n); 
    }
    void build(ll *x, int n)
    {
        for(int i = 1; i <= n; ++i)
            insert(x[i]);
    }
    void clear()
    {
        memset(a, 0, sizeof a);
    }
    bool insert(ll t)
    {
        //暴力插入一个数，维护的是一个上三角型的线性基矩阵，时间复杂度低，当待插入元素能插入时，返回true
        for(int i = maxbase; i >= 0; --i)
        {
            if(t & (1ll << i))
            {
                if(!a[i])
                {
                    a[i] = t;
                    break;
                }
                t ^= a[i];
            }
        }
        if(t == 0)flag = true;
        return t;
    }
    bool query(ll t)
    {
        // 询问t是否可以被当前线性基表示，不插入
        if(t > queryMax())return false;
        if(t == 0)return true;
        for(int i = maxbase; i >= 0; --i)
        {
            if(t & (1ll << i))
            {
                if(!a[i])
                {
                    return false;
                }
                t ^= a[i];
            }
        }
        return true;
    }
    void Insert(ll t)
    {
        //插入一个线性基，利用高斯消元法维护一个对角矩阵
        for(int i = maxbase; i >= 0; --i)
        {
            if(t >> i & 1)
            {
                if(a[i])t ^= a[i];
                else
                {
                    a[i] = t;
                    for(int j = i - 1; j >= 0; --j)if(a[j] && (a[i] >> j & 1))a[i] ^= a[j];
                    for(int j = i + 1; j <= maxbase; ++j)if(a[j] >> j & 1)a[j] ^= a[i];
                    break;
                }
            }
        }
    }
    LinearBasis merge(const LinearBasis &l1, const LinearBasis &l2)
    {
        // 得到两个线性基的并
        LinearBasis ret = l1;
        for(int i = maxbase; i >= 0; --i)
            if(l2.a[i])
                ret.insert(l2.a[i]);
        return ret;
    }
    LinearBasis intersection(const LinearBasis &l1, const LinearBasis &l2)
    {
        //得到两个线性基的交
        LinearBasis all, ret, full;
        ret.clear();
        for(int i = maxbase; i >= 0; --i)
        {
            all.a[i] = l1.a[i];
            full.a[i] = 1ll << i;
        }
        for(int i = maxbase; i >= 0; --i)
        {
            if(l2.a[i])
            {
                ll v = l2.a[i], k = 0;
                bool flag = true;
                for(int j = maxbase; j >= 0; --j)
                {
                    if(v & (1ll << j))
                    {
                        if(all.a[j])
                        {
                            v ^= all.a[j];
                            k ^= full.a[j];
                        }
                        else
                        {
                            // l2's basis is not in l1's;
                            flag = false;
                            all.a[j] = v;
                            full.a[j] = k;
                            break;
                        }
                    }
                }
                if(flag)
                {
                    ll v = 0; // get intersection by k;
                    for(int j = maxbase; j >= 0; --j)
                    {
                        if(k & (1ll << j))
                        {
                            v ^= l1.a[j];
                        }
                    }
                    ret.insert(v);  //save ans
                }
            }
        }
        return ret;
    }
    //询问最值
    ll queryMax()
    {
        ll ret = 0;
        for(int i = maxbase; i >= 0; --i)
            if((ret ^ a[i]) > ret)
                ret ^= a[i];
        return ret;
    }
    ll queryMin()
    {
        for(int i = 0; i <= maxbase; ++i)
            if(a[i])
                return a[i];
        return 0;
    }
};
```


# 线性基练习


## [模板题](https://www.luogu.org/problem/P3812)

[模板题](https://www.luogu.org/problem/P3812)

熟悉下板子，，敲一下就可以了，，

## [贪心+线性基插入元素的性质](https://www.luogu.org/problem/P4570)

[贪心+线性基插入元素的性质](https://www.luogu.org/problem/P4570)

对于每个数集中的数，有一个第二权值，要保证选的数集中的数异或和不为零的情况下权值最大，，只要选权值从大到小且下标异或和不为零的元素的贡献就可以了，

```cpp
// luogu-judger-enable-o2
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
// #include <random>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef long double ld;
// mt19937 rnd(time(0));
const int inf = 0x3f3f3f3f;//1061109567 > 1e9
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-5;
const double pi = 3.14159265358979;
const int maxn = 1e4 + 5;
const int maxm = 1e4 + 5;
const int mod = 1e9 + 7;

struct LinearBasis
{
    static const int maxbase = 62;
    ll a[maxbase + 1];
    LinearBasis()
    {
        memset(a, 0, sizeof a);
    }
    LinearBasis(ll *x, int n)
    {
        LinearBasis();
        build(x, n);   
    }
    void build(ll *x, int n)
    {
        for(int i = 1; i <= n; ++i)
            insert(x[i]);
    }
    bool insert(ll t)
    {
        for(int i = maxbase; i >= 0; --i)
        {
            if(t & (1ll << i))
            {
                if(!a[i])
                {
                    a[i] = t;
                    break;
                }
                t ^= a[i];
            }
        }
        return t;
    }
    void Insert(ll t)
    {
        for(int i = maxbase; i >= 0; --i)
        {
            if(t >> i & 1)
            {
                if(a[i])t ^= a[i];
                else
                {
                    a[i] = t;
                    for(int j = i - 1; j >= 0; --j)if(a[j] && (a[i] >> j & 1))a[i] ^= a[j];
                    for(int j = i + 1; j <= maxbase; ++j)if(a[j] >> j & 1)a[j] ^= a[i];
                    break;
                }
            }
        }
    }
    LinearBasis merge(const LinearBasis &l1, const LinearBasis &l2)
    {
        LinearBasis ret = l1;
        for(int i = maxbase; i >= 0; --i)
            if(l2.a[i])
                ret.insert(l2.a[i]);
        return ret;
    }
    ll queryMax()
    {
        ll ret = 0;
        for(int i = maxbase; i >= 0; --i)
            if((ret ^ a[i]) > ret)
                ret ^= a[i];
        return ret;
    }
    ll queryMin()
    {
        for(int i = 0; i <= maxbase; ++i)
            if(a[i])
                return a[i];
        return 0;
    }
};
pair<int, ll> p[maxn];
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);

    int n; cin >> n;
    for(int i = 1; i <= n; ++i)cin >> p[i].second >> p[i].first;
    sort(p + 1, p + 1 + n, greater<pair<int, ll>>());
    LinearBasis l;
    int ans = 0;
    for(int i = 1; i <= n; ++i)if(l.insert(p[i].second))ans += p[i].first;
    cout << ans << endl;

    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

## [线性基数量组合](https://www.luogu.org/problem/P3857)

[线性基数量组合](https://www.luogu.org/problem/P3857)

题目问一些 $01$ 序列可以表示的数（状态）有几种，，就是线性基的大小的2次方，，，

```cpp
// luogu-judger-enable-o2
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
// #include <random>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef long double ld;
// mt19937 rnd(time(0));
const int inf = 0x3f3f3f3f;//1061109567 > 1e9
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-5;
const double pi = 3.14159265358979;
const int maxn = 1e4 + 5;
const int maxm = 1e4 + 5;
const int mod = 1e9 + 7;

struct LinearBasis
{
    static const int maxbase = 62;
    ll a[maxbase + 1];
    LinearBasis()
    {
        memset(a, 0, sizeof a);
    }
    LinearBasis(ll *x, int n)
    {
        LinearBasis();
        build(x, n);   
    }
    void build(ll *x, int n)
    {
        for(int i = 1; i <= n; ++i)
            insert(x[i]);
    }
    bool insert(ll t)
    {
        for(int i = maxbase; i >= 0; --i)
        {
            if(t & (1ll << i))
            {
                if(!a[i])
                {
                    a[i] = t;
                    break;
                }
                t ^= a[i];
            }
        }
        return t;
    }
    void Insert(ll t)
    {
        for(int i = maxbase; i >= 0; --i)
        {
            if(t >> i & 1)
            {
                if(a[i])t ^= a[i];
                else
                {
                    a[i] = t;
                    for(int j = i - 1; j >= 0; --j)if(a[j] && (a[i] >> j & 1))a[i] ^= a[j];
                    for(int j = i + 1; j <= maxbase; ++j)if(a[j] >> j & 1)a[j] ^= a[i];
                    break;
                }
            }
        }
    }
    LinearBasis merge(const LinearBasis &l1, const LinearBasis &l2)
    {
        LinearBasis ret = l1;
        for(int i = maxbase; i >= 0; --i)
            if(l2.a[i])
                ret.insert(l2.a[i]);
        return ret;
    }
    ll queryMax()
    {
        ll ret = 0;
        for(int i = maxbase; i >= 0; --i)
            if((ret ^ a[i]) > ret)
                ret ^= a[i];
        return ret;
    }
    ll queryMin()
    {
        for(int i = 0; i <= maxbase; ++i)
            if(a[i])
                return a[i];
        return 0;
    }
};
char ch[55];
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);

    int n, m; cin >> m >> n;
    LinearBasis l;
    int ans = 0;
    for(int i = 1; i <= n; ++i)
    {
        cin >> ch;
        ll t = 0;
        for(int j = 0; j <= m - 1; ++j)
        {
            if(ch[j] == 'O')t |= 1;
            t <<= 1;
        }
        t >>= 1;
        if(l.insert(t))++ans;
    }
    cout << (1ll << ans) % 2008 << endl;

    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

## [LCA树链剖分暴力合并线性基求路径间点权异或和最大](https://www.luogu.org/problem/P3292)

[LCA树链剖分暴力合并线性基求路径间点权异或和最大](https://www.luogu.org/problem/P3292)

这题的大意是一个树，有点权，问你对于树上任意两点的路径 $u->v$ 的点权的异或和的最大值是多少，，

树上任意两点间的路径就是问 LCA ，，所以用那几种求LCA的方法就可以了，，之前看过树链剖分，，但是忘得差不多了，，捡起来重学了下，，

就和LCA的题一样，不过是线段树等数据结构维护的之不同了，，以前是和、最值什么的，，这题改成线性基就可以了，，维护一条路径的线性基，，然后进行线性基的合并就可以了，，，~~（数据数组开成int炸了好几发re~~

```cpp
// luogu-judger-enable-o2
// luogu-judger-enable-o2
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
// #include <random>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef long double ld;
// mt19937 rnd(time(0));
const int inf = 0x3f3f3f3f;//1061109567 > 1e9
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-5;
const double pi = 3.14159265358979;
const int maxn = 2e4 + 5;
const int maxm = 1e4 + 5;
const int mod = 1e9 + 7;

struct LinearBasis
{
    static const int maxbase = 63;
    ll a[maxbase + 1];
    LinearBasis()
    {
        memset(a, 0, sizeof a);
    }
    LinearBasis(ll *x, int n)
    {
        LinearBasis();
        build(x, n);   
    }
    void build(ll *x, int n)
    {
        for(int i = 1; i <= n; ++i)
            insert(x[i]);
    }
    void clear()
    {
        memset(a, 0, sizeof a);
    }
    bool insert(ll t)
    {
        for(int i = maxbase; i >= 0; --i)
        {
            if(t & (1ll << i))
            {
                if(!a[i])
                {
                    a[i] = t;
                    break;
                }
                t ^= a[i];
            }
        }
        return t;
    }
    void Insert(ll t)
    {
        for(int i = maxbase; i >= 0; --i)
        {
            if(t >> i & 1)
            {
                if(a[i])t ^= a[i];
                else
                {
                    a[i] = t;
                    for(int j = i - 1; j >= 0; --j)if(a[j] && (a[i] >> j & 1))a[i] ^= a[j];
                    for(int j = i + 1; j <= maxbase; ++j)if(a[j] >> j & 1)a[j] ^= a[i];
                    break;
                }
            }
        }
    }
    LinearBasis merge(const LinearBasis &l1, const LinearBasis &l2)
    {
        LinearBasis ret = l1;
        for(int i = maxbase; i >= 0; --i)
            if(l2.a[i])
                ret.insert(l2.a[i]);
        return ret;
    }
    void merge(const LinearBasis &r)
    {
        for(int i = maxbase; i >= 0; --i)
            if(r.a[i])
                insert(r.a[i]);
        return;
    }
    ll queryMax()
    {
        ll ret = 0;
        for(int i = maxbase; i >= 0; --i)
            if((ret ^ a[i]) > ret)
                ret ^= a[i];
        return ret;
    }
    ll queryMin()
    {
        for(int i = 0; i <= maxbase; ++i)
            if(a[i])
                return a[i];
        return 0;
    }
};
struct edge
{
    int to, nxt;
}edge[maxn * 3];
int tot, head[maxn * 3];
int top[maxn * 3];
int fa[maxn * 3];
int dep[maxn * 3];
int num[maxn * 3];
int p[maxn * 3], fp[maxn * 3];
int son[maxn * 3];
int pos;
ll a[maxn], w[maxn << 2];
void init()
{
    tot = 0;
    memset(head, -1, sizeof head);
    pos = 0;
    memset(son, -1, sizeof son);
    memset(w, 0, sizeof w);
}
void addedge(int u, int v)
{
    edge[tot].to = v;
    edge[tot].nxt = head[u];
    head[u] = tot++; 
}
void dfs1(int u, int pre, int d)
{
    dep[u] = d;
    fa[u] = pre;
    num[u] = 1;
    for(int i = head[u]; ~i; i = edge[i].nxt)
    {
        int v = edge[i].to;
        if(v != pre)
        {
            dfs1(v, u, d + 1);
            num[u] += num[v];
            if(son[u] == -1 || num[v] > num[son[u]])
                son[u] = v;
        }
    }
}
void dfs2(int u, int sp)
{
    top[u] = sp;
    p[u] = ++pos;
    fp[p[u]] = u;
    w[pos] = a[u];
    if(son[u] == -1)return;
    dfs2(son[u], sp);
    for(int i = head[u]; ~i; i = edge[i].nxt)
    {
        int v = edge[i].to;
        if(v != son[u] && v != fa[u])
            dfs2(v, v);
    }
}


struct node
{
    int l, r;
    LinearBasis lb;
}node[maxn * 6];
void pushup(int rt)
{
    node[rt].lb.merge(node[rt << 1].lb);
    node[rt].lb.merge(node[rt << 1 | 1].lb);
    // cout << endl;for(int i = 0; i <= 5; i ++)cout << node[rt << 1].lb.a[i] << "-";cout << endl << endl;
    // cout << endl;for(int i = 0; i <= 5; i ++)cout << node[rt << 1 | 1].lb.a[i] << "+";cout << endl << endl;
    // cout << endl;for(int i = 0; i <= 5; i ++)cout << node[rt].lb.a[i] << " ";cout << endl << endl;
}
void build(int rt, int l, int r)
{
    node[rt].l = l; node[rt].r = r;
    if(l == r){node[rt].lb.insert(w[l]);return;}
    int mid = l + r >> 1;
    build(rt << 1, l, mid);
    build(rt << 1 | 1, mid + 1, r);
    pushup(rt);
    return;
}
LinearBasis ret;
void query(int rt, int l, int r)
{
    if(node[rt].l == l && node[rt].r == r)
    {
        ret.merge(node[rt].lb);
        return;
    }
    int mid = node[rt].l + node[rt].r >> 1;
    if(r <= mid)query(rt << 1, l, r);
    else if(l > mid)query(rt << 1 | 1, l, r);
    else query(rt << 1, l, mid), query(rt << 1 | 1, mid + 1, r);
}
ll getAns(int u, int v)
{
    int f1 = top[u], f2 = top[v];
    LinearBasis ans;
    while(f1 != f2)
    {
        if(dep[f1] < dep[f2])
        {
            swap(f1, f2);
            swap(u, v);
        }
        ret.clear();
        query(1, p[f1], p[u]);
        // cout << endl; cout << p[f1] << " " << p[u] << " " << f1 << " " << u << endl;for(int i = 0; i <= 5; ++i)cout << ret.a[i] << " ";cout<< endl;
        // cout <<ret.queryMax() << "----------------------" << endl;
        ans.merge(ret);
        u = fa[f1]; f1 = top[u];
    }
    ret.clear();
    if(dep[u] > dep[v])swap(u, v);
    query(1, p[u], p[v]);
    ans.merge(ret);
    return ans.queryMax();
}

int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);

    init();
    int n, q; cin >> n >> q;
    for(int i = 1; i <= n; ++i)cin >> a[i];
    int u, v;
    for(int i = 1; i <= n - 1; ++i)
    {
        cin >> u >> v;
        addedge(u, v);
        addedge(v, u);
    }
    dfs1(1, 0, 1);
    dfs2(1, 1);
    build(1, 1, pos);
    while(q--)
    {
        cin >> u >> v;
        cout << getAns(u, v) << endl;
    }
    // for(int i = 5; i >= 0; --i)
    //     cout << node[1].lb.a[i] << endl;
    // ret.clear();
    // query(1, p[4], p[4]);
    // cout << ret.queryMax() << endl;

    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

## [牛客第四场多校xor](https://ac.nowcoder.com/acm/contest/884/B)

[牛客第四场多校xor](https://ac.nowcoder.com/acm/contest/884/B)

这题求得是一个区间线性基的并，，题目大意是给你一堆数集 $a_i$ ，， 然后一些询问 $l, r, x$ 问你 $a_l....a_r$ 的每一个集合能否异或出 $x$ ，，，

暴力线性基查询肯定会T ~~（说的就是我，，，~~，，

询问的是一个区间的每一个集合能否可以异或出数 $x$ ，，反过来想，，就是存在不存在一组线性基可以表示 $x$ 的情况下同时是每一组的一个子集，，，也就是说这些集合线性基的交能否表示出 $x$ ，， 一个线性基能否表示数很简单，，关键就是线性基的求交，，，弄好这个就可以用线段树维护区间的线性基的交，，，对于询问，最直接的想法就是求出询问区间的交，然后查看是否可以表示出数 $x$ ，，但是这样没必要，可能会T ，，，~~（别问我为什么，，，~~ ，，只要判断每一个询问的子区间的交是否可以表示即可，，把这些区间结果合并与就是答案，，，

~~（有一次把ll写成int，疯狂WA，， 还有线性基的交魔改代码爆炸~~ ，，，，

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
// #include <random>
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
const double eps = 1e-5;
const double pi = 3.14159265358979;
const int maxn = 5e4 + 5;
const int maxm = 1e4 + 5;
const int mod = 1e9 + 7;
  
  
struct LinearBasis
{
    static const int maxbase = 35;
    bool flag = false;
    ll a[maxbase + 1];
    LinearBasis()
    {
        // memset(a, 0, sizeof a);
    }
    LinearBasis(ll *x, int n)
    {
        LinearBasis();
        build(x, n); 
    }
    void build(ll *x, int n)
    {
        for(int i = 1; i <= n; ++i)
            insert(x[i]);
    }
    void clear()
    {
        memset(a, 0, sizeof a);
    }
    bool insert(ll t)
    {
        for(int i = maxbase; i >= 0; --i)
        {
            if(t & (1ll << i))
            {
                if(!a[i])
                {
                    a[i] = t;
                    break;
                }
                t ^= a[i];
            }
        }
        if(t == 0)flag = true;
        return t;
    }
    bool query(ll t)
    {
        if(t > queryMax())return false;
        if(t == 0)return true;
        for(int i = maxbase; i >= 0; --i)
        {
            if(t & (1ll << i))
            {
                if(!a[i])
                {
                    return false;
                }
                t ^= a[i];
            }
        }
        return true;
    }
    void Insert(ll t)
    {
        for(int i = maxbase; i >= 0; --i)
        {
            if(t >> i & 1)
            {
                if(a[i])t ^= a[i];
                else
                {
                    a[i] = t;
                    for(int j = i - 1; j >= 0; --j)if(a[j] && (a[i] >> j & 1))a[i] ^= a[j];
                    for(int j = i + 1; j <= maxbase; ++j)if(a[j] >> j & 1)a[j] ^= a[i];
                    break;
                }
            }
        }
    }
    LinearBasis merge(const LinearBasis &l1, const LinearBasis &l2)
    {
        LinearBasis ret = l1;
        for(int i = maxbase; i >= 0; --i)
            if(l2.a[i])
                ret.insert(l2.a[i]);
        return ret;
    }
    LinearBasis intersection(const LinearBasis &l1, const LinearBasis &l2)
    {
        LinearBasis all, ret, full;
        ret.clear();
        for(int i = maxbase; i >= 0; --i)
        {
            all.a[i] = l1.a[i];
            full.a[i] = 1ll << i;
        }
        for(int i = maxbase; i >= 0; --i)
        {
            if(l2.a[i])
            {
                ll v = l2.a[i], k = 0;
                bool flag = true;
                for(int j = maxbase; j >= 0; --j)
                {
                    if(v & (1ll << j))
                    {
                        if(all.a[j])
                        {
                            v ^= all.a[j];
                            k ^= full.a[j];
                        }
                        else
                        {
                            // l2's basis is not in l1's;
                            flag = false;
                            all.a[j] = v;
                            full.a[j] = k;
                            break;
                        }
                    }
                }
                if(flag)
                {
                    ll v = 0; // get intersection by k;
                    for(int j = maxbase; j >= 0; --j)
                    {
                        if(k & (1ll << j))
                        {
                            v ^= l1.a[j];
                        }
                    }
                    ret.insert(v);  //save ans
                }
            }
        }
        return ret;
    }
    ll queryMax()
    {
        ll ret = 0;
        for(int i = maxbase; i >= 0; --i)
            if((ret ^ a[i]) > ret)
                ret ^= a[i];
        return ret;
    }
    ll queryMin()
    {
        for(int i = 0; i <= maxbase; ++i)
            if(a[i])
                return a[i];
        return 0;
    }
}lb[maxn];
  
  
LinearBasis node[maxn << 2];
void pushup(int rt)
{
    node[rt] = node[rt].intersection(node[rt << 1], node[rt << 1 | 1]);
}
void build(int rt, int l, int r)
{
    if(l == r)
    {
        node[rt] = lb[l];
        return;
    }
    int mid = l + r >> 1;
    build(rt << 1, l, mid);
    build(rt << 1 | 1, mid + 1, r);
    pushup(rt);
    return;
}
LinearBasis ans;
bool query(int rt, int l, int r, int L, int R, ll x)
{
    if(L <= l && r <= R)
    {
        return node[rt].query(x);
    }
    int mid = l + r >> 1;
    bool flag1, flag2;
    flag1 = flag2 = true;
    if(L <= mid)flag1 = query(rt << 1, l, mid, L, R, x);
    if(R >  mid)flag2 = query(rt << 1 | 1, mid + 1, r, L, R, x);
    return flag1 & flag2;
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
    for(int i = 1; i <= n; ++i)
    {
        int num; cin >> num;
        ll x;
        for(int j = 1; j <= num; ++j)
        {
            cin >> x;
            lb[i].insert(x);
        }
    }
    build(1, 1, n);
    int l, r;ll x;
    while(m--)
    {
        cin >> l >> r >> x;
        if(query(1, 1, n, l, r, x))cout << "YES" << endl;
        else cout << "NO" << endl;
    }
      
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

## [杭电多校第一场Operation](http://acm.hdu.edu.cn/showproblem.php?pid=6579)

[杭电多校第一场Operation](http://acm.hdu.edu.cn/showproblem.php?pid=6579)

这题的大意是对于给定的数组，有两个操作，一个是询问一个区间的异或和的最大值，，另一个是在这个数组后面增加一个值，，，

这题也是诱使我学线性基的原因，，

题解说直接数据结构维护会T，，我也没试，，正解是贪心的维护一个 **前缀线性基** ，在每插入一个数时，，如果能插入，，尽可能的插到高位，，（这样可以保证靠近r的可以插入的数尽可能的在高位，，

也就是说，，对于任意的任意的一个区间，，不管它的长度多大，，，他的线性基最多是30个（针对这题），，，所以我们只需要维护r前面出现的较晚的新基，，这样每次询问，，都看得在r处的线性基中出现比l晚的基即可，，为了实现这个过程，，，给每一个线性基中的每一位都加一个标志位 $p_i$ ，， 在插入一个新的数时，，，尽可能的把他放在高位，，，（碰到一个可以插入的位置时，把他插在这里，，然后下推其它的基，，，

这题不能莽，直接开ll，，，会mle，，，

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
// #include <random>
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
const double eps = 1e-5;
const double pi = 3.14159265358979;
const int maxn = 5e5 + 5;
const int maxm = 1e4 + 5;
const int mod = 1e9 + 7;
  
  
struct LinearBasis
{
    typedef int type;
    static const int maxbase = 30;
    bool flag = false;
    type a[maxbase + 1];
    type p[maxbase + 1];
    LinearBasis()
    {
        memset(a, 0, sizeof a);
        memset(p, 0, sizeof p);
    }
    LinearBasis(type *x, int n)
    {
        LinearBasis();
        build(x, n); 
    }
    void build(type *x, int n)
    {
        for(int i = 1; i <= n; ++i)
            insert(x[i]);
    }
    void clear()
    {
        memset(a, 0, sizeof a);
        memset(p, 0, sizeof p);
    }
    bool insert(type t)
    {
        //暴力插入一个数，维护的是一个上三角型的线性基矩阵，时间复杂度低，当待插入元素能插入时，返回true
        for(int i = maxbase; i >= 0; --i)
        {
            if(t & (1ll << i))
            {
                if(!a[i])
                {
                    a[i] = t;
                    break;
                }
                t ^= a[i];
            }
        }
        if(t == 0)flag = true;
        return t;
    }
    bool insert2(type t, type pos)
    {
        for(int i = maxbase; i >= 0; --i)
        {
            if(t & (1ll << i))
            {
                if(!a[i])
                {
                    a[i] = t;
                    p[i] = pos;
                    break;
                }
                else if(pos > p[i])
                {
                    swap(pos, p[i]);
                    swap(t, a[i]);
                }
                t ^= a[i];
            }
        }
        if(t == 0)flag = true;
        return t;
    }
    bool query(type t)
    {
        // 询问t是否可以被当前线性基表示，不插入
        if(t > queryMax())return false;
        if(t == 0)return true;
        for(int i = maxbase; i >= 0; --i)
        {
            if(t & (1ll << i))
            {
                if(!a[i])
                {
                    return false;
                }
                t ^= a[i];
            }
        }
        return true;
    }
    void Insert(type t)
    {
        //插入一个线性基，利用高斯消元法维护一个对角矩阵
        for(int i = maxbase; i >= 0; --i)
        {
            if(t >> i & 1)
            {
                if(a[i])t ^= a[i];
                else
                {
                    a[i] = t;
                    for(int j = i - 1; j >= 0; --j)if(a[j] && (a[i] >> j & 1))a[i] ^= a[j];
                    for(int j = i + 1; j <= maxbase; ++j)if(a[j] >> j & 1)a[j] ^= a[i];
                    break;
                }
            }
        }
    }
    LinearBasis merge(const LinearBasis &l1, const LinearBasis &l2)
    {
        // 得到两个线性基的并
        LinearBasis ret = l1;
        for(int i = maxbase; i >= 0; --i)
            if(l2.a[i])
                ret.insert(l2.a[i]);
        return ret;
    }
    LinearBasis intersection(const LinearBasis &l1, const LinearBasis &l2)
    {
        //得到两个线性基的交
        LinearBasis all, ret, full;
        ret.clear();
        for(int i = maxbase; i >= 0; --i)
        {
            all.a[i] = l1.a[i];
            full.a[i] = 1ll << i;
        }
        for(int i = maxbase; i >= 0; --i)
        {
            if(l2.a[i])
            {
                type v = l2.a[i], k = 0;
                bool flag = true;
                for(int j = maxbase; j >= 0; --j)
                {
                    if(v & (1ll << j))
                    {
                        if(all.a[j])
                        {
                            v ^= all.a[j];
                            k ^= full.a[j];
                        }
                        else
                        {
                            // l2's basis is not in l1's;
                            flag = false;
                            all.a[j] = v;
                            full.a[j] = k;
                            break;
                        }
                    }
                }
                if(flag)
                {
                    type v = 0; // get intersection by k;
                    for(int j = maxbase; j >= 0; --j)
                    {
                        if(k & (1ll << j))
                        {
                            v ^= l1.a[j];
                        }
                    }
                    ret.insert(v);  //save ans
                }
            }
        }
        return ret;
    }
    //询问最值
    type queryMax()
    {
        type ret = 0;
        for(int i = maxbase; i >= 0; --i)
            if((ret ^ a[i]) > ret)
                ret ^= a[i];
        return ret;
    }
    type queryMax(type l)
    {
        type ret = 0;
        for(int i = maxbase; i >= 0; --i)
            if((ret ^ a[i]) > ret && l <= p[i])
                ret ^= a[i];
        return ret;
    }
    type queryMin()
    {
        for(int i = 0; i <= maxbase; ++i)
            if(a[i])
                return a[i];
        return 0;
    }
}lb[maxn];
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
        int n, m;
        cin >> n >> m;
        ll x;
        for(int i = 1; i <= n; ++i)
        {
            cin >> x;
            lb[i] = lb[i - 1]; 
            lb[i].insert2(x, i);
        }
        int op;
        ll lstans = 0;
        while(m--)
        {
            cin >> op;
            if(!op)
            {
                ll l, r;cin >> l >> r;
                l = (l ^ lstans) % n + 1;
                r = (r ^ lstans) % n + 1;
                if(l > r)swap(l, r);
                lstans = lb[r].queryMax(l);
                cout << lstans << endl;
            }
            else
            {
                ll x;cin >> x;
                x ^= lstans;
                lb[++n] = lb[n - 1];
                lb[n].insert2(x, n);
            }
            
        }

    }
      
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

## loading

还有几道题有时间再补把，，，，比如西安区域赛那道 ，，[cf](https://codeforces.com/problemset/problem/1100/F)这道，，貌似是杭电的原型题，，，


