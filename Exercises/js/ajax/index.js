
document.addEventListener('DOMContentLoaded', function () {
  let = 0
  let pending = false
  let option = {
    currentPage: 0,
    pending: false,
    fetchBtn: document.querySelector('.fetch'),
    ajaxBtn: document.querySelector('.ajax'),
    pool: document.querySelector('.pool')
  }

  option.fetchBtn.addEventListener('click', getNext(option, 'fetch'))
  option.ajaxBtn.addEventListener('click', getNext(option, 'ajax'))
})

function getNext(option, type) {
  return function () {
    // if(+currentPage > )
    if (option.pending) {
      return console.info('不要狂点')
    }
    option.pending = true
    getData(+option.currentPage + 1, function (data) {
      option.pending = false
      renderItem(data.items, option.pool)
      option.currentPage = +data.currentPage
      msg(`当前第 ${option.currentPage} 页`)
      if (option.currentPage >= data.pageTotal) {
        toggleBtnDisable(option.ajaxBtn, true)
        toggleBtnDisable(option.fetchBtn, true)
        msg(`当前第 ${option.currentPage} 页`, '没有下一页了')
      }
    }, type)
  }
}

/**
 * 获取分页数据
 * @param  {} page
 * @param  {} cb
 * @param  {} type
 */
function getData(page, cb, type) {
  // console.info(page, cb)
  cb = cb || (x => console.info(`data:`, x))
  page = page || 1
  type = type || 'ajax'
  console.info('type', type)
  let url = `./data/data${page}.json`
  // console.info(page, cb)
  if (type !== 'ajax') {
    fetch(url)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        if (typeof data !== 'object') {
          return console.info('无效数据')
        }
        cb(data)
      })
  } else {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      cb(JSON.parse(this.responseText));
    };
    xhr.open("get", url);
    xhr.send();
  }
}


/**
 * 切换button的disabled属性
 * @param  {} el
 * @param  {} val
 */
function toggleBtnDisable(el, val) {
  // console.info('toggle 1 次')
  if (typeof el !== 'object' || el.tagName !== 'BUTTON') {
    return console.info('并非按钮')
  }
  if (typeof val !== 'undefined') {
    val = !!val
    val ? on() : off()
    return
  }
  if (el.classList.contains('disabled') || el.hasAttribute('disabled')) {
    off()
  } else {
    on()
  }

  function on() {
    el.classList.add('disabled')
    el.setAttribute('disabled', '')
  }
  function off() {
    el.classList.remove('disabled')
    el.removeAttribute('disabled')
  }
}

/**
 * 创建一些dom并插入页面
 * @param  {} arr 数组讯息
 * @param  {} el  目标元素
 */
function renderItem(arr, el) {
  // console.info('执行了一次renderItem')
  if (!el) { return console.info('no Element') }
  let oFragment = document.createDocumentFragment()
  arr.forEach(function (item) {
    let li = document.createElement('li')
    let div = document.createElement('div')
    let img = document.createElement('img')
    img.src = item.url
    div.appendChild(img)
    li.appendChild(div)
    oFragment.appendChild(li)
  }, this);
  el.appendChild(oFragment)
}

/**
 * 显示一个消息
 * @param  {} str
 */
function msg(...str) {
  str = str.join(' ')
  var target = document.querySelector('.message')
  !target ? null : target.textContent = str
}
