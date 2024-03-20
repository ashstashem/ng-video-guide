import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Subject, take, takeUntil } from 'rxjs';
import {
  ErrorResponse,
  SuccessResponse,
  UserDetails,
} from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    api_key: new FormControl(''),
  });
  private destroyed$: Subject<boolean> = new Subject();

  invalidUsernamePass: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  async submit(): Promise<void> {
    const userDetails: UserDetails = {
      username: this.loginForm.value.username || '',
      password: this.loginForm.value.password || '',
      api_key: this.loginForm.value.api_key || '',
    };

    this.authService
      .login(userDetails)
      .pipe(take(1), takeUntil(this.destroyed$))
      .subscribe((data: SuccessResponse | ErrorResponse) => {
        if (data.success) {
          localStorage.setItem('loggedIn', 'true');
          this.router.navigate(['/home']);
        } else {
          this.invalidUsernamePass = (data as ErrorResponse).status_message;
        }
      });
  }
}
