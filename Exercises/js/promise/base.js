var msg = '顶层变量'
// 定义/声明一个可以快速使用的 Promise 实例

/* var p0 = new Promise() */
var p1 = new Promise(function (resolve, reject) {
  if (true) {
    resolve()
  } else {
    reject()
  }
})

var p2 = Promise.resolve()

// promise 返回一个参数  这个参数不是一个promise的时候
var p21 = Promise.resolve('--message-in-p21--')

// promise 返回一个参数  这个参数是promise的时候
var p22 = Promise.resolve(new Promise(
  (r, j) => {
    // new Promise(Func) 不做任何逻辑处理的，等价于Promise.resolve()
    console.log('p22 inner')
    r('p22\'s message')
  }
))

/*var p221 = p22.then(
  (x)=>{
    console.log('p221/(p22.then)', x)
  }
).catch(function(e){
  console.log('p221 e', e)
})*/


// promise 的执行，
var p3 = new Promise((r, j) => {
  setTimeout(
    function () {
      console.log("p3：", msg)
      r() // resolve
    }, 400
  )
})

// promise 使用resolve 传递参数到then（当这个参数，不是一个Promise 的时候）

/*var p33 = p21.then(x => {
  console.log('p2:then ', x)
  return x.substr(1)
  }
).then(
  (x) => {
    console.log('p2:then * 2:', x)
    return x.substr(1)
  }
).then(
  (x) => {
    console.log('p2:then * 3:', x)
    return x.substr(1)
  }
)*/

// 使用函数返回一个pomise 执行

var p4 = function (p4val) {
  return new Promise((r, j) => {
    setTimeout(
      function () {
        console.log("p4：", p4val)
        r() // resolve
      }, 400
    )
  })
}
// then 中要放置一个function，这个function的传入参数是 上一层resolve()的参数，
// 这个function 会有一个返回，当返回内容为promise的时候，有特殊处理

p4('p4 的 传入参数')

// 这儿有p4，所以，一般的then需要的参数是 ()=>p4('xxx')
// 为此，写一个p41，做到，在then中放置 p41('xxx'),就能够完成promise链

var p41 = function (str) {
  return function () {
    return new Promise((r, j) => {
      setTimeout(
        function () {
          console.log("p41：", str)
          r() // resolve
        }, 400
      )
    })
  }
}

// promise 使用resolve 传递参数到then（当这个参数 是一个Promise 的时候）

var p222 = p22.then((...x) => {
  console.log('then中 含有一个异步过程p4的function ')
  console.log('Arguments:', x)
  return p4('p4 export to p22')
}).then(function(){
  console.log('then中不包含异步过程的function')
  return 'function 返回一个string，'
})
  .then(
  (x) => {
    console.log('then 中 不包含异步过程的function')
    console.log('p222/(p22.then)', x)
  }
  ).catch(function (e) {
    console.log('p222 e', e)
  })

// promise then 中放置 返回promise的function ，链式中，传递空参数
var p24 = p2.then(() => p4('p2 中 p4 的 传入参数1')).then(p41('p2 中 p4 的 传入参数2')).then(p41('p2 中 p4 的 传入参数3'))

var p32 = p3.then(p4('p32 中 p4 的 传入参数'))


var p5 = p32.then(function(){console.log('p5', msg)})

// p32 对p32 添加了 then， p5 对p32添加了then，运行时中，promise 链执行一次。
// 一个看起来像promise环节执行了两次，说明牠们在两个promise 链上。
