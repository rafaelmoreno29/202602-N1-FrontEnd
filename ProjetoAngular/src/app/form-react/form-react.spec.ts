import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReact } from './form-react';

describe('FormReact', () => {
  let component: FormReact;
  let fixture: ComponentFixture<FormReact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormReact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormReact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
