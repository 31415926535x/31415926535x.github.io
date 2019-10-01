---
title: anaconda3下配置python-3.5+tensorflow-gpu-1.9.0人脸识别项目环境
date: 2019-03-29 09:28:20
tags:
- Tensorflow
- anaconda3
- 环境配置
categories:
- 人脸识别
---

之前为了配置tensorflow-gpu的环境又是装cuda,又是装cudnn，还有tensoflow-gpu等等，，因为当时也是第一次搭建这个环境，所以完全是按照别人的搭建方法来一步一步的弄得，，后来我在给室友安装环境的时候，发现cuda,cudnn什么的完全不用自己安装，，，全部交给 **anaconda3** （好东西）就行了

<!-- more -->

# Anaconda3安装

几乎最后所有的东西都是用这个完成的，，所以先去安装这玩意，，

直接官网下载就行了，，安装的时候记得选择 **PATH** 配置，，不然之后还得自己去弄环境变量，，

然后在 powershell 里检查一下确实配置成功就行了 ``conda -V``

# 配置一个环境

因为我的电脑是 win10x64+gtx1050，，所以选择安装 tensorflow-gpu-1.9.0版的，，gpu版的到时候训练模型的时候跑的很快，，（大概1s2-3张照片吧），如果用cpu跑的话有些慢，，1张照片可能要2s左右，，，

打开powsershell，，（千万不要换源，，千万不要换源，，千万不要换源，，

## 创建一个环境

```js
conda create -n [name] python=3.5 tensorflow-gpu=1.9.0
```

可能这一步会很慢，，但是建议不要去换源，，因为会出现下的东西不全，最后可能不能使用gpu版的tensorflow，，，

输完这段命令后，，等一会会出现一些要安装的东西列表，，这时主要看一下有没有python, **tensorflow-gpu**, **cudnn**, **cudatoolkit**,,,都有的话就y确定等就行了，，，

环境的名字随便起，，

## 激活环境

因为这时是powershell下，，，激活环境会不成功，，所以直接切换到cmd模式就行了，，输 ``cmd``，，，

```js
activate [name]
```

这时会发现前面多了一个 ``([name])`` 的东西，表示激活环境成功，，，

然后再测试一下python下能不能调用 tensorflow-gpu 版，，测试的方法可以参考我的上一篇博客里后面那一部分内容 ，，，

## 运行简单的人脸识别的实例

前面的准备工作弄好之后就可以运行一个简单的实例看一下在这个环境下的运行情况，，，

下面的python程序是学长给我的，，然后我发现学长的程序是[这个博主写的项目](https://www.cnblogs.com/mu---mu/p/FaceRecognition-tensorflow.html)，，其中也有我的一些改动，，下面会提到，，

下面的操作都是在刚刚创建的环境下操作的，，，否则的话会是anaconda3默认的base环境下，，，

### 安装必备的库

因为这个人脸识别的实现用到了 opencv, dlib等等，，所以先安装这些，，

#### 安装opencv

```js
conda install opencv
```

#### 安装dlib

这个玩意的安装有点坑，，有时貌似直接安装会安装不上，，会提示没有 ``cmake`` 这个包管理软件，，所以要先安装cmake，，建议是在anaconda3主程序（开始菜单里找 Anaconda Navigator）中找到你的那个环境，，然后再 uninstall 中找到 cmake 然后安装，，，

但是这样可能还是安装不了dlib，，无论是用conda还是pip安装，，

```js
conda install dlib
pip install dlib
```

后来我找到一个解决方法，，去下载 ``dlib****.whl`` 然后本地安装，，

[下载地址](https://pypi.org/project/dlib/19.1.0/#files)

再 DownloadFiles 中找到一个这个东西，，
``dlib-19.1.0-cp35-cp35m-win_amd64.whl ``

然后放到你现在的路径下，，``pip install dlib-19.1.0-cp35-cp35m-win_amd64.whl``

应该这样就可以安装上了dlib，，，当然你可以用其他的方法安装，，网上也有很多解决方法，，，也有可能直接用 pip 就能安装上（比如我的电脑就能，，室友的就会出现上面的错误，，得绕一个弯子）

#### 安装sklearn

这个简单，，会在训练那一步用到

``pip install sklearn``

### 运行实例

[那个博主的项目分为4个部分，](https://www.cnblogs.com/mu---mu/p/FaceRecognition-tensorflow.html)

+ get_my_faces.py: 获取人脸并识别出来裁剪出来作为元数据
+ set_other_faces.py: 获取14000张人脸的照片作为训练所要用的数据
+ train_faces.py: 训练模型
+ is_my_face.py: 实时获取人脸，并判断是否和第一步所录入的人脸相匹配

#### get_my_faces

这一步可以使用 dlib 的人脸识别裁剪，也可以使用opencv自带的来使用，，和室友试验了一下，发现opencv的虽然相对较快，但是识别不佳，而且同样大小的视频最后生成的照片个数也很少（也有可能是那里没写好），，

原博主的程序是拍一张照片然后识别一张裁剪一张，，这样很慢，，所以我把它改成了录一段视频，然后对于每一帧来识别裁剪，，这样贼快，，，（按q退出录制后自动进行后面的内容

注意复制代码后要适当的改一些参数，，比如说opencv中hear的参数等等

```python
import cv2
import os
import dlib
import sys
import random
import shutil

 
 
def make_video():
    # 录制视频
    shutil.rmtree('./my_faces')
    """使用opencv录像"""
    cap = cv2.VideoCapture(0)  # 默认的摄像头
    # 指定视频代码
    fourcc = cv2.VideoWriter_fourcc(*"DIVX")
    out = cv2.VideoWriter('233.avi', fourcc, 20.0, (640,480))
    while(cap.isOpened()):
        ret, frame = cap.read()
        if ret:
            out.write(frame)
            #
            cv2.imshow('frame',frame)
            # 等待按键q操作关闭摄像头
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        else:
            break
    cap.release()
    out.release()
    cv2.destroyAllWindows()




# 改变图片的亮度与对比度
def relight(img, light=1, bias=0):
    w = img.shape[1]
    h = img.shape[0]
    #image = []
    for i in range(0,w):
        for j in range(0,h):
            for c in range(3):
                tmp = int(img[j,i,c]*light + bias)
                if tmp > 255:
                    tmp = 255
                elif tmp < 0:
                    tmp = 0
                img[j,i,c] = tmp
    return img

def hhh():
    # 利用dlib来实现
    output_dir = './my_faces'
    size = 64

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    #使用dlib自带的frontal_face_detector作为我们的特征提取器
    detector = dlib.get_frontal_face_detector()
    # 打开摄像头 参数为输入流，可以为摄像头或视频文件
    #camera = cv2.VideoCapture(0)
    camera = cv2.VideoCapture("233.avi")

    index = 1
    while True:
        if (index <= 10000):
            print('Being processed picture %s' % index)
            # 从摄像头读取照片
            success, img = camera.read()
            # 转为灰度图片
            gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            # 使用detector进行人脸检测
            dets = detector(gray_img, 1)

            if success == False:
                break

            for i, d in enumerate(dets):
                x1 = d.top() if d.top() > 0 else 0
                y1 = d.bottom() if d.bottom() > 0 else 0
                x2 = d.left() if d.left() > 0 else 0
                y2 = d.right() if d.right() > 0 else 0

                face = img[x1:y1,x2:y2]
                # 调整图片的对比度与亮度， 对比度与亮度值都取随机数，这样能增加样本的多样性
                face = relight(face, random.uniform(0.5, 1.5), random.randint(-50, 50))

                face = cv2.resize(face, (size,size))

                cv2.imshow('image', face)

                cv2.imwrite(output_dir+'/'+str(index)+'.jpg', face)

                index += 1
            key = cv2.waitKey(30) & 0xff
            if key == 27:
                break
        else:
            print('Finished!')
            break



def hhhh():
    # 利用opencv来实现
    output_dir = './my_faces'
    size = 64
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)                                 
    # 获取分类器
    haar = cv2.CascadeClassifier(r'G:\DIP\Anaconda3\envs\test1\Library\etc\haarcascades\haarcascade_frontalface_default.xml')

    # 打开摄像头 参数为输入流，可以为摄像头或视频文件
    camera = cv2.VideoCapture("233.avi")

    n = 1
    while 1:
        if (n <= 10000):
            print('It`s processing %s image.' % n)
            # 读帧
            success, img = camera.read()

            gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            faces = haar.detectMultiScale(gray_img, 1.3, 5)
            for f_x, f_y, f_w, f_h in faces:
                face = img[f_y:f_y+f_h, f_x:f_x+f_w]
                face = cv2.resize(face, (64,64))
                '''
                if n % 3 == 1:
                    face = relight(face, 1, 50)
                elif n % 3 == 2:
                    face = relight(face, 0.5, 0)
                '''
                face = relight(face, random.uniform(0.5, 1.5), random.randint(-50, 50))
                cv2.imshow('img', face)
                cv2.imwrite(output_dir+'/'+str(n)+'.jpg', face)
                n+=1
            key = cv2.waitKey(30) & 0xff
            if key == 27:
                break
        else:
            break

if __name__ == '__main__':
    make_video()
    hhh()
```

#### set_other_faces

这一步主要是识别裁剪那堆别人的照片

[先去下那一堆照片](:http://vis-www.cs.umass.edu/lfw/lfw.tgz)，，然后解压，重命名为 ``input_img`` （只是验证一下整个项目的效果的话可以删去一半的照片，，不然可能得跑个10分钟左右，，，


```python
# -*- codeing: utf-8 -*-
import sys
import os
import cv2
import dlib

input_dir = './input_img'
output_dir = './other_faces'
size = 64

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

#使用dlib自带的frontal_face_detector作为我们的特征提取器
detector = dlib.get_frontal_face_detector()

index = 1
for (path, dirnames, filenames) in os.walk(input_dir):
    for filename in filenames:
        if filename.endswith('.jpg'):
            print('Being processed picture %s' % index)
            img_path = path+'/'+filename
            # 从文件读取图片
            img = cv2.imread(img_path)
            # 转为灰度图片
            gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            # 使用detector进行人脸检测 dets为返回的结果
            dets = detector(gray_img, 1)

            #使用enumerate 函数遍历序列中的元素以及它们的下标
            #下标i即为人脸序号
            #left：人脸左边距离图片左边界的距离 ；right：人脸右边距离图片左边界的距离 
            #top：人脸上边距离图片上边界的距离 ；bottom：人脸下边距离图片上边界的距离
            for i, d in enumerate(dets):
                x1 = d.top() if d.top() > 0 else 0
                y1 = d.bottom() if d.bottom() > 0 else 0
                x2 = d.left() if d.left() > 0 else 0
                y2 = d.right() if d.right() > 0 else 0
                # img[y:y+h,x:x+w]
                face = img[x1:y1,x2:y2]
                # 调整图片的尺寸
                face = cv2.resize(face, (size,size))
                cv2.imshow('image',face)
                # 保存图片
                cv2.imwrite(output_dir+'/'+str(index)+'.jpg', face)
                index += 1

            key = cv2.waitKey(30) & 0xff
            if key == 27:
                sys.exit(0)
```

#### train_faces

这一步就是训练模型，，，刚开始会卡顿一会，，，之后就会跑起来，，，看一下是不是gpu跑，，cpu的话贼慢，，，gpu的话不到一分钟左右就可以了，，，

```python
import tensorflow as tf
import cv2
import numpy as np
import os
import random
import sys
from sklearn.model_selection import train_test_split

my_faces_path = './my_faces'
other_faces_path = './other_faces'
size = 64

imgs = []
labs = []

def getPaddingSize(img):
    h, w, _ = img.shape
    top, bottom, left, right = (0,0,0,0)
    longest = max(h, w)

    if w < longest:
        tmp = longest - w
        # //表示整除符号
        left = tmp // 2
        right = tmp - left
    elif h < longest:
        tmp = longest - h
        top = tmp // 2
        bottom = tmp - top
    else:
        pass
    return top, bottom, left, right

def readData(path , h=size, w=size):
    for filename in os.listdir(path):
        if filename.endswith('.jpg'):
            filename = path + '/' + filename

            img = cv2.imread(filename)

            top,bottom,left,right = getPaddingSize(img)
            # 将图片放大， 扩充图片边缘部分
            img = cv2.copyMakeBorder(img, top, bottom, left, right, cv2.BORDER_CONSTANT, value=[0,0,0])
            img = cv2.resize(img, (h, w))

            imgs.append(img)
            labs.append(path)

readData(my_faces_path)
readData(other_faces_path)
# 将图片数据与标签转换成数组
imgs = np.array(imgs)
labs = np.array([[0,1] if lab == my_faces_path else [1,0] for lab in labs])
# 随机划分测试集与训练集
train_x,test_x,train_y,test_y = train_test_split(imgs, labs, test_size=0.05, random_state=random.randint(0,100))
# 参数：图片数据的总数，图片的高、宽、通道
train_x = train_x.reshape(train_x.shape[0], size, size, 3)
test_x = test_x.reshape(test_x.shape[0], size, size, 3)
# 将数据转换成小于1的数
train_x = train_x.astype('float32')/255.0
test_x = test_x.astype('float32')/255.0

print('train size:%s, test size:%s' % (len(train_x), len(test_x)))
# 图片块，每次取100张图片
batch_size = 100
num_batch = len(train_x) // batch_size

x = tf.placeholder(tf.float32, [None, size, size, 3])
y_ = tf.placeholder(tf.float32, [None, 2])

keep_prob_5 = tf.placeholder(tf.float32)
keep_prob_75 = tf.placeholder(tf.float32)

def weightVariable(shape):
    init = tf.random_normal(shape, stddev=0.01)
    return tf.Variable(init)

def biasVariable(shape):
    init = tf.random_normal(shape)
    return tf.Variable(init)

def conv2d(x, W):
    return tf.nn.conv2d(x, W, strides=[1,1,1,1], padding='SAME')

def maxPool(x):
    return tf.nn.max_pool(x, ksize=[1,2,2,1], strides=[1,2,2,1], padding='SAME')

def dropout(x, keep):
    return tf.nn.dropout(x, keep)

def cnnLayer():
    # 第一层
    W1 = weightVariable([3,3,3,32]) # 卷积核大小(3,3)， 输入通道(3)， 输出通道(32)
    b1 = biasVariable([32])
    # 卷积
    conv1 = tf.nn.relu(conv2d(x, W1) + b1)
    # 池化
    pool1 = maxPool(conv1)
    # 减少过拟合，随机让某些权重不更新
    drop1 = dropout(pool1, keep_prob_5)

    # 第二层
    W2 = weightVariable([3,3,32,64])
    b2 = biasVariable([64])
    conv2 = tf.nn.relu(conv2d(drop1, W2) + b2)
    pool2 = maxPool(conv2)
    drop2 = dropout(pool2, keep_prob_5)

    # 第三层
    W3 = weightVariable([3,3,64,64])
    b3 = biasVariable([64])
    conv3 = tf.nn.relu(conv2d(drop2, W3) + b3)
    pool3 = maxPool(conv3)
    drop3 = dropout(pool3, keep_prob_5)

    # 全连接层
    Wf = weightVariable([8*8*64, 512])
    bf = biasVariable([512])
    drop3_flat = tf.reshape(drop3, [-1, 8*8*64])
    dense = tf.nn.relu(tf.matmul(drop3_flat, Wf) + bf)
    dropf = dropout(dense, keep_prob_75)

    # 输出层
    Wout = weightVariable([512,2])
    bout = biasVariable([2])
    #out = tf.matmul(dropf, Wout) + bout
    out = tf.add(tf.matmul(dropf, Wout), bout)
    return out

def cnnTrain():
    out = cnnLayer()

    cross_entropy = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(logits=out, labels=y_))

    train_step = tf.train.AdamOptimizer(0.01).minimize(cross_entropy)
    # 比较标签是否相等，再求的所有数的平均值，tf.cast(强制转换类型)
    accuracy = tf.reduce_mean(tf.cast(tf.equal(tf.argmax(out, 1), tf.argmax(y_, 1)), tf.float32))
    # 将loss与accuracy保存以供tensorboard使用
    tf.summary.scalar('loss', cross_entropy)
    tf.summary.scalar('accuracy', accuracy)
    merged_summary_op = tf.summary.merge_all()
    # 数据保存器的初始化
    saver = tf.train.Saver()

    with tf.Session() as sess:

        sess.run(tf.global_variables_initializer())

        summary_writer = tf.summary.FileWriter('./tmp', graph=tf.get_default_graph())

        for n in range(10):
             # 每次取128(batch_size)张图片
            for i in range(num_batch):
                batch_x = train_x[i*batch_size : (i+1)*batch_size]
                batch_y = train_y[i*batch_size : (i+1)*batch_size]
                # 开始训练数据，同时训练三个变量，返回三个数据
                _,loss,summary = sess.run([train_step, cross_entropy, merged_summary_op],
                                           feed_dict={x:batch_x,y_:batch_y, keep_prob_5:0.5,keep_prob_75:0.75})
                summary_writer.add_summary(summary, n*num_batch+i)
                # 打印损失
                print(n*num_batch+i, loss)

                if (n*num_batch+i) % 100 == 0:
                    # 获取测试数据的准确率
                    acc = accuracy.eval({x:test_x, y_:test_y, keep_prob_5:1.0, keep_prob_75:1.0})
                    print(n*num_batch+i, acc)
                    # 准确率大于0.98时保存并退出
                    if acc > 0.98 and n > 2:
                        saver.save(sess, './train_faces.model', global_step=n*num_batch+i)
                        sys.exit(0)
        print('accuracy less 0.98, exited!')

cnnTrain()
```


#### is_my_face

最后就是识别了，，，运行这个会出现两个窗口，一个是实时的拍摄窗口，一个是识别的窗口（会出现蓝色的框，，，

然后如果识别出来是之前录入的那个人的话，，cmd里会出现True的字样，，否则是False，，，如果没有识别出来有人脸在画面里的话会卡住不动，，，

大概之前录的时间是2-3分钟左右的准确度就很高了，，

```python
import tensorflow as tf
import cv2
import dlib
import numpy as np
import os
import random
import sys
import time
from sklearn.model_selection import train_test_split

my_faces_path = './my_faces'
other_faces_path = './other_faces'
size = 64

imgs = []
labs = []

def getPaddingSize(img):
    h, w, _ = img.shape
    top, bottom, left, right = (0,0,0,0)
    longest = max(h, w)

    if w < longest:
        tmp = longest - w
        # //表示整除符号
        left = tmp // 2
        right = tmp - left
    elif h < longest:
        tmp = longest - h
        top = tmp // 2
        bottom = tmp - top
    else:
        pass
    return top, bottom, left, right

def readData(path , h=size, w=size):
    for filename in os.listdir(path):
        if filename.endswith('.jpg'):
            filename = path + '/' + filename

            img = cv2.imread(filename)

            top,bottom,left,right = getPaddingSize(img)
            # 将图片放大， 扩充图片边缘部分
            img = cv2.copyMakeBorder(img, top, bottom, left, right, cv2.BORDER_CONSTANT, value=[0,0,0])
            img = cv2.resize(img, (h, w))

            imgs.append(img)
            labs.append(path)

readData(my_faces_path)
readData(other_faces_path)
# 将图片数据与标签转换成数组
imgs = np.array(imgs)
labs = np.array([[0,1] if lab == my_faces_path else [1,0] for lab in labs])
# 随机划分测试集与训练集
train_x,test_x,train_y,test_y = train_test_split(imgs, labs, test_size=0.05, random_state=random.randint(0,100))
# 参数：图片数据的总数，图片的高、宽、通道
train_x = train_x.reshape(train_x.shape[0], size, size, 3)
test_x = test_x.reshape(test_x.shape[0], size, size, 3)
# 将数据转换成小于1的数
train_x = train_x.astype('float32')/255.0
test_x = test_x.astype('float32')/255.0

print('train size:%s, test size:%s' % (len(train_x), len(test_x)))
# 图片块，每次取128张图片
batch_size = 128
num_batch = len(train_x) // 128

x = tf.placeholder(tf.float32, [None, size, size, 3])
y_ = tf.placeholder(tf.float32, [None, 2])

keep_prob_5 = tf.placeholder(tf.float32)
keep_prob_75 = tf.placeholder(tf.float32)

def weightVariable(shape):
    init = tf.random_normal(shape, stddev=0.01)
    return tf.Variable(init)

def biasVariable(shape):
    init = tf.random_normal(shape)
    return tf.Variable(init)

def conv2d(x, W):
    return tf.nn.conv2d(x, W, strides=[1,1,1,1], padding='SAME')

def maxPool(x):
    return tf.nn.max_pool(x, ksize=[1,2,2,1], strides=[1,2,2,1], padding='SAME')

def dropout(x, keep):
    return tf.nn.dropout(x, keep)

def cnnLayer():
    # 第一层
    W1 = weightVariable([3,3,3,32]) # 卷积核大小(3,3)， 输入通道(3)， 输出通道(32)
    b1 = biasVariable([32])
    # 卷积
    conv1 = tf.nn.relu(conv2d(x, W1) + b1)
    # 池化
    pool1 = maxPool(conv1)
    # 减少过拟合，随机让某些权重不更新
    drop1 = dropout(pool1, keep_prob_5)

    # 第二层
    W2 = weightVariable([3,3,32,64])
    b2 = biasVariable([64])
    conv2 = tf.nn.relu(conv2d(drop1, W2) + b2)
    pool2 = maxPool(conv2)
    drop2 = dropout(pool2, keep_prob_5)

    # 第三层
    W3 = weightVariable([3,3,64,64])
    b3 = biasVariable([64])
    conv3 = tf.nn.relu(conv2d(drop2, W3) + b3)
    pool3 = maxPool(conv3)
    drop3 = dropout(pool3, keep_prob_5)

    # 全连接层
    Wf = weightVariable([8*16*32, 512])
    bf = biasVariable([512])
    drop3_flat = tf.reshape(drop3, [-1, 8*16*32])
    dense = tf.nn.relu(tf.matmul(drop3_flat, Wf) + bf)
    dropf = dropout(dense, keep_prob_75)

    # 输出层
    Wout = weightVariable([512,2])
    bout = biasVariable([2])
    out = tf.add(tf.matmul(dropf, Wout), bout)
    return out

output = cnnLayer()  
predict = tf.argmax(output, 1)  
   
saver = tf.train.Saver()  
sess = tf.Session()  
saver.restore(sess, tf.train.latest_checkpoint('.'))   
   
def is_my_face(image):  
    res = sess.run(predict, feed_dict={x: [image/255.0], keep_prob_5:1.0, keep_prob_75: 1.0})  
    if res[0] == 1:  
        return True  
    else:  
        return False  

#使用dlib自带的frontal_face_detector作为我们的特征提取器
detector = dlib.get_frontal_face_detector()

cam = cv2.VideoCapture(0)  
   
while True:  
    time.sleep(0.2) 
    _, img = cam.read()  
    gray_image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    dets = detector(gray_image, 1)
    if not len(dets):
        #print('Can`t get face.')
        cv2.imshow('img', img)
        key = cv2.waitKey(30) & 0xff  
        if key == 27:
            sys.exit(0)
            
    for i, d in enumerate(dets):
        x1 = d.top() if d.top() > 0 else 0
        y1 = d.bottom() if d.bottom() > 0 else 0
        x2 = d.left() if d.left() > 0 else 0
        y2 = d.right() if d.right() > 0 else 0
        face = img[x1:y1,x2:y2]
        # 调整图片的尺寸
        face = cv2.resize(face, (size,size))
        print('Is this my face? %s' % is_my_face(face))

        cv2.rectangle(img, (x2,x1),(y2,y1), (255,0,0),3)
        cv2.imshow('image',img)
        key = cv2.waitKey(30) & 0xff
        if key == 27:
            sys.exit(0)
  
sess.close() 
```

# 感想

后面就没了，，建议弄过一个遍之后，代码还是自己再重写一别吧，，这样能理解里面的细节的内容，，，

装了4、5遍多的环境感觉每一次都有收获，，虽然每次都会遇到一些问题，，但是都也能靠自己来解决，，，hhh，，，

(end)