import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {

  id;
  list;
  username;
  data;
  reviews;
  responce;
  constructor(private router: Router, private aroute: ActivatedRoute,private productservice: ProductService,private http:HttpClient) { }

  ngOnInit(): void {
    this.aroute.paramMap.subscribe((params: ParamMap) => {
      this.id=params.get('id');
      console.log(this.id);
    });
    const details=JSON.parse(localStorage.getItem('token'));
    this.username=details.resp.name;
    this.productservice.getOneProductById(this.id)
    .subscribe((data) => {this.list=data; console.log(data);this.reviews=this.list.Review});
    console.log(this.list);
    
  }


  Post()
  {
    const review={
      Review: {
        Username: this.username,
        Review: this.data
      }
    }
    this.productservice.pushReview(this.id,review)
    .subscribe((data) => {this.responce=data;this.reviews=this.responce.Review});
  }

  getReview()
  {
    this.productservice.getReviews()
    .subscribe((data) => {this.reviews=data; console.log(data)});
  }
  // onPost(review:string){
  //   // this.web.putRev('/home/Sweet Magic',this.tes).subscribe((res)=>{console.log(res)})
  //   console.log('in onpost')
  //   console.log(review);
  //   this.rev.Review=review;
  
    
  //   this.http.put(`http://localhost:3000/home/${this.List.Name}`,this.rev).subscribe((res)=>console.log(res));
  
  // }
  onPost(){

  }
}
