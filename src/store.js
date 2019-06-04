import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paginaAtual: 1,
    filtroTituloVaga: '',
    vagas: [],
    vagaSelecionada: {},
    loading: false
  },
  mutations: {
    inserirNovasVagas(state, payload){
      state.vagas = [...state.vagas, ...payload]
    },
    atualizarPagina(state, payload){
      state.paginaAtual = payload;
    },
    atualizarVagaSelecionada(state, payload){
      state.vagaSelecionada = payload;
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
    buscarVagasNovaPagina({commit, dispatch}, novaPagina){
      commit('atualizarPagina', novaPagina)
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
      axios.get(`${process.env.VUE_APP_VAGAS_API}/vagas?pagina=${state.paginaAtual}&filtroTituloVaga=${state.filtroTituloVaga}`)
      .then((response) => {
        commit('inserirNovasVagas', response.data)
        commit('atualizarLoading', false);
      })
      .catch(err => {
        console.error('Ocorreu um erro na requisição! ' + JSON.stringify(err))
        commit('atualizarLoading', false);
      })
    },
    buscarVagasSelecionada({commit}, vagaId){
      commit('atualizarVagaSelecionada', {});
      commit('atualizarLoading', true)
      axios.get(`${process.env.VUE_APP_VAGAS_API}/vaga/${vagaId}`)
      .then((response) => {
        commit('atualizarVagaSelecionada', response.data)
        commit('atualizarLoading', false);
      })
      .catch(err => {
        console.error('Ocorreu um erro na requisição! ' + JSON.stringify(err))
        commit('atualizarLoading', false);
      })
    }
  }
})
