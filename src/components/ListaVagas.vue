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
        <div class="column is-one-third" v-for="vaga in vagas">
          <card-vaga :vaga="vaga" @click="mostrarDetalhesVaga(vaga)"></card-vaga>
        </div>
      </div>
      <div class="centered-content" v-if="!loading">
        {{vagas.length}} vagas listadas
      </div>
      <b-loading :is-full-page="true" :active.sync="loading" :can-cancel="false"></b-loading>
    </div>
    <!-- <b-modal :active.sync="mostrandoModalDetalhes" :has-modal-card="true">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Detalhes da vaga</p>
        </header>
        <section class="modal-card-body">
          <div class="content">
            <h1>{{vagaSelecionada.title}}</h1>
            <p>
              <b-taglist>
                <b-tag :style="`background-color:#${label.color};color:white`" v-for="label in vagaSelecionada.labels">{{label.name}}</b-tag>
              </b-taglist>
            </p>
            <hr>
            <vue-markdown :source="vagaSelecionada.body | tratarCorpoVaga"></vue-markdown>
          </div>
        </section>
        <footer class="modal-card-foot centered-content">
          <a class="button is-success" target="_blank" :href="vagaSelecionada.html_url">Acessar issue da vaga</a>
        </footer>
      </div>
    </b-modal> -->
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
  data () {
    return {
      linkAPI: process.env.VAGAS_API,
      loading: false,
      vagas: [],
      vagaSelecionada: {},
      mostrandoModalDetalhes: false
    }
  },
  filters: {
    tratarCorpoVaga: function (value) {
      if (!value) return ''
      let markdown = value;

      const preReg = /<pre>([\s\S]*?)<\/pre>/g;
      let match;
      let lastIndex = 0;

      markdown = '';

      /* eslint-disable no-cond-assign */
      while ((match = preReg.exec(value))) {
        markdown += value.substring(lastIndex, match.index);
        markdown += match[0].replace(/(?:\r\n|\r|\n)/g, '<br />');
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < value.length) {
        markdown += value.substring(lastIndex);
      }

      markdown = markdown.replace(' -', '-');
      markdown = markdown.replace('   -', '-');
      markdown = markdown.replace('  -', '-');
      markdown = markdown.replace('   -', '-');
      markdown = markdown.replace('  -', '-');
      
      value = markdown;
      return markdown
    }
  },
  created(){
    this.carregarVagas();
  },
  methods: {
    mostrarDetalhesVaga(vaga){
      this.loading = true;
      this.vagaSelecionada = vaga;
      this.mostrandoModalDetalhes = true;
      this.loading = false;
    },
    carregarVagas(){
      if (!process.env.VAGAS_API) return;
      if (this.loading) return;
      this.loading = true;

      this.axios.get(process.env.VAGAS_API)
      .then((response) => {
        this.vagas = [...response.data];
        this.loading = false;
      })
      .catch(err => {
        console.error('Ocorreu um erro na requisição! ' + JSON.stringify(err))
        this.loading = false;
      })
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
