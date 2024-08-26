import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";{}

import { AppComponent } from "./app.component";
import { SelectComponent } from './Admin/select/select.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './Admin/login/login.component';
import { BillsComponent } from "./Admin/bills/bills.component";
import { WarehouseComponent } from "./Admin/warehouse/warehouse.component";
import { WarrantyComponent } from "./Admin/warranty/warranty.component";
import { BrochureComponent } from "./brochure/brochure.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { AdditemComponent } from "./brochure/additem/additem.component";

import { routes } from "./app.routes";
import { DataService } from "./data.service";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
    declarations:[
        AppComponent,
        BillsComponent,
        LoginComponent,
        SelectComponent,
        WarehouseComponent,
        WarrantyComponent,
        BrochureComponent,
        HomeComponent,
        NavigationComponent,
        AdditemComponent
    ],
    imports:[
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes)
    ],
    providers:[DataService, provideAnimationsAsync()],
    bootstrap:[AppComponent]
}
)
export class AppModule{}