import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  get users() {
    return this.usersService.users;
  }



  ngOnInit(): void {
  
      this.usersService.getUsers();

    
  }

  onDeleteUser(id:number){
    this.usersService.onDeleteUser(id)
  }
}
