import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(public http:HttpClient,public app:AppComponent,public route:Router){}
  @Input() phonePayUserProp={id:0,name:'',mobNumber:''};
  // id!:number;
  // name!:string;
  // mobNumber!:number;


  bankList:any[]|undefined;
linkdbankList!:any[];
userInfo!:any[];

whatToShow=0;

ngOnInit(){
  console.log(this.app.mobNumber)
  console.log(this.phonePayUserProp.name)
  let obj =[this.app.mobNumber]
  let url = this.app.baseUrl+"getBankDetails";
  this.http.post(url,obj).subscribe({
    next: (data: any) => {
      console.log(data);
      this.bankList = data;
    },
    error: (err: any) => {
      console.error('Error occurred:', err);
      this.route.navigate([""]);
      // this.app.open('An error occurred while fetching bank names.', 'Close', {
      //   duration: 3000,
      // });
    }});
    console.log(this.app.phonePayUserId)
let obj2=[this.app.phonePayUserId];
    let url2 = this.app.baseUrl+"get/user";
    this.http.post(url2,obj2).subscribe((data:any)=>{
      console.log(data);
      this.userInfo=data; 

    });
}



onClick(){
  this.whatToShow=1;
  }
}
