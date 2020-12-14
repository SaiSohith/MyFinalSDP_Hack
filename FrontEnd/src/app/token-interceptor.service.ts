import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { ProductService } from './product.service';
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector){}
  intercept(req, next) {
    let productservice = this.injector.get(ProductService)
    let tokenizedReq = req.clone(
      {
        headers: req.headers.set('Authorization', 'bearer ' + productservice.getToken())
      }
    )
    return next.handle(tokenizedReq)
  }

}