import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { eShopHomeComponent } from './eShophome/eShophome.component';
import { NewComponent } from './new/new.component';
import { ListProductComponent } from './list-product/list-product.component';


const routes: Routes = [
  {
    path: '',
    component: eShopHomeComponent
  },
  {
    path: 'eShopHome',
    component: eShopHomeComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'new',
    component: NewComponent
  },
  {
    path: 'list-product',
    component: ListProductComponent
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }