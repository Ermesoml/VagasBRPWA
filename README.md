# VagasBR - Vagas para desenvolvedores e designers

## Descrição

Este projeto tem por objetivo a reunião de vagas na área de desenvolvimento e designer de software que estejam espalhadas em diversos repositórios no github.

## Tecnologias utilizadas

Este projeto é dividido em duas partes:
- WebApp
  - Vue.js
  - Vuex
  - axios
  - vuecli
- API backend [Clique aqui](https://github.com/Ermesoml/VagasBRAPI)
  - Node.js
  - Express.js
  - Mongoose (mongodb)

Como pode ser visto acima, o projeto utiliza mongodb para armazenamento das vagas coletadas. Para mais detalhes da arquitetura da api backend [Clique aqui](https://github.com/Ermesoml/VagasBRAPI)

## Executando o projeto - Frontend
- Faça o clone ou download do projeto;
- Acesse a pasta do projeto pelo prompt de comando e digite `npm install` para instalar as dependências do projeto;
- Renomeie o arquivo `.env.example` para `.env`;
- No arquivo `.env` informe o endereço onde se encontra a API backend na variável `VUE_APP_VAGAS_API` ([Clique aqui](https://github.com/Ermesoml/VagasBRAPI) para acesso aos fontes do backend);
- Execute o comando `npm run serve` para acesso ao servidor de desenvolvimento ou `npm run build` para construção dos arquivos para release;

## Host

Este projeto está sendo executado no netlify através de deploys automáticos. Para mais detalhes de como configurar um projeto vue no netlify acesse [este artigo](https://medium.com/@lpellis/deploying-vue-with-netlify-from-scratch-28b6c2249081)

## Comandos disponíveis

- npm run serve
- npm run build
- npm run test
- npm run lint
- npm run test:e2e


### Para mais detalhes de configuração acesse a documentação do vue: [Referência de configuração](https://cli.vuejs.org/config/).