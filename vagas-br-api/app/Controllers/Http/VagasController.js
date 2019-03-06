'use strict'

const Vaga = use('App/Models/Vaga')

class VagasController {
  async all({}){
    const vagas = await Vaga.all()
    return vagas
  }
}

module.exports = VagasController
