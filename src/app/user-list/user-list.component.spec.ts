import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { UserService } from '../user.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [ReactiveFormsModule],
      providers: [UserService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Testing
  it('should add user on form submission', () => {
    spyOn(userService, 'addUser');
    component.userForm.setValue({ name: 'Test User', workoutType: 'Running', minutes: 30 });
    component.onSubmit();
    expect(userService.addUser).toHaveBeenCalledWith('Test User', 'Running', 30);
  });

  it('should reset form after submission', () => {
    component.userForm.setValue({ name: 'Test User', workoutType: 'Running', minutes: 30 });
    component.onSubmit();
    expect(component.userForm.value).toEqual({ name: '', workoutType: '', minutes: null });
  });
});
