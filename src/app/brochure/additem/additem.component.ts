import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrl: './additem.component.css'
})
export class AdditemComponent {
  constructor(private dataService: DataService) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const itemData = {
        type: form.value.type,
        companyName: form.value.companyName,
        modelNo: form.value.modelNo,
        price: form.value.price,
        imageLink: form.value.imageLink,
        description: form.value.description

      };

      // Send data to Firebase
      this.dataService.addItemToFirebase(itemData).subscribe(response => {
        console.log('Item added successfully:', response);
      }, error => {
        console.error('Error adding item to Firebase:', error);
      });
    } else {
      console.error('Form is not valid');
    }
  }
}
