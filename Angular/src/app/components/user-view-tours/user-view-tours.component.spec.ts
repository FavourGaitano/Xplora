import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewToursComponent } from './user-view-tours.component';

describe('UserViewToursComponent', () => {
  let component: UserViewToursComponent;
  let fixture: ComponentFixture<UserViewToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserViewToursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserViewToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
