import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { LiveChatService } from '../liveChat.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  constructor(private liveChatService: LiveChatService, private pService: ProductService, private formBuilder: FormBuilder) {
  	  	
   }

   fileToUpload: File = null;
   productForm: FormGroup;
   submitted  =  false;
   uniqueId = Date.now(); 
   public message = '';

   printLog(){

   	this.pService.addproduct();
    this.ngOnInit();

   }

   handleFileInput(files: FileList) {

    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {

    this.pService.uploadImage(this.uniqueId,this.fileToUpload);
  }

   storeProductInformation(){

    this.submitted = true;
    if (this.productForm.invalid) {
        
        return;
    }
    if(this.productForm.invalid){
      return;
    }
    this.pService.storeProductInformation(this.productForm.value);

    this.pService
      .getProductInformation()
      .subscribe((data) => {
      console.log(data);
      this.uploadFileToActivity();
    });

    this.liveChatService.sendProductAddMessage(this.message);

  }

  get fControl() { return this.productForm.controls; }

  ngOnInit() {
    
    this.productForm  =  this.formBuilder.group({
        ProductText: ['', Validators.required],
        ProductPrice: ['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(2)]],
        ProductOffer: ['', [Validators.required,Validators.pattern("^[0-9 ]{2}[A-z ]{4}[0-9]{1}$")]],
         // strict validation above eg 3 for 2, 4 for 2 etc
        ProductDes: ['', [Validators.required,Validators.minLength(10)]],
        ProductUniqueId : ['', [Validators.required,Validators.pattern("^[0-9]+$")]]
    });

    this.productForm.controls['ProductUniqueId'].setValue(this.uniqueId); 
  }

}
