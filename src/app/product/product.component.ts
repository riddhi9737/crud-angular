import { Component, OnInit, DoCheck, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { productmodel } from '../Model/productmodel';
import { ProductService } from '../shared/product.service';
import * as alertify from 'alertifyjs'


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private services: ProductService, private router: Router) { }

  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;
  productdata!: productmodel[];
  finaldata: any;
  ngOnInit(): void {
    this.LoadProduct();
  }

  displayColums: string[] = ["name", "price", "color", "type", "sku", "action"];

  EditProduct(code: any) {
    this.router.navigate(['product/edit/' + code])
  }

  LoadProduct() {
    this.services.GetAllProducts().subscribe(resp => {
      this.productdata = resp;
      this.finaldata = new MatTableDataSource<productmodel>(this.productdata);
      this.finaldata.paginator = this._paginator;
      this.finaldata.sort = this._sort;
    })
  }
  RemoveProduct(id: any) {
    alertify.confirm("Remove Product", "do you want remove this product?", () => {
      this.services.RemoveProductbycode(id).subscribe(r => {
        this.LoadProduct();
      });
    }, function () {

    })
  }
  applyFilter(filterValue: any) {
    var value = filterValue.target.value
    this.finaldata.filter = value.trim().toLowerCase();
    if (this.finaldata.paginator) {
      this.finaldata.paginator.firstPage();
    }
  }

}
