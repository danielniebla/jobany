import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudzonasComponent } from './crudzonas.component';

describe('CrudzonasComponent', () => {
  let component: CrudzonasComponent;
  let fixture: ComponentFixture<CrudzonasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudzonasComponent]
    });
    fixture = TestBed.createComponent(CrudzonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
