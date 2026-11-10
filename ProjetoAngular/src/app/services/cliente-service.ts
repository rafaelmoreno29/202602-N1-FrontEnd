import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient) { }

  obterClientes() {
    return this.http.get(environment.apiUrl + 'cliente');
  }
  obterClientePorId(id: number) {
    return this.http.get(environment.apiUrl + 'cliente/' + id);
  }
  excluirCliente(id: number) {
    return this.http.delete(environment.apiUrl + 'cliente/' + id);
  }
}
