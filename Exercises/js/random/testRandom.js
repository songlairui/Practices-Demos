var result = {}
var pool = [0, 1, 3, 4, 5, 6, 7, 8]


for (var i = 0; i < pool.length; i++) {
  result[pool[i]] = 0
}

var getRandom = function () {
  return Math.floor(Math.random()* (pool.length) + 0)
}

for ( let j = 0; j < 1000000 ; j++) {
  let tmpNum = pool[getRandom()]
  result[tmpNum]++
}