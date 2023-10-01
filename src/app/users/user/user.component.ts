import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute} from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {}
  user!: User;
  error = null;
  editMode = false;
  userId = this.route.snapshot.params['id'];
  ngOnInit(): void {
    this.usersService.getUser(this.userId).subscribe({
      next: (userData) => {
        this.user = userData.data;
      },
      error: (error) => {
        this.error = error;
        console.log(error);
      },
    });
  }

  onEdit() {
    this.editMode = !this.editMode;
  }
  onUserEdited(user: User) {
    this.user = user;
    this.editMode = false;
  }
}
