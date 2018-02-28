<template>
  <article class="card">
        <div class="wrapper">
            <div class="card__wrapper">
                <div class="card__titles">
                    <h1 class="card__title">{{title}}</h1>
                    <p class="card__annotation">{{rate}}/10</p>
                    <p class="card__annotation">{{genres}}</p>
                </div>
                <img :src="posterPath !== null ? config.movie.posterPath.baseUrl + posterPath : ''" class="card__poster">
            </div>
            <p class="card__resume">{{resume}}</p>
        </div> 
    </article>
</template>

<script>
'use strict';

/* Importing the 'The Movie Database' fetch library (see: ../utils/_fetchTmdb.js) */

import TMDB from '../utils/_fetchTmdb';

/* Importing the app's configuration (see: ../configs/_config.js) */

import config from '../configs/_config';

export default {
  name: 'movie-component',
  props: ['id'],
  mounted(){
      this.setMovie();
  },
  data() {
      return {
          title: '',
          rate: 0,
          genres: '',
          posterPath: '',
          resume: '',
          movieResource: new TMDB({
              key: config.api.key,
              language: config.language
          }),
          config: config
      }
  }, 
  methods: {
      setMovie(){
          this.fetchMovie(this.id)
          .then(json=>this.formatMovie(json))
          .then(movie=>{
              this.title = movie.title,
              this.rate = movie.rate,
              this.genres = movie.genres,
              this.posterPath = movie.posterPath,
              this.resume = movie.resume
          })
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
          return {
              title: movieFromResponse.title,
              rate: movieFromResponse.vote_average,
              /* Transforms array of genre objects into string with reducer */
              genres: movieFromResponse.genres.length > 0 ? movieFromResponse.genres.map(element=>element.name).reduce(config.movie.genres.formatter) : config.movie.genres.default,
              posterPath: movieFromResponse.poster_path,
              resume: movieFromResponse.overview
          };
      }, 

      /* Fetchs movie data from TMDB (see: https://developers.themoviedb.org/3/movies/get-movie-details) */
      fetchMovie(movieId){
          return this.movieResource.getMovie(movieId)
          .then(json=>json)
      }
  }
}
</script>