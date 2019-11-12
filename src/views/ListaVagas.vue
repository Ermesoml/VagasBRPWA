<template class="is-clipped">
  <div>
    <section class="hero is-info is-small">
      <div class="hero-body">
        <div class="container has-text-centered">
          <p class="title">
            Vagas Abertas
          </p>
          <p class="subtitle">
            Vagas abertas para desenvolvedores e designers.
          </p>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="section">
        <div class="row columns is-multiline">
          <div class="column is-one-third" v-if="!loading">
            <b-field label="Repositório" label-position="on-border">
              <b-select expanded v-model="filtroRepositorio">
                <option
                  v-for="repositorio in $store.state.repositorios"
                  :value="repositorio._id"
                  :key="repositorio._id">
                  {{ repositorio._id }} ({{repositorio.count}})
                </option>
              </b-select>
            </b-field>
          </div>
          <div class="column is-half" v-if="!loading">
            <b-field label="Filtro (avançado)" label-position="on-border">
              <b-input placeholder="Ex.: javascript remoto"
                expanded
                type="search"
                v-model="filtroTituloVaga"
                expanded
                @keydown.native.enter="filtrarVagas(filtroTituloVaga, filtroRepositorio, tipoFiltroSelecionado)">
              </b-input>
            </b-field>
          </div>
          <div class="column is-two-third" v-if="!loading">
            <p class="control">
              <button class="button is-primary is-fullwidth" @click="filtrarVagas(filtroTituloVaga, filtroRepositorio, tipoFiltroSelecionado)">Filtrar</button>
            </p>
          </div>
        </div>
        <hr class="is-marginless">
        
        <div class="is-fullwidth view-jobs-options">
          <button class="button" @click="usingCard = !usingCard">
            <b-icon
              v-if="usingCard"
              pack="fas"
              icon="id-card-alt"
              size="is-small">
            </b-icon>
            <b-icon
              v-else
              pack="fas"
              icon="table"
              size="is-small">
            </b-icon>
          </button>
        </div>
        
        <jobs-list class="is-fullwidth" :viewType="usingCard ? 'cards' : 'table'" :jobs="$store.state.vagas"></jobs-list>
        
        <div class="centered-content" v-if="!loading && $store.state.vagas.length > 0">
          <b-button size="is-large" type="is-success" outlined rounded @click="carregarVagas($store.state.paginaAtual + 1)">Buscar mais vagas</b-button>
        </div>
        <b-loading :is-full-page="true" :active.sync="loading" :can-cancel="false"></b-loading>
      </div>
    </div>
  </div>
</template>

<script>
  import VueMarkdown from 'vue-markdown'
  import JobsList from '@/components/JobsList'

  export default {
    name: 'Vagas',
    components: {
      VueMarkdown,
      JobsList
    },
    data(){
      return {
        filtroTituloVaga: '',
        filtroRepositorio: '',
        tipoFiltroSelecionado: 'S',
        tiposFiltros: [{
          valor: 'S',
          titulo: 'Simples (Título e Texto)',
        },
        {
          valor: 'A',
          titulo: 'Avançada (somente Texto)',
        }],
        usingCard: false
      }
    },
    computed:{
      loading: function(){
        return this.$store.state.loading;
      },
    },
    created(){
      this.filtroTituloVaga = this.$store.state.filtroTituloVaga;
      this.filtroRepositorio = this.$store.state.filtroRepositorio;

      if (this.$store.state.vagas.length > 0)
        return;

      this.carregarVagas();
    },
    methods: {
      carregarVagas(pagina = 1){
        this.$store.dispatch('buscarVagasNovaPagina', pagina);
      },
      filtrarVagas(filtroTituloVaga, filtroRepositorio, tipoFiltro){
        this.$store.dispatch('buscarVagasFiltrando', {filtroTituloVaga: filtroTituloVaga, filtroRepositorio: filtroRepositorio, tipoFiltroSelecionado: tipoFiltro});
      }
    }
  }
</script>

<style scoped>
  @import "https://unpkg.com/bulma-modal-fx/dist/css/modal-fx.min.css";
  @import "https://unpkg.com/katex@0.10.0/dist/katex.min.css";

  .centered-content{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .view-jobs-options{
    display: flex;
    justify-content: right;
    align-items: flex-end;
    flex-direction: row-reverse;
    margin: 10px 0 10px 0;
  }
</style>
