<script>
  import AppHeader from './components/AppHeader.vue';
  import AppBody from './components/AppBody.vue';
  import axios from 'axios'
  import { store } from './store.js'

  export default {
    components:{
      AppHeader,
      AppBody,
    },
    data(){
      return{
        store
      }
    },
    created(){
      this.getPopularCollection();
      this.getPopularCollection();
    },
    computed: {
      search() {
        return store.search
      }
    },
    watch: {
      search() {
        if(store.search == ''){
          this.getPopularCollection()
        }
        else{
          this.getSearchCollection()
        }
      }
    },
    methods:{
      async getPopularCollection(){

        await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${store.apikey}&language=en-US&page=1`)
          .then((response) => {
            store.movies = (response.data.results)
          })

        await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${store.apikey}&language=en-US&page=1`)
          .then((response) => {
            store.series = (response.data.results)
          })

      },
      async getSearchCollection(){
      
        await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${store.apikey}&language=en-US&query=${store.search}`)
        .then((response) => {
          store.movies = (response.data.results)
        })

        await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${store.apikey}&language=en-US&query=${store.search}`)
        .then((response) => {
          store.series = (response.data.results)
        })
        
      }
    }
}
</script>

<template>
  <div class="wrapper">
    <AppHeader></AppHeader>
    <AppBody></AppBody>
  </div>
</template>

<style lang="sass">
  @use './styles/partials/_variables' as *
  @import './styles/generals.sass'

  .wrapper
    background-color: $black
    min-height: 100vh
</style>
