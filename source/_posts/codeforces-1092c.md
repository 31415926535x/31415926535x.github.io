---
title: codeforces_1092c
date: 2018-12-24 19:42:23
tags:
- acm
- 刷题
---

# 概述

[一道有关字符串前缀后缀的题](https://codeforces.com/contest/1092/problem/C)，，，自己迟早要坑在这字符串的题上，，，一看到这样的题，，不管简单还是难一些的心里就发怵，， 明明思路是对的，，总是莫名其妙的wa,,wa,,,wa,,,,,,

<!-- more -->

# 题意

题意很简单，，就是给你一个串的所有前缀串和它的后缀串，，，然后让你判断这些串可能是那种串，，，

首先肯定是要求出原串嘛，，，不然怎么判断，，，因为有两个长度为n-1的串和两个长度为1的串，，所以可以由此来得出原串，，，但是就是这里，，，我寻找原串写崩了，，，一直wa，，，，QAQ，，，，最后还是看了别人的思路，，，直接不寻找原串，，，对于每一种可能可原串都求一下答案，，，要是某个子串既不是前缀串又不是后缀串，，，那么就说明这个可能的原串不对，，换下一个，，直到碰到符合的原串，，输出之后终止程序，，，

+ string 里的 ```find()``` 函数可以寻找第一与子串匹配的坐标(从零开始)，，```rfing()```可以寻找最后一个与子串匹配的坐标。。。

# 代码

```cpp
#include <bits/stdc++.h>
//#include <iostream>
//#include <cstdio>
//#include <cstdlib>
//#include <string.h>
#define aaa cout<<233<<endl;
using namespace std;
typedef long long ll;
const int inf = 0x3f3f3f3f;
const ll linf = 0x3f3f3f3f3f3f3f;
const int maxn = 1e5 + 5;
const int maxm = 1e5 + 5;
const int mod = 1e9 + 7;

struct strings
{
    string s;
    int id;
    bool operator < (const strings &r)const
    {
        return s.size() < r.s.size();
    }
}str[300];
char ans[300];
int n;
void get(string s)
{
    for(int i = 1; i <= 2 * n - 2; i += 2)
    {
        if(s.find(str[i].s) == 0 && s.rfind(str[i + 1].s) == n - str[i + 1].s.length())
        {
            ans[str[i].id] = 'P';
            ans[str[i + 1].id] = 'S';
            continue;
        }
        if(s.rfind(str[i].s) == n - str[i].s.length() && s.find(str[i + 1].s) == 0)
        {
            ans[str[i].id] = 'S';
            ans[str[i + 1].id] = 'P';
            continue;
        }
        return;
    }
    for(int i = 1; i <= 2 * n - 2; ++i)
        cout << ans[i];
    cout << endl;
    exit(0);
}
int main()
{
//    freopen("233.txt" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    cin >> n;
    string pre , suf , t[2];
    bool flag = true;
    int cnt = 0;

    for(int i = 1; i <= 2 * n - 2; ++i)
    {
        cin >> str[i].s;
        str[i].id = i;
    }

    sort(str + 1 , str + 1 + 2 * n - 2);

    get(str[1].s + str[2 * n - 2].s);
    get(str[1].s + str[2 * n - 3].s);
    get(str[2].s + str[2 * n - 2].s);
    get(str[2].s + str[2 * n - 3].s);

    return 0;
}

```

菜到哭😭QAQ

![](https://img2018.cnblogs.com/blog/1028485/201812/1028485-20181224195910236-1750263669.png)
