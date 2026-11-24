import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { ClienteService } from '../services/cliente-service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cliente-api',
  standalone: false,
  templateUrl: './cliente-api.html',
  styleUrl: './cliente-api.css',
})
export class ClienteApi implements OnInit {
  clientes: any[] = [];
  dadosModal: any = {};
  private modalService = inject(NgbModal);

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        let cliente = {
          nome: (document.getElementById('nome') as HTMLInputElement).value,
          email: (document.getElementById('email') as HTMLInputElement).value,
          imagem: (document.getElementById('imagem') as HTMLInputElement).value,
        };
        this.clienteService.inserirCliente(cliente).subscribe({
          next: () => {
            this.carregarClientes();

            console.log('Cliente inserido com sucesso');
          },
          error: (error) => {
            console.error('Erro ao inserir cliente:', error);
          }
        });
      },
      (reason) => {
      },
    );
  }


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
