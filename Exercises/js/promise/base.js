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


// promise 的执行，
var p3 = new Promise((r, j) => {
  setTimeout(
    function () {
      console.log("p3：", msg)
      r() // resolve
    }, 400
  )
})

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

p4('p4 的 传入参数')

var p22 = p2.then(p4('p2 中 p4 的 传入参数'))

var p32 = p3.then(p4('p32 中 p4 的 传入参数'))

var p5 = p32.then(function(){console.log('p5', msg)})
