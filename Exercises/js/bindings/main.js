
function Directive(name, el, vm, exp, attr){
  this.name = name
  this.el = el
  this.vm = vm
  this.exp = exp
  this.attr = attr
  this.update()
}
Directive.prototype.update = function(){
  this.el[this.attr] = this.vm.$data[this.exp]
}


function Lue(options){
  this._init(options)
}

Lue.prototype._init = function(options){
  this.$options = options
  this.$el = document.querySelector(options.el)
  this.$data = options.data

  this._binding = {}
  this._parseData(this.$data)
  this._compile(this.$el)
}


Lue.prototype.convert=function(key, val){
  var binding = this._binding[key]
  Object.defineProperty(this.$data,key,{
    enumerable: true,
    configureable:true,
    get:function(){
      return val
    },
    set:function(newVal){
      val = newVal
      binding._directives.forEach(function(item){
        item.update()
      })
    }
  })
}

Lue.prototype._parseData = function(obj){
  var value
  for(var key in obj){
    if(obj.hasOwnProperty(key)){
      this._binding[key] = {
        _directives: []
      }
      value = obj[key]

      this.convert(key, value)
    }
  }
}

Lue.prototype._compile = function(root){
  var _this = this
  console.log(root)
  var nodes = root.children
  for(var i = 0; i< nodes.length; i++){
    var node = nodes[i]
    if(node.children.length){
      this._compile(node)
    }
    if(node.hasAttribute("v-model") && (node.tagName=='INPUT' || node.tagName == 'TEXTAREA')){
      node.addEventListener('input',(function(key){
        var attrVal = node.getAttribute('v-model')
        _this._binding[attrVal]._directives.push(new Directive(
          "input",
          node,
          _this,
          attrVal,
          "value"
        ))
        return function () {
          _this.$data[attrVal] = nodes[key].value
        }
      })(i))
    }

    if(node.hasAttribute('v-bind')){
      var attrVal = node.getAttribute('v-bind')
      _this._binding[attrVal]._directives.push(new Directive(
        'text',
        node,
        _this,
        attrVal,
        'innerHTML'
      ))
    }
  }
}

window.onload = function(){
  var app = new Lue({
    el:'#app',
    data:{
      attr1:null,
      attr2:null,
      attr3:null,
      attr4:null,
      attr5:null,
    }
  })
}

