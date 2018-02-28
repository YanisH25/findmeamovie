/*  
    What is it ?
    ----------------------------------------------------------------------------------------------------------------------------------
    A library that helps you fetch data from 'The Movie Database' (see: https://developers.themoviedb.org/3/) 
    ----------------------------------------------------------------------------------------------------------------------------------

    How to use it ?
    ----------------------------------------------------------------------------------------------------------------------------------
    Import this library into your Vue project, then simply create a new instance of it with passing some options in argument.
    These are the options to pass in :

    Object {
        key: string (your 'The Movie Database' api key),
        language: string (the language in UTF-8 format you want the data to be returned in, by default it is 'en-US')
    }
    ----------------------------------------------------------------------------------------------------------------------------------
    For else infomations about 'The Movie Database' and the API structure, please refer to: https://developers.themoviedb.org/3/
    ----------------------------------------------------------------------------------------------------------------------------------
*/
'use strict';

import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

class TMDB {

    /* Constructor */
    /* Takes an object in parameter that contains the api credential (api_key) and the language (language) */
    /* For language's convention, please refer to: https://developers.themoviedb.org/3/getting-started/regions */

    constructor(args){
        this.key = args.key;

        /* If no language is passed in parameter then 'en-US' is the default one */

        this.language = args.language === undefined || args.language === null ? 'en-US' : args.language;
    }

    /* Method uses to fetch the movies that match with the arguments */
    /* 
    Takes a string that is the query argument in parameter and returns an object that contains the requested movies in an array (named 'results') with the movies' informations into.
    Takes also a last argument that allows you to pass customs GET parameters in an object.
    (see: https://developers.themoviedb.org/3/getting-started/search-and-query-for-details) 
    */ 

    queryMovies(queryArgs, params){
        return new Promise((resolve, reject)=>{
            Vue.http.get('https://api.themoviedb.org/3/search/movie', {
                params:  {
                    api_key: this.key,
                    language: this.language,
                    query: queryArgs,
                    params
                } 
            })
            .then(response=>response.json(), response=>reject(response.statusText))
            .then(json=>resolve(json));
        });
    }
    
    /* Method uses to fetch the movies' genres */
    /* 
       Takes an array of number that represents the ids of the requested genres 
       and returns a promise that returns an array of object with the genre informations (see: https://developers.themoviedb.org/3/genres) 
       or an error with the HTTP status code.
       Takes also a last argument that allows you to pass customs GET parameters in an object.
       
       Returns an array similars to that :
       
       Array [
           {
               id: number (the genre's id),
               name: string (the genre's name)
           }, ...
        ]
    */

    getGenres(genresIds, params){
        return new Promise((resolve, reject)=>{
            Vue.http.get('https://api.themoviedb.org/3/genre/movie/list', {
                params:  {
                    api_key: this.key,
                    language: this.language,
                    params
                } 
            })
            .then(response=>response.json(), response=>reject(response.statusText))

            /* Filters the array to return only the requested genres */

            .then(json=>resolve(genresIds !== null || genres.Ids !== undefined ? json.genres.filter(genre=>genresIds.includes(genre.id)) : json.genres));
        });
    }

    /* Method uses to fetch a movie by id */
    /* Takes the movie's id (integer) and return an promise of movie object (see: https://developers.themoviedb.org/3/movies/get-movie-details) */

    getMovie(movieId, params){
        return new Promise((resolve, reject)=>{
            Vue.http.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                params:  {
                    api_key: this.key,
                    language: this.language,
                    params
                } 
            })
            .then(response=>resolve(response.json()), response=>reject(response.statusText));
        });
    }
}

export default TMDB;