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
        store,
        isLoaded: false
      }
    },
    created(){
      this.getPopularCollection();
      setTimeout(() => {
        this.isLoaded = true
      }, 2000);
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

        store.movies = []
        store.series = []

        for(let i = 1; i < 5; ++i){
          await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${store.apikey}&language=en-US&page=${i}`)
          .then((response) => {
            response.data.results.map((movie) => store.movies.push(movie))
            store.movies = this.filterNetflix(store.movies, 'movie')
          })
          await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${store.apikey}&language=en-US&page=${i}`)
          .then((response) => {
            response.data.results.map((serie) => store.series.push(serie))        
            store.series = this.filterNetflix(store.series, 'tv')
          })
        }
      },
      async getSearchCollection(){
        // let flagM = false
        // let flagS = false

        await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${store.apikey}&language=en-US&query=${store.search}`)
        .then((response) => {
          store.movies = response.data.results
          //store.movies = this.filterNetflix(store.movies, 'movie')
        })
        await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${store.apikey}&language=en-US&query=${store.search}`)
        .then((response) => {
          store.series = response.data.results
          //store.series = this.filterNetflix(store.series, 'tv')
        })
      },
      filterNetflix(collection, type){
        let arrayTemp = []
        collection.map((item) => {
          axios.get(`https://api.themoviedb.org/3/${type}/${item.id}/watch/providers?api_key=${store.apikey}`)
            .then((response) => {
              const result = response.data.results
              if(result.hasOwnProperty("IT")){
                if(result.IT.hasOwnProperty("flatrate")){
                  if(result.IT.flatrate[0].provider_id == 8){
                    arrayTemp.push(item)
                  }
                }
              }
          })
        })
        console.log(arrayTemp)
        return arrayTemp;
      }
    }
}
</script>

<template>
  <div v-if="!isLoaded" class="wrapper">
    
  </div>
  <div v-else class="wrapper">
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
