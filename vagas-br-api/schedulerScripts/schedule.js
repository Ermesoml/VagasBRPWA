require('dotenv').config()

const axios = require('axios');
const scheduleDatabase = require('./scheduleDAO.js')
const scheduleVagas = require('./scheduleVagas.js')

function buscarVagas() {
  console.log('Agendamento de busca iniciado');

  let databaseInstance = new scheduleVagas();
  databaseInstance.BuscarTodasVagasRepositorio().then(response => {
    console.log(response);
  });

  // let databaseInstance = new scheduleDatabase();
  // databaseInstance.criarAgendamento();
}

buscarVagas();