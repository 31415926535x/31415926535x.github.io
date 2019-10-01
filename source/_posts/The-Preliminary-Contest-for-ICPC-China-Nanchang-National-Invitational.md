---
title: The Preliminary Contest for ICPC China Nanchang National Invitational
date: 2019-04-21 09:58:03
tags:
- acm
- 刷题
categories:
- ACM-比赛补题
---

# 概述

这次南昌邀请赛的网络赛打的心累啊，，发现自己啥都不会，智商受限，，，

|Solved| A|	B|	C|	D|	E|	F|	G|	H|	I|	J|	K|	L|	M|
| ----- | - | - | - | - | - | - | -| - | - | - | - | - | - |
|3/13|	O|	.|	.|	.|	.|	.|	.|	O|	.|	.|	.|	.|	O|

O for passing during the contest\
Ø for passing after the contest\
! for attempted but failed\
· for having not attempted yet

<!-- more -->

# 题目

##  A. PERFECT NUMBER PROBLEM

输出完美数，，直接百度输出就行了，，

```cpp
int main()
{
    // double pp = clock();
    // freopen("233.in" , "r" , stdin);
    // freopen("233.out" , "w" , stdout);
    // ios_base::sync_with_stdio(0);
    // cin.tie(0);cout.tie(0);
    cout << 6 << endl;
    cout << 28 << endl;
    cout << 496 << endl;
    cout << 8128 << endl;
    cout << 33550336 << endl;

    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;       
}
```

##  H. Coloring Game

$3^{n-2}*4\%mod$

当时怎么都推不出来那个公式，，然后没办法爆搜前几个n来找规律，，搞了一个消失貌似，，，

```cpp
inline ll pow_(ll a, ll b, ll p)    //快速幂
{
    ll ret = 1;
    while(b)
    {
        if(b & 1) ret = (ret * a) % p;
        a = (a * a) % p;
        b >>= 1;
    }
    return ret;
}
int main()
{
    // double pp = clock();
    // freopen("233.in" , "r" , stdin);
    // freopen("233.out" , "w" , stdout);
    // ios_base::sync_with_stdio(0);
    // cin.tie(0);cout.tie(0);
    ll n;
    cin >> n;
    if(!n)
        cout << 0 << endl;
    else if(n == 1)cout << 1 << endl;
	else
	cout << (pow_(3, n - 2, mod) * 4) % mod << endl;
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;       
}
```

## M. Subsequence

询问一堆串是不是原串的一个子序列，，，

序列自动机板子题，，，（貌似

读完题发现，哎？！这不就是以前在牛客做的一道题吗？？？直接找原来的代码，，然后因为中间一个输出忘记改，wa了一发，，，

```cpp
#include <bits/stdc++.h>
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
const int maxm = 1e5 + 5;
const int mod = 1e9 + 7;

int nxt[maxn][200];
int now[200];
char s[maxn];
void init()
{
    //序列自动机预处理
    memset(now, -1, sizeof now);            //mow_i表示第i个字母在原串中从后向前最晚出现的位置
    int len = strlen(s);
    --len;
    for(int i = len; ~i; --i)               //处理每一个字符
    {
        for(int j = 0; j < 128; ++j)        //找出第i个字符后面的26个字母最早出现的字符的位置
            nxt[i][j] = now[j];
        now[s[i]] = i;                //用当前字符更新当前字符在原串中从后向前最晚出现的位置
    }
}
char ss[maxn];
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    scanf("%s", s);
    int n; scanf("%d", &n);
    init();
    while(n--)
    {
        scanf("%s", ss);
        int loc = now[ss[0]];             //没有以子串第一个字符出现的子序列时
        if(!~loc)printf("NO\n");
        else
        {
            bool flag = true;
            int len = strlen(ss);
            for(int i = 1; i < len; ++i)
            {
                loc = nxt[loc][ss[i]];    //寻找母串中子串第i个字符下一次出现的位置
                if(!~loc)                       //没有就退出
                {
                    flag = false;
                    break;
                }
            }
            if(flag)printf("YES\n");
            else    printf("NO\n");
        }
    }
    return 0;
}
```