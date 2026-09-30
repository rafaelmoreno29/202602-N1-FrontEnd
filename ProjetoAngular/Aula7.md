# Aula 7 — Reactive Forms e armazenamento no navegador

**Data:** 29/09/2026  
**Disciplina:** Desenvolvimento Front-End  
**Projeto:** `ProjetoAngular` (Angular)

---

## 1. Tema da Aula

Nesta aula foi desenvolvido o formulário `FormReact` usando **Reactive Forms** e foi implementada a persistência dos dados no armazenamento do navegador.

Foram praticados:

- criação de formulários reativos com `FormGroup` e `FormControl`;
- validação com `Validators.required` e `Validators.email`;
- leitura do estado dos controles para exibir mensagens de erro;
- salvamento e recuperação de dados usando `localStorage`;
- diferenças entre `localStorage` e `sessionStorage`.

---

## 2. O que são Reactive Forms?

**Reactive Forms** (formulários reativos) são uma abordagem do Angular em que a estrutura, os valores e as validações do formulário são definidos principalmente no TypeScript. O template HTML se conecta a essa estrutura por meio de diretivas como `[formGroup]` e `formControlName`.

Os principais elementos usados são:

- `FormControl` — representa um campo individual, incluindo valor, validações e estado;
- `FormGroup` — agrupa controles relacionados e mantém o estado geral do formulário;
- `Validators` — fornece funções de validação, como campo obrigatório e formato de e-mail.

Essa abordagem é útil quando o formulário precisa de validações explícitas, controle detalhado de estado ou lógica que deve ser mantida na classe TypeScript.

### 2.1 Template Driven x Reactive Forms

| Template Driven | Reactive Forms |
|-----------------|----------------|
| Configuração principalmente no HTML | Configuração principalmente no TypeScript |
| Usa `FormsModule` e diretivas como `ngModel` | Usa `ReactiveFormsModule`, `FormGroup` e `FormControl` |
| Adequado para formulários simples | Adequado para formulários com regras e estados mais controlados |

As duas abordagens são suportadas pelo Angular. A escolha depende da complexidade e da forma como se deseja organizar a lógica do formulário.

---

## 3. Criação e validação do formulário

No componente `FormReact`, o formulário é criado no método `criarFormulario`, chamado durante o ciclo de inicialização `ngOnInit`:

```typescript
this.form = new FormGroup({
  nome: new FormControl(null, [Validators.required]),
  email: new FormControl(null, [Validators.required, Validators.email])
});
```

O grupo contém dois controles:

- `nome` é obrigatório;
- `email` é obrigatório e precisa ter um formato de e-mail válido.

No template, `[formGroup]` conecta o formulário HTML ao `FormGroup`, enquanto `formControlName` conecta cada campo ao controle correspondente:

```html
<form [formGroup]="form" (ngSubmit)="salvar()">
  <input formControlName="nome" type="text" placeholder="Nome">
  <input formControlName="email" type="email" placeholder="E-mail">
  <input [disabled]="!form.valid" type="submit" value="Salvar">
</form>
```

As mensagens de validação consultam o estado e os erros do controle. No exemplo do nome, a mensagem só aparece quando o campo está inválido e já foi tocado ou alterado:

```html
@if(form.get('nome')?.invalid &&
    (form.get('nome')?.touched || form.get('nome')?.dirty)) {
  <div class="alert alert-danger">Nome é obrigatório</div>
}
```

`invalid` informa que o controle falhou em uma validação; `touched` indica que o usuário entrou e saiu do campo; `dirty` indica que seu valor foi alterado. No template também são consultados `errors['required']` e `errors['email']` para mostrar a mensagem adequada para cada erro.

O template apresenta ainda `{{ form.value | json }}`, que permite acompanhar os valores atuais do grupo durante o preenchimento.

---

## 4. Salvamento e recuperação dos dados

O serviço `Storage`, disponibilizado pela aplicação com `providedIn: 'root'`, encapsula o acesso aos storages do navegador. Como o Web Storage guarda texto, os métodos convertem objetos para JSON ao salvar e convertem o JSON de volta ao ler:

```typescript
setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

getLocalStorage(key: string) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}
```

Quando o formulário é criado, o componente tenta recuperar o item chamado `form`. Se encontrou dados, usa `setValue` para preencher os controles. Ao enviar, salva o valor do grupo somente quando o formulário está válido:

```typescript
const form = this.storage.getLocalStorage('form');
if (form) {
  this.form.setValue(form);
}

salvar() {
  if (this.form.valid) {
    this.storage.setLocalStorage('form', this.form.value);
  }
}
```

Assim, os dados persistem entre recarregamentos e novas sessões do navegador. O salvamento ocorre ao enviar o formulário, não a cada alteração de campo. `setValue` espera que o objeto recuperado tenha valores para todos os controles do grupo.

O serviço também possui métodos `setSessionStorage` e `getSessionStorage`. Nesta implementação do formulário, porém, os métodos usados são os de `localStorage`.

---

## 5. `localStorage` x `sessionStorage`

Ambos fazem parte da API Web Storage e armazenam pares de chave e valor no navegador. Os valores são strings; por isso, objetos precisam ser serializados, por exemplo, com `JSON.stringify` e lidos com `JSON.parse`.

| Característica | `localStorage` | `sessionStorage` |
|----------------|----------------|------------------|
| Duração | Continua disponível depois de fechar e reabrir o navegador, até ser removido | Fica disponível durante a sessão da aba e normalmente é encerrado quando ela é fechada |
| Compartilhamento | A mesma origem pode acessar os dados em diferentes abas | É separado por origem e por contexto de aba |
| Uso comum | Preferências ou dados que devem sobreviver a visitas posteriores | Dados temporários de uma tarefa ou navegação em andamento |
| API de acesso | `setItem`, `getItem`, `removeItem`, `clear` | `setItem`, `getItem`, `removeItem`, `clear` |

Uma **origem** é definida pelo protocolo, domínio e porta. Os dados não são enviados automaticamente ao servidor como cookies, mas qualquer script executado na mesma origem pode acessá-los. Portanto, não se deve guardar senhas, tokens sensíveis ou outros segredos nesses storages.

### 5.1 Exemplo de uso do `sessionStorage`

O serviço oferece os mesmos métodos JSON para armazenar dados durante uma sessão:

```typescript
setSessionStorage(key: string, value: any) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

getSessionStorage(key: string) {
  const value = sessionStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}
```

Para mudar o formulário para armazenamento de sessão, seria necessário usar `getSessionStorage('form')` ao carregar e `setSessionStorage('form', this.form.value)` ao salvar. A implementação atual utiliza `localStorage`, então os dados podem continuar presentes depois de fechar a aba.

---

## 6. Integração com o projeto

O `ReactiveFormsModule` foi incluído nos imports do `AppModule`, disponibilizando as diretivas usadas pelo template. O componente `FormReact` está declarado no módulo e associado à rota filha `form-react`:

```typescript
{
  path: 'form-pai', component: FormPai, children: [
    { path: 'form-react', component: FormReact }
  ]
}
```

O formulário pode ser acessado pelo caminho `/form-pai/form-react`. O serviço `Storage` é injetado no componente e pode ser usado em outras partes da aplicação por estar registrado como serviço raiz.

---

## 7. Resultado da implementação

O componente apresenta um formulário com os campos **Nome** e **E-mail**, mensagens de validação, um botão **Salvar** desabilitado enquanto o formulário for inválido e a exibição dos valores atuais em JSON. Quando os dados são válidos e o formulário é enviado, eles são armazenados no `localStorage`; ao abrir novamente o componente, os valores salvos são carregados nos controles.

O serviço ainda disponibiliza operações equivalentes para `sessionStorage`, permitindo escolher entre persistência duradoura (`localStorage`) e temporária por sessão (`sessionStorage`) conforme a necessidade.