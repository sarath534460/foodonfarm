import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FooterComponent } from './footer/footer.component';
import { ContactusComponent } from './contactus/contactus.component';
import { OverseasComponent } from './overseas/overseas.component';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';
import { LogintimeInterceptor } from './logintime.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { AdminModule } from './admin/admin.module';
import { ShopModule } from './shop/shop.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutusComponent,
    FooterComponent,
    ContactusComponent,
    OverseasComponent,
    DashboardComponent,
    ProductComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    FormsModule,
   // AdminModule,
    ShopModule,
    ProductCategoryModule
     
  ],
  providers: [
    CookieService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: LogintimeInterceptor, multi: true } // Use the class-based interceptor here

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
