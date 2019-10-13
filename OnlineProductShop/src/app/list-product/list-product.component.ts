import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { ProductService } from '../product.service';
import  FileModel  from '../Domain/FileModel';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
	
	private _albumsFirstRow = [];
  private _albumsSecondRow = [];
  private _albumsThirdRow = [];
  private _albums = [];
  private listOfFiles = [];
  public ride = 'Ride';
  public dirSrc = '/assets/images/Img/';

  constructor(private pService: ProductService, private _lightbox: Lightbox) {

  }

  buildFirstRowData():void{

    for (let i = 0; i <= 3; i++) {
      const src = this.dirSrc + this.listOfFiles[i];
      const caption = 'Image ' + this.listOfFiles[i] + ' caption here';
      const thumb = this.dirSrc + this.listOfFiles[i];
      const album = {
         src: src,
         caption: caption,
         thumb: thumb
      };

      this._albumsFirstRow.push(album);
    }
  }

  buildSecondRowData():void{

    for (let i = 4; i <= 7; i++) {
      const src = this.dirSrc + i + '.jpg';
      const caption = 'Image ' + i + ' caption here';
      const thumb = this.dirSrc + i + '.jpg';
      const album = {
         src: src,
         caption: caption,
         thumb: thumb
      };
      this._albumsSecondRow.push(album);
      this._albums = this._albumsSecondRow;
    }

  }

  buildThirdRowData():void{

    for (let i = 8; i < this.listOfFiles.length; i++) {
      const src = this.dirSrc + this.listOfFiles[i];
      const caption = 'Image ' + this.listOfFiles[i] + ' caption here';
      const thumb = this.dirSrc + this.listOfFiles[i];
      const album = {
         src: src,
         caption: caption,
         thumb: thumb
      };

      this._albumsThirdRow.push(album);
    }
  }

  open(index: number,row: number): void {
    // open lightbox
    
    switch(row){
      case 1:
        this._albums = this._albumsFirstRow;
      break;

      case 2:
        this._albums = this._albumsSecondRow;
      break;

      case 3:
        this._albums = this._albumsThirdRow;
      break;
    }
    this._lightbox.open(this._albums, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  ngOnInit() {

      this.pService
      .getFilesFromProductGallery()
      .subscribe((data:FileModel[]) => {
        this.listOfFiles = data;
        this.listOfFiles = this.listOfFiles.sort(function(a,b){
          return b-a;
        }); 
        console.log(this.listOfFiles);
        this.buildFirstRowData();
        this.buildSecondRowData();
        this.buildThirdRowData();
    });
  }
}
