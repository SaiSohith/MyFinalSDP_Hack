import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Statistics Of Website Traffic"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: 71, label: "Mon" },
          { y: 55, label: "Tue" },
          { y: 50, label: "Wed" },
          { y: 65, label: "Thu" },
          { y: 95, label: "Fri" },
          { y: 68, label: "Sat" },
          { y: 28, label: "Sun" }
        ]
      }]
    });
      
    chart.render();
  }

}
