import { Component, OnInit } from '@angular/core';
import { LiveChatService } from '../liveChat.service';

@Component({
  selector: 'app-eShopHome',
  templateUrl: './eShopHome.component.html',
  styleUrls: ['./eShopHome.component.css']
})
export class eShopHomeComponent implements OnInit {

  public isAuthenticated: boolean;
  public drive = 'Buy';
  public ride = 'Sell';
  public message = '';
  public messages = [];
  public showLiveChatPanel = false;

  constructor(private liveChatService: LiveChatService) {

  }

  navigateToMapPage(link){

    location.href = 'products';
  };

  showMessagePanel(){
    
    this.showLiveChatPanel = true;
  }


  sendMessage() {

    this.liveChatService.sendMessage(this.message);
    console.log(this.message);
    this.showLiveChatPanel = true;
    this.message = '';
  }


  ngOnInit() {

    this.liveChatService
      .getMessages()
      .subscribe((message: string) => {
        this.messages.push(message);
        if(this.messages.length > 0){
          this.showLiveChatPanel = true;
        }
      });

  }

}
