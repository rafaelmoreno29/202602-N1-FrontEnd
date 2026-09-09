import { Component } from '@angular/core';
import { ICliente } from '../models/cliente';

@Component({
  selector: 'app-cliente',
  standalone: false,
  templateUrl: './cliente.html',
  styleUrl: './cliente.css',
})
export class Cliente {
  meuNome: string = 'Rafael';
  vezesClicou: number = 0;
  esconderTabela: boolean = false;
  pesquisa: string = '';

  listaClientes: ICliente[] = [
    { id: 1, nome: 'Rafael', ativo: true },
    { id: 2, nome: 'Maria', ativo: false },
    { id: 3, nome: 'João', ativo: true },
  ];

  clicar(n: number) {
    this.vezesClicou = this.vezesClicou + n;
  }

  adicionarCLiente() {
    this.listaClientes.push(
      { id: this.listaClientes.length + 1, nome: this.meuNome, ativo: true }
    );
  }

}