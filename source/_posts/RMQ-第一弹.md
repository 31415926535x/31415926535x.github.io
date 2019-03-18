---
title: RMQ_第一弹_Sparse Table
date: 2018-09-21 21:33:45
tags:
- acm
- RMQ
- ST
- dp
- 数据结构
- 算法
categories:
- ACM-RMQ
---

# 概述

**RMQ (Range Minimum/Maximum Query)**

从英文便可以看出这个算法的主要是询问一个区间内的最值问题，，，

暑假集训的时候学习了 **线段树** ，，，

也可以对给定数组查询任意区间的最值问题，，，，

这两个主要的区别就是 线段树 可以进行单点的修改操作，，，而 **Sparse Table** 算法不能进行点修改，，

或者说这样修改一次重预处理一次不划算，，，

所以说，，要是题目只是单纯的多次查询任意区间的最值，，，Sparse Table 首选，，毕竟，，毕竟写起来比线段树简单得多了，，，

<!-- more -->

# 预处理

## 算法原理

基本思想是dp,,,,

**dp的状态** : 对于数组 $a[1-n]$ , $F[i , j]$表示从第 $i$ 个位置开始 ， **长度** 为$2^j$ 个数这个区间中的最值，，，;

**dp的初始值** : $F[i , 0] = a[i]$;

**状态转移方程** : $F[i , j] = max (F[i , j - 1] , F[i + 2^{j - 1}  , j - 1])$;

**思想** : $F[i , j]$ 就是不断取他的左右这两段的最值，，这两段的长度相等，都为 $2^{j - 1}$ 个元素，，

## 实现

```cpp
const int maxn = 5e4 + 10;
int n , q;
int a[maxn];
int mx[maxn][20];
int mi[maxn][20];
void rmq()
{
	for (int i = 1; i <= n; ++i)
		mx[i][0] = mi[i][0] = a[i];

	for (int j = 1; (1 << j) <= n; ++j)
	{
		for (int i = 1; i + (1 << j) - 1 <= n; ++i)
		{
			mx[i][j] = max(mx[i][j - 1] , mx[i + (1 << (j - 1))][j - 1]);
			mi[i][j] = min(mi[i][j - 1] , mi[i + (1 << (j - 1))][j - 1]);
		}
	}
}
```
这里我们需要注意的是循环的顺序，我们发现外层是j，内层所i，这是为什么呢？可以是i在外，j在内吗？
答案是不可以。因为我们需要理解这个状态转移方程的意义。

状态转移方程的含义是：先更新所有长度为F[i,0]即1个元素，然后通过2个1个元素的最值，获得所有长度为F[i,1]即2个元素的最值，然后再通过2个2个元素的最值，获得所有长度为F[i,2]即4个元素的最值，以此类推更新所有长度的最值。

而如果是i在外，j在内的话，我们更新的顺序就是F[1,0],F[1,1],F[1,2],F[1,3],表示更新从1开始1个元素，2个元素，4个元素，8个元素（A[0],A[1],....A[7]）的最值，这里F[1,3] = max(max(A[0],A[1],A[2],A[3]),max(A[4],A[5],A[6],A[7]))的值，但是我们根本没有计算max(A[0],A[1],A[2],A[3])和max(A[4],A[5],A[6],A[7])，所以这样的方法肯定是错误的。

[本段来自某大佬博客](https://blog.csdn.net/niushuai666/article/details/6624672?utm_source=copy)

---------------------

# 查询

## 思想

假如我们需要查询的区间为(i,j)，那么我们需要找到覆盖这个闭区间(左边界取i，右边界取j)的最小幂（可以重复，比如查询5，6，7，8，9，我们可以查询5678和6789）。

因为这个区间的长度为 $j - i + 1$ ,所以我们可以取 $k=log2( j - i + 1)$ ，则有：$RMQ(A, i, j)=max(F[i , k], F[ j - 2 ^ k + 1, k])$。

举例说明，要求区间[2，8]的最大值，$k = log_2（8 - 2 + 1）= 2$，即求 $max(F[2, 2]，F[8 - 2 ^ 2 + 1, 2]) = max(F[2, 2]，F[5, 2])$；

## 实现

```cpp
int ans(int l , int r)
{
	int k = 0;
	int len = r - l + 1;
	while ((1 << (k + 1)) <= len)
		++k;

	return max (mx[l][k] , mx[r - (1 << k) + 1][k]) - min (mi[l][k] , mi[r - (1 << k) + 1][k]);
}
```

# 实战

[题目链接](http://poj.org/problem?id=3264)

题目大意: 给定的数列a[1 - n] , 求出[l , r]这个区间内的极差 ， 即最大值与最小值的差

直接套板子，，，，

ac代码:

```cpp
#include <iostream>
#include <cmath>
#include <cstring>
#include <cstdio>
using namespace std;
const int maxn = 5e4 + 10;
int n , q;
int a[maxn];
int mx[maxn][20];
int mi[maxn][20];
void rmq()
{
	for (int i = 1; i <= n; ++i)
		mx[i][0] = mi[i][0] = a[i];

	for (int j = 1; (1 << j) <= n; ++j)
	{
		for (int i = 1; i + (1 << j) - 1 <= n; ++i)
		{
			mx[i][j] = max(mx[i][j - 1] , mx[i + (1 << (j - 1))][j - 1]);
			mi[i][j] = min(mi[i][j - 1] , mi[i + (1 << (j - 1))][j - 1]);
		}
	}
}
int ans(int l , int r)
{
	int k = 0;
	int len = r - l + 1;
	while ((1 << (k + 1)) <= len)
		++k;

	return max (mx[l][k] , mx[r - (1 << k) + 1][k]) - min (mi[l][k] , mi[r - (1 << k) + 1][k]);
}
using namespace std;
int main(){ 
    while (scanf("%d%d" , &n , &q) != EOF)
	{
		for (int i = 1; i <= n; ++i)
			scanf("%d" , &a[i]);

		rmq();
		
		while (q--)
		{
			int l , r;
			scanf("%d%d" , &l , &r);
			printf("%d\n" , ans(l , r));
		}
	}
	return 0;
}
```

# kuangbin的板子:

一维:

```cpp
const int MAXN = 50010;
int dp[MAXN][20];
int mm[MAXN];
//初始化 RMQ, b 数组下标从 1 开始，从 0 开始简单修改
void initRMQ(int n,int b[])
{
    mm[0] = −1;
    for(int i = 1; i <= n; i++)
    {
        mm[i] = ((i&(i−1)) == 0)?mm[i−1]+1:mm[i−1];
        dp[i][0] = b[i];
    }
    for(int j = 1; j <= mm[n]; j++)
        for(int i = 1; i + (1<<j) −1 <= n; i++)
            dp[i][j] = max(dp[i][j−1],dp[i+(1<<(j−1))][j−1]);
}
 //查询最大值
int rmq(int x,int y)
{
    int k = mm[y−x+1];
    return max(dp[x][k],dp[y−(1<<k)+1][k]);
}
```