require('dotenv').config()

const axios = require('axios');
const scheduleDatabase = require('./scheduleDAO.js')

function buscarVagas() {
  console.log('Agendamento de busca iniciado');

  let databaseInstance = new scheduleDatabase();
  databaseInstance.criarAgendamento();
}
buscarVagas();