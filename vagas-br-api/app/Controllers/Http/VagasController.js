'use strict'

const axios = require('axios');
const Vaga = use('App/Models/Vaga')

class VagasController {
  async BuscarVagasRepositorio (){
    axios.get("https://api.github.com/repos/frontendbr/vagas/issues?state=open").then(async (response) => {

      for (let i = 0; i < response.data.length; i++) {
        let vagaGit = response.data[i];

        try {
          // const despesa_banco = await Despesa.query().where('idDocumento', despesa.idDocumento).where('deputadoId', despesa.deputadoId).fetch();
          // if (despesa_banco.rows.length > 0){
          //   var despesaAtualizar = await Despesa.find(despesa_banco.rows[0].id);
          // }
          // else {
            var vaga = new Vaga();
          // }
            
          vaga.github_id = vagaGit.id;
          vaga.title = vagaGit.title;
          vaga.body = vagaGit.body;
          vaga.user_login = vagaGit.user.login;
          vaga.html_url = vagaGit.html_url
    
          await vaga.save()
          console.log(`Nova vaga ${vagaGit.title}`)
        }
        catch(error){
          console.log('Erro ao gravar vaga: ' +  error)
        }
      }
    });

    return {v: 'b'}
  }
}

module.exports = VagasController
