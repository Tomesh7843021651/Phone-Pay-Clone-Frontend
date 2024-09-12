import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showOtp:number=0;
  number: any;
  otp: any;
  bankAccounts:any[]=[];
  userOtp:number=0;

  //pass:string="123";
   
  constructor( public app:AppComponent, public http:HttpClient, public route:Router){

  }

  //other way
  // onClick(){
   
   
  // }
  // onSubmit(){
  //   let url =this.app.baseUrl+"login/"+this.number;
  //   this.http.get(url).subscribe((response: any)=>{
  //     if(response!=-1){
  //       this.app.phonePayUserId=response;
  //       this.route.navigate(["/dashboard"]);
  //     }
  //     else{
  //       window.alert("wrong credentials!!!");
  //     }
  //   });
  // }


// my way

  register(){
    this.app.whatToShow=2;
  }
  getOtp()
{
  let url = this.app.baseUrl + 'getUserOtp';
  this.http.get(url).subscribe(
    (data: any) => {
      this.userOtp=data;
    }
  // ,
  // (error:any) => {
  //   console.error('HTTP Error:', error);
  //   window.alert('Otp not get');
  // }
);
}
popOtp()
{
  window.alert('Your Otp is : '+this.userOtp);
}

login() {
  let url = this.app.baseUrl+"login/"+this.number;

  this.http.get(url).subscribe(
    (data: any) => {
      console.log('Backend response:', data);

      if (data === -1) {
        // The mobile number is not registered
        window.alert('Mobile number not registered.');
      } else if (data === 1) {
        // OTP sent successfully

        this.showOtp = 1;
        this.getOtp();
      } else {
        // Unexpected response from the backend
        window.alert('Unexpected response from the server.');
      }
    }
    // ,
    // (error) => {
    //   console.error('HTTP Error:', error);
    //   window.alert('An error occurred while connecting to the server.');
    // }
  );
}



verifyOtp() {
  let url = this.app.baseUrl+'verifyotp';
  let obj = [this.number,this.otp];

  this.http.post(url,obj).subscribe((data:any)=>
  {
    if(data==null || data==-1)
    {
      window.alert('Something is wrong')
    }
    else{
      this.showOtp=2;
      window.alert("login sucesssfully");
      this.getBankAccounts();
      this.app.whatToShow=3;
    }
  });
}

  getBankAccounts()
  {
    let url = this.app.baseUrl+"getBankDetails/"+this.number;
    this.http.get(url).subscribe((data:any)=>
    {
      console.log("inLogin"+data);
      this.app.bankAccounts=data;

    });
  }

  mobNo:any;
  passWord:any;

  onClick(){
   
   
  }
  onSubmit(){
    console.log(this.mobNo);
    let obj =[
      this.mobNo,this.passWord
    ]
    let url =this.app.baseUrl+"login";
    this.http.post(url,obj).subscribe((response:any)=>{
      if(response!=-1){
        this.app.phonePayUserId=response;
        this.app.mobNumber=this.mobNo;
        this.route.navigate(["/dashboard"]);
      }
      else{
        window.alert("wrong credentials!!!");
      }
    });
  }

}
