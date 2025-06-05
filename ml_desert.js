// Animated desert sun and D3.js visualizations for ML projects

// --- Animated Sun ---
const canvas = document.getElementById('desert-sun');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener('resize', resizeCanvas);

// Sun movement: circular/oval path, slow
let t = 0;
function sunPath(t) {
  // t: 0 to 1, full cycle
  // Center and radii for oval
  const margin = 90;
  const cx = width / 2;
  const cy = height / 2 + 10;
  const rx = (width / 2) - margin;
  const ry = (height / 2) - margin;
  // Angle: start at -135deg (top-left), go clockwise
  const angle = -Math.PI * 3/4 + 2 * Math.PI * t;
  const x = cx + rx * Math.cos(angle);
  const y = cy + ry * Math.sin(angle);
  return [x, y];
}

function drawSun(x, y) {
  ctx.save();
  ctx.clearRect(0, 0, width, height);
  // Sun glow
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, 70);
  gradient.addColorStop(0, '#fffde7');
  gradient.addColorStop(0.3, '#ffe082');
  gradient.addColorStop(0.7, '#ffd600cc');
  gradient.addColorStop(1, 'rgba(255, 214, 0, 0)');
  ctx.beginPath();
  ctx.arc(x, y, 70, 0, 2 * Math.PI);
  ctx.fillStyle = gradient;
  ctx.fill();
  // Sun core
  ctx.beginPath();
  ctx.arc(x, y, 38, 0, 2 * Math.PI);
  ctx.fillStyle = '#ffd600';
  ctx.shadowColor = '#ffd600';
  ctx.shadowBlur = 32;
  ctx.fill();
  ctx.restore();
}

function animateSun() {
  t += 0.0022; // Más lento
  if (t > 1) t = 0;
  const [x, y] = sunPath(t);
  drawSun(x, y);
  requestAnimationFrame(animateSun);
}
animateSun();

// --- D3.js Visualizations ---
// Project 1: Disease Classifier (bar chart: class counts)
(function() {
  const data = [
    { disease: 'Asthma', count: 120 },
    { disease: 'Bronchitis', count: 80 },
    { disease: 'Pneumonia', count: 60 },
    { disease: 'COPD', count: 40 }
  ];
  const w = 320, h = 180, m = {top: 24, right: 18, bottom: 36, left: 60};
  const svg = d3.select('#viz1').append('svg')
    .attr('width', w).attr('height', h);
  const x = d3.scaleBand().domain(data.map(d => d.disease)).range([m.left, w - m.right]).padding(0.22);
  const y = d3.scaleLinear().domain([0, d3.max(data, d => d.count)]).nice().range([h - m.bottom, m.top]);
  svg.append('g').selectAll('rect')
    .data(data).enter().append('rect')
    .attr('x', d => x(d.disease)).attr('y', d => y(d.count))
    .attr('width', x.bandwidth()).attr('height', d => y(0) - y(d.count))
    .attr('fill', '#ffd600cc');
  svg.append('g').attr('transform', `translate(0,${h-m.bottom})`).call(d3.axisBottom(x));
  svg.append('g').attr('transform', `translate(${m.left},0)`).call(d3.axisLeft(y));
})();

// Project 2: Housing Regression (scatter: true vs predicted)
(function() {
  const data = [
    { true: 3.2, pred: 3.1 }, { true: 2.8, pred: 2.9 }, { true: 4.1, pred: 4.0 },
    { true: 3.7, pred: 3.8 }, { true: 2.5, pred: 2.6 }, { true: 4.5, pred: 4.3 }
  ];
  const w = 320, h = 180, m = {top: 24, right: 18, bottom: 36, left: 48};
  const svg = d3.select('#viz2').append('svg')
    .attr('width', w).attr('height', h);
  const x = d3.scaleLinear().domain([2, 5]).range([m.left, w - m.right]);
  const y = d3.scaleLinear().domain([2, 5]).range([h - m.bottom, m.top]);
  svg.append('g').selectAll('circle')
    .data(data).enter().append('circle')
    .attr('cx', d => x(d.true)).attr('cy', d => y(d.pred))
    .attr('r', 8).attr('fill', '#ffb300cc');
  svg.append('g').attr('transform', `translate(0,${h-m.bottom})`).call(d3.axisBottom(x));
  svg.append('g').attr('transform', `translate(${m.left},0)`).call(d3.axisLeft(y));
  svg.append('text').attr('x', w/2).attr('y', m.top-8).attr('text-anchor','middle').attr('fill','#a67c00').attr('font-size','1em').text('True vs Predicted (log $/m²)');
})();

// Project 3: User Clustering (pie chart: cluster sizes)
(function() {
  const data = [
    { cluster: 'A', size: 90 },
    { cluster: 'B', size: 60 },
    { cluster: 'C', size: 30 }
  ];
  const w = 220, h = 180, r = 70;
  const svg = d3.select('#viz3').append('svg')
    .attr('width', w).attr('height', h)
    .append('g')
    .attr('transform', `translate(${w/2},${h/2})`);
  const color = d3.scaleOrdinal().domain(data.map(d=>d.cluster)).range(['#ffd600','#ffb300','#ffe082']);
  const pie = d3.pie().value(d=>d.size);
  const arc = d3.arc().innerRadius(28).outerRadius(r);
  svg.selectAll('path')
    .data(pie(data)).enter().append('path')
    .attr('d', arc)
    .attr('fill', d=>color(d.data.cluster))
    .attr('stroke', '#fffde7').attr('stroke-width', 2);
  svg.selectAll('text')
    .data(pie(data)).enter().append('text')
    .attr('transform', d=>`translate(${arc.centroid(d)})`)
    .attr('text-anchor','middle').attr('dy','0.35em')
    .attr('fill','#6d4c00').attr('font-size','1em')
    .text(d=>d.data.cluster);
})();
