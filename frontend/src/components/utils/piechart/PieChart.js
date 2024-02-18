import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './styles.css'

const PieChart = ({ data, colorMapping, width: initialWidth = 360, height: initialHeight = 360 }) => {
  const ref = useRef();

  useEffect(() => {
    drawChart();

    const handleResize = () => {
        drawChart();
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, [data]);

  const drawChart = () => {
    const isMobile = window.innerWidth < 600;
    const containerWidth = ref.current.clientWidth || window.innerWidth;
    const width = isMobile ? containerWidth * 0.8 : initialWidth;
    const height = isMobile ? containerWidth * 0.8 : initialHeight;
    const radius = Math.min(width, height) / 2;
    const fontSize = width / 20;

    d3.select(ref.current).html('');
    const total = d3.sum(data.map(d => d.value));

    const container = d3.select(ref.current)
        .append('div')
        .attr('class', 'chart-container')
        .style('display', 'flex')
        .style('justify-content', 'center')
        .style('align-items', 'center')
        .style('flex-direction', isMobile ? 'column' : 'row');

    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background', 'white')
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const colorScale = d3.scaleOrdinal()
        .domain(data.map(d => d.label))
        .range(colorMapping || d3.schemeCategory10);

    const legendContainer = container.append('div')
        .attr('class', 'legend-container')
        .style('display', 'flex')
        .style('flex-direction', 'column')
        .style('justify-content', 'flex-start')
        .style('align-items', 'flex-start')
        .style('padding-left', '20px');

    const legendItems = legendContainer.selectAll('.legend-item')
        .data(data)
        .enter()
        .append('div')
        .attr('class', 'legend-item')
        .style('display', 'flex')
        .style('align-items', 'center')
        .style('margin-right', '10px');

    const legendRectSize = 20;

    legendItems.append('span')
        .style('background-color', d => colorScale(d.label))
        .style('width', `${legendRectSize}px`)
        .style('height', `${legendRectSize}px`)
        .style('display', 'inline-block')
        .style('margin-right', '5px');

    legendItems.append('span')
        .text(d => d.label);

    const pieGenerator = d3.pie().value(d => d.value)(data);
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
    const arcs = svg.selectAll('.arc')
        .data(pieGenerator)
        .enter()
        .append('g')
        .attr('class', 'arc');

    arcs.append('path')
        .attr('d', arcGenerator)
        .attr('fill', d => colorScale(d.data.label))
        .attr('stroke', 'white')
        .attr('stroke-width', '2px');

    arcs.append('text')
        .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .style('fill', 'white')
        .style('font-size', `${fontSize}px`)
        .text(d => `${(d.data.value / total * 100).toFixed(1)}%`);

    arcs.on('mouseover', function(event, d) {
        d3.select(this).select('path')
        .attr('stroke', 'black')
        .attr('stroke-width', '3px');
    })
    .on('mouseout', function(event, d) {
        d3.select(this).select('path')
        .attr('stroke', 'white')
        .attr('stroke-width', '2px');
    });

    arcs.append('title').text(d => `${d.data.label}: ${d.data.value} (${(d.data.value / total * 100).toFixed(1)}%)`);
  };

  return <div ref={ref} className="pie-chart-container"></div>;
};

export default PieChart;
