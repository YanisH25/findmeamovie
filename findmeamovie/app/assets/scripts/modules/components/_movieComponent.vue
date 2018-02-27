<template>
  <article class="card">
        <div class="wrapper">
            <div class="card__wrapper">
                <div class="card__titles">
                    <h1 class="card__title">{{properties.title}}</h1>
                    <p class="card__annotation">{{properties.rate}}/10</p>
                    <p class="card__annotation">{{properties.genres}}</p>
                </div>
                <img :src="properties.posterPath" class="card__poster">
            </div>
            <p class="card__resume">{{properties.resume}}</p>
        </div> 
    </article>
</template>

<script>
'use strict';
export default {
  name: 'movie-component',
  props: ['properties'],
  data() {
      return {
          
      }
  }
}
</script>