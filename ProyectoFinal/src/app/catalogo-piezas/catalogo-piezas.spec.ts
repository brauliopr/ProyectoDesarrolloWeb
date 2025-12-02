import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoPiezas } from './catalogo-piezas';

describe('CatalogoPiezas', () => {
  let component: CatalogoPiezas;
  let fixture: ComponentFixture<CatalogoPiezas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoPiezas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoPiezas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
