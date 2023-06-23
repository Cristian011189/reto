import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudtareaComponent } from './crudtarea.component';

describe('CrudtareaComponent', () => {
  let component: CrudtareaComponent;
  let fixture: ComponentFixture<CrudtareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudtareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudtareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
