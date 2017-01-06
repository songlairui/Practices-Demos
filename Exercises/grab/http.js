var express = require('express')
var cheerio = require('cheerio')
var http=require('http')
var pageUrl='http://www.songlairui.cn'
var html = '';
http.get(pageUrl, function(res){
  res.on('data',function(data){
      html+=data
    })
  res.on('end',function(){
      callback(html)
    })
})
function callback(html) {
  var $ = cheerio.load(html)
  var arrUrl=[]
  $('.is-child').each(function(index,element){
    var text = $(element).find('.title').text()
    arrUrl.push(text)
  })
  console.log(arrUrl)
}
