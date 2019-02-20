'use strict'

const Schema = use('Schema')

class VagasSchema extends Schema {
  up () {
    this.create('vagas', (table) => {
      table.increments()
      table.string('github_id').notNullable()
      table.string('title').notNullable()
      table.string('body').notNullable()
      table.string('html_url').notNullable()
      table.string('user_login').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('vagas')
  }
}

module.exports = VagasSchema
