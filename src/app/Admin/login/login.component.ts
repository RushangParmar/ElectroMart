import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (this.authService.login(this.password)) {
      this.router.navigate(['/']); // Navigate to home or desired route
    } else {
      alert('Incorrect password');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
