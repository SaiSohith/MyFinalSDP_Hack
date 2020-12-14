import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private product: ProductService){}
  canActivate() : boolean
  {
    if(this.product.loggedin())
    {
      return true;
    }
    else
    {
      this.router.navigate(['/login']);
      return false;
    }
  }
    
}
