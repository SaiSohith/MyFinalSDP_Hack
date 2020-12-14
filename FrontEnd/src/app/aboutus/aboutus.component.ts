import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  devs=[
    { name:"SAI SOHITH AYINAMPUDI",
          info:"Project Member",
          contact:"999999999999"
         },
   {
      name:"VOONNA CHAITANYA",
      info:"Project Lead",
      contact:"99999999999"
    },
      {
        name:"Kalisetti Dheeraj Babu",
        info:"Project Member",
        contact:"99999999999"
      }
   ]
  constructor() { }

  ngOnInit(): void {
  }

}
