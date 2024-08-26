import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.css'
})

export class WarehouseComponent implements OnInit{
  showForm: boolean = false;
  formData = {
    type: '',
    companyName: '',
    modelNo: '',
    units: 0 
  };
  groupedWarehouseData: { type: string, items: any[] }[] = [];

  ngOnInit(): void {
    this.fetchWarehouseData(); // Fetch data on component load
  }
  constructor(private dataService: DataService) { }

  toggleForm() {
    this.showForm = !this.showForm; // Toggle form visibility
  }

  onSubmit() {
    console.log('Submitting warehouse form:', this.formData);

    // Create a unique key based on type, companyName, and modelNo
    const uniqueKey = `${this.formData.type}-${this.formData.companyName}-${this.formData.modelNo}`;
    const unitData = { units: this.formData.units };

    // Add the units to Firebase under a different path with the unique key
    this.dataService.addUnitsToFirebase(uniqueKey, this.formData.units).subscribe(() => {
      console.log('Units added successfully');
      this.showForm = false; // Hide form after submission
      this.resetForm(); // Clear the form
      this.fetchWarehouseData(); // Refresh data
    }, error => {
      console.error('Error adding units to Firebase', error);
    });
  }
  
  resetForm() {
    this.formData = {
      type: '',
      companyName: '',
      modelNo: '',
      units: 0
    };
  }
  fetchWarehouseData() {
    this.dataService.getWarehouseData().subscribe(data => {
      const warehouseData = Object.values(data || {});

      // Group data by type
      const groupedData: { type: string, items: any[] }[] = warehouseData.reduce((groups: { type: string, items: any[] }[], item: any) => {
        const group = groups.find(g => g.type === item.type);
        if (group) {
          group.items.push(item);
        } else {
          groups.push({
            type: item.type,
            items: [item]
          });
        }
        return groups;
      }, []);

      // Sort the grouped data by type
      this.groupedWarehouseData = groupedData.sort((a, b) => {
        return a.type.localeCompare(b.type);
      });

      console.log('Grouped and sorted warehouse data:', this.groupedWarehouseData);
    }, error => {
      console.error('Error fetching warehouse data', error);
    
    });

}}
