import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paginaAtual: 1,
    filtroTituloVaga: '',
    vagas: [],
    loading: false
  },
  mutations: {
    inserirNovasVagas(state, payload){
      state.vagas = [...state.vagas, ...payload]
    },
    atualizarPagina(state, payload){
      state.pagina = payload;
    },
    atualizarLoading(state, payload){
      state.loading = payload;
    },
    atualizarFiltros(state, payload){
      state.filtroTituloVaga = payload;
    }
  },
  actions: {
    buscarVagas({commit, state}, pagina){
      if (state.vagas.length > 0 && pagina <= state.paginaAtual)
        return;

      commit('atualizarPagina', pagina)
      commit('atualizarLoading', true)
      
      axios.get(`${process.env.VUE_APP_VAGAS_API}?pagina=${pagina}&filtroTituloVaga=${state.filtroTituloVaga}`)
      .then((response) => {
        commit('inserirNovasVagas', response.data)
        commit('atualizarLoading', false);
      })
      .catch(err => {
        console.error('Ocorreu um erro na requisição! ' + JSON.stringify(err))
        commit('atualizarLoading', false);
      })
    }
  }
})
