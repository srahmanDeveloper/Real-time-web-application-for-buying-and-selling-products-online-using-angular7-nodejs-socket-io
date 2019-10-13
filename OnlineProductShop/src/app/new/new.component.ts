import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Lightbox } from 'ngx-lightbox';
import  ProductModel  from '../Domain/ProductModel';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { LiveChatService } from '../liveChat.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(private liveChatService: LiveChatService, private pService: ProductService,private _lightbox: Lightbox, private formBuilder: FormBuilder) { 

  }
  editForm: FormGroup;
  newlyCreatedProducts =  [];
  productsInBasket = [];

  addProduct(product){

    this.productsInBasket.push(product);
    this.calculateTotalPrice(this.productsInBasket);

  }
  totalSpend = 0;
  calculateTotalPrice(basket){

    var totalSpend = 0;
    if(basket.length == 0){
      
      this.totalSpend = 0;
      return;
    }

    for(var each = 0; each < basket.length; each++ ){
      
      var quantity = Number(basket[each].quantity);
      var offer = basket[each].ProductOffer;
      var price = basket[each].ProductPrice;
      var offerSplitOne = offer.split('for');
      offerSplitOne = offerSplitOne[0].trim();
      offerSplitOne = Number(offerSplitOne);
      var offerSplitTwo = offer.split('for');
      offerSplitTwo = offerSplitTwo[1].trim();
      offerSplitTwo = Number(offerSplitTwo);
      var remainder = quantity % offerSplitOne;
      var actual = quantity - remainder;
      var offerRemainder = offerSplitOne - offerSplitTwo;
      var splitQty = parseInt((quantity/offerSplitOne).toString());
      var ratio = (offerSplitOne - offerRemainder) * price *splitQty;
      totalSpend += (ratio) + (remainder * price);
      this.totalSpend = totalSpend;

    }

  }

  removeFromBasket(product){

    var length = this.productsInBasket.length;
    var basketAfterRemoved = [];
    for(var each = 0; each < length; each++){

      if(this.productsInBasket[each]._id !=  product._id){
        basketAfterRemoved.push(this.productsInBasket[each]);
      }
    }
    this.productsInBasket = basketAfterRemoved;
    this.calculateTotalPrice(this.productsInBasket);
  }

  enableEditProduct(product,index){

    this.newlyCreatedProducts[index].editMode = true;
    this.newlyCreatedProducts[index].displayMode = false;
    this.editForm.controls['ProductPrice'].setValue(product.ProductPrice);
    this.editForm.controls['ProductText'].setValue(product.ProductPrice);
    this.editForm.controls['ProductOffer'].setValue(product.ProductOffer);
    this.editForm.controls['ProductDes'].setValue(product.ProductDes);
  }

  disableEditProduct(index){

  	this.newlyCreatedProducts[index].editMode = false;
    this.newlyCreatedProducts[index].displayMode = true;
  }

  deleteProduct(id){

  	this.pService.deleteProduct(id).subscribe((data) => {
        var list = this.newlyCreatedProducts;
        this.newlyCreatedProducts = [];
        for(var each = 0; each < list.length; each++){

        	if(list[each]._id != id ){
        		
        		this.newlyCreatedProducts.push(list[each]);
        	}
        }
    });
  }

  editProduct(product,index){

  	this.pService.editProduct(this.editForm.value,product._id);
    this.disableEditProduct(index);
    this.updateListAfterEdit(index);
  }

  updateListAfterEdit(index){
    
    console.clear();
    console.log(this.newlyCreatedProducts);
    console.log(this.editForm.value);

    for(var each =0; each < this.newlyCreatedProducts.length; each++){

      if(each == index){
        this.newlyCreatedProducts[each].ProductDes = this.editForm.value.ProductDes;
        this.newlyCreatedProducts[each].ProductOffer = this.editForm.value.ProductOffer;
        this.newlyCreatedProducts[each].ProductPrice = this.editForm.value.ProductPrice;
        //this.newlyCreatedProducts[each].ProductDes = this.editForm.value.ProductDes;        
      }

    }

    
  }

  ngOnInit() {
  	
  	this.pService
      .getProductInformation()
      .subscribe((data:ProductModel[]) => {

      	this.newlyCreatedProducts = data;
        var length = data.length;
        this.setProductSource();
        this.setProductEditing();
        this.editForm  =  this.formBuilder.group({
        ProductText: ['', Validators.required],
        ProductPrice: ['', Validators.required],
        ProductOffer: ['', Validators.required],
        ProductDes: ['', Validators.required]
    });   

    });

    var self = this;
    
    this.liveChatService
      .getNewProduct()
      .subscribe((message: string) => {
        
        
        setTimeout(function(){
          self.newlyCreatedProducts = [];
          self.pService
          .getProductInformation()
          .subscribe((data:ProductModel[]) => {

            self.newlyCreatedProducts = data;
            var length = data.length;
            self.setProductSource();
            self.setProductEditing();
            self.editForm  =  self.formBuilder.group({
            ProductText: ['', Validators.required],
            ProductPrice: ['', Validators.required],
            ProductOffer: ['', Validators.required],
            ProductDes: ['', Validators.required]
        });   

        });
        },1000);
        

      });
  }

  setProductSource(){



    console.log(this.newlyCreatedProducts);
  	for(var src = 0; src < this.newlyCreatedProducts.length; src++){
      var ImgSrc = '/assets/upload/' + this.newlyCreatedProducts[src].ProductUniqueId + '.png';
  		//this.newlyCreatedProducts[src].thumb = ImgSrc;
      this.newlyCreatedProducts[src].thumb = ImgSrc;
  		this.newlyCreatedProducts[src].src = ImgSrc;
  		this.newlyCreatedProducts[src].caption = this.newlyCreatedProducts[src].ProductDes;
  	}
  }

  setProductEditing(){

    for(var editMode = 0; editMode < this.newlyCreatedProducts.length; editMode++){
      this.newlyCreatedProducts[editMode].editMode = false;
      this.newlyCreatedProducts[editMode].displayMode = true;
      this.newlyCreatedProducts[editMode].quantity = 0; 
    }
  }


  open(index: number,row: number): void {
    // open lightbox
    this._lightbox.open(this.newlyCreatedProducts, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

}
