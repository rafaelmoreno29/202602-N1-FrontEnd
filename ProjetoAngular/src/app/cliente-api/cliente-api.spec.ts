import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteApi } from './cliente-api';

describe('ClienteApi', () => {
  let component: ClienteApi;
  let fixture: ComponentFixture<ClienteApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClienteApi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteApi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
