import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AdminRoutingModule } from './admin-routing.module';
//import { AdminmainComponent } from './adminmain/adminmain.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminmainComponent } from './adminmain/adminmain.component';
@NgModule({
  declarations: [
    AdminmainComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
   
  ],
  
})
export class AdminModule { }
