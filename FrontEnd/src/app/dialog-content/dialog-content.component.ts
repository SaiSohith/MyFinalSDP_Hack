import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponent implements OnInit {

  public productdata=[];
  user;
  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    const details = JSON.parse(localStorage.getItem('token'));
    this.user=details.resp;
    this.productdata = this.user.orderplaced;
  }

}
