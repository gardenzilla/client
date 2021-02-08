import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosSearchComponent } from './pos-search.component';

describe('PosSearchComponent', () => {
  let component: PosSearchComponent;
  let fixture: ComponentFixture<PosSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
