---
title: codeforces-1111
date: 2019-02-18 11:41:17
tags:
- acm
- 刷题
categories:
- Codeforces
---

[codeforces 537 div2](https://codeforces.com/contest/1111)

# A

题意就是给你两个字符串，然后如果s,t的对应位上的字母要么都是元音，要么都是辅音，，就输出Yes反之输出No，，长度不等肯定输出的是No，，，

<!-- more -->

```cpp
#include <bits/stdc++.h>
//#include <iostream>
//#include <cstdio>
//#include <cstdlib>
//#include <string.h>
#define aaa cout<<ans<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
const int inf = 0x3f3f3f3f;//1061109567
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-6;
const double pi = 3.14159265358979;
const int maxn = 2e5 + 5;
const int maxm = 2e5 + 5;
const int mod = 1e9 + 7;
inline ll read() {
    char c = getchar(); int x = 0, f = 1;
    while(c < '0' || c > '9') {if(c == '-') f = -1; c = getchar();}
    while(c >= '0' && c <= '9') x = x * 10 + c - '0', c = getchar();
    return x * f;
}
bool check(char a, char b)
{
    if(a == 'a' || a == 'e' || a == 'i' || a == 'o' || a == 'u')
        if(b == 'a' || b == 'e' || b == 'i' || b == 'o' || b == 'u')
            return true;
        else
            return false;
    else if(b != 'a' && b != 'e' && b != 'i' && b != 'o' && b != 'u')return true;
         else return false;
}
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    string s, t;cin >> s >> t;
    if(s.length() != t.length())cout << "No" << endl;
    else
    {
        int len = s.length();
        for(int i = 0; i < len; ++i)
        {
            if(!check(s[i], t[i]))
            {
                cout << "No" << endl;
                return 0;
            }
        }
        cout << "Yes" << endl;
    }
    return 0;
}
```

# B

题意是给你n个数，有两种操作，一个是删除任意的一个数，另一个是将任意的一个数加一，，对于 **每个数的操作** 最多有k种，，总的操作数是m，，，然后问你m个操作后最大的平均值是多少，，

首先为了尽可能的增加平均数，要删除一些小的数，，暴力遍历可能删除的数的个数，，显然最多删除的个数是n-1或者是m，，所以遍历的边界是 ``min(m, n - 1)``，，

然后依次删去最小的数（预先排序一下），，删掉这个数后，算一下此时剩下数的平均值，，，然后和上一次的结果比较一下，取最大就行

```cpp
#include <bits/stdc++.h>
//#include <iostream>
//#include <cstdio>
//#include <cstdlib>
//#include <string.h>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef pair<int, ull> pii;
const int inf = 0x3f3f3f3f;//1061109567
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-6;
const double pi = 3.14159265358979;
const int maxn = 1e5 + 5;
const int maxm = 2e5 + 5;
const ll mod = 1e9 + 7;
inline int read()   //快读
{
    int ans=0;
    char ch=getchar();
    while(!isdigit(ch))
        ch=getchar();
    while(isdigit(ch))
        ans=(ans<<3)+(ans<<1)+(ch^48),ch=getchar();
    return ans;
}
ll a[maxn];

int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    ll n, k, m;
    n = read(); k = read(); m = read();
    for(int i = 1; i <= n; ++i)a[i] = read();
    sort(a + 1, a + 1 + n);
    ll sum = 0;
    for(int i = 1; i <= n; ++i)sum += a[i];
    long double ans = (long double)(sum + min(k * n, m)) / (long double)(n);
    for(int i = 1; i <= min(m, n - 1); ++i)
    {
        sum -= a[i];
        long double res = (long double)(sum + min(m - i, k * (n - i))) / (long double)(n - i);
        ans = max(ans, res);
    }
    printf("%.20f", (double)ans);
    return 0;
}
```

# C

题意是给你一个区间长度为 $2^n$长，，然后一个数组a[k]，a[i]表示第i个位置加一，，可能有a[i]是相等的，，然后有两种操作，一种是子区间全为零时操作的代价为A，，否则代价为 $B*num_{l,r}*len_{l, r}$，，，问你整个区间的最小操作代价，，

题解是递归+二分求解，，，

我一开始想到了递归来求，，但是自己写二分求区间[l, r]的 $num_{l, r}$ 时总是写爆，，，最后看了题解才想起来还有stl里的 ``lower_bound`` 和 ``upper_bound`` 可以直接二分找到，，，QAQ 

```cpp
#include <bits/stdc++.h>
//#include <iostream>
//#include <cstdio>
//#include <cstdlib>
//#include <string.h>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef pair<int, ull> pii;
const int inf = 0x3f3f3f3f;//1061109567
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-6;
const double pi = 3.14159265358979;
const int maxn = 1e5 + 5;
const int maxm = 2e5 + 5;
const ll mod = 1e9 + 7;
inline ll read()   //快读
{
    ll ans=0;
    char ch=getchar();
    while(!isdigit(ch))
        ch=getchar();
    while(isdigit(ch))
        ans=(ans<<3)+(ans<<1)+(ch^48),ch=getchar();
    return ans;
}
vector<ll> a;
ll n, k, A, B;
#define len (r-l+1)
#define mid ((l+r)>>1)
ll getnum(int l, int r)
{
    l = lower_bound(a.begin(), a.end(), l) - a.begin();
    r = upper_bound(a.begin(), a.end(), r) - a.begin();
    return r - 1 - l + 1;
}
ll solve(int l, int r)
{
    ll num = getnum(l, r);
    if(!num)return A;
    if(l == r)
    {
        if(num)
            return B * num * 1;
        else
            return A;
    }
    ll a = solve(l, mid);
    ll b = solve(mid + 1, r);
//    cout << a << b << "---" << endl;
    if(num)return min(a+b, (ll)(B * len * num));
    else   return min(a+b, A);
}

int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    n = read(); k = read(); A = read(); B = read();
    for(int i = 1; i <= k; ++i)
    {
        int t = read();
        a.pb(t);
    }
    sort(a.begin(), a.end());
    printf("%lld", solve(1, (1<<n)));
    return 0;
}
```

