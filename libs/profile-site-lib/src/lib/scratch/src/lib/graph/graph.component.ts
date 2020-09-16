import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'profile-site-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  @Input() weatherData$;
  private svg;
  private margin = 40;
  private width = 600 - this.margin * 2;
  private height = 600 - this.margin * 2;

  createSvg = () => {
    this.svg = d3
      .select('#canvas')
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2);
  };

  drawGraph = (data: any) => {
    const graph = this.svg
      .append('g')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('transform', `translate(${this.margin}, ${this.margin})`);
    const x = d3
      .scaleBand()
      .domain(data.map((day) => day.dt))
      .range([0, this.width])
      .padding(0.2);

    graph
      .append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(x));

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.temp.day)])
      .range([this.height, 0]);

    graph.append('g').call(d3.axisLeft(y));

    graph
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('width', x.bandwidth)
      .attr('height', 0)
      .attr('fill', 'blue')
      .attr('x', (d) => x(d.dt))
      .attr('y', this.height)
      .transition()
      .duration(500)
      .attr('y', (d) => y(d.temp.day))
      .attr('height', (d) => this.height - y(d.temp.day));
  };

  constructor() {}

  ngOnInit(): void {
    this.createSvg();
    this.weatherData$.subscribe(data => {
      this.drawGraph(data);
    });
  }
}
