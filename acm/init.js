// var http = require('https');
// data = '';
// http.get('https://new.npuacm.info/api/crawlers/', function(res){
//     console.log(res.statusCode);
//     res.on('data', function(chunk){
//         data += chunk;
//     });
//     console.log(data);
//     res.on('end',function(){
//         console.log(data);
//     });
    
//     console.log(data.text);
// });
// console.log(2333333);
// console.log(data);

var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
var router = express();


(function GetALLOJ(){
    var data = '';
    var cnodeUrl = 'https://new.npuacm.info/api/crawlers/';
    // 用 superagent 去抓取 https://www.nowcoder.com/discuss 的内容
    superagent.get(cnodeUrl).end(function(err, sres){
        // 常规的错误处理
        if(err){
            return next(err);
        }
        // sres.text 里面存储着网页的 html 内容
        data = JSON.parse(sres.text);
        GetDataOfALLOJ(data);
    });
    
    function GetDataOfALLOJ(data){
        // console.log(oj);
        if(data["error"] != "false"){
            let oj = new Array(data.data);
            // console.log(oj);
            oj.forEach(element => {
                console.log(element);
                console.log('\n-------------------');
            });
        }
    }
    
})();