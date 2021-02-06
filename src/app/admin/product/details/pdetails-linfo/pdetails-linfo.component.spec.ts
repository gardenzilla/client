import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdetailsLinfoComponent } from './pdetails-linfo.component';

describe('PdetailsLinfoComponent', () => {
  let component: PdetailsLinfoComponent;
  let fixture: ComponentFixture<PdetailsLinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdetailsLinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdetailsLinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
