import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ficha8Component } from './ficha-8.component';

describe('Ficha8Component', () => {
  let component: Ficha8Component;
  let fixture: ComponentFixture<Ficha8Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Ficha8Component]
    });
    fixture = TestBed.createComponent(Ficha8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
