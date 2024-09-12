import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(public http:HttpClient,public app:AppComponent, public router:Router){}
  pin : number=0;
  pin2 : number=0;
number:number=0;
otp : number=0;
showOtp:number=0;
 
    url = this.app.baseUrl+"register/"+this.number;
    register(){
    let url = this.app.baseUrl+"register/"+this.number;
    this.http.get(url).subscribe((data:any)=>{
      if(data.length == 0 || data ==-1){
        window.alert("something is wrong")
      }
      else{
        this.showOtp =1;
      }

    })

  }
  verify(){
    let url = this.app.baseUrl + 'verifyotp';
    let obj = [this.number,this.otp];
    this.http.post(url,obj).subscribe((data:any)=>{
      if(data==null || data ==-1){
        window.alert("some thing is wrong")
      }
      else{
        this.showOtp =2;

      }

    })
  }
 
  setpin(){
    if(this.pin == this.pin2){
    let url = this.app.baseUrl + 'setpin/'+this.number;
   // let pin = this.pin;
    this.http.post(url,this.pin).subscribe((data:any)=>{
      if(data==null || data ==-1){
        window.alert("some thing is wrong")
      }
      else{
        this.router.navigate(["/profile"]);
        this.app.whatToShow=3;

      }

    })

  }
  else{
    window.alert("invalid Pin")
  }
  }


  mobNumber:number=0;
  //otp:number=0;
  password:string="";
  conformPassword="";
  upiPin:number=0;

  whatToDo:number=0;
  onClick(){
    let url =this.app.baseUrl+"user/register/"+this.mobNumber;
    this.http.get(url).subscribe((response)=>{
      if(response==true){
      this.whatToDo=1;
      }
      else{
        window.alert("Your mobile number is already registered.");
      }
    });
  }
  onSumbit(){
    let url =this.app.baseUrl+"user/verify/"+this.mobNumber+"/"+this.otp;
    this.http.get(url).subscribe((response)=>{
      if(response==true){
      this.whatToDo=2;
      }
      if(response==false){
      window.alert("Enter Wrong OTP");
      }
    });
  }

  onSumbitPassword(){
    if(this.password==this.conformPassword){
        this.whatToDo=3;
    }
    else {
      window.alert("Password not Match!!!");
    }
  }

  onSumbitPin(){
    let arr:[number,string,number];
    arr=[this.mobNumber,this.password,this.upiPin];
    let url=this.app.baseUrl+"setPass/setPin";
    this.http.post(url,arr).subscribe((response:any)=>{
    if(response!=-1){
      this.app.phonePayUserId=response;
      this.router.navigate((["/dashboard"]))
    }
    else{
      window.alert("Somthing Wrong");
    }
   });
  }


}
