import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public user;
  public username;
  public email;
  public mobile;
  public which;
  public address;
  public disableemail=true;
  public disablemobile=true;
  public responce;
  productdata;
  data;
  proname;
  constructor(private router: Router, private product: ProductService,private aroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.aroute.paramMap.subscribe((params: ParamMap) => {
      this.proname=params.get('name');
    });
    console.log(this.proname);
    this.product.getOneProduct(this.proname)
    .subscribe((data) => {
      this.productdata=data[0];
      console.log(data);
      this.Next();
    })
  }

  Next()
  {
    const details=JSON.parse(localStorage.getItem('token'));
    this.user=details.resp;
    this.username=this.user.name;
    this.email=this.user.email;
    this.mobile=this.user.mobile;
    this.address=this.user.address;
    if(this.productdata.length==0)
    {
      this.router.navigate(['/']);
    }
  }

  editemail()
  {
    this.disableemail=false;
  }

  editmobile()
  {
    this.disablemobile=false;
  }


  Submit()
  {
    const object = {
      orderplaced: {
        position: this.productdata.position,
        name: this.productdata.name,
        price: this.productdata.price
      }
    }
    console.log(object);
    this.product.updateUser(this.user._id,object)
    .subscribe((data) => {console.log(data);this.responce=data;this.product.updateLocalUser(this.responce.resp);this.router.navigate(['/confirm']);},(err) =>{ console.log(err);this.Error()});
  }

  Cancel()
  {
    this.router.navigate(['/']);
  }

  Error()
  {
    alert('something went wrong!');
  }

}
