/* Promise 基本法 */
let t = true
let r = 'message'
let a
console.log(a)
a = new Promise(function(resolve, reject) {
  if (t) {
    resolve(r)
  } else {
    reject(r)
  }
})
var q = a.then((...x)=>{console.log('x');console.log(x);return 'inner'}).then((y)=>{y+='-';console.log(y);return 'last return'})
console.log('消费一次Promise a')
console.log(q)
/* Promise 嵌套 */
var b = a
  .then((val1)=> new Promise(function(r,j){
      setTimeout(function(){
        console.log(a)
        console.log(b)
        console.log(`1-${val1}`)
        r(val1)
        console.log('使用resolve函数，没有使用return')
      }, Math.random() * 2000 + 100)
  }))
  .then((val2)=> {
    console.log('得到传入值 ' + val2)
    new Promise(function(r,j){
      setTimeout(function(){
        console.log(a)
        console.log(b)
        console.log(`2-${val2}`)
        r()
      }, Math.random() * 2000 + 100)
    })
})

console.log('outside first')
console.log(a)
console.log(b)
console.log('outside end')
