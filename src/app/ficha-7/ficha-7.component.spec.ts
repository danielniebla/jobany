import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ficha7Component } from './ficha-7.component';

describe('Ficha7Component', () => {
  let component: Ficha7Component;
  let fixture: ComponentFixture<Ficha7Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Ficha7Component]
    });
    fixture = TestBed.createComponent(Ficha7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
