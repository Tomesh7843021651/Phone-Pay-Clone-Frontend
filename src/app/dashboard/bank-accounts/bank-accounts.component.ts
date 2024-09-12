import { Component, Input } from '@angular/core';
import { AppComponent } from '../../app.component'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrls: ['./bank-accounts.component.css']
})
export class BankAccountsComponent {
  @Input() phonePayUserProp={id:0,name:'',mobNumber:''};
  // id!:number;
  // name!:string;
  // mobNumber!:string;


  whatToShow=0;
  linkdbankList!:any[];
  bankList!:any[];
  bankId!:number;
  otp:number=0;
  upiPin:number=0;

  constructor(public app:AppComponent, public http:HttpClient){}
  ngOnInit(){
    this.onCall();
  }

  onCall(){
    let url = this.app.baseUrl+"getAllBankName/"+this.phonePayUserProp.mobNumber;
    this.http.get(url).subscribe((data:any)=>{
      this.bankList=data;

    });

    let url2 = this.app.baseUrl+"getLinkedList/"+this.phonePayUserProp.mobNumber;
    this.http.get(url2).subscribe((res:any)=>{
      this.linkdbankList=res;
    })

  }

  onClick(id:number){
    this.bankId=id;
    let url = this.app.baseUrl+"setUser/"+this.phonePayUserProp.id;
    this.http.get(url).subscribe((response:any)=>{
      if(response==1){
        this.whatToShow=1;
      }
      else{
        window.alert("Somthing is wrong");
      }

    });
  }
  linkAccount(){
    let obj={
      "phonePayUserId":this.app.phonePayUserId,
      "bankUserId":this.bankId,
      "upiPin":this.upiPin,
      "otp":this.otp
    }
    let url = this.app.baseUrl+"linkBankAccount";
    this.http.post(url,obj).subscribe((data:any)=>{
      console.log(data);
      if(data ==1){
        this.onCall();
        this.whatToShow=0;
      }
      else{
        window.alert("Something is wrong");
      }
    });
  }

}
