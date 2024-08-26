import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {
  constructor(private router: Router) { }

  navigateToComponent(component: string) {
    this.router.navigate([component]);
  }
}
