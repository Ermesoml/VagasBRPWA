'use strict'

const Schema = use('Schema')

class AgendamentoBuscaVagasSchema extends Schema {
  up () {
    this.create('agendamento_busca_vagas', (table) => {
      table.increments()
      table.string('token', 200).notNullable()
      table.string('url', 250).notNullable()
      table.string('status', 3).defaultTo('ABE')
      table.timestamps()
    })
  }

  down () {
    this.drop('agendamento_busca_vagas')
  }
}

module.exports = AgendamentoBuscaVagasSchema
