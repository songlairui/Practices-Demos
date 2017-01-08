<template lang="html">
  <div class="bidlist">
    <el-row>
      <el-col :span='20' :offset='1'>
        <transition-group name="list" tag="div">
          <div class='info' v-for='item in pagedata.result' v-bind:key='item.id'>
            <span class="meta">
        {{ item.createdate.date }}月{{ item.createdate.day }}日 {{ item.createdate.hours }}时{{ item.createdate.minutes }}分
            </span>
            <span class="content">
              {{ item.title }}
            </span>
          </div>
        </transition-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='20' :offset='2'>
        当前页数：{{ this.current.page }} <br>
        <el-button type="info" @click='fetchmore(1)' :disabled="btn[1]">信息按钮</el-button>
        <el-button type="info" @click='fetchmore' :disabled="true">滚动到底部，自动准备加载</el-button>
        <el-button type="info" @click='fetchmore' :disabled="true">连续加载5页</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import querystring from 'querystring'

export default {
  data () {
    return {
      btn: {
        1: false
      },
      api_url: '/api/list/bid1',
      current: {
        page: 0,
        pending: false
      },
      pagedata: {}
    }
  },
  created () {
    this.current.pending = true
    axios.post(this.api_url, querystring.stringify(this.postdata)).then((x) => {
      // console.log(x.data)
      this.pagedata = x.data.result
      this.current.page = x.data.result.pageNo
      this.current.pending = false
    })
  },
  computed: {
    postdata () {
      return {
        pageNo: this.current.page + 1,
        type: 10,
        paramJson: "{'title': '', 'consigncode': '', 'bidorg': '', 'prodcode': '', 'createtimeStart': '', 'createtimeEnd': '', 'opentimeStart': '', 'opentimeEnd': ''}"
      }
    }
  },
  methods: {
    fetchmore (idx = null) {
      if (this.current.pending) {
        this.$message({
          type: 'error',
          message: '正在发送请求，此次请求丢弃'
        })
        console.log('正在请求中')
      }
      this.current.pending = true
      if (idx) {
        this.btn[idx] = true
      }
      axios.post(this.api_url, querystring.stringify(this.postdata))
        .then((x) => {
          this.current.page = x.data.result.pageNo
          this.pagedata.result.push(...x.data.result.result)
          if (idx) {
            this.btn[idx] = false
          }
          this.current.pending = false
        })
    }
  }
}
</script>

<style lang="css">
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all .5s;
}
.list-enter, .list-leave-active {
  opacity: 0;
  transform: translateX(60px);
}
.info{
  font-size: 1em;
  margin:.6em;
  border-radius: 4px;
  border:1px solid #adf;
  box-shadow: 0 0 3px #cef;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.info .content{
  display: block;
  padding:.6em;
}
.info .meta{
  color: #333;
  display: block;float: right;border-radius: 4px;background: #eee;font-size: .6em;padding:.3em}
</style>
