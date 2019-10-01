---
title: '[工具使用]-利用latex管理创建自己的ACM模板'
date: 2019-08-31 20:50:33
tags:
- 工具使用
- ACM
- latex
categories:
- ACM-整理
---


从很早入坑ACM开始，便和各种算法的模板打着交道，虽然kaungbin的模板已经足够强大，但是自己在平常做题中也逐渐有着自己的一些模板，也有一些kuangbin模板中没有的更快的板子，虽然不确定时候以后会用到，但是能够记录下来形成自己的模板是最好的，，这样也对自己所学有个大致的总结，所以在搜寻网络上各种解决思路后，选择一位博主的解决方法： 利用python管理文件夹形式的模板库，生成 ``latex`` 的 ``.tex`` 文件，然后通过两次编译后得到 ``.pdf`` 的模板文件，，这样的好处是显而易见的，首先是代码的管理十分的方便，只需将整理的板子扔到对应的分类文件夹下，然后在需要打印 ``.pdf`` 的板子时运行一下py脚本就行了，同时用 ``latex`` 生成的文件的样式也很个性化，可以根据自己的喜好来改变，，我也从中加深了对 ``latex`` 语言的了解。

<!-- more -->

# 准备工作

为了能够最后能正常的生成板子，，首先要保证一些软件能够正常的使用： ``python3``, ``tex`` 等等

这个 ``Tex Live`` 我很早之前就安装了，所以也忘记具体的安装过程了，，只记得这玩意的下载文件多而大，，安装也费事，，不过具体的安装步骤网上有很多教程（注意要保证xecjk使用，，支持中文的包

最后的板子的管理文件夹大致是这样的：

```txt
卷 文件 的文件夹 PATH 列表
卷序列号为 D0B1-CFE7
G:.
│  1.pdf                //生成的pdf文件
│  1.tex                //生成的tex文件
│  logo.jpg             //板子的封面
│  README.md            
│  setting.dat          //保存的配置，名字啊等等
│  template.py          //我们的脚本
│  tree.txt             //这个目录的大致结构
│  
├─dp
│      线性dp.cpp
│      
├─_MyTemplate
│      init.cpp
│      
├─博弈论
│      sg函数.cpp
│      
├─图论
│  ├─2-sat
│  │      输出字典序最小的解.cpp
│  │      
│  ├─二分图
│  │      匈牙利算法_邻接矩阵实现.cpp
│  │      
│  ├─割点、桥、连通分支
│  │      基本内容.cpp
│  │      
│  ├─差分约束
│  │      差分约束.cpp
│  │      
│  ├─强连通分量
│  │      Kosaraju.cpp
│  │      Tarjan_kuangbin.cpp
│  │      Tarjan_red_bool.cpp
│  │      
│  ├─拓扑排序
│  │      拓扑排序.cpp
│  │      
│  ├─最短路
│  │  └─spfa
│  │          spfa_1_前向星.cpp
│  │          spfa_2_邻接表_good.cpp
│  │          spfa_栈优化.cpp
│  │          
│  └─网络流
│      └─最大流
│              dinic.cpp
│              hlpp.cpp
│              
├─字符串
│      hash.cpp
│      序列自动机.cpp
│      
├─数据结构
│  └─并查集
│          并查集.cpp
│          
├─数论
│  │  常用数论板子.cpp
│  │  
│  ├─中国剩余定理
│  │      中国剩余定理_扩展欧几里得.cpp
│  │      中国剩余定理_模数不保证互质.cpp
│  │      中国剩余定理_逆元.cpp
│  │      
│  ├─大整数_java
│  │      java.cpp
│  │      
│  └─快速幂
│          杜教板子.cpp
│          矩阵快速幂.cpp
│          
├─树
│      线段树.cpp
│      
└─线性基
        线性基.cpp
        
```

可以看到我们需要在一个文件夹下放置脚本程序，板子的封面，以及最重要的就是我们的板子，每一个板子都是 ``.cpp`` 文件，直接将板子扔进去就行了，，

# 脚本

总的脚本是这样的，直接运行就行了，，[原博主](https://blog.csdn.net/Gipsy_Danger/article/details/83311815) 的这个程序貌似只能在 Linux下的python2使用，，所以我做了一些更改，在我的环境下（win10+python3.7）是可以正常使用的，，具体的内容可以看注释

有一个小bug：目录貌似不能显示很多，，，emmmm有时间再改吧，，，

还有编译中间会有一些warning 得手动按回车才能进行下一步

```python
# coding=utf-8
import os
import sys
import json

# tex的头文件，lstset就是板子的样式
TexHead = r"""
\documentclass[twocolumn, a4]{article}
\usepackage[colorlinks,linkcolor=black]{hyperref}
\usepackage{xeCJK}
\usepackage{fancyhdr}
\usepackage{amsmath, amsthm}
\usepackage{listings,xcolor}
\usepackage{geometry}
\usepackage{fontspec} 
\usepackage{graphicx}
\setsansfont{Consolas}
\setmonofont[Mapping={}]{Consolas}
\newcommand{\HRule}{\rule{\linewidth}{0.5mm}}
\geometry{left=2.5cm,right=2.5cm,top=1cm,bottom=1cm}
\lstset{
    language    = c++,
    numbers     = left,
    numberstyle = \tiny,
    breaklines  = true,
    captionpos  = b,
    tabsize     = 4,
    frame       = shadowbox,
    columns     = fullflexible,
    commentstyle = \color[RGB]{0,128,0},
    keywordstyle = \color[RGB]{0,0,255},
    basicstyle   = \normalsize\ttfamily,
    stringstyle  = \color[RGB]{148,0,209}\ttfamily,
    rulesepcolor = \color{red!20!green!20!blue!20},
    showstringspaces = true,
}
"""
 
# 初始化设置，主要是板子的名字等等
def InitSetting():
    try:
        SettingFile = open('setting.dat')
        SettingData = json.load(SettingFile)
        print (u'读取到保存的设置: ')
        for key in SettingData:
            print ('[%s] %s' % (key, SettingData[key]))
        op = input('是否使用已保存的设置？[Y/n]')
        if not op in ['n', 'N', 'no', 'No', 'NO']:
            global TITLE, SCHOOL, TEAM, FILE
            for key in ['TITLE', 'SCHOOL', 'TEAM', 'FILE']:
                globals()[key] = SettingData[key]
        else:
            NewSetting()
    except:
        print (u'读取设置失败')
        NewSetting()
 
 
# 输入信息，保存到本地
def NewSetting():
    global TITLE, SCHOOL, TEAM, FILE
    TITLE = input('请输入标题: ')
    SCHOOL = input('请输入学校: ')
    TEAM = input('请输入队名: ')
    FILE = input('请输入文件名: ')
    Data = dict()
    for key in ['TITLE', 'SCHOOL', 'TEAM', 'FILE']:
        Data[key] = globals()[key]
    json.dump(Data, open('setting.dat', 'w'))
 
# 删除当前目录下的所有中间临时文件
def Clear():
    for suffix in ['aux', 'log', 'toc', 'out']:
        filename = '%s.%s' % (FILE, suffix)
        if os.path.exists(filename):
            os.remove(filename)
 
# 调用两次生成模板来使 .tex 转为 .pdf
def Generate():
    Clear()
    os.system('xelatex %s.tex -quiet' % FILE)
    os.system('xelatex %s.tex -quiet' % FILE)			# 两到三次的生成才能生成目录https://zhidao.baidu.com/question/1541025230634017307.html
    Clear()
    os.system('open %s.pdf' % FILE)
 
# 对每个板子文件进行读取写入
def ReadCpp(file):
    f = open(file, 'r', encoding='UTF-8')
    print (file + ' 2333333333333333333333333333')
    Tex = 0
    TargetFile.write('\\begin{lstlisting}\n')
    for line in f:
        if line[:-1] == '// ---':
            Tex = not Tex
            ToWrite = '\\%s{lstlisting}\n' % ('begin', 'end')[Tex]
            TargetFile.write(ToWrite)
            continue
        TargetFile.write(line[(0, 3)[Tex]:])
    TargetFile.write('\\end{lstlisting}\n')
    f.close()
 
# 读入tex文件
def ReadTex(file):
    f = open(file, 'r')
    for line in f:
        TargetFile.write(line)
    f.close()
 
# 递归遍历当前文件夹下的所有文件
def Search(level, pwd, folder=''):
    ls = os.popen('dir /b "%s"' % pwd).read().split('\n')[:-1]
    for item in ls:
        print (item)
    if folder:
        print (level)
        TargetFile.write(SECTION[level] % folder[0:])
    for item in ls:
        print (item + '2333' + item[:-3])
        item.replace(' ', '\\ ')
        if '.cpp' in item:
            if not item[:2] == '00':
                TargetFile.write(SECTION[level + 1] % item[:-4])
            ReadCpp(pwd + item)
        elif '.tex' in item:
            continue
            if not item[:2] == '00':
                TargetFile.write(SECTION[level + 1] % item[:-4])
            ReadTex(pwd + item)
        elif 'jpg' in item:
            continue
        elif 'md' in item:
            continue
        elif 'dat' in item:
            continue
        elif 'py' in item:
            continue
        elif 'txt' in item:
            continue
        elif 'pdf' in item:
            continue
        else:
            cd = os.popen('cd "%s%s/"' % (pwd, item)).read()
            if 'Not a directory' in cd or 'No such file or directory' in cd:
                print ('[Unknown File] %s/%s' % (pwd, item))
            else:
                Search(level + 1, pwd + item + '/', item)
 
 
if __name__ == '__main__':
    # 全局设置
    TITLE, SCHOOL, TEAM, FILE = '', '', '', ''
    SECTION = ['', '\\clearpage\\section{%s}\n',
               '\\subsection{%s}\n', '\\subsubsection{%s}\n', '\\paragraph{%s}\n', '\\subparagraph{%s}\n']
 
    InitSetting()
    Clear()

    TargetFile = open('%s.tex' % FILE, 'w', encoding='utf-8')
 
    # Output Head File
    TargetFile.write(TexHead)
    TargetFile.write('\\title{%s}\n' % TITLE)
    TargetFile.write('\\author{%s}\n' % TEAM)
    TargetFile.write('\\pagestyle{fancy}\n\\fancyhf{}\n\\fancyhead[C]{%s}\n' % (TITLE))
    TargetFile.write('\\begin{document}\\small\n')
    TargetFile.write('\\begin{titlepage}\n\\begin{center}\n\\vspace*{0.5cm}\\includegraphics[width=0.75\\textwidth]{logo.jpg} \\\\ [2cm]\n')
    TargetFile.write('\\HRule \\\\ [1cm]\n')
    TargetFile.write('\\textbf{\\Huge{%s}} \\\\ [0.5cm]\n' % TITLE)
    TargetFile.write('\\HRule \\\\ [4cm]\n')
    TargetFile.write('\\textbf{\\Huge{%s}} \\\\ [1cm]\n\\LARGE{%s}\n' % (SCHOOL, TEAM))
    TargetFile.write('\\vfill\n\\Large{\\today}\n\\end{center}\n')
    TargetFile.write('\\clearpage\n\end{titlepage}\n')
    TargetFile.write('\\tableofcontents\\clearpage\n')
    TargetFile.write('\\pagestyle{fancy}\n\\lfoot{}\n\\cfoot{\\thepage}\\rfoot{}\n')
    TargetFile.write('\\setcounter{section}{-1}\n\\setcounter{page}{1}\n')
 
    # Search Files
    Search(0, './')
 
    # End Output
    TargetFile.write('\n\\end{document}\n')
    TargetFile.close()
 
    # Gen
    Generate()
```

最后的效果如下；

![](https://img2018.cnblogs.com/blog/1028485/201908/1028485-20190831213235111-1169445063.png)

参考的博客：

[主程序](https://blog.csdn.net/Gipsy_Danger/article/details/83311815)

[latex语法的介绍](https://www.jianshu.com/p/28552706e811)

[latex官网](https://www.overleaf.com/learn/latex/Code_listing#)

[latex的某个大佬的笔记](http://dralpha.altervista.org/zh/tech/tech.htm)

（应该没了吧，，，，end