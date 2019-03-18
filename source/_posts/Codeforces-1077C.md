---
title: Codeforces-1077C
date: 2018-11-24 15:22:31
tags:
- acm
- 刷题
categories:
- Codeforces
---

# 题意

[**题目链接**](https://codeforces.com/problemset/problem/1077/C)

给你一个数组，如果存在一个数等于剩余的数的和的话，，，就称这样array是good array，，

然后题目问你对于给定的数组去掉一个数之后时候是一个good array，，，输出所有的去掉的数的位置pos

<!-- more -->

# 分析

一开始我想这直接暴力去求，，，外循环遍历整个数组枚举可能是去掉的数，，，内循环遍历去掉那个数之后的数列寻找时候存在一个使得剩余数的和等于内循环遍历的那个数，，，

复杂度应该是$O(n^2)$，，，果不其然的tle了，，，，

然后去看标程题解，，，看不懂QAQ，，，

看了别人的思路后才弄出来，，，

对于这样一个good array，，，数$a_i = sum - a_i$，，那么$a_i$一定是这个数组的最大值，，，

所以先可以对整个数组排序一下，，，然后看最大$max$值是否等于$sum - max$，，，

注意如果要是去掉第一个数，，最大值就为第二大的数了，，，，

# 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 2e5 + 10;
typedef long long ll;
struct node
{
    ll num;
    int pos;
    bool operator < (const node &r) const
    {
        return r.num < num;
    }
}node[maxn];

int main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    int n;cin >> n;
    ll sum = 0;
    for(int i = 0; i < n; ++i)
    {
        cin >> node[i].num;
        node[i].pos = i;
        sum += node[i].num;
    }

    sort(node , node + n);

    vector<int> ans;
    for(int i = 0; i < n; ++i)
    {
        int max = (i == 0) ? node[1].num : node[0].num;
        if(sum - node[i].num - max == max)
            ans.push_back(node[i].pos);
    }
    cout << ans.size() << endl;
    for(vector<int>::iterator it = ans.begin(); it != ans.end(); ++it)
        cout << *it + 1 << " ";
    cout << endl;
}

```

(end)