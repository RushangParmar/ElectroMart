import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Admin/auth.service';
import { Observable,map,of,catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-brochure',
  templateUrl: './brochure.component.html',
  styleUrl: './brochure.component.css'
})
export class BrochureComponent implements OnInit{
  items: any[] = [];
  groupedItems: { [key: string]: any[] } = {};
  isLoggedIn: boolean = false;
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  
  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.authService.getAuthStatus().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });

    this.fetchItems().subscribe(data => {
      this.items = data;
      this.groupItemsByType();
    });
  }

  fetchItems(): Observable<any[]> {
    return this.http.get<any[]>('https://electromart-389cf-default-rtdb.firebaseio.com/items.json').pipe(
      map(response => {
        console.log('Fetched items:', response);
        if (Array.isArray(response)) {
          return response;
        } else {
          return Object.values(response);
        }
      }),
      catchError(error => {
        console.error('Error fetching items:', error);
        return [];
      })
    );
  }
  

  groupItemsByType() {
    if (Array.isArray(this.items)) {
      this.groupedItems = this.items.reduce((groups: any, item: any) => {
        const type = item.type;
        if (!groups[type]) {
          groups[type] = [];
        }
        groups[type].push(item);
        return groups;
      }, {});
    } else {
      console.error('Items is not an array:', this.items);
    }
  }

  makeBill(item: any) {
    this.router.navigate(['/bills'], { queryParams: {
      type: item.type,
      companyName: item.companyName,
      modelNo: item.modelNo,
      pricePerPiece: item.price
    }});
  }
  
}
