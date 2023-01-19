import { reactive } from "vue";

export const store = reactive({
  apikey: (import.meta.env.VITE_API_KEY).toString(),
  movies: [],
  series: [],
  pageLoaded: 'Home',
  search: '',
})