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
}).catch(function(e){
  console.error(e)
})

