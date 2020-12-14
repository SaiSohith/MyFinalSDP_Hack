import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../product.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public contracts ;
  public store = [];
  public arr: Product;
  public user;
  public data;
  public err;
  public responce;
  public cart;
  constructor(private product: ProductService, private router: Router,public dialog: MatDialog) { }


  ngOnInit(): void {
    const details = JSON.parse(localStorage.getItem('token'));
    this.user=details.resp;
    this.cart=this.user.cart;
    this.GetAll();
    console.log('äfter getalll')
  }
  addToCart(pro) {
  var cart=this.user.cart;
  cart.push(pro);
  const userabc = {
    id: this.user._id,
    cart: {
      position: pro.position,
      name: pro.name,
      price: pro.price
    }
  }
  this.product.pushToCart(userabc)
  .subscribe((details) => {this.responce=details;this.product.updateLocalUser(this.responce.resp)}, (err) => { 
    if(err instanceof HttpErrorResponse)
    {
      if(err.status==401)
      {
        this.router.navigate(['/login']);
      }
    }
  });
  }

  Search()
  {
    if(this.data==null)
    {
      this.GetAll();
    }
    else
    {
      this.product.getOneProduct(this.data)
      .subscribe((details) => {this.contracts=details;console.log(details)}, (err) => { 
        this.err=err;
      });
    }
  }
  GetAll()
  {
    this.data="";
    this.product.getProduct()
    .subscribe((details) => { this.contracts=details; console.log(details)}, (err) => {console.log(err)});
  }

  Order(pro)
  {
    // this.remove(pro);
    // const object = {
    //   id:this.user._id,
    //   order: {
    //     position: pro.position,
    //     name: pro.name,
    //     price: pro.price
    //   }
    // }
    // console.log(object);
    // this.product.updateOrder(object)
    // .subscribe((data) => {this.responce=data;console.log(data); this.product.updateLocalUser(this.responce.resp);this.router.navigate(['/order']);});
    this.router.navigate([`/order/${pro.name}`]);
  }

  remove(k) {
    this.cart=this.cart.filter(x => x._id != k._id);
    const a = k.price;
    const abc= {
      cart: this.cart
    }
    this.product.updateUser(this.user._id,abc)
    .subscribe((data) => {this.responce=data;this.err=null;this.product.updateLocalUser(this.responce.resp);},(errr)=> { this.err=errr;this.user=null});
  }

  Details(id)
  {
    this.router.navigate([`/viewdetails/${id}`]);
  }
}
