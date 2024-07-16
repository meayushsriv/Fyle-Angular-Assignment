import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  userForm: FormGroup;
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga', 'Weightlifting'];
  
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      workoutType: ['', Validators.required],
      minutes: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const { name, workoutType, minutes } = this.userForm.value;
      this.userService.addUser(name, workoutType, parseInt(minutes));
      alert('Data added successfully!');
      this.userForm.reset();
    }
  }
}
