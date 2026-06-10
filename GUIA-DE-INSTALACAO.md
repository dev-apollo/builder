# Builder - Guia de instalação local

Este documento explica o que precisa ser feito para rodar o sistema na máquina local.

## Estrutura

- `builder-frontend`: aplicação React/Vite
- `builder-backend`: API Node.js com MongoDB

## Pré-requisitos

- Node.js instalado
- npm instalado
- Acesso ao MongoDB usado pelo backend

## Observação importante

O frontend não usa `.env` hoje. A URL da API está configurada diretamente em `src/services/api.ts`.

Se o backend rodar em outra porta, esse arquivo precisa ser ajustado.

## 1. Instalar o frontend

No terminal, entre na pasta do frontend e instale as dependências:

```bash
npm i
```

## 2. Preparar o backend

Entre na pasta do backend. Se os dois projetos estiverem lado a lado, use:

```bash
cd ..\builder-backend
```

Se a sua estrutura for diferente, substitua pelo caminho correspondente na sua máquina.

Instale as dependencias:

```bash
npm i
```

Crie um arquivo `.env` na raiz do backend com estas variáveis:

```env
PORT=5178
DB_URI=sua_string_de_conexao_mongodb
JWT_KEY=sua_chave_secreta
```

## 3. MongoDB

O backend depende do MongoDB para autenticar usuários e salvar empresas e assinaturas.

Você precisa de:

- uma instância MongoDB ativa;
- uma string de conexão válida no `DB_URI`;
- acesso liberado para a máquina onde o backend vai rodar.

## 4. Executar o backend

Na pasta do backend, rode:

```bash
node server.js
```

O backend deve subir na porta definida em `PORT`.

## 5. Conferir a API no frontend

Em `src/services/api.ts`, a URL deve apontar para o backend local:

```ts
baseURL: "http://localhost:5178/"
```

Se alterar a porta do backend, atualize esse valor.

## 6. Executar o frontend

Na pasta do frontend, rode:

```bash
npm run dev
```

Depois, acesse a URL exibida pelo Vite.

## Comandos principais

- `npm i` - instala dependências;
- `npm run dev` - inicia o frontend;
- `npm run build` - gera a versão de produção;
- `node server.js` - inicia o backend.

## Arquivos mais importantes

- `src/services/api.ts` - endereço da API;
- `server.js` - inicialização do backend;
- `.env` do backend - configuração do MongoDB, porta e JWT.

