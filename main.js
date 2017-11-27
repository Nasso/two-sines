// Const
const cvs = document.getElementById("cvs");
const clrbtn = document.getElementById("clrbtn");
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
	trace: document.getElementById("i_trace"),
};
const inpv = {
	speedx: document.getElementById("v_speedx"),
	speedy: document.getElementById("v_speedy"),
	phase: document.getElementById("v_phase"),
	dotsize: document.getElementById("v_dotsize"),
	scalex: document.getElementById("v_scalex"),
	scaley: document.getElementById("v_scaley"),
	trace: document.getElementById("v_trace"),
};
const inpsettings = {
	speedx: { min: 0, max: 10, d: 1.5, steps: 20 },
	speedy: { min: 0, max: 10, d: 3, steps: 20 },
	phase: { min: 0, max: 1, d: 0, steps: 20 },
	
	dotsize: { min: 1, max: 11, d: 6, steps: 20 },
	scalex: { min: 0, max: 1, d: 1, steps: 20 },
	scaley: { min: 0, max: 1, d: 0.5, steps: 20 },
	trace: { min: 0, max: 1, d: 0.01, steps: 100 },
};

// Vars
let o = {
	speedx: 1.5,
	speedy: 3,
	phase: 0,
	
	dotsize: 6,
	scalex: 1,
	scaley: 0.5,
	trace: 0.01,
};
let t = 0;
let delta = 0;

let dirtylast = true;
let lastx = -1;
let lasty = -1;
let x = 0;
let y = 0;

// Functions
function draw() {
	// Calc
	delta = (Date.now() / 1000) - t;
	t = Date.now() / 1000;
	
	lastx = x;
	lasty = y;
	x = W / 2 + Math.sin(t * o.speedx) * W * 0.4 * o.scalex;
	y = H / 2 + Math.sin(t * o.speedy + o.phase * Math.PI) * H * 0.4 * o.scaley;
	dirtylast = dirtylast || delta > 0.1; // Prevent jumps when switching tabs
	
	// Draw
	gtx.fillStyle = "rgba(238, 238, 238, " + o.trace + ")";
	gtx.fillRect(0, 0, W, H);
	
	gtx.strokeStyle = "red";
	gtx.lineWidth = o.dotsize;
	gtx.lineCap = "round";
	
	gtx.beginPath();
	
	if(dirtylast) {
		gtx.moveTo(x, y);
		dirtylast = false;
	} else gtx.moveTo(lastx, lasty);
	
	gtx.lineTo(x, y);
	gtx.stroke();
	
	// Loop
	requestAnimationFrame(draw);
}

function reset() {
	gtx.fillStyle = "rgba(238, 238, 238, 1)";
	gtx.fillRect(0, 0, W, H);
	dirtylast = true;
}

// Main
gtx.fillStyle = "rgba(238, 238, 238, 1)";
gtx.fillRect(0, 0, W, H);

for(let k in inp) {
	const i = inp[k];
	const s = inpsettings[k];
	const v = inpv[k];
	const t = k;
	
	i.min = s.min;
	i.max = s.max;
	i.step = (s.max - s.min) / s.steps;
	i.value = s.d;
	v.innerHTML = i.value;
	
	i.addEventListener("change", () => {
		o[t] = i.value;
		reset();
	});
	
	i.addEventListener("input", () => {
		v.innerHTML = i.value;
	});
}

clrbtn.addEventListener("click", () => {
	reset();
});

draw();
