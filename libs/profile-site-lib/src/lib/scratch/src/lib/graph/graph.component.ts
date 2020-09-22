import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
  OnDestroy,
} from '@angular/core';
import * as d3 from 'd3';
import { wrapD3Text } from './../../../../../../../../apps/profile-site/src/app/+state/app.constants';
import { ResizeService } from '@mono/shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'profile-site-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements AfterViewInit, OnInit, OnDestroy {
  @Input() weatherData;
  @Input() title;
  resizeSubscription$: Subscription;
  private svg;
  private margin = 40;
  @ViewChild('canvas') private chartContainer: ElementRef;

  formatData = (data) => {
    return data.map((datum) => {
      const splitDate = datum.dt.split(' ');
      const singleLetterDayLabel = splitDate[0].split('')[0];
      const dayOfTheMonth = splitDate[1].split('/')[1];
      return {
        ...datum,
        dt: `${singleLetterDayLabel} - ${dayOfTheMonth}`,
      };
    });
  };

  drawGraph = (
    data: any,
    windowWidth: number
  ) => {
    const fontSize = windowWidth < 600 ? '7px' : '9px';
    const element = this.chartContainer.nativeElement;
    const contentWidth = element.offsetWidth - this.margin * 2;
    const contentHeight = element.offsetHeight - this.margin * 2;
    let formattedData = data;

    if (windowWidth < 600) {
      formattedData = this.formatData(data);
    }

    console.log(formattedData);

    d3.select('svg').remove();

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
      .domain(formattedData.map((day) => day.dt))
      .range([0, contentWidth])
      .padding(0.2);

    graph
      .append('g')
      .attr('transform', `translate(0, ${contentHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('.tick text')
      .attr('font-size', fontSize)
      .call(wrapD3Text, x.bandwidth(), d3);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(formattedData, (d) => d.humidity)])
      .range([contentHeight, 0]);

    graph.append('g').call(d3.axisLeft(y).tickFormat((d) => d + '%'));

    graph
      .selectAll('rect')
      .data(formattedData)
      .enter()
      .append('rect')
      .attr('width', x.bandwidth)
      .attr('height', 0)
      .attr('fill', 'blue')
      .attr('x', (d) => x(d.dt))
      .attr('y', contentHeight)
      .transition()
      .duration(500)
      .attr('y', (d) => y(d.humidity))
      .attr('height', (d) => contentHeight - y(d.humidity));
  };

  constructor(private resizeService: ResizeService) {}

  ngOnInit(): void {
    this.resizeSubscription$ = this.resizeService.$resize.subscribe(
      (windowWidth) => {
        // redraw graph on window width change
        this.drawGraph(this.weatherData, windowWidth);
      }
    );
  }

  ngAfterViewInit(): void {
    if (!this.weatherData) {
      return;
    }
    // grab initial window width
    this.drawGraph(this.weatherData, window.innerWidth);
  }

  ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe();
  }
}
