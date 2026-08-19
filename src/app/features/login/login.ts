import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService, LoginRequest } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = signal('');
  password = signal('');

  error = signal('');
  isLoading = signal(false);

  async login(): Promise<void> {
    // Clear old error
    this.error.set('');

    // Check username
    if (!this.username()) {
      this.error.set('Username is required.');
      return;
    }

    // Check password
    if (!this.password()) {
      this.error.set('Password is required.');
      return;
    }

    this.isLoading.set(true);

    const credentials: LoginRequest = {
      username: this.username(),
      password: this.password(),
    };

    try {
      await this.authService.login(credentials);

      // Login successful
      console.log('Logged in user:', this.authService.currentUser());

      // Go to dashboard
      this.router.navigate(['/dashboard']);
    } catch (err: any) {
      console.error('Login failed:', err);

      this.error.set(err.error?.detail ?? 'Login failed. Please check your username and password.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
