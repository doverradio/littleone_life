import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './styles.css';

const PieChartMysteries = ({ data }) => {
    const ref = useRef();

    useEffect(() => {
        drawChart(); // Initial draw

        const handleResize = () => {
            drawChart(); // Redraw on resize
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [data]); // Dependencies

    const drawChart = () => {
        const isMobile = window.innerWidth < 600; // Example breakpoint at 600px

        // Get the width of the container or window width for responsiveness
        const containerWidth = ref.current.clientWidth || window.innerWidth;

        // Set dynamic dimensions and font size
        const width = isMobile ? 200 : 360;
        const height = width; // Keep the pie chart square
        const radius = width / 2;
        const fontSize = width / 20; // Smaller font size for smaller width

        // Clear previous content
        d3.select(ref.current).html('');

        // Calculate total for percentage calculation
        const total = d3.sum(data.datasets[0].data);

        // Create container for SVG and legend
        const container = d3.select(ref.current)
            .append('div')
            .style('display', 'flex')
            .style('align-items', 'center')
            .style('justify-content', 'space-around'); // This will space out the items more evenly

        // Create an SVG container for the pie chart
        const svg = container.append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('background', 'white')
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        // Define a mapping of mysteries to specific colors
        const mysteryColors = {
            'Luminous': '#36A2EB', // Blue
            'Sorrowful': '#FF6384', // Pink
            'Glorious': '#FFCE56', // Yellow
            'Joyful': '#4BC0C0'    // Green
        };
        
        // Create a color scale using the mapping
        const colorScale = d3.scaleOrdinal()
            .domain(data.labels) // Use the labels
            .range(data.datasets[0].backgroundColor); // Use the background colors

        // Create legend container
        const legendContainer = container.append('div')
            .attr('class', 'legend-container')
            .style('display', 'flex')
            .style('flex-direction', 'column') // Align items in a column
            .style('justify-content', 'flex-start') // Start alignment from the top
            .style('align-items', 'flex-start') // Align items to the start (left alignment)
            .style('padding-left', '20px'); // Add some padding

        // Create legend items
        const legendItems = legendContainer.selectAll('.legend-item')
            .data(data.labels)
            .enter()
            .append('div')
            .attr('class', 'legend-item')
            .style('display', 'flex')
            .style('align-items', 'center')
            .style('margin-right', '10px'); // Spacing between legend items

        // Append colored squares to legend items
        const legendRectSize = 20; // Size of the colored squares in the legend

        legendItems.append('span')
            .style('background-color', d => colorScale(d))
            .style('width', `${legendRectSize}px`)
            .style('height', `${legendRectSize}px`)
            .style('display', 'inline-block')
            .style('margin-right', '5px');

        // Append text labels to legend items
        legendItems.append('span')
            .text(d => d);

        // Interaction for legend items
        legendItems
            .on('mouseover', d => highlightSlice(d, true))
            .on('mouseout', d => highlightSlice(d, false))
            .on('click', d => highlightSlice(d, true));

        // Define the highlight function
        const highlightSlice = (label, highlight) => {
            svg.selectAll('path')
                .filter(d => d.data.label === label)
                .attr('stroke', highlight ? 'black' : 'white')
                .attr('stroke-width', highlight ? '3px' : '2px');
        };

        // Generate the pie and arcs
        const pieGenerator = d3.pie().value((d, i) => data.datasets[0].data[i])(data.labels);
        const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
        const arcs = svg.selectAll('.arc')
            .data(pieGenerator)
            .enter()
            .append('g')
            .attr('class', 'arc');

        // Append path elements for each arc slice
        arcs.append('path')
            .attr('d', arcGenerator)
            .attr('fill', d => colorScale(d.data))
            .attr('stroke', 'white') // Add a white border for each slice
            .attr('stroke-width', '2px');

        // Append text labels for each arc slice
        arcs.append('text')
            .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
            .attr('text-anchor', 'middle')
            .style('fill', 'white')
            .style('font-size', `${fontSize}px`)
            .text(d => `${(data.datasets[0].data[d.index] / total * 100).toFixed(1)}%`);

        // Optionally, you can add a border effect on mouseover
        arcs.on('mouseover', function(event, d) {
            d3.select(this).select('path')
            .attr('stroke', 'black') // Example: add a black border on mouseover
            .attr('stroke-width', '3px');
        })
        .on('mouseout', function(event, d) {
            d3.select(this).select('path')
            .attr('stroke', 'white')
            .attr('stroke-width', '2px');
        });

        arcs.append('title').text(d => `${d.data}: ${data.datasets[0].data[d.index]} (${(data.datasets[0].data[d.index] / total * 100).toFixed(1)}%)`);
    };

    return <div ref={ref} className="pie-chart-container"></div>;
};

export default PieChartMysteries;
