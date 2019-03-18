---
title: 拯救者Y720-gtx1050-window10-配置tensorflow-gpu环境
date: 2019-03-15 09:14:52
tags:
- Tensorflow
- 环境配置
categories:
- 人脸识别
---


# 概述

因为选修了数字图像这门课，，要做一个人脸识别的项目，和室友打算利用tensorflow来训练一个模型，，然后刚开始的环境配置就折腾了一天，，

现在记录一下大致的流程和遇到的坑，，（只是简略的写写配置的要点，，具体的信息别的博客讲的很清楚了，，，

最后的环境： win10x64 + gtx1050 + CUDA9.0 + cuDNN9.0 + Anaconda + **Tensorflow1.9.0**

英伟达官网你会发现1050不能使用它的CUDA，，但实际上是可以使用的，，后面可以看出算力大概是6.1，，

<!-- more -->


# 配置流程

只列出必要的流程以及我遇到的坑，，

详细的安装过程参考别人的博客：

[Win10+1050Ti配置Tensorflow教程](https://blog.csdn.net/haishiluoshen/article/details/83413568)

[Win10下Tensorflow(GPU版)安装趟坑实录](https://blog.csdn.net/weixin_39290638/article/details/80045236)

[win10搭建tensorflow-gpu环境](https://www.cnblogs.com/wanyu416/p/9536853.html)

[tensorflow 安装GPU版本，个人总结，步骤比较详细](https://blog.csdn.net/gangeqian2/article/details/79358543)

[在Windows 10上安装TensorFlow并支持GPU的最佳方式（无需安装CUDA](https://blog.csdn.net/cxy7228484/article/details/84185412)

[Win10+cuda8.0+cudnn5.1+tensorflow-gpu1.2.0+gtx1050ti，tensorflow环境搭建与配置](https://blog.csdn.net/angzhangzhang123/article/details/79637346)

[tensorflow 使用CPU而不使用GPU的问题解决](https://www.cnblogs.com/hutao722/p/9583214.html)

## Python配置

首先是Python的配置，，Python很简单就可以弄好了，，去[官网](https://www.python.org/downloads/)下载win的安装器，，点一点等一等就行了，，

## Anaconda安装

这个也是直接去官网下载安装就行了，，，安装的过程可能会很长，，所以要一直等，，会出现终端，，不要叉掉，，等就可以了，，，（貌似这玩意儿2个多G

## CUDA9.0安装

[CUDA9.0下载地址](https://developer.nvidia.com/cuda-90-download-archive)


这是一个大坑！！！被这玩意坑了一次，，，

首先，英伟达的官网你直接进去去下CUDA只显示最新版10.1，，，然后我就想着有新的就直接上新版本的算了，，，后来才发现Tensorflow到现在还不支持10.0的版本，，，最多只能用9.0的，，

还有一个坑，，，选择的安装器是第一个(Base Installer)还有选择在线安装(exe(Network))，，，

最后，，因为我的C盘不怎么空余了，，，所以就把这玩意装到了别的盘，，这样的话 **系统环境变量** 得重新修改，，

[参考博客1](https://www.cnblogs.com/wanyu416/p/9536853.html)

[参考博客2](https://blog.csdn.net/angzhangzhang123/article/details/79637346)

都可以


## cuDNN v7.5.0 for CUDA 9.0

这玩意也是一个坑，，，

因为CUDA安装的是9.0版本的，，所以这玩意也只能装对应的版本，，，

[下载地址](https://developer.nvidia.com/rdp/cudnn-download)

会要你注册账号，，最主要的是10.0版本的可以直接下载，，换成9.0的就得要梯子，，，惊了，，，

下载好后解压，，把里面的那三个文件复制到cuda对应的文件夹里，，参考上面那几个博客的操作

## vs2017

看到网上有人说配置环境需要vs来编译什么的，，，因为我在之前就已经装好了vs2017，，所以就省略了这一步的安装，，没有测试不装会发生什么，，

## 安装Tensorflow-gpu--1.9.0 并测试

之前的所有东西都弄好后就可以安装 Tensorflow 了，，，

打开 Anaconda Prompt 

因为地下室这里网还不错，，所以就没有去配置清华的镜像，，

安装Tensorflow: ``conda install tensorflow-gpu==1.9.0`` 因为现在(2019-3-15)Tensorflow已经是1.13.0版本了，，直接安装的话就会是最新版，，，不知道怎么回事，，最新版的话我这里在之后不会调用gpu来运行，，用这个版本之后就可以了（CUDA的锅？），，（也有可能是我在改变了其它的因素的原因，，，待验证

~~创建运行环境； ``conda create -n tensorflow-gpu python=3.6`` 等待安装就行了，，~~

激活环境： ``conda activate tensorflow-gpu``

## 验证

然后打开python，，

### 输入：

```python
import tensorflow as tf         //0
hello = tf.constant('hello')
sess = tf.Session()             //1
print(sess.run(hello))          //2
sess.close()
```

+ 在输完0代码之后，会停顿一会，，
+ 在输完1代码之后，会显示一些信息，，如果说有有关gpu的信息的话证明调用gpu成功，，否则的话只有一条cpu的信息，，可能之前的安装有问题，，重新安装试试，，（我就是因为这个重装了好几遍
+ 在输完2代码之后，显示 ``b'hello'``

1的输出类似这样：

```js
2019-03-15 13:03:55.881573: I C:\users\nwani\_bazel_nwani\ujdkfsks\execroot\org_tensorflow\tensorflow\core\platform\cpu_feature_guard.cc:141] Your CPU supports instructions that this TensorFlow binary was not compiled to use: AVX AVX2
2019-03-15 13:03:56.695820: I C:\users\nwani\_bazel_nwani\ujdkfsks\execroot\org_tensorflow\tensorflow\core\common_runtime\gpu\gpu_device.cc:1392] Found device 0 with properties:
name: GeForce GTX 1050 major: 6 minor: 1 memoryClockRate(GHz): 1.493
pciBusID: 0000:01:00.0
totalMemory: 2.00GiB freeMemory: 1.61GiB
2019-03-15 13:03:56.702429: I C:\users\nwani\_bazel_nwani\ujdkfsks\execroot\org_tensorflow\tensorflow\core\common_runtime\gpu\gpu_device.cc:1471] Adding visible gpu devices: 0
2019-03-15 13:03:57.517589: I C:\users\nwani\_bazel_nwani\ujdkfsks\execroot\org_tensorflow\tensorflow\core\common_runtime\gpu\gpu_device.cc:952] Device interconnect StreamExecutor with strength 1 edge matrix:
2019-03-15 13:03:57.521414: I C:\users\nwani\_bazel_nwani\ujdkfsks\execroot\org_tensorflow\tensorflow\core\common_runtime\gpu\gpu_device.cc:958]      0
2019-03-15 13:03:57.523379: I C:\users\nwani\_bazel_nwani\ujdkfsks\execroot\org_tensorflow\tensorflow\core\common_runtime\gpu\gpu_device.cc:971] 0:   N
2019-03-15 13:03:57.525486: I C:\users\nwani\_bazel_nwani\ujdkfsks\execroot\org_tensorflow\tensorflow\core\common_runtime\gpu\gpu_device.cc:1084] Created TensorFlow device (/job:localhost/replica:0/task:0/device:GPU:0 with 1359 MB memory) -> physical GPU (device: 0, name: GeForce GTX 1050, pci bus id: 0000:01:00.0, compute capability: 6.1)
```

![](https://img2018.cnblogs.com/blog/1028485/201903/1028485-20190315134928264-735455793.png)

### [也可以这样验证：](https://www.cnblogs.com/hutao722/p/9583214.html)

```python
from tensorflow.python.client import device_lib
print(device_lib.list_local_devices())
```

会输出一长条的信息，，例如：

```js
>>> from tensorflow.python.client import device_lib
>>> print(device_lib.list_local_devices())
2019-03-15 13:13:03.527577: I C:\users\nwani\_bazel_nwani\ujdkfsks\execroot\org_tensorflow\tensorflow\core\common_runtime\gpu\gpu_device.cc:1471] Adding visible gpu devices: 0
2019-03-15 13:13:03.545230: I C:\users\nwani\_bazel_nwani\ujdkfsks\execroot\org_tensorflow\tensorflow\core\common_runtime\gpu\gpu_device.cc:952] Device interconnect StreamExecutor with strength 1 edge matrix:
2019-03-15 13:13:03.563464: I C:\users\nwani\_bazel_nwani\ujdkfsks\execroot\org_tensorflow\tensorflow\core\common_runtime\gpu\gpu_device.cc:958]      0 
2019-03-15 13:13:03.576112: I C:\users\nwani\_bazel_nwani\ujdkfsks\execroot\org_tensorflow\tensorflow\core\common_runtime\gpu\gpu_device.cc:971] 0:   N 
2019-03-15 13:13:03.587662: I C:\users\nwani\_bazel_nwani\ujdkfsks\execroot\org_tensorflow\tensorflow\core\common_runtime\gpu\gpu_device.cc:1084] Created TensorFlow device (/device:GPU:0 with 1359 MB memory) -> physical GPU (device: 0, name: GeForce GTX 1050, pci bus id: 0000:01:00.0, compute capability: 6.1)
[name: "/device:CPU:0"
device_type: "CPU"
memory_limit: 268435456
locality {
}
incarnation: 5406329819980989395
, name: "/device:GPU:0"
device_type: "GPU"
memory_limit: 1425578393
locality {
  bus_id: 1
  links {
  }
}
incarnation: 3552327620198962820
physical_device_desc: "device: 0, name: GeForce GTX 1050, pci bus id: 0000:01:00.0, compute capability: 6.1"
]
```

![](https://img2018.cnblogs.com/blog/1028485/201903/1028485-20190315134949105-834049286.png)

如果失败的话（也就是只有cpu运算）就是这样：

```js
[name: "/device:CPU:0"
device_type: "CPU"
memory_limit: 268435456
locality {
}
```

### [再或者这样：](https://blog.csdn.net/gangeqian2/article/details/79358543)

```python
import tensorflow as tf
a = tf.constant([1.0, 2.0], name="a")
b = tf.constant([2.0, 3.0], name="b")
result = a + b
print(result)

sess = tf.InteractiveSession()
print(result.eval())
sees.close()
```

正常情况下也会显示gpu等信息

```js
>>> import tensorflow as tf
>>> a = tf.constant([1.0, 2.0], name="a")
>>> b = tf.constant([2.0, 3.0], name="b")
>>> result = a + b
>>> print(result)
Tensor("add_1:0", shape=(2,), dtype=float32)
>>> sess = tf.InteractiveSession()
2019-03-15 13:19:57.500304: I C:\users\nwani\_bazel_nwani\ujdkfsks\execroot\org_tensorflow\tensorflow\core\common_runtime\gpu\gpu_device.cc:1471] Adding visible gpu devices: 0
2019-03-15 13:19:57.514303: I C:\users\nwani\_bazel_nwani\ujdkfsks\execroot\org_tensorflow\tensorflow\core\common_runtime\gpu\gpu_device.cc:952] Device interconnect StreamExecutor with strength 1 edge matrix:
2019-03-15 13:19:57.530082: I C:\users\nwani\_bazel_nwani\ujdkfsks\execroot\org_tensorflow\tensorflow\core\common_runtime\gpu\gpu_device.cc:958]      0 
2019-03-15 13:19:57.539267: I C:\users\nwani\_bazel_nwani\ujdkfsks\execroot\org_tensorflow\tensorflow\core\common_runtime\gpu\gpu_device.cc:971] 0:   N 
2019-03-15 13:19:57.547441: I C:\users\nwani\_bazel_nwani\ujdkfsks\execroot\org_tensorflow\tensorflow\core\common_runtime\gpu\gpu_device.cc:1084] Created TensorFlow device (/job:localhost/replica:0/task:0/device:GPU:0 with 1359 MB memory) -> physical GPU (device: 0, name: GeForce GTX 1050, pci bus id: 0000:01:00.0, compute capability: 6.1)
>>> print(result.eval())
[3. 5.]
```

# 使用

每次使用tensorflow时，，因为我们是在Anaconda的虚拟的一个环境里运行tensorflow+python，，所以要先激活环境：``conda activate tensorflow-gpu``，，，（这么说先前直接安装的python不仅版本过高，，而且没用上）

对了必须要在cmd里使用，，powershell貌似不行，，，进入powershell输入 ``cmd`` 切换到cmd就行了，，，激活环境后前面会多一个环境名： ``(tensorflow-gpu)``，，这样再进入python等等，，，

# 结束

这样环境的配置基本就完了，，大概占了12个多G的存储空间，，，emmmm心疼硬盘ing

从昨天晚上到今天上午，，折腾了几遍，，，最后还是弄好了，，，最怕的不是出各种各样的错误，，而是放弃吧，，，毕竟很多人都在弄这个，，会遇到一样的状况，，总会找到解决的方法的，，，

(猜测：安装anaconda时，，发现里面有cuda了，，可能不需要安装cuda就可以，，留坑)
(end)