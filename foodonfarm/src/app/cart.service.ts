import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CartService implements OnInit{
  http: HttpClient;
  cartItems: any[ ] = [ ];
  getcarts: any


  constructor(http:HttpClient){
   this.http=http
  }

  ngOnInit() {
   

   
  }


  

  addtocart(product:any){
    console.log(product)
    return this.http.post("http://localhost:2000/carts/insertcart",{product:product},{withCredentials:true})
  }


  inc(y:any){
    console.log(y)
    return  this.http.post("http://localhost:2000/carts/inc",{product:y},{withCredentials:true})
  }

  desc(y:any){
    return  this.http.post("http://localhost:2000/carts/desc",{product:y},{withCredentials:true})
  }

}
