<template>
  <header class="header section">
        <div class="wrapper">
                <h1 class="section__title">Recherchez un film en toute simplicité !</h1>
                <h2 class="section__subtitle">Entrez simplement quel type de film vous recherchez :</h2>
                <input type="text" id="input-movie" class="input" placeholder="Recherchez un film (titre, ambiance, acteur...)" v-on:keypress.enter="handler(query)" v-model="query">   
        </div>
    </header>
</template>

<script>
'use strict';

export default {
  data(){
      return {
          query: ''
      }
  },
  
  props: ['handler']
}
</script>