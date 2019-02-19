import Vue from 'vue'
import Router from 'vue-router'
import Vagas from '@/components/Vagas'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Vagas',
      component: Vagas
    }
  ]
})
