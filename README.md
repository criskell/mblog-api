# mblog-api
API para um backend de um microblog.

## Como executar
1. Clone o repositório.
2. Execute `npm install` para instalar as dependências.
3. Copie `.env.example` num arquivo chamado `.env` e configure as variáveis de ambiente.
3. Execute `npm run start:dev` para executar o servidor HTTP na porta 3000.

## Testes
1. Copie `.env.example` para `.env.test` e configure as variáveis de ambiente.
2. Execute `npm run test:integration`.

## Estrutura de arquivos
- src/
	- config/: Configurações do Passport, TypeORM e etc.
	- controllers/: Manipuladores de rotas do Express.
	- middlewares/: Middlewares do Express.
	- routers/: Roteadores do Express.
	- orm/: Camada de banco de dados.
		- migrations/: Diretório de migrations executadas com a CLI do TypeORM.
		- entities/: Diretório das entidades do TypeORM.
	- validations/: Esquemas do Joi com o middleware Celebrate.
	- errors/: Contém classes de erros.
	- types/: Contém tipagens do TypeScript.
- \_\_tests\_\_: Testes de integração e unitário do Jest.
- .env: Arquivo com variáveis de ambiente.

## O que utilizei
- Express para rotas e middleware
- TypeScript para linguagem de programação
- Passport e JWT para lidar com autenticação
- Postgres para SGBD
- TypeORM para ORM
- Jest para testes de integração
- ESLint para linting e Prettier para formatação de código