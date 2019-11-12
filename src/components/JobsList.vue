<template>
  <div class="row columns is-multiline">
    <card-vaga :vaga="job" v-for="job in jobs" :key="job._id" v-if="viewType === 'cards'"></card-vaga>
    
    <table class="table is-fullwidth is-hoverable" v-if="viewType === 'table'">
      <tbody>
        <tr v-for="job in jobs" class="middle job-row" @click="to(`/vaga/${job._id}`)">
          <td>
            <div class="media-left">
              <figure class="image is-32x32" >
                <img :src="job.user_avatar_url" alt="Avagar URL" class="is-rounded">
              </figure>
            </div>
          </td>
          <td>
            <span class="job-title">{{job.title}}</span>
            <br/>
            <div>
              @{{job.repo_name}}
              <labels-vaga :labels="job.labels" class="is-hidden-tablet m-b-sm"></labels-vaga>
            </div>
          </td>
          <td class="is-hidden-mobile"><labels-vaga :labels="job.labels"></labels-vaga></td>
          <td>{{job.created_at | formatarData}}</td></td>
        </tr>
      </tbody>
    </table>
      
  </div>
</template>

<script>
  import CardVaga from "@/components/CardVaga"
  import LabelsVaga from "@/components/LabelsVaga"
  import dateFormat from "dateformat"

  export default {
    name: 'JobsList',
    filters: {
      formatarData(data) {
        return dateFormat(data, "dd/mm/yyyy")
      },
    },
    components: {
      CardVaga,
      LabelsVaga
    },
    props:{
      jobs: Array,
      viewType: {
        type: String,
        validator: value => {
          return ['table', 'cards'].includes(value);
        }
      }
    },
    methods: {
      to(path){
        this.$router.push(path)
      }
    }
  }
</script>

<style scoped>
  .job-title{
    font-weight: bold;
    color: black;
  }

  .job-row{
    cursor: pointer;
  }

  .middle > * {
    vertical-align: middle;
  }
</style>
