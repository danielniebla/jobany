import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ficha2Component } from './ficha-2.component';

describe('Ficha2Component', () => {
  let component: Ficha2Component;
  let fixture: ComponentFixture<Ficha2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Ficha2Component]
    });
    fixture = TestBed.createComponent(Ficha2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
