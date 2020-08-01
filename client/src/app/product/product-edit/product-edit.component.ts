import { Component, OnInit } from '@angular/core';
import { IProduct, IProductInsertUpdate } from 'src/app/shared/models/product';
import { ShopService } from 'src/app/shop/shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IBrand } from 'src/app/shared/models/brand';
import { IType } from 'src/app/shared/models/productType';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  product: IProduct;
  productToReturn : IProductInsertUpdate = {} as any;
  editForm: FormGroup;
  brands: IBrand[];
  types: IType[];
  productBrandId: number;
  productTypeId: number;
  fileToUpload: any;
  
  constructor(private shopService: ShopService,
    private activateRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private router: Router,
    private toastr: ToastrService) {
    this.bcService.set('@productEdit', '');
  }

  ngOnInit(): void {
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
    this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(product => {
      console.log(product);
      this.product = product;
      this.editForm.patchValue(product);
      this.bcService.set('@productEdit', product.name);
    }, error => {
      console.log(error);
    });

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
    
    this.productToReturn.id = this.product.id;
    this.productToReturn.name = this.editForm.get('name').value;
    this.productToReturn.pictureUrl = this.product.pictureUrl;
    this.productToReturn.price = +this.editForm.get('price').value;
    this.productToReturn.description = this.editForm.get('description').value;
    this.productToReturn.ProductBrandId = this.productBrandId;
    this.productToReturn.ProductTypeId = this.productTypeId;
    

    this.shopService.editProduct(this.productToReturn).subscribe(res =>{
      this.toastr.success('Product updated!');
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
      this.product.pictureUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  

}
