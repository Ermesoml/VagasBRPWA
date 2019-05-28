import Vue from 'vue'
import Router from 'vue-router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import ListaVagas from '@/views/ListaVagas'
import DetalhesVaga from '@/views/DetalhesVaga'
import Contato from '@/views/Contato'

Vue.use(Buefy)
Vue.use(Router)

export default new Router({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'Vagas', component: ListaVagas },
    { path: '/vaga/:vaga_id', component: DetalhesVaga },
    { path: '/contato', component: Contato }
  ]
})
