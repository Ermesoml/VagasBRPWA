<template class="is-clipped">
  <div>
    <card-detalhes-vaga v-if="!$store.state.loading" :vaga="$store.state.vagaSelecionada"></card-detalhes-vaga>
    <b-loading :is-full-page="true" :active.sync="$store.state.loading" :can-cancel="false"></b-loading>
  </div>
</template>

<script>

import CardDetalhesVaga from "@/components/CardDetalhesVaga"

export default {
  name: 'DetalhesVaga',
  components: {
    CardDetalhesVaga
  },
  created(){
    this.carregarDetalhesVaga()
  },
  methods: {
    carregarDetalhesVaga(){
      this.$store.dispatch('buscarVagasSelecionada', this.$route.params.vaga_id);
    }
  }
}
</script>


<style scoped>

</style>
