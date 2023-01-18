<script>
import AppCard from './AppCard.vue'
import { store } from '../store.js'

export default {
  name: 'AppBody',
  components:{
    AppCard
  },
  data(){
    return{
      store
    }
  }
}
</script>
<template>
  <div class="ps-5 text-light">
    <h4>Movies</h4>
  </div>
  <div>
    <div v-if="store.search == ''" class="d-flex overflow-x-auto pb-5 px-5">
      <AppCard v-for="(movie,index) in store.movies" :key="index" :card="movie"/>
    </div>
    <div v-else class="d-flex flex-wrap pb-5 px-5 gap-2">
      <AppCard v-for="(movie,index) in store.movies" :key="index" :card="movie"/>
    </div>
  </div>

  <div class="ps-5 text-light">
    <h4>Series</h4>
  </div>
  <div>
    <div v-if="store.search == ''" class="d-flex overflow-x-auto pb-5 px-5">
      <AppCard v-for="(serie,index) in store.series" :key="index" :card="serie"/>
    </div>
    <div v-else class="d-flex flex-wrap px-5 pb-5 gap-2">
      <AppCard v-for="(serie,index) in store.series" :key="index" :card="serie"/>
    </div>
  </div>
</template>
<style lang="sass" scoped>
  
</style>