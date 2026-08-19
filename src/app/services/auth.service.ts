import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface TmsUser {
  displayName: string;
  role: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

@Service()
export class AuthService {
  private http = inject(HttpClient);

  currentUser = signal<TmsUser | null>(null);

  hasRole(role: string): boolean {
    const user = this.currentUser();

    return user?.role === role || user?.role === 'Admin';
  }

  async login(credentials: LoginRequest): Promise<void> {
    // Step 1:
    // Send username and password to the API.
    //
    // The API responds with Set-Cookie.
    // The browser stores tms_auth as an HttpOnly cookie.
    await firstValueFrom(this.http.post('/api/v1/auth/login', credentials));

    // Step 2:
    // Ask the API who is currently logged in.
    //
    // The browser automatically sends
    // the HttpOnly tms_auth cookie.
    const user = await firstValueFrom(this.http.get<TmsUser>('/api/v1/auth/me'));

    // Step 3:
    // Store only the user's profile in Angular state.
    //
    // We DO NOT store the raw authentication token.
    this.currentUser.set(user);
  }
}
