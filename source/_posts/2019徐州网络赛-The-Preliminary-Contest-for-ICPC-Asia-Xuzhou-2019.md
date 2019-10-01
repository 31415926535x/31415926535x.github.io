---
title: "2019徐州网络赛-The Preliminary Contest for ICPC Asia Xuzhou 2019"
date: 2019-09-07 21:32:27
tags:
- ACM
- 刷题
- 网络赛
categories:
- ACM-比赛补题
- ACM-题解
---


徐州网络赛，，，全程口胡+划水，，，emmmmm

题目感觉都不难，，看见很多人都是8题，，，

我们最后出了5题，，，A题我比赛临结束时写的，，然后写炸了，，

两道字符串的题因为没有学过字符串专题的内容，，最后放弃了，，，

<!-- more -->

# A. Who is better?

简单的 斐波那契博弈+中国剩余定理，，

中国剩余定理用来求n，，判断一下n是不是斐波那契数列的值即可，，，n无解的时候就是题目的无解，，

一开始别的队的提这是斐波那契博弈，，，但是好长时间每看博弈，，没看出来是斐波那契博弈，，然后因为模数不互质，，，所以要判断是否有解，，，因为斐波那契数列求少了，，然后以为是CRT板子错了，，，然后就一直哇，，，

```cpp
#include <bits/stdc++.h>
#define aaa cout<<233<<endl;
#define endl '\n'
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef long double ld;
mt19937 rnd(time(0));
const int inf = 0x3f3f3f3f;//1061109567 > 1e9
const ll linf = 0x3f3f3f3f3f3f3f3f;
const double eps = 1e-6;
// const double pi = 3.14159265358979;
double pi = acos(-1.0);
const int maxn = 5e5 + 5;
const int maxm = 1e3 + 5;
const int mod = 1e9 + 7;

ll f[maxn];
ll gcd(ll a, ll b){
    return b ? gcd(b, a%b) : a;
}
void ex_gcd(ll a, ll b, ll &x, ll &y, ll &d){
    if (!b) {d = a, x = 1, y = 0;}
    else{
        ex_gcd(b, a % b, y, x, d);
        y -= x * (a / b);
    }
}
ll inv(ll t, ll p){//如果不存在，返回-1 
    ll d, x, y;
    ex_gcd(t, p, x, y, d);
    return d == 1 ? (x % p + p) % p : -1;
}
pair<ll, ll> chinese_remainder(ll A[], ll B[], ll M[], int n) {//求解A[i]x = B[i] (mod M[i]),总共n个线性方程组 
    ll x = 0, m = 1;
    for(int i = 0; i < n; i ++) {
        ll a = A[i] * m, b = B[i] - A[i]*x, d = gcd(M[i], a);
        if(b % d != 0)  return pair<ll, ll> (0, -1);//答案，不存在，返回-1 
        ll t = b/d * inv(a/d, M[i]/d)%(M[i]/d);
        x = x + m*t;
        m *= M[i]/d;
    }
    x = (x % m + m ) % m;
    return pair<ll, ll>(x, m);//返回的x就是答案，m是最后的lcm值 
}

ll a[maxn], b[maxn], c[maxn];
// vector<ll> a, b;
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    // ios_base::sync_with_stdio(0);
    // cin.tie(0);cout.tie(0);

    f[0] = f[1] = 1;
    for(int i = 2; i <= 70; ++i)f[i] = f[i - 1] + f[i - 2];
    int k; cin >> k;
    int x, y;
    for(int i = 0; i <= k - 1; ++i)
    {
        cin >> a[i] >> b[i];
        // cin >> x >> y;
        // a.push_back(x);
        // b.push_back(y);
    }
    for(int i = 0; i <= 10; ++i)c[i] = 1;
    
    pair<ll, ll> n = chinese_remainder(c, b, a, k);
    // cout << n << endl;
    // cout << n.first << endl;
    if(n.first == 0)
    {
        cout << "Tankernb!" << endl;
        return 0;
    }
    bool flag = false;
    for(int i = 1; i <= 70; ++i)
        if(f[i] == n.first)
        {
            flag = true;
            break;
        }
    if(flag)cout << "Lbnb!" << endl;
    else cout << "Zgxnb!" << endl;

    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

# B. so easy

一开始我开的题，，读完题之后想着这部直接暴力就行了，，，然后用map存每一修改的数，，然后询问就一直往下跑不就行了，，第一个没标记的就是答案啊，，，然后被卡map了，，，队友一看说是肯定T，，然后就想别的思路了，，，最后他们就用并查集+unordered_map来合并集合过的，，，

刚刚我又试了一下unoredred_map暴力，，发现直接过了，，，emmmmmm

## 并查集区间和并

```cpp
//#include <bits/stdc++.h>
#include <cstdio>
#include <cmath>
#include <cstdlib>
#include <cstring>
#include <iostream>
#include <algorithm>
#include <vector>
#include <stack>
#include <queue>
#include <map>
#include <set>
#include <string>
#include <unordered_map>
#include <utility>
#include <assert.h>
#define endl '\n'
#define p_b push_back
#define e_b emplace_back
#define debug cout<<"!!!"<<endl;
//#define LOCAL
using namespace std;
typedef long long ll;
typedef long double ld;
typedef pair<int, int> pii;
const static int inf = 0x3f3f3f3f;
const static ll inf64 = 0x3f3f3f3f3f3f3f3f;
const static int maxn = 1e5+10;

unordered_map <ll, ll> fa;

int findfather(int x)
{
    return fa[x] == x ? x : fa[x] = findfather(fa[x]);
}

int n, q;
int main()
{
    #ifdef Local
    freopen("1.in", "r", stdin);
    freopen("1.out", "w", stdout);
    #endif
    scanf("%d %d", &n, &q);
    while(q--)
    {
        int cmd;
        scanf("%d", &cmd);
        if(cmd == 1)
        {
            int pos;
            scanf("%d", &pos);
            if(fa.count(pos+1) == 0)
            {
                fa[pos] = pos;
                if(fa.count(pos-1) != 0)
                    fa[pos-1] = findfather(pos);
            }
            else
            {
                fa[pos] = findfather(pos+1);
                if(fa.count(pos-1) != 0)
                    fa[pos-1] = findfather(pos);
            }
        }
        else
        {
            int pos;
            scanf("%d", &pos);
            if(fa.count(pos) == 0)
                printf("%d\n", pos);
            else
                printf("%d\n", findfather(pos)+1);
        }
    }
    return 0;
}
/*
10 11
1 2
1 3
1 4
1 6
1 7
1 9
2 2
2 8
1 5
1 8
2 1
*/
```

## 我的暴力

```cpp
#include <bits/stdc++.h>
#define aaa cout<<233<<endl;
#define endl '\n'
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef long double ld;
mt19937 rnd(time(0));
const int inf = 0x3f3f3f3f;//1061109567 > 1e9
const ll linf = 0x3f3f3f3f3f3f3f3f;
const double eps = 1e-6;
// const double pi = 3.14159265358979;
double pi = acos(-1.0);
const int maxn = 1e5 + 5;
const int maxm = 1e3 + 5;
const int mod = 1e9 + 7;

unordered_map<int, bool> mp;
int n, q;
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);

    cin >> n >> q;
    int o, x;
    while(q--)
    {
        cin >> o >> x;
        if(o == 1)
        {
            mp[x] = true;
        }
        else
        {
            int ans = -1;
            for(int i = x; i <= n; ++i)
            {
                // cout << mp[i] << endl;
                if(mp[i] == true)continue;
                else
                {
                    ans = i;
                    break;
                }
            }
            cout << ans << endl;
        }
        
    }

    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

# D. Carneginon

kmp板子题，，队友过的，，

```cpp

#include<bits/stdc++.h>
using namespace std;
bool kmp(string a,string b)
{
    int next[b.size()];
    for(int i=1;i<b.size();i++) next[i]=0;
    next[0]=-1;
    next[1]=0;
    for(int i=2;i<b.size();i++)
    {
        int k=next[i-1];
        if(b[k]==b[i-1]) next[i]=k+1;
        else
        {
            while(k!=-1)
            {
                k=next[k];
                if(b[k]==b[i-1]) break;
            }
            next[i]=k+1;
        }
    }
    for(int i=0,j=0;i<a.size();)
    {
        if(a[i]==b[j])
        {
            i++;
            j++;
        }
        else
        {
            if(j==-1)
            {
                i++;
                j++;
            }
            else j=next[j];
        }
        if(j==b.size()) return true;
    }
    return false;
}
int main()
{
    int t;
    string a,b;
    cin>>a;
    cin>>t;
    while(t--)
    {
        cin>>b;
        if(a.size()>b.size())
        {
            if(kmp(a,b))cout<<"my child!"<<endl;
            else cout<<"oh, child!"<<endl;
        }
        else if(a.size()==b.size())
        {
            if(a==b)cout<<"jntm!"<<endl;
            else cout<<"friend!"<<endl;
        }
        else
        {
            if(kmp(b,a)) cout<<"my teacher!"<<endl;
            else cout<<"senior!"<<endl;
        }
    }
}
```

# E. XKC's basketball team

这题我一开始的想法是倒着想，，并且在每求出第i个位置的值后，，维护的一个东西进行更新，，这一趟下来就可以找到所有的解，，，但是就是想不到怎么处理，，但感觉直觉是对的，，，

后来队友想着类似线段树维护一个区间最大值，，并且尽可能的寻找i的右边的点，，，

官方的题解就是倒着求，，用一个单调递增的队列维护最大值，，队列中靠近队首的一定是数组中靠右的一个较大值，，

如果当前这点的值大于队尾，，入队，，并且说明这个点是这个点向右的最大值，，所以它的答案就是-1

如果小于队尾的值，，说明右边有一个位置的值可能大于它的值+m，，，直接线性找肯定会T，，，但是因为队列中是单调递增的，，，所以可以二分找到这个值，，，记录一个下标就可以了，，，

## 队友赛场上的解法

```cpp
//#include <bits/stdc++.h>
#include <cstdio>
#include <cmath>
#include <cstdlib>
#include <cstring>
#include <iostream>
#include <algorithm>
#include <vector>
#include <stack>
#include <queue>
#include <map>
#include <set>
#include <string>
#include <utility>
#include <assert.h>
#define endl '\n'
#define p_b push_back
#define e_b emplace_back
#define debug cout<<"!!!"<<endl;
//#define LOCAL
using namespace std;
typedef long long ll;
typedef long double ld;
typedef pair<int, int> pii;
const static int inf = 0x3f3f3f3f;
const static ll inf64 = 0x3f3f3f3f3f3f3f3f;
const static int maxn = 5e5+10;
int n, m;
ll st[maxn<<2];
ll a[maxn];

void pushup(int rt)
{
    st[rt] = max(st[rt<<1], st[rt<<1|1]);
}

void buildtree(int l, int r, int rt)
{
    if(l == r)
    {
        st[rt] = a[l];
        return;
    }
    int mid = (l + r) >> 1;
    buildtree(l, mid, rt<<1);
    buildtree(mid+1, r, rt<<1|1);
    pushup(rt);
}

ll query(int _l, int _r, int val, int l, int r, int rt)
{
    //cout<<l<<"---"<<r<<" "<<val<<endl;
    if(l == r)
        return l;
    int ret = -1;
    int mid = (l + r) >> 1;
    if(mid < _r && st[rt<<1|1] >= val)
        ret = query(_l, _r, val, mid+1, r, rt<<1|1);
    if(ret != -1)
        return ret;
    if(mid >= _l && st[rt<<1] >= val)
        ret = query(_l, _r, val, l, mid, rt<<1);
    return ret;
}

int main()
{
    #ifdef Local
    freopen("1.in", "r", stdin);
    freopen("1.out", "w", stdout);
    #endif
    scanf("%d%d", &n, &m);
    for(int i=1; i<=n; i++)
        scanf("%d", &a[i]);
    buildtree(1, n, 1);
    for(int i=1; i<=n-1; i++)
    {
        ll q = a[i] + m;
        ll ans = query(i, n, q, 1, n, 1);
        //cout<<ans<<endl;
        if(ans == -1)
            printf("-1 ");
        else
            printf("%d ", ans-i-1);
    }
    printf("-1");
    return 0;
}
```

## 赛后的官方解法

```cpp
#include <bits/stdc++.h>
#define aaa cout<<233<<endl;
#define endl '\n'
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef long double ld;
mt19937 rnd(time(0));
const int inf = 0x3f3f3f3f;//1061109567 > 1e9
const ll linf = 0x3f3f3f3f3f3f3f3f;
const double eps = 1e-6;
// const double pi = 3.14159265358979;
double pi = acos(-1.0);
const int maxn = 5e5 + 5;
const int maxm = 1e3 + 5;
const int mod = 1e9 + 7;

ll n, m;
ll w[maxn], ans[maxn];
pair<ll, int> que[maxn];
int front, tail;
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);

    front = tail = 1;
    cin >> n >> m;
    for(int i = 1; i <= n; ++i)cin >> w[i];
    que[tail].first = w[n];que[tail].second = n;ans[n] = -1;
    for(int i = n - 1; i >= 1; --i)
    {
        if(w[i] > que[tail].first)
        {
            ans[i] = -1;
            // que[++tail] = make_pair(w[i], i);
            que[++tail].first = w[i];
            que[tail].second = i;
        }
        else
        {
            int l = front, r = tail;
            int anss = i;
            while(l <= r)
            {
                int mid = l + r >> 1;
                if(que[mid].first >= w[i] + m)
                {
                    r = mid - 1;
                    anss = que[mid].second;
                }
                else
                {
                    l = mid + 1;
                }
            }
            ans[i] = anss - i - 1;
        }
    }
    // for(int i = 1; i <= tail; ++i)cout << que[i].second << " ";cout << endl;
    for(int i = 1; i <= n - 1; ++i)cout << ans[i] << " ";cout << ans[n];

    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```

# K. Center

简单计算几何题，，队友搞得，，，

```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long
int n;

const int maxn=1e3+5;

struct point
{
    int x,y,hash_;
    point(int x=0,int y=0):x(x),y(y){hash_=x*1000000+y;}
} po[maxn];//,mid[1000005];

bool com(point p1,point p2)
{
    if(p1.x>p2.x) return true;
    if(p1.x==p2.x&&p1.y>p2.y) return true;
    return false;
}
//int nmid=0;
/*
5
1 1
2 2
2 3
2 1
2 2
*/

map <ll,int> mid;
set <ll> p;

int main()
{
    ll n0=0,temx,temy;
    cin>>n;
    for(int i=0;i<n;i++)
    {
        cin>>temx>>temy;
        if(p.count(temx*1000000+temy)) continue;
        else
        {
            po[n0].x = temx;
            po[n0++].y = temy;
            p.insert(temx*1000000+temy);
        }
    }
    for(int i=0;i<n0;i++)
        for(int j=0;j<n0;j++)
        {
            if(i==j) continue;
            point tem(po[i].x+po[j].x,po[i].y+po[j].y);

            mid[tem.hash_]++;
        }
    for(int i=0;i<n0;i++)
    {
        ll tem=po[i].x*1000000*2+po[i].y*2;
        ++mid[tem];
    }
    int ma=0;
    for(map<ll, int>:: iterator i=mid.begin();i!=mid.end();i++)
    {
        int tem=i->second;
        ma= ma>tem?ma:tem;
    }
    cout<<n0-ma<<endl;
}
```

字符串啊，，，，