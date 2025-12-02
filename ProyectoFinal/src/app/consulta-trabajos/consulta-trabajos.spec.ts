import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaTrabajos } from './consulta-trabajos';

describe('ConsultaTrabajos', () => {
  let component: ConsultaTrabajos;
  let fixture: ComponentFixture<ConsultaTrabajos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaTrabajos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaTrabajos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
