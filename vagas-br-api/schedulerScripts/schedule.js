require('dotenv').config()

const axios = require('axios');
const scheduleDatabase = require('./scheduleDAO.js')
const scheduleVagas = require('./scheduleVagas.js')

async function buscarVagas() {
  console.log('Agendamento de busca iniciado');

  let buscadorVagas = new scheduleVagas();
  let databaseInstance = new scheduleDatabase();
  
  let vagas = await buscadorVagas.BuscarTodasVagasRepositorio().then(async response => {
    return response;
  });

  await databaseInstance.InserirAtualizarVagasBanco(vagas);
}

buscarVagas();