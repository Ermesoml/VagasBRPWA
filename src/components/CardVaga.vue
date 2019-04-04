<template class="is-clipped">
  <div class="card large round is-shady">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-96x96">
            <img :src="vaga.user_avatar_url" alt="Avagar URL" class="is-rounded">
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
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'CardVaga',
  props:{
    vaga: Object
  },
  components: {
    VueMarkdown
  },
  data () {
    return {
      linkAPI: process.env.VAGAS_API,
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
  methods: {
    mostrarDetalhesVaga(vaga){
      this.loading = true;
      this.vagaSelecionada = vaga;
      this.mostrandoModalDetalhes = true;
      this.loading = false;
    },
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
