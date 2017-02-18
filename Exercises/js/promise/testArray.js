
var frequencies = [329.63, 261.63, 220, 164.81];

// 拆解 1 - 全部拆解
// 1.1 new Promise() 中需要的函数
function getBit(item) {
    return function (r, j) {
        setTimeout(
            function () {
                console.log("inner 2", item)
                r() // resolve
            }, 1400
        )
    }
}
// 1.2 使用 getBit 函数

function fetchItem0(item) {
    return new Promise(getBit(item))
}

// 1.3 将fetchItem 函数与getBit 合并
// getBit 函数，不需要返回一个函数，直接在new Promise()中使用
function fetchItem(item) {
    return new Promise((r, j) => {
        setTimeout(
            function () {
                console.log("inner 2", item)
                r() // resolve
            }, 400
        )
    })
}
// 2.1 将fetchItem 函数放到then()中，此处有item，需要闭包处理，闭包返回fetchItem函数
function rFetchItem(item) {
    return function () {
        return new Promise((r, j) => {
            setTimeout(
                function () {
                    console.log("inner 2", item)
                    r() // resolve
                }, 400
            )
        })
    }
}

// 2.2 将闭包返回fetchItem函数的函数，放到Promise.then() 中
function fetchArray(arr) {
    let length = arr.length
    if (!length) return
    let P = Promise.resolve()
    for (var i = 0; i < length; i++) {
        P = P.then(rFetchItem(arr[i]))
    }
    return P
}

// 3.1 将所有函数合并
function outputArray(arr) {
    let length = arr.length
    if (!length) return
    let P = Promise.resolve()
    for (var i = 0; i < length; i++) {
        P = P.then(((x) => {
            return () => {
                return new Promise((r, j) => {
                    setTimeout(
                        // 对含有r() 的参数作闭包处理
                        rR(arr[x],r),400
                        /*function () {
                            // console.log("1 :", arr[x])
                            osc(arr[x])
                            r() // resolve
                        }, 400
                        */
                    )
                })
            }
        })(i)
        )
    }
    return P
}

function osc(fre){
  console.info('开始播放一个频率的声音')
  console.log('设置 振荡器 频率', fre)
  console.log('连接音源')
  console.log('设置状态为锁定，正在播放')
  console.log('持续400 ms')
  console.log('断开音源')
  console.log('取消锁定状态')
  // console.groupEnd()
}

function rR(fre,r){
  return function () {
      // console.log("1 :", arr[x])
      osc(fre)
      r() // resolve
  }
}
// 执行最终函数
// outputArray(frequencies)

// 执行基本动作一个，对于有时间持续的时间，使用promise进行处理
// promise 处理的时候，需要传入一个参数，在最终回调的时候，处理该参数
// 在 最后一个then 中放置该参数
function actBit (x) {

}

// promise 的执行，使用函数返回一个pomise 执行
