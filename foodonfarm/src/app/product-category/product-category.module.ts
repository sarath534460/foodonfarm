import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCategoryRoutingModule } from './product-category-routing.module';
import { ProductCategoryComponent } from './product-category/product-category.component';


@NgModule({
  declarations: [
    ProductCategoryComponent,
   
  ],
  imports: [
    CommonModule,
    ProductCategoryRoutingModule
  ]
})
export class ProductCategoryModule { }
