let tCount = 0

function fetchOne () {
  return new Promise((r,j) => {
    setTimeout(function () {
      console.log(++tCount)
      r()
    }, Math.random() * 400 + 20)
  })
}

function fetchMulti (num) {
  num = num || 2
  let promise = Promise.resolve()
  for (var i = 0; i < num; i++) {
    promise = promise.then(fetchOne)
  }
  return promise
}
fetchMulti(4)
