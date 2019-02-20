'use strict'

const Model = use('Model')

class Vaga extends Model {
  static get table() {
    return 'vagas';
  }
}

module.exports = Vaga
