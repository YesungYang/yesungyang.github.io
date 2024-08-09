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

// Stroke 색상 초기화
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

  // 그림 그릴 수 있는 영역 내에서만 그림을 그리도록 제한
  if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineTo(x, y);
    ctx.stroke();
  } else {
    // 마우스가 그릴 수 있는 영역을 벗어나면 그리기 멈추기
    isPainting = false;
  }
});
