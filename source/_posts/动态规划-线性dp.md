---
title: 动态规划_线性dp
date: 2019-02-21 15:09:25
tags:
- acm
- 笔记
- 算法
categories:
- ACM-动态规划-线性dp
---

线性dp是很基础的一种动态规划，，经典题和他的变种有很多，比如两个串的LCS,LIS,最大子序列和等等，，

线性dp是用来解决一些 **线性区间上的最优化问题** ，，

学这里的东西我感觉主要要理解好问题的子问题来写出转移方程，，还有弄清具体的边界条件就行了，，

<!-- more -->

# LCS-最长公共子序列

## 分析

子序列指的是对于一个串，某些元素的排列与原串所在的顺序一致的串称为原串的一个子序列，，它与子串不同，子串必须保证个元素在原串中是连续的，，，eg: 原串：abcdef 一个子序列：acf 一个子串：abcd

两个串的最大公共子序列指的是对于两个串所有相同的子序列中最长的那一个，，

[参考1](https://blog.csdn.net/someone_and_anyone/article/details/81044153)
[参考2](https://blog.csdn.net/qq_31881469/article/details/77892324)


### 首先确定子问题

既然要用动态规划解决，那么这个问题一定能够分成子问题来推出。。首先根据定义可以看出对于两个串的子串的LCS也一定是原串的LCS的一部分，，这样我们就可以用原串的子串的LCS来求原串的LCS了，，

### 状态

我们用 $dp[i][j]$ 来表示对于A的子串 $A':A_1, A_2, A_3,,,A_i$ 和B的子串 $B':B_1, B_2, B_3,,,B_j$ 的 **LCS**；

那么怎么通过上一状态得到 $dp[i][j]$ 呢？往前推一个字符看看

考虑所有 $A',B'$ 的子串，他们的可能情况有；

+ 两个串的某尾字符一样 $(a[i]=b[j])$，，显然这样情况下 $dp[i][j]=dp[i-1][j-1]+1$
+ 不相等时就找 $A'$ 往前推一个字符和 $B'$的LCS 与 $A'$ 和 $B'$ 往前推一个字符的LCS 的最大的那个就行了，，也就是说 $dp[i][j]=max(dp[i-1][j], dp[i][j-1])$

### 状态转移方程

状态转移方程为：

$$
{
    dp[i][j]=
    \begin{cases}
        dp[i-1][j-1]+1, & \text{if a[i]=b[j]}\\
        max(dp[i-1][j], dp[i][j-1], & \text{if a[i] != b[j]})\\
    \end{cases}
}
$$

注意初始化的时候dp[i][j]=0;

## 例题

### [hdu-1159](http://acm.hdu.edu.cn/showproblem.php?pid=1159)

板子题直接做就行，，熟悉一下代码

```cpp
const int maxn = 1e4 + 5;
const int maxm = 2e5 + 5;
const ll mod = 1e9 + 7;
int dp[maxn][maxn];
char a[maxn], b[maxn];
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    while(~scanf("%s%s", a, b))
    {
        int len1 = strlen(a);
        int len2 = strlen(b);
        for(int i = 0; i <= max(len1, len2); ++i)
            for(int j = 0; j <= max(len1, len2); ++j)
                dp[i][j] = 0;
        for(int i = 1; i <= len1; ++i)
            for(int j = 1; j <= len2; ++j)
                if(a[i - 1] == b[j - 1])
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                else
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        printf("%d\n", dp[len1][len2]);
    }
    return 0;
}
```

### [poj-2250](http://poj.org/problem?id=2250)

题意：两个没有标点只有空格的并以'#"结尾的句子，让你找出LCS，并输出

解决的方法就是LCS，基本的套路没变，，就是对数据的处理改一下，，用一个字符串数组存一下，，

然后最后要将序列输出时，用一个mark数组标记每一次dp时的情况（记录下每个状态的最优值是由状态转移方程的哪一项推出的），，最后逆着返回去把答案记录一下就好，，（把mark数组手推一下就行，，（背包九讲里最后提到过解的输出，，，

这个很重要，，很多地方都会用到，，，


```cpp
const int maxn = 1e4 + 5;
const int maxm = 2e5 + 5;
const ll mod = 1e9 + 7;
int dp[maxn][maxn];
string a[maxn], b[maxn];
int mark[maxn][maxn];
int cnt, ans[maxn];
void findans(int i, int j)
{
    if(!i && !j)return;
    if(mark[i][j] == 0)
    {
        findans(i - 1, j - 1);
        ans[++cnt] = i;
    }
    else if(mark[i][j] == 1)
        findans(i - 1, j);
    else
        findans(i, j - 1);
}
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    while(cin >> a[1])
    {
        int len1 = 1;
        int len2 = 1;
        while(a[len1] != "#")cin >> a[++len1];--len1;
        cin >> b[1];
        while(b[len2] != "#")cin >> b[++len2];--len2;
        for(int i = 0; i <= max(len1, len2); ++i)
            for(int j = 0; j <= max(len1, len2); ++j)
                dp[i][j] = 0;
        for(int i = 1; i <= len1; ++i)mark[i][0] = 1;
        for(int i = 1; i <= len2; ++i)mark[0][i] = -1;
        for(int i = 1; i <= len1; ++i)
            for(int j = 1; j <= len2; ++j)
                if(a[i] == b[j])
                {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                    mark[i][j] = 0;
                }
                else if(dp[i - 1][j] >= dp[i][j - 1])
                {
                    dp[i][j] = dp[i - 1][j];
                    mark[i][j] = 1;
                }
                else
                {
                    dp[i][j] = dp[i][j - 1];
                    mark[i][j] = -1;
                }
        cnt = 0;
        findans(len1, len2);
        cout << a[ans[1]];
        for(int i = 2; i <= cnt; ++i)cout << " " << a[ans[i]];
        cout << endl;
    }
    return 0;
}
```

### [hdu-1503](http://acm.hdu.edu.cn/showproblem.php?pid=1503)

题意就是给定两个串，，输出一个串，这个串的其中两个子序列要是原来的两个串，，

要输出答案，，所以要在状态转移的时候标记每个字符，，最后回溯时判断输出就行了，，，

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
int dp[maxn][maxn];
char a[maxn], b[maxn];
int mark[maxn][maxn];
int cnt, ans[maxn];
void findans(int i, int j)
{
    if(!i && !j)return;
    if(mark[i][j] == 0)
    {
        findans(i - 1, j - 1);
        printf("%c", a[i - 1]);
    }
    else if(mark[i][j] == 1)
    {
        findans(i - 1, j);
        printf("%c", a[i - 1]);
    }
    else
    {
        findans(i, j - 1);
        printf("%c", b[j - 1]);
    }
}
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    while(~scanf("%s%s", a, b))
    {
        int len1 = strlen(a);
        int len2 = strlen(b);
        for(int i = 0; i <= max(len1, len2); ++i)
            for(int j = 0; j <= max(len1, len2); ++j)
                dp[i][j] = 0;
        for(int i = 1; i <= len1; ++i)mark[i][0] = 1;
        for(int i = 1; i <= len2; ++i)mark[0][i] = -1;
        for(int i = 1; i <= len1; ++i)
            for(int j = 1; j <= len2; ++j)
                if(a[i - 1] == b[j - 1])
                {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                    mark[i][j] = 0;
                }
                else if(dp[i - 1][j] >= dp[i][j - 1])
                {
                    dp[i][j] = dp[i - 1][j];
                    mark[i][j] = 1;
                }
                else
                {
                    dp[i][j] = dp[i][j - 1];
                    mark[i][j] = -1;
                }
        findans(len1, len2);
        printf("\n");
    }
    return 0;
}
```

### [hdu-1513](http://acm.hdu.edu.cn/showproblem.php?pid=1513)

题意：给你一个长度为n的字符串，问你最少添加几个字符使得这个字符串变成一个回文串，，

因为只是问字符的个数，，没问最后的结果，，所以可以先求原串和其逆串的LCS，，然后用长度建议下就行了，，，

注意，因为字符串的长度是小于等于5000，，开dp数组时直接开会爆掉，，所以要用 **滚动数组** 来优化一下空间，，
（看一下那个dp的图就能看出在求dp[i][j]是，，仅仅用到的是上一行，，在往上就不再用了，，所以可以直接用两行解决就行了，，，比如说奇数行用第一层，偶数用第零层，，i%2就行，，访问当前层的上一层就用 1-i%2 就行了，，很巧啊，，

```cpp
const int maxn = 1e4 + 5;
const int maxm = 2e5 + 5;
const ll mod = 1e9 + 7;
int dp[2][maxn];
char a[maxn], b[maxn];
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    int n;
    while(~scanf("%d", &n))
    {
        scanf("%s", a);
        for(int i = 0; i <= n - 1; ++i)b[i] = a[n - i - 1];
        int len1 = n;
        int len2 = len1;
        for(int i = 0; i <= max(len1, len2); ++i)
            dp[0][i] = dp[1][i] = 0;
        for(int i = 1; i <= len1; ++i)
            for(int j = 1; j <= len2; ++j)
                if(a[i - 1] == b[j - 1])
                {
                    dp[i % 2][j] = dp[1 - i % 2][j - 1] + 1;
                }
                else
                    dp[i % 2][j] = max(dp[1 - i % 2][j], dp[i % 2][j - 1]);
        printf("%d\n", n - dp[n % 2][n]);
    }
    return 0;
}
```

# 最长公共子串

子序列是序列中的元素不一定连续，，子串的话每一个元素在原串中是连续的，，可以修改一下LCS来求

## 状态转移方程

因为要保证连续，所以只有在 $a[i]=b[j]$ 时，$dp[i][j] = dp[i-1][j-1]$，，也就是说 $dp[i][j]$ 表示长度为i和j的子串的最长子串

## 代码

```cpp
for(int i = 1; i <= len1; ++i)
    for(int j = 1; j <= len2; ++j)
    {
        if(a[i-1] = b[j-1])
            dp[i][j] = dp[i-1][j-1]+1;
        else
            dp[i][j] = 0;
        ans = max(ans, dp[i][j]);
    }
```

# LIS-最长上升序列

## 分析

上升序列就是指序列的元素时递增的，，例如：4，1，3，2，5，7中的一个上升序列就是1，2，5，7，，

### 确定子问题

某个从1开始的子串的LIS一定是原串LIS的子序列，，所以可以通过枚举右边界来得到原串的LIS，，

### 状态

用 $dp[i]$ 表示 $A_1, A_2, A_3,,,A_i$这个子串的LIS，，然后枚举这个子串中的元素，，如果 $a[j]<a[i]$ ，即第i个元素比第j个元素大的时候，可以将第i个元素作为某个子序列的一部分，，

### 状态转移方程

$$
{
    dp[i]=
    \begin{cases}
    max(dp[i], dp[j]+1) & \text{if a[i] > a[j]}\\
    \end{cases}
}
$$

因为最后最长的序列并不一定是以a[n]结尾的，，所以最后的最大值并不一定是dp[n]，，要遍历一遍整个dp数组找一下，，，

### 时间复杂度

这样做的时间复杂度大概是 $O(n^2)$，，，可以再用二分或则树状数组维护降低时间复杂度

## 例题

### [poj-2533](http://poj.org/problem?id=2533)

#### 裸dp做法，时间复杂度 $O(n^2)$
裸板子题，，注意初始化dp数组的数后是初始化为1，，不是像LCS初始化为0；

```cpp
int n;
while(~scanf("%d", &n))
{
    for(int i = 1; i <= n; ++i)scanf("%d", &a[i]);
    for(int i = 0; i <= n; ++i)dp[i] = 1;
    for(int i = 2; i <= n; ++i)
        for(int j = 1; j < i; ++j)
            if(a[i] > a[j])dp[i] = max(dp[i], dp[j] + 1);
    int ans = 0;
    for(int i = 1; i <= n; ++i)ans = max(ans, dp[i]);
    printf("%d\n", ans);
}
```

#### 贪心+二分，时间复杂度 $O(nlogn)$

裸的dp的内层循环的作用是寻找在 $a[i]>a[j]$ 时的最大的 $dp[j]$ 的值，，单纯的遍历复杂度会增一倍，，

可以用一个数组保存i之前最长的上升子序列，，，

如果此时的 $a[i]$ 比那个数组的最大的元素也就是最后一个元素的值大的话，，就直接加在那个数组后面，，

否则，就想方法替换掉里面接近 $a[i]$ 的元素，，，可以用二分来优化这一过程，，

[具体的可以参考这里](https://blog.csdn.net/qq_22902423/article/details/49932259)
[和这里](https://blog.csdn.net/George__Yu/article/details/75896330)

```cpp
int n;
while(~scanf("%d", &n))
{
    cnt = 1;
    for(int i = 1; i <= n; ++i)scanf("%d", &a[i]);
    b[1] = a[1];
    for(int i = 1; i <= n; ++i)
    {
        if(a[i] > b[cnt])b[++cnt] = a[i];
        else
        {
            int k = lower_bound(b + 1, b + 1 + cnt, a[i]) - b;
            b[k] = a[i];
        }
    }
    printf("%d\n", cnt);
}
```

#### 树状数组维护，时间复杂度 $O(nlogn)$

~~(loading),,,

看到有这个做法，，但是不知道怎么是错的，，，（好像是排序后要去重？？？不然是求得最长不下降子序列~~

算了，先贴个 **错** 的代码吧，，，，

```cpp
const int maxn = 1e4 + 5;
const int maxm = 2e5 + 5;
const ll mod = 1e9 + 7;

struct node
{
    int id, num;
    const bool operator<(const node &r)const
    {
        return num < r.num;
    }
    const bool operator==(const node &r)const
    {
        return num == r.num;
    }
}node[maxn];
int bit[maxn];
int n;
void update(int i, int x)
{
    for(; i <= n; i += i & (-i))bit[i] = max(bit[i], x);
}
int query(int i)
{
    int res = -inf;
    for(; i; i -= i & (-i))res = max(res, bit[i]);
    return res;
}
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    while(~scanf("%d", &n))
    {
        for(int i = 1; i <= n; ++i)
        {
            scanf("%d", &node[i].num);
            node[i].id = i;
        }
        //memset(bit, 0, sizeof bit);
        for(int i = 1; i <=100; ++i)bit[i] = 1;
        sort(node + 1, node + 1 + n);
//        int cnt = unique(node + 1, node + 1 + n) - node - 1;
        int ans = 0;
        for(int i = 1; i <= n; ++i)
        {
            cout << node[i].num;
            if(node[i].num > node[i - 1].num)
            {
                int mx = query(node[i].id);
                update(node[i].id, ++mx);
                ans = max(ans, mx);
            }


        }
        printf("%d\n", ans);
    }
    return 0;
}
4
1 1 1 1
//出来的结果是4，，，
```

# LICS-最长公共上升子序列

LICS就是将LIS和LCS合在一起，，稍微改一改就行了，，

## 分析

### 子问题

像LCS，LIS一样，，我们用dp[i][j]表示序列1取长度为i和序列2取长度为j时的LICS的值，，然后枚举每一个元素来更新后面的得到最后的答案，，

### 状态转移方程

+ 当 $a[i]=b[j]$时，，显然此时的LICS就为前面出现的最大的LICS的值加一，，也就是： $dp[i][j]=max(d[i][k])+1 \{ k = 1 \ to \ j - 1 \}$

如果只是单纯的一遍一遍的枚举k，，显然会使最后的时间复杂度增加为 $O(n^3)$ ，， 因为每次更新dp[i][j]都是寻找的前面的最值，，所以我们可以记录下来前面的最值，，然后和当点枚举的比较就行了，，，

为了保证时上升的，，所以不等的时候只能寻找 $a[i]>b[j]$ 的情况，，找到最大值

## 例题

### [hdu-1423](http://acm.hdu.edu.cn/showproblem.php?pid=1423)

板子题，，直接做

```cpp
//没有空间优化的
//注意输出格式
int a[maxn], b[maxn], dp[maxn][maxn];
int main()
{
    int t;scanf("%d", &t);
    while(t--)
    {
        int len1, len2;
        scanf("%d", &len1);
        for(int i = 1; i <= len1; ++i)scanf("%d", &a[i]);
        scanf("%d", &len2);
        for(int i = 1; i <= len2; ++i)scanf("%d", &b[i]);
        for(int i = 0; i <= len1; ++i)
            for(int j = 0; j <= len2; ++j)
                dp[i][j] = 0;
        for(int i = 1; i <= len1; ++i)
        {
            int mx = 0;
            for(int j = 1; j <= len2; ++j)
            {
                dp[i][j] = dp[i - 1][j];//先保存前面的最值，然后判断更新
                if(a[i] == b[j])dp[i][j] = mx + 1;
                if(a[i] >  b[j])mx = max(mx, dp[i - 1][j]);
            }
        }
        int ans = 0;
        for(int i = 1; i <= len2; ++i)
            ans = max(ans, dp[len1][i]);
        printf("%d\n", ans);
        if(t)printf("\n");

    }
    return 0;
}
```

注意到在循环中的一句: ``dp[i][j]=dp[i-1][j]``，，这句可以看出我们的dp过程是没有用到前面几层的，，，也就是说可以用一个以为数组来优化一下，，，有点类似01背包的空间优化过程

```cpp
int a[maxn], b[maxn], dp[maxn];
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    int t;scanf("%d", &t);
    while(t--)
    {
        int len1, len2;
        scanf("%d", &len1);
        for(int i = 1; i <= len1; ++i)scanf("%d", &a[i]);
        scanf("%d", &len2);
        for(int i = 1; i <= len2; ++i)scanf("%d", &b[i]);
        for(int i = 0; i <= len2; ++i)
            dp[i] = 0;
        for(int i = 1; i <= len1; ++i)
        {
            int mx = 0;
            for(int j = 1; j <= len2; ++j)
            {
                if(a[i] == b[j])dp[j] = mx + 1;
                if(a[i] >  b[j])mx = max(mx, dp[j]);
            }
        }
        int ans = 0;
        for(int i = 1; i <= len2; ++i)
            ans = max(ans, dp[i]);
        printf("%d\n", ans);
        if(t)printf("\n");

    }
    return 0;
}
```

# 最大连续子序列和

最大连续子序列和求得是一段连续的子序列，，它的和是所有子序列中最大的，，例如：-2 11 -4 13 -5 -2中，最大的连续子序列和是20，，由11，-4，13组成，，

[参考文章](https://www.cnblogs.com/rhythmic/p/5398953.html)

## [例题hdu-1231](http://acm.hdu.edu.cn/showproblem.php?pid=1231)

### 法一

我们可以遍历整个序列，，并且保存从头到当前点的序列中的 最大连续子序列和sum，同时保存起点终点元素值，，

当sum<=0时，，说明前面一个子序列的和小于零，就可以不再要他了，，此时更新新的sum为当前点，起点终点也为当前点的值，，

当sum>0时，，我们可以再把当前点加在这个序列后面，，更新终点即可，，

最后取每一次枚举中的最大值，，更新起点终点就行了，，，

如果最值小于零，按题意输出零即可，，

```cpp
const int maxn = 1e5 + 5;
const int maxm = 2e5 + 5;
const ll mod = 1e9 + 7;
int a[maxn], b[maxn], dp[maxn];
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
        int sum, max_sum, s, t, ans_s, ans_t;
        sum = max_sum = s = t = ans_s = ans_t = a[1];
        for(int i = 2; i <= n; ++i)
        {
            if(sum > 0)
            {
                sum += a[i];
                t = a[i];
            }
            else
            {
                sum = s = t = a[i];
            }
            //update ans
            if(max_sum < sum)
            {
                max_sum = sum;
                ans_s = s;
                ans_t = t;
            }
        }
        if(max_sum < 0)printf("0 %d %d\n", a[1], a[n]);
        else           printf("%d %d %d\n", max_sum, ans_s, ans_t);
    }
    return 0;
}
```

### 法二

可以使用dp来解决，，就像LCS,LIS等dp[i]代表以第i个元素结尾的LCS,LIS一样，，这里可以用dp[i]表示以a[i]结尾的最大的连续序列的和，，这样为了推出dp[i]就得看它和dp[i-1]的关系，，

从上面那种解法可以看出，当dp[i-1]小于零时意味着以a[i]结尾的最大连续序列的和就是负的，，为了答案的最大化，，可以舍弃前面这一段，，所以在这种情况下的dp[i]=a[i]，，，

否则的话，就把当前点a[i]加到前面的序列上，也就是dp[i]=dp[i-1]+a[i]，，，

于是最后的状态转移方程为：

$$
    dp[i]=
    \begin{cases}
    a[i] & \text{if dp[i-1]<0}\\
    dp[i-1]+a[i] & \text{if dp[i-1]>=0}\\
    \end{cases}
$$

最后针对这道题遍历一遍dp数组，找到最大值及其下标，，反向遍历找到起点就好了

```cpp
const int maxn = 1e5 + 5;
const int maxm = 2e5 + 5;
const ll mod = 1e9 + 7;
int a[maxn], b[maxn], dp[maxn];
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
        for(int i = 0; i <= n; ++i)dp[i] = -inf;
        for(int i = 1; i <= n; ++i)
            if(dp[i - 1] < 0)dp[i] = a[i];
            else             dp[i] = dp[i - 1] + a[i];
        int max_sum = -inf, s, t;
        for(int i = 1; i <= n; ++i)
            if(max_sum < dp[i])
                max_sum = dp[i], t = i;
        if(max_sum < 0)printf("0 %d %d\n", a[1], a[n]);
        else
        {
            printf("%d ", max_sum);
            max_sum -= a[t];
            for(int i = t; i >= 1; --i, max_sum -= a[i])
                if(!max_sum)
                {
                    s = i;
                    break;
                }
            printf("%d %d\n", a[s], a[t]);
        }
    }
    return 0;
}
```

[类似题目: hdu-1003](http://acm.hdu.edu.cn/showproblem.php?pid=1003)

(end)