<template>
    <body>
        <header-component :handler="inputCallback"></header-component>
        <loader-component v-if="status.loader"></loader-component>
        <notfound-component v-if="status.notfound"></notfound-component>
        <error-component v-if="status.error"></error-component>
        <section class="grid" id="movies">
        <movie-component v-for="movie in movies" :id="movie" :key="movie"></movie-component>
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
          this.status.loader = true;
          this.getMovies(value)
          .then(movies=>{
              if (movies.length === 0){
                  this.status.notfound = true;
              }else {
                  this.setMovies(movies)
                  this.status.notfound = false;
                  this.status.error = false;
              }
              this.status.loader = false; 
          })
          .catch(reason=>{
              /* Error handling... */
              this.status.error = true;
          });
      },
      /* Sets the movies in the view */
      setMovies(movies){
          this.movies = movies;
      },
      /* Takes the user query and makes all the process to return an array that contains the movies' id */
      getMovies(query){
          return this.fetchMovies(query)
          .then(json=>this.getMoviesIds(json))
          .catch(reason=>{
              /* Error handling... */
          })
      },

      getMoviesIds(moviesArray){
          return moviesArray.sort(config.movie.sort).map(element=>element.id);
      },

      /* Fetchs the movies into the API */
      fetchMovies(query){
          
          return this.movieResource.queryMovies(query)
          .then(jsonObject=>jsonObject.results)
          .catch(reason=>{
              /* Error handling... */
          });
      }
  }  
}     
</script>

