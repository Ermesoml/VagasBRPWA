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
    },
    limparVagas(state){
      state.vagas = [];
    }
  },
  actions: {
    buscarVagasNovaPagina({commit, dispatch}, pagina){
      commit('atualizarPagina', pagina)
      commit('atualizarLoading', true)
      dispatch('buscarVagasAPI');
    },
    buscarVagasFiltrando({commit, dispatch}, filtroTituloVaga){
      commit('atualizarPagina', 1)
      commit('atualizarLoading', true)
      commit('atualizarFiltros', filtroTituloVaga);
      commit('limparVagas');
      dispatch('buscarVagasAPI');
    },
    buscarVagasAPI({commit, state}){
      axios.get(`${process.env.VUE_APP_VAGAS_API}/vagas?pagina=${state.pagina}&filtroTituloVaga=${state.filtroTituloVaga}`)
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
