import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductComponent } from '../product/product.component';


const routes: Routes = [{path:"product-category/:name",component:ProductCategoryComponent
  // children:[{path:"Gift Packs",component:GiftPacksComponent},
  //   {path:"Vegeterian Pickles",component:VegeterianPicklesComponent},
  //   {path:"Non-Vegeterian pickles",component:NonVegeterianPicklesComponent},
  //   {path:"Masala and Karam Powders",component:PowdersMasalasComponent},
  //   {path:"Healthy sweets and snacks",component:HealthysnacksComponent}
  // ]


},  {path:"product/:productname/:id",component:ProductComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCategoryRoutingModule { }
