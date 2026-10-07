# Aula 11 — Configuração do `.gitignore`

Nesta atividade, foi criado o arquivo `.gitignore` na raiz do projeto Node.js para evitar que arquivos locais, temporários ou gerados sejam incluídos no controle de versão.

## O que foi configurado

- `node_modules/`: dependências instaladas pelo npm.
- `.env` e `.env.*`: arquivos com variáveis de ambiente. A exceção `!.env.example` permite manter um arquivo de exemplo no repositório.
- `logs/` e arquivos de log do npm, Yarn e pnpm.
- `dist/`, `build/` e `coverage/`: saídas de compilação e cobertura de testes.
- `.vscode/`, `.idea/`, `.DS_Store` e `Thumbs.db`: configurações locais de editores e arquivos do sistema operacional.

O `package-lock.json` não foi incluído nas regras de exclusão, portanto continua disponível para ser rastreado pelo Git e registrar as versões exatas das dependências.

## Verificação

As regras foram verificadas: arquivos dentro de `node_modules/` e `.env.local` são ignorados, enquanto `package-lock.json` não é ignorado.
