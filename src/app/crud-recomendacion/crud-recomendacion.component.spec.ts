import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudRecomendacionComponent } from './crud-recomendacion.component';

describe('CrudRecomendacionComponent', () => {
  let component: CrudRecomendacionComponent;
  let fixture: ComponentFixture<CrudRecomendacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudRecomendacionComponent]
    });
    fixture = TestBed.createComponent(CrudRecomendacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
