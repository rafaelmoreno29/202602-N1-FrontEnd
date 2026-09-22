# Aula 6 — Formulário Template Driven com Angular

**Data:** 22/09/2026  
**Disciplina:** Desenvolvimento Front-End  
**Projeto:** `ProjetoAngular` (Angular)

---

## 1. Tema da Aula

Nesta aula foi estudado o formulário **Template Driven** (ou formulário orientado pelo template) e foi implementado o componente `FormDriven`.

O formulário criado possui campos para nome e e-mail, validações, mensagens de erro e um evento de envio. A validação e o estado do formulário são controlados principalmente pelo template HTML, enquanto a classe TypeScript recebe o formulário para verificar se os dados são válidos.

---

## 2. O que é um formulário Template Driven?

Em Angular, um formulário Template Driven é um formulário cuja configuração acontece principalmente no template HTML. Os controles são criados a partir dos elementos HTML e das diretivas fornecidas pelo Angular Forms.

As principais características são:

- utiliza elementos HTML comuns, como `<form>` e `<input>`;
- usa `[(ngModel)]` para sincronizar o campo com uma propriedade da classe TypeScript;
- usa atributos como `required` e `email` para definir validações;
- usa a diretiva `ngForm` para transformar o formulário HTML em um objeto acompanhado pelo Angular;
- permite consultar o estado dos controles, como `valid`, `invalid`, `errors` e `submitted`;
- é adequado para formulários pequenos e com regras de validação simples.

Nesse modelo, o template concentra a declaração dos campos e das regras. O TypeScript fica responsável pelas propriedades que recebem os valores e pela ação executada quando o formulário é enviado.

### 2.1 Template Driven x Reactive Forms

No formulário Template Driven, o formulário é definido de maneira declarativa no HTML, usando diretivas como `ngModel`. Em Reactive Forms, os controles são criados e configurados no TypeScript, normalmente com `FormControl` e `FormGroup`.

A aula utilizou o modelo Template Driven porque o formulário é simples e suas validações podem ser expressas diretamente no template.

---

## 3. Componente `FormDriven`

O componente foi criado no diretório `src/app/form-driven/` e é formado pelos arquivos:

- `form-driven.ts` — classe TypeScript e lógica de envio;
- `form-driven.html` — estrutura do formulário e mensagens de validação;
- `form-driven.css` — arquivo reservado para os estilos específicos do componente;
- `form-driven.spec.ts` — arquivo de testes do componente.

A classe possui duas propriedades para armazenar os valores informados pelo usuário:

```typescript
export class FormDriven {
  nome: string = '';
  email: string = '';

  onSubmit(form: NgForm) {
    if (form.valid) {
      alert(`Formulário enviado com sucesso!`);
    } else {
      alert('Formulário inválido.');
    }
  }
}
```

O tipo `NgForm` é importado de `@angular/forms`. Ao receber o formulário no método `onSubmit`, é possível consultar `form.valid` e decidir qual mensagem apresentar.

---

## 4. Estrutura do formulário

O formulário foi definido com uma variável de referência para o `NgForm` e com o evento de envio do Angular:

```html
<form #form="ngForm" (ngSubmit)="onSubmit(form)">
  <!-- campos do formulário -->
</form>
```

- `#form="ngForm"` cria uma referência ao objeto de formulário gerenciado pelo Angular;
- `(ngSubmit)="onSubmit(form)"` chama o método `onSubmit` quando o usuário envia o formulário;
- o objeto `form` contém o estado geral e os controles individuais do formulário.

### 4.1 Campo Nome

```html
<input
  type="text"
  id="nome"
  name="nome"
  [(ngModel)]="nome"
  required
>
```

O atributo `name` identifica o controle dentro do formulário, `[(ngModel)]` mantém o input sincronizado com a propriedade `nome`, e `required` define que o preenchimento é obrigatório.

Quando o formulário já foi enviado e o campo está inválido, a mensagem é exibida:

```html
@if(form.submitted && form.controls['nome']?.invalid) {
  <div class="text-danger">O campo nome é obrigatório.</div>
}
```

### 4.2 Campo E-mail

```html
<input
  type="email"
  id="email"
  name="email"
  [(ngModel)]="email"
  required
  email
>
```

Esse campo possui duas validações:

- `required` — impede o envio sem e-mail;
- `email` — verifica se o valor possui um formato de e-mail válido.

As mensagens são apresentadas de acordo com o erro encontrado:

```html
@if(form.submitted && form.controls['email']?.errors?.['required']) {
  <div class="text-danger">O campo email é obrigatório.</div>
}

@if(form.submitted && form.controls['email']?.errors?.['email']) {
  <div class="text-danger">O campo email deve ser válido.</div>
}
```

O uso de `form.submitted` evita mostrar os erros antes da primeira tentativa de envio.

---

## 5. Fluxo de funcionamento

O comportamento implementado é:

1. O usuário preenche nome e e-mail.
2. Ao clicar em **Enviar**, o evento `(ngSubmit)` é disparado.
3. O Angular atualiza o estado dos controles e marca o formulário como enviado.
4. Caso algum campo esteja inválido, as mensagens correspondentes aparecem no template e é exibido o alerta **Formulário inválido**.
5. Caso todos os campos estejam válidos, é exibido o alerta **Formulário enviado com sucesso!**.

---

## 6. Integração com o projeto

Para que o formulário funcionasse, foram feitas as seguintes integrações:

### 6.1 Importação do `FormsModule`

O `FormsModule`, de `@angular/forms`, foi adicionado ao `AppModule`. Ele disponibiliza as diretivas `ngForm` e `ngModel` utilizadas no template.

```typescript
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    // outros módulos
    FormsModule
  ]
})
export class AppModule { }
```

### 6.2 Declaração do componente

`FormDriven` foi importado e incluído na lista `declarations` do `AppModule`.

### 6.3 Roteamento

O componente foi associado à rota filha `form-driven` dentro da rota `form-pai`:

```typescript
{
  path: 'form-pai', component: FormPai, children: [
    { path: 'form-driven', component: FormDriven }
  ]
}
```

Assim, o formulário pode ser acessado pelo caminho `/form-pai/form-driven`. O menu do componente `FormPai` possui o link **Form Driven**, e o conteúdo é renderizado pelo `<router-outlet>` da página pai.

---

## 7. Resultado da implementação

Ao acessar a opção **Form Driven**, o projeto apresenta um formulário responsivo com os campos **Nome**, **Email** e o botão **Enviar**.

A implementação demonstra como criar um formulário simples no Angular usando a abordagem Template Driven, sincronizar os dados com `ngModel`, validar os campos no próprio template e tratar o envio na classe TypeScript.
