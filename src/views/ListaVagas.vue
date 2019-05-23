<template class="is-clipped">
  <div class="container">
    <section class="hero is-info is-small">
      <div class="hero-body">
        <div class="container has-text-centered">
          <p class="title">
            Vagas Abertas
          </p>
          <p class="subtitle">
            @frontendbr, @backendbr
          </p>
        </div>
      </div>
    </section>
    <div class="section">
      <div class="row columns is-multiline">
        <div class="column is-full" v-if="!loading">
          <b-field class="is-full">
            <b-input placeholder="Digite aqui seu filtro..."
              type="search"
              icon="magnify"
              v-model="filtroTituloVaga"
              expanded
              @keydown.native.enter="filtrarVagas(filtroTituloVaga)">
            </b-input>
            <p class="control">
              <button class="button is-primary" @click="filtrarVagas(filtroTituloVaga)">Filtrar</button>
            </p>
          </b-field>
        </div>
        <div class="column is-one-third" v-for="vaga in $store.state.vagas">
          <router-link :to="`/vaga/${vaga._id}`">
            <card-vaga :vaga="vaga"></card-vaga>
          </router-link>
        </div>
      </div>
      <div class="centered-content" v-if="!loading && $store.state.vagas.length > 0">
        <b-button rounded @click="carregarVagas($store.state.paginaAtual + 1)">Buscar mais vagas</b-button>
      </div>
      <b-loading :is-full-page="true" :active.sync="loading" :can-cancel="false"></b-loading>
    </div>
  </div>
</template>

<script>
  import VueMarkdown from 'vue-markdown'
  import CardVaga from '@/components/CardVaga'

  export default {
    name: 'Vagas',
    components: {
      VueMarkdown,
      CardVaga
    },
    data(){
      return {
        filtroTituloVaga: ''
      }
    },
    computed:{
      loading: function(){
        return this.$store.state.loading;
      },
     
    },
    created(){
      this.filtroTituloVaga = this.$store.state.filtroTituloVaga;
      
      if (this.$store.state.vagas.length > 0)
        return;
      
      this.carregarVagas();
    },
    methods: {
      carregarVagas(pagina = 1){
        this.$store.dispatch('buscarVagasNovaPagina', pagina);
      },
      filtrarVagas(filtroTituloVaga){
        this.$store.dispatch('buscarVagasFiltrando', filtroTituloVaga);
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
  .is-shady {
    animation: flyintoright .4s backwards;
    background: rgba(235, 235, 235, 0.705);
    /* box-shadow: rgba(0, 0, 0, .1) 0 1px 0; */
    border-radius: 4px;
    display: inline-block;
    margin: 10px;
    position: relative;
    transition: all .2s ease-in-out;
    cursor: pointer;
  }
  .is-shady:hover {
    box-shadow: 0 10px 16px rgba(0, 0, 0, .13), 0 6px 6px rgba(0, 0, 0, .19);
  }
  
</style>
