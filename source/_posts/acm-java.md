---
title: acm_java
date: 2019-02-27 18:41:27
tags:
- acm
- 笔记
---

有时会碰到一些大数的题，，python不怎么会，，用c++模板的话有太长了，，所以蹭着选修的Java，正好记录一下java在做题中的基本的使用，，

<!-- more -->

# 基本的输入输出

## 多组数据读到文件末

```java
import java.util.Scanner;
public class Main{
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int a, b;
        while(input.hasNextInt()) {
            a = input.nextInt();
            b = input.nextInt();
            System.out.println(a+b);
        }
    }
}
```

## t组数据

```java
import java.io.*;
import java.util.*;
import java.math.*;
public class Main{
	public static void main(String[] args) {
		Scanner input = new Scanner(System.in);
		int t, a, b;
		t = input.nextInt();
		while(t > 0) {
			--t;
			a = input.nextInt();
			b = input.nextInt();
			System.out.println(a + b);
		}
	}
}
```

## 读到输入的数字都为零时

```java
import java.io.*;
import java.util.*;
import java.math.*;
public class Main{
	public static void main(String[] args) {
		Scanner input = new Scanner(System.in);
		int a, b;
		while(input.hasNextInt()) {
			a = input.nextInt();
			b = input.nextInt();
			if(a == 0 && b == 0)break;
			System.out.println(a + b);
		}
	}
}
```

## 输入n个数，n为零结束

```java
import java.io.*;
import java.util.*;
import java.math.*;
public class Main{
	public static void main(String[] args) {
		Scanner input = new Scanner(System.in);
		while(input.hasNextInt()) {
			int n = input.nextInt();
			if(n == 0)break;
			int sum = 0;
			for(int i = 1; i <= n; ++i) {
				int t = input.nextInt();
				sum += t;
			}
			System.out.println(sum);
		}
	}
}
```

## [字符的读入](http://acm.hdu.edu.cn/showproblem.php?pid=2000)

```java
import java.io.*;
import java.util.*;
import java.math.*;
/**
 * @author 31415926535x
 * acm_java
 */
public class Main{
	public static void main(String[] args) {
		Scanner input = new Scanner(System.in);
		String s;
		while(input.hasNext()) {
			s = input.nextLine();
			char[]w = s.toCharArray();
			Arrays.sort(w);
			System.out.println(w[0]+ " " + w[1] + " " + w[2]);
		}
	}
}
```

# 大整数的使用

用java 的一个重要原因应该就是使用它的大数类了吧，，，
基本的输入输出使用：

## 加法

```java
import java.io.*;
import java.util.*;
import java.math.*;
/**
 * @author 31415926535x
 * acm_java
 */
public class Main{
	public static void main(String[] args) {
		Scanner input = new Scanner(System.in);
		int t = input.nextInt();
		for(int i = 1; i <= t; ++i){
			BigInteger a = input.nextBigInteger();
			BigInteger b = input.nextBigInteger();
			System.out.println("Case " + i + ":");
			System.out.println(a + " + " + b + " = " + a.add(b));
			if(i < t)System.out.println();
		}
	}
}
```

## 乘法

```java
import java.io.*;
import java.util.*;
import java.math.*;
/**
 * @author 31415926535x
 * acm_java
 */
public class Main{
	public static void main(String[] args) {
		Scanner input = new Scanner(System.in);
		while(input.hasNext()) {
			BigInteger a = input.nextBigInteger();
			BigInteger b = input.nextBigInteger();
			System.out.println(a.multiply(b));
		}
	}
}
```

# 实数

整数结果去除小数点后的零，然后转成字符串

```java
import java.io.*;
import java.util.*;
import java.math.*;
/**
 * @author 31415926535x
 * acm_java
 */
public class Main{
	public static void main(String[] args) {
		Scanner input = new Scanner(System.in);
		while(input.hasNext()) {
			BigDecimal a = input.nextBigDecimal();
			BigDecimal b = input.nextBigDecimal();
			System.out.println(a.add(b).stripTrailingZeros().toPlainString());
		}
	}
}
```

[剩下的一些东西](https://blog.csdn.net/nickwong_/article/details/48035317)

