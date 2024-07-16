import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
    service.initializeUserData();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a user workout', () => {
    service.addUser('Test User', 'Running', 30);
    const users = service.getUsers();
    const user = users.find(u => u.name === 'Test User');
    expect(user).toBeTruthy();
    expect(user?.workouts).toEqual([{ type: 'Running', minutes: 30 }]);
  });

  it('should filter users by name and workout type', () => {
    const filteredUsers = service.filterUsers('John', 'Running');
    expect(filteredUsers.length).toBe(1);
    expect(filteredUsers[0].name).toBe('John Doe');
  });
});
