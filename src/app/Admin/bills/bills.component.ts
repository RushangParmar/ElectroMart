import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css'
})

export class BillsComponent implements OnInit { 
  randomNumber: number=0;
  total: number = 0;
  formData = {
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    customerAadhaar: '',
    randomNumber: this.randomNumber,
    type: '',
    companyName: '',
    modelNo: '',
    serialNumber: '',
    pricePerPiece: 0,
    units: 0,
    total: this.total,
    paymentMethod: '',
    warrantyType: '',
    warrantyDuration: ''
  };

  constructor(private dataService: DataService,private route: ActivatedRoute) { }
  ngOnInit() {
    this.generateRandomNumber();
    this.route.queryParams.subscribe(params => {
      this.formData.type = params['type'];
      this.formData.companyName = params['companyName'];
      this.formData.modelNo = params['modelNo'];
      this.formData.pricePerPiece = params['pricePerPiece'];
    });
  }

  generateRandomNumber() {
    this.randomNumber = Math.floor(100000 + Math.random() * 900000);
    this.formData.randomNumber = this.randomNumber;
  }
  calculateTotal() {
    const pricePerPiece = Number((document.getElementById('pricePerPiece') as HTMLInputElement).value);
    const units = Number((document.getElementById('units') as HTMLInputElement).value);
    this.total = pricePerPiece * units;
    this.formData.total = this.total
  }

  onSubmit() {
    const currentDate = new Date();
    const warrantyEndDate = new Date(currentDate);
    const duration = Number(this.formData.warrantyDuration); // Assuming duration is in months
    warrantyEndDate.setMonth(currentDate.getMonth() + duration);
    
    const warrantyData = {
      customerId: this.formData.randomNumber,
      warrantyType: this.formData.warrantyType,
      warrantyLastDate: formatDate(warrantyEndDate, 'yyyy-MM-dd', 'en-US') // Format date for Firebase
    };

    const uniqueKey = `${this.formData.type}-${this.formData.companyName}-${this.formData.modelNo}`;
    // Construct unique key for Firebase
    console.log('Constructed Unique Key:', uniqueKey);
  // Fetch current units from Firebase
  this.dataService.getUnitsFromFirebase(uniqueKey).subscribe((units: number | null) => {
    if (units !== null) {
      console.log('Units fetched from Firebase:', units);
      console.log('Units from form:', this.formData.units);

      // Check if form units exceed available units
      if (this.formData.units > units) {
        console.error('Error: Bill units exceed available units');
        alert('Error: Bill units exceed available units');
        return;
      }

      // Proceed to update units in Firebase
      const updatedUnits = units - this.formData.units;
      this.dataService.updateUnitsInFirebase(uniqueKey, updatedUnits).subscribe(() => {
        console.log('Units updated successfully');

        // Send bill data to Firebase
        this.dataService.sendData(this.formData).subscribe(response => {

          // Send warranty data to Firebase
          this.dataService.addWarranty(warrantyData).subscribe(warrantyResponse => {
            console.log('Warranty data added successfully', warrantyResponse);
          }, error => {
            console.error('Error adding warranty data', error);
          });
        }, error => {
          console.error('Error sending bill data', error);
        });
      }, error => {
        console.error('Error updating units in Firebase', error);
      });
    } else {
      console.error('No matching warehouse entry found for key:', uniqueKey);
      alert('No matching warehouse entry found for the given type, company, and model number.');
    }
  }, error => {
    console.error('Error fetching units from Firebase', error);
  });
  }
}
