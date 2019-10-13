// product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  uri = 'http://localhost:4000/product';

  constructor(private http: HttpClient) { }

  addproduct() {
    const obj = {
      person_name: "Saifur",
      product_name: "Mine",
      product_gst_number: 1
    };
    console.log(obj);

    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }

  storeProductInformation(paramObj) {

    console.log('Service call param');
    console.log(paramObj);

    

    
    
    this.http.post(`${this.uri}/storeProductInformation`, paramObj)
        .subscribe(res => console.log('Done product store'));
  }

  getProductInformation() {

    

    var data = this
           .http
           .get(`${this.uri}/getProductInformation`);
    
    return data;

    
  }

   getFilesFromProductGallery() {

    

    var data = this
           .http
           .get(`${this.uri}/getFilesFromProductGallery`);
    
    return data;

    
  }

  deleteProduct(id) {

    console.log('Getting product data one');
    return this
           .http
           .get(`${this.uri}/deleteProduct/` + id);
  }

  editProduct(paramObj,id) {

    this
      .http
      .post(`${this.uri}/editProduct/${id}`, paramObj)
      .subscribe(res => console.log('edit Done'));

  }

  uploadImage(id,image) {

        
        console.log(image);

        const formData: FormData = new FormData();
        formData.append('Image', image, image.name);
        formData.append('ComponentId', id);

        
        this.http.post(`${this.uri}/upload/`, formData).subscribe(res => console.log('upload Done'));;
    }




}
