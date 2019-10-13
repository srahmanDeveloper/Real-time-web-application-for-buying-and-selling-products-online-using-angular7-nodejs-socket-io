import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title = 'My Angular App';
  public isAuthenticated: boolean;
 

  constructor() {
    this.isAuthenticated = false;
    this.hideMenu();
  }

  hideMenu(){

    setTimeout(function(){

      //$('.row').hide();
      console.log('Been called');

    },5000);
    

  }

  login() {
  }

  logout() {
  }
}