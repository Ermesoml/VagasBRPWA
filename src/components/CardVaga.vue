<template class="is-clipped">
  <div class="column is-full-mobile is-half-tablet is-one-third-desktop is-one-quarter-fullhd">
    <router-link :to="`/vaga/${vaga._id}`">    
      <div class="card round is-shady">
        <header class="card-header">
          <p class="card-header-title">{{vaga.title}}</p>
        </header>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <img :src="vaga.user_avatar_url" alt="Avagar URL" class="is-rounded">
              </figure>
            </div>
            <div class="media-right">
              <div class="has-text-success has-text-weight-bold has-text-centered is-size-6" v-show="vaga.repo_name">@{{vaga.repo_name}}</div>
            </div>
          </div>
        </div>
        <footer class="card-footer">
          <div class="card-footer-item has-text-grey has-text-weight-bold has-text-centered is-size-7">{{vaga.created_at | formatarData}}</div>
        </footer>
      </div>
    </router-link>
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

<style lang="scss">
  .card.is-shady {
    width: 100%;
    height: 100%;
    display: flex !important;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 !important;
    box-sizing: border-box;
    &:hover {
      transform: scale(1.03)
    }
    .media {
      display: flex;
      align-items: center;
    }
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
