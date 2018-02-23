<template>
    <body>
        <header-component :callback="doQueryMovies"></header-component>
        <loader-component v-if="status.loader"></loader-component>
        <notfound-component v-if="status.notfound"></notfound-component>
        <error-component v-if="status.error"></error-component>
        <section class="grid" id="movies">
        <movie-component v-for="movie in movies" :properties="movie" :key="movie.id"></movie-component>
        </section>
    </body>
</template>

<script>
'use strict';
import header from './_headerComponent.vue';
import movie from './_movieComponent.vue';
import loader from './_loaderComponent.vue';
import notfound from './_notfoundComponent.vue';
import error from './_errorComponent.vue';
export default {
  data(){
      return {
          movies: [],
          status: {
              error: false,
              notfound: false,
              loader: false
          }
      }
  },
  components: {
      'header-component': header,
      'movie-component': movie,
      'loader-component': loader,
      'notfound-component': notfound,
      'error-component': error
  },
  methods:{
      doQueryMovies(query){
          this.addMovie({title:query})
      },
      addMovie(movie){
          this.movies.push(movie);
      }          
  }
}
</script>

