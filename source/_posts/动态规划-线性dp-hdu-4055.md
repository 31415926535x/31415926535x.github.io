---
title: 动态规划-线性dp-hdu-4055
date: 2019-02-23 14:18:58
tags:
- acm
- 刷题
categories:
- ACM-动态规划-线性dp
---

[这道题是大连的某一年的现场赛的题hdu-4055](http://acm.hdu.edu.cn/showproblem.php?pid=4055)
，，，刚开始做线性dp的题，，看了好半天才看懂解法，，

<!-- more -->

## 分析

[参考1](https://www.cnblogs.com/rhythmic/p/5398953.html)
[参考2](https://www.cnblogs.com/ftae/p/7057372.html)

题目的意思就是给出一个仅有1~n组成的序列的关系s：'I'表示 $a[i+1]>a[i]$，'D'表示 $a[i+1] < a[i]$，，'?'表示都可以，，然后问你所有可能的情况的总数，，

用 $dp[i][j]$ 表示长度为i并且仅由1~i组成的序列以j结尾时的种类数，，

+ 当 $s[i]= ?$ 时，，当前点的可能情况就是前面所有情况的和，即 $dp[i][j]=\sum_{k=1}^{i-1}dp[i-1][k]$

+ 当 $s[i]=I$ 时，，因为第i位固定就为j了，并且前一位要满足小于等于j，所以就要找出所有长度为i-1且结尾小于等于j-1的情况的和，，即： $dp[i][j]=\sum_{k=1}^{j-1}dp[i-1][k]$

+ 当 $s[i]=D$ 时，，和等于I的情况相反，，也就是要找到所有长度为i-1且最后一位大于j的种类数（同时要小于i-1），，也就是说可以直接用？的种类数减去I的种类数，，即： $dp[i][j]=\sum_{k=j}^{i-1}dp[i-1][k]=\sum_{k=1}^{i-1}dp[i-1][k]-\sum_{k=1}^{j-1}dp[i][k]$

> 假定每次使第i位为j时，前面大于等于j的值都加一，，这样保证前i个数都出现一次，，同时i-1变成了i，，j变成了j+1，，j就放在了后面，，所以遍历中的k是从j~i-1，，，

[参考](https://blog.csdn.net/lvshubao1314/article/details/46793805)

最后用前缀和维护一下那个和，空间换时间

# 代码

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
const int maxn = 1e3 + 5;
const int maxm = 2e5 + 5;
const ll mod = 1e9 + 7;
int dp[maxn][maxn], sum[maxn][maxn];
char s[maxn];
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    while(~scanf("%s", s + 2))
    {
        int len = strlen(s + 2);
        memset(dp, 0, sizeof dp);
        memset(sum, 0, sizeof sum);
        dp[1][1] = sum[1][1] = 1;
        for(int i = 2; i <= len + 1; ++i)
        {
            for(int j = 1; j <= i; ++j)
            {
                if(s[i] == 'I')
                    dp[i][j] = sum[i - 1][j - 1];
                if(s[i] == 'D')
                    dp[i][j] = (sum[i - 1][i - 1] - sum[i - 1][j - 1] + mod) % mod;
                if(s[i] == '?')
                    dp[i][j] = sum[i - 1][i - 1];
                sum[i][j] = (dp[i][j] + sum[i][j - 1]) % mod;
            }
        }
        printf("%d\n", sum[len + 1][len + 1]);
    }
    return 0;
}
```
(end)