
import Vue from 'vue'
import Vuex from 'vuex'
import Charts from './chart'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      Charts
    }
})