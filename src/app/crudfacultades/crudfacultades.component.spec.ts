import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudfacultadesComponent } from './crudfacultades.component';

describe('CrudfacultadesComponent', () => {
  let component: CrudfacultadesComponent;
  let fixture: ComponentFixture<CrudfacultadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudfacultadesComponent]
    });
    fixture = TestBed.createComponent(CrudfacultadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
