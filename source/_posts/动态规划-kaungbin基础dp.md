---
title: 动态规划-kaungbin基础dp
date: 2019-02-23 16:59:39
tags:
- acm
- 刷题
categories:
- ACM-动态规划
---

[kuangbin基础dp专题](https://vjudge.net/contest/284684#overview)

做些题练练手

<!-- more -->

# A - Max Sum Plus Plus HDU - 1024 

这道题有两个坑点，一个是dp的状态转移方程的推导和化简优化还有一个是实现，，~~（废话，，哪个题不是这样，，）~~，，，

题意是给你一个长度为n的数组，，然后一个数m，，让你把这段数分成m段连续的子序列，，要求最后分成的这m段序列的和是最大的，，，

首先是状态的定义，，一开始我想着这该不会是区间dp的题吧，，但是m怎么用啊，，，后来看了别人的状态的定义差不多自己能推下来了，，

$dp[i][j]$ 表示取前i个数（最后一个序列的结尾一定时是a[i]）划分成j组时的最大的序列和，，

然后是状态转移方程的推导，，首先我们可以看出对于数 $a[i]$ 只有两种情况：

+ $(x_1, y_1), (x_2, y_2), (x_3, y_3),,,,,(x_j, y_j,a[i])$，，，即，把a[i]划到最后一个序列里（也就是第j组里），，或者
+ $(x_1, y_1), (x_2, y_2), (x_3, y_3),,,,,(x_{j-1}, y_{j-1}),(a[i])$，，，即，a[i]单独成为第j组，，，注意前面的j-1组的情况有很多，，所以我们要取前面i-1个数所组成的j-1的情况里的最大值

由以上我们可以写出状态转移方程：

$$
    dp[i][j]=
        max(dp[i-1][j] + a[i], max(dp[k][j-1] + a[i]))      \{ j-1 \leq k \leq i-1 \}
$$

所以此时的时间复杂度是 $O(n^3)$,,,空间复杂度是 $O(n^2)$，，n=1e6显然不行，，，然后就是dp里常见的优化：

+ 优化空间：dp里常见的优化空间的方法都是对高维的dp数组某一维的并不需要全局遍历的那一维去掉缩减，，也就是 **滚动数组**
+ 时间优化: 观察状态转移方程里的第二种情况的求最大值那一步，，我们每次需要的只是上一步中分成j-1组的所有情况里的最大值，，这个过程我们可以在计算分成j-1组的时候将最大值用一个数组保存下来给计算分成j组时使用，，这样就减少了一次遍历，，，时间复杂度降为 $O(n^2)$，，

所以最后的状态转移方程为：

$dp[i]=max(dp[i-1], mmax[i-1])+a[i]$

mmax[i]表示前i个数分成当前组数-1(j-1)时的最大值，，滚动数组优化后后面那个组数的维度就去掉了，，，每一次记录一下前i-1个数分成j-1组的最大值，更新一下mmax[i-1]就行了，，，

[参考1](https://www.cnblogs.com/kuangbin/archive/2011/08/04/2127085.html)
[参考2](https://blog.csdn.net/pmt123456/article/details/52695470)

这两篇博客是用dp[i][j]表示前j个数分成i组的最大值，，和我的实现在循环的变量的名称上有些不一样，，，

记得中间变量不要用已经有的m，，，，因为这个wa2哭，，，

最后的答案就是最后一次找到的最大值，，也就是那个中间变量，，


```cpp
//hdu
//#include <bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string.h>
#include <algorithm>
#include <queue>
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
int a[maxn], dp[maxn], mmax[maxn];
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    int n, m;
    while(~scanf("%d%d", &m, &n))
    {
        for(int i = 1; i <= n; ++i)scanf("%d", &a[i]);
        for(int i = 0; i <= n; ++i)dp[i] = 0;
        for(int i = 0; i <= n; ++i)mmax[i] = 0;
        int mx;
        for(int j = 1; j <= m; ++j)
        {
            mx = -inf;
            for(int i = j; i <= n; ++i)
            {
                dp[i] = max(dp[i - 1], mmax[i - 1]) + a[i];
                mmax[i - 1] = mx;
                mx = max(mx, dp[i]);
            }
        }
        printf("%d\n", mx);
    }
    return 0;
}
```

# B - Ignatius and the Princess IV HDU - 1029

题意很简单，，就是给你n个数找出其中个数大于等于 $(n+1)/2$ 的那个数，，，

一种方法是直接排序，，最中间的那个数一定是要找的数，，因为个数超过 $(n+1)/2$ 一定有一个在排序后在中间那个位置

另一种是dp的思想，，因为要找的是个数至少为 $(n+1)/2$ 的数，，那么它肯定比其他数的个数个至少大一，，，这样我们可以遍历整个数组，，动态的记录下出现次数最多的数以及它和前面的数比较后出现的次数cnt，为零说明他并不是最多的，，换现在遍历的数，

```cpp
//hdu
//#include <bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string.h>
#include <algorithm>
#include <queue>
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
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    int n;
    while(~scanf("%d", &n))
    {
        for(int i = 1; i <= n; ++i)scanf("%d", &a[i]);
        int cnt, ans;
        cnt = 0;
        for(int i = 1; i <= n; ++i)
        {
            if(cnt == 0)
            {
                ans = a[i];
                ++cnt;
            }
            else
            {
                if(ans == a[i])
                    ++cnt;
                else
                    --cnt;
            }
        }
        printf("%d\n", ans);
    }
    return 0;
}
```

```cpp
//hdu
//#include <bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string.h>
#include <algorithm>
#include <queue>
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
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    int n;
    while(~scanf("%d", &n))
    {
        for(int i = 1; i <= n; ++i)scanf("%d", &a[i]);
        sort(a + 1, a + 1 + n);
        int ans = a[(n + 1) / 2];
        printf("%d\n", ans);
    }
    return 0;
}
```

# E - Super Jumping! Jumping! Jumping! HDU - 1087 

求一个数列的最大上升子序列的和就行了

```cpp
//hdu
//#include <bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string.h>
#include <algorithm>
#include <queue>
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
int a[maxn], dp[maxn];
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    int n;
    while(~scanf("%d", &n) && n)
    {
        for(int i = 1; i <= n; ++i)scanf("%d", &a[i]);
        for(int i = 0; i <= n; ++i)dp[i] = a[i];
        for(int i = 1; i <= n; ++i)
            for(int j = 1; j < i; ++j)
                if(a[i] > a[j])
                    dp[i] = max(dp[i], dp[j] + a[i]);
        int ans = 0;
        for(int i = 1; i <= n; ++i)ans = max(ans, dp[i]);
        printf("%d\n", ans);
    }
    return 0;
}
```

# F - Piggy-Bank HDU - 1114 

完全背包的板子题，，，几天没看，，有些细节倒忘了qaq

```cpp
//hdu
//#include <bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string.h>
#include <algorithm>
#include <queue>
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
int w[maxn], c[maxn], dp[maxn];
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    int t;scanf("%d", &t);
    while(t--)
    {
        int e, f, n;
        scanf("%d%d%d", &e, &f, &n);
        for(int i = 1; i <= n; ++i)scanf("%d%d", &w[i], &c[i]);
        for(int i = 1; i <= f - e; ++i)dp[i] = inf;
        dp[0] = 0;
        for(int i = 1; i <= n; ++i)
            for(int j = c[i]; j <= f - e; ++j)
                dp[j] = min(dp[j], dp[j - c[i]] + w[i]);
        if(dp[f - e] >= inf)
            printf("This is impossible.\n");
        else
            printf("The minimum amount of money in the piggy-bank is %d.\n", dp[f - e]);
    }
    return 0;
}
```


# I-最少拦截系统 HDU - 1257

## 分析

这道题的题意是给你一串数，然后让你找出最少的几个序列，这些序列满足递减的循序（不一定严格递减），，总数是原序列的总数，，

读完题后第一反应是模拟一下这个寻找过程，，贪心的去尽可能的找一个最长的序列，，但这就不是dp了，，，可怎么都想不到怎么用dp解决，，，[看了一个人的题解后了解了](https://www.cnblogs.com/cenariusxz/p/4304567.html)：求这个序列的LIS，，对于这个LIS中的每一个元素都代表着一个拦截系统的最小值（也就是以前贪心要求得每一个序列的最后一个元素），，因为序列是上升的，，所以每一个元素都不能再拦截序列中的下一个数，，也就是说最后的LIS就是总的系统数

## 代码

```cpp
const int maxn = 1e5 + 5;
const int maxm = 2e5 + 5;
const ll mod = 1e9 + 7;
int dp[maxn], a[maxn];
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    int n;
    while(~scanf("%d", &n))
    {
        for(int i = 1; i <= n; ++i)scanf("%d", &a[i]);
        for(int i = 0; i <= n; ++i)dp[i] = 1;
        for(int i = 2; i <= n; ++i)
            for(int j = 1; j <= i; ++j)
                if(a[i] > a[j])
                    dp[i] = max(dp[i], dp[j] + 1);
        int ans = 0;
        for(int i = 1; i <= n; ++i)
            ans = max(ans, dp[i]);
        printf("%d\n", ans);
    }
    return 0;
}
```
# L - Common Subsequence POJ - 1458 


LCS 板子题

```cpp
//hdu
//#include <bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string.h>
#include <algorithm>
#include <queue>
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
const int maxn = 1e4 + 5;
const int maxm = 2e5 + 5;
const ll mod = 1e9 + 7;
char s1[maxn], s2[maxn];
int dp[maxn][maxn];
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    while(~scanf("%s%s", s1, s2))
    {
        int len1 = strlen(s1);
        int len2 = strlen(s2);
        for(int i = 0; i <= max(len1, len2); ++i)
            for(int j = 0; j <= max(len1, len2); ++j)
                dp[i][j] = 0;
        for(int i = 1; i <= len1; ++i)
            for(int j = 1; j <= len2; ++j)
                if(s1[i - 1] == s2[j - 1])
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                else
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        printf("%d\n", dp[len1][len2]);
    }
    return 0;
}
```

# N - Longest Ordered Subsequence POJ - 2533 


LIS板子题，之前做过

```cpp
//hdu
//#include <bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string.h>
#include <algorithm>
#include <queue>
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
const int maxn = 1e4 + 5;
const int maxm = 2e5 + 5;
const ll mod = 1e9 + 7;
int a[maxn], dp[maxn];
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    int n;
    while(~scanf("%d", &n))
    {
        for(int i = 1; i <= n; ++i)scanf("%d", &a[i]);
        for(int i = 0; i <= n; ++i)dp[i] = 1;
        for(int i = 2; i <= n; ++i)
            for(int j = 1; j <= i - 1; ++j)
                if(a[i] > a[j])
                    dp[i] = max(dp[i], dp[j] + 1);
        int ans = 0;
        for(int i = 1; i <= n; ++i)ans = max(ans, dp[i]);
        printf("%d\n", ans);
    }
    return 0;
}
```
