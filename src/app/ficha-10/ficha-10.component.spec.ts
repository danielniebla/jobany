import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ficha10Component } from './ficha-10.component';

describe('Ficha10Component', () => {
  let component: Ficha10Component;
  let fixture: ComponentFixture<Ficha10Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Ficha10Component]
    });
    fixture = TestBed.createComponent(Ficha10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
