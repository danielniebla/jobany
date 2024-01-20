import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ficha3Component } from './ficha-3.component';

describe('Ficha3Component', () => {
  let component: Ficha3Component;
  let fixture: ComponentFixture<Ficha3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Ficha3Component]
    });
    fixture = TestBed.createComponent(Ficha3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
