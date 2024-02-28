import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewBookingsComponent } from './user-view-bookings.component';

describe('UserViewBookingsComponent', () => {
  let component: UserViewBookingsComponent;
  let fixture: ComponentFixture<UserViewBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserViewBookingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserViewBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
