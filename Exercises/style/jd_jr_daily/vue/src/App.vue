<template>
  <div id="app">
    <div id="mask">
      <div class="sign-panel">
        <div class="transformed">
          <h1>transformed</h1>
        </div>
      </div>
      <div class="glory">
        <img src="./static/bag_light.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#mask{
  position: fixed;
  top:0;left:0;bottom:0;right:0;
  background:rgba(60,60,60,.85);
}
.sign-panel{
  width:320px;height:520px;
  position:absolute;
  z-index:99;
  top:70px;
  left:50%;margin-left:-160px;
  background-image: url("./static/sign_03.png");
  box-shadow: 0 0 40px #ffbc57;
  border-radius:5px;
}
.transformed{
  transform: rotate3d(1, 2, -1, 192deg);
  background-color: blue;

  animation:rotating3d 2s linear 0s infinite;
}
.glory{
  z-index:1;
  position:absolute;
  left:50%;top:0;
  margin-left:-380px;
  animation:rotating 20s linear .8s infinite;
}
@keyframes rotating3d {
  from {
    transform: rotate3d(1, 2, -1, 0deg);
  }
  to {
    transform: rotate3d(1, 2, -1, 360deg);
  }
}
@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
