import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  OnChanges,
} from '@angular/core';
import * as d3 from 'd3';
import {
  formatData,
  wrapD3Text,
  niceDomain
} from 'apps/profile-site/src/app/+state/app.constants';

@Component({
  selector: 'profile-site-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss'],
})
export class LineGraphComponent implements OnChanges, AfterViewInit {
  @ViewChild('lgCanvas') private chartContainer: ElementRef;
  @Input() weatherData;
  @Input() windowWidth;
  @Input() title;
  private svg;
  private margin = 40;



  drawGraph = (data, windowWidth) => {
    const fontSize = windowWidth < 600 ? '7px' : '9px';
    const element = this.chartContainer.nativeElement;
    const contentWidth = element.offsetWidth - this.margin * 2;
    const contentHeight = element.offsetHeight - this.margin * 2;
    let formattedData = data;
    if (windowWidth < 600) {
      formattedData = formatData(data);
    }

    d3.select('#lgCanvas svg').remove();

    this.svg = d3
      .select(element)
      .append('svg')
      .attr('width', element.offsetWidth + this.margin * 2)
      .attr('height', element.offsetHeight + this.margin * 2);

    const graph = this.svg
      .append('g')
      .attr('width', contentWidth)
      .attr('height', contentHeight)
      .attr('transform', `translate(${this.margin}, ${this.margin})`);

    const x = d3
      .scaleBand()
      .domain(data.map((day) => day.dt))
      .range([0, contentWidth])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(niceDomain(data.map(d => d.temp.day))))
      .range([contentHeight, 0]);

    // axis groups

    graph
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${contentHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('.tick text')
      .attr('font-size', fontSize)
      .call(wrapD3Text, x.bandwidth(), d3);

    graph
      .append('g')
      .call(
        d3
          .axisLeft(y)
          .ticks(niceDomain(data.map(d => d.temp.day)).length)
          .tickFormat((d) => d + 'deg')
      )
      .attr('class', 'y-axis');
    // set scale domains

    // create axis
  };

  ngOnChanges(): void {
    if (this.windowWidth) {
      this.drawGraph(this.weatherData, this.windowWidth);
    }
  }

  ngAfterViewInit(): void {
    if (!this.weatherData) {
      return;
    }
    // grab initial window width
    this.drawGraph(this.weatherData, window.innerWidth);
  }

  constructor() {}
}
