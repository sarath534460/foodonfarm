import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  http: HttpClient;
  allcategories: any;
  a:any
  data:any
  router: Router;

  constructor(http:HttpClient,router:Router){
    this.http=http
    this.router=router
  }

  ngOnInit(){
      this.http.get("http://localhost:2000/category/getcategories",{withCredentials:true}).subscribe((res:any)=>{
        this.allcategories=  res.message
      })
  }



  imgclick(u: any) {
    console.log(u);
    this.router.navigate(['/product-category',u]); // Corrected route
  }
  
}
