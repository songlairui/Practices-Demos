<template>
  <section class="container">
    <nuxt-link class="button" to="/about">
      About page
    </nuxt-link>
    <br>
    <br>
    <nuxt-link class="button" to="/demo/list/sinopec">
      Sinopec 自动加载翻页
    </nuxt-link>
    <h1 class="title">
      Larry's demo site <br> with nuxt server-rendered
    </h1>
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
  </section>
</template>

<style scoped>
.title
{
  margin: 50px 0;
}
</style>
