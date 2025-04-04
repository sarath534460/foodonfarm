import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WishlistService } from '../../wishlist.service';


@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css'
})
export class ProductCategoryComponent implements OnInit {
  allcategories: any;
  http: any;
  router: Router;
  categoryName: any;
  activatedroute: any;
  allproductbasedcat: any;
  a:any
  allwishlist: any;
  uo: any;
  wishlistservice: WishlistService;
  
    constructor(http:HttpClient,router:Router,activatedroute:ActivatedRoute,wishlistservice:WishlistService){
      this.wishlistservice=wishlistservice
      this.http=http
      this.router=router
      this.activatedroute=activatedroute

    } 
  

    
  ngOnInit(){
    this.http.get("http://localhost:2000/category/getcategories",{withCredentials:true}).subscribe((res:any)=>{
      this.allcategories=  res.message
    })
      
     
      this.activatedroute.paramMap.subscribe((params:any) => {
      this.categoryName = params.get('name');
      console.log('categoryname:', this.categoryName);
      this.getproductsbycateg()

    });

  }
 
  getproductsbycateg(){

    console.log(this.categoryName)
    this.http.get(`http://localhost:2000/products/getproducts/${this.categoryName}`,{withCredentials:true}).subscribe((res:any)=>{
      this.allproductbasedcat=res.message

    })

    this.wishlistservice.getwishlist().subscribe((res:any)=>{
      this.allwishlist= res.message

      console.log(this.allwishlist)
    })

  // this.uo= this.allcategories.filter((y:any)=>y.categoryname==this.categoryName)
   
  }

  imgclick(r:any,id:any){
    this.router.navigate(['/product',r,id]);
  }

  getLowestDiscount(weights: any[]) {
    return Math.min(...weights.map(w => w.discountprice));
  }

  // Get highest discount price
  getHighestDiscount(weights: any[]) {
    return Math.max(...weights.map(w => w.discountprice));
  }
  
 

  wishlisted(y:any){
     console.log("wishlist")
    this.wishlistservice.addtowishlist(y).subscribe((res:any)=>{

      if(res.message=="inserted"){
        this.allwishlist.push(y)
      }
      else{
        this.allwishlist=this.allwishlist.filter((item:any)=>item!==y)
      }

     },(err:any)=>{
      console.log(err)
     })
  }

  checkwishlist(y:any){
    console.log(y,"fromchecklisted")

    return this.allwishlist?.includes(y);
  
  }
}
