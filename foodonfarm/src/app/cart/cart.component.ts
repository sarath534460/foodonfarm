import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit  {
  cartservice: CartService;
  getcarts: any;
  http: any;
  names:string="sarath"
  nas:string="rath"
  cartItems: any;
  cd: ChangeDetectorRef;

  constructor(private renderer: Renderer2,cartservice:CartService,http:HttpClient,cd:ChangeDetectorRef) {
   this. cartservice=cartservice
   this.http=http
   this.cd=cd
  }

  ngOnInit(){
      console.log("cartworks")
  }

  open: boolean = false; // Initially hidden

  activate() {
    console.log("Cart Activated");
    this.open = true; // Open the cart
    this.renderer.addClass(document.body, 'blur-background'); // Add blur effect
      

  }

  getcar(){
    this.http.get("http://localhost:2000/carts/getcarts",{withCredentials:true}).subscribe((res:any)=>{
      
     this.cartItems=res.message

     })

  }

  // desc(y:any){
  //   this.cartservice.desc(y).subscribe((res:any)=>{
  //     this.getcar()

  //     ////this.cd.detectChanges(); 
  //   })
  // }

  // inc(y:any){
  //   this.cartservice.inc(y).subscribe((res:any)=>{
     
  //     this.getcar()

  //    // this.cd.detectChanges(); 
  //     })
    

  // }


  desc(y: any) {
   // y.quantity--; // Optimistically update UI
    this.cartservice.desc(y).subscribe((res: any) => {
      //this.cartItems = res.cart; // Update UI with fresh data
      //this.cartItems=res.cart

      this.cd.detectChanges(); 

    }, () => {
      //y.quantity++; // Revert on failure
    });
  }
  
  inc(y: any) {
   // y.quantity++; // Optimistically update UI
    this.cartservice.inc(y).subscribe((res: any) => {
      //this.cartItems = res.cart; // Update UI with fresh data
      //this.getcar()
    }, () => {
      //y.quantity--; // Revert on failure
    });
  }
  
  

  closeCart() {
    this.open = false;
    this.renderer.removeClass(document.body, 'blur-background'); // Remove blur effect
  }

}
