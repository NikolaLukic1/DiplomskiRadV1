import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from '../shop/shop.service';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
@ViewChild('search', {static: false}) searchTerm: ElementRef;
products: IProduct[];
brands: IBrand[];
types: IType[];
shopParams: ShopParams;
totalCount: number;
activeComponent : string;

constructor(private shopService: ShopService) {
  this.shopParams = this.shopService.getShopParams();
}

  ngOnInit(): void {
    this.activeComponent = 'product';
    this.getProducts(false);
    this.getBrands();
    this.getTypes();
  }

  onListClick(item){
    this.activeComponent = item;
  }

  
  sortOptions = [
    {name : 'Alphabetical', value: 'name'},
    {name : 'Price: Low to High', value: 'priceAsc'},
    {name : 'Price: High to Low', value: 'priceDesc'}
  ];

  
  getProducts(useCache = false){
    this.shopService.getProducts(useCache).subscribe(response => {
      this.products = response.data;
      this.totalCount = response.count;
    }, error =>{
      console.log(error);
    });
  }

  getBrands(){
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error =>{
      console.log(error);
    });
  }

  getTypes(){
    this.shopService.getTypes().subscribe(response => {
      this.types =  [{id: 0, name: 'All'}, ...response];;
    }, error =>{
      console.log(error);
    });
  }

  onBrandSelected(brandId: number){
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts(false);
  }

  onTypeSelected(typeId: number){
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts(false);
  }

  onSortSelected(sort: string){
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.getProducts(false);
  }

  onPageChanged(event: any){
    const params = this.shopService.getShopParams();
    if(event !== this.shopParams.pageNumber){
    params.pageNumber = event;
    this.shopService.setShopParams(params);
    this.getProducts(false);
    }
  }

  onSearch() {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts(false);
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts(false);
  }

}



