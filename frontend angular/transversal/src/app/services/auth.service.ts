import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  register(payload: { email: string; password: string; nom: string; role: string }): Observable<any> {
    return this.http.post(`${this.base}/register`, payload);
  }

  login(payload: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.base}/login`, payload).pipe(
      tap((res: any) => {
        // Suppose que res.token contient le JWT
        if (res?.token) localStorage.setItem('jwt', res.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('jwt');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt');
  }
}
