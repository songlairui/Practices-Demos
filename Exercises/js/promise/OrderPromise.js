/* 顺序执行Promise */
function sequenceTask (tasks) {
  return tasks.reduce((promise, task) => {
    return promise.then(task)
  }, Promise.resolve())
}

var tasks = new Array(15).fill(
  (x)=> new Promise((r,j) => {
    setTimeout(function () {
      x = x || 0
      console.log(x++)
      r(x)
    }, Math.random() * 400 + 20)
  })
)
console.log(tasks)
sequenceTask(tasks)
