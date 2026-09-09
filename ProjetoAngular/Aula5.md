# Aula 5 — Front-End com Angular

**Data:** 08/09/2026  
**Disciplina:** Desenvolvimento Front-End  
**Projeto:** `ProjetoAngular` (Angular)

---

## 1. Tema da Aula

Nesta aula foi desenvolvido o componente `Cliente`, responsável por cadastrar e listar clientes. Foram praticados:

- eventos de clique com **event binding**;
- formulários com `[(ngModel)]`;
- controle de fluxo no template com `@if`, `@for` e `@switch`;
- diretivas de atributo `ngClass` e `ngStyle`;
- navegação para uma rota de detalhes usando `routerLink`.

O componente utiliza uma lista de objetos `ICliente` e altera a interface de acordo com os dados e as ações do usuário.

---

## 2. O que são diretivas?

**Diretivas** são instruções que o Angular aplica aos elementos do template para modificar seu comportamento, sua aparência ou a forma como eles são renderizados.

Elas permitem adicionar comportamento ao HTML sem precisar manipular o DOM diretamente com JavaScript. O Angular acompanha o estado da classe TypeScript e atualiza a interface quando necessário.

Exemplo:

```html
<td [ngClass]="{'ativo': item.ativo, 'inativo': !item.ativo}">
  {{ item.ativo ? 'Ativo' : 'Inativo' }}
</td>
```

Nesse exemplo, a diretiva `ngClass` adiciona a classe CSS `ativo` ou `inativo` conforme o valor de `item.ativo`.

### 2.1 Tipos de diretivas

| Tipo | Função | Exemplos |
|------|--------|----------|
| Diretiva de componente | Possui template e estilos próprios | `<app-cliente>` |
| Diretiva estrutural ou de controle | Cria, remove ou repete conteúdo | `@if`, `@for`, `*ngIf`, `*ngFor` |
| Diretiva de atributo | Altera aparência ou comportamento de um elemento existente | `ngClass`, `ngStyle`, `ngModel` |
| Diretiva de roteamento | Integra o elemento ao sistema de rotas | `routerLink`, `routerLinkActive` |
| Diretiva de biblioteca | Adiciona funcionalidades de bibliotecas Angular | `ngbNav`, `ngbSlide` |

Uma diretiva pode receber dados por property binding, escutar eventos ou participar de um two-way binding.

> **Importante:** todo componente Angular também é uma diretiva especializada, pois possui um seletor e pode ser usado dentro de outro template. A diferença é que o componente possui uma view própria.

---

## 3. Controle de fluxo no template

O Angular possui blocos de controle de fluxo para decidir quais partes do template serão renderizadas. A sintaxe moderna usa `@if`, `@for` e `@switch`.

Esses blocos cumprem funções parecidas com `if`, `for` e `switch` do TypeScript, mas controlam diretamente a renderização do HTML.

### 3.1 `@if` — renderização condicional

O bloco `@if` renderiza seu conteúdo somente quando a expressão for verdadeira:

```html
<input type="checkbox" [(ngModel)]="esconderTabela" id="esconderTabela" />
<label for="esconderTabela">Esconder tabela</label>

@if (!esconderTabela) {
  <table class="table">
    <!-- tabela de clientes -->
  </table>
}
```

Na classe `Cliente`, a propriedade controla a condição:

```typescript
esconderTabela: boolean = false;
```

Quando o usuário marca o checkbox, `esconderTabela` passa a ser `true` e a tabela deixa de ser exibida.

Também é possível definir um bloco alternativo com `@else`:

```html
@if (listaClientes.length > 0) {
  <p>Existem clientes cadastrados.</p>
} @else {
  <p>Nenhum cliente encontrado.</p>
}
```

### 3.2 `@for` — repetição de elementos

O bloco `@for` repete um trecho do template para cada item de uma coleção:

```html
@for (item of listaClientes; track $index) {
  <tr>
    <td>{{ item.id }}</td>
    <td>{{ item.nome }}</td>
  </tr>
}
```

A propriedade utilizada como fonte dos dados é:

```typescript
listaClientes: ICliente[] = [
  { id: 1, nome: 'Rafael', ativo: true },
  { id: 2, nome: 'Maria', ativo: false },
  { id: 3, nome: 'João', ativo: true },
];
```

O `track $index` ajuda o Angular a identificar cada item da repetição. Em listas com identificadores estáveis, é preferível rastrear pelo próprio ID:

```html
@for (item of listaClientes; track item.id) {
  <p>{{ item.nome }}</p>
}
```

O bloco também disponibiliza variáveis úteis, como `$index`, `$first`, `$last`, `$even` e `$odd`.

### 3.3 `@switch`, `@case` — escolha entre alternativas

O bloco `@switch` seleciona um caso com base no valor de uma expressão:

```html
@switch (item.ativo) {
  @case (true) {
    <button (click)="item.ativo = false">
      Inativar
    </button>
  }
  @case (false) {
    <button (click)="item.ativo = true">
      Ativar
    </button>
  }
}
```

Neste caso, o botão exibido depende do status do cliente:

- cliente ativo: exibe o botão **Inativar**;
- cliente inativo: exibe o botão **Ativar**.

É possível definir um caso padrão com `@default`:

```html
@switch (status) {
  @case ('ativo') { <span>Ativo</span> }
  @case ('inativo') { <span>Inativo</span> }
  @default { <span>Status desconhecido</span> }
}
```

### 3.4 Sintaxe antiga e sintaxe moderna

Antes do Angular 17, era comum usar diretivas estruturais com asterisco:

```html
<div *ngIf="!esconderTabela">
  <p>Tabela visível</p>
</div>

<tr *ngFor="let item of listaClientes">
  <td>{{ item.nome }}</td>
</tr>
```

A sintaxe moderna de blocos é:

```html
@if (!esconderTabela) {
  <p>Tabela visível</p>
}

@for (item of listaClientes; track item.id) {
  <td>{{ item.nome }}</td>
}
```

As duas abordagens são válidas, mas esta aula utiliza a sintaxe moderna recomendada para novos templates.

---

## 4. Diretivas de atributo utilizadas

### 4.1 `ngClass`

A diretiva `ngClass` adiciona ou remove classes CSS de forma dinâmica.

```html
<td [ngClass]="{'ativo': item.ativo, 'inativo': !item.ativo}">
  {{ item.ativo ? 'Ativo' : 'Inativo' }}
</td>
```

Cada chave do objeto representa uma classe e cada valor representa a condição para aplicá-la. As classes estão definidas em `cliente.css`:

```css
.ativo {
  background-color: green;
  color: white;
}

.inativo {
  background-color: red;
  color: white;
}
```

Também é possível fornecer uma única classe ou uma expressão:

```html
<div [ngClass]="classeAtual">Conteúdo</div>
<div [class.destaque]="item.ativo">Cliente</div>
```

### 4.2 `ngStyle`

A diretiva `ngStyle` altera estilos diretamente a partir de uma expressão:

```html
<td [ngStyle]="{
  'background-color': item.nome == pesquisa ? 'yellow' : 'transparent'
}">
  {{ item.nome }}
</td>
```

Quando o nome do cliente é igual ao texto pesquisado, o fundo da célula fica amarelo.

Para um único estilo, também pode ser usado o property binding de estilo:

```html
<td [style.background-color]="item.ativo ? 'green' : 'red'">
  {{ item.nome }}
</td>
```

### 4.3 `ngModel`

`ngModel` é uma diretiva do `FormsModule` usada para sincronizar um campo de formulário com uma propriedade TypeScript.

```html
<input type="text" [(ngModel)]="pesquisa" placeholder="Pesquisar..." />
```

O valor digitado é armazenado em `pesquisa`:

```typescript
pesquisa: string = '';
```

O two-way binding combina property binding e event binding:

```html
<input [ngModel]="pesquisa" (ngModelChange)="pesquisa = $event" />
```

Para utilizar `ngModel`, o `FormsModule` deve estar importado no `AppModule`:

```typescript
imports: [
  BrowserModule,
  AppRoutingModule,
  FormsModule
]
```

---

## 5. Eventos e atualização da lista

O event binding usa parênteses para executar um método quando um evento ocorre:

```html
<button class="btn btn-success" (click)="adicionarCLiente()">
  Adicionar
</button>
```

O método adiciona um novo cliente ao array:

```typescript
adicionarCLiente() {
  this.listaClientes.push({
    id: this.listaClientes.length + 1,
    nome: this.meuNome,
    ativo: true
  });
}
```

Os botões de contador também usam event binding:

```html
<button (click)="clicar(1)">+1</button>
<button (click)="clicar(-1)">-1</button>
```

```typescript
clicar(n: number) {
  this.vezesClicou = this.vezesClicou + n;
}
```

Depois da alteração do array ou de uma propriedade, o Angular atualiza as partes do template que dependem desses valores.

---

## 6. Diretivas de roteamento

O botão **Editar** usa `routerLink` para navegar para a tela de detalhes do cliente:

```html
<button
  class="btn btn-sm btn-outline-primary"
  [routerLink]="'/cliente-detalhe/' + item.id">
  Editar
</button>
```

Como existe uma rota com o parâmetro `:cod`, o ID do cliente é incorporado à URL:

```typescript
{ path: 'cliente-detalhe/:cod', component: ClienteDetalhe }
```

Por exemplo, para o cliente de ID `2`, o Angular navega para:

```text
/cliente-detalhe/2
```

`routerLink` é uma diretiva de atributo do Angular Router. Ela evita a navegação tradicional com `href`, mantendo a aplicação como uma SPA (Single Page Application), sem recarregar toda a página.

---

## 7. Fluxo do componente `Cliente`

O funcionamento do template pode ser resumido assim:

1. `[(ngModel)]` atualiza `meuNome`, `pesquisa` e `esconderTabela`.
2. `@if` decide se a tabela deve ser renderizada.
3. `@for` cria uma linha para cada objeto de `listaClientes`.
4. `ngStyle` destaca o nome que corresponde à pesquisa.
5. `ngClass` aplica a aparência de cliente ativo ou inativo.
6. `@switch` escolhe o botão adequado para o status.
7. `(click)` altera os valores da classe.
8. `routerLink` abre a tela de detalhes do cliente.

---

## 8. Conceitos abordados

| Conceito | Descrição |
|----------|-----------|
| Diretiva | Instrução que modifica comportamento, aparência ou renderização do template |
| Diretiva de componente | Diretiva com template e estilos próprios |
| `@if` | Renderização condicional com a sintaxe moderna do Angular |
| `@for` | Repetição de conteúdo para os itens de uma coleção |
| `@switch` / `@case` | Seleção de conteúdo de acordo com uma expressão |
| `ngClass` | Aplicação dinâmica de classes CSS |
| `ngStyle` | Aplicação dinâmica de estilos inline |
| `ngModel` | Sincronização de campos de formulário com propriedades TypeScript |
| `routerLink` | Navegação entre rotas sem recarregar a página |
| Event binding | Execução de métodos por eventos, como `(click)` |
| Two-way binding | Sincronização nos dois sentidos com `[(ngModel)]` |
| `track` | Identificação dos itens de uma repetição para melhorar a atualização do DOM |

---

## 9. Exercícios sugeridos

1. Adicionar um campo para filtrar a lista por nome.
2. Alterar o `@for` para usar `track item.id`.
3. Criar um `@default` no `@switch` para tratar um status inesperado.
4. Adicionar uma classe CSS para destacar o cliente cujo nome corresponde à pesquisa.
5. Criar um botão para remover um cliente da lista.
