<template class="is-clipped">
  <div class="container">
    <section class="">
      <div class="content">
        <h1>{{vaga.title}}</h1>
        <p>
          <labels-vaga :labels="vaga.labels"></labels-vaga>
        </p>
        <hr>
        <vue-markdown :source="vaga.body | tratarCorpoVaga"></vue-markdown>
      </div>
    </section>
    <footer class="centered-content">
      <a class="button is-success" target="_blank" :href="vaga.html_url">Acessar issue da vaga</a>
    </footer>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import LabelsVaga from "@/components/LabelsVaga"

export default {
  name: 'DetalhesVaga',
  components: {
    VueMarkdown,
    LabelsVaga
  },
  data () {
    return {
      linkAPI: process.env.VUE_APP_VAGAS_API,
      vaga: {}
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
    this.carregarDetalhesVaga()
  },
  methods: {
    carregarDetalhesVaga(){
      if (!this.linkAPI) return;
  
      this.axios.get(`${this.linkAPI}/vaga/${this.$route.params.vaga_id}`)
      .then((response) => {
        this.vaga = response.data
      })
      .catch(err => {
        console.error('Ocorreu um erro na requisição! ' + JSON.stringify(err));
      })
    }
  }
}
</script>


<style scoped>

</style>
