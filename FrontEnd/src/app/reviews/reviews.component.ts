import { ProductService } from './../product.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
// @Input 
  @Input() public List;
  data;
  username;
  views: any=[];
  responce;
  constructor(private p:ProductService) { }

  ngOnInit(): void {
    const details=JSON.parse(localStorage.getItem('token'));
    this.username=details.resp.name;
    this.views=this.List.Review;

  }

  Post()
  {
    const review={
      Review: {
        Username: this.username,
        Review: this.data
      }
    }
    this.p.pushReview(this.List._id,review)
    .subscribe((data) => {this.responce=data;this.views=this.responce.Review});
  }

}
