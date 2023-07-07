import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalArchiveEmployeeComponent } from './modal-archive-employee.component';

describe('ModalArchiveEmployeeComponent', () => {
  let component: ModalArchiveEmployeeComponent;
  let fixture: ComponentFixture<ModalArchiveEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalArchiveEmployeeComponent]
    });
    fixture = TestBed.createComponent(ModalArchiveEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
