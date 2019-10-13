

import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';
import { Observable } from 'rxjs';


import * as io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class LiveChatService {

  private url = 'http://localhost:4000';
  private socket;

  constructor(private http: HttpClient) { 

    this.socket = io(this.url);
  }

  public sendProductAddMessage(message) {

    this.socket.emit('new-product', message);
  }

  public sendMessage(message) {

    this.socket.emit('new-message', message);
  }

  public getMessages = () => {
        
        return Observable.create((observer) => {
            
            this.socket.on('new-message', (message) => {
                observer.next(message);
            });
        });
    }

    public getNewProduct = () => {
        
        return Observable.create((observer) => {
            
            this.socket.on('new-product', (message) => {
                observer.next(message);
            });
        });
    }

}
