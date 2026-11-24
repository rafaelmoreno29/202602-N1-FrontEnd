# Aula 17 — Cadastro de clientes com modal e API REST

**Disciplina:** Desenvolvimento Front-End  
**Projeto:** `ProjetoAngular` (Angular)

---

## 1. Tema da Aula

Nesta aula, a tela de clientes foi ampliada para permitir o cadastro de novos registros. O formulário é exibido em um modal do ng-bootstrap, e os dados são enviados para a API REST pelo método `POST` do `HttpClient`.

Foram praticados:

- abertura e fechamento de modais com `NgbModal`;
- captura de valores digitados no formulário;
- envio de dados para uma API com `HttpClient.post()`;
- atualização da listagem depois de uma inserção;
- integração das operações de consulta, cadastro e exclusão na mesma tela.

## 2. Serviço `ClienteService`

O serviço (`src/app/services/cliente-service.ts`) centraliza as requisições HTTP. Para inserir um cliente, foi adicionado o método:

```typescript
inserirCliente(cliente: any) {
  return this.http.post(environment.apiUrl + 'cliente', cliente);
}
```

O `POST` envia o objeto do cliente no corpo da requisição para o endpoint `/cliente`. Como os demais métodos do serviço, ele retorna um `Observable`; a requisição é realizada quando o componente chama `subscribe`.

| Método | Requisição HTTP | Finalidade |
|---|---|---|
| `obterClientes()` | `GET /cliente` | Lista os clientes |
| `obterClientePorId(id)` | `GET /cliente/:id` | Busca um cliente pelo id |
| `inserirCliente(cliente)` | `POST /cliente` | Cadastra um cliente |
| `excluirCliente(id)` | `DELETE /cliente/:id` | Exclui um cliente |

## 3. Modal de cadastro

No template (`src/app/cliente-api/cliente-api.html`), o botão **Adicionar** chama o método `open(content)`. O conteúdo referenciado por `#content` define o formulário do modal, com campos para nome, e-mail e imagem.

```html
<button class="btn btn-primary" (click)="open(content)">Adicionar</button>

<ng-template #content let-modal>
  <!-- Campos Nome, E-mail e Imagem -->
  <button type="button" (click)="modal.close('Save click')">Save</button>
</ng-template>
```

O componente injeta `NgbModal` e abre o template recebido:

```typescript
private modalService = inject(NgbModal);

open(content: TemplateRef<any>) {
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
    (result) => {
      const cliente = {
        nome: (document.getElementById('nome') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        imagem: (document.getElementById('imagem') as HTMLInputElement).value,
      };

      this.clienteService.inserirCliente(cliente).subscribe({
        next: () => this.carregarClientes(),
        error: (error) => console.error('Erro ao inserir cliente:', error)
      });
    },
    (reason) => { }
  );
}
```

O botão **Save** fecha o modal com `modal.close(...)`, resolvendo a `Promise` em `result`. Nesse caminho, o componente coleta os campos, envia o cliente para a API e, em caso de sucesso, chama `carregarClientes()` para atualizar a tabela. Fechar ou dispensar o modal não executa o cadastro.

## 4. Atualização da listagem

A lista continua sendo carregada quando o componente é inicializado. Depois de uma inserção bem-sucedida, ela é carregada novamente para exibir o novo registro:

```typescript
ngOnInit() {
  this.carregarClientes();
}
```

O método `carregarClientes()` usa `obterClientes()` e atribui os dados recebidos à propriedade `clientes`. O template percorre essa propriedade com `@for` e apresenta imagem, id, nome, e-mail e a ação **Excluir**.

## 5. Configuração necessária

O `NgbModule` é importado no `AppModule` para disponibilizar os recursos do ng-bootstrap. O componente também depende do `HttpClient`, registrado pelos provedores da aplicação com `provideHttpClient()`.

## 6. Resumo

- `NgbModal` permite abrir um formulário em uma janela modal;
- `modal.close(...)` confirma o fechamento e dispara o fluxo de cadastro;
- `ClienteService.inserirCliente()` envia os dados ao endpoint com `POST`;
- após o sucesso, a listagem é recarregada para refletir a resposta atual da API;
- a tela de clientes reúne consulta, cadastro e exclusão de registros.
