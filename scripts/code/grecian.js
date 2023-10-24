function solveCheck(nums) {
	for ( n = 0; n < nums.length; n++) {
		total = nums[n].reduce((a, b) => a + b, 0);
		if (total != 42) return false;
	}
	return true;	
}

function checkVisible() {
	let visibleNums = new Array(12).fill().map(() => new Array(4).fill(0));
	for (i = 0; i < puzzle.length; i ++) {
		let selDisk = puzzle[i];
		for (j = 0; j < selDisk.length; j++) {
			let selCol = selDisk[j];
			for (k = 0; k < selCol.length; k++) {
				let v = selCol[k];
				if (v != 0 && visibleNums[j][k] == 0) {
					visibleNums[j][k] = v;
				}
			}
		}
	}
	let solved = solveCheck(visibleNums);
	return solved;
}

function rotate(d, clock) {
	let disk = puzzle[d];
	let count = parseInt(document.getElementById("count").innerHTML);
	let diskImage = document.getElementById("disk"+d);
	let rotation = diskImage.style.transform;
	let angle = 0;
	if (rotation != "") angle = parseInt(rotation.substring(7,rotation.length - 4));
	if (clock) {
		disk.unshift(disk.pop());
		angle += 30;
	} else { 
		disk.push(disk.shift());
		angle -= 30;
	}
	if (angle >= 360) angle -= 360;
	if (angle < 0) angle += 360;
	diskImage.style.transform = "rotate("+angle+"deg)";
	puzzle[d] = disk;
	let solved = checkVisible();
	count++;
	updateById("count", count);
	if (solved) {
		updateById("result", "Success");
		styleClass("#89f5a9");
	} else {
		updateById("result", "Not 42");
		styleClass("#eb817a");
	}
}

function solvePuzzle() {
	diskImg0 = document.getElementById("disk0");
	diskImg1 = document.getElementById("disk1");
	diskImg2 = document.getElementById("disk2");
	diskImg3 = document.getElementById("disk3");
	diskImg0.style.transform = "rotate(150deg)";
	diskImg1.style.transform = "rotate(120deg)";
	diskImg2.style.transform = "rotate(270deg)";
	diskImg3.style.transform = "rotate(90deg)";
	updateById("result", "Success");
	styleClass("#89f5a9");
	puzzle = solution;
}

function updateById(id, x) {
	document.getElementById(id).innerHTML = x;
}

function styleClass(color) {
	var elements = document.getElementsByClassName('result'); // get all elements
	for(var i = 0; i < elements.length; i++){
		elements[i].style.backgroundColor = color;
	}
}

var puzzle = [[[0 , 0 , 0 , 3 ],
	[0 , 0 , 0 , 0 ],
	[0 , 0 , 0 , 6 ],
	[0 , 0 , 0 , 0 ],
	[0 , 0 , 0 , 10],
	[0 , 0 , 0 , 0 ],
	[0 , 0 , 0 , 7 ],
	[0 , 0 , 0 , 0 ],
	[0 , 0 , 0 , 15],
	[0 , 0 , 0 , 0 ],
	[0 , 0 , 0 , 8 ],
	[0 , 0 , 0 , 0 ]],
	[[0 , 0 , 4 , 7 ],
	[0 , 0 , 0 , 3 ],
	[0 , 0 , 7 , 0 ],
	[0 , 0 , 15, 6 ],
	[0 , 0 , 0 , 0 ],
	[0 , 0 , 0 , 11],
	[0 , 0 , 14, 11],
	[0 , 0 , 0 , 6 ],
	[0 , 0 , 9 , 11],
	[0 , 0 , 0 , 0 ],
	[0 , 0 , 12, 6 ],
	[0 , 0 , 0 , 17]],
	[[0 , 5 , 21, 9 ],
	[0 , 0 , 6 , 13],
	[0 , 10, 15, 9 ],
	[0 , 0 , 4 , 7 ],
	[0 , 8 , 9 , 13],
	[0 , 0 , 18, 21],
	[0 , 22, 11, 17],
	[0 , 0 , 26, 4 ],
	[0 , 16, 14, 5 ],
	[0 , 0 , 1 , 0 ],
	[0 , 9 , 12, 7 ],
	[0 , 0 , 0 , 8 ]],
	[[1 , 3 , 9 , 7 ],
	[0 , 26, 20, 0 ],
	[9 , 6 , 12, 9 ],
	[0 , 0 , 3 , 0 ],
	[12, 2 , 6 , 7 ],
	[0 , 13, 0 , 14],
	[6 , 9 , 14, 11],
	[0 , 0 , 12, 0 ],
	[10, 17, 3 , 8 ],
	[0 , 19, 8 , 0 ],
	[10, 3 , 9 , 16],
	[0 , 12, 0 , 2 ]],
	[[3 , 4 , 5 , 11],
	[4 , 6 , 6 , 14],
	[12, 6 , 7 , 11],
	[2 , 3 , 8 , 14],
	[5 , 3 , 9 , 11],
	[10, 14, 10, 14],
	[7 , 14, 11, 14],
	[16, 21, 12, 11],
	[8 , 21, 13, 14],
	[7 , 9 , 14, 11],
	[8 , 9 , 15, 14],
	[8 , 4 , 4 , 11]]];
	
var solution = [[[0 , 0 , 0 , 0 ],
	[0 , 0 , 0 , 15],
	[0 , 0 , 0 , 0 ],
	[0 , 0 , 0 , 8 ],
	[0 , 0 , 0 , 0 ],
	[0 , 0 , 0 , 3 ],
	[0 , 0 , 0 , 0 ],
	[0 , 0 , 0 , 6 ],
	[0 , 0 , 0 , 0 ],
	[0 , 0 , 0 , 10],
	[0 , 0 , 0 , 0 ],
	[0 , 0 , 0 , 7 ]],
	[[0 , 0 , 9 , 11],
	[0 , 0 , 0 , 0 ],
	[0 , 0 , 12, 6 ],
	[0 , 0 , 0 , 17],
	[0 , 0 , 4 , 7 ],
	[0 , 0 , 0 , 3 ],
	[0 , 0 , 7 , 0 ],
	[0 , 0 , 15, 6 ],
	[0 , 0 , 0 , 0 ],
	[0 , 0 , 0 , 11],
	[0 , 0 , 14, 11],
	[0 , 0 , 0 , 6 ]],
	[[0 , 0 , 4 , 7 ],
	[0 , 8 , 9 , 13],
	[0 , 0 , 18, 21],
	[0 , 22, 11, 17],
	[0 , 0 , 26, 4 ],
	[0 , 16, 14, 5 ],
	[0 , 0 , 1 , 0 ],
	[0 , 9 , 12, 7 ],
	[0 , 0 , 0 , 8 ],
	[0 , 5 , 21, 9 ],
	[0 , 0 , 6 , 13],
	[0 , 10, 15, 9 ]],
	[[0 , 19, 8 , 0 ],
	[10, 3 , 9 , 16],
	[0 , 12, 0 , 2 ],
	[1 , 3 , 9 , 7 ],
	[0 , 26, 20, 0 ],
	[9 , 6 , 12, 9 ],
	[0 , 0 , 3 , 0 ],
	[12, 2 , 6 , 7 ],
	[0 , 13, 0 , 14],
	[6 , 9 , 14, 11],
	[0 , 0 , 12, 0 ],
	[10, 17, 3 , 8 ]],
	[[3 , 4 , 5 , 11],
	[4 , 6 , 6 , 14],
	[12, 6 , 7 , 11],
	[2 , 3 , 8 , 14],
	[5 , 3 , 9 , 11],
	[10, 14, 10, 14],
	[7 , 14, 11, 14],
	[16, 21, 12, 11],
	[8 , 21, 13, 14],
	[7 , 9 , 14, 11],
	[8 , 9 , 15, 14],
	[8 , 4 , 4 , 11]]];