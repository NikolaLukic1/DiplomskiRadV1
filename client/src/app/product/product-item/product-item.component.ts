import { Component, OnInit, Input } from '@angular/core';
import { IProduct, IProductInsertUpdate } from 'src/app/shared/models/product';
import { ShopService } from 'src/app/shop/shop.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IBrand } from 'src/app/shared/models/brand';
import { IType } from 'src/app/shared/models/productType';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: IProduct;
  brands: IBrand[];
  types: IType[];
  productBrandId: number;
  productTypeId: number;
  productToDelete: IProductInsertUpdate = {} as any;
  constructor(private shopService : ShopService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.shopService.getBrands().subscribe(brand => this.brands = brand, error => console.log(error));
    this.shopService.getTypes().subscribe(type => this.types = type, error => console.log(error));

  }



  deleteProduct(){
    
  this.brands.forEach(element => {
    if(element.name === this.product.productBrand){
      this.productBrandId = element.id;
    }
  });
  this.types.forEach(element => {
    if(element.name === this.product.productType){
      this.productTypeId = element.id;
    }
  });
    this.productToDelete.id = this.product.id;
    this.productToDelete.name = this.product.name;
    this.productToDelete.description = this.product.description;
    this.productToDelete.price = this.product.price;
    this.productToDelete.pictureUrl = this.product.pictureUrl;
    this.productToDelete.ProductBrandId = this.productBrandId;
    this.productToDelete.ProductTypeId = this.productTypeId;
    console.log('kliknuto!',this.productToDelete)

    this.shopService.deleteProduct(this.productToDelete).subscribe(res =>{
      this.toastr.success('Product deleted!');
      window.location.reload();
      console.log(res);
    }
      , error => console.log(error));
  }
}
