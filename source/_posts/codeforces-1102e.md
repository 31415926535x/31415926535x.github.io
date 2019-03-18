---
title: codeforces-1102e
date: 2019-02-26 18:25:38
tags:
- acm
- 刷题
categories:
- Codeforces
---

[这道题很锻炼思维](https://codeforces.com/problemset/problem/1102/E)，，是到好题，，就是我不在状态，，没看出来线段间的关系，，学会了求一个区间里相同元素看作一个线段的总的线段的数量的方法，，用map保存最远的元素，遍历寻找判断就行了。。。

<!-- more -->

# 分析

题意是给你一个数组a，，让你构造一个数组b，，数组b满足的条件是：

+ $b_1=0$，
+ 数组b是一个不下降的序列，，
+ 对于 $a[i]=a[j]$ 的情况要使得 $b[i]=b[j]$，，，

求b的可能的种类数

一开始我把它当成纯数学题，，然后想要找出一个可能的公式，，最后情况太多，判断麻烦放弃了，，，

官方的题解也没看进去，，，（主要是第一看到这个思路时没明白那个线段是干啥的，，）

后来看了[这个人的思路](https://zhanghuimeng.github.io/post/codeforces-1102e-monotonic-renumeration/)，，

大概思路如下：

因为最后的b是一个不下降序列，，所以当 $a[i]=a[j]$ 时，，必然有 $b[i]=b[i+1]=,,,,=b[j]$，，，

也就是说对于a中相等的两个元素对应的b之间都是一段相等的元素，，，

通过这个思路，我们可以求a中可以用两个相同的元素划分成多少个线段（有重叠的线段要合并为一个，，这一段的元素都相同）

为啥要求线段的数量 $ans$ 呢，，因为b要满足的第三个条件中可以看出两个相邻的且 $a[i] \ne a[j]$ 的 $b[i],b[j]$ 只有两种取值，，又因为线段内的取值相同，，所以b的情况就是 $2^{ans-1}$了，，，

eg：$a={1,2,1,2,3}$ 中1对应的线段是{1,2,1}, 2对应的线段是 {2,1,2} 还有 {3}，，因为有重叠，，合并后的就是{1,2,1,2},{3}，，种类数就是 $2^{2-1}$个

那么怎么求线段数呢，，

我们可以先假设每个数都自成一个线段，那么就一共有ans=n个，，然后对于每一个大的线段的合并就是 $ans-=(线段的左端点-线段的右端点)当a[i]=a[j]时，也就是ans-=(j-i)$

左端点可以遍历整个数组，，右端点就用map保存每个数最右的位置，，从左向右遍历一下就可以保证每个数的最右边的位置，，，这样当我们与当前遍历的点相同的点可能有一个右端点的时候，，说明现在遍历的位置和那个点之间可以构成一个线段，，减去中间的线段的数量就行了，，，

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
inline ll _pow(ll a, ll b, ll p = 998244353)
{
    ll ret = 1;
    while(b)
    {
        if(b & 1)ret = (ret * a) % p;
        a = (a * a) % p;
        b >>= 1;
    }
    return ret;
}
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    int n; cin >> n;
    map<int, int> mp;
    for(int i = 1; i <= n; ++i)cin >> a[i];
    for(int i = 1; i <= n; ++i)mp[a[i]] = i;
    int index = 1;
    int ans = n;
    for(int i = 1; i <= n; ++i)
    {
        index = max(index, i);
        if(mp[a[i]] > index)
        {
            ans -= (mp[a[i]] - index);
            index = mp[a[i]];
        }
    }
    cout << _pow(2, ans - 1) << endl;
    return 0;
}
```
溜了溜了，，贼困今天，，，
(end)