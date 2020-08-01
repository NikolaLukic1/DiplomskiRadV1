import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductBrandComponent } from './product-brand/product-brand.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { SharedModule } from '../shared/shared.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductNewComponent } from './product-new/product-new.component';



@NgModule({
  declarations: [ProductComponent, ProductBrandComponent, ProductItemComponent, ProductTypeComponent, ProductEditComponent, ProductNewComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
