import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  http: HttpClient;

  constructor(http:HttpClient) { 

    this.http=http
  }


  addtowishlist(y:any){

   return this.http.post('http://localhost:2000/wishlist/adddeleteproductwishlist',{id:y},{withCredentials:true})


  }
  
  getwishlist(){
  return this.http.get("http://localhost:2000/wishlist/getproductss",{withCredentials:true})
  }
}
