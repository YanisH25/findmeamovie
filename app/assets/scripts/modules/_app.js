'use strict';

import Vue from 'vue';
import app from './components/_app.vue';

new Vue({
    el: '#app',
    render: h=>h(app)
});