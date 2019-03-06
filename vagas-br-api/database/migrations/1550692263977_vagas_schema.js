'use strict'

const Schema = use('Schema')

class VagasSchema extends Schema {
  up () {
    this.create('vagas', (table) => {
      table.increments()
      table.string('github_id', 255).notNullable()
      table.string('title', 255).notNullable()
      table.text('body').notNullable()
      table.string('html_url', 255).notNullable()
      table.string('user_login', 255).notNullable()
      table.string('status', 3).default('ABE')
      table.timestamps()
    })
  }

  down () {
    this.drop('vagas')
  }
}

module.exports = VagasSchema
