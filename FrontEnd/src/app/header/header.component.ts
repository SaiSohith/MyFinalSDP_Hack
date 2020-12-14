import { Component, OnInit } from '@angular/core';
import { ProductService } from '.././product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public abc=false;
  public admin=false;
  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    const details=JSON.parse(localStorage.getItem('token'));
    this.product.user=details.resp;
    if(this.product.user==null)
    {
      this.abc=false;
    }
    else
    {
      this.abc=true;
    }
    if(details.resp.email=="test1@gmail.com")
    {
      this.admin=true;
    }
  }

  logout()
  {
    this.product.user=null;
    this.product.logoutUser();
    this.router.navigate(['/login']);
  }


}
