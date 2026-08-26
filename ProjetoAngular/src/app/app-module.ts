import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { NgbCarousel, NgbModule, NgbNav, NgbNavContent, NgbNavItem, NgbNavItemRole, NgbNavLinkBase, NgbNavLinkButton, NgbNavOutlet, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { MenuSuperior } from './menu-superior/menu-superior';
import { Destaque } from './destaque/destaque';
import { Noticia } from './noticia/noticia';
import { Home } from './home/home';
import { Cliente } from './cliente/cliente';
import { NaoEncontrado } from './nao-encontrado/nao-encontrado';
import { FormsModule } from '@angular/forms';
import { Calculadora } from './calculadora/calculadora';
import { ClienteDetalhe } from './cliente-detalhe/cliente-detalhe';

@NgModule({
  declarations: [
    App,
    MenuSuperior,
    Destaque,
    Noticia,
    Home,
    Cliente,
    NaoEncontrado,
    Calculadora,
    ClienteDetalhe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbCarousel, NgbSlide,
    NgbNavContent, NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLinkButton,
    NgbNavLinkBase, NgbNavOutlet,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
