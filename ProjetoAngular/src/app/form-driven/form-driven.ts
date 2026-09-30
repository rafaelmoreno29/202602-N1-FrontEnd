import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Storage } from '../services/storage';

@Component({
  selector: 'app-form-driven',
  standalone: false,
  templateUrl: './form-driven.html',
  styleUrl: './form-driven.css',
})
export class FormDriven implements OnInit {
  nome: string = '';
  email: string = '';

  constructor(private storage: Storage) { }

  ngOnInit() {
    const form = this.storage.getSessionStorage('form');
    if (form) {
      this.nome = form.nome;
      this.email = form.email;
    }
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.storage.setSessionStorage('form', form.value);
      alert(`Formulário enviado com sucesso!`);
    } else {
      alert('Formulário inválido.');
    }
  }
}
