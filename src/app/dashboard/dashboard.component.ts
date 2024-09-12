import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @Input() phonePayUserProp={id:0,name:'',mobNumber:''};
  // id!:number;
  // name!:string;
  // mobNumber!:string;
  // phonePayUser:any={id:0,name:'',mobNumber:''};

  transacations!:any[];
  checkBalance!:any[];
   whatToShow:number=0;
   mobNumber:number=0;

   constructor(public app:AppComponent, public http:HttpClient, public route:Router){}

   ngOnInit(){
    let url = this.app.baseUrl+"getPhonePayUser/"+this.app.phonePayUserId;
    this.http.get(url).subscribe({
      next: (response:any) => {

        this.phonePayUserProp = response;
        console.log(this.phonePayUserProp.mobNumber);
      },
      error: (err) => {
        this.route.navigate([""]);
        // You can also display an error message to the user
      },
    });

    let url2 = this.app.baseUrl+"get/all/transactions/"+this.app.phonePayUserId;
    this.http.get(url2).subscribe((data:any)=>{
      this.transacations=data;
    });

    let url3=this.app.baseUrl+"get/bank/balance/"+this.app.phonePayUserId;
    this.http.get(url3).subscribe((data:any)=>{
      this.checkBalance=data;
      console.log(data);
    });

   }
   onClick(num:number){
    console.log(num);
    this.whatToShow=num;
    this.ngOnInit();
  }   


}
