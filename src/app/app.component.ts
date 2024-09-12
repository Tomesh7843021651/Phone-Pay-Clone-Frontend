import { Component } from '@angular/core';
import{FormsModule} from'@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'PhonePayFrontend';
  whatToShow=1;
  baseUrl="http://localhost:8080/";
  phonePayUserId:number=0;

  userName:string='';
  bankAccounts:any[]=[];
  mobNumber:number=0;
  
  constructor(){}
}
