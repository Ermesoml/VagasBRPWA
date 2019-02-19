<template class="is-clipped">
  <div class="container">
    <section class="hero is-info is-small">
      <div class="hero-body">
        <div class="container has-text-centered">
          <p class="title">
            Vagas de frontend
          </p>
          <p class="subtitle">
            @frontendbr
          </p>
        </div>
      </div>
    </section>
    <div class="section">
      <div class="row columns is-multiline">
        <div class="column is-one-third" v-for="vaga in vagas">
          <div class="card large round is-shady" @click="mostrarDetalhesVaga(vaga)">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-96x96">
                    <img :src="vaga.user.avatar_url" alt="Avagar URL" class="is-rounded">
                  </figure>
                </div>
                <div class="content">
                  <div class="title is-6 no-padding">{{vaga.title}}</div>
                    <p>
                      <b-taglist>
                        <b-tag :style="`background-color:#${label.color};color:white`" v-for="label in vaga.labels">{{label.name}}</b-tag>
                      </b-taglist>
                    </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="centered-content" v-if="!loading && proximoLink">
        <button class="button is-rounded" @click="carregarVagas">Carregar mais</button>
      </div>
      <b-loading :is-full-page="true" :active.sync="loading" :can-cancel="false"></b-loading>
    </div>
    <b-modal :active.sync="mostrandoModalDetalhes" :has-modal-card="true">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Detalhes da vaga</p>
        </header>
        <section class="modal-card-body">
          <div class="content">
            <vue-markdown :source="detalhesVaga.body"></vue-markdown>
          </div>
        </section>
        <footer class="modal-card-foot centered-content">
          <a class="button is-success" target="_blank" :href="detalhesVaga.html_url">Acessar issue da vaga</a>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'Vagas',
  components: {
    VueMarkdown
  },
  data () {
    return {
      proximoLink: 'https://api.github.com/repos/frontendbr/vagas/issues?state=open',
      loading: false,
      vagas: [],
      detalhesVaga: {},
      mostrandoModalDetalhes: false
    }
  },
  mounted(){
    this.carregarVagas();
  },
  methods: {
    mostrarDetalhesVaga(vaga){
      this.buscarDetalhesVaga(vaga.number);
    },  
    buscarDetalhesVaga(numero){
      this.loading = true;

      this.axios.get(`https://api.github.com/repos/frontendbr/vagas/issues/${numero}`)
      .then((response) => {
        let markdown = response.data.body;

        const preReg = /<pre>([\s\S]*?)<\/pre>/g;
        let match;
        let lastIndex = 0;

        markdown = '';

        /* eslint-disable no-cond-assign */
        while ((match = preReg.exec(response.data.body))) {
          markdown += response.data.body.substring(lastIndex, match.index);
          markdown += match[0].replace(/(?:\r\n|\r|\n)/g, '<br />');
          lastIndex = match.index + match[0].length;
        }

        if (lastIndex < response.data.body.length) {
          markdown += response.data.body.substring(lastIndex);
        }
        markdown = markdown.replace(' -', '-');
        markdown = markdown.replace('   -', '-');
        markdown = markdown.replace('  -', '-');
        markdown = markdown.replace('   -', '-');
        markdown = markdown.replace('  -', '-');
        
        response.data.body = markdown;
        this.detalhesVaga = response.data;

        this.mostrandoModalDetalhes = true;
        this.loading = false;
      })
    },
    carregarVagas(){
      if (!this.proximoLink) return;
      if (this.loading) return;

      this.loading = true;

      this.axios.get(this.proximoLink)
      .then((response) => {
        let links = response.headers.link;

        this.proximoLink = '';
        let proximaUrl = '';

        links.replace(new RegExp("(<([^,]*))", "g"), function($0, $1, $2, $3) {
          if ($1.indexOf("next") > -1){
            $1.replace(new RegExp("(https([^>]*))", "g"), function($0, $1, $2, $3) {
              proximaUrl = $1; 
            })
          }
        })

        this.proximoLink = proximaUrl;
        this.vagas = [...this.vagas, ...response.data];
        this.loading = false;
      })
      .catch(err => {
        alert('Ocorreu um erro na requisição! ' + JSON.stringify(err))
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
