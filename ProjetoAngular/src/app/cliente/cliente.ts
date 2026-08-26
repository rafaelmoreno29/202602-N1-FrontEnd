import { Component } from '@angular/core';

@Component({
  selector: 'app-cliente',
  standalone: false,
  templateUrl: './cliente.html',
  styleUrl: './cliente.css',
})
export class Cliente {
  meuNome: string = 'Rafael';
  vezesClicou: number = 0;

  clicar(n: number) {
    this.vezesClicou = this.vezesClicou + n;
  }

}