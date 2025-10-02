import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.loading = true;
    this.error = '';
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigateByUrl('/citoyens'),
      error: (e) => { this.error = e?.error?.message || 'Erreur de connexion'; this.loading = false; }
    });
  }
}
