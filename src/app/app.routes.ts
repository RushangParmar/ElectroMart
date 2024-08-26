import { Routes } from '@angular/router';
import { SelectComponent } from './Admin/select/select.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './Admin/login/login.component';
import { BillsComponent } from './Admin/bills/bills.component';
import { WarrantyComponent } from './Admin/warranty/warranty.component';
import { WarehouseComponent } from './Admin/warehouse/warehouse.component';
import { AuthGuard } from './Admin/auth.guard';
import { BrochureComponent } from './brochure/brochure.component';
import { AdditemComponent } from './brochure/additem/additem.component';

export const routes: Routes = [
    {path: 'select', component: SelectComponent},
    {path: 'home',component: HomeComponent},
    {path: 'login',component: LoginComponent},
    {path: 'brochure',component: BrochureComponent},
    {path: 'bills',component:BillsComponent, canActivate: [AuthGuard]},
    {path: 'warehouse',component:WarehouseComponent, canActivate: [AuthGuard]},
    {path: 'warranty',component:WarrantyComponent, canActivate: [AuthGuard]},
    {path: 'additem',component:AdditemComponent, canActivate: [AuthGuard]},
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
