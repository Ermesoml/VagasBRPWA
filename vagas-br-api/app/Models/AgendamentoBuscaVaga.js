'use strict'

const Model = use('Model')

class AgendamentoBuscaVaga extends Model {
  static get table(){
    return 'agendamento_busca_vagas'
  }
}

module.exports = AgendamentoBuscaVaga
