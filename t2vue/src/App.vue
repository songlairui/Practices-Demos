<template>
  <div id="app">
    <top-nav></top-nav>
    <el-row>
      <el-col :sm="6" :md="5" :lg="4">
        <side></side>
      </el-col>
      <el-col :xs='24' :sm="18" :md="19" :lg="20">
        <el-row :gutter="20">
          <el-col :span="24">
            <router-view></router-view>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Hello from './components/Hello'
import TopNav from './components/TopNav'
import Side from './components/Side'
export default {
  name: 'app',
  components: {
    Hello, TopNav, Side
  }
}
</script>

<style>
html,body{margin:0;padding:0}

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
