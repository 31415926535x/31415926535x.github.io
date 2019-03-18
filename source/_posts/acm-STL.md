---
title: acm-STL
date: 2018-09-18 20:05:52
tags:
- acm
- c++
categories:
- acm
---

# 概述

c++中有很多stl模板，，在解决一些问题时使用它们可以在较小的时间复杂度里完成题目，，，

本篇博客主要是对一些常用的stl的总结，，，

大部分内容来自大佬的
[博客](https://blog.csdn.net/f_zyj/article/details/51594851);


主要内容有: **pair** , **set** , **vector** , **string** , **stack** , **queue** , **map** , **bitset** , **iterator** , **algorithm**.

<!-- more -->

# pair

**头文件**: ```#include <utility>```

**作用**: 用来表示一个 **二元组** 或 **元素对** ， （相当于平面里的一个点） ， 并提供了按照字典序对元素进行大小比较运算符模板函数，，，

**使用**: 

```cpp
pair<int , int> p;
cin >> p.first >> p.second;
cout << p.first << p.second;
```

pair需要两个参数，首尾元素的数据类型。

pair有两个对象成员，**first** , **second**;

在\<utility>中已经定义了pair上的六个比较运算符：<、>、<=、>=、==、!=，其规则是先比较first，first相等时再比较second，这符合大多数应用的逻辑。当然，也可以通过重载这几个运算符来重新指定自己的比较逻辑。 
除了直接定义一个pair对象外，如果需要即时生成一个pair对象，也可以调用在\<utility>中定义的一个模版函数：make_pair。make_pair需要两个参数，分别为元素对的首元素和尾元素。

# set

## set

**头文件**: ```#include <set>```

**作用**: set是与 **集合** 相关的容器，STL为我们提供了set的实现，在编程题中遇见集合问题直接调用是十分方便的。

**使用**: 

```cpp
set<int> s;
set<double> ss;
```
**基本操作**:

```cpp
s.begin()       //  返回指向第一个元素的迭代器
s.clear()       //  清除所有元素
s.count()       //  返回某个值元素的个数
s.empty()       //  如果集合为空，返回true(真）
s.end()         //  返回指向最后一个元素之后的迭代器，不是最后一个元素
s.equal_range() //  返回集合中与给定值相等的上下限的两个迭代器
s.erase()       //  删除集合中的元素
s.find()        //  返回一个指向被查找到元素的迭代器
s.get_allocator()   //  返回集合的分配器
s.insert()      //  在集合中插入元素
s.lower_bound() //  返回指向大于（或等于）某值的第一个元素的迭代器
s.key_comp()    //  返回一个用于元素间值比较的函数
s.max_size()    //  返回集合能容纳的元素的最大限值
s.rbegin()      //  返回指向集合中最后一个元素的反向迭代器
s.rend()        //  返回指向集合中第一个元素的反向迭代器
s.size()        //  集合中元素的数目
s.swap()        //  交换两个集合变量
s.upper_bound() //  返回大于某个值元素的迭代器
s.value_comp()  //  返回一个用于比较元素间的值的函数
```

## multiset

multiset（多重集合）

**与set的区别**: 
+ 多重集合与集合的区别在于集合中 **不能** 存在相同元素，而多重集合中可以存在。
+ multiset和set的基本操作相似，需要注意的是，集合的count()能返回0（无）或者1（有），而多重集合是有多少个返回多少个。

**使用**:

```cpp
multiset<int> s;
multiset<double> ss;
```

# vector

**头文件**:  ```#include <vector>```

**作用**: vector(向量容器模板类) ， 以连续数组的方式储存元素序列 ， 一般作为动态数组来用，，动态增长储存空间，

**使用**:

```cpp
vector<int> s;      
//  定义一个空的vector对象，存储的是int类型的元素
vector<int> s(n);   
//  定义一个含有n个int元素的vector对象
vector<int> s(first, last); 
//  定义一个vector对象，并从由迭代器first和last定义的序列[first, last)中复制初值
```
vector模版类需要两个模版参数，第一个参数是存储元素的数据类型，第二个参数是存储分配器的类型，其中第二个参数是可选的，如果不给出第二个参数，将使用默认的分配器。

**vector的基本操作**:

```cpp
s[i]                //  直接以下标方式访问容器中的元素
s.front()           //  返回首元素
s.back()            //  返回尾元素
s.push_back(x)      //  向表尾插入元素x
s.size()            //  返回表长
s.empty()           //  表为空时，返回真，否则返回假
s.pop_back()        //  删除表尾元素
s.begin()           //  返回指向首元素的随机存取迭代器
s.end()             //  返回指向尾元素的下一个位置的随机存取迭代器
s.insert(it, val)   //  向迭代器it指向的元素前插入新元素val
s.insert(it, n, val)//  向迭代器it指向的元素前插入n个新元素val
s.insert(it, first, last)   
//  将由迭代器first和last所指定的序列[first, last)插入到迭代器it指向的元素前面
s.erase(it)         //  删除由迭代器it所指向的元素
s.erase(first, last)//  删除由迭代器first和last所指定的序列[first, last)
s.reserve(n)        //  预分配缓冲空间，使存储空间至少可容纳n个元素
s.resize(n)         //  改变序列长度，超出的元素将会全部被删除，如果序列需要扩展（原空间小于n），元素默认值将填满扩展出的空间
s.resize(n, val)    //  改变序列长度，超出的元素将会全部被删除，如果序列需要扩展（原空间小于n），val将填满扩展出的空间
s.clear()           //  删除容器中的所有元素
s.swap(v)           //  将s与另一个vector对象进行交换
s.assign(first, last)
//  将序列替换成由迭代器first和last所指定的序列[first, last)，[first, last)不能是原序列中的一部分

//  要注意的是，resize操作和clear操作都是对表的有效元素进行的操作，但并不一定会改变缓冲空间的大小
//  另外，vector还有其他的一些操作，如反转、取反等，不再一一列举
//  vector上还定义了序列之间的比较操作运算符（>、<、>=、<=、==、!=），可以按照字典序比较两个序列。
```
# string
