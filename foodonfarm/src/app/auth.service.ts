import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http:any
  loggined: number=0

  constructor(http:HttpClient) { 
    this.http=http
  }

  public y=new BehaviorSubject<any>(null)
   
 fromauthcomponent(yl:any){

  return this.http.post("http://localhost:2000/users/register",yl,{withCredentials:true})
 }

 islogged(){
  return localStorage.getItem("foodonfarmlogin") 
 }

 fromauthlogin(yl:any){
  console.log(yl)

  return this.http.post("http://localhost:2000/users/login",yl,{withCredentials:true})

 }
  
 subotp(y:any){
   console.log(y)
   let otp= y.otp.split(",").join('')
   console.log(otp)
   return this.http.post("http://localhost:2000/users/verifyotp",{otps:otp,mobile:y.mobile},{withCredentials:true}).pipe(tap((res:any)=>{

    localStorage.setItem("foodonfarmlogin",res.flag) //true
   }))
  
  }

  // logout(){

  //   localStorage.removeItem("foodonfarmlogin")
  //   window.location.href=""
  //   return this.http.get("http://localhost:2000/users/logout",{withCredentials:true})
   
  // }

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("foodonfarmlogin");
      window.location.href = "";
    }
    return this.http.get("http://localhost:2000/users/logout", { withCredentials: true });
  }

  
  acdetails(){

    return this.http.get("http://localhost:2000/users/acdetails",{withCredentials:true})
   
  }


}
