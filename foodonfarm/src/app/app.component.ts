import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { NavigationStart, Router } from '@angular/router';
import { CartComponent } from './cart/cart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'foodonfarm';
  showdiv: boolean = false; // Initialize properly
  status: boolean = false;  // Store authentication status
  auth:AuthService
  http: HttpClient;
  routerSubscription: any;
  showHeaderAndFooter: boolean | undefined;
  @ViewChild(CartComponent) cartComponent!: CartComponent;
   
  constructor( auth: AuthService,http:HttpClient,private router: Router) {

    this.auth=auth
    this.http=http
  }

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Check if the route is the one you want to hide the header/footer for
        if (event.url === '/admin') {  // Change '/some-path' to your desired route
          this.showHeaderAndFooter = false;
        } else {
          this.showHeaderAndFooter = true;
        }
      }
    });


  }

  msle() {
    setTimeout(() => {
      this.showdiv = false;
    }, 2000);
  }

  show() {
    this.showdiv = true;
  }

  logout() {
     this.auth.logout().subscribe((res:any)=>{
      console.log(res.message)
      alert(res.message)
     }),(err:any)=>{
      console.log(err)
     }
    
  }

  opencart(){
    this.cartComponent.activate()
  }
  // testing(){
 
  // this.http.post('http://localhost:2000/users/test',{mes:"rama"},{withCredentials:true}).subscribe((res)=>{
  //  console.log(res)
  // },(err)=>{console.log(err)})
  // }
}
