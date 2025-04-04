import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverseasComponent } from './overseas.component';

describe('OverseasComponent', () => {
  let component: OverseasComponent;
  let fixture: ComponentFixture<OverseasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverseasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverseasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
