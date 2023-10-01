import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLogginggMode = true;
  isLoading = false;
  error = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<{ token: string }>;

    this.isLoading = true;

    if (this.isLogginggMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe({
      next: () => {
        this.isLoading = false;
        this.error = null;
        this.router.navigate(['/users']);
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.error = error;
      },
    });
  }

  onSwitchMode() {
    this.isLogginggMode = !this.isLogginggMode;
  }

  onHandleEroror() {
    this.error = null;
  }
}
