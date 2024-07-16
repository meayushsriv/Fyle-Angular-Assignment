import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 }
      ]
    }
  ];
  private storageKey = 'userData';
  userDataChanged = new Subject<void>();
  constructor() {}

  initializeUserData() {
    const storedData = localStorage.getItem(this.storageKey);
    if (storedData) {
      this.userData = JSON.parse(storedData);
    } else {
      localStorage.setItem(this.storageKey, JSON.stringify(this.userData));
    }
  }

  getUsers() {
    return this.userData;
  }

  addUser(name: string, workoutType: string, minutes: number) {
    const user = this.userData.find(u => u.name === name);
    if (user) {
      user.workouts.push({ type: workoutType, minutes });
    } else {
      this.userData.push({
        id: this.userData.length + 1,
        name,
        workouts: [{ type: workoutType, minutes }]
      });
    }
    localStorage.setItem(this.storageKey, JSON.stringify(this.userData));
    this.userDataChanged.next();
  }

  filterUsers(name: string, workoutType: string) {
    return this.userData.filter(user => {
      const matchesName = !name || user.name.toLowerCase().includes(name.toLowerCase());
      const matchesWorkout = !workoutType || user.workouts.some(workout => workout.type === workoutType);
      return matchesName && matchesWorkout;
    });
  }
}
