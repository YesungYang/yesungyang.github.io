const canvas = document.getElementById("drawing-board");
const toolbar = document.getElementById("toolbar");
const ctx = canvas.getContext("2d");

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = 800;
canvas.height = 600;

let isPainting = false;
let lineWidth = 5;

const xMin = 24;
const xMax = 772;
const yMin = 35;
const yMax = 565;

// Stroke color reset
ctx.strokeStyle = document.getElementById("stroke").value;

toolbar.addEventListener("click", (event) => {
  if (event.target.id === "clear") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
});

toolbar.addEventListener("change", (event) => {
  if (event.target.id === "stroke") {
    ctx.strokeStyle = event.target.value;
  }

  if (event.target.id === "lineWidth") {
    lineWidth = event.target.value;
  }
});

canvas.addEventListener("mousedown", (event) => {
  const x = event.clientX - canvasOffsetX;
  const y = event.clientY - canvasOffsetY;

  if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
    isPainting = true;
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
});

canvas.addEventListener("mouseup", () => {
  isPainting = false;
});

canvas.addEventListener("mousemove", (event) => {
  if (!isPainting) {
    return;
  }

  const x = event.clientX - canvasOffsetX;
  const y = event.clientY - canvasOffsetY;

 // Only drawing in a drawing area.
  if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineTo(x, y);
    ctx.stroke();
  } else {
    // Once the mouse go out of the drawing area, it stops drawing. 
    isPainting = false;
  }
});
