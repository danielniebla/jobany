import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichasTecnicasComponent } from './fichas-tecnicas.component';

describe('FichasTecnicasComponent', () => {
  let component: FichasTecnicasComponent;
  let fixture: ComponentFixture<FichasTecnicasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FichasTecnicasComponent]
    });
    fixture = TestBed.createComponent(FichasTecnicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
