import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosSplitComponent } from './pos-split.component';

describe('PosSplitComponent', () => {
  let component: PosSplitComponent;
  let fixture: ComponentFixture<PosSplitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosSplitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosSplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
