import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  
  logo: any;
  auth: AuthService;
  userdata:any

  constructor(auth:AuthService){
    this.auth=auth

  }

  logos(y:any){
   this.logo=y
   console.log(y)
   if(y=="logout"){
    this.auth.logout()
   }

   if(y=="accdetails"){
    this.logo=y
    this.auth.acdetails().subscribe((res:any)=>{
      console.log(res)
    this.userdata=res.message
    },(err:any)=>{})
   }

  }
}
