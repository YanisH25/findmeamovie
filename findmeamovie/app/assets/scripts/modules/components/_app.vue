<template>
    <body>
        <header-component :handler="inputCallback"></header-component>
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

/* Importing the 'The Movie Database' fetch library (see: ../utils/_fetchTmdb.js) */

import TMDB from '../utils/_fetchTmdb';

/* Importing the app's configuration (see: ../configs/_config.js) */

import config from '../configs/_config';

/* Importing the app's components */

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
          },
          movieResource: new TMDB({
              key: config.api.key,
              language: config.language
          })
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
      /* Handles input submiting... */     
      inputCallback(value){
          this.fetchMovies(value)
          .then(movies=>{this.setMovies(movies);})
          .catch(reason=>{
              /* Error handling... */
          });;
      },
      /* Sets the movies in the view */
      setMovies(movies){
          this.movies = movies;
      },
      /* 
      Formats movie object from API response

      Returns : 

          Object{
              title: string,
              rate: int,
              genres: string,
              posterPath: string,
              resume: string
          } 
      */
      formatMovie(movieFromResponse){
         /* ... */
      },
      /* Fetchs the movies into the API */
      fetchMovies(query){
          return this.movieResource.queryMovies(query)

          /* Takes movies from response and formats it */

          .then(response=>response.results.map(element=>this.formatMovie(element)))
          .catch(reason=>{
              /* Error handling... */
          });
      }
  }  
}     
/* 
    Remake formatMovie() with genres that work properly.
    Make loader handling,
    Make error handling,
    Make notfound handling
*/ 
</script>

