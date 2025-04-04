import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishlistService } from '../wishlist.service';
import { CartService } from '../cart.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  @ViewChild(CartComponent) cartComponent!: CartComponent;

  product: any
  productname: any;
  id: any;
  http: HttpClient;
  activatedroute: ActivatedRoute;
  allwishlist: any;
  wishlistservice: WishlistService;
  selectedWeight: number | undefined;
  actweight: any;
  quantity: number=1;
  cartservice: CartService;


   constructor(http:HttpClient,activatedroute:ActivatedRoute,wishlistservice:WishlistService,cartservice:CartService,private cd: ChangeDetectorRef){
     this.http=http
     this.activatedroute=activatedroute
     this.wishlistservice=wishlistservice
     this.cartservice=cartservice
   }

  
  
  ngOnInit() {
  
    this.activatedroute.paramMap.subscribe((params:any) => {
    this.productname = params.get('productname');
    this.id = params.get('id');

    this.http.get(`http://localhost:2000/products/getproductbyid/${this.id}`,{withCredentials:true}).subscribe((res:any)=>{
      this.product=  res.message

      console.log('productname:',res.message);


     })



   });


   this.wishlistservice.getwishlist().subscribe((res:any)=>{
    this.allwishlist= res.message

    console.log(this.allwishlist)
   })


  }

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     if (this.cartComponent) {
  //       this.cartComponent.names = "Updated Name";
  //       this.cd.detectChanges();
  //     } else {
  //       console.error("CartComponent still not initialized");
  //     }
  //   }, 500);
  // }
  
  


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


// Get lowest discount price (handles undefined or empty arrays)
getLowestDiscount(weights: any[] | undefined): any {
  if (!weights || weights.length === 0) return 0; // Return 0 if no weights exist
  return Math.min(...weights.map((w: any) => w.discountprice || 0)); // Ensure discountprice exists
}

// Get highest discount price (handles undefined or empty arrays)
getHighestDiscount(weights: any[] | undefined): any {
  if (!weights || weights.length === 0) return 0; // Return 0 if no weights exist
  return Math.max(...weights.map((w: any) => w.discountprice ||0));
}



selectWeight(weight: number) {
  this.selectedWeight = weight;

  this. actweight=this.product.weights.filter((sel:any)=>sel.weight==weight)

  console.log(this.actweight)
}



addtobasketcolor(){
  if(this.selectedWeight){
    
    this.product.selectedweight=this.actweight[0]
    this.product.quantity=this.quantity
    console.log(this.product)
    this.cartservice.addtocart(this.product).subscribe(i=>{

    })
    console.log(this.product)
    
    if (this.cartComponent) {
      this.cartComponent.activate(); // Open Cart
    //  this.cd.detectChanges(); // Force update
    this.cartComponent. getcar()

    } else {
      console.error("CartComponent is not initialized yet.");
    } // Call child method
   
  }
  else{
    alert("please select products weight ")
    return  
  }

}

increase() {
  this.quantity++;
}

decrease() {
  if (this.quantity > 1) {
    this.quantity--;
  }
}


}
