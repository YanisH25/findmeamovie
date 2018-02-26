'use strict';

import Vue from 'vue';

class API {

    /* Constructor */
    /* Takes an object in parameter that contains the api credential (api_key) and the language (language) */
    constructor(args){
        this.key = args.key;
        this.language = args.language === undefined || args.language === null ? 'en-US' : args.language;
    }

    /* Method uses to fetch the movies that match with the arguments */
    /* Takes a string that is the query argument in parameter and returns an object with movies (see: https://developers.themoviedb.org/3/movies/get-movie-details) */ 
    query(args){
        return new Promise((resolve, reject)=>{
            Vue.http.get('https://api.themoviedb.org/3/search/movie', {
                api_key: this.key,
                query: args
            })
            .then(response=>response.json(), response=>reject(response.statusText))
            .then(json=>resolve(json));
        });
    }
}