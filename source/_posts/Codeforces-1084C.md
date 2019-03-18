---
title: Codeforces-1084C
date: 2018-12-13 16:02:04
tags:
- acm
- 刷题
categories:
- Codeforces
---

# 概述

好久没写博客了，，，最近的事太多了，，几乎没有专门看一个知识点，，，一直在做各种的简单题QAQ。。。

<!-- more -->

# 题意

[这道题大概的题意就是](https://codeforces.com/contest/1084/problem/C)给你一个串，，，然后找出所有开头结尾都是a的并且中间有b的子串的个数，，，单一的a也算，，，

一开始看了好几遍都没看懂题意，，，不知道在求啥，，，

[然后看了一个人的题解](https://www.cnblogs.com/wa007/p/10103272.html)，，然后没看懂QAQ,,,,,

看了官方题解下的一个评论看懂了，，，，，emmmm

>It doesn't depend at all if there exists any letter other than a or b in the given string. You can for sure ignore those letters, so the editorial says to erase them. Now, what you have is a string consisting only of a and b's. Also two consecutive b's can be merged as one. So your final string will look something like (a...a)b(a...a)b(a...)...

>You can now consider this problem as sum of all possible product of subsets of a given set, where each element in the set is the number of a's delimited by b.

>For example: In the string "aaabaabaaab", set formed will be {3,2,3,0} (0 can be ignored). Now if you have a set {a1,a2,...,aN}, then sum of all possible products of this set is equal to (1+a1)*(1+a2)*...*(1+aN)-1.

>Proof:
Write the required answer as follows:
S = Sum of products of subset with (size=1)+(size=2)+...(size=N)
$S = (a_1+a_2+...a_N)+(a_1*a_2+a_1*a_3......+a_{N-1}*a_N)+...+(a_1*a_2.....a_N)$
After factorization,
S = (1+a1)(1+a2)...(1+aN)-1

大致意思就是处理所给的字符串，，，就变成了一堆a一个b一堆a一个b....这样的，，，
也就是一堆a的集合
题目所要的就是调两个个a的集合里调一个a作为子串的首尾，，，这样的就是所要的串，，，
于是总共的个数就是$a_1*a_2*a_3.....a_{n-1}*a_{n}$,,,对了每个集合还要加一，，表示这个集合选一个或者都不选，，，最后的答案再减一就行了（全不选的情况不符合题意），，，

他上面那段话的思路是在计算所有的子川的情况时，，长度为1+长度为2+。。。长度为m。。。
这样的话 $sum = (a_1 + a_2+....+a_{n-1} + a_n) + (a_1 * a_2 + a_1 * a_3 + ...+ a_1 * a_m + a_2 * a_3 + ......+ a_{n-1} * a_n) + (a_1 * a_2 * a_3 + ....) + ...$
然后这个求和可以转化成$sum = (1 + a_1) * (a_2 + 1) * (a_3 + 1) + (a_4 + 1) * .... * (a_n + 1) - 1$

>因为：

>$a + b + ab = (a + 1) * (b + 1) - 1$

>$a + b + c + ab + ac + bc + abc = (a + 1) * (b + 1) * (c + 1) - 1$

# 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int inf = 0x3f3f3f3f;
const int maxn = 1e5 + 5;
const int mod = 1e9 + 7;

ll a[maxn];
int main()
{
//    freopen("233.txt" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    int n = 0;
    string s;cin >> s;
    int a[maxn];
    int tot = 0;
    int len = s.length();
    for(int i = 0; i < len; ++i)
    {
        if(s[i] == 'a')
        {
            int cnt = 0;
            for(int j = i; j < len; ++j)
            {
                if(s[j] == 'a')
                    ++cnt;
                if(s[j] == 'b' || j == len - 1)
                {
                    a[tot++] = cnt + 1;
                    i = j;
                    break;
                }

            }
        }
    }
    ll ans = 1;
    for(int i = 0; i < tot; ++i)
        ans = (ans * a[i]) % mod;
    --ans;
    cout << ans << endl;
    return 0;
}

```

太水了，，，，QAQ