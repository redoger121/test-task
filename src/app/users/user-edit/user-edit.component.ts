import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  @Input() user!: User;

  @Output() editedUser = new EventEmitter<User>();
  userEditForm!: FormGroup;

  ngOnInit(): void {
    this.userEditForm = new FormGroup({
      userFirstName: new FormControl(this.user.first_name, [
        Validators.required,
      ]),
      userLastName: new FormControl(this.user.last_name, [Validators.required]),
      userEmail: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
      ]),
      userAvatar: new FormControl(this.user.avatar, [Validators.required]),
    });
  }

  constructor(private usersService: UsersService) {}
  onSubmit() {
    const newUserData = new User(
      this.user.id,
      this.userEditForm.value['userEmail'],
      this.userEditForm.value['userFirstName'],
      this.userEditForm.value['userLastName'],
      this.userEditForm.value['userAvatar']
    );

    this.editedUser.emit(newUserData);

    this.usersService.editUser(newUserData);
  }
}
