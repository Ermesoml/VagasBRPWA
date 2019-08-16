import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paginaAtual: 1,
    filtroTituloVaga: '',
    repositorios: [],
    filtroRepositorio: 'Todos',
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
    atualizarRepositorios(state, payload){
      const c = payload.reduce((a, b) => ({count: a.count + b.count}))
      state.repositorios = [{_id: 'Todos', count: c.count},...payload];
    },
    atualizarVagaSelecionada(state, payload){
      state.vagaSelecionada = payload;
    },
    atualizarLoading(state, payload){
      state.loading = payload;
    },
    atualizarFiltros(state, payload){
      state.filtroTituloVaga = payload.filtroTituloVaga;
      state.filtroRepositorio = payload.filtroRepositorio;
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
    buscarVagasFiltrando({commit, dispatch}, filtro){
      commit('atualizarPagina', 1)
      commit('atualizarLoading', true)
      commit('atualizarFiltros', {filtroTituloVaga: filtro.filtroTituloVaga, filtroRepositorio: filtro.filtroRepositorio});
      commit('limparVagas');
      dispatch('buscarVagasAPI');
    },
    buscarVagasAPI({commit, state}){
      axios.get(`${process.env.VUE_APP_VAGAS_API}/vagas?pagina=${state.paginaAtual}&filtroTituloVaga=${state.filtroTituloVaga}&filtroRepositorio=${state.filtroRepositorio}`)
      .then((response) => {
        commit('inserirNovasVagas', response.data)
        commit('atualizarLoading', false);
      })
      .catch(err => {
        console.error('Ocorreu um erro na requisição! ' + JSON.stringify(err))
        commit('atualizarLoading', false);
      })

      axios.get(`${process.env.VUE_APP_VAGAS_API}/repositorios`)
      .then((response) => {
        commit('atualizarRepositorios', response.data)
      })
      .catch(err => {
        console.error('Ocorreu um erro na requisição de repositórios! ' + JSON.stringify(err))
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
