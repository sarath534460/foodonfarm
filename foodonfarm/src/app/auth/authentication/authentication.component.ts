import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {
  
   http:any
   auth:any
  showotpbox: boolean=false;
  loginmobbox: boolean=true
  otp:string[]=['','','','']
  mobile: any;
  authstatus: boolean=false
  router: Router;

  constructor( http:HttpClient,auth:AuthService,router:Router){
        this.http=http
        this.auth=auth
        this.router=router
  }

  registration(yl:any){
   console.log(yl)
   console.log(yl.value)
     
   this.auth.fromauthcomponent(yl.value).subscribe((res:any)=>{
    console.log(res)
   
    alert(res.message)
   },(err:any)=>{
    console.log(err)
   })

   
  }


  login(y:any){
    this.mobile=y

    this.auth.fromauthlogin(y).subscribe((res:any)=>{
      console.log(res)
      //this.showotpbox=res.otpsent
      if(res.otpsent){
        this.loginmobbox=false
        this.showotpbox=true
      }else{
        this.loginmobbox=true
        this.showotpbox=false
      }
      alert(res.message)
     },(err:any)=>{
      console.log(err)
     })
  }

  submitotp(){
    
     this.auth.subotp({otp:this.otp.toString(),mobile:this.mobile}).subscribe((res:any)=>{
         console.log(res.message)

         if(res.flag=="timeup"){
          alert("otp is expired")
         }
         else if(res.flag=="invalidotp"){
          alert("otp is invalid")

         }

         else{
          this.authstatus=true
          this.router.navigate([''])
         }

     },
     (err:any)=>{
        console.log(err)
     })
  }
}
