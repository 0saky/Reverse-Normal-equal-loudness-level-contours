
//const Points = [{ x: 35.74, y: 0.63}, { x: 25.6, y: 2.69}, { x: 13.79, y: -4.45}, { x: 9.69, y: 2.69 }, { x: -1.32, y: 0.46 }, { x: 1.74, y: 2.24 }, { x: 4.46, y: -1.32 }];
const Points = [{x: 4, y: 0}, {x: 8, y: 0}, {x: 7, y:-1}, { x: 5, y: 1}, {x: 3, y:-1}, { x: 1, y: 1}, {x: -1, y:-1}, { x: -2, y: 0}, {x: 0, y: 0}];
let systeme = [Points.length + 1];
let values = [];
let coefficient = [];

const debut = -0.5;
const fin = 7;
const haut = 16;
const bas = -14;
const increment = 0.01;
const height = 700;
const width = 700;
const margin = ({ top: 20, right: 30, bottom: 30, left: 40 });
const radius = 6;


for (let i = 0; i < Points.length; i++) {
    systeme[i] = [Points.length];
    for (let j = 0; j < Points.length; j++) {
        systeme[i][j] = Math.pow(Points[j].x, Points.length - 1 - i);
    }

}
systeme[Points.length] = [Points.length];
for (let j = 0; j < Points.length; j++) {
    systeme[Points.length][j] = Points[j].y;
}
console.log("length :", systeme.length)
display("First");

for (let i = 0; i < systeme[0].length; i++) {
    incoprinc(i);

}

for (let i = 0; i < systeme[0].length; i++) {
    neutral(i);

}

for (let i = systeme[0].length - 1; i >= 0; i--) {
    final(i);

}
display("Result");

let write = "y = ";
for (let i = 0; i < Points.length; i++) {
    coefficient[i] = systeme[Points.length][Points.length - 1 - i]
    write += Math.trunc(coefficient[i] * 1000) / 1000 + "x" + "^" + i + " ";
}

console.log(write);

for (let i = debut; i < fin; i += increment) {
    let y = 0;
    for (let p = Points.length - 1; p >= 0; p--) {
        //  console.log("i:", i, " p:", p, " coef:", coefficient[p]);
        y += coefficient[p] * Math.pow(i, p);

    }
    values.push({ x: i, y: y });
}
console.log(values);

let scales = d3.scaleLinear()
    .domain([bas, haut]);

let x = d3.scaleLinear()
    .domain(d3.extent(values, d => d.x))
    .range([margin.left, width - margin.right]);

let y = d3.scaleLinear()
    .domain([d3.min(values, d => d.y), d3.max(values, d => d.y)])
    .range([height - margin.bottom, margin.top])

let xp = d3.scaleLinear()
    .domain(d3.extent(Points, d => d.x)).nice()
    .range([margin.left, width - margin.right]);

let yp = d3.scaleLinear()
    .domain(d3.extent(Points, d => d.y)).nice()
    .range([height - margin.bottom, margin.top]);

let xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

let yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(height / 40))

let path = `M${x(values[0].x)},${y(values[0].y)}`;
for (let i = 1; i < values.length; i++) {
    path += `L${x(values[i].x)},${y(values[i].y)}`;
}

let origine = `M${x(0)},${y(haut)}L${x(0)},${y(bas)}M${x(debut)},${y(0)}L${x(fin)},${y(0)}`

let line = d3.line()
    .x(d => x(d.x))
    .y(d => y(d.y));

let grid = g => g
    .attr("stroke", "currentColor")
    .attr("stroke-opacity", 0.1)
    .call(g => g.append("g")
        .selectAll("line")
        .data(x.ticks())
        .join("line")
        .attr("x1", d => 0.5 + x(d))
        .attr("x2", d => 0.5 + x(d))
        .attr("y1", margin.top)
        .attr("y2", height - margin.bottom))
    .call(g => g.append("g")
        .selectAll("line")
        .data(y.ticks())
        .join("line")
        .attr("y1", d => 0.5 + y(d))
        .attr("y2", d => 0.5 + y(d))
        .attr("x1", margin.left)
        .attr("x2", width - margin.right));


let svg = d3.select("#container").append('svg')
    .attr('width', width)
    .attr('height', height)


let g = svg.append("g");
const seri = g

seri.append("g")
    .call(xAxis)


seri.append("g")
    .call(yAxis)


seri.append("g")
    .call(grid)



seri.append("path")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", line(values))
    .node()

seri.append("path")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .attr("d", origine)
    .node()

seri.append("g")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("fill", "none")
    .selectAll("circle")
    .data(Points)
    .join("circle")
    .attr("cx", d => x(d.x))
    .attr("cy", d => y(d.y))
    .attr("r", 3)

function updateAxes () {
    axes.call(viewportAxes(viewport, currentXScale, currentYScale))
}