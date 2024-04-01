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
    const years = [2020, 2021, 2022, 2023, 2024]; // corona years
    const ctx = document.getElementById('memberGraph') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: years.map(year => year.toString()),
        datasets: [{
          label: 'Members with Positive Result',
          data: this.memberCountsByYear,
          backgroundColor: ' rgb(228, 231, 249)',
          borderColor: ' rgb(233, 30, 99)',
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            suggestedMin: 0,
            ticks: {
              stepSize: 1, // Ensure only integer values are displayed
              precision: 0 // Display only integer values
            }
          }
        }
      }
    });
  }
}
