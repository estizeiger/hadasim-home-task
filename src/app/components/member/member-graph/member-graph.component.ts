import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-member-graph',
  templateUrl: './member-graph.component.html',
  styleUrls: ['./member-graph.component.css']
})
export class MemberGraphComponent implements OnInit {
  @Input() memberCountsByYear: any;
  years : number[];

  constructor() { }

  ngOnInit(): void {
    if (this.memberCountsByYear) {
      debugger;
      this.renderGraph();
    }
  }

  renderGraph(): void {
    const years = Object.keys(this.memberCountsByYear).map(year => parseInt(year));
    const memberCounts = Object.values(this.memberCountsByYear);
    const data = memberCounts.map((count, index) => ({
      x: years[index],
      y: count
    }));
    const ctx = document.getElementById('memberGraph') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: years.map(year => year.toString()),
        datasets: [{
          label: 'Members with Positive Result',
          data: data,
          borderColor: 'rgb(237, 56, 108)',
          backgroundColor: 'rgba(237, 56, 108, 0.2)',
          borderWidth: 1,
          fill: true
        }]
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            display: true,
            title: {
              display: true,
              text: 'Year'
            },
            ticks: {
              stepSize: 1,
              precision: 0
            }
          },
          y: {
            beginAtZero: true,
            type: 'linear',
            display: true,
            title: {
              display: true,
              text: 'Number of Members'
            },
            suggestedMin: 0,
            ticks: {
              stepSize: 1,
              precision: 0
            }
          }
        }
      }
    });
  }
}
