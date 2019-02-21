'use strict'

const axios = require('axios');
const Vaga = use('App/Models/Vaga')

class VagasController {
  async BuscarVagasRepositorio (){
    let respostaVagas = await this.BuscarVagasURL("https://api.github.com/repos/frontendbr/vagas/issues?state=open");
    this.InserirAtualizarVagasBanco(respostaVagas);
    return {status: 'ok'}
  }

  async BuscarVagasURL(url){
    if (!url) return [];

    return await axios.get(url).then(async (response) => {      
      let proximaUrl = await this.BuscarProximaURL(response.headers);
      console.log(proximaUrl);
      let proximasVagas = await this.BuscarVagasURL(proximaUrl);
      return [...response.data, ...proximasVagas];
    });
  }

  async BuscarProximaURL(headers){
    let links = headers.link;
    let proximaUrl = '';
    links.replace(new RegExp("(<([^,]*))", "g"), function($0, $1, $2, $3) {
      if ($1.indexOf("next") > -1){
        $1.replace(new RegExp("(https([^>]*))", "g"), function($0, $1, $2, $3) {
          proximaUrl = $1; 
        })
      }
    })

    return proximaUrl;
  }

  async InserirAtualizarVagasBanco(vagas){
    for (let i = 0; i < vagas.length; i++) {
      try {
        const vaga_banco = await Vaga.query().where('github_id', vagas[i].id).fetch();
        if (vaga_banco.rows.length > 0){
          var vaga = await Vaga.find(vaga_banco.rows[0].id);
        }
        else {
          var vaga = new Vaga();
        }
          
        vaga.github_id = vagas[i].id;
        vaga.title = vagas[i].title;
        vaga.body = vagas[i].body;
        vaga.user_login = vagas[i].user.login;
        vaga.html_url = vagas[i].html_url;
  
        await vaga.save()
        console.log(`Atualizado ${vagas[i].title}`)
      }
      catch(error){
        console.log('Erro ao gravar vaga: ' +  error)
      }
    }
  }
}

module.exports = VagasController
