<template lang="html">
  <el-menu :router='true' class="el-menu-top" theme='dark' mode='horizontal' default-active='1' @select="handleSelect">
    <el-menu-item index='1'>MENU</el-menu-item>
    <el-submenu index='2'>
      <template slot='title'>CONTENT</template>
      <el-menu-item index="2-1">Brochures</el-menu-item>
      <el-menu-item index="2-2">Execcises</el-menu-item>
      <el-menu-item index="2-3">Mobile</el-menu-item>
      <el-menu-item index="2-4">Publish</el-menu-item>
    </el-submenu>
    <el-menu-item index='3' :route="{path:'/play/game1'}">CONTACT</el-menu-item>
    <el-menu-item index='t2vue'>ABOUT</el-menu-item>
  </el-menu>
</template>
<script>
export default {
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="css">
</style>
