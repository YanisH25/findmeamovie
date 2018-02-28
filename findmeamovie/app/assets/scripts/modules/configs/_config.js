/* The whole app's configuration, includes the API key, the language, the formatting parameters and so on */

'use strict';

export default {
    /* API key from: https://www.themoviedb.org */
    api :{
        key: '70c586b48464f5c9556a19dc2902924b'
    },
    /* Movie formatting and data configurations */
    movie: {
        genres: {
            /* The reducer for genres formatting, acts on the way the genres are written */
            formatter(accumulator, current, i){
                return `${accumulator}, ${current}`;
            },
            default: 'Genre non spécifié'
        },
        posterPath: {
            /* The base url where the TMDB's images are stored */
            baseUrl: 'https://image.tmdb.org/t/p/w500'
        },
        /* Method uses to sort the movies by popularity */
        sort : (a, b)=>{
            if (a.popularity > b.popularity){
                return -1;
            }else {
                return 1;
            }
        }
    },
    /* The language in which the data will be (see: https://developers.themoviedb.org/3/getting-started/regions) */
    language: 'fr-FR'
};

