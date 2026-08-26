import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDetalhe } from './cliente-detalhe';

describe('ClienteDetalhe', () => {
  let component: ClienteDetalhe;
  let fixture: ComponentFixture<ClienteDetalhe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClienteDetalhe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteDetalhe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
