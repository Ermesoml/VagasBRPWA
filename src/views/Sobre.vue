<template class="is-clipped">
   <div class="container">
    <div class="section">
      <div class="centered-content">
        <router-link rounded to="/">
          <b-button class="m-b-sm is-primary">Voltar à lista de vagas</b-button>
        </router-link>
      </div>
      <div class="row columns is-multiline">
        <div class="column is-full">
          <h1 class="title">Sobre o projeto</h1>
          <p>Este é um projeto opensource e possui o objetivo de reunir as vagas que estejam reunidas em diversos repositórios do github. Caso deseje que uma vaga apareça aqui basta publicar em um dos seguintes grupos:</p>
          <li class="m-t-sm" v-for="repositorio in repositorios"><a :href="repositorio.url">{{repositorio.nome}}</a></li>
        </div>
        <div class="column is-full">
          <h1  class="title">Contribuintes</h1>
          <a href="https://github.com/Ermesoml">
            <div class="card large round is-shady">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-96x96">
                      <img src="https://avatars0.githubusercontent.com/u/8354256?s=460&v=4" alt="Avagar URL" class="is-rounded">
                    </figure>
                  </div>
                  <div class="content">
                    <div class="title is-6 no-padding m-b-sm">Ermesom Lourenço</div>
                    <a href="https://github.com/Ermesoml">https://github.com/Ermesoml</a>
                    <br>
                    <a href="https://www.linkedin.com/in/ermesomlourenco/">https://www.linkedin.com/in/ermesomlourenco/</a>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="column is-full">
          <h1  class="title">Fontes do projeto (github)</h1>
          <a href="https://github.com/Ermesoml/VagasBRAPI">https://github.com/Ermesoml/VagasBRAPI</a>
          <br>
          <a href="https://github.com/Ermesoml/VagasBRPWA">https://github.com/Ermesoml/VagasBRPWA</a>
        </div>
      </div>
    </div>
   </div>
</template>

<script>

export default {
  name: 'Sobre',
  data(){
    return {
      repositorios: [
        {
          nome: 'frontendbr',
          url: 'https://github.com/frontendbr/vagas/'
        },
        {
          nome: 'react-brasil',
          url: 'hhttps://github.com/react-brasil/vagas/'
        },
        {
          nome: 'backend-br',
          url: 'https://github.com/backend-br/vagas/'
        },
        {
          nome: 'soujava',
          url: 'https://github.com/soujava/vagas-java/'
        },
        {
          nome: 'phpdevbr',
          url: 'https://github.com/phpdevbr/vagas/'
        },
        {
          nome: 'androiddevbr',
          url: 'https://github.com/androiddevbr/vagas/'
        },
        {
          nome: 'CocoaHeadsBrasil',
          url: 'https://github.com/CocoaHeadsBrasil/vagas/'
        },
        {
          nome: 'vuejs-br',
          url: 'https://github.com/vuejs-br/vagas/'
        },
        {
          nome: 'CangaceirosDevels',
          url: 'https://github.com/CangaceirosDevels/vagas/'
        },
      ]   
    }
  }
}
</script>


<style scoped>

</style>
