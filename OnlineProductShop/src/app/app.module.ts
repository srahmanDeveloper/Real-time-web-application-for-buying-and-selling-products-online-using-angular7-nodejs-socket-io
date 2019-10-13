import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductService } from './product.service';
import { LiveChatService } from './liveChat.service';

import {
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatToolbarModule

} from '@angular/material';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { eShopHomeComponent } from './eShophome/eShophome.component';
import { NewComponent } from './new/new.component';
import { ListProductComponent } from './list-product/list-product.component';
import { LightboxModule } from 'ngx-lightbox';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxImageZoomModule } from 'ngx-image-zoom';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    eShopHomeComponent,
    NewComponent,
    ListProductComponent  
  ],
  
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    LightboxModule,
    FormsModule,
    ReactiveFormsModule,
    NgxImageZoomModule.forRoot()
  ],
  providers: [ProductService,LiveChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }