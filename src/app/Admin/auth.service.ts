import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor() { }

  login(password: string): boolean {
    if (password === 'hello') {
      localStorage.setItem('loggedIn', 'true');
      this.loggedIn.next(true);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('loggedIn');
    this.loggedIn.next(false);
  }

  isLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true';
  }

  getAuthStatus() {
    return this.loggedIn.asObservable();
  }
}
