import { Renderable } from '../renderable/Renderable';
import { TextNumber } from '../textNumber/TextNumber';
import * as d3 from 'd3';

import template from './gauge.html';
import styles from './gauge.css';

const width = 187.5;
const height = 187.5;
const barWidth = 7.5;
const crosshairPadding = 2;
const crosshairWidth = 3;
const radius = Math.min(width, height) / 2;
const fullCircle = 2 * Math.PI;

function renderGaugeGraph(svg, model) {
  const valueSum = model.primary.value + model.secondary.value;
  const secondaryValueRatio = model.secondary.value / valueSum;
  const arc = d3.arc()
    .innerRadius(radius - barWidth)
    .outerRadius(radius)
    .startAngle(0);
  
  svg.selectAll('.value')
    .data([1, secondaryValueRatio]).enter()
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`)
    .append('path')
    .datum((d, i) => {
      return {
        endAngle: d * fullCircle
      };
    })
    .style('fill', (d, i) => i === 0 ? model.primary.color : model.secondary.color)
    .attr('class', 'value')
    .attr('d', arc);
  
  svg.selectAll('.graph-line')
    .data([0, 90]).enter()
    .append('g')
    .append('line')
    .attr('x1', width / 2)
    .attr('x2', width / 2)
    .attr('y1', 0 + barWidth + crosshairPadding)
    .attr('y2', height - barWidth - crosshairPadding)
    .attr('stroke', '#ccc')
    .attr('stroke-width', crosshairWidth)
    .attr('transform', (d, i) => {
      return `rotate(${d} ${width / 2} ${height / 2})`;
    });
};

function renderInnerGraph(svg, model) {
  const backgroundRadius = radius - barWidth - crosshairPadding - crosshairWidth;
  const maskRadius = backgroundRadius - crosshairPadding;
        
  const arc = d3.arc()
    .innerRadius(0)
    .startAngle(0)
    .endAngle(fullCircle);
  
  svg.append('path')
    .attr('transform', `translate(${width / 2},${height / 2})`)
    .attr('fill', '#fff')
    .datum(d => {
      return {
        outerRadius: backgroundRadius
      };
    })
    .attr('d', arc);
  
  const graphColor = d3.color(model.primary.color);
  graphColor.opacity = 0.5;
  
  const clipPath = svg.append('clipPath')
    .attr('id', 'inner-graph-clip')
    .append('path')
    .attr('transform', `translate(${width / 2},-${height / 2})`)
    .datum(d => {
      return {
        outerRadius: maskRadius
      };
    })
    .attr('d', arc);
  
  const x = d3.scaleLinear().range([0, width / 10]);
  const y = d3.scaleLinear().range([height / 20, 0]);
  const line = d3.line()
    .x((d, i) => {
      return x(i);
    })
    .y((d, i) => {
      return y(d);
    });
  
  let lineChartData = model.pushHistory.slice(-10);
  const lineChart = svg.append('g').append('path'); 
  const trimLineChartData = (data) => {
    return [0].concat(data.concat(0));
  };
  
  lineChart.attr('transform', `translate(0,${height})`)
    .attr('clip-path', 'url(#inner-graph-clip)')
    .data([trimLineChartData(lineChartData)])
    .style('stroke-width', 2)
    .style('stroke', model.primary.color)
    .style('fill', graphColor)
    .style('opacity', '.35')
    .attr('class', 'line')
    .attr('d', line);
  
  d3.interval(() => {
    lineChartData = model.pushHistory.slice(-10);

    lineChart
      .data([trimLineChartData(lineChartData.concat(0))])
      .transition(1500)
      .attr('class', 'line')
      .attr('d', line);
  }, 1500);
};

export function Gauge({ parent, id, model }) {
  const valueSum = model.primary.value + model.secondary.value;
  const primaryRatio = ~~(model.primary.value / valueSum * 100);
  const secondaryRatio = 100 - primaryRatio;
  const enrichedModel = Object.assign({}, model, {
    primaryRatio,
    secondaryRatio,
    valueSum: TextNumber(valueSum),
    valueSumUnit: model.primary.valueUnit || model.secondary.valueUnit,
    primary: Object.assign({}, model.primary, {
      value: TextNumber(model.primary.value)
    }),
    secondary: Object.assign({}, model.secondary, {
      value: TextNumber(model.secondary.value)
    }),
  });
  const elementDom = Renderable({ 
    parent, 
    id, 
    template, 
    model: enrichedModel 
  });
  
  const labelPrimary = elementDom.querySelector('.gauge-inner__primary .gauge-inner__label');
  const labelSecondary = elementDom.querySelector('.gauge-inner__secondary .gauge-inner__label');
  labelPrimary.style.color = model.primary.color;
  labelSecondary.style.color = model.secondary.color;
  
  const svg = d3.select(`#${id} .gauge-graph`)
    .append('svg')
    .attr('width', width)
    .attr('height', height);
  
  renderGaugeGraph(svg, model);
  renderInnerGraph(svg, model);
};
