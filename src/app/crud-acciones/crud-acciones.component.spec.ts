import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAccionesComponent } from './crud-acciones.component';

describe('CrudAccionesComponent', () => {
  let component: CrudAccionesComponent;
  let fixture: ComponentFixture<CrudAccionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudAccionesComponent]
    });
    fixture = TestBed.createComponent(CrudAccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
