<script>
import { store } from '../store.js' 

export default {
  name: 'AppHeader',
  data(){
    return{
      store
    }
  }
}
</script>
<template>
  <header>
    <nav class="navbar navbar-expand-lg dark px-4 d-flex justify-content-between row" data-bs-theme="dark">
      <div class="collapse navbar-collapse col-4" id="navbarSupportedContent">
        <a class="navbar-brand" href="#">
          <img class="logo" src="../../public/images/Netflix_logo-3719758020.jpeg" alt="logo not found">
        </a>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Movies</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Series</a>
          </li>
        </ul>
      </div>
      <form class="col-4" role="search">
        <input class="form-control me-2 text-dark" type="search" placeholder="Search" aria-label="Search" v-model="store.search">
      </form>
      <div></div>
    </nav>
  </header>
</template>
<style lang="sass" scoped>
  @use '../styles/partials/_variables' as *
  nav
    height: 100px
  .logo
      width: 100px

</style>