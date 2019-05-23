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
              <labels-vaga :labels="vaga.labels"></labels-vaga>
            </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LabelsVaga from "@/components/LabelsVaga"

export default {
  name: 'CardVaga',
  props:{
    vaga: Object
  },
  components: {
    LabelsVaga
  },
}
</script>
