---
title: codeforces-1080C
date: 2018-11-25 14:23:53
tags:
- acm
- 刷题
categories:
- Codeforces
---

# 概述

[昨天正好有时间，做了自己第一场的cf](https://codeforces.com/problemset/problem/1080/C)

做完AB之后被C卡到最后，，，从来没做过坐标平面上两个矩形的面积和，，，因为存在相交的可能，，，所以要单独的处理矩形面积交，，然后自己就写懵了，，，当时写了几十行的if判断，，，，到最后都没弄完，，QAQ

<!-- more -->

# 题意与分析

## 题意

这道题的题意就是给你一个n * m大的方格板子，，类似国际象棋那样，，黑白相间，，然后再给你两个矩形，，第一个矩形内的所有格子涂为白色，，第二个涂为黑色，，，问你最后白格子和黑格子的数量，，棋盘的大小可能是1e9 * 1e9的，，，

## 思路

### 我的思路

+ 一开始我的思路是算出所有的白格子，黑格子的数量(wsum ,bsum)，，，然后wsum加上第一个矩形里的所有黑格子数量，，之后wsum减去第二个矩形里白格子的数量，，，最后再考虑是有面积的相交，，，有的话再计算相交矩形内的，，但是中间的一些细节，，，比如说如何计算不同左下角坐标的矩形内格子数，，如何判是否有相交的矩形，，如何计算相交的矩形内的格子数量以及怎么调整等等，，，以前从来没写过没考虑过，，，只能硬头皮的去一路if下去，，，到最后自己的写懵了，，，
+ 中途想着直接模拟算了，，，维护一个大矩阵，，1表示白色0表示黑色，，然后对相应的矩形全部置一置零，，，最后求01的数量，，，然后发现根本开不了那么大的数组，，，，QAQ

### [最后今天看了出题人的题解，，，](https://codeforces.com/blog/entry/63436#comment-473595)

#### **矩形(1 , 1 , x , y)内白格子的数量的计算**
  
  $设函数w(x , y)返回值为左下角(1 , 1)与(x , y)的矩形内的白格子的数量$

#### **矩形内白格子数量的计算**：
  
  $任意一个矩形(x_1 , y_1 , x_2 , y_2)内的白格子数量=矩形(1 , 1 , x_2 , y_2)内白格子的数量-矩形(1 , 1 , x_1 , y_2)内白格子的数量-矩形(1 , 1 , x_2 , y_1)内白格子的数量+矩形(1 , 1 , x_1 - 1 , y_1 - 1)内白格子的数量，所以：$
  
  $$W(x_1 , y_1 , x_2 , y_2) = w(x_1 , y_1) - w(x_1 - 1 , y_2) - w(x_2 , y_1 - 1) + w(x_1 - 1 , y_1 - 1)$$

#### **矩形内黑格子数量的计算**
  
  $$B(x_1 , y_1 , x_2 , y_2) = (x_2 - x_1 + 1) * (y_2 - y_1 + 1) - W(x_1 , y_1 , x_2 , y_2)$$

#### **相交部分的判断和处理**
  
  出题人说**显然**（我(／‵Д′)／~ ╧╧）如果不存在相交矩形，，那么一定满足

  $$max(x_1 , x_3)>min(x_2 , x_4) \ \ or\ \  max(y_1,y_3)>min(y_2,y_4)$$

  所以反命题就是如果存在相交举证即使上面那个判断取反，，同时相交矩形的坐标是
  $$(max(x_1 , x_3) \ , \ max(y_1 , y_3)\ ,\ min(x_2,x_4)\ ,\ min(y2 , y_4))$$

  有了这些，，我们就可以算出相交矩形内原来的白色、黑色的格子了（就是不考虑第一个第二个矩形影响时的数量），，

  因为在第一个矩形里将相交矩形内的黑格子变成了白色，，现在又要变成黑色，，所以wsum（白色格子的数量）要减去黑色的数量（白色的数量已经在计算第二个矩形时减去了，，所以对于wsum是减去了相交矩形的所有格子数量），，同时黑色格子的数量bsum要加上黑色的数量，，而计算第二个矩形时相交矩形里的白色已经加上了，，，相当于加上了整个相交矩形的格子数量，，（拿笔画一下这个步骤就更清楚了）

#### **w(x , y)的实现**

  首先我们定义这样排列的黑白格子为**类型1**

  ![](https://codeforces.com/predownloaded/d8/6e/d86e87a66d47ec694dd7dfe9b27c72c68ce27d9d.png)
  而这样的是**类型2**
  ![](https://codeforces.com/predownloaded/5e/f8/5ef88f2dba40d4f7f22774404f8c502bd950a68e.png)
  + 行数n为**偶数**时，类型1类型2的数量是对半的，即$\frac n2$,

  + 行数n为**奇数**时，**类型1**的数量是$\lfloor{\frac n2}\rfloor$ （向下取整，直接除就行），，**类型2**的数量是$\lceil{\frac n2}\rceil$（向上取整，有余数时加一个）
  
  因为行数n为偶数时类型1的数量和类型2数量相等，也就是说$\lfloor{\frac n2}\rfloor$=$\lceil{\frac n2}\rceil$，，所以，，我们就不管行数是不是偶数奇数了，，，直接**类型1**数量=$\lfloor{\frac n2}\rfloor$，**类型2**数量=$\lceil{\frac n2}\rceil$，，，（数学真好玩.jpg，，，想想我当时为了判断行数的奇偶分情况讨论，，写吐ed，，(#`Д´)ﾉ）

  按照这个思路，，，同样列数m也就可以这样计算了，，，
  即**类型1**的数量=$\lfloor{\frac m2}\rfloor$，，**类型2**的数量=$\lceil{\frac m2}\rceil$..

  有了这两个，，我们就可以计算矩形(x , y)内了白色格子的数量了，，，
  $$w(x , y) = \lceil{\frac n2}\rceil \cdot \lceil{\frac m2}\rceil + \lfloor{\frac n2}\rfloor \cdot \lfloor{\frac m2}\rfloor$$

#### **向上取整的实现**
  这道题除了让我知道矩形交的处理，，，还有一个从好几个大佬的代码中我看到了几个好的求向上取整的代码，，，不像我那样傻傻的if判断(╬☉д⊙)

  ```cpp
  ll cdiv(ll a , llb)
  {
      return a / b + (a % b > 0);
  }
  //or
  ll cdiv(ll a , ll b)
  {
      return (a + b - 1) / b;
  }
  ```

# 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
//ceiling div
ll cdiv(ll a , ll b)
{
    return a / b + (a % b > 0);
}
ll ccdiv(ll a , ll b)
{
    return (a + b - 1) / b;
}
ll w(ll x , ll y)
{
    return cdiv(x , 2) * cdiv(y , 2) + (x / 2) * (y / 2);
}
ll wsum(ll x1 , ll y1 , ll x2 , ll y2)
{
    return w(x2 , y2) - w(x1 - 1 , y2) - w(x2 , y1 - 1) + w(x1 - 1 , y1 - 1);
}
ll bsum(ll x1 , ll y1 , ll x2 , ll y2)
{
    return (x2 - x1 + 1) * (y2 - y1 + 1) - wsum(x1 , y1 , x2 , y2);
}
int main()
{
    //freopen("233.txt" , "r" , stdin);
    ios_base::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    int t;cin >> t;
    while(t--)
    {
        ll n , m;
        cin >> n >> m;
        ll x1 , x2 , x3 , x4 , y1 , y2 , y3 , y4;
        cin >> x1 >> y1 >> x2 >> y2;
        cin >> x3 >> y3 >> x4 >> y4;
        ll w = wsum(1 , 1 , m , n);
        ll b = bsum(1 , 1 , m , n);
        //first rec
        w = w + bsum(x1 , y1 , x2 , y2);
        b = b - bsum(x1 , y1 , x2 , y2);
        //second rec(dont consider the itersection
        w = w - wsum(x3 , y3 , x4 , y4);
        b = b + wsum(x3 , y3 , x4 , y4);
        //consider the itersection
        if(max(x1 , x3) <= min(x2 , x4) && max(y1 , y3) <= min(y2 , y4))
        {
            w = w - bsum(max(x1 , x3) , max(y1 , y3) , min(x2 , x4) , min(y2 , y4));
            b = b + bsum(max(x1 , x3) , max(y1 , y3) , min(x2 , x4) , min(y2 , y4));
        }
        cout << w << " " << b << endl;
    }
}

```

# 小结
+ 一直不怎么会的向上取整、矩形面积交等等问题算是了解了，，，至少不会在出现的时候啥都不知道，，只能从头分析，，，一个劲的堆if了(-`ェ´-╬)
+ cf真好玩.jpg，，，以为会第一发只能灰名，，没想到青了，，，就是深夜场太多，，，不然能天天打，，，，
+ 这种代码不多的题锻炼锻炼思维很不错啊，，，毕竟现在纯套板子的题在各种比赛中是越来越少了，，，，

(end)