<template class="is-clipped">
  <card-detalhes-vaga :vaga="vaga"></card-detalhes-vaga>
</template>

<script>

import CardDetalhesVaga from "@/components/CardDetalhesVaga"

export default {
  name: 'DetalhesVaga',
  components: {
    CardDetalhesVaga
  },
  data () {
    return {
      linkAPI: process.env.VUE_APP_VAGAS_API,
      vaga: {}
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
