<template class="is-clipped">
  <div class="card large round is-shady">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-96x96">
            <img :src="vaga.user_avatar_url" alt="Avagar URL" class="is-rounded">
          </figure>
          <div class="has-text-grey has-text-weight-bold has-text-centered texto-12">{{vaga.created_at | formatarData}}</div>
          <div class="has-text-grey has-text-weight-bold has-text-centered texto-12" v-show="vaga.repo_name">@{{vaga.repo_name}}</div>
        </div>
        <div class="content">
          <div class="title is-6 no-padding m-b-sm">{{vaga.title}}</div>
          <p>
            <labels-vaga :labels="vaga.labels"></labels-vaga>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LabelsVaga from "@/components/LabelsVaga"
import helper from "@/helpers.js"
import dateFormat from "dateformat"

export default {
  name: 'CardVaga',
  mixins: [helper],
  props:{
    vaga: Object
  },
  components: {
    LabelsVaga,
  },
  filters: {
    formatarData(data) {
      return dateFormat(data, "dd/mm/yyyy")
    },
  }
}
</script>

<style>
  .texto-12{
    font-size: 12px
  }
</style>