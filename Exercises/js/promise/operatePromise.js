// 创建一个函数 抚摸Promise
// 或者 返回 Promise
let uniqueIndicator = 1
var p1 = new Promise(function (resolve, reject) {
  setTimeout(function (uniqueIndicator) {
    resolve(uniqueIndicator)
  }, Math.random() * 0 + 0)
})

// p1.then((val = 'test')=>{console.log(val)})
var promise = Promise.resolve();
var touchit = function (aPxx) {
  for (let i = 0; i < 3; i++) {
        aPxx = aPxx.then(()=> new Promise((r,j) => {
          setTimeout(function () {
            console.log(i)
            r(i)
          }, 400)
        }))
    }
    return aPxx
}
touchit(p1)
/*
for (var i = 0; i < 4; i++) {
  touchit(p1)
  console.log(p1)
}
*/
