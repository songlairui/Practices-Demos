<template lang="html">
  <el-menu :router='true' mode="vertical" default-active="2" :default-openeds="testArray" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme='dark'>
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-message"></i>Exercises</template>
      <el-menu-item-group>
        <template slot="title">Javascript</template>
        <el-menu-item index="/">选项1</el-menu-item>
        <el-menu-item index="/foo">选项2</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <template slot="title">Touch</template>
        <el-menu-item index="/content/launcher">选项1</el-menu-item>
      </el-submenu>
      <el-menu-item-group title="Project">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="StyleSheets">
        <el-menu-item index="1-3-1">选项3</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="WebGL">
        <el-menu-item index="1-3-2">选项3</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Android">
        <el-menu-item index="1-3-3" :route="{path:'/content/android/launcher'}">Launcher Layouts</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="2"><i class="el-icon-menu"></i>WebGL</el-menu-item>
    <el-menu-item index="3"><i class="el-icon-setting"></i>Android</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      testArray: ['1', '1-4']
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="css">
</style>
