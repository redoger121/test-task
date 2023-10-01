import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';

type UsersResponseData = {
  data: User[];
};

type EditUserResponseData = User & {
  updatedAt: string;
};
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  public users = new BehaviorSubject<User[]>([]);

  getUsers() {
    return this.http
      .get<UsersResponseData>('https://reqres.in/api/users?page=2')
      .pipe(
        map((responseData) => {
          const usersArray: User[] = [];
          for (const user of responseData.data) {
            usersArray.push(user);
          }

          return usersArray;
        })
      )
      .subscribe((usersArray) => {
        if (usersArray) {
          this.users.next(usersArray);
        }
      });
  }

  getUser(id: number) {
    return this.http
      .get<{ data: User }>('https://reqres.in/api/users/' + id)
      .pipe(
        catchError((errorRes) => {
          const err = new Error('An unknown error');
          switch (errorRes.status) {
            case 404:
              err.message = 'Page not found';
          }
          return throwError(() => err.message);
        })
      );
  }

  editUser(user: User) {
    return this.http
      .put<EditUserResponseData>('https://reqres.in/api/users/' + user.id, user)
      .subscribe(() => {
        const idx = this.users.value.findIndex(({ id: Id }) => {
          return Id === user.id;
        });
        if (idx >= 0) {
          this.users.value[idx] = {
            ...user,
          };
        }
      });
  }

  onDeleteUser(id: number) {
    this.http.delete('https://reqres.in/api/users/' + id).subscribe(() => {
      const idx = this.users.value.findIndex(({ id: Id }) => {
        return Id === id;
      });
      if (idx >= 0) {
        this.users.value.splice(idx, 1);
      }
    });
  }
}
