---
title: acm
date: 2018-12-13 21:06:20
---
//todo：实现调用别人的爬虫来显示自己在各个oj上的题量

[这个网站的](http://new.npuacm.info/api/crawlers/codeforces/31415926535x)






<!-- more -->

<div>
    
</div>

<script type="text/javascript" src="https://new.npuacm.info/swagger/">
    
    var xmlhttp = new XMLHttpRequest();
    var type = "hdu";//获取html表单中adminName输入域对象的值，既账号
    var username = "31415926535x";//获取html表单中pwd输入域对象的值，既密码          

    function(){
        var solved = resultJson.solved;//获取json中的solved键对应的值
        var submissions = resultJson.submissions;//获取json中的submissions键对应的值
        solved;
        submissions;
    } 
    xmlhttp.open("GET","control1/login",true);//以GET方式请求该接口
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");//添加Content-type
    xmlhttp.send("type"+type+"username="+username);//发送请求参数间用&分割
</script>