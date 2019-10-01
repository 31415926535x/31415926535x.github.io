---
title: Educational Codeforces Round 71
date: 2019-09-04 17:02:03
tags:
- 刷题
- Codefoces
categories:
- Codeforces
---


上午没课，做一套题，，练一下手感和思维，，[教育场的71](https://codeforces.com/contest/1207) ，，前两到没啥，，后面就做的磕磕巴巴的，，，有想法但是不敢实现，，自我否定，，没了思路就只能官方题解，，发现其实都很简单，，，思维场把，，，，


<!-- more -->


# A	There Are Two Types Of Burgers

贪心就完事了，，推出公式不知道怎么证明是最优的，，，（敲错变量还wale一发emmm

```cpp
#include <bits/stdc++.h>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef long double ld; 
// mt19937 rnd(time(0));
const int inf = 0x3f3f3f3f;//1061109567 > 1e9
const ll linf = 0x3f3f3f3f3f3f3f3f;
const double eps = 1e-7;
const double pi = 3.14159265358979;
const int maxn = 1e5 + 5;
const int maxm = 1e3 + 5;
const int mod = 1e9 + 7;
 
 
 
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
 
    int t; cin >> t;
    while(t--)
    {
        int b, p, f;
        cin >> b >> p >> f;
        int h, c;
        cin >> h >> c;
        int ans = 0;
        if(h < c)
        {
            ans = c * (min(f, b / 2));
            b -= 2 * min(f, b / 2);
            ans += h * (min(p, b / 2));
        }
        else
        {
            ans = h * min(p, b / 2);
            b -= 2 * min(p, b / 2);
            ans += c * min(f, b / 2);
        }
        cout << ans << endl;
        
    }
 
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

# B	Square Filling

题意就是给你一个矩形，，由0，1组成，然后一次可以进行一个操作：把 $(x, y), (x, y + 1), (x + 1, y), (x + 1, y + 1)$ 这几个点变成1，，然后问你从一个全零的矩阵变成这个矩阵的操作方法，，没限制操作次数，，那就乱搞就行了，，

```cpp
#include <bits/stdc++.h>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef long double ld; 
// mt19937 rnd(time(0));
const int inf = 0x3f3f3f3f;//1061109567 > 1e9
const ll linf = 0x3f3f3f3f3f3f3f3f;
const double eps = 1e-7;
const double pi = 3.14159265358979;
const int maxn = 1e3 + 5;
const int maxm = 1e3 + 5;
const int mod = 1e9 + 7;
 
 
int a[maxn][maxn];
vector<pair<int, int> > ans;
bool check(int x, int y)
{
    if(a[x][y] && a[x][y + 1] && a[x + 1][y] && a[x + 1][y + 1])return true;
    return false;
}
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
 
    int n, m;cin >> n >> m;
    for(int i = 1; i <= n; ++i)
        for(int j = 1; j <= m; ++j)
            cin >> a[i][j];
    
    for(int i = 1; i <= n; ++i)
    {
        for(int j = 1; j <= m; ++j)
        {
            if(!a[i][j])continue;
            if(check(i, j))ans.push_back(make_pair(i, j));
            else if(check(i, j - 1))ans.push_back(make_pair(i, j - 1));
            else if(check(i - 1, j))ans.push_back(make_pair(i - 1, j));
            else if(check(i - 1, j - 1))ans.push_back(make_pair(i - 1, j - 1));
            else
            {
                cout << -1 << endl;
                return 0;
            }
        }
    }
    sort(ans.begin(), ans.end());
    int size = unique(ans.begin(), ans.end()) - ans.begin();
    cout << size << endl;
    for(int i = 0; i < size; ++i)cout << ans[i].first << " " << ans[i].second << endl;
 
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

# C	Gas Pipeline

dp?! 没怎么训练过dp，，暂时扔了，，

# D	Number Of Permutations

感觉这道题不错，，

题意就是对于给你的一个二元对 序列s，，他的排列中任意一维满足不递减的排列就是 坏的排列，问你所有的排列中好的共有几种，，

一开始被tag的组合吓懵了，，以为是什么推公式的排列组合题，，

其实解法很简单，，考虑反面就行了，，，总的排列的情况一共有 $fac[n]$ 种，，然后对于第一维不递减的排列的个数记为 $cnt_1$ ，同理第二维的就是 $cnt_2$ ，，根据容斥的思想，，还有它俩的交集 $cnt_{12}$ ，，最后他们的答案就是 $fac[n] - cnt_1 - cnt_2 + cnt_{12}$ ，，，

前两种的求法就是排序后，，如果没有重复的元素，那就就是一种情况，，如果有重复的元素，，那么就是重复元素的阶乘的积，，

对于最后这种交集的情况，首先要按第一维排序，如果第一维相等，按第二维排序，，，然后判断第二维是不是不递减的，，如果不是不递减的，，那么这种情况就是0种，，否者的话，，对于那些相同的二元对就可以互换位置，，那么答案就是他们的阶乘的积，，


最后统计答案就行了，，记得多加几个模，，因为前两种的情况可能很多，，，emmmm，，，wa了好几发，，，

```cpp
#include <bits/stdc++.h>
#define aaa cout<<233<<endl;
#define endl '\n'
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef long double ld; 
// mt19937 rnd(time(0));
const int inf = 0x3f3f3f3f;//1061109567 > 1e9
const ll linf = 0x3f3f3f3f3f3f3f3f;
const double eps = 1e-7;
const double pi = 3.14159265358979;
const int maxn = 3e5 + 5;
const int maxm = 1e3 + 5;
// const int mod = 1e9 + 7;
const int mod = 998244353;

pair<int, int> a[maxn];
bool cmpab(pair<int, int> i, pair<int, int> j)
{
    if(i.first == j.first)return i.second < j.second;
    return i.first < j.first;
}
bool cmpb(pair<int, int> i, pair<int, int> j)
{
    return i.second < j.second;
}
ll fac[maxn];
void init()
{
    fac[0] = fac[1] = 1;
    for(int i = 2; i < maxn; ++i)fac[i] = fac[i - 1] * i % mod;
}
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);

    int n; cin >> n;
    for(int i = 1; i <= n; ++i)cin >> a[i].first >> a[i].second;
    sort(a + 1, a + 1 + n, cmpab);
    ll cnt1, cnt2, cnt12;
    cnt1 = cnt2 = cnt12 = 1;
    init();
    for(int i = 1; i <= n; ++i)
    {
        int l = i, r = n; 
        int k = i;
        while(l <= r)
        {
            int mid = l + r >> 1;
            if(a[mid].first == a[i].first)
            {
                l = mid + 1;
                k = mid;
            }
            else
            {
                r = mid - 1;
            }
        }
        cnt1 = cnt1 * fac[k - i + 1] % mod;
        i = k;
    }
    bool flag = true;
    for(int i = 1; i <= n; ++i)if(a[i].second < a[i - 1].second)flag = false;
    if(flag)
    {
        for(int i = 1; i <= n; ++i)
        {
            int l = i, r = n;
            int k = i;
            while(l <= r)
            {
                int mid = l + r >> 1;
                if(a[mid].first == a[i].first && a[mid].second == a[i].second)
                {
                    l = mid + 1;
                    k = mid;
                }
                else
                {
                    r = mid - 1;
                }
            }
            cnt12 = cnt12 * fac[k - i + 1] % mod;
            i = k;
        }
    }
    else
    {
        cnt12 = 0;
    }
    
    sort(a + 1, a + 1 + n, cmpb);
    for(int i = 1; i <= n; ++i)
    {
        int l = i, r = n;
        int k = i;
        while(l <= r)
        {
            int mid = l + r >> 1;
            if(a[mid].second == a[i].second)
            {
                l = mid + 1;
                k = mid;
            }
            else
            {
                r = mid - 1;
            }
        }
        cnt2 = cnt2 * fac[k - i + 1] % mod;
        i = k;
    }
    // cout << fac[n] << " " << cnt1 << " " << cnt2 << " " << cnt12 << endl;
    if(n != 1)cout << (fac[n] - cnt1 - cnt2 + cnt12 + mod * 2) % mod << endl;
    else cout << 0 << endl;

    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

# E	XOR Guessing

一道简单的交互题，，，

题意就是你有两次询问机会，，每次询问是100 个数，，然后交互器会选择一个数和答案 $x$ 的异或作为输入给你，，最后你要得出答案那个数，，，

看到异或，第一反应就是位运算相关的，，，往上靠就行了，，只有两次机会的话，，而且书的范围是14位内的正整数，，，所以考虑第一次询问 $x$ 的高7位，，后一次询问低7位，，，然后将得到的值掐掉前面的低7位，，“并” 上后面掐掉高7位的值就行了，，，

忘记将 ``#define '\n' endl`` 注释ile了一发，，，emmmmm

```cpp
#include <bits/stdc++.h>
#define aaa cout<<233<<endl;
// #define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef long double ld; 
// mt19937 rnd(time(0));
const int inf = 0x3f3f3f3f;//1061109567 > 1e9
const ll linf = 0x3f3f3f3f3f3f3f3f;
const double eps = 1e-7;
const double pi = 3.14159265358979;
const int maxn = 1e3 + 5;
const int maxm = 1e3 + 5;
const int mod = 1e9 + 7;
 
 
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
 
    cout << "? ";
    for(int i = 1; i <= 100; ++i)cout << i << " ";cout << endl;fflush(stdout);
    ll a; cin >> a;
    cout << "? ";
    for(int i = 1; i <= 100; ++i)cout << (i << 7) << " "; cout << endl;fflush(stdout);
    ll b; cin >> b;
    // cout << a << b << endl;
    a = a & (0b11111110000000);
    b = b & (0b00000001111111);
    cout << "! " << (a | b) << endl;fflush(stdout);
    
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

# F	Remainder Problem

这题也不错，，

题意就是一个长为500000的数组，，一个操作是对 第x位 a[x] += y；另一种操作是询问所有 模x余数为y位置处的数的和，，，

自己想的做法T了，，，因为没有想到 修改一个数他所会影响的可能询问该怎么表示，，，，

这题的解法是： 用一个数组 $sum[x][y]$ 保存模为x时余数时y的答案，，因为当模数很大时，，我们即使时暴力找，，因为这时的数很少，，，所以询问不怎么费时间，，，但是数小时，，，寻找的数就很多，，，这样就会T，，，所以我们只保存前750个模数的答案，，，

每次修改一个数 $a[x] += y$ 后，，，对于所有 $sum[i][x \% i]$ 都会产生影响，，，这里的i就是模数，，，$x \% i$ 相当于是这个模数下的余数，，当询问 $(2, i, x \% i)$ 时，，，这个答案就可以直接得到，，，

比如说我修改 a[7] 的值，，那么对于一个询问 $(x, y)={(3, 1), (4, 3), (5, 2)......}$ 这些询问的值一定会改变，，，也就是对 $sum[3][1], sum[4][7 \% 4], sum[5][7 \% 5]$ 进行了修改，，


思路理清代码就简单了，，，


```cpp
#include <bits/stdc++.h>
#define aaa cout<<233<<endl;
#define endl '\n'
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef long double ld; 
// mt19937 rnd(time(0));
const int inf = 0x3f3f3f3f;//1061109567 > 1e9
const ll linf = 0x3f3f3f3f3f3f3f3f;
const double eps = 1e-7;
const double pi = 3.14159265358979;
const int maxn = 5e5 + 5;
const int maxm = 1e3 + 5;
const int mod = 1e9 + 7;
 
int a[maxn];
const int k = 750;
int sum[k][k];
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
 
    int q; cin >> q;
    int o, x, y;
    while(q--)
    {
        cin >> o >> x >> y;
        if(o == 1)
        {
            a[x] += y;
            for(int i = 1; i < k; ++i)sum[i][x % i] += y;
        }
        else
        {
            if(x >= k)
            {
                int ans = 0;
                for(int i = y; i <= 500000; i += x)ans += a[i];
                cout << ans << endl;
            }
            else
            {
                cout << sum[x][y] << endl;
            }
            
        }
        
    }
 
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

# G	Indie Album

貌似是AC自动机的题，，，没开字符串的专题，，先扔了，，，

(end...)