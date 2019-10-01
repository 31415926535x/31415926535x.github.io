---
title: Educational Codeforces Round 60
date: 2019-04-08 11:53:46
tags:
- acm
- 刷题
- cf
categories:
- Codeforces
---

发现现在的我不仅仅是专门的算法知识学的不够，，平常的签到题那样的考验代码能力的题也不是很稳定的能够写出来，比如说cfdiv2的ABC题，，所以决定练一段时间的cf的题，，

这套题感觉重在考察思想和代码能力，

<!-- more -->

# A. Best Subsegment

题意就是求一个数组中平均值最大的子区间的长度，，有多个相同的最大平均值区间取长度最大的，，

一开始我想着直接枚举长度，用前缀和来求子区间的平均值，，但是这样时间复杂度是n方，t了，，

首先题意要要保证平均值最大，然后才是保证长度最长，所以先找到值最大的元素，，如果有连续的最大值出现，求出最长长度，，，

```cpp
const int maxn = 4e5 + 5;
const int maxm = 2e7 + 5;
const int mod = 1e9 + 7;

int a[maxn], n;

int main()
{
    // freopen("233.in" , "r" , stdin);
    // freopen("233.out" , "w" , stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    cin >> n;
    for(int i = 1; i <= n; ++i)cin >> a[i];
    int mx = 0;
    for(int i = 1; i <= n; ++i)mx = max(a[i], mx);
    int ans = 0;
    for(int i = 1; i <= n; ++i)
    {
        if(a[i] == mx)
        {
            int r = i;
            for(int j = i; j <= n; ++j)
            {
                if(a[j] == mx)
                    r = j;
                else
                    break;
            }
            ans = max(ans, r - i + 1);
            i = r;
        }
    }
    cout << ans << endl;
    return 0;   
}
```

# D. Magic Gems

题意：给你一串数，然后可以重复的选取m个，但是同一个不能连续选超过k个，问你最大的选的和，，

既然要选和最大，那么每次选最大的，超出k个选一次第二大的，然后继续这样选，，

ll也不会爆，，

一开始推出公式换成代码还忘记乘了一数，wa了一发

```cpp
ll n, m, k, a[maxn];

int main()
{
    // freopen("233.in" , "r" , stdin);
    // freopen("233.out" , "w" , stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    cin >> n >> m >> k;
    for(int i = 1; i <= n; ++i)cin >> a[i];
    sort(a + 1, a + 1 + n);
    ll ans = m / (k + 1) * (k * a[n] + a[n - 1]);
    if(m / (k + 1) * (k + 1) != m)
        ans += (m - m / (k + 1) * (k + 1)) * a[n];
    cout << ans << endl;
    return 0;       
}
```

# C. Magic Ship

这道题很不错啊，，

题意：船的起点是s要到的终点是t，然后每走一步会有四个方向的风的加成，问你能到达终点时的最小时间，，风在变化完一轮之后会从一开始继续，，

读完题之后一点思路都没有，首先这个风向的变化就不知道怎么处理，即使看到了下面的tag是二分也不知道怎么弄，，

后来看了题解，大致的思路是这样的：

首先考虑这个风，如果要是每一步都考虑这个风的影响肯定是不行的，太麻烦了，，注意到风对船每一步的影响都相当于是一开始全都对船影响，就是把每一天的风的加成后的位置在一开始就计算出来（前缀和的思想+推公式），然后再在这个新的位置出发去终点，，

这样想之后，我们就可以计算出在day天后，船的位置首先因为风的影响由 $s$ 变到了 $s'$，，然后判断这day天船是否可以在 $s'$ 到达终点t，，，而且即使从这个点 $s'$ 出发到终点的最短时间比day少也没关系，因为题中说船可以选择不动，这样单独受风的影响就行了，，

而这个最小的day就可以二分找出来，，因为一定是day之前的都不可行，而后面的day一个比一个大，，这样满足使用二分的条件，，，（二分又写崩++，，，，

```cpp
const int maxn = 4e5 + 5;
const int maxm = 2e7 + 5;
const int mod = 1e9 + 7;

pair<ll, ll> s, t;
string str;
ll n;
pair<ll, ll> d[maxn];
bool check(ll day)
{
    pair<ll, ll> tmp;
    tmp.first = s.first + (day / n) * d[n].first + d[(day % n)].first;
    tmp.second = s.second + (day / n) * d[n].second + d[(day % n)].second;
    ll ans = abs(tmp.first - t.first) + abs(tmp.second - t.second);
    return ans <= day;
}
int main()
{
    // freopen("233.in" , "r" , stdin);
    // freopen("233.out" , "w" , stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    cin >> s.first >> s.second >> t.first >> t.second >> n >> str;
    for(int i = 0; i < n; ++i)
    {
        d[i + 1] = d[i];
        if(str[i] == 'U')++d[i + 1].second;
        if(str[i] == 'D')--d[i + 1].second;
        if(str[i] == 'L')--d[i + 1].first;
        if(str[i] == 'R')++d[i + 1].first;
    }
    ll l = 0, r = 1e18;
    ll ans = -1;
    while(l <= r)
    {
        ll mid = (l + r) >> 1;
        if(check(mid))
        {
            ans = mid;
            r = mid - 1;
        }
        else l = mid + 1;
    }
    cout << ans << endl;
    return 0;       
}
```

# D. Magic Gems

这题的题意很简单，，就是处理的方法我没见过，，涨知识ing，，，

题意就是一块魔法宝石可以变成m块普通的宝石，然后魔法宝石和普通宝石都占一个空间，给你一堆魔法宝石问你有几种情况使得占的空间正好是n，，

这题有两种解法，，一种是 **推dp方程矩阵加速幂加速** ，另一种是 **直接上杜教筛** ..

[参考1](https://blog.csdn.net/qq_37632935/article/details/87889975)
[参考2](https://blog.csdn.net/moon_sky1999/article/details/87974954)

## dp+矩阵快速幂

### 分析

首先定义 $dp_i$ 表示 *恰好占用i个单元空间时的选择方法个数* ，，

然后去推状态转移方程： 可以看出（emm我就没看出，，）对于每一个给定的空间有两种可以不同的选择方法，一种是 *不拆分魔法宝石所得* ， 另一种是 *拆分一块魔法宝石所得* ，，，这样的话前者就可以表示为 $dp_{i-1}$ ， 后者可以表示为 $dp_{i-m}$ ，加起来就是这个空间下所有的可能选择的方法数了，，

$$
    dp_i=dp_{i-1}+dp_{i-m}
$$

但是如果只是按照平常的dp问题去求 $dp_n$ 显然时空都会爆，，（n可能是1e18），，，所以这样做要优化，，转化成求矩阵快速幂的形式就行了，，

把那个状态转移方程 $dp_n=dp_{n-1}+dp_{n-m}$ 多推几项：

$$
    dp_{n}=dp_{n-1}+dp_{n-m}\\
    dp_{n-1}=dp_{n-2}+dp_{n-m-1}\\
    dp_{n-2}=dp_{n-3}+dp_{n-m-2}\\
            \cdots
$$

用矩阵快速幂进行递推式加速时的一般形式是把原递推式转化成：

$$
    \begin{bmatrix}
        f[n]\\
        f[n-1]\\
        f[n-2]\\
        \vdots
    \end{bmatrix}

    = 

    A^k

    \begin{bmatrix}
        f[n-1]\\
        f[n-2]\\
        \vdots
    \end{bmatrix}
$$

这样的形式，，对于这道题的递推方程就可以转化成：

$$
    \begin{bmatrix}
        dp[n]\\
        dp[n-1]\\
        dp[n-2]\\
        \vdots\\
        dp[n-m+1]\\
    \end{bmatrix}
    
    =

    A

    \begin{bmatrix}
        dp[n-1]\\
        dp[n-2]\\
        dp[n-3]\\
        \vdots\\
        dp[n-m]\\
    \end{bmatrix}
$$

根据等式间的关系，为了得到左边第一项 $dp[n]$ ，A的第一行要是 $[1,0,0,\cdots, 1]$ ，这样才能得到递推公式为我们所用，，

而后面那几项显然都等于对应层的上一层的值，，，也就是说A中对应的是1就可以了，，

实际上只用到了刚刚往后推的一两项，，

所以A就应该是这样的，，

$$
    A=
    \begin{bmatrix}
        1 & 0 & 0 & 0 & 0 & 0 & \cdots & 1 \\
        1 & 0 & 0 & 0 & 0 & 0 & \cdots & 0 \\
        0 & 1 & 0 & 0 & 0 & 0 & \cdots & 0 \\
        \vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \vdots \\
        0 & \cdots & 0 & 0 & 0 & 0 & 1 & 0 \\
        0 & \cdots & 0 & 0 & 0 & 0 & 0 & 1 \\
    \end{bmatrix}
$$

最后把A后面的那个矩阵转化成一个常数矩阵，，观察之后可以看出后面那个矩阵最下面最小是 $dp[1]$ 这种情况下表示空间为1时的方案数，，肯定是选择一个魔法宝石不拆啦，，，同理一直到m-1的空间都是1，，而 $dp[m]$ 就可以有两种选择，，要么都是魔法宝石，要么一个魔法宝石拆分m块普通宝石，，也就是2，，，所以最后的矩阵递推式就是：

$$
    \begin{bmatrix}
        dp[n]\\
        dp[n-1]\\
        dp[n-2]\\
        \vdots\\
        dp[n-m+1]\\
    \end{bmatrix}

    = 

    A^k

    \begin{bmatrix}
        2\\
        1\\
        1\\
        \vdots\\
        1\\
    \end{bmatrix}
$$

推一下的话就知道 $k=n-m$ 看右边矩阵的最上面那一项的变化值的差

### 代码

上一次写矩阵快速幂还是暑假的集训队学的时候写的，，现在早就忘记了，，正好记录一下板子，，

最后的复杂度大概是 $O(n^3logn)$

```cpp
#include <bits/stdc++.h>
// #include <iostream>
// #include <cstdio>
// #include <cstdlib>
// #include <string.h>
// #include <algorithm>
// #include <set>
// #include <vector>
// #include <cmath>
// #include <queue>
// #include <stack>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
const int inf = 0x3f3f3f3f;//1061109567 > 1e10
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-6;
const double pi = 3.14159265358979;
const int maxn = 1e5 + 5;
const int maxm = 2e7 + 5;
const int mod = 1e9 + 7;

ll n, m;

const int len = 105;
struct matrix
{
    // int m;
    ll num[105][105];
    // matrix(){}
    matrix(){memset(num, 0, sizeof num);}
    matrix operator *(const matrix &x)
    {
        matrix c;
        for(int i = 1; i <= m; ++i)
            for(int j = 1; j <= m; ++j)
                for(int k = 1; k <= m; ++k)
                    c.num[i][j] = (c.num[i][j] + num[i][k] * x.num[k][j]) % mod;
        return c;
    }
    matrix &operator =(const matrix &x)
    {
        for(int i = 1; i <= m; ++i)
            for(int j = 1; j <= m; ++j)
                num[i][j] = x.num[i][j];
        return *this;
    }
    matrix pow_(matrix x, ll k)
    {
        matrix ans;
        for(int i = 1; i <= m; ++i)ans.num[i][i] = 1;
        while(k)
        {
            if(k & 1)ans = ans * x;
            x = x * x;
            k >>= 1;
        }
        return ans;
    }
    
};

ll f[len];

int main()
{
    // freopen("233.in" , "r" , stdin);
    // freopen("233.out" , "w" , stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    cin >> n >> m;
    if(n < m)
    {
        cout << 1 << endl;
        return 0;
    }
    matrix a = matrix();
    for(int i = 2; i <= m; ++i)a.num[i][i - 1] = 1;
    a.num[1][1] = a.num[1][m] = 1;
    for(int i = 1; i <= m; ++i)f[i] = 1;
    f[m] = 2;
    a = a.pow_(a, n - m);
    ll ans = 0;
    for(int i = 1; i <= m; ++i)
        ans = (ans + a.num[1][i] * f[m - i + 1]) % mod;
    cout << ans << endl;
    return 0;       
}
```

### 杜教线性筛

好久之前就听说过杜教筛，，但是一直没有用过，，正好遇到了，，记录一下这个强大的板子，，，这道题直接暴力算出前200项然后把结果丢到杜教筛中跑一下就行了，，，，时间复杂度好像是 $O(n^{2/3})$ ，，，上一个大概跑1s多，，这个直接30ms，，，

```cpp
#include <bits/stdc++.h>
// #include <iostream>
// #include <cstdio>
// #include <cstdlib>
// #include <string.h>
// #include <algorithm>
// #include <set>
// #include <vector>
// #include <cmath>
// #include <queue>
// #include <stack>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
const int inf = 0x3f3f3f3f;//1061109567 > 1e10
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-6;
const double pi = 3.14159265358979;
const int maxn = 1e5 + 5;
const int maxm = 2e7 + 5;
const int mod = 1e9 + 7;

namespace linear_seq
{
    
    #define rep(i,a,n) for (int i=a;i<n;++i)
    #define per(i,a,n) for (int i=n-1;i>=a;--i)
    #define pb push_back
    #define mp make_pair
    #define all(x) (x).begin(),(x).end();
    #define fi first
    #define se second
    #define SZ(x) ((int)(x).size())
    typedef vector<int> VI;
    typedef long long ll;
    typedef pair<int,int> PII;
    const ll mod=1e9+7;

    const int N=10010;
    ll _, n;
    ll res[N], base[N], _c[N], _md[N];
    vector<ll> Md;
    void mul(ll *a, ll *b, int k)
    {
        rep(i,0,k+k) _c[i] = 0;
        rep(i,0,k)if(a[i])rep(j,0,k)_c[i+j]=(_c[i+j]+a[i]*b[j])%mod;
        for(int i=k+k-1; i>=k; --i)if(_c[i])
            rep(j,0,SZ(Md))_c[i-k+Md[j]]=(_c[i-k+Md[j]]-_c[i]*_md[Md[j]])%mod;
        rep(i,0,k)a[i]=_c[i];
    }
    ll powmod(ll a, ll b)
    {
        ll res = 1;
        a %= mod;
        assert(b>=0);
        for(; b; b>>=1)
        {
            if(b&1)res=res*a%mod;
            a=a*a%mod;
        }
        return res;
    }
    int solve(ll n, VI a, VI b)
    {
        ll ans = 0, pnt = 0;
        int k = SZ(a);
        assert(SZ(a) == SZ(b));
        rep(i,0,k) _md[k-1-i]=-a[i];
        _md[k]=1;
        Md.clear();
        rep(i,0,k)if(_md[i]!=0)Md.push_back(i);
        rep(i,0,k)res[i]=base[i]=0;
        res[0]=1;
        while((1ll<<pnt)<=n)++pnt;
        for(int p = pnt; p>=0; --p)
        {
            mul(res, res, k);
            if((n>>p)&1)
            {
                for(int i=k-1; i>=0; --i)res[i+1]=res[i];
                res[0]=0;
                rep(j,0,SZ(Md))res[Md[j]]=(res[Md[j]]-res[k]*_md[Md[j]])%mod;
            }
        }
        rep(i,0,k)ans=(ans+res[i]*b[i])%mod;
        if(ans<0)ans+=mod;
        return ans;
    }
    VI BM(VI s)
    {
        VI C(1,1), B(1,1);
        int L=0, m=1, b=1;
        rep(n, 0, SZ(s))
        {
            ll d = 0;
            rep(i,0,L+1)d=(d+(ll)C[i]*s[n-i])%mod;
            if(d==0) ++m;
            else if(2*L<=n)
            {
                VI T=C;
                ll c=mod-d*powmod(b,mod-2)%mod;
                while(SZ(C)<SZ(B)+m)C.pb(0);
                rep(i,0,SZ(B))C[i+m]=(C[i+m]+c*B[i])%mod;
                L=n+1-L;
                B=T;
                b=d;
                m=1;
            }
            else
            {
                ll c=mod-d*powmod(b,mod-2)%mod;
                while(SZ(C)<SZ(B)+m)C.pb(0);
                rep(i,0,SZ(B))C[i+m]=(C[i+m]+c*B[i])%mod;
                ++m;
            }
        }
        return C;
    }
    int gao(VI a, ll n)
    {
        VI c=BM(a);
        c.erase(c.begin());
        rep(i,0,SZ(c))c[i]=(mod-c[i])%mod;
        return solve(n,c,VI(a.begin(),a.begin()+SZ(c)));
    }
}; // linear_seq

ll f[205];

int main()
{
    // freopen("233.in" , "r" , stdin);
    // freopen("233.out" , "w" , stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    ll n, m;
    cin >> n >> m;
    for(int i = 1; i <= m; ++i)f[i] = 1;
    for(int i = m; i <= 200; ++i)f[i] = (f[i - 1] + f[i - m]) % mod;
    vector<int> v;
    ++n;
    for(int i = 1; i <= 200; ++i)v.push_back(f[i]);
    cout << linear_seq::gao(v, n - 1) % (ll)mod << endl;
    return 0;       
}
```

# E. Decypher the String

## 分析

### 解法一

一道进制思想的交互题，，从来没有写过交互题（因为都是靠后的题，，所以以前从来没有看过，，，

这道题的题意是：给你一个字符串t，，t是s经过一定交换规则得到的字符串，然后你可以给交互器最多三次的三个长度一样的字符串，然后他会返回一个同样规则变换后的字符串，，然后让你根据这些信息来推断出具体的交换的规则，，然后输出原来的s，，，

首先看一个例子：长度不过9的s: ``xyz``，，如果我们的交换规则是 ``(1, 2), (2, 3)`` ，也就是说变换后得到的t就是 ``yzx`` ，，

如果我们向交互器询问一个有序的字符串 ``abc`` ，，那么交互器就可以通过那个规则返回一个字符串 ``bca`` ，，而我们就可以通过这个返回的字符串和之前的那个有序的字符串得出交换的规则： 对于s ``123`` 变换后的t就是 ``231`` （意思是把第一个换成第2个，第二个换成第3个，第三个换成第1个），，，

这样就知道了 ``s->t`` 的变换规则，，而现在我们知道变换后的t，，那么就在反一次就可以得到 ``t->s`` 的变换规则，（也就是将t的第2个变成第一个，第3个变成第二个，第1个变成第三个，，正好和上面的变化相反，，），，也就是： ``rev=[312]`` ，， 这样 $s_i=t_{rev_i}$ ，，，这样基本的处理就弄明白了，，，**相当于通过变换一个有序的下标序列，然后得知变换的方法**

但是如果字符串的长度大于9我们还可以用字母表示，但是当是1e4的范围时，，就不能用一个字符来表示字符串的每一个下标了，，这时就用到了进制的表示，因为每一次询问只能是小写字母，所以就用26进制来表示每一个下标的十进制，，因为三位的26进制 ``aaa~zzz`` 就可以表示 $26^3 > 1e4$ ，，这样就可以用一个三位的字符串来表示每一个下标，，但是因为每次询问只能是长度为n的串，，所以就把这三位拆开组成三个串来询问，，因为每一个改变的下标在每次询问中都会改变的，，所以询问三次累加一下每一个下标对应的值就行了，，，最后就可以得到上面类似的变换规则，，然后反一下，，求出s就行了，，，

[参考博客1](https://blog.csdn.net/Mitsuha_/article/details/87794531)

[参考博客2](https://blog.csdn.net/BUAA_Alchemist/article/details/87705287)那个小白鼠的问题不错2333，，，

### 解法二

对了，[评论区](https://codeforces.com/blog/entry/65365)里看到有人说这题也可以用中国剩余定理来解决 *(saeed_odak)* ，，，题目的tag里也有CRT，，，所以又看了看这种解法，，

这种解法的大致思想和上面那种3位26进制的思想差不多，都是用一个东西表示字符串的下标，然后询问三次，保证每一位都被询问过，然后组合起来，在反一下求出答案，，，不同的地方在于用什么表示下标，，，

下面的东西我是看评论区 *Varun_Shah* 这位大佬的回复大致懂得：

（感觉先看他的原话比较容易懂这个解法的思想，，，）


#### 先说一下为什么要用余数：

假如给你两个数2，3，那么 $0 \% 2 = 0, 0 \% 3 = 0$，就可以看成一个对(pair): $(0, 0)$ ，，同理一共有 6 个这样的对（0~5对应的余数组成的对），**而且每一个对都是不同的** ，，也就是说我们可以用两个数字2，3的余数的对来表示6个数字，0~5，，$(0, 0), (1, 1), (0, 2), (1, 0), (0, 1), (1, 2)$

这个思想就有点像26进制每一个字符串表示不同的唯一的数字一样，，

**但是一定要保证被模数两两互质** ，，

#### 再回到这道题上，，

当n=5时，两个字符串：

ababab ,循环节为2
abcabc ,循环节为3

在这第一个字符串中，a如果表示为0，b为1，，那么所有的a所处的位置就是所有模2为零的位置，，也就是0，2，4...同理b都是模2为1的位置，，

同理对于第二个字符串，a=0,b=1,c=2，，，

然后把这两个字符串发送给交互器，会得到两个改变后的字符串，，假如说对于第0个位置处的字符得到的是一个b,一个c，，我们把这两个用上面的数字来表示，第一个维度表示是第一个串中的位置，第二个维度就是第二个串中出现的位置，，也就是(1,2),,如果和上面那个对比一下，发现 (1,2)表示的是5，也就是说0位处的字符和第5位处的字符交换所得，，，

然后对于刚开始没有询问时，第0位处的可能交换位置是所有的位置，，

然后第一次询问得到b，表示可能的交换位置是 {1,3,5}，，

然后第二次询问得到c，可能的交换位置就只有了{5}，，，

也就是说，3次询问的交集就是最后这个位置和另一个位置交换的解，，

我们0~n-1枚举每一个字符三次询问的交集就可以得到最后 s->t 的规则，，然后就可以像上面那种解法一样处理了，，，

#### 为什么要选26，25，23

上面那种解法选 $26^3$ 的原因是因为字符串的长度是1e4，，所以为了能够用一个字符串表示的数唯一的表示每一个位置，，所以选了长度为3的字符串，然后拆开询问3次合并这个操作，，

对于这个解法，，因为我们是用循环的字符串类似 ``abcd.....xyzabc`` , ``abcd...xyab`` 等等来表示每一位处的情况，，所以每一个字符串的循环节的长度就表示了这一维度所能表示的情况数，，为了能大于等于1e4，，选择三个循环节分别为 {26,25,23} 的字符串来逐一询问，，可能表示的情况数就是： $26*25*23 > 1e4$ ，，，为什么不选24呢，，因为它和26不互质，，，就会出现一些相同的三元对，，这样就不能唯一表示每一个位置了，，

#### 中国剩余定理的作用

貌似说了这么一大堆，和中国剩余定理没有关系啊，，，上面只是讨论了该怎么表示每一个位置的数字，，但是怎么把得到的三元对转化成十进制的下标数字呢，因为我们要根据这个来反推字符串啊，，

中国剩余定理就是干这个的，他可以求出一些形如 $x\%m_i=a_i$ 的解，，而我们求出的每一个位置处的三元组就可以看成三个 $a_i$ ，，而26，25，23 就可以看成是三个模数 &m_i$ ，，，这样就可以求出每个位置处唯一的改变的下标值，，

#### 最后的操作步骤

+ 构造三个循环节分别为 26, 25, 23 的字符串，作为后面三次询问的字符串
+ 保存每一次询问后的改变的字符串
+ 取三个询问后得到的字符串的值，组成三元组，利用CRT求出要改变的下表的值
+ 求反规则，得出字符串s

## 代码

### 3位26进制表示

```cpp
const int maxn = 1e5 + 5;
const int maxm = 2e7 + 5;
const int mod = 1e9 + 7;

char s[maxn], tmp[maxn];
int t[maxn], rev[maxn];     //t[i] 表示s->t的变化规则，rev[i]表表示t->s的变化规则
int main()
{
    // freopen("233.in" , "r" , stdin);
    // freopen("233.out" , "w" , stdout);
    // ios_base::sync_with_stdio(0);
    // cin.tie(0);cout.tie(0);
    scanf("%s", s + 1);
    int n = strlen(s + 1);
    tmp[n + 1] = '\0';
    for(int i = 1; i <= 26 * 26; i *= 26)
    {
        for(int j = 1; j <= n; ++j)tmp[j] = j / i % 26 + 'a';
        printf("? %s\n", tmp + 1);
        fflush(stdout);
        scanf("%s", tmp + 1);
        for(int j = 1; j <= n; ++j)t[j] += (tmp[j] - 'a') * i;
    }
    for(int i = 1; i <= n; ++i)rev[t[i]] = i; //求出t->s的变化规则
    for(int i = 1; i <= n; ++i)tmp[i] = s[rev[i]];
    printf("! ");
    puts(tmp + 1);
    return 0;       
}
```

### 中国剩余定理表示

```cpp
const int maxn = 1e5 + 5;
const int maxm = 2e7 + 5;
const int mod = 1e9 + 7;

int n, rev[maxn], t[maxn];
char s[maxn], tmp[4][maxn];
int mul_inv(int a, int b)
{
    int b0 = b, t, q;
    int x0 = 0, x1 = 1;
    if(b == 1)return 1;
    while(a > 1)
    {
        q = a / b;
        t = b; b = a % b; a = t;
        t = x0; x0 = x1 - q * x0; x1 = t;
    }
    if(x1 < 0) x1 += b0;
    return x1;
}
int chinese_remainder(vector<int> a, vector<int> b, int n)
{
    int p, prod = 1, sum = 0;
    for(int i = 0; i < n; ++i)prod *= b[i];
    for(int i = 0; i < n; ++i)
    {
        p = prod / b[i];
        sum += a[i] * mul_inv(p, b[i]) * p;
    }
    return sum % prod;
}
int main()
{
    // freopen("233.in" , "r" , stdin);
    // freopen("233.out" , "w" , stdout);
    // ios_base::sync_with_stdio(0);?
    // cin.tie(0);cout.tie(0);
    scanf("%s", s);
    int n = strlen(s);
    for(int m = 26, j = 0; m >= 23; --m, j = 0)
    {
        if(m == 24)continue; //24 is not coprime with others (26, 25)
        for(int i = 0; i < n; ++i)
        {
            //abcd....xyzab
            //abcd....xyabc
            //abcd....wabcd
            tmp[26 - m][i] = (char)('a' + j);
            ++j;
            j %= m;
        }
    }
    for(int i = 0; i <= 3; ++i)
    {
        if(i == 2)continue;
        printf("? %s\n", tmp[i]);
        fflush(stdout);
        scanf("%s", tmp[i]);
    }
    for(int i = 0; i < n; ++i)
        t[i] = chinese_remainder(vector<int>{tmp[0][i] - 'a', tmp[1][i] - 'a', tmp[3][i] - 'a'}, vector<int>{26, 25, 23}, 3);
    for(int i = 0; i < n; ++i)rev[t[i]] = i;
    printf("! ");
    for(int i = 0; i < n; ++i)printf("%c", s[rev[i]]);
    return 0;       
}
```

