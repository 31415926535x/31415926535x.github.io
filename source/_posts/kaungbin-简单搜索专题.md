---
title: kaungbin_简单搜索专题
date: 2019-03-14 08:25:13
tags:
- acm
- 刷题
categories:
- ACM-搜索
---

基本的搜索不怎么熟练，，有时做题的时候感觉很坑，，现在来练习一下，，

这个专题是[kuangbin简单搜索专题](https://vjudge.net/contest/287864)

<!-- more -->

# A - 棋盘问题 POJ - 1321 

我一开始的思路是记录下所有的可以放棋子的坐标，，然后搜索判断每一个棋子，判断是否有解，，但这样好像会算重复解，，

然后的解法就是搜索每一层中的可以放棋子的点，，然后判断是否合法，，找出可行解

```cpp
//#include <bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string.h>
#include <vector>
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
const int maxm = 2e5 + 5;
const int mod = 1e9 + 7;
inline ll read() {
    char c = getchar(); int x = 0, f = 1;
    while(c < '0' || c > '9') {if(c == '-') f = -1; c = getchar();}
    while(c >= '0' && c <= '9') x = x * 10 + c - '0', c = getchar();
    return x * f;
}
bool mp[10][10];
bool vis[10][10];
int n, k;
bool check(int x, int y)
{
    for(int i = 1; i <= n; ++i)
        if(i != y && vis[x][i])
            return false;
    for(int i = 1; i <= n; ++i)
        if(i != x && vis[i][y])
            return false;
    return true;
}
int ans;
bool dfs(int row, int num)
{
    if(num == k)
    {
        ++ans;
        return true;
    }
    if(row > n)return false;
    for(int i = 1; i <= n; ++i)
    {
        if(mp[row][i] && !vis[row][i] && check(row, i))
        {
            vis[row][i] = true;
            dfs(row + 1, num + 1);
            vis[row][i] = false;
        }
    }
    dfs(row + 1, num);
}
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    while(scanf("%d%d", &n, &k))
    {
        if(n == -1 && n == k)break;
        char s[10];
        for(int i = 1; i <= n; ++i)
        {
            scanf("%s", s + 1);
            for(int j = 1; j <= n; ++j)
            {
                if(s[j] == '#')
                    mp[i][j] = true;
                else
                    mp[i][j] = false;
            }
        }
        memset(vis, false, sizeof vis);
        ans = 0;
        dfs(1, 0);
        cout << ans << endl;
    }
    return 0;
}
```

# B - Dungeon Master POJ - 2251

题意很简单就是一个三维的迷宫问题，，，dfs会T，，，上bfs

```cpp
//#include <bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string.h>
#include <vector>
#include <queue>
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
const int maxm = 2e5 + 5;
const int mod = 1e9 + 7;
inline ll read() {
    char c = getchar(); int x = 0, f = 1;
    while(c < '0' || c > '9') {if(c == '-') f = -1; c = getchar();}
    while(c >= '0' && c <= '9') x = x * 10 + c - '0', c = getchar();
    return x * f;
}
bool mp[35][35][35];
bool vis[35][35][35];
int last_min[35][35][35];
struct node
{
    int x, y, z;
    void init(int i, int j, int k)
    {
        x = i;
        y = j;
        z = k;
    }
}s, t;
int l, c, r;
char str[35];
int ans;
bool check(node t)
{
    if(t.x >= 1 && t.y >= 1 && t.z >= 1 && t.x <= l && t.y <= r && t.z <= c && !vis[t.x][t.y][t.z] && mp[t.x][t.y][t.z])
        return true;
    return false;
}
int nxt[7][3] = {0, 0, 0,
                 1, 0, 0,
                -1, 0, 0,
                 0, 1, 0,
                 0,-1, 0,
                 0, 0, 1,
                 0, 0,-1};
void dfs(node tmp, int anst)
{
    if(tmp.x == t.x && tmp.y == t.y && tmp.z == t.z)
    {
        ans = min(ans, anst);
        //cout << tmp.x << tmp.y << tmp.z << endl;
        return;
    }
    if(anst >= ans)return;
    if(anst >= last_min[tmp.x][tmp.y][tmp.z])return;
    last_min[tmp.x][tmp.y][tmp.z] = anst;
    node tt;
    for(int i = 1; i <= 6; ++i)
    {
        tt.init(tmp.x + nxt[i][0], tmp.y + nxt[i][1], tmp.z + nxt[i][2]);
        if(check(tt))
        {
            //cout << tt.x << tt.y << tt.z << endl;
            vis[tt.x][tt.y][tt.z] = true;
            dfs(tt, anst + 1);
            vis[tt.x][tt.y][tt.z] = false;
        }
    }
    return;
}
void bfs()
{
    memset(vis, false, sizeof vis);
    memset(last_min, inf, sizeof last_min);
    ans = inf;
    node tt;
    queue<node> q;
    while(!q.empty())q.pop();
    q.push(s);
    vis[s.x][s.y][s.z] = true;
    last_min[s.x][s.y][s.z] = 0;
    while(!q.empty())
    {
        node tmp = q.front(); q.pop();
        for(int i = 1; i <= 6; ++i)
        {
            tt.init(tmp.x + nxt[i][0], tmp.y + nxt[i][1], tmp.z + nxt[i][2]);
            if(check(tt))
            {
                vis[tt.x][tt.y][tt.z] = true;
                q.push(tt);
                last_min[tt.x][tt.y][tt.z] = last_min[tmp.x][tmp.y][tmp.z] + 1;
            }
        }
    }
    ans = last_min[t.x][t.y][t.z];
}
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    while(scanf("%d%d%d", &l, &r, &c) && l + r + c)
    {
        memset(mp, false, sizeof mp);
        for(int i = 1; i <= l; ++i)
        {
            for(int j = 1; j <= r; ++j)
            {
                scanf("%s", str + 1);getchar();
                for(int k = 1; k <= c; ++k)
                    if(str[k] == '.')
                        mp[i][j][k] = true;
                    else if(str[k] == 'S')
                        s.init(i, j, k), mp[i][j][k] = true;
                    else if(str[k] == 'E')
                        t.init(i, j, k), mp[i][j][k] = true;
            }
        }
        
        //dfs(s, 0);
        bfs();
        if(ans != inf)printf("Escaped in %d minute(s).\n", ans);
        else          printf("Trapped!\n");
    }
    return 0;
}
```

# C - Catch That Cow POJ - 3278

题意很简单，，如果用dfs的话，，正的解决可能出现各种错误，，反着想就行了，，注意在0的情况

如果用bfs的话，，注意起点终点一样的情况，，，

```cpp
// #include <bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string.h>
//#include <vector>
#include <queue>
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
const int maxm = 2e5 + 5;
const int mod = 1e9 + 7;
inline ll read() {
    char c = getchar(); int x = 0, f = 1;
    while(c < '0' || c > '9') {if(c == '-') f = -1; c = getchar();}
    while(c >= '0' && c <= '9') x = x * 10 + c - '0', c = getchar();
    return x * f;
}
int ans;
int n, k;
int dfs(int n, int k)
{
    if(n >= k)return n - k;
    if(k & 1)
        return min(dfs(n, k + 1) + 1, dfs(n, k - 1) + 1);
    else
        return min(k - n, dfs(n, k / 2) + 1);
    
}
struct node
{
    int loc, num;
};
bool vis[maxn];
int bfs()
{
    memset(vis, false, sizeof vis);
    queue<node> q;
    while(!q.empty())q.pop();
    node s;
    s.loc = n;
    s.num = 0;
    q.push(s);
    while(!q.empty())
    {
        node now = q.front(); q.pop();
        for(int i = 1; i <= 3; ++i)
        {
            node nxt;
            if(i == 1)nxt.loc = now.loc + 1;
            if(i == 2)nxt.loc = now.loc - 1;
            if(i == 3)nxt.loc = now.loc << 1;
            if(nxt.loc >= 0 && nxt.loc <= maxn && !vis[nxt.loc])
            {
                vis[nxt.loc] = true;
                nxt.num = now.num + 1;
                q.push(nxt);
                if(nxt.loc == k)return nxt.num;
            }
        }
    }
    return inf;
}
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    scanf("%d%d", &n, &k);
    // if(n)
    //     printf("%d\n", dfs(n, k));
    // else
    //     printf("%d\n", dfs(1, k) + 1);
    if(n == k)printf("0\n");
    else
        printf("%d\n", bfs());
    return 0;
}
```

# D - Fliptile POJ - 3279

看起来从这题就开始难了，，

题意是一个01矩阵，，可以选择一些进行反转，，对mp[i][j]进行反转的同时，与它相邻的4个砖块也会反转，，输出使得全部为0的反转的操作矩阵，，不存在解的话就输出IMPOSSIBLE，，，

刚看完题的时候一脸懵逼，，完全不知道怎么下手，，知会纯暴力，枚举每一种情况，，

看到别人的思路之后尝试不看他们的代码自己写（其实是看不懂），，然后因为一些小细节被自己造的数据一次一次的卡掉，，重写了一次就好了，，

思路就是对于第一行，可能有的反转的情况一共只有 $2^m$ 中，，，而且反转1次和反转3次是一样的，，如果用1表示反转，0表示不反转，，第一行的情况就是： $000...000~111...111$，，，所以枚举这第一行的所有情况，，然后由第一行的反转情况来确定第2行，然后再确定第3行，，以此类推，，然后判断最后的那一行是不是全变成了0，，，取反转次数最少的那种情况，，那么怎么确定下一行的反转情况呢，，因为要保证全为零，，所以第x行的反转情况由x-1行确定，，如果上一行为1，，这一行为了保证上一行能为0，，就反转，，对于n==1的情况特判一下，，

用这个思路可以递归实现也可以递推实现：

```cpp
//递归
// #include <bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string.h>
//#include <vector>
#include <queue>
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
const int maxm = 2e5 + 5;
const int mod = 1e9 + 7;
bool mp[20][20], mpt[20][20];
bool ans[20][20], anst[20][20];
int mi;
int n, m;
bool cal(bool a)
{
    if(a)return false;
    return true;
}
void flip(int x, int y)
{
    if(x - 1 >= 1)mpt[x - 1][y] = cal(mpt[x - 1][y]);
    if(x + 1 <= n)mpt[x + 1][y] = cal(mpt[x + 1][y]);
    if(y - 1 >= 1)mpt[x][y - 1] = cal(mpt[x][y - 1]);
    if(y + 1 <= m)mpt[x][y + 1] = cal(mpt[x][y + 1]);
    mpt[x][y] = cal(mpt[x][y]);
}
bool dfs(int x)
{
    if(x >= n)
    {
        if(n == 1)
        {
            int tmp = 0;
            bool flag = true;
            for(int i = 1; i <= m; ++i)
                if(mpt[1][i])
                    flag = false;
            if(flag)
            {
                for(int i = 1; i <= m; ++i)
                    if(mpt[1][i])
                        ++tmp;
                if(tmp < mi)
                {
                    memcpy(ans, anst, sizeof anst);
                    mi = tmp;
                }
                return true;
            }
            else
                return false;
        }
        else
        {
            for(int i = 1; i <= m; ++i)
            {
                if(mpt[x - 1][i])
                {
                    flip(x, i);
                    anst[x][i] = cal(anst[x][i]);
                }
            }
            bool flag = true;
            for(int i = 1; i <= m; ++i)
                if(mpt[x][i])
                    flag = false;
            if(flag)
            {
                int tmp = 0;
                for(int i = 1; i <= n; ++i)
                    for(int j = 1; j <= m; ++j)
                        if(anst[i][j])
                            ++tmp;
                if(tmp < mi)
                {
                    memcpy(ans, anst, sizeof anst);
                    mi = tmp;
                }
                return true;
            }
            else
                return false;
        }
        
    }
    for(int i = 1; i <= m; ++i)
    {
        if(mpt[x - 1][i])
        {
            flip(x, i);
            anst[x][i] = cal(anst[x][i]);
        }
    }
    if(dfs(x + 1))return true;
    return false;
}
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
//    ios_base::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);
    scanf("%d%d", &n, &m);
    for(int i = 1; i <= n; ++i)
        for(int j = 1; j <= m; ++j)
            scanf("%d", &mp[i][j]);
    mi = inf;
    memset(ans, false, sizeof ans);
    for(int i = 0; i <= (1 << m) - 1; ++i)
    {
        memcpy(mpt, mp, sizeof mp);
        memset(anst, false, sizeof anst);
        for(int j = 1; j <= m; ++j)
        {
            if((i >> (j - 1)) & 1)
            {
                flip(1, m - j + 1);
                anst[1][m - j + 1] = true;
            }
        }
        dfs(2);
    }
    if(mi == inf)printf("IMPOSSIBLE\n");
    else
    {
        for(int i = 1; i <= n; ++i)
        {
            for(int j = 1; j <= m; ++j)
                printf("%d ", ans[i][j]);
            printf("\n");
        }
    }
    
    return 0;
}
```

# E - Find The Multiple POJ - 1426 

好坑(cai啊这题，，，

题意是让求一个仅有01组成的十进制的可以整除n的数，，，然后他给了几个很大很大的满足题意的样例，，，

然后我就天真的以为对于这些数的解都是巨大的数，，会爆ll，，，然后就想着用一个数组去存这一位是0还是1，，然后搜一下，，，写到一半之后发现，，如果这样想的话，，中间判断计算出来的的岂不是也巨大，，那怎么保证搜到的这个数是对的？？？ 然后我就蒙蔽了，，，看了别人的题解之后，，惊了，，，居然最大的数是不会爆ll的，，，那个大样例是吓唬人的，，，噗，，，，

```cpp
// #include <bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string.h>
// #include <vector>
// #include <queue>
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
const int maxn = 1e3 + 5;
const int maxm = 2e5 + 5;
const int mod = 1e9 + 7;


int n;
bool dfs(ll ans, int k)
{
    if(k == 20)
    {
        return false;
    }
    if(ans && ans / n * n == ans)
    {
        printf("%lld\n", ans);
        return true;
    }
    if(dfs(ans * 10, k + 1))return true;
    if(dfs(ans * 10 + 1, k + 1))return true;
    
    return false;
}
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
    // ios_base::sync_with_stdio(0);
    // cin.tie(0);cout.tie(0);
    while(scanf("%d", &n) && n)
    {
        dfs(0, 0);
    }
    return 0;
}
```

# F - Prime Path POJ - 3126 

这段时间(5月了)发现搜索还是不怎么会啊，，于是又捡起扔下的搜索专题，，，

我的思路是先预处理出所有的质数，以及经过一次变化可以得到的每一个质数的其他的质数，，，然后搜一下，，

先开始写的dfs，，然后自己造的样例发现时间爆炸，，发现别人都是用bfs，，

然后换bfs，，，因为一开始没有标记每一个数是否被用了，，所以队列中会出现一些一样的数，，于是又多余的操作，，，t了，，标记后就好了，，，

```cpp
// #include <bits/stdc++.h>
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <string.h>
#include <vector>
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
const int inf = 0x3f3f3f3f;//1061109567 > 1e10
const ll linf = 0x3f3f3f3f3f3f3f;
const double eps = 1e-6;
const double pi = 3.14159265358979;
const int maxn = 1e4 + 10;
const int maxm = 1e3 + 5;
const int mod = 1e9 + 7;

int t, s;
int ans;
int a[2000], tot;
vector<int> pp[maxn];
// bool vis[maxn];
bool prime[maxn];
int p[maxn], tol;
bool check(int a, int b)
{
    int flag = 0;
    for(int i = 1; i <= 4; ++i)
    {
        if(a % 10 != b % 10)++flag;
        a /= 10; b /= 10;
    }
    if(flag == 1 ||flag == 0)return true;
    return false;
}
void init()
{
    for(int i = 2; i < maxn; ++i)prime[i] = true;
    for(int i = 2; i < maxn; ++i)
    {
        if(prime[i])p[tol++] = i;
        for(int j = 0; j < tol && i * p[j] < maxn; ++j)
        {
            prime[i * p[j]] = false;
            if(i % p[j] == 0)break;
        }
    }
    for(int i = 1; i <= 2000; ++i)
    {
        if(p[i] >= 1000 && p[i] <= 9999)
        {
            a[++tot] = p[i];
        }
    }
    for(int i = 1; i <= tot; ++i)
    {
        for(int j = i + 1; j <= tot; ++j)
        {
            if(check(a[i], a[j]))
            {
                pp[a[i]].push_back(a[j]);
                pp[a[j]].push_back(a[i]);
            }
        }
    }
    
}

// void dfs(int x, int ret)
// {
//     if(x == t)
//     {
//         ans = min(ans, ret);
//         return;
//     }
//     if(ret >= ans)return;
//     for(auto i : pp[x])
//     {
//         if(!vis[i])
//         {
//             vis[i] = true;
//             dfs(i, ret + 1);
//             vis[i] = false;
//         }

//     }
// }
bool vis[maxn];
int bfs()
{
    if(s == t)return 0;
    queue<pair<int, int> > q;
    while(!q.empty())q.pop();
    // for(auto i : pp[s])q.push(make_pair(i, 1));
    for(int i = 0; i < pp[s].size(); ++i)q.push(make_pair(pp[s][i], 1));
    while(!q.empty())
    {
        pair<int, int> now = q.front(); q.pop();
        vis[now.first] = false;
        if(now.first == t)return now.second;
        // for(auto i : pp[now.first])q.push(make_pair(i, now.second + 1));
        for(int i = 0; i < pp[now.first].size(); ++i)
            if(!vis[pp[now.first][i]])
            {
                vis[pp[now.first][i]] = true;
                q.push(make_pair(pp[now.first][i], now.second + 1));
            }
        
    }
    return inf;
}
int main()
{
    // double pp = clock();
    // freopen("233.in" , "r" , stdin);
    // freopen("233.out" , "w" , stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    init();
    int tt; cin >> tt;
    while(tt--)
    {
        cin >> s >> t;
        memset(vis, false, sizeof vis);
        ans = bfs();
        if(ans == inf)cout << "Impossible" << endl;
        else cout << ans << endl;
        // ans = inf;
        // memset(vis, false, sizeof vis);
        // vis[s] = true;
        // dfs(s, 0);
        // cout << ans << endl;
    }
    
    
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;       
}
```

好菜啊，，，


# K - 迷宫问题 POJ - 3984

简单的迷宫问题，，深搜广搜都行，，

# L - Oil Deposits HDU - 1241 

求联通块的个数，，很简单，，但是在hdu不知道怎么回事，，蜜汁wa，，最后换了一种dfs的写法就可以了，，，poj上原来的写法就没事，，，emmmm

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
// #include <ctime>
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
const int maxn = 1e2 + 5;
const int maxm = 1e3 + 5;
const int mod = 1e9 + 7;

int n, m;
char mp[maxn][maxn];
bool vis[maxn][maxn];
int dx[] = {0, 1, 1, 1, 0, -1, -1, -1};
int dy[] = {1, 1, 0, -1, -1, -1, 0, 1};

void dfs(int x, int y)
{
    for(int i = 0; i < 8; ++i)
    {
        int tx = x + dx[i];
        int ty = y + dy[i];
        if(tx >= 1 && ty >= 1 && tx <= n && ty <= m && mp[tx][ty] == '@')
        {
            mp[tx][ty] = '*';
            dfs(tx, ty);
        }
    }

    // if(x >= 1 && y >= 1 && x <= n && y <= m && mp[x][y] == '@')
    // {
    //     mp[x][y] = '*';
    //     for(int i = 0; i < 8; ++i)
    //         dfs(x + dx[i], y + dy[i]);
    // }
}
void solve()
{
    memset(vis, false, sizeof vis);
    int ans = 0;
    for(int i = 1; i <= n; ++i)
        for(int j = 1; j <= m; ++j)
            if(mp[i][j] == '@')
            {
                mp[i][j] = '*';
                dfs(i, j);
                ++ans;
            }
    printf("%d\n", ans);
}

int main()
{
    // double pp = clock();
    // freopen("233.in" , "r" , stdin);
    // freopen("233.out" , "w" , stdout);
    // ios_base::sync_with_stdio(0);
    // cin.tie(0);cout.tie(0);
    
    while(~scanf("%d%d", &n, &m) && n)
    {
        for(int i = 1; i <= n; ++i)
            scanf("%s", mp[i] + 1);
        solve();
    }
    
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;       
}
```

# M - 非常可乐 HDU - 1495 

倒腾水的问题，，dfs直接搜就可以了，，（开visa数组的时候不知道怎么想的一直想着1e3==100，，，emmm mle了好几发，，，自闭ing

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
// #include <ctime>
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
const int maxn = 1e2 + 5;
const int maxm = 1e3 + 5;
const int mod = 1e9 + 7;

struct node
{
    int v[3];
    int st;
}s,t,u;
bool vis[maxn][maxn][maxn];
void pour(int i, int j)
{
    // t = u;
    t.st = u.st;
    t.v[0] = u.v[0]; t.v[1] = u.v[1]; t.v[2] = u.v[2];
    ++t.st;
    if(t.v[i] >= s.v[j] - t.v[j])
    {
        t.v[i] -= (s.v[j] - t.v[j]);
        t.v[j] = s.v[j];
    }
    else
    {
        t.v[j] += t.v[i];
        t.v[i] = 0;
    }
}
queue<node> q;
int bfs(node st)
{
    while(!q.empty())q.pop();
    q.push(st);
    memset(vis, false, sizeof vis);
    vis[st.v[0]][st.v[1]][st.v[2]] = true;
    while(!q.empty())
    {
        u = q.front();q.pop();
        //vis[u.v[0]][u.v[1]][u.v[2]] = false;
        // cout << u.v[0] << u.v[1] << u.v[2] << endl;
        
        // if(num)return u.st + num % 2;
        for(int i = 0; i <= 2; ++i)
            for(int j = 0; j <= 2; ++j)
                if(i != j && u.v[i] > 0)
                {
                    pour(i, j);
                    if(!vis[t.v[0]][t.v[1]][t.v[2]])
                    {
                        int num = 0;
                        for(int i = 0; i <= 2; ++i)
                            if(t.v[i] * 2 == s.v[0])
                                ++num;
                        if(num == 2)return t.st;
                        else if(num == 1)return t.st + 1;
                        q.push(t);
                        vis[t.v[0]][t.v[1]][t.v[2]] = true;
                    }
                }
    }
    return -1;
}

int main()
{
    // double pp = clock();
    // freopen("233.in" , "r" , stdin);
    // freopen("233.out" , "w" , stdout);
    // ios_base::sync_with_stdio(0);
    // cin.tie(0);cout.tie(0);
    
    int S, N, M;
    while(~scanf("%d%d%d", &S, &N, &M) && S + N + M)
    {
        s.v[0] = S; s.v[1] = N, s.v[2] = M;
        s.st = 0;
        node st = s;
        st.v[1] = st.v[2] = 0;
        if(s.v[0] & 1)printf("NO\n");
        else
        {
            int ans = bfs(st);
            if(~ans)printf("%d\n", ans);
            else puts("NO");
        }
        
    }
    
    // cout << endl << (clock() - pp) / CLOCKS_PER_SEC << endl;
    return 0;       
}
```

# N - Find a way HDU - 2612 

两次bfs就行了，，，因为很像最短路的题，，，写的写的就写成了最短路的样子

```cpp
#include <bits/stdc++.h>
// #include <iostream>
// #include <cstdio>
// #include <cstdlib>
// #include <string.h>
// #include <vector>
// #include <queue>
#include <stack>
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
const int maxm = 2e5 + 5;
const int mod = 1e9 + 7;

int n, m;
char mp[205][205];
struct node
{
    int x, y, mi;
    node(int _x, int _y, int _mi = 0):x(_x), y(_y), mi(_mi){}
    const bool operator<(const node &r)const
    {
        return mi < r.mi;
    }
};
struct node Y(0, 0, 0), M(0, 0, 0);
vector<int> yy;
bool vis[205][205];
int dis[205][205];
int dx[5] = {0, 0, 1, 0, -1};
int dy[5] = {0, 1, 0, -1, 0};
bool check(node i)
{
    if(mp[i.x][i.y] == '#')return true;
    if(i.x < 1 || i.y < 1 || i.x > n || i.y > m)return true;
    return false;
}
void bfs(node s)
{
    for(int i = 1; i <= n; ++i)
        for(int j = 1; j <= m; ++j)
            vis[i][j] = false;
    for(int i = 1; i <= n; ++i)
        for(int j = 1; j <= m; ++j)
            dis[i][j] = inf;
    
    vis[s.x][s.y] = true;
    queue<node> q;
    while(!q.empty())q.pop();
    q.push(s);
    dis[s.x][s.y] = 0;
    while(!q.empty())
    {
        node u = q.front(); q.pop();
        for(int i = 1; i <= 4; ++i)
        {
            node v = node(u.x + dx[i], u.y + dy[i]);
            if(check(v))continue;
            if(!vis[v.x][v.y])
            {
                vis[v.x][v.y] = true;
                dis[v.x][v.y] = dis[u.x][u.y] + 1;
                q.push(v);
            }
        }
    }
}
int main()
{
//    freopen("233.in" , "r" , stdin);
//    freopen("233.out" , "w" , stdout);
    // ios_base::sync_with_stdio(0);
    // cin.tie(0);cout.tie(0);
    while(~scanf("%d%d", &n, &m))
    {
        for(int i = 1; i <= n; ++i)
            scanf("%s", (mp[i] + 1));

        for(int i = 1; i <= n; ++i)
            for(int j = 1; j <= m; ++j)
                if(mp[i][j] == 'Y')
                    Y.x = i, Y.y = j;
                else if(mp[i][j] == 'M')
                    M.x = i, M.y = j;
        
        bfs(Y);
        yy.clear();
        for(int i = 1; i <= n; ++i)
            for(int j = 1; j <= m; ++j)
                if(mp[i][j] == '@')
                    yy.push_back(dis[i][j]);


        int ans = inf;
        int cnt = 0;
        bfs(M);
        for(int i = 1; i <= n; ++i)
            for(int j = 1; j <= m; ++j)
                if(mp[i][j] == '@')
                    ans = min(ans, yy[cnt++] + dis[i][j]);
        
        
        printf("%d\n", ans * 11);

    }
    return 0;    
}
```

