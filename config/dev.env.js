'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VAGAS_API: '"http://127.0.0.1:3333/vagas"'
})
