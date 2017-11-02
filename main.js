// Const
const cvs = document.getElementById("cvs");
const gtx = cvs.getContext("2d");
const W = cvs.width;
const H = cvs.height;
const inp = {
	speedx: document.getElementById("i_speedx"),
	speedy: document.getElementById("i_speedy"),
	phase: document.getElementById("i_phase"),
	dotsize: document.getElementById("i_dotsize"),
	scalex: document.getElementById("i_scalex"),
	scaley: document.getElementById("i_scaley"),
};
const inpsettings = {
	speedx: { min: 0, max: 10, d: 1.5 },
	speedy: { min: 0, max: 10, d: 3 },
	phase: { min: 0, max: 1, d: 0 },
	
	dotsize: { min: 1, max: 8, d: 4 },
	scalex: { min: 0, max: 1, d: 1 },
	scaley: { min: 0, max: 1, d: 0.5 }
};

// Vars
let o = {
	speedx: 1.5,
	speedy: 3,
	phase: 0,
	
	dotsize: 4,
	scalex: 1,
	scaley: 0.5
};
let t = 0;

let x = 0;
let y = 0;

// Functions
function draw() {
	// Calc
	t = Date.now() / 1000;
	x = W / 2 + Math.sin(t * o.speedx) * W * 0.4 * o.scalex;
	y = H / 2 + Math.sin(t * o.speedy + o.phase * Math.PI) * H * 0.4 * o.scaley;
	
	// Draw
	gtx.fillStyle = "rgba(238, 238, 238, 0.01)";
	gtx.fillRect(0, 0, W, H);
	
	gtx.fillStyle = "red";
	
	gtx.beginPath();
	gtx.arc(x, y, o.dotsize, 0, 2 * Math.PI, false);
	gtx.fill();
	
	// Loop
	requestAnimationFrame(draw);
}

// Main
gtx.fillStyle = "rgba(238, 238, 238, 1)";
gtx.fillRect(0, 0, W, H);

for(let k in inp) {
	const i = inp[k];
	const s = inpsettings[k];
	
	i.min = s.min;
	i.max = s.max;
	i.step = (s.max - s.min) / 20;
	i.value = s.d;
	
	i.addEventListener("change", () => {
		o[k] = i.value;
		console.log("o['" + k + "'] = " + i.value);
		gtx.fillStyle = "rgba(238, 238, 238, 1)";
		gtx.fillRect(0, 0, W, H);
	});
}

draw();
