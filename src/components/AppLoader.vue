<script>
export default {
  name: 'AppLoader'
}
</script>
<template>
  <div class="d-flex justify-content-center align-items-center flex-column">
    <font-awesome-icon class="animation" icon="fa-solid fa-circle-notch" />
  </div>
</template>
<style lang="sass" scoped>
  @use '../styles/partials/variables' as *

  div
    color: $red
    height: 100vh
    width: 100vw
  .animation
    font-size: 50px
    animation: loop 1s linear infinite


  @keyframes loop
    from
      transform: rotate(0deg)
    
    to
      transform:  rotate(360deg)
  
</style>