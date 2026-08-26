import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-detalhe',
  standalone: false,
  templateUrl: './cliente-detalhe.html',
  styleUrl: './cliente-detalhe.css',
})
export class ClienteDetalhe implements OnInit {
  constructor(private route: ActivatedRoute) { }
  codigo: number = 0;
  ngOnInit() {
    this.codigo = Number(this.route.snapshot.paramMap.get('cod')) || 0;
  }

}
