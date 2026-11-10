# Aula 15 — Consumo de API REST com HttpClient

**Disciplina:** Desenvolvimento Front-End  
**Projeto:** `ProjetoAngular` (Angular)

---

## 1. Tema da Aula

Nesta aula a aplicação Angular passou a consumir uma API REST por meio do `HttpClient`, exibindo a lista de clientes em uma tabela e permitindo a exclusão de registros.

Foram praticados:

- configuração de ambientes (`environment`) com a URL da API;
- criação de um serviço (`ClienteService`) para centralizar as chamadas HTTP;
- registro do `HttpClient` com `provideHttpClient()`;
- criação do componente `ClienteApi` e uso de `subscribe` para tratar respostas e erros;
- renderização da lista com `@for` e exclusão de itens.

---

## 2. Arquivos de ambiente

Foram criados `src/environments/environment.ts` (produção) e `src/environments/environment.development.ts` (desenvolvimento), ambos com a URL base da API:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://650b1f82dfd73d1fab099fbb.mockapi.io/api/v1/',
};
```

No `angular.json`, a configuração `development` do build recebeu `fileReplacements`, que troca `environment.ts` por `environment.development.ts` durante o desenvolvimento.

---

## 3. Serviço `ClienteService`

O serviço (`src/app/services/cliente-service.ts`) injeta o `HttpClient` e expõe os métodos de acesso à API:

```typescript
@Injectable({ providedIn: 'root' })
export class ClienteService {
  constructor(private http: HttpClient) { }

  obterClientes() {
    return this.http.get(environment.apiUrl + 'cliente');
  }
  obterClientePorId(id: number) {
    return this.http.get(environment.apiUrl + 'cliente/' + id);
  }
  excluirCliente(id: number) {
    return this.http.delete(environment.apiUrl + 'cliente/' + id);
  }
}
```

| Método | Requisição HTTP | Finalidade |
|---|---|---|
| `obterClientes()` | `GET /cliente` | Lista os clientes |
| `obterClientePorId(id)` | `GET /cliente/:id` | Busca um cliente |
| `excluirCliente(id)` | `DELETE /cliente/:id` | Remove um cliente |

Os métodos retornam `Observable`s; a requisição só é executada quando há um `subscribe`.

---

## 4. Erro `NG0201: No provider found for HttpClient`

Ao executar a aplicação ocorreu o erro:

```text
NG0201: No provider found for `_HttpClient`. Path: _ClienteService -> _HttpClient
```

**Causa:** o `ClienteService` depende do `HttpClient`, mas ele não havia sido registrado na aplicação.

**Solução:** registrar o provedor em `src/app/app-module.ts`:

```typescript
providers: [
  provideBrowserGlobalErrorListeners(),
  provideHttpClient()
],
```

`provideHttpClient()` é a forma recomendada nas versões atuais do Angular; o `HttpClientModule` está depreciado.

---

## 5. Componente `ClienteApi`

O componente `ClienteApi` (declarado no `AppModule`) usa o serviço para carregar e excluir clientes:

```typescript
ngOnInit() {
  this.carregarClientes();
}

carregarClientes() {
  this.clienteService.obterClientes().subscribe({
    next: (data: any) => this.clientes = data,
    error: (error) => console.error('Erro ao obter clientes:', error)
  });
}

excluir(id: number) {
  this.clienteService.excluirCliente(id).subscribe({
    next: () => this.carregarClientes(),
    error: (error: any) => console.error('Erro ao excluir cliente:', error)
  });
}
```

- a lista é carregada em `ngOnInit`;
- após a exclusão, a lista é recarregada para refletir o estado atual da API;
- o `subscribe` recebe um objeto com `next` (sucesso) e `error` (falha).

---

## 6. Template e rota

O template (`cliente-api.html`) exibe os clientes em uma tabela Bootstrap, com imagem, id, nome, e-mail e botão **Excluir**, usando o bloco `@for`:

```html
@for (item of clientes; track $index) {
<tr>
  <td><img [src]="item.imagem" class="img-thumbnail"></td>
  <td>{{ item.id }}</td>
  <td>{{ item.nome }}</td>
  <td>{{ item.email }}</td>
  <td><button (click)="excluir(item.id)" class="btn btn-danger">Excluir</button></td>
</tr>
}
```

O botão **Adicionar** foi incluído na tela, mas ainda não possui ação associada.

Em `app-routing-module.ts`, a rota `cliente` passou a apontar para `ClienteApi`:

```typescript
{ path: 'cliente', component: ClienteApi },
```

---

## 7. Resumo

- `HttpClient` precisa ser registrado com `provideHttpClient()` para ser injetado;
- a URL da API fica no `environment`, e o serviço concentra as chamadas HTTP;
- o componente consome o serviço com `subscribe` e trata sucesso e erro;
- a tela de clientes agora lista e exclui registros de uma API REST.
