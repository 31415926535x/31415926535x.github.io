---
title: count
date: 2018-02-27 13:49:29
---

<script src="https://cdn1.lncld.net/static/js/av-core-mini-0.6.1.js"></script>
<script>AV.initialize("", "");</script> //需要写上leancloud的key
<script type="text/javascript">
  var time=0
  var title=""
  var url=""
  var query = new AV.Query('Counter');//表名
  query.notEqualTo('id',0); //id不为0的结果
  query.descending('time'); //结果按阅读次数降序排序
  query.limit(20);  //最终只返回10条结果
  query.find().then(function (todo) {
    for (var i=0;i<10;i++){ 
      var result=todo[i].attributes;
      time=result.time;  //阅读次数
      title=result.title; //文章标题
      url=result.url;     //文章url
      var content="<p>"+"<font color='#0477ab'>"+"【阅读次数:"+time+"】"+"<a href='"+"http://thief.one"+url+"'>"+title+"</font>"+"</a>"+"</p>";
      // document.write("<a href='"+"http://thief.one/"+url+"'>"+title+"</a>"+"    Readtimes:"+time+"<br>");
      document.getElementById("heheda").innerHTML+=content
    }
  }, function (error) {
    console.log("error");
  });
</script>