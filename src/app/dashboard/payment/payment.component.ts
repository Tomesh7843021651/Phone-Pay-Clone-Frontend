import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  linkedBankList!:any[];
  selectedBank!:string;

  
   @Input() phonePayUserProp={id:0,name:'',mobNumber:''};
  //  id!:number;
  //  name!:string;
  //  mobNumber!:string;


   whatToShow:number=0;
   upiId:string="";
   ammount!:number;
   remarks!:string;
   UPIPin!:number; 
   reciverName!:string;
   reciverbankName!:string

   constructor(public http:HttpClient,public app:AppComponent, public route:Router){}

   ngOnInit(){
    console.log(this.app.mobNumber)
    console.log(this.phonePayUserProp.mobNumber)
    let obj=[this.app.mobNumber];
    let url = this.app.baseUrl+"getLinkedList";
    this.http.post(url,obj).subscribe((data:any)=>{
      this.linkedBankList=data;
    });
   }

   onClick(){
    let url = this.app.baseUrl+"verifyUpiId/"+this.upiId;

    this.http.get(url).subscribe((response:any)=>{
      if(response!=null){
        this.reciverName=response.userName;
        this.reciverbankName=response.userBank;
        this.whatToShow=1;
     }
     else{
        window.alert("UPI ID NOT FOUND!!!");
     }

    });
   }

   onPayment(){
    let obj={
      "senderId": Number(this.phonePayUserProp.id),
      "sendAmount": (this.ammount),
      "upiPin": Number(this.UPIPin),
      "receiverUpiId": this.upiId
    };
    console.log("payment objects : ",obj);

    let url = this.app.baseUrl+"sendMoney";
    this.http.post(url,obj).subscribe((data:any)=>{

      if(data==1){
        this.whatToShow=3;
      }
      else if(data==-1){
        window.alert("Upi Pin Wrong!!!")
      }
      else if(data==-2){
        window.alert("Insufficeat Balance!!!");
      }
      else{
        window.alert("Interanl Server error!!!");
      }

    });
   }

   onHome(){
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate(['/dashboard']);
    });

   }

}
