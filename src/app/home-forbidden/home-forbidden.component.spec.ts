import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeForbiddenComponent } from './home-forbidden.component';

describe('HomeForbiddenComponent', () => {
  let component: HomeForbiddenComponent;
  let fixture: ComponentFixture<HomeForbiddenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeForbiddenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeForbiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
