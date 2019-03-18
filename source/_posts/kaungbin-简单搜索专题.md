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

