var a = [1, 2, 3, 4, 5, 6, 7, 8, 9]
a.reduce(function(p, n, i){
  squareSize = 3
  var line = Math.floor(i/squareSize)
  // console.log(i + ' )当前行： ' + (line + 1))  // 当前行
  // console.log('传入了P')
  // console.log(p)
  if(!Array.isArray(p[line])){
    // console.info(`p[${line}] 不是数组`)
    p[line] = []
    // console.log('塞成了数组')
    // console.log(Array.isArray(p[line]))
  } else {
    // console.info(`p[${line}] 是数组`)
  }
  // console.log(p)
  // console.log(`传入了${n}`)
  p[line].splice(-1, 0, n)
  // console.log(p[line])
  return p
  // return p[line].concat(n)
},[])

a.reduce(function(p, n, i){
  squareSize = 3
  var line = Math.floor(i/squareSize)
  if(!Array.isArray(p[line])){
    p[line] = []
  }
  p[line].push(n)
  return p
},[])
