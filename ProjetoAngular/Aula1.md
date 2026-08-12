# Aula 1 — Front-End com Angular

**Data:** 11/08/2026  
**Disciplina:** Desenvolvimento Front-End  
**Projeto:** `Aula1` (Angular)

---

## 1. Criação do Projeto Angular

O projeto foi gerado com o Angular CLI, resultando na estrutura padrão com os arquivos de configuração:

- `angular.json` — configurações do workspace Angular
- `tsconfig.json` / `tsconfig.app.json` / `tsconfig.spec.json` — configurações do TypeScript
- `package.json` — dependências e scripts do projeto

**Scripts disponíveis:**

| Comando         | Descrição                        |
|-----------------|----------------------------------|
| `ng serve`      | Inicia o servidor de desenvolvimento |
| `ng build`      | Compila o projeto para produção  |
| `ng test`       | Executa os testes unitários      |

---

## 2. Dependências Principais

- **Angular 20** (`@angular/core`, `@angular/common`, `@angular/router`, etc.)
- **ng-bootstrap 19** (`@ng-bootstrap/ng-bootstrap`) — componentes Bootstrap para Angular
- **Bootstrap** — framework CSS para estilização e layout responsivo

---

## 3. Estrutura de Componentes

O projeto foi organizado em **módulo NgModule** (`AppModule`) com quatro componentes declarados:

```
AppModule
├── App (componente raiz)
├── MenuSuperior
├── Destaque
```

### 3.1 `AppModule` (`app-module.ts`)

Módulo raiz que declara todos os componentes e importa os módulos necessários:

```typescript
@NgModule({
  declarations: [App, MenuSuperior, Destaque],
  imports: [BrowserModule, AppRoutingModule, NgbModule, NgbCarouselModule],
  bootstrap: [App]
})
export class AppModule { }
```

---

## 4. Componentes Criados

### 4.1 Componente Raiz — `App`

- **Selector:** `app-root`
- **Template:** `app.html`
- Utiliza o `signal()` do Angular para definir o título da aplicação.
- Inclui os outros três componentes e o `<router-outlet>` para roteamento.

```html
<div class="container">
  <app-menu-superior></app-menu-superior>
  <app-destaque></app-destaque>
  <app-cards></app-cards>
  <router-outlet />
</div>
```

---

### 4.2 Componente `MenuSuperior`

- **Selector:** `app-menu-superior`
- Renderiza um menu de navegação horizontal usando as classes Bootstrap **nav** e **nav-pills**.

```html
<header class="d-flex justify-content-center py-3">
    <ul class="nav nav-pills">
        <li class="nav-item"><a href="#" class="nav-link active">Home</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Features</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Pricing</a></li>
        <li class="nav-item"><a href="#" class="nav-link">FAQs</a></li>
        <li class="nav-item"><a href="#" class="nav-link">About</a></li>
    </ul>
</header>
```

**Conceitos Bootstrap utilizados:** `d-flex`, `justify-content-center`, `py-3`, `nav`, `nav-pills`, `nav-item`, `nav-link`, `active`.

---

### 4.3 Componente `Destaque`

- **Selector:** `app-destaque`
- Exibe um **carrossel de imagens** usando o componente `NgbCarousel` do ng-bootstrap.
- As imagens são carregadas dinamicamente de `https://picsum.photos`.

```typescript
export class Destaque {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
```

```html
@if (images) {
  <ngb-carousel>
    <ng-template ngbSlide>
      <img class="w-100" [src]="images[0]" alt="..." />
      ...
    </ng-template>
  </ngb-carousel>
}
```

**Conceitos Angular utilizados:**
- `@if` — controle de fluxo no template (Angular 17+)
- `[src]` — property binding para vincular a URL da imagem
- `NgbCarousel` / `ng-template ngbSlide` — componente de carrossel do ng-bootstrap

---

## 5. Roteamento

O módulo `AppRoutingModule` foi configurado para suporte ao roteamento Angular, com o `<router-outlet>` presente no componente raiz.

---

## 6. Conceitos Abordados

| Conceito                        | Descrição                                                   |
|---------------------------------|-------------------------------------------------------------|
| Criação de projeto Angular CLI  | Estrutura inicial de um projeto Angular                     |
| `NgModule`                      | Módulo raiz que organiza componentes e dependências         |
| Componentes Angular             | Criação com `@Component`, selector, template e estilos       |
| `signal()`                      | Reatividade primitiva do Angular 16+                        |
| Property Binding `[src]`        | Vinculação de propriedades HTML a valores TypeScript        |
| Controle de fluxo `@if`         | Renderização condicional no template (Angular 17+)          |
| ng-bootstrap `NgbCarousel`      | Carrossel de imagens integrado ao Bootstrap                 |
| Grid Bootstrap                  | Layout responsivo com `col-12 col-md-4`                     |
| Cards Bootstrap                 | Componente de cartão para exibição de conteúdo              |
| Nav Pills Bootstrap             | Menu de navegação estilizado                                |
| `<router-outlet>`               | Ponto de inserção para rotas Angular                        |