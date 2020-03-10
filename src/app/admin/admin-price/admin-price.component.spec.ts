import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPriceComponent } from './admin-price.component';

describe('AdminPriceComponent', () => {
  let component: AdminPriceComponent;
  let fixture: ComponentFixture<AdminPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
