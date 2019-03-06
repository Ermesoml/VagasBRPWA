const axios = require('axios');

class scheduleVagas {
  constructor() {
    
  }
  async BuscarTodasVagasRepositorio (){
    let respostaVagas = await this.BuscarVagasURL("https://api.github.com/repos/frontendbr/vagas/issues?state=open");
    return respostaVagas;
  }

  async BuscarVagasURL(url){
    if (!url) return [];

    console.log('Buscando dados da api: ' + url);

    return await axios.get(url).then(async (response) => {      
      let proximaUrl = await this.BuscarProximaURL(response.headers);
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
}

module.exports = scheduleVagas