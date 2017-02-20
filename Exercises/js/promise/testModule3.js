// 将promise 链插入到promise环节中
// 简化为函数，使用Promise Factory 函数
// 第一次看promise puzzle 那篇文章的时候，看到了factory函数，但不知使用这个函数的意义。
// 现在频繁使用promise 的时候，感觉到需要。
// 想来 是因为 then必定包裹function的原因



var tick0 = function (freq) {
  console.log("======第二个then，是tick0")
  freq = freq || 'noneSet_freq'
  return new Promise(function (resolve, reject) {
    console.info('-开始播放一个频率的声音')
    console.log('--设置 振荡器 频率', freq)
    console.log('---连接音源')
    console.log('----设置状态为锁定，正在播放')
    console.log('-----持续400 ms')
    setTimeout(resolve, 400)
  }).then(function () {
    return new Promise(
      function (resolve, reject) {
        console.log('----400 ms结束')
        console.log('---断开音源')
        console.log('--取消锁定状态')
        resolve()
      }
    )
  }).then(function () {
    console.log('-tick end ------')
  })
    .catch(function (e) {
      console.error(e)
    })
}
// 创建tick工厂函数
var tickFactory = function(value){
  return tick0(value)
}
// 与之前找到的等价关系作对比
/*
  var aa = function(){}
  aa 等价于 function(){return aa()}
  所以，tickFactory()等价于 tick0

*/

// 从第五个 then 中取出来 function
var section = function (a) {
  console.log('F section function')
  console.log('F 接收:', a)
  return new Promise(function (resolve, reject) {
    console.log('F section_function之中的Promise')
    resolve('F 传出 1 ')
  }).then(function (b) {
    console.log('F section_then 接收：', b)
    return new Promise(function (resolve, reject) {
      console.log('F then_function|Promise_then_function 之中的Promise')
      resolve('F then 传出2')
    })
  }).catch(function (e) {
    console.log(e)
  })
}
// Test tick function
// tick('testing`').then(function(x){console.log(x)})

var sequence1 = Promise.resolve('传出String')
  .then(section)
  .then(function (a) {
    console.log('===========第1个then 的function')
    console.log('[1]then接收：', a)
  })
  .then(tick0)
  .then(function (a) {
    console.log('===========第3个then 的function')
    console.log('[2]then接收：',a)
  })
  .then(function (a) {
    console.log('===========第4个then 的function')
    return tick0('xxx问题修复xxx')
  })
  .catch(function (e) {
    console.error(e)
  })


var frequencies = [329.63,261.63,220,164.81]
var sequence2 = Promise.resolve()
frequencies.map(function(val){
  return tickFactory
}).forEach(function(val,index){
  sequence2 = sequence2.then(function(){
    return val(frequencies[index])
  })
})
