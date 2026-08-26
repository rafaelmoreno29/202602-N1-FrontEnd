# Aula 3 — Front-End com Angular

**Data:** 25/08/2026  
**Disciplina:** Desenvolvimento Front-End  
**Projeto:** `ProjetoAngular` (Angular)

---

## 1. Resumo da Aula Anterior

Na Aula 2 foram criados os componentes `Noticia` (grid de cards, imagem responsiva e abas com `ngbNav`) e integrado o `FormsModule` para uso de `[(ngModel)]`.

---

## 2. Roteamento com Angular Router

O principal tema desta aula foi a configuração do **sistema de rotas** do Angular, substituindo a navegação estática por URLs dinâmicas gerenciadas pelo `RouterModule`.

### 2.1 Rotas definidas em `app-routing-module.ts`

```typescript
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'cliente', component: Cliente },
  { path: 'calculadora', component: Calculadora },
  { path: 'calculadora/:v1/:v2', component: Calculadora },
  { path: 'cliente-detalhe/:cod', component: ClienteDetalhe },
  { path: '**', component: NaoEncontrado },
];
```

| Rota                      | Componente        | Descrição                                          |
|---------------------------|-------------------|----------------------------------------------------|
| `/` (vazio)               | redireciona       | Redireciona automaticamente para `/home`            |
| `/home`                   | `Home`            | Página inicial com destaque e notícias              |
| `/cliente`                | `Cliente`         | Lista de clientes com tabela e binding              |
| `/calculadora`            | `Calculadora`     | Calculadora sem parâmetros iniciais                 |
| `/calculadora/:v1/:v2`    | `Calculadora`     | Calculadora com valores pré-preenchidos via URL     |
| `/cliente-detalhe/:cod`   | `ClienteDetalhe`  | Detalhe de um cliente identificado pelo código      |
| `**`                      | `NaoEncontrado`   | Página 404 para rotas não reconhecidas              |

**Conceitos de rota:**

| Recurso              | Descrição                                                               |
|----------------------|-------------------------------------------------------------------------|
| `redirectTo`         | Redireciona uma rota para outra automaticamente                         |
| `pathMatch: 'full'`  | Exige que a URL seja exatamente igual ao `path` para aplicar o redirect |
| `:param`             | Define um **parâmetro de rota** dinâmico (ex: `:v1`, `:cod`)           |
| `**`                 | Curinga — captura qualquer rota não mapeada (deve ser a última)         |

### 2.2 Diretivas de roteamento no template

| Diretiva                       | Descrição                                                        |
|--------------------------------|------------------------------------------------------------------|
| `routerLink="/caminho"`        | Navega para a rota indicada ao clicar (substitui `href`)         |
| `routerLinkActive="active"`    | Adiciona a classe CSS quando a rota está ativa                   |
| `<router-outlet />`            | Marca o local onde o componente da rota ativa será renderizado   |

---

## 3. Atualização do Layout Principal

### 3.1 `app.html` — simplificado para roteamento

O template raiz foi reduzido para conter apenas o menu e o `<router-outlet>`, pois o conteúdo de cada página passou a ser gerenciado pelas rotas:

```html
<div class="container">
  <app-menu-superior></app-menu-superior>
  <router-outlet />
</div>
```

### 3.2 `menu-superior.html` — links com `routerLink`

Os links do menu foram convertidos de `href` para `routerLink` com destaque da rota ativa via `routerLinkActive`:

```html
<ul class="nav nav-pills">
    <li class="nav-item"><a routerLink="/home" routerLinkActive="active" class="nav-link">Home</a></li>
    <li class="nav-item"><a routerLink="/cliente" routerLinkActive="active" class="nav-link">Clientes</a></li>
    <li class="nav-item"><a routerLink="/calculadora" routerLinkActive="active" class="nav-link">Calculadora</a></li>
    <li class="nav-item"><a routerLink="/pai" routerLinkActive="active" class="nav-link">Pai</a></li>
    <li class="nav-item"><a routerLink="/sobre" routerLinkActive="active" class="nav-link">Sobre</a></li>
</ul>
```

---

## 4. Novos Componentes

### 4.1 Componente `Home`

Página inicial que agrega os componentes existentes `Destaque` e `Noticia`:

```html
<app-destaque></app-destaque>
<app-noticia></app-noticia>
```

A classe não possui lógica adicional:

```typescript
export class Home { }
```

---

### 4.2 Componente `Cliente`

Demonstra **two-way binding**, **event binding** e **navegação por `routerLink`** com parâmetro:

**`cliente.ts`:**

```typescript
export class Cliente {
  meuNome: string = 'Rafael';
  vezesClicou: number = 0;

  clicar(n: number) {
    this.vezesClicou = this.vezesClicou + n;
  }
}
```

**`cliente.html`:**

```html
<p>Meu nome é {{ meuNome }}</p>
<input type="text" class="form-control" [(ngModel)]="meuNome" />

<p>Clicou {{ vezesClicou }} vezes</p>
<button class="btn btn-primary" (click)="clicar(1)">+1</button>
<button class="btn btn-danger" (click)="clicar(-1)">-1</button>

<table class="table table-striped table-bordered table-hover">
    <thead>
        <tr><th>Código</th><th>Nome</th><th>Ação</th></tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td><td>Rafael</td>
            <td><button class="btn btn-sm btn-outline-primary" routerLink="/cliente-detalhe/1">Editar</button></td>
        </tr>
        <tr>
            <td>2</td><td>João</td>
            <td><button class="btn btn-sm btn-outline-primary" routerLink="/cliente-detalhe/2">Editar</button></td>
        </tr>
    </tbody>
</table>
```

**Conceitos utilizados:**

| Recurso                      | Descrição                                                               |
|------------------------------|-------------------------------------------------------------------------|
| `{{ meuNome }}`              | Interpolação — exibe o valor da propriedade no template                 |
| `[(ngModel)]="meuNome"`      | Two-way binding — sincroniza o input com a propriedade da classe        |
| `(click)="clicar(1)"`        | Event binding — chama o método passando um argumento ao clicar          |
| `routerLink="/cliente-detalhe/1"` | Navega para a rota de detalhe passando o código na URL            |
| `table-striped` / `table-hover`   | Classes Bootstrap para estilizar tabelas                          |

---

### 4.3 Componente `Calculadora`

Demonstra **leitura de parâmetros de rota**, **`ngOnInit`**, **`[(ngModel)]`** e **`[value]`** (property binding somente leitura):

**`calculadora.ts`:**

```typescript
export class Calculadora implements OnInit {
  constructor(private route: ActivatedRoute) { }

  valor1: number = 0;
  valor2: number = 0;
  operacao: string = '+';
  resultado: number = 0;

  ngOnInit() {
    this.valor1 = Number(this.route.snapshot.paramMap.get('v1')) || 0;
    this.valor2 = Number(this.route.snapshot.paramMap.get('v2')) || 0;
  }

  calcular() {
    switch (this.operacao) {
      case '+': this.resultado = this.valor1 + this.valor2; break;
      case '-': this.resultado = this.valor1 - this.valor2; break;
      case '*': this.resultado = this.valor1 * this.valor2; break;
      case '/': this.resultado = this.valor1 / this.valor2; break;
    }
  }
}
```

**`calculadora.html`:**

```html
<input type="number" class="form-control" [(ngModel)]="valor1" placeholder="Valor 1" />
<input type="number" class="form-control" [(ngModel)]="valor2" placeholder="Valor 2" />
<select class="form-control" [(ngModel)]="operacao">
    <option value="+">+</option>
    <option value="-">-</option>
    <option value="*">*</option>
    <option value="/">/</option>
</select>
<button class="btn btn-primary" (click)="calcular()">Calcular</button>
<input type="number" class="form-control" [value]="resultado" readonly />
```

**Conceitos utilizados:**

| Recurso                              | Descrição                                                              |
|--------------------------------------|------------------------------------------------------------------------|
| `ActivatedRoute`                     | Serviço injetado para acessar informações da rota ativa                |
| `route.snapshot.paramMap.get('v1')`  | Lê o valor do parâmetro de rota `:v1` da URL no momento da navegação  |
| `implements OnInit` / `ngOnInit()`   | Lifecycle hook executado uma vez após o componente ser inicializado    |
| `constructor(private route: ...)`    | **Injeção de dependência** — o Angular fornece a instância do serviço  |
| `[(ngModel)]`                        | Two-way binding para inputs e select                                   |
| `[value]="resultado"`                | Property binding unidirecional — atualiza o campo mas não a propriedade|
| `switch` / `case`                    | Estrutura de decisão para selecionar a operação matemática             |

---

### 4.4 Componente `ClienteDetalhe`

Demonstra leitura de parâmetro de rota com `ActivatedRoute`:

**`cliente-detalhe.ts`:**

```typescript
export class ClienteDetalhe implements OnInit {
  constructor(private route: ActivatedRoute) { }
  codigo: number = 0;

  ngOnInit() {
    this.codigo = Number(this.route.snapshot.paramMap.get('cod')) || 0;
  }
}
```

**`cliente-detalhe.html`:**

```html
<p>Código: {{ codigo }}</p>
```

---

### 4.5 Componente `NaoEncontrado` (404)

Página exibida quando a URL não corresponde a nenhuma rota cadastrada. Utiliza classes Bootstrap para centralização e destaque visual:

```html
<div class="d-flex flex-column align-items-center justify-content-center text-center py-5 my-5">
  <h1 class="display-1 fw-bold text-danger">404</h1>
  <div class="alert alert-danger" role="alert">
    A página que você está procurando não existe.
  </div>
  <p class="text-muted mb-4">Verifique o endereço digitado ou volte para a página inicial.</p>
  <a routerLink="/home" class="btn btn-primary">Voltar para o início</a>
</div>
```

---

## 5. Atualização do `AppModule`

Todos os novos componentes foram declarados e o `FormsModule` foi adicionado para suporte ao `ngModel`:

```typescript
@NgModule({
  declarations: [
    App, MenuSuperior, Destaque, Noticia,
    Home, Cliente, NaoEncontrado, Calculadora, ClienteDetalhe  // ← novos
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,   // ← RouterModule configurado com as rotas
    NgbModule, NgbCarousel, NgbSlide,
    NgbNav, NgbNavItem, NgbNavContent, NgbNavOutlet, /* ... */
    FormsModule         // ← habilita [(ngModel)]
  ],
  bootstrap: [App]
})
export class AppModule { }
```

---

## 6. Estrutura Final do Projeto

```
AppModule
├── App                — componente raiz (menu + router-outlet)
├── MenuSuperior       — navegação com routerLink e routerLinkActive
├── Destaque           — carrossel de imagens
├── Noticia            — cards e abas (ng-bootstrap)
├── Home               — página inicial (Destaque + Noticia)   ← novo
├── Cliente            — lista com binding, eventos e tabela   ← novo
├── Calculadora        — operações com parâmetros de rota      ← novo
├── ClienteDetalhe     — detalhe via parâmetro :cod            ← novo
└── NaoEncontrado      — página 404 para rotas inválidas       ← novo
```

---

## 7. Conceitos Abordados

| Conceito                          | Descrição                                                                     |
|-----------------------------------|-------------------------------------------------------------------------------|
| `RouterModule` / `Routes`         | Módulo e tipo de configuração de rotas do Angular                             |
| `routerLink`                      | Diretiva para navegação entre rotas sem recarregar a página                   |
| `routerLinkActive`                | Adiciona classe CSS ao link quando sua rota está ativa                        |
| `<router-outlet>`                 | Ponto de inserção dinâmica do componente da rota ativa                        |
| Parâmetros de rota (`:param`)     | Segmentos dinâmicos na URL que carregam valores entre páginas                 |
| `ActivatedRoute`                  | Serviço para acessar parâmetros, query strings e dados da rota atual          |
| `paramMap.get()`                  | Lê o valor de um parâmetro da URL pelo nome                                   |
| `ngOnInit` / `OnInit`             | Lifecycle hook chamado após a criação do componente — ideal para inicialização |
| Injeção de dependência            | Padrão Angular para fornecer serviços via `constructor(private svc: Tipo)`    |
| `[(ngModel)]`                     | Two-way binding: qualquer alteração no input reflete na propriedade e vice-versa |
| `[value]`                         | Property binding unidirecional: atualiza o DOM a partir da propriedade        |
| `(click)="método(arg)"`           | Event binding com passagem de argumento ao método                             |
| `redirectTo` + `pathMatch: 'full'`| Redirecionamento de rota com correspondência exata                            |
| `path: '**'`                      | Rota curinga para capturar URLs não mapeadas (página 404)                     |
