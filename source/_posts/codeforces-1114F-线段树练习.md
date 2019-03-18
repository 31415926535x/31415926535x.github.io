---
title: codeforces-1114F-线段树练习
date: 2019-02-17 15:09:51
tags:
- acm
- 刷题
categories:
- ACM-线段树
---

# 概述

[这是一道用线段树维区间值的一道题](https://codeforces.com/problemset/problem/1114/F)，，题意很简单，，就是对于给定的一个序列，，初始时每个数的值不大于300，，，然后有两中操作，，一个是对区间[l, r]的每个数乘上以个数x，，一个是询问区间的乘积的欧拉函数值，，，

<!-- more -->

# 分析

首先对于第一个操作显然可以用线段树的延迟更新来完成，，

对于第二个操作，，我最先没考虑数据，，就想着直接维护区间的乘积，，对最后的区间乘积求欧拉函数值，，，但是，，，即使数据初始值很小，，但是多次累乘x后会爆ll，甚至是ull，，，

正解是这样的：

对于第一个操作，，每次都保存区间模mod的乘积，，，

对于第二个操作，，因为我们是求的区间积的欧拉函数值，也就是

$MUL_{l,r} \times phi(Mul_{l, r}) = Mul_{l, r} \times \prod_{i=l}^j {prime[i]-1 \over prime[i]}$ 

$prime[i] 是指 Mul_{l, r} 的质因数$

因为直接存 $Mul_{l, r}$ 会爆掉，，而最后的结果实在mod下的数，，300以里的质数也只有62个，，所以可以标记出乘积的所有质因数，，用一个ll的数就行了（状压的思想），，对于任意一个区间的乘积的标记都可以用两个子节点的标记值的或运算得到，，同时标记值也只会因为乘上的那个数x而增加，，，公式里的除 $prime[i]$ 也可以用逆元搞定，，这样这个操作就弄出来了，，

一开始我自己写爆了之后，就照着别人的思路一点一点的改，，莫名其妙的t，，一直以为是线段树写丑了，，，，后来看到一个人写的很简单但也过了，，，自己就重写了一遍过了，，数论+线段树的题第一次写，，学到很多，，尤其是状压的思想，，逆元，还有线段树作为一个维护的工具的使用，，，两个参数的返回可以使用 ``pair<int, ll> pii`` 型来返回，，

# 代码

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
const int maxn = 4e5 + 5;   //注意数据范围，，，因为这个wa了一发，，，，（为啥不是re233）
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
//find all prime from 1 to 300
bool isprime[305];
int prime[70], tot = -1;
int inv_prime[70];
void init()     //寻找300以内的质数及其质数的逆元
{
    for(int i = 2; i <= 300; ++i)isprime[i] = false;
    for(int i = 2; i <= 300; ++i)
    {
        if(!isprime[i])prime[++tot] = i, inv_prime[tot] = pow_(i, mod - 2, mod);
        for(int j = 0; j <= tot && i * prime[j] <= 300; ++j)
        {
            isprime[i * prime[j]] = true;
            if(i % prime[j] == 0)break;
        }
    }
}
ll find_prime(ll x) //寻找数x的质因数，存在则对应质数数组的index位位1，这样最后返回的值的二进制表示即为状压标记的结果
{
    ull ret = 0;
    for(int i = 0; i <= tot; ++i)if(x == x / prime[i] * prime[i])ret |= ((ll)1 << i);
    return ret;
}
ll mull(ll a, ll b) //带模的乘法
{
    return a * b % mod;
}
ll mul[maxn << 2], vis[maxn << 2], laz1[maxn << 2], laz2[maxn << 2];
int a[maxn];
#define mid ((l+r)>>1)
#define lc (rt<<1)
#define rc (rt<<1|1)
void pushup(int rt)
{
    mul[rt] = mull(mul[lc], mul[rc]);
    vis[rt] = vis[lc] | vis[rc];
    return;
}
void pushdown(int rt, int llen, int rlen)
{
    mul[lc] = mull(mul[lc], pow_(laz1[rt], llen, mod)); //更新乘积
    mul[rc] = mull(mul[rc], pow_(laz1[rt], rlen, mod));
    laz1[lc] = mull(laz1[lc], laz1[rt]);                //更新子区间乘积的懒惰标记值
    laz1[rc] = mull(laz1[rc], laz1[rt]);
    laz1[rt] = 1;                                       //恢复根区间乘积的懒惰标记值
    vis[lc] |= laz2[rt];                                //更新标记
    vis[rc] |= laz2[rt];
    laz2[lc] |= laz2[rt];                               //更新子区间标记的懒惰标记值
    laz2[rc] |= laz2[rt];
    laz2[rt] = 0;                                       //恢复根区间标记的懒惰标记值

    return;
}
inline void build(int rt, int l, int r)
{
    mul[rt] = vis[rt] = laz2[rt] = 0;
    laz1[rt] = 1;                       //无标记时，乘积的标记的懒惰值为1，，，，，标记的为0，，
    if(l == r)
    {
        mul[rt] = a[l];
        vis[rt] = find_prime(mul[rt]);  //叶子节点的标记值为其质因数出现的状压后的值
        return;
    }
    build(lc, l, mid);
    build(rc, mid + 1, r);
    pushup(rt);
    return;
}
inline void update(int rt, int l, int r, int L, int R, int x, ll vx)
{
    if(L <= l && r <= R)
    {
        mul[rt] = mull(mul[rt], pow_(x, r - l + 1, mod));
        vis[rt] |= vx;                      //标记更新
        laz1[rt] = mull(laz1[rt], x);       //乘积的懒惰标记的更新
        laz2[rt] |= vx;                     //标记的懒惰标记的更新
        return;
    }
    if(laz1[rt] > 1)pushdown(rt, mid - l + 1, r - mid);
    if(laz2[rt])pushdown(rt, mid - l + 1, r - mid);
    if(R <= mid)update(lc, l, mid, L, R, x, vx);
    else if(L > mid)update(rc, mid+1, r, L, R, x, vx);
    else update(lc, l, mid, L, R, x, vx), update(rc, mid+1, r, L, R, x, vx);
//    if(L <= mid)update(lc, l, mid, L, R, x, vx);
//    if(R > mid)update(rc, mid + 1, r, L, R, x, vx);
    pushup(rt);
    return;
}
inline pii query(int rt, int l, int r, int L, int R)//询问区间的乘积值和标记值
{
    if(L <= l && r <= R)
    {
        return pii(mul[rt], vis[rt]);
    }
    if(laz1[rt] > 1)pushdown(rt, mid - l + 1, r - mid);//乘积的懒惰标记大于一说明待更新区间
    if(laz2[rt])pushdown(rt, mid - l + 1, r - mid); //标记的懒惰值非零说明待更新
    if(R <= mid)return query(lc, l, mid, L, R);     //询问区间再左子区间时，，递归询问左子区间
    if(L >  mid)return query(rc, mid + 1, r, L, R);
    pii a = query(lc, l, mid, L, R);                //a为佐子区间的值
    pii b = query(rc, mid + 1, r, L, R);            //b为侑子区间的值
    return pii(mull(a.first, b.first), (a.second | b.second));//总区间的值为左右子区间的乘积的积和标记的或
}
ll phi(ll mul, ull vis) //利用标记指求其欧拉函数值
{
    for(int i = 0; i <= tot; ++i)
        if((vis >> i) & 1)
            mul = mull(mul, mull(prime[i] - 1, inv_prime[i]));
    return mul;
}
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    int n, q;
    //n = read(); q = read();
    scanf("%d%d", &n, &q);
    for(int i = 1; i <= n; ++i)a[i] = read();
    init();     //初始化找出300以内的所有素数，和对应的逆元
    build(1, 1, n); //建树
    char s[20];
    int l, r, x;

    while(q--)
    {
        scanf("%s", s);
        l = read();r = read();
        if(s[0] == 'M')
        {
            //l = read(); r = read(); x = read();
            //scanf("%d", &x);
            x = read();
            update(1, 1, n, l, r, x, find_prime(x));//更新操作，最后一个参数是x的质因数的标记值
        }
        else
        {
            //l = read(); r = read();
            pii tmp = query(1, 1, n, l, r); //返回区间值的乘积和他的标记
//            cout << tmp.first << "---" << tmp.second << endl;
//            ll ans = 1;
//            for(int i = l; i <= r; ++i)ans = mull(ans, query(1, i, i).first);
//            cout << ans << endl;
            printf("%lld\n", phi(tmp.first, tmp.second));
        }
    }

    return 0;
}
```

# 感想

看来只做简单题是学不到新东西的，，，难题虽然难，，熬夜弄了两天wa了好几发但最后弄出来还是很有意义的，，，

同时多看看[别人的代码也很有感触](https://blog.csdn.net/dreaming__ldx/article/details/86981461)，，学到很多好东西，，

(end)