---
title: 字符串hash与字典树
date: 2018-08-01 22:05:29
tags:
- acm
- 算法
- 字符串
---

## 概述

这篇主要是关于字符串里的 **字符串hash** 和 **字符串字典树**，，两个都是简单的套模板的东西，，，理解基本思想就行了，，，对了，，还有一个字典树的的变形--**01字典树**；

<!-- more -->

## 字符串hash

### 如何求一个字符串的hash值

字符串hash的作用就是将 *字符串有效的转化为一个整数* ，，这个转化过程利用的是一个 **hash函数**

例如，，我们选hash函数为 $hash[i]=(hash[i-1]*p+idx(s[i]))%mod$
其中的idx(s)为s的一个自定义索引，，，例如a = 1 , b = 2.....

这时，，取 p=13,mod=101,把abc映射成一个整数
	hash[0]=1，表示 a 映射为1
	hash[1]=(hash[0]*p+idx(b))%mod=15，表示 ab 映射为 15
	hash[2]=(hash[1]*p+idx(c))%mod=97

所以abc就被映射成97。

同样对于其他的字符串也可以由此算出一个hash值，，，

当然这里的p , MOD要选取合适，，，否则可能会出现不同字符串有相同的hash值，，，

一般来说，，，p和mod一般取素数，p取一个较大的素数即可（6位到8位），mod取一个大素数，比如1e9+7，或者1e9+9....

一般的模板，，，

```cpp
const unsigned long long p = 1e9 + 13;
const unsigned long long mod = 1e9 + 7;
unsigned long long hashStr(char *s){
    unsigned long long h=0;
    for(int i=0;i<len;i++){
        unsigned long long value;
        char c=s[i];
        if(c>='0'&&c<='9')  value=c-'0';
        else if(c>='a'&&c<='z') value=c-'a'+10;
        else    value=c-'A'+36;
        h=(h*p+value)%mod;
    }
    return h;
```

### 如何求一个字符串任意子串的hash值

最容易想到的方法就是不管原来的字符串，，，
单独对于子串从 l 到 r 直接用刚刚求hash的方法求就行了，，，
但是当数据量大时，，，时间复杂度就很高了，，，，


上面的那个公式中hash[i]求得时字符串第i个前缀的hash值，，，，相当于是一个hash的前缀和，，，，

要求的子串 $hash[l..r] == (hash[r] - hash[l - 1] * p^{r - l + 1}) \% MOD$

**对了，，，这样直接求可能有负数，，，要判断+=mod一下。。。。。。
### 几个常用的求字符串hash算法

[有些借鉴，，，](http://www.cnblogs.com/jiu0821/p/4554352.html)

+ $hash[i] = (hash[i - 1] * p + idx(s[i])) \% MOD$
常用，，，

+ unsigned long long hash[N];hash[i] = hash[i - 1] * p;这个自动取模，，，当数超过 $2^{64}-1$时就会溢出，，，相当于取模 $2^{64}$的过程，，，
+ 双hash，，，有些情况下一个hash可能会出现冲突，，，那就换两个，，，两个不行就换三个，，，，什么？！三个还不行？？？！！！那就四个或则换算法，，，逃，，，实现：取两个mod，，一般取1e9+7和1e9+9两个孪生素数，，，冲突概率已经很低了，，，，，

## 字典树

简单来说就是把n个字符串用树保存，，，这样查询的时候一层一层的找，，，，

### 构建节点

一般的字典树的结构体定义如下:

```cpp
const int maxn = 26;
struct Trie   
{   
    Trie *next[maxn];   
    int v;   //根据需要变化
};   
 
Trie *root;

```
### 插入

```cpp
void Insert(char *str)
{
    int len = strlen(str);
    trie *p = root;
    //insert
    for (int i = 0; i < len; i++)
    {
        int t = str[i] - 'a';
        //NULL
        if (p->next[t] == NULL)
        {
            p->next[t] = new trie();
            p = p->next[t];
        }
        else
        {
            p = p->next[t];
            p->sum ++;
        }
    }
}
```
### 查询

```cpp
int query(char *str)
{
    int len = strlen(str);
    trie *p = root;
    for (int i = 0; i < len; i++)
    {
        int t = str[i] - 'a';
        p = p->next[t];
        //NULL
        if (p == NULL)  return 0;
    }
    return p->sum;
}
```

### 释放内存

不然可能有的题mle,,,,,

```cpp
void free(trie *t)
{
    if (t == NULL)
        return;
    for(int i = 0; i < maxn; i++)
        if (t->next[i]) free(t->next[i]);
    delete (t);
}
```

虽然是模板化的东西但是也要不死套模板，，，，，QAQ


## 习题

前三道都是模板题，，上午讲过，，，最后一题是01字典树问题，，，以后要再看一下，，，看到不同的好几种实现方法，，，没有来的及总结一下，，，，
### Problem A: A
Time Limit: 1 Sec  Memory Limit: 128 MB

>Description

>给定N个字符串（第i个字符串长度为Mi，字符串内包含数字、大小写字母，大小写敏感），请求出N个字符串中共有多少个不同的字符串。

>Input

>输入，第一行一个N
接下来N行每行包含一个字符串

>Output

>输出不同字符串的个数

>Sample Input
5
abc
aaaa
abc
abcc
12345

>Sample Output
4
我的代码：

```cpp
//#include <iostream>
#include <bits/stdc++.h>
using namespace std;
typedef unsigned long long ull;
const ull p = 1e9 + 13;
const ull mod = 1e9 + 7;
const int maxn = 1e6;
ull a[maxn];
ull hashstr(char *s)
{
    ull h = 0;
    for (int i = 0; i < strlen(s); i++)
    {
        ull idx;
        if (s[i] >= '0' && s[i] <= '9')         idx = s[i] - '0';
        else if (s[i] >= 'a' && s[i] <= 'z')    idx = s[i] - 'a' + 10;
        else if (s[i] >= 'A' && s[i] <= 'Z')    idx = s[i] - 'A' + 36;
        h = (h * p + idx) % mod;
    }
    return h;
}
int main()
{
    int n;scanf("%d" , &n);
    char t[maxn];
    for (int i = 1; i <= n; i++)
    {
        //gets(t);
        scanf("%s" , &t);
        a[i] = hashstr(t);
    }

    sort(a + 1 , a + 1 + n);

    int ans = 0;
    int cur = -1;
    for (int i = 1; i <= n; i++)
        if (a[i] != cur)
        {
            cur = a[i];
            ans++;
        }
    cout << ans << endl;
    return 0;
}

```

学长的，，，

```cpp
#include<iostream>
#include<cstdio>
#include<algorithm>
#include<cstring>
#include<bits/stdc++.h>
using namespace std;
typedef unsigned long long ull;
ull base=131;
ull a[10010];
char s[1010];
ull Hash(char *s)
{
    int len=strlen(s);
    ull ans=0;
    for(int i=0;i<len;i++)
        ans=ans*base+(ull)s[i];
    return ans;
}
int main()
{
    /*srand(NULL);
    freopen("data.in","r",stdin);
    freopen("data.out","w",stdout);*/
    /*printf("1000\n");
    for(int i=1;i<=1000;i++)
    {
        int len=rand()%1000+1;
        for(int i=0;i<len;i++)
        {
            int t=rand()%3;
            if(t==0)
                s[i]='0'+rand()%10;
            else if(t==1)
                s[i]='A'+rand()%26;
            else
                s[i]='a'+rand()%26;
        }
        s[len]='\0';
        cout<<s<<endl;
    }*/
    int N,i=1,ans=1;
    scanf("%d",&N);
    for(int i=1;i<=N;i++)
    {
        scanf("%s",&s);
        a[i]=Hash(s);
    }
    sort(a+1,a+1+N);
    for(int i=2;i<=N;i++)
    {
        if(a[i]!=a[i-1])
            ans++;
    }
    printf("%d\n",ans);
}

```

### Problem B: B

Time Limit: 1 Sec  Memory Limit: 128 MB

>Description

>HHM在阅读一篇文章，他想找出来一个单词的频率，也就是这个单词在文章中出现了几次。聪明的你赶快帮帮他

>Input

>输入包含多组数据。

>输入文件的第一行有一个整数，代表数据组数。接下来是这些数据，以如下格式给出：

>第一行是单词W，一个由{'A','B','C',...,'Z'}中字母组成的字符串，保证1<=|W|<=10000（|W|代表字符串W的长度）

>第二行是文章T，一个由{'A','B','C',...,'Z'}中字母组成的字符串，保证|W|<=|T|<=1000000。

>Output

对每组数据输出一行一个整数，即W在T中出现的次数。

>Sample Input
3
BAPC
BAPC
AZA
AZAZAZA
VERDI
AVERDXIVYERDIAN

>Sample Output
1
3
0

>HINT

>字符串哈希思路

我的代码：

```cpp
//#include <iostream>
#include <bits/stdc++.h>
using namespace std;
typedef unsigned long long ull;
const ull p = 1e9 + 13;
const ull MOD = 1e9 + 7;
const int maxn = 1e4 + 5;
const int maxm = 1e4 + 6;
ull pow1 (ull x , ull n)
{
    ull res = x;
    ull ans = 1;
    while (n)
    {
        if (n & 1)  ans = ans * res % MOD;
         res = res * res % MOD;
         n >>= 1;                           //b右移相当于除以二
    }
    return ans;
}
int main()
{
    int n;scanf("%d" , &n);
    while (n--)
    {
        char word[maxn];
        scanf("%s" , word);
        //gets(word);
        char text[maxm];
        scanf("%s" , text);
        //gets(text);

        ull hash_word = 0;
        for (int i = 0; i < strlen(word); i++)
        {
            ull idx = word[i] - 'A' + 1;
            hash_word = (hash_word * p + idx) % MOD;
        }
        ull hash_t[maxm];
        memset(hash_t , 0 , sizeof hash_t);
        for (int i = 1; i <= strlen(text); i++)
        {
            ull idx = text[i - 1] - 'A' + 1;
            hash_t[i] = (hash_t[i - 1] * p + idx) % MOD;
        }

        ull ans = 0;
        ull len = strlen(word);
        for (ull i = len; i <= strlen(text); i++)
        {
            ull t = hash_t[i] - hash_t[i - len] * pow1(p , len);//cout << t << endl;
            if (t < 0)  t = (t + MOD) % MOD;
            else        t %= MOD;
            if (t == hash_word)
                ans++;
        }
        cout << ans << endl;
    }
    return 0;
}

```

学长的代码:

```cpp
#include<iostream>
#include<cstdio>
#include<cstring>
#include<bits/stdc++.h>
using namespace std;
typedef unsigned long long ull;
ull base=131;
ull p[100010],a2[1000010];
char s1[10010],s2[1000010];
ull get(int l,int r)
{
    return (ull)a2[r]-p[r-l+1]*a2[l-1];
}
int main()
{
    srand(NULL);
    freopen("data.in","w",stdout);
    //freopen("data.out","w",stdout);
    printf("97\n");
    for(int i=1;i<=97;i++)
    {
        int p1=rand()%10000+1;
        int p2=rand()%10000+1;
        if(p1>p2)
            swap(p1,p2);
        for(int j=0;j<p1;j++)
            s1[j]='A'+rand()%26;
        s1[p1]='\0';
        for(int j=0;j<p2;j++)
            s2[j]='A'+rand()%26;
        s2[p2]='\0';
        cout<<s1<<endl;
        cout<<s2<<endl;
    }
    /*p[0]=1;
    for(int i=1;i<=10000;i++)
        p[i]=p[i-1]*base;
    int T;
    scanf("%d",&T);
    while(T--)
    {
        scanf("%s%s",&s1,&s2);
        int len1=strlen(s1),len2=strlen(s2);
        ull a1=0;
        int ans=0;
        for(int i=0;i<len1;i++)
            a1=a1*base+(ull)s1[i];
        a2[0]=(ull)s2[0];
        for(int i=1;i<len2;i++)
            a2[i]=a2[i-1]*base+(ull)s2[i];

        for(int i=0;i+len1-1<len2;i++)
            if(a1==get(i,i+len1-1))
                ans++;
        printf("%d\n",ans);
    }*/
}

```
### Problem C: C

Time Limit: 1 Sec  Memory Limit: 128 MB

>Description

>HMM最近遇到一个难题,老师交给他很多单词(只有小写字母组成,不会有重复的单词出现),现在老师要他统计出以某个字符串为前缀的单词数量(单词本身也是自己的前缀).

>Input

>输入数据的第一部分是一张单词表,每行一个单词,单词的长度不超过10,它们代表的是老师交给HMM统计的单词,一个#代表单词表的结束.第二部分是一连串的提问,每行一个提问,每个提问都是一个字符串.

>Output

>对于每个提问,给出以该字符串为前缀的单词的数量.

>Sample Input
banana
band
bee
absolute
acm
#
ba
b
band
abc
>Sample Output
2
3
1
0

我的代码：

```cpp
#include <iostream>
//#include <bits/stdc++.h>
#include <cstring>
#include <cstdlib>
#include <cstdio>
#define ms(a , b) memset(a , b , sizeof(a))
using namespace std;
const int maxn = 27;
struct trie
{
    trie *next[maxn];
    int sum;
    trie()
    {
        sum = 1;
        ms(next , NULL);
    }
}*root;
void Insert(char *str)
{
    int len = strlen(str);
    trie *p = root;
    //insert
    for (int i = 0; i < len; i++)
    {
        int t = str[i] - 'a';
        //NULL
        if (p->next[t] == NULL)
        {
            p->next[t] = new trie();
            p = p->next[t];
        }
        else
        {
            p = p->next[t];
            p->sum ++;
        }
    }
}
int query(char *str)
{
    int len = strlen(str);
    trie *p = root;
    for (int i = 0; i < len; i++)
    {
        int t = str[i] - 'a';
        p = p->next[t];
        //NULL
        if (p == NULL)  return 0;
    }
    return p->sum;
}
void free(trie *t)
{
    if (t == NULL)
        return;
    for(int i = 0; i < maxn; i++)
        if (t->next[i]) free(t->next[i]);
    delete (t);
}
int main()
{
    char str[maxn];
    root = new trie;
    while(gets(str) && str[0] != '#')
    {
        Insert(str);
    }
    while(~scanf("%s" , str))
    {
        printf("%d\n" , query(str));
    }
    free(root);
    return 0;
}

```

学长的代码:

```cpp
#include<iostream>
#include<cstdio>
#include<cstring>
#include<malloc.h>
#include<bits/stdc++.h>
using namespace std;
char s[15];
typedef struct Trie{
    int v;
    Trie *next[26];
}Trie;

Trie root;

void Creat(char *str)
{
    int len=strlen(str);
    Trie *p=&root,*q;
    for(int i=0;i<len;i++)
    {
        int id=str[i]-'a';
        if(p->next[id]==NULL)
        {
            q=(Trie *)malloc(sizeof(root));
            q->v=1;
            for(int j=0;j<26;j++)
                q->next[j]=NULL;
            p->next[id]=q;
            p=p->next[id];
        }
        else
        {
            p->next[id]->v++;
            p=p->next[id];
        }
    }
}
int Find(char *str)
{
    int len=strlen(str);
    Trie *p=&root;
    for(int i=0;i<len;i++)
    {
        int id=str[i]-'a';
        p=p->next[id];
        if(p==NULL)
            return 0;
    }
    return p->v;
}
int main()
{
    /*srand(NULL);
    freopen("data.in","r",stdin);
    freopen("data.out","w",stdout);
    */
    /*for(int i=1;i<=1000;i++)
    {
        int p=rand()%10+1;
        for(int j=0;j<p;j++)
            s[j]='a'+rand()%26;
        cout<<s<<endl;
    }*/
    char str[15];
    for(int i=0;i<26;i++)
        root.next[i]=NULL;
    while(scanf("%s",&str)&&str[0]!='#')
        Creat(str);
    while(scanf("%s",&str)!=EOF)
    {
        printf("%d\n",Find(str));
    }
}

```
### Problem D: D

Time Limit: 1 Sec  Memory Limit: 128 MB

>Description

>HHM和SY做游戏，SY给HHM一个集合，集合包含了N个整数，随后SY向HHM发起M次询问，每次询问包含一个整数S，之后HHM需要在集合中
找到一个正整数K，使得K与S的异或结果最大。HHM向你请求帮助

>Input

>输入包含若干组测试数据，每组测试数据包含若干行。

>输入的第一行是一个整数T（T < 10），表示共有T组数据。

>每组数据的第一行输入两个正整数N，M（<1=N,M<=100000），接下来一行，包含N个正整数，代表 Zeus 的获得的集合，之后M行，每行一个正整数S，代表 Prometheus 询问的正整数。所有正整数均不超过2^32。

>Output

>对于每组数据，首先需要输出单独一行”Case #?:”，其中问号处应填入当前的数据组数，组数从1开始计算。

>对于每个询问，输出一个正整数K，使得K与S异或值最大。

>Sample Input
2
3 2
3 4 5
1
5
4 1
4 6 5 6
3
>Sample Output
Case #1:
4
3
Case #2:
4

我的代码：

这个是用 **01字典树** 解决的，，，当时想到了将每一个数转化为'a' , 'b'顺序的字符串，，然后存到字典数里，，最后查询待输入的s异或后的字符串在树中走到头的位置即为答案，，，突然蒙蔽不会建树了，，，gg....QAQ

对了，，我看到网上有的人是用数组建的树，，，有点看不懂，，，挖个坑，，，还有一个神奇的函数bitset(),,,,哪天来补票，，，，


```cpp
#include <iostream>
//#include <bits/stdc++.h>
#include <cstring>
#include <cstdlib>
#include <cstdio>
#define ms(a , b) memset(a , b , sizeof(a))
using namespace std;
const int maxn = 2;
const int maxm = 1e5 +5;
struct trie
{
    trie *next[maxn];
    int num;
    trie()
    {
        num = 0;
        ms(next , NULL);
    }
};
void Insert(trie *root , int a)
{
    trie *p = root;
    //insert
    for (int i = 31; i >= 0; i--)
    {
        int k = (a >> i) & 1;
        if (p->next[k] == NULL)         //空的代表没存加上
        {
            p->next[k] = new trie();

        }
        p = p->next[k];
    }
    p->num = a;                         //将从根节点到该节点表示的值存起来
}
int query(trie *root , int a)
{
    trie *p = root;
    for (int i = 31; i >= 0; i--)
    {
        int k = (a >> i) & 1;
        if (p->next[k ^ 1] != NULL)
            p = p->next[k ^ 1];
        else
            p = p->next[k];
    }
    return p->num;
}
void Free(trie *t)
{
    if (t == NULL)
        return;
    for(int i = 0; i < maxn; i++)
        if (t->next[i]) Free(t->next[i]);
    delete t;
}
int main()
{
    int t;
    scanf("%d" , &t);
    int k = 1;
    while(t--)
    {

        int n , m;
        //cin >> n >> m;
        scanf("%d%d" , &n , &m);
        int a;
        trie *root = new trie();

        //insert
        for (int i = 1; i <= n; i++)
        {
            scanf("%d" , &a);
            Insert(root , a);
        }
        printf("Case #%d:\n" , k++);
        for (int i = 1; i <= m; i++)
        {
            scanf("%d" , &a);
            printf("%d\n" , query(root , a));
        }
        Free(root);
    }

    return 0;
}


```

学长的代码:

```cpp
#include<iostream>
#include<cstdio>
#include<cstring>
#include<malloc.h>
#include<bits/stdc++.h>
using namespace std;
typedef struct tree
{
    tree *next[2];
    int v;
    int val;
}tree;
tree root;
void Creat(char *str,int va)
{
    int len=strlen(str);
    tree *p=&root,*q;
    for(int i=0;i<len;i++)
    {
        int id=str[i]-'0';
        if(p->next[id]==NULL)
        {
            q=(tree*)malloc(sizeof(root));
            for(int j=0;j<2;j++)
                q->next[j]=NULL;
            p->next[id]=q;
        }
        p=p->next[id];
        if(i==len-1)
            p->val=va;
    }
}
void Find(char *str)
{
    int len=strlen(str);
    tree *p=&root;
    for(int i=0;i<len;i++)
    {
        int id=str[i]-'0';
        if(p->next[1-id]!=0)
            p=p->next[1-id];
        else
            p=p->next[id];
        if(p==NULL)
            return;
        if(i==len-1)
            printf("%d\n",p->val);
    }
}
void init()
{
    for(int i=0;i<2;i++)
    {
        root.next[i]=NULL;
    }
}
int main()
{
    /*srand(NULL);
    freopen("data.in","r",stdin);
    freopen("data.out","w",stdout);
    */
    /*printf("5\n");
    for(int i=1;i<=5;i++)
    {
        int m=rand()%100000+1;
        int n=rand()%100000+1;
        printf("%d %d\n",n,m);
        for(int i=1;i<=n;i++)
            printf("%d ",rand()%100000000+1);
        printf("\n");
        for(int i=1;i<=m;i++)
            printf("%d ",rand()%100000000+1);
        printf("\n");

    }*/

    int kase=0;
    int T;
    scanf("%d",&T);
    while(T--)
    {
        init();
        int n,m;
        char s[50];
        scanf("%d%d",&n,&m);
        for(int i=1;i<=n;i++)
        {
            int a;
            scanf("%d",&a);
            int tmp=a;
            s[36]='\0';
            for(int j=35;j>=0;j--)
            {
                if(a)
                {
                    s[j]=a%2+'0';
                    a/=2;
                }
                else
                {
                    s[j]='0';
                }
            }
            Creat(s,tmp);
        }
        printf("Case #%d:\n",++kase);
        while(m--)
        {
            int a;
            scanf("%d",&a);
            s[36]='\0';
            for(int j=35;j>=0;j--)
            {
                if(a)
                {
                    s[j]=a%2+'0';
                    a/=2;
                }
                else
                {
                    s[j]='0';
                }
            }
            Find(s);
        }

    }
}

```

溜。。。。。。。。。。。。