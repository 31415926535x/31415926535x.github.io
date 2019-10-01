---
title: ACM-数论-广义欧拉降幂
date: 2019-09-02 13:15:19
tags:
- ACM
- 数论
- 广义欧拉降幂
categories:
- ACM-数论
---

> 曾今一时的懒，造就今日的泪

记得半年前去武大参加的省赛，当时的A题就是一个广义欧拉降幂的板子题，后来回来补了一下，因为没有交的地方，于是就测了数据就把代码扔了，，，然后，，昨天的南京网络赛就炸了，，，一样的广义欧拉降幂的板子题，，然后因为忘记了当初自己想出来的那中写法，，一直想着回想起之前的写法，，然后到结束都没弄出来，，，emmmm，，

赛后看了一下别人的解法，，别人的处理方法很巧妙，，当然另一个种返回两个值的（pair）的解法就是武大的标程，，，，（到最后之前想出的写法还是每能推出来，，都开始怀疑自己当时有没有真的推出来，，，，，

<!-- more -->

# 思路

广义欧拉降幂没啥好说的，，就是那个公式：

对于求 $a^b(mod \ p)$ 可以转换为：


$$
    a^b = 
    \begin{cases}
    a^{b \%  \phi (p)}   &gcd(a, p)=1 \\
    a^b &gcd(a, p) \neq 1, b < \phi (p) \\
    a^{b \% \phi (p) + \phi (p)} &gcd(a, p) \neq 1, b \ge \phi (p)\\
    \end{cases}
$$


公式很简单，，但是如果是求 $a_1^{a_2^{a_3^{...}}} (mod \ p)$ 类似这样的值的话，显然要递归从上往下求（刚开始弄成了从下往上求，，口胡了一段时间，，，，），，但是再递归求的时候要考虑每一次 $b$ 和 $\phi (p)$ 的关系，，然后选择哪一个等式，，，这样就麻烦了，，可以用一个 ``pair`` 什么的来保存一个标志变量来决定递归的上一层要不要 $+ \phi (p)$ ，，另一种巧妙地方式是修改一下 **取模** 的过程，，这样就不用考虑了，，，[具体的推导过程在这里](https://www.cnblogs.com/ACMLCZH/p/8117161.html)

所有的取模的步骤改成这样：

```cpp
inline ll modulo(ll x, ll mod){return x < mod ? x : x % mod + mod;}
```

这样保证 $b \ge \phi (p)$ ，，然后就少了判断的情况

# 题目

## [南京网络赛B supper_log](https://nanti.jisuanke.com/t/41299)

[南京网络赛B supper_log](https://nanti.jisuanke.com/t/41299)


这道题按题目的意思推几项样例就能看出是要求一个 $a^{a^{a^{a^{...}}}} mod \ m （一共有b个a）$ 的值，，直接降幂求就可以了，， 记得特判 b=0 的情况

### 代码


#### 群里很多大佬用的方法，重置取模的流程


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

ll f(ll x, ll a)
{
    if(x < 1)return -1;
    return 1 + f((ll)(log(x) / log(a)), a);
}

inline ll modulo(ll x, ll mod){return x < mod ? x : x % mod + mod;}
inline ll pow_(ll a, ll b, ll p)
{
    ll ret = 1;
    while(b)
    {
        if(b & 1)ret = modulo(ret * a, p);
        a = modulo(a * a, p);
        b >>= 1;
    }
    return ret;
}
inline ll phi(ll x)
{
    ll ans = x;
    for(ll i = 2; i * i <= x; ++i)
    {
        if(x % i == 0)
        {
            ans = ans / i * (i - 1);
            while(x % i == 0)x /= i;
        }
    }
    if(x > 1)ans = ans / x * (x - 1);
    return ans;
}
ll gcd(ll a, ll b)
{
    if(b == 0)return a;
    return gcd(b, a % b);
}
ll f(ll a, ll b, ll k, ll p)
{
    if(p == 1)return 1;
    if(k == 0)return 1;
    return pow_(a, f(a, a, k - 1, phi(p)), p);
}


int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    // ios_base::sync_with_stdio(0);
    // cin.tie(0);cout.tie(0);

    int t; cin >> t;
    while(t--)
    {
        ll a, b, m;
        cin >> a >> b >> m;
        // cout << a << b << m << endl;
        if(b == 0)
        {
            cout << 1 % m << endl;
            continue;
        }
        ll ans = f(a, a, b, m) % m;
        // if(a == 1)ans = 1 % m;
        // cout << ans << " " << ans % m << endl;
        cout << ans << endl;
    }
    

    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```


#### pair记录上一层


武大那场的标程，，直接改了下输入，，

```cpp
#include <bits/stdc++.h>
using namespace std;
#define ll long long
const int N = 1000010;
int prime[N + 1], isprime[N + 1];
int tot, phi[N + 1];
struct P
{
    ll ans;
    bool v;
    P(ll _ans, bool _v)
    {
        ans = _ans;
        v = _v;
    }
};
ll gcd(ll a, ll b)
{
    return b ? gcd(b, a % b) : a;
}
P qpow(ll A, ll B, ll C)
{
    ll re = 1;
    bool flag = 1;
    while (B)
    {
        if (B & 1)
        {
            if ((re *= A) >= C)
                flag = 0;
            re = re % C;
        }
        B = B >> 1;
        if (B)
        {
            if (A >= C)
                flag = 0;
            A %= C;
            if ((A *= A) >= C)
                flag = 0;
            A %= C;
        }
    }
    return P(re, flag);
}
void getphi()
{
    phi[1] = 1;
    isprime[1] = 1;
    for (int i = 2; i <= N; i++)
    {
        if (!isprime[i])
        {
            prime[++tot] = i;
            phi[i] = i - 1;
        }
        for (int j = 1; j <= tot && i * prime[j] <= N; j++)
        {
            isprime[i * prime[j]] = 1;
            if (i % prime[j] == 0)
            {
                phi[i * prime[j]] = phi[i] * prime[j];
                break;
            }
            else
                phi[i * prime[j]] = phi[i] * phi[prime[j]];
        }
    }
}
inline ll Euler(ll x)
{
    return phi[x];
    //题目可以再复杂一点模数可以到longlong
    // ll ans = x;
    // for (int i = 1; i <= tot && prime[i] * prime[i] <= x; i++)
    // {
    //     if (x % prime[i] == 0)
    //     {
    //         ans = ans / prime[i] * (prime[i] - 1);
    //         while (x % prime[i] == 0)
    //             x /= prime[i];
    //     }
    // }
    // if (x > 1)
    //     ans = ans / x * (x - 1);
    // return ans;
}
P f(ll a, ll b, ll k, ll p)
{
    if (p == 1)
        return P(0, 0);
    if (k == 0)
        return P(a % p, a < p);
    ll ep = Euler(p);
    P tmp = f(b, b, k - 1, ep);
    if (gcd(a, p) == 1)
        return qpow(a, tmp.ans, p);
    if (tmp.v == false)
    {
        tmp.ans += ep;
    }
    return qpow(a, tmp.ans, p);
}
int main()
{
    //double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ll a, b, k, p;
    getphi();
    int t;
    while (~scanf("%d", &t))
    {
        while (t--)
        {
            scanf("%lld %lld %lld", &a, &k, &p);
            b = a;
            if(k == 0)
            {
                printf("%lld\n", 1 % p);
                continue;
            }
            printf("%lld\n", f(a, b, k - 1, p).ans);
        }
    }
    //cout<<(clock()-pp)/CLOCKS_PER_SEC;
    return 0;
}
```

## [cf-906 D. Power Tower](https://codeforces.com/contest/906/problem/D)

[cf-906 D. Power Tower](https://codeforces.com/contest/906/problem/D)

突然很多人交这道两年前的题啊，，hhhhh

这题也是降幂，他是求的一个指数序列的一个区间的幂的值，，，套路一样，，就是这个模数很大，，不能每次都算他的 phi ，，不然会超时，，所以要记忆化一下 ``unordered_map`` 一下，，或者 **预处理一下模数的所有phi** 因为对一个数一直求 phi 下去，，其实个数不多，，，

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

ll a[maxn];

inline ll modulo(ll x, ll mod){return x < mod ? x : x % mod + mod;}
inline ll pow_(ll a, ll b, ll p)
{
    ll ret = 1;
    while(b)
    {
        if(b & 1)ret = modulo(ret * a, p);
        a = modulo(a * a, p);
        b >>= 1;
    }
    return ret;
}
unordered_map<ll, ll> phi_;
inline ll phi(ll x)
{
    if(phi_[x])return phi_[x];
    ll ans = x;
    ll t = x;
    for(ll i = 2; i * i <= x; ++i)
    {
        if(x % i == 0)
        {
            ans = ans / i * (i - 1);
            while(x % i == 0)x /= i;
        }
    }
    if(x > 1)ans = ans / x * (x - 1);
    phi_[t] = ans;
    return ans;
}
//这里根据题意来更改，k表示共有k个指数
ll f(ll a, ll b, ll k, ll p)
{
    if(p == 1)return 1;
    if(k == 0)return 1;
    return pow_(a, f(a, a, k - 1, phi(p)), p);
}
ll f(ll l, ll r, ll p)
{
    if(p == 1)return 1;
    if(l == r + 1)return 1;
    return pow_(a[l], f(l + 1, r, phi(p)), p);
}

int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);

    ll n, m;
    cin >> n >> m;
    for(int i = 1; i <= n; ++i)cin >> a[i];
    int q; cin >> q;
    while(q--)
    {
        ll l, r; cin >> l >> r;
        cout << f(l, r, m) % m << endl;
    }

    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

## [cf-gym-101550 E Exponial](https://codeforces.com/gym/101550/attachments)

[cf-gym-101550 E Exponial](https://codeforces.com/gym/101550/attachments)

这题是求一个 {% raw %} $n^{{n-1}^{{n-2}^{{n-3}^{{...}^{1}}}}} mod \ p$ {% endraw %} ，，，用上面的板子改一改就可以了，，，

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


inline ll modulo(ll x, ll mod){return x < mod ? x : x % mod + mod;}
inline ll pow_(ll a, ll b, ll p)
{
    ll ret = 1;
    while(b)
    {
        if(b & 1)ret = modulo(ret * a, p);
        a = modulo(a * a, p);
        b >>= 1;
    }
    return ret;
}
unordered_map<ll, ll> phi_;
inline ll phi(ll x)
{
    if(phi_[x])return phi_[x];
    ll ans = x;
    ll t = x;
    for(ll i = 2; i * i <= x; ++i)
    {
        if(x % i == 0)
        {
            ans = ans / i * (i - 1);
            while(x % i == 0)x /= i;
        }
    }
    if(x > 1)ans = ans / x * (x - 1);
    phi_[t] = ans;
    return ans;
}

// ll f(ll l, ll r, ll p)
// {
//     if(p == 1)return 1;
//     if(l == r + 1)return 1;
//     return pow_(a[l], f(l + 1, r, phi(p)), p);
// }

ll f(ll a, ll p)
{
    if(p == 1)return 1;
    if(a == 1)return 1;
    return pow_(a, f(a - 1, phi(p)), p);
}

int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);

    ll n, m;
    while(cin >> n >> m)cout << f(n, m) % m << endl;

    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```


貌似够了，，，数论是最不想碰的东西，，emmmm，，，但又时不得不稍稍掌握的东西，，，，

(end....)