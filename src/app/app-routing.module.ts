import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    component: ProductComponent, path: ""
  },
  {
    component: ProductComponent, path: "product"
  },
  {
    component: AddproductComponent, path: "product/create"
  },
  {
    component: AddproductComponent, path: "product/edit/:id"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
