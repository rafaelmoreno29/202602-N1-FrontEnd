import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calculadora',
  standalone: false,
  templateUrl: './calculadora.html',
  styleUrl: './calculadora.css',
})
export class Calculadora implements OnInit {
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.valor1 = Number(this.route.snapshot.paramMap.get('v1')) || 0;
    this.valor2 = Number(this.route.snapshot.paramMap.get('v2')) || 0;
  }

  valor1: number = 0;
  valor2: number = 0;
  operacao: string = '+';
  resultado: number = 0;

  calcular() {
    switch (this.operacao) {
      case '+':
        this.resultado = this.valor1 + this.valor2;
        break;
      case '-':
        this.resultado = this.valor1 - this.valor2;
        break;
      case '*':
        this.resultado = this.valor1 * this.valor2;
        break;
      case '/':
        this.resultado = this.valor1 / this.valor2;
        break;
    }
  }
}
