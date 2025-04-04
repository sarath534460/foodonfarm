import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminmainComponent } from './adminmain/adminmain.component';

const routes: Routes = [{path:"admin",component:AdminmainComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
