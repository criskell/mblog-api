# mblog-api
API para um backend de uma aplicação de microblogging.

## Estrutura de diretórios e arquivos
- src/
	- config/: Configurações do Passport, TypeORM e etc.
	- controllers/: Manipuladores de rotas do Express.
	- middlewares/:
		- check-auth.ts: Middleware que checa a autenticação, atualmente via JWT.
	- routers/: Roteadores do Express.
	- orm/: Camada de banco de dados.
		- migrations/: Diretório de migrations executadas com a CLI do TypeORM.
		- entities/: Diretório das entidades do TypeORM.
		- datasource.ts: Exporta um datasource do TypeORM junto com repositórios das entidades.
	- validations/: Esquemas do Joi com o middleware Celebrate.
	- app.ts
	- server.ts
- __tests__: Testes de integração e unitário do Jest.
- .env: Arquivo com variáveis de ambiente.