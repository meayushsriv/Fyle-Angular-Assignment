import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';
import { UserService } from '../user.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let userService: UserService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      imports: [ ReactiveFormsModule ],
      providers: [ UserService ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add user on form submit', () => {
    const addUserSpy = spyOn(userService, 'addUser');
    component.userForm.setValue({ name: 'Test User', workoutType: 'Running', minutes: 30 });
    component.onSubmit();
    expect(addUserSpy).toHaveBeenCalledWith('Test User', 'Running', 30);
  });
});
