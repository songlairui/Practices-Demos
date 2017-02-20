// 将promise 链插入到promise环节中
// 简化

// 方法一 ： 传给then的是一个function，将会正确处理。
// .then(function aa(){})  在没有参数的时候等价于 .then(aa)
// 即 var aa = function(){}
// aa === function(){return aa()}
//
// 当有参数的时候，转化为匿名函数
// .then(function aa(){})
//      转化为===> .then((x)=>{return function aa(){...}}(x)) // 如果不正确，就加一个括号

// function to return promise

var getPromise = function () {
  return new Primose((r,j)=>{
    if (true)
      r()
    else {
      j()
    }
  })
}

var tick0 =function(freq){
  freq = freq || 'noneSet_freq'
  return new Promise(function(resolve, reject){
    console.info('-开始播放一个频率的声音')
    console.log('--设置 振荡器 频率', freq)
    console.log('---连接音源')
    console.log('----设置状态为锁定，正在播放')
    console.log('-----持续400 ms')
    setTimeout(resolve,400)
  }).then(function(){
    return new Promise(
      function(resolve, reject){
        console.log('----400 ms结束')
        console.log('---断开音源')
        console.log('--取消锁定状态')
        resolve()
      }
    )
  }).then(function(){
    console.log('-tick end ------')
  })
  .catch(function(e){
    console.error(e)
  })
}

var tick =function(freq,func){
  return new Promise(function(resolve, reject){
    console.info('-开始播放一个频率的声音')
    console.log('--设置 振荡器 频率', freq)
    console.log('---连接音源')
    console.log('----设置状态为锁定，正在播放')
    console.log('-----持续400 ms')
    setTimeout(resolve,400)
  }).then(function(){
    return new Promise(
      function(resolve, reject){
        console.log('----400 ms结束')
        console.log('---断开音源')
        console.log('--取消锁定状态')
        resolve()
      }
    )
  }).then(function(){
    console.log('-tick end ------')
    func()
  })
  .catch(function(e){
    console.error(e)
  })
}

// 从第五个 then 中取出来 function
var section =function(a){
    console.log('i ===========模仿 第五个then 的function')
  console.log(a)
  return new Promise(function(resolve,reject){
    console.log('i then_function之中的Promise')
    resolve('grab传出1')
  }).then(function(b){
      console.log('-----5i',b)
      return new Promise(function(resolve,reject){
      console.log('i then_function|Promise_then_function 之中的Promise')
      resolve('grab传出2')
    })
  }).catch(function(e){
    console.log(e)
  })
}
// Test tick function
// tick('testing`').then(function(x){console.log(x)})

var sequence = Promise.resolve().then(
  function(){
    console.log('===========第一个then 的function')
    return new Promise(function(resolve,reject){
      setTimeout(function(){
         resolve('-xx')
      },500)
    })
  }
).then(
  function(str){
    console.log('===========第二个then 的function')
    console.log(str)
    return new Promise(function(resolve,reject){
      tick(str,resolve)
    })
  }
).then(
  function(str){
    console.log('===========第三个then 的function')
    console.log(str)
    return new Promise(function(resolve,reject){
      setTimeout(function(){
         resolve('xxx')
      },300)
    })
  }
).then(function(a){
    console.log('===========第四个then 的function')
  console.log(a)
}).then(function(a){
    console.log('===========第五个then 的function')
  console.log(a)
  return new Promise(function(resolve,reject){
    console.log('then_function之中的Promise')
    resolve('传出1')
  }).then(function(b){
      console.log('-----5',b)
      return new Promise(function(resolve,reject){
      console.log('then_function|Promise_then_function 之中的Promise')
      resolve('传出2')
    })
  }).catch(function(e){
    console.log(e)
  })
}).then(function(a){
    console.log('===========第六个then 的function')
  console.log('-----6:',a)
}).then(section)
.then(function(a){
    console.log('===========第七个then 的function')
  console.log(a)
}).then(tick0)
.then(function(a){
    console.log('===========第八个then 的function')
  console.log(a)
}).then(function(){return tick0('xxx问题修复xxx')})
.then(function(a){
    console.log('===========第9个then 的function')
  console.log(a)
}).then(function(){tick0('xxx问题重现xxx')})
.then(function(a){
    console.log('===========第10个then 的function')
  console.log(a)
}).then(function(a){
    console.log('===========第11个then 的function')
  console.log(a)
}).catch(function(e){
  console.error(e)
})


// 继续说 then(func(x){ return ... })， 即then中必定是function
// then 接收到的参数是什么
// .then 前边，不是then 就是 resolve， 其他情况最后讨论
// 如果前边 是then，则其括号里的参数，是function，执行这个function，得到一个返回值，这个返回值继续如果
//    如果这个返回值不是一个promise， 则直接使用这个返回值
//    如果这个返回值是一个promise，则使用这个promise中 resolve(...) 输入的变量
// 如果前边是promise，则直接使用resolve(...) 输入的变量

// 目前，在promise链中的每个then 中插入promise 链。令我迷惑的是，promise.resolve() 是否存在第一个即生效的逻辑。
// 写出来标记6与标记7下的内容，疑问解决。
// 问题修复在标记8下，问题重现在标记9下
