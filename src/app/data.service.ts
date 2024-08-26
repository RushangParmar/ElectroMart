import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Warranty {
    id?: string; // Optional because id is added later
    customerId: number;
    warrantyType: string;
    warrantyLastDate: string;
  }

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private firebaseUrl = 'https://electromart-389cf-default-rtdb.firebaseio.com/'; // Replace with your Firebase URL

  constructor(private http: HttpClient) { }

  sendData(data: any): Observable<any> {
    return this.http.post(`${this.firebaseUrl}/data.json`, data);
  }
  addWarranty(data: any): Observable<any> {
    return this.http.post(`${this.firebaseUrl}/warranties.json`, data);
  }
  getWarranties(): Observable<{ [key: string]: Warranty }> {
    return this.http.get<{ [key: string]: Warranty }>(`${this.firebaseUrl}/warranties.json`);
  }
  addWarehouseData(data: any): Observable<any> {
    return this.http.post(`${this.firebaseUrl}/warehouse.json`, data);
  }
  getWarehouseData(): Observable<any> {
    return this.http.get(`${this.firebaseUrl}/warehouse.json`);
  }
  addUnitsToFirebase(key: string, units: number): Observable<any> {
    return this.http.put(`${this.firebaseUrl}units/${key}.json`, units);
  }
  getUnitsFromFirebase(uniqueKey: string): Observable<number | null> {
    return this.http.get<number | null>(`${this.firebaseUrl}units/${uniqueKey}.json`);
  }
  updateUnitsInFirebase(uniqueKey: string, updatedUnits: number): Observable<void> {
    return this.http.put<void>(`${this.firebaseUrl}units/${uniqueKey}.json`, updatedUnits);
  }
  addItemToFirebase(itemData: any): Observable<any> {
    return this.http.post(`${this.firebaseUrl}/items.json`, itemData);
  }
}
