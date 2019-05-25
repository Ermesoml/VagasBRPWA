<template>
  <div class="container">
    <section class="section">
      <header class="content">
        <h1 class="title is-marginless">{{vaga.title}}</h1>
        <div class="m-b-sm m-t-sm">
          <div class="has-text-grey-light">{{vaga.created_at | formatarData}}</div>
          <a class="has-text-link has-margin-bottom-50" v-if="vaga.repo_name" target="_blank" :href="`https://github.com/${vaga.repo_name}`">@{{vaga.repo_name}}</a>
        </div>
        <labels-vaga :labels="vaga.labels"></labels-vaga>
        <br>
        <a class="button is-primary is-fullwidth" target="_blank" :href="vaga.html_url">Acessar link da vaga</a>
        <hr>
      </header>
      <div class="content">
        <vue-markdown :source="vaga.body | tratarCorpoVaga"></vue-markdown>
      </div>
    </section>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import LabelsVaga from "@/components/LabelsVaga"
import dateFormat from "dateformat"

export default {
  name: 'CardDetalhesVaga',
  components: {
    VueMarkdown,
    LabelsVaga
  },
  props:{
    vaga: Object
  },
  filters: {
    formatarData(data) {
      return dateFormat(data, "dd/mm/yyyy")
    },
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
  
}
</script>


