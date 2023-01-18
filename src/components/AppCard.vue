<script>
import { store } from '../store.js'

export default {
  name: 'AppCard',
  props: {
    card: Object
  },
  data(){
    return{
      store,
      hover: false,
      stars: null,
      released: null
    }
  },
  created(){
      this.isReleased();
      this.setStars();
  },
  methods:{
    getFlag(){
      if(this.card.original_language == 'en')
        return ('gb').toUpperCase()
      else
        return this.card.original_language.toUpperCase()

    },
    getImage(){
      return `https://image.tmdb.org/t/p/w200${this.card.poster_path}`
    },
    isReleased(){
      // (YYYY-MM-DD)
      const nowDate = new Date();
      const cardDate = new Date(this.card.release_date);
      
      this.released =  (nowDate.getTime() <= cardDate.getTime()) ? false : true
    },
    setStars(){
      const temp = this.card.vote_average/2
      this.stars = Math.floor(temp)
      if(!((temp - this.stars) < 0.5))
        this.stars += 0.5 
    }
  }
}
</script>
<template>
  <div class="card" @mouseover="hover = true" @mouseleave="hover = false">
      <img v-if="hover == false" :src="getImage()" class="card-img-top" alt="...">
      <div v-else class="text-light m-3">
        <div>
          <span class="fw-bold">titolo: </span>
          <span>{{ card.title }}</span>
        </div>
        <div v-show="card.title != card.original_title">
          <span class="fw-bold">titolo originale: </span>
          <span>{{ card.original_title }}</span>
        </div>
       <div v-if="released" class="d-flex align-items-center gap-2">
        <span class="fw-bold">Voto: </span>
        <div class="d-flex">
          <font-awesome-icon v-for="i in Math.floor(stars)" :key="i" class="star" icon="fa-solid fa-star" />
          <font-awesome-icon v-if="stars - Math.floor(stars) == 0.5" class="star" icon="fa-solid fa-star-half" />
        </div>
       </div>
       <div class="d-flex">
        <span class="fw-bold me-2">language: </span>
        <img class="flag" :src="`https://www.countryflagicons.com/FLAT/64/${getFlag()}.png`">
       </div>
       <div class="overview">
        <span class="fw-bold me-2">overview: </span>
        <span> {{ card.overview }}</span>
       </div>
      </div>
  </div>
</template>
<style lang="sass" scoped>
    @use '../styles/partials/_variables' as *
    .card 
      color: $white
      border: none
      min-width: 210px
      max-width: 210px
      height: 300px
      background-color: $black
      img
        border-radius: 0px
        width: 100%
        height: 100%
      .star
        color: yellow
      .flag
        width: 30px
      .overview
        height: 170px
        overflow-y: hidden
  
</style>