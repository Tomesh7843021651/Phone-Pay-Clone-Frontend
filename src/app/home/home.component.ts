import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public app:AppComponent,public router:Router){}
  onClick(){
    this.router.navigate(["/login"]);
  }
  onLogin(){
    window.alert("Login First !!!");
  }
  onHome(){
    this.router.navigate([""]);
  }
  onPayment(){
    
    this.router.navigate(["/payment"]);
  }
  onOffers(){
    this.router.navigate([""]);
  }
  onWallet(){
    this.router.navigate([""]);
  }
  onProfile(){
    this.router.navigate(["/profile"]);
  }
  login(){
    this.router.navigate(["/login"]);
  }

}
