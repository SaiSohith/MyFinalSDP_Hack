import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public user;
  public username;
  public email;
  public mobile;
  public which;
  public address;
  public password;
  public disableemail=true;
  public disablemobile=true;
  public newpass;
  public disablepassword=true;
  public newpassword;
  public responce;
  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    const details=JSON.parse(localStorage.getItem('token'));
    this.user=details.resp;
    this.username=this.user.name;
    this.email=this.user.email;
    this.password=this.user.password;
    this.mobile=this.user.mobile;

  }

  editemail()
  {
    this.disableemail=false;
  }

  editmobile()
  {
    this.disablemobile=false;
  }

  onBlurMethod()
  {
    if(this.newpass==this.password)
    {
      this.disablepassword=false;
    }
  }

  Submit()
  {
    if(this.newpass==this.password)
    {
      this.password=this.newpassword;
    }
    const object = {
      name: this.username,
      email: this.email,
      mobile: this.mobile,
      address: this.address,
      password: this.password,
      cart: this.user.cart
    }

    this.product.updateUser(this.user._id,object)
    .subscribe((data) => {console.log(data);this.responce=data;this.product.updateLocalUser(this.responce.resp);this.router.navigate(['/']);},(err) =>{ console.log(err);this.Error()});
  }

  Error()
  {
    alert('something went wrong!');
  }

}
