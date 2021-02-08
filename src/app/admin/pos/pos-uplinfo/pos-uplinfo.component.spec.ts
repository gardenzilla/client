import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosUplinfoComponent } from './pos-uplinfo.component';

describe('PosUplinfoComponent', () => {
  let component: PosUplinfoComponent;
  let fixture: ComponentFixture<PosUplinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosUplinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosUplinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
