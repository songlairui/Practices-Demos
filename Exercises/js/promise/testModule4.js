// 将promise 链插入到promise环节中
// 简化为函数，使用Promise Factory 函数
// 第一次看promise puzzle 那篇文章的时候，看到了factory函数，但不知使用这个函数的意义。
// 现在频繁使用promise 的时候，感觉到需要。
// 想来 是因为 then必定包裹function的原因

var tick0 = function (freq) {
  console.log("===========")
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
        console.log('---断开音源,并等待150 ms')
        setTimeout(function () {
          console.log('--取消锁定状态')
          resolve()
        }, 150)
      }
    )
  }).then(function () {
    console.log('-tick end ------')
  })
    .catch(function (e) {
      console.error(e)
    })
}

// 创建tick工厂函数， 这是个假的工厂函数
var tickFactoryFake = function (value) {
  return tick0(value)
}

// 把假的tick工厂函数，变真化
// 将function 使用return包裹一次，没有任何作用，下面两种方式形式一模一样。
var tickFactoryFakeToOK = function (value) {
  return function(){
    return tickFactoryFake(value)
  }
}

var tickFactoryFakeToOK2 = function (value) {
  return function(){
    return tick0(value)
  }
}

// 与之前找到的等价关系作对比
/*
  var aa = function(){}
  aa 等价于 function(){return aa()}
  所以，tickFactory()等价于 tick0

*/

// 创建tick工厂函数，创建真的工厂函数

var tickFactory = function (freq) {
  return function () {
    console.log("===========")
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
          console.log('---断开音源,并等待150 ms')
          setTimeout(function () {
            console.log('--取消锁定状态')
            resolve()
          }, 150)
        }
      )
    }).then(function () {
      console.log('-tick end ------')
    })
      .catch(function (e) {
        console.error(e)
      })
  }
}


// 待使用数组
var frequencies = [329.63, 261.63, 220, 164.81]

// 待执行序列
var sequence2 = Promise.resolve()

// 1比1临摹 promise puzzle中的promiseFactory
  // 跟后边的方式对比，这是冗余的
frequencies.map(function (val) {
  return tickFactory
}).forEach(function (val, index) {
  sequence2 = sequence2.then(val(frequencies[index]))
})

// 不建立 Factory函数数组
  // 使用 假的 Factory 函数
frequencies.forEach(function (val) {
  sequence2 = sequence2.then(function () {
    return tickFactoryFake(val)
  })
})

  // 使用真的Factory函数
frequencies.forEach(function (val) {
  sequence2 = sequence2.then(tickFactoryFakeToOK(val))
})

// 我觉得使用一层箭头函数能让可读性增加？！[黑人问好]
  // 使用箭头函数简化，假的Factory函数 才需要简化
frequencies.forEach(function (val) {
  sequence2 = sequence2.then(
    () => tickFactoryFake(val)
  )
})
  // 强行简化真的工厂函数，如下反而更麻烦
    // 同时给出规律——then中的传入参数，是使用空的()执行时，是可以简化的
frequencies.forEach(function (val) {
  sequence2 = sequence2.then(
    () => tickFactory(val)()
  )
})
// 不使用Factory函数
frequencies.forEach(function (val) {
  sequence2 = sequence2.then(
    function () {
      return tick0(val)
    }
  )
})

  // 使用箭头函数简化书写
frequencies.forEach(function (val) {
  sequence2 = sequence2.then(
    () => tick0(val)
  )
})
