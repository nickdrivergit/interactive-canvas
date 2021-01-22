var socket;

class brushProperties {
	constructor() {
		this.sizeX = 15;
		this.sizeY = 15;
		this.color = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
	}
}

let cursor = new brushProperties();

function setup() {
	createCanvas(document.body.clientWidth * .99, document.body.clientHeight * .98);
		background(51);
		socket = io.connect('http://127.0.0.1:3000');
		socket.on('mouse', newDrawing);
}

function newDrawing(data) {
	// console.log(data)
	noStroke();
	// fill(255,0,100);
	fill(data.col[0], data.col[1], data.col[2]);
	ellipse(data.mX, data.mY, data.sX, data.sY);
}

function draw() {
}

function mouseDragged(){
	// console.log(mouseX + ', ' + mouseY);
	noStroke();
	fill(cursor.color[0], cursor.color[1], cursor.color[2]);
	ellipse(mouseX, mouseY, cursor.sizeX, cursor.sizeY);

	var data = {
		mX: mouseX,
		mY: mouseY,
		sX: cursor.sizeX,
		sY: cursor.sizeY,
		col: cursor.color
	}
	// console.log(data)
	socket.emit('mouse', data);
}

function changeColor(){
	console.log("right click!");
	for (let i = 0; i < 3; i++)
		cursor.color[i] = Math.floor(Math.random() * 256);
}

document.addEventListener("mousedown", buttonPress, false);
document.addEventListener("contextmenu", e => {e.preventDefault()});

function buttonPress(e) {
    if (e.button === 0) {
        console.log("Left mouse button pressed!");
    } else if (e.button === 1) {
        console.log("Middle mouse button pressed!");
    } else if (e.button === 2) {
		changeColor();
        console.log("Right mouse button pressed!");
    } else {
        console.log("Things be crazy up in here!!!");
    }
}

document.addEventListener("mousewheel", changeBrushSize, false);
document.addEventListener("DOMMouseScroll", changeBrushSize, false);

function changeBrushSize(e){
	// console.log(e.detail)
	if (e.detail < 0 && cursor.sizeY < 100){
		cursor.sizeX++;
		cursor.sizeY++;
	}
	else if (cursor.sizeY > 1){
		cursor.sizeX--;
		cursor.sizeY--;
	}
	console.log(cursor.sizeY)
}