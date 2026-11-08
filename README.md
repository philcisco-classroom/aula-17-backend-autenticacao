# Aula-17-backend-autenticacao

Esse repositório é construído por cima do backend presente na Aula-15-Backend-Crud: [Repo-Aula-15](https://github.com/philcisco-classroom/aula-15-crud-backend-filmes).
O objetivo é adicionar as seguintes funcionalidades:

- Criação e Login de Usuário
- Logout
- Rotas de autenticação
- Geração de Token com JWT que será inserido em cookie HttpOnly (só podem ser manipulados no servidor)
- Modificação para buscar apenas filmes pertencentes a um usuário específico.
  - Não é pré-requisito do projeto final, mas muitos colegas gostam de entender o funcionamento nesse formato então já deixo disponivel.
- Foi feita uma modificação no schemas do prisma para permitir a relação entre usuários e filmes. Para o projeto final não é necessário, mas como é de interesse da maioria da turma deixo o exemplo 

# Bibliotecas

Para o bom funcionamento do backend com autenticação precisamos instalar as seguintes bibliotecas (caso você apenas vá clonar esse projeto, elas já estão no package.json, basta executar $ npm i)

     - $ npm i bcrypt - Usada para fazer o hash da senha antes de salvar no banco de dados)
     - $ npm i jsonwebtoken - Usada para gerar o Token (assinatura digital) do usuário. Com esse Token entederemos que o usuário está autenticado e poderá acessar os recursos em /filmes
     - $ npm i -D @types/bcrypt @types/jsonwebtoken - Usada para instalar os tipos Typescript de bcrypt e jwt
     - $ npm i cookie-parser - Permite a manipulação de cookies do lado do servidor
     - $ npm i -D @types/cookie-parser - Tipos Typescript do cookie-parser

bcrypt - Função hash para a senha. Não devemos armazenar senhas em texto claro
JWT - Para autenticação e geração de tokens.

# Novos arquivos


```
src
├── controller
    ├── auth.controller.ts (local chamado após o desvio do auth.routes. Aqui extrai os dados das requisições antes de chamar os services
├── middelware
    ├── auth.middleware.ts (Local que iintercepta requisições e verificar se usuário possui token válido)
├── routes
    ├── auth.routes.ts (Faz o redirecionamento de POST /create, POST /login e POST /logout)
├── tipos
    ├── auth-payload.ts (tipo de dado que representa o conteúdo útil de autenticação)
├── services
    ├── auth.services.ts (acesso a base de dados para criar user e validar login)


```

# Criar .env

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="gerar um token".
```

Uma forma comum para gerar o JWT_SECRET é usar o próprio node. Com a seguinte sintaxe no terminal:

```bash
node
require('crypto').randomBytes(64).toString('hex')
```
Em seguida copiar o resultado e colocar como valor de JWT_SECRET
  - $ .exit (para fechar o terminal node)

Caso não tenha configurado o banco de dados:
   - $ npx prisma db push
   - $ npx prisma generate

Para monitorar os dados no banco pelo navegador:
   - $ npx prisma studio


## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- Node.js
- npm 

## Instalação e configuração

**1. Instale as dependências**

Na raiz do projeto, execute:

```bash
npm install
```

**2. Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto, com o seguinte conteúdo:

```env
DATABASE_URL="file:./dev.db"
```

**3. Sincronize o banco de dados**

Execute:

```bash
npx prisma db push
```

Esse comando cria o banco SQLite, caso ainda não exista, e sincroniza sua estrutura com os modelos definidos em `prisma/schema.prisma`.
Nessa aula temos apenas o modelo "filme" e "user"


**4. Gere o Prisma Client**

Execute:

```bash
npx prisma generate
```

Esse comando gera o cliente utilizado pela aplicação para acessar o banco de dados.
Será gerada uma pasta "src/generated". Não modifique nada nessa pasta.
Observe também no .gitignore que ela não é versionada, e portanto, não está no repositório.


## Executando o projeto

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
```


## Prisma Studio

O Prisma Studio permite visualizar, inserir, editar e excluir registros do banco de dados por meio de uma interface gráfica no navegador.

Para iniciar, execute:

```bash
npm run prisma:studio
```

Faça isso em outro terminal para ter, ao mesmo tempo, o prisma studio aberto no navegador e o servidor executando.


**Observação:** neste projeto, o comando do Studio utiliza uma URL específica (`file://./dev.db`) como contorno para uma incompatibilidade observada com SQLite no Prisma Studio. 
A aplicação e a configuração principal do Prisma continuam utilizando `file:./dev.db`.

Você pode conferir isso no package.json.

O comando `prisma:studio` é um script definido no arquivo `package.json`, na seção `scripts`:

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "prisma:studio": "prisma studio --url \"file://./dev/bd\""
  }
}
```

