import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { productmodel } from '../Model/productmodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  apiurl = 'http://localhost:3000/product';

  GetAllProducts(): Observable<productmodel[]> {
    return this.http.get<productmodel[]>(this.apiurl);
  }

  GetProductbycode(id: any): Observable<productmodel> {
    return this.http.get<productmodel>(this.apiurl + '/' + id);
  }

  RemoveProductbycode(id: any) {
    return this.http.delete(this.apiurl + '/' + id);
  }

  CreateProduct(productdata: any) {
    return this.http.post(this.apiurl, productdata);
  }

  UpdateProduct(id: any, companydata: any) {
    return this.http.put(this.apiurl + '/' + id, companydata);
  }

}
