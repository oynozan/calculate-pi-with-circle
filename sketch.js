const dots = [];
let inCircle = 0, outCircle = 0;
let PI_ratio = 0;

function setup() {
	createCanvas(800, 800);
}

function draw() {
	frameRate(60);
	background(255);

	//Draw the main circle
	fill(255);
	stroke(0);
	strokeWeight(3);
	circle(width / 2, width / 2, width);

	//Generate dot and update array
	let dot_class = new DotClass();
	dots.push(dot_class);

	//Draw all dots inside the array
	dots.forEach(d => d.draw());

	//Calculate the PI
	if (dot_class.isInCircle) inCircle += 1;
	else outCircle += 1;

	PI_ratio = 4 * (inCircle / (outCircle + inCircle));
	document.getElementById("pi").innerHTML = "π = " + PI_ratio;
}

class DotClass {
	constructor() {
		//Generate 2 random positions between 0-width and 0-height
		this.x = random(width);
		this.y = random(height);
	}

	draw() {
		if (this.isInCircle) stroke("#38b300");
		else stroke("#d13000");
		circle(this.x, this.y, 1);
	}

	get isInCircle() {
		/*
		 * true -> Dot is in circle
		 * false -> Dot is NOT in circle
		 *
		 * To determine whether dot is in circle or not,
		 * I'll find the distance between center of the circle
		 * and the dot. If distance < radius, the dot is in circle.
		 */

		let Cc = [width / 2, height / 2];
		let Dc = [this.x, this.y];

		//Find the distance between two coordinates
		let distance = Math.sqrt(Math.abs((Cc[0] - Dc[0]) ** 2 + (Cc[1] - Dc[1]) ** 2));

		if (distance < width / 2) {
			inCircle += 1;
			return true;
		}
		outCircle += 1;
		return false;
	}
}