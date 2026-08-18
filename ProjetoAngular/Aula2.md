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

### 2.3 Template — `noticia.html`

O template exibe **três cards** lado a lado usando o grid Bootstrap responsivo (`col-md-4 col-12`):

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

### 2.4 Classes Bootstrap utilizadas

| Classe            | Descrição                                              |
|-------------------|--------------------------------------------------------|
| `row`             | Linha do grid — agrupa as colunas                      |
| `mt-3`            | Margem superior (margin-top: 1rem)                     |
| `col-md-4`        | Coluna de 4/12 em telas médias (≥768px) — 3 por linha  |
| `col-12`          | Coluna de largura total em telas pequenas — 1 por linha |
| `card`            | Container do card Bootstrap                            |
| `card-img-top`    | Imagem posicionada no topo do card                     |
| `card-body`       | Área de conteúdo do card                               |
| `card-title`      | Título do card                                         |
| `card-text`       | Parágrafo de texto do card                             |
| `btn btn-primary` | Botão com estilo primário do Bootstrap                 |

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

| Conceito                      | Descrição                                                          |
|-------------------------------|--------------------------------------------------------------------|
| `ng generate component`       | Criação de novos componentes via Angular CLI                       |
| Grid responsivo Bootstrap     | `col-12` (mobile) + `col-md-4` (desktop) para layout em colunas   |
| Card Bootstrap                | Componente de cartão com imagem, corpo, título, texto e botão      |
| `card-img-top`                | Imagem no topo do card com proporção automática                    |
| `btn btn-primary`             | Botão estilizado com a cor primária do tema Bootstrap              |
| Composição de componentes     | Uso de `<app-noticia>` dentro do template do componente raiz       |
