<template>
  <div class="loader">
    <div class="rect1"></div>
    <div class="rect2"></div>
    <div class="rect3"></div>
    <div class="rect4"></div>
    <div class="rect5"></div>
  </div>
</template>

<script>
  export default {
    name: "DLoader"
  }
</script>

<style lang="sass">
.loader
  margin: 100px auto
  width: 50px
  height: 40px
  text-align: center
  font-size: 10px


.loader > div
  background-color: #fff
  height: 100%
  width: 6px
  display: inline-block
  
  -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out
  animation: sk-stretchdelay 1.2s infinite ease-in-out


.loader .rect2 
  -webkit-animation-delay: -1.1s
  animation-delay: -1.1s


.loader .rect3
  -webkit-animation-delay: -1.0s
  animation-delay: -1.0s


.loader .rect4
  -webkit-animation-delay: -0.9s
  animation-delay: -0.9s


.loader .rect5
  -webkit-animation-delay: -0.8s
  animation-delay: -0.8s


@-webkit-keyframes sk-stretchdelay
  0%, 40%, 100%
    -webkit-transform: scaleY(0.4)
  20%
    -webkit-transform: scaleY(1.0)


@keyframes sk-stretchdelay
  0%, 40%, 100%
    transform: scaleY(0.4)
    -webkit-transform: scaleY(0.4)
  20%
    transform: scaleY(1.0)
    -webkit-transform: scaleY(1.0)

.show-menu-enter-active
  animation: slide-in 2.5s ease forwards

  .show-menu-leave-active
    animation: slide-out 1s ease forwards

  .show-menu, .show-menu-leave-to .show-menu-leave-active
    opacity: 0

  @keyframes slide-in
    0%
      transform: translateY(-100%)

    100%
      transform: translateY(0)

  @keyframes slide-out
    0%
      transform: translateY(0)

    100%
      transform: translateY(-100%)
</style>