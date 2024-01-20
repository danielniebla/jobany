import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ficha4Component } from './ficha-4.component';

describe('Ficha4Component', () => {
  let component: Ficha4Component;
  let fixture: ComponentFixture<Ficha4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Ficha4Component]
    });
    fixture = TestBed.createComponent(Ficha4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
