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
  data () {
    return {
      linkAPI: process.env.VUE_APP_VAGAS_API,
    }
  },
}
</script>


<style scoped>
  /* @import "https://unpkg.com/bulma-modal-fx/dist/css/modal-fx.min.css";
  @import "https://unpkg.com/katex@0.10.0/dist/katex.min.css";

  .centered-content{
    display: flex;
    justify-content: center;
    align-items: center;
  }  
  .is-shady {
    animation: flyintoright .4s backwards;
    background: rgba(235, 235, 235, 0.705);
    border-radius: 4px;
    display: inline-block;
    margin: 10px;
    position: relative;
    transition: all .2s ease-in-out;
    cursor: pointer;
  }
  .is-shady:hover {
    box-shadow: 0 10px 16px rgba(0, 0, 0, .13), 0 6px 6px rgba(0, 0, 0, .19);
  } */
  
</style>
