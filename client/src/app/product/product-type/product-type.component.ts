import { IType } from 'src/app/shared/models/productType';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ShopService } from 'src/app/shop/shop.service';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit {
  isInsert : boolean = false;
  insertTypeForm: FormGroup;
  types : IType[];

  constructor(private shopService : ShopService) { }

  ngOnInit(): void {
    this.createForm();
    this.loadTypes();
  }

  createForm(){
    this.insertTypeForm = new FormGroup({
      insert: new FormControl('', Validators.required)
    });
  }

  loadTypes(){
    this.shopService.getTypes().subscribe(type => this.types = type, error => console.log(error));
  }

  activateInsert(){
    this.isInsert = true;
  }

  deactivateInsert(){
    this.isInsert = false;
  }

  onSubmit(){
    this.deactivateInsert();
    console.log('radi!');
  }
}
