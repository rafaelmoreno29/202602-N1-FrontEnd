import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente-service';

@Component({
  selector: 'app-cliente-api',
  standalone: false,
  templateUrl: './cliente-api.html',
  styleUrl: './cliente-api.css',
})
export class ClienteApi implements OnInit {
  clientes: any[] = [];
  constructor(private clienteService: ClienteService) { }
  ngOnInit() {
    this.carregarClientes();
  }
  carregarClientes() {
    this.clienteService.obterClientes().subscribe({
      next: (data: any) => {
        this.clientes = data;
      },
      error: (error) => {
        console.error('Erro ao obter clientes:', error);
      }
    });
  }
  excluir(id: number) {
    this.clienteService.excluirCliente(id).subscribe({
      next: () => {
        console.log('Cliente excluído com sucesso');
        this.carregarClientes(); // Recarrega a lista de clientes após a exclusão
      },
      error: (error: any) => {
        console.error('Erro ao excluir cliente:', error);
      }
    });
  }
}
