import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewToursComponent } from './view-tours.component';

describe('ViewToursComponent', () => {
  let component: ViewToursComponent;
  let fixture: ComponentFixture<ViewToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewToursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
