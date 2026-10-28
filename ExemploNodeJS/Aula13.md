# Aula 13 — API de usuários com MongoDB

Nesta aula, o projeto Node.js foi organizado para disponibilizar operações de cadastro e consulta de usuários por meio de uma API REST. A aplicação utiliza Express para receber as requisições e Mongoose para acessar o MongoDB.

## Organização do código

- `app.js`: configura o Express, habilita o processamento de JSON, carrega as variáveis de ambiente e conecta ao MongoDB. As rotas de usuários ficam sob o caminho `/usuarios`. O servidor inicia na porta `3000` depois que a conexão com o banco é estabelecida.
- `routes/usuarioRoutes.js`: declara os caminhos HTTP disponíveis e os encaminha para as funções do controller.
- `controllers/usuarioController.js`: implementa as operações de consulta, criação, atualização, remoção e autenticação.
- `models/usuario.js`: define o modelo Mongoose `Usuario`, associado à coleção `usuario`.

## Dados do usuário

O modelo contém os campos:

| Campo | Tipo |
|---|---|
| `nome` | Texto |
| `email` | Texto |
| `senha` | Texto |
| `ativo` | Booleano |

## Rotas implementadas

Todas as rotas abaixo são relativas ao prefixo `/usuarios`.

| Método | Caminho | Funcionamento |
|---|---|---|
| `GET` | `/` | Lista os usuários. Se a query string `ativo` for informada, filtra os resultados por esse campo. |
| `GET` | `/:id` | Busca um usuário pelo identificador do MongoDB. |
| `POST` | `/` | Cria um usuário com os dados enviados no corpo JSON: `nome`, `email`, `senha` e `ativo`. |
| `PUT` | `/:id` | Atualiza os campos do usuário identificado e retorna o registro atualizado. |
| `DELETE` | `/:id` | Remove o usuário identificado e informa quando ele não é encontrado. |
| `POST` | `/autenticacao` | Verifica se existe um usuário ativo com o `email` e a `senha` enviados no corpo JSON. Retorna `autenticado: true` em caso de sucesso ou status HTTP `401` caso contrário. |

## Configuração e execução

A URI de conexão é lida da variável de ambiente `MONGODB_URI`, carregada com `dotenv`. Configure essa variável no ambiente local antes de iniciar a aplicação.

O script de desenvolvimento definido no `package.json` executa:

```bash
npm run dev
```

Após conectar ao banco, a aplicação fica disponível na porta `3000`.

## Rotas de exemplo mantidas

Além da API de usuários, `app.js` mantém rotas simples usadas como exemplos de Express:

- `GET /`: retorna uma mensagem de boas-vindas.
- `GET /hello`: monta uma saudação com os parâmetros `nome` e `sobrenome`.
- `GET /cliente/:id`: retorna o identificador recebido pela URL.
- `POST /somar`: soma os valores `num1` e `num2` recebidos no corpo JSON.
