---
title: "2019 Multi-University Training Contest 1"
date: 2019-07-24 21:47:37
tags:
---


补题ing

<!-- more -->

# [Operation](http://acm.hdu.edu.cn/showproblem.php?pid=6579)

这题的大意是对于给定的数组，有两个操作，一个是询问一个区间的异或和的最大值，，另一个是在这个数组后面增加一个值，，，

这题也是诱使我学线性基的原因，，

题解说直接数据结构维护会T，，我也没试，，正解是贪心的维护一个 **前缀线性基** ，在每插入一个数时，，如果能插入，，尽可能的插到高位，，（这样可以保证靠近r的可以插入的数尽可能的在高位，，

也就是说，，对于任意的任意的一个区间，，不管它的长度多大，，，他的线性基最多是30个（针对这题），，，所以我们只需要维护r前面出现的较晚的新基，，这样每次询问，，都看得在r处的线性基中出现比l晚的基即可，，为了实现这个过程，，，给每一个线性基中的每一位都加一个标志位 $p_i$ ，， 在插入一个新的数时，，，尽可能的把他放在高位，，，（碰到一个可以插入的位置时，把他插在这里，，然后下推其它的基，，，

这题不能莽，直接开ll，，，会mle，，，

```cpp
#include <bits/stdc++.h>
// #include <iostream>
// #include <cstdio>
// #include <cstdlib>
// #include <string.h>
// #include <vector>
// #include <algorithm>
// #include <set>
// #include <vector>
// #include <cmath>
// #include <queue>
// #include <stack>
// #include <ctime>
// #include <random>
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
const double eps = 1e-5;
const double pi = 3.14159265358979;
const int maxn = 5e5 + 5;
const int maxm = 1e4 + 5;
const int mod = 1e9 + 7;
  
  
struct LinearBasis
{
    typedef int type;
    static const int maxbase = 30;
    bool flag = false;
    type a[maxbase + 1];
    type p[maxbase + 1];
    LinearBasis()
    {
        memset(a, 0, sizeof a);
        memset(p, 0, sizeof p);
    }
    LinearBasis(type *x, int n)
    {
        LinearBasis();
        build(x, n); 
    }
    void build(type *x, int n)
    {
        for(int i = 1; i <= n; ++i)
            insert(x[i]);
    }
    void clear()
    {
        memset(a, 0, sizeof a);
        memset(p, 0, sizeof p);
    }
    bool insert(type t)
    {
        //暴力插入一个数，维护的是一个上三角型的线性基矩阵，时间复杂度低，当待插入元素能插入时，返回true
        for(int i = maxbase; i >= 0; --i)
        {
            if(t & (1ll << i))
            {
                if(!a[i])
                {
                    a[i] = t;
                    break;
                }
                t ^= a[i];
            }
        }
        if(t == 0)flag = true;
        return t;
    }
    bool insert2(type t, type pos)
    {
        for(int i = maxbase; i >= 0; --i)
        {
            if(t & (1ll << i))
            {
                if(!a[i])
                {
                    a[i] = t;
                    p[i] = pos;
                    break;
                }
                else if(pos > p[i])
                {
                    swap(pos, p[i]);
                    swap(t, a[i]);
                }
                t ^= a[i];
            }
        }
        if(t == 0)flag = true;
        return t;
    }
    bool query(type t)
    {
        // 询问t是否可以被当前线性基表示，不插入
        if(t > queryMax())return false;
        if(t == 0)return true;
        for(int i = maxbase; i >= 0; --i)
        {
            if(t & (1ll << i))
            {
                if(!a[i])
                {
                    return false;
                }
                t ^= a[i];
            }
        }
        return true;
    }
    void Insert(type t)
    {
        //插入一个线性基，利用高斯消元法维护一个对角矩阵
        for(int i = maxbase; i >= 0; --i)
        {
            if(t >> i & 1)
            {
                if(a[i])t ^= a[i];
                else
                {
                    a[i] = t;
                    for(int j = i - 1; j >= 0; --j)if(a[j] && (a[i] >> j & 1))a[i] ^= a[j];
                    for(int j = i + 1; j <= maxbase; ++j)if(a[j] >> j & 1)a[j] ^= a[i];
                    break;
                }
            }
        }
    }
    LinearBasis merge(const LinearBasis &l1, const LinearBasis &l2)
    {
        // 得到两个线性基的并
        LinearBasis ret = l1;
        for(int i = maxbase; i >= 0; --i)
            if(l2.a[i])
                ret.insert(l2.a[i]);
        return ret;
    }
    LinearBasis intersection(const LinearBasis &l1, const LinearBasis &l2)
    {
        //得到两个线性基的交
        LinearBasis all, ret, full;
        ret.clear();
        for(int i = maxbase; i >= 0; --i)
        {
            all.a[i] = l1.a[i];
            full.a[i] = 1ll << i;
        }
        for(int i = maxbase; i >= 0; --i)
        {
            if(l2.a[i])
            {
                type v = l2.a[i], k = 0;
                bool flag = true;
                for(int j = maxbase; j >= 0; --j)
                {
                    if(v & (1ll << j))
                    {
                        if(all.a[j])
                        {
                            v ^= all.a[j];
                            k ^= full.a[j];
                        }
                        else
                        {
                            // l2's basis is not in l1's;
                            flag = false;
                            all.a[j] = v;
                            full.a[j] = k;
                            break;
                        }
                    }
                }
                if(flag)
                {
                    type v = 0; // get intersection by k;
                    for(int j = maxbase; j >= 0; --j)
                    {
                        if(k & (1ll << j))
                        {
                            v ^= l1.a[j];
                        }
                    }
                    ret.insert(v);  //save ans
                }
            }
        }
        return ret;
    }
    //询问最值
    type queryMax()
    {
        type ret = 0;
        for(int i = maxbase; i >= 0; --i)
            if((ret ^ a[i]) > ret)
                ret ^= a[i];
        return ret;
    }
    type queryMax(type l)
    {
        type ret = 0;
        for(int i = maxbase; i >= 0; --i)
            if((ret ^ a[i]) > ret && l <= p[i])
                ret ^= a[i];
        return ret;
    }
    type queryMin()
    {
        for(int i = 0; i <= maxbase; ++i)
            if(a[i])
                return a[i];
        return 0;
    }
}lb[maxn];
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
        int n, m;
        cin >> n >> m;
        ll x;
        for(int i = 1; i <= n; ++i)
        {
            cin >> x;
            lb[i] = lb[i - 1]; 
            lb[i].insert2(x, i);
        }
        int op;
        ll lstans = 0;
        while(m--)
        {
            cin >> op;
            if(!op)
            {
                ll l, r;cin >> l >> r;
                l = (l ^ lstans) % n + 1;
                r = (r ^ lstans) % n + 1;
                if(l > r)swap(l, r);
                lstans = lb[r].queryMax(l);
                cout << lstans << endl;
            }
            else
            {
                ll x;cin >> x;
                x ^= lstans;
                lb[++n] = lb[n - 1];
                lb[n].insert2(x, n);
            }
            
        }

    }
      
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```


# [Path](http://acm.hdu.edu.cn/showproblem.php?pid=6582)

给你张图，，然后找到所有的最短路，建一个新图，，，删去最少权值和的边使得新图不连通，，求这个权值，，

跑两边最短路，，删点建新图，，然后跑网络流，求最小割就行了，，，

不会删点自闭到结束，，，嫌两边dijkstra麻烦一直没写，，谁知道正解就是这个，，QAQ。。。

```cpp
// #include <bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string.h>
// #include <vector>
// #include <algorithm>
// #include <set>
// #include <vector>
// #include <cmath>
#include <queue>
// #include <stack>
#include <ctime>
#define aaa cout<<233<<endl;
#define endl '\n'
#define pb push_back
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
typedef long double ld;
const int inf = 0x3f3f3f3f;//1061109567 > 1e9
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-5;
const double pi = 3.14159265358979;
const int maxn = 1e4 + 5;
const int maxm = 1e4 + 5;
const int mod = 1e9 + 7;

struct edge1
{
    int to, nxt;
    ll w;
}edge1[2][maxn << 1];

bool vis1[2][maxn];
ll dis1[2][maxn];
int tot1, tot2, head1[2][maxn << 1];
void init1(int m)
{
    tot1 = tot2 = 0;
    m <<= 1;
    // for(int i = 0; i <= m; ++i)
        // head1[0][i] = head1[1][i] = -1;
    memset(head1, -1, sizeof head1);
}
void addedge1(int u, int v, ll w)
{
    edge1[0][tot1].to = v;
    edge1[0][tot1].w = w;
    edge1[0][tot1].nxt = head1[0][u];
    head1[0][u] = tot1++;
}
void addedge2(int u, int v, ll w)
{
    edge1[1][tot2].to = v;
    edge1[1][tot2].w = w;
    edge1[1][tot2].nxt = head1[1][u];
    head1[1][u] = tot2++;
}
struct node
{
    int v;
    ll w;
    node(){}
    node(int _v, ll _w){v = _v; w = _w;}
    const bool operator<(const node &r)const
    {
        return w > r.w;
    }
};
priority_queue<node> Q;
void dijktra(int n, int s, int now)
{
    // memset(vis1, false, sizeof vis1);
    for(int i = 1; i <= n; ++i)vis1[now][i] = false;
    for(int i = 1; i <= n; ++i)dis1[now][i] = linf;
    while(!Q.empty())Q.pop();
    dis1[now][s] = 0;
    Q.push(node(s, 0));
    node t;
    while(!Q.empty())
    {
        t = Q.top(); Q.pop();
        int u = t.v;
        if(vis1[now][u])continue;
        // if(visdfs[u])continue;
        vis1[now][u] = true;
        for(int i = head1[now][u]; ~i; i = edge1[now][i].nxt)
        {
            int v = edge1[now][i].to;
            ll w = edge1[now][i].w;
            if(!vis1[now][v] && dis1[now][v] > dis1[now][u] + w)
            {
                dis1[now][v] = dis1[now][u] + w;
                Q.push(node(v, dis1[now][v]));
            }
        }
    }
}
/**************isap ***************/
int n, m;
int u, v, z;
int gap[maxn << 1];          
int cur[maxn << 1];          
int q[maxn << 1];
ll dis[maxn];
bool vis[maxn];
struct edge
{
    int to;
    int next;
    ll cap;
    ll flow;
}edge[maxn << 1];
int tol, head[maxn << 1];
void init(int m)
{
    tol = 0;            //？？？
    memset(head, -1, sizeof head);
    // m <<= 1;
    // for(int i = 0; i <= m; ++i)head[i] = -1;
}
void addedge(int u , int v , ll w , ll rw = 0)
{
    edge[tol].to = v;edge[tol].cap = w;edge[tol].flow = 0;
    edge[tol].next = head[u];head[u] = tol++;
    edge[tol].to = u; edge[tol].cap = rw;edge[tol].flow = 0;
    edge[tol].next = head[v];head[v] = tol++;
}
void bfs(int s , int t, int n)
{
    //bfs一次得到从汇点开始的层次图
    memset(dis , -1 , sizeof dis);
    memset(gap , 0 , sizeof gap);
    // for(int i = 0; i <= n; ++i)dis[i] = -1;
    // for(int i = 0; i <= n; ++i)gap[i] = 0;
    gap[0] = 1;
    int front = 0;
    int rear = 0;
    dis[t] = 0;         //汇点的编号是0
    q[rear++] = t;
    while(front != rear)
    {
        //这里bfs应该用的逆图
        int u = q[front++];
        for(int i = head[u]; ~i; i = edge[i].next)
        {
            int v = edge[i].to;
            // cout << u << "-" << v << endl;
            if(~dis[v]) continue;
            q[rear++] = v;
            dis[v] = dis[u] + 1;    //相邻编号递增
            ++gap[dis[v]];          //对应编号的点的数量增一
        }
    }
}

int sta[maxn];
ll isap(int s , int t , int n)
{
    bfs(s , t, n);                     //建一次层次图
    memcpy(cur , head , sizeof head);
    int top = 0;
    int u = s;
    ll maxflow = 0;
    while(dis[s] < n)               //最大的编号只可能是n-1，大于说明出现断层
    {
        if(u == t)
        {
            //当找到一条增广路时，更新这条路上的流量
            ll min = inf;
            int inser;              //记录回退点
            for(int i = 0; i < top; ++i)
            {
                //找到增广路上的最小残余流量
                if(min > edge[sta[i]].cap - edge[sta[i]].flow)
                {
                    min = edge[sta[i]].cap - edge[sta[i]].flow;
                    inser = i;
                }
            }
            for(int i = 0; i < top; ++i)
            {
                edge[sta[i]].flow += min;
                edge[sta[i] ^ 1].flow -= min;
            }
            maxflow += min;
            //回退
            top = inser;
            u = edge[sta[top] ^ 1].to;
            continue;
        }

        bool flag = false;
        int v;
        for(int i = cur[u]; ~i; i = edge[i].next)
        {
            //找到一条从u出发的可行路径
            //满足残余流量大于零并且v是u的下一层
            v = edge[i].to;
            if(edge[i].cap - edge[i].flow && dis[v] + 1 == dis[u])
            {
                flag = true;
                cur[u] = i;
                break;
            }
        }
        if(flag)
        {
            //存在这样的可行路径时压栈保存
            //continue继续找
            sta[top++] = cur[u];
            u = v;
            continue;
        }
        ll min = n;
        for(int i = head[u]; ~i; i = edge[i].next)
        {
            if(edge[i].cap - edge[i].flow && dis[edge[i].to] < min)
            {
                min = dis[edge[i].to];
                cur[u] = i;
            }
        }
        --gap[dis[u]];                          //该编号的数量减一
        if(!gap[dis[u]])    return maxflow;     //出现断层时退出
        dis[u] = min + 1;
        ++gap[dis[u]];
        if(u != s)
            u = edge[sta[--top] ^ 1].to;
    }
    return maxflow;
}
int main()
{
    // double pp = clock();
    // freopen("233.in", "r", stdin);
    // freopen("233.out", "w", stdout);
    // ios_base::sync_with_stdio(0);
    // cin.tie(0);cout.tie(0);
 
    int t;scanf("%d", &t);
    while(t--)
    {
        scanf("%d%d", &n, &m);
        init1(m);
        int u, v;
        ll w;
        for(int i = 1; i <= m; ++i)
        {
            scanf("%d%d%lld", &u, &v, &w);
            addedge1(u, v, w);
            addedge2(v, u, w);
        }
        dijktra(n, 1, 0);
        dijktra(n, n, 1);
        ll min = dis1[0][n];
        // cout << min << endl;
        // for(int i = 1; i <= n; ++i)cout << dis1[0][i] << " ";cout << endl;
        // for(int i = 1; i <= n; ++i)cout << dis1[1][i] << " ";cout << endl;
        // for(int i = 1; i <= n; ++i)cout << visdfs[i] << " ";cout << endl;
        init(m);
        int cnt = 0;
        for(int u = 1; u <= n; ++u)
        {
            for(int i = head1[0][u]; ~i; i = edge1[0][i].nxt)
            {
                int v = edge1[0][i].to;
                ll w = edge1[0][i].w;
                // cout << u << "------" << v << visdfs[v] << endl;
                // cout << dis1[u] << "---" << w << "----" << dis1[v] << endl;
                // if(visdfs[v] && dis1[u] + w == dis1[v])
                // cout << dis1[0][u] << " " << w << " " << dis1[0][v] << " " << dis1[1][u] << " " << dis1[1][v] << endl;
                // if(dis1[0][u] + w == dis1[0][v] && dis1[1][u] + w == dis1[1][v])
                if(dis1[0][u] + w + dis1[1][v] == min)
                {
                    addedge(u, v, w);
                    // cout << u << "-" << v << "-" << w << endl;
                }
            }
        }
        // cout << cnt << endl;
        printf("%lld\n", isap(1, n, n));
        // cout << "----------------------------" << endl;
    }

    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;
}
```