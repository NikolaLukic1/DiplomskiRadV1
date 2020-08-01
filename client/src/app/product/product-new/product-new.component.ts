import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/shop/shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IProduct, IProductInsertUpdate } from 'src/app/shared/models/product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IBrand } from 'src/app/shared/models/brand';
import { IType } from 'src/app/shared/models/productType';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit {
  product: IProduct = {} as any;
  productToReturn : IProductInsertUpdate = {} as any;
  editForm: FormGroup;
  brands: IBrand[];
  types: IType[];
  productBrandId: number;
  productTypeId: number;
  fileToUpload: any;
  pictureUrl: string;
  
  constructor(private shopService: ShopService,
    private activateRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private router: Router,
    private toastr: ToastrService) {
    this.bcService.set('@productNew', '');
  }


  ngOnInit(): void {
    this.bcService.set('@productNew', 'New Product');
    this.loadProduct();
    this.createEditForm();
  }


  createEditForm(){
    this.editForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required,Validators.pattern('^\\d*\\.?\\d*$')]),
      productType: new FormControl('', Validators.required),
      productBrand: new FormControl('', Validators.required)
    });
  }


  loadProduct(){
    this.shopService.getBrands().subscribe(brand => this.brands = brand, error => console.log(error));
    this.shopService.getTypes().subscribe(type => this.types = type, error => console.log(error));
  }

  onSubmit(){

    this.brands.forEach(element => {
      if(element.name === this.editForm.get('productBrand').value){
        this.productBrandId = element.id;
      }
    });
    this.types.forEach(element => {
      if(element.name === this.editForm.get('productType').value){
        this.productTypeId = element.id;
      }
    });
    console.log(this.product.id);
    
    //this.productToReturn.id = this.product.id;
    this.productToReturn.name = this.editForm.get('name').value;
    this.productToReturn.pictureUrl = this.pictureUrl;
    this.productToReturn.price = +this.editForm.get('price').value;
    this.productToReturn.description = this.editForm.get('description').value;
    this.productToReturn.ProductBrandId = this.productBrandId;
    this.productToReturn.ProductTypeId = this.productTypeId;
    
    
    this.shopService.insertProduct(this.productToReturn).subscribe(res =>{
      this.toastr.success('Product added!');
      this.router.navigateByUrl('/product');
      console.log(res);
    }
      , error => console.log(error));
  }

  updatePicture(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.pictureUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
}
