import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../shared/product.service';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  id: any;
  constructor(private builder: FormBuilder, private router: Router, private service: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.service.GetCategory().subscribe(item => {
    //   this.categorydata = item;
    // });

    // this.service.GetColor().subscribe(item => {
    //   this.colordata = item;
    // });

    // this.service.GetSize().subscribe(item => {
    //   this.sizedata = item;
    // });

    this.editproductcode = this.route.snapshot.paramMap.get('id');
    if (this.editproductcode != null) {
      this.service.GetProductbycode(this.editproductcode).subscribe(item => {
        this.editdata = item;
        if (this.editdata.variants != null) {
          for (let i = 0; i < this.editdata.variants.length; i++) {
            this.AddVariants();
          }
        }
        this.id = this.editdata.id;
        this.productform.setValue({
          name: this.editdata.name,
          price: this.editdata.price,
          color: this.editdata.color,
          type: this.editdata.type,
          sku: this.editdata.sku,
          description: this.editdata.description,
        })
      });
    }
  }

  formvariant !: FormArray<any>;
  colordata: any;
  sizedata: any;
  categorydata: any
  saveresponse: any;
  editdata: any;
  editproductcode: any;

  productform = this.builder.group({
    name: this.builder.control('', [Validators.required]),
    price: this.builder.control('', [Validators.required, Validators.min(1)]),
    color: this.builder.control('', [Validators.required, Validators.maxLength(56)]),
    type: this.builder.control('', [Validators.required, Validators.maxLength(56)]),
    sku: this.builder.control('', Validators.required),
    description: this.builder.control('', [Validators.required, Validators.maxLength(56)]),
  });

  redirecttolist() {
    this.router.navigate(['product']);
  }

  AddVariants() {
    this.formvariant.push(this.Generaterow());
  }
  get f() { return this.productform.controls; }
  Generaterow() {
    return this.builder.group({
      name: this.builder.control(this.productform.value.name),
      price: this.builder.control(this.productform.value.price),
      color: this.builder.control(this.productform.value.color),
      type: this.builder.control(this.productform.value.type),
      sku: this.builder.control(this.productform.value.sku),
      description: this.builder.control(this.productform.value.sku),
    });
  }

  SaveProduct() {
    if (this.productform.valid) {
      if (!this.id) {
        this.service.CreateProduct(this.productform.getRawValue()).subscribe(item => {
          this.saveresponse = item;
          this.productform.reset();
          this.redirecttolist();
          alertify.success("Saved Successfully");
        });
      }
      else {
        this.service.UpdateProduct(this.id, this.productform.getRawValue()).subscribe(item => {
          this.saveresponse = item;
          this.productform.reset();
          this.redirecttolist();
          alertify.success("Update Successfully");
        });
      }
    } else {
      alert("please enter valid data");
    }
  }
}
