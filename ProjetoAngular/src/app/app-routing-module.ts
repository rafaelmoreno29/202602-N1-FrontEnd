import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Cliente } from './cliente/cliente';
import { NaoEncontrado } from './nao-encontrado/nao-encontrado';
import { Calculadora } from './calculadora/calculadora';
import { ClienteDetalhe } from './cliente-detalhe/cliente-detalhe';
import { FormPai } from './form-pai/form-pai';
import { FormReact } from './form-react/form-react';
import { FormDriven } from './form-driven/form-driven';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'cliente', component: Cliente },
  { path: 'calculadora', component: Calculadora },
  { path: 'calculadora/:v1/:v2', component: Calculadora },
  { path: 'cliente-detalhe/:cod', component: ClienteDetalhe },
  {
    path: 'form-pai', component: FormPai, children: [
      { path: 'form-react', component: FormReact },
      { path: 'form-driven', component: FormDriven }
    ]
  },
  { path: '**', component: NaoEncontrado },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
