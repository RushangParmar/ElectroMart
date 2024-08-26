import { Component, OnInit,HostListener } from '@angular/core';
import { AuthService } from '../Admin/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit{
  isLoggedIn: boolean = false;
  dropdownOpen: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAuthStatus().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    // Cast event.target to HTMLElement
    const target = event.target as HTMLElement;

    // Close dropdown if click is outside the menu
    if (!target.closest('.navbar')) {
      this.closeDropdown();
    }
  } 
}
