import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ficha1Component } from './ficha-1.component';

describe('Ficha1Component', () => {
  let component: Ficha1Component;
  let fixture: ComponentFixture<Ficha1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Ficha1Component]
    });
    fixture = TestBed.createComponent(Ficha1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
