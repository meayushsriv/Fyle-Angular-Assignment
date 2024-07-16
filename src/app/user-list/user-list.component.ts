import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
  userForm: any;
  onSubmit() {
   
  }

  displayedColumns: string[] = ['name', 'workoutType', 'minutes'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private userService: UserService) {}
  
  ngOnInit() {
    this.loadData();
    this.userService.userDataChanged.subscribe(() => {
      this.loadData();
    });
  }
  
  loadData() {
    this.dataSource.data = this.userService.getUsers().flatMap(user =>
      user.workouts.map(workout => ({
        name: user.name,
        workoutType: workout.type,
        minutes: workout.minutes
      }))
    );
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement)?.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
