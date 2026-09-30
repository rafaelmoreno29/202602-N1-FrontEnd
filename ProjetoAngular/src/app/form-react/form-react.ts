import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '../services/storage';

@Component({
  selector: 'app-form-react',
  standalone: false,
  templateUrl: './form-react.html',
  styleUrl: './form-react.css',
})
export class FormReact implements OnInit {
  form!: FormGroup;

  constructor(private storage: Storage) { }

  ngOnInit(): void {
    this.criarFormulario();
  }
  criarFormulario() {
    this.form = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email])
    });
    const form = this.storage.getLocalStorage('form');
    if (form) {
      this.form.setValue(form);
    }
  }
  salvar() {
    if (this.form.valid) {
      this.storage.setLocalStorage('form', this.form.value);
    }
  }

}
