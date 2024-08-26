import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

interface Warranty {
  id?: string; // Optional because id is added later
  customerId: number;
  warrantyType: string;
  warrantyLastDate: string;
}

@Component({
  selector: 'app-warranty',
  templateUrl: './warranty.component.html',
  styleUrl: './warranty.component.css'
})
export class WarrantyComponent implements OnInit {
  warranties: Warranty[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadWarranties();
  }

  loadWarranties() {
    this.dataService.getWarranties().subscribe(data => {
      // Check if data is an object and convert to array
      if (data) {
        this.warranties = Object.keys(data).map(key => {
          return { id: key, ...data[key] } as Warranty; // Type assertion
        });
      } else {
        this.warranties = [];
      }
    }, error => {
      console.error('Error loading warranties', error);
    });
  }
}
