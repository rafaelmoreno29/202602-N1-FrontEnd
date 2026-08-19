# Aula 2 — Front-End com Angular

**Data:** 18/08/2026  
**Disciplina:** Desenvolvimento Front-End  
**Projeto:** `ProjetoAngular` (Angular)

---

## 1. Resumo da Aula Anterior

Na Aula 1 foram criados os componentes `MenuSuperior` e `Destaque`, configurado o `AppModule` e integrado o ng-bootstrap com o carrossel de imagens.

---

## 2. Novo Componente — `Noticia`

Foi criado o componente `Noticia` para exibir uma lista de cards de notícias usando o sistema de grid e o componente Card do Bootstrap.

### 2.1 Geração do Componente

```bash
ng generate component noticia
```

Arquivos gerados:

```
src/app/noticia/
├── noticia.ts
├── noticia.html
├── noticia.css
└── noticia.spec.ts
```

### 2.2 Declaração no `AppModule`

O componente foi adicionado ao array `declarations` do módulo raiz:

```typescript
@NgModule({
  declarations: [App, MenuSuperior, Destaque, Noticia],
  imports: [BrowserModule, AppRoutingModule, NgbModule, NgbCarousel, NgbSlide],
  bootstrap: [App]
})
export class AppModule { }
```

### 2.3 Classe TypeScript — `noticia.ts`

A propriedade `active` controla qual aba está selecionada no componente de navegação por abas:

```typescript
export class Noticia {
  active = 1;
}
```

### 2.4 Template — `noticia.html`

O template é composto por **três seções** em sequência:

#### Seção 1 — Grid de Cards

Exibe **três cards** lado a lado usando o grid Bootstrap responsivo (`col-md-4 col-12`):

```html
<div class="row mt-3">
    <div class="col-md-4 col-12">
        <div class="card">
            <img src="logoFacens.png" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text...</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    </div>
    <!-- repetido mais 2 vezes -->
</div>
```

#### Seção 2 — Imagem Responsiva

Exibe uma imagem em coluna única com a classe `img-fluid`, que faz a imagem se adaptar automaticamente à largura do container:

```html
<div class="row mt-3">
    <div class="col">
        <img src="logoFacens.png" class="img-fluid" alt="...">
    </div>
</div>
```

#### Seção 3 — Abas com `NgbNav`

Exibe um componente de **navegação por abas** usando o `ngbNav` do ng-bootstrap. A aba ativa é controlada pela propriedade `active` do componente via two-way binding (`[(activeId)]`).

```html
<div class="row mt-3 mb-5">
    <div class="col">
        <ul ngbNav #nav="ngbNav" [(activeId)]="active" class="nav-tabs">
            <li [ngbNavItem]="1">
                <button ngbNavLink>One</button>
                <ng-template ngbNavContent>
                    <p>Conteúdo da aba 1...</p>
                </ng-template>
            </li>
            <li [ngbNavItem]="2">
                <button ngbNavLink>Two</button>
                <ng-template ngbNavContent>
                    <p>Conteúdo da aba 2...</p>
                </ng-template>
            </li>
            <li [ngbNavItem]="3">
                <button ngbNavLink>Three</button>
                <ng-template ngbNavContent>
                    <p>Conteúdo da aba 3...</p>
                </ng-template>
            </li>
        </ul>

        <div [ngbNavOutlet]="nav" class="mt-2"></div>

        <pre>Active: {{ active }}</pre>
    </div>
</div>
```

**Conceitos Angular/ng-bootstrap utilizados nas abas:**

| Diretiva / Recurso        | Descrição                                                           |
|---------------------------|---------------------------------------------------------------------|
| `ngbNav`                  | Diretiva que transforma um `<ul>` em componente de abas             |
| `#nav="ngbNav"`           | Template reference variable para referenciar o nav no outlet        |
| `[(activeId)]="active"`   | Two-way binding — sincroniza a aba ativa com a propriedade da classe |
| `[ngbNavItem]="1"`        | Identifica cada item de aba com um ID numérico                      |
| `ngbNavLink`              | Diretiva aplicada ao botão que ativa a aba                          |
| `ng-template ngbNavContent` | Define o conteúdo da aba (renderizado no outlet)                  |
| `[ngbNavOutlet]="nav"`    | Marca onde o conteúdo da aba ativa será projetado                   |
| `{{ active }}`            | Interpolação — exibe o ID da aba ativa em tempo real                |

### 2.5 Classes Bootstrap utilizadas

| Classe            | Descrição                                              |
|-------------------|--------------------------------------------------------|
| `row`             | Linha do grid — agrupa as colunas                      |
| `mt-3` / `mb-5`   | Margens (margin-top / margin-bottom)                   |
| `col-md-4`        | Coluna de 4/12 em telas médias (≥768px) — 3 por linha  |
| `col-12`          | Coluna de largura total em telas pequenas — 1 por linha |
| `col`             | Coluna que ocupa todo o espaço disponível              |
| `card`            | Container do card Bootstrap                            |
| `card-img-top`    | Imagem posicionada no topo do card                     |
| `card-body`       | Área de conteúdo do card                               |
| `card-title`      | Título do card                                         |
| `card-text`       | Parágrafo de texto do card                             |
| `btn btn-primary` | Botão com estilo primário do Bootstrap                 |
| `img-fluid`       | Imagem responsiva (max-width: 100%)                    |
| `nav-tabs`        | Estilo de abas horizontais do Bootstrap                |

---

## 3. Atualização do Componente Raiz — `App`

O seletor `<app-noticia>` foi adicionado ao template `app.html`, após o carrossel de destaque:

```html
<div class="container">
  <app-menu-superior></app-menu-superior>
  <app-destaque></app-destaque>
  <app-noticia></app-noticia>
  <router-outlet />
</div>
```

---

## 4. Estrutura Final do Projeto

```
AppModule
├── App              — componente raiz
├── MenuSuperior     — barra de navegação
├── Destaque         — carrossel de imagens (ng-bootstrap)
└── Noticia          — grid de cards Bootstrap  ← novo
```

---

## 5. Conceitos Abordados

| Conceito                      | Descrição                                                                   |
|-------------------------------|-----------------------------------------------------------------------------|
| `ng generate component`       | Criação de novos componentes via Angular CLI                                |
| Grid responsivo Bootstrap     | `col-12` (mobile) + `col-md-4` (desktop) para layout em colunas            |
| Card Bootstrap                | Componente de cartão com imagem, corpo, título, texto e botão               |
| `img-fluid`                   | Imagem responsiva que se adapta à largura do container                      |
| `ngbNav` / `ngbNavItem`       | Componente de abas do ng-bootstrap com identificação por ID numérico        |
| `[(activeId)]`                | Two-way binding para sincronizar a aba ativa com propriedade do componente  |
| `ngbNavOutlet`                | Diretiva que projeta o conteúdo (`ng-template`) da aba ativa na página      |
| Template reference `#nav`     | Variável de referência que conecta o `ngbNav` ao `ngbNavOutlet`             |
| Interpolação `{{ active }}`   | Exibição do valor de uma propriedade TypeScript diretamente no template     |
| Composição de componentes     | Uso de `<app-noticia>` dentro do template do componente raiz                |

---

## 6. Roteamento — `AppRoutingModule`

Foi configurado o módulo de roteamento para definir as rotas da aplicação:

```typescript
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'cliente', component: Cliente },
  { path: '**', component: NaoEncontrado },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

| Propriedade          | Descrição                                                               |
|----------------------|-------------------------------------------------------------------------|
| `path: ''`           | Rota raiz — redireciona para `/home`                                    |
| `redirectTo`         | Redireciona automaticamente para outro caminho                          |
| `pathMatch: 'full'`  | Exige correspondência exata do caminho (não apenas prefixo)             |
| `path: 'home'`       | Rota `/home` — renderiza o componente `Home`                            |
| `path: 'cliente'`    | Rota `/cliente` — renderiza o componente `Cliente`                      |
| `path: '**'`         | Wildcard — captura qualquer rota não encontrada e exibe `NaoEncontrado` |

---

## 7. Novos Componentes

### 7.1 Componente `Home`

```bash
ng generate component home
```

Agrega os componentes `Destaque` e `Noticia`, sendo exibido na rota `/home`:

```html
<app-destaque></app-destaque>
<app-noticia></app-noticia>
```

### 7.2 Componente `Cliente`

```bash
ng generate component cliente
```

Placeholder para a tela de clientes (a ser desenvolvida em aulas futuras):

```html
<p>cliente works!</p>
```

### 7.3 Componente `NaoEncontrado`

```bash
ng generate component nao-encontrado
```

Exibe uma página de erro **404** estilizada com Bootstrap, com botão de retorno à página inicial:

```html
<div class="d-flex flex-column align-items-center justify-content-center text-center py-5 my-5">
  <h1 class="display-1 fw-bold text-danger">404</h1>

  <div class="alert alert-danger" role="alert">
    A página que você está procurando não existe.
  </div>

  <p class="text-muted mb-4">
    Verifique o endereço digitado ou volte para a página inicial.
  </p>

  <a routerLink="/home" class="btn btn-primary">Voltar para o início</a>
</div>
```

| Classe Bootstrap                | Descrição                                             |
|---------------------------------|-------------------------------------------------------|
| `d-flex flex-column`            | Flexbox em coluna                                     |
| `align-items-center`            | Centraliza os itens horizontalmente                   |
| `justify-content-center`        | Centraliza os itens verticalmente                     |
| `text-center`                   | Alinha o texto ao centro                              |
| `py-5` / `my-5`                 | Padding e margin vertical grandes                     |
| `display-1 fw-bold text-danger` | Título enorme, negrito, cor vermelha                  |
| `alert alert-danger`            | Caixa de alerta estilo perigo                         |
| `text-muted`                    | Texto em cinza                                        |
| `mb-4`                          | Margem inferior                                       |

---

## 8. Atualização do `MenuSuperior`

Os links foram migrados de `href` estático para `routerLink` do Angular Router. A diretiva `routerLinkActive` aplica automaticamente a classe `active` ao link da rota atual:

```html
<header class="d-flex justify-content-center py-3">
    <ul class="nav nav-pills">
        <li class="nav-item"><a routerLink="/home" routerLinkActive="active" class="nav-link">Home</a></li>
        <li class="nav-item"><a routerLink="/cliente" routerLinkActive="active" class="nav-link">Clientes</a></li>
        <li class="nav-item"><a routerLink="/calculadora" routerLinkActive="active" class="nav-link">Calculadora</a></li>
        <li class="nav-item"><a routerLink="/pai" routerLinkActive="active" class="nav-link">Pai</a></li>
        <li class="nav-item"><a routerLink="/sobre" routerLinkActive="active" class="nav-link">Sobre</a></li>
    </ul>
</header>
```

| Diretiva           | Descrição                                                            |
|--------------------|----------------------------------------------------------------------|
| `routerLink`       | Navega para a rota indicada sem recarregar a página                  |
| `routerLinkActive` | Aplica a classe CSS informada quando a rota do link está ativa       |

---

## 9. Estado Final — `App` e `AppModule`

Com o roteamento ativo, `app.html` delega a renderização de conteúdo ao `<router-outlet>`:

```html
<div class="container">
  <app-menu-superior></app-menu-superior>
  <router-outlet />
</div>
```

O `<router-outlet>` é o ponto de inserção onde o Angular projeta o componente correspondente à rota ativa.

**`AppModule` — estado final:**

```typescript
@NgModule({
  declarations: [
    App, MenuSuperior, Destaque, Noticia,
    Home, Cliente, NaoEncontrado
  ],
  imports: [
    BrowserModule, AppRoutingModule, NgbModule,
    NgbCarousel, NgbSlide,
    NgbNavContent, NgbNav, NgbNavItem, NgbNavItemRole,
    NgbNavLinkButton, NgbNavLinkBase, NgbNavOutlet
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App]
})
export class AppModule { }
```

---

## 10. Estrutura Final do Projeto

```
AppModule
├── App                  — componente raiz (menu + router-outlet)
│   ├── MenuSuperior     — barra de navegação com routerLink
│   └── <router-outlet>
│       ├── Home (/home)         — agrega Destaque + Noticia
│       │   ├── Destaque         — carrossel ng-bootstrap
│       │   └── Noticia          — cards + imagem + abas
│       ├── Cliente (/cliente)   — placeholder
│       └── NaoEncontrado (**)   — página 404
```

---

## 11. Conceitos de Roteamento

| Conceito                 | Descrição                                                                       |
|--------------------------|---------------------------------------------------------------------------------|
| `Routes`                 | Array de objetos que define os pares caminho → componente                       |
| `RouterModule.forRoot()` | Registra as rotas na raiz da aplicação Angular                                  |
| `redirectTo`             | Redireciona automaticamente de uma rota para outra                              |
| `pathMatch: 'full'`      | Garante que o redirecionamento ocorra apenas na rota exatamente vazia (`''`)    |
| `path: '**'`             | Rota curinga — captura qualquer URL não correspondida pelas rotas anteriores    |
| `<router-outlet>`        | Diretiva que marca onde o componente da rota ativa será renderizado             |
| `routerLink`             | Diretiva de navegação entre rotas sem recarregar a página                       |
| `routerLinkActive`       | Aplica uma classe CSS ao link quando sua rota está ativa                        |
