import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ficha6Component } from './ficha-6.component';

describe('Ficha6Component', () => {
  let component: Ficha6Component;
  let fixture: ComponentFixture<Ficha6Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Ficha6Component]
    });
    fixture = TestBed.createComponent(Ficha6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
